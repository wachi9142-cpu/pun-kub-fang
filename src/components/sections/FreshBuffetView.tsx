"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import {
  FRESH_BUFFET,
  FRESH_FRUITS,
  FRESH_VEGGIES,
  FRESH_FLAVORS,
  type FreshItem,
} from "@/data/site";
import { useCart } from "@/components/cart/CartContext";
import FreshBlender, { type BlendPhase } from "@/components/sections/FreshBlender";

const SWEET = [
  { id: "less", label: "หวานน้อย" },
  { id: "50", label: "หวาน 50%" },
  { id: "regular", label: "หวานปกติ" },
];

/* ชิปเลือกวัตถุดิบ — พื้นขาว/เลือก=ขาวทึบ + ✓ เขียว (บนพื้นม่วง) */
function PickChip({
  item,
  active,
  onClick,
}: {
  item: FreshItem;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-1.5 rounded-2xl border px-3 py-2 text-sm font-medium transition-all active:scale-95 ${
        active
          ? "border-white bg-white text-grape-700 shadow-soft"
          : "border-white/40 bg-white/10 text-white hover:bg-white/20"
      }`}
    >
      {active && (
        <span className="animate-pop-in grid h-5 w-5 place-items-center rounded-full bg-white shadow">
          <Check size={14} strokeWidth={3} className="text-[#22C55E]" />
        </span>
      )}
      {/* ช่องรูปวัตถุดิบ (คงที่ 24×24) — ใส่ item.image เมื่อไหร่ก็ขึ้นแทน emoji */}
      <span className="grid h-6 w-6 shrink-0 place-items-center overflow-hidden">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt={item.label}
            className="h-full w-full object-contain"
          />
        ) : (
          <span className="text-base leading-none">{item.emoji}</span>
        )}
      </span>
      <span className="flex min-w-0 flex-col text-left leading-tight">
        <span className="truncate">{item.label}</span>
        {item.en && (
          <span className="truncate text-[10px] font-normal opacity-60">
            {item.en}
          </span>
        )}
      </span>
    </button>
  );
}

function PrefPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95 ${
        active
          ? "scale-105 border-white bg-white text-grape-700 shadow-soft"
          : "border-white/40 bg-white/10 text-white hover:scale-105 hover:bg-white/20"
      }`}
    >
      {active && (
        <span className="animate-pop-in grid h-5 w-5 place-items-center rounded-full bg-white shadow">
          <Check size={14} strokeWidth={3} className="text-[#22C55E]" />
        </span>
      )}
      {label}
    </button>
  );
}

