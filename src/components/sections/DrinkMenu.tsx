"use client";

import { useMemo } from "react";
import { DRINK_CATEGORIES, MENU_ITEMS } from "@/data/site";
import { useCategory } from "@/components/category/CategoryContext";
import DrinkCard from "@/components/DrinkCard";

export default function DrinkMenu() {
  const { active, setActive } = useCategory();

  const items = useMemo(
    () => MENU_ITEMS.filter((m) => m.category === active),
    [active],
  );
  const activeCat = DRINK_CATEGORIES.find((c) => c.id === active)!;

  return (
    <section id="menu" className="scroll-mt-24 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <h2 className="font-display text-3xl font-bold text-grape-700 sm:text-4xl">
            เมนูเครื่องดื่ม <span className="text-blossom-400">🥤</span>
          </h2>
          <p className="mt-2 text-grape-500">
            เลือกหมวดที่ชอบ ปั่นสดใหม่ให้ทุกแก้ว
          </p>
        </div>

        {/* แท็บหมวดหมู่ */}
        <div className="no-scrollbar mb-8 flex snap-x gap-2.5 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center">
          {DRINK_CATEGORIES.map((cat) => {
            const on = cat.id === active;
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`snap-start whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                  on
                    ? "bg-grape-deep text-white shadow-soft"
                    : "bg-cream-white text-ink ring-1 ring-ink/10 hover:bg-grape-50 hover:text-grape-deep"
                }`}
              >
                <span className="mr-1">{cat.emoji}</span>
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* คำอธิบายหมวดที่เลือก */}
        <p className="mb-6 text-center text-sm text-grape-400">
          {activeCat.emoji} {activeCat.label} — {activeCat.desc}
        </p>

        {/* การ์ดเครื่องดื่ม */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <DrinkCard key={item.id} item={item} buttonLabel="เพิ่มลงตะกร้า" />
          ))}
        </div>
      </div>
    </section>
  );
}
