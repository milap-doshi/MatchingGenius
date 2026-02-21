/*
Automated screenshot helper using Playwright.
Usage:
  1. Install Playwright: `npm i -D playwright`
  2. Run the script: `node scripts/capture_screenshots.js`

It will navigate to the running dev server at http://localhost:5174 (adjust if necessary)
and capture screenshots for 4x4, 6x6, 8x8 flows.
*/

const { chromium } = require('playwright');
const fs = require('fs');

const URL = process.env.SITE_URL || 'http://localhost:5174';
const outDir = 'screenshots';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  await page.goto(URL);
  // Flow: click Start → pick difficulty → set players → start game

  // 1) Start - click start button
  await page.click('button:text("Start New Game")').catch(()=>{});

  // For each size, select difficulty and capture screenshot after board renders
  const sizes = [{label:'Easy',size:4},{label:'Normal',size:6},{label:'Hard',size:8}];

  for (const s of sizes) {
    // Try clicking button by label
    await page.click(`button:has-text("${s.label}")`).catch(()=>{});
    // On player setup, just accept defaults and start
    await page.click('button:text("Start Game")').catch(()=>{});

    // Wait for grid to render
    await page.waitForSelector('.grid', { timeout: 5000 }).catch(()=>{});
    // Small delay
    await page.waitForTimeout(500);

    const path = `${outDir}/board_${s.size}x${s.size}.png`;
    await page.screenshot({ path, fullPage: true });

    // Navigate back to landing (use Play again or Home button if present)
    await page.click('button:text("Home")').catch(async ()=>{
      // fallback: go to base URL
      await page.goto(URL);
    });
  }

  await browser.close();
  console.log('Screenshots saved to', outDir);
})();
