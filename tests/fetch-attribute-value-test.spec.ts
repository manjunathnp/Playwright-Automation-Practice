import {test, expect} from '@playwright/test'

test.describe('Assertions Demo', ()=>{
    test.beforeEach(async({page})=>{
        await page.goto('https://www.letskodeit.com/practice')
    });

    test('Attribute-Value Test', async({page})=>{
        const openTabButton = page.getByRole('link', {name: 'Open Tab'});
        console.log("Attribute Name: ",await openTabButton.getAttribute('id'));
        await expect(openTabButton).toHaveAttribute('id', 'opentab');
        await expect(openTabButton).toHaveAttribute('class', 'btn-style class1 class2');
    });

    test.afterEach(async({page})=>{
        await page.close();
    })
});