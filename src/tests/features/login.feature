Feature: Login Functionality by different ways
     Feature Login page will work depending on the user credentials.

# Simple Login by passing login details
    Scenario: Simple Login by passing login details
    Given A web browser is at the saucelabs login page
    When A user enters the username "standard_user", the password "secret_sauce", and clicks on the login button
    Then the url will contains the inventory subdirectory
    Then click on the Add to cart button

# Login with Excel data
    Scenario: Login with Excel data
    Given A web browser is at the saucelabs login page
    When I have test data from "E:/PlayWright/playwright-cucumber-starter-1.0/src/TestData/testcases.xlsx" for test case "TC001"   
    When I login with credentials from Excel
    Then I should see the expected result from Excel
    Then the url will contains the inventory subdirectory
    Then click on the Add to cart button

# Login with different credentials
    Scenario Outline: Login with different credentials
    Given A web browser is at the saucelabs login page
    When I enter "<username>" and "<password>"
    Then I should see "<result>"

    Examples:
      | username         | password       | result                                   |
      | standard_user    | secret_sauce   | https://www.saucedemo.com/inventory.html |
      | invalid          | wrongpass      | error message                            |

# Login with Data Tables for Complex Parameters
     Scenario: Login with Data Tables for Complex Parameters
     Given A web browser is at the saucelabs login page
     When I enter the following details:
          | Field         | Value                                       |
          | username      | standard_user                               |
          | password      | secret_sauce                                |
          | result        | https://www.saucedemo.com/inventory.html    |
          
     Then Login should be successful
        | Field         | Value                                        |
        | result        | https://www.saucedemo.com/inventory.html     | 

