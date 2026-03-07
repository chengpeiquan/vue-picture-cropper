import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e/tests',
  globalSetup: './e2e/global-setup.mjs',
  globalTeardown: './e2e/global-teardown.mjs',
  use: {
    baseURL: 'http://127.0.0.1:41731',
    trace: 'on-first-retry',
  },
})
