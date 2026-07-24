import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PNGs = [
  'public/images/products/special-offer-tapes.png',
  'public/images/products/barcode-label-100x150x-500-core-40mm.png',
  'public/images/brand/logo.png',
];

const results = [];

for (const relPath of PNGs) {
  const input = path.resolve(relPath);
  const parsed = path.parse(input);
  const output = path.join(parsed.dir, parsed.name + '.webp');

  if (!fs.existsSync(input)) {
    results.push({ file: relPath, status: 'SKIPPED - not found' });
    continue;
  }

  const statBefore = fs.statSync(input);
  const sizeBefore = statBefore.size;

  try {
    const img = sharp(input);
    const metadata = await img.metadata();

    const pipeline = img
      .webp({
        quality: 85,
        effort: 6,
        alphaQuality: 85,
        nearLossless: false,
        smartSubsample: true,
      });

    await pipeline.toFile(output);

    const statAfter = fs.statSync(output);
    const sizeAfter = statAfter.size;
    const pct = ((1 - sizeAfter / sizeBefore) * 100).toFixed(1);

    results.push({
      file: relPath,
      status: 'OK',
      beforeKB: (sizeBefore / 1024).toFixed(1),
      afterKB: (sizeAfter / 1024).toFixed(1),
      reduction: pct + '%',
      width: metadata.width,
      height: metadata.height,
      hasAlpha: metadata.hasAlpha,
      hasIcc: Boolean(metadata.icc),
    });

    // Keep the original PNG - don't delete it yet
    // We'll update references first, then can delete PNGs
  } catch (err) {
    results.push({ file: relPath, status: 'ERROR', error: err.message });
  }
}

console.log('\n--- WebP Conversion Report ---');
let totalBefore = 0, totalAfter = 0;
for (const r of results) {
  if (r.status === 'OK') {
    console.log(`\n${r.file}`);
    console.log(`  Dimensions: ${r.width}x${r.height}`);
    console.log(`  Alpha: ${r.hasAlpha}, ICC: ${r.hasIcc}`);
    console.log(`  Before: ${r.beforeKB} KB → After: ${r.afterKB} KB (${r.reduction} reduction)`);
    totalBefore += parseFloat(r.beforeKB);
    totalAfter += parseFloat(r.afterKB);
  } else {
    console.log(`\n${r.file}: ${r.status}${r.error ? ' - ' + r.error : ''}`);
  }
}
console.log(`\nTotal: ${totalBefore.toFixed(1)} KB → ${totalAfter.toFixed(1)} KB (${((1 - totalAfter/totalBefore)*100).toFixed(1)}% reduction)`);
