import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const shouldWrite = process.argv.includes("--write");

const collections = {
  companies: {
    file: path.join(root, "data", "companies.json"),
    dir: path.join(root, "data", "companies"),
    key: (record) => String(record.name || "").toLowerCase()
  },
  robots: {
    file: path.join(root, "data", "robots.json"),
    dir: path.join(root, "data", "robots"),
    key: (record) => `${record.company || ""}::${record.name || ""}`.toLowerCase()
  },
  signals: {
    file: path.join(root, "data", "signals.json"),
    dir: path.join(root, "data", "signals"),
    key: (record) => `${record.source || ""}::${record.title || ""}`.toLowerCase()
  }
};

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
      merged[positions.get(key)] = record;
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
