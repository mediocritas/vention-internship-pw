import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import { defineBddConfig } from 'playwright-bdd';

dotenv.config();

export default defineConfig({

  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 4,
  reporter: 'html',

  use: {
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
      name: 'bdd',
      testDir: defineBddConfig({
        features: './tests/features/*.feature',
        steps: './tests/step-definitions/*.ts',
        importTestFrom: './src/core/fixtures/bdd-fixture.ts'
      }),
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
