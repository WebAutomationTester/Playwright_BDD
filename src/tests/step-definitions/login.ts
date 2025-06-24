import { Given,When,Then,} from "@cucumber/cucumber";
import { Page, Browser, chromium, expect } from "@playwright/test";
import * as config from "../../TestData/config.json";
import { LoginPage } from "../../Pages/login_Page.ts";
import { ExcelReader } from '../../helper/util/excelReader.ts';

 
  let browser: Browser;
  let page: Page;
  let log: LoginPage;
  

  Given('A web browser is at the saucelabs login page', async function () {
    // Add this to the launch options to run the tests in headless mode: {headless: false}
    browser = await chromium.launch({headless: false});
    page = await browser.newPage();
    //await page.goto('https://www.saucedemo.com/');
    await page.goto(config.baseUrl);
    await page.waitForTimeout(2000);
  });

  // Given('A web browser is at the saucelabs login page', async function () {

  // });

  When('A user enters the username {string}, the password {string}, and clicks on the login button', async function (username: string, password: string) {
    await page.fill('input[data-test="username"]', username);
    await page.fill('input[data-test="password"]', password);
    await page.click('input[data-test="login-button"]');
    await page.waitForTimeout(2000);
  }); 

  Then('the url will contains the inventory subdirectory', async function () {
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await page.waitForTimeout(2000);
    
  });

  Then('click on the Add to cart button', async() => {
    log = new LoginPage(page);
    await log.clickLogin();
    await page.waitForTimeout(2000);
    await browser.close();
  });

When('I have test data from {string} for test case {string}', async function (filePath: string, testCaseId: string) {
    // Read data from Excel and attach to scenario context
    this.testData = ExcelReader.getTestData(filePath, 'TestCases', testCaseId);
});

// Reading data from excel sheet
When('I login with credentials from Excel', async function () {
    const { username, password } = this.testData;
    await page.waitForTimeout(2000);
    await page.locator('css=input[data-test="username"]').fill(username);
    await page.locator('css=input[data-test="password"]').fill(password);
    await page.click('input[data-test="login-button"]');
});

Then('I should see the expected result from Excel', async function () {
    const expectedResult = this.testData.expectedResult;
    await expect(page).toHaveURL(expectedResult);
});

// Data passing by examples keyword
When('I enter {string} and {string}', async function (username: string, password: string) {
    await page.locator('css=input[data-test="username"]').fill(username);
    await page.locator('css=input[data-test="password"]').fill(password);
    await page.click('input[data-test="login-button"]');
});

Then('I should see {string}', async function (expectedResult: string) {
  if (expectedResult.includes('https://www.saucedemo.com/inventory.html')) {
    await expect(page).toHaveURL(expectedResult);
  } else {
    await console.log("Please enter the correct credentials..!!")
  }
});

//Data Tables for Complex Parameters
When('I enter the following details:', async function (dataTable: any) {
  const data = dataTable.rowsHash();
  await page.locator('css=input[data-test="username"]').fill(data['username']);
  await page.locator('css=input[data-test="password"]').fill(data['password']);
  await page.click('input[data-test="login-button"]');
});

 Then('Login should be successful', async function (dataTable: any) {
    const data1 = dataTable.rowsHash();
    await expect(page).toHaveURL(data1['result']);
 })
                                                                                     