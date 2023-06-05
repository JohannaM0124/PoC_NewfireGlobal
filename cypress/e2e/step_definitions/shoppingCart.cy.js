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
