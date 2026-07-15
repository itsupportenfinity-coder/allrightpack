import { useEffect, useMemo, useState } from "react";
import { allProducts, getCategories, type Product } from "@/lib/products";
import { Search } from "lucide-react";

const PAGE = 12;

export default function Shop({
  activeCategory,
  setActiveCategory,
  onOpenProduct,
}: {
  activeCategory: string;
  setActiveCategory: (label: string) => void;
  onOpenProduct: (p: Product) => void;
}) {
  const cats = getCategories();
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE);

  const filtered = useMemo(() => {
    let list = allProducts;
    if (activeCategory !== "All") {
      list = list.filter(p => p.categoryLabel === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q));
    }
    return list;
  }, [activeCategory, query]);

  useEffect(() => {
    setShown(PAGE);
  }, [activeCategory]);

  const visible = filtered.slice(0, shown);
  const hasMore = filtered.length > visible.length;

  return (
    <section id="products" className="py-16 md:py-24 bg-[hsl(var(--off))]">
      <div className="container-arp">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green mb-3 cond">
              — Top Picks
            </div>
            <h2 className="display text-4xl md:text-5xl lg:text-6xl">
              Featured <span className="text-brand-green">Products</span>
            </h2>
          </div>
          <div className="relative md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--gray))]" />
            <input
              type="search"
              aria-label="Search products"
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setShown(PAGE);
              }}
              placeholder="Search products..."
              className="w-full h-11 pl-9 pr-4 rounded-md border-2 border-brand-green-border bg-white text-sm focus:outline-none focus:border-brand-green transition-colors"
            />
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 -mx-5 px-5 md:mx-0 md:px-0 scrollbar-hide">
          {["All", ...cats.map(c => c.label)].map(label => (
            <button
              key={label}
              onClick={() => {
                setActiveCategory(label);
                setShown(PAGE);
              }}
              className={`shrink-0 px-4 py-2 rounded-full text-xs cond font-bold uppercase tracking-wider transition-all ${
                activeCategory === label
                  ? "bg-brand-green text-white"
                  : "bg-white text-[hsl(var(--gray-dark))] ring-1 ring-brand-green-border hover:ring-brand-green hover:text-brand-green"
              }`}
            >
              {label}
              {label !== "All" && (
                <span className={`ml-1.5 text-[10px] ${activeCategory === label ? "text-white/80" : "text-[hsl(var(--gray))]"}`}>
                  {cats.find(c => c.label === label)?.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <div className="py-20 text-center text-[hsl(var(--gray))]">No products match your search.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {visible.map(p => (
              <ProductCard key={p.id} product={p} onClick={() => onOpenProduct(p)} />
            ))}
          </div>
        )}

        {hasMore && (
          <div className="flex justify-center mt-10">
            <button onClick={() => setShown(s => s + PAGE)} className="btn-outline-green">
              Show More Products ▾
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group text-left bg-white rounded-xl overflow-hidden ring-1 ring-brand-green-border card-hover flex flex-col"
    >
      <div className="aspect-square bg-white overflow-hidden p-3">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-3 md:p-4 border-t border-brand-green-border">
        <div className="text-[10px] uppercase tracking-wider text-brand-green font-bold cond">
          {product.categoryLabel}
        </div>
        <div className="mt-1 text-sm md:text-[15px] font-bold leading-snug line-clamp-2 min-h-[2.6em]">
          {product.name}
        </div>
        <div className="mt-3 text-xs cond uppercase tracking-wider font-bold text-brand-green flex items-center gap-1">
          View Details →
        </div>
      </div>
    </button>
  );
}
