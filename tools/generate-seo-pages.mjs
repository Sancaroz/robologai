import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const robots = JSON.parse(fs.readFileSync(path.join(root, "data/robots.json"), "utf8"));
const companies = JSON.parse(fs.readFileSync(path.join(root, "data/companies.json"), "utf8"));

const robotDir = path.join(root, "robots");
const companyDir = path.join(root, "companies");
fs.mkdirSync(robotDir, { recursive: true });
fs.mkdirSync(companyDir, { recursive: true });
for (const dir of [robotDir, companyDir]) {
  for (const file of fs.readdirSync(dir)) {
    if (file.endsWith(".html")) fs.unlinkSync(path.join(dir, file));
  }
}

function normalize(value = "") {
  return String(value)
    .toLowerCase()
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

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(value = "") {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

function initials(value = "") {
  return String(value)
    .split(/\s+/)
    .map((part) => (part.match(/[A-Za-z0-9]/) || [""])[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2) || "AI";
}

function robotScore(robot) {
  const maturity = Math.max(0, Math.min(5, Number(robot.maturity) || 1));
  const price = Math.max(0, Math.min(5, Number(robot.priceVisibility) || 1));
  const status = normalize(`${robot.status} ${robot.availability}`);
  const source = robot.source ? 5 : 2;
  const image = robot.image ? 5 : 2;
  const deployment = status.includes("available") || status.includes("commercial") || status.includes("enterprise") ? 4 : status.includes("pilot") ? 3 : 2;
  return Math.round(((maturity * 0.3) + (deployment * 0.25) + (price * 0.15) + (source * 0.15) + (image * 0.15)) * 20);
}

function scoreLabel(score) {
  if (score >= 82) return "Leader";
  if (score >= 68) return "Strong signal";
  if (score >= 52) return "Watchlist";
  return "Early signal";
}

function broadCountryName(country = "") {
  return country.includes("/") ? country.split("/")[0].trim() : country;
}

function findCompanyForRobot(robot) {
  const companyName = normalize(robot.company);
  return companies.find((company) => normalize(company.name) === companyName || companyName.includes(normalize(company.name)) || normalize(company.name).includes(companyName));
}

function robotsForCompany(company) {
  const companyName = normalize(company.name);
  const companyRobots = normalize(company.robot || "");
  return robots.filter((robot) => normalize(robot.company).includes(companyName) || companyName.includes(normalize(robot.company)) || companyRobots.includes(normalize(robot.name)));
}

function relatedRobots(robot, limit = 4) {
  const text = normalize(`${robot.category} ${robot.useCase} ${robot.country}`);
  return robots
    .filter((item) => item.name !== robot.name)
    .map((item) => {
      const itemText = normalize(`${item.category} ${item.useCase} ${item.country}`);
      const category = normalize(item.category) === normalize(robot.category) ? 3 : 0;
      const country = broadCountryName(item.country) === broadCountryName(robot.country) ? 1 : 0;
      const terms = text.split(/\s+/).filter((term) => term.length > 4 && itemText.includes(term)).length;
      return { item, rank: category + country + terms };
    })
    .filter((entry) => entry.rank > 0)
    .sort((a, b) => b.rank - a.rank || robotScore(b.item) - robotScore(a.item))
    .slice(0, limit)
    .map((entry) => entry.item);
}

function relatedCompanies(company, limit = 5) {
  const country = broadCountryName(company.country);
  const categoryHead = normalize(company.category).split(/\s+/)[0];
  return companies
    .filter((item) => item.name !== company.name)
    .map((item) => {
      const countryRank = broadCountryName(item.country) === country ? 2 : 0;
      const categoryRank = normalize(item.category).includes(categoryHead) ? 2 : 0;
      const typeRank = normalize(item.type) === normalize(company.type) ? 1 : 0;
      return { item, rank: countryRank + categoryRank + typeRank };
    })
    .filter((entry) => entry.rank > 0)
    .sort((a, b) => b.rank - a.rank)
    .slice(0, limit)
    .map((entry) => entry.item);
}

function layout({ title, description, canonical, body, schema }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${escapeAttr(description)}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${escapeAttr(canonical)}">
    <meta property="og:title" content="${escapeAttr(title)}">
    <meta property="og:description" content="${escapeAttr(description)}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="${escapeAttr(canonical)}">
    <meta property="og:site_name" content="robologai">
    <title>${escapeHtml(title)} | robologai</title>
    <link rel="stylesheet" href="../styles.css">
    <script type="application/ld+json">${JSON.stringify(schema)}</script>
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="../index.html"><img src="../assets/robologai-mark.svg" alt="" aria-hidden="true">robolog<span>ai</span></a>
      <nav class="main-nav" aria-label="Main menu">
        <a href="../index.html">Home</a>
        <a href="../robots.html">Robots</a>
        <a href="../companies.html">Companies</a>
        <a href="../market.html">Intelligence</a>
        <a href="../compare.html">Compare</a>
        <a href="../videos.html">Videos</a>
      </nav>
      <div class="header-actions">
        <a class="language-pill" href="../tr.html">TR</a>
        <a class="join-button" href="../index.html#bulten">Follow</a>
      </div>
    </header>
    <main>
${body}
    </main>
    <footer class="site-footer mini-footer">
      <a class="brand footer-brand" href="../index.html"><img src="../assets/robologai-mark.svg" alt="" aria-hidden="true">robolog<span>ai</span></a>
      <p>Robotics and AI intelligence, organized as catalogs, comparisons, and source-first analysis.</p>
    </footer>
  </body>
</html>
`;
}

function robotPage(robot) {
  const company = findCompanyForRobot(robot);
  const pageSlug = robotPageSlug(robot);
  const dynamicSlug = slug(robot.name);
  const score = robotScore(robot);
  const related = relatedRobots(robot);
  const title = `${robot.name} Robot Profile: Price, Use Case, Status`;
  const description = `${robot.name} by ${robot.company}: ${robot.category} robot profile with availability, price signal, use case, status, source link, and Robologai readiness score.`;
  const canonical = `https://robologai.com/robots/${pageSlug}.html`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: robot.name,
    brand: { "@type": "Brand", name: robot.company },
    category: robot.category,
    description,
    image: robot.image || undefined,
    url: canonical,
    manufacturer: company ? { "@type": "Organization", name: company.name, url: company.website } : undefined
  };
  const body = `      <section class="profile-hero robot-profile-hero">
        <div>
          <p>${escapeHtml(robot.category)} · ${escapeHtml(robot.country)} · ${escapeHtml(scoreLabel(score))}</p>
          <h1>${escapeHtml(robot.name)} Robot Profile</h1>
          <span>${escapeHtml(robot.useCase)}</span>
          <div class="catalog-metrics">
            <article><strong>${score}</strong><small>Robologai R-Score</small></article>
            <article><strong>${escapeHtml(robot.availability)}</strong><small>Availability</small></article>
            <article><strong>${escapeHtml(robot.price)}</strong><small>Price signal</small></article>
          </div>
        </div>
        <figure class="profile-visual">
          ${robot.image ? `<img src="${escapeAttr(robot.image)}" alt="${escapeAttr(robot.name)} robot" loading="lazy">` : `<div class="company-profile-mark">${escapeHtml(initials(robot.name))}</div>`}
          <figcaption>${escapeHtml(robot.imageCredit || "Robologai source-first profile")}</figcaption>
        </figure>
      </section>
      <section class="profile-detail-grid">
        <article class="profile-facts">
          <h2>${escapeHtml(robot.name)} facts</h2>
          <dl>
            <div><dt>Company</dt><dd>${company ? `<a href="../companies/${companyPageSlug(company)}.html">${escapeHtml(robot.company)} →</a>` : escapeHtml(robot.company)}</dd></div>
            <div><dt>Status</dt><dd>${escapeHtml(robot.status)}</dd></div>
            <div><dt>Use case</dt><dd>${escapeHtml(robot.useCase)}</dd></div>
            <div><dt>Height</dt><dd>${escapeHtml(robot.height || "Not disclosed")}</dd></div>
            <div><dt>Runtime</dt><dd>${escapeHtml(robot.runtime || "Not disclosed")}</dd></div>
            <div><dt>Official source</dt><dd><a href="${escapeAttr(robot.source || "#")}" target="_blank" rel="noopener noreferrer">Open official source →</a></dd></div>
          </dl>
        </article>
        <article class="profile-facts">
          <h2>Robologai view</h2>
          <p>${escapeHtml(robot.name)} is tracked as a ${escapeHtml(robot.category)} robot for ${escapeHtml(robot.useCase)}. Robologai scores it by maturity, deployment signal, price clarity, media proof, and official source strength.</p>
          <div class="quality-chip-row">
            <span>Maturity ${escapeHtml(String(robot.maturity || "1"))}/5</span>
            <span>Price clarity ${escapeHtml(String(robot.priceVisibility || "1"))}/5</span>
            <span>${escapeHtml(scoreLabel(score))}</span>
          </div>
        </article>
      </section>
      <section class="catalog-section">
        <div class="section-heading compact">
          <p>Compare Next</p>
          <h2>Robots to compare with ${escapeHtml(robot.name)}.</h2>
        </div>
        <div class="signal-grid">
          ${related.map((item) => `<article class="signal-card"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.company)} · ${robotScore(item)} R-Score</span><small>${escapeHtml(item.useCase)}</small><a href="../robots/${robotPageSlug(item)}.html">Open profile →</a></article>`).join("")}
        </div>
        <div class="catalog-actions">
          <a href="../robot.html?robot=${escapeAttr(dynamicSlug)}">Open interactive profile →</a>
          <a href="../compare.html?robots=${escapeAttr([dynamicSlug, ...related.slice(0, 2).map((item) => slug(item.name))].join(","))}">Compare robots →</a>
          <a href="../robots.html">Back to robot catalog →</a>
        </div>
      </section>`;
  return layout({ title, description, canonical, body, schema });
}

