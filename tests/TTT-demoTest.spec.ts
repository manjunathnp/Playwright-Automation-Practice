import {test, expect} from '@playwright/test';
import { assert } from 'console';

test('Demo Test', async ({ page }) => {
    await page.goto('https://askomdch.com');
    expect(await page.title()).toBe('AskOmDch – Become a Selenium automation expert!');
    
});

test('Google Title Test', async ({ page }) => {
    await page.goto('https://google.com/');
    await expect(page).toHaveTitle('Google');
  });

test('Saucelabs Demo Login Test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[id="user-name"]').fill('standard_user');
    await page.locator('[id="password"]').fill('secret_sauce');
    await page.locator('[id="login-button"]').click();

    await expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
    await page.pause();
    await page.close();
});

test('Practice Assertions Test', async ({ page }) => {
    await page.goto('https://www.letskodeit.com/practice');
    await expect(page.locator('[id="displayed-text"]')).toBeVisible();
    await page.locator('[id="displayed-text"]').fill('testing');

    await expect(page).toHaveURL(/.*letskodeit.com*/)
    await page.locator('[id="hide-textbox"]').click();
    await expect(page.locator('[id="displayed-text"]')).toBeHidden();

    await expect(page).toHaveTitle(/.*Practice*/);

    


});

test('test1', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await expect(page).toHaveURL(/.*source-demo.orangehrm*/);
    //await page.screenshot();
    await expect(page).toHaveScreenshot();
})


