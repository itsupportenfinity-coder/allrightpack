import { useEffect, useState } from "react";
import { Menu, Phone, ShoppingCart, X } from "lucide-react";
import { useEnquiry } from "@/lib/enquiry";

const NAV = [
  { id: "home", label: "Home" },
  { id: "categories", label: "Categories" },
  { id: "products", label: "Shop" },
  { id: "why", label: "Why Us" },
  { id: "contact", label: "Contact" },
];

const NAV_OFFSET = 96; // sticky nav height + announcement bar

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

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

  // Scroll-spy with IntersectionObserver — fixes "always Shop" bug.
  useEffect(() => {
    const sections = NAV.map(n => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      entries => {
        // Pick the entry with the largest visible ratio that crosses the trigger line.
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        // Trigger when section center crosses ~30% from top of viewport.
        rootMargin: `-${NAV_OFFSET + 20}px 0px -55% 0px`,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
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
              className={`px-3.5 py-2 rounded-md text-[13.5px] font-bold uppercase tracking-wide transition-colors ${
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
            +965 60005276
          </a>
          <button
            onClick={onOpenCart}
            className="relative w-10 h-10 rounded-md border-2 border-brand-green-border text-brand-green hover:bg-brand-green-pale transition-colors flex items-center justify-center"
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
            WhatsApp
          </a>
          <button
            className="lg:hidden w-10 h-10 rounded-md border-2 border-brand-green-border text-brand-green flex items-center justify-center"
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
                className={`text-left px-3 py-3 rounded-md text-sm font-bold uppercase tracking-wide ${
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
              <Phone className="w-4 h-4" /> +965 60005276
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
