import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { spawnSync } from "node:child_process";
import { stdin as input, stdout as output } from "node:process";

const root = process.cwd();
const robotDir = path.join(root, "data", "robots");
const centralRobotPath = path.join(root, "data", "robots.json");
const centralCompanyPath = path.join(root, "data", "companies.json");
const modularCompanyDir = path.join(root, "data", "companies");

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

function optionalString(value) {
  const text = String(value || "").trim();
  return text || undefined;
}

function optionalNumber(value) {
  if (value === undefined || value === null || value === "") return undefined;
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
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

function modularRecords(dirPath) {
  return listJsonFiles(dirPath).flatMap((filePath) => {
    const value = readJson(filePath, []);
    return Array.isArray(value) ? value : [value];
  });
}

function companyNames() {
  const central = readJson(centralCompanyPath, []);
  const modular = modularRecords(modularCompanyDir);
  return new Set([...central, ...modular].map((company) => normalize(company.name || "")));
}

function existingRobotKeys() {
  const central = readJson(centralRobotPath, []);
  const modular = modularRecords(robotDir);
  return new Set([...central, ...modular].map((robot) => robotKey(robot)));
}

async function askMissing(args) {
  if (args.help) return args;
  const hasCliValues = Object.keys(args).some((key) => !["dry-run", "help", "skip-build", "allow-missing-company"].includes(key));
  const rl = readline.createInterface({ input, output });
  const ask = async (key, label, fallback = "") => {
    if (args[key] !== undefined) return args[key];
    const suffix = fallback ? ` (${fallback})` : "";
    const answer = await rl.question(`${label}${suffix}: `);
    return answer.trim() || fallback;
  };

  try {
    args.name = await ask("name", "Robot name");
    args.company = await ask("company", "Company");
    args.category = await ask("category", "Category");
    args.country = await ask("country", "Country");
    args.status = hasCliValues ? (args.status || "Tracked / research") : await ask("status", "Status", "Tracked / research");
    args.availability = hasCliValues ? (args.availability || "Availability not disclosed") : await ask("availability", "Availability", "Availability not disclosed");
    args.price = hasCliValues ? (args.price || "No official public price") : await ask("price", "Price", "No official public price");
    args.useCase = await ask("use-case", "Use case");
    args.source = await ask("source", "Official source URL");
    args.sourceLinks = hasCliValues ? (args["source-links"] || args.source || "") : await ask("source-links", "Source links, comma-separated", args.source || "");
    args.height = hasCliValues ? (args.height || "Not disclosed") : await ask("height", "Height", "Not disclosed");
    args.runtime = hasCliValues ? (args.runtime || "Not disclosed") : await ask("runtime", "Runtime", "Not disclosed");
    args.maturity = hasCliValues ? (args.maturity || "3") : await ask("maturity", "Maturity 0-5", "3");
    args.priceVisibility = hasCliValues ? (args["price-visibility"] || "1") : await ask("price-visibility", "Price visibility 0-5", "1");
    args.image = hasCliValues ? (args.image || "") : await ask("image", "Image path", "");
    args.imageCredit = hasCliValues ? (args["image-credit"] || "") : await ask("image-credit", "Image credit", "");
    args.keywords = hasCliValues ? (args.keywords || "") : await ask("keywords", "Keywords, comma-separated", "");
  } finally {
    rl.close();
  }
  return args;
}

function printHelp() {
  console.log(`Create a modular robot record.

Usage:
  node scripts/add-robot.mjs
  node scripts/add-robot.mjs --name "Example Bot" --company "Example Robotics" --category "Humanoid" --country "USA" --use-case "Factory work" --source "https://example.com/bot"

Options:
  --name                  Robot name
  --company               Company name, should already exist in company data
  --category              Robot category
  --country               Country
  --status                Status, defaults to "Tracked / research"
  --availability          Availability note
  --price                 Price note, defaults to "No official public price"
  --use-case              Primary use case
  --source                Official source URL
  --source-links          Comma-separated source links
  --height                Height note
  --runtime               Runtime note
  --maturity              0-5 maturity score, defaults to 3
  --price-visibility      0-5 price visibility score, defaults to 1
  --image                 Optional image path, such as assets/robots/example-bot/hero.png
  --image-credit          Optional image credit
  --keywords              Comma-separated keywords
  --allow-missing-company Create even if company is not in company data yet
  --skip-build            Only write modular JSON; do not rebuild aggregate data or pages
  --dry-run               Print the record without writing
  --help                  Show this help

Output:
  data/robots/<company-robot-slug>.json
`);
}

function assertRequired(record) {
  const missing = ["name", "company", "category", "country", "status", "availability", "price", "useCase", "source"]
    .filter((field) => !String(record[field] || "").trim());
  if (missing.length) throw new Error(`Missing required field(s): ${missing.join(", ")}`);
  for (const field of ["maturity", "priceVisibility"]) {
    const value = Number(record[field]);
    if (!Number.isFinite(value) || value < 0 || value > 5) {
      throw new Error(`${field} must be a number from 0 to 5.`);
    }
  }
}

function runStep(label, command, args) {
  console.log(label);
  const result = spawnSync(command, args, { cwd: root, stdio: "inherit" });
  if (result.status !== 0) {
    throw new Error(`${label} failed.`);
  }
}

async function main() {
  const args = await askMissing(parseArgs(process.argv.slice(2)));
  if (args.help) {
    printHelp();
    return;
  }

  const record = {
    name: String(args.name || "").trim(),
    company: String(args.company || "").trim(),
    category: String(args.category || "").trim(),
    country: String(args.country || "").trim(),
    status: String(args.status || "Tracked / research").trim(),
    availability: String(args.availability || "Availability not disclosed").trim(),
    price: String(args.price || "No official public price").trim(),
    useCase: String(args["use-case"] || args.useCase || "").trim(),
    height: String(args.height || "Not disclosed").trim(),
    runtime: String(args.runtime || "Not disclosed").trim(),
    maturity: optionalNumber(args.maturity) ?? 3,
    priceVisibility: optionalNumber(args["price-visibility"] || args.priceVisibility) ?? 1,
    source: String(args.source || "").trim()
  };

  const sourceLinks = splitList(args["source-links"]);
  if (sourceLinks.length) record.sourceLinks = sourceLinks;
  const image = optionalString(args.image);
  if (image) record.image = image;
  const imageCredit = optionalString(args["image-credit"] || args.imageCredit);
  if (imageCredit) record.imageCredit = imageCredit;
  const keywords = splitList(args.keywords);
  if (keywords.length) record.keywords = keywords;

  assertRequired(record);

  if (!args["allow-missing-company"] && !companyNames().has(normalize(record.company))) {
    throw new Error(`${record.company} is not in company data yet. Add the company first or rerun with --allow-missing-company.`);
  }

  const outputSlug = robotKey(record);
  if (!outputSlug) throw new Error("Could not create a file slug from robot and company name.");
  if (existingRobotKeys().has(outputSlug)) {
    throw new Error(`${record.name} by ${record.company} already exists in central or modular robot data.`);
  }
  const outputPath = path.join(robotDir, `${outputSlug}.json`);
  if (fs.existsSync(outputPath)) {
    throw new Error(`${path.relative(root, outputPath)} already exists.`);
  }

  const json = `${JSON.stringify(record, null, 2)}\n`;
  if (args["dry-run"]) {
    console.log(json);
    return;
  }

  fs.mkdirSync(robotDir, { recursive: true });
  fs.writeFileSync(outputPath, json);
  console.log(`Created ${path.relative(root, outputPath)}`);

  if (args["skip-build"]) {
    runStep("Validating data...", process.execPath, ["scripts/validate-data.mjs"]);
    return;
  }

  runStep("Updating aggregate data...", process.execPath, ["scripts/build-data.mjs", "--write"]);
  runStep("Regenerating static profile pages...", process.execPath, ["tools/generate-seo-pages.mjs"]);
  runStep("Validating data...", process.execPath, ["scripts/validate-data.mjs"]);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
