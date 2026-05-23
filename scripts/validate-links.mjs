import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`${path.relative(root, filePath)}: ${error.message}`);
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

function robotPageSlug(robot) {
  const name = slug(robot.name);
  const brand = brandSlug(robot.company);
  return name.startsWith(brand) ? name : `${brand}-${name}`;
}

function companyPageSlug(company) {
  return slug(company.name);
}

function localPathFromUrl(url = "") {
  const value = String(url || "").trim();
  if (!value || value.startsWith("#") || /^https?:\/\//i.test(value) || /^mailto:/i.test(value)) return "";
  const withoutHash = value.split("#")[0].split("?")[0];
  if (!withoutHash || withoutHash.endsWith("/")) return "";
  return path.join(root, withoutHash.replace(/^\.\//, ""));
}

function assertLocalFile(label, relativePath) {
  const filePath = path.join(root, relativePath);
  if (!fs.existsSync(filePath)) {
    throw new Error(`${label} missing: ${relativePath}`);
  }
}

function main() {
  const companies = readJson(path.join(root, "data", "companies.json"));
  const robots = readJson(path.join(root, "data", "robots.json"));
  const signals = readJson(path.join(root, "data", "signals.json"));

  for (const company of companies) {
    assertLocalFile(`company profile for ${company.name}`, path.join("companies", `${companyPageSlug(company)}.html`));
  }

  for (const robot of robots) {
    assertLocalFile(`robot profile for ${robot.company} / ${robot.name}`, path.join("robots", `${robotPageSlug(robot)}.html`));
  }

  const missingSignalLinks = signals
    .map((signal) => ({ signal, filePath: localPathFromUrl(signal.relatedUrl) }))
    .filter(({ filePath }) => filePath && !fs.existsSync(filePath))
    .map(({ signal }) => `${signal.title} -> ${signal.relatedUrl}`);

  if (missingSignalLinks.length) {
    throw new Error(`signals reference missing local pages: ${missingSignalLinks.slice(0, 12).join("; ")}`);
  }

  console.log(`links ok: ${companies.length} company profiles, ${robots.length} robot profiles, ${signals.length} signal related URLs`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
