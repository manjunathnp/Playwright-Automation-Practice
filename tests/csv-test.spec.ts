// import { test } from '@playwright/test';
// import fs from 'fs';
// import path from 'path';
// import { parse } from 'csv-parse/sync';


// // Read and parse the CSV file
// const records = parse(fs.readFileSync(path.join('./resources','testFiles','data.csv')), {
//     columns: true,
//     skip_empty_lines: true
//   });

// // Loop through the records and create tests
// records.forEach((data) => {
//     test(`MyTest ${data.empid}`, async ({ page }) => {
//         //await page.goto(data.some_value); // Perform test actions here
//         // Add your test assertions
//         console.log("Test_Case: ",data.empid);
//         console.log("Some_Value: ",data.empname);
//         console.log("Some_Other_Value: ",data.dept);
        
//     });
// });

// import {test} from '@playwright/test';
// import fs from 'fs';
// import path from 'path';
// import {parse} from 'csv-parse/sync';

// const record = parse(fs.readFileSync(path.join('./resources','testFiles', 'data.csv')), {
//     columns: true,
//     skip_empty_lines: true
// });

// record.forEach((data)=>{
//     test(`Test for ${data.empid}`, async({page})=>{
//         console.log("Emp ID: ", data.empid);
//         console.log("Emp Name: ", data.empname);
//         console.log("Emp Dept: ", data.dept);
//     });
// });


// import {test} from '@playwright/test';
// import * as data from '../resources/testFiles/creds.json';

// test('JSON Test', async ({ page }) => {
//     console.log("Username: ", data.username);
//     console.log("Department",data.department);
// });

// import { test } from '@playwright/test';

// const userdata = [
//     {
//         "username": "tester",
//         "department": "qa"
//     },
//     {
//         "username": "tester2",
//         "department": "testing"
//     }

// ];

// test('Test Data Test', async ({ page }) => {
//     console.log("Username: ", userdata[0].username);
//     console.log("Department: ", userdata[0].department);
// });

// userdata.forEach((data)=>{
//     test(`test data ${data.username}`, async ({ page }) => {
//         console.log("Username: ", data.username);
//         console.log("Department: ", data.department);
//     });
// });

