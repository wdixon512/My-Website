import { test, expect } from "@playwright/test";
import {
  BOT_UA,
  absoluteUrl,
  bypassHeaders,
  gotoQuiet,
  installNotrack,
  withNotrack,
} from "./helpers";

const headers = () => ({ "User-Agent": BOT_UA, ...bypassHeaders() });

test.beforeEach(async ({ context }) => {
  await installNotrack(context);
});

test("/api/stats without token -> 401 or 404", async ({ request }) => {
  const res = await request.get(absoluteUrl(withNotrack("/api/stats")), {
    headers: headers(),
  });
  expect([401, 404]).toContain(res.status());
  const body = await res.text();
  expect(/visitors|pageviews|"days"/i.test(body)).toBe(false);
});

test("/api/stats with a wrong token -> 401 or 404 (never use a real STATS_TOKEN)", async ({
  request,
}) => {
  const res = await request.get(
    absoluteUrl(withNotrack("/api/stats?token=definitely-not-a-real-stats-token")),
    { headers: headers() }
  );
  expect([401, 404]).toContain(res.status());
  const body = await res.text();
  expect(/"visitors"\s*:/.test(body)).toBe(false);
});

test("/stats without token must not show data", async ({ page }) => {
  const res = await gotoQuiet(page, "/stats");
  const status = res?.status() ?? 0;
  // notFound => 404, or a soft empty gate page — either way no analytics numbers.
  expect(status === 404 || status === 401 || status === 200).toBe(true);
  const text = (await page.locator("body").innerText()).toLowerCase();
  if (status === 200) {
    expect(text).not.toMatch(/site analytics/);
    expect(text).not.toMatch(/pageviews/);
  }
});

test("/api/track rejects garbage bodies without 500", async ({ request }) => {
  const url = absoluteUrl("/api/track");

  const huge = await request.post(url, {
    headers: { ...headers(), "Content-Type": "application/json" },
    data: "x".repeat(50_000),
  });
  expect(huge.status()).toBeLessThan(500);
  expect(huge.status()).not.toBe(200);

  const badJson = await request.post(url, {
    headers: { ...headers(), "Content-Type": "application/json" },
    data: "{not-json",
  });
  expect(badJson.status()).toBeLessThan(500);
  expect([400, 204, 413, 415]).toContain(badJson.status());

  const wrongMethod = await request.get(url, { headers: headers() });
  expect(wrongMethod.status()).toBeLessThan(500);
  expect([405, 404, 400]).toContain(wrongMethod.status());
});

test("/api/track with bot UA is accepted-but-ignored (or rejected), no write required", async ({
  request,
}) => {
  const res = await request.post(absoluteUrl("/api/track"), {
    headers: { ...headers(), "Content-Type": "application/json" },
    data: {
      vid: "00000000-0000-4000-8000-000000000001",
      type: "pageview",
      path: "/home",
      visit: true,
      ref: "",
      refFirst: "",
      refLast: "",
      referrerDomain: "",
    },
  });
  // Bot UA short-circuits to 204 (ignored) or may be rejected — never 500, never proves a write.
  expect(res.status()).toBeLessThan(500);
  expect([204, 400, 401, 403, 404]).toContain(res.status());
});

test("/api/stats?range=999 does not 500", async ({ request }) => {
  const res = await request.get(absoluteUrl(withNotrack("/api/stats?range=999")), {
    headers: headers(),
  });
  expect(res.status()).toBeLessThan(500);
});
