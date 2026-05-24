import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const assetsRoot = path.join(root, "assets", "robots");
const robotDir = path.join(root, "data", "robots");
const centralRobotPath = path.join(root, "data", "robots.json");
const centralCompanyPath = path.join(root, "data", "companies.json");
const modularCompanyDir = path.join(root, "data", "companies");
const modularRobotDir = path.join(root, "data", "robots");
const imagePattern = /\.(avif|webp|png|jpe?g)$/i;
const heroPattern = /^hero\.(avif|webp|png|jpe?g)$/i;
const companySlugAliases = new Map([
  ["deeprobotics", "DEEP Robotics"]
]);
const companyFolderAliases = new Map([
  ["DEEP Robotics", "deeprobotics"]
]);

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

function titleFromSlug(value = "") {
  return String(value)
    .split("-")
    .filter(Boolean)
    .map((part) => (/^[a-z]+\d+$/i.test(part) ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1)))
    .join(" ");
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

function modularRobotFiles() {
  const files = new Map();
  for (const filePath of listJsonFiles(modularRobotDir)) {
    const value = readJson(filePath, []);
    const records = Array.isArray(value) ? value : [value];
    for (const record of records) {
      if (!record?.name || !record?.company) continue;
      files.set(robotKey(record), filePath);
    }
  }
  return files;
}

function companyRecords() {
  const central = readJson(centralCompanyPath, []);
  const modular = modularRecords(modularCompanyDir);
  return [...central, ...modular];
}

function robotRecords() {
  const central = readJson(centralRobotPath, []);
  const modular = modularRecords(modularRobotDir);
  return [...central, ...modular];
}

function companyNameFromSlug(companySlug, companies) {
  if (companySlugAliases.has(companySlug)) return companySlugAliases.get(companySlug);
  const match = companies.find((company) => brandSlug(company.name) === companySlug || slug(company.name) === companySlug);
  return match?.name || titleFromSlug(companySlug);
}

function robotSlugFromParts(parts) {
  const useful = parts.filter((part) => !["products", "product", "images", "gallery", "media"].includes(part));
  if (useful.length >= 2 && useful[useful.length - 1].length <= 3) return `${useful[useful.length - 2]}-${useful[useful.length - 1]}`;
  return useful[useful.length - 1] || "";
}

function sourceUrlFromDir(dirPath) {
  const sourcePath = path.join(dirPath, "source.txt");
  if (!fs.existsSync(sourcePath)) return "";
  return fs.readFileSync(sourcePath, "utf8").split(/\r?\n/).map((line) => line.trim()).find(Boolean) || "";
}

function sourceLinksFromDir(dirPath, source) {
  if (!source) return [];
  return [source];
}

function imagePathsFromDir(dirPath) {
  const files = fs.readdirSync(dirPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && imagePattern.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const hero = files.find((file) => heroPattern.test(file)) || files[0] || "";
  const gallery = files.filter((file) => file !== hero);
  const rel = (file) => path.relative(root, path.join(dirPath, file)).split(path.sep).join("/");
  return {
    hero: hero ? rel(hero) : "",
    gallery: gallery.map(rel)
  };
}

function findHeroDirs(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const hasHero = entries.some((entry) => entry.isFile() && heroPattern.test(entry.name));
  const childDirs = entries
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => findHeroDirs(path.join(dirPath, entry.name)));
  return hasHero ? [dirPath, ...childDirs] : childDirs;
}

function draftRecord({ companyName, robotName, source, hero, gallery, existing, currentFileRecord }) {
  const base = currentFileRecord || (existing ? { name: existing.name, company: existing.company } : {
    name: robotName,
    company: companyName,
    category: "Needs review",
    country: "Not disclosed",
    status: "Needs review",
    availability: "Needs review",
    price: "No official public price",
    useCase: "Needs review",
    height: "Not disclosed",
    runtime: "Not disclosed",
    maturity: 3,
    priceVisibility: 1,
    source: source || "Needs official source"
  });
  const record = {
    ...base,
    image: hero,
    heroImage: hero
  };
  if (gallery.length) record.gallery = gallery;
  if (source) {
    record.source = source;
    record.sourceLinks = sourceLinksFromDir("", source);
  }
  if (!record.keywords) record.keywords = [slug(robotName), slug(companyName)].filter(Boolean);
  return record;
}

