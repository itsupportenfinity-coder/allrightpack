import fs from 'fs';
import path from 'path';

const publicDir = 'public';

// Collect all references from source files
function extractReferences(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const refs = [];
  // Match "/images/..." paths
  const re = /"(\/images\/[^"]+?)"/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    refs.push(m[1]);
  }
  return refs;
}

const srcFiles = [
  'src/data/products.json',
  'src/components/Footer.tsx',
  'src/components/Navbar.tsx',
  'src/components/Hero.tsx',
  'src/lib/products.ts',
];

const allRefs = new Map(); // path -> Set of source files
for (const sf of srcFiles) {
  const refs = extractReferences(sf);
  for (const r of refs) {
    if (!allRefs.has(r)) allRefs.set(r, new Set());
    allRefs.get(r).add(sf);
  }
}

// Also check supabase MCP function
const supabaseRefs = extractReferences('supabase/functions/mcp/index.ts');
for (const r of supabaseRefs) {
  if (!allRefs.has(r)) allRefs.set(r, new Set());
  allRefs.get(r).add('supabase/functions/mcp/index.ts');
}

console.log('=== Image Path Verification ===\n');

let ok = 0, missing = 0, dup = 0;

for (const [imgPath, sources] of allRefs) {
  const filePath = path.join(publicDir, imgPath.replace(/^\//, ''));
  const exists = fs.existsSync(filePath);
  const sourcesStr = [...sources].join(', ');

  // Check for duplicates (PNG and WebP both reference same base)
  const base = imgPath.replace(/\.(png|webp|jpg)$/, '');
  const dir = path.dirname(filePath);
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  const variations = files.filter(f => f.startsWith(path.basename(base)) && f !== path.basename(filePath));
  
  if (exists) {
    const stat = fs.statSync(filePath);
    const sizeKB = (stat.size / 1024).toFixed(1);
    console.log(`✅ ${imgPath} (${sizeKB} KB) — used in: ${sourcesStr}`);
    if (variations.length > 0) {
      console.log(`   ⚠️  Duplicate variants found: ${variations.join(', ')}`);
      dup++;
    }
    ok++;
  } else {
    console.log(`❌ MISSING: ${imgPath} — used in: ${sourcesStr}`);
    missing++;
  }
}

console.log(`\n--- Summary ---`);
console.log(`OK: ${ok}`);
console.log(`Missing: ${missing}`);
console.log(`Duplicate warnings: ${dup}`);
