# Modular Robot Records

This folder is the staged source area for future robot records.

The live site still reads `data/robots.json`. Do not delete or replace that aggregate file yet.

Suggested file naming:

```text
data/robots/deep-robotics-x30-pro.json
data/robots/wirobotics-wim.json
```

Required fields:

```json
{
  "name": "Robot Name",
  "company": "Company Name",
  "category": "Humanoid",
  "country": "Country",
  "status": "Commercial / prototype / research",
  "availability": "Availability note",
  "price": "No official public price",
  "useCase": "Primary use case",
  "source": "https://official-source.example/"
}
```

Recommended fields:

```json
{
  "height": "Not disclosed",
  "runtime": "Not disclosed",
  "maturity": 3,
  "priceVisibility": 1,
  "keywords": ["humanoid", "factory"]
}
```

Use `node scripts/validate-data.mjs` before committing.
