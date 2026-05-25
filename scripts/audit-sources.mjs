import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const collections = {
  companies: {
    file: path.join(root, "data", "companies.json"),
    dir: path.join(root, "data", "companies"),
    key: (record) => normalizeKey(record.name),
    label: "company",
    fallbackField: "website"
  },
  robots: {
    file: path.join(root, "data", "robots.json"),
    dir: path.join(root, "data", "robots"),
    key: robotKey,
    label: "robot",
    fallbackField: "source"
  }
};

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

function modularRecords(config) {
  return listJsonFiles(config.dir).flatMap((filePath) => {
    const value = readJson(filePath, []);
    const records = Array.isArray(value) ? value : [value];
    return records.map((record) => ({ ...record, __sourceFile: path.relative(root, filePath) }));
  });
}

function allRecords(config) {
  const byKey = new Map();
  for (const record of readJson(config.file, [])) {
    byKey.set(config.key(record), { ...record, __sourceFile: path.relative(root, config.file) });
  }
  for (const record of modularRecords(config)) {
    const key = config.key(record);
    byKey.set(key, { ...(byKey.get(key) || {}), ...record });
  }
  return [...byKey.values()].sort((a, b) => recordName(a).localeCompare(recordName(b)));
}

function sourceUrls(record, fallbackField) {
  const urls = [];
  if (record[fallbackField]) urls.push(record[fallbackField]);
  if (record.sourceLinks) urls.push(...(Array.isArray(record.sourceLinks) ? record.sourceLinks : [record.sourceLinks]));
  return [...new Set(urls.map((url) => String(url).trim()).filter(Boolean))];
}

function recordName(record) {
  return record.company ? `${record.company} / ${record.name || "Unnamed"}` : record.name || "Unnamed";
}

function auditRows(config, args) {
  const minSources = Number(args.min || 2);
  const companyFilter = args.company ? normalizeKey(args.company) : "";
  return allRecords(config)
    .filter((record) => !companyFilter || normalizeKey(record.company || record.name).includes(companyFilter))
    .map((record) => {
      const urls = sourceUrls(record, config.fallbackField);
      const invalid = urls.filter((url) => !/^https?:\/\//i.test(url));
      const issues = [];
      if (urls.length < minSources) issues.push(`${urls.length}/${minSources} sources`);
      if (invalid.length) issues.push(`${invalid.length} non-http source`);
      return {
        type: config.label,
        name: recordName(record),
        sourceCount: urls.length,
        issues,
        sourceFile: record.__sourceFile
      };
    });
}

function printHelp() {
  console.log(`Audit company and robot source depth.

Usage:
  node scripts/audit-sources.mjs
  node scripts/audit-sources.mjs --type robot
  node scripts/audit-sources.mjs --type company --limit 20
  node scripts/audit-sources.mjs --company agility --min 3
  node scripts/audit-sources.mjs --all

Default mode lists records below --min sources. Use --all to show every record.`);
}

function printRows(rows, args) {
  const minSources = Number(args.min || 2);
  const issueRows = rows.filter((row) => row.issues.length);
  const displayRows = args.all ? rows : issueRows;
  const limit = args.limit ? Number(args.limit) : displayRows.length;
  const limitedRows = displayRows.slice(0, limit);

  console.log(`source audit: ${rows.length} records checked, ${issueRows.length} below target or invalid`);
  console.log(`target: at least ${minSources} unique http(s) source URLs per record\n`);

  if (!limitedRows.length) {
    console.log("All checked records meet the source target.");
    return;
  }

  const nameWidth = Math.max(...limitedRows.map((row) => row.name.length), 4);
  for (const row of limitedRows) {
    const issueText = row.issues.length ? row.issues.join(", ") : "ok";
    console.log(`${row.type.padEnd(7)} ${String(row.sourceCount).padStart(2)} sources  ${row.name.padEnd(nameWidth)}  ${issueText}  (${row.sourceFile})`);
  }

  if (displayRows.length > limitedRows.length) {
    console.log(`\n${displayRows.length - limitedRows.length} more rows hidden. Increase --limit or use --all.`);
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const type = args.type ? String(args.type).toLowerCase() : "all";
  if (!["all", "company", "companies", "robot", "robots"].includes(type)) {
    throw new Error("--type must be company, robot, or all");
  }

  const rows = Object.values(collections)
    .filter((config) => type === "all" || type === config.label || type === `${config.label}s`)
    .flatMap((config) => auditRows(config, args));

  printRows(rows, args);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
