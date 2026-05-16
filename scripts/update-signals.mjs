import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const signalsPath = path.join(root, "data", "signals.json");
const sourcesPath = path.join(root, "data", "signal-sources.json");
const maxSignals = 60;

const companyHints = [
  "Tesla",
  "Figure AI",
  "Unitree Robotics",
  "Boston Dynamics",
  "Agility Robotics",
  "Apptronik",
  "NVIDIA",
  "Google DeepMind",
  "AKINROBOTICS",
  "Altinay",
  "Altınay",
  "1X Technologies",
  "Intuitive Surgical",
  "Sanctuary AI",
  "Mistral AI",
  "OpenAI"
];

const highImpactTerms = [
  "humanoid",
  "funding",
  "factory",
  "launch",
  "partnership",
  "deployment",
  "physical ai",
  "embodied",
  "foundation model",
  "robotics platform"
];

function stripHtml(value = "") {
  return value
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeXml(value = "") {
  return stripHtml(value)
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&apos;/g, "'");
}

function firstMatch(text, patterns) {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]) return decodeXml(match[1]);
  }
  return "";
}

function parseFeed(xml) {
  const items = [];
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) || xml.match(/<entry[\s\S]*?<\/entry>/gi) || [];
  for (const block of blocks) {
    const title = firstMatch(block, [/<title[^>]*>([\s\S]*?)<\/title>/i]);
    const summary = firstMatch(block, [
      /<description[^>]*>([\s\S]*?)<\/description>/i,
      /<summary[^>]*>([\s\S]*?)<\/summary>/i,
      /<content[^>]*>([\s\S]*?)<\/content>/i
    ]);
    const pubDate = firstMatch(block, [
      /<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i,
      /<updated[^>]*>([\s\S]*?)<\/updated>/i,
      /<published[^>]*>([\s\S]*?)<\/published>/i
    ]);
    let link = firstMatch(block, [/<link[^>]*>([\s\S]*?)<\/link>/i]);
    const href = block.match(/<link[^>]*href=["']([^"']+)["'][^>]*>/i);
    if (!link && href?.[1]) link = href[1];
    if (title && link) items.push({ title, summary, pubDate, link });
  }
  return items;
}

function isoDate(value) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return new Date().toISOString().slice(0, 10);
  return date.toISOString().slice(0, 10);
}

function inferCompany(title, fallback = "") {
  const normalized = title.toLowerCase();
  const match = companyHints.find((company) => normalized.includes(company.toLowerCase()));
  return match || fallback || "Robotics ecosystem";
}

function inferImpact(text, fallback = "Medium") {
  const normalized = text.toLowerCase();
  if (highImpactTerms.some((term) => normalized.includes(term))) return "High";
  return fallback;
}

function keywordMatch(item, source) {
  const haystack = `${item.title} ${item.summary}`.toLowerCase();
  if ((source.excludeKeywords || []).some((keyword) => haystack.includes(String(keyword).toLowerCase()))) {
    return false;
  }
  const matches = (source.keywords || []).filter((keyword) => haystack.includes(String(keyword).toLowerCase()));
  const minimumMatches = Number(source.minimumKeywordMatches || 1);
  return matches.length >= minimumMatches;
}

function isRelevantSignal(signal) {
  if (signal.sourceType !== "automated") return true;
  const company = String(signal.company || "").toLowerCase().includes("robotics ecosystem") ? "" : signal.company;
  const text = `${signal.title} ${signal.summary} ${company || ""}`.toLowerCase();
  const coreTerms = [
    "robot",
    "robotics",
    "humanoid",
    "quadruped",
    "cobot",
    "drone",
    "autonomous vehicle",
    "physical ai",
    "embodied",
    "manipulation",
    "exoskeleton",
    "inspection robot",
    "warehouse robot",
    "mobile robot",
    "factory robot"
  ];
  if (coreTerms.some((term) => text.includes(term))) return true;
  const contextualAutomation = ["factory automation", "warehouse automation", "industrial automation", "robotic automation"];
  return contextualAutomation.some((term) => text.includes(term));
}

function signalFromItem(item, source) {
  const combined = `${item.title} ${item.summary}`;
  return {
    date: isoDate(item.pubDate),
    type: source.type || "Robotics Signal",
    title: item.title,
    company: source.company || inferCompany(item.title),
    robot: source.robot || "Robotics ecosystem",
    category: source.category || "Robotics intelligence",
    country: source.country || "Global",
    impact: inferImpact(combined, source.defaultImpact || "Medium"),
    summary: stripHtml(item.summary || item.title).slice(0, 260),
    source: item.link,
    relatedUrl: source.relatedUrl || "signals.html",
    sourceType: "automated"
  };
}

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch (error) {
    return fallback;
  }
}

async function fetchSource(source) {
  const response = await fetch(source.url, {
    headers: {
      "User-Agent": "RoboLogAI signal updater (+https://robologai.com)"
    }
  });
  if (!response.ok) throw new Error(`${source.name}: ${response.status}`);
  const xml = await response.text();
  return parseFeed(xml)
    .filter((item) => keywordMatch(item, source))
    .slice(0, Number(source.maxItems || 8))
    .map((item) => signalFromItem(item, source));
}

function dedupeSignals(signals) {
  const seen = new Set();
  return signals.filter((signal) => {
    const key = `${signal.source || ""}::${signal.title || ""}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function main() {
  const existing = await readJson(signalsPath, []);
  const sources = await readJson(sourcesPath, []);
  const generated = [];

  for (const source of sources) {
    try {
      const signals = await fetchSource(source);
      generated.push(...signals);
      console.log(`source ok: ${source.name} (${signals.length})`);
    } catch (error) {
      console.warn(`source skipped: ${source.name} - ${error.message}`);
    }
  }

  const merged = dedupeSignals([...generated, ...existing])
    .filter(isRelevantSignal)
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")))
    .slice(0, maxSignals);

  await fs.writeFile(signalsPath, `${JSON.stringify(merged, null, 2)}\n`);
  console.log(`signals updated: ${existing.length} -> ${merged.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
