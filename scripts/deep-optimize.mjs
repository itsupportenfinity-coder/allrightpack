import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const CATEGORY_IMAGES = [
  { file: 'public/images/categories/bubble-rolls.jpg', rename: true },
  { file: 'public/images/categories/corrugated-rolls.jpg', rename: true },
  { file: 'public/images/categories/foam-rolls.jpg', rename: true },
  { file: 'public/images/categories/gloves.jpg', rename: true },
  { file: 'public/images/categories/packing-tools.jpg', rename: true },
  { file: 'public/images/categories/vacuum-bags.jpg', rename: true },
  { file: 'public/images/categories/cling-film.webp', rename: false },
  { file: 'public/images/categories/packing-tapes.webp', rename: false },
  { file: 'public/images/categories/pof-shrink-film.webp', rename: false },
  { file: 'public/images/categories/stretch-film.webp', rename: false },
];

const PRODUCT_IMAGES = [
  // .jpg files that need rename → .webp
  { file: 'public/images/products/bubble-wrap-3-cut.jpg', rename: true },
  { file: 'public/images/products/barcode-label-100-x-50-x-500-core-40mm.jpg', rename: true },
  { file: 'public/images/products/barcode-label-100x150x-1000-core-3inch-76mm.jpg', rename: true },
  { file: 'public/images/products/barcode-label-50-x-25-x5000-core-3inch-76mm.jpg', rename: true },
  { file: 'public/images/products/barcode-label-58-x-38-x1000.jpg', rename: true },
  { file: 'public/images/products/barcode-lablel-38-x-25-x-1000.jpg', rename: true },
  { file: 'public/images/products/brown-packing-tape-1000-yard.jpg', rename: true },
  { file: 'public/images/products/cord-composite-strap-19mm.jpg', rename: true },
  { file: 'public/images/products/double-sided-tape.jpg', rename: true },
  { file: 'public/images/products/polyester-terephthalate-pet-strap-9mm.jpg', rename: true },
  { file: 'public/images/products/polypropylene-pp-strap-12mm.jpg', rename: true },
  { file: 'public/images/products/polypropylene-pp-strap-15mm.jpg', rename: true },
  { file: 'public/images/products/polypropylene-pp-strap-9mm.jpg', rename: true },
  { file: 'public/images/products/red-tape-70-yard.jpg', rename: true },
  // .webp files that need re-encode only
  { file: 'public/images/products/barcode-label-printer.webp', rename: false },
  { file: 'public/images/products/barcode-label-50-x-25-x1000.webp', rename: false },
  { file: 'public/images/products/barcode-lablel-38-x-25-x-5000-3inch-76mm.webp', rename: false },
  { file: 'public/images/products/brown-packing-tape-70-yard.webp', rename: false },
  { file: 'public/images/products/masking-tape-1.webp', rename: false },
  { file: 'public/images/products/polyester-terephthalate-pet-strap-12mm.webp', rename: false },
  { file: 'public/images/products/polyester-terephthalate-pet-strap-15mm.webp', rename: false },
];

const ALL_IMAGES = [...CATEGORY_IMAGES, ...PRODUCT_IMAGES];

async function convert() {
  const results = [];
  let totalBefore = 0;
  let totalAfter = 0;

  for (const entry of ALL_IMAGES) {
    const input = entry.file;
    if (!fs.existsSync(input)) {
      results.push({ file: input, status: 'SKIPPED - not found' });
      continue;
    }

    const statBefore = fs.statSync(input);
    const sizeBefore = statBefore.size;
    totalBefore += sizeBefore;

    try {
      const img = sharp(input);
      const meta = await img.metadata();
      
      // Verify it's actually PNG-encoded
      if (meta.format !== 'png') {
        const sizeKB = (sizeBefore / 1024).toFixed(1);
        results.push({ file: input, status: `SKIPPED - already ${meta.format} (${sizeKB} KB)` });
        totalAfter += sizeBefore;
        continue;
      }

      // Determine output path
      const parsed = path.parse(input);
      let output;
      if (entry.rename) {
        // Rename .jpg → .webp
        output = path.join(parsed.dir, parsed.name + '.webp');
      } else {
        // Re-encode in place (was .webp already, or keep same name)
        output = path.join(parsed.dir, parsed.name + '.webp');
      }

      // Build pipeline with the same settings throughout
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
      totalAfter += sizeAfter;

      const pct = ((1 - sizeAfter / sizeBefore) * 100).toFixed(1);
      const beforeKB = (sizeBefore / 1024).toFixed(1);
      const afterKB = (sizeAfter / 1024).toFixed(1);

      results.push({
        file: input,
        output: entry.rename ? output : '(in-place)',
        status: 'OK',
        beforeKB,
        afterKB,
        reduction: pct,
        width: meta.width,
        height: meta.height,
        hasAlpha: meta.hasAlpha,
        hasIcc: Boolean(meta.icc),
      });

      // Delete original if renamed
      if (entry.rename && output !== input) {
        fs.unlinkSync(input);
      }

    } catch (err) {
      results.push({ file: input, status: 'ERROR', error: err.message });
    }
  }

  // Print report
  console.log('\n=== WebP Conversion Report ===\n');
  
  const sections = [
    { title: 'CATEGORY IMAGES', items: CATEGORY_IMAGES.map(e => e.file) },
    { title: 'PRODUCT IMAGES (.jpg → .webp rename)', items: PRODUCT_IMAGES.filter(e => e.rename).map(e => e.file) },
    { title: 'PRODUCT IMAGES (.webp re-encode)', items: PRODUCT_IMAGES.filter(e => !e.rename).map(e => e.file) },
  ];

  for (const section of sections) {
    console.log(`--- ${section.title} ---`);
    for (const file of section.items) {
      const r = results.find(r => r.file === file);
      if (!r) continue;
      if (r.status === 'OK') {
        const outNote = r.output !== '(in-place)' ? ` → ${r.output.replace('public/images/','')}` : '';
        console.log(`  ${r.file.replace('public/images/','')}: ${r.beforeKB} KB → ${r.afterKB} KB (${r.reduction}% reduction)${outNote}`);
      } else if (r.status.startsWith('SKIPPED')) {
        console.log(`  ${r.file.replace('public/images/','')}: ${r.status}`);
      } else {
        console.log(`  ${r.file.replace('public/images/','')}: ${r.status} - ${r.error}`);
      }
    }
    console.log('');
  }

  const mbBefore = (totalBefore / 1024 / 1024).toFixed(2);
  const mbAfter = (totalAfter / 1024 / 1024).toFixed(2);
  const mbSaved = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(2);
  const pctTotal = ((1 - totalAfter / totalBefore) * 100).toFixed(1);

  console.log('=== SUMMARY ===');
  console.log(`Total before: ${mbBefore} MB`);
  console.log(`Total after:  ${mbAfter} MB`);
  console.log(`Total saved:  ${mbSaved} MB (${pctTotal}%)`);
  console.log(`\nAll conversions complete.\n`);
}

convert().catch(console.error);
