import { Instagram, MessageCircle, Phone } from "lucide-react";
import { scrollToId } from "@/lib/utils";

export default function Footer({ onCategoryFilter }: { onCategoryFilter: (label: string) => void }) {
  const goShop = (label: string) => {
    onCategoryFilter(label);
    scrollToId("products");
  };

  return (
    <footer className="bg-[#0f0f0f] text-white pt-14 pb-6">
      <div className="container-arp">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="bg-white inline-block rounded-lg p-3 mb-5">
              <img
                src="/images/brand/logo.webp"
                alt="All Right Pack"
                className="h-12 w-auto"
                loading="lazy"
              />
            </div>
            <p className="text-sm text-white/65 leading-relaxed max-w-sm">
              Kuwait's trusted supplier of professional packaging equipment and tools. Serving 500+ businesses with quality, reliability, and fast free delivery.
            </p>
            <div className="mt-5 flex gap-2">
              <a
                href="https://www.instagram.com/allrightpackco"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-md bg-white/5 hover:bg-brand-green flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
              href="https://wa.me/96560005276?text=Hi%20All%20Right%20Pack%21"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-md bg-white/5 hover:bg-brand-whatsapp flex items-center justify-center transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              </a>
            </div>
            <div className="mt-4">
              <a
                href="tel:+96560005276"
                className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" /> +965 6000 5276
              </a>
            </div>
          </div>

          {/* Products col 1 */}
          <FooterCol
            title="Products"
            items={[
              "POF Shrink Film",
              "Stretch Film",
              "Packing Tapes",
              "Cling Film",
              "Vacuum Bags",
              "Bubble Rolls",
              "Industrial Strapping",
            ]}
            onClick={goShop}
          />

          {/* Products col 2 */}
          <FooterCol
            title="More"
            items={[
              "Gloves",
              "Packaging Machines",
              "Thermal Labels",
              "Thermal Paper Roll",
              "Foam Rolls",
              "Corrugated Rolls",
              "Packing Tools",
            ]}
            onClick={goShop}
          />

          {/* Company */}
          <div>
            <div className="text-[11px] cond uppercase tracking-wider font-bold text-brand-green mb-4">
              Company
            </div>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => scrollToId("home")} className="text-white/65 hover:text-white transition-colors">About ARP</button></li>
              <li><button onClick={() => scrollToId("contact")} className="text-white/65 hover:text-white transition-colors">Contact Us</button></li>
              <li><button onClick={() => scrollToId("why")} className="text-white/65 hover:text-white transition-colors">Why Choose Us</button></li>
              <li><a href="https://maps.app.goo.gl/htobcgNL33Xa3U1W8" target="_blank" rel="noreferrer" className="text-white/65 hover:text-white transition-colors">Find Our Store</a></li>
              <li><a href="https://wa.me/96560005276?text=Hi%20All%20Right%20Pack%21" target="_blank" rel="noreferrer" className="text-white/65 hover:text-white transition-colors">WhatsApp Us</a></li>
            </ul>
            <div className="mt-6">
              <div className="text-[11px] cond uppercase tracking-wider font-bold text-brand-green mb-2">
                Hours
              </div>
              <div className="text-xs text-white/55 leading-relaxed font-medium">
                Sat – Thu · 8AM – 6PM<br />
                Friday: Closed
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/50">
          <div>© {new Date().getFullYear()} All Right Pack, Kuwait. All rights reserved.</div>
          <div className="flex gap-2">
            {["Trusted Packaging Supplier", "Industrial Packaging Solutions", "Serving Businesses Across Kuwait"].map(p => (
              <span key={p} className="px-2 py-1 bg-white/5 rounded text-xs font-bold tracking-wider text-brand-green">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
  onClick,
}: {
  title: string;
  items: string[];
  onClick: (label: string) => void;
}) {
  return (
    <div>
      <div className="text-[11px] cond uppercase tracking-wider font-bold text-brand-green mb-4">
        {title}
      </div>
      <ul className="space-y-2.5 text-sm">
        {items.map(i => (
          <li key={i}>
            <button
              onClick={() => onClick(i)}
              className="text-white/65 hover:text-white transition-colors text-left"
            >
              {i}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
