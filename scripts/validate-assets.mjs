import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const collections = [
  {
    name: "companies",
    central: path.join(root, "data", "companies.json"),
    dir: path.join(root, "data", "companies"),
    fields: ["logo", "image"]
  },
  {
    name: "robots",
    central: path.join(root, "data", "robots.json"),
    dir: path.join(root, "data", "robots"),
    fields: ["image", "heroImage"],
    listFields: ["gallery"]
  }
];

function isExternalUrl(value = "") {
  return /^https?:\/\//i.test(String(value));
}

function isDataUrl(value = "") {
  return /^data:/i.test(String(value));
}

function readJson(filePath, fallback = []) {
  try {
    if (fs.statSync(filePath).size === 0) return fallback;
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`${path.relative(root, filePath)}: ${error.message}`);
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

function asArray(value, label) {
  if (!Array.isArray(value)) throw new Error(`${label} must be a JSON array`);
  return value;
}

function recordsFor(collection) {
  const central = asArray(readJson(collection.central, []), path.relative(root, collection.central))
    .map((record, index) => ({ record, label: `${path.relative(root, collection.central)}[${index}]` }));
  const modular = listJsonFiles(collection.dir).flatMap((filePath) => {
    const value = readJson(filePath, []);
    const rows = Array.isArray(value) ? value : [value];
    return rows.map((record, index) => ({
      record,
      label: rows.length > 1 ? `${path.relative(root, filePath)}[${index}]` : path.relative(root, filePath)
    }));
  });
  return [...central, ...modular];
}

function localAssetPath(assetPath = "") {
  const clean = String(assetPath).split(/[?#]/)[0].replace(/^\/+/, "");
  const normalized = clean.replace(/^(\.\.\/)+/, "");
  return path.resolve(root, normalized);
}

function validateAssetPath(assetPath, label) {
  if (!assetPath) return null;
  if (isExternalUrl(assetPath) || isDataUrl(assetPath)) return null;
  const absolutePath = localAssetPath(assetPath);
  if (!absolutePath.startsWith(root)) {
    return `${label}: asset path escapes repository (${assetPath})`;
  }
  if (!fs.existsSync(absolutePath)) {
    return `${label}: missing asset ${assetPath}`;
  }
  const stats = fs.statSync(absolutePath);
  if (!stats.isFile()) {
    return `${label}: asset is not a file ${assetPath}`;
  }
  return null;
}

function assetValues(value) {
  if (!value) return [];
  const items = Array.isArray(value) ? value : String(value).split(",").map((item) => item.trim()).filter(Boolean);
  return items.map((item) => {
    if (typeof item === "string") return item;
    return item?.src || item?.image || item?.url || "";
  }).filter(Boolean);
}

function main() {
  const errors = [];
  let checked = 0;
  let skippedExternal = 0;

  for (const collection of collections) {
    for (const { record, label } of recordsFor(collection)) {
      for (const field of collection.fields) {
        const value = record?.[field];
        if (!value) continue;
        if (isExternalUrl(value) || isDataUrl(value)) skippedExternal += 1;
        else checked += 1;
        const error = validateAssetPath(value, `${label}.${field}`);
        if (error) errors.push(error);
      }
      for (const field of collection.listFields || []) {
        assetValues(record?.[field]).forEach((value, index) => {
          if (isExternalUrl(value) || isDataUrl(value)) skippedExternal += 1;
          else checked += 1;
          const error = validateAssetPath(value, `${label}.${field}[${index}]`);
          if (error) errors.push(error);
        });
      }
    }
  }

  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
    return;
  }

  console.log(`assets ok: ${checked} local checked, ${skippedExternal} external skipped`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
