// Generates optimized AVIF + WebP siblings for every raster image under assets/.
// Originals are left in place so <picture> can fall back to them.
// Large images are capped in width; logos/icons keep their native size.
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join, extname, dirname, basename } from "node:path";

const ROOT = "assets";
const RASTER = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);
// Folders whose images are small (logos/icons) — don't upscale, keep tight.
const SMALL_DIRS = ["company-logos", "social-media icons", "second_section", "arrows"];
const MAX_WIDTH = 1920; // cap for large imagery

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

function targetFor(path) {
  return SMALL_DIRS.some((d) => path.includes(d)) ? 600 : MAX_WIDTH;
}

let count = 0;
let savedBytes = 0;

for await (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  if (!RASTER.has(ext)) continue;

  const dir = dirname(file);
  const name = basename(file, ext);
  const cap = targetFor(file);

  let img;
  try {
    img = sharp(file, { failOn: "none" });
  } catch (e) {
    console.warn(`skip (unreadable): ${file}`);
    continue;
  }
  const meta = await img.metadata();
  const width = meta.width && meta.width > cap ? cap : undefined;

  const targets = [
    { out: join(dir, `${name}.avif`), fn: (s) => s.avif({ quality: 50 }) },
    { out: join(dir, `${name}.webp`), fn: (s) => s.webp({ quality: 80 }) },
  ];

  const before = (await stat(file)).size;

  for (const t of targets) {
    // Don't overwrite the source with itself (e.g. an existing .webp -> .webp).
    if (t.out === file) continue;
    let pipe = sharp(file, { failOn: "none" });
    if (width) pipe = pipe.resize({ width });
    await t.fn(pipe).toFile(t.out);
    const after = (await stat(t.out)).size;
    savedBytes += Math.max(0, before - after);
  }
  count++;
  process.stdout.write(`. `);
}

console.log(
  `\nProcessed ${count} images. Approx ${(savedBytes / 1048576).toFixed(1)} MB saved vs originals (per chosen format).`
);
