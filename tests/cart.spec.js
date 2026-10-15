// Tests for the shopping cart.
// Each test logs in first using our small helper.

const { test, expect } = require('@playwright/test');
const { login } = require('../helpers/login');

test.describe('Shopping cart', () => {

  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('adding a product shows 1 on the cart icon', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // The small red number on the cart icon should be "1"
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });

  test('removing a product clears the cart icon number', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="remove-sauce-labs-backpack"]');

    // After removing, the red number should disappear (0 elements found)
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
  });

  test('cart page shows the product that was added', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Click the cart icon to open the cart page
    await page.click('[data-test="shopping-cart-link"]');

    await expect(page).toHaveURL(/cart/);
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(
      'Sauce Labs Backpack'
    );
  });
});
