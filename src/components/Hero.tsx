import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  { src: "/images/banners/hero-1.png", badge: "POF Shrink Film" },
  { src: "/images/banners/tapes.png", badge: "Packing Tapes" },
  { src: "/images/banners/hero-2.png", badge: "Stretch Film" },
  { src: "/images/banners/strapping.png", badge: "Industrial Strapping" },
  { src: "/images/banners/labels.png", badge: "Thermal Labels" },
  { src: "/images/banners/machines.png", badge: "Packaging Machines" },
  { src: "/images/banners/hero-3.png", badge: "All Right Pack" },
];

const NAV_OFFSET = 96;
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  // Preload neighbors
  useEffect(() => {
    [(idx + 1) % SLIDES.length, (idx + 2) % SLIDES.length].forEach(i => {
      const img = new Image();
      img.src = SLIDES[i].src;
    });
  }, [idx]);

  return (
    <section id="home" className="bg-gradient-to-b from-[hsl(var(--green-pale-2))] to-white">
      <div className="container-arp pt-10 md:pt-14 pb-12 md:pb-20 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-12 items-center">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 text-xs font-bold cond uppercase tracking-wider text-brand-green bg-brand-green-pale px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            Kuwait's #1 Packaging Supplier
          </span>
          <h1 className="display text-5xl md:text-6xl lg:text-7xl mt-5 leading-[0.95] font-normal">
            Pack <span className="text-brand-green">Smart.</span><br />
            Ship <span className="text-brand-green">Strong.</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-[hsl(var(--gray-dark))] max-w-xl mx-auto lg:mx-0">
            Professional packaging solutions for every industry in Kuwait. Shrink films, strapping, tapes, thermal labels — delivered free, fast.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <button onClick={() => scrollToId("products")} className="btn-green">
              Shop All Products <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => scrollToId("contact")} className="btn-outline-green">
              Get a Quote
            </button>
          </div>
          <div className="mt-9 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 border-t border-brand-green-border pt-6">
            {[
              ["500+", "Happy Clients"],
              ["14+", "Product Lines"],
              ["8yr+", "In Business"],
            ].map(([n, l]) => (
              <div key={l} className="text-center lg:text-left">
                <div className="display text-3xl md:text-4xl text-brand-green leading-none">{n}</div>
                <div className="text-[11px] uppercase tracking-wider text-[hsl(var(--gray))] mt-1 font-semibold">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider */}
        <div className="relative aspect-[4/3] md:aspect-[5/4] rounded-2xl overflow-hidden bg-white shadow-elev ring-1 ring-brand-green-border">
          {SLIDES.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.badge}
              loading={i === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 w-full h-full object-cover crisp-img transition-opacity duration-700 ${
                i === idx ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 flex items-end justify-between">
            <span className="cond text-xs md:text-sm font-bold uppercase tracking-wider bg-white/95 text-brand-green px-3 py-1.5 rounded-md">
              {SLIDES[idx].badge}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setIdx(i => (i - 1 + SLIDES.length) % SLIDES.length)}
                className="w-9 h-9 rounded-full bg-white/95 text-brand-green flex items-center justify-center hover:bg-white"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIdx(i => (i + 1) % SLIDES.length)}
                className="w-9 h-9 rounded-full bg-white/95 text-brand-green flex items-center justify-center hover:bg-white"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          {/* Dots */}
          <div className="absolute top-3 right-3 flex gap-1.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx ? "bg-brand-green w-6" : "bg-white/80 w-1.5"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
