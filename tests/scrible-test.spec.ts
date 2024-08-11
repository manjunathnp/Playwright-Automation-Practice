import {test, expect, request} from '@playwright/test';
import fs from 'fs';
import path from 'path';
import {parse} from 'csv-parse/sync';

test('Drag & Drop Test', async({page})=>{
    await page.goto('https://vinothqaacademy.com/mouse-event/');

    const source = page.locator('#draggableElement');
    const target = page.locator('#droppableElement');
    const draggedElement = page.locator('#droppableElement').locator('#draggableElement');

    await source.dragTo(target);

    await expect.soft(draggedElement).toBeVisible();

});

test('Text Match Test', async({page})=>{
    await page.goto('https://vinothqaacademy.com/mouse-event/');
    const heading = page.getByRole('heading', {name: 'Mouse Actions - Tooltip'});
    
    await expect.soft(heading).toHaveText('Mouse Actions - Tooltip');
    console.log(await heading.textContent());
});

test('Hidden/Visible Elements Test', async({page})=>{
    await page.goto('https://www.letskodeit.com/practice');

    const hideBtn = page.locator('[id="hide-textbox"]');
    const showBtn = page.locator('[id="show-textbox"]');
    const showHideTxtFld = page.locator('[name="show-hide"]');

    await hideBtn.click();
    await expect.soft(showHideTxtFld).toBeHidden();

    await showBtn.click();
    await expect.soft(showHideTxtFld).toBeVisible();
});

test('Radio Button Test', async({page})=>{
    await page.goto('https://vinothqaacademy.com/demo-site/');

    const maleOption = page.getByLabel('Male', {exact: true});
    const femaleOption = page.getByLabel('Female', {exact: true});
    
    const isMaleOptChecked = await maleOption.isChecked();
    const isFemaleOptCheckec = await femaleOption.isChecked();

    if(!isMaleOptChecked){
        await maleOption.check();
    }
    await expect.soft(maleOption).toBeChecked();
    await expect.soft(femaleOption).not.toBeChecked();
});


test('Mouse-Click-Action-Test', async({page})=>{
    await page.goto('https://vinothqaacademy.com/mouse-event/');

    const textBox = page.locator('#textbox');
    const doubleClickBtn = page.locator('#dblclick');
    const rightClickBtn = page.locator('#rightclick');

    // Click
    await textBox.click();
    await page.keyboard.type("PlaywrightAutomation");
    await expect.soft(textBox).toHaveValue('PlaywrightAutomation');

    // Double-Click
    await doubleClickBtn.dblclick();
    await expect.soft(page.getByText('Double Click Action is Performed')).toBeVisible();

    // Right-Click
    await rightClickBtn.click({button: 'right'});
    await expect.soft(page.getByRole('link', {name: 'Registration Form'})).toBeVisible();
    await expect.soft(page.getByRole('link', {name: 'Alert Popup'})).toBeVisible();
    await expect.soft(page.getByRole('link', {name: 'Mouse Event'})).toBeVisible();

    const hoverElement = page.getByText('Free YouTube Courses').nth(1)
    const clickElement = page.getByRole('link', {name: 'Python for Automation'});
    await hoverElement.hover();
    await clickElement.click();

    await expect.soft(page).toHaveURL(/.*python*/)
    const pageTitle = await page.title();

    console.log("Page Title: ", pageTitle);
    console.log("Page URL: ", page.url());
});

test('Attribute Test', async ({ page }) => {
    await page.goto('https://vinothqaacademy.com/mouse-event/');
    const doublClickBtn = page.locator('[id="dblclick"]');

    const idValue = await doublClickBtn.getAttribute('id');
    console.log("ID: ", idValue);

    await expect.soft(doublClickBtn).toHaveAttribute('id', 'dblclick');
});

test('Broken Link Identifiers', async ({ page, request }) => {
    await page.goto('https://askomdch.com');

    const allLinks = page.locator('a');
    const totalLinks = await allLinks.count();

    console.log("Total Links: ", totalLinks);
    const brokenLinks: string[] = [];
    for(let i=0; i<totalLinks; i++){
        const link = allLinks.nth(i);
        const href = await link.getAttribute('href');

        

        if(href){
            const url = new URL(href, page.url()).href;
            const response = await request.get(url);
            try{
                if(response.status() >= 400){
                    brokenLinks.push(url);
                }

            }catch{
                brokenLinks.push(url);
            }
        }
    }

    console.log(`Total Broken Links: ${brokenLinks.length}`);
    brokenLinks.forEach((link)=>{
        console.log(link);
    });

    await page.close();
});

test('Broken Image Test', async ({ page, request }) => {
   await page.goto('https://askomdch.com');

   const allImages = page.locator('img');
   const totalImages = await allImages.count();
   console.log('Total Images Count: ', totalImages);

   const brokenImages: string[] = [];

   for(let i=0; i<totalImages; i++){
    const image = allImages.nth(i);
    const imageSrc = await image.getAttribute('src');

    if(imageSrc){
        const url = new URL(imageSrc, page.url()).href;
        
        try{
            const response = await request.get(url);
            if(response.status()>=400){
                brokenImages.push(url);
            }

        }catch{
            brokenImages.push(url);
        }
    }
   }

   console.log(`Broken Images: ${brokenImages.length}`);
   brokenImages.forEach((brokenImage)=>{
    console.log(`${brokenImage}`);
   })
   await page.close();
});

test('TUI-test', async ({ page }) => {
    await page.goto('https://www.tui.co.uk/');
    await page.getByLabel('Close consent Widget').click();
    await page.goto('https://www.tui.co.uk/mytui/register');
    await expect(page.getByLabel('Open main page')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create an account' })).toBeVisible();
  });

  test('TUI-test2', async ({ page }) => {
    await page.goto('https://www.tui.co.uk/');
    await page.locator('#cmCloseBanner').click();

    const loginLink = page.locator('[opti-login="Login"]');
    const createAccoutnLink = page.getByRole('link', {name: 'Create an account'});

    await loginLink.hover();
    await createAccoutnLink.click();
    
    await expect.soft(page).toHaveURL('https://www.tui.co.uk/mytui/register');
  });

  test('Test', async ({ page }) => {
    await page.goto('https://askomdch.com');

    console.log(page.url());
  })
  
