//This class contains all the elements and their functionalities regarding the product description page
class ProductDescription {
  txtCartQty = ".cart-qty";
  txtProductName = "h1";
  btnAddToCart = ".add-to-cart-panel button";
  msgTopBannerAddedCartMessage = ".content";
  btnCloseTopBanner = ".close";
  lnkShoppingCart = "#topcartlink";

  getQtyOfProductsOnTheShoppingCar(shoppingCartQty) {
    cy.get(this.txtCartQty)
      .invoke("text")
      .then((value) => {
        const actualValue = parseInt(value.replace(/[^0-9]/g, ""));
        cy.log(`The shopping cart Qty is:  ${actualValue}`);
        expect(actualValue).to.equal(shoppingCartQty);
      });
  }

  validateTheProductDescriptionHasTheCurrentSearch(product) {
    cy.getTextAndCompareFromAnyElement(product, this.txtProductName);
  }

  clickOnAddToCartButton() {
    cy.get(this.btnAddToCart).click();
  }

  validateTheGreenBannerAtTheTop() {
    let greenBannerMessage = "The product has been added";
    cy.getTextAndCompareFromAnyElement(
      greenBannerMessage,
      this.msgTopBannerAddedCartMessage
    );
  }

  closeTopBanner() {
    cy.get(this.btnCloseTopBanner).click();
  }

  addProductToShoppingCart() {
    this.clickOnAddToCartButton();
    this.validateTheGreenBannerAtTheTop();
    this.closeTopBanner();
  }

  clickOnShoppingCartLink() {
    cy.get(this.lnkShoppingCart).click();
  }
}

export const productDescription = new ProductDescription();
