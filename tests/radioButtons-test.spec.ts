import { test, expect } from '@playwright/test';
test.describe('RadioButtons-Validation', async() => {

    test.beforeEach(async ({ page }) => {
       await page.goto("https://vinothqaacademy.com/demo-site/");
    });
    
    test("RadioButton-OptionSelection-Test", async({ page }) => {
        const maleOption = page.getByLabel('Male', { exact: true });
        const femaleOption = page.getByLabel('Female', { exact: true });
        const otherOption = page.getByLabel('Other', { exact: true });


        // Check if option is already selected before clicking
        const isMaleOptionSelected = await maleOption.isChecked();
        const isFemaleOptionSelected = await femaleOption.isChecked();
        const isOtherOptionSelected = await otherOption.isChecked();

        // Click only if not already selected
        if (!isMaleOptionSelected) {
            await maleOption.check()
        }
        console.log("Is Male Option Selected? : ", await maleOption.isChecked());
        await expect.soft(maleOption).toBeChecked();


        if(!isFemaleOptionSelected){
            await femaleOption.check();
        }
        console.log("Is Female Option Selected? : ", await femaleOption.isChecked());
        await expect.soft(femaleOption).toBeChecked();

        if(!isOtherOptionSelected){
            await otherOption.click();
        }
        console.log("Is Other Option Selected? : ", await otherOption.isChecked());
        await expect.soft(otherOption).toBeChecked();

    });

    test.afterEach(async({ page }) => {
        await page.close();
    });
})



