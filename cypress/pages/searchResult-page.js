//profile locators
import { homePage } from '@pages/home-page'

class SearchResultPage {
  fldSearchKeywordResult = '#q'
  lstSearchResults = '.picture'

  checkResults(product) {
    cy.get(this.fldSearchKeywordResult).should('have.value', product)
    this.checkNumberOfElementOnList(this.lstSearchResults)
  }

  clickOnTheFirstResult() {
    cy.get(this.lstSearchResults).first().click()
  }

  /**
   * Use this method to check the number of element on a list
   * @param {*} locator: it can be (id, class, name, list ...)
   */
  checkNumberOfElementOnList(locator) {
    cy.get(locator)
      .its('length')
      .then((length) => {
        cy.get(locator).its('length').should('be.greaterThan', 0)
        cy.log('Number of results: ' + length)
      })
  }

  /**
   * Search for a product and select the first result
   * @param {*} product: name of the product to be searched and selected
   */
  searchAndSelectProduct(product) {
    cy.log(`Search a product: ${product}`)
    homePage.fillSearchStore(product)
    this.checkResults(product)
    this.clickOnTheFirstResult()
  }
}

export const searchResultPage = new SearchResultPage()
