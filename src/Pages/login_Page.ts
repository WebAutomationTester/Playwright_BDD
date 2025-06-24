import { Page, Locator } from '@playwright/test';
import { BasePage } from "../Pages/base_Page.ts";

  export class LoginPage extends BasePage{
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        super(page);
        this.addToCartButton = page.locator('#add-to-cart-sauce-labs-backpack');     
    }

      async clickLogin() {
         await this.clickElement(this.addToCartButton); 
    }

    // async searchFor(text: string) {
    //     await this.typeText(this.searchInput, text);
    //     await this.clickElement(this.searchButton);
    // }

    // async verifyWelcomeMessage(text: string) {
    //     await this.verifyElementText(this.welcomeMessage, text);
    // }
}