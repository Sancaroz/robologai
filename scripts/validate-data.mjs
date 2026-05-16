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
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => path.join(dirPath, entry.name))
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

function recordKey(kind, record) {
  if (kind === "robots") return `${record.company}::${record.name}`.toLowerCase();
  if (kind === "signals") return `${record.source || ""}::${record.title || ""}`.toLowerCase();
  return String(record.name || "").toLowerCase();
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
    const value = readJson(filePath);
    const fileLabel = path.relative(root, filePath);
    const fileRecords = Array.isArray(value) ? value : [value];
    fileRecords.forEach((record, index) => {
      validateRecord(kind, record, `${fileLabel}${Array.isArray(value) ? `[${index}]` : ""}`);
      records.push(record);
    });
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

  validateCollection("companies", [...central.companies, ...modular.companies], "companies");
  validateCollection("robots", [...central.robots, ...modular.robots], "robots");
  validateCollection("signals", [...central.signals, ...modular.signals], "signals");
  validateLinks([...central.companies, ...modular.companies], [...central.robots, ...modular.robots]);

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
