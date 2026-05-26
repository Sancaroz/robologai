const pageState = {
  robots: [],
  companies: [],
  signals: [],
  prices: [],
  tasks: [],
  timeline: [],
  heatmap: [],
  physicalAi: [],
  robotEconomy: [],
  globalMap: [],
  futureIndex: [],
  robotFilter: "all",
  companyFilter: "all",
  query: "",
  robotUseCaseFilter: "all",
  robotCountryFilter: "all",
  robotScoreFilter: "all",
  robotCommercialFilter: "all",
  robotVideoOnly: false,
  robotPricedOnly: false,
  signalTypeFilter: "all",
  signalImpactFilter: "all",
  signalCountryFilter: "all",
  signalConfidenceFilter: "all",
  signalProfileFilter: "all",
  signalFocusFilter: "all"
};

const robotFallback = [
  {
    "name": "Optimus",
    "company": "Tesla",
    "category": "Humanoid",
    "country": "USA",
    "status": "Internal development",
    "availability": "Not publicly sold",
    "price": "No official public price",
    "useCase": "Manufacturing, logistics, future general-purpose work",
    "height": "Not finalized",
    "runtime": "Not disclosed",
    "maturity": 3,
    "priceVisibility": 1,
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/ca/Optimus_Tesla.jpg",
    "imageCredit": "Wikimedia Commons / public domain",
    "source": "https://www.tesla.com/AI",
    "keywords": [
      "factory",
      "autonomy",
      "tesla",
      "humanoid"
    ]
  },
  {
    "name": "Figure 02",
    "company": "Figure AI",
    "category": "Humanoid",
    "country": "USA",
    "status": "Enterprise pilots",
    "availability": "Enterprise only",
    "price": "No official public price",
    "useCase": "Workplace manipulation and factory automation",
    "height": "5 ft 6 in",
    "runtime": "Up to 5 hours",
    "maturity": 4,
    "priceVisibility": 1,
    "image": "https://images.ctfassets.net/qx5k8y1u9drj/56I3mHKEdLZdrsONwOm3sc/63b1569bb855cc334c2dda67ce40ba4a/generic-page-image.jpeg",
    "imageCredit": "Figure AI official media",
    "source": "https://www.figure.ai/",
    "keywords": [
      "figure",
      "workplace",
      "factory",
      "humanoid"
    ]
  },
  {
    "name": "Persona Humanoid",
    "company": "Persona AI",
    "category": "Heavy-industry humanoid",
    "country": "USA",
    "status": "Prototype / pre-production development",
    "availability": "Pre-orders / leasing program; targeting Q3 2027 deployment",
    "price": "Lease terms; no official public unit price",
    "useCase": "Skilled industrial labor across shipyards, energy, construction, manufacturing, welding, fabrication, assembly and mining",
    "height": "Not disclosed",
    "runtime": "Targeting 2 work shifts per day",
    "maturity": 3,
    "priceVisibility": 2,
    "image": "https://persona.ai/wp-content/uploads/image-of-humanoid-robot.webp",
    "imageCredit": "Persona AI official media",
    "source": "https://persona.ai/humanoid/",
    "keywords": [
      "persona",
      "industrial humanoid",
      "shipyards",
      "energy",
      "construction",
      "manufacturing",
      "welder",
      "fabricator",
      "assembler",
      "miner"
    ]
  },
  {
    "name": "Apollo",
    "company": "Apptronik",
    "category": "Humanoid",
    "country": "USA",
    "status": "Commercial scaling",
    "availability": "Enterprise pilots",
    "price": "No official public price",
    "useCase": "Logistics, manufacturing, industrial support",
    "height": "5 ft 8 in",
    "runtime": "About 4 hours",
    "maturity": 4,
    "priceVisibility": 1,
    "image": "https://cdn.prod.website-files.com/646de3abb3e62d339f089e28/64e54eb19605183a5d58e077_Hero%20Shot%2001.png",
    "imageCredit": "Apptronik official media",
    "source": "https://apptronik.com/",
    "keywords": [
      "apollo",
      "industrial",
      "warehouse",
      "humanoid"
    ]
  },
  {
    "name": "Digit",
    "company": "Agility Robotics",
    "category": "Humanoid logistics",
    "country": "USA",
    "status": "Enterprise deployment",
    "availability": "RaaS / enterprise",
    "price": "Enterprise pricing",
    "useCase": "Warehouse movement and tote handling",
    "height": "5 ft 9 in",
    "runtime": "About 2 hours",
    "maturity": 5,
    "priceVisibility": 2,
    "image": "https://cdn.prod.website-files.com/68d6ca150ffa11fdc25d7575/698c88da0a3bf08e257409ea_digit-profile.jpg",
    "imageCredit": "Agility Robotics official media",
    "source": "https://agilityrobotics.com/",
    "keywords": [
      "digit",
      "warehouse",
      "logistics",
      "humanoid"
    ]
  },
  {
    "name": "Atlas",
    "company": "Boston Dynamics",
    "category": "Humanoid",
    "country": "USA",
    "status": "R&D platform",
    "availability": "Not publicly sold",
    "price": "No official public price",
    "useCase": "Advanced mobility, manipulation, industrial R&D",
    "height": "Not disclosed",
    "runtime": "Not disclosed",
    "maturity": 4,
    "priceVisibility": 1,
    "image": "https://bostondynamics.com/wp-content/uploads/2024/04/atlas-blue-mobile-copy.jpg",
    "imageCredit": "Boston Dynamics official media",
    "source": "https://bostondynamics.com/atlas/",
    "keywords": [
      "atlas",
      "mobility",
      "boston dynamics",
      "humanoid"
    ]
  },
  {
    "name": "Spot",
    "company": "Boston Dynamics",
    "category": "Quadruped",
    "country": "USA",
    "status": "Commercial robot",
    "availability": "Available",
    "price": "Base price has been reported around $74,500+",
    "useCase": "Inspection, mapping, industrial safety",
    "height": "33 in",
    "runtime": "About 90 minutes",
    "maturity": 5,
    "priceVisibility": 4,
    "image": "https://bostondynamics.com/wp-content/uploads/2024/02/spot-stairs-safety-lights.jpg",
    "imageCredit": "Boston Dynamics official media",
    "source": "https://bostondynamics.com/products/spot/",
    "keywords": [
      "spot",
      "inspection",
      "quadruped",
      "commercial"
    ]
  },
  {
    "name": "Unitree G1",
    "company": "Unitree Robotics",
    "category": "Humanoid",
    "country": "China",
    "status": "Order-based availability",
    "availability": "Available / order-based",
    "price": 16000,
    "useCase": "Research, education, prototyping",
    "height": "132 cm",
    "runtime": "About 2 hours",
    "maturity": 5,
    "priceVisibility": 5,
    "image": "https://www.unitree.com/images/11d0a76afbb74e8fb7f692652b4c33e0_800x800.png",
    "imageCredit": "Unitree official media",
    "source": "https://www.unitree.com/g1/",
    "keywords": [
      "g1",
      "unitree",
      "research",
      "price visible"
    ]
  },
  {
    "name": "H1",
    "company": "Unitree Robotics",
    "category": "Humanoid",
    "country": "China",
    "status": "Commercial / research platform",
    "availability": "Order-based",
    "price": "Configuration dependent",
    "useCase": "Research, mobility, humanoid development",
    "height": "180 cm",
    "runtime": "Not disclosed",
    "maturity": 4,
    "priceVisibility": 3,
    "image": "https://www.unitree.com/images/ea2d2b637df84e3bacd508cd1f2711e5_2744x1596.jpg",
    "imageCredit": "Unitree official media",
    "source": "https://www.unitree.com/",
    "keywords": [
      "h1",
      "unitree",
      "humanoid",
      "mobility"
    ]
  },
  {
    "name": "PM01",
    "company": "EngineAI",
    "category": "Humanoid",
    "country": "China",
    "status": "Developer platform",
    "availability": "Available / developer focused",
    "price": "Public estimates vary by configuration",
    "useCase": "Research, education, embodied AI development",
    "height": "138 cm",
    "runtime": "About 2 hours",
    "maturity": 4,
    "priceVisibility": 3,
    "image": "https://en-engineai-1304599088.cos.ap-guangzhou.myqcloud.com/uploads/frame/PM01/PM01_00000.png",
    "imageCredit": "EngineAI official media",
    "source": "https://en.engineai.com.cn/product-pm01.html",
    "keywords": [
      "pm01",
      "engineai",
      "open source",
      "developer"
    ]
  },
  {
    "name": "Booster T1",
    "company": "Booster Robotics",
    "category": "Humanoid",
    "country": "China",
    "status": "Developer and competition platform",
    "availability": "Available / order-based",
    "price": "Configuration dependent",
    "useCase": "Education, RoboCup, research and development",
    "height": "About 120 cm class",
    "runtime": "Not disclosed",
    "maturity": 4,
    "priceVisibility": 3,
    "image": "https://www.booster.tech/_astro/product-1.Dk_Ke_Kw_24hsch.webp",
    "imageCredit": "Booster Robotics official media",
    "source": "https://www.booster.tech/",
    "keywords": [
      "booster",
      "t1",
      "robocup",
      "education"
    ]
  },
  {
    "name": "NEO",
    "company": "1X Technologies",
    "category": "Home humanoid",
    "country": "Norway / USA",
    "status": "Developing / limited access",
    "availability": "Limited",
    "price": "No broad public price",
    "useCase": "Home assistance and human environments",
    "height": "Not disclosed",
    "runtime": "Not disclosed",
    "maturity": 3,
    "priceVisibility": 1,
    "source": "https://www.1x.tech/",
    "keywords": [
      "neo",
      "home robot",
      "1x",
      "humanoid"
    ]
  },
  {
    "name": "Memo",
    "company": "Sunday Robotics",
    "category": "Home robot",
    "country": "USA",
    "status": "Beta planned",
    "availability": "Beta launching late 2026",
    "price": "No final retail price",
    "useCase": "Dishes, laundry, coffee, household assistance",
    "height": "Variable reach",
    "runtime": "Not disclosed",
    "maturity": 3,
    "priceVisibility": 1,
    "image": "https://cdn.sanity.io/images/1omys9i3/production/319392a9e6c83e4b9f7c2158c5b10fa6f75e84c1-2400x1260.png",
    "imageCredit": "Sunday Robotics official media",
    "source": "https://www.sunday.ai/",
    "keywords": [
      "memo",
      "home robot",
      "household",
      "sunday"
    ]
  },
  {
    "name": "Sprout",
    "company": "Fauna Robotics",
    "category": "Soft humanoid",
    "country": "USA",
    "status": "Developer / research platform",
    "availability": "Early access",
    "price": "Reported around $50K",
    "useCase": "Research, development, human-robot interaction",
    "height": "About 3.5 ft",
    "runtime": "Not disclosed",
    "maturity": 3,
    "priceVisibility": 4,
    "image": "https://cdn.prod.website-files.com/6931911db0300aa6e7e3fc81/6977d9e235cf9a54353a625b_fauna_social_6%20(1).jpg",
    "imageCredit": "Fauna Robotics official media",
    "source": "https://faunarobotics.com/",
    "keywords": [
      "sprout",
      "soft humanoid",
      "fauna",
      "research"
    ]
  },
  {
    "name": "Phoenix",
    "company": "Sanctuary AI",
    "category": "Humanoid",
    "country": "Canada",
    "status": "Enterprise development",
    "availability": "Enterprise / pilots",
    "price": "No official public price",
    "useCase": "General-purpose work in structured environments",
    "height": "5 ft 7 in",
    "runtime": "Not disclosed",
    "maturity": 3,
    "priceVisibility": 1,
    "source": "https://www.sanctuary.ai/",
    "keywords": [
      "phoenix",
      "sanctuary",
      "general purpose",
      "humanoid"
    ]
  },
  {
    "name": "Ameca",
    "company": "Engineered Arts",
    "category": "Social humanoid",
    "country": "United Kingdom",
    "status": "Commercial / demo platform",
    "availability": "Available for commercial engagement",
    "price": "Enterprise / quote-based",
    "useCase": "Human-robot interaction, events, research",
    "height": "Human scale",
    "runtime": "Not disclosed",
    "maturity": 5,
    "priceVisibility": 2,
    "source": "https://www.engineeredarts.co.uk/",
    "keywords": [
      "ameca",
      "social humanoid",
      "hri",
      "engineered arts"
    ]
  },
  {
    "name": "Walker S",
    "company": "UBTECH Robotics",
    "category": "Humanoid",
    "country": "China",
    "status": "Industrial pilots",
    "availability": "Enterprise",
    "price": "No official public price",
    "useCase": "Manufacturing, automotive, industrial tasks",
    "height": "Human scale",
    "runtime": "Not disclosed",
    "maturity": 4,
    "priceVisibility": 1,
    "source": "https://www.ubtrobot.com/",
    "keywords": [
      "walker",
      "ubtech",
      "industrial",
      "humanoid"
    ]
  },
  {
    "name": "AgiBot A2",
    "company": "AgiBot",
    "category": "Humanoid",
    "country": "China",
    "status": "Commercializing",
    "availability": "Enterprise / developer ecosystem",
    "price": "No official public price",
    "useCase": "Embodied AI datasets, manufacturing, general robot development",
    "height": "Full-size",
    "runtime": "Not disclosed",
    "maturity": 4,
    "priceVisibility": 1,
    "source": "https://www.agibot.com/",
    "keywords": [
      "agibot",
      "a2",
      "embodied ai",
      "china"
    ]
  },
  {
    "name": "LimX Oli",
    "company": "LimX Dynamics",
    "category": "Humanoid",
    "country": "China",
    "status": "Product launched",
    "availability": "Buy now / enterprise inquiry",
    "price": "No broad public price",
    "useCase": "Research, manufacturing, business and household services",
    "height": "Full-size",
    "runtime": "Not disclosed",
    "maturity": 4,
    "priceVisibility": 2,
    "image": "https://www.limxdynamics.com/_next/image?url=%2Fimages%2Fheader%2Fproduct-1.png&w=1080&q=75",
    "imageCredit": "LimX Dynamics official media",
    "source": "https://www.limxdynamics.com/en",
    "keywords": [
      "limx",
      "oli",
      "physical ai",
      "agentic os"
    ]
  },
  {
    "name": "KUAVO",
    "company": "Leju Robotics",
    "category": "Humanoid",
    "country": "China",
    "status": "Industrial and research scenarios",
    "availability": "Enterprise / research platform",
    "price": "No official public price",
    "useCase": "Industrial manufacturing, business services, research training",
    "height": "Full-size",
    "runtime": "Not disclosed",
    "maturity": 4,
    "priceVisibility": 1,
    "source": "https://www.lejurobot.com/en",
    "keywords": [
      "kuavo",
      "leju",
      "industrial",
      "humanoid"
    ]
  },
  {
    "name": "PUDU D9",
    "company": "Pudu Robotics",
    "category": "Humanoid",
    "country": "China",
    "status": "Prototype / commercial path",
    "availability": "Contact sales",
    "price": "Quote-based; third-party estimates vary",
    "useCase": "Object manipulation, service robotics, customer engagement",
    "height": "170 cm",
    "runtime": "Battery: 15 Ah / 0.72 kWh",
    "maturity": 3,
    "priceVisibility": 2,
    "image": "https://cdn.pudutech.com/official-website/d9/section3_front_en.webp",
    "imageCredit": "Pudu Robotics official media",
    "source": "https://www.pudurobotics.com/en/products/d9",
    "keywords": [
      "pudu",
      "d9",
      "service robot",
      "humanoid"
    ]
  },
  {
    "name": "MagicBot Gen1",
    "company": "MagicLab",
    "category": "Humanoid",
    "country": "China",
    "status": "General-purpose humanoid",
    "availability": "Purchase / inquiry",
    "price": "No broad public price",
    "useCase": "Flexible manufacturing and multi-robot collaboration",
    "height": "Full-size",
    "runtime": "Not disclosed",
    "maturity": 3,
    "priceVisibility": 2,
    "source": "https://www.magiclab.top/en/human",
    "keywords": [
      "magicbot",
      "magiclab",
      "manufacturing",
      "humanoid"
    ]
  },
  {
    "name": "Galbot G1",
    "company": "Galbot",
    "category": "Humanoid",
    "country": "China",
    "status": "Developer platform / official robot",
    "availability": "Developer documentation and inquiry",
    "price": "No official public price",
    "useCase": "General-purpose humanoid work, embodied AI development, manipulation and pick-and-place tasks",
    "height": "Not disclosed",
    "runtime": "Not disclosed",
    "maturity": 3,
    "priceVisibility": 1,
    "image": "https://galbot.oss-cn-beijing.aliyuncs.com/online/portal/img/g1/g1-poster.jpg",
    "imageCredit": "Galbot official media",
    "source": "https://developer.galbot.com/docs/g1/2.2.4/zh/g1",
    "keywords": [
      "galbot",
      "g1",
      "humanoid",
      "embodied ai",
      "vla",
      "manipulation",
      "pick and place"
    ]
  },
  {
    "name": "Galbot S1",
    "company": "Galbot",
    "category": "Heavy-load industrial platform",
    "country": "China",
    "status": "Developer platform / official robot",
    "availability": "Developer documentation and inquiry",
    "price": "No official public price",
    "useCase": "Industrial heavy-load robotics, simulation, visualization and embodied AI development",
    "height": "Not disclosed",
    "runtime": "Not disclosed",
    "maturity": 3,
    "priceVisibility": 1,
    "image": "https://galbot.oss-cn-beijing.aliyuncs.com/online/portal/img/s1/product-en.png",
    "imageCredit": "Galbot official media",
    "source": "https://developer.galbot.com/docs/s1/2.0.0/zh/s1",
    "keywords": [
      "galbot",
      "s1",
      "industrial robot",
      "heavy load",
      "embodied ai",
      "simulation"
    ]
  },
  {
    "name": "Embodied Tien Kung 3.0",
    "company": "X-Humanoid",
    "category": "Humanoid",
    "country": "China",
    "status": "Launched / advanced platform",
    "availability": "Developer and enterprise ecosystem",
    "price": "No official public price",
    "useCase": "Industrial, commercial, embodied AI development and high-dynamic autonomous tasks",
    "height": "Full-size",
    "runtime": "Not disclosed",
    "maturity": 4,
    "priceVisibility": 1,
    "image": "assets/robots/tien-kung-3.png",
    "imageCredit": "X-Humanoid / PRNewswire official press release",
    "source": "https://www.x-humanoid.com/",
    "keywords": [
      "tien kung",
      "x-humanoid",
      "embodied ai",
      "wise kaiwu",
      "humanoid",
      "autonomous"
    ]
  },
  {
    "name": "WIM",
    "company": "WIRobotics",
    "category": "Wearable walking-assist robot",
    "country": "South Korea",
    "status": "Commercial wearable mobility robot",
    "availability": "Official WIRobotics product page and selected retailers",
    "price": "Retailer price / not official MSRP: €2,499 incl. tax; £2,224.12 / £2,001.70 incl. tax shown by EU/UK retailers",
    "useCase": "Wearable walking assistance, gait training, daily mobility support, and resistance-mode exercise",
    "height": "Not applicable",
    "runtime": "Not disclosed",
    "maturity": 4,
    "priceVisibility": 3,
    "imageCredit": "WIRobotics official product page",
    "source": "https://www.wirobotics.com/product/wimInfo",
    "sourceLinks": [
      "https://www.wirobotics.com/product/wimInfo",
      "https://www.physiosupplies.fr/wirobotics-wim-robot-portable",
      "https://www.physioparts.co.uk/wirobotics-wim-wearable-robot"
    ],
    "keywords": [
      "wirobotics",
      "wim",
      "wearable robot",
      "walking assist",
      "gait training",
      "mobility",
      "exoskeleton",
      "retailer price not official msrp"
    ]
  },
  {
    "name": "Lite3",
    "company": "DEEP Robotics",
    "category": "Quadruped",
    "country": "China",
    "status": "Commercial / research quadruped platform",
    "availability": "Official product page and retailer listings",
    "price": "Retailer/reference pricing: Lite3 Basic about US$4,995; official China page shows Lite 3 from US$2,890",
    "useCase": "Academic research, education, entertainment, quadruped locomotion, SDK/API development, and light mobility experiments",
    "height": "Official configuration-dependent standing height: 406-496 mm",
    "runtime": "Official configuration-dependent endurance: 1.5-2 hours",
    "maturity": 4,
    "priceVisibility": 4,
    "imageCredit": "DEEP Robotics official product page",
    "source": "https://www.deeprobotics.cn/en/index/lite3.html",
    "sourceLinks": [
      "https://www.deeprobotics.cn/en/index/lite3.html",
      "https://www.robotsusa.com/Deep-Robotics-Lite-Series.htm"
    ],
    "keywords": [
      "deep robotics",
      "deeprobotics",
      "lite3",
      "lite 3",
      "quadruped",
      "robot dog",
      "research",
      "education",
      "retailer reference pricing"
    ]
  },
  {
    "name": "Lite3 Pro",
    "company": "DEEP Robotics",
    "category": "Quadruped",
    "country": "China",
    "status": "Commercial / developer quadruped configuration",
    "availability": "Official Lite3 product family and retailer listings",
    "price": "Retailer/reference pricing: about US$9,995",
    "useCase": "Advanced perception development, robotics education, research, obstacle-aware mobility, and SDK/API development",
    "height": "Official standing dimensions: 610 x 370 x 450 mm",
    "runtime": "Official endurance: 1.5-2 hours",
    "maturity": 4,
    "priceVisibility": 4,
    "imageCredit": "DEEP Robotics official product page",
    "source": "https://www.deeprobotics.cn/en/index/lite3.html",
    "sourceLinks": [
      "https://www.deeprobotics.cn/en/index/lite3.html",
      "https://www.robotsusa.com/Deep-Robotics-Lite-Series.htm"
    ],
    "keywords": [
      "deep robotics",
      "lite3 pro",
      "quadruped",
      "robot dog",
      "developer platform",
      "perception",
      "retailer reference pricing"
    ]
  },
  {
    "name": "Lite3 LIDAR",
    "company": "DEEP Robotics",
    "category": "Quadruped",
    "country": "China",
    "status": "Commercial / LiDAR quadruped configuration",
    "availability": "Official Lite3 product family and retailer listings",
    "price": "Retailer/reference pricing: about US$14,500",
    "useCase": "Quadruped autonomy, SLAM/navigation experiments, LiDAR perception, research, and education",
    "height": "Official standing dimensions: 610 x 370 x 496 mm",
    "runtime": "Official endurance: 1.5-2 hours",
    "maturity": 4,
    "priceVisibility": 4,
    "imageCredit": "DEEP Robotics official product page",
    "source": "https://www.deeprobotics.cn/en/index/lite3.html",
    "sourceLinks": [
      "https://www.deeprobotics.cn/en/index/lite3.html",
      "https://www.robotsusa.com/Deep-Robotics-Lite-Series.htm"
    ],
    "keywords": [
      "deep robotics",
      "lite3 lidar",
      "quadruped",
      "robot dog",
      "lidar",
      "slam",
      "autonomous navigation",
      "retailer reference pricing"
    ]
  },
  {
    "name": "X20",
    "company": "DEEP Robotics",
    "category": "Quadruped",
    "country": "China",
    "status": "Industrial quadruped robot",
    "availability": "Official product page / contact sales",
    "price": "No official public price",
    "useCase": "Industrial patrol inspection, power utilities, tunnel inspection, rescue, metal and mining, and construction environments",
    "height": "Official standing size: 950 x 470 x 700 mm",
    "runtime": "Official endurance: 2-4 hours",
    "maturity": 4,
    "priceVisibility": 1,
    "imageCredit": "DEEP Robotics official product page",
    "source": "https://www.deeprobotics.cn/en/index/product.html",
    "keywords": [
      "deep robotics",
      "x20",
      "quadruped",
      "industrial robot dog",
      "inspection",
      "ip66",
      "patrol"
    ]
  },
  {
    "name": "X30",
    "company": "DEEP Robotics",
    "category": "Quadruped",
    "country": "China",
    "status": "Industrial-grade quadruped robot",
    "availability": "Official product page / contact sales",
    "price": "No official public price",
    "useCase": "Industrial inspection, investigation, security, surveying, mapping, and all-weather patrol",
    "height": "Official standing size: 1000 x 695 x 470 mm",
    "runtime": "Official endurance: 2.5-4 hours",
    "maturity": 4,
    "priceVisibility": 1,
    "imageCredit": "DEEP Robotics official product page",
    "source": "https://www.deeprobotics.cn/en/index/product3.html",
    "keywords": [
      "deep robotics",
      "x30",
      "quadruped",
      "industrial robot dog",
      "inspection",
      "ip67",
      "security",
      "mapping"
    ]
  },
  {
    "name": "X30 Pro",
    "company": "DEEP Robotics",
    "category": "Quadruped",
    "country": "China",
    "status": "Industrial-grade quadruped robot",
    "availability": "Official product page, online shop, and retailer listings",
    "price": "Retailer/reference pricing: US$85,000+; official US shop listing seen at US$113,400",
    "useCase": "Industrial inspection, patrol, emergency response, public safety, surveying, mapping, and all-weather autonomous navigation",
    "height": "Official standing size: 1000 x 715 x 470 mm",
    "runtime": "Official endurance: 2.5-4 hours",
    "maturity": 4,
    "priceVisibility": 4,
    "imageCredit": "DEEP Robotics official product page",
    "source": "https://www.deeprobotics.cn/en/index/product3.html",
    "sourceLinks": [
      "https://www.deeprobotics.cn/en/index/product3.html",
      "https://www.robotsusa.com/Deep-Robotics-X30-Pro-Industrial-Quadruped-Robot-Dog.htm",
      "https://shop.deeprobotics.us/products/x30"
    ],
    "keywords": [
      "deep robotics",
      "x30 pro",
      "quadruped",
      "industrial robot dog",
      "inspection",
      "ip67",
      "retailer reference pricing"
    ]
  },
  {
    "name": "LYNX",
    "company": "DEEP Robotics",
    "category": "Wheeled Quadruped",
    "country": "China",
    "status": "All-terrain wheeled-leg quadruped",
    "availability": "Official product family / contact sales",
    "price": "No official public price",
    "useCase": "All-terrain mobility, outdoor research, industrial inspection, emergency response, logistics, and field exploration",
    "height": "Not disclosed",
    "runtime": "Not disclosed",
    "maturity": 3,
    "priceVisibility": 1,
    "imageCredit": "DEEP Robotics official product page",
    "source": "https://www.deeprobotics.cn/en/index/lynx.html",
    "keywords": [
      "deep robotics",
      "lynx",
      "wheeled quadruped",
      "wheel-legged",
      "all terrain",
      "robot dog",
      "field robotics"
    ]
  },
  {
    "name": "LYNX M20",
    "company": "DEEP Robotics",
    "category": "Wheeled Quadruped",
    "country": "China",
    "status": "Industrial wheeled-legged quadruped robot",
    "availability": "Official product page, online shop, and retailer listings",
    "price": "Retailer/reference pricing varies by seller: around US$39,995+ to US$61,200 for M20/M20 Pro listings",
    "useCase": "Industrial inspection, power inspection, emergency response, logistics, last-mile delivery, outdoor off-road mobility, and field exploration",
    "height": "Official standing size: 820 x 430 x 570 mm",
    "runtime": "Official endurance: 3 hours unloaded; 2.5 hours loaded",
    "maturity": 4,
    "priceVisibility": 3,
    "imageCredit": "DEEP Robotics official product page",
    "source": "https://www.deeprobotics.cn/en/index/lynx.html",
    "sourceLinks": [
      "https://www.deeprobotics.cn/en/index/lynx.html",
      "https://www.deeprobotics.us/products/lynx-m20/",
      "https://shop.deeprobotics.us/products/lynx-m20",
      "https://www.warpix.com/products/deep-robotics-lynx-m20"
    ],
    "keywords": [
      "deep robotics",
      "lynx m20",
      "lynx m20 pro",
      "wheeled quadruped",
      "wheel-legged",
      "industrial robot dog",
      "inspection",
      "retailer reference pricing"
    ]
  },
  {
    "name": "DR01",
    "company": "DEEP Robotics",
    "category": "Humanoid",
    "country": "China",
    "status": "Humanoid / embodied intelligence explorer",
    "availability": "Official product page and retailer listings",
    "price": "Retailer/reference pricing: about US$29,995",
    "useCase": "Embodied intelligence research, humanoid mobility, perception learning, industrial productivity exploration, and home-environment research",
    "height": "Not disclosed",
    "runtime": "Not disclosed",
    "maturity": 3,
    "priceVisibility": 3,
    "imageCredit": "DEEP Robotics official humanoid page",
    "source": "https://www.deeprobotics.cn/en/index/humanoid.html",
    "sourceLinks": [
      "https://www.deeprobotics.cn/en/index/humanoid.html",
      "https://www.robotsinternational.com/Deep-Robotics-Humanoid-Robots.htm"
    ],
    "keywords": [
      "deep robotics",
      "dr01",
      "humanoid",
      "embodied intelligence",
      "robotics research",
      "retailer reference pricing"
    ]
  },
  {
    "name": "DR02",
    "company": "DEEP Robotics",
    "category": "Humanoid",
    "country": "China",
    "status": "Industrial-level humanoid robot",
    "availability": "Official product page and retailer listings",
    "price": "Retailer/reference pricing: about US$119,950",
    "useCase": "All-weather industrial humanoid operation, outdoor work, cargo transport, emergency scenarios, and human-space automation",
    "height": "Not disclosed on official page",
    "runtime": "Not disclosed",
    "maturity": 3,
    "priceVisibility": 3,
    "imageCredit": "DEEP Robotics official DR02 page",
    "source": "https://www.deeprobotics.cn/en/index/dr02.html",
    "sourceLinks": [
      "https://www.deeprobotics.cn/en/index/dr02.html",
      "https://www.robotsinternational.com/Deep-Robotics-Humanoid-Robots.htm"
    ],
    "keywords": [
      "deep robotics",
      "dr02",
      "humanoid",
      "industrial humanoid",
      "ip66",
      "all-weather",
      "embodied ai",
      "retailer reference pricing"
    ]
  }
];

