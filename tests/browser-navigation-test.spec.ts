import { test, expect } from '@playwright/test';

test('Broswer-Navigation-Test', async ({ page }) => {
    await page.goto("https://parabank.parasoft.com/parabank/index.htm");
    await expect(page.getByRole('heading', { name: 'Customer Login' })).toBeVisible();

    await page.getByRole('link', {name: "Services"}).nth(1).click();
    await page.goBack();
    await expect(page.getByRole('heading', { name: 'Customer Login' })).toBeVisible();

    await page.goForward();
    await expect(page.getByText("Available Bookstore SOAP services:")).toBeVisible();

    await page.reload();
    await page.waitForLoadState('load');
    await expect(page.getByText("Available Bookstore SOAP services:")).toBeVisible();

});