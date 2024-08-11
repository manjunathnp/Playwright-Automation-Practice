import { test as base, chromium, firefox, webkit, Browser, BrowserContext } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;

type BrowserFixtures = {
  context: BrowserContext;
};

const test = base.extend<BrowserFixtures>({
  context: async ({}, use) => {
    await use(context);
  },
});

test.beforeAll(async ({ browserName }) => {
  if (browserName === 'firefox') {
    browser = await firefox.launch();
  } else if (browserName === 'webkit') {
    browser = await webkit.launch();
  } else {
    browser = await chromium.launch();
  }
});

test.afterAll(async () => {
  await browser.close();
});

test.beforeEach(async () => {
  context = await browser.newContext();
});

test.afterEach(async () => {
  await context.close();
});

export { test };
export const expect = test.expect;
