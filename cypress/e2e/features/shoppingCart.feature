Feature: shopping cart page

  Background:
    Given The user is on the home page

  @shoppingCart @e2e
  Scenario: Success product added at shopping cart
    When The user Adds a product from search bar
    Then Checks the shopping cart quantity

  @ShoppingCartCompleteTheOrderByCreditCard
  Scenario: Confirm the order as guest user with credit card
    When The user Adds a product from search bar
      And Goes to the shoppingCart page and checkout as guest user
      And Completes the data to confirm the order purchase with "CreditCard"
    Then The message "Your order has been successfully processed!" is displayed

  @ShoppingCartCompleteTheOrderByCheck
  Scenario: Confirm the order as guest user with Check/Money order
    When The user Adds a product from search bar
      And Goes to the shoppingCart page and checkout as guest user
      And Completes the data to confirm the order purchase with "Check"
    Then The message "Your order has been successfully processed!" is displayed