import { chromium, test, firefox,expect } from '@playwright/test';


test('Browser Launch Test - Approach1', async ({ page }) => {
  const browser = await chromium.launch({
    headless: false, // Launch in non-headless mode
    slowMo: 50, // Slow down by 50ms
    devtools: false, // Open devtools
  });

  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto('https://saucedemo.com');
  await browser.close();
});

test('Browser Launch Test - Approach2', async ({ page }) => {
  await page.goto('https://saucedemo.com');
  await page.close();

});


// test('cross-browser test', async ({ page, browserName }) => {
//   console.log(`Running on ${browserName}`);
//   await page.goto('https://saucedemo.com');
//   // Your test steps go here
// });
