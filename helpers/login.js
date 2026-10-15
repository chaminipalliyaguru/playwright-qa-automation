// A small helper used by several test files, so we don't repeat the login steps.
// It is NOT a test itself (its name does not end with .spec.js).

async function login(page) {
  // Open the website (address comes from baseURL in playwright.config.js)
  await page.goto('/');

  // Type the username and password into the two boxes
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');

  // Click the Login button
  await page.click('[data-test="login-button"]');
}

module.exports = { login };
