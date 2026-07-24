import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import os from 'os';

const files = [
  'public/images/categories/cling-film.webp',
  'public/images/categories/packing-tapes.webp',
  'public/images/categories/pof-shrink-film.webp',
  'public/images/categories/stretch-film.webp',
  'public/images/products/barcode-label-printer.webp',
  'public/images/products/barcode-label-50-x-25-x1000.webp',
  'public/images/products/barcode-lablel-38-x-25-x-5000-3inch-76mm.webp',
  'public/images/products/brown-packing-tape-70-yard.webp',
  'public/images/products/masking-tape-1.webp',
  'public/images/products/polyester-terephthalate-pet-strap-12mm.webp',
  'public/images/products/polyester-terephthalate-pet-strap-15mm.webp',
];

let totalBefore = 0;
let totalAfter = 0;

console.log('=== Re-encoding in-place WebP files ===\n');

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.log(`SKIPPED (not found): ${file}`);
    continue;
  }

  const statBefore = fs.statSync(file);
  const sizeBefore = statBefore.size;
  totalBefore += sizeBefore;

  try {
    const meta = await sharp(file).metadata();

    // Only convert if actually PNG inside
    if (meta.format !== 'png') {
      console.log(`SKIPPED (already real ${meta.format}): ${file.replace('public/images/', '')} (${(sizeBefore/1024).toFixed(1)} KB)`);
      totalAfter += sizeBefore;
      continue;
    }

    // Write to temp file first
    const tmpFile = path.join(os.tmpdir(), `reencode-${Date.now()}-${path.basename(file)}`);

    await sharp(file)
      .webp({
        quality: 85,
        effort: 6,
        alphaQuality: 85,
        nearLossless: false,
        smartSubsample: true,
      })
      .toFile(tmpFile);

    // Replace original with temp
    fs.copyFileSync(tmpFile, file);
    fs.unlinkSync(tmpFile);

    const statAfter = fs.statSync(file);
    const sizeAfter = statAfter.size;
    totalAfter += sizeAfter;

    const pct = ((1 - sizeAfter / sizeBefore) * 100).toFixed(1);
    console.log(`${file.replace('public/images/', '')}: ${(sizeBefore/1024).toFixed(1)} KB → ${(sizeAfter/1024).toFixed(1)} KB (${pct}% reduction)`);
  } catch (err) {
    console.log(`ERROR: ${file} - ${err.message}`);
    // Keep original on error
    totalAfter += sizeBefore;
  }
}

const mbBefore = (totalBefore / 1024 / 1024).toFixed(2);
const mbAfter = (totalAfter / 1024 / 1024).toFixed(2);
const mbSaved = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(2);
const pctTotal = ((1 - totalAfter / totalBefore) * 100).toFixed(1);

console.log(`\n--- Re-encode Summary ---`);
console.log(`Before: ${mbBefore} MB → After: ${mbAfter} MB (Saved: ${mbSaved} MB, ${pctTotal}%)`);
