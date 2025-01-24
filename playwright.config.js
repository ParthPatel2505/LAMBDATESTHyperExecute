import { defineConfig } from '@playwright/test';
//import dotenv from 'dotenv';

//dotenv.config();

// Common LambdaTest capabilities
const commonCapabilities = {
  browserVersion: 'latest',
  'LT:Options': {
    user: process.env.LT_USERNAME, // LambdaTest username
    accessKey: process.env.LT_ACCESS_KEY, // LambdaTest access key
    tunnel: false, // Set to true if testing behind a firewall
    console: true, // Enable console logs
    video: true, // Enable video recording
    build: `Playwright Build - ${new Date().getTes}`, // Build name
  },
};

// Generate capabilities for a specific browser and platform
const getCapabilities = (browserName, platform) => ({
  browserName, // LambdaTest-compatible browser name
  ...commonCapabilities,
  'LT:Options': {
    ...commonCapabilities['LT:Options'],
    platform,
    name: `Test on ${browserName} - ${platform} - ${new Date().toISOString()}`, // Test name
  },
});

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  timeout: 60000,

  use: {
    screenshot: 'on', // Enable screenshots for all tests
  },
  projects: [
    // Chromium on Windows
    {
      name: 'LambdaTest Chromium - Windows',
      use: {
        browserName: 'chromium', // Playwright-compatible browser name
        headless: true,
        trace: 'on',
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify(getCapabilities('Chrome', 'Windows 10')) // LambdaTest-compatible browser name
          )}`,
        },
      },
    },

    // Chromium on Linux
    {
      name: 'LambdaTest Chromium - Linux',
      use: {
        browserName: 'chromium',
        headless: true,
        trace: 'on',
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify(getCapabilities('Chrome', 'Linux'))
          )}`,
        },
      },
    },

    // Chromium on macOS
    {
      name: 'LambdaTest Chromium - macOS',
      use: {
        browserName: 'chromium',
        headless: true,
        trace: 'on',
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify(getCapabilities('Chrome', 'macOS Monterey'))
          )}`,
        },
      },
    },
  ],
});
