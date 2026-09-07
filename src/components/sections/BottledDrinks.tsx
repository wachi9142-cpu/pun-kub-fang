"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { SOFT_DRINKS, type SoftDrink } from "@/data/site";
import { useCart } from "@/components/cart/CartContext";
import SmoothieCup from "@/components/SmoothieCup";

function SoftRow({ item }: { item: SoftDrink }) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const add = () => {
    addItem({ id: item.id, name: item.nameTh, price: item.price });
    setAdded(true);
    setTimeout(() => setAdded(false), 1300);
    openCart();
  };

  return (
    <div
      className={`flex items-center gap-3 rounded-2xl bg-cream-white p-3 shadow-soft ring-1 ring-ink/5 ${
        item.soldOut ? "opacity-70" : ""
      }`}
    >
      {/* ไอคอนสินค้าเล็ก ๆ */}
      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-white/70">
        <SmoothieCup palette={item.palette} emoji={item.emoji} size={46} />
      </div>

      <div className="min-w-0 flex-1 leading-tight">
        <p
          className={`text-sm font-semibold text-ink ${
            item.soldOut ? "line-through decoration-ink/30" : ""
          }`}
        >
          {item.nameTh}
        </p>
        <p className="text-[11px] text-ink/45">{item.nameEn}</p>
        {item.desc && (
          <p className="mt-0.5 line-clamp-2 text-[11px] text-ink/55">
            {item.desc}
          </p>
        )}
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <span className="font-display text-base font-bold text-blossom-500">
          {item.price}
        </span>
        {item.soldOut ? (
          <span className="rounded-full bg-ink/10 px-2.5 py-1 text-[10px] font-bold text-ink/60">
            หมดวันนี้ · Sold Out
          </span>
        ) : (
          <button
            onClick={add}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
              added
                ? "bg-grape-500 text-white"
                : "bg-grape-100 text-grape-deep hover:bg-grape-deep hover:text-white"
            }`}
          >
            {added ? <Check size={13} /> : <Plus size={13} />}
            {added ? "เพิ่มแล้ว!" : "เพิ่มลงตะกร้า"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function BottledDrinks() {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          🥤 น้ำอัดลม <span className="text-blossom-400">| Soft Drinks</span>
        </h1>
        <p className="mt-2 text-ink/60">
          น้ำอัดลมขวด พร้อมดื่ม เย็น ๆ ซ่า ๆ (แยกจากโซดาที่ร้านชงเอง)
        </p>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {SOFT_DRINKS.map((item) => (
          <SoftRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
