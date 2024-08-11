import { test } from '@playwright/test';

test('URL Test', async ({ page }) => {
    await page.goto('https://askomdch.com');

    const allLinks = page.locator('a');
    const totalLinks = await allLinks.count();
    console.log("Total Links: ", await allLinks.count());

    for(let i=0; i<totalLinks; i++){
        const link = allLinks.nth(i);
        const href = await link.getAttribute('href');

        const brokenLinks: string[] = [];

        if(href){
            const url = new URL(href, page.url()).href;
        }
    }
});
