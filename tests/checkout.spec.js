// Tests for the checkout (buying) steps.

const { test, expect } = require('@playwright/test');
const { login } = require('../helpers/login');

test.describe('Checkout', () => {

  // Before each test: log in, add a product, open the cart, click Checkout
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="shopping-cart-link"]');
    await page.click('[data-test="checkout"]');
  });

  test('user can complete a purchase', async ({ page }) => {
    // Step 1: fill the customer details
    await page.fill('[data-test="firstName"]', 'Asha');
    await page.fill('[data-test="lastName"]', 'Perera');
    await page.fill('[data-test="postalCode"]', '10120');
    await page.click('[data-test="continue"]');

    // Step 2: review the order, then finish
    await page.click('[data-test="finish"]');

    // Check: the "thank you" message is shown
    await expect(page.locator('[data-test="complete-header"]')).toHaveText(
      'Thank you for your order!'
    );
  });

  test('first name is required', async ({ page }) => {
    // Leave first name empty on purpose
    await page.fill('[data-test="lastName"]', 'Perera');
    await page.fill('[data-test="postalCode"]', '10120');
    await page.click('[data-test="continue"]');

    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });
});
