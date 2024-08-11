import { test, expect } from '@playwright/test'

test.describe("URL Validations", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/");
    });

    test("Validate Page Title Test", async ({ page }) => {
        //await expect(page).toHaveTitle("The Internet")
        await expect(page).toHaveTitle(/.*Internet*/);
    });

    test("Print Page Title to Console Test", async ({ page }) => {
        const pageTitle = await page.title();
        console.log("Page Title: ", pageTitle);
    });
    
    test("Page Title Test - Approach-2", async ({ page }) => {
        //expect(await page.title()).toBe("The Internet");
        //expect(await page.title()).toContain("Internet");
        expect(await page.title()).toMatch(/.*Internet*/);
    });

    test("Page Title Test - Approach-3", async ({ page }) => {
        await expect.soft(page, {'message': "Title Mismatch"}).toHaveTitle(/.*Internet/)
    })
    

    test.afterEach(async ({ page }) => {
        await page.close();
    });
    
    
});
