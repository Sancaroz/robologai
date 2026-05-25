import fs from "node:fs";
import http from "node:http";
import https from "node:https";
import path from "node:path";

const root = process.cwd();
const centralRobotPath = path.join(root, "data", "robots.json");
const modularRobotDir = path.join(root, "data", "robots");
const outputDir = path.join(root, "data", "price-signals");

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
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function slug(value = "") {
  return normalize(value)
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function brandSlug(company = "") {
  return slug(company)
    .replace(/-robotics$/, "")
    .replace(/-technologies$/, "")
    .replace(/-technology$/, "")
    .replace(/-ai$/, "")
    .replace(/-inc$/, "")
    .replace(/-ltd$/, "");
}

function robotKey(record) {
  const name = slug(record.name);
  const brand = brandSlug(record.company);
  return name.startsWith(brand) ? name : `${brand}-${name}`;
}

function modularRobotRecords() {
  return listJsonFiles(modularRobotDir).flatMap((filePath) => {
    const value = readJson(filePath, []);
    const records = Array.isArray(value) ? value : [value];
    return records.map((record) => ({ ...record, __sourceFile: path.relative(root, filePath) }));
  });
}

function allRobotRecords() {
  const byKey = new Map();
  for (const record of readJson(centralRobotPath, [])) {
    byKey.set(robotKey(record), { ...record, __sourceFile: "data/robots.json" });
  }
  for (const record of modularRobotRecords()) {
    const key = robotKey(record);
    byKey.set(key, { ...(byKey.get(key) || {}), ...record });
  }
  return [...byKey.values()].sort((a, b) => `${a.company} ${a.name}`.localeCompare(`${b.company} ${b.name}`));
}

function sourceUrls(record) {
  const urls = [];
  if (record.source) urls.push(record.source);
  if (record.sourceLinks) urls.push(...(Array.isArray(record.sourceLinks) ? record.sourceLinks : [record.sourceLinks]));
  return [...new Set(urls.map((url) => String(url).trim()).filter((url) => /^https?:\/\//i.test(url)))];
}

function sourceRows(args) {
  const companyFilter = args.company ? normalize(args.company) : "";
  const robotFilter = args.robot ? normalize(args.robot) : "";
  const limit = Number(args.limit || args["max-pages"] || 50);
  return allRobotRecords()
    .filter((robot) => !companyFilter || normalize(robot.company).includes(companyFilter))
    .filter((robot) => !robotFilter || normalize(robot.name).includes(robotFilter))
    .flatMap((robot) => sourceUrls(robot).map((url) => ({ robot, url })))
    .slice(0, limit);
}

function fetchText(url) {
  return new Promise((resolve) => {
    const client = url.startsWith("https:") ? https : http;
    const request = client.get(url, {
      headers: {
        "User-Agent": "RoboLogAI price signal watcher (+https://robologai.com)",
        Accept: "text/html,application/xhtml+xml,application/xml,text/plain;q=0.9,*/*;q=0.8"
      },
      timeout: 15000
    }, (response) => {
      if ([301, 302, 303, 307, 308].includes(response.statusCode) && response.headers.location) {
        response.resume();
        const nextUrl = new URL(response.headers.location, url).toString();
        fetchText(nextUrl).then(resolve);
        return;
      }
      if (!response.statusCode || response.statusCode >= 400) {
        response.resume();
        resolve({ ok: false, status: response.statusCode || 0, text: "" });
        return;
      }
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => {
        body += chunk;
        if (body.length > 900000) request.destroy();
      });
      response.on("end", () => resolve({ ok: true, status: response.statusCode, text: body }));
    });
    request.on("error", () => resolve({ ok: false, status: 0, text: "" }));
    request.on("timeout", () => {
      request.destroy();
      resolve({ ok: false, status: 0, text: "" });
    });
  });
}

function cleanText(html = "") {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, "\"")
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function contextFor(text, index, length) {
  const start = Math.max(0, index - 90);
  const end = Math.min(text.length, index + length + 90);
  return text.slice(start, end).replace(/\s+/g, " ").trim();
}

function classifySignal(matchText = "", context = "") {
  const combined = normalize(`${matchText} ${context}`);
  if (/[$€£]|\b(?:usd|eur|gbp|dollars?|euros?)\b/i.test(matchText)) {
    if (combined.includes("starting at") || combined.includes("starts at") || combined.includes("from ")) return "starting-price";
    return "price";
  }
  if (combined.includes("deposit")) return "deposit";
  if (combined.includes("pre order") || combined.includes("preorder") || combined.includes("pre-order")) return "preorder";
  if (combined.includes("quote") || combined.includes("contact sales") || combined.includes("enterprise pricing")) return "quote";
  if (combined.includes("starting at") || combined.includes("from ")) return "starting-price";
  return "price";
}

function detectPriceSignals(text, row) {
  const signals = [];
  const patterns = [
    /\b(?:starting at|starts at|from)\s+(?:[$€£]\s?\d[\d,.]*(?:\s?(?:k|m|usd|eur|gbp))?|\d[\d,.]*\s?(?:USD|EUR|GBP|dollars?|euros?))/gi,
    /(?:[$€£]\s?\d[\d,.]*(?:\s?(?:k|m|usd|eur|gbp))?|\d[\d,.]*\s?(?:USD|EUR|GBP|dollars?|euros?))/gi,
    /\b(?:deposit|pre-?order|request (?:a )?quote|contact sales|enterprise pricing)\b[^.]{0,120}/gi
  ];
  const seen = new Set();
  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      const value = match[0].trim();
      const context = contextFor(text, match.index || 0, value.length);
      const key = normalize(`${value} ${context}`);
      if (seen.has(key)) continue;
      if (signals.some((signal) => signal.context === context && (signal.signalText.includes(value) || value.includes(signal.signalText)))) continue;
      seen.add(key);
      signals.push({
        company: row.robot.company || "",
        robot: row.robot.name || "",
        source: row.url,
        sourceFile: row.robot.__sourceFile,
        signalType: classifySignal(value, context),
        signalText: value,
        context,
        confidence: confidenceFor(value, context, row.url)
      });
      if (signals.length >= 5) return signals;
    }
  }
  return signals;
}

function confidenceFor(value, context, url) {
  let score = 2;
  const combined = normalize(`${value} ${context} ${url}`);
  if (/[$€£]|\b(?:usd|eur|gbp|dollars?|euros?)\b/i.test(value)) score += 2;
  if (combined.includes("price") || combined.includes("starting") || combined.includes("from ")) score += 1;
  if (combined.includes("deposit") || combined.includes("preorder") || combined.includes("pre order")) score += 1;
  if (combined.includes("quote") || combined.includes("contact sales")) score -= 1;
  return Math.max(1, Math.min(5, score));
}

function writeSignals(signals) {
  fs.mkdirSync(outputDir, { recursive: true });
  const today = localDateStamp();
  const payload = {
    generatedAt: new Date().toISOString(),
    reviewRequired: true,
    note: "Candidate price signals only. Do not publish to robot cards until reviewed.",
    signals
  };
  fs.writeFileSync(path.join(outputDir, "latest.json"), `${JSON.stringify(payload, null, 2)}\n`);
  fs.writeFileSync(path.join(outputDir, `${today}.json`), `${JSON.stringify(payload, null, 2)}\n`);
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

function printHelp() {
  console.log(`Watch official robot pages for candidate price signals.

Usage:
  node scripts/watch-price-signals.mjs
  node scripts/watch-price-signals.mjs --company unitree --limit 10
  node scripts/watch-price-signals.mjs --fetch --company unitree --limit 10
  node scripts/watch-price-signals.mjs --fetch --write --limit 50

Default mode does not access the network; it previews which official source URLs would be scanned.
--fetch reads pages and extracts candidate price, deposit, preorder, or quote signals.
--write saves review-only reports under data/price-signals/ and never edits robot cards.`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const rows = sourceRows(args);
  console.log(`price signal watcher: ${rows.length} source URLs selected`);

  if (!args.fetch) {
    for (const row of rows.slice(0, 20)) {
      console.log(`${row.robot.company} / ${row.robot.name}: ${row.url}`);
    }
    if (rows.length > 20) console.log(`${rows.length - 20} more URLs hidden. Use --limit to adjust.`);
    console.log("\nDry preview only. Add --fetch to scan pages and --write to save review reports.");
    return;
  }

  const signals = [];
  for (const row of rows) {
    const response = await fetchText(row.url);
    if (!response.ok) {
      console.log(`${row.robot.company} / ${row.robot.name}: fetch failed (${response.status || "network"}) ${row.url}`);
      continue;
    }
    const found = detectPriceSignals(cleanText(response.text), row);
    signals.push(...found);
    console.log(`${row.robot.company} / ${row.robot.name}: ${found.length} candidate signal(s) ${row.url}`);
  }

  const byType = signals.reduce((acc, signal) => {
    acc[signal.signalType] = (acc[signal.signalType] || 0) + 1;
    return acc;
  }, {});
  console.log(`\nprice signals found: ${signals.length}`);
  console.log(`signal types: ${Object.entries(byType).map(([type, count]) => `${type} ${count}`).join(", ") || "none"}`);

  for (const signal of signals.slice(0, Number(args.show || 10))) {
    console.log(`${signal.company} / ${signal.robot}: ${signal.signalType} · confidence ${signal.confidence} · ${signal.signalText}`);
  }

  if (args.write) {
    writeSignals(signals);
    console.log(`\nwrote data/price-signals/latest.json and dated review report`);
  } else {
    console.log("\nReview only. Add --write to save data/price-signals/latest.json.");
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
