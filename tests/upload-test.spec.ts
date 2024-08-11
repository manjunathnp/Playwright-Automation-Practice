import {test, expect} from '@playwright/test';

    test.describe('File Upload Validations', () => {
        test.beforeEach(async ({page}) => {
            await page.goto('https://the-internet.herokuapp.com/upload');
        });

        test('Upload Single File Test', async ({ page }) => {
            const testFile1Path = "resources/testFiles/";
            const fileName = "test1.txt";
            const uploadSelectionSelector = '#file-upload';
            const uploadButton = page.locator('#file-submit');

            await page.setInputFiles(uploadSelectionSelector, testFile1Path+fileName);
            await uploadButton.click();

            expect.soft(await page.getByText('File Uploaded!').isVisible()).toBeTruthy();
            expect.soft(await page.getByText(fileName).isVisible()).toBeTruthy();
        });
        test.afterEach(async ({page}) => {
            await page.close();
        });
    });

    test.describe("File Upload Validations - Site2", () => {
        test.beforeEach(async ({page}) => {
            await page.goto('https://blueimp.github.io/jQuery-File-Upload/');
        });

        test('Single File Upload Test', async ({ page }) => {
            await page.setInputFiles('[name="files[]"]', "resources/testFiles/testImage.png");
            
            expect(await page.getByText('testImage.png').isVisible()).toBeTruthy();
        });

        test('Multiple Files Upload Test', async ({ page }) => {
            const files = ["resources/testFiles/testImage.png", "resources/testFiles/testImage2.png"]
            await page.setInputFiles('[name="files[]"]', files);
            
            expect(await page.getByText('testImage.png').isVisible()).toBeTruthy();
            expect(await page.getByText('testImage2.png').isVisible()).toBeTruthy();
        });

        test('FileChooser Option Single Upload Test', async ({ page }) => {
            const testFile1Path = "resources/testFiles/";
            const fileName = "testImage.png";

            // Start waiting for file chooser before clicking. Note no await.
            const fileChooserPromise = page.waitForEvent('filechooser');
            await page.locator('[name="files[]"]').click();
            const fileChooser = await fileChooserPromise;
            await fileChooser.setFiles(testFile1Path+fileName);

            expect(await page.getByText('testImage.png').isVisible()).toBeTruthy();

        });

        test('FileChooser Option Multiple Upload Test', async ({ page }) => {
            // const testFilePath = "resources/testFiles/";
            // const fileName1 = "testImage.png";
            // const fileName2 = "testImage2.png";
            const files = ["resources/testFiles/testImage.png", "resources/testFiles/testImage2.png"]

            // Start waiting for file chooser before clicking. Note no await.
            const fileChooserPromise = page.waitForEvent('filechooser');
            await page.locator('[name="files[]"]').click();
            const fileChooser = await fileChooserPromise;
            await fileChooser.setFiles(files);

            expect.soft(await page.getByText('testImage.png').isVisible()).toBeTruthy();
            expect.soft(await page.getByText('testImage2.png').isVisible()).toBeTruthy();
        });
        
        

        test.afterEach(async ({page}) => {
            await page.close();
        });

    });
    
    