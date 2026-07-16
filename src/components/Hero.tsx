import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { scrollToId } from "@/lib/utils";
import { handleImgError } from "@/lib/image";

const SLIDES = [
  { src: "/images/banners/hero-1.webp", badge: "POF Shrink Film" },
  { src: "/images/banners/tapes.webp", badge: "Packing Tapes" },
  { src: "/images/banners/hero-2.webp", badge: "Stretch Film" },
  { src: "/images/banners/strapping.webp", badge: "Industrial Strapping" },
  { src: "/images/banners/labels.webp", badge: "Thermal Labels" },
  { src: "/images/banners/machines.webp", badge: "Packaging Machines" },
  { src: "/images/banners/hero-3.webp", badge: "All Right Pack" },
];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setInterval(() => setIdx(i => (i + 1) % SLIDES.length), 4500);
  }, [clearTimer]);

  useEffect(() => {
    startTimer();
    return () => clearTimer();
  }, [startTimer, clearTimer]);

  const goTo = useCallback(
    (i: number) => {
      setIdx(i);
      startTimer();
    },
    [startTimer],
  );

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
        <div
          className="relative aspect-[4/3] md:aspect-[5/4] rounded-2xl overflow-hidden bg-white shadow-elev ring-1 ring-brand-green-border"
          onMouseEnter={clearTimer}
          onMouseLeave={startTimer}
        >
          {SLIDES.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.badge}
              width={1200}
              height={960}
              loading={i === 0 ? "eager" : "lazy"}
              {...{ fetchpriority: i === 0 ? "high" : "auto" }}
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover crisp-img transition-opacity duration-700 ${
                i === idx ? "opacity-100" : "opacity-0"
              }`}
              onError={handleImgError}
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 flex items-end justify-between">
            <span className="cond text-xs md:text-sm font-bold uppercase tracking-wider bg-white/95 text-brand-green px-3 py-1.5 rounded-md">
              {SLIDES[idx].badge}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => goTo((idx - 1 + SLIDES.length) % SLIDES.length)}
                className="w-11 h-11 md:w-10 md:h-10 rounded-full bg-white/95 text-brand-green flex items-center justify-center hover:bg-white shrink-0 focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => goTo((idx + 1) % SLIDES.length)}
                className="w-11 h-11 md:w-10 md:h-10 rounded-full bg-white/95 text-brand-green flex items-center justify-center hover:bg-white shrink-0 focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          {/* Dots */}
          <div className="absolute top-3 right-3 flex items-center gap-0">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="flex items-center justify-center w-7 h-7 focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                aria-label={`Slide ${i + 1}`}
              >
                <span
                  className={`block rounded-full transition-all ${
                    i === idx ? "bg-brand-green w-5 h-1.5" : "bg-white/80 w-1.5 h-1.5"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
