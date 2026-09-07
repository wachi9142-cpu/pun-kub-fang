"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import {
  WHIP_TOPPING_GROUPS,
  WHIP_FRUITS,
  WHIP_NOTE,
  WHIP_BASE_PRICE,
  WHIP_FRUIT_PRICE,
} from "@/data/site";
import { useCart } from "@/components/cart/CartContext";
import SmoothieCup from "@/components/SmoothieCup";
import ToppingSelector from "@/components/ToppingSelector";

const CREAM = { foam: "#fffdf8", top: "#ffe0ee", bottom: "#f9b6d4" };

function ToppingChip({
  label,
  price,
  active,
  onClick,
}: {
  label: string;
  price: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200 active:scale-95 ${
        active
          ? "scale-105 border-grape-500 bg-grape-deep text-white shadow-soft"
          : "border-ink/10 bg-white text-ink hover:scale-105 hover:border-grape-300 hover:bg-grape-50"
      }`}
    >
      {active && (
        <span className="animate-pop-in grid h-5 w-5 place-items-center rounded-full bg-white shadow">
          <Check size={14} strokeWidth={3} className="text-[#22C55E]" />
        </span>
      )}
      {label}
      <span
        className={`rounded-full px-2 py-0.5 text-sm font-extrabold ${
          active
            ? "bg-white/25 text-white"
            : price === 0
              ? "bg-emerald-100 text-emerald-600"
              : "bg-blossom-100 text-ink"
        }`}
      >
        {price === 0 ? "ฟรี" : `+${price}`}
      </span>
    </button>
  );
}

export default function WhippedCream() {
  const { addItem, openCart } = useCart();
  const [toppings, setToppings] = useState<string[]>([]);
  const [fruits, setFruits] = useState<string[]>([]);
  const [added, setAdded] = useState(false);

  const toggle = (
    set: React.Dispatch<React.SetStateAction<string[]>>,
    v: string,
  ) => set((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));

  const allToppings = WHIP_TOPPING_GROUPS.flatMap((g) => g.items);
  const toppingLines = allToppings
    .filter((i) => toppings.includes(i.nameEn))
    .map((i) => ({ label: i.nameTh, price: i.price }));
  const fruitLines = WHIP_FRUITS.filter((f) => fruits.includes(f.nameEn)).map(
    (f) => ({ label: f.nameTh, price: WHIP_FRUIT_PRICE }),
  );
  const lines = [...toppingLines, ...fruitLines];
  const total = WHIP_BASE_PRICE + lines.reduce((s, l) => s + l.price, 0);

  const handleAdd = () => {
    addItem({
      id: `whip-${Date.now()}`,
      name: "วิปครีมแก้ว",
      price: total,
      options: lines.map((l) => `${l.label} (+${l.price})`),
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
    openCart();
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          🍦 วิปครีมแก้ว{" "}
          <span className="text-blossom-400">| Whipped Cream Cups</span>
        </h1>
        <p className="mt-2 text-ink/60">
          วิปครีมนุ่ม ๆ เริ่มต้น {WHIP_BASE_PRICE} · เลือกท็อปปิ้งเพิ่มได้ตามใจ 💜
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* ตัวเลือก */}
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-semibold text-ink">
              🧋 เลือกท็อปปิ้ง{" "}
              <span className="font-medium text-ink/40">(แตะรูปเพื่อดูรายละเอียด)</span>
            </p>
            <ToppingSelector
              groups={WHIP_TOPPING_GROUPS}
              selected={toppings}
              onToggle={(nameEn) => toggle(setToppings, nameEn)}
            />
          </div>

          {/* ผลไม้สด */}
          <div>
            <p className="mb-1 text-sm font-semibold text-ink">
              🍓 ผลไม้สด <span className="font-medium text-ink/40">Fresh Fruits</span>
            </p>
            <p className="mb-2 text-[11px] text-ink/50">
              🍓 ผลไม้สดมีให้เลือกแตกต่างกันในแต่ละวัน
            </p>
            <div className="flex flex-wrap gap-2">
              {WHIP_FRUITS.map((f) => {
                if (f.soldOut) {
                  return (
                    <span
                      key={f.nameEn}
                      className="flex cursor-not-allowed items-center gap-1.5 rounded-full border border-ink/10 bg-ink/5 px-3.5 py-2 text-sm font-medium text-ink/40 line-through"
                      title="หมดวันนี้"
                    >
                      {f.nameTh}
                      <span className="rounded-full bg-ink/10 px-1.5 py-0.5 text-[10px] font-bold text-ink/50 no-underline">
                        หมดวันนี้
                      </span>
                    </span>
                  );
                }
                return (
                  <ToppingChip
                    key={f.nameEn}
                    label={f.nameTh}
                    price={WHIP_FRUIT_PRICE}
                    active={fruits.includes(f.nameEn)}
                    onClick={() => toggle(setFruits, f.nameEn)}
                  />
                );
              })}
            </div>
            <p className="mt-2 text-[11px] text-ink/45">
              * รายการที่ขึ้น “หมดวันนี้ | Sold Out” จะเลือกไม่ได้
            </p>
          </div>
        </div>

        {/* สรุปราคา real-time */}
        <div className="rounded-3xl bg-white/95 p-6 shadow-soft ring-1 ring-ink/5 lg:sticky lg:top-24 lg:self-start">
          <div className="grid place-items-center">
            <SmoothieCup palette={CREAM} emoji="🍦" size={120} />
          </div>
          <h3 className="font-display mt-1 text-center text-lg font-semibold text-grape-700">
            สรุปรายการที่เลือก
          </h3>

          <div className="mt-3 space-y-1.5 border-t border-ink/5 pt-3 text-sm">
            <div className="flex justify-between gap-3">
              <span className="text-ink/70">วิปครีมแก้ว</span>
              <span className="font-medium text-ink">{WHIP_BASE_PRICE}</span>
            </div>
            {lines.map((l, i) => (
              <div key={i} className="flex justify-between gap-3">
                <span className="text-ink/70">{l.label}</span>
                <span
                  className={`font-medium ${
                    l.price === 0 ? "text-emerald-600" : "text-blossom-500"
                  }`}
                >
                  {l.price === 0 ? "ฟรี" : `+${l.price}`}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-dashed border-ink/15 pt-3">
            <span className="text-sm font-semibold text-grape-500">ราคารวม</span>
            <span className="font-display text-3xl font-bold text-blossom-500">
              {total}
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white transition-all ${
              added
                ? "bg-grape-500"
                : "bg-gradient-to-r from-grape-600 to-blossom-500 hover:scale-[1.02]"
            }`}
          >
            {added ? (
              <>
                <Check size={17} /> เพิ่มลงตะกร้าแล้ว!
              </>
            ) : (
              <>
                <Plus size={17} /> เพิ่มลงตะกร้า
              </>
            )}
          </button>
        </div>
      </div>

      {/* หมายเหตุผลไม้ตามฤดู */}
      <div className="mx-auto mt-8 max-w-3xl rounded-2xl bg-amber-50 p-4 text-center ring-1 ring-amber-200/70">
        <p className="text-sm leading-relaxed text-amber-900/85">{WHIP_NOTE.th}</p>
        <p className="mt-1 text-xs italic text-amber-900/55">{WHIP_NOTE.en}</p>
      </div>
    </section>
  );
}
