import raw from "@/data/products.json";

export type Product = {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  description: string;
  image: string;
  images: string[];
  tags?: string;
};

export type Category = {
  slug: string;
  label: string;
  count: number;
  banner: string;
  blurb: string;
};

const ALL = raw as Product[];

/* ------------------------------------------------------------------ */
/* Auto-generated descriptions + specs (source site has none)         */
/* ------------------------------------------------------------------ */

const BLURBS_BY_CAT: Record<string, string> = {
  "POF Shrink Film":
    "Premium POF shrink film engineered for retail, food and cosmetics packaging. Crystal-clear finish, compatible with standard L-bar sealers and heat tunnels.",
  "Stretch Film":
    "Heavy-duty hand & machine stretch film for pallet wrapping. High puncture resistance, excellent cling, consistent thickness throughout the roll.",
  "Packing Tapes":
    "Professional-grade adhesive packing tape with strong, residue-free hold. Suitable for cartons, sealing and general industrial use.",
  "Cling Film":
    "Food-safe PVC cling film for kitchen, hotel and catering use. Strong cling, easy to tear, safe for direct food contact.",
  "Vacuum Bags":
    "Multi-layer vacuum pouches for food preservation and storage. Compatible with all standard vacuum sealing machines.",
  "Bubble Rolls":
    "Air-cushioned bubble protection for fragile shipments. Lightweight, recyclable and reliable shock absorption.",
  "Industrial Strapping":
    "High-tensile industrial strapping for securing heavy loads, pallets and bundles. Strong, durable, weather-resistant.",
  Gloves:
    "Comfortable, durable work gloves designed for warehouse, food handling and industrial environments.",
  "Packing Tools":
    "Professional packing tools and dispensers for fast, efficient and consistent packaging operations.",
  "Packaging Machines":
    "Reliable packaging machines built for commercial and industrial use — easy to operate and low-maintenance.",
  "Thermal Paper Roll":
    "High-quality thermal paper rolls compatible with all major POS, ATM and receipt printers.",
  "Thermal Labels":
    "Self-adhesive thermal labels for barcoding, shipping and inventory. Smooth feeding, sharp print, strong adhesive.",
  "Foam Rolls":
    "Soft protective foam rolls for surface protection during shipping and storage. Lightweight and reusable.",
  "Corrugated Rolls":
    "Corrugated cardboard rolls for wrapping fragile items, lining cartons and protecting products in transit.",
};

/** Try to extract specs (Width / Thickness / Type / Use) from product names. */
export function deriveSpecs(p: Product): { label: string; value: string }[] {
  const name = p.name;
  const cat = p.categoryLabel;
  const specs: { label: string; value: string }[] = [];

  // Width x length pattern e.g. 15x400, 100x150
  const wxl = name.match(/(\d{2,4})\s*[xX×]\s*(\d{2,4})/);
  // Single mm/yard/kg
  const mm = name.match(/(\d{2,4})\s*mm/i);
  const yard = name.match(/(\d{2,4})\s*yard/i);
  const kg = name.match(/([\d.]+)\s*kg/i);
  const mic = name.match(/(\d{1,3})\s*mic/i);
  const gsm = name.match(/(\d{1,3})\s*gsm/i);

  if (cat === "POF Shrink Film" && wxl) {
    specs.push({ label: "Thickness", value: `${wxl[1]} Micron` });
    specs.push({ label: "Width", value: `${wxl[2]}mm` });
    specs.push({ label: "Type", value: "POF / Polyolefin" });
    specs.push({ label: "Use", value: "Retail & Food Packaging" });
    return specs;
  }
  if (cat === "Stretch Film") {
    if (kg) specs.push({ label: "Roll Weight", value: `${kg[1]} kg` });
    if (mic) specs.push({ label: "Thickness", value: `${mic[1]} Micron` });
    specs.push({ label: "Type", value: name.toLowerCase().includes("machine") ? "Machine Roll" : "Hand Roll" });
    specs.push({ label: "Use", value: "Pallet Wrapping" });
    return specs;
  }
  if (cat === "Packing Tapes") {
    if (yard) specs.push({ label: "Length", value: `${yard[1]} Yard` });
    const colour = ["Clear", "Brown", "Yellow", "Red", "Black", "Blue", "Aluminum", "Caution", "Fragile", "Masking", "Scotch"].find(c =>
      name.toLowerCase().includes(c.toLowerCase())
    );
    if (colour) specs.push({ label: "Color / Type", value: colour });
    specs.push({ label: "Adhesive", value: "Acrylic / BOPP" });
    specs.push({ label: "Use", value: "Carton Sealing" });
    return specs;
  }
  if (cat === "Thermal Labels" && wxl) {
    specs.push({ label: "Size", value: `${wxl[1]} × ${wxl[2]} mm` });
    const qty = name.match(/x\s*(\d{3,5})\s*(core|$)/i);
    if (qty) specs.push({ label: "Labels per Roll", value: qty[1] });
    const core = name.match(/core\s*([\d.]+\s*(?:mm|inch))/i);
    specs.push({ label: "Core", value: core ? core[1].toUpperCase() : "40mm" });
    specs.push({ label: "Use", value: "Barcoding / Shipping" });
    return specs;
  }
  if (cat === "Thermal Paper Roll" && wxl) {
    specs.push({ label: "Size", value: `${wxl[1]} × ${wxl[2]} mm` });
    if (gsm) specs.push({ label: "Weight", value: `${gsm[1]} GSM` });
    specs.push({ label: "Type", value: "Thermal" });
    specs.push({ label: "Use", value: "POS / Receipt Printers" });
    return specs;
  }
  if (cat === "Industrial Strapping" && mm) {
    specs.push({ label: "Width", value: `${mm[1]}mm` });
    const mat = ["Steel", "Composite", "PET", "Polyester", "PP", "Polypropylene", "Cord"].find(m =>
      name.toLowerCase().includes(m.toLowerCase())
    );
    if (mat) specs.push({ label: "Material", value: mat });
    specs.push({ label: "Use", value: "Heavy-Duty Bundling" });
    return specs;
  }
  if (cat === "Vacuum Bags" && wxl) {
    specs.push({ label: "Size", value: `${wxl[1]} × ${wxl[2]} mm` });
    specs.push({ label: "Material", value: "Multi-layer Nylon/PE" });
    specs.push({ label: "Use", value: "Food Vacuum Sealing" });
    return specs;
  }
  if (cat === "Foam Rolls") {
    if (mm) specs.push({ label: "Thickness", value: `${mm[1]}mm` });
    specs.push({ label: "Material", value: "EPE Foam" });
    specs.push({ label: "Use", value: "Surface Protection" });
    return specs;
  }
  if (cat === "Cling Film" && kg) {
    specs.push({ label: "Roll Weight", value: `${kg[1]} kg` });
    specs.push({ label: "Material", value: "Food-grade PVC" });
    specs.push({ label: "Use", value: "Kitchen / Food Wrapping" });
    return specs;
  }

  // Default for tools, machines, gloves, etc.
  specs.push({ label: "Category", value: cat });
  specs.push({ label: "Brand", value: "All Right Pack" });
  specs.push({ label: "Origin", value: "Imported" });
  return specs;
}

