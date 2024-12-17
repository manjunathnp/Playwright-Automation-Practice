const { test, expect } = require('@playwright/test');

// Use const to declare a variable for the base URL and write a Playwright test to navigate to the URL
test('Sample Demo Test', async ({ page }) => {
    const BASE_URL = 'https://saucedemo.com'
    await page.goto(BASE_URL);
});
