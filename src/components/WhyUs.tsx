import { Truck, ShieldCheck, Clock, MessageCircle, Package } from "lucide-react";

const ITEMS = [
  { icon: Truck, title: "Free Kuwait Delivery", desc: "We deliver across all of Kuwait at no extra cost — no minimum order required." },
  { icon: ShieldCheck, title: "Quality Guaranteed", desc: "Every product sourced from trusted manufacturers. Not satisfied? We'll replace it." },
  { icon: Clock, title: "Same-Day Dispatch", desc: "Orders placed before 2 PM are dispatched the same day. Most arrive in 24 hours." },
  { icon: MessageCircle, title: "WhatsApp Support", desc: "Our team is on WhatsApp Saturday–Thursday, 8AM–6PM for instant advice." },
  { icon: Package, title: "Bulk Order Ready", desc: "Stock for businesses of every size — from small shops to industrial-scale operations." },
];

export default function WhyUs() {
  return (
    <section id="why" className="py-16 md:py-24 bg-white">
      <div className="container-arp">
        <div className="text-center mb-12">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green mb-3 cond">
            — Why Choose ARP
          </div>
          <h2 className="display text-4xl md:text-5xl lg:text-6xl">
            The <span className="text-brand-green">ARP Advantage</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {ITEMS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-xl p-6 ring-1 ring-brand-green-border card-hover">
              <div className="w-12 h-12 rounded-lg bg-brand-green-pale text-brand-green flex items-center justify-center mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <div className="font-bold text-base mb-2">{title}</div>
              <div className="text-sm text-[hsl(var(--gray))] leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
