import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homepage";
import { BasePage } from "../pages/basePage";
import appUrl from "../testdata/appUrl.json";
import testData from "../testdata/SearchComputer.json";
import exp from "constants";
import { basename } from "path";

test.describe.configure({"mode":"parallel", "timeout":300000, "retries": 3})
test.describe("Suite: Search Computer", () => {
    var homePage;
    var basePage;

    test.beforeEach("beforeEachblock", async ({ page }) => {
        const envName = process.env.EnvName || "uat";
        homePage = new HomePage(page);
        basePage = new BasePage(page)
        await homePage.openApplication(appUrl.int.baseUrl);
    })

    test("TC01_SearchComputer: Search using full computer name", async ({ page }) => {
        try {
            await homePage.searchComputerName(testData.TC01.SearchText);
            await homePage.clickFilterByName();

            const listOfActualComputerNames = await homePage.getListOfcomputerNames();
            basePage.printMessage(listOfActualComputerNames)
            basePage.printMessage(`Number of Search result count is ${listOfActualComputerNames.length}`)

            const actualMessage = await homePage.getHeadingMessage();
            basePage.printMessage(`actualMessage  ${actualMessage}`);

            expect.soft(actualMessage).toContain(testData.TC01.expectedMessage);
            expect.soft(listOfActualComputerNames.length).toEqual(1);

            /* Purposefully injecting error in test case to see report */
            // expect.soft(listOfActualComputerNames).toEqual("TTTT");
            // expect.soft(listOfActualComputerNames.length).toBeGreaterThan(10);

        } catch (e) {
            basePage.printErrorMessage(`Error in test case: ${e.message}`);
            
        }
    })

    test("TC02_SearchComputer: Search using partial computer name", async ({ page }) => {
        try {
            await homePage.searchComputerName(testData.TC02.SearchText);
            await homePage.clickFilterByName();

            const listOfActualComputerNames = await homePage.getListOfcomputerNames();
            basePage.printMessage(listOfActualComputerNames)
            basePage.printMessage(`Number of Search result count is ${listOfActualComputerNames.length}`)

            const actualMessage = await homePage.getHeadingMessage();
            basePage.printMessage(`actualMessage  ${actualMessage}`);

            expect.soft(actualMessage).toContain(testData.TC02.expectedMessage);
            expect.soft(listOfActualComputerNames.length).toBeGreaterThan(1);

        } catch (e) {
            basePage.printErrorMessage(`Error in test case: ${e.message}`)
        }
    })

    test("TC03_SearchComputer: Search using invalid computer name", async ({ page }) => {
        test.setTimeout(300000);  
        // test.slow()
        try {
            await homePage.searchComputerName(testData.TC03.SearchText);
            await homePage.clickFilterByName();

            const listOfActualComputerNames = await homePage.getListOfcomputerNames();
            basePage.printMessage(listOfActualComputerNames)
            basePage.printMessage(`Number of Search result count is ${listOfActualComputerNames.length}`)

            const actualMessage = await homePage.getHeadingMessage();
            basePage.printMessage(`actualMessage  ${actualMessage}`);

            expect.soft(actualMessage).toContain(testData.TC03.expectedMessage);
            expect.soft(listOfActualComputerNames.length).toBeLessThan(1);

        } catch (e) {
            basePage.printErrorMessage(`Error in test case: ${e.message}`)
        }
    })
})