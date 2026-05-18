# Modular Company Records

This folder is the staged source area for future company records.

The live site still reads `data/companies.json`. Do not delete or replace that aggregate file yet.

The easiest way to add a company is:

```bash
node scripts/add-company.mjs
```

For one-line use:

```bash
node scripts/add-company.mjs --name "Example Robotics" --website "https://example.com/" --category "Humanoid Robotics" --country "USA" --robot "Example Bot"
```

By default, the script writes the modular JSON, rebuilds `data/companies.json`, regenerates static profile pages, and validates the data. Use `--skip-build` if you only want to create the modular JSON file.

Suggested file naming:

```text
data/companies/deep-robotics.json
data/companies/wirobotics.json
```

Required fields:

```json
{
  "name": "Company Name",
  "category": "Robotics category",
  "country": "Country",
  "type": "Private",
  "ticker": "",
  "robot": "Known robot or product names",
  "website": "https://example.com/",
  "keywords": ["robotics", "humanoid"]
}
```

Optional fields such as `logo`, `image`, `focus`, `sourceLinks`, `city`, `region`, and operating metrics are allowed.

Recommended logo path:

```text
assets/companies/company-slug/logo.svg
assets/companies/company-slug/logo.png
```

Then reference it from the company JSON:

```json
{
  "logo": "assets/companies/company-slug/logo.svg"
}
```

Use `node scripts/validate-data.mjs` before committing.
