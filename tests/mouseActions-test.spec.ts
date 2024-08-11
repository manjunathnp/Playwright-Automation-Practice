import {test, expect} from '@playwright/test';

test.describe("MouseActions-Tests-Validations", async()=>{

    test.beforeEach(async({ page })=>{
        await page.goto("https://vinothqaacademy.com/mouseevent/");
    });

    test("MouseClick-EnterText-Test", async({ page }) => {
        const textField = page.locator('[title="Enter First Name"]');

        await textField.click();
        await textField.pressSequentially("Tester Automating using PLAYWRIGHT!");
    });

    test("Mouse-Hover Test", async({ page }) => {
        const textField = page.locator('[title="Enter First Name"]');

        await page.getByText('About Me').nth(1).hover();
        await page.getByRole('link', { name: 'TechTalk' }).click();

        await expect(page).toHaveURL("https://vinothqaacademy.com/techtalk/");
    });

    test('Mouse-DoubleClick-Test', async ({ page }) => {
        const doublClickBtn = page.locator('[id="dblclick"]');
        const doubleClickMsg = page.getByText('Double Click Action is Performed').textContent();

        await doublClickBtn.dblclick();
        expect.soft(await doubleClickMsg).toEqual("Double Click Action is Performed");
      });

      test("Mouse-RighClick-Test", async({ page }) => {
        const rightClickBtn = page.getByRole('button', {name: "Right Click Me"});
        const rightClickMsg = page.getByRole('link', {name: "Registration Form"});

        await rightClickBtn.click({button: 'right'});
        await expect.soft(rightClickMsg).toBeVisible();
      });

      test("DragAndDrop-Test", async({ page }) => {
        const source = page.getByText("Drag Me");
        const target = page.getByText("Drop Here");
        const draggedElement = page.locator('[id="droppableElement"]').locator('[id="draggableElement"]');


        await source.dragTo(target);
        //await page.waitForTimeout(5000);
        await expect(draggedElement).toBeVisible();
        
      });

    test.afterEach(async({page})=>{
        await page.close();
    });
    
});