import fs from "node:fs";
import http from "node:http";
import https from "node:https";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, "data", "robot-candidates");
const urlPattern = /https?:\/\/[^\s,|]+/i;

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

function titleCase(value = "") {
  return String(value)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}

function cleanField(value = "") {
  return String(value).replace(/^[\s,|:;/-]+|[\s,|:;/-]+$/g, "").trim();
}

function slug(value = "") {
  return normalize(value)
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function inferCompanyFromUrl(url = "") {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    const base = hostname.split(".")[0] || "";
    return titleCase(base.replace(/robotics?$/i, " Robotics"));
  } catch {
    return "";
  }
}

function inferRobotFromUrl(url = "") {
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);
    const last = parts[parts.length - 1] || "";
    if (!last || ["products", "robots", "robot", "humanoid", "en"].includes(last.toLowerCase())) return "";
    return titleCase(last);
  } catch {
    return "";
  }
}

function parseLine(line, index) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return null;
  const url = trimmed.match(urlPattern)?.[0] || "";
  const withoutUrl = url ? trimmed.replace(url, "").replace(/[,|\-–—:]+$/g, "").trim() : trimmed;
  let company = "";
  let robot = "";

  if (withoutUrl.includes("|")) {
    const [first, second] = withoutUrl.split("|").map(cleanField);
    company = first || "";
    robot = second || "";
  } else if (withoutUrl.includes(",")) {
    const [first, second] = withoutUrl.split(",").map(cleanField);
    company = first || "";
    robot = second || "";
  } else if (withoutUrl.includes("/")) {
    const [first, second] = withoutUrl.split("/").map(cleanField);
    company = first || "";
    robot = second || "";
  } else if (withoutUrl && !url) {
    robot = cleanField(withoutUrl);
  } else if (withoutUrl) {
    robot = cleanField(withoutUrl);
  }

  return {
    inputIndex: index + 1,
    company: company || inferCompanyFromUrl(url),
    robot: robot || inferRobotFromUrl(url),
    source: url,
    sourceType: url ? "candidate-source" : "missing-url",
    status: url ? "needs-official-verification" : "needs-source-url",
    confidence: company && robot && url ? 3 : 2,
    notes: "Candidate generated from discovery input; verify official product page before adding to modular data."
  };
}

function parseInputText(text = "") {
  return text.split(/\r?\n/).map(parseLine).filter(Boolean);
}

function loadInput(filePath) {
  if (!filePath) throw new Error("Provide --input path/to/list.txt");
  const fullPath = path.resolve(root, filePath);
  const raw = fs.readFileSync(fullPath, "utf8");
  if (filePath.endsWith(".json")) {
    const value = JSON.parse(raw);
    const records = Array.isArray(value) ? value : value.candidates || value.urls || [];
    return records.map((record, index) => {
      if (typeof record === "string") return parseLine(record, index);
      return {
        inputIndex: index + 1,
        company: record.company || inferCompanyFromUrl(record.source || record.url || ""),
        robot: record.robot || record.name || inferRobotFromUrl(record.source || record.url || ""),
        source: record.source || record.url || "",
        sourceType: "candidate-source",
        status: "needs-official-verification",
        confidence: record.company && (record.robot || record.name) && (record.source || record.url) ? 3 : 2,
        notes: record.notes || "Candidate generated from discovery input; verify official product page before adding to modular data."
      };
    }).filter(Boolean);
  }
  return parseInputText(raw);
}

function fetchTitle(url) {
  return new Promise((resolve) => {
    const client = url.startsWith("https:") ? https : http;
    const request = client.get(url, {
      headers: {
        "User-Agent": "RoboLogAI candidate discovery (+https://robologai.com)",
        Accept: "text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.8"
      },
      timeout: 12000
    }, (response) => {
      if ([301, 302, 303, 307, 308].includes(response.statusCode) && response.headers.location) {
        response.resume();
        fetchTitle(new URL(response.headers.location, url).toString()).then(resolve);
        return;
      }
      if (!response.statusCode || response.statusCode >= 400) {
        response.resume();
        resolve("");
        return;
      }
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => {
        body += chunk;
        if (body.length > 250000) request.destroy();
      });
      response.on("end", () => {
        const title = body.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "";
        resolve(cleanText(title));
      });
    });
    request.on("error", () => resolve(""));
    request.on("timeout", () => {
      request.destroy();
      resolve("");
    });
  });
}

function cleanText(value = "") {
  return String(value)
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, "\"")
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function candidateKey(candidate) {
  return `${slug(candidate.company)}::${slug(candidate.robot)}::${normalize(candidate.source)}`;
}

function dedupe(candidates) {
  const seen = new Set();
  return candidates.filter((candidate) => {
    const key = candidateKey(candidate);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function enrichCandidates(candidates, args) {
  const rows = [];
  for (const candidate of candidates) {
    const title = args.fetch && candidate.source ? await fetchTitle(candidate.source) : "";
    const strongerRobot = candidate.robot || inferRobotFromTitle(title, candidate.company);
    rows.push({
      ...candidate,
      robot: strongerRobot,
      pageTitle: title,
      confidence: candidate.confidence + (title ? 1 : 0) + (strongerRobot ? 1 : 0)
    });
  }
  return dedupe(rows).sort((a, b) => `${a.company} ${a.robot}`.localeCompare(`${b.company} ${b.robot}`));
}

function inferRobotFromTitle(title = "", company = "") {
  const clean = cleanText(title);
  if (!clean) return "";
  const withoutCompany = clean.replace(new RegExp(company, "i"), "").replace(/[|–—-].*$/, "").trim();
  return withoutCompany.length > 2 ? withoutCompany : "";
}

function localDateStamp() {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  return formatter.format(new Date());
}

function writeReport(candidates) {
  fs.mkdirSync(outputDir, { recursive: true });
  const payload = {
    generatedAt: new Date().toISOString(),
    reviewRequired: true,
    note: "Candidate robots only. Verify official company/product sources before adding modular records.",
    candidates
  };
  const today = localDateStamp();
  fs.writeFileSync(path.join(outputDir, "latest.json"), `${JSON.stringify(payload, null, 2)}\n`);
  fs.writeFileSync(path.join(outputDir, `${today}.json`), `${JSON.stringify(payload, null, 2)}\n`);
}

function printHelp() {
  console.log(`Discover robot candidates from URL lists.

Usage:
  node scripts/discover-robot-candidates.mjs --input leads.txt
  node scripts/discover-robot-candidates.mjs --input leads.txt --fetch
  node scripts/discover-robot-candidates.mjs --input leads.txt --write
  node scripts/discover-robot-candidates.mjs --input leads.json --json

Input formats:
  Company | Robot | https://official-product-url
  Company, Robot, https://official-product-url
  Company / Robot: https://official-product-url
  https://official-product-url

Reports are review-only and never update company or robot records automatically.`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const candidates = await enrichCandidates(loadInput(args.input), args);
  if (args.write) writeReport(candidates);
  if (args.json) {
    console.log(JSON.stringify(candidates, null, 2));
    return;
  }

  console.log(`robot candidate discovery: ${candidates.length} candidates`);
  for (const candidate of candidates.slice(0, Number(args.limit || 20))) {
    console.log(`${candidate.company || "Unknown company"} / ${candidate.robot || "Unknown robot"} · confidence ${candidate.confidence} · ${candidate.source || "missing source"}`);
    if (candidate.pageTitle) console.log(`  title: ${candidate.pageTitle}`);
  }
  if (args.write) console.log(`\nwrote data/robot-candidates/latest.json and dated review report`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
