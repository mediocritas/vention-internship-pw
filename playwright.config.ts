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
  timeout: 60 * 2_000,
  expect: { timeout: 10_000 }, 
  
  use: {
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
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
        launchOptions: {args: ['--disable-modal-animations', '--disable-blink-features=CSSAnimation,CSSTransitions']},
      },
      dependencies: ['setup'],
    },
    {
      name: 'bdd',
      use: {
        browserName: 'chromium',
        storageState: '.auth/user.json',
        launchOptions: {args: ['--disable-modal-animations', '--disable-blink-features=CSSAnimation,CSSTransitions']},
      },
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
