# Modular Company Records

This folder is the staged source area for future company records.

The live site still reads `data/companies.json`. Do not delete or replace that aggregate file yet.

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

Use `node scripts/validate-data.mjs` before committing.