const companyFallback = [
  {
    "name": "Tesla",
    "category": "Humanoid robotics, EV, autonomy",
    "country": "USA",
    "type": "Public",
    "ticker": "TSLA",
    "robot": "Optimus",
    "website": "https://www.tesla.com/AI",
    "keywords": [
      "humanoid",
      "factory",
      "autonomy",
      "electric vehicles"
    ]
  },
  {
    "name": "NVIDIA",
    "category": "AI infrastructure, robotics compute",
    "country": "USA",
    "type": "Public",
    "ticker": "NVDA",
    "robot": "Isaac, GR00T",
    "website": "https://www.nvidia.com/en-us/industries/robotics/",
    "keywords": [
      "gpu",
      "simulation",
      "robotics platform",
      "physical ai"
    ]
  },
  {
    "name": "Alphabet / Google DeepMind",
    "category": "AI research, robotics AI",
    "country": "USA / UK",
    "type": "Public",
    "ticker": "GOOGL",
    "robot": "Gemini Robotics",
    "website": "https://deepmind.google/",
    "keywords": [
      "ai lab",
      "robot learning",
      "gemini",
      "research"
    ]
  },
  {
    "name": "Microsoft / OpenAI",
    "category": "Frontier AI, AI platform",
    "country": "USA",
    "type": "Public proxy",
    "ticker": "MSFT",
    "robot": "AI models",
    "website": "https://openai.com/",
    "keywords": [
      "chatgpt",
      "frontier models",
      "ai platform"
    ]
  },
  {
    "name": "Meta AI",
    "category": "AI research, robotics research",
    "country": "USA",
    "type": "Public",
    "ticker": "META",
    "robot": "AI models",
    "website": "https://ai.meta.com/",
    "keywords": [
      "llama",
      "embodied ai",
      "research"
    ]
  },
  {
    "name": "Amazon Robotics",
    "category": "Warehouse robotics, automation",
    "country": "USA",
    "type": "Public",
    "ticker": "AMZN",
    "robot": "Warehouse robots",
    "website": "https://www.amazonrobotics.com/",
    "keywords": [
      "warehouse",
      "logistics",
      "automation"
    ]
  },
  {
    "name": "Apple",
    "category": "AI devices, consumer ecosystem",
    "country": "USA",
    "type": "Public",
    "ticker": "AAPL",
    "robot": "AI devices",
    "website": "https://www.apple.com/ai/",
    "keywords": [
      "ai devices",
      "consumer ai",
      "hardware"
    ]
  },
  {
    "name": "Boston Dynamics",
    "category": "Advanced robotics",
    "country": "USA",
    "type": "Subsidiary",
    "ticker": "Hyundai Motor Group",
    "robot": "Atlas, Spot, Stretch",
    "website": "https://bostondynamics.com/",
    "keywords": [
      "atlas",
      "spot",
      "industrial robotics",
      "mobility"
    ]
  },
  {
    "name": "Figure AI",
    "category": "Humanoid robotics",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Figure 02",
    "website": "https://www.figure.ai/",
    "keywords": [
      "humanoid",
      "factory",
      "general purpose robot"
    ]
  },
  {
    "name": "Unitree Robotics",
    "category": "Humanoid and quadruped robotics",
    "country": "China",
    "type": "Private",
    "ticker": "",
    "robot": "G1, H1, Go2",
    "website": "https://www.unitree.com/",
    "keywords": [
      "g1",
      "h1",
      "quadruped",
      "price visible"
    ]
  },
  {
    "name": "Agility Robotics",
    "category": "Humanoid logistics",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Digit",
    "website": "https://agilityrobotics.com/",
    "keywords": [
      "digit",
      "warehouse",
      "logistics",
      "humanoid"
    ]
  },
  {
    "name": "Apptronik",
    "category": "Humanoid robotics",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Apollo",
    "website": "https://apptronik.com/",
    "keywords": [
      "apollo",
      "industrial humanoid"
    ]
  },
  {
    "name": "1X Technologies",
    "category": "Home and workplace humanoids",
    "country": "Norway / USA",
    "type": "Private",
    "ticker": "",
    "robot": "NEO, EVE",
    "website": "https://www.1x.tech/",
    "keywords": [
      "neo",
      "home humanoid",
      "physical ai"
    ]
  },
  {
    "name": "Sanctuary AI",
    "category": "General-purpose humanoids",
    "country": "Canada",
    "type": "Private",
    "ticker": "",
    "robot": "Phoenix",
    "website": "https://www.sanctuary.ai/",
    "keywords": [
      "phoenix",
      "general purpose robot"
    ]
  },
  {
    "name": "Engineered Arts",
    "category": "Social humanoid robots",
    "country": "United Kingdom",
    "type": "Private",
    "ticker": "",
    "robot": "Ameca",
    "website": "https://www.engineeredarts.co.uk/",
    "keywords": [
      "ameca",
      "social humanoid",
      "human robot interaction"
    ]
  },
  {
    "name": "UBTECH Robotics",
    "category": "Humanoid and service robots",
    "country": "China",
    "type": "Public",
    "ticker": "9880.HK",
    "robot": "Walker S",
    "website": "https://www.ubtrobot.com/",
    "keywords": [
      "walker",
      "humanoid",
      "china"
    ]
  },
  {
    "name": "Fourier Intelligence",
    "category": "Humanoid and rehabilitation robotics",
    "country": "China",
    "type": "Private",
    "ticker": "",
    "robot": "GR-1",
    "website": "https://www.fftai.com/",
    "keywords": [
      "gr-1",
      "rehabilitation",
      "humanoid"
    ]
  },
  {
    "name": "XPENG Robotics",
    "category": "Humanoid robotics",
    "country": "China",
    "type": "Public proxy",
    "ticker": "XPEV",
    "robot": "Iron",
    "website": "https://www.xpeng.com/",
    "keywords": [
      "iron",
      "humanoid",
      "xpeng"
    ]
  },
  {
    "name": "Toyota Research Institute",
    "category": "Robotics research",
    "country": "Japan / USA",
    "type": "Public proxy",
    "ticker": "TM",
    "robot": "Robotics research",
    "website": "https://www.tri.global/",
    "keywords": [
      "robot learning",
      "research",
      "toyota"
    ]
  },
  {
    "name": "Honda Robotics",
    "category": "Robotics research",
    "country": "Japan",
    "type": "Public proxy",
    "ticker": "HMC",
    "robot": "ASIMO legacy",
    "website": "https://global.honda/en/robotics/",
    "keywords": [
      "asimo",
      "research",
      "mobility"
    ]
  },
  {
    "name": "NEURA Robotics",
    "category": "Cognitive robotics",
    "country": "Germany",
    "type": "Private",
    "ticker": "",
    "robot": "4NE-1, MAiRA",
    "website": "https://www.neurarobotics.com/",
    "keywords": [
      "cognitive robotics",
      "humanoid",
      "industrial"
    ]
  },
  {
    "name": "Clone Robotics",
    "category": "Humanoid hardware",
    "country": "Poland / USA",
    "type": "Private",
    "ticker": "",
    "robot": "Clone hand, android",
    "website": "https://www.clonerobotics.com/",
    "keywords": [
      "musculoskeletal",
      "android",
      "robot hand"
    ]
  },
  {
    "name": "Skild AI",
    "category": "Robotics foundation models",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "General-purpose robot brain",
    "website": "https://www.skild.ai/",
    "keywords": [
      "robot brain",
      "foundation model",
      "physical ai"
    ]
  },
  {
    "name": "Physical Intelligence",
    "category": "Robotics AI models",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Generalist robot AI",
    "website": "https://www.physicalintelligence.company/",
    "keywords": [
      "pi",
      "robot learning",
      "generalist ai"
    ]
  },
  {
    "name": "Mentee Robotics",
    "category": "Humanoid robotics",
    "country": "Israel",
    "type": "Private",
    "ticker": "",
    "robot": "Menteebot",
    "website": "https://www.menteebot.com/",
    "keywords": [
      "menteebot",
      "humanoid"
    ]
  },
  {
    "name": "Persona AI",
    "category": "Industrial humanoids",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Persona Humanoid",
    "website": "https://persona.ai/",
    "logo": "https://persona.ai/wp-content/uploads/2025/12/logo@2x.webp",
    "keywords": [
      "industrial humanoid",
      "manufacturing",
      "shipyards",
      "energy",
      "construction",
      "welding",
      "fabrication",
      "persona humanoid"
    ]
  },
  {
    "name": "Covariant",
    "category": "Warehouse AI robotics",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Robotics AI platform",
    "website": "https://covariant.ai/",
    "keywords": [
      "warehouse ai",
      "robot picking",
      "automation"
    ]
  },
  {
    "name": "Dexterity AI",
    "category": "Warehouse robotics",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Robotic handling systems",
    "website": "https://www.dexterity.ai/",
    "keywords": [
      "warehouse",
      "robot manipulation",
      "logistics"
    ]
  },
  {
    "name": "ABB Robotics",
    "category": "Industrial robotics",
    "country": "Switzerland / Sweden",
    "type": "Public",
    "ticker": "ABBN.SW",
    "robot": "Industrial robots",
    "website": "https://new.abb.com/products/robotics",
    "keywords": [
      "industrial robot",
      "factory automation",
      "cobot"
    ]
  },
  {
    "name": "Altınay Robot Grubu",
    "category": "Industrial Robotics, Factory Automation, Robotic Systems Integration",
    "country": "Türkiye",
    "region": "Europe / Middle East",
    "type": "Private industrial robotics group",
    "ticker": "",
    "robot": "GRASS industrial robot arms, robotic systems, factory automation",
    "website": "https://altinay.com/tr/robot-grubu",
    "focus": "Robotic systems, factory automation, flexible manufacturing technologies",
    "groupCompanies": [
      "Altınay Robot Teknolojileri",
      "GRASS",
      "KSM",
      "Olbricht",
      "Robio"
    ],
    "keyProject": "GRASS",
    "grassFocus": "Domestic industrial robot arms, servo motors, gearboxes, motor drivers",
    "industriesServed": [
      "Automotive",
      "Glass",
      "White goods",
      "Agriculture",
      "Food",
      "General manufacturing"
    ],
    "employees": "300+",
    "countries": "3",
    "locations": "6",
    "operationalArea": "25,000 m²",
    "experience": "30+ years",
    "clients": "150+",
    "deliveredProjects": "500+",
    "exportCountries": "20+",
    "keywords": [
      "Turkish robotics",
      "Türkiye robotics",
      "industrial automation",
      "robot arms",
      "factory automation",
      "robotics sovereignty",
      "GRASS",
      "servo motors",
      "gearboxes",
      "motor drivers",
      "automotive",
      "glass",
      "white goods",
      "agriculture",
      "food",
      "general manufacturing"
    ]
  },
  {
    "name": "AKINROBOTICS",
    "category": "Humanoid Robotics, Service Robots, Industrial Robotics, AI Robotics",
    "country": "Türkiye",
    "city": "Konya",
    "region": "Europe / Middle East",
    "type": "Private robotics company",
    "ticker": "",
    "robot": "ADA series, AKINCI humanoid robots, Service Robot V3, AMR Robot V500, AMR Robot V1000, Industrial Robot Arm 4.2",
    "website": "https://www.akinrobotics.com/",
    "foundedBy": "AKINSOFT",
    "focus": "Humanoid robots, service robots, AMR systems, robotic arms, domestic robotics technologies",
    "positioning": "Turkey's humanoid robotics company",
    "applicationArea": "11,000 m² robotics application area",
    "productionArea": "3,800 m² indoor production area",
    "importantClaims": [
      "World's first humanoid robot factory",
      "Domestic robotics manufacturing",
      "Mass-production humanoid robotics vision"
    ],
    "keywords": [
      "humanoid robotics",
      "Turkish robotics",
      "service robots",
      "robotics factory",
      "physical AI",
      "AKINCI humanoid",
      "ADA robot",
      "AMR Robot V500",
      "AMR Robot V1000",
      "Industrial Robot Arm 4.2",
      "domestic robotics manufacturing",
      "Konya"
    ]
  },
  {
    "name": "ASELSAN",
    "category": "Defense Robotics, Autonomous Systems, Unmanned Systems, AI-enabled Defense Technologies",
    "country": "Türkiye",
    "city": "Ankara",
    "region": "Europe / Middle East",
    "type": "Public defense technology company",
    "ticker": "ASELS.IS",
    "robot": "Unmanned ground systems, autonomous systems, defense robotics, sensor and command-control stacks",
    "website": "https://www.aselsan.com/",
    "focus": "Defense electronics, autonomous systems, unmanned platforms, electro-optics, sensors, command-control systems and robotics-adjacent defense technologies",
    "keywords": [
      "ASELSAN",
      "Turkish robotics",
      "Türkiye robotics",
      "defense robotics",
      "autonomous systems",
      "UGV",
      "unmanned systems",
      "military robotics",
      "robotics sovereignty",
      "physical AI",
      "defense technology"
    ]
  },
  {
    "name": "Milvus Robotics",
    "category": "Autonomous Mobile Robots, Warehouse Robotics, Industrial Automation",
    "country": "Türkiye",
    "city": "Ankara",
    "region": "Europe / Middle East",
    "type": "Private robotics company",
    "ticker": "",
    "robot": "Autonomous mobile robots, AMR platforms, intralogistics and warehouse automation robots",
    "website": "https://milvusrobotics.com/",
    "focus": "Autonomous mobile robots for intralogistics, warehouse automation, flexible manufacturing and industrial transport",
    "keywords": [
      "Milvus Robotics",
      "Turkish robotics",
      "Türkiye robotics",
      "AMR",
      "autonomous mobile robots",
      "warehouse robotics",
      "intralogistics",
      "factory automation",
      "robotics startup",
      "industrial automation"
    ]
  },
  {
    "name": "FANUC",
    "category": "Industrial robotics",
    "country": "Japan",
    "type": "Public",
    "ticker": "6954.T",
    "robot": "Industrial robots",
    "website": "https://www.fanuc.co.jp/en/",
    "keywords": [
      "factory automation",
      "industrial robot",
      "cnc"
    ]
  },
  {
    "name": "KUKA",
    "category": "Industrial robotics",
    "country": "Germany",
    "type": "Subsidiary",
    "ticker": "Midea Group",
    "robot": "Industrial robots",
    "website": "https://www.kuka.com/",
    "keywords": [
      "industrial robot",
      "automation",
      "manufacturing"
    ]
  },
  {
    "name": "Yaskawa Motoman",
    "category": "Industrial robotics",
    "country": "Japan",
    "type": "Public",
    "ticker": "6506.T",
    "robot": "Motoman robots",
    "website": "https://www.motoman.com/",
    "keywords": [
      "industrial robot",
      "welding",
      "automation"
    ]
  },
  {
    "name": "Universal Robots",
    "category": "Collaborative robots",
    "country": "Denmark",
    "type": "Subsidiary",
    "ticker": "Teradyne",
    "robot": "UR cobots",
    "website": "https://www.universal-robots.com/",
    "keywords": [
      "cobot",
      "collaborative robot",
      "automation"
    ]
  },
  {
    "name": "Teradyne Robotics",
    "category": "Collaborative robotics",
    "country": "USA",
    "type": "Public",
    "ticker": "TER",
    "robot": "Universal Robots, MiR",
    "website": "https://www.teradyne.com/",
    "keywords": [
      "cobot",
      "automation",
      "robotics portfolio"
    ]
  },
  {
    "name": "Omron Robotics",
    "category": "Industrial and mobile robotics",
    "country": "Japan",
    "type": "Public",
    "ticker": "6645.T",
    "robot": "Mobile robots, automation",
    "website": "https://automation.omron.com/",
    "keywords": [
      "mobile robot",
      "factory automation"
    ]
  },
  {
    "name": "Epson Robots",
    "category": "Industrial robotics",
    "country": "Japan",
    "type": "Public proxy",
    "ticker": "SEKEY",
    "robot": "SCARA and industrial robots",
    "website": "https://epson.com/robots",
    "keywords": [
      "scara",
      "industrial robot",
      "automation"
    ]
  },
  {
    "name": "Stäubli Robotics",
    "category": "Industrial robotics",
    "country": "Switzerland",
    "type": "Private",
    "ticker": "",
    "robot": "Industrial robots",
    "website": "https://www.staubli.com/",
    "keywords": [
      "industrial robot",
      "cleanroom",
      "automation"
    ]
  },
  {
    "name": "Comau",
    "category": "Industrial robotics",
    "country": "Italy",
    "type": "Private",
    "ticker": "",
    "robot": "Industrial robots",
    "website": "https://www.comau.com/",
    "keywords": [
      "manufacturing",
      "industrial automation"
    ]
  },
  {
    "name": "Nachi Robotics",
    "category": "Industrial robotics",
    "country": "Japan",
    "type": "Public",
    "ticker": "6474.T",
    "robot": "Industrial robots",
    "website": "https://www.nachirobotics.com/",
    "keywords": [
      "industrial robot",
      "welding",
      "automation"
    ]
  },
  {
    "name": "Denso Robotics",
    "category": "Industrial robotics",
    "country": "Japan",
    "type": "Public proxy",
    "ticker": "6902.T",
    "robot": "Small industrial robots",
    "website": "https://www.densorobotics.com/",
    "keywords": [
      "factory robot",
      "automation"
    ]
  },
  {
    "name": "Kawasaki Robotics",
    "category": "Industrial robotics",
    "country": "Japan",
    "type": "Public",
    "ticker": "7012.T",
    "robot": "Industrial robots",
    "website": "https://robotics.kawasaki.com/",
    "keywords": [
      "industrial robot",
      "factory automation"
    ]
  },
  {
    "name": "Doosan Robotics",
    "category": "Collaborative robots",
    "country": "South Korea",
    "type": "Public",
    "ticker": "454910.KS",
    "robot": "Doosan cobots",
    "website": "https://www.doosanrobotics.com/",
    "keywords": [
      "cobot",
      "collaborative robot"
    ]
  },
  {
    "name": "Rainbow Robotics",
    "category": "Humanoid and collaborative robotics",
    "country": "South Korea",
    "type": "Public",
    "ticker": "277810.KQ",
    "robot": "HUBO, collaborative robots",
    "website": "https://www.rainbow-robotics.com/",
    "keywords": [
      "hubo",
      "humanoid",
      "cobot"
    ]
  },
  {
    "name": "Hyundai Robotics",
    "category": "Industrial robotics",
    "country": "South Korea",
    "type": "Public proxy",
    "ticker": "Hyundai",
    "robot": "Industrial robots",
    "website": "https://www.hyundai-robotics.com/",
    "keywords": [
      "industrial robot",
      "automation"
    ]
  },
  {
    "name": "Samsung Electronics",
    "category": "AI devices and consumer robotics",
    "country": "South Korea",
    "type": "Public",
    "ticker": "005930.KS",
    "robot": "Ballie",
    "website": "https://www.samsung.com/",
    "keywords": [
      "ballie",
      "consumer robot",
      "ai device"
    ]
  },
  {
    "name": "LG Electronics",
    "category": "Service and consumer robotics",
    "country": "South Korea",
    "type": "Public",
    "ticker": "066570.KS",
    "robot": "CLOi robots",
    "website": "https://www.lg.com/",
    "keywords": [
      "cloi",
      "service robot",
      "consumer robot"
    ]
  },
  {
    "name": "SoftBank Robotics",
    "category": "Service and social robots",
    "country": "Japan / France",
    "type": "Private",
    "ticker": "",
    "robot": "Pepper, NAO, Whiz",
    "website": "https://www.softbankrobotics.com/",
    "keywords": [
      "pepper",
      "nao",
      "service robot"
    ]
  },
  {
    "name": "PAL Robotics",
    "category": "Humanoid and service robotics",
    "country": "Spain",
    "type": "Private",
    "ticker": "",
    "robot": "TALOS, TIAGo, ARI",
    "website": "https://pal-robotics.com/",
    "keywords": [
      "talos",
      "tiago",
      "research robot"
    ]
  },
  {
    "name": "Robotis",
    "category": "Education and research robotics",
    "country": "South Korea",
    "type": "Public",
    "ticker": "108490.KQ",
    "robot": "Dynamixel, TurtleBot",
    "website": "https://www.robotis.us/",
    "keywords": [
      "dynamixel",
      "education robot",
      "research"
    ]
  },
  {
    "name": "Clearpath Robotics",
    "category": "Research mobile robots",
    "country": "Canada",
    "type": "Subsidiary",
    "ticker": "Rockwell Automation",
    "robot": "Husky, Jackal",
    "website": "https://clearpathrobotics.com/",
    "keywords": [
      "mobile robot",
      "research platform"
    ]
  },
  {
    "name": "OTTO Motors",
    "category": "Autonomous mobile robots",
    "country": "Canada",
    "type": "Subsidiary",
    "ticker": "Rockwell Automation",
    "robot": "OTTO AMRs",
    "website": "https://ottomotors.com/",
    "keywords": [
      "amr",
      "warehouse",
      "mobile robot"
    ]
  },
  {
    "name": "Locus Robotics",
    "category": "Warehouse robotics",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "LocusBots",
    "website": "https://locusrobotics.com/",
    "keywords": [
      "warehouse",
      "amr",
      "fulfillment"
    ]
  },
  {
    "name": "Geekplus",
    "category": "Warehouse robotics",
    "country": "China",
    "type": "Private",
    "ticker": "",
    "robot": "Warehouse AMRs",
    "website": "https://www.geekplus.com/",
    "keywords": [
      "warehouse",
      "amr",
      "logistics"
    ]
  },
  {
    "name": "MiR",
    "category": "Autonomous mobile robots",
    "country": "Denmark",
    "type": "Subsidiary",
    "ticker": "Teradyne",
    "robot": "MiR AMRs",
    "website": "https://mobile-industrial-robots.com/",
    "keywords": [
      "amr",
      "mobile robot",
      "factory"
    ]
  },
  {
    "name": "AutoStore",
    "category": "Warehouse automation",
    "country": "Norway",
    "type": "Public",
    "ticker": "AUTO.OL",
    "robot": "Cube storage robots",
    "website": "https://www.autostoresystem.com/",
    "keywords": [
      "warehouse automation",
      "storage robot"
    ]
  },
  {
    "name": "Symbotic",
    "category": "Warehouse automation",
    "country": "USA",
    "type": "Public",
    "ticker": "SYM",
    "robot": "Warehouse automation system",
    "website": "https://www.symbotic.com/",
    "keywords": [
      "warehouse automation",
      "robotics"
    ]
  },
  {
    "name": "Ocado Technology",
    "category": "Grocery warehouse robotics",
    "country": "United Kingdom",
    "type": "Public proxy",
    "ticker": "OCDO.L",
    "robot": "Automated grid robots",
    "website": "https://www.ocadogroup.com/technology/",
    "keywords": [
      "warehouse grid",
      "grocery robotics"
    ]
  },
  {
    "name": "Exotec",
    "category": "Warehouse robotics",
    "country": "France",
    "type": "Private",
    "ticker": "",
    "robot": "Skypod",
    "website": "https://www.exotec.com/",
    "keywords": [
      "skypod",
      "warehouse",
      "amr"
    ]
  },
  {
    "name": "Berkshire Grey",
    "category": "Warehouse robotics",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Robotic picking systems",
    "website": "https://www.berkshiregrey.com/",
    "keywords": [
      "warehouse picking",
      "automation"
    ]
  },
  {
    "name": "RightHand Robotics",
    "category": "Robotic picking",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "RightPick",
    "website": "https://righthandrobotics.com/",
    "keywords": [
      "picking robot",
      "warehouse"
    ]
  },
  {
    "name": "Ambi Robotics",
    "category": "AI parcel sorting robotics",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "AmbiSort",
    "website": "https://www.ambirobotics.com/",
    "keywords": [
      "parcel sorting",
      "warehouse ai"
    ]
  },
  {
    "name": "Plus One Robotics",
    "category": "Warehouse vision robotics",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Parcel handling robots",
    "website": "https://www.plusonerobotics.com/",
    "keywords": [
      "vision robot",
      "warehouse"
    ]
  },
  {
    "name": "GreyOrange",
    "category": "Warehouse robotics",
    "country": "USA / India",
    "type": "Private",
    "ticker": "",
    "robot": "GreyMatter, Ranger",
    "website": "https://www.greyorange.com/",
    "keywords": [
      "warehouse",
      "fulfillment",
      "robot fleet"
    ]
  },
  {
    "name": "Seegrid",
    "category": "Autonomous mobile robots",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Palion AMRs",
    "website": "https://seegrid.com/",
    "keywords": [
      "amr",
      "warehouse",
      "manufacturing"
    ]
  },
  {
    "name": "Vecna Robotics",
    "category": "Autonomous mobile robots",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Forklift AMRs",
    "website": "https://www.vecnarobotics.com/",
    "keywords": [
      "amr",
      "forklift",
      "warehouse"
    ]
  },
  {
    "name": "Burro",
    "category": "Agricultural and outdoor robotics",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Burro autonomous platform",
    "website": "https://burro.ai/",
    "keywords": [
      "agriculture",
      "outdoor robot",
      "autonomous cart"
    ]
  },
  {
    "name": "Monarch Tractor",
    "category": "Autonomous agriculture",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "MK-V tractor",
    "website": "https://www.monarchtractor.com/",
    "keywords": [
      "autonomous tractor",
      "agtech"
    ]
  },
  {
    "name": "Naïo Technologies",
    "category": "Agricultural robotics",
    "country": "France",
    "type": "Private",
    "ticker": "",
    "robot": "Oz, Orio",
    "website": "https://www.naio-technologies.com/",
    "keywords": [
      "agriculture robot",
      "weeding"
    ]
  },
  {
    "name": "Carbon Robotics",
    "category": "Agricultural robotics",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "LaserWeeder",
    "website": "https://carbonrobotics.com/",
    "keywords": [
      "laser weeding",
      "agriculture"
    ]
  },
  {
    "name": "Blue River Technology",
    "category": "Agricultural robotics",
    "country": "USA",
    "type": "Subsidiary",
    "ticker": "Deere",
    "robot": "See & Spray",
    "website": "https://bluerivertechnology.com/",
    "keywords": [
      "agtech",
      "computer vision",
      "deere"
    ]
  },
  {
    "name": "John Deere",
    "category": "Autonomous agriculture",
    "country": "USA",
    "type": "Public",
    "ticker": "DE",
    "robot": "Autonomous tractor",
    "website": "https://www.deere.com/",
    "keywords": [
      "autonomous tractor",
      "agriculture"
    ]
  },
  {
    "name": "Intuitive Surgical",
    "category": "Surgical robotics",
    "country": "USA",
    "type": "Public",
    "ticker": "ISRG",
    "robot": "da Vinci",
    "website": "https://www.intuitive.com/",
    "keywords": [
      "surgical robot",
      "medical robotics"
    ]
  },
  {
    "name": "Stryker",
    "category": "Medical robotics",
    "country": "USA",
    "type": "Public",
    "ticker": "SYK",
    "robot": "Mako",
    "website": "https://www.stryker.com/",
    "keywords": [
      "surgical robot",
      "orthopedics"
    ]
  },
  {
    "name": "Medtronic",
    "category": "Medical robotics",
    "country": "Ireland / USA",
    "type": "Public",
    "ticker": "MDT",
    "robot": "Hugo RAS",
    "website": "https://www.medtronic.com/",
    "keywords": [
      "surgical robot",
      "medical device"
    ]
  },
  {
    "name": "CMR Surgical",
    "category": "Surgical robotics",
    "country": "United Kingdom",
    "type": "Private",
    "ticker": "",
    "robot": "Versius",
    "website": "https://cmrsurgical.com/",
    "keywords": [
      "surgical robot",
      "medical robotics"
    ]
  },
  {
    "name": "Vicarious Surgical",
    "category": "Surgical robotics",
    "country": "USA",
    "type": "Public",
    "ticker": "RBOT",
    "robot": "Surgical robot",
    "website": "https://www.vicarioussurgical.com/",
    "keywords": [
      "surgical robot",
      "minimally invasive"
    ]
  },
  {
    "name": "Asensus Surgical",
    "category": "Surgical robotics",
    "country": "USA",
    "type": "Public",
    "ticker": "ASXC",
    "robot": "Senhance",
    "website": "https://www.asensus.com/",
    "keywords": [
      "surgical robot",
      "medical"
    ]
  },
  {
    "name": "ReWalk Robotics",
    "category": "Exoskeleton robotics",
    "country": "Israel / USA",
    "type": "Public",
    "ticker": "LFWD",
    "robot": "ReWalk exoskeleton",
    "website": "https://rewalk.com/",
    "keywords": [
      "exoskeleton",
      "rehabilitation"
    ]
  },
  {
    "name": "Cyberdyne",
    "category": "Exoskeleton and medical robotics",
    "country": "Japan",
    "type": "Public",
    "ticker": "7779.T",
    "robot": "HAL",
    "website": "https://www.cyberdyne.jp/english/",
    "keywords": [
      "exoskeleton",
      "hal",
      "medical robot"
    ]
  },
  {
    "name": "Ekso Bionics",
    "category": "Exoskeleton robotics",
    "country": "USA",
    "type": "Public",
    "ticker": "EKSO",
    "robot": "EksoNR",
    "website": "https://eksobionics.com/",
    "keywords": [
      "exoskeleton",
      "rehabilitation"
    ]
  },
  {
    "name": "iRobot",
    "category": "Consumer robotics",
    "country": "USA",
    "type": "Public",
    "ticker": "IRBT",
    "robot": "Roomba",
    "website": "https://www.irobot.com/",
    "keywords": [
      "roomba",
      "consumer robot",
      "vacuum"
    ]
  },
  {
    "name": "Roborock",
    "category": "Consumer robotics",
    "country": "China",
    "type": "Public",
    "ticker": "688169.SS",
    "robot": "Robot vacuums",
    "website": "https://global.roborock.com/",
    "keywords": [
      "robot vacuum",
      "consumer robot"
    ]
  },
  {
    "name": "Ecovacs Robotics",
    "category": "Consumer robotics",
    "country": "China",
    "type": "Public",
    "ticker": "603486.SS",
    "robot": "Deebot",
    "website": "https://www.ecovacs.com/",
    "keywords": [
      "robot vacuum",
      "consumer robot"
    ]
  },
  {
    "name": "DJI",
    "category": "Drones and robotics",
    "country": "China",
    "type": "Private",
    "ticker": "",
    "robot": "Drones, RoboMaster",
    "website": "https://www.dji.com/",
    "keywords": [
      "drone",
      "robotics",
      "consumer robot"
    ]
  },
  {
    "name": "Skydio",
    "category": "Autonomous drones",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Autonomous drones",
    "website": "https://www.skydio.com/",
    "keywords": [
      "drone",
      "autonomy",
      "inspection"
    ]
  },
  {
    "name": "Zipline",
    "category": "Autonomous delivery drones",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Delivery drones",
    "website": "https://www.flyzipline.com/",
    "keywords": [
      "drone delivery",
      "logistics"
    ]
  },
  {
    "name": "Wing",
    "category": "Drone delivery",
    "country": "USA",
    "type": "Alphabet subsidiary",
    "ticker": "GOOGL",
    "robot": "Delivery drones",
    "website": "https://wing.com/",
    "keywords": [
      "drone delivery",
      "alphabet"
    ]
  },
  {
    "name": "Starship Technologies",
    "category": "Autonomous delivery robots",
    "country": "USA / Estonia",
    "type": "Private",
    "ticker": "",
    "robot": "Sidewalk delivery robots",
    "website": "https://www.starship.xyz/",
    "keywords": [
      "delivery robot",
      "sidewalk"
    ]
  },
  {
    "name": "Serve Robotics",
    "category": "Autonomous delivery robots",
    "country": "USA",
    "type": "Public",
    "ticker": "SERV",
    "robot": "Sidewalk delivery robots",
    "website": "https://www.serverobotics.com/",
    "keywords": [
      "delivery robot",
      "sidewalk",
      "autonomy"
    ]
  },
  {
    "name": "Nuro",
    "category": "Autonomous delivery vehicles",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Autonomous delivery vehicle",
    "website": "https://www.nuro.ai/",
    "keywords": [
      "delivery vehicle",
      "autonomous"
    ]
  },
  {
    "name": "Waymo",
    "category": "Autonomous driving",
    "country": "USA",
    "type": "Alphabet subsidiary",
    "ticker": "GOOGL",
    "robot": "Robotaxi",
    "website": "https://waymo.com/",
    "keywords": [
      "robotaxi",
      "autonomous vehicle"
    ]
  },
  {
    "name": "Zoox",
    "category": "Autonomous mobility",
    "country": "USA",
    "type": "Amazon subsidiary",
    "ticker": "AMZN",
    "robot": "Robotaxi",
    "website": "https://zoox.com/",
    "keywords": [
      "robotaxi",
      "autonomous vehicle"
    ]
  },
  {
    "name": "Aurora",
    "category": "Autonomous driving",
    "country": "USA",
    "type": "Public",
    "ticker": "AUR",
    "robot": "Autonomous trucking",
    "website": "https://aurora.tech/",
    "keywords": [
      "autonomous trucking",
      "self driving"
    ]
  },
  {
    "name": "Motional",
    "category": "Autonomous mobility",
    "country": "USA / South Korea",
    "type": "Joint venture",
    "ticker": "Hyundai / Aptiv",
    "robot": "Robotaxi technology",
    "website": "https://motional.com/",
    "keywords": [
      "robotaxi",
      "autonomous driving"
    ]
  },
  {
    "name": "Rethink Robotics",
    "category": "Collaborative robotics",
    "country": "Germany / USA",
    "type": "Private",
    "ticker": "",
    "robot": "Sawyer, Baxter legacy",
    "website": "https://www.rethinkrobotics.com/",
    "keywords": [
      "cobot",
      "sawyer",
      "baxter"
    ]
  },
  {
    "name": "PickNik Robotics",
    "category": "Robot software",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "MoveIt Pro",
    "website": "https://picknik.ai/",
    "keywords": [
      "robot software",
      "moveit",
      "manipulation"
    ]
  },
  {
    "name": "Intrinsic",
    "category": "Industrial robotics software",
    "country": "USA",
    "type": "Alphabet subsidiary",
    "ticker": "GOOGL",
    "robot": "Robotics software platform",
    "website": "https://www.intrinsic.ai/",
    "keywords": [
      "robot software",
      "industrial automation"
    ]
  },
  {
    "name": "Wandelbots",
    "category": "Robot programming software",
    "country": "Germany",
    "type": "Private",
    "ticker": "",
    "robot": "Robot programming tools",
    "website": "https://www.wandelbots.com/",
    "keywords": [
      "robot programming",
      "automation software"
    ]
  },
  {
    "name": "Vention",
    "category": "Factory automation platform",
    "country": "Canada",
    "type": "Private",
    "ticker": "",
    "robot": "Modular automation",
    "website": "https://vention.io/",
    "keywords": [
      "factory automation",
      "robot cells"
    ]
  },
  {
    "name": "Realtime Robotics",
    "category": "Robot motion planning",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Motion planning platform",
    "website": "https://rtr.ai/",
    "keywords": [
      "motion planning",
      "industrial robots"
    ]
  },
  {
    "name": "Formant",
    "category": "Robot fleet management",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Robot operations platform",
    "website": "https://formant.io/",
    "keywords": [
      "robot fleet",
      "robot operations"
    ]
  },
  {
    "name": "Foxglove",
    "category": "Robotics observability",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Robotics data tools",
    "website": "https://foxglove.dev/",
    "keywords": [
      "robot data",
      "observability",
      "ros"
    ]
  },
  {
    "name": "RoboDK",
    "category": "Robot simulation and offline programming",
    "country": "Canada",
    "type": "Private",
    "ticker": "",
    "robot": "Simulation software",
    "website": "https://robodk.com/",
    "keywords": [
      "robot simulation",
      "offline programming"
    ]
  },
  {
    "name": "Open Robotics",
    "category": "Open-source robotics software",
    "country": "USA",
    "type": "Nonprofit / ecosystem",
    "ticker": "",
    "robot": "ROS, Gazebo",
    "website": "https://www.openrobotics.org/",
    "keywords": [
      "ros",
      "gazebo",
      "open source"
    ]
  },
  {
    "name": "ANYbotics",
    "category": "Industrial inspection robots",
    "country": "Switzerland",
    "type": "Private",
    "ticker": "",
    "robot": "ANYmal",
    "website": "https://www.anybotics.com/",
    "keywords": [
      "inspection robot",
      "quadruped"
    ]
  },
  {
    "name": "Ghost Robotics",
    "category": "Quadruped robots",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Vision 60",
    "website": "https://www.ghostrobotics.io/",
    "keywords": [
      "quadruped",
      "defense",
      "inspection"
    ]
  },
  {
    "name": "ANYmal Research / ETH Zurich",
    "category": "Robotics research",
    "country": "Switzerland",
    "type": "Academic ecosystem",
    "ticker": "",
    "robot": "Legged robotics research",
    "website": "https://rsl.ethz.ch/",
    "keywords": [
      "legged robotics",
      "research"
    ]
  },
  {
    "name": "Swiss-Mile",
    "category": "Wheeled-legged robots",
    "country": "Switzerland",
    "type": "Private",
    "ticker": "",
    "robot": "Wheeled quadruped",
    "website": "https://www.swiss-mile.com/",
    "keywords": [
      "wheeled robot",
      "inspection"
    ]
  },
  {
    "name": "Telerob",
    "category": "Defense and hazardous environment robots",
    "country": "Germany",
    "type": "Subsidiary",
    "ticker": "",
    "robot": "tEODor",
    "website": "https://www.telerob.com/",
    "keywords": [
      "eod robot",
      "defense robot"
    ]
  },
  {
    "name": "Teledyne FLIR",
    "category": "Defense and inspection robots",
    "country": "USA",
    "type": "Public proxy",
    "ticker": "TDY",
    "robot": "PackBot, Kobra",
    "website": "https://www.flir.com/",
    "keywords": [
      "defense robot",
      "inspection"
    ]
  },
  {
    "name": "Milrem Robotics",
    "category": "Autonomous ground vehicles",
    "country": "Estonia",
    "type": "Private",
    "ticker": "",
    "robot": "THeMIS",
    "website": "https://milremrobotics.com/",
    "keywords": [
      "ugv",
      "autonomous ground vehicle"
    ]
  },
  {
    "name": "Anduril Industries",
    "category": "Autonomous defense systems",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Autonomous systems",
    "website": "https://www.anduril.com/",
    "keywords": [
      "defense autonomy",
      "robotics"
    ]
  },
  {
    "name": "Shield AI",
    "category": "Autonomous defense drones",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "V-BAT, Hivemind",
    "website": "https://shield.ai/",
    "keywords": [
      "drone",
      "autonomy",
      "defense"
    ]
  },
  {
    "name": "Saronic",
    "category": "Autonomous maritime vessels",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Autonomous surface vessels",
    "website": "https://www.saronic.com/",
    "keywords": [
      "maritime robot",
      "autonomous vessel"
    ]
  },
  {
    "name": "Ocean Infinity",
    "category": "Marine robotics",
    "country": "USA / UK",
    "type": "Private",
    "ticker": "",
    "robot": "Autonomous marine fleet",
    "website": "https://oceaninfinity.com/",
    "keywords": [
      "marine robotics",
      "autonomous vessel"
    ]
  },
  {
    "name": "Saildrone",
    "category": "Autonomous maritime robots",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Saildrone USVs",
    "website": "https://www.saildrone.com/",
    "keywords": [
      "ocean robot",
      "usv",
      "marine data"
    ]
  },
  {
    "name": "Blue Robotics",
    "category": "Marine robotics components",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "ROV components",
    "website": "https://bluerobotics.com/",
    "keywords": [
      "rov",
      "marine robotics"
    ]
  },
  {
    "name": "OpenAI",
    "category": "Frontier AI",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "AI models",
    "website": "https://openai.com/",
    "keywords": [
      "chatgpt",
      "gpt",
      "ai lab"
    ]
  },
  {
    "name": "Anthropic",
    "category": "Frontier AI",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Claude",
    "website": "https://www.anthropic.com/",
    "keywords": [
      "claude",
      "ai safety",
      "frontier ai"
    ]
  },
  {
    "name": "xAI",
    "category": "Frontier AI",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Grok",
    "website": "https://x.ai/",
    "keywords": [
      "grok",
      "frontier ai"
    ]
  },
  {
    "name": "Mistral AI",
    "category": "AI models",
    "country": "France",
    "type": "Private",
    "ticker": "",
    "robot": "AI models",
    "website": "https://mistral.ai/",
    "keywords": [
      "open models",
      "ai lab",
      "europe"
    ]
  },
  {
    "name": "Cohere",
    "category": "Enterprise AI models",
    "country": "Canada",
    "type": "Private",
    "ticker": "",
    "robot": "AI models",
    "website": "https://cohere.com/",
    "keywords": [
      "enterprise ai",
      "language models"
    ]
  },
  {
    "name": "Hugging Face",
    "category": "AI platform",
    "country": "USA / France",
    "type": "Private",
    "ticker": "",
    "robot": "AI model hub",
    "website": "https://huggingface.co/",
    "keywords": [
      "model hub",
      "open source ai"
    ]
  },
  {
    "name": "Perplexity AI",
    "category": "AI search",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "AI answer engine",
    "website": "https://www.perplexity.ai/",
    "keywords": [
      "ai search",
      "answer engine"
    ]
  },
  {
    "name": "Runway",
    "category": "Generative video AI",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "AI video tools",
    "website": "https://runwayml.com/",
    "keywords": [
      "video ai",
      "creative ai"
    ]
  },
  {
    "name": "ElevenLabs",
    "category": "AI audio",
    "country": "USA / UK",
    "type": "Private",
    "ticker": "",
    "robot": "Voice AI",
    "website": "https://elevenlabs.io/",
    "keywords": [
      "voice ai",
      "audio generation"
    ]
  },
  {
    "name": "Stability AI",
    "category": "Generative AI",
    "country": "United Kingdom",
    "type": "Private",
    "ticker": "",
    "robot": "Image models",
    "website": "https://stability.ai/",
    "keywords": [
      "image generation",
      "stable diffusion"
    ]
  },
  {
    "name": "Character.AI",
    "category": "AI companions",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Character AI",
    "website": "https://character.ai/",
    "keywords": [
      "chatbots",
      "ai companions"
    ]
  },
  {
    "name": "Databricks",
    "category": "Data and AI platform",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Data intelligence platform",
    "website": "https://www.databricks.com/",
    "keywords": [
      "data platform",
      "ai infrastructure"
    ]
  },
  {
    "name": "Scale AI",
    "category": "AI data platform",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Data platform",
    "website": "https://scale.com/",
    "keywords": [
      "data labeling",
      "ai data"
    ]
  },
  {
    "name": "CoreWeave",
    "category": "AI cloud infrastructure",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "AI cloud",
    "website": "https://www.coreweave.com/",
    "keywords": [
      "gpu cloud",
      "ai infrastructure"
    ]
  },
  {
    "name": "Cerebras",
    "category": "AI chips and systems",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "AI compute systems",
    "website": "https://www.cerebras.ai/",
    "keywords": [
      "ai chip",
      "compute"
    ]
  },
  {
    "name": "Groq",
    "category": "AI inference chips",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "LPU inference",
    "website": "https://groq.com/",
    "keywords": [
      "ai chip",
      "inference"
    ]
  },
  {
    "name": "SambaNova Systems",
    "category": "AI chips and platforms",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "AI compute platform",
    "website": "https://sambanova.ai/",
    "keywords": [
      "ai chip",
      "enterprise ai"
    ]
  },
  {
    "name": "Graphcore",
    "category": "AI chips",
    "country": "United Kingdom",
    "type": "Private",
    "ticker": "",
    "robot": "IPU systems",
    "website": "https://www.graphcore.ai/",
    "keywords": [
      "ai chip",
      "ipu"
    ]
  },
  {
    "name": "Cognex",
    "category": "Machine vision",
    "country": "USA",
    "type": "Public",
    "ticker": "CGNX",
    "robot": "Vision systems",
    "website": "https://www.cognex.com/",
    "keywords": [
      "machine vision",
      "factory automation"
    ]
  },
  {
    "name": "Keyence",
    "category": "Sensors and machine vision",
    "country": "Japan",
    "type": "Public",
    "ticker": "6861.T",
    "robot": "Automation sensors",
    "website": "https://www.keyence.com/",
    "keywords": [
      "sensors",
      "machine vision",
      "automation"
    ]
  },
  {
    "name": "Rockwell Automation",
    "category": "Industrial automation",
    "country": "USA",
    "type": "Public",
    "ticker": "ROK",
    "robot": "Factory automation",
    "website": "https://www.rockwellautomation.com/",
    "keywords": [
      "industrial automation",
      "factory"
    ]
  },
  {
    "name": "Siemens",
    "category": "Industrial automation and AI",
    "country": "Germany",
    "type": "Public",
    "ticker": "SIE.DE",
    "robot": "Factory automation",
    "website": "https://www.siemens.com/",
    "keywords": [
      "industrial automation",
      "digital twin"
    ]
  },
  {
    "name": "Schneider Electric",
    "category": "Industrial automation",
    "country": "France",
    "type": "Public",
    "ticker": "SU.PA",
    "robot": "Automation systems",
    "website": "https://www.se.com/",
    "keywords": [
      "automation",
      "energy"
    ]
  },
  {
    "name": "Mitsubishi Electric",
    "category": "Industrial automation",
    "country": "Japan",
    "type": "Public",
    "ticker": "6503.T",
    "robot": "Industrial robots",
    "website": "https://www.mitsubishielectric.com/fa/",
    "keywords": [
      "factory automation",
      "industrial robot"
    ]
  },
  {
    "name": "Asimov",
    "category": "Open-source humanoid robotics",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Asimov humanoid, Asimov OS",
    "website": "https://asimov.inc/",
    "keywords": [
      "humanoid",
      "open source",
      "robot operating system",
      "developer platform"
    ]
  },
  {
    "name": "Galbot",
    "category": "Embodied AI and humanoid robotics",
    "country": "China",
    "type": "Private",
    "ticker": "",
    "robot": "Galbot G1, Galbot S1",
    "website": "https://www.galbot.com/",
    "logo": "https://www.galbot.com/assets/logojing.1_QVWmWl.png",
    "keywords": [
      "humanoid",
      "embodied ai",
      "industrial heavy-load robot",
      "pick and place",
      "vla",
      "galbot g1",
      "galbot s1"
    ]
  },
  {
    "name": "RIVR",
    "category": "Physical AI delivery robotics",
    "country": "Switzerland",
    "type": "Private",
    "ticker": "",
    "robot": "Wheeled-legged delivery robots",
    "website": "https://www.rivr.ai/",
    "keywords": [
      "doorstep delivery",
      "last mile",
      "physical ai",
      "wheeled legged"
    ]
  },
  {
    "name": "Fauna Robotics",
    "category": "Humanoid robotics development platforms",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Sprout",
    "website": "https://faunarobotics.com/",
    "keywords": [
      "sprout",
      "soft humanoid",
      "developer robot",
      "research platform"
    ]
  },
  {
    "name": "EngineAI",
    "category": "Humanoid robotics",
    "country": "China",
    "type": "Private",
    "ticker": "",
    "robot": "PM01, SE01",
    "website": "https://en.engineai.com.cn/",
    "keywords": [
      "pm01",
      "humanoid",
      "developer platform",
      "open source"
    ]
  },
  {
    "name": "Foundry Robotics",
    "category": "AI-first manufacturing robotics",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Autonomous robotic cells",
    "website": "https://foundryrobotics.ai/",
    "keywords": [
      "manufacturing",
      "assembly",
      "autonomous cells",
      "dual use robotics"
    ]
  },
  {
    "name": "FieldAI",
    "category": "Robot autonomy and physical AI",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "EDGE, Field Foundation Models",
    "website": "https://www.fieldai.com/",
    "keywords": [
      "robot brain",
      "autonomy",
      "field foundation models",
      "industrial robots"
    ]
  },
  {
    "name": "Reflex Robotics",
    "category": "Warehouse and factory humanoids",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Reflex Robot",
    "website": "https://www.reflexrobotics.com/",
    "keywords": [
      "humanoid",
      "warehouse",
      "factory",
      "teleoperation"
    ]
  },
  {
    "name": "Sunday Robotics",
    "category": "Home robotics",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Memo",
    "website": "https://www.sunday.ai/",
    "keywords": [
      "home robot",
      "memo",
      "household robot",
      "skill capture"
    ]
  },
  {
    "name": "Noble Machines",
    "category": "Industrial general-purpose robots",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "General-purpose industrial robot",
    "website": "https://www.noblemachines.ai/",
    "keywords": [
      "industrial humanoid",
      "general purpose robot",
      "material handling",
      "inspection"
    ]
  },
  {
    "name": "Booster Robotics",
    "category": "Humanoid robotics development platforms",
    "country": "China",
    "type": "Private",
    "ticker": "",
    "robot": "Booster T1, Booster K1",
    "website": "https://www.booster.tech/",
    "keywords": [
      "humanoid",
      "developer platform",
      "robocup",
      "education"
    ]
  },
  {
    "name": "AgiBot",
    "category": "Embodied AI and humanoid robotics",
    "country": "China",
    "type": "Private",
    "ticker": "",
    "robot": "AgiBot A2, G1, X2, X1",
    "website": "https://www.agibot.com/",
    "keywords": [
      "humanoid",
      "embodied ai",
      "mass production",
      "agibot world"
    ]
  },
  {
    "name": "LimX Dynamics",
    "category": "General-purpose humanoid robotics",
    "country": "China",
    "type": "Private",
    "ticker": "",
    "robot": "LimX Oli, TRON 1, TRON 2",
    "website": "https://www.limxdynamics.com/en",
    "keywords": [
      "humanoid",
      "physical ai",
      "agentic os",
      "tron"
    ]
  },
  {
    "name": "Leju Robotics",
    "category": "Humanoid robotics",
    "country": "China",
    "type": "Private",
    "ticker": "",
    "robot": "KUAVO 4Pro, KUAVO 5",
    "website": "https://www.lejurobot.com/en",
    "keywords": [
      "kuavo",
      "humanoid",
      "industrial manufacturing",
      "teleoperation"
    ]
  },
  {
    "name": "Pudu Robotics",
    "category": "Service and humanoid robotics",
    "country": "China",
    "type": "Private",
    "ticker": "",
    "robot": "PUDU D9, D7, service robots",
    "website": "https://www.pudurobotics.com/",
    "keywords": [
      "service robot",
      "humanoid",
      "d9",
      "commercial robotics"
    ]
  },
  {
    "name": "MagicLab",
    "category": "General-purpose humanoid robotics",
    "country": "China",
    "type": "Private",
    "ticker": "",
    "robot": "MagicBot Gen1",
    "website": "https://www.magiclab.top/en/human",
    "keywords": [
      "magicbot",
      "humanoid",
      "multi robot collaboration",
      "industrial"
    ]
  },
  {
    "name": "X-Humanoid",
    "category": "Humanoid robotics, embodied AI, general-purpose robot platforms",
    "country": "China",
    "type": "Private / research-commercial ecosystem",
    "ticker": "",
    "robot": "Embodied Tien Kung 3.0",
    "website": "https://www.x-humanoid.com/",
    "keywords": [
      "x-humanoid",
      "tien kung",
      "embodied ai",
      "humanoid",
      "wise kaiwu",
      "china"
    ]
  },
  {
    "name": "WIRobotics",
    "category": "Wearable Robotics / Mobility Robotics",
    "country": "South Korea",
    "type": "Private",
    "ticker": "",
    "robot": "WIM, WIM S, WIM KIDS, ALLEX, WIBS",
    "website": "https://www.wirobotics.com",
    "focus": "Wearable walking-assist robots, gait training, mobility support, and human-responsive robotics",
    "sourceLinks": [
      "https://www.wirobotics.com/product/wimInfo",
      "https://corp.wirobotics.com/en/product/wim-s",
      "https://www.wirobotics.com/media/newsDetail?idx=75&page=1&pageType=01"
    ],
    "keywords": [
      "wirobotics",
      "wim",
      "wim s",
      "wim kids",
      "allex",
      "wibs",
      "wearable robot",
      "walking assist",
      "gait training",
      "mobility robotics",
      "exoskeleton"
    ]
  },
  {
    "name": "DEEP Robotics",
    "category": "Quadruped Robotics / Industrial Robotics / Embodied AI",
    "country": "China",
    "type": "Private",
    "ticker": "",
    "robot": "Lite3, Lite3 Pro, Lite3 LIDAR, X20, X30, X30 Pro, LYNX, LYNX M20, DR01, DR02",
    "website": "https://www.deeprobotics.cn/",
    "focus": "Industrial robot dogs, quadruped robots, inspection robotics, wheeled quadrupeds, humanoids, and embodied AI mobility systems",
    "sourceLinks": [
      "https://www.deeprobotics.cn/en/index/lite3.html",
      "https://www.deeprobotics.cn/en/index/product.html",
      "https://www.deeprobotics.cn/en/index/product3.html",
      "https://www.deeprobotics.cn/en/index/lynx.html",
      "https://www.deeprobotics.cn/en/index/humanoid.html",
      "https://www.deeprobotics.cn/en/index/dr02.html"
    ],
    "keywords": [
      "deep robotics",
      "deeprobotics",
      "lite3",
      "x20",
      "x30",
      "x30 pro",
      "lynx",
      "lynx m20",
      "dr01",
      "dr02",
      "quadruped",
      "robot dog",
      "wheeled quadruped",
      "humanoid",
      "inspection robot",
      "embodied ai"
    ]
  },
  {
    "name": "OpenMind",
    "category": "Embodied AI and humanoid robotics",
    "country": "USA",
    "type": "Private",
    "ticker": "",
    "robot": "Future humanoid platform",
    "website": "https://www.openmind.org/",
    "image": "../assets/robots/openmind-new.png",
    "logo": "../assets/robots/openmind-new.png",
    "keywords": [
      "openmind",
      "embodied ai",
      "humanoid",
      "physical ai",
      "robotics"
    ]
  }
];

