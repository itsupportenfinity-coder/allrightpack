import { useEffect, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { deriveSpecs, getDescription, getRelated, type Product } from "@/lib/products";
import { useEnquiry } from "@/lib/enquiry";
import { toast } from "sonner";

export default function ProductModal({
  product,
  onClose,
  onOpenProduct,
}: {
  product: Product | null;
  onClose: () => void;
  onOpenProduct: (p: Product) => void;
}) {
  const [qty, setQty] = useState(1);
  const add = useEnquiry(s => s.add);

  useEffect(() => {
    setQty(1);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [product, onClose]);

  if (!product) return null;

  const specs = deriveSpecs(product);
  const desc = getDescription(product);
  const related = getRelated(product, 4);

  const handleAdd = () => {
    add(product, qty);
    toast.success(`${product.name} added to enquiry cart`, {
      description: `Quantity: ${qty}`,
    });
  };

  const waMsg = encodeURIComponent(
    `Hi All Right Pack! I'd like to enquire about: ${product.name} (Qty: ${qty})`
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6 animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-elev w-full max-w-5xl max-h-[92vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-md bg-brand-green-pale text-brand-green hover:bg-brand-green hover:text-white transition-colors flex items-center justify-center"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top: image + info */}
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="aspect-square md:aspect-auto bg-[hsl(var(--off))] flex items-center justify-center p-6 md:p-10">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-[420px] w-auto h-auto object-contain"
            />
          </div>

          {/* Info */}
          <div className="p-5 md:p-8">
            <span className="inline-block text-[10px] cond font-bold uppercase tracking-wider text-white bg-brand-green px-2.5 py-1 rounded">
              POPULAR
            </span>
            <h3 className="display text-3xl md:text-4xl mt-3 leading-tight">{product.name}</h3>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-[11px] cond font-bold uppercase tracking-wider text-brand-green bg-brand-green-pale px-2.5 py-1 rounded">
                {product.categoryLabel}
              </span>
              {specs[0] && (
                <span className="text-[11px] cond font-bold uppercase tracking-wider text-brand-green bg-brand-green-pale px-2.5 py-1 rounded">
                  {specs[0].value}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-4 text-sm leading-relaxed text-[hsl(var(--gray-dark))]">{desc}</p>

            {/* Specifications */}
            <div className="mt-5 rounded-lg bg-brand-green-pale p-4 ring-1 ring-brand-green-border">
              <div className="text-[11px] cond font-bold uppercase tracking-wider text-brand-green mb-3">
                Specifications
              </div>
              <dl className="text-sm">
                {specs.map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex justify-between py-2 ${
                      i < specs.length - 1 ? "border-b border-brand-green-border" : ""
                    }`}
                  >
                    <dt className="text-[hsl(var(--gray-dark))]">{s.label}</dt>
                    <dd className="font-bold text-foreground">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Quantity */}
            <div className="mt-5 flex items-center gap-3">
              <label htmlFor="product-qty" className="text-[11px] cond font-bold uppercase tracking-wider text-[hsl(var(--gray))]">
                Qty:
              </label>
              <div className="inline-flex items-center border border-input rounded-md">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center text-[hsl(var(--gray-dark))] hover:bg-brand-green-pale"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  id="product-qty"
                  type="number"
                  min={1}
                  aria-label="Quantity"
                  value={qty}
                  onChange={e => setQty(Math.max(1, parseInt(e.target.value || "1", 10)))}
                  className="w-12 h-9 text-center text-sm font-bold border-x border-input focus:outline-none"
                />
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-9 h-9 flex items-center justify-center text-[hsl(var(--gray-dark))] hover:bg-brand-green-pale"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 space-y-2">
              <button onClick={handleAdd} className="btn-green w-full">
                Add to Enquiry Cart
              </button>
              <a
                href={`https://wa.me/96560005276?text=${waMsg}`}
                target="_blank"
                rel="noreferrer"
                className="btn-outline-green w-full"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                </svg>
                Quick Enquire via WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="border-t border-brand-green-border p-5 md:p-8">
            <div className="text-[11px] cond font-bold uppercase tracking-wider text-brand-green mb-4">
              — Related Products
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {related.map(r => (
                <button
                  key={r.id}
                  onClick={() => onOpenProduct(r)}
                  className="group text-left bg-white rounded-lg ring-1 ring-brand-green-border overflow-hidden hover:shadow-soft transition-shadow"
                >
                  <div className="aspect-square bg-[hsl(var(--off))] p-3 overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.name}
                      loading="lazy"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-2.5 border-t border-brand-green-border">
                    <div className="text-xs font-bold leading-tight line-clamp-2">{r.name}</div>
                    <div className="mt-1 text-[10px] text-brand-green cond uppercase tracking-wider font-bold">
                      View →
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
