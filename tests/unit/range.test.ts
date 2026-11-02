import { test } from "node:test";
import assert from "node:assert/strict";
import { parseRange } from "../../lib/analytics/range.ts";
import { isBotUa } from "../../lib/analytics/sanitize.ts";

test("range=1 returns 1 day (was silently 7)", () => {
  assert.equal(parseRange("1"), 1);
  assert.equal(parseRange("1d"), 1);
  assert.equal(parseRange("today"), 1);
  assert.equal(parseRange("30"), 30);
  assert.equal(parseRange(undefined), 7);
  assert.equal(parseRange("bogus"), 7);
  assert.equal(parseRange(["30"]), 30);
});

test("real browser UAs are not filtered as bots", () => {
  for (const ua of [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15",
    "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:132.0) Gecko/20100101 Firefox/132.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0",
    "Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/26.0 Chrome/122.0.0.0 Mobile Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [LinkedInApp]/9.30",
  ]) assert.equal(isBotUa(ua), false, ua);
  assert.equal(isBotUa("Mozilla/5.0 (compatible; ahprice-regression-bot/1.0)"), true);
  assert.equal(isBotUa("Googlebot/2.1"), true);
});
