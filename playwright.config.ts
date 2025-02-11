import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const testSettings = {
  envVars: {
    login: process.env.LOGIN || 'defaultLogin',
    password: process.env.PASSWORD || 'defaultPassword',
    emailSubject: process.env.SUBJECT || 'Test Email',
    fileName: process.env.FILE_NAME || 'Test fileName',
    textForTest: process.env.TEXTBOX_TEXT || 'randomTextForTest',
    maxRetries: process.env.MAX_RETRIES || 20,
    baseURL: process.env.BASE_URL || 'https://mailfence.com/en/',
    domain: process.env.DOMAIN || '@mailfence.com',
  },
};

export default defineConfig({

  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    trace: 'on-first-retry',
    ...testSettings,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ]
});