export default function FreshBuffetView() {
  const { addItem, openCart } = useCart();
  const [fruits, setFruits] = useState<string[]>([]);
  const [veggies, setVeggies] = useState<string[]>([]);
  const [flavors, setFlavors] = useState<string[]>([]);
  const [sweet, setSweet] = useState("regular");
  const [phase, setPhase] = useState<BlendPhase>("idle");

  const toggle = (
    set: React.Dispatch<React.SetStateAction<string[]>>,
    id: string,
  ) => set((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const pickedItems: FreshItem[] = [
    ...FRESH_FRUITS.filter((f) => fruits.includes(f.id)),
    ...FRESH_VEGGIES.filter((v) => veggies.includes(v.id)),
    ...FRESH_FLAVORS.filter((f) => flavors.includes(f.id)),
  ];
  const totalPicked = pickedItems.length;
  const pickedSummary = pickedItems
    .map((it) => `${it.emoji} ${it.label}`)
    .join(" + ");
  const methodLabel = "🌀 ปั่น";
  const sweetLabel = SWEET.find((s) => s.id === sweet)!.label;

  const handleAdd = () => {
    if (phase !== "idle" || totalPicked === 0) return;
    // ▶️ เล่นแอนิเมชันเครื่องปั่นก่อน แล้วค่อยเพิ่มลงตะกร้า
    setPhase("blending");
    window.setTimeout(() => setPhase("done"), 1900);
    window.setTimeout(() => {
      const options: string[] = [methodLabel, sweetLabel];
      if (pickedSummary) options.push(`เลือก: ${pickedSummary}`);
      addItem({
        id: `fresh-${Date.now()}`,
        name: "ตักสด ปั่นฟิน (บุฟเฟ่ต์ผัก/ผลไม้สด)",
        price: FRESH_BUFFET.price,
        options,
      });
      setPhase("idle");
      openCart();
    }, 3400);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <h1 className="font-display text-3xl font-bold text-grape-700 sm:text-4xl">
          🥝 ตักสด ปั่นฟิน 🍓
        </h1>
        <p className="mt-1 text-sm font-medium uppercase tracking-wide text-grape-400">
          Fresh Fruit &amp; Vegetable Smoothie Buffet
        </p>
        <p className="mt-2 text-grape-500">
          เลือกผักและผลไม้สดที่ชอบ แล้วร้านจะตักใส่แก้วและปั่นสดให้
          โดยปั่นรวมทั้งเนื้อและกาก 🥝🍓🥬
        </p>
        <p className="mt-1 text-sm text-grape-400">
          ลูกค้าเลือกจากรายการ → ร้านตักให้ → ปั่นสดแก้วต่อแก้ว · ราคาเดียว
          ไม่คิดเพิ่มตามชนิด
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* แผงเลือกวัตถุดิบ (โทนม่วงให้เข้าชุดกับมิกซ์) */}
        <div className="overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-grape-600 via-grape-500 to-blossom-500 p-6 shadow-card sm:p-8">
          <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1 text-xs font-semibold text-white">
            🥬 เลือกวัตถุดิบสด ร้านตักใส่แก้วแล้วปั่นให้
          </p>

          {/* ผลไม้สด */}
          <div className="mb-5">
            <p className="mb-2 text-sm font-semibold text-white/90">
              🍓 ผลไม้สด (เลือกได้หลายอย่าง)
            </p>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
              {FRESH_FRUITS.map((f) => (
                <PickChip
                  key={f.id}
                  item={f}
                  active={fruits.includes(f.id)}
                  onClick={() => toggle(setFruits, f.id)}
                />
              ))}
            </div>
          </div>

          {/* ผักสด */}
          <div className="mb-5">
            <p className="mb-2 text-sm font-semibold text-white/90">
              🥕 ผักสด (เลือกได้หลายอย่าง)
            </p>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
              {FRESH_VEGGIES.map((v) => (
                <PickChip
                  key={v.id}
                  item={v}
                  active={veggies.includes(v.id)}
                  onClick={() => toggle(setVeggies, v.id)}
                />
              ))}
            </div>
          </div>

          {/* เพิ่มรสชาติ */}
          <div className="mb-5">
            <p className="mb-2 text-sm font-semibold text-white/90">
              ✨ เพิ่มรสชาติ (เลือกได้หลายอย่าง)
            </p>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
              {FRESH_FLAVORS.map((f) => (
                <PickChip
                  key={f.id}
                  item={f}
                  active={flavors.includes(f.id)}
                  onClick={() => toggle(setFlavors, f.id)}
                />
              ))}
            </div>
          </div>

          {/* ความหวาน */}
          <div>
            <p className="mb-2 text-sm font-semibold text-white/90">
              🍯 ระดับความหวาน
            </p>
            <div className="flex flex-wrap gap-2">
              {SWEET.map((s) => (
                <PrefPill
                  key={s.id}
                  label={s.label}
                  active={sweet === s.id}
                  onClick={() => setSweet(s.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* สรุป + ราคา (real-time) */}
        <div className="rounded-3xl bg-white/95 p-6 shadow-soft ring-1 ring-ink/5 lg:sticky lg:top-24 lg:self-start">
          <FreshBlender items={pickedItems} phase={phase} />
          {phase === "done" ? (
            <p className="animate-pop-in mt-1 text-center text-sm font-bold text-grape-700">
              ✨ ปั่นเสร็จแล้ว! พร้อมเสิร์ฟแล้ว 💜
            </p>
          ) : (
            <h3 className="font-display mt-1 text-center text-lg font-semibold text-grape-700">
              {phase === "blending" ? "🌀 กำลังปั่น..." : "แก้วของคุณ"}
            </h3>
          )}

          <div className="mt-3 space-y-1.5 border-t border-ink/5 pt-3 text-sm">
            <div className="flex justify-between gap-3">
              <span className="text-ink/70">วัตถุดิบที่เลือก</span>
              <span className="font-semibold text-ink">{totalPicked} อย่าง</span>
            </div>
            {pickedSummary && (
              <p className="text-xs leading-relaxed text-ink/60">
                <span className="font-semibold text-ink/80">วันนี้เลือก: </span>
                {pickedSummary}
              </p>
            )}
            <div className="flex justify-between gap-3 pt-1">
              <span className="text-ink/70">วิธีทำ</span>
              <span className="font-medium text-ink">{methodLabel}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-ink/70">ความหวาน</span>
              <span className="font-medium text-ink">{sweetLabel}</span>
            </div>
          </div>

          <div className="mt-3 flex items-end justify-between border-t border-dashed border-ink/15 pt-3">
            <span className="text-sm font-semibold text-grape-500">ราคา</span>
            <span className="flex items-baseline gap-2">
              <span className="text-sm text-ink/40 line-through">
                {FRESH_BUFFET.oldPrice}
              </span>
              <span className="font-display text-3xl font-bold text-blossom-500">
                {FRESH_BUFFET.price}
              </span>
              <span className="text-sm font-semibold text-grape-500">บาท</span>
            </span>
          </div>
          <p className="mt-1 text-right text-[11px] font-semibold text-emerald-600">
            ราคาเดียว ไม่คิดเพิ่มตามชนิด 🎉
          </p>

          <button
            onClick={handleAdd}
            disabled={phase !== "idle" || totalPicked === 0}
            className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white transition-all ${
              phase !== "idle"
                ? "bg-grape-500"
                : totalPicked === 0
                  ? "cursor-not-allowed bg-ink/25"
                  : "bg-gradient-to-r from-grape-600 to-blossom-500 hover:scale-[1.02]"
            }`}
          >
            {phase === "blending" ? (
              <>🌀 กำลังปั่น...</>
            ) : phase === "done" ? (
              <>
                <Check size={17} /> ปั่นเสร็จแล้ว!
              </>
            ) : totalPicked === 0 ? (
              <>เลือกวัตถุดิบก่อนนะ 🥝</>
            ) : (
              <>
                <Plus size={17} /> เพิ่มลงตะกร้า — {FRESH_BUFFET.price} บาท
              </>
            )}
          </button>
        </div>
      </div>

      {/* หมายเหตุ */}
      <div className="mx-auto mt-8 max-w-3xl space-y-2.5 rounded-2xl bg-cream-white/70 p-4 text-center ring-1 ring-ink/10">
        <p className="text-xs leading-relaxed text-ink/70">
          🥝 <span className="font-semibold text-ink">วิธีสั่ง:</span>{" "}
          เลือกผัก/ผลไม้สดที่ต้องการบนเว็บ (ไม่ได้ตักเอง) แล้วร้านจะตักวัตถุดิบที่เลือกใส่แก้วและปั่นให้
        </p>
        <p className="text-xs leading-relaxed text-ink/70">
          🌱 <span className="font-semibold text-ink">หมายเหตุ:</span>{" "}
          ผักและผลไม้บางชนิดอาจมีไม่ครบทุกวัน ขึ้นอยู่กับฤดูกาล ความสด และสต็อกของร้าน
          รายการวัตถุดิบจึงอาจเปลี่ยนแปลงในแต่ละวัน 💜
        </p>
      </div>
    </section>
  );
}
