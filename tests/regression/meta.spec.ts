import { test, expect } from "@playwright/test";
import {
  STATIC_PAGES,
  assertCanonicalHost,
  discoverBlogSlugs,
  gotoQuiet,
  installNotrack,
} from "./helpers";

test.beforeEach(async ({ context }) => {
  await installNotrack(context);
});

async function assertMeta(page: import("@playwright/test").Page, path: string) {
  await gotoQuiet(page, path);

  const title = await page.title();
  expect(title.trim().length, `${path} title`).toBeGreaterThan(3);

  // Prefer the last matching tag when Next.js Head merges defaults + page overrides.
  const metaContent = async (selector: string) => {
    const loc = page.locator(selector);
    const n = await loc.count();
    if (n === 0) return null;
    return loc.nth(n - 1).getAttribute("content");
  };

  const description = await metaContent('meta[name="description"]');
  expect(description?.trim().length, `${path} meta description`).toBeGreaterThan(10);

  const ogTitle = await metaContent('meta[property="og:title"]');
  expect(ogTitle?.trim().length, `${path} og:title`).toBeGreaterThan(3);

  const ogDescription = await metaContent('meta[property="og:description"]');
  expect(ogDescription?.trim().length, `${path} og:description`).toBeGreaterThan(10);

  const ogImage = await metaContent('meta[property="og:image"]');
  expect(ogImage?.trim().length, `${path} og:image`).toBeGreaterThan(5);

  const canonicalLoc = page.locator('link[rel="canonical"]');
  const canonicalCount = await canonicalLoc.count();
  const canonical =
    canonicalCount === 0
      ? null
      : await canonicalLoc.nth(canonicalCount - 1).getAttribute("href");
  assertCanonicalHost(canonical);

  const gsv = await metaContent('meta[name="google-site-verification"]');
  expect(gsv?.trim().length, `${path} google-site-verification`).toBeGreaterThan(10);
}

test.describe("meta tags", () => {
  for (const path of STATIC_PAGES) {
    test(`${path}`, async ({ page }) => {
      await assertMeta(page, path);
    });
  }

  test("published blog posts", async ({ page }) => {
    const slugs = await discoverBlogSlugs(page);
    for (const slug of slugs) {
      await assertMeta(page, `/blog/${slug}`);
    }
  });
});
