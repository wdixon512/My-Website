import fs from "fs";
import path from "path";
import { test, expect } from "@playwright/test";
import {
  STATIC_PAGES,
  discoverBlogSlugs,
  gotoQuiet,
  installNotrack,
  screenshotSlug,
  steamStatsRendersWithoutLogin,
} from "./helpers";

const SHOT_DIR = path.join(__dirname, "..", "..", "test-results", "screenshots");

const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 720 },
  { name: "mobile", width: 390, height: 844 },
] as const;

test.beforeEach(async ({ context }) => {
  await installNotrack(context);
});

test("desktop and mobile screenshots + no horizontal overflow", async ({ page, request }) => {
  fs.mkdirSync(SHOT_DIR, { recursive: true });

  const paths: string[] = [...STATIC_PAGES];
  const slugs = await discoverBlogSlugs(page);
  for (const slug of slugs) paths.push(`/blog/${slug}`);
  if (await steamStatsRendersWithoutLogin(request)) {
    paths.push("/steam-stats");
  }

  for (const route of paths) {
    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await gotoQuiet(page, route);
      await page.waitForTimeout(300);

      const file = path.join(SHOT_DIR, `${screenshotSlug(route)}-${vp.name}.png`);
      await page.screenshot({ path: file, fullPage: true });
      expect(fs.existsSync(file)).toBe(true);

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(
        scrollWidth,
        `${route} @ ${vp.name}: scrollWidth ${scrollWidth} > viewport ${vp.width}`
      ).toBeLessThanOrEqual(vp.width);
    }
  }
});
