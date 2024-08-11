import { chromium, expect, test } from '@playwright/test';
import * as fs from 'fs/promises';

test('URL Test', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/');

    //await expect.soft(page).toHaveURL('https://qa-practice.netlify.app/');
    //await expect.soft(page).toHaveURL(/.*qa-practice/);
    expect.soft(page.url()).toContain('.app');
});

test('Title Test', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/');

    //expect.soft(await page.title()).toContain('QA Practice');
    //await expect.soft(page).toHaveTitle('QA Practice | Learn with RV');
    //expect.soft(await page.title()).toBe('QA Practice | Learn with RV');
    await expect.soft(page).toHaveTitle(/.*QA/);
});

test('Login Test', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/auth_ecommerce.html');
    await page.getByRole('textbox', {name: 'Email'}).fill('admin@admin.com');
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123');
    await page.getByRole('button', {name: 'Submit'}).click();

    await expect.soft(page.locator('.section-header')).toContainText('SHOPPING')
});

test('Recover Password +ve Test', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/recover-password');
    await page.locator('#email').fill('test@testmail.com');
    await page.getByRole('button', {name: 'Recover Password'}).click();
    expect.soft(page.locator('#message')).toContainText('Please verify your inbox!');
});

test('All Images Finder', async ({ page }) => {
    await page.goto('https://askomdch.com');

    const allImages = page.locator('img');
    console.log('Total Images: ', await allImages.count());
});

test('All Links Finder', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/');
    const allLinks = page.locator('a');
    console.log('Total Links: ', await allLinks.count());
});

test('Drag & Drop Test', async ({ page }) => {
    await page.goto('https://seleniumbase.io/other/drag_and_drop');

    const srcElement = page.locator('#drag1');
    const targetElement = page.locator('#div1');

    await srcElement.dragTo(targetElement);
    //await targetElement.locator('#drag1').isVisible();
    expect.soft(await page.locator('#div1').locator('#drag1').isVisible()).toBeTruthy();
});

test('Text Match Test', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/auth_ecommerce');
    const loginShopHeading = page.getByRole('heading', {name: 'Login - Shop'});

    await expect.soft(loginShopHeading).toHaveText('Login - Shop');
    await expect.soft(page.locator('#loginSection')).toContainText('Login - Shop');
});

test('Show-Hide Test', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/show-hide-element');
    const showHideBtn = page.getByRole('button', {name: 'Show / Hide'});
    const hiddenText = page.locator('#hiddenText');

    await showHideBtn.click();
    
    await expect.soft(hiddenText).toBeHidden();
    await showHideBtn.click();
    await expect.soft(hiddenText).toBeVisible();
});

test('Radio Buttons Test', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/radiobuttons');

    const radBtn1 = page.locator('#radio-button1');
    const radBtn2 = page.locator('#radio-button2');
    const radBtn3 = page.locator('#radio-button3');
    const radBtn4 = page.locator('#radio-button4');

    await expect.soft(radBtn1).not.toBeChecked();
    await expect.soft(radBtn3).toBeChecked();
    await expect.soft(radBtn4).toBeDisabled();

    await radBtn2.click();
    await expect.soft(radBtn2).toBeChecked();

});

test('Mouse Click Actions - Double Click', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/');

    const buttonLink = page.getByRole('link', {name: 'Btn actions'});
    const doubleClickLink = page.getByRole('link', {name: 'Double click btn'});
    const doubleClickBtn = page.getByRole('button', {name: 'Double click me'});
    const doubleClickMsg = page.locator('#double-click-result');

    await buttonLink.click({button: 'left'});
    await doubleClickLink.click();
    await doubleClickBtn.dblclick();

    await expect.soft(doubleClickMsg).toHaveText('Congrats, you double clicked!');
    


});

test('Mouse Hover Test', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/mouse-hover');

    const hoverBtn = page.locator('#button-hover-over');
    const hoverMsg = page.locator('.hide');

    await hoverBtn.hover();
    await expect.soft(hoverMsg).toHaveText('I am shown when someone hovers over the text above.');
});

test('Assertions Demo', async ({ page }) => {
    const x = 10, y = 20;
    expect.soft(x<y).toBeTruthy();
    console.log('Soft Assertion: This line will be printed');
   
    // const a = 10, b = 20;
    // expect(a>b).toBeTruthy();
    // console.log('Hard Assertion: This line wont be printed');
});

test('Attribute Validations', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/checkboxes');
    const checkBox1 = page.locator('#checkbox1')
    await expect.soft(checkBox1).toHaveAttribute('id', 'checkbox1');
    await checkBox1.click();

    await expect.soft(checkBox1).toBeChecked();
    const checkBox1AttributeVal = await checkBox1.getAttribute('id');
    console.log(checkBox1AttributeVal);
});

