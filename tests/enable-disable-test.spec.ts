import { test, expect } from '@playwright/test';

test.describe('Enable-Disable-Validations', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.letskodeit.com/practice");
    })

    test('Validate-Enable-Test', async ({ page }) => {
       
        const inputTextField = page.locator('[id="enabled-example-input"]');
        const enableButton = page.locator('[id="enabled-button"]');

         // By Default InputText field Disabled
        await expect(inputTextField).toBeEnabled();

        await enableButton.click();
        await inputTextField.fill("Playwright!")

    });

    test('Validate-Disable-Test', async ({ page }) => {
       
        const inputTextField = page.locator('[id="enabled-example-input"]');
        const enableButton = page.locator('[id="enabled-button"]');
        const disableButton = page.locator('[id="disabled-button"]');
        

         // By Default InputText field Disabled
        await expect(inputTextField).toBeEnabled();

        await disableButton.click();
        await expect(inputTextField).toBeDisabled();

    });

    test('Validate-Enabling-TextInput-Test', async ({ page }) => {
       
        const inputTextField = page.locator('[id="enabled-example-input"]');
        const enableButton = page.locator('[id="enabled-button"]');
        const disableButton = page.locator('[id="disabled-button"]');
        

         // By Default InputText field Disabled
        await expect(inputTextField).toBeEnabled();

        // Input Text
        await inputTextField.fill("TypeScript");
        await disableButton.click();
        await expect(inputTextField).toBeDisabled();

        await enableButton.click();
        await inputTextField.fill("Playwright TypeScript Automation");
        await expect(inputTextField).toBeEnabled();
    });
    

    test.afterEach(async ({ page }) => {
        await page.close();
    })
    
    
})
