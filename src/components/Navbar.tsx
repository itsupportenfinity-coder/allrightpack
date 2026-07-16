import { useEffect, useState } from "react";
import { Menu, Phone, ShoppingCart, X } from "lucide-react";
import { useEnquiry } from "@/lib/enquiry";
import { scrollToId } from "@/lib/utils";

const NAV = [
  { id: "home", label: "Home" },
  { id: "categories", label: "Categories" },
  { id: "products", label: "Shop" },
  { id: "why", label: "Why Us" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ onOpenCart }: { onOpenCart: () => void }) {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useEnquiry();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let current = NAV[0].id;

    const onScroll = () => {
      const mid = window.innerHeight / 2;
      for (const { id } of NAV) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {
          if (current !== id) {
            current = id;
            setActive(id);
          }
          return;
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    setMobileOpen(false);
    setActive(id);
    // Defer to allow mobile menu close animation
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        scrolled ? "shadow-soft" : "shadow-[0_1px_0_hsl(var(--green-border))]"
      }`}
    >
      <div className="container-arp h-[68px] flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => handleNav("home")}
          className="flex items-center shrink-0"
          aria-label="All Right Pack home"
        >
          <img
            src="/images/brand/logo.png"
            alt="All Right Pack"
            className="h-9 md:h-11 w-auto"
            loading="eager"
          />
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => handleNav(n.id)}
              aria-current={active === n.id ? "page" : undefined}
              className={`px-3.5 py-2 rounded-md text-[13.5px] font-bold uppercase tracking-wide transition-colors focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 ${
                active === n.id
                  ? "text-brand-green bg-brand-green-pale"
                  : "text-[hsl(var(--gray-dark))] hover:text-brand-green hover:bg-brand-green-pale"
              }`}
            >
              {n.label}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <a
            href="tel:+96560005276"
            className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-brand-green hover:underline"
          >
            <Phone className="w-4 h-4" />
            +965 6000 5276
          </a>
          <button
            onClick={onOpenCart}
            className="relative w-10 h-10 rounded-md border-2 border-brand-green-border text-brand-green hover:bg-brand-green-pale transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
            aria-label="Open enquiry cart"
          >
            <ShoppingCart className="w-4 h-4" />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-green text-white text-[10px] font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <a
            href="https://wa.me/96560005276?text=Hi%20All%20Right%20Pack!"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex btn-wa !px-4 !py-2 !text-xs"
          >
            WhatsApp Us
          </a>
          <button
            className="lg:hidden w-10 h-10 rounded-md border-2 border-brand-green-border text-brand-green flex items-center justify-center focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-brand-green-border bg-white animate-fade-in">
          <nav className="container-arp py-3 flex flex-col">
            {NAV.map(n => (
              <button
                key={n.id}
                onClick={() => handleNav(n.id)}
                aria-current={active === n.id ? "page" : undefined}
                className={`text-left px-3 py-3 rounded-md text-sm font-bold uppercase tracking-wide focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 ${
                  active === n.id
                    ? "text-brand-green bg-brand-green-pale"
                    : "text-[hsl(var(--gray-dark))] hover:bg-brand-green-pale"
                }`}
              >
                {n.label}
              </button>
            ))}
            <a
              href="tel:+96560005276"
              className="px-3 py-3 text-sm font-bold text-brand-green flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> +965 6000 5276
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
