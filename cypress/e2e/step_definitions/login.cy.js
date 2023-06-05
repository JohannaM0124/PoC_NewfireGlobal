/// <reference types="cypress" />

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { registerPage } from '@pages/register-page'
import { homePage } from '@pages/home-page'
import { loginPage } from '@pages/login-page'

let emailCustomerAccount = registerPage.createNewCustomerEmailAccount()

/**
 * The https://demo.nopcommerce.com/ page has a particular way to manage the user create account,
 * When you want to create a new account you can see the process ends in the right way, but
 * you can use this account just for 20 minutes, to solve it, you will need to use this method:
 * registerPage.accountCreation() to create a new account before login on the page.
 */

Given('The user is on the home page', () => {
  loginPage.open()
})

When('The user creates a customer account', () => {
  //You need to create account before of logged
  cy.log('Click on the register button on the login page')
  loginPage.clickOnRegisterButton()
  registerPage.accountCreation(emailCustomerAccount)
  cy.log('Added email: ', emailCustomerAccount)
})

When('Login with valid credentials', () => {
  // login as Customer
  loginPage.open()
  cy.loginAsCustomer(emailCustomerAccount)
})

Then('The button logout should be visible', () => {
  homePage.logout()
})