function outputPath(record) {
  const companyFolder = companyFolderAliases.get(record.company) || brandSlug(record.company);
  return path.join(robotDir, companyFolder, `${robotKey(record)}.json`);
}

function runStep(label, args) {
  console.log(label);
  const result = spawnSync(process.execPath, args, { cwd: root, stdio: "inherit" });
  if (result.status !== 0) throw new Error(`${label} failed.`);
}

function printHelp() {
  console.log(`Import robot image folders into modular robot JSON records.

Expected folder shape:
  assets/robots/<company>/<robot>/hero.jpg
  assets/robots/<company>/<family>/<robot>/hero.png

Optional:
  source.txt next to hero image with the official source URL
  gallery-1.jpg, gallery-2.jpg, etc.

Usage:
  node scripts/import-robot-assets.mjs
  node scripts/import-robot-assets.mjs --write
  node scripts/import-robot-assets.mjs --company ubtech --write
  node scripts/import-robot-assets.mjs --write --create-drafts
  node scripts/import-robot-assets.mjs --write --skip-build

The script updates existing matching robot records with image fields.
New draft records are created only when a source.txt exists next to the hero image, or when --create-drafts is passed.`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const shouldWrite = Boolean(args.write);
  const createDrafts = Boolean(args["create-drafts"]);
  const wantedCompanySlug = args.company ? slug(args.company) : "";
  const companies = companyRecords();
  const robots = robotRecords();
  const existingByKey = new Map(robots.map((robot) => [robotKey(robot), robot]));
  const modularFileByKey = modularRobotFiles();
  const heroDirs = findHeroDirs(assetsRoot);
  const planned = [];

  for (const dirPath of heroDirs) {
    const relDir = path.relative(assetsRoot, dirPath).split(path.sep);
    if (relDir.length < 2) continue;
    const companySlug = relDir[0];
    if (wantedCompanySlug && companySlug !== wantedCompanySlug) continue;
    const robotSlug = robotSlugFromParts(relDir.slice(1));
    if (!companySlug || !robotSlug) continue;
    const companyName = companyNameFromSlug(companySlug, companies);
    const robotName = titleFromSlug(robotSlug);
    const candidateKey = robotKey({ name: robotName, company: companyName });
    const existing = existingByKey.get(candidateKey);
    const source = sourceUrlFromDir(dirPath);
    const { hero, gallery } = imagePathsFromDir(dirPath);
    if (!hero) continue;
    if (!existing && !source && !createDrafts) {
      planned.push({
        skipped: true,
        reason: "new draft needs source.txt or --create-drafts",
        label: `${companyName} / ${robotName}`,
        dirPath
      });
      continue;
    }
    const provisional = { name: existing?.name || robotName, company: existing?.company || companyName };
    const filePath = modularFileByKey.get(robotKey(provisional)) || outputPath(provisional);
    const currentFileRecord = readJson(filePath, null);
    const record = draftRecord({ companyName, robotName, source, hero, gallery, existing, currentFileRecord });
    planned.push({ record, filePath, existing: Boolean(existing || currentFileRecord) });
  }

  if (!planned.length) {
    console.log("No robot hero image folders found.");
    return;
  }

  for (const item of planned) {
    if (item.skipped) {
      console.log(`skip: ${item.label} (${item.reason})`);
      continue;
    }
    const label = item.existing ? "update" : "create";
    console.log(`${label}: ${path.relative(root, item.filePath)}`);
    if (!shouldWrite) {
      console.log(JSON.stringify(item.record, null, 2));
      continue;
    }
    fs.mkdirSync(path.dirname(item.filePath), { recursive: true });
    fs.writeFileSync(item.filePath, `${JSON.stringify(item.record, null, 2)}\n`);
  }

  if (shouldWrite && !args["skip-build"]) {
    runStep("Updating aggregate data...", ["scripts/build-data.mjs", "--write"]);
    runStep("Regenerating static profile pages...", ["tools/generate-seo-pages.mjs"]);
    runStep("Validating data...", ["scripts/validate-data.mjs"]);
    runStep("Validating asset paths...", ["scripts/validate-assets.mjs"]);
    runStep("Validating profile and signal links...", ["scripts/validate-links.mjs"]);
  } else if (!shouldWrite) {
    console.log("Dry run only. Use `node scripts/import-robot-assets.mjs --write` to write records.");
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
