// Screenshot script for portfolio project covers.
// Runs from /tmp/pw-install where Playwright is installed (not in this project's package.json).
// Usage: node /tmp/pw-install/screenshot.js
// Writes PNGs into public/images/projects/<slug>.png

const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const OUT_DIR = path.resolve(
  "/Users/gabrielmadureira/GOS/02 - PROJETOS PESSOAIS/045 - MADUREIRA-SITE/Portifólio/public/images/projects"
);

const targets = [
  { slug: "madureira-portfolio", url: "https://madureira.xyz" },
  { slug: "kaleidos-digital", url: "https://kaleidos.com.br" },
  { slug: "kai-kreator", url: "https://kai.kaleidos.com.br" },
  { slug: "kaleidos-pay", url: "https://pay.kaleidos.com.br" },
  { slug: "jornal-cripto", url: "https://jornal-cripto.vercel.app" },
  { slug: "folio", url: "https://folio-landing.vercel.app" },
  { slug: "rabito", url: "https://rabito-ashen.vercel.app" },
  { slug: "sequencia-viral", url: "https://viral.kaleidos.com.br" },
  { slug: "defi-radar", url: "https://radar-blond-zeta.vercel.app" },
  { slug: "adflow", url: "https://app-alpha-jet-10.vercel.app" },
  { slug: "autoblogger", url: "https://autoblogger-rosy.vercel.app" },
  { slug: "brutal-better", url: "https://brutal-better.vercel.app" },
  { slug: "ensina-ai", url: "https://vidy-pathways.vercel.app" },
  { slug: "metricas-simples", url: "https://simple-saas-pulse.vercel.app" },
  { slug: "bughunter", url: "https://code-critter-scanner.vercel.app" },
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1.5,
  });

  for (const { slug, url } of targets) {
    const out = path.join(OUT_DIR, `${slug}.png`);
    console.log(`[shoot] ${slug} <- ${url}`);
    const page = await context.newPage();
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
      // small settle time for animations
      await page.waitForTimeout(1500);
      await page.screenshot({ path: out, fullPage: false, type: "png" });
      console.log(`   -> ${out}`);
    } catch (err) {
      console.error(`   ERR ${slug}: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
})();
