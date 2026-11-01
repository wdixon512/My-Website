import type { APIRequestContext, BrowserContext, Page, Response } from "@playwright/test";

/** Must match /bot/ so the server drops analytics for this UA. */
export const BOT_UA =
  "Mozilla/5.0 (compatible; ahprice-regression-bot/1.0; +https://github.com/wdixon512/My-Website)";

export const BASE_URL = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");

export const STATIC_PAGES = [
  "/",
  "/home",
  "/projects",
  "/setup",
  "/blog",
  "/contact",
  "/photos",
] as const;

const SITE_HOST = "www.will-dixon.com";

export function withNotrack(pathOrUrl: string): string {
  const url = pathOrUrl.startsWith("http")
    ? new URL(pathOrUrl)
    : new URL(pathOrUrl, `${BASE_URL}/`);
  if (!url.searchParams.has("notrack")) {
    url.searchParams.append("notrack", "");
  }
  // Keep path + query + hash; baseURL is applied by Playwright for relative paths.
  if (url.origin === new URL(BASE_URL).origin || !pathOrUrl.startsWith("http")) {
    return `${url.pathname}${url.search}${url.hash}`;
  }
  return url.toString();
}

export function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http")) return pathOrUrl;
  return new URL(pathOrUrl, `${BASE_URL}/`).toString();
}

export function isSameOrigin(url: string): boolean {
  try {
    return new URL(url).origin === new URL(BASE_URL).origin;
  } catch {
    return false;
  }
}

export function bypassHeaders(): Record<string, string> {
  const secret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET?.trim();
  if (!secret) return {};
  return { "x-vercel-protection-bypass": secret };
}

/** Opt out of client analytics before any page script runs. */
export async function installNotrack(context: BrowserContext): Promise<void> {
  await context.addInitScript(() => {
    try {
      localStorage.setItem("wd_notrack", "1");
    } catch {
      /* ignore */
    }
  });
}

export type PageNoise = {
  consoleErrors: string[];
  pageErrors: string[];
  failedSameOrigin: string[];
};

export function attachNoiseListeners(page: Page): PageNoise {
  const noise: PageNoise = {
    consoleErrors: [],
    pageErrors: [],
    failedSameOrigin: [],
  };

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      const text = msg.text();
      // Next.js / React Strict Mode noise that is not actionable for regression.
      if (/Download the React DevTools/i.test(text)) return;
      noise.consoleErrors.push(text);
    }
  });

  page.on("pageerror", (err) => {
    noise.pageErrors.push(err.message);
  });

  page.on("requestfailed", (req) => {
    const url = req.url();
    if (!isSameOrigin(url)) return;
    const failure = req.failure()?.errorText || "failed";
    // Aborted navigations during redirects are common; ignore.
    if (/ERR_ABORTED/i.test(failure)) return;
    noise.failedSameOrigin.push(`${url} (${failure})`);
  });

  page.on("response", (res) => {
    const url = res.url();
    if (!isSameOrigin(url)) return;
    const status = res.status();
    // Document navigations to unknown routes are asserted elsewhere.
    if (status >= 400 && res.request().resourceType() !== "document") {
      noise.failedSameOrigin.push(`${url} (${status})`);
    }
  });

  return noise;
}

export async function gotoQuiet(page: Page, path: string): Promise<Response | null> {
  return page.goto(withNotrack(path), { waitUntil: "domcontentloaded" });
}

export async function assertHealthyPage(page: Page, path: string): Promise<void> {
  const noise = attachNoiseListeners(page);
  const res = await gotoQuiet(page, path);
  const status = res?.status() ?? 0;
  if (status < 200 || status >= 400) {
    throw new Error(`${path} returned ${status}`);
  }

  const h1 = page.locator("h1");
  await h1.first().waitFor({ state: "visible", timeout: 15000 });
  const h1Count = await h1.count();
  if (h1Count < 1) throw new Error(`${path}: expected an H1`);

  const text = (await page.locator("body").innerText()).replace(/\s+/g, " ").trim();
  if (text.length < 40) {
    throw new Error(`${path}: body text too short (${text.length} chars)`);
  }

  // Allow paint / late fetches to settle briefly.
  await page.waitForTimeout(250);

  if (noise.consoleErrors.length) {
    throw new Error(`${path}: console errors:\n${noise.consoleErrors.join("\n")}`);
  }
  if (noise.pageErrors.length) {
    throw new Error(`${path}: page errors:\n${noise.pageErrors.join("\n")}`);
  }
  if (noise.failedSameOrigin.length) {
    throw new Error(`${path}: failed same-origin requests:\n${noise.failedSameOrigin.join("\n")}`);
  }
}

export async function discoverBlogSlugs(page: Page): Promise<string[]> {
  await gotoQuiet(page, "/blog");
  const hrefs = await page.locator('a[href^="/blog/"]').evaluateAll((els) =>
    els
      .map((el) => (el as HTMLAnchorElement).getAttribute("href") || "")
      .filter(Boolean)
  );
  const slugs = new Set<string>();
  for (const href of hrefs) {
    const m = /^\/blog\/([^/?#]+)\/?$/.exec(href);
    if (m && m[1] !== "does-not-exist") slugs.add(m[1]);
  }
  return [...slugs];
}

export async function steamStatsRendersWithoutLogin(
  request: APIRequestContext
): Promise<boolean> {
  const res = await request.get(absoluteUrl(withNotrack("/steam-stats")), {
    headers: { "User-Agent": BOT_UA, ...bypassHeaders() },
    maxRedirects: 0,
  });
  // 200 = page renders; 3xx = login redirect → skip.
  return res.status() === 200;
}

export async function collectInternalHrefs(page: Page): Promise<string[]> {
  const origin = new URL(BASE_URL).origin;
  return page.locator("a[href]").evaluateAll((els, originStr) => {
    const out: string[] = [];
    for (const el of els) {
      const raw = (el as HTMLAnchorElement).getAttribute("href") || "";
      if (!raw || raw.startsWith("#") || raw.startsWith("mailto:") || raw.startsWith("tel:")) {
        continue;
      }
      try {
        const u = new URL(raw, originStr);
        if (u.origin !== originStr) continue;
        out.push(`${u.pathname}${u.search}`);
      } catch {
        /* skip */
      }
    }
    return [...new Set(out)];
  }, origin);
}

export async function assertStatusOk(
  request: APIRequestContext,
  path: string
): Promise<number> {
  const res = await request.get(absoluteUrl(withNotrack(path)), {
    headers: { "User-Agent": BOT_UA, ...bypassHeaders() },
  });
  const status = res.status();
  if (status >= 400) {
    throw new Error(`${path} returned ${status}`);
  }
  return status;
}

export function assertCanonicalHost(href: string | null): void {
  if (!href) return;
  const u = new URL(href);
  if (u.protocol !== "https:" && u.protocol !== "http:") {
    throw new Error(`canonical must be absolute, got ${href}`);
  }
  if (!href.startsWith("http")) {
    throw new Error(`canonical must be absolute, got ${href}`);
  }
  if (u.hostname !== SITE_HOST) {
    throw new Error(`canonical host must be ${SITE_HOST}, got ${u.hostname}`);
  }
}

export function screenshotSlug(path: string): string {
  if (path === "/") return "root";
  return path.replace(/^\//, "").replace(/[/?&=%]/g, "_") || "root";
}
