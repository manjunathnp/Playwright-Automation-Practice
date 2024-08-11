import { test, expect } from '@playwright/test';

test.describe("Windows-Handling-Validations", async() => {

    test.beforeEach(async({ page }) => {
        await page.goto("https://vinothqaacademy.com/multiple-windows/");
        await page.context().clearCookies();
        await page.context().clearPermissions();
    });

    test("New-BrowserTab-Test", async({ page }) => {

        const newTabButton = page.locator('[name="145newbrowsertab234"]');

        const [newTab] = await Promise.all([
            page.waitForEvent('popup'),
            //await page.click('[name="145newbrowsertab234"]')
            await newTabButton.click()
        ]);
        await newTab.waitForLoadState();
        await newTab.getByRole('link', {name: 'Home'}).click();

        //await newTab.waitForTimeout(3500);

        const pages = newTab.context().pages();
        await pages[0].close();
        await newTab.waitForTimeout(2500);
        await pages[1].close();
    });

    test("New-BrowserWindow-Test", async({ page }) => {
        
        const [newWindow] = await Promise.all([
            page.waitForEvent('popup'),
            await page.locator('[name="newbrowserwindow123"]').click()
        ]);
        await newWindow.waitForLoadState();
        await expect(newWindow.locator('[alt="Vinoth Q.A Academy"]')).toBeVisible();
        expect.soft(await newWindow.title()).toContain('Demo');

        await newWindow.waitForTimeout(3500);

        const pages = newWindow.context().pages();
        await pages[1].close();

    });

    test("New-MessageWindow-Test", async({ page }) => {
        const [newMessageWindow] = await Promise.all([
            page.waitForEvent('popup'),
            await page.locator('[name="123newmessagewindow321"]').click()
        ]);
        await newMessageWindow.waitForLoadState();
        await expect(newMessageWindow.getByText("Welcome to Vinoth Q. A Academy. Happy Learning")).toBeVisible();

        await newMessageWindow.waitForTimeout(3000);

        const pages=newMessageWindow.context().pages();
        await pages[1].close();
    });

    test.afterEach(async({ page }) => {
        await page.close();
    });
});