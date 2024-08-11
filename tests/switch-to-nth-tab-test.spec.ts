import { test, expect } from '@playwright/test';

test.skip('Navigate to the 15th tab', async ({ browser }) => {
    // Create a new browser context
    const context = await browser.newContext();

    // Open the initial page
    const page = await context.newPage();
    await page.goto('https://example.com'); // Replace with the URL of your choice

    // Click the button that opens 20 tabs
    await page.click('button#open-tabs'); // Replace with the actual selector of the button

    // Wait for all tabs to be opened
    await page.waitForTimeout(3000); // Adjust the timeout if necessary

    // Get all pages (tabs) in the context
    const pages = context.pages();

    // Navigate to the 15th tab
    if (pages.length >= 15) {
        const tab15 = pages[14];
        await tab15.bringToFront(); // Bring the 15th tab to the front

        // Do something with the 15th tab
        await tab15.goto('https://example.com'); // Replace with actions you want to perform on the 15th tab

        // Verify the navigation
        await expect(tab15).toHaveURL('https://example.com'); // Adjust the expected URL accordingly
    } else {
        console.log('Less than 15 tabs are opened.');
    }
});
