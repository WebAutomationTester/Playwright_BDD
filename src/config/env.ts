import 'dotenv/env';

export const config  = {
  headless: process.env.HEADLESS !== 'false',
  browser: process.env.BROWSER || 'chromium',
  slowMo: Number(process.env.SLOW_MO) || 0
} as const;