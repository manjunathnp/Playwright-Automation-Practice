import {test, expect, webkit} from '@playwright/test';

test.describe("Alerts-Tests-Validations", async()=>{

    test.beforeEach(async({ page })=>{
        await page.goto("https://vinothqaacademy.com/alert-and-popup/");
    });

    test("Alert-Box-Test", async({ page }) => {
        const alertBoxButton = page.locator('[name="alertbox"]');
        const alertClickConfMsg = page.locator('[id="demotwo"]');

        page.on('dialog', async(alert)=>{
            const alertMessage = alert.message();
            console.log("Alert Message: ", alertMessage);

            expect(alertMessage).toEqual("I am an alert box!");
            await alert.accept();
        });
        await alertBoxButton.click();
        
        console.log("Alert Click Confirmation Message: ", await alertClickConfMsg.textContent());
        await expect(alertClickConfMsg).toBeVisible();
    });

    test("Confirm-Alert-Box-Accept-Test", async({page})=>{
        const alertConfButton = page.locator('[name="confirmalertbox"]');
        const alertConfClickMsg = page.locator('[id="demo"]');

        page.on('dialog', async(alert)=>{
            const alertMessage = alert.message();
            console.log("Confirmation Alert Box - OK: ", alertMessage);

            expect.soft(alertMessage, {message: "Alert Message Mismatch"}).toEqual("Confirm pop up with OK and Cancel button");
            await alert.accept();
        });
        await alertConfButton.click();
        console.log("Alert Confrimation - OK Message: ", await alertConfClickMsg.textContent());
        expect(await alertConfClickMsg.textContent()).toEqual("You clicked on OK!");
    });

    test("Confirm-AlertBox-Dismiss-Test", async ({ page }) => {
        const alertConfButton = page.locator('[name="confirmalertbox"]');
        const alertConfClickMsg = page.getByText("You clicked on Cancel!");

        page.on('dialog', async(alert)=>{
            const alertMessage = alert.message();
            console.log("Confirmation Alert Box - CANCEL: ", alertMessage);

            expect(alertMessage).toEqual("Confirm pop up with OK and Cancel button");
            await alert.dismiss();
        })
        alertConfButton.click();
        console.log("Alert Confrimation - DISMISS Message: ", await alertConfClickMsg.textContent());
        expect(await alertConfClickMsg.textContent()).toEqual("You clicked on Cancel!");
    });

    test("Prompt-AlertBox-Dismiss-Test", async ({ page }) => {
        const promptAlertButton = page.locator('[name="promptalertbox1234"]');
        const promptAlertClickMessage = page.getByText("User cancelled the prompt.");

        page.on('dialog', async(alert)=>{
            const alertMessage = alert.message();
            console.log("Prompt Alert Message - OK: ", alertMessage);

            expect(alertMessage).toEqual("Do you like Automation ?");
            await alert.dismiss();
        });
        promptAlertButton.click();
        console.log("Promot Alert Confirmation - OK Message: ", await promptAlertClickMessage.textContent());
        expect(await promptAlertClickMessage.textContent()).toEqual("User cancelled the prompt.");
    });

    test("Prompt-AlertBox-Accept-Test", async ({ page }) => {
        const promptAlertButton = page.locator('[name="promptalertbox1234"]');
        const promptAlertClickMessage = page.getByText("Thanks for Liking Automation");

        page.on('dialog', async(dialog)=>{
            const inputText = "Yes";
            const alertMessage = dialog.message();
            console.log("Prompt Alert Message - OK: ", alertMessage);

            expect(alertMessage).toEqual("Do you like Automation ?");
            await dialog.accept(inputText);

        });
        promptAlertButton.click();
        console.log("Promot Alert Confirmation - OK Message: ", await promptAlertClickMessage.textContent());
        expect(await promptAlertClickMessage.textContent()).toEqual("Thanks for Liking Automation");
        
    });
    
    
    test.afterEach(async({page})=>{
        await page.close();
    });
    
});