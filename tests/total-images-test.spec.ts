import { test, expect } from '@playwright/test';

test('Get all links and images URL', async ({ page }) => {
  await page.goto("https://askomdch.com");

  // Get all images and their src URLs
  const allImages = page.locator("img");
  const totalImages = await allImages.count();
  console.log("Total Images: ", totalImages);

  const imageUrls: string[] = [];
  for (let i = 0; i < totalImages; i++) {
    const img = allImages.nth(i);
    const src = await img.getAttribute('src');
    if (src) {
      const fullUrl = new URL(src, page.url()).href;
      imageUrls.push(fullUrl);
    }
  }

  console.log("All Image URLs:");
  imageUrls.forEach(url => console.log(url));
});