const signalFallback = [
  {
    "date": "2026-05-15",
    "type": "Research Signal",
    "title": "Video Friday: Heavy Robotic Machinery Operates Itself",
    "company": "Robotics ecosystem",
    "robot": "Robotics ecosystem",
    "category": "Robotics research",
    "country": "Global",
    "impact": "High",
    "summary": "Video Friday is your weekly selection of awesome robotics videos, collected by your friends at IEEE Spectrum robotics. We also post a weekly calendar of upcoming robotics events for the next few months. Please send us your events for inclusion. ICRA 2026 : 1–5",
    "source": "https://spectrum.ieee.org/video-friday-material-handling-robots",
    "relatedUrl": "signals.html",
    "sourceType": "automated"
  },
  {
    "date": "2026-05-13",
    "type": "Robotics Startup Signal",
    "title": "Rivian spinoff Mind Robotics raises another $400M",
    "company": "Robotics ecosystem",
    "robot": "Robotics ecosystem",
    "category": "Robotics startups and market movement",
    "country": "Global",
    "impact": "Medium",
    "summary": "Mind Robotics, which was first revealed in late 2025, has now raised more than $1 billion to date.",
    "source": "https://techcrunch.com/2026/05/13/rivian-spinoff-mind-robotics-raises-another-400m/",
    "relatedUrl": "signals.html",
    "sourceType": "automated"
  },
  {
    "date": "2026-05-12",
    "type": "Research Signal",
    "title": "Hello Robot Sets the Standard for Practical, Safe Home Robots",
    "company": "Robotics ecosystem",
    "robot": "Robotics ecosystem",
    "category": "Robotics research",
    "country": "Global",
    "impact": "High",
    "summary": "Many roboticists (and at least one robotics journalist) have been seduced by the dream of a robot butler. And the rampant popularity of videos showing humanoid robots doing household tasks in improbably clean kitchens and unrealistically tidy bedrooms suggests",
    "source": "https://spectrum.ieee.org/stretch-4-home-robot",
    "relatedUrl": "signals.html",
    "sourceType": "automated"
  },
  {
    "date": "2026-05-12",
    "type": "Robotics News",
    "title": "SAP und Cyberwave setzen vollständig autonome, KI-gestützte Roboter in einem realen SAP-Logistiklager ein",
    "company": "Robotics ecosystem",
    "robot": "Robotics ecosystem",
    "category": "Robotics intelligence",
    "country": "Global",
    "impact": "Medium",
    "summary": "WALLDORF, Deutschland, 11. Mai 2026 /PRNewswire/ -- SAP SE (NYSE: SAP), der weltweit führende Anbieter von Unternehmensanwendungssoftware, und Cyberwave, ein auf KI-Robotik-Software spezialisiertes Unternehmen, gaben heute den erfolgreichen Einsatz vollautonom",
    "source": "https://www.prnewswire.com/news-releases/sap-und-cyberwave-setzen-vollstandig-autonome-ki-gestutzte-roboter-in-einem-realen-sap-logistiklager-ein-302768875.html",
    "relatedUrl": "signals.html",
    "sourceType": "automated"
  },
  {
    "date": "2026-05-12",
    "type": "Robotics News",
    "title": "SAP y Cyberwave implementan robots totalmente autónomos con inteligencia artificial",
    "company": "Robotics ecosystem",
    "robot": "Robotics ecosystem",
    "category": "Robotics intelligence",
    "country": "Global",
    "impact": "Medium",
    "summary": "-SAP y Cyberwave implementan robots totalmente autónomos con inteligencia artificial en un almacén logístico SAP en funcionamiento WALLDORF, Alemania, 11 de mayo de 2026 /PRNewswire/ -- SAP SE (NYSE: SAP), líder mundial en software de aplicaciones empresariale",
    "source": "https://www.prnewswire.com/news-releases/sap-y-cyberwave-implementan-robots-totalmente-autonomos-con-inteligencia-artificial-302768860.html",
    "relatedUrl": "signals.html",
    "sourceType": "automated"
  },
  {
    "date": "2026-05-11",
    "type": "Robotics Startup Signal",
    "title": "Korea&#8217;s biggest manufacturers back Config, the TSMC of robot data",
    "company": "Robotics ecosystem",
    "robot": "Robotics ecosystem",
    "category": "Robotics startups and market movement",
    "country": "Global",
    "impact": "Medium",
    "summary": "Instead of building robots themselves, the team is focused on a simpler goal — providing data that robots need to learn and operate. They believe that better data will be key to making robots more useful.",
    "source": "https://techcrunch.com/2026/05/11/koreas-biggest-manufacturers-back-config-the-tsmc-of-robot-data/",
    "relatedUrl": "signals.html",
    "sourceType": "automated"
  },
  {
    "date": "2026-05-09",
    "type": "Research Signal",
    "title": "Video Friday: AI Gives Robot Hands Humanlike Dexterity",
    "company": "Robotics ecosystem",
    "robot": "Robotics ecosystem",
    "category": "Robotics research",
    "country": "Global",
    "impact": "High",
    "summary": "Video Friday is your weekly selection of awesome robotics videos, collected by your friends at IEEE Spectrum robotics. We also post a weekly calendar of upcoming robotics events for the next few months. Please send us your events for inclusion. ICRA 2026 : 1–5",
    "source": "https://spectrum.ieee.org/video-friday-robotic-hand-dexterity",
    "relatedUrl": "signals.html",
    "sourceType": "automated"
  },
  {
    "date": "2026-05-09",
    "type": "Research Signal",
    "title": "Video Friday: AI Gives Robot Hands Human-Like Dexterity",
    "company": "Robotics ecosystem",
    "robot": "Robotics ecosystem",
    "category": "Robotics research",
    "country": "Global",
    "impact": "High",
    "summary": "Video Friday is your weekly selection of awesome robotics videos, collected by your friends at IEEE Spectrum robotics. We also post a weekly calendar of upcoming robotics events for the next few months. Please send us your events for inclusion. ICRA 2026 : 1–5",
    "source": "https://spectrum.ieee.org/video-friday-robotic-hand-dexterity",
    "relatedUrl": "signals.html",
    "sourceType": "automated"
  },
  {
    "date": "2026-05-09",
    "type": "Emotional AI",
    "title": "Familiar points toward emotionally responsive home robots",
    "company": "Familiar Machines & Magic",
    "robot": "Familiar",
    "category": "Home robotics",
    "country": "USA",
    "impact": "High",
    "summary": "Roomba creator Colin Angle is framing the next home robot around presence, behavior, and emotional response rather than cleaning alone.",
    "source": "https://www.prnewswire.com/news-releases/roomba-pioneer-colin-angle-unveils-new-venture-familiar-machines--magic-introducing-a-new-platform-for-consumer-physical-ai-302761495.html",
    "relatedUrl": "blog/roomba-creator-familiar-emotional-ai-robot.html"
  },
  {
    "date": "2026-05-08",
    "type": "Humanoid",
    "title": "Unitree keeps price transparency pressure on the humanoid market",
    "company": "Unitree Robotics",
    "robot": "G1",
    "category": "Research humanoid",
    "country": "China",
    "impact": "High",
    "summary": "Visible pricing and official demo material make G1 a useful benchmark for robotics labs and early physical AI builders.",
    "source": "https://www.unitree.com/g1/",
    "relatedUrl": "robots/unitree-g1.html"
  },
  {
    "date": "2026-05-07",
    "type": "Enterprise Pilot",
    "title": "Figure 02 remains one of the strongest factory humanoid signals",
    "company": "Figure AI",
    "robot": "Figure 02",
    "category": "Industrial humanoid",
    "country": "USA",
    "impact": "High",
    "summary": "The platform is positioned around workplace manipulation, enterprise pilots, and general-purpose robot learning.",
    "source": "https://www.figure.ai/",
    "relatedUrl": "robots/figure-02.html"
  },
  {
    "date": "2026-05-07",
    "type": "Factory AI",
    "title": "Tesla Optimus keeps the factory-first humanoid narrative alive",
    "company": "Tesla",
    "robot": "Optimus",
    "category": "Humanoid",
    "country": "USA",
    "impact": "Medium",
    "summary": "Optimus is still best read as an internal manufacturing and embodied AI signal until public deployment details become clearer.",
    "source": "https://www.tesla.com/AI",
    "relatedUrl": "robots/tesla-optimus.html"
  },
  {
    "date": "2026-05-06",
    "type": "Robotics Startup Signal",
    "title": "Khosla-backed robotics startup Genesis AI has gone full stack, demo shows",
    "company": "Robotics ecosystem",
    "robot": "Robotics ecosystem",
    "category": "Robotics startups and market movement",
    "country": "Global",
    "impact": "Medium",
    "summary": "Genesis AI, a startup that raised a $105 million seed round to build foundational AI for robotics, has unveiled its first model, GENE-26.5, but also a demo showcasing a set of robotic hands performing complex tasks.",
    "source": "https://techcrunch.com/2026/05/06/khosla-backed-robotics-startup-genesis-ai-has-gone-full-stack-demo-shows/",
    "relatedUrl": "signals.html",
    "sourceType": "automated"
  },
  {
    "date": "2026-05-06",
    "type": "Mobility",
    "title": "Electric Atlas shifts Boston Dynamics from research icon to commercial question",
    "company": "Boston Dynamics",
    "robot": "Atlas",
    "category": "Humanoid mobility",
    "country": "USA",
    "impact": "High",
    "summary": "Atlas remains a top mobility proof point; the next signal to watch is how the platform converts from demo power to market role.",
    "source": "https://bostondynamics.com/atlas/",
    "relatedUrl": "robots/boston-dynamics-atlas.html"
  },
  {
    "date": "2026-05-05",
    "type": "Embodied AI Stack",
    "title": "NVIDIA robotics stack becomes a platform layer for physical AI",
    "company": "NVIDIA",
    "robot": "Isaac / GR00T",
    "category": "Robotics infrastructure",
    "country": "USA",
    "impact": "High",
    "summary": "Simulation, robot foundation models, and edge compute are becoming as important as the robot body itself.",
    "source": "https://developer.nvidia.com/isaac",
    "relatedUrl": "market.html"
  },
  {
    "date": "2026-05-04",
    "type": "Research Signal",
    "title": "iRobot Founder Wants to Put a Robotic Familiar Into Your Home",
    "company": "Robotics ecosystem",
    "robot": "Robotics ecosystem",
    "category": "Robotics research",
    "country": "Global",
    "impact": "High",
    "summary": "Two years ago, Colin Angle stepped down as CEO of iRobot , the company that he cofounded and the most successful home robot company the world has ever seen. Angle almost immediately founded a stealthy new “physical AI” company called Familiar Machines & Magic ",
    "source": "https://spectrum.ieee.org/familiar-machines-and-magic",
    "relatedUrl": "signals.html",
    "sourceType": "automated"
  },
  {
    "date": "2026-05-04",
    "type": "Research Signal",
    "title": "DAIMON Robotics Wants to Give Robot Hands a Sense of Touch",
    "company": "Robotics ecosystem",
    "robot": "Robotics ecosystem",
    "category": "Robotics research",
    "country": "Global",
    "impact": "High",
    "summary": "This article is brought to you by DAIMON Robotics . This April, Hong Kong-based DAIMON Robotics has released Daimon-Infinity , which it describes as the largest omni-modal robotic dataset for physical AI, featuring high resolution tactile sensing and spanning ",
    "source": "https://spectrum.ieee.org/daimon-robotics-physical-ai",
    "relatedUrl": "signals.html",
    "sourceType": "automated"
  },
  {
    "date": "2026-05-04",
    "type": "Warehouse",
    "title": "Digit keeps warehouse humanoid deployment in focus",
    "company": "Agility Robotics",
    "robot": "Digit",
    "category": "Logistics humanoid",
    "country": "USA",
    "impact": "Medium",
    "summary": "Digit is one of the clearest examples of a humanoid-shaped robot being aimed at a specific logistics workflow.",
    "source": "https://www.agilityrobotics.com/",
    "relatedUrl": "robots/agility-digit.html"
  },
  {
    "date": "2026-05-03",
    "type": "Home Robot",
    "title": "1X NEO keeps the home humanoid category visible",
    "company": "1X Technologies",
    "robot": "NEO",
    "category": "Home humanoid",
    "country": "Norway / USA",
    "impact": "Medium",
    "summary": "Home humanoids need a different readiness model: safety, trust, teleoperation posture, and domestic usefulness matter more than show demos.",
    "source": "https://www.1x.tech/",
    "relatedUrl": "robots/1x-neo.html"
  },
  {
    "date": "2026-05-02",
    "type": "Surgical Robotics",
    "title": "Surgical robots remain the most proven robotics business lane",
    "company": "Intuitive Surgical",
    "robot": "da Vinci systems",
    "category": "Medical robotics",
    "country": "USA",
    "impact": "Medium",
    "summary": "While humanoids drive attention, surgical robotics shows what mature robot economics can look like at scale.",
    "source": "https://www.intuitive.com/",
    "relatedUrl": "companies/intuitive-surgical.html"
  },
  {
    "date": "2026-05-01",
    "type": "Research Signal",
    "title": "Video Friday: Figure, 1X Ramp Up Humanoid Robot Production",
    "company": "Robotics ecosystem",
    "robot": "Robotics ecosystem",
    "category": "Robotics research",
    "country": "Global",
    "impact": "High",
    "summary": "Video Friday is your weekly selection of awesome robotics videos, collected by your friends at IEEE Spectrum robotics. We also post a weekly calendar of upcoming robotics events for the next few months. Please send us your events for inclusion. ICRA 2026 : 1–5",
    "source": "https://spectrum.ieee.org/video-friday-humanoid-robot-production",
    "relatedUrl": "signals.html",
    "sourceType": "automated"
  },
  {
    "date": "2026-05-01",
    "type": "Autonomy",
    "title": "DeepMind robotics research keeps the AI-to-action layer moving",
    "company": "Google DeepMind",
    "robot": "Gemini Robotics",
    "category": "Robot AI",
    "country": "USA / UK",
    "impact": "High",
    "summary": "The frontier is shifting from language intelligence toward models that can understand objects, motion, and physical task context.",
    "source": "https://deepmind.google/discover/blog/gemini-robotics-brings-ai-into-the-physical-world/",
    "relatedUrl": "companies/alphabet-google-deepmind.html"
  },
  {
    "date": "2026-04-30",
    "type": "Robot Economy",
    "title": "Machine economy narratives are converging with robotics infrastructure",
    "company": "XMAQUINA / peaq ecosystem",
    "robot": "Robot economy stack",
    "category": "DePIN robotics",
    "country": "Global",
    "impact": "Medium",
    "summary": "Ownership, utilization, robot data, and physical network incentives are becoming a separate robotics intelligence theme.",
    "source": "https://www.xmaquina.io/",
    "relatedUrl": "blog/xmaquina-decentralized-robotics.html"
  },
  {
    "date": "2026-04-29",
    "type": "Robotics Startup Signal",
    "title": "Colby Adcock&#8217;s Scout AI raises $100M to train its models for war: We visited its bootcamp",
    "company": "Robotics ecosystem",
    "robot": "Robotics ecosystem",
    "category": "Robotics startups and market movement",
    "country": "Global",
    "impact": "Medium",
    "summary": "We visited Scout AI's training ground where it's working on AI agents that can help individual soldiers control fleets of autonomous vehicles.",
    "source": "https://techcrunch.com/2026/04/29/coby-adcocks-scout-ai-raises-100-million-to-train-models-for-war-we-visited-its-bootcamp/",
    "relatedUrl": "signals.html",
    "sourceType": "automated"
  },
  {
    "date": "2026-04-29",
    "type": "Inspection",
    "title": "Quadrupeds remain the practical bridge between robots and field operations",
    "company": "Boston Dynamics / ANYbotics / Unitree",
    "robot": "Spot, ANYmal, Go2",
    "category": "Field robotics",
    "country": "Global",
    "impact": "Medium",
    "summary": "Inspection robots prove that useful robotics can scale before general-purpose humanoids reach full autonomy.",
    "source": "https://bostondynamics.com/products/spot/",
    "relatedUrl": "use-cases.html"
  },
  {
    "date": "2026-04-24",
    "type": "Research Signal",
    "title": "Video Friday: Who Wins in Robot vs. Pro Ping-Pong Player?",
    "company": "Robotics ecosystem",
    "robot": "Robotics ecosystem",
    "category": "Robotics research",
    "country": "Global",
    "impact": "High",
    "summary": "Video Friday is your weekly selection of awesome robotics videos, collected by your friends at IEEE Spectrum robotics. We also post a weekly calendar of upcoming robotics events for the next few months. Please send us your events for inclusion. ICRA 2026 : 1–5",
    "source": "https://spectrum.ieee.org/video-friday-ping-pong-robot",
    "relatedUrl": "signals.html",
    "sourceType": "automated"
  },
  {
    "date": "2026-04-23",
    "type": "Research Signal",
    "title": "This Roboticist-Turned-Teacher Built a Life-Size Replica of ENIAC",
    "company": "Robotics ecosystem",
    "robot": "Robotics ecosystem",
    "category": "Robotics research",
    "country": "Global",
    "impact": "Medium",
    "summary": "Tom Burick has always considered himself a builder. Over the years he’s designed robots, constructed a vintage teardrop trailer , and most recently, led a group of students in building a full-scale replica of a pivotal 1940s computer. Burick is a technology in",
    "source": "https://spectrum.ieee.org/roboticist-turned-teacher-eniac-replica",
    "relatedUrl": "signals.html",
    "sourceType": "automated"
  },
  {
    "date": "2026-04-22",
    "type": "Embodied AI Stack",
    "title": "NVIDIA and Google Cloud Collaborate to Advance Agentic and Physical AI",
    "company": "NVIDIA",
    "robot": "Isaac / GR00T",
    "category": "Robotics infrastructure",
    "country": "USA",
    "impact": "High",
    "summary": "NVIDIA and Google Cloud have collaborated for more than a decade, co‑engineering a full‑stack AI platform that spans every technology layer — from performance‑optimized libraries and frameworks to enterprise‑grade cloud services. This foundation enables develo",
    "source": "https://blogs.nvidia.com/blog/google-cloud-agentic-physical-ai-factories/",
    "relatedUrl": "physical-ai.html",
    "sourceType": "automated"
  },
  {
    "date": "2026-04-22",
    "type": "Research Signal",
    "title": "Proposed Chinese Robot Ban Is Latest U.S. Tech Sovereignty Move",
    "company": "Robotics ecosystem",
    "robot": "Robotics ecosystem",
    "category": "Robotics research",
    "country": "Global",
    "impact": "High",
    "summary": "The American Security Robotics Act, a bipartisan bill introduced in March by Senators Tom Cotton (R-Ark.) and Chuck Schumer (D-N.Y.) and Representative Elise Stefanik (R-N.Y.), proposes to limit U.S. government use of Chinese ground robots including humanoids,",
    "source": "https://spectrum.ieee.org/chinese-robots-us-ban",
    "relatedUrl": "signals.html",
    "sourceType": "automated"
  },
  {
    "date": "2026-04-20",
    "type": "Research Signal",
    "title": "The USC Professor Who Pioneered Socially Assistive Robotics",
    "company": "Robotics ecosystem",
    "robot": "Robotics ecosystem",
    "category": "Robotics research",
    "country": "Global",
    "impact": "High",
    "summary": "When the robotics engineering field that Maja Matarić wanted to work in didn’t exist, she helped create it. In 2005 she helped define the new area of socially assistive robotics. As an associate professor of computer science, neuroscience, and pediatrics at th",
    "source": "https://spectrum.ieee.org/socially-assistive-robotics",
    "relatedUrl": "signals.html",
    "sourceType": "automated"
  },
  {
    "date": "2026-04-19",
    "type": "Robotics Startup Signal",
    "title": "Robots beat human records at Beijing half-marathon",
    "company": "Robotics ecosystem",
    "robot": "Robotics ecosystem",
    "category": "Robotics startups and market movement",
    "country": "Global",
    "impact": "Medium",
    "summary": "The winning time is a massive improvement over last year’s race, when the fastest robot finished in two hours and 40 minutes.",
    "source": "https://techcrunch.com/2026/04/19/robots-beat-human-records-at-beijing-half-marathon/",
    "relatedUrl": "signals.html",
    "sourceType": "automated"
  }
];

