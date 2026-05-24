# Modular Robot Records

This folder is the modular source area for robot records.

The live site still reads `data/robots.json`, but that aggregate file can now be generated from this folder with:

```bash
node scripts/build-data.mjs --write
```

The easiest way to add a complete robot record is:

```bash
node scripts/add-robot.mjs
```

For one-line use:

```bash
node scripts/add-robot.mjs --name "Example Bot" --company "Example Robotics" --category "Humanoid" --country "USA" --use-case "Factory work" --source "https://example.com/bot"
```

By default, the script writes the modular JSON, rebuilds `data/robots.json`, regenerates static profile pages, and validates the data. Use `--skip-build` if you only want to create the modular JSON file.

For image-first imports, put robot assets in folders like this:

```text
assets/robots/ubtech/walker/walker-s2/hero.png
assets/robots/ubtech/walker/walker-s2/gallery-1.jpg
assets/robots/ubtech/walker/walker-s2/source.txt
```

Then run:

```bash
node scripts/import-robot-assets.mjs --write
```

The importer creates or updates `data/robots/company-slug/company-robot-slug.json`, then rebuilds aggregate data and generated profile pages. Without `--write`, it previews the records only.

If you prefer manual editing, copy:

```text
data/templates/robot.template.json
```

Suggested file naming:

```text
data/robots/deep-robotics/deep-robotics-x30-pro.json
data/robots/wirobotics/wirobotics-wim.json
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
assets/robots/company-slug/robot-slug/hero.png
assets/robots/company-slug/robot-slug/demo.webp
```

Use these checks before committing:

```bash
node scripts/validate-data.mjs
node scripts/validate-assets.mjs
```

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
