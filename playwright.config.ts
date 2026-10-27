import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/editing',
  timeout: 60_000,
  workers: 1,
  retries: 0,
  use: {
    baseURL: 'http://127.0.0.1:18767',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: 'node tests/serve-export.mjs',
    url: 'http://127.0.0.1:18767',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
