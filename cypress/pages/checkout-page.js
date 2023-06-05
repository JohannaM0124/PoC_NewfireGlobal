//This class contains all the elements and their functionalities regarding the checkout screen
class CheckoutPage {
  btnCheckoutAsGuest = '.checkout-as-guest-button'
  fldFirstName = '#BillingNewAddress_FirstName'
  fldLastName = '#BillingNewAddress_LastName'
  fldEmail = '#BillingNewAddress_Email'
  fldCity = '#BillingNewAddress_City'
  fldAddress1 = '#BillingNewAddress_Address1'
  fldZipCode = '#BillingNewAddress_ZipPostalCode'
  fldPhoneNumber = '#BillingNewAddress_PhoneNumber'
  ddnCountry = '#BillingNewAddress_CountryId'
  btnBillingContinue =
    '#billing-buttons-container > .new-address-next-step-button'
  btnShippingContinue = '#shipping-method-buttons-container > .button-1'
  btnPaymentMethodContinue = '#payment-method-buttons-container > .button-1'
  rbtCheckOption = '#paymentmethod_0'
  btnPaymentInfoContinue = '#payment-info-buttons-container > .button-1'
  btnConfirmOrder = '#confirm-order-buttons-container > .button-1'
  txtOrderProcessed = '.section > .title > strong'
  rbtCreditCardOption = '#paymentmethod_1'
  ddnCreditCardType = '#CreditCardType'
  fldCardHolderName = '#CardholderName'
  fldCardNumber = '#CardNumber'
  fldCardCode = '#CardCode'
  ddnExpireMonth = '#ExpireMonth'
  ddnExpireYear = '#ExpireYear'

  clickCheckoutAsGuest() {
    cy.get(this.btnCheckoutAsGuest).click()
  }

  clickShippingContinueBtn() {
    cy.get(this.btnShippingContinue).click()
  }

  clickPaymentMethodContinueBtn() {
    cy.get(this.btnPaymentMethodContinue).click()
  }

  selectPaymentMethod(paymentMethod) {
    if (paymentMethod == 'Check') {
      this.clickPaymentMethodContinueBtn()
    } else if (paymentMethod == 'CreditCard') {
      cy.get(this.rbtCreditCardOption).click()
      this.clickPaymentMethodContinueBtn()
      this.fillCreditCardData()
    }
  }

  clickPaymentInfoContinueBtn() {
    cy.get(this.btnPaymentInfoContinue).click()
  }

  clickConfirmButton() {
    cy.get(this.btnConfirmOrder).click()
  }

  checkOrderSuccessfulMessage(message) {
    cy.get(this.txtOrderProcessed).should('contain.text', message)
  }

  fillAndFinishCheckoutProcess(paymentMethod) {
    cy.fixture('billingData').then(({ billingData }) => {
      const {
        firstName,
        lastName,
        email,
        country,
        city,
        address1,
        zipCode,
        phoneNumber,
      } = billingData[0]
      cy.log('Fill data on checkout page')

      cy.get(this.fldFirstName).type(firstName)
      cy.get(this.fldLastName).type(lastName)
      cy.get(this.fldEmail).type(email)
      cy.get(this.ddnCountry).select(country)
      cy.get(this.fldCity).type(city)
      cy.get(this.fldAddress1).type(address1)
      cy.get(this.fldZipCode).type(zipCode)
      cy.get(this.fldPhoneNumber).type(phoneNumber)
    })
    cy.log('Finish checkout process')
    cy.get(this.btnBillingContinue).click()
    this.clickShippingContinueBtn()
    this.selectPaymentMethod(paymentMethod)
    this.clickPaymentInfoContinueBtn()
    this.clickConfirmButton()
  }

  fillCreditCardData() {
    cy.fixture('creditCard').then(({ creditCardData }) => {
      const {
        type,
        cardHolderName,
        creditCartNumber,
        expirationMonth,
        expirationYear,
        cvv,
      } = creditCardData[0]

      cy.log('Fill payment data on checkout page')

      cy.get(this.ddnCreditCardType).select(type)
      cy.get(this.fldCardHolderName).type(cardHolderName)
      cy.get(this.fldCardNumber).type(creditCartNumber)
      cy.get(this.ddnExpireMonth).select(expirationMonth)
      cy.get(this.ddnExpireYear).select(expirationYear)
      cy.get(this.fldCardCode).type(cvv)
    })
  }
}

export const checkoutPage = new CheckoutPage()
