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

Manual file method:

1. Copy `data/templates/robot.template.json`.
2. Save it as `data/robots/company-robot.json`.
3. Put the robot image at `assets/robots/robot-slug/hero.png`.
4. Set `"image": "assets/robots/robot-slug/hero.png"` in the JSON.

## Add a signal

Manual file method:

1. Copy `data/templates/signal.template.json`.
2. Save it as `data/signals/YYYY-MM-DD-short-title.json`.
3. Use official or primary sources first.
4. Link `relatedUrl` to a company or robot profile when possible.

## Do not edit these by hand

These aggregate files are generated from modular records and should be updated with scripts:

```text
data/companies.json
data/robots.json
data/signals.json
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
node scripts/validate-data.mjs
node scripts/validate-assets.mjs
```
