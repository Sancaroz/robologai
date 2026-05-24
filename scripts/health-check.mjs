import { spawnSync } from "node:child_process";

const root = process.cwd();
const shouldWrite = process.argv.includes("--write");

function run(label, args) {
  console.log(`\n${label}`);
  const result = spawnSync(process.execPath, args, {
    cwd: root,
    stdio: "inherit"
  });
  if (result.status !== 0) {
    throw new Error(`${label} failed.`);
  }
}

function main() {
  if (shouldWrite) {
    run("Updating aggregate data", ["scripts/build-data.mjs", "--write"]);
    run("Regenerating static profile pages", ["tools/generate-seo-pages.mjs"]);
  } else {
    run("Checking aggregate data dry-run", ["scripts/build-data.mjs"]);
  }

  run("Validating data", ["scripts/validate-data.mjs"]);
  run("Validating asset paths", ["scripts/validate-assets.mjs"]);
  run("Validating profile and signal links", ["scripts/validate-links.mjs"]);

  const syntaxFiles = [
    "catalog-pages.js",
    "script.js",
    "scripts/add-company.mjs",
    "scripts/add-robot.mjs",
    "scripts/build-data.mjs",
    "scripts/health-check.mjs",
    "scripts/import-robot-assets.mjs",
    "scripts/update-signals.mjs",
    "scripts/validate-assets.mjs",
    "scripts/validate-data.mjs",
    "scripts/validate-links.mjs",
    "tools/generate-seo-pages.mjs"
  ];

  for (const file of syntaxFiles) {
    run(`Checking JS syntax: ${file}`, ["--check", file]);
  }

  console.log("\nhealth check ok");
}

try {
  main();
} catch (error) {
  console.error(`\n${error.message}`);
  process.exitCode = 1;
}
