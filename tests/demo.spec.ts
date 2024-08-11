import { test, expect, chromium } from '@playwright/test';

test('Identify and list all broken links', async ({ page, request }) => {
  await page.goto('https://www.askomdch.com');
  //await page.goto("https://parabank.parasoft.com/parabank/admin.htm");

  await page.waitForLoadState('load');

  // Get all link elements
  const linkLocator = page.locator('a');
  const linkCount = await linkLocator.count();
  const brokenLinks: { text: string | null; href: string }[] = [];

  for (let i = 0; i < linkCount; i++) {
    const link = linkLocator.nth(i);
    const text = await link.textContent();
    const href = await link.getAttribute('href');
    
    if (href) {
      try {
        const response = await request.get(href);
        if (response.status()>=400) {
          brokenLinks.push({ text: text?.trim() || null, href });
        }
      } catch {
        brokenLinks.push({ text: text?.trim() || null, href });
      }
    }
  }

  // Log the total number of broken links
  console.log(`Total Broken Links: ${brokenLinks.length}`);

  // Log the list of broken links
  brokenLinks.forEach(link => {
    console.log(`Broken Link Text: ${link.text}, \nLink: ${link.href}`);
  });
});
