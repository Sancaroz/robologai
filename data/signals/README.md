# Modular Signal Records

This folder is reserved for future curated signal records.

The live site and GitHub Actions bot still write to `data/signals.json`. Do not delete or replace that aggregate file yet.

Recommended future layout:

```text
data/signals/curated/
data/signals/automated/
```

Required fields:

```json
{
  "date": "2026-05-17",
  "type": "Product launch",
  "title": "Signal title",
  "company": "Company Name",
  "robot": "Robot Name",
  "category": "Robotics category",
  "country": "Country",
  "impact": "High",
  "summary": "Short source-backed summary.",
  "source": "https://official-source.example/",
  "relatedUrl": "companies/company-name.html",
  "sourceType": "curated"
}
```

Use `node scripts/validate-data.mjs` before committing.
