import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

type Item = { product: Product; qty: number };

type EnquiryState = {
  items: Item[];
  count: number;
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const recompute = (items: Item[]) => items.reduce((s, i) => s + i.qty, 0);

export const useEnquiry = create<EnquiryState>()(
  persist(
    set => ({
      items: [],
      count: 0,
      add: (product, qty = 1) =>
        set(s => {
          const ex = s.items.find(i => i.product.id === product.id);
          const items = ex
            ? s.items.map(i => (i.product.id === product.id ? { ...i, qty: i.qty + qty } : i))
            : [...s.items, { product, qty }];
          return { items, count: recompute(items) };
        }),
      remove: id =>
        set(s => {
          const items = s.items.filter(i => i.product.id !== id);
          return { items, count: recompute(items) };
        }),
      setQty: (id, qty) =>
        set(s => {
          const items = s.items.map(i => (i.product.id === id ? { ...i, qty: Math.max(1, qty) } : i));
          return { items, count: recompute(items) };
        }),
      clear: () => set({ items: [], count: 0 }),
    }),
    {
      name: "arp-enquiry",
      partialize: state => ({ items: state.items }),
      merge: (persisted, current) => {
        const items = (persisted as Partial<EnquiryState>).items ?? current.items;
        return { ...current, items, count: recompute(items) };
      },
    },
  ),
);