const priceFallback = [];

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

const globalMapFallback = [
  {
    region: "United States",
    slug: "united-states",
    score: 96,
    companies: 70,
    robots: 9,
    role: "AI labs, humanoid platforms, autonomy, defense robotics, robotics infrastructure",
    keyCompanies: ["Tesla", "Figure AI", "Boston Dynamics", "Apptronik", "NVIDIA"],
    corridor: "Silicon Valley · Boston · Austin · Pittsburgh",
    momentum: "Global leader",
    link: "country.html?country=united-states",
    x: 26,
    y: 42
  },
  {
    region: "China",
    slug: "china",
    score: 91,
    companies: 18,
    robots: 7,
    role: "Affordable humanoids, quadrupeds, consumer robots, rapid hardware iteration",
    keyCompanies: ["Unitree Robotics", "AgiBot", "UBTECH Robotics", "Pudu Robotics", "LimX Dynamics"],
    corridor: "Shenzhen · Hangzhou · Shanghai · Beijing",
    momentum: "Fastest hardware curve",
    link: "country.html?country=china",
    x: 74,
    y: 46
  },
  {
    region: "Japan",
    slug: "japan",
    score: 74,
    companies: 10,
    robots: 3,
    role: "Industrial robotics, service robotics, factory automation, legacy humanoid research",
    keyCompanies: ["FANUC", "Yaskawa Motoman", "Honda Robotics", "Kawasaki Robotics"],
    corridor: "Tokyo · Osaka · Nagoya",
    momentum: "Industrial depth",
    link: "country.html?country=japan",
    x: 82,
    y: 49
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

const futureIndexFallback = [
  {
    theme: "Embodied AI Readiness",
    score: 91,
    trend: "Accelerating",
    horizon: "2026-2028",
    signal: "Vision-language-action models, simulation, teleoperation, and robot fleet data are converging into the software layer for useful physical AI.",
    companies: ["NVIDIA", "Physical Intelligence", "Figure AI", "Google DeepMind", "Sanctuary AI"],
    whyItMatters: "This is the layer that could make robots less scripted and more adaptable across real-world tasks.",
    link: "physical-ai.html"
  },
  {
    theme: "Humanoid Labor Deployment",
    score: 86,
    trend: "High momentum",
    horizon: "2026-2029",
    signal: "Factory, warehouse, and logistics pilots are turning humanoids from demos into measurable labor experiments.",
    companies: ["Figure AI", "Agility Robotics", "Apptronik", "Tesla", "1X Technologies"],
    whyItMatters: "Labor deployment is where robotics shifts from spectacle to economic impact.",
    link: "ai-vs-human-tasks.html"
  },
  {
    theme: "Affordable Robot Hardware",
    score: 82,
    trend: "Compressing price curve",
    horizon: "2026-2028",
    signal: "Lower-cost humanoids, quadrupeds, actuators, sensors, and batteries are making robotics more accessible to labs and developers.",
    companies: ["Unitree Robotics", "AgiBot", "LimX Dynamics", "Booster Robotics", "Pudu Robotics"],
    whyItMatters: "Cheaper hardware expands the developer base and increases real-world experimentation.",
    link: "leaderboard.html"
  }
];

function pageNormalize(value = "") {
  return String(value)
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function pageEscape(value = "") {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function robotText(robot) {
  return pageNormalize([
    robot.name,
    robot.company,
    robot.category,
    robot.primaryFocus,
    ...(Array.isArray(robot.segments) ? robot.segments : []),
    robot.country,
    robot.status,
    robot.availability,
    robot.price,
    robot.accessType,
    robot.partnerStatus,
    ...(Array.isArray(robot.availableRegions) ? robot.availableRegions : []),
    robot.marketAccess?.turkiye?.status,
    robot.marketAccess?.turkiye?.salesPath,
    robot.marketAccess?.turkiye?.distributor,
    robot.marketAccess?.turkiye?.partnerStatus,
    robot.useCase,
    ...companyValueList(robot.keywords)
  ].filter(Boolean).join(" "));
}

function companyValueList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return String(value || "").split(",").map((item) => item.trim()).filter(Boolean);
}

function companyText(company) {
  return pageNormalize([
    company.name,
    company.category,
    company.country,
    company.city,
    company.region,
    company.type,
    company.ticker,
    company.robot,
    company.website,
    company.foundedBy,
    company.focus,
    company.primaryFocus,
    ...(Array.isArray(company.segments) ? company.segments : []),
    company.positioning,
    company.keyProject,
    company.grassFocus,
    ...companyValueList(company.importantClaims),
    ...companyValueList(company.groupCompanies),
    ...companyValueList(company.industriesServed),
    ...companyValueList(company.keywords)
  ].filter(Boolean).join(" "));
}

const strategicFocusValues = ["Humanoids", "Embodied AI", "Physical AI", "Autonomous Robotics", "Secondary"];
const strategicFocusSlugs = {
  humanoids: "Humanoids",
  "embodied-ai": "Embodied AI",
  "physical-ai": "Physical AI",
  "autonomous-robotics": "Autonomous Robotics",
  secondary: "Secondary"
};

function isQuadrupedRobot(robot = {}) {
  const text = robotText(robot);
  return pageNormalize(robot.category).includes("quadruped") ||
    normalizedSegments(robot).some((segment) => pageNormalize(segment).includes("quadruped")) ||
    text.includes("robot dog") ||
    text.includes("magicdog") ||
    text.includes("wheeled quadruped") ||
    text.includes("wheeled-legged");
}

function isHumanoidRobot(robot = {}) {
  if (isQuadrupedRobot(robot)) return false;
  const text = robotText(robot);
  return pageNormalize(robot.primaryFocus) === "humanoids" ||
    pageNormalize(robot.category).includes("humanoid") ||
    normalizedSegments(robot).some((segment) => pageNormalize(segment) === "humanoids") ||
    text.includes("bipedal humanoid") ||
    text.includes("general-purpose humanoid");
}

function normalizedSegments(item = {}) {
  return Array.isArray(item.segments) ? item.segments.filter(Boolean) : [];
}

function hasSegment(item, segment) {
  const needle = pageNormalize(segment);
  return normalizedSegments(item).some((value) => pageNormalize(value) === needle);
}

function inferredFocusFromText(text = "") {
  if (text.includes("humanoid") || text.includes("biped") || text.includes("general-purpose") || text.includes("home and workplace")) return "Humanoids";
  if (text.includes("embodied") || text.includes("foundation model") || text.includes("robotics ai model") || text.includes("physical intelligence") || text.includes("openmind") || text.includes("skild")) return "Embodied AI";
  if (text.includes("physical ai") || text.includes("robot autonomy") || text.includes("robotics compute") || text.includes("simulation") || text.includes("isaac") || text.includes("gr00t")) return "Physical AI";
  if (text.includes("autonomous") || text.includes("mobility") || text.includes("delivery") || text.includes("drone") || text.includes("marine") || text.includes("agriculture") || text.includes("navigation")) return "Autonomous Robotics";
  return "Secondary";
}

function strategicText(item, kind) {
  const baseText = kind === "robot" ? robotText(item) : companyText(item);
  return pageNormalize([
    baseText,
    item.primaryFocus,
    ...normalizedSegments(item)
  ].filter(Boolean).join(" "));
}

function primaryFocus(item, kind) {
  if (strategicFocusValues.includes(item.primaryFocus)) return item.primaryFocus;
  return inferredFocusFromText(strategicText(item, kind));
}

function strategicSegments(item, kind) {
  const text = strategicText(item, kind);
  const segments = new Set(normalizedSegments(item));
  segments.add(primaryFocus(item, kind));
  if (countrySlug(item.country) === "china") segments.add("China Robotics");
  if (kind === "robot" ? hasCommercialAccess(item) : Number(item.priceVisibility || 0) >= 2 || text.includes("available") || text.includes("commercial") || text.includes("deployed") || text.includes("retailer") || text.includes("price")) segments.add("Commercial Access");
  if (text.includes("industrial") || text.includes("factory") || text.includes("manufacturing") || text.includes("automation") || text.includes("robot arm")) segments.add("Industrial");
  if (text.includes("warehouse") || text.includes("logistics") || text.includes("amr") || text.includes("intralogistics") || text.includes("picking")) segments.add("Warehouse");
  if (text.includes("delivery")) segments.add("Delivery");
  if (text.includes("quadruped") || text.includes("robot dog") || text.includes("wheeled-legged")) segments.add("Quadruped");
  if (text.includes("medical") || text.includes("surgical") || text.includes("exoskeleton") || text.includes("rehabilitation") || text.includes("wearable") || text.includes("gait")) segments.add("Medical");
  if (text.includes("research") || text.includes("developer") || text.includes("education") || text.includes("open-source") || text.includes("platform")) segments.add("Research Platforms");
  return [...segments];
}

function matchesStrategicFilter(item, filter, kind) {
  if (filter === "all") return true;
  const text = strategicText(item, kind);
  const segments = strategicSegments(item, kind).map(pageNormalize);
  const focus = pageNormalize(primaryFocus(item, kind));
  if (kind === "robot" && filter === "humanoids") return isHumanoidRobot(item);
  if (kind === "robot" && (filter === "quadrupeds" || filter === "quadruped")) return isQuadrupedRobot(item);
  if (strategicFocusSlugs[filter]) return focus === pageNormalize(strategicFocusSlugs[filter]) || segments.includes(pageNormalize(strategicFocusSlugs[filter]));
  if (filter === "china" || filter === "china-robotics") return countrySlug(item.country) === "china" || segments.includes("china robotics");
  if (filter === "available" || filter === "commercial-access") return kind === "robot" ? hasCommercialAccess(item) : segments.includes("commercial access");
  if (filter === "home") return text.includes("home") || text.includes("household") || text.includes("companion");
  if (filter === "ai") return text.includes(" ai") || text.includes("artificial intelligence") || text.includes("embodied") || text.includes("physical ai");
  if (filter === "public" || filter === "private") return text.includes(filter);
  return text.includes(filter);
}

function commercialRegions(robot) {
  const regions = [
    ...(Array.isArray(robot.availableRegions) ? robot.availableRegions : []),
    ...(Array.isArray(robot.regionAccess) ? robot.regionAccess.map((item) => item.region) : [])
  ].filter(Boolean);
  return [...new Set(regions.map((item) => String(item).trim()).filter(Boolean))];
}

function commercialAccessType(robot) {
  const explicit = robot.accessType || "";
  if (explicit) return explicit;
  const priceText = pageNormalize(robot.price);
  const availabilityText = pageNormalize(robot.availability);
  if (Number(robot.priceVisibility || 0) >= 4 || typeof robot.price === "number") return "Public Price";
  if (priceText.includes("quote") || priceText.includes("enterprise") || availabilityText.includes("contact sales")) return "Dealer Quote";
  if (availabilityText.includes("retailer")) return "Distributor";
  if (availabilityText.includes("research") || availabilityText.includes("developer")) return "Research Platform";
  if (availabilityText.includes("pilot") || availabilityText.includes("early access") || availabilityText.includes("pre-order")) return "Enterprise Pilot";
  return "Unknown";
}

function hasCommercialAccess(robot) {
  if (robot.commercialAccess !== undefined) return Boolean(robot.commercialAccess);
  const text = pageNormalize([robot.status, robot.availability, robot.price, ...(robot.keywords || [])].filter(Boolean).join(" "));
  return Number(robot.priceVisibility || 0) >= 2 || /available|commercial|order|purchase|contact sales|request a demo|retailer|dealer|distributor|quote|enterprise|pre-order|early access/.test(text);
}

function commercialAccessSummary(robot) {
  const type = commercialAccessType(robot);
  const regions = commercialRegions(robot);
  return {
    enabled: hasCommercialAccess(robot),
    type,
    regions,
    regionLabel: regions.length ? regions.slice(0, 3).join(" / ") : "Region unknown",
    importLabel: robot.importSupport ? "Import support" : "Import unknown",
    customsLabel: robot.customsReady ? "Customs ready" : "Customs review needed",
    partnerLabel: robot.partnerStatus || "Not contacted",
    primaryUrl: robot.officialPurchaseUrl || robot.salesContactUrl || robot.source || "#",
    notes: robot.notes || (type === "Unknown" ? "Commercial path needs verification." : "Commercial path is based on current source and access fields.")
  };
}

function marketAccess(robot, market = "turkiye") {
  return robot.marketAccess?.[market] || {};
}

function marketAccessSummary(robot, market = "turkiye") {
  const access = marketAccess(robot, market);
  const status = access.status || "Unknown";
  const partnerStatus = access.partnerStatus || "Not contacted";
  const importSupport = Boolean(access.importSupport);
  const customsReady = Boolean(access.customsReady);
  const distributor = access.distributor || "No verified distributor";
  return {
    market,
    status,
    salesPath: access.salesPath || "Global source only",
    distributor,
    importSupport,
    customsReady,
    partnerStatus,
    importLabel: importSupport ? "Import support" : "Import not verified",
    customsLabel: customsReady ? "Customs ready" : "Customs not verified",
    notes: access.notes || "Local market access needs direct verification."
  };
}

function matchesCommercialFilter(robot, filter) {
  if (filter === "all") return true;
  const summary = commercialAccessSummary(robot);
  const turkiye = marketAccessSummary(robot, "turkiye");
  const type = pageNormalize(summary.type);
  const regions = summary.regions.map(pageNormalize);
  if (filter === "commercial") return summary.enabled;
  if (filter === "public-price") return type === "public price" || Number(robot.priceVisibility || 0) >= 4 || typeof robot.price === "number";
  if (filter === "dealer-quote") return type === "dealer quote";
  if (filter === "distributor") return type === "distributor";
  if (filter === "turkiye") return pageNormalize(turkiye.status) !== "unknown";
  if (filter === "turkiye-verified") return ["verified", "distributor", "partner"].includes(pageNormalize(turkiye.status));
  if (filter === "turkiye-pipeline") return ["contacted", "in discussion", "partner", "distributor"].includes(pageNormalize(turkiye.partnerStatus));
  if (filter === "europe") return regions.includes("europe");
  if (filter === "mena") return regions.includes("mena");
  if (filter === "import-support") return turkiye.importSupport;
  if (filter === "customs-ready") return turkiye.customsReady;
  return true;
}

function optionalCompanyRows(company) {
  return [
    ["City", company.city],
    ["Region", company.region],
    ["Founded by", company.foundedBy],
    ["Focus", company.focus],
    ["Positioning", company.positioning],
    ["Group companies", companyValueList(company.groupCompanies).join(", ")],
    ["Key project", company.keyProject],
    ["GRASS focus", company.grassFocus],
    ["Industries served", companyValueList(company.industriesServed).join(", ")],
    ["Important claims", companyValueList(company.importantClaims).join(", ")]
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => `<div><dt>${pageEscape(label)}</dt><dd>${pageEscape(value)}</dd></div>`)
    .join("");
}

function optionalCompanyStats(company) {
  return [
    ["Employees", company.employees],
    ["Countries", company.countries],
    ["Locations", company.locations],
    ["Operational area", company.operationalArea],
    ["Application area", company.applicationArea],
    ["Indoor production area", company.productionArea],
    ["Experience", company.experience],
    ["Clients", company.clients],
    ["Delivered projects", company.deliveredProjects],
    ["Export countries", company.exportCountries]
  ].filter(([, value]) => value);
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

function priceRecordKey(item = {}) {
  return `${pageNormalize(item.company || "")}::${pageNormalize(item.robot || item.name || "")}`;
}

function robotForPrice(price = {}) {
  return pageState.robots.find((robot) => priceRecordKey(robot) === priceRecordKey(price)) || null;
}

function priceRecords() {
  const explicit = pageState.prices.map((price) => ({
    ...price,
    robotRecord: robotForPrice(price),
    isStructured: true
  }));
  const seen = new Set(explicit.map(priceRecordKey));
  const derived = pageState.robots
    .filter((robot) => Number(robot.priceVisibility || 0) >= 2 && !seen.has(priceRecordKey(robot)))
    .map((robot) => ({
      robot: robot.name,
      company: robot.company,
      priceText: robot.price,
      sourceType: pageNormalize(robot.price).includes("quote") || pageNormalize(robot.price).includes("enterprise") ? "quote" : "robot-profile",
      source: robot.source,
      confidence: Math.min(5, Math.max(1, Number(robot.priceVisibility || 1))),
      lastChecked: "",
      notes: "Derived from robot profile price field.",
      robotRecord: robot,
      isStructured: false
    }));
  return [...explicit, ...derived].sort((a, b) => Number(b.confidence || 0) - Number(a.confidence || 0));
}

function priceSourceLabel(type = "") {
  const labels = {
    official: "Official",
    "official-shop": "Official shop",
    retailer: "Retailer",
    "retailer-reference": "Retailer/reference",
    "reported-reference": "Reported/reference",
    deposit: "Deposit",
    quote: "Quote",
    "robot-profile": "Profile signal"
  };
  return labels[type] || type || "Price signal";
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

function listedRobotNames(value = "") {
  return String(value || "")
    .split(",")
    .map((item) => pageNormalize(item.trim()))
    .filter(Boolean);
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

function priceRecordForRobot(robot) {
  const key = priceRecordKey(robot);
  return priceRecords().find((price) => priceRecordKey(price) === key) || null;
}

function sourceProofScore(robot) {
  const sources = sourceList(robot.source, robot.sourceLinks);
  const officialSources = sources.filter((source) => /(^https?:\/\/)?([^/]+\.)?(agibot|bostondynamics|deeprobotics|figure|unitree|ubtrobot|magiclab|engineai|booster|1x|tesla|apptronik|agilityrobotics|sanctuary|pudurobotics)\./i.test(source));
  return Math.min(100, (sources.length ? 35 : 0) + (officialSources.length ? 25 : 0) + (robot.image ? 20 : 0) + (robotVideo(robot) ? 20 : 0));
}

function priceTransparencyScore(robot) {
  const priceRecord = priceRecordForRobot(robot);
  const sourceType = priceRecord?.sourceType || "";
  const typeBonus = ["official", "official-shop"].includes(sourceType) ? 35 :
    sourceType === "deposit" ? 24 :
    ["retailer", "retailer-reference"].includes(sourceType) ? 20 :
    sourceType === "reported-reference" ? 12 :
    0;
  const structuredBonus = priceRecord?.isStructured ? 20 : 0;
  const confidenceBonus = Math.max(0, Math.min(25, Number(priceRecord?.confidence || 0) * 5));
  return Math.min(100, (Number(robot.priceVisibility || 0) * 4) + typeBonus + structuredBonus + confidenceBonus);
}

function marketLeaderScore(robot, lane) {
  const breakdown = robotScoreBreakdown(robot);
  const text = robotText(robot);
  if (lane === "commercial") {
    const deploymentTextBonus = text.includes("enterprise") || text.includes("industrial") || text.includes("available") || text.includes("commercial") ? 12 : 0;
    return Math.round((breakdown.commercial * 0.74) + (sourceProofScore(robot) * 0.14) + (deploymentTextBonus));
  }
  if (lane === "price") return priceTransparencyScore(robot);
  if (lane === "source") return sourceProofScore(robot);
  return breakdown.overall;
}

function selectMarketLeaders(rankings) {
  const used = new Set();
  const pick = (lane, fallbackIndex = 0) => {
    const ranked = rankings
      .map((item) => ({ ...item, laneScore: marketLeaderScore(item.robot, lane) }))
      .sort((a, b) => b.laneScore - a.laneScore || b.score - a.score);
    return ranked.find((item) => !used.has(robotSeoSlug(item.robot))) || ranked[fallbackIndex] || ranked[0];
  };
  const overall = pick("overall");
  if (overall) used.add(robotSeoSlug(overall.robot));
  const commercial = pick("commercial");
  if (commercial) used.add(robotSeoSlug(commercial.robot));
  const price = pick("price");
  if (price) used.add(robotSeoSlug(price.robot));
  const source = pick("source");
  return [
    ["R-Score leader", overall, "Best balanced readiness signal"],
    ["Commercial readiness", commercial, "Maturity, availability, and deployment posture"],
    ["Price transparency", price, "Structured price record and public price confidence"],
    ["Source proof", source, "Official sources, media, and profile evidence"]
  ];
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

function signalPrimaryUrl(signal) {
  const relatedUrl = signal.relatedUrl || "";
  if (!relatedUrl || relatedUrl === "signals.html" || relatedUrl.endsWith("/signals.html")) {
    return signal.source || "signals.html";
  }
  return relatedUrl;
}

function signalLinkAttrs(signal) {
  const url = signalPrimaryUrl(signal);
  const isExternal = /^https?:\/\//i.test(url);
  return `href="${pageEscape(url)}"${isExternal ? ' target="_blank" rel="noopener noreferrer"' : ""}`;
}

function signalFilterSlug(value = "") {
  return pageNormalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "all";
}

function signalDateValue(signal) {
  const value = Date.parse(signal.date || "");
  return Number.isFinite(value) ? value : 0;
}

function signalLatestDate(signals = []) {
  const latest = signals.reduce((max, signal) => Math.max(max, signalDateValue(signal)), 0);
  if (!latest) return "No date";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(latest));
}

function signalText(signal) {
  return pageNormalize([
    signal.title,
    signal.summary,
    signal.type,
    signal.category,
    signal.company,
    signal.robot,
    signal.country
  ].filter(Boolean).join(" "));
}

function signalIntelligenceType(signal) {
  const text = signalText(signal);
  if (text.includes("funding") || text.includes("raises") || text.includes("investment") || text.includes("financing")) return "Funding";
  if (text.includes("partner") || text.includes("collaborat") || text.includes("agreement")) return "Partnership";
  if (text.includes("factory") || text.includes("warehouse") || text.includes("deploy") || text.includes("pilot") || text.includes("logistics")) return "Factory deployment";
  if (text.includes("humanoid") && (text.includes("demo") || text.includes("motion") || text.includes("walking") || text.includes("launch"))) return "Humanoid demo";
  if (text.includes("price") || text.includes("pricing") || text.includes("available") || text.includes("order") || text.includes("retailer")) return "Price / availability";
  if (text.includes("unveil") || text.includes("launch") || text.includes("introduc") || text.includes("product")) return "Product launch";
  if (text.includes("regulation") || text.includes("safety") || text.includes("policy")) return "Regulation / safety";
  if (text.includes("market") || text.includes("stock") || text.includes("economy") || text.includes("platform")) return "Market movement";
  if (text.includes("research") || text.includes("ieee") || text.includes("spectrum")) return "Research";
  return signal.type || "Robotics signal";
}

function signalConfidence(signal) {
  const source = pageNormalize(signal.source || "");
  if (source.includes("prnewswire") || source.includes("businesswire") || source.includes("globenewswire")) return "Press release";
  if (source.includes("robotsusa") || source.includes("robotshop") || source.includes("warpix") || source.includes("shop.") || source.includes("physio")) return "Retailer";
  if (source.includes("spectrum.ieee") || source.includes("therobotreport") || source.includes("techcrunch") || source.includes("theverge")) return "Media report";
  if (signal.sourceType === "automated") return "Automated feed";
  if (source && !source.includes("robologai.com")) return "Official";
  return "Source-linked";
}

function signalQualityScore(signal) {
  const confidence = signalConfidence(signal);
  const impact = pageNormalize(signal.impact || "");
  let score = signal.source ? 45 : 20;
  if (confidence === "Official") score += 30;
  else if (confidence === "Press release") score += 24;
  else if (confidence === "Media report") score += 18;
  else if (confidence === "Retailer") score += 14;
  else if (confidence === "Automated feed") score += 10;
  if (impact.includes("high")) score += 15;
  else if (impact.includes("medium")) score += 8;
  if (findSignalCompany(signal)) score += 5;
  if (findSignalRobot(signal)) score += 5;
  return Math.max(0, Math.min(100, score));
}

function signalProfileStatus(view) {
  if (view.robotHref && view.companyHref) return "Robot + company linked";
  if (view.robotHref) return "Robot profile linked";
  if (view.companyHref) return "Company profile linked";
  if (view.ecosystemSignal) return "Ecosystem context";
  return "Profile gap";
}

function signalProfileFilterMatch(view) {
  const filter = pageState.signalProfileFilter;
  if (filter === "all") return true;
  if (filter === "linked") return Boolean(view.companyHref || view.robotHref);
  if (filter === "company-linked") return Boolean(view.companyHref);
  if (filter === "robot-linked") return Boolean(view.robotHref);
  if (filter === "ecosystem") return Boolean(view.ecosystemSignal && !view.companyHref && !view.robotHref);
  if (filter === "profile-gap") return Boolean(!view.companyHref && !view.robotHref && !view.ecosystemSignal);
  return true;
}

function signalSourceConfidenceDetail(signal) {
  const confidence = signalConfidence(signal);
  if (confidence === "Official") return "Primary company or product source";
  if (confidence === "Press release") return "Distribution-backed announcement";
  if (confidence === "Media report") return "Editorial or industry media source";
  if (confidence === "Retailer") return "Seller or marketplace reference";
  if (confidence === "Automated feed") return "Automated intake, needs editorial review";
  return "Source link present, classification pending";
}

function signalWhyItMatters(signal) {
  if (signal.whyItMatters) return signal.whyItMatters;
  const type = signalIntelligenceType(signal);
  const category = signal.category || "robotics";
  if (type === "Funding") return "Capital flowing into this area can accelerate hiring, hardware iteration, and commercial deployment.";
  if (type === "Partnership") return "Partnerships are often stronger deployment signals than standalone demos because they show buyer or ecosystem pull.";
  if (type === "Factory deployment") return "Real operational environments are where physical AI moves from spectacle to repeatable economic value.";
  if (type === "Humanoid demo") return "Humanoid demos matter when they reveal mobility, manipulation, autonomy, or cost signals that can be compared across builders.";
  if (type === "Price / availability") return "Pricing and availability make robot markets easier to benchmark and bring developer adoption closer.";
  if (type === "Product launch") return `A new ${category} launch can reset the competitive map for buyers, developers, and robotics investors.`;
  if (type === "Regulation / safety") return "Safety and policy signals shape which robots can leave controlled demos and enter public or industrial spaces.";
  if (type === "Market movement") return "Market movement can reveal where public companies, suppliers, and buyers are placing physical AI bets.";
  return "This signal adds context to how robotics capabilities, companies, and markets are moving.";
}

function signalStrategicLens(signal, company = null, robot = null) {
  if (robot) return primaryFocus(robot, "robot");
  if (company) return primaryFocus(company, "company");
  const text = signalText(signal);
  if (text.includes("humanoid") || text.includes("biped") || text.includes("general-purpose")) return "Humanoids";
  if (text.includes("embodied") || text.includes("robot learning") || text.includes("foundation model") || text.includes("physical intelligence")) return "Embodied AI";
  if (text.includes("physical ai") || text.includes("simulation") || text.includes("robotics compute") || text.includes("autonomy stack")) return "Physical AI";
  if (text.includes("autonomous") || text.includes("delivery") || text.includes("inspection") || text.includes("warehouse") || text.includes("mobility")) return "Autonomous Robotics";
  return "Secondary";
}

function findSignalCompany(signal) {
  const slug = pageNormalize(signal.companySlug || "");
  if (slug) {
    return pageState.companies.find((company) => companySlug(company) === slug || seoSlug(company.name) === slug) || null;
  }
  const name = pageNormalize(signal.company || "");
  if (!name || name.includes("ecosystem")) return null;
  return pageState.companies.find((company) => {
    const companyName = pageNormalize(company.name);
    return companyName === name || name.includes(companyName) || companyName.includes(name);
  }) || null;
}

function findSignalRobot(signal) {
  const slug = pageNormalize(signal.robotSlug || "");
  if (slug) {
    return pageState.robots.find((robot) => robotSlug(robot) === slug || robotSeoSlug(robot) === slug || seoSlug(robot.name) === slug) || null;
  }
  const robotName = pageNormalize(signal.robot || "");
  const companyName = pageNormalize(signal.company || "");
  if (!robotName || robotName.includes("ecosystem")) return null;
  return pageState.robots.find((robot) => {
    const name = pageNormalize(robot.name);
    const company = pageNormalize(robot.company || "");
    return name === robotName || (robotName.includes(name) && (!companyName || companyName.includes(company) || company.includes(companyName)));
  }) || null;
}

function signalIsEcosystem(signal) {
  if (signal.ecosystemSignal === true) return true;
  const company = pageNormalize(signal.company || "");
  const robot = pageNormalize(signal.robot || "");
  if ((company.includes("ecosystem") || robot.includes("ecosystem")) && !signal.companySlug && !signal.robotSlug) return true;
  return company === "robotics ecosystem" || robot === "robotics ecosystem";
}

function signalViewModel(signal) {
  const company = findSignalCompany(signal);
  const robot = findSignalRobot(signal);
  const lens = signalStrategicLens(signal, company, robot);
  const view = {
    ...signal,
    intelligenceType: signalIntelligenceType(signal),
    strategicLens: lens,
    confidence: signalConfidence(signal),
    qualityScore: signalQualityScore(signal),
    sourceHost: sourceHost(signal.source || ""),
    sourceConfidenceDetail: signalSourceConfidenceDetail(signal),
    whyItMatters: signalWhyItMatters(signal),
    ecosystemSignal: signalIsEcosystem(signal),
    companyHref: company ? companyProfileHref(company) : "",
    robotHref: robot ? robotProfileHref(robot) : ""
  };
  view.profileStatus = signalProfileStatus(view);
  return view;
}

function filteredSignals(signals) {
  return signals.filter((item) => {
    const view = signalViewModel(item);
    const type = signalFilterSlug(view.intelligenceType);
    const impact = signalFilterSlug(item.impact);
    const country = countrySlug(item.country || broadCountryName(item.country || ""));
    const confidence = signalFilterSlug(view.confidence);
    const focus = signalFilterSlug(view.strategicLens);
    const matchesType = pageState.signalTypeFilter === "all" || type === pageState.signalTypeFilter;
    const matchesImpact = pageState.signalImpactFilter === "all" || impact === pageState.signalImpactFilter;
    const matchesCountry = pageState.signalCountryFilter === "all" || country === pageState.signalCountryFilter;
    const matchesConfidence = pageState.signalConfidenceFilter === "all" || confidence === pageState.signalConfidenceFilter;
    const matchesProfile = signalProfileFilterMatch(view);
    const matchesFocus = pageState.signalFocusFilter === "all" || focus === pageState.signalFocusFilter;
    return matchesType && matchesImpact && matchesCountry && matchesConfidence && matchesProfile && matchesFocus;
  });
}

function signalFilterButton(label, value, current, attr) {
  const slug = value === "all" ? "all" : signalFilterSlug(value);
  return `<button class="${current === slug ? "is-active" : ""}" type="button" ${attr}="${pageEscape(slug)}">${pageEscape(label)}</button>`;
}

function signalBreakdownRow(label, value, total, note) {
  const percent = total ? Math.round((value / total) * 100) : 0;
  return `
    <article>
      <div><span>${pageEscape(label)}</span><strong>${pageEscape(String(value))}/${pageEscape(String(total))}</strong></div>
      <i style="--signal-breakdown:${percent}%"><b></b></i>
      <small>${pageEscape(note)} · ${percent}%</small>
    </article>
  `;
}

function renderRoboticsSignalsPage() {
  const featured = document.querySelector("[data-signals-featured]");
  const feed = document.querySelector("[data-signals-feed]");
  const types = document.querySelector("[data-signals-types]");
  const metrics = document.querySelector("[data-signals-metrics]");
  const qualityGrid = document.querySelector("[data-signals-quality]");
  const breakdownGrid = document.querySelector("[data-signals-breakdown]");
  const filters = document.querySelector("[data-signals-filters]");
  const count = document.querySelector("[data-signals-count]");
  if (!featured && !feed && !types && !metrics && !qualityGrid && !breakdownGrid && !filters && !count) return;

  const signals = pageState.signals.length ? pageState.signals : signalFallback;
  const visibleSignals = filteredSignals(signals).map(signalViewModel);
  const highImpact = signals.filter((item) => pageNormalize(item.impact).includes("high")).length;
  const enrichedSignals = signals.map(signalViewModel);
  const signalTypes = [...new Set(enrichedSignals.map((item) => item.intelligenceType).filter(Boolean))];
  const focusTypes = ["Humanoids", "Embodied AI", "Physical AI", "Autonomous Robotics", "Secondary"]
    .filter((focus) => enrichedSignals.some((item) => item.strategicLens === focus));
  const confidenceTypes = [...new Set(enrichedSignals.map((item) => item.confidence).filter(Boolean))];
  const countries = [...new Set(signals.map((item) => broadCountryName(item.country || "")).filter(Boolean))];
  const affectedCompanies = new Set(signals.map((item) => pageNormalize(item.company || "")).filter(Boolean)).size;
  const robotLinked = enrichedSignals.filter((item) => item.robotHref).length;
  const companyLinked = enrichedSignals.filter((item) => item.companyHref).length;

  if (metrics) {
    metrics.innerHTML = `
      <article><strong>${highImpact}</strong><small>High-impact signals</small></article>
      <article><strong>${affectedCompanies}</strong><small>Companies affected</small></article>
      <article><strong>${robotLinked}</strong><small>Robot profiles linked</small></article>
      <article><strong>${signalLatestDate(signals)}</strong><small>Latest signal date</small></article>
    `;
  }

  if (qualityGrid) {
    const officialish = enrichedSignals.filter((item) => ["Official", "Press release"].includes(item.confidence)).length;
    const profileLinked = enrichedSignals.filter((item) => item.companyHref || item.robotHref).length;
    const sourceReviewNeeded = enrichedSignals.filter((item) => ["Automated feed", "Source-linked"].includes(item.confidence)).length;
    const ecosystemSignals = enrichedSignals.filter((item) => item.ecosystemSignal && !item.companyHref && !item.robotHref).length;
    const coreLens = enrichedSignals.filter((item) => item.strategicLens !== "Secondary").length;
    const avgQuality = enrichedSignals.length ? Math.round(enrichedSignals.reduce((sum, item) => sum + item.qualityScore, 0) / enrichedSignals.length) : 0;
    qualityGrid.innerHTML = `
      <article><span>Average quality</span><strong>${avgQuality}</strong><small>Weighted by source, impact, and profile links</small></article>
      <article><span>Primary sources</span><strong>${officialish}</strong><small>Official and PR-backed signals separated from media and automated feeds</small></article>
      <article><span>Profile coverage</span><strong>${profileLinked}</strong><small>${companyLinked} company links · ${robotLinked} robot links · ${ecosystemSignals} ecosystem context</small></article>
      <article><span>Review queue</span><strong>${sourceReviewNeeded}</strong><small>Automated or lightly classified source trails needing editorial review</small></article>
    `;
  }

  if (breakdownGrid) {
    const total = enrichedSignals.length;
    const officialish = enrichedSignals.filter((item) => ["Official", "Press release"].includes(item.confidence)).length;
    const profileLinked = enrichedSignals.filter((item) => item.companyHref || item.robotHref).length;
    const companyLinkedCount = enrichedSignals.filter((item) => item.companyHref).length;
    const robotLinkedCount = enrichedSignals.filter((item) => item.robotHref).length;
    const ecosystemSignals = enrichedSignals.filter((item) => item.ecosystemSignal && !item.companyHref && !item.robotHref).length;
    const sourceReviewNeeded = enrichedSignals.filter((item) => ["Automated feed", "Source-linked"].includes(item.confidence)).length;
    breakdownGrid.innerHTML = [
      signalBreakdownRow("Official / PR", officialish, total, "Primary-source confidence"),
      signalBreakdownRow("Profile linked", profileLinked, total, "Company or robot profile connected"),
      signalBreakdownRow("Company linked", companyLinkedCount, total, "Company profile connected"),
      signalBreakdownRow("Robot linked", robotLinkedCount, total, "Robot profile connected"),
      signalBreakdownRow("Needs review", sourceReviewNeeded + ecosystemSignals, total, "Automated, broad, or unclassified signals")
    ].join("");
  }

  if (featured) {
    const lead = visibleSignals[0] || enrichedSignals[0];
    featured.innerHTML = `
      <span>${pageEscape(lead.strategicLens)} · ${pageEscape(lead.intelligenceType)} · ${pageEscape(lead.date)} · ${pageEscape(lead.confidence)}</span>
      <h2>${pageEscape(lead.title)}</h2>
      <p>${pageEscape(lead.summary)}</p>
      <div class="signal-chip-row">
        <b class="signal-impact ${signalImpactClass(lead.impact)}">${pageEscape(lead.impact || "Tracked")}</b>
        <em class="signal-chip-source">Source: ${pageEscape(lead.confidence)}</em>
        <em class="signal-chip-profile">${pageEscape(lead.profileStatus)}</em>
        <em>${pageEscape(lead.intelligenceType)}</em>
        <em>${pageEscape(lead.strategicLens)}</em>
        <em>Q${pageEscape(String(lead.qualityScore))}</em>
      </div>
      <dl>
        <div><dt>Company</dt><dd>${pageEscape(lead.company)}</dd></div>
        <div><dt>Robot</dt><dd>${pageEscape(lead.robot)}</dd></div>
        <div><dt>Category</dt><dd>${pageEscape(lead.category)}</dd></div>
        <div><dt>Source</dt><dd>${pageEscape(lead.sourceHost)} · ${pageEscape(lead.sourceConfidenceDetail)}</dd></div>
      </dl>
      <div class="signal-why"><strong>Why it matters</strong><span>${pageEscape(lead.whyItMatters)}</span></div>
      <div class="signals-actions">
        <a ${signalLinkAttrs(lead)}>Read signal</a>
        ${lead.companyHref ? `<a href="${pageEscape(lead.companyHref)}">Open company</a>` : ""}
        ${lead.robotHref ? `<a href="${pageEscape(lead.robotHref)}">Open robot</a>` : ""}
        <a href="${pageEscape(lead.source)}" target="_blank" rel="noopener noreferrer">Official source</a>
      </div>
    `;
  }

  if (filters) {
    const impactTypes = [...new Set(signals.map((item) => item.impact).filter(Boolean))];
    filters.innerHTML = `
      <div>
        <span>Focus Lens</span>
        ${signalFilterButton("All", "all", pageState.signalFocusFilter, "data-signal-focus-filter")}
        ${focusTypes.map((focus) => signalFilterButton(focus, focus, pageState.signalFocusFilter, "data-signal-focus-filter")).join("")}
      </div>
      <div>
        <span>Signal Type</span>
        ${signalFilterButton("All", "all", pageState.signalTypeFilter, "data-signal-type-filter")}
        ${signalTypes.map((type) => signalFilterButton(type, type, pageState.signalTypeFilter, "data-signal-type-filter")).join("")}
      </div>
      <div>
        <span>Impact</span>
        ${signalFilterButton("All", "all", pageState.signalImpactFilter, "data-signal-impact-filter")}
        ${impactTypes.map((impact) => signalFilterButton(impact, impact, pageState.signalImpactFilter, "data-signal-impact-filter")).join("")}
      </div>
      <div>
        <span>Market</span>
        ${signalFilterButton("All", "all", pageState.signalCountryFilter, "data-signal-country-filter")}
        ${countries.map((country) => signalFilterButton(country, country, pageState.signalCountryFilter, "data-signal-country-filter")).join("")}
      </div>
      <div>
        <span>Source Confidence</span>
        ${signalFilterButton("All", "all", pageState.signalConfidenceFilter, "data-signal-confidence-filter")}
        ${confidenceTypes.map((confidence) => signalFilterButton(confidence, confidence, pageState.signalConfidenceFilter, "data-signal-confidence-filter")).join("")}
      </div>
      <div>
        <span>Profile Links</span>
        ${signalFilterButton("All", "all", pageState.signalProfileFilter, "data-signal-profile-filter")}
        ${signalFilterButton("Any profile", "linked", pageState.signalProfileFilter, "data-signal-profile-filter")}
        ${signalFilterButton("Company linked", "company-linked", pageState.signalProfileFilter, "data-signal-profile-filter")}
        ${signalFilterButton("Robot linked", "robot-linked", pageState.signalProfileFilter, "data-signal-profile-filter")}
        ${signalFilterButton("Ecosystem context", "ecosystem", pageState.signalProfileFilter, "data-signal-profile-filter")}
        ${signalFilterButton("Profile gaps", "profile-gap", pageState.signalProfileFilter, "data-signal-profile-filter")}
      </div>
    `;
  }

  if (count) {
    count.textContent = `${visibleSignals.length} visible signals`;
  }

  if (feed) {
    feed.innerHTML = visibleSignals.map((item, index) => `
      <article class="signals-row">
        <div class="signals-row-index">#${String(index + 1).padStart(2, "0")}</div>
        <div class="signals-row-main">
          <span>${pageEscape(item.strategicLens)} · ${pageEscape(item.intelligenceType)} · ${pageEscape(item.date)} · ${pageEscape(item.confidence)}</span>
          <h2>${pageEscape(item.title)}</h2>
          <p>${pageEscape(item.summary)}</p>
          <div class="signal-chip-row">
            <em class="signal-chip-source">Source: ${pageEscape(item.confidence === "Official" ? "Official / primary" : item.confidence)}</em>
            <em class="signal-chip-profile">${pageEscape(item.profileStatus)}</em>
            <em>${pageEscape(item.strategicLens)}</em>
            <em>${pageEscape(item.intelligenceType)}</em>
            <em>${pageEscape(item.country)}</em>
            <em>${pageEscape(item.sourceHost)} · ${pageEscape(item.sourceConfidenceDetail)}</em>
            <em>Q${pageEscape(String(item.qualityScore))}</em>
          </div>
          <small><strong>Why it matters:</strong> ${pageEscape(item.whyItMatters)}</small>
        </div>
        <div class="signals-row-side">
          <b class="signal-impact ${signalImpactClass(item.impact)}">${pageEscape(item.impact)}</b>
          <a ${signalLinkAttrs(item)}>View</a>
          ${item.companyHref ? `<a href="${pageEscape(item.companyHref)}">Company</a>` : ""}
          ${item.robotHref ? `<a href="${pageEscape(item.robotHref)}">Robot</a>` : ""}
          <a href="${pageEscape(item.source)}" target="_blank" rel="noopener noreferrer">Source</a>
        </div>
      </article>
    `).join("") || `<article class="signals-empty"><strong>No matching signals</strong><span>Try a broader filter combination.</span></article>`;
  }

  if (types) {
    types.innerHTML = focusTypes.map((focus) => {
      const matching = enrichedSignals.filter((item) => item.strategicLens === focus);
      return `
        <article>
          <span>${matching.length} signals</span>
          <strong>${pageEscape(focus)}</strong>
          <small>${pageEscape(matching[0]?.whyItMatters || "Robotics intelligence")}</small>
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

function globalMapCard(item, compact = false) {
  const score = Math.max(0, Math.min(100, Number(item.score || 0)));
  const companies = Array.isArray(item.keyCompanies) ? item.keyCompanies : String(item.keyCompanies || "").split(",").map((company) => company.trim()).filter(Boolean);
  return `
    <article class="global-map-card">
      <div class="global-map-score" style="--map-score:${score / 100}"><strong>${score}</strong><small>Index</small></div>
      <span>${pageEscape(item.region)}</span>
      <h3>${pageEscape(item.role || item.dominantSignal)}</h3>
      <p>${pageEscape(companies.join(" · "))}</p>
      ${compact ? "" : `
        <dl>
          <div><dt>Companies</dt><dd>${pageEscape(item.companies)}</dd></div>
          <div><dt>Robots</dt><dd>${pageEscape(item.robots)}</dd></div>
          <div><dt>Corridor</dt><dd>${pageEscape(item.corridor || item.marketStage)}</dd></div>
        </dl>
      `}
      <a href="${pageEscape(compact ? "global-robotics-map.html" : item.link || "country.html")}">${compact ? "Open global map" : "Open country tracker"}</a>
    </article>
  `;
}

function renderGlobalRoboticsMap() {
  const map = pageState.globalMap.length ? pageState.globalMap : globalMapFallback;
  const sorted = [...map].sort((a, b) => Number(b.score || 0) - Number(a.score || 0));
  const homeTarget = document.querySelector("[data-home-global-map]");
  const grid = document.querySelector("[data-global-map-grid]");
  const metrics = document.querySelector("[data-global-map-metrics]");
  const pins = document.querySelector("[data-global-map-pins]");
  if (homeTarget) {
    homeTarget.innerHTML = sorted.slice(0, 3).map((item) => globalMapCard(item, true)).join("");
  }
  if (grid) {
    grid.innerHTML = sorted.map((item) => globalMapCard(item)).join("");
  }
  if (metrics) {
    const top = sorted[0];
    const totalCompanies = sorted.reduce((sum, item) => sum + Number(item.companies || 0), 0);
    const totalRobots = sorted.reduce((sum, item) => sum + Number(item.robots || 0), 0);
    metrics.innerHTML = `
      <article><strong>${sorted.length}</strong><small>Regions mapped</small></article>
      <article><strong>${totalCompanies}+</strong><small>Company references</small></article>
      <article><strong>${totalRobots}+</strong><small>Robot platforms</small></article>
      <article><strong>${pageEscape(top?.region || "USA")}</strong><small>Strongest ecosystem</small></article>
    `;
  }
  if (pins) {
    pins.innerHTML = sorted.slice(0, 8).map((item) => `<i style="--x:${Number(item.x || 50)}%;--y:${Number(item.y || 50)}%" title="${pageEscape(item.region)}"></i>`).join("");
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

function futureIndexCard(item, compact = false) {
  const score = Math.max(0, Math.min(100, Number(item.score || 0)));
  const companies = Array.isArray(item.companies) ? item.companies : String(item.companies || "").split(",").map((company) => company.trim()).filter(Boolean);
  return `
    <article class="future-index-card">
      <div class="future-index-score" style="--future-score:${score / 100}"><strong>${score}</strong><small>Index</small></div>
      <span>${pageEscape(item.theme)} · ${pageEscape(item.trend)}</span>
      <h3>${pageEscape(compact ? item.signal : item.whyItMatters || item.signal)}</h3>
      <p>${pageEscape(companies.join(" · "))}</p>
      ${compact ? "" : `<small>Horizon: ${pageEscape(item.horizon)}</small>`}
      <a href="${pageEscape(compact ? "future-robotics-index.html" : item.link || "future-robotics-index.html")}">${compact ? "Open Future Index" : "Open signal"}</a>
    </article>
  `;
}

function renderFutureRoboticsIndex() {
  const index = pageState.futureIndex.length ? pageState.futureIndex : futureIndexFallback;
  const sorted = [...index].sort((a, b) => Number(b.score || 0) - Number(a.score || 0));
  const homeTarget = document.querySelector("[data-home-future-index]");
  const grid = document.querySelector("[data-future-index-grid]");
  const metrics = document.querySelector("[data-future-index-metrics]");
  if (homeTarget) {
    homeTarget.innerHTML = sorted.slice(0, 3).map((item) => futureIndexCard(item, true)).join("");
  }
  if (grid) {
    grid.innerHTML = sorted.map((item) => futureIndexCard(item)).join("");
  }
  if (metrics) {
    const top = sorted[0];
    const companies = new Set(sorted.flatMap((item) => Array.isArray(item.companies) ? item.companies : [])).size;
    metrics.innerHTML = `
      <article><strong>${sorted.length}</strong><small>Future themes</small></article>
      <article><strong>${pageEscape(top?.score || "0")}</strong><small>Top index score</small></article>
      <article><strong>${companies}+</strong><small>Companies referenced</small></article>
      <article><strong>${pageEscape(top?.theme || "Embodied AI")}</strong><small>Leading thesis</small></article>
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
  const sources = sourceList(robot.source, robot.sourceLinks);
  return {
    sourceConfidence: sources.length > 1 ? `${sources.length} linked sources` : robot.source ? "Official source linked" : "Source needed",
    priceConfidence: priceVisibility >= 4 ? "Public / official price signal" : priceVisibility >= 2 ? "Retailer / reference price" : "No official public price",
    deploymentSignal: robot.availability || robot.status || "Deployment not disclosed",
    mediaVerified: robotVideo(robot) ? "Playable official demo" : robot.image ? "Official / source visual" : "Media pending",
    dataFreshness: robot.lastVerified || (score >= 68 ? "May 2026 watchlist review" : "May 2026 catalog review")
  };
}

function robotGallery(robot) {
  const gallery = Array.isArray(robot.gallery) ? robot.gallery : String(robot.gallery || "").split(",").map((item) => item.trim()).filter(Boolean);
  return gallery.map((item, index) => {
    if (typeof item === "string") {
      return {
        src: item,
        alt: `${robot.name} gallery image ${index + 1}`,
        caption: ""
      };
    }
    return {
      src: item?.src || item?.image || item?.url || "",
      alt: item?.alt || item?.caption || `${robot.name} gallery image ${index + 1}`,
      caption: item?.caption || ""
    };
  }).filter((item) => item.src);
}

function robotMediaItems(robot, gallery = robotGallery(robot)) {
  const mainSrc = robot.heroImage || robot.image || "";
  const items = [];
  if (mainSrc) {
    items.push({
      src: mainSrc,
      alt: `${robot.name} robot`,
      caption: robot.imageCredit || "",
      label: "Hero"
    });
  }
  gallery.forEach((item, index) => {
    if (!item.src || item.src === mainSrc) return;
    items.push({
      src: item.src,
      alt: item.alt || `${robot.name} gallery image ${index + 1}`,
      caption: item.caption || "",
      label: String(index + 2)
    });
  });
  return items;
}

function robotMediaPicker(robot, gallery) {
  const items = robotMediaItems(robot, gallery);
  if (!items.length) return `<span>${pageEscape(pageInitials(robot.name))}</span>`;
  return `
    <img class="profile-visual-main" data-profile-gallery-main src="${pageEscape(items[0].src)}" alt="${pageEscape(items[0].alt)}" loading="lazy" decoding="async">
    <figcaption data-profile-gallery-caption ${items[0].caption ? "" : "hidden"}>${pageEscape(items[0].caption)}</figcaption>
    ${items.length > 1 ? `<div class="profile-gallery-thumbs" aria-label="${pageEscape(robot.name)} image selector">
      ${items.map((item, index) => `
        <button class="${index === 0 ? "is-active" : ""}" type="button" data-gallery-src="${pageEscape(item.src)}" data-gallery-alt="${pageEscape(item.alt)}" data-gallery-caption="${pageEscape(item.caption)}" aria-label="Show ${pageEscape(item.alt)}">
          <img src="${pageEscape(item.src)}" alt="" loading="lazy" decoding="async">
        </button>
      `).join("")}
    </div>` : ""}
  `;
}

function setupProfileGallery(root = document) {
  root.querySelectorAll("[data-profile-gallery]").forEach((gallery) => {
    const main = gallery.querySelector("[data-profile-gallery-main]");
    const caption = gallery.querySelector("[data-profile-gallery-caption]");
    gallery.querySelectorAll("[data-gallery-src]").forEach((button) => {
      button.addEventListener("click", () => {
        if (!main) return;
        main.src = button.dataset.gallerySrc || main.src;
        main.alt = button.dataset.galleryAlt || main.alt;
        gallery.querySelectorAll("[data-gallery-src]").forEach((item) => item.classList.toggle("is-active", item === button));
        if (!caption) return;
        caption.textContent = button.dataset.galleryCaption || "";
        caption.hidden = !button.dataset.galleryCaption;
      });
    });
  });
}

function robotDeploymentThesis(robot) {
  const text = robotText(robot);
  if (text.includes("enterprise") || text.includes("industrial") || text.includes("inspection")) return "Enterprise deployment signal";
  if (text.includes("available") || text.includes("order") || text.includes("retailer")) return "Commercial access signal";
  if (text.includes("research") || text.includes("developer") || text.includes("education")) return "Developer and research signal";
  if (text.includes("prototype") || text.includes("development")) return "Early-stage platform signal";
  return "Robotics market signal";
}

function sourceHost(url = "") {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "source";
  }
}

function sourceList(primary = "", extra = []) {
  return [primary, ...(Array.isArray(extra) ? extra : [])]
    .filter(Boolean)
    .filter((url, index, list) => list.indexOf(url) === index)
    .slice(0, 6);
}

function sourceSummary(sources = []) {
  const hosts = sources.map(sourceHost);
  const counts = hosts.reduce((map, host) => map.set(host, (map.get(host) || 0) + 1), new Map());
  return [...counts.entries()]
    .map(([host, count]) => count > 1 ? `${host} (${count} links)` : host)
    .join(" + ");
}

function renderSourceNotes(title, sources, fallbackLabel = "Official source") {
  const sourceItems = sources.length ? sources : [];
  if (!sourceItems.length) return "";
  return `
    <section class="catalog-section">
      <div class="section-heading compact">
        <p>Source Notes</p>
        <h2>${pageEscape(title)}</h2>
      </div>
      <div class="source-note-grid">
        ${sourceItems.map((url, index) => `
          <article>
            <span>${index === 0 ? pageEscape(fallbackLabel) : "Supporting source"}</span>
            <strong>${pageEscape(sourceHost(url))}</strong>
            <small>${pageEscape(url)}</small>
            <a href="${pageEscape(url)}" target="_blank" rel="noopener noreferrer">Open source →</a>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function companyQuality(company, robots = []) {
  const sources = sourceList(company.website, company.sourceLinks);
  return {
    sourceConfidence: sources.length > 1 ? `${sources.length} linked sources` : sources.length ? "Official source linked" : "Source needed",
    robotCoverage: robots.length ? `${robots.length} linked robot profile${robots.length === 1 ? "" : "s"}` : "Robot profile pending",
    marketConfidence: company.ticker ? "Public market ticker" : company.type || "Private / unlisted",
    dataFreshness: company.lastVerified || (sources.length ? "May 2026 source review" : "May 2026 catalog review")
  };
}

function companyProfileMark(company) {
  const logo = company.logo || company.logoImage || company.image || company.heroImage;
  if (logo) {
    return `<div class="company-profile-mark company-profile-logo-mark"><img src="${pageEscape(logo)}" alt="${pageEscape(company.name)} logo" loading="lazy"></div>`;
  }
  return `<div class="company-profile-mark">${pageEscape(pageInitials(company.name))}</div>`;
}

function companyCardMark(company) {
  const logo = company.logo || company.logoImage || company.image || company.heroImage;
  if (logo) {
    return `<div class="company-avatar company-avatar-logo"><img src="${pageEscape(logo)}" alt="${pageEscape(company.name)} logo" loading="lazy" decoding="async"></div>`;
  }
  return `<div class="company-avatar">${pageEscape(pageInitials(company.name))}</div>`;
}

const assetStatusCache = new Map();
const assetInfoCache = new Map();
const linkStatusCache = new Map();

function recordAssetPath(record, fields = []) {
  return fields.map((field) => record?.[field]).find(Boolean) || "";
}

function isExternalAsset(value = "") {
  return /^https?:\/\//i.test(String(value)) || /^data:/i.test(String(value));
}

function imageAssetStatus(path = "") {
  return imageAssetInfo(path).then((info) => info.status);
}

function imageAssetInfo(path = "") {
  if (!path) return Promise.resolve({ status: "missing", width: 0, height: 0 });
  if (isExternalAsset(path)) return Promise.resolve({ status: "external", width: 0, height: 0 });
  const cleanPath = String(path).split(/[?#]/)[0];
  if (assetInfoCache.has(cleanPath)) return assetInfoCache.get(cleanPath);
  const infoPromise = new Promise((resolve) => {
    const image = new Image();
    const timer = window.setTimeout(() => resolve({ status: "broken", width: 0, height: 0 }), 3200);
    image.onload = () => {
      window.clearTimeout(timer);
      resolve({ status: "ok", width: image.naturalWidth || 0, height: image.naturalHeight || 0 });
    };
    image.onerror = () => {
      window.clearTimeout(timer);
      resolve({ status: "broken", width: 0, height: 0 });
    };
    image.src = catalogSitePath(cleanPath);
  });
  assetInfoCache.set(cleanPath, infoPromise);
  return infoPromise;
}

function imageQualityLabel(info = {}) {
  if (info.status !== "ok") return info.status || "missing";
  const shortest = Math.min(Number(info.width || 0), Number(info.height || 0));
  if (shortest >= 900) return "hero-ready";
  if (shortest >= 600) return "card-ready";
  return "too-small";
}

function assetIssueList(title, rows) {
  const visible = rows.slice(0, 8);
  return `
    <article class="asset-coverage-list">
      <span>${pageEscape(title)}</span>
      <strong>${rows.length ? `${rows.length} records` : "Clear"}</strong>
      ${visible.length ? `<ul>${visible.map((row) => `
        <li>
          <b>${pageEscape(row.name)}</b>
          <small>${pageEscape(row.note)}</small>
          ${row.path ? `<code>${pageEscape(row.path)}</code>` : ""}
        </li>
      `).join("")}</ul>` : `<small>No records in this group.</small>`}
    </article>
  `;
}

function localLinkPath(value = "") {
  const link = String(value || "").trim();
  if (!link || link.startsWith("#") || /^https?:\/\//i.test(link) || /^mailto:/i.test(link)) return "";
  const cleanLink = link.split("#")[0].split("?")[0].replace(/^\.\//, "");
  if (!cleanLink || cleanLink.endsWith("/")) return "";
  return cleanLink;
}

async function localLinkStatus(path = "") {
  const cleanPath = localLinkPath(path);
  if (!cleanPath) return "external";
  if (linkStatusCache.has(cleanPath)) return linkStatusCache.get(cleanPath);
  const statusPromise = fetch(catalogSitePath(cleanPath), { cache: "no-store" })
    .then((response) => (response.ok ? "ok" : "broken"))
    .catch(() => "unknown");
  linkStatusCache.set(cleanPath, statusPromise);
  return statusPromise;
}

function linkIssueList(title, rows) {
  const visible = rows.slice(0, 8);
  return `
    <article class="asset-coverage-list">
      <span>${pageEscape(title)}</span>
      <strong>${rows.length ? `${rows.length} links` : "Clear"}</strong>
      ${visible.length ? `<ul>${visible.map((row) => `<li><b>${pageEscape(row.name)}</b><small>${pageEscape(row.note)}</small></li>`).join("")}</ul>` : `<small>No links in this group.</small>`}
    </article>
  `;
}

function qualityIssueCard(title, rows) {
  const visible = rows.slice(0, 10);
  return `
    <article class="asset-coverage-list quality-worklist-card">
      <span>${pageEscape(title)}</span>
      <strong>${rows.length ? `${rows.length} tasks` : "Clear"}</strong>
      ${visible.length ? `<ul>${visible.map((row) => `
        <li>
          <b>${row.href ? `<a href="${pageEscape(row.href)}">${pageEscape(row.name)}</a>` : pageEscape(row.name)}</b>
          <small>${pageEscape(row.note)}</small>
          ${row.action ? `<code>${pageEscape(row.action)}</code>` : ""}
        </li>
      `).join("")}</ul><small>Showing ${visible.length} of ${rows.length} records in this group.</small>` : `<small>No records in this priority group.</small>`}
    </article>
  `;
}

function qualityActionItem(rank, item) {
  return `
    <article class="quality-action-card ${item.severity ? `quality-${pageEscape(item.severity)}` : ""}">
      <div>
        <span>${pageEscape(rank)} · ${pageEscape(item.group)}</span>
        <strong>${item.href ? `<a href="${pageEscape(item.href)}">${pageEscape(item.name)}</a>` : pageEscape(item.name)}</strong>
        <small>${pageEscape(item.note)}</small>
      </div>
      ${item.action ? `<code>${pageEscape(item.action)}</code>` : ""}
    </article>
  `;
}

function qualitySourceCount(record) {
  return sourceList(record.website || record.source, record.sourceLinks).length;
}

function qualityPriceLabel(robot) {
  const price = pageNormalize(robot.price || "");
  const visibility = Number(robot.priceVisibility || 0);
  if (visibility >= 4 || price.includes("$") || price.includes("usd") || price.includes("eur")) return "price signal visible";
  if (visibility >= 2 || price.includes("enterprise") || price.includes("quote")) return "partial price signal";
  return "price unclear";
}

function qualityPriceRecordIssues(price = {}) {
  const issues = [];
  ["robot", "company", "priceText", "sourceType", "source", "confidence", "lastChecked"].forEach((field) => {
    if (price[field] === undefined || price[field] === null || String(price[field]).trim() === "") issues.push(`missing ${field}`);
  });
  if (Number(price.confidence || 0) < 3) issues.push("low confidence");
  const checked = Date.parse(`${price.lastChecked || ""}T00:00:00Z`);
  if (!Number.isFinite(checked) || ((Date.now() - checked) / 86400000) > 45) issues.push("stale price check");
  if (price.source && !/^https?:\/\//i.test(String(price.source))) issues.push("source is not http(s)");
  return issues;
}

async function renderDataQualityDashboard() {
  const panel = document.querySelector("[data-data-quality-dashboard]");
  if (!panel) return;

  const companies = pageState.companies || [];
  const robots = pageState.robots || [];
  const signals = pageState.signals || [];
  const prices = pageState.prices || [];
  const companyRows = await Promise.all(companies.map(async (company) => {
    const logo = recordAssetPath(company, ["logo", "logoImage"]);
    const profileMark = recordAssetPath(company, ["logo", "logoImage", "image", "heroImage"]);
    const href = companyProfileHref(company);
    return {
      name: company.name || "Unnamed company",
      logo,
      profileMark,
      href,
      sourceCount: qualitySourceCount(company),
      logoStatus: await imageAssetStatus(logo),
      profileStatus: await imageAssetStatus(profileMark),
      pageStatus: await localLinkStatus(href)
    };
  }));
  const robotRows = await Promise.all(robots.map(async (robot) => {
    const image = recordAssetPath(robot, ["image", "heroImage"]);
    const imageInfo = await imageAssetInfo(image);
    const href = robotProfileHref(robot);
    return {
      name: robot.name || "Unnamed robot",
      company: robot.company || "",
      image,
      imageWidth: imageInfo.width,
      imageHeight: imageInfo.height,
      imageQuality: imageQualityLabel(imageInfo),
      href,
      priceLabel: qualityPriceLabel(robot),
      priceVisibility: Number(robot.priceVisibility || 0),
      sourceCount: qualitySourceCount(robot),
      imageStatus: imageInfo.status,
      pageStatus: await localLinkStatus(href)
    };
  }));
  const signalRows = await Promise.all(signals.map(async (signal) => {
    const href = localLinkPath(signal.relatedUrl || "");
    return {
      name: signal.title || "Untitled signal",
      href,
      pageStatus: href ? await localLinkStatus(href) : "external"
    };
  }));

  const broken = [
    ...companyRows.filter((row) => row.profileStatus === "broken").map((row) => ({ name: row.name, href: row.href, note: `Broken company visual: ${row.profileMark}`, action: "Fix asset path or replace file" })),
    ...robotRows.filter((row) => row.imageStatus === "broken").map((row) => ({ name: row.name, href: row.href, note: `Broken robot image: ${row.image}`, action: "Fix image path or replace file" })),
    ...companyRows.filter((row) => row.pageStatus === "broken").map((row) => ({ name: row.name, href: row.href, note: `Missing company profile: ${row.href}`, action: "Run node scripts/health-check.mjs --write" })),
    ...robotRows.filter((row) => row.pageStatus === "broken").map((row) => ({ name: row.name, href: row.href, note: `Missing robot profile: ${row.href}`, action: "Run node scripts/health-check.mjs --write" })),
    ...signalRows.filter((row) => row.pageStatus === "broken").map((row) => ({ name: row.name, note: `Broken signal relatedUrl: ${row.href}`, action: "Fix relatedUrl or regenerate profile" }))
  ];
  const missingRobotVisuals = robotRows
    .filter((row) => row.imageStatus === "missing")
    .map((row) => ({ name: row.name, href: row.href, note: row.company ? `No robot image field · ${row.company}` : "No robot image field", action: `assets/robots/${seoSlug(row.company || row.name)}/${seoSlug(row.name)}/hero.png` }));
  const missingCompanyVisuals = companyRows
    .filter((row) => row.profileStatus === "missing")
    .map((row) => ({ name: row.name, href: row.href, note: "No logo, image, or heroImage field", action: `assets/companies/${seoSlug(row.name)}/logo.svg` }));
  const missingLogos = companyRows
    .filter((row) => row.logoStatus === "missing")
    .map((row) => ({ name: row.name, href: row.href, note: row.profileMark ? "Profile visual exists, but dedicated logo field is empty" : "No dedicated logo field", action: `assets/companies/${seoSlug(row.name)}/logo.svg` }));
  const lowQualityVisuals = robotRows
    .filter((row) => row.imageStatus === "ok" && row.imageQuality === "too-small")
    .map((row) => ({ name: row.name, href: row.href, note: `${row.imageWidth}x${row.imageHeight} local robot image · shortest side is under 600px`, action: row.image ? `Replace ${row.image} with a 900x900 preferred source image` : "Add hero image" }));
  const companySourceGaps = companies
    .filter((company) => qualitySourceCount(company) < 2)
    .map((company) => ({ name: company.name || "Unnamed company", href: companyProfileHref(company), note: "Only one official/source link tracked", action: "Add sourceLinks in modular company JSON" }));
  const robotSourceGaps = robots
    .filter((robot) => qualitySourceCount(robot) < 2)
    .map((robot) => ({ name: robot.name || "Unnamed robot", href: robotProfileHref(robot), note: "Only one official/source link tracked", action: "Add sourceLinks in modular robot JSON" }));
  const priceGaps = robotRows
    .filter((row) => row.priceVisibility <= 1)
    .map((row) => ({ name: row.name, href: row.href, note: `${row.priceLabel} · verify whether price is official, quote-only, or unavailable`, action: "Update price, priceVisibility, or price source" }));
  const priceAuditGaps = prices
    .map((price) => ({ price, issues: qualityPriceRecordIssues(price) }))
    .filter((row) => row.issues.length)
    .map(({ price, issues }) => ({
      name: `${price.company || "Unknown company"} / ${price.robot || "Unknown robot"}`,
      href: price.source,
      note: issues.join(", "),
      action: "Update modular price record or source metadata"
    }));
  const priceSourceTypes = prices.reduce((acc, price) => {
    const type = priceSourceLabel(price.sourceType || "unknown");
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
  const priceSourceSummary = Object.entries(priceSourceTypes).map(([type, count]) => `${type} ${count}`).join(" · ") || "No structured price records";

  const nextActions = [
    ...broken.map((row) => ({ ...row, group: "Fix first", severity: "critical", weight: 100 })),
    ...missingRobotVisuals.map((row) => ({ ...row, group: "Add robot image", severity: "high", weight: 90 })),
    ...lowQualityVisuals.map((row) => ({ ...row, group: "Upgrade robot image", severity: "medium", weight: 75 })),
    ...missingCompanyVisuals.map((row) => ({ ...row, group: "Add company visual", severity: "medium", weight: 70 })),
    ...missingLogos.map((row) => ({ ...row, group: "Add logo", severity: "medium", weight: 65 })),
    ...robotSourceGaps.map((row) => ({ ...row, group: "Add robot sources", severity: "medium", weight: 55 })),
    ...companySourceGaps.map((row) => ({ ...row, group: "Add company sources", severity: "medium", weight: 50 })),
    ...priceAuditGaps.map((row) => ({ ...row, group: "Fix price source", severity: "medium", weight: 45 })),
    ...priceGaps.map((row) => ({ ...row, group: "Clarify price", severity: "low", weight: 35 }))
  ]
    .sort((a, b) => b.weight - a.weight || String(a.name).localeCompare(String(b.name)))
    .slice(0, 6);

  const companySourceReady = companies.filter((company) => qualitySourceCount(company) >= 2).length;
  const robotSourceReady = robots.filter((robot) => qualitySourceCount(robot) >= 2).length;
  const multiSource = companySourceReady + robotSourceReady;
  const heroReadyRobots = robotRows.filter((row) => row.imageQuality === "hero-ready" || row.imageStatus === "external").length;
  const robotVisualTasks = missingRobotVisuals.length + lowQualityVisuals.length;
  const priorityTotal = broken.length + missingRobotVisuals.length + lowQualityVisuals.length + missingCompanyVisuals.length + missingLogos.length + companySourceGaps.length + robotSourceGaps.length + priceAuditGaps.length + priceGaps.length;

  panel.innerHTML = `
    <div class="asset-coverage-grid quality-score-grid">
      <article class="${broken.length ? "asset-warning-card" : "asset-ok-card"}"><span>Fix first</span><strong>${broken.length}</strong><small>${broken.length ? "Broken paths or pages should be handled before publishing." : "No broken local paths or generated profile pages detected."}</small></article>
      <article><span>Robot visual tasks</span><strong>${robotVisualTasks}</strong><small>${missingRobotVisuals.length} missing robot images · ${lowQualityVisuals.length} low-resolution robot visuals.</small></article>
      <article><span>Hero-ready robots</span><strong>${heroReadyRobots}/${robots.length}</strong><small>Local robot images with 900px+ shortest side, plus external source visuals.</small></article>
      <article><span>Source depth</span><strong>${multiSource}/${companies.length + robots.length}</strong><small>${companySourceReady}/${companies.length} companies · ${robotSourceReady}/${robots.length} robots have at least two sources.</small></article>
    </div>
    <div class="quality-summary-strip">
      <article><span>Open quality tasks</span><strong>${priorityTotal}</strong><small>Work left across visuals, logos, sources, price clarity, and broken links.</small></article>
      <article class="${priceAuditGaps.length ? "asset-warning-card" : "asset-ok-card"}"><span>Structured prices</span><strong>${prices.length} records</strong><small>${priceAuditGaps.length ? `${priceAuditGaps.length} price source issues need review.` : `Price source audit clear · ${priceSourceSummary}`}</small></article>
      <article><span>Recommended next command</span><strong>node scripts/health-check.mjs</strong><small>Run after each data or asset batch, then regenerate with --write when records change.</small></article>
    </div>
    <section class="quality-action-section" aria-label="Recommended data quality actions">
      <div>
        <span>Next best actions</span>
        <strong>${nextActions.length ? `${nextActions.length} prioritized fixes` : "Queue clear"}</strong>
        <small>Sorted by deploy risk first, then robot visuals, company visuals, logos, sources, and price clarity.</small>
      </div>
      <div class="quality-action-grid">
        ${nextActions.length ? nextActions.map((item, index) => qualityActionItem(`#${index + 1}`, item)).join("") : `<article class="quality-action-card quality-clear"><div><span>Clear</span><strong>No priority actions</strong><small>The current data quality queue has no visible tasks.</small></div></article>`}
      </div>
    </section>
    <div class="quality-worklist-grid">
      ${qualityIssueCard("1. Broken paths and pages", broken)}
      ${qualityIssueCard("2. Missing robot images", missingRobotVisuals)}
      ${qualityIssueCard("3. Low-resolution robot images", lowQualityVisuals)}
      ${qualityIssueCard("4. Missing company visuals", missingCompanyVisuals)}
      ${qualityIssueCard("5. Missing dedicated logos", missingLogos)}
      ${qualityIssueCard("6. Robot source depth gaps", robotSourceGaps)}
      ${qualityIssueCard("7. Company source depth gaps", companySourceGaps)}
      ${qualityIssueCard("8. Structured price source issues", priceAuditGaps)}
      ${qualityIssueCard("9. Price clarity gaps", priceGaps)}
    </div>
  `;
}

async function renderLinkIntegrityPanel() {
  const panel = document.querySelector("[data-link-integrity]");
  if (!panel) return;

  const companies = pageState.companies || [];
  const robots = pageState.robots || [];
  const signals = pageState.signals || [];
  const companyRows = await Promise.all(companies.map(async (company) => {
    const href = companyProfileHref(company);
    return {
      name: company.name || "Unnamed company",
      href,
      status: await localLinkStatus(href)
    };
  }));
  const robotRows = await Promise.all(robots.map(async (robot) => {
    const href = robotProfileHref(robot);
    return {
      name: robot.name || "Unnamed robot",
      href,
      status: await localLinkStatus(href)
    };
  }));
  const signalRows = await Promise.all(signals.map(async (signal) => {
    const href = localLinkPath(signal.relatedUrl || "");
    return {
      name: signal.title || "Untitled signal",
      href,
      status: href ? await localLinkStatus(href) : "external"
    };
  }));

  const companyReady = companyRows.filter((row) => row.status === "ok");
  const robotReady = robotRows.filter((row) => row.status === "ok");
  const signalReady = signalRows.filter((row) => row.status === "ok" || row.status === "external");
  const brokenCompanies = companyRows.filter((row) => row.status === "broken").map((row) => ({ name: row.name, note: row.href }));
  const brokenRobots = robotRows.filter((row) => row.status === "broken").map((row) => ({ name: row.name, note: row.href }));
  const brokenSignals = signalRows.filter((row) => row.status === "broken").map((row) => ({ name: row.name, note: row.href }));
  const unknownLinks = [...companyRows, ...robotRows, ...signalRows]
    .filter((row) => row.status === "unknown")
    .map((row) => ({ name: row.name, note: row.href || "Browser could not verify this local link" }));
  const brokenTotal = brokenCompanies.length + brokenRobots.length + brokenSignals.length;

  panel.innerHTML = `
    <div class="asset-coverage-grid">
      <article><span>Company profile pages</span><strong>${companyReady.length}/${companies.length}</strong><small>Generated pages expected under companies/*.html.</small></article>
      <article><span>Robot profile pages</span><strong>${robotReady.length}/${robots.length}</strong><small>Generated pages expected under robots/*.html.</small></article>
      <article><span>Signal related URLs</span><strong>${signalReady.length}/${signals.length}</strong><small>Local signal links plus external source-backed links.</small></article>
      <article class="${brokenTotal ? "asset-warning-card" : "asset-ok-card"}"><span>Broken local links</span><strong>${brokenTotal}</strong><small>${brokenTotal ? "Regenerate pages or fix relatedUrl paths before deploy." : "No broken local profile or signal links detected."}</small></article>
    </div>
    <div class="asset-issue-grid">
      ${linkIssueList("Broken company pages", brokenCompanies)}
      ${linkIssueList("Broken robot pages", brokenRobots)}
      ${linkIssueList("Broken signal links", brokenSignals)}
      ${linkIssueList("Unverified local links", unknownLinks)}
    </div>
  `;
}

async function renderAssetCoveragePanel() {
  const panel = document.querySelector("[data-asset-coverage]");
  if (!panel) return;

  const companies = pageState.companies || [];
  const robots = pageState.robots || [];
  const companyRows = await Promise.all(companies.map(async (company) => {
    const logo = recordAssetPath(company, ["logo", "logoImage"]);
    const profileMark = recordAssetPath(company, ["logo", "logoImage", "image", "heroImage"]);
    return {
      name: company.name || "Unnamed company",
      logo,
      profileMark,
      logoStatus: await imageAssetStatus(logo),
      profileStatus: await imageAssetStatus(profileMark)
    };
  }));
  const robotRows = await Promise.all(robots.map(async (robot) => {
    const image = recordAssetPath(robot, ["image", "heroImage"]);
    return {
      name: robot.name || "Unnamed robot",
      company: robot.company || "",
      image,
      imageStatus: await imageAssetStatus(image)
    };
  }));

  const profileReady = companyRows.filter((row) => row.profileStatus === "ok" || row.profileStatus === "external");
  const properLogos = companyRows.filter((row) => row.logoStatus === "ok" || row.logoStatus === "external");
  const robotImages = robotRows.filter((row) => row.imageStatus === "ok" || row.imageStatus === "external");
  const brokenCompanies = companyRows.filter((row) => row.profileStatus === "broken").map((row) => ({ name: row.name, note: row.profileMark }));
  const missingCompanyMarks = companyRows.filter((row) => row.profileStatus === "missing").map((row) => ({ name: row.name, note: "No logo, image, or heroImage field" }));
  const missingProperLogos = companyRows.filter((row) => row.logoStatus === "missing").map((row) => ({
    name: row.name,
    note: row.profileMark ? "Profile can fall back to image, but logo field is empty" : "No logo field",
    path: `assets/companies/${seoSlug(row.name)}/logo.svg`
  }));
  const brokenRobots = robotRows.filter((row) => row.imageStatus === "broken").map((row) => ({ name: row.name, note: row.image }));
  const missingRobots = robotRows.filter((row) => row.imageStatus === "missing").map((row) => ({ name: row.name, note: row.company || "No image field" }));
  const brokenTotal = brokenCompanies.length + brokenRobots.length;

  panel.innerHTML = `
    <div class="asset-coverage-grid">
      <article><span>Company profile marks</span><strong>${profileReady.length}/${companies.length}</strong><small>Uses logo first, then logoImage, image, or heroImage as fallback.</small></article>
      <article><span>Dedicated company logos</span><strong>${properLogos.length}/${companies.length}</strong><small>Records with an actual logo or logoImage field.</small></article>
      <article><span>Robot images</span><strong>${robotImages.length}/${robots.length}</strong><small>Robot cards and generated profiles with usable image paths.</small></article>
      <article class="${brokenTotal ? "asset-warning-card" : "asset-ok-card"}"><span>Broken local paths</span><strong>${brokenTotal}</strong><small>${brokenTotal ? "Fix these before deploy." : "No broken local image paths detected in the browser check."}</small></article>
    </div>
    <div class="asset-issue-grid">
      ${assetIssueList("Broken company visuals", brokenCompanies)}
      ${assetIssueList("Missing company profile marks", missingCompanyMarks)}
      ${assetIssueList("Missing dedicated logos", missingProperLogos)}
      ${assetIssueList("Broken robot images", brokenRobots)}
      ${assetIssueList("Missing robot images", missingRobots)}
    </div>
  `;
}

function companyRobotCategories(company, robots = []) {
  const categories = robots.map((robot) => robot.category).filter(Boolean);
  if (!categories.length && company.category) categories.push(company.category);
  return [...new Set(categories)].slice(0, 4);
}

function companyMarketThesis(company, robots = []) {
  const text = pageNormalize([company.category, company.robot, ...robots.map((robot) => `${robot.category} ${robot.useCase}`)].join(" "));
  if (text.includes("quadruped")) return "Field robotics and inspection signal";
  if (text.includes("humanoid")) return "Humanoid embodiment signal";
  if (text.includes("wearable") || text.includes("exo")) return "Mobility assistance and gait robotics signal";
  if (text.includes("warehouse") || text.includes("logistics")) return "Automation throughput signal";
  if (text.includes("ai") || text.includes("embodied")) return "Physical AI infrastructure signal";
  return "Robotics ecosystem signal";
}

function companyStrategicThesis(company, robots = []) {
  const focus = primaryFocus(company, "company");
  const robotNames = robots.map((robot) => robot.name).filter(Boolean).slice(0, 3);
  const segmentText = strategicSegments(company, "company")
    .filter((segment) => segment !== focus)
    .slice(0, 4)
    .join(", ");
  if (focus === "Humanoids") return `${company.name} is part of the humanoid robotics watchlist because its products, research, or market activity point toward general-purpose embodied labor. ${robotNames.length ? `Tracked products include ${robotNames.join(", ")}.` : "Robot profile coverage is still being expanded."}`;
  if (focus === "Embodied AI") return `${company.name} is tracked as an embodied AI signal: models, data, autonomy, and robot learning that may move AI systems into physical environments. ${segmentText ? `Relevant segments include ${segmentText}.` : ""}`;
  if (focus === "Physical AI") return `${company.name} sits in the physical AI stack: compute, simulation, autonomy, robotics models, or infrastructure that helps machines perceive and act in the real world. ${segmentText ? `Relevant segments include ${segmentText}.` : ""}`;
  if (focus === "Autonomous Robotics") return `${company.name} is tracked for autonomous robotics deployment: mobile systems, field robots, delivery, inspection, logistics, or other real-world automation lanes. ${robotNames.length ? `Tracked products include ${robotNames.join(", ")}.` : ""}`;
  return `${company.name} remains in RoboLogAI as secondary robotics coverage. It may not be the core humanoid or physical AI lane, but it provides useful market context around industrial, medical, warehouse, research, or service robotics.`;
}

function companyRobotLineupCard(robot, company) {
  const tracked = Boolean(robot.company && robotSlug(robot));
  const score = tracked ? robotScore(robot) : null;
  const href = tracked ? robotProfileHref(robot) : company.website || "#";
  return `
    <article class="product-lineup-card ${robot.image ? "has-visual" : ""}">
      <figure class="${robot.image ? "" : "catalog-visual-empty"}">
        ${robot.image ? `<img src="${pageEscape(robot.image)}" alt="${pageEscape(robot.name)} robot" loading="lazy" decoding="async">` : `<span>${pageEscape(pageInitials(robot.name || company.name))}</span>`}
        ${score ? `<figcaption>${score}<small>R-Score</small></figcaption>` : ""}
      </figure>
      <div>
        <span>${pageEscape(robot.category || company.category)}</span>
        <strong>${pageEscape(robot.name)}</strong>
        <small>${pageEscape(robot.useCase || company.category)}</small>
        <em>${pageEscape(robotPriceSignal(robot))}</em>
        <a href="${pageEscape(href)}"${tracked ? "" : " target=\"_blank\" rel=\"noopener noreferrer\""}>${tracked ? "Robot profile" : "Official source"} →</a>
      </div>
    </article>
  `;
}

function companySegmentPills(company) {
  return strategicSegments(company, "company")
    .slice(0, 8)
    .map((segment) => `<span>${pageEscape(segment)}</span>`)
    .join("");
}

function robotPriceSignal(robot) {
  if (!robot?.price) return "Price not listed";
  if (Number(robot.priceVisibility || 0) >= 4) return robot.price;
  if (Number(robot.priceVisibility || 0) >= 2) return `${robot.price} · reference signal`;
  return robot.price;
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

function catalogSitePath(path) {
  const cleanPath = path.replace(/^\/+/, "");
  const currentPath = window.location.pathname.endsWith("/") ? `${window.location.pathname}index.html` : window.location.pathname;
  const depth = Math.max(0, currentPath.split("/").filter(Boolean).length - 1);
  return `${"../".repeat(depth)}${cleanPath}`;
}

function renderRobotCards() {
  const grid = document.querySelector("[data-robots-grid]");
  const overview = document.querySelector("[data-robot-overview]");
  const segments = document.querySelector("[data-robot-segments]");
  if (!grid && !overview && !segments) return;
  renderAdvancedRobotFilters();
  const rankings = new Map(robotRankings().map((item) => [robotSlug(item.robot), item.rank]));
  const allRobots = pageState.robots;
  if (overview) {
    const categories = new Set(allRobots.map((robot) => robot.category).filter(Boolean)).size;
    const coreRobots = allRobots.filter((robot) => primaryFocus(robot, "robot") !== "Secondary").length;
    const priced = allRobots.filter((robot) => Number(robot.priceVisibility || 0) >= 2).length;
    const sourced = allRobots.filter((robot) => robot.source).length;
    overview.innerHTML = `
      <article><span>Robot profiles</span><strong>${allRobots.length}</strong><small>${categories} legacy categories still tracked</small></article>
      <article><span>Core focus</span><strong>${coreRobots}</strong><small>Humanoid, embodied, physical AI, and autonomous systems</small></article>
      <article><span>Commercial access</span><strong>${priced}</strong><small>Deployable, available, or price/reference signal</small></article>
      <article><span>Source-backed</span><strong>${sourced}/${allRobots.length}</strong><small>Official product or company links</small></article>
    `;
  }
  if (segments) {
    const segmentDefs = [
      ["Humanoids", (robot) => matchesStrategicFilter(robot, "humanoids", "robot")],
      ["Quadrupeds", (robot) => matchesStrategicFilter(robot, "quadrupeds", "robot")],
      ["Embodied AI", (robot) => matchesStrategicFilter(robot, "embodied-ai", "robot")],
      ["Physical AI", (robot) => matchesStrategicFilter(robot, "physical-ai", "robot")],
      ["Autonomous robotics", (robot) => matchesStrategicFilter(robot, "autonomous-robotics", "robot")],
      ["China robotics lens", (robot) => matchesStrategicFilter(robot, "china-robotics", "robot")],
      ["Secondary coverage", (robot) => matchesStrategicFilter(robot, "secondary", "robot")]
    ];
    segments.innerHTML = segmentDefs.map(([label, predicate]) => {
      const matches = allRobots.filter(predicate);
      const leader = [...matches].sort((a, b) => robotScore(b) - robotScore(a))[0];
      return `
        <article>
          <span>${pageEscape(label)}</span>
          <strong>${matches.length}</strong>
          <small>${leader ? `${pageEscape(leader.name)} leads this segment at ${robotScore(leader)} R-Score.` : "No robots matched yet."}</small>
          ${leader ? `<a href="${pageEscape(robotProfileHref(leader))}">Open segment lead →</a>` : ""}
        </article>
      `;
    }).join("");
  }
  if (!grid) return;
  const terms = pageNormalize(pageState.query).split(/\s+/).filter(Boolean);
  const filter = pageNormalize(pageState.robotFilter);
  const robots = pageState.robots.filter((robot) => {
    const text = robotText(robot);
    const matchesQuery = !terms.length || terms.every((term) => text.includes(term));
    const matchesFilter = matchesStrategicFilter(robot, filter, "robot");
    const matchesUseCase = pageState.robotUseCaseFilter === "all" || robotUseCases(robot).some((item) => item.slug === pageState.robotUseCaseFilter);
    const matchesCountry = pageState.robotCountryFilter === "all" || countrySlug(robot.country) === pageState.robotCountryFilter;
    const matchesScore = pageState.robotScoreFilter === "all" || (
      pageState.robotScoreFilter === "leader" ? robotScore(robot) >= 68 :
      pageState.robotScoreFilter === "watchlist" ? robotScore(robot) >= 52 && robotScore(robot) < 68 :
      robotScore(robot) < 52
    );
    const matchesCommercial = matchesCommercialFilter(robot, pageState.robotCommercialFilter);
    const matchesVideo = !pageState.robotVideoOnly || Boolean(robotVideo(robot));
    const matchesPrice = !pageState.robotPricedOnly || Number(robot.priceVisibility || 0) >= 2;
    return matchesQuery && matchesFilter && matchesUseCase && matchesCountry && matchesScore && matchesCommercial && matchesVideo && matchesPrice;
  });

  grid.innerHTML = robots.map((robot) => {
    const video = robotVideo(robot);
    const quality = robotQuality(robot);
    const commercial = commercialAccessSummary(robot);
    const rank = rankings.get(robotSlug(robot));
    const company = pageState.companies.find((item) => pageNormalize(item.name) === pageNormalize(robot.company));
    return `
    <article class="catalog-card robot-catalog-card">
      <figure class="catalog-visual ${robot.image ? "" : "catalog-visual-empty"}">
        ${robot.image ? `<img src="${pageEscape(robot.image)}" alt="${pageEscape(robot.name)} robot" loading="lazy" decoding="async">` : `<span>${pageEscape(pageInitials(robot.name))}</span>`}
        ${rank ? `<div class="robot-rank-chip">#${rank}</div>` : ""}
        <div class="catalog-media-chip">${pageEscape(robot.image ? "Visual verified" : "Visual pending")}</div>
        <figcaption>${robotScore(robot)} <small>R-Score</small></figcaption>
      </figure>
      <div class="catalog-card-body">
        <div class="database-tags">
          <span>${pageEscape(primaryFocus(robot, "robot"))}</span>
          <span>${pageEscape(robot.category || "Robot")}</span>
          <span>${pageEscape(robot.country || "Global")}</span>
          <span>${pageEscape(scoreLabel(robotScore(robot)))}</span>
          ${commercial.enabled ? `<span class="commercial-access-chip">${pageEscape(commercial.type)}</span>` : ""}
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
          <div><dt>Access</dt><dd>${pageEscape(commercial.enabled ? `${commercial.type} · ${commercial.regionLabel}` : "Not verified")}</dd></div>
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
          <span>${pageEscape(commercial.partnerLabel)}</span>
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
          ${company ? `<a href="${pageEscape(companyProfileHref(company))}">Company →</a>` : ""}
          <a href="compare.html?robots=${pageEscape(robotSlug(robot))}">Compare →</a>
          <a href="${pageEscape(robot.source || "#")}" target="_blank" rel="noopener noreferrer">Official source →</a>
        </div>
      </div>
    </article>
  `;
  }).join("") || `<article class="catalog-card robot-empty-card"><h2>No matching robots</h2><p>Try a broader search or reset filters to scan the full robotics database.</p></article>`;
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
  const commercialSelect = document.querySelector("[data-robot-commercial-filter]");
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
  if (commercialSelect) {
    commercialSelect.value = pageState.robotCommercialFilter;
  }
}

function renderCompanyCards() {
  const grid = document.querySelector("[data-companies-grid]");
  const overview = document.querySelector("[data-company-overview]");
  const coreLayer = document.querySelector("[data-company-core-layer]");
  const segments = document.querySelector("[data-company-segments]");
  if (!grid && !overview && !coreLayer && !segments) return;
  const terms = pageNormalize(pageState.query).split(/\s+/).filter(Boolean);
  const filter = pageNormalize(pageState.companyFilter);
  const companiesAll = pageState.companies;
  const linkedCompanyCount = companiesAll.filter((company) => {
    const names = listedRobotNames(company.robot);
    return pageState.robots.some((robot) => pageNormalize(robot.company) === pageNormalize(company.name) || names.includes(pageNormalize(robot.name)));
  }).length;
  const publicCount = companiesAll.filter((company) => pageNormalize(company.type).includes("public")).length;
  const privateCount = companiesAll.filter((company) => pageNormalize(company.type).includes("private")).length;
  const coreCompanyCount = companiesAll.filter((company) => primaryFocus(company, "company") !== "Secondary").length;
  const companies = pageState.companies.filter((company) => {
    const text = companyText(company);
    const matchesQuery = !terms.length || terms.every((term) => text.includes(term));
    const matchesFilter = matchesStrategicFilter(company, filter, "company");
    return matchesQuery && matchesFilter;
  });

  if (overview) {
    overview.innerHTML = `
      <article><span>Companies</span><strong>${companiesAll.length}</strong><small>${publicCount} public · ${privateCount} private</small></article>
      <article><span>Core focus</span><strong>${coreCompanyCount}</strong><small>Humanoid, embodied, physical AI, and autonomous robotics</small></article>
      <article><span>Countries</span><strong>${new Set(companiesAll.map((company) => broadCountryName(company.country)).filter(Boolean)).size}</strong><small>Regional robotics and AI coverage</small></article>
      <article><span>Robot-linked</span><strong>${linkedCompanyCount}</strong><small>Companies connected to tracked robot profiles</small></article>
    `;
  }

  if (coreLayer) {
    const layerDefs = [
      {
        label: "Humanoid Builders",
        filter: "humanoids",
        thesis: "Body-first builders turning humanoid demos into factory, home, warehouse, and research platforms."
      },
      {
        label: "Embodied AI Labs",
        filter: "embodied-ai",
        thesis: "AI-first teams shaping manipulation, robot learning, and embodied model capability."
      },
      {
        label: "Physical AI Stack",
        filter: "physical-ai",
        thesis: "Compute, simulation, data, autonomy, and model infrastructure behind real-world robots."
      },
      {
        label: "Autonomous Robotics",
        filter: "autonomous-robotics",
        thesis: "Mobility, delivery, field autonomy, drones, marine systems, and inspection routes."
      },
      {
        label: "Secondary Coverage",
        filter: "secondary",
        thesis: "Industrial, warehouse, medical, quadruped, delivery, and research platforms stay tracked."
      }
    ];
    coreLayer.innerHTML = layerDefs.map((lane) => {
      const matches = companiesAll.filter((company) => matchesStrategicFilter(company, lane.filter, "company"));
      const linkedMatches = matches.map((company) => ({
        company,
        robots: pageState.robots.filter((robot) => pageNormalize(robot.company) === pageNormalize(company.name) || listedRobotNames(company.robot).includes(pageNormalize(robot.name)))
      }));
      const leader = linkedMatches.find((item) => item.robots.length && item.company.website)?.company || matches.find((company) => company.website) || matches[0];
      const publicCount = matches.filter((company) => pageNormalize(company.type).includes("public")).length;
      const privateCount = matches.filter((company) => pageNormalize(company.type).includes("private")).length;
      return `
        <article class="${lane.filter === "secondary" ? "is-secondary" : "is-core"}">
          <button type="button" data-company-core-filter="${pageEscape(lane.filter)}">
            <span>${lane.filter === "secondary" ? "Secondary" : "Core"}</span>
            <strong>${pageEscape(lane.label)}</strong>
            <small>${pageEscape(lane.thesis)}</small>
            <b>${matches.length} companies</b>
            <em>${publicCount} public · ${privateCount} private</em>
          </button>
          ${leader ? `<a href="${pageEscape(companyProfileHref(leader))}">Lead profile · ${pageEscape(leader.name)} →</a>` : ""}
        </article>
      `;
    }).join("");
  }

  if (segments) {
    const segmentDefs = [
      ["Humanoid builders", (company) => matchesStrategicFilter(company, "humanoids", "company")],
      ["Embodied AI", (company) => matchesStrategicFilter(company, "embodied-ai", "company")],
      ["Physical AI", (company) => matchesStrategicFilter(company, "physical-ai", "company")],
      ["Autonomous robotics", (company) => matchesStrategicFilter(company, "autonomous-robotics", "company")],
      ["China robotics lens", (company) => matchesStrategicFilter(company, "china-robotics", "company")],
      ["Secondary robotics coverage", (company) => matchesStrategicFilter(company, "secondary", "company")]
    ];
    segments.innerHTML = segmentDefs.map(([label, predicate]) => {
      const matches = companiesAll.filter(predicate);
      const leader = matches.find((company) => company.website) || matches[0];
      return `
        <article>
          <span>${pageEscape(label)}</span>
          <strong>${matches.length}</strong>
          <small>${leader ? `${pageEscape(leader.name)} is a representative profile in this lane.` : "No companies matched yet."}</small>
          ${leader ? `<a href="${pageEscape(companyProfileHref(leader))}">Open segment lead →</a>` : ""}
        </article>
      `;
    }).join("");
  }

  if (!grid) return;
  grid.innerHTML = companies.map((company) => {
    const linkedRobots = pageState.robots.filter((robot) => pageNormalize(robot.company) === pageNormalize(company.name) || listedRobotNames(company.robot).includes(pageNormalize(robot.name)));
    const quality = companyQuality(company, linkedRobots);
    return `
    <article class="catalog-card company-catalog-card">
      ${companyCardMark(company)}
      <div class="catalog-card-body">
        <div class="database-tags">
          <span>${pageEscape(primaryFocus(company, "company"))}</span>
          <span>${pageEscape(company.type || "Entity")}</span>
          <span>${pageEscape(company.country || "Global")}</span>
          ${company.ticker ? `<span>${pageEscape(company.ticker)}</span>` : ""}
        </div>
        <h2>${pageEscape(company.name)}</h2>
        <p>${pageEscape(company.category)}</p>
        <div class="company-card-metrics">
          <span>${pageEscape(linkedRobots.length ? `${linkedRobots.length} robot${linkedRobots.length === 1 ? "" : "s"}` : "Profile watch")}</span>
          <span>${pageEscape(quality.sourceConfidence)}</span>
          <span>${pageEscape(marketStrength(company))}</span>
        </div>
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
  `;
  }).join("") || `<article class="catalog-card company-empty-card"><h2>No matching companies</h2><p>Try a broader search or use a different filter. This is a good candidate for a future manual add workflow.</p></article>`;
  setCount("visible-companies", companies.length);
}

function renderMarketPage() {
  const publicGrid = document.querySelector("[data-market-public]");
  const privateGrid = document.querySelector("[data-market-private]");
  const priceGrid = document.querySelector("[data-market-prices]");
  const marketLensGrid = document.querySelector("[data-market-lens]");
  const overviewGrid = document.querySelector("[data-market-overview]");
  const segmentGrid = document.querySelector("[data-market-segments]");
  const priceAccessGrid = document.querySelector("[data-market-price-access]");
  const leaderGrid = document.querySelector("[data-market-leaders]");
  if (!publicGrid && !privateGrid && !priceGrid && !marketLensGrid && !overviewGrid && !segmentGrid && !priceAccessGrid && !leaderGrid) return;

  const publicCompanies = pageState.companies.filter((company) => pageNormalize(company.type).includes("public")).slice(0, 18);
  const privateBuilders = pageState.companies.filter((company) => pageNormalize(`${company.type} ${company.category}`).includes("private") && pageNormalize(company.category).includes("robot")).slice(0, 18);
  const trackedPrices = priceRecords();
  const priceRobots = trackedPrices.slice(0, 12);
  const allPublicCompanies = pageState.companies.filter((company) => pageNormalize(company.type).includes("public"));
  const sourceLinkedRobots = pageState.robots.filter((robot) => robot.source);
  const segments = [
    ["Humanoids", (robot) => matchesStrategicFilter(robot, "humanoids", "robot")],
    ["Embodied AI", (robot) => matchesStrategicFilter(robot, "embodied-ai", "robot")],
    ["Physical AI", (robot) => matchesStrategicFilter(robot, "physical-ai", "robot")],
    ["Autonomous robotics", (robot) => matchesStrategicFilter(robot, "autonomous-robotics", "robot")],
    ["Secondary robotics", (robot) => matchesStrategicFilter(robot, "secondary", "robot")]
  ];
  const priceAccess = [
    ["Public price", pageState.robots.filter((robot) => matchesCommercialFilter(robot, "public-price")), "Official, deposit, or strong public pricing signal"],
    ["Dealer quote", pageState.robots.filter((robot) => matchesCommercialFilter(robot, "dealer-quote")), "Commercial access requires vendor or dealer contact"],
    ["Distributor", pageState.robots.filter((robot) => matchesCommercialFilter(robot, "distributor")), "Regional or retailer path exists"],
    ["Türkiye verified", pageState.robots.filter((robot) => matchesCommercialFilter(robot, "turkiye-verified")), "Robots with verified local access, partner, or distributor status"],
    ["Türkiye pipeline", pageState.robots.filter((robot) => matchesCommercialFilter(robot, "turkiye-pipeline")), "Robots where outreach or partnership discussion is active"],
    ["Needs verification", pageState.robots.filter((robot) => !hasCommercialAccess(robot) || commercialAccessType(robot) === "Unknown"), "Market remains hard to benchmark"]
  ];
  const rankings = robotRankings();

  if (marketLensGrid) {
    const lensDefs = [
      {
        label: "Humanoid builders",
        filter: "humanoids",
        thesis: "Body-first companies turning humanoid platforms into factory, home, warehouse, and research systems."
      },
      {
        label: "Embodied AI labs",
        filter: "embodied-ai",
        thesis: "AI-first companies developing robot learning, manipulation, autonomy, and data layers for physical systems."
      },
      {
        label: "Physical AI infrastructure",
        filter: "physical-ai",
        thesis: "Compute, simulation, sensors, models, and autonomy stack companies behind real-world machine intelligence."
      },
      {
        label: "Autonomous robotics",
        filter: "autonomous-robotics",
        thesis: "Mobile robots, delivery systems, field autonomy, drones, marine systems, and inspection platforms."
      },
      {
        label: "Secondary robotics coverage",
        filter: "secondary",
        thesis: "Industrial, warehouse, medical, quadruped, service, and research robotics that explain deployment reality."
      }
    ];
    marketLensGrid.innerHTML = lensDefs.map((lens) => {
      const companies = pageState.companies.filter((company) => matchesStrategicFilter(company, lens.filter, "company"));
      const robots = pageState.robots.filter((robot) => matchesStrategicFilter(robot, lens.filter, "robot"));
      const publicCount = companies.filter((company) => pageNormalize(company.type).includes("public")).length;
      const privateCount = companies.filter((company) => pageNormalize(company.type).includes("private")).length;
      const leader = companies.find((company) => pageNormalize(company.type).includes("public")) || companies.find((company) => company.website) || companies[0];
      const robotLeader = [...robots].sort((a, b) => robotScore(b) - robotScore(a))[0];
      return `
        <article class="${lens.filter === "secondary" ? "is-secondary" : "is-core"}">
          <span>${lens.filter === "secondary" ? "Context lane" : "Core market lane"}</span>
          <strong>${pageEscape(lens.label)}</strong>
          <small>${pageEscape(lens.thesis)}</small>
          <dl>
            <div><dt>Companies</dt><dd>${companies.length}</dd></div>
            <div><dt>Public / private</dt><dd>${publicCount} / ${privateCount}</dd></div>
            <div><dt>Robots</dt><dd>${robots.length}</dd></div>
          </dl>
          <div>
            ${leader ? `<a href="${pageEscape(companyProfileHref(leader))}">Company lead · ${pageEscape(leader.name)} →</a>` : ""}
            ${robotLeader ? `<a href="${pageEscape(robotProfileHref(robotLeader))}">Robot lead · ${pageEscape(robotLeader.name)} →</a>` : ""}
          </div>
        </article>
      `;
    }).join("");
  }

  if (overviewGrid) {
    overviewGrid.innerHTML = [
      ["Companies indexed", pageState.companies.length, `${allPublicCompanies.length} public-market proxies tracked`],
      ["Robot profiles", pageState.robots.length, `${trackedPrices.length} structured or derived price signals`],
      ["Core market lanes", pageState.companies.filter((company) => primaryFocus(company, "company") !== "Secondary").length, "Humanoid, embodied AI, physical AI, and autonomous robotics"],
      ["Source coverage", `${sourceLinkedRobots.length}/${pageState.robots.length}`, "Robot profiles with official sources"]
    ].map(([label, value, note]) => `
      <article><span>${pageEscape(label)}</span><strong>${pageEscape(value)}</strong><small>${pageEscape(note)}</small></article>
    `).join("");
  }
  if (segmentGrid) {
    segmentGrid.innerHTML = segments.map(([label, predicate]) => {
      const robots = pageState.robots.filter(predicate);
      const leader = [...robots].sort((a, b) => robotScore(b) - robotScore(a))[0];
      return `
        <article>
          <span>${pageEscape(label)}</span>
          <strong>${robots.length}</strong>
          <small>${leader ? `${pageEscape(leader.name)} leads this segment at ${robotScore(leader)} R-Score` : "No tracked robots yet"}</small>
          ${leader ? `<a href="${pageEscape(robotProfileHref(leader))}">Open leader →</a>` : ""}
        </article>
      `;
    }).join("");
  }
  if (publicGrid) {
    publicGrid.innerHTML = publicCompanies.map((company) => `
      <article class="signal-card"><strong>${pageEscape(company.name)}</strong><span>${pageEscape(company.ticker || company.type)}</span><small>${pageEscape(company.category)}</small><a href="${pageEscape(companyProfileHref(company))}">Profile →</a></article>
    `).join("");
  }
  if (privateGrid) {
    privateGrid.innerHTML = privateBuilders.map((company) => `
      <article class="signal-card"><strong>${pageEscape(company.name)}</strong><span>${pageEscape(company.country)}</span><small>${pageEscape(company.robot || company.category)}</small><a href="${pageEscape(companyProfileHref(company))}">Profile →</a></article>
    `).join("");
  }
  if (priceAccessGrid) {
    priceAccessGrid.innerHTML = priceAccess.map(([label, robots, note]) => {
      const leader = [...robots].sort((a, b) => robotScore(b) - robotScore(a))[0];
      return `
        <article>
          <span>${pageEscape(label)}</span>
          <strong>${robots.length}</strong>
          <small>${pageEscape(note)}${leader ? ` · ${pageEscape(leader.name)} is the strongest tracked example.` : ""}</small>
        </article>
      `;
    }).join("");
  }
  if (priceGrid) {
    priceGrid.innerHTML = priceRobots.map((price) => {
      const robot = price.robotRecord;
      return `
      <article class="signal-card">
        <strong>${pageEscape(price.robot)}</strong>
        <span>${pageEscape(price.company)} · ${pageEscape(priceSourceLabel(price.sourceType))}</span>
        <small>${pageEscape(price.priceText)}${price.confidence ? ` · Confidence ${pageEscape(price.confidence)}/5` : ""}</small>
        <a href="${pageEscape(robot ? robotProfileHref(robot) : price.source)}"${robot ? "" : " target=\"_blank\" rel=\"noopener noreferrer\""}>${robot ? "Profile" : "Source"} →</a>
      </article>
    `;
    }).join("");
  }
  if (leaderGrid) {
    const leaders = selectMarketLeaders(rankings);
    leaderGrid.innerHTML = leaders.map(([label, item, note]) => `
      <article>
        <span>${pageEscape(label)}</span>
        <strong>${pageEscape(item?.robot?.name || "Pending")}</strong>
        <small>${pageEscape(note)}${item ? ` · ${item.laneScore ?? item.score} signal · ${item.score} R-Score` : ""}</small>
        ${item ? `<a href="${pageEscape(robotProfileHref(item.robot))}">Open profile →</a>` : ""}
      </article>
    `).join("");
  }
  renderSignalFeed("[data-market-signals]");
}

function renderPricesPage() {
  const grid = document.querySelector("[data-prices-grid]");
  if (!grid) return;
  const records = priceRecords();
  const groups = [
    ["Official / deposit", records.filter((price) => ["official", "official-shop", "deposit"].includes(price.sourceType))],
    ["Retailer / reference", records.filter((price) => ["retailer", "retailer-reference", "reported-reference"].includes(price.sourceType))],
    ["Profile / quote signal", records.filter((price) => !["official", "official-shop", "deposit", "retailer", "retailer-reference", "reported-reference"].includes(price.sourceType))],
    ["No public price", pageState.robots.filter((robot) => Number(robot.priceVisibility || 0) <= 1).map((robot) => ({
      robot: robot.name,
      company: robot.company,
      priceText: robot.price,
      sourceType: "no-public-price",
      source: robot.source,
      confidence: robot.priceVisibility,
      robotRecord: robot
    }))]
  ];

  grid.innerHTML = groups.map(([title, prices]) => {
    return `
      <section class="price-column">
        <div class="price-column-head"><strong>${pageEscape(title)}</strong><span>${prices.length} robots</span></div>
        ${prices.map((price) => {
          const robot = price.robotRecord;
          return `
          <article class="price-card">
            <strong>${pageEscape(price.robot)}</strong>
            <span>${pageEscape(price.company)} · ${pageEscape(priceSourceLabel(price.sourceType))}</span>
            <p>${pageEscape(price.priceText)}</p>
            <small>${pageEscape(price.lastChecked ? `Checked ${price.lastChecked}` : robot?.availability || "Source review needed")}${price.confidence ? ` · Confidence ${pageEscape(price.confidence)}/5` : ""}</small>
            <a href="${pageEscape(robot ? robotProfileHref(robot) : price.source)}"${robot ? "" : " target=\"_blank\" rel=\"noopener noreferrer\""}>${robot ? "Profile" : "Source"} →</a>
          </article>
        `;
        }).join("")}
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
  const commercial = commercialAccessSummary(robot);
  const turkiyeAccess = marketAccessSummary(robot, "turkiye");
  const robotSources = sourceList(robot.source, robot.sourceLinks);
  const alternatives = robotAlternatives(robot);
  const compareSlugs = [robot, ...alternatives.slice(0, 3)].map((item) => robotSlug(item)).join(",");
  const company = pageState.companies.find((item) => pageNormalize(item.name) === pageNormalize(robot.company));
  const deploymentThesis = robotDeploymentThesis(robot);
  const gallery = robotGallery(robot);
  const mediaItems = robotMediaItems(robot, gallery);

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
          ${company ? `<a href="${pageEscape(companyProfileHref(company))}">Company profile</a>` : ""}
          <a href="prices.html">Price tracker</a>
          ${video?.embed ? `<a href="#profile-video">Watch demo</a>` : ""}
          <a href="${pageEscape(robot.source || "#")}" target="_blank" rel="noopener noreferrer">Official source</a>
        </div>
      </div>
      <figure class="profile-visual ${robot.image ? "" : "catalog-visual-empty"} ${mediaItems.length > 1 ? "has-gallery" : ""}" data-profile-gallery>
        ${robotMediaPicker(robot, gallery)}
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
        <p>Robot Snapshot</p>
        <h2>Core commercial and technical signals for ${pageEscape(robot.name)}.</h2>
      </div>
      <div class="robot-snapshot-grid">
        <article><span>Platform</span><strong>${pageEscape(robot.category || "Robot")}</strong><small>${pageEscape(robot.company)}</small></article>
        <article><span>Deployment stage</span><strong>${pageEscape(robotStage(robot))}</strong><small>${pageEscape(robot.status || "Status not disclosed")}</small></article>
        <article><span>Access</span><strong>${pageEscape(commercial.enabled ? commercial.type : robot.availability || "Availability unknown")}</strong><small>${pageEscape(commercial.regionLabel)}</small></article>
        <article><span>Market role</span><strong>${pageEscape(deploymentThesis)}</strong><small>${pageEscape(useCases[0]?.title || robot.useCase || robot.category)}</small></article>
      </div>
    </section>
    <section class="catalog-section">
      <div class="section-heading compact">
        <p>Commercial Access</p>
        <h2>Purchase path, regional access, and import readiness.</h2>
      </div>
      <div class="commercial-access-grid">
        <article><span>Global access</span><strong>${pageEscape(commercial.type)}</strong><small>${pageEscape(commercial.enabled ? robot.availability || "Availability not disclosed" : "Commercial path not verified")}</small></article>
        <article><span>Global regions</span><strong>${pageEscape(commercial.regionLabel)}</strong><small>Global availability does not mean Türkiye availability.</small></article>
        <article><span>Global contact</span><strong>${pageEscape(robot.officialPurchaseUrl ? "Official purchase" : robot.salesContactUrl ? "Sales contact" : "Source review")}</strong><small>${pageEscape(commercial.notes)}</small><a href="${pageEscape(commercial.primaryUrl)}" target="_blank" rel="noopener noreferrer">Open access source →</a></article>
        <article><span>Partner status</span><strong>${pageEscape(commercial.partnerLabel)}</strong><small>Global commercial relationship status.</small></article>
      </div>
    </section>
    <section class="catalog-section">
      <div class="section-heading compact">
        <p>Türkiye Market Access</p>
        <h2>Local sales path, distributor status, import readiness, and partner pipeline.</h2>
      </div>
      <div class="commercial-access-grid">
        <article><span>Türkiye status</span><strong>${pageEscape(turkiyeAccess.status)}</strong><small>${pageEscape(turkiyeAccess.salesPath)}</small></article>
        <article><span>Distributor</span><strong>${pageEscape(turkiyeAccess.distributor)}</strong><small>${pageEscape(turkiyeAccess.partnerStatus)}</small></article>
        <article><span>Import</span><strong>${pageEscape(turkiyeAccess.importLabel)}</strong><small>${pageEscape(turkiyeAccess.customsLabel)}</small></article>
        <article><span>Sales note</span><strong>${pageEscape(turkiyeAccess.partnerStatus)}</strong><small>${pageEscape(turkiyeAccess.notes)}</small></article>
      </div>
    </section>
    <section class="catalog-section">
      <div class="section-heading compact">
        <p>Readiness Breakdown</p>
        <h2>How Robologai scores ${pageEscape(robot.name)} across market-readiness signals.</h2>
      </div>
      <div class="robot-readiness-grid">
        ${robotCapabilityRows(robot).map(([label, value]) => `<article><span>${pageEscape(label)}</span><strong>${Math.round(value * 20)}</strong><small>${pageMeter(value)}</small></article>`).join("")}
      </div>
    </section>
    <section class="catalog-section">
      <div class="section-heading compact">
        <p>Data Quality</p>
        <h2>Source confidence, pricing clarity, and deployment proof.</h2>
      </div>
      <div class="data-quality-grid">
        <article><span>Source trail</span><strong>${pageEscape(quality.sourceConfidence)}</strong><small>${pageEscape(robotSources.length ? sourceSummary(robotSources) : "Official source missing")}</small></article>
        <article><span>Pricing clarity</span><strong>${pageEscape(quality.priceConfidence)}</strong><small>${pageEscape(robot.price)}</small></article>
        <article><span>Deployment signal</span><strong>${pageEscape(robot.status || "Status not disclosed")}</strong><small>${pageEscape(quality.deploymentSignal)}</small></article>
        <article><span>Last reviewed</span><strong>${pageEscape(quality.dataFreshness)}</strong><small>Fast-changing claims should be checked against official pages.</small></article>
      </div>
    </section>
    ${renderSourceNotes(`${robot.name} source trail.`, robotSources, "Official product source")}
    <section class="catalog-section">
      <div class="section-heading compact">
        <p>Deployment Context</p>
        <h2>What ${pageEscape(robot.name)} signals about the physical AI market.</h2>
      </div>
      <div class="deployment-context-grid">
        <article><span>Buyer lens</span><strong>${pageEscape(scoreLabel(score))}</strong><small>${pageEscape(Number(robot.priceVisibility || 0) >= 3 ? "Access and pricing are easier to evaluate." : "Access and pricing still need direct verification.")}</small></article>
        <article><span>Operating lane</span><strong>${pageEscape(useCases[0]?.title || robot.category || "Robot platform")}</strong><small>${pageEscape(robot.useCase || "Use case not disclosed")}</small></article>
        <article><span>Proof path</span><strong>${pageEscape(quality.mediaVerified)}</strong><small>${pageEscape(video?.embed ? "Demo media is available in the profile." : "Official source and product media are the primary proof points.")}</small></article>
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
  setupProfileGallery(root);
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
  const companyRobotNames = listedRobotNames(company.robot);
  const robots = pageState.robots
    .filter((robot) => pageNormalize(robot.company) === pageNormalize(company.name) || companyRobotNames.includes(pageNormalize(robot.name)))
    .slice(0, 6);
  const extraRows = optionalCompanyRows(company);
  const extraStats = optionalCompanyStats(company);
  const quality = companyQuality(company, robots);
  const companySources = sourceList(company.website, company.sourceLinks);
  const categories = companyRobotCategories(company, robots);
  const marketThesis = companyMarketThesis(company, robots);
  const focus = primaryFocus(company, "company");
  const segments = strategicSegments(company, "company");
  const strategicThesis = companyStrategicThesis(company, robots);
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
          <article><strong>${pageEscape(focus)}</strong><small>Primary focus</small></article>
          <article><strong>${pageEscape(company.robot || "Robotics / AI")}</strong><small>Robot / asset</small></article>
          <article><strong>${pageEscape(company.ticker || company.type || "Private")}</strong><small>Market signal</small></article>
          <article><strong>${pageEscape(broadCountryName(company.country))}</strong><small>Country tracker</small></article>
        </div>
      </div>
      ${companyProfileMark(company)}
    </section>
    <section class="profile-detail-grid">
      <article class="profile-facts">
        <h2>Company facts</h2>
        <dl>
          <div><dt>Category</dt><dd>${pageEscape(company.category)}</dd></div>
          <div><dt>Primary focus</dt><dd>${pageEscape(focus)}</dd></div>
          <div><dt>Segments</dt><dd>${pageEscape(segments.slice(0, 5).join(" · "))}</dd></div>
          <div><dt>Country</dt><dd><a href="country.html?country=${pageEscape(countrySlug(company.country))}">${pageEscape(company.country)} →</a></dd></div>
          <div><dt>Type</dt><dd>${pageEscape(company.type || "Entity")}</dd></div>
          <div><dt>Ticker</dt><dd>${pageEscape(company.ticker || "Not public / not listed")}</dd></div>
          <div><dt>Website</dt><dd><a href="${pageEscape(company.website || "#")}" target="_blank" rel="noopener noreferrer">Official website →</a></dd></div>
          ${extraRows}
        </dl>
      </article>
      <article class="profile-facts">
        <h2>Robologai signal</h2>
        <p>${pageEscape(strategicThesis)}</p>
      </article>
    </section>
    <section class="catalog-section company-intelligence-section">
      <div class="section-heading compact">
        <p>Strategic Positioning</p>
        <h2>Why ${pageEscape(company.name)} matters to the physical AI economy.</h2>
      </div>
      <div class="company-intelligence-grid">
        <article>
          <span>Primary focus</span>
          <strong>${pageEscape(focus)}</strong>
          <small>${pageEscape(marketThesis)}</small>
        </article>
        <article>
          <span>RoboLogAI thesis</span>
          <strong>${pageEscape(company.name)}</strong>
          <small>${pageEscape(strategicThesis)}</small>
        </article>
        <article>
          <span>Segments</span>
          <div class="company-segment-pills">${companySegmentPills(company)}</div>
          <small>${pageEscape(segments.length)} intelligence tags attached to this profile.</small>
        </article>
      </div>
    </section>
    <section class="catalog-section">
      <div class="section-heading compact">
        <p>Company Snapshot</p>
        <h2>Core signals Robologai tracks for ${pageEscape(company.name)}.</h2>
      </div>
      <div class="company-snapshot-grid">
        <article><span>Primary focus</span><strong>${pageEscape(focus)}</strong><small>${pageEscape(segments.slice(0, 3).join(" · "))}</small></article>
        <article><span>Market lane</span><strong>${pageEscape(marketThesis)}</strong><small>${pageEscape(company.category)}</small></article>
        <article><span>Product coverage</span><strong>${pageEscape(robots.length ? `${robots.length} tracked robot${robots.length === 1 ? "" : "s"}` : "Profile watch")}</strong><small>${pageEscape(categories.join(" · ") || company.robot || "Robotics activity")}</small></article>
        <article><span>Country signal</span><strong>${pageEscape(broadCountryName(company.country))}</strong><small>Regional robotics and AI tracker</small></article>
        <article><span>Market access</span><strong>${pageEscape(company.ticker || company.type || "Private")}</strong><small>${pageEscape(company.website ? sourceHost(company.website) : "Official source pending")}</small></article>
      </div>
    </section>
    <section class="catalog-section">
      <div class="section-heading compact">
        <p>Product Lineup</p>
        <h2>Tracked robots and products associated with ${pageEscape(company.name)}.</h2>
      </div>
      <div class="product-lineup-grid">
        ${(robots.length ? robots : [{ name: company.robot || "Robotics / AI activity", company: company.name, category: company.category, useCase: company.category, price: "Price not listed", source: company.website }]).map((robot) => companyRobotLineupCard(robot, company)).join("")}
      </div>
    </section>
    <section class="catalog-section">
      <div class="section-heading compact">
        <p>Data Quality</p>
        <h2>Robot coverage, official sources, market type, and review status.</h2>
      </div>
      <div class="data-quality-grid">
        <article><span>Linked robots</span><strong>${pageEscape(quality.robotCoverage)}</strong><small>${pageEscape(categories.join(" · ") || company.robot || "Robot profile pending")}</small></article>
        <article><span>Official source trail</span><strong>${pageEscape(quality.sourceConfidence)}</strong><small>${pageEscape(companySources.length ? sourceSummary(companySources) : "Official source missing")}</small></article>
        <article><span>Market type</span><strong>${pageEscape(quality.marketConfidence)}</strong><small>${pageEscape(company.ticker || company.type || "No public ticker")}</small></article>
        <article><span>Last reviewed</span><strong>${pageEscape(quality.dataFreshness)}</strong><small>Fast-changing claims should be checked against official pages.</small></article>
      </div>
    </section>
    ${renderSourceNotes(`${company.name} source trail.`, companySources, "Official company source")}
    ${extraStats.length ? `<section class="catalog-section">
      <div class="section-heading compact">
        <p>Company Scale</p>
        <h2>Operational signals from ${pageEscape(company.name)}.</h2>
      </div>
      <div class="catalog-metrics">
        ${extraStats.map(([label, value]) => `<article><strong>${pageEscape(value)}</strong><small>${pageEscape(label)}</small></article>`).join("")}
      </div>
    </section>` : ""}
    <section class="catalog-section">
      <div class="section-heading compact">
        <p>Market Signal</p>
        <h2>How ${pageEscape(company.name)} fits into the robotics economy.</h2>
      </div>
      <div class="company-signal-grid">
        <article><span>Exposure</span><strong>${pageEscape(marketStrength(company))}</strong><small>${pageEscape(company.type || "Entity")} · ${pageEscape(company.ticker || "No public ticker")}</small></article>
        <article><span>Robotics lane</span><strong>${pageEscape(marketThesis)}</strong><small>${pageEscape(categories.join(" · ") || company.category)}</small></article>
        <article><span>Verification</span><strong>Official source first</strong><small>Robologai sends readers to the company source for fast-changing claims.</small></article>
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
  const params = new URLSearchParams(window.location.search);
  const queryRobots = (params.get("robots") || "").split(",").map((item) => item.trim()).filter(Boolean);
  const priority = queryRobots;
  const robots = priority.slice(0, 4).map((name) => pageState.robots.find((robot) => robotMatchesCompareToken(robot, name))).filter(Boolean);
  const summary = document.querySelector("[data-compare-summary]");
  const bestFit = document.querySelector("[data-compare-best-fit]");
  const empty = document.querySelector("[data-compare-empty]");
  if (!robots.length) {
    if (empty) {
      empty.innerHTML = `
        <article>
          <span>Start here</span>
          <strong>Pick a preset above or select up to four robots below.</strong>
          <small>Compare works best when the robots share a market lane: humanoids, quadrupeds, wearable robots, or accessible research platforms.</small>
        </article>
      `;
    }
    if (summary) summary.innerHTML = "";
    if (bestFit) bestFit.innerHTML = "";
    body.innerHTML = `<tr><td colspan="14"><strong>Choose robots to build a comparison matrix.</strong><small>Use the preset links or selector chips above.</small></td></tr>`;
    return;
  }
  if (empty) empty.innerHTML = "";
  if (summary) {
    const leader = [...robots].sort((a, b) => robotScore(b) - robotScore(a))[0];
    const priced = robots.filter((robot) => Number(robot.priceVisibility || 0) >= 2).length;
    const videos = robots.filter((robot) => robotVideo(robot)).length;
    const categories = [...new Set(robots.map((robot) => robot.category).filter(Boolean))];
    summary.innerHTML = `
      <article><span>Top R-Score</span><strong>${leader ? `${pageEscape(leader.name)} · ${robotScore(leader)}` : "Choose robots"}</strong></article>
      <article><span>Price visibility</span><strong>${priced}/${robots.length || 0} visible enough</strong></article>
      <article><span>Embedded demos</span><strong>${videos}/${robots.length || 0} available</strong></article>
      <article><span>Market overlap</span><strong>${pageEscape(categories.length === 1 ? categories[0] : `${categories.length} categories`)}</strong></article>
    `;
  }
  if (bestFit) {
    const bestResearch = [...robots].sort((a, b) => robotScoreBreakdown(b).intelligence - robotScoreBreakdown(a).intelligence)[0];
    const bestEnterprise = [...robots].sort((a, b) => robotScoreBreakdown(b).commercial - robotScoreBreakdown(a).commercial)[0];
    const bestPrice = [...robots].sort((a, b) => robotScoreBreakdown(b).price - robotScoreBreakdown(a).price)[0];
    const bestProof = [...robots].sort((a, b) => (robotScoreBreakdown(b).media + robotScoreBreakdown(b).source) - (robotScoreBreakdown(a).media + robotScoreBreakdown(a).source))[0];
    bestFit.innerHTML = [
      ["Best for research", bestResearch, "Highest AI/source signal in this set."],
      ["Best for enterprise", bestEnterprise, "Strongest commercial readiness signal."],
      ["Best price visibility", bestPrice, "Most visible price/access signal."],
      ["Best proof trail", bestProof, "Strongest media and official-source proof."]
    ].map(([label, robot, note]) => `
      <article>
        <span>${pageEscape(label)}</span>
        <strong>${pageEscape(robot?.name || "Choose robots")}</strong>
        <small>${pageEscape(note)}</small>
      </article>
    `).join("");
  }
  body.innerHTML = robots.map((robot) => `
    <tr>
      ${(() => {
        const breakdown = robotScoreBreakdown(robot);
        return `
      <td><strong>${pageEscape(robot.name)}</strong><small>${pageEscape(robot.company)}</small></td>
      <td>${pageEscape(robot.category)}</td>
      <td>${pageEscape(robot.country)}</td>
      <td>${pageEscape(robot.availability)}</td>
      <td>${pageEscape(robot.price)}</td>
      <td><strong>${robotScore(robot)}</strong><small>${pageEscape(scoreLabel(robotScore(robot)))}</small></td>
      <td><strong>${breakdown.commercial}</strong><small>${pageMeter(breakdown.commercial / 20)}</small></td>
      <td><strong>${breakdown.mobility}</strong><small>${pageMeter(breakdown.mobility / 20)}</small></td>
      <td><strong>${breakdown.intelligence}</strong><small>${pageMeter(breakdown.intelligence / 20)}</small></td>
      <td><strong>${breakdown.source}</strong><small>${robot.source ? "Official linked" : "Source needed"}</small></td>
      <td>${robotVideo(robot) ? `<a href="videos.html">Playable</a>` : "Source only"}</td>
      <td>${pageEscape(robot.useCase)}</td>
      <td>${pageMeter(robot.maturity)}</td>
      <td><a href="${pageEscape(robotProfileHref(robot))}">Profile →</a></td>
        `;
      })()}
    </tr>
  `).join("");
}

function updateCompareUrl(selected) {
  const url = new URL(window.location.href);
  if (selected.length) {
    url.searchParams.set("robots", selected.join(","));
  } else {
    url.searchParams.delete("robots");
  }
  window.history.replaceState({}, "", url);
}

function robotMatchesCompareToken(robot, token = "") {
  const key = pageNormalize(token);
  return robot.name === token || robotSlug(robot) === token || pageNormalize(robot.name) === key || pageNormalize(robotSlug(robot)) === key;
}

function renderComparePicker(filter = "") {
  const picker = document.querySelector("[data-compare-select]");
  if (!picker) return;
  const params = new URLSearchParams(window.location.search);
  const queryRobots = (params.get("robots") || "").split(",").map((item) => item.trim()).filter(Boolean);
  const query = pageNormalize(filter);
  const robots = pageState.robots.filter((robot) => {
    if (!query) return true;
    return pageNormalize([robot.name, robot.company, robot.category, robot.country, robot.useCase].filter(Boolean).join(" ")).includes(query);
  });
  picker.innerHTML = robots.map((robot) => `
    <label>
      <input type="checkbox" value="${pageEscape(robot.name)}" ${queryRobots.some((token) => robotMatchesCompareToken(robot, token)) ? "checked" : ""}>
      <span>${pageEscape(robot.name)}</span>
      <small>${pageEscape(robot.company)}</small>
    </label>
  `).join("") || `<p class="compare-no-results">No robots match this search.</p>`;
  picker.querySelectorAll("input").forEach((input) => input.addEventListener("change", () => {
    const current = new Set((new URLSearchParams(window.location.search).get("robots") || "").split(",").map((item) => item.trim()).filter(Boolean));
    picker.querySelectorAll("input").forEach((item) => {
      const robot = pageState.robots.find((entry) => entry.name === item.value);
      const slug = robot ? robotSlug(robot) : robotSlug({ name: item.value });
      if (item.checked) current.add(slug);
      else current.delete(slug);
    });
    if (current.size > 4) {
      const robot = pageState.robots.find((entry) => entry.name === input.value);
      current.delete(robot ? robotSlug(robot) : robotSlug({ name: input.value }));
      input.checked = false;
    }
    updateCompareUrl([...current].slice(0, 4));
    renderComparePage();
  }));
  const search = document.querySelector("[data-compare-search]");
  if (search && !search.dataset.ready) {
    search.dataset.ready = "true";
    search.addEventListener("input", () => renderComparePicker(search.value));
  }
}

function wireCatalogControls() {
  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    const signalTypeButton = target.closest("[data-signal-type-filter]");
    if (signalTypeButton) {
      pageState.signalTypeFilter = signalTypeButton.dataset.signalTypeFilter || "all";
      renderRoboticsSignalsPage();
      return;
    }

    const signalImpactButton = target.closest("[data-signal-impact-filter]");
    if (signalImpactButton) {
      pageState.signalImpactFilter = signalImpactButton.dataset.signalImpactFilter || "all";
      renderRoboticsSignalsPage();
      return;
    }

    const signalCountryButton = target.closest("[data-signal-country-filter]");
    if (signalCountryButton) {
      pageState.signalCountryFilter = signalCountryButton.dataset.signalCountryFilter || "all";
      renderRoboticsSignalsPage();
      return;
    }

    const signalConfidenceButton = target.closest("[data-signal-confidence-filter]");
    if (signalConfidenceButton) {
      pageState.signalConfidenceFilter = signalConfidenceButton.dataset.signalConfidenceFilter || "all";
      renderRoboticsSignalsPage();
      return;
    }

    const signalProfileButton = target.closest("[data-signal-profile-filter]");
    if (signalProfileButton) {
      pageState.signalProfileFilter = signalProfileButton.dataset.signalProfileFilter || "all";
      renderRoboticsSignalsPage();
      return;
    }

    const signalFocusButton = target.closest("[data-signal-focus-filter]");
    if (signalFocusButton) {
      pageState.signalFocusFilter = signalFocusButton.dataset.signalFocusFilter || "all";
      renderRoboticsSignalsPage();
      return;
    }

    const companyCoreButton = target.closest("[data-company-core-filter]");
    if (companyCoreButton) {
      pageState.companyFilter = companyCoreButton.dataset.companyCoreFilter || "all";
      document.querySelectorAll("[data-company-page-filter]").forEach((item) => item.classList.toggle("is-active", item.dataset.companyPageFilter === pageState.companyFilter));
      const url = new URL(window.location.href);
      url.searchParams.set("filter", pageState.companyFilter);
      window.history.replaceState({}, "", url);
      renderCompanyCards();
      document.querySelector(".catalog-layout")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

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

  document.querySelectorAll("[data-robot-commercial-filter]").forEach((select) => {
    select.addEventListener("change", () => {
      pageState.robotCommercialFilter = select.value || "all";
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
    const response = await fetch(catalogSitePath(path), { cache: "no-store" });
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
  const [robots, companies, signals, prices, tasks, timeline, heatmap, physicalAi, robotEconomy, globalMap, futureIndex] = await Promise.all([
    loadJson("data/robots.json", robotFallback),
    loadJson("data/companies.json", companyFallback),
    loadJson("data/signals.json", signalFallback),
    loadJson("data/prices.json", priceFallback),
    loadJson("data/tasks.json", taskFallback),
    loadJson("data/timeline.json", timelineFallback),
    loadJson("data/heatmap.json", heatmapFallback),
    loadJson("data/physical-ai.json", physicalAiFallback),
    loadJson("data/robot-economy.json", robotEconomyFallback),
    loadJson("data/global-robotics-map.json", globalMapFallback),
    loadJson("data/future-robotics-index.json", futureIndexFallback)
  ]);
  pageState.robots = robots;
  pageState.companies = companies;
  pageState.signals = signals;
  pageState.prices = prices;
  pageState.tasks = tasks;
  pageState.timeline = timeline;
  pageState.heatmap = heatmap;
  pageState.physicalAi = physicalAi;
  pageState.robotEconomy = robotEconomy;
  pageState.globalMap = globalMap;
  pageState.futureIndex = futureIndex;
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
  renderGlobalRoboticsMap();
  renderPhysicalAiPage();
  renderRobotEconomyPage();
  renderFutureRoboticsIndex();
  renderVideosPage();
  renderRobotProfile();
  renderCompanyProfile();
  renderCountryTracker();
  renderUseCasesPage();
  renderComparePicker();
  renderComparePage();
  renderDataQualityDashboard();
  renderAssetCoveragePanel();
  renderLinkIntegrityPanel();
  wireCatalogControls();
}

initCatalogPages();
