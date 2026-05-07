const pageState = {
  robots: [],
  companies: [],
  robotFilter: "all",
  companyFilter: "all",
  query: "",
  robotUseCaseFilter: "all",
  robotCountryFilter: "all",
  robotScoreFilter: "all",
  robotVideoOnly: false,
  robotPricedOnly: false
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

const robotVideoLibrary = {
  optimus: {
    title: "Tesla Optimus official demo",
    provider: "YouTube / Tesla",
    embed: "https://www.youtube-nocookie.com/embed/cpraXaw7dyc",
    source: "https://www.tesla.com/AI",
    note: "Official Tesla Optimus demo source."
  },
  "figure-02": {
    title: "Figure 02 official robot demo",
    provider: "YouTube / Figure AI",
    embed: "https://www.youtube-nocookie.com/embed/0SRVJaOg9Co",
    source: "https://www.figure.ai/",
    note: "Figure 02 official demo video for enterprise humanoid work."
  },
  apollo: {
    title: "Apptronik Apollo humanoid robot",
    provider: "YouTube / Apptronik",
    embed: "https://www.youtube-nocookie.com/embed/uJOA5IDaL5g",
    source: "https://apptronik.com/news-collection/apptronik-unveils-apollo",
    note: "Apollo launch/demo source for warehouse and manufacturing work."
  },
  digit: {
    title: "Agility Digit official demo",
    provider: "YouTube / Agility Robotics",
    embed: "https://www.youtube-nocookie.com/embed/rnFZAB9ogEE",
    source: "https://www.agilityrobotics.com/videos/what-can-digit-do-amr-loading-and-unloading",
    note: "Digit demo source for logistics, AMR loading, and warehouse movement."
  },
  atlas: {
    title: "Boston Dynamics electric Atlas",
    provider: "YouTube / Boston Dynamics",
    embed: "https://www.youtube-nocookie.com/embed/29ECwExc-_M",
    source: "https://bostondynamics.com/atlas/",
    note: "Official Boston Dynamics Atlas launch/demo source."
  },
  spot: {
    title: "Boston Dynamics Spot overview",
    provider: "YouTube / Boston Dynamics",
    embed: "https://www.youtube-nocookie.com/embed/wlkCQXHEgjA",
    source: "https://bostondynamics.com/products/spot/",
    note: "Official Boston Dynamics Spot video source."
  },
  g1: {
    title: "Unitree G1 humanoid agent",
    provider: "YouTube / Unitree Robotics",
    embed: "https://www.youtube-nocookie.com/embed/GzX1qOIO1bE",
    source: "https://www.unitree.com/g1/",
    note: "Official Unitree G1 introduction with price and research positioning."
  },
  h1: {
    title: "Unitree H1 humanoid robot",
    provider: "YouTube / Unitree Robotics",
    embed: "https://www.youtube-nocookie.com/embed/GtPs_ygfaEA",
    source: "https://www.unitree.com/h1/",
    note: "Official Unitree H1 introduction for full-size humanoid mobility."
  },
  neo: {
    title: "1X NEO Gamma home humanoid",
    provider: "YouTube / 1X Technologies",
    embed: "https://www.youtube-nocookie.com/embed/8FNwHSSaK5A",
    source: "https://www.1x.tech/",
    note: "NEO Gamma source video showing domestic humanoid use cases."
  },
  phoenix: {
    title: "Sanctuary AI Phoenix humanoid",
    provider: "YouTube / Sanctuary AI",
    embed: "https://www.youtube-nocookie.com/embed/k2GhgO7SnZQ",
    source: "https://www.sanctuary.ai/blog/sanctuary-ai-unveils-phoenix-a-humanoid-general-purpose-robot-designed-for-work",
    note: "Phoenix launch source for general-purpose industrial humanoid work."
  },
  ameca: {
    title: "Engineered Arts Ameca demo",
    provider: "YouTube / Engineered Arts",
    embed: "https://www.youtube-nocookie.com/embed/IPukuYb9xWw",
    source: "https://www.engineeredarts.co.uk/robot/ameca/",
    note: "Ameca source video for human-robot interaction and expressive robotics."
  },
  "walker-s": {
    title: "UBTECH Walker S humanoid robot",
    provider: "YouTube / UBTECH Robotics",
    embed: "https://www.youtube-nocookie.com/embed/Iryqtfym7oo",
    source: "https://www.ubtrobot.com/en/humanoid/products/walker-s",
    note: "Walker S source video and product page for industrial humanoid work."
  }
};

const useCaseLibrary = [
  {
    slug: "manufacturing",
    title: "Manufacturing",
    summary: "Factory automation, assembly support, material movement, and industrial task learning.",
    terms: ["manufacturing", "factory", "industrial", "assembly", "workplace", "automation"],
    buyerQuestion: "Can this robot work around production lines, tools, parts, and repetitive industrial tasks?"
  },
  {
    slug: "warehouse",
    title: "Warehouse & Logistics",
    summary: "Tote handling, inspection, inventory movement, loading support, and logistics operations.",
    terms: ["warehouse", "logistics", "tote", "inventory", "material", "movement"],
    buyerQuestion: "Is this robot close to useful deployment in warehouses or distribution centers?"
  },
  {
    slug: "research",
    title: "Research & Education",
    summary: "Developer platforms for embodied AI, locomotion, manipulation, and robotics labs.",
    terms: ["research", "education", "developer", "prototyping", "robocup", "embodied"],
    buyerQuestion: "Is this robot accessible enough for labs, universities, and developer teams?"
  },
  {
    slug: "home",
    title: "Home & Companion",
    summary: "Domestic assistance, companionship, household tasks, and human-space robotics.",
    terms: ["home", "household", "companion", "assistance", "dishes", "laundry"],
    buyerQuestion: "Is this robot being shaped for homes and human daily routines?"
  },
  {
    slug: "healthcare",
    title: "Healthcare & Care",
    summary: "Care assistance, social interaction, rehabilitation support, and human-robot interaction.",
    terms: ["healthcare", "care", "elderly", "rehabilitation", "social", "interaction"],
    buyerQuestion: "Does this robot match care, support, or human-facing service environments?"
  },
  {
    slug: "inspection",
    title: "Inspection & Safety",
    summary: "Industrial inspection, mapping, safety checks, and field operations.",
    terms: ["inspection", "mapping", "safety", "field", "quadruped", "rescue"],
    buyerQuestion: "Can this robot gather reliable physical-world data in hard or risky environments?"
  },
  {
    slug: "hospitality",
    title: "Hospitality & Retail",
    summary: "Front-of-house service, events, retail interaction, and public demonstrations.",
    terms: ["hospitality", "retail", "events", "demo", "service", "human-robot"],
    buyerQuestion: "Can this robot create a useful customer-facing or demonstration experience?"
  }
];

const signalLibrary = [
  {
    type: "Video",
    title: "Robot Theater expanded to catalog cards",
    summary: "Verified robot demos now play inside Robologai's catalog flow, so readers can watch without leaving the site.",
    link: "videos.html"
  },
  {
    type: "Market",
    title: "Humanoid builders split into factory, warehouse, research, and home lanes",
    summary: "The strongest comparison is no longer robot shape alone; buyer intent and deployment path matter more.",
    link: "market.html"
  },
  {
    type: "Buyer Guide",
    title: "Price visibility is the fastest reality check",
    summary: "Public price, quote-only access, and pilot-only availability are tracked separately across the catalog.",
    link: "prices.html"
  },
  {
    type: "Research",
    title: "China's robot platforms are becoming a distinct comparison lane",
    summary: "Unitree, LimX, PUDU, AgiBot, and Booster now sit together as a practical research and accessibility cluster.",
    link: "country.html?country=china"
  }
];

const buyerGuideLibrary = [
  {
    title: "Factory Readiness",
    summary: "Prioritize repeatable demos, safety posture, enterprise pilots, runtime, and official deployment language.",
    terms: ["manufacturing", "factory", "industrial", "workplace", "automation"]
  },
  {
    title: "Warehouse Fit",
    summary: "Look for tote handling, AMR integration, payload clarity, fleet operations, and real deployment references.",
    terms: ["warehouse", "logistics", "tote", "material", "movement"]
  },
  {
    title: "Research Value",
    summary: "Developer access, public price signals, SDK depth, simulation support, and repairability matter more than spectacle.",
    terms: ["research", "education", "developer", "prototyping"]
  },
  {
    title: "Home Reality Check",
    summary: "Separate domestic demos from purchasable products; household robots need safety, support, and clear autonomy limits.",
    terms: ["home", "household", "companion", "domestic"]
  }
];

function robotScore(robot) {
  const maturity = Math.max(0, Math.min(5, Number(robot.maturity) || 1));
  const price = Math.max(0, Math.min(5, Number(robot.priceVisibility) || 1));
  const status = pageNormalize(`${robot.status} ${robot.availability}`);
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

function robotUseCases(robot) {
  const text = robotText(robot);
  return useCaseLibrary.filter((item) => item.terms.some((term) => text.includes(pageNormalize(term))));
}

function robotStage(robot) {
  const maturity = Number(robot.maturity) || 1;
  if (maturity >= 5) return "Deployment";
  if (maturity >= 4) return "Pilot";
  if (maturity >= 3) return "Development";
  return "Early signal";
}

function marketStrength(company) {
  const type = pageNormalize(company.type);
  const category = pageNormalize(company.category);
  if (type.includes("public")) return "Public market exposure";
  if (category.includes("humanoid") || category.includes("robot")) return "Private robotics builder";
  if (category.includes("ai")) return "AI infrastructure signal";
  return "Ecosystem signal";
}

function renderSignalFeed(targetSelector, limit = 4) {
  const target = document.querySelector(targetSelector);
  if (!target) return;
  target.innerHTML = signalLibrary.slice(0, limit).map((item) => `
    <a class="signal-update-card" href="${pageEscape(item.link)}">
      <span>${pageEscape(item.type)}</span>
      <strong>${pageEscape(item.title)}</strong>
      <small>${pageEscape(item.summary)}</small>
    </a>
  `).join("");
}

function useCaseSlug(value = "") {
  return pageNormalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function robotCapabilityRows(robot) {
  const maturity = Number(robot.maturity) || 1;
  const price = Number(robot.priceVisibility) || 1;
  return [
    ["Commercial readiness", maturity],
    ["Price transparency", price],
    ["Media proof", robot.image ? 5 : 2],
    ["Official source strength", robot.source ? 5 : 2]
  ];
}

function robotQuality(robot) {
  const priceVisibility = Number(robot.priceVisibility || 0);
  const score = robotScore(robot);
  return {
    sourceConfidence: robot.source ? "Official source linked" : "Source needed",
    priceConfidence: priceVisibility >= 4 ? "Public price" : priceVisibility >= 2 ? "Partial / quote signal" : "No public price",
    mediaVerified: robotVideo(robot) ? "Playable official demo" : robot.image ? "Official / source visual" : "Media pending",
    dataFreshness: score >= 68 ? "High-priority watch" : "Periodic review"
  };
}

function robotAlternatives(robot, limit = 4) {
  const useCases = new Set(robotUseCases(robot).map((item) => item.slug));
  return pageState.robots
    .filter((item) => item.name !== robot.name)
    .map((item) => {
      const itemUseCases = robotUseCases(item);
      const useCaseOverlap = itemUseCases.filter((useCase) => useCases.has(useCase.slug)).length;
      const categoryMatch = pageNormalize(item.category) === pageNormalize(robot.category) ? 2 : 0;
      const countryMatch = broadCountryName(item.country) === broadCountryName(robot.country) ? 1 : 0;
      return { robot: item, rank: useCaseOverlap * 3 + categoryMatch + countryMatch + (robotVideo(item) ? 0.5 : 0) };
    })
    .filter((item) => item.rank > 0)
    .sort((a, b) => b.rank - a.rank || robotScore(b.robot) - robotScore(a.robot))
    .slice(0, limit)
    .map((item) => item.robot);
}

function robotVideo(robot) {
  return robotVideoLibrary[robotSlug(robot)] || null;
}

function renderVideoPlayer(robot) {
  const player = document.querySelector("[data-video-player]");
  if (!player || !robot) return;
  const video = robotVideo(robot);
  const frame = player.querySelector(".video-player-frame");
  const info = player.querySelector(".video-player-info");
  if (!frame || !info) return;

  if (video?.embed) {
    frame.innerHTML = `
      <iframe
        src="${pageEscape(video.embed)}"
        title="${pageEscape(video.title)}"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen></iframe>
    `;
  } else {
    frame.innerHTML = `
      <div class="video-fallback-panel">
        ${robot.image ? `<img src="${pageEscape(robot.image)}" alt="${pageEscape(robot.name)} demo visual">` : `<strong>${pageEscape(pageInitials(robot.name))}</strong>`}
        <span>Embedded video pending</span>
      </div>
    `;
  }

  info.innerHTML = `
    <span>${pageEscape(video?.provider || "Official source")}</span>
    <h2>${pageEscape(video?.title || `${robot.name} demo source`)}</h2>
    <p>${pageEscape(video?.note || "This robot does not yet have a verified embeddable official video in Robologai. Use the official source link while we add safe embeds.")}</p>
    <div class="video-player-actions">
      <a href="robot.html?robot=${pageEscape(robotSlug(robot))}">Robot profile</a>
      <a href="${pageEscape(video?.source || robot.source || "#")}" target="_blank" rel="noopener noreferrer">Official source</a>
    </div>
  `;

  document.querySelectorAll("[data-video-robot]").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.videoRobot === robotSlug(robot));
  });
}

