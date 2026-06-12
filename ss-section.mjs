import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, 'temporary screenshots');
const label = process.argv[2] || 'section';
const clipY = parseInt(process.argv[3] || '800');
const clipH = parseInt(process.argv[4] || '600');
let n = 1;
while (fs.existsSync(path.join(dir, `screenshot-${n}-${label}.png`))) n++;
const out = path.join(dir, `screenshot-${n}-${label}.png`);
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox','--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
await page.screenshot({ path: out, clip: { x: 0, y: clipY, width: 1440, height: clipH } });
await browser.close();
console.log('Saved: ' + out);
