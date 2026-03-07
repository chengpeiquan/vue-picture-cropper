import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  globalSetup: './global-setup.mjs',
  globalTeardown: './global-teardown.mjs',
  use: {
    baseURL: 'http://127.0.0.1:41732',
    trace: 'on-first-retry',
  },
})
