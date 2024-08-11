import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://bstackdemo.com/');
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.locator('#username svg').click();
  await page.getByText('demouser', { exact: true }).click();
  await page.locator('#password svg').click();
  await page.getByText('testingisfun99', { exact: true }).click();
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page.locator('[id="__next"]')).toContainText('demouser');
  await page.getByRole('link', { name: 'Logout' }).click();
});

test('Login Test', async ({ page }) => {
    await page.goto('https://bstackdemo.com/');
    await page.getByRole('link', {name: 'Sign In'}).click();

    await page.locator('#username').click();
    await page.getByText('demouser', {exact: true}).click();

    await page.locator('#password').click();
    await page.getByText('testingisfun99', {exact: true}).click();

    await page.getByRole('button', {name: 'Log In'}).click();

    await expect.soft(page.locator("xpath=//span[@class='username']")).toContainText('demouser');
});

test('Broken Links Finder', async ({ page, request }) => {
    await page.goto('https://bstackdemo.com/');

    const allLinks = page.locator('a');
    const totalLinks = await allLinks.count(); 

    const brokenLinks: string[] = [];

    for(let i=0; i<totalLinks; i++){
        const link = allLinks.nth(i);
        const href = await link.getAttribute('href');

        if(href){
            const url = new URL(href, page.url()).href;
            try{
                const response = await request.get(url);
                if(response.status()>=400){
                    brokenLinks.push(url);
                }
            }catch{
                brokenLinks.push(url);
            }
        }
    }

    brokenLinks.forEach((brokenLink)=>{
        console.log(brokenLink);
    });
});

test('Broken Image Finder', async ({ page, request }) => {
    await page.goto('https://bstackdemo.com/');
    await page.getByRole('link', {name: 'Sign In'}).click();

    await page.locator('#username').click();
    await page.getByText('image_not_loading_user', {exact: true}).click();

    await page.locator('#password').click();
    await page.getByText('testingisfun99', {exact: true}).click();

    await page.getByRole('button', {name: 'Log In'}).click();

    await expect.soft(page.locator("xpath=//span[@class='username']")).toContainText('image_not_loading_user');

    const allImages = page.locator('img');
    const totalImages = await allImages.count();
    console.log("Total Images: ", totalImages);

    const brokenImages: string[] = [];
    for(let i=0; i<totalImages; i++){
        const image = allImages.nth(i);
        const imageSrc = await image.getAttribute('src alt');

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
    console.log("Total Broken Images: ", brokenImages.length);
    brokenImages.forEach((brokenImage)=>{
        console.log(brokenImage);
    });
});


