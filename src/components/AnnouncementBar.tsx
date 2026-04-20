const ITEMS = [
  "🚚 FREE DELIVERY ACROSS KUWAIT",
  "📦 SAME-DAY DISPATCH BEFORE 2PM",
  "💬 WHATSAPP ORDERS: +965 60005276",
  "🏆 KUWAIT'S #1 PACKAGING SUPPLIER",
  "✅ QUALITY GUARANTEED — TRUSTED BY 500+ BUSINESSES",
];

export default function AnnouncementBar() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="bg-brand-green text-white overflow-hidden py-2 text-xs font-bold tracking-wider cond">
      <div className="ticker inline-flex gap-14 whitespace-nowrap pl-14">
        {loop.map((t, i) => (
          <span key={i} className="opacity-95">{t}</span>
        ))}
      </div>
    </div>
  );
}
