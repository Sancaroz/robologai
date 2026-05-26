# RoboLogAI Data Guide

RoboLogAI uses modular source files for manual additions, then generates aggregate JSON files for the live site.

## Add a company

Recommended:

```bash
node scripts/add-company.mjs
```

Manual file method:

1. Copy `data/templates/company.template.json`.
2. Save it as `data/companies/company-slug.json`.
3. Put the logo at `assets/companies/company-slug/logo.svg` or `assets/companies/company-slug/logo.png`.
4. Set `"logo": "assets/companies/company-slug/logo.svg"` in the JSON.

## Add a robot

Recommended:

```bash
node scripts/add-robot.mjs
```

Image-first import:

1. Put files under `assets/robots/company-slug/robot-slug/hero.jpg`.
2. Add optional `source.txt` in the same folder with the official URL.
3. Run `node scripts/import-robot-assets.mjs --write`.

Manual file method:

1. Copy `data/templates/robot.template.json`.
2. Save it as `data/robots/company-slug/company-robot-slug.json`.
3. Put the robot image at `assets/robots/company-slug/robot-slug/hero.png`.
4. Set `"image": "assets/robots/company-slug/robot-slug/hero.png"` in the JSON.

## Add a signal

Manual file method:

1. Copy `data/templates/signal.template.json`.
2. Save it as `data/signals/YYYY-MM-DD-short-title.json`.
3. Use official or primary sources first.
4. Link `relatedUrl` to a company or robot profile when possible.

## Add a price signal

Manual file method:

1. Copy `data/templates/price.template.json`.
2. Save it under `data/prices/` or append it to a focused modular file.
3. Separate `sourceType` clearly: `official`, `official-shop`, `retailer`, `retailer-reference`, `reported-reference`, `deposit`, or `quote`.
4. Use `confidence` from 1 to 5 and update `lastChecked` when the source is reviewed.

## Do not edit these by hand

These aggregate files are generated from modular records and should be updated with scripts:

```text
data/companies.json
data/robots.json
data/signals.json
data/prices.json
```

## Build and check

Dry-run health check:

```bash
node scripts/health-check.mjs
```

Update aggregate JSON and static profile pages, then check:

```bash
node scripts/health-check.mjs --write
```

Individual checks:

```bash
node scripts/audit-robot-images.mjs
node scripts/audit-sources.mjs
node scripts/audit-price-sources.mjs
node scripts/discover-robot-candidates.mjs --input leads.txt
node scripts/review-robot-candidates.mjs
node scripts/watch-price-signals.mjs
node scripts/review-price-signals.mjs
node scripts/validate-data.mjs
node scripts/validate-assets.mjs
```

Robot image quality audit:

```bash
node scripts/audit-robot-images.mjs --company deeprobotics
```

Price source audit:

```bash
node scripts/audit-price-sources.mjs
node scripts/audit-price-sources.mjs --check-links
```

Source depth audit:

```bash
node scripts/audit-sources.mjs
node scripts/audit-sources.mjs --type robot --limit 20
node scripts/audit-sources.mjs --company agility --min 3
```

Robot candidate discovery:

```bash
node scripts/discover-robot-candidates.mjs --input leads.txt
node scripts/discover-robot-candidates.mjs --input leads.txt --fetch
node scripts/discover-robot-candidates.mjs --input leads.txt --write
```

Generated `data/robot-candidates/*.json` reports are local review artifacts and are ignored by git.

Robot candidate review:

```bash
node scripts/review-robot-candidates.mjs
node scripts/review-robot-candidates.mjs --markdown
node scripts/review-robot-candidates.mjs --json
```

Price signal watcher:

```bash
node scripts/watch-price-signals.mjs
node scripts/watch-price-signals.mjs --fetch --company unitree --limit 10
node scripts/watch-price-signals.mjs --fetch --write --limit 50
```

The watcher writes review-only reports to `data/price-signals/`; it does not update robot cards automatically.
Generated `data/price-signals/*.json` reports are local review artifacts and are ignored by git.

Price signal review:

```bash
node scripts/review-price-signals.mjs
node scripts/review-price-signals.mjs --min-confidence 5
node scripts/review-price-signals.mjs --drafts
node scripts/review-price-signals.mjs --markdown
node scripts/review-price-signals.mjs --json
```
