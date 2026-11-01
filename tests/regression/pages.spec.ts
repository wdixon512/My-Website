import { test, expect } from "@playwright/test";
import {
  STATIC_PAGES,
  assertHealthyPage,
  discoverBlogSlugs,
  installNotrack,
  steamStatsRendersWithoutLogin,
  withNotrack,
} from "./helpers";

test.beforeEach(async ({ context }) => {
  await installNotrack(context);
});

test.describe("pages return 200 with real content", () => {
  for (const path of STATIC_PAGES) {
    test(`${path}`, async ({ page }) => {
      await assertHealthyPage(page, path);
    });
  }

  test("published blog posts discovered from /blog", async ({ page }) => {
    const slugs = await discoverBlogSlugs(page);
    expect(slugs.length, "expected at least one published blog post").toBeGreaterThan(0);
    for (const slug of slugs) {
      await assertHealthyPage(page, `/blog/${slug}`);
    }
  });

  test("/steam-stats if it renders without login", async ({ page, request }) => {
    const renders = await steamStatsRendersWithoutLogin(request);
    test.skip(!renders, "steam-stats redirects to login without a session");
    await assertHealthyPage(page, "/steam-stats");
  });

  test("every navigation URL includes notrack", async ({ page }) => {
    await page.goto(withNotrack("/home"));
    const url = new URL(page.url());
    expect(url.searchParams.has("notrack")).toBe(true);
  });
});
