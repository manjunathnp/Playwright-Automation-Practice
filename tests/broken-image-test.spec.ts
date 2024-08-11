import {test, expect} from '@playwright/test';

test('Broken Image Finder Test', async({page, request})=>{
    await page.goto('https://askomdch.com');

    const allImages = page.locator('img');
    const totalImages = await allImages.count();
    console.log("Total Images: ", totalImages);

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

    console.log(`Total Broken Images: ${brokenImages.length}`);

    console.log('Broken Image Details: ');
    brokenImages.forEach(urlLink =>{
      console.log(`${urlLink}`);
    });
});