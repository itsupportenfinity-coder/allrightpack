import { Truck, Package, MessageCircle, Trophy, CheckCircle } from "lucide-react";

const ITEMS = [
  { icon: Truck, text: "FREE DELIVERY ACROSS KUWAIT" },
  { icon: Package, text: "SAME-DAY DISPATCH BEFORE 2PM" },
  { icon: MessageCircle, text: "WHATSAPP ORDERS: +965 60005276" },
  { icon: Trophy, text: "KUWAIT'S #1 PACKAGING SUPPLIER" },
  { icon: CheckCircle, text: "QUALITY GUARANTEED — TRUSTED BY 500+ BUSINESSES" },
];

export default function AnnouncementBar() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="bg-brand-green text-white overflow-hidden py-2 text-xs font-bold tracking-wider">
      <div className="ticker inline-flex gap-14 whitespace-nowrap pl-14">
        {loop.map((item, i) => (
          <span key={i} className="opacity-95 inline-flex items-center gap-1.5">
            <item.icon className="w-3 h-3" /> {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
