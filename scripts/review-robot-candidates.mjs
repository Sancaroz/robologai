import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const defaultCandidatePath = path.join(root, "data", "robot-candidates", "latest.json");
const centralCompanyPath = path.join(root, "data", "companies.json");
const centralRobotPath = path.join(root, "data", "robots.json");
const modularCompanyDir = path.join(root, "data", "companies");
const modularRobotDir = path.join(root, "data", "robots");

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
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
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
  const name = slug(record.name || record.robot);
  const brand = brandSlug(record.company);
  return name.startsWith(brand) ? name : `${brand}-${name}`;
}

function modularRecords(dirPath) {
  return listJsonFiles(dirPath).flatMap((filePath) => {
    const value = readJson(filePath, []);
    const records = Array.isArray(value) ? value : [value];
    return records.map((record) => ({ ...record, __sourceFile: path.relative(root, filePath) }));
  });
}

function companies() {
  const byKey = new Map();
  for (const record of readJson(centralCompanyPath, [])) byKey.set(slug(record.name), { ...record, __sourceFile: "data/companies.json" });
  for (const record of modularRecords(modularCompanyDir)) byKey.set(slug(record.name), { ...(byKey.get(slug(record.name)) || {}), ...record });
  return [...byKey.values()];
}

function robots() {
  const byKey = new Map();
  for (const record of readJson(centralRobotPath, [])) byKey.set(robotKey(record), { ...record, __sourceFile: "data/robots.json" });
  for (const record of modularRecords(modularRobotDir)) byKey.set(robotKey(record), { ...(byKey.get(robotKey(record)) || {}), ...record });
  return [...byKey.values()];
}

function loadCandidates(filePath) {
  const value = readJson(filePath, { candidates: [] });
  if (Array.isArray(value)) return value;
  return Array.isArray(value.candidates) ? value.candidates : [];
}

function reviewRows(candidates, companyRecords, robotRecords) {
  const companyKeys = new Set(companyRecords.map((company) => slug(company.name)));
  const robotKeys = new Set(robotRecords.map(robotKey));
  return candidates.map((candidate) => {
    const candidateRobotKey = robotKey(candidate);
    const companyExists = companyKeys.has(slug(candidate.company));
    const robotExists = robotKeys.has(candidateRobotKey);
    const action = robotExists
      ? "already-in-catalog"
      : companyExists
        ? "add-modular-robot"
        : "add-company-and-robot";
    return {
      action,
      company: candidate.company || "",
      robot: candidate.robot || "",
      source: candidate.source || "",
      confidence: Number(candidate.confidence || 0),
      companyExists,
      robotExists,
      suggestedRobotFile: `data/robots/${brandSlug(candidate.company)}/${robotKey(candidate)}.json`,
      suggestedAssetFolder: `assets/robots/${brandSlug(candidate.company)}/${slug(candidate.robot)}/`,
      notes: candidate.notes || ""
    };
  }).sort((a, b) => a.action.localeCompare(b.action) || a.company.localeCompare(b.company) || a.robot.localeCompare(b.robot));
}

function markdownEscape(value = "") {
  return String(value).replace(/\|/g, "\\|").replace(/\n/g, " ").trim();
}

function printMarkdown(rows, candidatePath, candidates) {
  console.log("# Robot Candidate Review");
  console.log("");
  console.log(`- Source: \`${path.relative(root, candidatePath)}\``);
  console.log(`- Candidates loaded: ${candidates.length}`);
  console.log(`- Review rows: ${rows.length}`);
  console.log("");
  if (!rows.length) {
    console.log("No candidates to review.");
    return;
  }
  console.log("| Review | Robot | Company exists | Robot exists | Suggested file | Source |");
  console.log("| --- | --- | --- | --- | --- | --- |");
  for (const row of rows) {
    console.log(`| [ ] ${markdownEscape(row.action)} | ${markdownEscape(`${row.company} / ${row.robot}`)} | ${row.companyExists ? "yes" : "no"} | ${row.robotExists ? "yes" : "no"} | \`${markdownEscape(row.suggestedRobotFile)}\` | ${markdownEscape(row.source)} |`);
  }
}

function printHelp() {
  console.log(`Review robot candidate reports against the current catalog.

Usage:
  node scripts/review-robot-candidates.mjs
  node scripts/review-robot-candidates.mjs --file data/robot-candidates/2026-05-26.json
  node scripts/review-robot-candidates.mjs --markdown
  node scripts/review-robot-candidates.mjs --json

This script only reads candidate reports and prints review actions. It does not create company or robot records.`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const candidatePath = path.resolve(root, args.file || defaultCandidatePath);
  if (!fs.existsSync(candidatePath)) {
    console.log(`No robot candidate report found at ${path.relative(root, candidatePath)}.`);
    console.log("Run `node scripts/discover-robot-candidates.mjs --input leads.txt --write` first.");
    return;
  }

  const candidateRecords = loadCandidates(candidatePath);
  const rows = reviewRows(candidateRecords, companies(), robots());
  if (args.markdown) {
    printMarkdown(rows, candidatePath, candidateRecords);
    return;
  }
  if (args.json) {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }

  console.log(`robot candidate review: ${candidateRecords.length} candidates loaded, ${rows.length} review rows`);
  console.log(`source: ${path.relative(root, candidatePath)}\n`);
  for (const row of rows.slice(0, Number(args.limit || 20))) {
    console.log(`${row.action.padEnd(22)} ${row.company || "Unknown company"} / ${row.robot || "Unknown robot"} · confidence ${row.confidence}`);
    console.log(`  company exists: ${row.companyExists ? "yes" : "no"} · robot exists: ${row.robotExists ? "yes" : "no"}`);
    console.log(`  suggested: ${row.suggestedRobotFile}`);
    console.log(`  source: ${row.source || "missing"}`);
  }
}

main();
