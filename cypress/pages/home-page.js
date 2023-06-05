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
