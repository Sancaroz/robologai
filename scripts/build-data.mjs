import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const shouldWrite = process.argv.includes("--write");

const collections = {
  companies: {
    file: path.join(root, "data", "companies.json"),
    dir: path.join(root, "data", "companies"),
    key: (record) => normalizeKey(record.name)
  },
  robots: {
    file: path.join(root, "data", "robots.json"),
    dir: path.join(root, "data", "robots"),
    key: robotKey
  },
  signals: {
    file: path.join(root, "data", "signals.json"),
    dir: path.join(root, "data", "signals"),
    key: (record) => `${normalizeKey(record.source)}::${normalizeKey(record.title)}`
  },
  prices: {
    file: path.join(root, "data", "prices.json"),
    dir: path.join(root, "data", "prices"),
    key: (record) => `${normalizeKey(record.company)}::${normalizeKey(record.robot)}::${normalizeKey(record.source)}`
  }
};

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

function normalizeKey(value = "") {
  return normalize(value).trim();
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

function readJson(filePath) {
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

function readModularRecords(dirPath) {
  return listJsonFiles(dirPath).flatMap((filePath) => {
    if (fs.statSync(filePath).size === 0) return [];
    const value = readJson(filePath);
    return Array.isArray(value) ? value : [value];
  });
}

function mergeRecords(base, modular, keyFn) {
  const positions = new Map();
  const merged = base.map((record, index) => {
    positions.set(keyFn(record), index);
    return record;
  });
  for (const record of modular) {
    const key = keyFn(record);
    if (positions.has(key)) {
      merged[positions.get(key)] = { ...merged[positions.get(key)], ...record };
    } else {
      positions.set(key, merged.length);
      merged.push(record);
    }
  }
  return merged;
}

function writeJson(filePath, records) {
  fs.writeFileSync(filePath, `${JSON.stringify(records, null, 2)}\n`);
}

for (const [name, config] of Object.entries(collections)) {
  const base = readJson(config.file);
  const modular = readModularRecords(config.dir);
  const merged = mergeRecords(base, modular, config.key);
  const changed = JSON.stringify(base) !== JSON.stringify(merged);
  console.log(`${name}: ${base.length} central, ${modular.length} modular, ${merged.length} output${changed ? " (changed)" : ""}`);
  if (shouldWrite && changed) writeJson(config.file, merged);
}

if (!shouldWrite) {
  console.log("Dry run only. Use `node scripts/build-data.mjs --write` to update aggregate JSON files.");
}
