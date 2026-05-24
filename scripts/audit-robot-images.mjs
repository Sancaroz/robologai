import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const assetsRoot = path.join(root, "assets", "robots");
const imagePattern = /\.(avif|webp|png|jpe?g)$/i;

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const item = argv[index];
    if (!item.startsWith("--")) continue;
    const key = item.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      index += 1;
    }
  }
  return args;
}

function listImageFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) return listImageFiles(entryPath);
    return entry.isFile() && imagePattern.test(entry.name) ? [entryPath] : [];
  });
}

function pngSize(buffer) {
  if (buffer.length < 24 || buffer.toString("ascii", 1, 4) !== "PNG") return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20), type: "png" };
}

function jpegSize(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) return null;
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { width: buffer.readUInt16BE(offset + 7), height: buffer.readUInt16BE(offset + 5), type: "jpeg" };
    }
    offset += 2 + length;
  }
  return null;
}

function webpSize(buffer) {
  if (buffer.length < 30 || buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WEBP") return null;
  const chunk = buffer.toString("ascii", 12, 16);
  if (chunk === "VP8 ") {
    return { width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff, type: "webp" };
  }
  if (chunk === "VP8L") {
    const bits = buffer.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1, type: "webp" };
  }
  if (chunk === "VP8X") {
    return {
      width: buffer.readUIntLE(24, 3) + 1,
      height: buffer.readUIntLE(27, 3) + 1,
      type: "webp"
    };
  }
  return null;
}

function imageSize(filePath) {
  const buffer = fs.readFileSync(filePath);
  return pngSize(buffer) || jpegSize(buffer) || webpSize(buffer) || null;
}

function qualityLabel({ width, height }, heroMin, cardMin) {
  const shortest = Math.min(width, height);
  if (shortest >= heroMin) return "hero-ready";
  if (shortest >= cardMin) return "card-ready";
  return "too-small";
}

function printHelp() {
  console.log(`Audit local robot image dimensions.

Usage:
  node scripts/audit-robot-images.mjs
  node scripts/audit-robot-images.mjs --company deeprobotics
  node scripts/audit-robot-images.mjs --min-hero 900 --min-card 600
  node scripts/audit-robot-images.mjs --fail-under-card

Labels:
  hero-ready  shortest side is at least --min-hero
  card-ready  shortest side is at least --min-card
  too-small   shortest side is below --min-card`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const heroMin = Number(args["min-hero"] || 900);
  const cardMin = Number(args["min-card"] || 600);
  const company = args.company ? String(args.company).toLowerCase() : "";
  const failUnderCard = Boolean(args["fail-under-card"]);
  const files = listImageFiles(assetsRoot)
    .filter((filePath) => !company || path.relative(assetsRoot, filePath).toLowerCase().startsWith(`${company}/`))
    .sort();

  const rows = files.map((filePath) => {
    const size = imageSize(filePath);
    const rel = path.relative(root, filePath).split(path.sep).join("/");
    if (!size) return { rel, width: 0, height: 0, label: "unreadable" };
    return { rel, ...size, label: qualityLabel(size, heroMin, cardMin) };
  });

  const problemRows = rows.filter((row) => row.label === "too-small" || row.label === "unreadable");
  const displayRows = [...problemRows, ...rows.filter((row) => row.label === "card-ready")];

  console.log(`robot image audit: ${rows.length} files checked`);
  console.log(`thresholds: hero-ready >= ${heroMin}px shortest side, card-ready >= ${cardMin}px shortest side\n`);

  if (!displayRows.length) {
    console.log("All robot images are hero-ready.");
  } else {
    const pathWidth = Math.max(...displayRows.map((row) => row.rel.length), 4);
    for (const row of displayRows) {
      const dimensions = row.width && row.height ? `${row.width}x${row.height}` : "unknown";
      console.log(`${row.label.padEnd(10)} ${dimensions.padEnd(11)} ${row.rel.padEnd(pathWidth)}`);
    }
  }

  const counts = rows.reduce((acc, row) => {
    acc[row.label] = (acc[row.label] || 0) + 1;
    return acc;
  }, {});
  console.log(`\nsummary: hero-ready ${counts["hero-ready"] || 0}, card-ready ${counts["card-ready"] || 0}, too-small ${counts["too-small"] || 0}, unreadable ${counts.unreadable || 0}`);

  if (failUnderCard && problemRows.length) {
    process.exitCode = 1;
  }
}

main();