test('Broken Links Validation', async ({ page, request }) => {
    await page.goto('https://qa-practice.netlify.app/');

    const allLinks = page.locator('a');
    const totatLinks = await allLinks.count();
    console.log('Total Links: ', await allLinks.count());

    let brokenLinks : string[] = [];

    for(let i=0; i<totatLinks; i++){
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
    
    brokenLinks.forEach((brokenLink)=>{
        console.log(brokenLink);
    });
});

test('Broken Image Validation', async ({ page, request }) => {
    await page.goto('https://askomdch.com/')

    const allImages = page.locator('img');
    const totalImages = await allImages.count();
    console.log('Total Images: ', totalImages);

    let brokenImages: string[] = [];

    for(let i=0; i<totalImages; i++){
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
    });
});


test('Navigations Test', async ({ page }) => {
    await page.goto('https://bstackdemo.com/');
    await expect.soft(page).toHaveURL('https://bstackdemo.com/');

    const orderLink = page.getByText('Orders');
    await orderLink.click();
    await expect.soft(page).toHaveURL('https://bstackdemo.com/signin?orders=true');

    await page.goBack();
    await expect.soft(page).toHaveURL('https://bstackdemo.com/');
    await page.goForward();
    await expect.soft(page).toHaveURL('https://bstackdemo.com/signin?orders=true');
    await page.goBack();
    await page.reload();
    await expect.soft(page).toHaveURL('https://bstackdemo.com/');
});

const creds = [
    {
        "username": "standard_user",
        "password": "secret_sauce"
    },
    {
        "username": "problem_user",
        "password": "secret_sauce"
    }
];

creds.forEach((data)=>{
    test(`Test for ${data.username} validations: `, async({page})=>{
        await page.goto("https://www.saucedemo.com/");
        const usernameTextField = page.locator('[data-test="username"]');
        const passwordTextField = page.locator('[data-test="password"]');
        const loginButton = page.locator('[data-test="login-button"]');
        const productsText = page.locator('[data-test="title"]');
    
        await usernameTextField.fill(data.username);
        await passwordTextField.fill(data.password);
    
        await loginButton.click();
        await expect(productsText).toBeVisible();
    
        await page.close();
    });
});

test('Uploading File Test-Approach-1', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/file-upload');

    const fileName = 'data.csv'
    const filePath = 'resources/testFiles/data.csv';
    const submitBtn = page.getByRole('button', {name: 'Submit'});
    const fileUploadResponse = page.locator('#file_upload_response');
    const uploadSuccessMsg = `You have successfully uploaded "${fileName}"`;

    await page.setInputFiles('#file_upload', filePath);
    await submitBtn.click();
    await expect.soft(fileUploadResponse).toHaveText(uploadSuccessMsg);

});

test('Uploading File Test Approach-2', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/file-upload');

    const fileName = 'data.csv'
    const filePath = 'resources/testFiles/data.csv';
    const submitBtn = page.getByRole('button', {name: 'Submit'});
    const fileUploadResponse = page.locator('#file_upload_response');
    const uploadSuccessMsg = `You have successfully uploaded "${fileName}"`;

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('[name="filename"]').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
    await submitBtn.click();
    await expect.soft(fileUploadResponse).toHaveText(uploadSuccessMsg);
});

test('Downloading Test', async ({ page }) => {
    const fileName = 'Testing.txt';
    const fileLink = page.getByRole('link', {name: `${fileName}`});
    const downloadsPath = './resources/downloads/';
    const filePath = downloadsPath+fileName;
    
    await page.goto('https://the-internet.herokuapp.com/download');
    
    
    const downloadPromise = page.waitForEvent('download');
    await fileLink.click();
    const download = await downloadPromise;
    await download.saveAs(downloadsPath+download.suggestedFilename());
    await checkIfFileExists(filePath);

    async function checkIfFileExists(filePath: string) {
        try{
            await fs.access(filePath);
        }catch(error){
            console.error('No Such File')
        }
    }

});

test('Download Test Practice-2', async ({ page }) => {
    const fileName = 'Testing.txt';
    const fileLink = page.getByRole('link', {name: `${fileName}`});
    const downloadsPath = './resources/downloads/';
    const filePath = downloadsPath+fileName;
    
    await page.goto('https://the-internet.herokuapp.com/download');

    const fileDownloadPromise = page.waitForEvent('download');
    await fileLink.click();
    const download = await fileDownloadPromise;
    await download.saveAs(downloadsPath+download.suggestedFilename());
    await checkIfFileExists(filePath);

    async function checkIfFileExists(filePath: string){
        try{
            await fs.access(filePath);
        }catch(error){
            console.error('File Not Found');
        }
    }

});

