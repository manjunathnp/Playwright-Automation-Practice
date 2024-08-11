import { test, expect, BrowserContext, Page } from '@playwright/test';

test.describe('SSL Certificate Handling', () => {
  let context: BrowserContext;
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    // Create a new browser context with ignoreHTTPSErrors option
    context = await browser.newContext({
      ignoreHTTPSErrors: true
    });
    page = await context.newPage();

  });

  test.afterAll(async () => {
    // Close the browser context after the tests
    await context.close();
  });

  test('should handle SSL certificates and verify page content', async () => {
    // Navigate to an HTTPS website with a self-signed certificate
    await page.goto('https://self-signed.badssl.com/');

    // Perform actions and assertions on the page
    const title = await page.title();
    expect.soft(title).toContain('self-signed.badssl.com');

    // Additional assertions to verify the page loaded correctly
    const bodyText = await page.textContent('body');
    expect.soft(bodyText?.trim()).toContain('self-signed.badssl.com');
  });
});
