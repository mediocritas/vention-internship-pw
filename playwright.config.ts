import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({

  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 2,
  workers: process.env.CI ? 1 : 4,
  reporter: 'html',

  use: {
    actionTimeout: 40000,
    trace: 'on',
    screenshot: 'on',
    video: {
      mode: 'on-first-retry',
      size: { width: 640, height: 480 }
    }
  },

  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },

    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        storageState: '.auth/user.json',
      },
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        storageState: '.auth/user.json',
      },
      dependencies: ['setup'],
    },

    {
      name: 'webkit',
      use: {
        browserName: 'webkit',
        storageState: '.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ]
});