function companyPage(company) {
  const pageSlug = companyPageSlug(company);
  const linkedRobots = robotsForCompany(company);
  const related = relatedCompanies(company);
  const title = `${company.name} Company Profile: Robots, AI, Market Signal`;
  const description = `${company.name} profile on robologai: ${company.category}, country, public/private status, ticker, robot assets, official website, and related robotics companies.`;
  const canonical = `https://robologai.com/companies/${pageSlug}.html`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: company.website || canonical,
    description,
    areaServed: company.country,
    knowsAbout: company.category
  };
  const body = `      <section class="profile-hero company-profile-hero">
        <div>
          <p>${escapeHtml(company.type || "Company")} · ${escapeHtml(company.country || "Global")}</p>
          <h1>${escapeHtml(company.name)} Company Profile</h1>
          <span>${escapeHtml(company.category)}</span>
          <div class="catalog-metrics">
            <article><strong>${escapeHtml(company.robot || "Robotics / AI")}</strong><small>Robot / asset</small></article>
            <article><strong>${escapeHtml(company.ticker || company.type || "Private")}</strong><small>Market signal</small></article>
            <article><strong>${escapeHtml(broadCountryName(company.country))}</strong><small>Country tracker</small></article>
          </div>
        </div>
        <div class="company-profile-mark">${escapeHtml(initials(company.name))}</div>
      </section>
      <section class="profile-detail-grid">
        <article class="profile-facts">
          <h2>${escapeHtml(company.name)} facts</h2>
          <dl>
            <div><dt>Category</dt><dd>${escapeHtml(company.category)}</dd></div>
            <div><dt>Country</dt><dd><a href="../country.html?country=${escapeAttr(slug(broadCountryName(company.country)))}">${escapeHtml(company.country)} →</a></dd></div>
            <div><dt>Type</dt><dd>${escapeHtml(company.type || "Entity")}</dd></div>
            <div><dt>Ticker</dt><dd>${escapeHtml(company.ticker || "Not public / not listed")}</dd></div>
            <div><dt>Website</dt><dd><a href="${escapeAttr(company.website || "#")}" target="_blank" rel="noopener noreferrer">Official website →</a></dd></div>
          </dl>
        </article>
        <article class="profile-facts">
          <h2>Robologai signal</h2>
          <p>${escapeHtml(company.name)} is tracked in Robologai's robotics and AI company database. This static profile gives search engines and readers a stable source-first page, while the interactive database remains available for filtering and comparison.</p>
        </article>
      </section>
      <section class="catalog-section">
        <div class="section-heading compact">
          <p>Linked Robots</p>
          <h2>Robots and assets associated with ${escapeHtml(company.name)}.</h2>
        </div>
        <div class="signal-grid">
          ${(linkedRobots.length ? linkedRobots : [{ name: company.robot || "Robotics / AI activity", company: company.name, useCase: company.category }]).map((robot) => `<article class="signal-card"><strong>${escapeHtml(robot.name)}</strong><span>${escapeHtml(robot.company || company.name)}</span><small>${escapeHtml(robot.useCase || company.category)}</small>${robots.includes(robot) ? `<a href="../robots/${robotPageSlug(robot)}.html">Robot profile →</a>` : ""}</article>`).join("")}
        </div>
      </section>
      <section class="catalog-section">
        <div class="section-heading compact">
          <p>Related Companies</p>
          <h2>Companies to compare with ${escapeHtml(company.name)}.</h2>
        </div>
        <div class="signal-grid">
          ${related.map((item) => `<article class="signal-card"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.country)}</span><small>${escapeHtml(item.category)}</small><a href="../companies/${companyPageSlug(item)}.html">Open profile →</a></article>`).join("")}
        </div>
        <div class="catalog-actions">
          <a href="../company.html?company=${escapeAttr(pageSlug)}">Open interactive profile →</a>
          <a href="../companies.html">Back to company database →</a>
        </div>
      </section>`;
  return layout({ title, description, canonical, body, schema });
}

