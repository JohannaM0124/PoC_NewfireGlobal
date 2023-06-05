//This class contains all the elements and their functionalities regarding the shopping cart screen
class ShoppingCartPage {
  cbxTermsOfService = '#termsofservice'
  btnCheckout = '#checkout'
  msgShoppingCart = 'order-summary-content'
 
  checkout() {
    cy.log('Select on CheckBox terms of service')
    cy.get(this.cbxTermsOfService).should('be.empty').click()
    cy.log('Click on CheckOut button')
    cy.get(this.btnCheckout).click()
  }

  checkShoppingCartSuccessfulMessage(message) {
    cy.get(this.msgShoppingCart).should('contain.text', message)
  }
}
export const shoppingCartPage = new ShoppingCartPage()
