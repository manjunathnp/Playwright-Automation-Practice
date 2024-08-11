import { test, expect, chromium } from '@playwright/test';

test('Press-Keys-Test', async ({ page }) => {
    await page.goto("https://saucedemo.com");

    const usernameTextField = page.getByPlaceholder('Username');
    const passwordTextField = page.getByPlaceholder('Password');
    const loginButton = page.locator('[data-test="login-button"]');
    const productsText = page.getByText('Products');

    await usernameTextField.pressSequentially("standard_user");
    await passwordTextField.pressSequentially("secret_sauce");
    await loginButton.click();

    await expect(productsText).toBeVisible();


    for(let i=1; i<=20; i++){
        await page.keyboard.press('ArrowDown');
    }
    await expect(page.locator('[data-test="footer-copy"]')).toBeVisible();
});


test('Focus-InputText-Keys-Test', async ({ page }) => {
    await page.goto("https://saucedemo.com");

    const usernameTextField = page.getByPlaceholder('Username');

   await usernameTextField.focus();

   await page.keyboard.insertText("secret_sauce");
   expect(await usernameTextField.inputValue()).toBe("secret_sauce");
   
   await usernameTextField.clear();

});