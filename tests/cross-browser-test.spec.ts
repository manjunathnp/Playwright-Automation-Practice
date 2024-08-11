import { test } from '@playwright/test';

//$ npx playwright test cross-browser-test.spec.ts -g "Tests Running on Firefox" --project=firefox

test.describe("Tests Running on Firefox", () => {
  test("Test1", async ({ page }) => {
    await page.goto("https://saucedemo.com");
    // Your test steps go here
  });

  test("Test2", async ({ page }) => {
    await page.goto("https://saucedemo.com");
    // Your test steps go here
  });

  test("Test3", async ({ page }) => {
    await page.goto("https://saucedemo.com");
    // Your test steps go here
  });
});
