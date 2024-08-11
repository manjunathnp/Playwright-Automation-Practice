import { test, expect } from '@playwright/test';

test("Broken Links Finder Test", async({ page })=>{

  await page.goto("https://askomdch.com");

  const allLinks = page.locator("a");
  const totalLinks = await allLinks.count();
  console.log("Total Links: ", totalLinks);

  const links: string[] = []
  for(let i=0; i<totalLinks; i++){
    const link = allLinks.nth(i);
    const href = await link.getAttribute("href");

    if(href){
      const fullURL = new URL(href, page.url()).href;
      links.push(fullURL);
    }
  }


  console.log("\nURL Links: ");
  links.forEach(urlLink => console.log(urlLink));

});
