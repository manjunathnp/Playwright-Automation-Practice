import { test, expect } from '@playwright/test';


    test.describe.configure({retries: 1, timeout: 10_000, mode: 'serial'}) // Retries can be configured here 
    test.describe("Simple Assertions Validations", () => {
        
        test("Hard Assertions Test", async ({ page }) => {
            const a = 100;
            const b = 200;
            expect(a>b).toBeTruthy();

            console.log("This statement won't be printed on console");
        });

        test("Soft Assertions Test", async ({ page }) => {
            const a = 100;
            const b = 200;
            expect.soft(a>b).toBeTruthy();

            console.log("This statement will be printed on console");
        });
        
    })
    