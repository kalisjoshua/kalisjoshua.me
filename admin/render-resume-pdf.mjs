#!/usr/bin/env node
// Renders a markdown file to PDF using the project's existing print CSS.
// Usage:
//   node admin/render-resume-pdf.mjs                          → resume.md → resume.pdf
//   node admin/render-resume-pdf.mjs [output.pdf]             → resume.md → output.pdf
//   node admin/render-resume-pdf.mjs --input cover-letter.md  → cover-letter.md → cover-letter.pdf

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const require = createRequire(import.meta.url);

function parseArgs() {
  const args = process.argv.slice(2);
  let inputFile = "resume.md";
  let outputFile = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--input" && args[i + 1]) {
      inputFile = args[++i];
    } else if (!args[i].startsWith("--")) {
      outputFile = args[i];
    }
  }

  if (!outputFile) {
    outputFile = inputFile.replace(/\.md$/, ".pdf");
  }

  return {
    inputPath: path.resolve(ROOT, inputFile),
    outputPath: path.resolve(ROOT, outputFile),
  };
}

function ensureDeps() {
  const needed = ["marked", "puppeteer"];
  const missing = needed.filter((dep) => {
    try { require.resolve(dep); return false; } catch { return true; }
  });

  if (missing.length) {
    console.log(`Installing: ${missing.join(", ")}...`);
    execSync(`npm install --save-dev ${missing.join(" ")}`, { cwd: ROOT, stdio: "inherit" });
  }
}

function buildHtml(mainHtml, cssPath, isCoverLetter) {
  const css = fs.readFileSync(cssPath, "utf8");

  const coverLetterStyle = isCoverLetter ? `
    <style>
      @media print {
        main { max-width: 6in; margin: 0 auto; }
        p { line-height: 1.6; margin: 0 0 1em; }
      }
    </style>` : "";

  const header = isCoverLetter ? "" : `
      <header role="banner">
        <h1>Joshua T Kalis <small><a href="https://linkedin.com/in/kalisjoshua">(he/him/his)</a></small></h1>
      </header>`;

  return `<!DOCTYPE html>
<html class="no-js" lang="en-US">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Joshua T Kalis</title>
  <style>${css}</style>${coverLetterStyle}
</head>
<body class="section-index">
  <div class="layout">
    <main id="main" role="main">${header}
      ${mainHtml}
    </main>
  </div>
</body>
</html>`;
}

async function main() {
  const { inputPath, outputPath } = parseArgs();
  const cssPath = path.join(ROOT, "public/styles/kalisjoshua.css");

  if (!fs.existsSync(inputPath)) {
    console.error(`${path.basename(inputPath)} not found at ${inputPath}`);
    process.exit(1);
  }

  ensureDeps();

  const { marked } = await import("marked");
  const puppeteer = await import("puppeteer");

  const isCoverLetter = path.basename(inputPath).includes("cover-letter");
  const mainHtml = marked.parse(fs.readFileSync(inputPath, "utf8"));
  const html = buildHtml(mainHtml, cssPath, isCoverLetter);

  const browser = await puppeteer.default.launch({ headless: true });
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.pdf({
    path: outputPath,
    format: "Letter",
    printBackground: false,
    margin: { top: "0.5in", bottom: "0.5in", left: "0.75in", right: "0.75in" },
  });

  await browser.close();
  console.log(`Written to ${outputPath}`);
}

main().catch((err) => { console.error(err.message); process.exit(1); });
