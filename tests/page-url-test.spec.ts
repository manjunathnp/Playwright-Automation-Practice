import { test, expect } from '@playwright/test'

test.describe("URL Validations", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/");
    });

    test("Validate Page URL Test", async ({ page }) => {
        await expect(page).toHaveURL("https://the-internet.herokuapp.com/");
    });

    test("Print URL to Console Test", async({page})=>{
        const pageURL = page.url();
        console.log("Page URL: ", pageURL);
    });

    test("Validate Page URL Test Approach-2", async ({ page }) => {
        expect(page.url()).toEqual("https://the-internet.herokuapp.com/");
    });

    test("Validate Page URL Test Approach-3", async ({ page }) => {
        await expect(page).toHaveURL(/.*the-internet/);
    });
    

    test.afterEach(async ({ page }) => {
        await page.close();
    });
    
});


test('URL Verification Test', async ({ page }) => {
   await page.goto('https://askomdch.com/');
   
   //await expect.soft(page).toHaveURL(/.*askomdch/);
    expect.soft(page.url()).toBe('https://askomdch.com/');
});

test('Page Title Verification', async ({ page }) => {
    await page.goto('https://askomdch.com/')

    await expect.soft(page).toHaveTitle(/.*AskOmDch/);
    expect.soft(await page.title()).toContain('AskOm')
});


