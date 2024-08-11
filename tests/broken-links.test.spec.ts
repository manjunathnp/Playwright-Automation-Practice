import { test, expect, request } from '@playwright/test';

test('Broken Links Finder Test', async ({ page, request }) => {
    //await page.goto('https://askomdch.com');
    await page.goto('https://bstackdemo.com/');
    //await page.goto('https://demoqa.com/links');
    await page.waitForLoadState();

    const allLinks = page.locator('a');
    const totalLinks = await allLinks.count();

    console.log('Total Links: ', totalLinks);
    const brokenLinks: string[] = [];

    for (let i = 0; i < totalLinks; i++) {
        const link = allLinks.nth(i);
        const href = await link.getAttribute('href');

        if (href) {
            const url = new URL(href, page.url()).href;
            
            try {
                const response = await request.get(url);
                //console.log(`${url} - ${response.statusText()}`);
                if (response.status() >= 400) {
                    brokenLinks.push(url);
                }
            } catch {
                brokenLinks.push(url);
            }
        }
    }
    console.log(`Total Broken Links: ${brokenLinks.length}`);

    console.log("Broken Links: ");
    brokenLinks.forEach(link => {
        console.log(`${link}`);
    });
});


test.skip('Broken Links Finder Test2', async ({ page,request }) => {
    await page.goto('https://askomdch.com');

    const allLinks = page.locator('a');
    const totalLinks = await allLinks.count();
    console.log('Total Links: ', totalLinks);

    let brokenLinks: string[] = [];

    for(let i=0; i<totalLinks; i++){
        const link = allLinks.nth(i);
        const href = await link.getAttribute('href');

        if(href){
            const url = new URL(href, page.url()).href;
            try{
                const response = await request.get(url);
                if(response.status() >= 400){
                    brokenLinks.push(url);
                }
            }catch{
                brokenLinks.push(url);
            }
        }
    }
    brokenLinks.forEach((urlLink)=>{
        console.log(urlLink);
    })
});

test.skip('Test Broken Images', async ({ page, request }) => {
    await page.goto('https://askomdch.com');

    const allImages = page.locator('img');
    const totatImages = await allImages.count();
    console.log('Total Images: ', totatImages);

    const brokenImages: string[] = [];

    for(let i=0; i<totatImages; i++){
        const image = allImages.nth(i);
        const href = await image.getAttribute('href');

        if(href){
            const url = new URL(href, page.url()).href;
            try{
                const response = await request.get(url);
                if(response.status() >= 400){
                    brokenImages.push(url);
                }

            }catch{
                brokenImages.push(url);
            }
        }
    }
    brokenImages.forEach((brokenImage)=>{
        console.log(brokenImage);
    })
});

