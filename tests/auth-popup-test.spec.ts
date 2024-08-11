import {test, expect} from '@playwright/test';

test('Test Auth Pop-up', async ({ page }) => {
    const username="admin"
    const password="admin"
    await page.goto(`https://${username}:${password}@the-internet.herokuapp.com/basic_auth`);
    await page.locator('//p[contains(text(),"Congratulations! You must have the proper credentials.")]').isVisible();
});