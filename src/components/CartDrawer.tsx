import { useEffect } from "react";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { useEnquiry } from "@/lib/enquiry";
import { handleImgError } from "@/lib/image";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, setQty, remove, clear } = useEnquiry();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const waMsg = encodeURIComponent(
    "Hi All Right Pack! I'd like to enquire about the following items:\n\n" +
      items.map(i => `• ${i.product.name} — Qty: ${i.qty}`).join("\n")
  );

  return (
    <div className="fixed inset-0 z-[110]">
      <div className="absolute inset-0 bg-black/55" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-elev flex flex-col animate-fade-in">
        <header className="flex items-center justify-between p-5 border-b border-brand-green-border">
          <h3 className="display text-2xl">Enquiry Cart</h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-md bg-brand-green-pale text-brand-green hover:bg-brand-green hover:text-white transition-colors flex items-center justify-center"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="text-center py-16 text-[hsl(var(--gray))]">
              <ShoppingCart className="w-16 h-16 mx-auto text-[hsl(var(--gray))] mb-4" />
              <p className="text-sm">Your enquiry cart is empty.</p>
              <p className="text-xs mt-2">Browse our products and add items to enquire.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map(({ product, qty }) => (
                <li
                  key={product.id}
                  className="flex gap-3 p-3 rounded-lg ring-1 ring-brand-green-border bg-white"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-contain bg-[hsl(var(--off))] rounded shrink-0"
                    onError={handleImgError}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold leading-tight line-clamp-2">
                      {product.name}
                    </div>
                    <div className="text-[10px] text-brand-green cond uppercase tracking-wider font-bold mt-1">
                      {product.categoryLabel}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center border border-input rounded">
                        <button
                          onClick={() => setQty(product.id, qty - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-brand-green-pale"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{qty}</span>
                        <button
                          onClick={() => setQty(product.id, qty + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-brand-green-pale"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => remove(product.id)}
                        className="text-[hsl(var(--gray))] hover:text-destructive p-1"
                        aria-label="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="p-5 border-t border-brand-green-border space-y-2">
            <a
              href={`https://wa.me/96560005276?text=${waMsg}`}
              target="_blank"
              rel="noreferrer"
              className="btn-wa w-full"
            >
              Send Enquiry via WhatsApp
            </a>
            <button onClick={clear} className="text-xs text-[hsl(var(--gray))] hover:text-destructive w-full text-center py-1">
              Clear cart
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}
