import { Factory, Warehouse, UtensilsCrossed, Coffee, ChefHat, Store, ShoppingBag, Building2 } from "lucide-react";
import { scrollToId } from "@/lib/utils";

const INDUSTRIES = [
  {
    icon: Factory,
    title: "Manufacturing",
    desc: "Industrial-grade supplies for production lines and factory operations.",
    category: "Industrial Strapping",
  },
  {
    icon: Warehouse,
    title: "Logistics & Warehousing",
    desc: "Stretch film, strapping, and labels for warehouse efficiency.",
    category: "Stretch Film",
  },
  {
    icon: UtensilsCrossed,
    title: "Food & Beverage",
    desc: "Food-safe wrap, gloves, and disposables for commercial kitchens.",
    category: "Cling Film",
  },
  {
    icon: Coffee,
    title: "Cafés & Coffee Shops",
    desc: "Takeaway packaging, receipt rolls, and hygiene essentials.",
    category: "Thermal Paper Roll",
  },
  {
    icon: ChefHat,
    title: "Catering",
    desc: "Bulk containers, vacuum bags, and wrap for large-scale prep.",
    category: "Vacuum Bags",
  },
  {
    icon: Store,
    title: "Retail & Supermarkets",
    desc: "Price labels, bagging, and shelf-ready packaging solutions.",
    category: "Thermal Labels",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce",
    desc: "Shipping boxes, tapes, and protective wrap for order fulfillment.",
    category: "Packing Tapes",
  },
  {
    icon: Building2,
    title: "Hotels & Hospitality",
    desc: "Amenity packaging, housekeeping supplies, and disposables.",
    category: "Gloves",
  },
];

export default function Industries({ onCategoryFilter }: { onCategoryFilter: (label: string) => void }) {
  const handleClick = (category: string) => {
    onCategoryFilter(category);
    scrollToId("products");
  };

  return (
    <section id="industries" className="py-12 md:py-16 bg-white">
      <div className="container-arp">
        <div className="text-center mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-green mb-3 cond">
            — Industries We Serve
          </div>
          <h2 className="display text-7xl md:text-8xl text-foreground leading-none">
            INDUSTRIES
          </h2>
          <div className="cond text-xl md:text-2xl lg:text-3xl font-bold text-brand-green tracking-widest mt-2">
            WE SERVE
          </div>
          <p className="mt-5 text-sm md:text-base text-[hsl(var(--gray-dark))] max-w-2xl mx-auto leading-relaxed">
            Professional packaging solutions trusted by businesses across Kuwait.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {INDUSTRIES.map(({ icon: Icon, title, desc, category }) => (
            <button
              key={title}
              onClick={() => handleClick(category)}
              className="group text-left bg-white rounded-xl p-6 ring-1 ring-brand-green-border card-hover"
            >
              <div className="w-11 h-11 rounded-lg bg-brand-green-pale text-brand-green flex items-center justify-center mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <div className="font-bold text-base mb-2">{title}</div>
              <div className="text-sm text-[hsl(var(--gray))] leading-relaxed">{desc}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
