import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, 'temporary screenshots');
const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';
let n = 1;
while (fs.existsSync(path.join(dir, label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`))) n++;
const out = path.join(dir, label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`);
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox','--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log('Saved: ' + out);
