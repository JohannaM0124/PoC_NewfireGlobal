# CYPRESS-TEST-AUTOMATION-FRAMEWORK

## Description

The POC involves the development of automated UI (User Interface) tests using Cypress, a JavaScript-based end-to-end testing framework. 
Some typical scenarios that will be addressed include:

User registration: The automated test will simulate the process of registering a new user on nopCommerce.com, verifying that all required fields are correctly filled and a successful registration confirmation is generated.

Navigation and product search: Tests will be performed to verify that category navigation and search functionality work correctly. This will include searching for specific products and validating the obtained results.

Adding products to the cart and completing the checkout process: The POC will automate the process of adding products to the shopping cart and completing the payment flow, verifying that the selected products are correctly reflected in the cart and that the payment information is processed correctly.

User account management: Tests will be conducted to ensure that login functionality, updating personal information, and changing passwords work correctly.

During test execution, Cypress will record interactions with the website, take screenshots, and generate detailed reports of the results.

## Features

- Web test automation (supported by Cypress)
- Cucumber HTML reports integration

---

> With this repo you can run test suite, and individual test cases using:

- NodeJS
- NPM
- Cypress
- Gherkin syntax using cucumber
- multiple-cucumber-html-report
- JavaScript

---

## Installation

1. Clone Github repository:

**SSH:**

```bash
$ git clone git@github.com:JohannaM0124/PoC_NewfireGlobal.git
```

**HTTP:**

```bash
$ git clone https://github.com/JohannaM0124/PoC_NewfireGlobal.git
```

2. Search the folder project:

```bash
$ cd base_poc_newfireglobal
```

3. Install cypress dependencies using this command line

```bash
$ npm install
```

4. Check the **node_modules** folder exist on the project:

---

## Usage:

Integration tests are stored in the following folder:

```text
cypress\e2e\features\
```

Demo Examples:

```text
cypress\e2e\features\.feature
```

---

## Dependencies installed to run the cypress framework:

```json
"devDependencies": {
  "@badeball/cypress-cucumber-preprocessor": "^17.2.1",
    "@bahmutov/cypress-esbuild-preprocessor": "^2.2.0",
    "@deepakvishwakarma/cucumber-json-formatter": "^0.0.3",
    "cypress": "^12.13.0",
    "esbuild": "^0.17.19",
    "multiple-cucumber-html-reporter": "^3.4.0"
  }
```

---

## Project structure:

- **Test cases:** cypress\e2e\features\.feature -> Main test case folder, another directory can be created as long as it is created within cypress/e2e
- **Fixtures:** cypress\fixtures -> Fixtures are used to store static data such as JSON, CSV, or any other file types. These files can then be accessed and used in your Cypress tests
- **commands:** cypress\support\commands.js -> File where you can define custom commands that can be used throughout your Cypress tests. These custom commands can help you to write more concise and readable tests by abstracting away repetitive or complex code into reusable functions.
- **helpers:** cypress\support\helpers -> Some function that allow to create a general methods to use it in another class or test file.
- **pages:** cypress\pages -> Page Object Files are a design pattern that can help you to write more maintainable and scalable tests. The basic idea is to create a separate JavaScript file for each page
- **reports:** cypress\reports ->Multiple Cucumber html Reports is a reporting module for Cucumber to parse the JSON output to a beautiful report.
- **screenshots:** After fail execution are created on this path: cypress\screenshots
- **videos** After headed and headless execution are created on this path: cypress\videos
- **CHANGELOG.md:** Some important implementation in the framework
- **cypress.config.js:** Browser, environment variables, baseUrl setup also video screenshot path and retries.
- **Package.json:** Project information, Dependencies and script to run NPM Commands.

---

## Pages - Page Object Pattern

Page object pattern is a way to minimise the percentage of repetitive code and to make the code more maintainable by separating the implementation of test scripts into the following sections:

- Locators of elements, Page functionality
- Test scripts

Advantages of Page objects:

- Increased Reusability: The page object methods can be reused across different test cases/test suites. Hence, the overall code size will reduce by a good margin due to the increase in the page method reusability factor.
- Improved Maintainability: As the test scenarios and locators are stored separately, it makes the code cleaner, and less effort is spent on maintaining the test code.
- Minimal impact due to UI changes: Even if there are frequent changes in the UI, changes might only be required in the object repository part of the page object class. There is minimal to no impact on the implementation of the test scenarios.

Example:

Test script: cypress\e2e\step_definitions\shoppingCart.cy.js

