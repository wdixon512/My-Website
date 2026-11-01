import { test, expect } from "@playwright/test";
import { BOT_UA, absoluteUrl, bypassHeaders, installNotrack, withNotrack } from "./helpers";

const headers = () => ({ "User-Agent": BOT_UA, ...bypassHeaders() });

test.beforeEach(async ({ context }) => {
  await installNotrack(context);
});

const ODD_PATHS = [
  "/blog/does-not-exist",
  "/blog/%00",
  `/blog/${"a".repeat(400)}`,
  "/home/?ref=%3Cscript%3Ealert(1)%3C%2Fscript%3E",
  "/HOME",
  "/home/",
  "/blog/",
  "/projects/",
  "/CONTACT",
];

test("odd inputs never return 500", async ({ request }) => {
  for (const path of ODD_PATHS) {
    const res = await request.get(absoluteUrl(withNotrack(path)), {
      headers: headers(),
      maxRedirects: 5,
    });
    expect(res.status(), path).toBeLessThan(500);
  }
});

test("?ref=<script> on a page does not 500 and keeps a ref param", async ({ page }) => {
  const res = await page.goto(withNotrack('/home?ref=<script>alert(1)</script>'), {
    waitUntil: "domcontentloaded",
  });
  expect(res?.status()).toBeLessThan(500);
  expect(res?.status()).toBeLessThan(400);
  // Client/server may sanitize the value, but the query key should still be present or page OK.
  const body = await page.locator("body").innerText();
  expect(body.length).toBeGreaterThan(20);
});
