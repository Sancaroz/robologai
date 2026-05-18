# Modular Robot Records

This folder is the modular source area for robot records.

The live site still reads `data/robots.json`, but that aggregate file can now be generated from this folder with:

```bash
node scripts/build-data.mjs --write
```

Suggested file naming:

```text
data/robots/deep-robotics-x30-pro.json
data/robots/wirobotics-wim.json
```

Required fields for a brand-new robot:

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
  "image": "assets/robots/robot-slug/hero.png",
  "imageCredit": "Official company media",
  "keywords": ["humanoid", "factory"]
}
```

Recommended robot image path:

```text
assets/robots/robot-slug/hero.png
assets/robots/robot-slug/demo.webp
```

Use `node scripts/validate-data.mjs` before committing.

Partial updates are allowed for robots that already exist in `data/robots.json`.
For example, this can update the central Unitree G1 record without repeating every field:

```json
{
  "name": "Unitree G1",
  "company": "Unitree Robotics",
  "price": 16000
}
```

Robot records are merged by canonical robot slug, so `G1` from Unitree and `Unitree G1` resolve to the same aggregate record.