```javascript
/// <reference types="cypress" />
import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { productDescription } from '@pages/productDescription-page'
import { searchResultPage } from '@pages/searchResult-page'
import products from '@fixtures/products'
import { checkoutPage } from '@pages/checkout-page'
import { shoppingCartPage } from '@pages/shoppingCart-page'

When('The user Adds a product from search bar', () => {
  cy.log('Adding a product from search bar without login')
  searchResultPage.searchAndSelectProduct(products.productList[0].nameProduct)
  productDescription.getQtyOfProductsOnTheShoppingCar(0)
  productDescription.validateTheProductDescriptionHasTheCurrentSearch(
    products.productList[0].nameProduct,
  )
  productDescription.addProductToShoppingCart()
})

Then('Checks the shopping cart quantity', () => {
  productDescription.getQtyOfProductsOnTheShoppingCar(1)
})

When('Goes to the shoppingCart page and checkout as guest user', () => {
  productDescription.clickOnShoppingCartLink()
  shoppingCartPage.checkout()
  checkoutPage.clickCheckoutAsGuest()
})

When(
  'Completes the data to confirm the order purchase with {string}',
  (paymentMethod) => {
    checkoutPage.fillAndFinishCheckoutProcess(paymentMethod)
  },
)

Then('The message {string} is displayed', (message) => {
  checkoutPage.checkOrderSuccessfulMessage(message)
})
```

Page: home-page.js

- cypress\support\pages\home-page.js

```javascript
//profile locators
class HomePage {
  btnLogout = '.ico-logout'
  btnLogin = '.ico-login'
  fldSearchStore = '#small-searchterms'
  
  open() {
    cy.log('Opening the Home page')
    // cy.visit('/') Also You can use this command line.
    cy.visit(Cypress.config('baseUrl'))
  }

  logout() {
    cy.log('Logout the App')
    cy.get(this.btnLogout).should('have.text', 'Log out')
    cy.get(this.btnLogout).click()
    cy.get(this.btnLogin).should('have.text', 'Log in')
    cy.getTextAndCompareFromAnyElement('Log in', this.btnLogin)
  }

  fillSearchStore(product) {
    cy.get(this.fldSearchStore).type(product).type('{enter}')
  }
}

export const homePage = new HomePage()
```

---

## Naming Locators

This table show the prefix used on this project:

|     Element      | Prefix |                                       Example                                       |
| :--------------: | :----: | :---------------------------------------------------------------------------------: |
| Field / textbox  |  fld   |                        `fldCity = '#BillingNewAddress_City'`                        |
|      Button      |  btn   | `btnBillingContinue = '#billing-buttons-container > .new-address-next-step-button'` |
|       Text       |  txt   |                 `txtOrderProcessed = '.section > .title > strong'`                  |
|     Dropdown     |  ddn   |                    `ddnCountry = '#BillingNewAddress_CountryId'`                    |
|   Radio button   |  rbt   |                        `rbtCheckOption = '#paymentmethod_0'`                        |
|       List       |  lst   |                           `lstSearchResults = '.picture'`                           |
|       Link       |  lnk   |                         `lnkShoppingCart = '#topcartlink'`                          |
|      Label       |  lbl   |                            `lblError = '.message-error'`                            |
|     CheckBox     |  cbx   |                       `cbxTermsOfService = '#termsofservice'`                       |
|       Row        |  row   |                             `rowItemsQty ='.quantity'`                              |
| Message / Banner |  msg   |                     `msgTopBannerAddedCartMessage = '.content'`                     |

---

## Run the project:

## **NPM** commands to run the test cases via terminal: **package.json**

> The default browser is Electron.

```bash
$ npm test
- This command line opens the Cypress UI executing this: npx cypress open
```

```bash
$ npm run localHeadlessMode
- This command line runs the whole list of existing test cases with the default Electron browser without open it.
```

```bash
$ npm run localHeadedMode
- This command line runs the whole list of existing test cases with the default openning browser.
```

```bash
$ npm run localSpecificTestCaseByHlessMode
- This command line runs the specific test case with the default browser.
```

## Local terminal Execution:

```bash
$ npx cypress run --spec cypress/e2e/features/shoppingCart.feature --headless
- This command line runs the specific test case by terminal with the headless mode:
```

```bash
$ npx cypress run --spec "cypress\e2e\features/<name-of-the-specific-test.feature> --browser <<browser name>> --headed"
- - This command line runs the specific test case by terminal with the headed mode with custom browser:

- Example:
$ npx cypress run --spec cypress\e2e\features\login.feature --browser chrome --headed
```