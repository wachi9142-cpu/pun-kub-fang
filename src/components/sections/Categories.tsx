"use client";

import { DRINK_CATEGORIES } from "@/data/site";
import { useCategory } from "@/components/category/CategoryContext";
import SmoothieCup from "@/components/SmoothieCup";

export default function Categories() {
  const { goToCategory } = useCategory();

  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-8 text-center">
        <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          วันนี้ดื่มอะไรดี? <span className="text-blossom-400">🤔</span>
        </h2>
        <p className="mt-2 text-ink/60">
          เลือกหมวดที่ชอบ แล้วไปเจอเครื่องดื่มที่ใช่ของคุณ
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {DRINK_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => goToCategory(cat.id)}
            className="hover-lift group flex flex-col items-center gap-2 overflow-hidden rounded-3xl bg-cream-white p-4 text-center shadow-card ring-1 ring-ink/5"
          >
            <div className="grid h-28 place-items-center transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
              <SmoothieCup palette={cat.palette} emoji={cat.emoji} size={92} />
            </div>
            <span className="font-display text-sm font-semibold text-ink sm:text-base">
              {cat.label}
            </span>
            <span className="text-[11px] leading-tight text-ink/55">
              {cat.desc}
            </span>
            <span className="mt-1 rounded-full bg-grape-50 px-3 py-1 text-[11px] font-semibold text-grape-deep transition-colors group-hover:bg-grape-deep group-hover:text-white">
              ดูเมนู →
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
