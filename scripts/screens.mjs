// HD screenshot capture of the live NeuroMind site → Desktop/NeuroMind Screenshots
// Desktop pages: 1440px wide @2x, sliced ≤8000 CSS px tall (Chromium capture limit ~16384px).
// Mobile: 390px @3x. Reduced-motion emulated so scroll-reveal animations never hide content.
// ponytail: one-shot script, not wired into the repo build.
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const EXE = 'C:/Users/ihp52/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe';
const DIR = 'C:/Users/ihp52/Desktop/NeuroMind Screenshots';
const BASE = 'https://neuromind-website-nine.vercel.app';
mkdirSync(DIR, { recursive: true });

const browser = await chromium.launch({ executablePath: EXE, headless: true });

async function capture(ctxOpts, routes, prepare, opts) {
  const ctx = await browser.newContext({ ...ctxOpts, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const out = [];
  for (const [name, route] of routes) {
    await page.setViewportSize(ctxOpts.viewport); // reset before each route so heights are measured at the real base viewport
    await page.goto(BASE + route, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    if (prepare) await prepare(page);
    const h = await page.evaluate(() => Math.ceil(document.documentElement.scrollHeight));
    if (opts?.viewportOnly) {
      await page.screenshot({ path: `${DIR}/${name}.png`, type: 'png' });
      out.push({ name, h, parts: 1 });
      continue;
    }
    // Resize viewport to the largest safe capture height, then slice if the page is taller.
    const cap = ctxOpts.isMobile ? 5000 : 8000; // *dsf must stay < 16384 device px
    await page.setViewportSize({ width: ctxOpts.viewport.width, height: Math.min(h, cap) });
    const vhNow = (await page.viewportSize()).height;
    if (h <= vhNow + 50) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(250);
      await page.screenshot({ path: `${DIR}/${name}.png`, type: 'png' });
      out.push({ name, h, parts: 1 });
    } else {
      const step = vhNow - 400;
      const n = Math.ceil((h - vhNow) / step) + 1;
      for (let i = 0; i < n; i++) {
        const y = Math.min(i * step, h - vhNow);
        await page.evaluate((yy) => window.scrollTo(0, yy), y);
        await page.waitForTimeout(250);
        await page.screenshot({ path: `${DIR}/${name}-part${i + 1}of${n}.png`, type: 'png' });
      }
      out.push({ name, h, parts: n });
    }
  }
  await ctx.close();
  return out;
}

const desktop = [
  ['01-Home', '/'],
  ['02-Programs', '/programs'],
  ['03-AI-Foundations', '/programs/ai-foundation'],
  ['04-Data-Science-AI', '/programs/data-science-ai'],
  ['05-Cybersecurity', '/programs/cybersecurity'],
  ['06-Product-UX-AI-Design', '/programs/product-ux-ai-design'],
  ['07-About', '/about'],
  ['08-Contact', '/contact'],
  ['09-404', '/missing-page'],
];

const r1 = await capture({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }, desktop);

// chooser dialog open state
const r2 = await capture({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }, [['12-Chooser-Dialog', '/']], async (page) => {
  await page.getByRole('button', { name: 'Help Me Choose' }).first().click();
  await page.waitForTimeout(400);
}, { viewportOnly: true });

const mobile = [
  ['10-Mobile-Home', '/'],
  ['11-Mobile-Programs', '/programs'],
];
const r3 = await capture({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true }, mobile);

await browser.close();
console.log(JSON.stringify({ desktop: r1, chooser: r2, mobile: r3 }, null, 1));
