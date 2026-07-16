import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-[hsl(var(--off))]">
      <div className="container-arp">
        <div className="text-center mb-12">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green mb-3 cond">
            — Get in Touch
          </div>
          <h2 className="display text-4xl md:text-5xl lg:text-6xl">
            Contact <span className="text-brand-green">All Right Pack</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="space-y-4">
            <ContactCard
              icon={Phone}
              title="Call Us"
              lines={["+965 60005276"]}
              href="tel:+96560005276"
            />
            <ContactCard
              icon={Mail}
              title="Email"
              lines={["info@allrightpack.com"]}
              href="mailto:info@allrightpack.com"
            />
            <ContactCard
              icon={MapPin}
              title="Visit Our Store"
              lines={["Find our store on Google Maps"]}
              href="https://maps.app.goo.gl/htobcgNL33Xa3U1W8"
            />
            <ContactCard
              icon={Clock}
              title="Working Hours"
              lines={["Saturday – Thursday", "8:00 AM – 6:00 PM"]}
            />
          </div>

          <div className="bg-brand-green text-white rounded-2xl p-8 md:p-10 flex flex-col justify-center shadow-elev">
            <h3 className="display text-3xl md:text-4xl leading-tight">
              Need a quote<br />for your business?
            </h3>
            <p className="mt-4 text-white/90 text-sm leading-relaxed">
              Whether you're a small shop or a large industrial operation, we'll get you the right packaging solution at the right price — fast.
            </p>
            <span className="block mt-4 text-xs text-white/70">
              Our team is available on WhatsApp<br />
              Sat–Thu &bull; 8 AM – 6 PM
            </span>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/96560005276?text=Hi%20All%20Right%20Pack%21%20I%27d%20like%20to%20enquire"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 cond font-bold uppercase tracking-wider text-sm bg-white text-brand-green px-6 py-3 rounded-md hover:bg-brand-green-pale transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
              <a
                href="tel:+96560005276"
                className="inline-flex items-center justify-center gap-2 cond font-bold uppercase tracking-wider text-sm bg-brand-green-dark text-white px-6 py-3 rounded-md hover:brightness-110 transition"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon: Icon,
  title,
  lines,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  lines: string[];
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-4 bg-white rounded-xl p-5 ring-1 ring-brand-green-border hover:shadow-soft transition-shadow">
      <div className="w-11 h-11 rounded-lg bg-brand-green-pale text-brand-green flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-[11px] cond uppercase tracking-wider font-bold text-brand-green mb-1">
          {title}
        </div>
        {lines.map(l => (
          <div key={l} className="text-sm font-semibold text-foreground">{l}</div>
        ))}
      </div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block">
      {inner}
    </a>
  ) : (
    inner
  );
}
