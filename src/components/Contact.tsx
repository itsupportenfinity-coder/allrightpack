import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-12 md:py-16 bg-[hsl(var(--off))]">
      <div className="container-arp">
        <div className="text-center mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-green mb-3">
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

          <div className="relative rounded-2xl overflow-hidden shadow-elev ring-1 ring-brand-green-border h-[360px] md:h-full hover:shadow-soft transition-shadow"
               role="region" aria-label="Store location map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.00!2d48.0687138!3d29.3389148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9d998196727d%3A0x54079ba58b3cf6f4!2sAll+Right+Pack!5e0!3m2!1sen!2skw"
              width="100%"
              height="100%"
              loading="lazy"
              title="All Right Pack store location on Google Maps"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
            />
            <div className="absolute bottom-0 left-0 m-3 md:m-4 max-w-[260px] md:max-w-[280px] bg-white rounded-xl shadow-elev ring-1 ring-brand-green-border p-4">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <div>
<div className="text-lg md:text-xl text-foreground leading-none font-bold tracking-[0.5px]">
                     All Right Pack
                  </div>
                  <div className="mt-2 text-sm leading-snug text-[hsl(var(--gray-dark))] font-medium">
                    203, Suhaib Complex<br />
                    Office 14<br />
                    Salmiya, Kuwait
                  </div>
                  <a
                    href="https://maps.app.goo.gl/htobcgNL33Xa3U1W8"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open All Right Pack location in Google Maps"
                    className="mt-3 inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-xs bg-brand-green text-white px-3.5 py-2 rounded-md hover:bg-brand-green-mid transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Open in Google Maps
                  </a>
                </div>
              </div>
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
        <div className="text-xs uppercase tracking-wider font-bold text-brand-green mb-1">
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
