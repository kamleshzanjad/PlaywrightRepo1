import { type Locator, type Page, expect } from "@playwright/test"
import { BasePage } from "./basePage";
import propertiesReadr from 'properties-reader'

//var propertiesReader = require('properties-reader');
//var properties = propertiesReader('./');

const locatorFilePath ="tests/Locators/AddComputersLocators.properties"
var properties = propertiesReadr(locatorFilePath);

export class AddComputerPage extends BasePage{
    
    constructor(page: Page) {
        super(page);
    }

    async enterComputerName(computerName:string){
        await this.setElementText(  properties.get("ComputerName") ,  computerName);
    }
    async enterIntroducedDate(date:string){
        await this.setElementText(  properties.get("Introduced") ,  date);
    }
    async enterDiscontinuedDate(date:string){
        await this.setElementText(  properties.get("Discontinued") ,  date);
    }

    async clickCreateThisComputer(){
        await this.clickElement(properties.get("CreateThisComputer"));
    }
   


}