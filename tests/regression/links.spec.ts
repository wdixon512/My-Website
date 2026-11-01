import { test, expect } from "@playwright/test";
import {
  BOT_UA,
  STATIC_PAGES,
  absoluteUrl,
  assertStatusOk,
  bypassHeaders,
  collectInternalHrefs,
  discoverBlogSlugs,
  gotoQuiet,
  installNotrack,
  withNotrack,
} from "./helpers";

test.beforeEach(async ({ context }) => {
  await installNotrack(context);
});

test("internal links on site pages are not broken", async ({ page, request }) => {
  const slugs = await discoverBlogSlugs(page);
  const seeds = [...STATIC_PAGES, ...slugs.map((s) => `/blog/${s}`)];
  const seen = new Set<string>();
  const broken: string[] = [];

  for (const seed of seeds) {
    await gotoQuiet(page, seed);
    const hrefs = await collectInternalHrefs(page);
    for (const href of hrefs) {
      const key = href.split("#")[0];
      if (seen.has(key)) continue;
      seen.add(key);
      try {
        await assertStatusOk(request, key);
      } catch (e) {
        broken.push(`${key} (from ${seed}): ${(e as Error).message}`);
      }
    }
  }

  expect(broken, broken.join("\n")).toEqual([]);
});

test("resume link(s) resolve (200, pdf or page)", async ({ page, request }) => {
  await gotoQuiet(page, "/home");
  const resumes = await page.locator('a[href*="resume" i], a[href$=".pdf"]').evaluateAll((els) =>
    els.map((el) => (el as HTMLAnchorElement).getAttribute("href") || "").filter(Boolean)
  );
  expect(resumes.length, "expected at least one resume link").toBeGreaterThan(0);

  for (const href of resumes) {
    if (/^https?:/i.test(href) && !href.includes("localhost") && !href.includes("will-dixon.com")) {
      // External resume host — still check it resolves.
      const res = await request.get(href, {
        headers: { "User-Agent": BOT_UA, ...bypassHeaders() },
      });
      expect(res.status(), href).toBeLessThan(400);
      continue;
    }
    const path = href.startsWith("http") ? new URL(href).pathname + new URL(href).search : href;
    const res = await request.get(absoluteUrl(withNotrack(path)), {
      headers: { "User-Agent": BOT_UA, ...bypassHeaders() },
    });
    expect(res.status(), href).toBe(200);
    const ct = (res.headers()["content-type"] || "").toLowerCase();
    const isPdf = ct.includes("pdf") || path.toLowerCase().endsWith(".pdf");
    const isHtml = ct.includes("html") || ct.includes("text/");
    expect(isPdf || isHtml, `${href} content-type=${ct}`).toBe(true);
  }
});

test("ref links keep their ?ref", async ({ page }) => {
  await page.goto(withNotrack("/home?ref=linkedin-profile"));
  const after = new URL(page.url());
  expect(after.searchParams.get("ref")).toBe("linkedin-profile");
  expect(after.searchParams.has("notrack")).toBe(true);

  await gotoQuiet(page, "/blog");
  const refHrefs = await page.locator("a[href*='ref=']").evaluateAll((els) =>
    els.map((el) => (el as HTMLAnchorElement).getAttribute("href") || "")
  );
  // Blog index may not have ref links; check a published post if needed.
  if (refHrefs.length === 0) {
    const slugs = await discoverBlogSlugs(page);
    if (slugs[0]) {
      await gotoQuiet(page, `/blog/${slugs[0]}`);
    }
  }
  const withRef = await page.locator("a[href*='ref=']").evaluateAll((els) =>
    els.map((el) => (el as HTMLAnchorElement).getAttribute("href") || "")
  );
  for (const href of withRef) {
    const u = new URL(href, "https://www.will-dixon.com");
    expect(u.searchParams.get("ref"), href).toBeTruthy();
  }
});
