import { Page, Locator, expect } from '@playwright/test';
import * as config from "../TestData/config.json"

export abstract class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(path: string = '') {
        await this.page.goto(`${config.baseUrl}${path}`);
    }

    async clickElement(locator: Locator) {
        await locator.click();
    }

    async typeText(locator: Locator, text: string) {
        await locator.fill(text);
    }

    async verifyElementText(locator: Locator, expectedText: string) {
        await expect(locator).toHaveText(expectedText);
    }

    async verifyElementVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    async takeScreenshot(name: string) {
        await this.page.screenshot({ path: `${config.screenshotPath}${name}-${new Date().toISOString().replace(/[:.]/g, '-')}.png` });
    }

    async handlePopup(accept: boolean = true) {
        this.page.on('dialog', async dialog => {
            if (accept) await dialog.accept();
            else await dialog.dismiss();
        });
    }

    async switchToFrame(frameLocator: Locator) {
        const frame = await frameLocator.elementHandle();
        if (frame) {
            return frame.contentFrame();
        }
        return null;
    }

    async uploadFile(inputLocator: Locator, filePath: string) {
        await inputLocator.setInputFiles(filePath);
    }

    async downloadFile(linkLocator: Locator, downloadPath: string) {
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            linkLocator.click()
        ]);
        await download.saveAs(downloadPath);
    }
}

export{}