for (const robot of robots) {
  fs.writeFileSync(path.join(robotDir, `${robotPageSlug(robot)}.html`), robotPage(robot));
}

for (const company of companies) {
  fs.writeFileSync(path.join(companyDir, `${companyPageSlug(company)}.html`), companyPage(company));
}

const sitemapPath = path.join(root, "sitemap.xml");
const generatedUrls = [
  ...robots.map((robot) => `https://robologai.com/robots/${robotPageSlug(robot)}.html`),
  ...companies.map((company) => `https://robologai.com/companies/${companyPageSlug(company)}.html`)
];
let sitemap = fs.readFileSync(sitemapPath, "utf8");
sitemap = sitemap.replace(/  <url>\n    <loc>https:\/\/robologai\.com\/robots\/[\s\S]*?<\/url>\n/g, "");
sitemap = sitemap.replace(/  <url>\n    <loc>https:\/\/robologai\.com\/companies\/[\s\S]*?<\/url>\n/g, "");
const entries = generatedUrls.map((url) => `  <url>
    <loc>${url}</loc>
    <lastmod>2026-05-07</lastmod>
    <priority>${url.includes("/robots/") ? "0.8" : "0.7"}</priority>
  </url>`).join("\n");
sitemap = sitemap.replace("</urlset>", `${entries}\n</urlset>`);
fs.writeFileSync(sitemapPath, sitemap);

console.log(`Generated ${robots.length} robot pages and ${companies.length} company pages.`);
