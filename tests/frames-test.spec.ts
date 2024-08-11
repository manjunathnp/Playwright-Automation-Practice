import { test, expect } from '@playwright/test';

test.describe("Frames Validations", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/nested_frames");
    });
    
    test("Handle-Frames-FrameFunction-Test", async ({ page }) => {
        const frames = page.frames();
        console.log("Total Frames: ", frames.length);

        // Using frame-name
        const leftFrame = page.frame('frame-left')
        const leftFrameText = await leftFrame?.textContent('body');
        expect(leftFrameText).toContain("LEFT");

    });

    test("Handle-Frames-FrameLocatorFunction-Test", async ({ page }) => {
        const frames = page.frames();
        console.log("Total Frames: ", frames.length);
        

        // Using frame-link
        const bottomFrame = page.frame({url: "https://the-internet.herokuapp.com/frame_bottom"});
        const bottomFrameText = await bottomFrame?.textContent('body');

        expect(bottomFrameText).toContain('BOTTOM');
    });
    

    test.afterEach(async ({ page }) => {
        await page.close();
    });
    
})
