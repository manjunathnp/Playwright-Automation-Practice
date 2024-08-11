import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Screenshots Validations', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://playwright.dev/docs/screenshots");
        
    })

    test('Defualt Page Screenshot',{tag: '@smoke'}, async ({ page }) => {
        await page.getByRole('link', {name: 'Docs'}).click();
        await page.screenshot({ path: './screenshots/partialPagescreenshot.png' });

    });

    test('Full Page Screenshot', {tag: '@smoke'},async ({ page }) => {
        await page.getByRole('link', {name: 'Docs'}).click();
        await page.screenshot({ path: './screenshots/fullPageScreenshot.png', fullPage:true });
        // const screenshotBuffer = await page.screenshot();
        // console.log(screenshotBuffer); // This will log the screenshot buffer data

    });

    test('Element Level Screenshot', {tag: '@sanity'},async ({ page }) => {
        const screentshotText = page.locator('//h1[normalize-space()="Screenshots"]');
        await screentshotText.screenshot({ path: "./screenshots/elementScreenshot.png"});
        
    });

    test('Sample SS Test',{tag: '@smoke'}, async ({ page }) => {
        await page.getByRole('link', {name: 'Docs'}).click();
        await page.screenshot();
    });
    
    
    
    test.afterEach(async ({ page }) => {
        await page.close();
    })
    
    
})
