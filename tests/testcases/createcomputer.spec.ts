import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homepage";
import {AddComputerPage  } from "../pages/addcomputer.page";
import { BasePage } from "../pages/basePage";
import appUrl from "../testdata/appUrl.json";
import testData from "../testdata/AddComputer.json";
import exp from "constants";
import { basename } from "path";
import { hasUncaughtExceptionCaptureCallback } from "process";

test.describe.configure({"mode":"parallel", "timeout":300000, "retries": 3})
test.describe("Suite: Create Computer", () => {
    var homePage;
    var basePage;
    var addComputerPage;

    test.beforeEach("beforeEachblock", async ({ page }) => {
        const envName = process.env.EnvName || "uat";
        homePage = new HomePage(page);
        basePage = new BasePage(page);
        addComputerPage = new AddComputerPage(page);
        //await homePage.openApplication(appUrl[`qa`]['baseUrl']);
        basePage.printMessage("User is " + appUrl[`${envName}`]['userID'])
        await homePage.openApplication(appUrl[`${envName}`]['baseUrl']);
       // await homePage.openApplication(appUrl[${envName}][baseUrl]);
        await homePage.clickAddANewComputer();
    })

    test.afterEach(async({page}) =>{
        await page.close();
    })

    test("TC01_CreateComputer: Create a new Computer by adding all fields", async ({ page }) => {
        try {
            await addComputerPage.enterComputerName(testData.TC01.ComputerName);
            await addComputerPage.enterIntroducedDate(testData.TC01.IntroducedDate);
            await addComputerPage.enterDiscontinuedDate(testData.TC01.DiscontinuedDate);
            await addComputerPage.clickCreateThisComputer();
            const actualAlertMessage= await homePage.getAlertMessage();
            basePage.printMessage(`Actual Alert message displayed is ${actualAlertMessage}`)
            expect(actualAlertMessage).toContain(testData.TC01.expectedAlertMessage)

        } catch (e) {
            basePage.printErrorMessage(`Error in test case: ${e.stack}`);
            throw new Error(e.stack)
        }
    })

    test("TC02_CreateComputer: Create a new Computer by adding minimum fields", async ({ page }) => {
        try {
            await addComputerPage.enterComputerName(testData.TC02.ComputerName);
            await addComputerPage.clickCreateThisComputer();
            const actualAlertMessage= await homePage.getAlertMessage();
            basePage.printMessage(`Actual Alert message displayed is ${actualAlertMessage}`)
            expect(actualAlertMessage).toContain(testData.TC02.expectedAlertMessage)

        } catch (e) {
            basePage.printErrorMessage(`Error in test case: ${e.stack}`);
            throw new Error(e.stack)
        }
    })

  
})