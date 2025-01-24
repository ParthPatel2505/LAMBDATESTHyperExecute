const { test, chromium } = require('@playwright/test');
const path = require('path');
require('dotenv').config();

// LambdaTest HyperExecute capabilities
const capabilities = {
  'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
  'browserVersion': 'latest',
  'LT:Options': {
    'platform': process.env.HYPEREXECUTE_PLATFORM || 'Windows 10', // Ensure default platform is set
    'build': 'Playwright HyperExecute Build',
    'name': 'Playwright HyperExecute Test',
    'user': process.env.LT_USERNAME,
    'accessKey': process.env.LT_ACCESS_KEY,
    'video': true,
    'console': true,
    'network': true,  // Optionally capture network logs
    'visual': true, // Capture visual tests (if needed)
    'seleniumVersion': '4.0' // Specify Selenium version if using Selenium-based tests
  }
};

// Modify capabilities dynamically based on the test name and configuration
const modifyCapabilities = (configName, testName) => {
  let config = configName.split('@lambdatest')[0];
  let [browserName, browserVersion] = config.split(':');
  capabilities.browserName = browserName ? browserName : capabilities.browserName;
  capabilities.browserVersion = browserVersion ? browserVersion : capabilities.browserVersion;
  capabilities['LT:Options']['name'] = testName;
};

// Get error messages (for reporting)
const getErrorMessage = (obj, keys) => keys.reduce((obj, key) => (typeof obj == 'object' ? obj[key] : undefined), obj);

// Playwright Test Hooks
test.extend({
  page: async ({ page, playwright }, use, testInfo) => {
    // Configure LambdaTest platform for cross-browser testing
    let fileName = testInfo.file.split(path.sep).pop();
    if (testInfo.project.name.match(/lambdatest/)) {
      modifyCapabilities(testInfo.project.name, `${testInfo.title} - ${fileName}`);

      // Connect to LambdaTest using Playwright
      const browser = await chromium.connect({
        wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
      });

      const ltPage = await browser.newPage(testInfo.project.use);
      await use(ltPage);

      // Report test status to LambdaTest HyperExecute platform
      const testStatus = {
        action: 'setTestStatus',
        arguments: {
          status: testInfo.status,
          remark: getErrorMessage(testInfo, ['error', 'message'])
        }
      };

      // Send status to HyperExecute platform
      await ltPage.evaluate(async (status) => {
        const response = await fetch("https://hyperexecute.lambdatest.com/api/v1/teststatus", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.LT_ACCESS_KEY}` // Use access key for authentication
          },
          body: JSON.stringify(status)
        });
        const data = await response.json();
        console.log(data); // Log response from HyperExecute API
      }, testStatus);

      // Close the browser and page
      await ltPage.close();
      await browser.close();
    } else {
      // If running locally (when not using LambdaTest platform)
      await use(page);
    }
  }
});
