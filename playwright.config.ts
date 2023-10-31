import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './e2e',
  timeout: 50000,
  webServer: {
    url: 'http://127.0.0.1:5173',
    command: 'pnpm prepare:e2e'
  },
  use: {
    headless: true //没有ui界面的无头浏览器
  }
};

export default config;
