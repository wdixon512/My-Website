import { defineConfig, devices } from "@playwright/test";
import { BASE_URL, BOT_UA, bypassHeaders } from "./helpers";

const bypass = bypassHeaders();

export default defineConfig({
  testDir: ".",
  testMatch: /.*\.spec\.ts/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [["list"], ["html", { open: "never", outputFolder: "../../playwright-report" }]],
  outputDir: "../../test-results",
  use: {
    baseURL: BASE_URL,
    userAgent: BOT_UA,
    extraHTTPHeaders: bypass,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "off",
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], userAgent: BOT_UA },
    },
  ],
});