export function getDescription(p: Product): string {
  if (p.description && p.description.length > 20) return p.description;
  const blurb = BLURBS_BY_CAT[p.categoryLabel] ?? "";
  // Add a sentence with name spec if applicable
  const wxl = p.name.match(/(\d{2,4})\s*[xX×]\s*(\d{2,4})/);
  if (wxl && p.categoryLabel === "POF Shrink Film") {
    return `${p.name} — POF shrink film in ${wxl[2]}mm width, ${wxl[1]} micron. ${blurb}`;
  }
  return blurb || `Professional ${p.categoryLabel.toLowerCase()} from All Right Pack — Kuwait's trusted packaging supplier.`;
}

/* ------------------------------------------------------------------ */
/* Public API                                                         */
/* ------------------------------------------------------------------ */

const CAT_BANNERS: Record<string, string> = {
  "POF Shrink Film": "/images/banners/hero-1.png",
  "Packing Tapes": "/images/banners/tapes.png",
  "Stretch Film": "/images/banners/hero-2.png",
  "Industrial Strapping": "/images/banners/strapping.png",
  "Thermal Paper Roll": "/images/banners/thermal.png",
  "Thermal Labels": "/images/banners/labels.png",
  "Packaging Machines": "/images/banners/machines.png",
  "Cling Film": "/images/banners/hero-3.png",
};

const CAT_BLURB: Record<string, string> = {
  "POF Shrink Film": "Crystal-clear shrink films for retail packaging.",
  "Stretch Film": "Hand & machine rolls for pallet wrapping.",
  "Packing Tapes": "Strong adhesive tapes — every color, every length.",
  "Cling Film": "Food-grade cling film for kitchen and catering.",
  "Vacuum Bags": "Multi-layer vacuum pouches in every size.",
  "Bubble Rolls": "Air-cushion protection for fragile shipments.",
  "Industrial Strapping": "Composite, PET, PP and steel strapping.",
  Gloves: "Cotton, vinyl, rubber & industrial work gloves.",
  "Packing Tools": "Dispensers, tensioners, sealers & cutters.",
  "Packaging Machines": "Sealers, wrappers, vacuum & strapping machines.",
  "Thermal Paper Roll": "POS, ATM and receipt thermal rolls.",
  "Thermal Labels": "Barcode and shipping labels — every size.",
  "Foam Rolls": "Protective EPE foam rolls in 1–3mm.",
  "Corrugated Rolls": "Corrugated cardboard rolls for wrapping.",
};

export const allProducts: Product[] = ALL;

export function getCategories(): Category[] {
  const map = new Map<string, Category>();
  for (const p of ALL) {
    const ex = map.get(p.categoryLabel);
    if (ex) {
      ex.count++;
    } else {
      map.set(p.categoryLabel, {
        slug: p.category,
        label: p.categoryLabel,
        count: 1,
        banner: CAT_BANNERS[p.categoryLabel] ?? p.image,
        blurb: CAT_BLURB[p.categoryLabel] ?? "",
      });
    }
  }
  // Sort by count desc
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

export function getRelated(p: Product, n = 4): Product[] {
  return ALL.filter(x => x.categoryLabel === p.categoryLabel && x.id !== p.id).slice(0, n);
}
