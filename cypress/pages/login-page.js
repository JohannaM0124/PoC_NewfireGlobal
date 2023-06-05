//This class contains all the elements and their functionalities regarding the login screen
class LoginPage {
  flduserName = '#Email'
  fldPassword = '#Password'
  btnLogin = '.login-button'
  lblError = '.message-error'
  btnRegister = '.new-wrapper > .buttons > .button-1'

  open() {
    cy.log('Opening the Login page')
    // cy.visit('/login') Also You can use this command line.
    cy.visit(Cypress.config('baseUrl') + 'login')
  }

  login(username, password) {
    cy.log(
      `Logging into the application. Username: %s, Password: %s`,
      username,
      password,
    )
    cy.get(this.flduserName).type(username)
    cy.get(this.fldPassword).type(password)
    cy.get(this.btnLogin).click()
  }

  getErrorMsg() {
    cy.log('reviewing the error message')
    return cy.get(this.lblError)
  }

  clickOnRegisterButton() {
    cy.get(this.btnRegister).click()
  }
}

export const loginPage = new LoginPage()
