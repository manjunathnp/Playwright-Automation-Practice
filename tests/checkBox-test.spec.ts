import { test, expect } from '@playwright/test';
test.describe('Checkbox-Validation', async() => {

    test.beforeEach(async ({ page }) => {
       await page.goto("https://vinothqaacademy.com/demo-site/");
    });
    
    test("Checkbox-OptionSelection-Test", async({ page }) => {
        const devOpsOption = page.getByLabel('DevOps', {exact: true});
        const seleniumOption = page.getByLabel('Selenium WebDriver', {exact: true});
        const javaOption = page.getByLabel('Java', {exact: true});
        const testNGOption = page.getByLabel('TestNG', {exact: true});  
        const functionalTestingOption = page.getByLabel('Functional Testing', {exact: true});  
        const othersOption = page.getByLabel('Others', {exact: true});  

        

        // Validate Default Checkbox Selected
        await expect(devOpsOption).toBeChecked();

        // Select Checkboxes and Validate
        const isDevOpsSelected = await devOpsOption.isChecked();
        const isSeleniumSelected = await seleniumOption.isChecked();
        const isJavaSelected = await javaOption.isChecked();
        const isTestNGSelected = await testNGOption.isChecked();
        const isFunctionalTestingSelected = await functionalTestingOption.isChecked();
        const isOthersSelected = await othersOption.isChecked();

        if(!isSeleniumSelected){
            await seleniumOption.check();
        }
        console.log("Is Selenium Option Checked? : ", await seleniumOption.isChecked());
        await expect(seleniumOption).toBeChecked();

        if(!isJavaSelected){
            await javaOption.check();
        }
        console.log("Is Java Option Checked? : ", await javaOption.isChecked());
        await expect(javaOption).toBeChecked();

        if(!isTestNGSelected){
            await testNGOption.check();
        }
        console.log("Is TestNG Option Checked? : ", await testNGOption.isChecked());
        await expect(testNGOption).toBeChecked();

        if(!isFunctionalTestingSelected){
            await functionalTestingOption.check();
        }
        console.log("Is Functional Testing Option Checked? : ", await functionalTestingOption.isChecked());
        await expect(functionalTestingOption).toBeChecked();

        if(!isOthersSelected){
            await othersOption.check();
        }
        console.log("Is Others Option Checked? : ", await othersOption.isChecked());
        await expect(othersOption).toBeChecked();

        if(isDevOpsSelected){
            await devOpsOption.uncheck();
        }
        console.log("Is DevOps Option Checked? : ", await devOpsOption.isChecked());
        await expect(seleniumOption).toBeChecked();


    });

    test.afterEach(async({ page }) => {
        await page.close();
    });
})
