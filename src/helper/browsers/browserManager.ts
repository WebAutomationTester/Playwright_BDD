
// src/support/browser-setup.ts
import { BeforeAll, Before, After, AfterAll } from '@cucumber/cucumber';
import { chromium, firefox, webkit, Browser, BrowserContext, Page } from '@playwright/test';
import { config } from '../../config/env';

let browser: Browser;
let context: BrowserContext;
export let page: Page;

BeforeAll(async () => {
  switch (config.browser.toLowerCase()) {
    case 'firefox':
      browser = await firefox.launch({ headless: config.headless });
      break;
    case 'webkit':
      browser = await webkit.launch({ headless: config.headless });
      break;
    default:
      browser = await chromium.launch({ 
        headless: config.headless,
        slowMo: config.slowMo
      });
  }
});

Before(async () => {
  context = await browser.newContext();
  page = await context.newPage();
});

After(async () => {
  await context.close();
});

AfterAll(async () => {
  await browser.close();
});















// // src/support/browser-setup.ts
// import { Before, After, BeforeAll, AfterAll, Status, setWorldConstructor } from '@cucumber/cucumber';
// import { Browser, BrowserContext, Page, chromium, firefox, webkit, BrowserContextOptions } from '@playwright/test';
// import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';
// import { BasePage } from '../../Pages/base_Page'; // Centralized page objects
// import { IWorldOptions, World } from '@cucumber/cucumber';

// // 1. Extend Cucumber World with custom properties
// export interface CustomWorld {
//   context: BrowserContext;
//   page: Page;
//   pages: BasePage; // All page objects available in steps
//   testName: string;
//   attach: (buffer: Buffer, mimeType: string) => void;
// }

// declare module '@cucumber/cucumber' {
//   interface World extends CustomWorld {}
// }

// // World constructor
// setWorldConstructor(function (this: World, { parameters }: IWorldOptions) {
//   this.testName = parameters.name;
// });

// // setWorldConstructor<CustomWorld>(function (this: CustomWorld, { parameters }) {
// //   this.testName = parameters.name;
// // });

// // 2. Global browser instance
// let browser: Browser;
// const HEADLESS = process.env.HEADLESS !== 'false';
// const BROWSER_NAME = process.env.BROWSER || 'chromium';
// const SLOW_MO = Number(process.env.SLOW_MO) || 0;

// // 3. Default context options
// const contextOptions: BrowserContextOptions = {
//   viewport: { width: 1920, height: 1080 },
//   recordVideo: process.env.RECORD_VIDEO ? { dir: 'test-results/videos' } : undefined,
//   permissions: ['geolocation'],
//   locale: 'en-US',
//   timezoneId: 'America/New_York'
// };

// // 4. Browser lifecycle
// BeforeAll(async function () {
//   switch (BROWSER_NAME.toLowerCase()) {
//     case 'firefox':
//       browser = await firefox.launch({ headless: HEADLESS, slowMo: SLOW_MO });
//       break;
//     case 'webkit':
//       browser = await webkit.launch({ headless: HEADLESS, slowMo: SLOW_MO });
//       break;
//     default:
//       browser = await chromium.launch({ 
//         headless: HEADLESS, 
//         slowMo: SLOW_MO,
//         channel: 'chrome' // Use installed Chrome browser
//       });
//   }
// });

// // 5. Scenario-level setup
// Before(async function (this: CustomWorld) {
//   this.context = await browser.newContext(contextOptions);
//   this.page = await this.context.newPage();
  
//   // Initialize all page objects with the current page
//   this.pages = new BasePage(this.page);
  
//   // Trace and video recording
//   if (process.env.TRACE === 'on') {
//     await this.context.tracing.start({ screenshots: true, snapshots: true });
//   }
// });

// // 6. Scenario-level teardown
// After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
//   // Attach artifacts on failure
//   if (scenario.result?.status === Status.FAILED) {
//     const screenshot = await this.page.screenshot({ 
//       path: `test-results/screenshots/${scenario.pickle.name}.png`,
//       fullPage: true 
//     });
//     this.attach(screenshot, 'image/png');
    
//     if (process.env.TRACE === 'on') {
//       const tracePath = `test-results/traces/${scenario.pickle.name}.zip`;
//       await this.context.tracing.stop({ path: tracePath });
//       this.attach(fs.readFileSync(tracePath), 'application/zip');
//     }
//   }

//   // Cleanup
//   await this.context.close();
// });

// // 7. Global teardown
// AfterAll(async () => {
//   await browser.close();
// });