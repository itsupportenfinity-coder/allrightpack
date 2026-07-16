import { ArrowRight } from "lucide-react";
import { getCategories } from "@/lib/products";
import { scrollToId } from "@/lib/utils";
import { handleImgError } from "@/lib/image";

export default function Categories({ onPick }: { onPick: (label: string) => void }) {
  const cats = getCategories();

  const handlePick = (label: string) => {
    onPick(label);
    scrollToId("products");
  };

  return (
    <section id="categories" className="py-16 md:py-24 bg-white">
      <div className="container-arp">
        <div className="mb-10 md:mb-12">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green mb-3 cond">
            — Browse by Category
          </div>
          <h2 className="display text-4xl md:text-5xl lg:text-6xl">
            Our <span className="text-brand-green">Product Lines</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 md:gap-5">
          {cats.map(c => (
            <button
              key={c.slug}
              onClick={() => handlePick(c.label)}
              className="group text-left bg-white rounded-xl overflow-hidden ring-1 ring-brand-green-border card-hover"
            >
              <div className="aspect-square bg-[hsl(var(--off))] overflow-hidden">
                <img
                  src={c.banner}
                  alt={c.label}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={handleImgError}
                />
              </div>
              <div className="p-3 md:p-4">
                <div className="text-[13px] md:text-sm font-bold leading-tight text-foreground line-clamp-2">{c.label}</div>
                <div className="mt-1 flex items-center justify-between text-[11px]">
                  <span className="text-[hsl(var(--gray))] font-semibold">{c.count} items</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-green opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
