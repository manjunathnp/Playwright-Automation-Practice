import { test, expect } from '@playwright/test';
/**==============================================================================*/
test.beforeAll(async () => {
    console.log('Executed before all tests - EXECUTED ONLY ONCE');
  });
/**==============================================================================*/
  
  test.beforeEach(async ({ page }) => {
    console.log("Executed before each test");
  });
/**----------------------------------------------------------------------------- */
test('Test1', async ({ page }) => {
    console.log("Test1 Executed");
  });

  test('Test2', async ({ page }) => {
    console.log("Test2 Executed");
  });

  test('Test3', async ({ page }) => {
    console.log("Test3 Executed");
  });
/**----------------------------------------------------------------------------- */
  test.afterEach(async ({ page }) => {
    console.log("Executed after each test");
  })
  
/**==============================================================================*/
  test.afterAll(async ({ browser }) => {
    console.log('Executed after all tests - EXECUTED ONLY ONCE');
  });
/**==============================================================================*/