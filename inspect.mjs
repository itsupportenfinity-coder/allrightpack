import { chromium } from "playwright";
import { spawn } from "child_process";
import { setTimeout as sleep } from "timers/promises";

const proc = spawn("npx", ["vite", "preview", "--port", "4173"], {
  cwd: process.cwd(),
  stdio: "pipe",
  shell: true,
});

await sleep(3000);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto("http://localhost:4173", { waitUntil: "networkidle" });

const height = await page.evaluate(() => document.documentElement.scrollHeight);
const vh = await page.evaluate(() => window.innerHeight);
const bodyOverflow = await page.evaluate(() => getComputedStyle(document.body).overflow);
const hasHScroll = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);

console.log("--- Page Metrics ---");
console.log(`Viewport: 1280x${vh}`);
console.log(`Document height: ${height}px`);
console.log(`Extra scrollable: ${height - vh}px (${(height / vh).toFixed(1)} viewports)`);
console.log(`body overflow: ${bodyOverflow}`);
console.log(`Has horizontal scroll: ${hasHScroll}`);

const sections = await page.evaluate(() => {
  const ids = ["home", "categories", "products", "why", "contact"];
  return ids.map(id => {
    const el = document.getElementById(id);
    if (!el) return { id, height: null };
    const rect = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      id,
      height: rect.height,
      pt: parseFloat(cs.paddingTop),
      pb: parseFloat(cs.paddingBottom),
    };
  });
});

console.log("\n--- Section Heights ---");
sections.forEach(s => {
  if (s.height !== null) {
    console.log(`${s.id}: ${s.height}px (pt:${s.pt} pb:${s.pb})`);
  } else {
    console.log(`${s.id}: NOT FOUND`);
  }
});

const footerInfo = await page.evaluate(() => {
  const el = document.querySelector("footer");
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  return { height: rect.height, pt: parseFloat(cs.paddingTop), pb: parseFloat(cs.paddingBottom) };
});
console.log(`Footer: ${footerInfo?.height}px (pt:${footerInfo?.pt} pb:${footerInfo?.pb})`);

const navInfo = await page.evaluate(() => {
  const el = document.querySelector("header");
  if (!el) return null;
  return el.getBoundingClientRect().height;
});
const annInfo = await page.evaluate(() => {
  const el = document.querySelector('[class*="bg-brand-green"]');
  if (!el || !el.textContent?.includes("DELIVERY")) return null;
  return el.getBoundingClientRect().height;
});
console.log(`Navbar: ${navInfo}px (sticky)`);
console.log(`AnnouncementBar: ${annInfo}px`);

const bottomSpace = await page.evaluate(() => {
  const last = document.querySelector("footer");
  if (!last) return null;
  const footerBottom = last.getBoundingClientRect().bottom + window.scrollY;
  return document.documentElement.scrollHeight - footerBottom;
});
console.log(`Space below footer: ${bottomSpace}px`);

// Check for extra space: is the main element taller than its content?
const mainHeight = await page.evaluate(() => {
  const el = document.querySelector("main");
  if (!el) return null;
  return el.getBoundingClientRect().height;
});
const mainContent = await page.evaluate(() => {
  const el = document.querySelector("main");
  if (!el) return null;
  const children = el.children;
  let total = 0;
  for (const c of children) {
    total += c.getBoundingClientRect().height;
  }
  return total;
});
console.log(`Main element height: ${mainHeight}px`);
console.log(`Sum of main children: ${mainContent}px`);
console.log(`Main extra: ${mainHeight - mainContent}px`);

await browser.close();
proc.kill();
