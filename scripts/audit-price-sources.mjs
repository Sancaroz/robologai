import fs from "node:fs";
import https from "node:https";
import http from "node:http";
import path from "node:path";

const root = process.cwd();
const centralPricePath = path.join(root, "data", "prices.json");
const modularPriceDir = path.join(root, "data", "prices");
const maxAgeDays = 45;

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

function modularRecords() {
  return listJsonFiles(modularPriceDir).flatMap((filePath) => {
    const value = readJson(filePath, []);
    const records = Array.isArray(value) ? value : [value];
    return records.map((record) => ({ ...record, __sourceFile: path.relative(root, filePath) }));
  });
}

function allPriceRecords() {
  const central = readJson(centralPricePath, []);
  const modular = modularRecords();
  const byKey = new Map();
  for (const record of central) {
    byKey.set(priceKey(record), { ...record, __sourceFile: "data/prices.json" });
  }
  for (const record of modular) {
    byKey.set(priceKey(record), record);
  }
  return [...byKey.values()].sort((a, b) => priceKey(a).localeCompare(priceKey(b)));
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
  return `${normalize(record.company)}::${normalize(record.robot)}::${normalize(record.source)}`;
}

function daysSince(dateText) {
  const date = new Date(`${dateText}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return Infinity;
  return Math.floor((Date.now() - date.getTime()) / 86400000);
}

function recordIssues(record) {
  const issues = [];
  for (const field of ["robot", "company", "priceText", "sourceType", "source", "confidence", "lastChecked"]) {
    if (record[field] === undefined || record[field] === null || String(record[field]).trim() === "") issues.push(`missing ${field}`);
  }
  if (Number(record.confidence) < 3) issues.push("low confidence");
  if (daysSince(record.lastChecked) > maxAgeDays) issues.push(`stale >${maxAgeDays}d`);
  if (!/^https?:\/\//i.test(record.source || "")) issues.push("source is not http(s)");
  return issues;
}

function requestStatus(url) {
  return new Promise((resolve) => {
    const client = url.startsWith("https:") ? https : http;
    const request = client.request(url, { method: "HEAD", timeout: 12000 }, (response) => {
      response.resume();
      if ([405, 403].includes(response.statusCode)) {
        const fallback = client.get(url, { timeout: 12000 }, (getResponse) => {
          getResponse.resume();
          resolve(getResponse.statusCode);
        });
        fallback.on("error", () => resolve(0));
        fallback.on("timeout", () => {
          fallback.destroy();
          resolve(0);
        });
        return;
      }
      resolve(response.statusCode);
    });
    request.on("error", () => resolve(0));
    request.on("timeout", () => {
      request.destroy();
      resolve(0);
    });
    request.end();
  });
}

function printHelp() {
  console.log(`Audit structured robot price records.

Usage:
  node scripts/audit-price-sources.mjs
  node scripts/audit-price-sources.mjs --check-links

Default mode is offline and checks data quality only.
Use --check-links when you want to test source URL reachability.`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const records = allPriceRecords();
  const rows = records.map((record) => ({ record, issues: recordIssues(record) }));
  console.log(`price source audit: ${records.length} records checked`);

  if (args["check-links"]) {
    for (const row of rows) {
      if (!/^https?:\/\//i.test(row.record.source || "")) continue;
      const status = await requestStatus(row.record.source);
      if (!status || status >= 400) row.issues.push(`link status ${status || "failed"}`);
    }
  }

  const issueRows = rows.filter((row) => row.issues.length);
  if (!issueRows.length) {
    console.log("All price records look current enough for the configured checks.");
  } else {
    for (const { record, issues } of issueRows) {
      console.log(`${record.company} / ${record.robot}: ${issues.join(", ")} (${record.__sourceFile})`);
    }
  }

  const typeCounts = records.reduce((acc, record) => {
    acc[record.sourceType] = (acc[record.sourceType] || 0) + 1;
    return acc;
  }, {});
  console.log(`\nsource types: ${Object.entries(typeCounts).map(([type, count]) => `${type} ${count}`).join(", ") || "none"}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
