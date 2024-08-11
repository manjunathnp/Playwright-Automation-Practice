import {test, expect} from '@playwright/test';
import * as fs from 'fs/promises';

    test.describe('File Upload Validations', () => {
        test.beforeEach(async ({page}) => {
            await page.goto('https://the-internet.herokuapp.com/download');
        });


        test('Download Test', async ({ page }) => {
            const file = 'example.pdf'
            // Start waiting for download before clicking. Note no await.
            const downloadPromise = page.waitForEvent('download');
            await page.getByText(file).click();
            const download = await downloadPromise;

            // Wait for the download process to complete and save the downloaded file somewhere.
            await download.saveAs('./resources/downloads/' + download.suggestedFilename());
            //await download.saveAs('./resources/downloads/' + "test.png");
            
            const downloadedFile = "./resources/downloads/";
            const filePath = downloadedFile+file;
            await checkFileExists(filePath);

            async function checkFileExists(filePath: string){
                try {
                    await fs.access(filePath);
                    console.log("The file named '"+download.suggestedFilename()+"' exists in the specificed path:\n", filePath);
                    //console.log("+download.suggestedFilename()+" file exists in the specified path.");
                } catch (error) {
                    console.error('The file does not exist in the specified path.');
                    throw new Error('File not found'); // Throwing an error
                }
            }
        });
        

        test.afterEach(async ({page}) => {
            await page.close();
        });

    });