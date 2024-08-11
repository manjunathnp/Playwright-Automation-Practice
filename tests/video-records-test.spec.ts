import { test, expect, chromium } from '@playwright/test';
import { log } from 'console';

test.describe("Record Videos Validations", () => {
    test("Record-Video-Test", async ({}) => {
        const browser = await chromium.launch();
        const context = await browser.newContext({
            recordVideo: {
                dir: 'videos/', // Adjust this path as necessary
                size: { width: 1280, height: 720 } // You can specify the video size
            }
        });
        const page = await context.newPage();
        await page.goto('https://askomdch.com/');
        await page.getByRole('link', { name: 'Shop Now' }).first().click();
        await expect(page.locator('h1')).toContainText('Store');

        console.log("Video Path: ", await page.video()?.path());

        // Add your test steps here
        await context.close();
        await browser.close();
    });

    test.skip('capture videos shots test', async({browser})=>{
        const context = await browser.newContext({
            recordVideo: {dir: './videos/',
                          size: {width: 1200, height: 800}},
            
        });
        const page = await context.newPage();
    });
 
});

