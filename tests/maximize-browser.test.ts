import { test, expect } from '@playwright/test';

/**
 * To view in Developers Tool Console
    console.log('Viewport width:', window.innerWidth);
    console.log('Viewport height:', window.innerHeight);
 */

    


test("Set Browser Size", async({page})=>{

    // Get the width and height of the browser window
  const widthDimension = await page.evaluate(() => window.innerWidth);
  const heightDimension = await page.evaluate(() => window.innerHeight);
  console.log(widthDimension, heightDimension);
  
    // Maximize the browser window
    await page.setViewportSize({ width: widthDimension, height: heightDimension });

    // Navigate to a URL
    await page.goto('https://saucedemo.com');

    await page.pause();

    
});
