import { test, expect } from '@playwright/test';

test.describe("Dropdown-Select-Validations", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/dropdown");
    });

    test("Dropdown-Select-Test-Approch1", async ({ page }) => {
        const dropdownList = page.locator('#dropdown');
        const totalOptions =  dropdownList.locator('option');
        console.log(`Total Options: ${await totalOptions.count()-1}`);

        // Select by value
        await page.selectOption('#dropdown', '1');
        const selectedOption = await dropdownList.locator('option:checked').textContent();
        console.log("Selected Option: ", selectedOption);
        await expect.soft(dropdownList).toHaveValue('1');

        // Select by label
        await page.selectOption('#dropdown', '2');
        await expect.soft(dropdownList).toHaveValue('2');
    });

    test("Dropdown-Select-Test-Approch2", async ({ page }) => {
        const dropdownList = page.locator('#dropdown');
        console.log('Total Options: ',await dropdownList.count());

        // Select by value
        await dropdownList.selectOption({value: "1"});
        await expect.soft(dropdownList).toHaveValue('1');

        // Select by label
        await dropdownList.selectOption({label: "Option 2"});
        await expect.soft(dropdownList).toHaveValue('2');

        // Select by index
        await dropdownList.selectOption({index: 2});
        // Get the text of the selected option
        const selectedOption = await dropdownList.locator('option:checked').textContent();
        // Validate the selected option's label
        console.log("Selected Option: ", selectedOption);
        await expect.soft(selectedOption).toBe('Option 2');
    });
    
    test("Select Option Count Test", async({ page })=>{
        const selectElement = page.locator('#dropdown');

        // Get the number of options
        const optionCount = await selectElement.locator('option').count();

        // Initialize an array to hold option values and texts
        //const options: { value: string | null; text: string | null; }[] = [];
         const options: {text: string | null;}[] = [];

        // Loop through each option and get its value and text
        for (let i = 0; i < optionCount; i++) {
            //const value = await selectElement.locator('option').nth(i).getAttribute('value');
            const text = await selectElement.locator('option').nth(i).textContent();
            //options.push({ value, text });
            options.push({text});
        }

        // Log the options to the console
        // console.log("Options: ",options);
        // console.log("Options Count: ",options.length);

        // Log the options to the console
        options.forEach(option => console.log(option));

        // Add assertions if necessary
        //expect(options.length).toBe(expectedNumberOfOptions); // replace with actual number
    });


    test.afterEach(async ({ page }) => {
        await page.close();
    });

})