function setCount(name, value) {
  document.querySelectorAll(`[data-count="${name}"]`).forEach((node) => {
    node.textContent = value;
  });
}

function renderRobotCards() {
  const grid = document.querySelector("[data-robots-grid]");
  if (!grid) return;
  renderAdvancedRobotFilters();
  const terms = pageNormalize(pageState.query).split(/\s+/).filter(Boolean);
  const filter = pageNormalize(pageState.robotFilter);
  const robots = pageState.robots.filter((robot) => {
    const text = robotText(robot);
    const matchesQuery = !terms.length || terms.every((term) => text.includes(term));
    const matchesFilter = filter === "all" || text.includes(filter);
    const matchesUseCase = pageState.robotUseCaseFilter === "all" || robotUseCases(robot).some((item) => item.slug === pageState.robotUseCaseFilter);
    const matchesCountry = pageState.robotCountryFilter === "all" || countrySlug(robot.country) === pageState.robotCountryFilter;
    const matchesScore = pageState.robotScoreFilter === "all" || (
      pageState.robotScoreFilter === "leader" ? robotScore(robot) >= 68 :
      pageState.robotScoreFilter === "watchlist" ? robotScore(robot) >= 52 && robotScore(robot) < 68 :
      robotScore(robot) < 52
    );
    const matchesVideo = !pageState.robotVideoOnly || Boolean(robotVideo(robot));
    const matchesPrice = !pageState.robotPricedOnly || Number(robot.priceVisibility || 0) >= 2;
    return matchesQuery && matchesFilter && matchesUseCase && matchesCountry && matchesScore && matchesVideo && matchesPrice;
  });

  grid.innerHTML = robots.map((robot) => {
    const video = robotVideo(robot);
    const quality = robotQuality(robot);
    return `
    <article class="catalog-card robot-catalog-card">
      <figure class="catalog-visual ${robot.image ? "" : "catalog-visual-empty"}">
        ${robot.image ? `<img src="${pageEscape(robot.image)}" alt="${pageEscape(robot.name)} robot" loading="lazy">` : `<span>${pageEscape(pageInitials(robot.name))}</span>`}
        <figcaption>${robotScore(robot)} <small>R-Score</small></figcaption>
      </figure>
      <div class="catalog-card-body">
        <div class="database-tags">
          <span>${pageEscape(robot.category || "Robot")}</span>
          <span>${pageEscape(robot.country || "Global")}</span>
          <span>${pageEscape(scoreLabel(robotScore(robot)))}</span>
        </div>
        <h2>${pageEscape(robot.name)}</h2>
        <p>${pageEscape(robot.useCase || "Robotics platform")}</p>
        <div class="use-case-chip-row">
          ${robotUseCases(robot).slice(0, 3).map((item) => `<a href="use-cases.html?case=${pageEscape(item.slug)}">${pageEscape(item.title)}</a>`).join("")}
        </div>
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
        <div class="quality-chip-row">
          <span>${pageEscape(quality.sourceConfidence)}</span>
          <span>${pageEscape(quality.priceConfidence)}</span>
          <span>${pageEscape(quality.mediaVerified)}</span>
        </div>
        ${video?.embed ? `
          <div class="robot-card-video">
            <button type="button" data-card-video="${pageEscape(robotSlug(robot))}">
              <span>▶</span>
              Play official demo
            </button>
            <div class="robot-card-video-frame" data-card-video-frame="${pageEscape(robotSlug(robot))}" hidden></div>
          </div>
        ` : ""}
        <div class="catalog-actions">
          <a href="robot.html?robot=${pageEscape(robotSlug(robot))}">Open profile →</a>
          <a href="${pageEscape(robot.source || "#")}" target="_blank" rel="noopener noreferrer">Official source →</a>
        </div>
      </div>
    </article>
  `;
  }).join("");
  document.querySelectorAll("[data-card-video]").forEach((button) => {
    button.addEventListener("click", () => {
      const slug = button.dataset.cardVideo;
      const robot = pageState.robots.find((item) => robotSlug(item) === slug);
      const video = robotVideo(robot);
      const frame = document.querySelector(`[data-card-video-frame="${slug}"]`);
      if (!frame || !video?.embed) return;
      const isOpen = !frame.hidden;
      document.querySelectorAll("[data-card-video-frame]").forEach((node) => {
        node.hidden = true;
        node.innerHTML = "";
      });
      document.querySelectorAll("[data-card-video]").forEach((node) => {
        node.classList.remove("is-playing");
      });
      if (isOpen) return;
      frame.hidden = false;
      button.classList.add("is-playing");
      frame.innerHTML = `
        <iframe
          src="${pageEscape(video.embed)}"
          title="${pageEscape(video.title)}"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
      `;
    });
  });
  setCount("visible-robots", robots.length);
}

