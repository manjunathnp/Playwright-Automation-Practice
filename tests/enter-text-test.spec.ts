import {test, expect} from '@playwright/test';

test('Enter-Text-Fill-Test', async ({ page }) => {
    await page.goto("https://saucedemo.com");

    const usernameTextField = page.getByPlaceholder('Username');
    const passwordTextField = page.getByPlaceholder('Password');
    const loginButton = page.locator('[data-test="login-button"]');
    const productsText = page.getByText('Products');

    await usernameTextField.fill("standard_user");
    await passwordTextField.fill("secret_sauce");
    await loginButton.click();

    await expect(productsText).toBeVisible();
});

test('Enter-Text-Press-Test', async ({ page }) => {
    await page.goto("https://saucedemo.com");

    const usernameTextField = page.locator('[name="user-name"]');
    const passwordTextField = page.locator('[name="password"]');
    const loginButton = page.locator('[data-test="login-button"]');
    const errorMessageElement = page.locator('[data-test="error"]');

    await usernameTextField.press('Tab');
    await passwordTextField.fill("secret_sauce");
    await passwordTextField.press('Enter');
    expect(await errorMessageElement.textContent()).toContain("Username is required");
});


test('Enter-Text-PressSequentially-Test', async ({ page }) => {
    await page.goto("https://saucedemo.com");

    const usernameTextField = page.getByPlaceholder('Username');
    const passwordTextField = page.getByPlaceholder('Password');
    const loginButton = page.locator('[data-test="login-button"]');
    const productsText = page.getByText('Products');

    await usernameTextField.pressSequentially("standard_user", {delay: 500});
    await passwordTextField.pressSequentially("secret_sauce", {delay: 500});
    await loginButton.click();

    await expect(productsText).toBeVisible();

});

test.skip('Login using type()', async ({ page }) => {
  await page.goto('https://saucedemo.com');
  
  const usernameTextField = page.getByPlaceholder('Username');
  const passwordTextField = page.getByPlaceholder('Password');
  const loginButton = page.locator('[data-test="login-button"]');
  const productsText = page.getByText('Products');

  await usernameTextField.type('standard_user'); // type() is now deprecated
  await passwordTextField.type('secret_sauce'); // type() is now deprecated
  await loginButton.click();
  
  await expect(productsText).toBeVisible();
});

test('Login using keyboard', async ({ page }) => {
  await page.goto('https://saucedemo.com');
  
  const usernameTextField = page.getByPlaceholder('Username');
  const passwordTextField = page.getByPlaceholder('Password');
  const loginButton = page.locator('[data-test="login-button"]');
  const productsText = page.getByText('Products');

  await usernameTextField.click();
  await page.keyboard.type('standard_user');
  await passwordTextField.click();
  await page.keyboard.type('secret_sauce');
  await loginButton.click();
  
  await expect(productsText).toBeVisible();
});

test('Login using keyboard-insertText()', async ({ page }) => {
  await page.goto('https://saucedemo.com');
  
  const usernameTextField = page.getByPlaceholder('Username');
  const passwordTextField = page.getByPlaceholder('Password');
  const loginButton = page.locator('[data-test="login-button"]');
  const productsText = page.getByText('Products');

  await usernameTextField.click();
  await page.keyboard.insertText('standard_user');
  await passwordTextField.click();
  await page.keyboard.insertText('secret_sauce');
  await loginButton.click();
  
  await expect(productsText).toBeVisible();
});


test('Login using evaluate()', async ({ page }) => {
  await page.goto('https://saucedemo.com');
  
  const usernameTextField = page.getByPlaceholder('Username');
  const passwordTextField = page.getByPlaceholder('Password');
  const loginButton = page.locator('[data-test="login-button"]');
  const productsText = page.getByText('Products');

  await page.evaluate(() => {
    const usernameInput = document.querySelector('[placeholder="Username"]');
    const passwordInput = document.querySelector('[placeholder="Password"]');
    if (usernameInput && passwordInput) {
        (usernameInput as HTMLInputElement).value = 'standard_user';
        (passwordInput as HTMLInputElement).value = 'secret_sauce';
      }
  });
  await loginButton.click();
  
  await expect(productsText).toBeVisible();
});
