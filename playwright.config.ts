import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E configuration for NusantaraTools.
 * Docs: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Directory where E2E tests live
  testDir: "./tests/e2e",

  // Run all tests in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter: 'html' for local review, 'dot' for CI
  reporter: process.env.CI ? "dot" : "html",

  use: {
    // Base URL for all tests — use page.goto('/') instead of full URL
    baseURL: "http://localhost:3000",

    // Collect trace on first retry for debugging
    trace: "on-first-retry",

    // Take screenshots on failure
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // Uncomment for full cross-browser testing (slower locally)
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    // Mobile viewports
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],

  // Auto-start the Next.js dev server before running E2E tests
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
