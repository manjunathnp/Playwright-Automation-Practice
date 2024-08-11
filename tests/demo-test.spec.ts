import { test } from '@playwright/test';
import * as data from '../resources/testFiles/testB.json';


const userInfo = [
    {
        "id": 100,
        "class": 10,
        "course": "IT"
    },
    {
        "id": 101,
        "class": 10,
        "course": "ISE"
    },
    {
        "id": 102,
        "class": 11,
        "course": "CSE"
    },
]

test('Fetch Data from userInfo', async ({ page }) => {
    for(const user of userInfo){
        console.log(`ID: ${user.id} | Class: ${user.class} | Course: ${user.course}`);
    }
})

test('Fetch Data from JSON File Test', async ({ page }) => {
    console.log("Name: ", data.name); // null
    console.log("Job: ", data.job); // null
})
