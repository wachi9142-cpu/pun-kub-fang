"use client";

import { DRINK_CATEGORIES } from "@/data/site";
import { useCategory } from "@/components/category/CategoryContext";
import SmoothieCup from "@/components/SmoothieCup";

export default function Categories() {
  const { goToCategory } = useCategory();

  const regular = DRINK_CATEGORIES.filter((c) => c.id !== "seasonal");
  const seasonal = DRINK_CATEGORIES.find((c) => c.id === "seasonal");

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

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {regular.map((cat) => (
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

      {/* 🍉 หมวดเด่น — ผลไม้ปั่นตามฤดูกาล */}
      {seasonal && (
        <button
          onClick={() => goToCategory(seasonal.id)}
          className="hover-lift group relative mt-4 flex w-full items-center gap-4 overflow-hidden rounded-3xl bg-gradient-to-r from-rose-50 via-cream-white to-lime-50 p-5 text-left shadow-card ring-2 ring-blossom-400/40 sm:mt-5 sm:gap-6 sm:p-6"
        >
          <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-blossom-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 bottom-0 h-36 w-36 rounded-full bg-lime-200/40 blur-3xl" />

          <div className="relative grid shrink-0 place-items-center transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
            <SmoothieCup palette={seasonal.palette} emoji={seasonal.emoji} size={112} />
          </div>

          <div className="relative flex-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blossom-500 px-3 py-1 text-[11px] font-bold tracking-wide text-white shadow-soft">
              SEASONAL ✨
              <span className="font-medium">มีเฉพาะช่วงนี้</span>
            </span>
            <h3 className="font-display mt-2 text-xl font-bold text-ink sm:text-2xl">
              {seasonal.emoji} {seasonal.label}
            </h3>
            <p className="mt-1 max-w-md text-sm text-ink/60">
              ผลไม้ตามฤดูหมุนเวียน สดใหม่เฉพาะช่วง — เช่น แตงโม ลิ้นจี่ มะม่วง สตรอว์เบอร์รี
            </p>
            <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-grape-deep px-4 py-1.5 text-xs font-semibold text-white transition-transform group-hover:translate-x-1">
              ดูเมนูตามฤดู →
            </span>
          </div>
        </button>
      )}
    </section>
  );
}
