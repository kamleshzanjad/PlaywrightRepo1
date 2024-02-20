import { type Locator, type Page, expect } from "@playwright/test"

export class BasePage {
    readonly page: Page;



    constructor(page: Page) {
        this.page = page;
    }

    printMessage(message) {
        if (!process.env.CI) {
            console.log(message)
        }
    }
    printErrorMessage(errorMessage) {
        if (!process.env.CI) {
            console.log(errorMessage)
        }
    }


}