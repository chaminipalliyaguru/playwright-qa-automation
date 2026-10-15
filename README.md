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

Every test file has comments explaining each step. Start by reading `tests/login.spec.js`.

## Test cases (what is checked)

| ID | Area | Test case | Expected result |
| --- | --- | --- | --- |
| L1 | Login | Valid username and password | Products page opens |
| L2 | Login | Wrong password | Error: username and password do not match |
| L3 | Login | Locked-out user | Error: user is locked out |
| L4 | Login | Empty username | Error: username is required |
| C1 | Cart | Add one product | Cart icon shows 1 |
| C2 | Cart | Add, then remove a product | Cart icon number disappears |
| C3 | Cart | Open the cart page | Added product is listed |
| K1 | Checkout | Fill all details and finish | "Thank you for your order!" |
| K2 | Checkout | Leave first name empty | Error: first name is required |
| A1 | API | GET /ping | Status 201 |
| A2 | API | POST /booking | Status 200, booking id returned |
| A3 | API | GET /booking/{id} | Status 200, correct data returned |

## The idea behind every test

```
1. DO something     (open page, type, click)
2. CHECK the result (expect ... )
```

If the check is wrong, the test fails and Playwright saves a screenshot.

## Words to know

- **Test case:** one scenario to check, like "wrong password shows an error".
- **Assertion (`expect`):** the line that decides pass or fail.
- **UI test:** tests what a user sees and clicks in a browser.
- **API test:** talks to the server directly and checks the answer. It is faster than a UI test.
- **Positive test:** valid input should work. **Negative test:** invalid input should be rejected.
- **Status code:** the server's answer number (200 = OK, 201 = created/alive, 404 = not found, 403 = forbidden).

## For my CV

> **QA Automation Project (Playwright, JavaScript):** Automated 12 UI and API test cases for an e-commerce website and a booking API, covering login, cart, checkout and CRUD requests. Wrote both positive and negative tests and generated HTML reports with failure screenshots.

## Ideas to extend it (optional)

- Add a test for sorting products by price.
- Write a bug report for something you find (title, steps, expected result, actual result).
- Try the `problem_user` login on SauceDemo and see what breaks.
- Push the project to GitHub and add a link to your CV.
