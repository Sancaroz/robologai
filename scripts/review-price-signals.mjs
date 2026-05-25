import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const centralPricePath = path.join(root, "data", "prices.json");
const modularPriceDir = path.join(root, "data", "prices");
const defaultSignalPath = path.join(root, "data", "price-signals", "latest.json");

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const item = argv[index];
    if (!item.startsWith("--")) continue;
    const key = item.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      index += 1;
    }
  }
  return args;
}

function readJson(filePath, fallback = []) {
  if (!fs.existsSync(filePath) || fs.statSync(filePath).size === 0) return fallback;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function listJsonFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) return listJsonFiles(entryPath);
      return entry.isFile() && entry.name.endsWith(".json") ? [entryPath] : [];
    })
    .sort();
}

function normalize(value = "") {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function priceKey(record) {
  return `${normalize(record.company)}::${normalize(record.robot)}`;
}

function signalKey(signal) {
  return `${normalize(signal.company)}::${normalize(signal.robot)}`;
}

function modularPriceRecords() {
  return listJsonFiles(modularPriceDir).flatMap((filePath) => {
    const value = readJson(filePath, []);
    const records = Array.isArray(value) ? value : [value];
    return records.map((record) => ({ ...record, __sourceFile: path.relative(root, filePath) }));
  });
}

function allPriceRecords() {
  const byKey = new Map();
  for (const record of readJson(centralPricePath, [])) {
    byKey.set(priceKey(record), { ...record, __sourceFile: "data/prices.json" });
  }
  for (const record of modularPriceRecords()) {
    byKey.set(priceKey(record), record);
  }
  return [...byKey.values()];
}

function loadSignals(filePath) {
  const value = readJson(filePath, { signals: [] });
  if (Array.isArray(value)) return value;
  return Array.isArray(value.signals) ? value.signals : [];
}

function signalAmount(signal) {
  const text = String(signal.signalText || "");
  const amount = text.match(/[$€£]\s?[\d,.]+(?:\s?[kKmM])?|\b[\d,.]+\s?(?:USD|EUR|GBP|dollars?|euros?)\b/);
  return amount ? amount[0].replace(/\s+/g, " ").trim() : "";
}

function numericAmount(amount = "") {
  const match = String(amount).match(/[\d,.]+/);
  if (!match) return null;
  const suffix = String(amount).match(/[kKmM]\b/);
  const base = Number(match[0].replace(/,/g, ""));
  if (!Number.isFinite(base)) return null;
  if (suffix && suffix[0].toLowerCase() === "k") return Math.round(base * 1000);
  if (suffix && suffix[0].toLowerCase() === "m") return Math.round(base * 1000000);
  return Math.round(base);
}

function sourceTypeFor(signal) {
  if (signal.signalType === "deposit") return "deposit";
  if (signal.signalType === "preorder") return "official";
  if (signal.signalType === "quote") return "official";
  return "official";
}

function priceTextFor(signal) {
  const amount = signalAmount(signal);
  if (!amount) return signal.signalText || "";
  if (signal.signalType === "starting-price") return `Official page signal: from ${amount}`;
  if (signal.signalType === "deposit") return `Official page signal: ${amount} deposit`;
  return `Official page signal: ${amount}`;
}

function reviewRows(signals, existingPrices, args) {
  const minConfidence = Number(args["min-confidence"] || 4);
  const existingByKey = new Map(existingPrices.map((price) => [priceKey(price), price]));
  const seen = new Set();
  return signals
    .filter((signal) => Number(signal.confidence || 0) >= minConfidence)
    .map((signal) => {
      const existing = existingByKey.get(signalKey(signal));
      const amount = signalAmount(signal);
      const action = !amount
        ? "review-only"
        : existing
          ? "compare-existing-price"
          : "candidate-new-price";
      return {
        action,
        company: signal.company || "",
        robot: signal.robot || "",
        signalType: signal.signalType || "unknown",
        confidence: Number(signal.confidence || 0),
        amount,
        source: signal.source || "",
        existingPrice: existing?.priceText || "",
        sourceFile: signal.sourceFile || "",
        draft: {
          robot: signal.robot || "",
          company: signal.company || "",
          priceText: priceTextFor(signal),
          currency: amount.includes("€") || /\bEUR\b/i.test(amount) ? "EUR" : amount.includes("£") || /\bGBP\b/i.test(amount) ? "GBP" : "USD",
          minPrice: numericAmount(amount),
          maxPrice: null,
          sourceType: sourceTypeFor(signal),
          source: signal.source || "",
          confidence: signal.confidence || 3,
          lastChecked: localDateStamp(),
          notes: "Candidate generated from price signal watcher; review before publishing."
        }
      };
    })
    .filter((row) => {
      const key = `${row.action}::${normalize(row.company)}::${normalize(row.robot)}::${normalize(row.amount || row.draft.priceText)}::${normalize(row.source)}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => b.confidence - a.confidence || a.company.localeCompare(b.company) || a.robot.localeCompare(b.robot));
}

function localDateStamp() {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  return formatter.format(date);
}

function markdownEscape(value = "") {
  return String(value).replace(/\|/g, "\\|").replace(/\n/g, " ").trim();
}

function printMarkdown(rows, signalPath, signals) {
  console.log(`# Price Signal Review`);
  console.log("");
  console.log(`- Source: \`${path.relative(root, signalPath)}\``);
  console.log(`- Signals loaded: ${signals.length}`);
  console.log(`- Review rows: ${rows.length}`);
  console.log(`- Generated: ${localDateStamp()}`);
  console.log("");

  if (!rows.length) {
    console.log("No high-confidence price signals to review.");
    return;
  }

  console.log("| Review | Robot | Signal | Existing | Draft | Source |");
  console.log("| --- | --- | --- | --- | --- | --- |");
  for (const row of rows) {
    const draft = row.draft.priceText || row.amount || "";
    const existing = row.existingPrice || "No structured price";
    console.log(`| [ ] ${markdownEscape(row.action)} | ${markdownEscape(`${row.company} / ${row.robot}`)} | ${markdownEscape(`${row.signalType}, confidence ${row.confidence}`)} | ${markdownEscape(existing)} | ${markdownEscape(draft)} | ${markdownEscape(row.source)} |`);
  }
}

function printHelp() {
  console.log(`Review candidate price signals against existing structured prices.

Usage:
  node scripts/review-price-signals.mjs
  node scripts/review-price-signals.mjs --file data/price-signals/2026-05-26.json
  node scripts/review-price-signals.mjs --min-confidence 5
  node scripts/review-price-signals.mjs --drafts
  node scripts/review-price-signals.mjs --markdown
  node scripts/review-price-signals.mjs --json

This script only reads price-signal reports and prints review actions. It does not update robot cards or price records.`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const signalPath = path.resolve(root, args.file || defaultSignalPath);
  if (!fs.existsSync(signalPath)) {
    console.log(`No price signal report found at ${path.relative(root, signalPath)}.`);
    console.log("Run `node scripts/watch-price-signals.mjs --fetch --write --limit 50` first.");
    return;
  }

  const signals = loadSignals(signalPath);
  const rows = reviewRows(signals, allPriceRecords(), args);
  if (args.markdown) {
    printMarkdown(rows, signalPath, signals);
    return;
  }
  if (args.drafts) {
    const drafts = rows.map((row) => row.draft);
    console.log(JSON.stringify(drafts, null, 2));
    return;
  }
  if (args.json) {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }

  console.log(`price signal review: ${signals.length} signals loaded, ${rows.length} review rows above confidence threshold`);
  console.log(`source: ${path.relative(root, signalPath)}\n`);

  if (!rows.length) {
    console.log("No high-confidence price signals to review.");
    return;
  }

  for (const row of rows.slice(0, Number(args.limit || 20))) {
    const existing = row.existingPrice ? `existing: ${row.existingPrice}` : "no existing structured price";
    console.log(`${row.action.padEnd(22)} ${row.company} / ${row.robot} · ${row.signalType} · confidence ${row.confidence} · ${row.amount || row.draft.priceText}`);
    console.log(`  ${existing}`);
    console.log(`  source: ${row.source}`);
  }

  if (rows.length > Number(args.limit || 20)) {
    console.log(`\n${rows.length - Number(args.limit || 20)} more rows hidden. Increase --limit or use --json.`);
  }
}

main();
