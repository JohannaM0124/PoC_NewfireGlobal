// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { loginPage } from "@pages/login-page";

Cypress.Commands.add("loginAsCustomer", (email) => {
  loginPage.login(email, Cypress.env("password"));

  //validate the url
  cy.url().should("include", Cypress.config("baseUrl"));
});

/**
 * Use this method to get and compare text of any element
 * @param {*} expectedElementText
 * @param {*} locator
 */
Cypress.Commands.add(
  "getTextAndCompareFromAnyElement",
  (expectedElementText, locator) => {
    // - expect - BDD
    cy.get(locator).then((x) => {
      let actualStatus = x.text();
      expect(actualStatus).to.contain(expectedElementText);
    });
  }
);