test('Alert Test1', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/alerts');

    const alertBtn = page.locator('#alert-btn');
    const confirmBtn = page.locator('#confirm-btn');

    // page.on('dialog', async(alert)=>{
    //     expect.soft(alert.message()).toContain('Hello! I am an alert box!!');
    //     await alert.accept();
    // });
    //await alertBtn.click();

    page.on('dialog', async(alert)=>{
        expect.soft(alert.message()).toContain('Either OK or Cancel');
        await alert.dismiss();
    });
    await confirmBtn.click();
});

test('Dropdowns Test1', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/dropdowns');
    await page.getByRole('button', { name: 'Dropdown' }).click();
    await page.getByRole('link', { name: 'Some action' }).click();

    await expect.soft(page).toHaveURL(/.*some-action/);
});

test('Dropdowns Test2', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/dropdowns')
    const dropDownMenu = page.locator('#dropdown-menu');

    await dropDownMenu.selectOption({label: 'India'});
    const selectedOption = await dropDownMenu.locator('option:checked').textContent();
    expect.soft(selectedOption).toContain('India');
});

test('Dropdown Test3', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/dropdowns')
    const dropDownMenu = page.locator('#dropdown-menu');

    const totalOptions = await dropDownMenu.locator('option').count();
    console.log('Total Options: ', totalOptions);

    for(let i=1; i<totalOptions; i++){
        const text = await dropDownMenu.locator('option').nth(i).textContent();
        console.log(text?.trim());
    }
});

test('Multi-Dropdown Test1', async ({ page }) => {
    await page.goto('https://www.letskodeit.com/practice')
    const multiDropdownMenu = page.locator('#multiple-select-example'); 
    const totalOptions = await multiDropdownMenu.locator('option').count();
    console.log('Total Options: ', totalOptions);

    for(let i=0; i<totalOptions; i++){
        const option = await multiDropdownMenu.locator('option').nth(i).textContent();
        console.log(option?.trim());
    }
});

test('Multi-Dropdown Test2', async ({ page }) => {
    await page.goto('https://www.letskodeit.com/practice')
    const multiDropdownMenu = page.locator('#multiple-select-example'); 

    await multiDropdownMenu.selectOption(['Apple', 'Peach']);
    const selectedOptions = await multiDropdownMenu.locator('option:checked').allTextContents();
    console.log(selectedOptions);
    await expect.soft(selectedOptions).toEqual(['Apple', 'Peach']);
});

test('Take Screenshots Test1', async ({ page }) => {
    await page.goto('https://www.letskodeit.com/practice');
    const practicePageElement = page.locator('[data-uniqid="1621702280245"]');

    await page.screenshot({path: `./screenshots/${test.info().title}.png`});
    await page.screenshot({path: `./screenshots/${test.info().title}_FullPage.png`, fullPage: true});
    await practicePageElement.screenshot({path: `./screenshots/${test.info().title}_elm_ss.png`});
});

test('Frame Test1', async ({ page }) => {
    await page.goto('https://www.letskodeit.com/practice');
    await page.frameLocator('iframe[name="iframe-name"]').getByRole('link', { name: 'Sign In' }).click();
    //await expect(page.frameLocator('iframe[name="iframe-name"]').getByText('Login').nth(1)).toContainText('Login');
  });

  test('Window Handling Test1', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/window');
    const newWindowBtn = page.locator('#newWindowBtn');

    const [newWindow] = await Promise.all([
        page.waitForEvent('popup'),
        await newWindowBtn.click()
    ]);
    await newWindow.waitForLoadState('load');
    const pages = newWindow.context().pages();
    const childWindowTitle = await pages[1].title();
    console.log('Child Window Title: ', childWindowTitle);

    expect(childWindowTitle).toBe('QA Practice | Learn with RV');
    await pages[1].close();
  });

  test('Window Tab Test1', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/tab');
    const newTabLink = page.getByRole('link', {name: 'Press me - New Tab'});

    const [newTab] = await Promise.all([
        page.waitForEvent('popup'),
        newTabLink.click()
    ]);
    await newTab.waitForLoadState('load');
    const pages = newTab.context().pages();
    const newTabTitle = await pages[1].title();
    expect(newTabTitle).toBe('QA Practice | Learn with RV');

    await pages[1].getByRole('link', {name: 'Contact'}).click();
    expect(pages[1].url()).toContain('contact-us');

    await pages[1].close();
  });

  test('Video Recording Test1', async ({ }) => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        recordVideo: {
            dir: './videos',
            size: {width: 1800, height: 1200}
        }
    }); 
    const page = await context.newPage();
    await page.goto('https://askomdch.com');

    console.log('Video Path: ', await page.video()?.path());

  })
  
  
  




























test.afterEach(async ({ page }) => {
    await page.close();
});





