# RoboLogAI Terminal Cheatsheet

Use these commands from the project folder:

```bash
cd /Users/dogasancar/Desktop/robologai
```

## Check Everything

Run this before committing:

```bash
node scripts/health-check.mjs
```

If you changed data and need to regenerate aggregate JSON and profile pages:

```bash
node scripts/health-check.mjs --write
```

## Add A Company

Guided flow:

```bash
node scripts/add-company.mjs
```

One-line example:

```bash
node scripts/add-company.mjs --name "Example Robotics" --website "https://example.com/" --category "Humanoid Robotics" --country "USA" --logo "assets/companies/example-robotics/logo.svg"
```

## Add A Robot

Guided flow:

```bash
node scripts/add-robot.mjs
```

One-line example:

```bash
node scripts/add-robot.mjs --name "Example Bot" --company "Example Robotics" --category "Humanoid" --country "USA" --use-case "Factory work" --source "https://example.com/bot"
```

## Commit And Push

First check status:

```bash
git status --short
```

Add only the files you intentionally changed:

```bash
git add file-one.html file-two.js styles.css
```

Commit:

```bash
git commit -m "short clear message"
```

Pull remote changes safely:

```bash
git pull --rebase origin main
```

Push:

```bash
git push origin main
```

## If Pull Rebase Says You Have Unstaged Changes

Commit first, then pull again:

```bash
git status --short
git add changed-file.html changed-file.js
git commit -m "short clear message"
git pull --rebase origin main
git push origin main
```

## Do Not Add These

Do not add local system files:

```text
.DS_Store
assets/.DS_Store
data/.DS_Store
data/robots/.DS_Store
```

Avoid this unless you are sure:

```bash
git add .
```

Prefer explicit file names instead.
