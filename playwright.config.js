// Playwright settings. Everything here is optional, but these are the useful ones.
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  // Folder where Playwright looks for test files (*.spec.js)
  testDir: './tests',

  // A test fails if it takes longer than 30 seconds
  timeout: 30000,

  // Show results in the terminal AND create an HTML report
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    // The website we test. In tests, page.goto('/') opens this address.
    baseURL: 'https://www.saucedemo.com',

    // Show the real browser window so you can watch the test run.
    // Change to true (or delete this line) to run without a window.
    headless: false,

    // Slow every action by 0.5 second so your eyes can follow it.
    // Delete this line to run at full speed.
    launchOptions: { slowMo: 500 },

    // Save a picture of the page when a test fails
    screenshot: 'only-on-failure',
  },
});
