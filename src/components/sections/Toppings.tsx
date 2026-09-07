"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { TOPPING_GROUPS, TOPPING_IMAGES, type ToppingItem } from "@/data/site";

function ToppingCard({
  item,
  placeholder,
  selected,
  onClick,
}: {
  item: ToppingItem;
  placeholder: string;
  selected: boolean;
  onClick: () => void;
}) {
  const image = item.image ?? TOPPING_IMAGES[item.nameEn];
  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col overflow-hidden rounded-2xl p-2.5 text-center shadow-soft transition-all duration-200 active:scale-95 ${
        selected
          ? "scale-[1.03] bg-grape-50 ring-2 ring-grape-deep"
          : "bg-white ring-1 ring-ink/10 hover:ring-grape-300"
      }`}
    >
      {/* เครื่องหมายเลือกแล้ว — ✓ เขียวในวงกลม เด้งเข้า */}
      {selected && (
        <span className="animate-pop-in absolute right-2 top-2 z-10 grid h-7 w-7 place-items-center rounded-full bg-[#22C55E] text-white shadow-md ring-2 ring-white">
          <Check size={18} strokeWidth={3} />
        </span>
      )}

      {/* พื้นที่รูป (ขนาดเท่ากันทุกใบ) */}
      <div className="grid aspect-square w-full place-items-center overflow-hidden rounded-xl bg-gradient-to-b from-grape-50 to-blossom-50/60">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={item.nameTh}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="flex flex-col items-center gap-1 text-3xl opacity-70">
            {placeholder}
            <span className="text-[9px] font-medium text-ink/35">รูปเร็ว ๆ นี้</span>
          </span>
        )}
      </div>

      <span className="mt-2 line-clamp-1 text-xs font-semibold text-ink">
        {item.nameTh}
      </span>
      <span className="line-clamp-1 text-[10px] text-ink/45">{item.nameEn}</span>
      <span className="mt-1 inline-block rounded-full bg-blossom-50 px-2 py-0.5 text-[11px] font-bold text-blossom-500">
        +{item.price}
      </span>
    </button>
  );
}

export default function Toppings() {
  const [picked, setPicked] = useState<string[]>([]);
  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <section id="toppings" className="scroll-mt-24 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            🧋 ท็อปปิ้ง <span className="text-blossom-400">| Toppings</span>
          </h2>
          <p className="mt-2 text-ink/60">
            เพิ่มความอร่อยให้แก้วโปรด แตะเลือกท็อปปิ้งที่ชอบได้เลย
          </p>
          <p className="mt-1 text-xs text-ink/45">*ราคาเพิ่มต่อ 1 ท็อปปิ้ง</p>
        </div>

        <div className="space-y-8">
          {TOPPING_GROUPS.map((group) => (
            <div key={group.id}>
              <div className="mb-3 flex items-center gap-2.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-grape-50 text-lg">
                  {group.emoji}
                </span>
                <div className="leading-tight">
                  <h3 className="font-display text-base font-bold text-ink">
                    {group.titleTh}
                  </h3>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-ink/45">
                    {group.titleEn}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                {group.items.map((item) => (
                  <ToppingCard
                    key={item.nameEn}
                    item={item}
                    placeholder={group.emoji}
                    selected={picked.includes(item.nameEn)}
                    onClick={() => toggle(item.nameEn)}
                  />
                ))}
              </div>

              {group.note && (
                <div className="mt-3 rounded-2xl bg-amber-50 p-3 text-[11px] leading-relaxed text-amber-900/80 ring-1 ring-amber-200/70">
                  <span className="font-semibold text-amber-900">
                    📌 หมายเหตุ | Note:{" "}
                  </span>
                  {group.note}
                  {group.noteEn && (
                    <span className="mt-1 block italic text-amber-900/60">
                      {group.noteEn}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
