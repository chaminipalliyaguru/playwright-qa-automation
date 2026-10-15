// Tests for the Login page of https://www.saucedemo.com
//
// Pattern in every test:  1) do something   2) check the result (expect)

const { test, expect } = require('@playwright/test');

// test.describe groups related tests under one name in the report
test.describe('Login page', () => {

  // beforeEach runs before EVERY test in this group: open the login page
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('valid user can log in', async ({ page }) => {
    // Do: fill the form and click Login
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Check: we moved to the products page and it shows the title "Products"
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('wrong password shows an error', async ({ page }) => {
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'wrong_password');
    await page.click('[data-test="login-button"]');

    // Check: an error message appears with the expected text
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Username and password do not match'
    );
  });

  test('locked out user cannot log in', async ({ page }) => {
    await page.fill('[data-test="username"]', 'locked_out_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    await expect(page.locator('[data-test="error"]')).toContainText('locked out');
  });

  test('empty username shows an error', async ({ page }) => {
    // We only type a password and leave the username empty
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
  });
});
