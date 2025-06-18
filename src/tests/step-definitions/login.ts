import { Given,When,Then,} from "@cucumber/cucumber";
import { Page, Browser, chromium, expect } from "@playwright/test";

  let browser: Browser;
  let page: Page;

  Given('A web browser is at the saucelabs login page', async function () {
    // Add this to the launch options to run the tests in headless mode: {headless: false}
    browser = await chromium.launch({headless: false});
    page = await browser.newPage();
    await page.goto('https://www.saucedemo.com/');
    await page.waitForTimeout(2000);
  });

  When('A user enters the username {string}, the password {string}, and clicks on the login button', async function (username: string, password: string) {
    await page.fill('input[data-test="username"]', username);
    await page.fill('input[data-test="password"]', password);
    await page.click('input[data-test="login-button"]');
    await page.waitForTimeout(2000);
  }); 

  Then('the url will contains the inventory subdirectory', async function () {
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await page.waitForTimeout(2000);
    await browser.close();
  });
 