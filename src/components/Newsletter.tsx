import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-arp">
        <div className="bg-white rounded-2xl ring-1 ring-brand-green-border p-8 md:p-12 max-w-2xl mx-auto text-center">
          <h3 className="display text-3xl md:text-4xl text-foreground">
            Stay Connected
          </h3>
          <p className="mt-3 text-sm text-[hsl(var(--gray-dark))] max-w-lg mx-auto leading-relaxed">
            Be the first to know about new packaging products, exclusive offers, and industry updates from All Right Pack.
          </p>

          <form className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--gray))]" />
              <input
                type="email"
                placeholder="Your business email address"
                className="w-full h-11 pl-9 pr-4 rounded-md border-2 border-brand-green-border bg-white text-sm placeholder:text-[hsl(var(--gray-light))] focus:outline-none focus:border-brand-green transition-colors"
                required
              />
            </div>
            <button type="submit" className="btn-green shrink-0 px-8">
              Subscribe
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-[hsl(var(--gray))]">
            <span>✓ No spam</span>
            <span>✓ Business updates only</span>
            <span>✓ Unsubscribe anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
