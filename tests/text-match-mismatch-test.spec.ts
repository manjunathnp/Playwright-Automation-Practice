import {test, expect} from '@playwright/test'

test.describe('Assertions Demo', ()=>{
    test.beforeEach(async({page})=>{
        await page.goto('https://www.letskodeit.com/practice')
    });

    test('Text Match/Mismatch Test', async({page})=>{
        const openWindowButton = page.getByRole('button', {name: 'Open Window'});
        await expect(openWindowButton).toHaveText('Open Window');
        await expect(openWindowButton).not.toHaveText('OPEN WINDOW');
    });

    test('Text Match/Mismatch Test - Heading Test', async({page})=>{
        const headingElement = page.locator('xpath=//h1[normalize-space()="Practice Page"]');
        //const headingElement = page.getByRole('heading', {name: "Practice Page"});
        await expect(headingElement).toHaveText("Practice Page");
    });

    test.afterEach(async({page})=>{
        await page.close();
    });
});