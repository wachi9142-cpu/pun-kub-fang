"use client";

import { useState } from "react";
import { Heart, Plus } from "lucide-react";
import type { MenuItem } from "@/data/site";
import { useCart } from "@/components/cart/CartContext";
import SmoothieCup from "@/components/SmoothieCup";

type DrinkCardProps = {
  item: MenuItem;
  /** ข้อความบนปุ่ม (ค่าเริ่มต้น: เลือกเมนู) */
  buttonLabel?: string;
};

export default function DrinkCard({ item, buttonLabel = "เลือกเมนู" }: DrinkCardProps) {
  const { addItem } = useCart();
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id: item.id, name: item.name, price: item.price });
    setAdded(true);
    setTimeout(() => setAdded(false), 1300);
  };

  return (
    <article className="hover-lift group relative flex flex-col overflow-hidden rounded-3xl bg-white/85 p-4 shadow-card ring-1 ring-white/70">
      {item.badge && (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-blossom-500 px-2.5 py-1 text-[11px] font-bold text-white shadow">
          {item.badge}
        </span>
      )}

      <button
        onClick={() => setLiked((v) => !v)}
        aria-label="ถูกใจ"
        className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-blossom-400 shadow transition-transform hover:scale-110"
      >
        <Heart size={16} fill={liked ? "#f0507f" : "transparent"} />
      </button>

      <div className="relative grid h-44 place-items-center rounded-2xl bg-gradient-to-b from-grape-50 to-blossom-50/70">
        <div className="transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
          <SmoothieCup palette={item.palette} emoji={item.emoji} size={128} />
        </div>
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <h3 className="font-display text-base font-semibold text-grape-700">
          {item.name}
        </h3>
        <p className="mt-0.5 line-clamp-1 text-xs text-grape-400">{item.tagline}</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="leading-none">
            <span className="mr-1 text-[11px] font-medium text-grape-400">เริ่มต้น</span>
            <span className="font-display text-xl font-bold text-blossom-500">
              ฿{item.price}
            </span>
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-grape-400">
            <Heart size={13} fill="#f89bc4" className="text-blossom-300" />
            {item.likes}
          </span>
        </div>

        <button
          onClick={handleAdd}
          className={`mt-3 inline-flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition-all ${
            added
              ? "bg-grape-500 text-white"
              : "bg-grape-100 text-grape-700 hover:bg-grape-600 hover:text-white"
          }`}
        >
          <Plus size={16} />
          {added ? "เพิ่มแล้ว!" : buttonLabel}
        </button>
      </div>
    </article>
  );
}
