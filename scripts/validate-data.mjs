import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const centralFiles = {
  companies: path.join(root, "data", "companies.json"),
  robots: path.join(root, "data", "robots.json"),
  signals: path.join(root, "data", "signals.json")
};

const modularDirs = {
  companies: path.join(root, "data", "companies"),
  robots: path.join(root, "data", "robots"),
  signals: path.join(root, "data", "signals")
};

const requiredFields = {
  companies: ["name", "category", "country", "type", "website"],
  robots: ["name", "company", "category", "country", "status", "availability", "price", "useCase", "source"],
  signals: ["date", "type", "title", "company", "robot", "category", "country", "impact", "summary", "source"]
};

const primaryFocusValues = new Set(["Humanoids", "Embodied AI", "Physical AI", "Autonomous Robotics", "Secondary"]);

function readJson(filePath) {
  try {
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

function validateRecord(kind, record, label) {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    throw new Error(`${label} must be a JSON object`);
  }
  const missing = requiredFields[kind].filter((field) => {
    const value = record[field];
    return value === undefined || value === null || String(value).trim() === "";
  });
  if (missing.length) throw new Error(`${label} missing required field(s): ${missing.join(", ")}`);
  if (record.primaryFocus !== undefined && !primaryFocusValues.has(record.primaryFocus)) {
    throw new Error(`${label} has invalid primaryFocus; expected one of: ${[...primaryFocusValues].join(", ")}`);
  }
  if (record.segments !== undefined && (!Array.isArray(record.segments) || record.segments.some((segment) => typeof segment !== "string" || !segment.trim()))) {
    throw new Error(`${label} has invalid segments; expected an array of non-empty strings`);
  }
  if (kind === "robots") {
    const maturity = Number(record.maturity ?? 1);
    const priceVisibility = Number(record.priceVisibility ?? 1);
    if (!Number.isFinite(maturity) || maturity < 0 || maturity > 5) {
      throw new Error(`${label} has invalid maturity; expected 0-5`);
    }
    if (!Number.isFinite(priceVisibility) || priceVisibility < 0 || priceVisibility > 5) {
      throw new Error(`${label} has invalid priceVisibility; expected 0-5`);
    }
  }
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

function recordKey(kind, record) {
  if (kind === "robots") {
    const name = slug(record.name);
    const brand = brandSlug(record.company);
    return name.startsWith(brand) ? name : `${brand}-${name}`;
  }
  if (kind === "signals") return `${normalize(record.source || "")}::${normalize(record.title || "")}`;
  return normalize(record.name || "");
}

function mergeRecords(base, modular, kind) {
  const positions = new Map();
  const merged = base.map((record, index) => {
    positions.set(recordKey(kind, record), index);
    return record;
  });
  for (const record of modular) {
    const key = recordKey(kind, record);
    if (positions.has(key)) {
      merged[positions.get(key)] = { ...merged[positions.get(key)], ...record };
    } else {
      positions.set(key, merged.length);
      merged.push(record);
    }
  }
  return merged;
}

function validateCollection(kind, records, label) {
  const seen = new Map();
  for (const [index, record] of records.entries()) {
    const recordLabel = `${label}[${index}]`;
    validateRecord(kind, record, recordLabel);
    const key = recordKey(kind, record);
    if (seen.has(key)) throw new Error(`${recordLabel} duplicates ${seen.get(key)}`);
    seen.set(key, recordLabel);
  }
}

function readModularRecords(kind) {
  const records = [];
  for (const filePath of listJsonFiles(modularDirs[kind])) {
    if (fs.statSync(filePath).size === 0) continue;
    const value = readJson(filePath);
    const fileLabel = path.relative(root, filePath);
    const fileRecords = Array.isArray(value) ? value : [value];
    fileRecords.forEach((record) => records.push({ ...record, __sourceFile: fileLabel }));
  }
  return records;
}

function validateLinks(companies, robots) {
  const companyNames = new Set(companies.map((company) => String(company.name).toLowerCase()));
  const missingCompanies = robots
    .filter((robot) => !companyNames.has(String(robot.company).toLowerCase()))
    .map((robot) => `${robot.company} / ${robot.name}`);
  if (missingCompanies.length) {
    throw new Error(`robots reference missing companies: ${missingCompanies.slice(0, 12).join("; ")}`);
  }
}

function main() {
  const central = {
    companies: asArray(readJson(centralFiles.companies), "data/companies.json"),
    robots: asArray(readJson(centralFiles.robots), "data/robots.json"),
    signals: asArray(readJson(centralFiles.signals), "data/signals.json")
  };
  const modular = {
    companies: readModularRecords("companies"),
    robots: readModularRecords("robots"),
    signals: readModularRecords("signals")
  };
  const merged = {
    companies: mergeRecords(central.companies, modular.companies.map(({ __sourceFile, ...record }) => record), "companies"),
    robots: mergeRecords(central.robots, modular.robots.map(({ __sourceFile, ...record }) => record), "robots"),
    signals: mergeRecords(central.signals, modular.signals.map(({ __sourceFile, ...record }) => record), "signals")
  };

  for (const kind of Object.keys(modular)) {
    for (const record of modular[kind]) {
      const { __sourceFile, ...cleanRecord } = record;
      const mergedRecord = merged[kind].find((item) => recordKey(kind, item) === recordKey(kind, cleanRecord));
      validateRecord(kind, mergedRecord || cleanRecord, __sourceFile);
    }
  }

  validateCollection("companies", merged.companies, "companies");
  validateCollection("robots", merged.robots, "robots");
  validateCollection("signals", merged.signals, "signals");
  validateLinks(merged.companies, merged.robots);

  console.log(`companies ok: ${central.companies.length} central, ${modular.companies.length} modular`);
  console.log(`robots ok: ${central.robots.length} central, ${modular.robots.length} modular`);
  console.log(`signals ok: ${central.signals.length} central, ${modular.signals.length} modular`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
