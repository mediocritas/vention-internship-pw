import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const testSettings = {
  maxRetries: 20,
  baseURL: 'https://mailfence.com/en/',
  timeout: 30000,
  envVars: {
    login: process.env.LOGIN || 'defaultLogin',
    password: process.env.PASSWORD || 'defaultPassword',
    emailSubject: process.env.SUBJECT || 'Test Email',
    fileName: process.env.FILE_NAME || 'Test fileName',
    textForTest: process.env.TEXTBOX_TEXT || 'randomTextForTest',
  },
  filePath: path.resolve(process.env.FILE_NAME || 'Test fileName')
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
