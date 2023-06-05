//This class contains all the elements and their functionalities regarding the register screen
import { utils } from '@support/helpers/utils'

class RegisterPage {
  fldFirstName = '#FirstName'
  fldLastName = '#LastName'
  fldEmail = '#Email'
  fldPassword = '#Password'
  fldConfirmPassword = '#ConfirmPassword'
  btnRegister = '#register-button'
  txtCompleRegistration = '.result'

  fillFirstName() {
    cy.get(this.fldFirstName).type('nopCommerceTest')
  }

  fillLastName() {
    cy.get(this.fldLastName).type('customer account')
  }

  fillEmail(email) {
    cy.get(this.fldEmail).type(email)
  }

  fillPassword() {
    cy.get(this.fldPassword).type(Cypress.env('password'))
  }

  fillConfirmPassword() {
    cy.get(this.fldConfirmPassword).type(Cypress.env('password'))
  }

  clickOnRegisterButton() {
    cy.get(this.btnRegister).click()
  }

  checkCreationAccountSuccess() {
    let expectedMessage = 'Your registration completed'
    cy.get(this.txtCompleRegistration).then((x) => {
      let actualSuccessMessage = x.text()
      assert.equal(
        actualSuccessMessage,
        expectedMessage,
        '== The values are correct',
      )
    })
  }

  accountCreation(email) {
    this.fillFirstName()
    this.fillLastName()
    this.fillEmail(email)
    this.fillPassword()
    this.fillConfirmPassword()
    this.clickOnRegisterButton()
    this.checkCreationAccountSuccess()
  }

  /**
   * Creating a custon new customer account with random number to avoit existing customer account
   * @returns new random email
   */
  createNewCustomerEmailAccount() {
    return `nopcommerce.test.customer${utils.randomNumber()}@yopmail.com`
  }
}

export const registerPage = new RegisterPage()
