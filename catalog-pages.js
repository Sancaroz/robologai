const pageState = {
  robots: [],
  companies: [],
  robotFilter: "all",
  companyFilter: "all",
  query: ""
};

const robotFallback = [
  { name: "Optimus", company: "Tesla", category: "Humanoid", country: "USA", status: "Internal development", availability: "Not publicly sold", price: "No official public price", useCase: "Manufacturing, logistics, future general-purpose work", source: "https://www.tesla.com/AI" },
  { name: "Figure 02", company: "Figure AI", category: "Humanoid", country: "USA", status: "Enterprise pilots", availability: "Enterprise only", price: "No official public price", useCase: "Workplace manipulation and factory automation", source: "https://www.figure.ai/" },
  { name: "G1", company: "Unitree Robotics", category: "Humanoid", country: "China", status: "Order-based availability", availability: "Available / order-based", price: "From around $16K depending on configuration", useCase: "Research, education, prototyping", source: "https://www.unitree.com/g1/" }
];

const companyFallback = [
  { name: "Tesla", category: "Humanoid robotics, EV, autonomy", country: "USA", type: "Public", ticker: "TSLA", robot: "Optimus", website: "https://www.tesla.com/AI", keywords: ["humanoid", "factory"] },
  { name: "Figure AI", category: "Humanoid robotics", country: "USA", type: "Private", ticker: "", robot: "Figure 02", website: "https://www.figure.ai/", keywords: ["humanoid", "workplace"] },
  { name: "Unitree Robotics", category: "Humanoid and quadruped robotics", country: "China", type: "Private", ticker: "", robot: "G1, H1, Go2", website: "https://www.unitree.com/", keywords: ["g1", "h1", "quadruped"] }
];

