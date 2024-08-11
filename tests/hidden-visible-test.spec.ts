import { test, expect } from '@playwright/test';
test.describe('Hidden-Visible-Validations', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.letskodeit.com/practice");
    });

    test("Element-Visibility-Test", async ({ page }) => {
        const hideButton = page.locator('[id="hide-textbox"]');
        const showButton = page.locator('[id="show-textbox"]');
        const inputTextField = page.locator('[id="displayed-text"]');

        await expect(inputTextField).toBeVisible();
        await inputTextField.fill("Automation");

        await hideButton.click();
        await showButton.click();
        await expect(inputTextField).toBeVisible();

    });

    test("Element-Hidden-Test", async ({ page }) => {
        const hideButton = page.locator('[id="hide-textbox"]');
        const showButton = page.locator('[id="show-textbox"]');
        const inputTextField = page.locator('[id="displayed-text"]');

        await expect(inputTextField).toBeVisible();
        await inputTextField.fill("Automation");

        await hideButton.click();
        await expect(inputTextField).toBeHidden();
        
    });
    
    test.afterEach(async ({ page }) => {
        await page.close();
    });
    
});
