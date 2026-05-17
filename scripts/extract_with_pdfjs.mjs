import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as pdfjsLib from "/Users/yamamotoerika/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pdfjs-dist/legacy/build/pdf.mjs";

const __filename = fileURLToPath(import.meta.url);
const root = path.resolve(path.dirname(__filename), "..");
const pdfDir = path.join(root, "raw_public_reports");
const textDir = path.join(root, "extracted_text");

async function extract(pdfName) {
  const data = await fs.readFile(path.join(pdfDir, pdfName));
  const doc = await pdfjsLib.getDocument({
    data: new Uint8Array(data),
    useWorkerFetch: false,
    isEvalSupported: false,
    disableFontFace: true,
  }).promise;

  const chunks = [];
  for (let pageNo = 1; pageNo <= doc.numPages; pageNo += 1) {
    const page = await doc.getPage(pageNo);
    const content = await page.getTextContent();
    const text = content.items.map((item) => item.str || "").join(" ");
    chunks.push(`\n\n--- page ${pageNo} ---\n\n${text}`);
  }

  const outName = `${path.basename(pdfName, ".pdf")}.txt`;
  await fs.mkdir(textDir, { recursive: true });
  await fs.writeFile(path.join(textDir, outName), `${chunks.join("").trim()}\n`, "utf8");
  console.log(`${pdfName}\t${doc.numPages}\t${outName}`);
}

const targets = process.argv.slice(2);
for (const target of targets) {
  await extract(target);
}
