import sharp from 'sharp';
import fs from 'fs';

const files = [
  { name: 'bubble-rolls.webp', quality: 70 },
  { name: 'corrugated-rolls.webp', quality: 75 },
  { name: 'foam-rolls.webp', quality: 75 },
  { name: 'gloves.webp', quality: 75 },
  { name: 'packing-tools.webp', quality: 75 },
  { name: 'vacuum-bags.webp', quality: 75 },
  { name: 'cling-film.webp', quality: 75 },
  { name: 'packing-tapes.webp', quality: 75 },
  { name: 'pof-shrink-film.webp', quality: 75 },
];

async function run() {
  for (const { name, quality } of files) {
    const fp = `public/images/categories/${name}`;
    const before = fs.statSync(fp).size;
    const inputBuf = fs.readFileSync(fp);
    const buf = await sharp(inputBuf)
      .webp({ quality, effort: 6, smartSubsample: true })
      .toBuffer();
    fs.writeFileSync(fp, buf);
    const after = fs.statSync(fp).size;
    console.log(`${name}: ${(before/1024).toFixed(1)} KB → ${(after/1024).toFixed(1)} KB (q${quality})`);
  }
  console.log('\nDone.');
}
run().catch(console.error);
