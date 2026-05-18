import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const companyDir = path.join(root, "data", "companies");
const centralCompanyPath = path.join(root, "data", "companies.json");

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
    .replace(/[\u0300-\u036f]/g, "");
}

function slug(value = "") {
  return normalize(value)
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

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

function readJson(filePath, fallback) {
  try {
    const stats = fs.statSync(filePath);
    if (stats.size === 0) return fallback;
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function splitList(value = "") {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

async function askMissing(args) {
  if (args.help) return args;
  const hasCliValues = Object.keys(args).some((key) => !["dry-run", "help"].includes(key));
  const rl = readline.createInterface({ input, output });
  const ask = async (key, label, fallback = "") => {
    if (args[key] !== undefined) return args[key];
    const suffix = fallback ? ` (${fallback})` : "";
    const answer = await rl.question(`${label}${suffix}: `);
    return answer.trim() || fallback;
  };

  try {
    args.name = await ask("name", "Company name");
    args.website = await ask("website", "Official website");
    args.category = await ask("category", "Category");
    args.country = await ask("country", "Country");
    args.type = hasCliValues ? (args.type || "Private") : await ask("type", "Type", "Private");
    args.ticker = hasCliValues ? (args.ticker || "") : await ask("ticker", "Ticker", "");
    args.robot = hasCliValues ? (args.robot || "") : await ask("robot", "Known robot/product", "");
    args.keywords = hasCliValues ? (args.keywords || "") : await ask("keywords", "Keywords, comma-separated", "");
    args.focus = hasCliValues ? (args.focus || "") : await ask("focus", "Focus", "");
    args.sourceLinks = hasCliValues ? (args["source-links"] || args.website || "") : await ask("source-links", "Source links, comma-separated", args.website || "");
    args.logo = hasCliValues ? (args.logo || "") : await ask("logo", "Logo path", "");
    args.image = hasCliValues ? (args.image || "") : await ask("image", "Image path", "");
    args.lastVerified = hasCliValues ? (args["last-verified"] || "") : await ask("last-verified", "Last verified", "");
  } finally {
    rl.close();
  }
  return args;
}

function printHelp() {
  console.log(`Create a modular company record.

Usage:
  node scripts/add-company.mjs
  node scripts/add-company.mjs --name "Example Robotics" --website "https://example.com/" --category "Humanoid Robotics" --country "USA"

Options:
  --name           Company name
  --website        Official website
  --category       Company category
  --country        Country
  --type           Company type, defaults to Private
  --ticker         Public ticker, optional
  --robot          Known robot/product names, optional
  --keywords       Comma-separated keywords
  --focus          Short focus note, optional
  --source-links   Comma-separated source links
  --logo           Logo path, such as assets/companies/example-robotics/logo.svg
  --image          Optional company image path
  --last-verified  Optional review label, such as "May 2026 source review"
  --skip-build     Only write modular JSON; do not rebuild aggregate data or pages
  --dry-run        Print the record without writing
  --help           Show this help

Output:
  data/companies/<company-slug>.json

By default this script rebuilds aggregate data, regenerates static pages, and validates data.
`);
}

function assertRequired(record) {
  const missing = ["name", "website", "category", "country", "type"].filter((field) => !String(record[field] || "").trim());
  if (missing.length) throw new Error(`Missing required field(s): ${missing.join(", ")}`);
}

function existingCompanyNames() {
  const central = readJson(centralCompanyPath, []);
  const modularFiles = fs.existsSync(companyDir)
    ? fs.readdirSync(companyDir).filter((file) => file.endsWith(".json")).map((file) => path.join(companyDir, file))
    : [];
  const modular = modularFiles.flatMap((filePath) => {
    const value = readJson(filePath, []);
    return Array.isArray(value) ? value : [value];
  });
  return new Set([...central, ...modular].map((company) => normalize(company.name || "")));
}

async function main() {
  const args = await askMissing(parseArgs(process.argv.slice(2)));
  if (args.help) {
    printHelp();
    return;
  }

  const record = {
    name: String(args.name || "").trim(),
    category: String(args.category || "").trim(),
    country: String(args.country || "").trim(),
    type: String(args.type || "Private").trim(),
    ticker: String(args.ticker || "").trim(),
    robot: String(args.robot || "").trim(),
    website: String(args.website || "").trim(),
    keywords: splitList(args.keywords)
  };

  if (args.focus) record.focus = String(args.focus).trim();
  if (args.logo) record.logo = String(args.logo).trim();
  if (args.image) record.image = String(args.image).trim();
  if (args["last-verified"] || args.lastVerified) record.lastVerified = String(args["last-verified"] || args.lastVerified).trim();
  const sourceLinks = splitList(args["source-links"]);
  if (sourceLinks.length) record.sourceLinks = sourceLinks;

  assertRequired(record);

  const companySlug = slug(record.name);
  if (!companySlug) throw new Error("Could not create a file slug from company name.");
  const outputPath = path.join(companyDir, `${companySlug}.json`);

  if (existingCompanyNames().has(normalize(record.name))) {
    throw new Error(`${record.name} already exists in central or modular company data.`);
  }
  if (fs.existsSync(outputPath)) {
    throw new Error(`${path.relative(root, outputPath)} already exists.`);
  }

  const json = `${JSON.stringify(record, null, 2)}\n`;
  if (args["dry-run"]) {
    console.log(json);
    return;
  }

  fs.mkdirSync(companyDir, { recursive: true });
  fs.writeFileSync(outputPath, json);
  console.log(`Created ${path.relative(root, outputPath)}`);

  if (args["skip-build"]) {
    runStep("Validating data...", ["scripts/validate-data.mjs"]);
    return;
  }

  runStep("Updating aggregate data...", ["scripts/build-data.mjs", "--write"]);
  runStep("Regenerating static profile pages...", ["tools/generate-seo-pages.mjs"]);
  runStep("Validating data...", ["scripts/validate-data.mjs"]);
}

function runStep(label, args) {
  console.log(label);
  const result = spawnSync(process.execPath, args, {
    cwd: root,
    stdio: "inherit"
  });
  if (result.status !== 0) {
    throw new Error(`${label} failed.`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
