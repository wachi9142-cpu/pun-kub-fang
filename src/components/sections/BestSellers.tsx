"use client";

import { ChevronRight } from "lucide-react";
import { MENU_ITEMS } from "@/data/site";
import DrinkCard from "@/components/DrinkCard";

// คัดเมนูขายดีข้ามหมวด (เรียงตามลำดับที่อยากโชว์)
const BEST_SELLER_IDS = [
  "strawberry-milk",
  "bear-pink",
  "matcha-milk",
  "strawberry-soda",
  "thai-milk-tea",
  "mango-milk",
];

const BEST_SELLERS = BEST_SELLER_IDS.map(
  (id) => MENU_ITEMS.find((m) => m.id === id)!,
).filter(Boolean);

export default function BestSellers() {
  const goToMenu = () =>
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-bold text-grape-700 sm:text-4xl">
            🔥 เมนูขายดี
          </h2>
          <p className="mt-2 text-grape-500">
            แก้วที่ลูกค้าสั่งซ้ำบ่อยที่สุด รับรองไม่ผิดหวัง
          </p>
        </div>
        <button
          onClick={goToMenu}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-5 py-2.5 text-sm font-semibold text-grape-600 shadow-soft transition-colors hover:bg-grape-600 hover:text-white"
        >
          ดูเมนูทั้งหมด
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-6">
        {BEST_SELLERS.map((item) => (
          <DrinkCard key={item.id} item={item} buttonLabel="เลือกเมนู" />
        ))}
      </div>
    </section>
  );
}
