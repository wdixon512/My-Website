import { test, expect } from "@playwright/test";
import { attachNoiseListeners, gotoQuiet, installNotrack, withNotrack } from "./helpers";

test.beforeEach(async ({ context }) => {
  await installNotrack(context);
});

test("unknown route returns 404 with friendly content", async ({ page }) => {
  const noise = attachNoiseListeners(page);
  const res = await page.goto(withNotrack("/this-page-definitely-does-not-exist-xyz"), {
    waitUntil: "domcontentloaded",
  });
  expect(res?.status()).toBe(404);

  const text = (await page.locator("body").innerText()).replace(/\s+/g, " ").trim();
  expect(text.length).toBeGreaterThan(20);
  expect(/not found|404|missing|doesn't exist|does not exist|lost/i.test(text)).toBe(true);

  await page.waitForTimeout(200);
  expect(noise.pageErrors).toEqual([]);
});