function pageNormalize(value = "") {
  return String(value).toLocaleLowerCase("tr").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function pageEscape(value = "") {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function robotText(robot) {
  return pageNormalize([robot.name, robot.company, robot.category, robot.country, robot.status, robot.availability, robot.price, robot.useCase, ...(robot.keywords || [])].filter(Boolean).join(" "));
}

function companyText(company) {
  return pageNormalize([company.name, company.category, company.country, company.type, company.ticker, company.robot, company.website, ...(company.keywords || [])].filter(Boolean).join(" "));
}

function pageInitials(value = "") {
  const letters = String(value).split(/\s+/).map((part) => (part.match(/[A-Za-z0-9]/) || [""])[0]).filter(Boolean).join("").toUpperCase();
  return letters.slice(0, 2) || "AI";
}

function robotSlug(robot) {
  return pageNormalize(robot.name)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function companySlug(company) {
  return pageNormalize(company.name)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function countrySlug(country = "") {
  const key = country.includes("/") ? country.split("/")[0] : country;
  return pageNormalize(key)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function broadCountryName(country = "") {
  if (country.includes("China")) return "China";
  if (country.includes("USA")) return "USA";
  if (country.includes("Japan")) return "Japan";
  if (country.includes("United Kingdom")) return "United Kingdom";
  if (country.includes("South Korea")) return "South Korea";
  if (country.includes("Germany")) return "Germany";
  if (country.includes("Switzerland")) return "Switzerland";
  if (country.includes("Canada")) return "Canada";
  return country.split("/")[0].trim() || "Global";
}

function pageMeter(value = 1) {
  const score = Math.max(0, Math.min(5, Number(value) || 0)) / 5;
  return `<span class="robot-meter" style="--score:${score}"><i></i></span>`;
}

function setCount(name, value) {
  document.querySelectorAll(`[data-count="${name}"]`).forEach((node) => {
    node.textContent = value;
  });
}

function renderRobotCards() {
  const grid = document.querySelector("[data-robots-grid]");
  if (!grid) return;
  const terms = pageNormalize(pageState.query).split(/\s+/).filter(Boolean);
  const filter = pageNormalize(pageState.robotFilter);
  const robots = pageState.robots.filter((robot) => {
    const text = robotText(robot);
    const matchesQuery = !terms.length || terms.every((term) => text.includes(term));
    const matchesFilter = filter === "all" || text.includes(filter);
    return matchesQuery && matchesFilter;
  });

  grid.innerHTML = robots.map((robot) => `
    <article class="catalog-card robot-catalog-card">
      <figure class="catalog-visual ${robot.image ? "" : "catalog-visual-empty"}">
        ${robot.image ? `<img src="${pageEscape(robot.image)}" alt="${pageEscape(robot.name)} robot" loading="lazy">` : `<span>${pageEscape(pageInitials(robot.name))}</span>`}
      </figure>
      <div class="catalog-card-body">
        <div class="database-tags">
          <span>${pageEscape(robot.category || "Robot")}</span>
          <span>${pageEscape(robot.country || "Global")}</span>
        </div>
        <h2>${pageEscape(robot.name)}</h2>
        <p>${pageEscape(robot.useCase || "Robotics platform")}</p>
        <dl>
          <div><dt>Company</dt><dd>${pageEscape(robot.company)}</dd></div>
          <div><dt>Status</dt><dd>${pageEscape(robot.status)}</dd></div>
          <div><dt>Availability</dt><dd>${pageEscape(robot.availability)}</dd></div>
          <div><dt>Price</dt><dd>${pageEscape(robot.price)}</dd></div>
        </dl>
        <div class="robot-score-row">
          <span>Maturity ${pageMeter(robot.maturity)}</span>
          <span>Price clarity ${pageMeter(robot.priceVisibility)}</span>
        </div>
        <div class="catalog-actions">
          <a href="robot.html?robot=${pageEscape(robotSlug(robot))}">Open profile →</a>
          <a href="${pageEscape(robot.source || "#")}" target="_blank" rel="noopener noreferrer">Official source →</a>
        </div>
      </div>
    </article>
  `).join("");
  setCount("visible-robots", robots.length);
}

function renderCompanyCards() {
  const grid = document.querySelector("[data-companies-grid]");
  if (!grid) return;
  const terms = pageNormalize(pageState.query).split(/\s+/).filter(Boolean);
  const filter = pageNormalize(pageState.companyFilter);
  const companies = pageState.companies.filter((company) => {
    const text = companyText(company);
    const matchesQuery = !terms.length || terms.every((term) => text.includes(term));
    const matchesFilter = filter === "all" || text.includes(filter);
    return matchesQuery && matchesFilter;
  });

  grid.innerHTML = companies.map((company) => `
    <article class="catalog-card company-catalog-card">
      <div class="company-avatar">${pageEscape(pageInitials(company.name))}</div>
      <div class="catalog-card-body">
        <div class="database-tags">
          <span>${pageEscape(company.type || "Entity")}</span>
          <span>${pageEscape(company.country || "Global")}</span>
          ${company.ticker ? `<span>${pageEscape(company.ticker)}</span>` : ""}
        </div>
        <h2>${pageEscape(company.name)}</h2>
        <p>${pageEscape(company.category)}</p>
        <dl>
          <div><dt>Robot / asset</dt><dd>${pageEscape(company.robot || "Robotics / AI activity")}</dd></div>
          <div><dt>Website</dt><dd>${pageEscape(company.website || "Official source")}</dd></div>
        </dl>
        <div class="catalog-actions">
          <a href="company.html?company=${pageEscape(companySlug(company))}">Open profile →</a>
          <a href="country.html?country=${pageEscape(countrySlug(company.country))}">${pageEscape(broadCountryName(company.country))} tracker →</a>
          <a href="${pageEscape(company.website || "#")}" target="_blank" rel="noopener noreferrer">Official website →</a>
        </div>
      </div>
    </article>
  `).join("");
  setCount("visible-companies", companies.length);
}

function renderMarketPage() {
  const publicGrid = document.querySelector("[data-market-public]");
  const privateGrid = document.querySelector("[data-market-private]");
  const priceGrid = document.querySelector("[data-market-prices]");
  if (!publicGrid && !privateGrid && !priceGrid) return;

  const publicCompanies = pageState.companies.filter((company) => pageNormalize(company.type).includes("public")).slice(0, 18);
  const privateBuilders = pageState.companies.filter((company) => pageNormalize(`${company.type} ${company.category}`).includes("private") && pageNormalize(company.category).includes("robot")).slice(0, 18);
  const priceRobots = pageState.robots.filter((robot) => Number(robot.priceVisibility || 0) >= 2).slice(0, 12);

  if (publicGrid) {
    publicGrid.innerHTML = publicCompanies.map((company) => `
      <article class="signal-card"><strong>${pageEscape(company.name)}</strong><span>${pageEscape(company.ticker || company.type)}</span><small>${pageEscape(company.category)}</small><a href="${pageEscape(company.website)}" target="_blank" rel="noopener noreferrer">Source →</a></article>
    `).join("");
  }
  if (privateGrid) {
    privateGrid.innerHTML = privateBuilders.map((company) => `
      <article class="signal-card"><strong>${pageEscape(company.name)}</strong><span>${pageEscape(company.country)}</span><small>${pageEscape(company.robot || company.category)}</small><a href="${pageEscape(company.website)}" target="_blank" rel="noopener noreferrer">Source →</a></article>
    `).join("");
  }
  if (priceGrid) {
    priceGrid.innerHTML = priceRobots.map((robot) => `
      <article class="signal-card"><strong>${pageEscape(robot.name)}</strong><span>${pageEscape(robot.company)}</span><small>${pageEscape(robot.price)}</small><a href="${pageEscape(robot.source)}" target="_blank" rel="noopener noreferrer">Source →</a></article>
    `).join("");
  }
}

function renderPricesPage() {
  const grid = document.querySelector("[data-prices-grid]");
  if (!grid) return;
  const groups = [
    ["Public / visible", (robot) => Number(robot.priceVisibility || 0) >= 4],
    ["Configuration dependent", (robot) => Number(robot.priceVisibility || 0) >= 2 && Number(robot.priceVisibility || 0) < 4],
    ["Enterprise / quote-based", (robot) => pageNormalize(robot.price).includes("enterprise") || pageNormalize(robot.price).includes("quote")],
    ["No public price", (robot) => Number(robot.priceVisibility || 0) <= 1]
  ];

  grid.innerHTML = groups.map(([title, predicate]) => {
    const robots = pageState.robots.filter(predicate);
    return `
      <section class="price-column">
        <div class="price-column-head"><strong>${pageEscape(title)}</strong><span>${robots.length} robots</span></div>
        ${robots.map((robot) => `
          <article class="price-card">
            <strong>${pageEscape(robot.name)}</strong>
            <span>${pageEscape(robot.company)}</span>
            <p>${pageEscape(robot.price)}</p>
            <small>${pageEscape(robot.availability)}</small>
            <a href="robot.html?robot=${pageEscape(robotSlug(robot))}">Profile →</a>
          </article>
        `).join("")}
      </section>
    `;
  }).join("");
}

function renderVideosPage() {
  const grid = document.querySelector("[data-videos-grid]");
  if (!grid) return;
  const robots = pageState.robots.filter((robot) => robot.image).slice(0, 18);
  grid.innerHTML = robots.map((robot) => `
    <a class="video-card video-gallery-card" href="${pageEscape(robot.source)}" target="_blank" rel="noopener noreferrer">
      <div class="video-thumb">
        <img src="${pageEscape(robot.image)}" alt="${pageEscape(robot.name)} demo visual" loading="lazy">
        <span>▶</span>
        <em>${pageEscape(robot.category || "Robot demo")}</em>
      </div>
      <div>
        <small>${pageEscape(robot.company)}</small>
        <h3>${pageEscape(robot.name)} official demo / product page</h3>
      </div>
    </a>
  `).join("");
}

function renderRobotProfile() {
  const root = document.querySelector("[data-robot-profile]");
  if (!root) return;
  const params = new URLSearchParams(window.location.search);
  const wanted = params.get("robot") || "optimus";
  const robot = pageState.robots.find((item) => robotSlug(item) === wanted) || pageState.robots[0];
  if (!robot) return;
  const related = pageState.robots
    .filter((item) => item.name !== robot.name && (item.category === robot.category || item.country === robot.country || item.company === robot.company))
    .slice(0, 4);

  document.title = `${robot.name} Profile | robologai`;
  root.innerHTML = `
    <section class="profile-hero">
      <div>
        <p>${pageEscape(robot.category)} · ${pageEscape(robot.company)}</p>
        <h1>${pageEscape(robot.name)}</h1>
        <span>${pageEscape(robot.useCase)}</span>
        <div class="catalog-metrics">
          <article><strong>${pageEscape(robot.status)}</strong><small>Status</small></article>
          <article><strong>${pageEscape(robot.availability)}</strong><small>Availability</small></article>
          <article><strong>${pageEscape(robot.priceVisibility || "1")}/5</strong><small>Price clarity</small></article>
        </div>
      </div>
      <figure class="profile-visual ${robot.image ? "" : "catalog-visual-empty"}">
        ${robot.image ? `<img src="${pageEscape(robot.image)}" alt="${pageEscape(robot.name)} robot" loading="lazy">` : `<span>${pageEscape(pageInitials(robot.name))}</span>`}
      </figure>
    </section>
    <section class="profile-detail-grid">
      <article class="profile-facts">
        <h2>Robot facts</h2>
        <dl>
          <div><dt>Company</dt><dd>${pageEscape(robot.company)}</dd></div>
          <div><dt>Country</dt><dd>${pageEscape(robot.country)}</dd></div>
          <div><dt>Price</dt><dd>${pageEscape(robot.price)}</dd></div>
          <div><dt>Height</dt><dd>${pageEscape(robot.height || "Not disclosed")}</dd></div>
          <div><dt>Runtime</dt><dd>${pageEscape(robot.runtime || "Not disclosed")}</dd></div>
          <div><dt>Source</dt><dd><a href="${pageEscape(robot.source)}" target="_blank" rel="noopener noreferrer">Official source →</a></dd></div>
        </dl>
      </article>
      <article class="profile-facts">
        <h2>Robologai signal</h2>
        <div class="robot-score-row">
          <span>Maturity ${pageMeter(robot.maturity)}</span>
          <span>Price clarity ${pageMeter(robot.priceVisibility)}</span>
        </div>
        <p>${pageEscape(robot.imageCredit || "Profile based on linked official source and Robologai data fields.")}</p>
      </article>
    </section>
    <section class="catalog-section">
      <div class="section-heading compact">
        <p>Related Robots</p>
        <h2>Similar robots to compare next.</h2>
      </div>
      <div class="signal-grid">
        ${related.map((item) => `<article class="signal-card"><strong>${pageEscape(item.name)}</strong><span>${pageEscape(item.company)}</span><small>${pageEscape(item.useCase)}</small><a href="robot.html?robot=${pageEscape(robotSlug(item))}">Open profile →</a></article>`).join("")}
      </div>
    </section>
  `;
}

function renderCompanyProfile() {
  const root = document.querySelector("[data-company-profile]");
  if (!root) return;
  const params = new URLSearchParams(window.location.search);
  const wanted = params.get("company") || "unitree-robotics";
  const company = pageState.companies.find((item) => companySlug(item) === wanted) || pageState.companies[0];
  if (!company) return;
  const companyRobotNames = pageNormalize(company.robot || "");
  const robots = pageState.robots
    .filter((robot) => pageNormalize(robot.company).includes(pageNormalize(company.name)) || companyRobotNames.includes(pageNormalize(robot.name)))
    .slice(0, 6);
  const related = pageState.companies
    .filter((item) => item.name !== company.name && (broadCountryName(item.country) === broadCountryName(company.country) || pageNormalize(item.category).includes(pageNormalize(company.category).split(" ")[0])))
    .slice(0, 6);

  document.title = `${company.name} Profile | robologai`;
  root.innerHTML = `
    <section class="profile-hero company-profile-hero">
      <div>
        <p>${pageEscape(company.type || "Company")} · ${pageEscape(broadCountryName(company.country))}</p>
        <h1>${pageEscape(company.name)}</h1>
        <span>${pageEscape(company.category)}</span>
        <div class="catalog-metrics">
          <article><strong>${pageEscape(company.robot || "Robotics / AI")}</strong><small>Robot / asset</small></article>
          <article><strong>${pageEscape(company.ticker || company.type || "Private")}</strong><small>Market signal</small></article>
          <article><strong>${pageEscape(broadCountryName(company.country))}</strong><small>Country tracker</small></article>
        </div>
      </div>
      <div class="company-profile-mark">${pageEscape(pageInitials(company.name))}</div>
    </section>
    <section class="profile-detail-grid">
      <article class="profile-facts">
        <h2>Company facts</h2>
        <dl>
          <div><dt>Category</dt><dd>${pageEscape(company.category)}</dd></div>
          <div><dt>Country</dt><dd><a href="country.html?country=${pageEscape(countrySlug(company.country))}">${pageEscape(company.country)} →</a></dd></div>
          <div><dt>Type</dt><dd>${pageEscape(company.type || "Entity")}</dd></div>
          <div><dt>Ticker</dt><dd>${pageEscape(company.ticker || "Not public / not listed")}</dd></div>
          <div><dt>Website</dt><dd><a href="${pageEscape(company.website || "#")}" target="_blank" rel="noopener noreferrer">Official website →</a></dd></div>
        </dl>
      </article>
      <article class="profile-facts">
        <h2>Robologai signal</h2>
        <p>${pageEscape(company.name)} is tracked as part of Robologai's robotics and AI company database. Use this profile as a source-first launch point, then verify fast-changing details from the official website.</p>
      </article>
    </section>
    <section class="catalog-section">
      <div class="section-heading compact">
        <p>Linked Robots</p>
        <h2>Robots and assets associated with ${pageEscape(company.name)}.</h2>
      </div>
      <div class="signal-grid">
        ${(robots.length ? robots : [{ name: company.robot || "Robotics / AI activity", company: company.name, useCase: company.category, source: company.website }]).map((robot) => `<article class="signal-card"><strong>${pageEscape(robot.name)}</strong><span>${pageEscape(robot.company)}</span><small>${pageEscape(robot.useCase || company.category)}</small>${robotSlug(robot) ? `<a href="robot.html?robot=${pageEscape(robotSlug(robot))}">Robot profile →</a>` : ""}</article>`).join("")}
      </div>
    </section>
    <section class="catalog-section">
      <div class="section-heading compact">
        <p>Related Companies</p>
        <h2>Companies to compare next.</h2>
      </div>
      <div class="signal-grid">
        ${related.map((item) => `<article class="signal-card"><strong>${pageEscape(item.name)}</strong><span>${pageEscape(item.country)}</span><small>${pageEscape(item.category)}</small><a href="company.html?company=${pageEscape(companySlug(item))}">Open profile →</a></article>`).join("")}
      </div>
    </section>
  `;
}

function renderCountryTracker() {
  const root = document.querySelector("[data-country-tracker]");
  if (!root) return;
  const params = new URLSearchParams(window.location.search);
  const wanted = params.get("country") || "china";
  const companies = pageState.companies.filter((company) => countrySlug(company.country) === wanted || pageNormalize(company.country).includes(pageNormalize(wanted)));
  const country = broadCountryName(companies[0]?.country || wanted);
  const robots = pageState.robots.filter((robot) => broadCountryName(robot.country) === country || countrySlug(robot.country) === wanted);
  const privateCount = companies.filter((company) => pageNormalize(company.type).includes("private")).length;
  const publicCount = companies.filter((company) => pageNormalize(company.type).includes("public")).length;

  document.title = `${country} Robotics Tracker | robologai`;
  root.innerHTML = `
    <section class="catalog-hero">
      <p>Country Tracker</p>
      <h1>${pageEscape(country)} robotics and AI ecosystem.</h1>
      <span>Companies, robot platforms, market signals, and official source links grouped by country.</span>
      <div class="catalog-metrics">
        <article><strong>${companies.length}</strong><small>Companies</small></article>
        <article><strong>${robots.length}</strong><small>Robot profiles</small></article>
        <article><strong>${privateCount} / ${publicCount}</strong><small>Private / public</small></article>
      </div>
    </section>
    <section class="market-page-layout">
      <article>
        <div class="section-heading compact"><p>Companies</p><h2>Tracked entities in ${pageEscape(country)}.</h2></div>
        <div class="signal-grid">
          ${companies.map((company) => `<article class="signal-card"><strong>${pageEscape(company.name)}</strong><span>${pageEscape(company.type || "Entity")}</span><small>${pageEscape(company.category)}</small><a href="company.html?company=${pageEscape(companySlug(company))}">Open profile →</a></article>`).join("")}
        </div>
      </article>
      <article>
        <div class="section-heading compact"><p>Robots</p><h2>Robot platforms connected to ${pageEscape(country)}.</h2></div>
        <div class="signal-grid">
          ${robots.map((robot) => `<article class="signal-card"><strong>${pageEscape(robot.name)}</strong><span>${pageEscape(robot.company)}</span><small>${pageEscape(robot.useCase)}</small><a href="robot.html?robot=${pageEscape(robotSlug(robot))}">Robot profile →</a></article>`).join("")}
        </div>
      </article>
    </section>
  `;
}

function renderComparePage() {
  const body = document.querySelector("[data-full-compare]");
  if (!body) return;
  const selected = [...document.querySelectorAll("[data-compare-select] input:checked")].map((input) => input.value);
  const priority = selected.length ? selected : ["Optimus", "Figure 02", "Apollo", "Digit", "G1", "PM01", "Booster T1", "AgiBot A2", "LimX Oli", "PUDU D9", "Memo", "Sprout"];
  const robots = priority.map((name) => pageState.robots.find((robot) => robot.name === name)).filter(Boolean);
  body.innerHTML = robots.map((robot) => `
    <tr>
      <td><strong>${pageEscape(robot.name)}</strong><small>${pageEscape(robot.company)}</small></td>
      <td>${pageEscape(robot.category)}</td>
      <td>${pageEscape(robot.country)}</td>
      <td>${pageEscape(robot.availability)}</td>
      <td>${pageEscape(robot.price)}</td>
      <td>${pageEscape(robot.useCase)}</td>
      <td>${pageMeter(robot.maturity)}</td>
      <td><a href="robot.html?robot=${pageEscape(robotSlug(robot))}">Profile →</a></td>
    </tr>
  `).join("");
}

function renderComparePicker() {
  const picker = document.querySelector("[data-compare-select]");
  if (!picker) return;
  const defaults = new Set(["Optimus", "Figure 02", "Apollo", "Digit"]);
  picker.innerHTML = pageState.robots.slice(0, 16).map((robot) => `
    <label>
      <input type="checkbox" value="${pageEscape(robot.name)}" ${defaults.has(robot.name) ? "checked" : ""}>
      <span>${pageEscape(robot.name)}</span>
    </label>
  `).join("");
  picker.querySelectorAll("input").forEach((input) => input.addEventListener("change", renderComparePage));
}

function wireCatalogControls() {
  document.querySelectorAll("[data-catalog-search]").forEach((input) => {
    input.addEventListener("input", () => {
      pageState.query = input.value;
      renderRobotCards();
      renderCompanyCards();
    });
  });

  document.querySelectorAll("[data-robot-page-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      pageState.robotFilter = button.dataset.robotPageFilter || "all";
      document.querySelectorAll("[data-robot-page-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
      renderRobotCards();
    });
  });

  document.querySelectorAll("[data-company-page-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      pageState.companyFilter = button.dataset.companyPageFilter || "all";
      document.querySelectorAll("[data-company-page-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
      renderCompanyCards();
    });
  });
}

async function loadJson(path, fallback) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) throw new Error(path);
    return await response.json();
  } catch (error) {
    return fallback;
  }
}

async function initCatalogPages() {
  const params = new URLSearchParams(window.location.search);
  const initialFilter = params.get("filter");
  if (initialFilter) {
    pageState.robotFilter = initialFilter;
    pageState.companyFilter = initialFilter;
    document.querySelectorAll("[data-robot-page-filter]").forEach((item) => item.classList.toggle("is-active", item.dataset.robotPageFilter === initialFilter));
    document.querySelectorAll("[data-company-page-filter]").forEach((item) => item.classList.toggle("is-active", item.dataset.companyPageFilter === initialFilter));
  }
  const [robots, companies] = await Promise.all([
    loadJson("data/robots.json", robotFallback),
    loadJson("data/companies.json", companyFallback)
  ]);
  pageState.robots = robots;
  pageState.companies = companies;
  setCount("robots", robots.length);
  setCount("companies", companies.length);
  setCount("countries", new Set(companies.map((company) => company.country).filter(Boolean)).size);
  renderRobotCards();
  renderCompanyCards();
  renderMarketPage();
  renderPricesPage();
  renderVideosPage();
  renderRobotProfile();
  renderCompanyProfile();
  renderCountryTracker();
  renderComparePicker();
  renderComparePage();
  wireCatalogControls();
}

initCatalogPages();
