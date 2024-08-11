import { test, expect, Browser } from '@playwright/test';

test('Capture video for this test', async ({ browser }) => {
  // Start video recording for this specific test
  const context = await browser.newContext({
    recordVideo: { dir: 'videos/' },
  });
  const page = await context.newPage();

  // Perform test actions
  await page.goto('https://the-internet.herokuapp.com/');
  //await page.click('text=Get Started');
  const title = await page.title();
  await expect(title).toEqual('The Internet');

  await page.goto('https://askomdch.com/');
  await page.waitForTimeout(3000);
  
  // Stop recording and save the video
  await context.close();
});
