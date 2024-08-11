import { test, expect } from '@playwright/test';

test.describe("Multi-Select-Validation", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.letskodeit.com/practice");
    });

    test("Multi-Selection-Test", async ({ page }) => {
        const multiSelectComboBox = page.locator('#multiple-select-example');

        // Approach-1 
        // Based on Label
        await multiSelectComboBox.selectOption(["Apple", "Peach"]);

        const selectedOptions = await multiSelectComboBox.locator('option:checked').allTextContents();

        expect.soft(selectedOptions).toContain('Apple');
        expect.soft(selectedOptions).toContain('Peach');
        expect.soft(selectedOptions.length).toBe(2);

        console.log("Selected Options: ", selectedOptions);

    });

    test("Multi-Selection-Test-Approach2", async ({ page }) => {
        const multiSelectComboBox = page.locator('#multiple-select-example');

        
        // Approach-2
        await page.selectOption('#multiple-select-example', ["Apple", "Peach"])

        const selectedOptions = await multiSelectComboBox.locator('option:checked').allTextContents();

        expect(selectedOptions).toContain('Apple');
        expect(selectedOptions).toContain('Peach');
        expect(selectedOptions.length).toBe(2);

        console.log("Selected Options: ", selectedOptions);

    });
    
    

    test.afterEach(async ({ page }) => {
        await page.close();
    });
    
    
})