function renderAdvancedRobotFilters() {
  const useCaseSelect = document.querySelector("[data-robot-usecase-filter]");
  const countrySelect = document.querySelector("[data-robot-country-filter]");
  if (useCaseSelect && !useCaseSelect.dataset.ready) {
    useCaseSelect.innerHTML = `<option value="all">All use cases</option>${useCaseLibrary.map((item) => `<option value="${pageEscape(item.slug)}">${pageEscape(item.title)}</option>`).join("")}`;
    useCaseSelect.value = pageState.robotUseCaseFilter;
    useCaseSelect.dataset.ready = "true";
  }
  if (countrySelect && !countrySelect.dataset.ready) {
    const countries = [...new Map(pageState.robots.map((robot) => [countrySlug(robot.country), broadCountryName(robot.country)])).entries()]
      .filter(([slug]) => slug)
      .sort((a, b) => a[1].localeCompare(b[1]));
    countrySelect.innerHTML = `<option value="all">All countries</option>${countries.map(([slug, label]) => `<option value="${pageEscape(slug)}">${pageEscape(label)}</option>`).join("")}`;
    countrySelect.value = pageState.robotCountryFilter;
    countrySelect.dataset.ready = "true";
  }
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
  renderSignalFeed("[data-market-signals]");
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

function renderHomeIntelligence() {
  const grid = document.querySelector("[data-home-intelligence]");
  if (grid) {
    const playable = pageState.robots.filter((robot) => robotVideo(robot)).length;
    const countries = new Set(pageState.robots.map((robot) => broadCountryName(robot.country)).filter(Boolean)).size;
    grid.innerHTML = `
      <article><strong>${pageState.robots.length}</strong><span>Robot profiles</span><small>${playable} with playable demos</small></article>
      <article><strong>${pageState.companies.length}</strong><span>Companies indexed</span><small>Public proxies and private builders</small></article>
      <article><strong>${countries}</strong><span>Countries tracked</span><small>Country pages group robot ecosystems</small></article>
      <article><strong>${useCaseLibrary.length}</strong><span>Use-case tracks</span><small>Buyer-oriented navigation</small></article>
    `;
  }
  renderSignalFeed("[data-home-signals]");
}

function renderVideosPage() {
  const grid = document.querySelector("[data-videos-grid]");
  if (!grid) return;
  const robots = pageState.robots.filter((robot) => robot.image).slice(0, 18);
  grid.innerHTML = robots.map((robot) => `
    <article class="video-card video-gallery-card ${robotVideo(robot) ? "has-embed" : ""}" data-video-robot="${pageEscape(robotSlug(robot))}" ${robotVideo(robot) ? `data-play-video="${pageEscape(robotSlug(robot))}" role="button" tabindex="0"` : ""}>
      <div class="video-thumb">
        <img src="${pageEscape(robot.image)}" alt="${pageEscape(robot.name)} demo visual" loading="lazy">
        <span>▶</span>
        <em>${robotVideo(robot) ? "Plays here" : pageEscape(robot.category || "Source link")}</em>
      </div>
      <div>
        <small>${pageEscape(robot.company)}</small>
        <h3>${pageEscape(robot.name)} ${robotVideo(robot) ? "embedded official demo" : "official product page"}</h3>
        <div class="video-card-actions">
          ${robotVideo(robot) ? `<button type="button" data-play-video="${pageEscape(robotSlug(robot))}">Play in theater</button>` : ""}
          <a href="${pageEscape(robot.source)}" target="_blank" rel="noopener noreferrer" data-source-link>Official source</a>
        </div>
      </div>
    </article>
  `).join("");
  const theater = document.querySelector("[data-video-theater]");
  if (theater) {
    const featured = pageState.robots.filter((robot) => robot.image && robotVideo(robot)).slice(0, 5);
    theater.innerHTML = featured.map((robot, index) => `
      <button class="theater-card ${index === 0 ? "is-featured is-active" : ""}" type="button" data-play-video="${pageEscape(robotSlug(robot))}" data-video-robot="${pageEscape(robotSlug(robot))}">
        <img src="${pageEscape(robot.image)}" alt="${pageEscape(robot.name)} official demo visual" loading="${index === 0 ? "eager" : "lazy"}">
        <span>${pageEscape(robot.company)}</span>
        <strong>${pageEscape(robot.name)}</strong>
        <small>${pageEscape(robot.useCase)}</small>
      </button>
    `).join("");
    if (featured[0]) renderVideoPlayer(featured[0]);
  }
  document.querySelectorAll("[data-play-video]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      if (event.target.closest("[data-source-link]")) return;
      const robot = pageState.robots.find((item) => robotSlug(item) === trigger.dataset.playVideo);
      renderVideoPlayer(robot);
      document.querySelector("[data-video-player]")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    trigger.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      const robot = pageState.robots.find((item) => robotSlug(item) === trigger.dataset.playVideo);
      renderVideoPlayer(robot);
      document.querySelector("[data-video-player]")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
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
  const useCases = robotUseCases(robot);
  const score = robotScore(robot);
  const video = robotVideo(robot);
  const quality = robotQuality(robot);
  const alternatives = robotAlternatives(robot);
  const compareSlugs = [robot, ...alternatives.slice(0, 3)].map((item) => robotSlug(item)).join(",");

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
          <article><strong>${score}</strong><small>Robologai Score</small></article>
        </div>
        <div class="profile-action-row">
          <a href="compare.html">Compare robots</a>
          <a href="compare.html?robots=${pageEscape(compareSlugs)}">Compare alternatives</a>
          <a href="prices.html">Price tracker</a>
          ${video?.embed ? `<a href="#profile-video">Watch demo</a>` : ""}
          <a href="${pageEscape(robot.source || "#")}" target="_blank" rel="noopener noreferrer">Official source</a>
        </div>
      </div>
      <figure class="profile-visual ${robot.image ? "" : "catalog-visual-empty"}">
        ${robot.image ? `<img src="${pageEscape(robot.image)}" alt="${pageEscape(robot.name)} robot" loading="lazy">` : `<span>${pageEscape(pageInitials(robot.name))}</span>`}
        <figcaption>${score} <small>${pageEscape(scoreLabel(score))}</small></figcaption>
      </figure>
    </section>
    <section class="profile-intel-strip" aria-label="Robot intelligence summary">
      <article><span>Use case</span><strong>${pageEscape(useCases[0]?.title || robot.category || "Robot platform")}</strong></article>
      <article><span>Country</span><strong>${pageEscape(robot.country || "Global")}</strong></article>
      <article><span>Price</span><strong>${pageEscape(robot.price)}</strong></article>
      <article><span>Stage</span><strong>${pageEscape(robotStage(robot))}</strong></article>
    </section>
    <section class="catalog-section">
      <div class="section-heading compact">
        <p>Data Quality</p>
        <h2>How confident Robologai is about this profile.</h2>
      </div>
      <div class="data-quality-grid">
        <article><span>Source</span><strong>${pageEscape(quality.sourceConfidence)}</strong><small>${pageEscape(robot.source || "Official source missing")}</small></article>
        <article><span>Price</span><strong>${pageEscape(quality.priceConfidence)}</strong><small>${pageEscape(robot.price)}</small></article>
        <article><span>Media</span><strong>${pageEscape(quality.mediaVerified)}</strong><small>${video?.embed ? "Embedded demo available" : "Source image / page used"}</small></article>
        <article><span>Review</span><strong>${pageEscape(quality.dataFreshness)}</strong><small>Fast-changing claims should be checked against official pages.</small></article>
      </div>
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
        <strong class="score-big">${score}<small>/100</small></strong>
        <span class="score-label">${pageEscape(scoreLabel(score))}</span>
        <div class="capability-list">
          ${robotCapabilityRows(robot).map(([label, value]) => `<div><span>${pageEscape(label)}</span>${pageMeter(value)}</div>`).join("")}
        </div>
        <p>${pageEscape(robot.imageCredit || "Profile based on linked official source and Robologai data fields.")}</p>
      </article>
    </section>
    <section class="catalog-section">
      <div class="section-heading compact">
        <p>Profile Stack</p>
        <h2>Specs, media, timeline, and buyer notes in one robot profile.</h2>
      </div>
      <div class="profile-stack-grid">
        <article>
          <span>Specs</span>
          <strong>${pageEscape(robot.height || "Not disclosed")} · ${pageEscape(robot.runtime || "Runtime undisclosed")}</strong>
          <small>${pageEscape(robot.price)} · ${pageEscape(robot.availability)}</small>
        </article>
        <article>
          <span>Timeline</span>
          <strong>${pageEscape(robotStage(robot))}</strong>
          <small>Status is based on current Robologai fields and official source language.</small>
        </article>
        <article>
          <span>Buyer note</span>
          <strong>${pageEscape(scoreLabel(score))}</strong>
          <small>${pageEscape(robot.priceVisibility >= 3 ? "Commercial visibility is easier to evaluate." : "Pricing and access still need direct verification.")}</small>
        </article>
      </div>
    </section>
    <section class="catalog-section">
      <div class="section-heading compact">
        <p>Use Case Fit</p>
        <h2>Where ${pageEscape(robot.name)} belongs in the robotics economy.</h2>
      </div>
      <div class="use-case-profile-grid">
        ${(useCases.length ? useCases : useCaseLibrary.slice(0, 2)).slice(0, 4).map((item) => `
          <a href="use-cases.html?case=${pageEscape(item.slug)}">
            <span>${pageEscape(item.title)}</span>
            <strong>${pageEscape(item.buyerQuestion)}</strong>
            <small>${pageEscape(item.summary)}</small>
          </a>
        `).join("")}
      </div>
    </section>
    <section class="catalog-section">
      <div class="section-heading compact">
        <p>Official Media</p>
        <h2>Demo and product proof for ${pageEscape(robot.name)}.</h2>
      </div>
      <div class="profile-media-card" id="profile-video">
        ${video?.embed ? `
          <div class="profile-media-video">
            <iframe
              src="${pageEscape(video.embed)}"
              title="${pageEscape(video.title)}"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen></iframe>
          </div>
        ` : robot.image ? `<img src="${pageEscape(robot.image)}" alt="${pageEscape(robot.name)} official visual" loading="lazy">` : `<div>${pageEscape(pageInitials(robot.name))}</div>`}
        <article>
          <span>${pageEscape(video?.provider || robot.company)}</span>
          <h3>${pageEscape(video?.title || `${robot.name} official source`)}</h3>
          <p>${pageEscape(video?.note || "Robologai links out to official robot/product pages so readers can verify fast-changing claims directly.")}</p>
          <a href="${pageEscape(robot.source || "#")}" target="_blank" rel="noopener noreferrer">Open official page →</a>
        </article>
      </div>
    </section>
    <section class="catalog-section">
      <div class="section-heading compact">
        <p>Alternatives</p>
        <h2>Alternatives to ${pageEscape(robot.name)}.</h2>
      </div>
      <div class="profile-action-row compact-action-row">
        <a href="compare.html?robots=${pageEscape(compareSlugs)}">Open comparison set</a>
      </div>
      <div class="signal-grid">
        ${(alternatives.length ? alternatives : related).map((item) => `<article class="signal-card"><strong>${pageEscape(item.name)}</strong><span>${pageEscape(item.company)} · ${robotScore(item)} R-Score</span><small>${pageEscape(item.useCase)}</small><a href="robot.html?robot=${pageEscape(robotSlug(item))}">Open profile →</a></article>`).join("")}
      </div>
    </section>
  `;
}

function renderUseCasesPage() {
  const root = document.querySelector("[data-use-cases]");
  if (!root) return;
  const params = new URLSearchParams(window.location.search);
  const wanted = params.get("case");
  const selected = useCaseLibrary.find((item) => item.slug === wanted);
  const cases = selected ? [selected] : useCaseLibrary;
  document.title = `${selected ? selected.title : "Use Cases"} | robologai`;

  root.innerHTML = `
    <section class="catalog-hero use-case-hero">
      <p>Use Case Library</p>
      <h1>${pageEscape(selected ? `${selected.title} robots and companies.` : "Find robots by real-world application.")}</h1>
      <span>${pageEscape(selected ? selected.summary : "A buyer-style view of humanoid and service robots across manufacturing, warehouse, home, research, healthcare, inspection, and hospitality use cases.")}</span>
      <div class="catalog-metrics">
        <article><strong>${pageState.robots.length}</strong><small>Robot profiles</small></article>
        <article><strong>${useCaseLibrary.length}</strong><small>Use-case tracks</small></article>
        <article><strong>Source-first</strong><small>Official links</small></article>
      </div>
    </section>
    <section class="catalog-section">
      <div class="section-heading compact">
        <p>Buyer Guides</p>
        <h2>Short decision notes before comparing robots.</h2>
      </div>
      <div class="buyer-guide-grid">
        ${buyerGuideLibrary.map((guide) => `
          <article>
            <span>${pageEscape(guide.title)}</span>
            <strong>${pageEscape(guide.summary)}</strong>
            <small>${pageEscape(guide.terms.join(" · "))}</small>
          </article>
        `).join("")}
      </div>
    </section>
    <section class="use-case-board">
      ${cases.map((item) => {
        const robots = pageState.robots.filter((robot) => robotUseCases(robot).some((match) => match.slug === item.slug));
        const companies = pageState.companies.filter((company) => {
          const text = companyText(company);
          return item.terms.some((term) => text.includes(pageNormalize(term)));
        }).slice(0, 8);
        const guide = buyerGuideLibrary.find((entry) => entry.terms.some((term) => item.terms.includes(term)));
        return `
          <article class="use-case-panel" id="${pageEscape(item.slug)}">
            <div class="use-case-panel-head">
              <div>
                <span>${pageEscape(item.slug)}</span>
                <h2>${pageEscape(item.title)}</h2>
                <p>${pageEscape(item.summary)}</p>
              </div>
              <strong>${robots.length}<small>robots</small></strong>
            </div>
            <div class="buyer-question">${pageEscape(item.buyerQuestion)}</div>
            ${guide ? `<div class="buyer-playbook"><span>Buyer playbook</span><strong>${pageEscape(guide.summary)}</strong></div>` : ""}
            <div class="use-case-robot-grid">
              ${robots.slice(0, 6).map((robot) => `
                <a href="robot.html?robot=${pageEscape(robotSlug(robot))}">
                  <span>${robotScore(robot)} R-Score</span>
                  <strong>${pageEscape(robot.name)}</strong>
                  <small>${pageEscape(robot.company)} · ${pageEscape(robot.availability)}</small>
                </a>
              `).join("") || `<p class="empty-note">Robologai is still mapping robots for this use case.</p>`}
            </div>
            <div class="linked-company-row">
              ${companies.map((company) => `<a href="company.html?company=${pageEscape(companySlug(company))}">${pageEscape(company.name)}</a>`).join("")}
            </div>
          </article>
        `;
      }).join("")}
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
        <p>Market Signal</p>
        <h2>How ${pageEscape(company.name)} fits into the robotics economy.</h2>
      </div>
      <div class="company-signal-grid">
        <article><span>Exposure</span><strong>${pageEscape(marketStrength(company))}</strong><small>${pageEscape(company.type || "Entity")} · ${pageEscape(company.ticker || "No public ticker")}</small></article>
        <article><span>Robotics lane</span><strong>${pageEscape(company.robot || "AI / robotics activity")}</strong><small>${pageEscape(company.category)}</small></article>
        <article><span>Verification</span><strong>Official source first</strong><small>Robologai sends readers to the company source for fast-changing claims.</small></article>
      </div>
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
  const params = new URLSearchParams(window.location.search);
  const queryRobots = (params.get("robots") || "").split(",").map((item) => item.trim()).filter(Boolean);
  const priority = selected.length ? selected : queryRobots.length ? queryRobots : ["Optimus", "Figure 02", "Apollo", "Digit", "G1", "PM01", "Booster T1", "AgiBot A2", "LimX Oli", "PUDU D9", "Memo", "Sprout"];
  const robots = priority.slice(0, 4).map((name) => pageState.robots.find((robot) => robot.name === name || robotSlug(robot) === name)).filter(Boolean);
  const summary = document.querySelector("[data-compare-summary]");
  if (summary) {
    const leader = [...robots].sort((a, b) => robotScore(b) - robotScore(a))[0];
    const priced = robots.filter((robot) => Number(robot.priceVisibility || 0) >= 2).length;
    const videos = robots.filter((robot) => robotVideo(robot)).length;
    summary.innerHTML = `
      <article><span>Top R-Score</span><strong>${leader ? `${pageEscape(leader.name)} · ${robotScore(leader)}` : "Choose robots"}</strong></article>
      <article><span>Price visibility</span><strong>${priced}/${robots.length || 0} visible enough</strong></article>
      <article><span>Embedded demos</span><strong>${videos}/${robots.length || 0} available</strong></article>
    `;
  }
  body.innerHTML = robots.map((robot) => `
    <tr>
      <td><strong>${pageEscape(robot.name)}</strong><small>${pageEscape(robot.company)}</small></td>
      <td>${pageEscape(robot.category)}</td>
      <td>${pageEscape(robot.country)}</td>
      <td>${pageEscape(robot.availability)}</td>
      <td>${pageEscape(robot.price)}</td>
      <td><strong>${robotScore(robot)}</strong><small>${pageEscape(scoreLabel(robotScore(robot)))}</small></td>
      <td>${robotVideo(robot) ? `<a href="videos.html">Playable</a>` : "Source only"}</td>
      <td>${pageEscape(robot.useCase)}</td>
      <td>${pageMeter(robot.maturity)}</td>
      <td><a href="robot.html?robot=${pageEscape(robotSlug(robot))}">Profile →</a></td>
    </tr>
  `).join("");
}

function renderComparePicker() {
  const picker = document.querySelector("[data-compare-select]");
  if (!picker) return;
  const params = new URLSearchParams(window.location.search);
  const queryRobots = (params.get("robots") || "").split(",").map((item) => item.trim()).filter(Boolean);
  const defaults = new Set(queryRobots.length ? queryRobots : ["Optimus", "Figure 02", "Apollo", "Digit"]);
  picker.innerHTML = pageState.robots.slice(0, 16).map((robot) => `
    <label>
      <input type="checkbox" value="${pageEscape(robot.name)}" ${defaults.has(robot.name) || defaults.has(robotSlug(robot)) ? "checked" : ""}>
      <span>${pageEscape(robot.name)}</span>
    </label>
  `).join("");
  picker.querySelectorAll("input").forEach((input) => input.addEventListener("change", () => {
    const checked = [...picker.querySelectorAll("input:checked")];
    if (checked.length > 4) input.checked = false;
    renderComparePage();
  }));
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

  document.querySelectorAll("[data-robot-usecase-filter]").forEach((select) => {
    select.addEventListener("change", () => {
      pageState.robotUseCaseFilter = select.value || "all";
      renderRobotCards();
    });
  });

  document.querySelectorAll("[data-robot-country-filter]").forEach((select) => {
    select.addEventListener("change", () => {
      pageState.robotCountryFilter = select.value || "all";
      renderRobotCards();
    });
  });

  document.querySelectorAll("[data-robot-score-filter]").forEach((select) => {
    select.addEventListener("change", () => {
      pageState.robotScoreFilter = select.value || "all";
      renderRobotCards();
    });
  });

  document.querySelectorAll("[data-robot-video-filter]").forEach((input) => {
    input.addEventListener("change", () => {
      pageState.robotVideoOnly = input.checked;
      renderRobotCards();
    });
  });

  document.querySelectorAll("[data-robot-price-filter]").forEach((input) => {
    input.addEventListener("change", () => {
      pageState.robotPricedOnly = input.checked;
      renderRobotCards();
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
  renderHomeIntelligence();
  renderVideosPage();
  renderRobotProfile();
  renderCompanyProfile();
  renderCountryTracker();
  renderUseCasesPage();
  renderComparePicker();
  renderComparePage();
  wireCatalogControls();
}

initCatalogPages();
