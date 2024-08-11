import { test, expect } from '@playwright/test';
import * as data from '../resources/testFiles/testA.json';

test('Read Data from JSON File', async({page})=>{
    console.log("Name: ", data.name);
    console.log("Job: ", data.job);
});