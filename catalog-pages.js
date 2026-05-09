const pageState = {
  robots: [],
  companies: [],
  signals: [],
  tasks: [],
  timeline: [],
  heatmap: [],
  physicalAi: [],
  robotEconomy: [],
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

const signalFallback = [
  {
    date: "2026-05-09",
    type: "Emotional AI",
    title: "Familiar points toward emotionally responsive home robots",
    company: "Familiar Machines & Magic",
    robot: "Familiar",
    category: "Home robotics",
    country: "USA",
    impact: "High",
    summary: "Roomba creator Colin Angle is framing the next home robot around presence, behavior, and emotional response rather than cleaning alone.",
    source: "https://www.prnewswire.com/news-releases/roomba-pioneer-colin-angle-unveils-new-venture-familiar-machines--magic-introducing-a-new-platform-for-consumer-physical-ai-302761495.html",
    relatedUrl: "blog/roomba-creator-familiar-emotional-ai-robot.html"
  },
  {
    date: "2026-05-08",
    type: "Humanoid",
    title: "Unitree keeps price transparency pressure on the humanoid market",
    company: "Unitree Robotics",
    robot: "G1",
    category: "Research humanoid",
    country: "China",
    impact: "High",
    summary: "Visible pricing and official demo material make G1 a useful benchmark for robotics labs and early physical AI builders.",
    source: "https://www.unitree.com/g1/",
    relatedUrl: "robots/unitree-g1.html"
  },
  {
    date: "2026-05-07",
    type: "Enterprise Pilot",
    title: "Figure 02 remains one of the strongest factory humanoid signals",
    company: "Figure AI",
    robot: "Figure 02",
    category: "Industrial humanoid",
    country: "USA",
    impact: "High",
    summary: "The platform is positioned around workplace manipulation, enterprise pilots, and general-purpose robot learning.",
    source: "https://www.figure.ai/",
    relatedUrl: "robots/figure-02.html"
  },
  {
    date: "2026-05-07",
    type: "Factory AI",
    title: "Tesla Optimus keeps the factory-first humanoid narrative alive",
    company: "Tesla",
    robot: "Optimus",
    category: "Humanoid",
    country: "USA",
    impact: "Medium",
    summary: "Optimus is still best read as an internal manufacturing and embodied AI signal until public deployment details become clearer.",
    source: "https://www.tesla.com/AI",
    relatedUrl: "robots/tesla-optimus.html"
  }
];

const taskFallback = [
  {
    task: "Tote handling",
    category: "Warehouse logistics",
    humanStrength: "Exception handling, mixed inventory, damaged items, judgment calls",
    robotReadiness: 82,
    automationLevel: "Robot-assisted",
    robotFit: "High",
    timeHorizon: "Near-term",
    robots: ["Digit", "Figure 02", "Apollo"],
    summary: "Structured warehouses are one of the clearest early markets for humanoid and mobile manipulation robots because tasks repeat, routes can be mapped, and safety zones can be controlled.",
    link: "use-cases.html?case=warehouse"
  },
  {
    task: "Factory inspection",
    category: "Industrial inspection",
    humanStrength: "Root-cause judgment, safety escalation, repair decisions",
    robotReadiness: 76,
    automationLevel: "Robot-assisted",
    robotFit: "High",
    timeHorizon: "Near-term",
    robots: ["Spot", "ANYmal", "Atlas"],
    summary: "Inspection is already practical when robots patrol known environments, collect repeatable sensor data, and hand off decisions to human operators.",
    link: "use-cases.html?case=inspection"
  },
  {
    task: "Complex caregiving",
    category: "Human services",
    humanStrength: "Trust, ethics, emotional labor, unpredictable human needs",
    robotReadiness: 34,
    automationLevel: "Human advantage",
    robotFit: "Low-medium",
    timeHorizon: "Long-term",
    robots: ["Assistive robots", "Companion robots"],
    summary: "Robots can support reminders and monitoring, but deep caregiving remains a human-led domain because the work is relational, ethical, and highly contextual.",
    link: "use-cases.html?case=healthcare"
  }
];

const timelineFallback = [
  {
    year: "2002",
    era: "Consumer robotics",
    title: "Roomba normalizes home robots",
    company: "iRobot",
    category: "Home robotics",
    impact: "Made autonomous robots feel normal inside everyday homes.",
    signal: "Mass-market adoption",
    link: "companies/irobot.html"
  },
  {
    year: "2024",
    era: "Accessible humanoids",
    title: "Unitree G1 pressures the price curve",
    company: "Unitree Robotics",
    category: "Research humanoids",
    impact: "Visible pricing made humanoid robots easier to benchmark for labs, developers, and early physical AI builders.",
    signal: "Price transparency",
    link: "robots/unitree-g1.html"
  },
  {
    year: "2026",
    era: "Emotional robotics",
    title: "Familiar points toward emotionally responsive home robots",
    company: "Familiar Machines & Magic",
    category: "Home companion robotics",
    impact: "Shows a shift from utility-only machines toward robots designed around presence, behavior, and emotional response.",
    signal: "Human-robot relationship",
    link: "blog/roomba-creator-familiar-emotional-ai-robot.html"
  }
];

const heatmapFallback = [
  {
    region: "United States",
    slug: "united-states",
    score: 96,
    companies: 70,
    robots: 9,
    dominantSignal: "Humanoid platforms, AI labs, defense robotics, autonomous vehicles",
    keyCompanies: ["Tesla", "Figure AI", "Boston Dynamics", "Apptronik", "NVIDIA"],
    marketStage: "Global leader",
    link: "country.html?country=united-states"
  },
  {
    region: "China",
    slug: "china",
    score: 91,
    companies: 18,
    robots: 7,
    dominantSignal: "Affordable humanoids, quadrupeds, consumer robotics, rapid hardware iteration",
    keyCompanies: ["Unitree Robotics", "AgiBot", "UBTECH Robotics", "Pudu Robotics", "LimX Dynamics"],
    marketStage: "Fastest hardware curve",
    link: "country.html?country=china"
  },
  {
    region: "Japan",
    slug: "japan",
    score: 74,
    companies: 10,
    robots: 3,
    dominantSignal: "Industrial robotics, service robotics, legacy humanoid research",
    keyCompanies: ["FANUC", "Yaskawa Motoman", "Honda Robotics", "Kawasaki Robotics"],
    marketStage: "Industrial depth",
    link: "country.html?country=japan"
  }
];

const physicalAiFallback = [
  {
    layer: "Embodied Models",
    score: 92,
    signal: "Vision-language-action models that connect perception, instructions, memory, and robot motion.",
    whyItMatters: "This is the software layer that may let robots generalize across tasks instead of only repeating fixed routines.",
    companies: ["NVIDIA", "Physical Intelligence", "Google DeepMind", "Figure AI", "OpenAI"],
    robotExamples: ["Figure 02", "Optimus", "Apollo"],
    link: "blog/physical-ai-explained.html"
  },
  {
    layer: "Robot Bodies and Actuation",
    score: 87,
    signal: "Motors, joints, hands, batteries, balance, and manipulation determine whether AI can do useful physical work.",
    whyItMatters: "Physical AI fails if the body cannot safely move, lift, grasp, balance, or operate for enough time.",
    companies: ["Tesla", "Unitree Robotics", "Boston Dynamics", "Agility Robotics", "Apptronik"],
    robotExamples: ["Optimus", "G1", "Atlas", "Digit", "Apollo"],
    link: "leaderboard.html"
  },
  {
    layer: "Simulation and Synthetic Worlds",
    score: 84,
    signal: "Robots train and test in simulated environments before risky real-world deployment.",
    whyItMatters: "Simulation lowers cost, improves safety, and creates scalable training loops for physical tasks.",
    companies: ["NVIDIA", "Intrinsic", "Toyota Research Institute", "Open Robotics"],
    robotExamples: ["Atlas", "Digit", "Unitree G1"],
    link: "companies/nvidia.html"
  }
];

const robotEconomyFallback = [
  {
    layer: "Robot Labor",
    score: 88,
    signal: "Humanoids and mobile robots begin targeting repeatable physical work in factories, warehouses, inspection routes, and service environments.",
    companies: ["Figure AI", "Agility Robotics", "Apptronik", "Tesla", "1X Technologies"],
    metrics: ["Labor substitution", "Deployment pilots", "Task readiness"],
    link: "ai-vs-human-tasks.html"
  },
  {
    layer: "Robot Hardware",
    score: 84,
    signal: "Bodies, actuators, hands, batteries, sensors, and manufacturing scale define whether AI can become useful in the physical world.",
    companies: ["Unitree Robotics", "Boston Dynamics", "Tesla", "Apptronik", "Agility Robotics"],
    metrics: ["Bill of materials", "Reliability", "Price curve"],
    link: "leaderboard.html"
  },
  {
    layer: "Physical AI Data",
    score: 81,
    signal: "Teleoperation, simulation, sensor logs, video, and robot fleet feedback become the training fuel for embodied intelligence.",
    companies: ["Physical Intelligence", "NVIDIA", "Google DeepMind", "Figure AI", "Sanctuary AI"],
    metrics: ["Robot data loops", "Teleoperation", "Simulation scale"],
    link: "physical-ai.html"
  },
  {
    layer: "Deployment Infrastructure",
    score: 76,
    signal: "Robots need charging, monitoring, fleet management, maintenance, safety tooling, mapping, and integration before they scale.",
    companies: ["Formant", "Foxglove", "Open Robotics", "Intrinsic", "Realtime Robotics"],
    metrics: ["Fleet operations", "Developer tools", "Safety systems"],
    link: "companies.html"
  },
  {
    layer: "Public Market Proxies",
    score: 72,
    signal: "Most pure-play humanoid builders remain private, so public exposure comes through automation, semiconductors, industrial robotics, and parent companies.",
    companies: ["NVIDIA", "Tesla", "ABB Robotics", "FANUC", "Intuitive Surgical"],
    metrics: ["Ticker visibility", "Robotics exposure", "AI infrastructure"],
    link: "market.html"
  },
  {
    layer: "Machine Economy",
    score: 63,
    signal: "Robots, autonomous machines, DePIN networks, and machine payments point toward a future where machines become economic actors.",
    companies: ["peaq", "XMAQUINA", "Fetch.ai", "Autonolas"],
    metrics: ["Machine identity", "DePIN networks", "Autonomous payments"],
    link: "blog/peaq-machine-economy-depin-ecosystem.html"
  }
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

function seoNormalize(value = "") {
  return String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function seoSlug(value = "") {
  return seoNormalize(value)
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function robotSeoSlug(robot) {
  const name = seoSlug(robot.name);
  const brand = seoSlug(robot.company)
    .replace(/-robotics$/, "")
    .replace(/-technologies$/, "")
    .replace(/-technology$/, "")
    .replace(/-ai$/, "")
    .replace(/-inc$/, "")
    .replace(/-ltd$/, "");
  return name.startsWith(brand) ? name : `${brand}-${name}`;
}

function robotProfileHref(robot) {
  return `robots/${robotSeoSlug(robot)}.html`;
}

function companyProfileHref(company) {
  return `companies/${seoSlug(company.name)}.html`;
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
  return robotScoreBreakdown(robot).overall;
}

function scoreField(value, fallback = 1) {
  return Math.max(0, Math.min(5, Number(value) || fallback));
}

function deploymentScore(robot) {
  const status = pageNormalize(`${robot.status} ${robot.availability}`);
  if (status.includes("available") || status.includes("commercial")) return 5;
  if (status.includes("enterprise")) return 4;
  if (status.includes("pilot")) return 3;
  if (status.includes("development") || status.includes("prototype")) return 2;
  return 2;
}

function robotScoreBreakdown(robot) {
  const maturity = Math.max(0, Math.min(5, Number(robot.maturity) || 1));
  const price = Math.max(0, Math.min(5, Number(robot.priceVisibility) || 1));
  const deployment = deploymentScore(robot);
  const source = robot.source ? 5 : 2;
  const image = robot.image ? 5 : 2;
  const video = robotVideo(robot) ? 5 : image;
  const text = robotText(robot);
  const aiSignal = text.includes("ai") || text.includes("autonomy") || text.includes("general-purpose") || text.includes("embodied") ? 5 : text.includes("research") || text.includes("developer") ? 4 : 3;
  const mobilitySignal = text.includes("humanoid") || text.includes("quadruped") || text.includes("mobility") || text.includes("walking") ? 5 : text.includes("warehouse") || text.includes("logistics") ? 4 : 3;
  return {
    overall: Math.round(((maturity * 0.3) + (deployment * 0.25) + (price * 0.15) + (source * 0.15) + (image * 0.15)) * 20),
    commercial: Math.round(((maturity * 0.45) + (deployment * 0.35) + (price * 0.2)) * 20),
    mobility: Math.round(((maturity * 0.35) + (mobilitySignal * 0.35) + (video * 0.3)) * 20),
    intelligence: Math.round(((maturity * 0.35) + (aiSignal * 0.4) + (source * 0.25)) * 20),
    price: Math.round(price * 20),
    media: Math.round(((video * 0.7) + (image * 0.3)) * 20),
    source: Math.round(source * 20)
  };
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
  const feed = pageState.signals.length ? pageState.signals.map((item) => ({
    type: item.type,
    title: item.title,
    summary: item.summary,
    link: item.relatedUrl || item.source || "signals.html"
  })) : signalLibrary;
  target.innerHTML = feed.slice(0, limit).map((item) => `
    <a class="signal-update-card" href="${pageEscape(item.link)}">
      <span>${pageEscape(item.type)}</span>
      <strong>${pageEscape(item.title)}</strong>
      <small>${pageEscape(item.summary)}</small>
    </a>
  `).join("");
}

function signalImpactClass(impact = "") {
  const key = pageNormalize(impact);
  if (key.includes("high")) return "impact-high";
  if (key.includes("medium")) return "impact-medium";
  return "impact-early";
}

function renderRoboticsSignalsPage() {
  const featured = document.querySelector("[data-signals-featured]");
  const feed = document.querySelector("[data-signals-feed]");
  const types = document.querySelector("[data-signals-types]");
  const metrics = document.querySelector("[data-signals-metrics]");
  if (!featured && !feed && !types && !metrics) return;

  const signals = pageState.signals.length ? pageState.signals : signalFallback;
  const highImpact = signals.filter((item) => pageNormalize(item.impact).includes("high")).length;
  const signalTypes = [...new Set(signals.map((item) => item.type).filter(Boolean))];
  const countries = [...new Set(signals.map((item) => broadCountryName(item.country || "")).filter(Boolean))];

  if (metrics) {
    metrics.innerHTML = `
      <article><strong>${signals.length}</strong><small>Robotics signals</small></article>
      <article><strong>${signalTypes.length}</strong><small>Signal categories</small></article>
      <article><strong>${highImpact}</strong><small>High-impact watches</small></article>
      <article><strong>${countries.length}</strong><small>Markets covered</small></article>
    `;
  }

  if (featured) {
    const lead = signals[0];
    featured.innerHTML = `
      <span>${pageEscape(lead.type)} · ${pageEscape(lead.date)}</span>
      <h2>${pageEscape(lead.title)}</h2>
      <p>${pageEscape(lead.summary)}</p>
      <dl>
        <div><dt>Company</dt><dd>${pageEscape(lead.company)}</dd></div>
        <div><dt>Robot</dt><dd>${pageEscape(lead.robot)}</dd></div>
        <div><dt>Category</dt><dd>${pageEscape(lead.category)}</dd></div>
        <div><dt>Country</dt><dd>${pageEscape(lead.country)}</dd></div>
      </dl>
      <div class="signals-actions">
        <a href="${pageEscape(lead.relatedUrl || lead.source)}">Read signal</a>
        <a href="${pageEscape(lead.source)}" target="_blank" rel="noopener noreferrer">Official source</a>
      </div>
    `;
  }

  if (feed) {
    feed.innerHTML = signals.map((item, index) => `
      <article class="signals-row">
        <div class="signals-row-index">#${String(index + 1).padStart(2, "0")}</div>
        <div class="signals-row-main">
          <span>${pageEscape(item.type)} · ${pageEscape(item.date)}</span>
          <h2>${pageEscape(item.title)}</h2>
          <p>${pageEscape(item.summary)}</p>
          <small>${pageEscape(item.company)} · ${pageEscape(item.robot)} · ${pageEscape(item.country)}</small>
        </div>
        <div class="signals-row-side">
          <b class="signal-impact ${signalImpactClass(item.impact)}">${pageEscape(item.impact)}</b>
          <a href="${pageEscape(item.relatedUrl || item.source)}">View</a>
        </div>
      </article>
    `).join("");
  }

  if (types) {
    types.innerHTML = signalTypes.slice(0, 8).map((type) => {
      const matching = signals.filter((item) => item.type === type);
      return `
        <article>
          <span>${matching.length} signals</span>
          <strong>${pageEscape(type)}</strong>
          <small>${pageEscape(matching[0]?.category || "Robotics intelligence")}</small>
        </article>
      `;
    }).join("");
  }
}

function taskTone(task) {
  const score = Number(task.robotReadiness || 0);
  if (score >= 80) return "ready";
  if (score >= 58) return "assist";
  return "human";
}

function taskCard(task, compact = false) {
  const score = Math.max(0, Math.min(100, Number(task.robotReadiness || 0)));
  const robots = Array.isArray(task.robots) ? task.robots : String(task.robots || "").split(",").map((item) => item.trim()).filter(Boolean);
  return `
    <article class="task-card task-${taskTone(task)}">
      <span>${pageEscape(task.category)}</span>
      <h3>${pageEscape(task.task)}</h3>
      <p>${pageEscape(task.summary)}</p>
      <div class="task-meter" style="--task-score:${score / 100}"><i></i></div>
      <dl>
        <div><dt>${compact ? "Current lead" : "Automation"}</dt><dd>${pageEscape(task.automationLevel)}</dd></div>
        <div><dt>Robot fit</dt><dd>${score}%</dd></div>
        ${compact ? "" : `<div><dt>Horizon</dt><dd>${pageEscape(task.timeHorizon)}</dd></div>`}
      </dl>
      ${compact ? "" : `<em>${pageEscape(task.humanStrength)}</em>`}
      <small>${pageEscape(robots.join(" · "))}</small>
      <a href="${pageEscape(task.link || "robots.html")}">${compact ? "Open task map" : "View related robots"}</a>
    </article>
  `;
}

function renderTaskMaps() {
  const tasks = pageState.tasks.length ? pageState.tasks : taskFallback;
  const homeTarget = document.querySelector("[data-home-task-map]");
  const pageTarget = document.querySelector("[data-task-map]");
  const metrics = document.querySelector("[data-task-metrics]");
  if (homeTarget) {
    const featured = [
      ...tasks.filter((task) => Number(task.robotReadiness || 0) >= 75).slice(0, 2),
      ...tasks.filter((task) => Number(task.robotReadiness || 0) < 65).slice(0, 1)
    ].slice(0, 3);
    homeTarget.innerHTML = featured.map((task) => taskCard(task, true)).join("");
  }
  if (pageTarget) {
    pageTarget.innerHTML = tasks.map((task) => taskCard(task)).join("");
  }
  if (metrics) {
    const ready = tasks.filter((task) => Number(task.robotReadiness || 0) >= 75).length;
    const human = tasks.filter((task) => Number(task.robotReadiness || 0) < 45).length;
    const categories = new Set(tasks.map((task) => task.category).filter(Boolean)).size;
    metrics.innerHTML = `
      <article><strong>${tasks.length}</strong><small>Task maps</small></article>
      <article><strong>${ready}</strong><small>Robot-ready lanes</small></article>
      <article><strong>${human}</strong><small>Human-first lanes</small></article>
      <article><strong>${categories}</strong><small>Work categories</small></article>
    `;
  }
}

function timelineCard(item, compact = false) {
  return `
    <article class="${compact ? "timeline-mini-card" : "timeline-item"}">
      <time>${pageEscape(item.year)}</time>
      <div>
        <span>${pageEscape(item.era)} · ${pageEscape(item.company)}</span>
        <h3>${pageEscape(item.title)}</h3>
        <p>${pageEscape(item.impact)}</p>
        <small>Signal: ${pageEscape(item.signal)}${compact ? "" : ` · ${pageEscape(item.category)}`}</small>
        <a href="${pageEscape(item.link || "signals.html")}">${compact ? "Open timeline" : "Open signal"}</a>
      </div>
    </article>
  `;
}

function renderTimelinePage() {
  const timeline = pageState.timeline.length ? pageState.timeline : timelineFallback;
  const homeTarget = document.querySelector("[data-home-timeline]");
  const list = document.querySelector("[data-timeline-list]");
  const metrics = document.querySelector("[data-timeline-metrics]");
  if (homeTarget) {
    const picks = [timeline[0], timeline[Math.max(0, timeline.length - 2)], timeline[timeline.length - 1]].filter(Boolean);
    homeTarget.innerHTML = picks.map((item) => timelineCard(item, true)).join("");
  }
  if (list) {
    list.innerHTML = timeline.map((item) => timelineCard(item)).join("");
  }
  if (metrics) {
    const eras = new Set(timeline.map((item) => item.era).filter(Boolean)).size;
    const humanoid = timeline.filter((item) => pageNormalize([item.category, item.title, item.impact].join(" ")).includes("humanoid")).length;
    const latest = timeline[timeline.length - 1];
    metrics.innerHTML = `
      <article><strong>${timeline.length}</strong><small>Key milestones</small></article>
      <article><strong>${eras}</strong><small>Robotics eras</small></article>
      <article><strong>${humanoid}</strong><small>Humanoid signals</small></article>
      <article><strong>${pageEscape(latest?.year || "Now")}</strong><small>Latest timeline point</small></article>
    `;
  }
}

function heatmapCard(item, compact = false) {
  const score = Math.max(0, Math.min(100, Number(item.score || 0)));
  const companies = Array.isArray(item.keyCompanies) ? item.keyCompanies : String(item.keyCompanies || "").split(",").map((company) => company.trim()).filter(Boolean);
  return `
    <article class="heatmap-card">
      <div class="heatmap-score" style="--heat:${score / 100}"><strong>${score}</strong><small>Heat</small></div>
      <span>${pageEscape(item.region)}</span>
      <h3>${pageEscape(item.dominantSignal)}</h3>
      <p>${pageEscape(companies.join(" · "))}</p>
      ${compact ? "" : `
        <dl>
          <div><dt>Companies</dt><dd>${pageEscape(item.companies)}</dd></div>
          <div><dt>Robots</dt><dd>${pageEscape(item.robots)}</dd></div>
          <div><dt>Stage</dt><dd>${pageEscape(item.marketStage)}</dd></div>
        </dl>
      `}
      <a href="${pageEscape(compact ? "robotics-heatmap.html" : item.link || "companies.html")}">${compact ? "Open heatmap" : "Open tracker"}</a>
    </article>
  `;
}

function renderHeatmapPage() {
  const heatmap = pageState.heatmap.length ? pageState.heatmap : heatmapFallback;
  const sorted = [...heatmap].sort((a, b) => Number(b.score || 0) - Number(a.score || 0));
  const homeTarget = document.querySelector("[data-home-heatmap]");
  const grid = document.querySelector("[data-heatmap-grid]");
  const metrics = document.querySelector("[data-heatmap-metrics]");
  if (homeTarget) {
    homeTarget.innerHTML = sorted.slice(0, 3).map((item) => heatmapCard(item, true)).join("");
  }
  if (grid) {
    grid.innerHTML = sorted.map((item) => heatmapCard(item)).join("");
  }
  if (metrics) {
    const top = sorted[0];
    const fastest = sorted.find((item) => pageNormalize(item.marketStage).includes("fastest")) || sorted[1] || top;
    const totalCompanies = sorted.reduce((sum, item) => sum + Number(item.companies || 0), 0);
    metrics.innerHTML = `
      <article><strong>${sorted.length}</strong><small>Regions mapped</small></article>
      <article><strong>${pageEscape(top?.score || "0")}</strong><small>Top heat score</small></article>
      <article><strong>${pageEscape(top?.region || "Global")}</strong><small>Strongest ecosystem</small></article>
      <article><strong>${totalCompanies}+</strong><small>Companies represented</small></article>
      <article><strong>${pageEscape(fastest?.region || "China")}</strong><small>Fastest hardware curve</small></article>
    `;
  }
}

function physicalAiCard(item, compact = false) {
  const score = Math.max(0, Math.min(100, Number(item.score || 0)));
  const companies = Array.isArray(item.companies) ? item.companies : String(item.companies || "").split(",").map((company) => company.trim()).filter(Boolean);
  const robots = Array.isArray(item.robotExamples) ? item.robotExamples : String(item.robotExamples || "").split(",").map((robot) => robot.trim()).filter(Boolean);
  return `
    <article class="physical-layer-card">
      <div class="physical-layer-score" style="--physical-score:${score / 100}"><strong>${score}</strong><small>Signal</small></div>
      <span>${pageEscape(item.layer)}</span>
      <h3>${pageEscape(item.signal)}</h3>
      <p>${pageEscape(compact ? companies.join(" · ") : item.whyItMatters)}</p>
      ${compact ? "" : `<small>${pageEscape(companies.join(" · "))}</small><em>${pageEscape(robots.join(" · "))}</em>`}
      <a href="${pageEscape(compact ? "physical-ai.html" : item.link || "blog/physical-ai-explained.html")}">${compact ? "Open Physical AI hub" : "Open layer"}</a>
    </article>
  `;
}

function renderPhysicalAiPage() {
  const layers = pageState.physicalAi.length ? pageState.physicalAi : physicalAiFallback;
  const sorted = [...layers].sort((a, b) => Number(b.score || 0) - Number(a.score || 0));
  const homeTarget = document.querySelector("[data-home-physical-ai]");
  const grid = document.querySelector("[data-physical-ai-grid]");
  const metrics = document.querySelector("[data-physical-metrics]");
  if (homeTarget) {
    homeTarget.innerHTML = sorted.slice(0, 3).map((item) => physicalAiCard(item, true)).join("");
  }
  if (grid) {
    grid.innerHTML = sorted.map((item) => physicalAiCard(item)).join("");
  }
  if (metrics) {
    const top = sorted[0];
    const companies = new Set(sorted.flatMap((item) => Array.isArray(item.companies) ? item.companies : [])).size;
    metrics.innerHTML = `
      <article><strong>${sorted.length}</strong><small>Stack layers</small></article>
      <article><strong>${pageEscape(top?.score || "0")}</strong><small>Top signal score</small></article>
      <article><strong>${pageEscape(top?.layer || "Models")}</strong><small>Fastest moving layer</small></article>
      <article><strong>${companies}+</strong><small>Companies referenced</small></article>
    `;
  }
}

function robotEconomyCard(item, compact = false) {
  const score = Math.max(0, Math.min(100, Number(item.score || 0)));
  const companies = Array.isArray(item.companies) ? item.companies : String(item.companies || "").split(",").map((company) => company.trim()).filter(Boolean);
  const metrics = Array.isArray(item.metrics) ? item.metrics : String(item.metrics || "").split(",").map((metric) => metric.trim()).filter(Boolean);
  return `
    <article class="economy-card">
      <div class="economy-score" style="--economy-score:${score / 100}"><strong>${score}</strong><small>Signal</small></div>
      <span>${pageEscape(item.layer)}</span>
      <h3>${pageEscape(item.signal)}</h3>
      <p>${pageEscape(compact ? companies.join(" · ") : metrics.join(" · "))}</p>
      ${compact ? "" : `<small>${pageEscape(companies.join(" · "))}</small>`}
      <a href="${pageEscape(compact ? "robot-economy.html" : item.link || "robot-economy.html")}">${compact ? "Open Robot Economy" : "Open layer"}</a>
    </article>
  `;
}

function renderRobotEconomyPage() {
  const layers = pageState.robotEconomy.length ? pageState.robotEconomy : robotEconomyFallback;
  const sorted = [...layers].sort((a, b) => Number(b.score || 0) - Number(a.score || 0));
  const homeTarget = document.querySelector("[data-home-economy]");
  const grid = document.querySelector("[data-economy-grid]");
  const metrics = document.querySelector("[data-economy-metrics]");
  if (homeTarget) {
    homeTarget.innerHTML = sorted.slice(0, 3).map((item) => robotEconomyCard(item, true)).join("");
  }
  if (grid) {
    grid.innerHTML = sorted.map((item) => robotEconomyCard(item)).join("");
  }
  if (metrics) {
    const top = sorted[0];
    const companyRefs = new Set(sorted.flatMap((item) => Array.isArray(item.companies) ? item.companies : [])).size;
    const publicLayer = sorted.find((item) => pageNormalize(item.layer).includes("public")) || sorted[0];
    metrics.innerHTML = `
      <article><strong>${sorted.length}</strong><small>Economy layers</small></article>
      <article><strong>${pageEscape(top?.score || "0")}</strong><small>Top signal score</small></article>
      <article><strong>${pageEscape(top?.layer || "Robot Labor")}</strong><small>Fastest moving layer</small></article>
      <article><strong>${companyRefs}+</strong><small>Company references</small></article>
      <article><strong>${pageEscape(publicLayer?.layer || "Market")}</strong><small>Investor proxy layer</small></article>
    `;
  }
}

function useCaseSlug(value = "") {
  return pageNormalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function robotCapabilityRows(robot) {
  const score = robotScoreBreakdown(robot);
  return [
    ["Commercial readiness", score.commercial / 20],
    ["Mobility proof", score.mobility / 20],
    ["AI capability signal", score.intelligence / 20],
    ["Price transparency", score.price / 20],
    ["Media proof", score.media / 20],
    ["Official source strength", score.source / 20]
  ];
}

function robotRankings() {
  return [...pageState.robots]
    .sort((a, b) => robotScore(b) - robotScore(a) || pageNormalize(a.name).localeCompare(pageNormalize(b.name)))
    .map((robot, index) => ({ robot, rank: index + 1, score: robotScore(robot), breakdown: robotScoreBreakdown(robot) }));
}

function renderMiniScoreBars(robot, limit = 3) {
  const score = robotScoreBreakdown(robot);
  return [
    ["Commercial", score.commercial],
    ["Mobility", score.mobility],
    ["AI signal", score.intelligence],
    ["Media", score.media],
    ["Price", score.price]
  ].slice(0, limit).map(([label, value]) => `
    <li><span>${pageEscape(label)}</span><b style="--score:${Math.max(0, Math.min(100, value)) / 100}"><i></i></b><em>${value}</em></li>
  `).join("");
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
      <a href="${pageEscape(robotProfileHref(robot))}">Robot profile</a>
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
  const rankings = new Map(robotRankings().map((item) => [robotSlug(item.robot), item.rank]));
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
    const rank = rankings.get(robotSlug(robot));
    return `
    <article class="catalog-card robot-catalog-card">
      <figure class="catalog-visual ${robot.image ? "" : "catalog-visual-empty"}">
        ${robot.image ? `<img src="${pageEscape(robot.image)}" alt="${pageEscape(robot.name)} robot" loading="lazy" decoding="async">` : `<span>${pageEscape(pageInitials(robot.name))}</span>`}
        ${rank ? `<div class="robot-rank-chip">#${rank}</div>` : ""}
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
        <ul class="rscore-mini-bars" aria-label="${pageEscape(robot.name)} R-Score breakdown">
          ${renderMiniScoreBars(robot)}
        </ul>
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
          <a href="${pageEscape(robotProfileHref(robot))}">Open profile →</a>
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

function renderRScoreFeature() {
  const target = document.querySelector("[data-rscore-feature]");
  if (!target) return;
  const leader = robotRankings()[0];
  if (!leader) return;
  const { robot, score, breakdown } = leader;
  target.innerHTML = `
    <div>
      <strong>${score}</strong>
      <span>${pageEscape(robot.name)}</span>
    </div>
    <ol>
      <li><span style="--score:${breakdown.commercial / 100}"></span><b>Commercial readiness</b><em>${breakdown.commercial}</em></li>
      <li><span style="--score:${breakdown.mobility / 100}"></span><b>Mobility proof</b><em>${breakdown.mobility}</em></li>
      <li><span style="--score:${breakdown.intelligence / 100}"></span><b>AI signal</b><em>${breakdown.intelligence}</em></li>
      <li><span style="--score:${breakdown.media / 100}"></span><b>Media proof</b><em>${breakdown.media}</em></li>
    </ol>
  `;
}

function renderRScoreLeaderboards() {
  const rankings = robotRankings();
  document.querySelectorAll("[data-rscore-leaderboard]").forEach((target) => {
    const limit = Number(target.dataset.rscoreLimit || 5);
    target.innerHTML = rankings.slice(0, limit).map(({ robot, rank, score, breakdown }) => `
      <article>
        <span>#${rank} ${pageEscape(scoreLabel(score))}</span>
        <strong>${pageEscape(robot.name)}</strong>
        <small>${score} R-Score · ${breakdown.commercial} commercial · ${breakdown.mobility} mobility · ${breakdown.intelligence} AI</small>
        <a href="${pageEscape(robotProfileHref(robot))}">Open profile →</a>
      </article>
    `).join("");
  });
  document.querySelectorAll("[data-rscore-snapshot]").forEach((target) => {
    const leader = rankings[0];
    const commercial = [...rankings].sort((a, b) => b.breakdown.commercial - a.breakdown.commercial)[0];
    const mobility = [...rankings].sort((a, b) => b.breakdown.mobility - a.breakdown.mobility)[0];
    const priced = [...rankings].sort((a, b) => b.breakdown.price - a.breakdown.price)[0];
    target.innerHTML = [leader, commercial, mobility, priced].filter(Boolean).map((item, index) => `
      <article>
        <span>${["Overall leader", "Commercial readiness", "Mobility proof", "Price transparency"][index]}</span>
        <strong>${pageEscape(item.robot.name)}</strong>
        <small>${item.score} R-Score · ${pageEscape(item.robot.company)}</small>
      </article>
    `).join("");
  });
}

function robotTrendBadge(robot, rank, breakdown) {
  if (rank <= 3 && breakdown.media >= 90) return { label: "Hot", tone: "hot" };
  if (breakdown.price >= 80 && breakdown.commercial >= 85) return { label: "Rising", tone: "rising" };
  if (breakdown.intelligence >= 90) return { label: "AI signal", tone: "ai" };
  if (breakdown.mobility >= 90) return { label: "Mobility", tone: "mobility" };
  if (rank <= 8) return { label: "Watch", tone: "watch" };
  return { label: "Tracked", tone: "tracked" };
}

function leaderboardCompareHref(robot) {
  const alternatives = robotAlternatives(robot, 2);
  const slugs = [robot, ...alternatives].map((item) => robotSlug(item)).join(",");
  return `compare.html?robots=${pageEscape(slugs)}`;
}

function renderRobotLeaderboardPage() {
  const target = document.querySelector("[data-robot-leaderboard]");
  if (!target) return;
  const rankings = robotRankings();
  target.innerHTML = `
    <div class="leaderboard-row leaderboard-head" role="row">
      <span>Rank</span>
      <span>Robot</span>
      <span>Company</span>
      <span>Category</span>
      <span>Country</span>
      <span>R-Score</span>
      <span>Trend</span>
      <span>Action</span>
    </div>
    ${rankings.map(({ robot, rank, score, breakdown }) => {
      const trend = robotTrendBadge(robot, rank, breakdown);
      return `
        <article class="leaderboard-row" role="row">
          <span class="leaderboard-rank">#${rank}</span>
          <a class="leaderboard-robot" href="${pageEscape(robotProfileHref(robot))}">
            <strong>${pageEscape(robot.name)}</strong>
            <small>${pageEscape(scoreLabel(score))}</small>
          </a>
          <span class="leaderboard-meta" data-label="Company">${pageEscape(robot.company)}</span>
          <span class="leaderboard-meta" data-label="Category">${pageEscape(robot.category || "Robot")}</span>
          <span class="leaderboard-meta" data-label="Country">${pageEscape(broadCountryName(robot.country || "Global"))}</span>
          <span class="leaderboard-score" data-label="R-Score"><strong>${score}</strong><small>/100</small></span>
          <span class="leaderboard-trend" data-label="Trend"><em class="trend-badge trend-${pageEscape(trend.tone)}">${pageEscape(trend.label)}</em></span>
          <a class="leaderboard-compare" href="${leaderboardCompareHref(robot)}">Compare</a>
        </article>
      `;
    }).join("")}
  `;
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
          <a href="${pageEscape(companyProfileHref(company))}">Open profile →</a>
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
            <a href="${pageEscape(robotProfileHref(robot))}">Profile →</a>
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

function renderFeaturedRobot() {
  const target = document.querySelector("[data-featured-robot]");
  if (!target) return;
  const robot = pageState.robots.find((item) => robotSlug(item) === "g1") || [...pageState.robots]
    .filter((item) => robotVideo(item) && item.image)
    .sort((a, b) => robotScore(b) - robotScore(a))[0] || pageState.robots[0];
  if (!robot) return;
  const alternatives = robotAlternatives(robot, 3);
  const score = robotScore(robot);
  const quality = robotQuality(robot);
  const week = Math.ceil((((new Date()).getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) / 86400000 + new Date(new Date().getFullYear(), 0, 1).getDay() + 1) / 7);
  target.innerHTML = `
    <figure>
      ${robot.image ? `<img src="${pageEscape(robot.image)}" alt="${pageEscape(robot.name)} robot" loading="lazy" decoding="async">` : `<span>${pageEscape(pageInitials(robot.name))}</span>`}
      <figcaption>${score} <small>R-Score</small></figcaption>
    </figure>
    <article>
      <span>Week ${week} · ${pageEscape(robot.company)} · ${pageEscape(scoreLabel(score))}</span>
      <h3>${pageEscape(robot.name)}</h3>
      <p>${pageEscape(robot.name)} is this week's RoboLogAI pick because it combines ${pageEscape(quality.priceConfidence.toLowerCase())}, ${pageEscape(quality.mediaVerified.toLowerCase())}, and a clear use-case path: ${pageEscape(robot.useCase)}.</p>
      <div class="robot-week-grid">
        <div><strong>${pageEscape(broadCountryName(robot.country))}</strong><small>Country</small></div>
        <div><strong>${pageEscape(robotStage(robot))}</strong><small>Status</small></div>
        <div><strong>${pageEscape(robot.price)}</strong><small>Price signal</small></div>
        <div><strong>${pageEscape(robot.category || "Robot")}</strong><small>Category</small></div>
      </div>
      <ul class="rscore-mini-bars robot-week-bars" aria-label="${pageEscape(robot.name)} R-Score preview">
        ${renderMiniScoreBars(robot, 3)}
      </ul>
      <div class="featured-robot-actions">
        <a href="${pageEscape(robotProfileHref(robot))}">Open profile</a>
        <a href="compare.html?robots=${pageEscape([robot, ...alternatives].map((item) => robotSlug(item)).join(","))}">Compare alternatives</a>
        ${robotVideo(robot) ? `<a href="videos.html">Watch demo</a>` : ""}
      </div>
    </article>
  `;
}

function renderVideosPage() {
  const grid = document.querySelector("[data-videos-grid]");
  if (!grid) return;
  const robots = pageState.robots.filter((robot) => robot.image).slice(0, 18);
  grid.innerHTML = robots.map((robot) => `
    <article class="video-card video-gallery-card ${robotVideo(robot) ? "has-embed" : ""}" data-video-robot="${pageEscape(robotSlug(robot))}" ${robotVideo(robot) ? `data-play-video="${pageEscape(robotSlug(robot))}" role="button" tabindex="0"` : ""}>
      <div class="video-thumb">
        <img src="${pageEscape(robot.image)}" alt="${pageEscape(robot.name)} demo visual" loading="lazy" decoding="async">
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
  const rank = robotRankings().find((item) => robotSlug(item.robot) === robotSlug(robot))?.rank;
  const video = robotVideo(robot);
  const quality = robotQuality(robot);
  const alternatives = robotAlternatives(robot);
  const compareSlugs = [robot, ...alternatives.slice(0, 3)].map((item) => robotSlug(item)).join(",");

  document.title = `${robot.name} Profile | robologai`;
  root.innerHTML = `
    <section class="profile-hero">
      <div>
          <p>${pageEscape(robot.category)} · ${pageEscape(robot.company)}${rank ? ` · #${rank} R-Score rank` : ""}</p>
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
        ${robot.image ? `<img src="${pageEscape(robot.image)}" alt="${pageEscape(robot.name)} robot" loading="lazy" decoding="async">` : `<span>${pageEscape(pageInitials(robot.name))}</span>`}
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
        <ul class="rscore-mini-bars profile-rscore-bars" aria-label="${pageEscape(robot.name)} R-Score breakdown">
          ${renderMiniScoreBars(robot, 6)}
        </ul>
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
        ` : robot.image ? `<img src="${pageEscape(robot.image)}" alt="${pageEscape(robot.name)} official visual" loading="lazy" decoding="async">` : `<div>${pageEscape(pageInitials(robot.name))}</div>`}
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
        ${(alternatives.length ? alternatives : related).map((item) => `<article class="signal-card"><strong>${pageEscape(item.name)}</strong><span>${pageEscape(item.company)} · ${robotScore(item)} R-Score</span><small>${pageEscape(item.useCase)}</small><a href="${pageEscape(robotProfileHref(item))}">Open profile →</a></article>`).join("")}
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
                <a href="${pageEscape(robotProfileHref(robot))}">
                  <span>${robotScore(robot)} R-Score</span>
                  <strong>${pageEscape(robot.name)}</strong>
                  <small>${pageEscape(robot.company)} · ${pageEscape(robot.availability)}</small>
                </a>
              `).join("") || `<p class="empty-note">Robologai is still mapping robots for this use case.</p>`}
            </div>
            <div class="linked-company-row">
              ${companies.map((company) => `<a href="${pageEscape(companyProfileHref(company))}">${pageEscape(company.name)}</a>`).join("")}
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
        ${(robots.length ? robots : [{ name: company.robot || "Robotics / AI activity", company: company.name, useCase: company.category, source: company.website }]).map((robot) => `<article class="signal-card"><strong>${pageEscape(robot.name)}</strong><span>${pageEscape(robot.company)}</span><small>${pageEscape(robot.useCase || company.category)}</small>${robotSlug(robot) ? `<a href="${pageEscape(robotProfileHref(robot))}">Robot profile →</a>` : ""}</article>`).join("")}
      </div>
    </section>
    <section class="catalog-section">
      <div class="section-heading compact">
        <p>Related Companies</p>
        <h2>Companies to compare next.</h2>
      </div>
      <div class="signal-grid">
        ${related.map((item) => `<article class="signal-card"><strong>${pageEscape(item.name)}</strong><span>${pageEscape(item.country)}</span><small>${pageEscape(item.category)}</small><a href="${pageEscape(companyProfileHref(item))}">Open profile →</a></article>`).join("")}
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
          ${companies.map((company) => `<article class="signal-card"><strong>${pageEscape(company.name)}</strong><span>${pageEscape(company.type || "Entity")}</span><small>${pageEscape(company.category)}</small><a href="${pageEscape(companyProfileHref(company))}">Open profile →</a></article>`).join("")}
        </div>
      </article>
      <article>
        <div class="section-heading compact"><p>Robots</p><h2>Robot platforms connected to ${pageEscape(country)}.</h2></div>
        <div class="signal-grid">
          ${robots.map((robot) => `<article class="signal-card"><strong>${pageEscape(robot.name)}</strong><span>${pageEscape(robot.company)}</span><small>${pageEscape(robot.useCase)}</small><a href="${pageEscape(robotProfileHref(robot))}">Robot profile →</a></article>`).join("")}
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
      <td><a href="${pageEscape(robotProfileHref(robot))}">Profile →</a></td>
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
  const [robots, companies, signals, tasks, timeline, heatmap, physicalAi, robotEconomy] = await Promise.all([
    loadJson("data/robots.json", robotFallback),
    loadJson("data/companies.json", companyFallback),
    loadJson("data/signals.json", signalFallback),
    loadJson("data/tasks.json", taskFallback),
    loadJson("data/timeline.json", timelineFallback),
    loadJson("data/heatmap.json", heatmapFallback),
    loadJson("data/physical-ai.json", physicalAiFallback),
    loadJson("data/robot-economy.json", robotEconomyFallback)
  ]);
  pageState.robots = robots;
  pageState.companies = companies;
  pageState.signals = signals;
  pageState.tasks = tasks;
  pageState.timeline = timeline;
  pageState.heatmap = heatmap;
  pageState.physicalAi = physicalAi;
  pageState.robotEconomy = robotEconomy;
  setCount("robots", robots.length);
  setCount("companies", companies.length);
  setCount("countries", new Set(companies.map((company) => company.country).filter(Boolean)).size);
  renderRobotCards();
  renderCompanyCards();
  renderMarketPage();
  renderPricesPage();
  renderHomeIntelligence();
  renderFeaturedRobot();
  renderRScoreFeature();
  renderRScoreLeaderboards();
  renderRobotLeaderboardPage();
  renderRoboticsSignalsPage();
  renderTaskMaps();
  renderTimelinePage();
  renderHeatmapPage();
  renderPhysicalAiPage();
  renderRobotEconomyPage();
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
