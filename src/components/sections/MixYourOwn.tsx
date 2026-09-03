"use client";

import { useMemo, useState } from "react";
import { Check, Plus, Sparkles } from "lucide-react";
import {
  MIX_BASES,
  MIX_FRUITS,
  MIX_TOPPINGS,
  type MixOption,
} from "@/data/site";
import { useCart } from "@/components/cart/CartContext";
import SmoothieCup from "@/components/SmoothieCup";

const BASE_PRICE = 45;
const FRUIT_PRICE = 10;
const TOPPING_PRICE = 8;

function OptionChip({
  option,
  active,
  onClick,
}: {
  option: MixOption;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-sm font-medium transition-all ${
        active
          ? "border-grape-500 bg-grape-600 text-white shadow-soft"
          : "border-grape-100 bg-white/80 text-grape-600 hover:border-grape-300 hover:bg-grape-50"
      }`}
    >
      <span className="text-lg">{option.emoji}</span>
      {option.label}
      {active && <Check size={15} className="ml-0.5" />}
    </button>
  );
}

type MixYourOwnProps = {
  initialBaseId?: string;
  initialFruitId?: string;
};

export default function MixYourOwn({
  initialBaseId,
  initialFruitId,
}: MixYourOwnProps) {
  const { addItem } = useCart();
  const [baseId, setBaseId] = useState(
    MIX_BASES.some((b) => b.id === initialBaseId)
      ? initialBaseId!
      : MIX_BASES[0].id,
  );
  const [fruitId, setFruitId] = useState(
    MIX_FRUITS.some((f) => f.id === initialFruitId)
      ? initialFruitId!
      : MIX_FRUITS[0].id,
  );
  const [toppingIds, setToppingIds] = useState<string[]>(["boba"]);
  const [added, setAdded] = useState(false);

  const base = MIX_BASES.find((b) => b.id === baseId)!;
  const fruit = MIX_FRUITS.find((f) => f.id === fruitId)!;

  const toggleTopping = (id: string) =>
    setToppingIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );

  const price = useMemo(
    () => BASE_PRICE + FRUIT_PRICE + toppingIds.length * TOPPING_PRICE,
    [toppingIds],
  );

  const name = `${fruit.label}${base.label}ปั่น (มิกซ์เอง)`;

  const handleAdd = () => {
    addItem({ id: `mix-${baseId}-${fruitId}-${toppingIds.join("-")}`, name, price });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <section id="mix" className="relative py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-grape-600 via-grape-500 to-blossom-500 p-6 shadow-card sm:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            {/* ตัวเลือก */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white">
                <Sparkles size={15} /> มิกซ์กับฟ่าง
              </span>
              <h2 className="font-display mt-4 text-3xl font-bold text-white sm:text-4xl">
                ปั่นเองได้ดั่งใจ 💜
              </h2>
              <p className="mt-2 max-w-md text-white/80">
                เลือกฐาน ผลไม้ และท็อปปิ้งที่ชอบ แล้วให้น้องฟ่างปั่นสดให้เลย!
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="mb-2 text-sm font-semibold text-white/90">
                    1. เลือกฐานเครื่องดื่ม
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {MIX_BASES.map((o) => (
                      <OptionChip
                        key={o.id}
                        option={o}
                        active={o.id === baseId}
                        onClick={() => setBaseId(o.id)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold text-white/90">
                    2. เลือกผลไม้
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {MIX_FRUITS.map((o) => (
                      <OptionChip
                        key={o.id}
                        option={o}
                        active={o.id === fruitId}
                        onClick={() => setFruitId(o.id)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold text-white/90">
                    3. ท็อปปิ้ง (เลือกได้หลายอย่าง)
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {MIX_TOPPINGS.map((o) => (
                      <OptionChip
                        key={o.id}
                        option={o}
                        active={toppingIds.includes(o.id)}
                        onClick={() => toggleTopping(o.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* พรีวิวแก้ว */}
            <div className="rounded-3xl bg-white/90 p-6 text-center shadow-soft">
              <div className="grid place-items-center">
                <div className="transition-transform duration-500">
                  <SmoothieCup
                    palette={base.palette!}
                    emoji={fruit.emoji}
                    size={150}
                  />
                </div>
              </div>
              <h3 className="font-display mt-2 text-lg font-semibold text-grape-700">
                {fruit.label}
                {base.label}ปั่น
              </h3>
              <p className="mt-0.5 text-xs text-grape-400">
                {toppingIds.length
                  ? `ท็อปปิ้ง: ${toppingIds
                      .map((id) => MIX_TOPPINGS.find((t) => t.id === id)?.label)
                      .join(", ")}`
                  : "ไม่ใส่ท็อปปิ้ง"}
              </p>

              <div className="mt-4 flex items-center justify-center gap-1">
                <span className="text-sm text-grape-400">ราคา</span>
                <span className="font-display text-3xl font-bold text-blossom-500">
                  ฿{price}
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
        </div>
      </div>
    </section>
  );
}
