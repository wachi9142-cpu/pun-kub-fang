"use client";

import { useState } from "react";
import { MENU_ITEMS } from "@/data/site";
import DrinkCard from "@/components/DrinkCard";

type Group = "all" | "fruit" | "tea" | "milk" | "soda" | "yogurt";

const FILTERS: { id: Group; label: string; labelEn: string; emoji: string }[] = [
  { id: "all", label: "ทั้งหมด", labelEn: "All", emoji: "" },
  { id: "fruit", label: "ผลไม้สดปั่น", labelEn: "Fresh Fruit", emoji: "🍓" },
  { id: "tea", label: "ชาปั่น", labelEn: "Tea", emoji: "🍵" },
  { id: "milk", label: "นมปั่น", labelEn: "Milk", emoji: "🥛" },
  { id: "soda", label: "โซดาปั่น", labelEn: "Soda", emoji: "🫧" },
  { id: "yogurt", label: "โยเกิร์ตปั่น", labelEn: "Yogurt", emoji: "🍦" },
];

/* จัดกลุ่มย่อยของเมนูปั่น (ตาม id) */
const SMOOTHIE_GROUP: Record<string, Exclude<Group, "all">> = {
  "watermelon-smoothie": "fruit",
  "pineapple-smoothie": "fruit",
  "lychee-smoothie": "fruit",
  "avocado-smoothie": "fruit",
  "strawberry-milk": "milk",
  "mango-milk": "milk",
  "cantaloupe-milk": "milk",
  "grape-yogurt": "yogurt",
  "blueberry-yogurt": "yogurt",
  "greentea-smoothie": "tea",
  "thaitea-smoothie": "tea",
  "strawberry-soda-smoothie": "soda",
  "grape-soda-smoothie": "soda",
};

export default function SmoothieMenuView() {
  const [group, setGroup] = useState<Group>("all");

  const items = MENU_ITEMS.filter((m) => m.category === "smoothie");
  const shown =
    group === "all" ? items : items.filter((m) => SMOOTHIE_GROUP[m.id] === group);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          🍓 เมนูปั่น <span className="text-blossom-400">| Smoothies</span>
        </h1>
        <p className="mt-2 text-ink/60">ปั่นสดใหม่ทุกแก้ว เลือกหมวดที่ชอบได้เลย</p>
      </div>

      {/* ปุ่มฟิลเตอร์ */}
      <div className="no-scrollbar mb-8 flex snap-x gap-2.5 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center">
        {FILTERS.map((f) => {
          const on = f.id === group;
          return (
            <button
              key={f.id}
              onClick={() => setGroup(f.id)}
              className={`snap-start whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                on
                  ? "scale-105 bg-grape-deep text-white shadow-soft"
                  : "bg-cream-white text-ink ring-1 ring-ink/10 hover:scale-105 hover:bg-grape-50 hover:text-grape-deep"
              }`}
            >
              {f.emoji && <span className="mr-1">{f.emoji}</span>}
              {f.label}
              <span className="ml-1 hidden text-[10px] font-medium opacity-60 sm:inline">
                {f.labelEn}
              </span>
            </button>
          );
        })}
      </div>

      {shown.length > 0 ? (
        <div
          key={group}
          className="animate-reveal-in grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4"
        >
          {shown.map((item) => (
            <DrinkCard key={item.id} item={item} buttonLabel="เพิ่มลงตะกร้า" />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-ink/50">ยังไม่มีเมนูในหมวดนี้ 🍓</p>
      )}
    </section>
  );
}
