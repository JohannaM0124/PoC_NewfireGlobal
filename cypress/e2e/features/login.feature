Feature: Login page

  Background:
    Given The user is on the home page

  @login @e2e
  Scenario: Success Login
    When The user creates a customer account
      And Login with valid credentials
    Then The button logout should be visible

  @logout @e2e
  Scenario: Success Logout
    When Login with valid credentials
    Then The button logout should be visible