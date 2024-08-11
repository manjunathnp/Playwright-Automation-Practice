import {test, expect } from '../fixtures/browserSetup';

test.describe("URL Validations", () => {
  test("Context 1 - Multiple Pages Test", async ({ context }) => {
    const page1 = await context.newPage();
    await page1.goto('https://askomdch.com');
    console.log('Context 1 - Page 1 URL:', page1.url());
    expect(page1.url()).toBe('https://askomdch.com/');

    const page2 = await context.newPage();
    await page2.goto('https://askomdch.com');
    console.log('Context 1 - Page 2 URL:', page2.url());
    expect(page2.url()).toBe('https://askomdch.com/');
  });

  test("Context 2 - Multiple Pages Test", async ({ context }) => {
    const page3 = await context.newPage();
    await page3.goto('https://askomdch.com/account');
    console.log('Context 2 - Page 1 URL:', page3.url());
    expect(page3.url()).toBe('https://askomdch.com/account/');

    const page4 = await context.newPage();
    await page4.goto('https://askomdch.com/account');
    console.log('Context 2 - Page 2 URL:', page4.url());
    expect(page4.url()).toBe('https://askomdch.com/account/');
  });

});
