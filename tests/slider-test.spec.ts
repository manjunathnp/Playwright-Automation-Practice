import { test, expect } from '@playwright/test';

test.describe('Slider Drag Test', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://letcode.in/slider'); // Replace with the actual URL containing the slider
    });

    test('Drag Slider Test', async ({ page }) => {
        // Locate the slider element
        const slider = page.locator('#generate'); // Replace with the actual selector for the slider

        // Get the bounding box of the slider
        const sliderBox = await slider.boundingBox();
        if (sliderBox) {
            const { x, y, width, height } = sliderBox;
            const startX = x + width / 2;
            const startY = y + height / 2;

            // Calculate the target position (e.g., move the slider 50% to the right)
            const targetX = startX + width * 0.1; // Adjust the multiplier based on your requirement

            // Perform the drag action
            await page.mouse.move(startX, startY);
            await page.mouse.down();
            await page.mouse.move(targetX, startY, { steps: 1 }); // Smooth drag with 1 steps
            await page.mouse.up();
        }
    });

    test.afterEach(async ({ page }) => {
        //await page.close();
    });

});
