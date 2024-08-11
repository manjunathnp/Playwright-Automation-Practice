import { test, expect, chromium } from '@playwright/test';
import { text } from 'stream/consumers';

test('Identify and list total images and links', async ({ page }) => {
  await page.goto('https://www.askomdch.com');

  // Wait for the page to load completely
  await page.waitForLoadState('load');

  // Get all image elements
  const imageLocator = page.locator('img');
  const imageCount = await imageLocator.count();
  const images: { alt: string | null; src: string | null }[] = [];

  for (let i = 0; i < imageCount; i++) {
    const img = imageLocator.nth(i);
    const alt = await img.getAttribute('alt');
    const src = await img.getAttribute('src');
    images.push({ alt, src });
  }

  // Get all link elements
  const linkLocator = page.locator('a');
  const linkCount = await linkLocator.count();
  const links: { text: string; href: string | null }[] = [];

  for (let i = 0; i < linkCount; i++) {
    const link = linkLocator.nth(i);
    const text = await link.textContent();
    const href = await link.getAttribute('href');
    if (text && href) {
      links.push({ text: text.trim(), href });
    }
  }

  // Log the total number of images and links
  console.log(`Total Images: ${images.length}`);
  console.log(`Total Links: ${links.length}`);

  // Log the list of images and links
  console.log('List of Images (alt names):', images.map(img => img.alt));
  console.log('List of Links (LinkName: Link):', links.map(link => `${link.text}: ${link.href}`));
});


test('Count All Links and Display', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');

    await page.waitForLoadState('load');

    const links = page.locator('a');
    const linksCount = await links.count();
    console.log("Total Links: ", await links.count());

    const allLinkInfos: {hyperLink: string|null, linkText: string|null}[] = [];

    for(let i=0; i<linksCount; i++){
        const link = links.nth(i);
        const hyperLink = await link.getAttribute('href');
        const linkText = await link.innerText();

        allLinkInfos.push({ linkText: linkText?.trim() || null, hyperLink });
    }
    // Print the link details
    for (const link of allLinkInfos) {
        console.log(`Link Text: ${link.linkText}, URL: ${link.hyperLink}`);
    }
})
