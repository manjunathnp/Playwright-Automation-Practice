import {test, expect} from '@playwright/test';
import { strict } from 'assert';

test('Cookies-Cache Clear Test', async ({ context, page }) => {
    await page.goto('https://askomdch.com');

    // Clear cookies and permissions
    await context.clearCookies();
    await context.clearPermissions();
    
    expect.soft(await page.title(), {message: 'Title Mismatch'}).toMatch(/.*AskOmDch*/);

    await page.close();
    
});

test('Simple Demo TEST', async({page})=>{
    await page.goto('https://askomdch.com/');

    const accountLink = page.locator("css=li[id='menu-item-1237'] a[class='menu-link']");
    const accountHeading = page.locator('xpath=//h1[normalize-space()="Account"]');

    await accountLink.click();
    await accountHeading.isDisabled();
});
