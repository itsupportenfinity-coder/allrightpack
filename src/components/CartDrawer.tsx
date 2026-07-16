import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { useEnquiry } from "@/lib/enquiry";
import { handleImgError } from "@/lib/image";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, setQty, remove, clear } = useEnquiry();

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleClear = () => setConfirmOpen(true);

  const handleConfirmClear = () => {
    clear();
    setConfirmOpen(false);
  };

  const handleCancelClear = () => setConfirmOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!confirmOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setConfirmOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirmOpen]);

  useEffect(() => {
    if (confirmOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [confirmOpen]);

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
            className="w-9 h-9 rounded-md bg-brand-green-pale text-brand-green hover:bg-brand-green hover:text-white transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
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
                          disabled={qty <= 1}
                          className={`w-7 h-7 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 ${
                            qty <= 1
                              ? "text-[hsl(var(--gray-light))] cursor-not-allowed"
                              : "hover:bg-brand-green-pale"
                          }`}
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{qty}</span>
                        <button
                          onClick={() => setQty(product.id, qty + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-brand-green-pale focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => remove(product.id)}
                        className="text-[hsl(var(--gray))] hover:text-destructive p-1 focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
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
            <button onClick={handleClear} className="text-xs text-[hsl(var(--gray))] hover:text-destructive w-full text-center py-1 focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2">
              Clear cart
            </button>
          </footer>
        )}
      </aside>

      {/* Confirm clear modal */}
      <div
        className={`fixed inset-0 z-[120] flex items-center justify-center p-4 transition-all duration-200 ${
          confirmOpen
            ? "opacity-100 visible scale-100"
            : "opacity-0 invisible pointer-events-none scale-95"
        }`}
        onClick={handleCancelClear}
      >
        <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />
        <div
          className="relative bg-white rounded-2xl shadow-elev max-w-sm w-full p-6"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <Trash2 className="w-6 h-6 text-destructive shrink-0" />
            <h3 className="display text-xl text-foreground">Clear Enquiry Cart</h3>
          </div>
          <p className="mt-3 text-sm text-[hsl(var(--gray-dark))] leading-relaxed">
            Are you sure you want to remove all products from your enquiry cart? This action cannot be undone.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={handleCancelClear}
              className="flex-1 cond font-bold uppercase tracking-wider text-sm bg-white text-brand-green border-2 border-brand-green-border rounded-md px-4 py-2.5 hover:border-brand-green hover:bg-brand-green-pale transition-colors focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmClear}
              className="flex-1 cond font-bold uppercase tracking-wider text-sm bg-destructive text-destructive-foreground rounded-md px-4 py-2.5 hover:bg-destructive/90 transition-colors focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
