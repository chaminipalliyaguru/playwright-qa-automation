# QA Intern Project: Playwright Test Automation (JavaScript)

A small, beginner-friendly project that automatically tests a practice website and a practice API.

- **Website tested:** [SauceDemo](https://www.saucedemo.com), a practice online shop
- **API tested:** [Restful-Booker](https://restful-booker.herokuapp.com), a practice hotel-booking service
- **Tools:** Playwright, JavaScript, Node.js
- **Total tests:** 12

## How to run it

1. Install [Node.js](https://nodejs.org) (the LTS version).
2. Open a terminal in this folder and run:

```bash
npm install
npx playwright install chromium
npm test
```

A Chrome window opens and the tests run by themselves, slowly, so you can watch. When finished, open the report with:

```bash
npm run report
```

Other commands:

```bash
npm run test:ui      # website tests only
npm run test:api     # API tests only
npx playwright test tests/login.spec.js    # one file only
```

## Project files

```
tests/login.spec.js      4 tests  - login page
tests/cart.spec.js       3 tests  - shopping cart
tests/checkout.spec.js   2 tests  - buying a product
tests/api.spec.js        3 tests  - booking API
helpers/login.js         login steps used by other tests
playwright.config.js     settings (website address, browser window, report)
```


