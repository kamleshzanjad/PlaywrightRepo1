import { type Locator, type Page, expect } from "@playwright/test"

export class HomePage {
    readonly page: Page;
    readonly title: Locator;
    readonly headingMessage: Locator;
    readonly filterByComputerName: Locator;
    readonly filterByName: Locator;
    readonly listOfComputerName: Locator;
    readonly addANewComputer: Locator


    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('a', { hasText: "Computer Database" });
        this.headingMessage =  page.locator("xpath=//section[@id='main']/h1") //page.locator('h1', { hasText: " found" });
        this.filterByComputerName = page.getByPlaceholder("Filter by computer name...", { exact: true });
        this.filterByName = page.getByRole("button", { name: "Filter by name" });
        this.listOfComputerName = page.locator("xpath=//section[@id='main']/table/tbody/tr/td[1]")
        this.addANewComputer = page.locator("a", { hasText: "Add a new computer" })
    }

    async openApplication(url:string){
        this.page.goto(url);
    }

    async verifyTitle(expectedTitle){
        await expect ( this.title).toHaveText(expectedTitle)
    }

    async searchComputerName(computerName:string){
        await this.filterByComputerName.fill(computerName)
    }
    async clickFilterByName(){
        await this.filterByName.click();
    }

    async getHeadingMessage(){
        return await this.headingMessage.textContent()
    }

    async getListOfcomputerNames(){
        return await this.listOfComputerName.allTextContents();
    }

    async clickAddANewComputer(){
        await this.addANewComputer.click()
    }


}