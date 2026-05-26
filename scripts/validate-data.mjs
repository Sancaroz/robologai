import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const centralFiles = {
  companies: path.join(root, "data", "companies.json"),
  robots: path.join(root, "data", "robots.json"),
  signals: path.join(root, "data", "signals.json"),
  prices: path.join(root, "data", "prices.json")
};

const modularDirs = {
  companies: path.join(root, "data", "companies"),
  robots: path.join(root, "data", "robots"),
  signals: path.join(root, "data", "signals"),
  prices: path.join(root, "data", "prices")
};

const requiredFields = {
  companies: ["name", "category", "country", "type", "website"],
  robots: ["name", "company", "category", "country", "status", "availability", "price", "useCase", "source"],
  signals: ["date", "type", "title", "company", "robot", "category", "country", "impact", "summary", "source"],
  prices: ["robot", "company", "priceText", "sourceType", "source", "confidence", "lastChecked"]
};

const primaryFocusValues = new Set(["Humanoids", "Embodied AI", "Physical AI", "Autonomous Robotics", "Secondary"]);
const accessTypeValues = new Set(["Public Price", "Dealer Quote", "Distributor", "Research Platform", "Enterprise Pilot", "Unknown"]);
const partnerStatusValues = new Set(["Not contacted", "Contacted", "In discussion", "Partner", "Distributor"]);
const marketAccessStatusValues = new Set(["Unknown", "Needs review", "Contacted", "In discussion", "Verified", "Partner", "Distributor", "Unavailable"]);

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
    if (record.commercialAccess !== undefined && typeof record.commercialAccess !== "boolean") {
      throw new Error(`${label} has invalid commercialAccess; expected boolean`);
    }
    if (record.availableRegions !== undefined && (!Array.isArray(record.availableRegions) || record.availableRegions.some((region) => typeof region !== "string" || !region.trim()))) {
      throw new Error(`${label} has invalid availableRegions; expected an array of non-empty strings`);
    }
    if (record.accessType !== undefined && !accessTypeValues.has(record.accessType)) {
      throw new Error(`${label} has invalid accessType; expected one of: ${[...accessTypeValues].join(", ")}`);
    }
    if (record.importSupport !== undefined && typeof record.importSupport !== "boolean") {
      throw new Error(`${label} has invalid importSupport; expected boolean`);
    }
    if (record.customsReady !== undefined && typeof record.customsReady !== "boolean") {
      throw new Error(`${label} has invalid customsReady; expected boolean`);
    }
    if (record.partnerStatus !== undefined && !partnerStatusValues.has(record.partnerStatus)) {
      throw new Error(`${label} has invalid partnerStatus; expected one of: ${[...partnerStatusValues].join(", ")}`);
    }
    if (record.marketAccess !== undefined) {
      if (!record.marketAccess || typeof record.marketAccess !== "object" || Array.isArray(record.marketAccess)) {
        throw new Error(`${label} has invalid marketAccess; expected object`);
      }
      for (const [market, access] of Object.entries(record.marketAccess)) {
        const accessLabel = `${label}.marketAccess.${market}`;
        if (!access || typeof access !== "object" || Array.isArray(access)) {
          throw new Error(`${accessLabel} must be an object`);
        }
        if (access.status !== undefined && !marketAccessStatusValues.has(access.status)) {
          throw new Error(`${accessLabel} has invalid status; expected one of: ${[...marketAccessStatusValues].join(", ")}`);
        }
        if (access.importSupport !== undefined && typeof access.importSupport !== "boolean") {
          throw new Error(`${accessLabel} has invalid importSupport; expected boolean`);
        }
        if (access.customsReady !== undefined && typeof access.customsReady !== "boolean") {
          throw new Error(`${accessLabel} has invalid customsReady; expected boolean`);
        }
        if (access.partnerStatus !== undefined && !partnerStatusValues.has(access.partnerStatus)) {
          throw new Error(`${accessLabel} has invalid partnerStatus; expected one of: ${[...partnerStatusValues].join(", ")}`);
        }
      }
    }
  }
  if (kind === "prices") {
    const confidence = Number(record.confidence ?? 1);
    if (!Number.isFinite(confidence) || confidence < 1 || confidence > 5) {
      throw new Error(`${label} has invalid confidence; expected 1-5`);
    }
    if (record.minPrice !== undefined && record.minPrice !== null && (!Number.isFinite(Number(record.minPrice)) || Number(record.minPrice) < 0)) {
      throw new Error(`${label} has invalid minPrice; expected positive number or null`);
    }
    if (record.maxPrice !== undefined && record.maxPrice !== null && (!Number.isFinite(Number(record.maxPrice)) || Number(record.maxPrice) < 0)) {
      throw new Error(`${label} has invalid maxPrice; expected positive number or null`);
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
  if (kind === "prices") return `${normalize(record.company || "")}::${normalize(record.robot || "")}::${normalize(record.source || "")}`;
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

function validatePriceLinks(prices, robots) {
  const robotKeys = new Set(robots.map((robot) => `${normalize(robot.company || "")}::${normalize(robot.name || "")}`));
  const missingRobots = prices
    .filter((price) => !robotKeys.has(`${normalize(price.company || "")}::${normalize(price.robot || "")}`))
    .map((price) => `${price.company} / ${price.robot}`);
  if (missingRobots.length) {
    throw new Error(`prices reference missing robots: ${missingRobots.slice(0, 12).join("; ")}`);
  }
}

function main() {
  const central = {
    companies: asArray(readJson(centralFiles.companies), "data/companies.json"),
    robots: asArray(readJson(centralFiles.robots), "data/robots.json"),
    signals: asArray(readJson(centralFiles.signals), "data/signals.json"),
    prices: asArray(readJson(centralFiles.prices), "data/prices.json")
  };
  const modular = {
    companies: readModularRecords("companies"),
    robots: readModularRecords("robots"),
    signals: readModularRecords("signals"),
    prices: readModularRecords("prices")
  };
  const merged = {
    companies: mergeRecords(central.companies, modular.companies.map(({ __sourceFile, ...record }) => record), "companies"),
    robots: mergeRecords(central.robots, modular.robots.map(({ __sourceFile, ...record }) => record), "robots"),
    signals: mergeRecords(central.signals, modular.signals.map(({ __sourceFile, ...record }) => record), "signals"),
    prices: mergeRecords(central.prices, modular.prices.map(({ __sourceFile, ...record }) => record), "prices")
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
  validateCollection("prices", merged.prices, "prices");
  validateLinks(merged.companies, merged.robots);
  validatePriceLinks(merged.prices, merged.robots);

  console.log(`companies ok: ${central.companies.length} central, ${modular.companies.length} modular`);
  console.log(`robots ok: ${central.robots.length} central, ${modular.robots.length} modular`);
  console.log(`signals ok: ${central.signals.length} central, ${modular.signals.length} modular`);
  console.log(`prices ok: ${central.prices.length} central, ${modular.prices.length} modular`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
