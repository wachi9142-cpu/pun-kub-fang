"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MENU_ITEMS, type MenuItem } from "@/data/site";
import DrinkCard from "@/components/DrinkCard";
import { IMAGE_NOTE } from "@/components/sections/IngredientNote";

// คัดเมนูขายดีข้ามหมวด (เรียงตามลำดับที่อยากโชว์)
const BEST_SELLER_IDS = [
  "strawberry-milk",
  "bear-pink",
  "matcha-milk",
  "strawberry-soda",
  "thai-milk-tea",
  "mango-milk",
];

export default function BestSellers({ items = MENU_ITEMS }: { items?: MenuItem[] }) {
  const featured = items.filter((item) => item.popular);
  const bestSellers = BEST_SELLER_IDS.map(
    (id) => items.find((m) => m.id === id)!,
  ).filter(Boolean);
  const shown = [...bestSellers, ...featured]
    .filter((item, index, all) => all.findIndex((x) => x.id === item.id) === index)
    .slice(0, 6);
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
        <Link
          href="/menu"
          className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-5 py-2.5 text-sm font-semibold text-grape-deep shadow-soft transition-colors hover:bg-grape-deep hover:text-white"
        >
          ดูเมนูทั้งหมด
          <ChevronRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-6">
        {shown.map((item) => (
          <DrinkCard key={item.id} item={item} buttonLabel="เลือกเมนู" />
        ))}
      </div>
      <p className="mt-4 text-center text-[11px] text-ink/45">💜 {IMAGE_NOTE}</p>
    </section>
  );
}
