"use client";

import { useState } from "react";
import { MENU_ITEMS } from "@/data/site";
import DrinkCard from "@/components/DrinkCard";

type Group = "all" | "milk" | "thai" | "fruit" | "clear" | "other";

const FILTERS: { id: Group; label: string; labelEn: string; emoji: string }[] = [
  { id: "all", label: "ทั้งหมด", labelEn: "All", emoji: "" },
  { id: "milk", label: "ชานม", labelEn: "Milk Tea", emoji: "🧋" },
  { id: "thai", label: "ชาไทย", labelEn: "Thai Tea", emoji: "🍵" },
  { id: "fruit", label: "ชาผลไม้", labelEn: "Fruit Tea", emoji: "🍓" },
  { id: "clear", label: "ชาใส", labelEn: "Clear Tea", emoji: "🌿" },
  { id: "other", label: "ชาอื่น ๆ", labelEn: "Other Tea", emoji: "🍋" },
];

/* จัดกลุ่มย่อยของเมนูชา (ตาม id) */
const TEA_GROUP: Record<string, Exclude<Group, "all">> = {
  // ชานม
  "thai-milk-tea": "milk",
  "matcha-milk": "milk",
  "green-tea-milk": "milk",
  // ชาไทย
  "thai-tea": "thai",
  // ชาใส (ไม่มีนม เน้นรสชา)
  "green-tea": "clear",
  "iced-black-tea": "clear",
  "oolong-tea": "clear",
  "jasmine-tea": "clear",
  "jasmine-green-tea": "clear",
  "honey-tea": "clear",
  // ชาผลไม้
  "peach-tea": "fruit",
  "apple-tea": "fruit",
  "lemon-tea-plain": "fruit",
  // ชาอื่น ๆ
  "green-lemon-tea": "other",
  "honey-lemon-tea": "other",
};

export default function TeaMenuView() {
  const [group, setGroup] = useState<Group>("all");

  const teas = MENU_ITEMS.filter((m) => m.category === "tea");
  const shown =
    group === "all" ? teas : teas.filter((m) => TEA_GROUP[m.id] === group);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          🍵 เมนูชา
        </h1>
        <p className="mt-2 text-ink/60">
          ชาหอม ๆ หลากสไตล์ เลือกหมวดที่ชอบได้เลย
        </p>
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

      {/* การ์ดเมนู (transition ตอนเปลี่ยนหมวด ผ่าน key) */}
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
        <p className="py-10 text-center text-ink/50">
          ยังไม่มีเมนูในหมวดนี้ 🍵
        </p>
      )}
    </section>
  );
}
