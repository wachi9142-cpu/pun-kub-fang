"use client";

import { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { TOPPING_GROUPS, type SmoothiePalette } from "@/data/site";
import { useCart } from "@/components/cart/CartContext";
import ToppingSelector from "@/components/ToppingSelector";
import Portal from "@/components/Portal";
import MagicalDrinkAnimation, {
  type MagicalDrinkInput,
} from "@/components/MagicalDrinkAnimation";

/** เมนูที่ปรับแต่งได้ — ใช้แค่ฟิลด์ที่จำเป็น เพื่อให้เมนูปกติ + น้ำสมุนไพรใช้ร่วมกันได้ */
export type CustomizableItem = {
  id: string;
  name: string;
  nameEn?: string;
  price: number;
  /** สีแก้วสำหรับแอนิเมชันเสก (ถ้าไม่มีใช้โทนม่วงของแบรนด์) */
  palette?: SmoothiePalette;
  emoji?: string;
};

/* สีเริ่มต้นเมื่อเมนูไม่ได้กำหนด palette (เช่น น้ำสมุนไพร) */
const DEFAULT_PALETTE: SmoothiePalette = {
  foam: "#f3e9ff",
  top: "#c9b3e8",
  bottom: "#7b4ab8",
};

const SWEET = [
  { id: "less", label: "หวานน้อย" },
  { id: "50", label: "หวานกลาง 50%" },
  { id: "regular", label: "หวานปกติ" },
];
const METHOD = [
  { id: "noblend", label: "🧊 ไม่ปั่น" },
  { id: "blend", label: "🌀 ปั่น" },
];
const ICE = [
  { id: "cup", label: "🥤 ใส่แก้ว" },
  { id: "separate", label: "🧊 แยกน้ำแข็ง" },
];

function Pill({
  label,
  active,
  disabled,
  onClick,
}: {
  label: string;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:active:scale-100 ${
        active
          ? "scale-105 border-grape-500 bg-grape-deep text-white shadow-soft"
          : "border-ink/10 bg-white text-ink hover:border-grape-300 hover:bg-grape-50"
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

export default function DrinkCustomizer({
  item,
  onClose,
}: {
  item: CustomizableItem;
  onClose: () => void;
}) {
  const { addItem, openCart } = useCart();
  const [sweet, setSweet] = useState("regular");
  const [method, setMethod] = useState("noblend");
  const [ice, setIce] = useState("cup");
  const [toppings, setToppings] = useState<string[]>([]);
  /* 🪄 แอนิเมชันเหมียวปรุง — เล่นครั้งเดียวตอนยืนยันเมนู "ไม่ปั่น" */
  const [brewing, setBrewing] = useState<MagicalDrinkInput | null>(null);

  const toggleTopping = (nameEn: string) =>
    setToppings((p) =>
      p.includes(nameEn) ? p.filter((x) => x !== nameEn) : [...p, nameEn],
    );

  const isBlend = method === "blend";

  const allToppings = TOPPING_GROUPS.flatMap((g) => g.items);
  const picked = allToppings.filter((i) => toppings.includes(i.nameEn));
  const total = item.price + picked.reduce((s, i) => s + i.price, 0);

  const handleAdd = () => {
    const options: string[] = [
      SWEET.find((s) => s.id === sweet)!.label,
      METHOD.find((m) => m.id === method)!.label,
    ];
    if (!isBlend) options.push(ICE.find((i) => i.id === ice)!.label);
    if (picked.length)
      options.push(`ท็อปปิ้ง: ${picked.map((i) => i.nameTh).join(", ")}`);
    addItem({
      id: `${item.id}-${Date.now()}`,
      name: item.name,
      price: total,
      options,
    });

    if (!isBlend) {
      // ไม่ปั่น → ให้สองเหมียวเสกแก้วก่อน แล้วค่อยเปิดตะกร้า
      setBrewing({
        name: item.name,
        nameEn: item.nameEn,
        emoji: item.emoji,
        palette: item.palette ?? DEFAULT_PALETTE,
        sweetLabel: SWEET.find((s) => s.id === sweet)!.label,
        ice: ice === "separate" ? "separate" : "cup",
        toppings: picked.map((i) => i.nameTh),
      });
      return;
    }
    onClose();
    openCart();
  };

  const finishBrewing = () => {
    setBrewing(null);
    onClose();
    openCart();
  };

  if (brewing) {
    return <MagicalDrinkAnimation input={brewing} onDone={finishBrewing} />;
  }

  return (
    <Portal onEscape={onClose}>
      <div
        className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
        onClick={onClose}
      >
        <div
          className="animate-pop-in flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-card sm:rounded-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* หัว */}
          <div className="flex items-start justify-between gap-3 border-b border-ink/5 p-5">
            <div className="leading-tight">
              <h3 className="font-display text-lg font-bold text-ink">
                {item.name}
              </h3>
              {item.nameEn && (
                <p className="text-xs text-ink/45">{item.nameEn}</p>
              )}
              <p className="mt-0.5 text-sm font-semibold text-blossom-500">
                เริ่มต้น {item.price}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="ปิด"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-grape-50 text-ink/60 hover:bg-grape-100"
            >
              <X size={18} />
            </button>
          </div>

          {/* เนื้อหา (เลื่อนได้) */}
          <div className="flex-1 space-y-5 overflow-y-auto p-5">
            {/* ความหวาน */}
            <div>
              <p className="mb-2 text-sm font-semibold text-ink">
                🍯 ระดับความหวาน
              </p>
              <div className="flex flex-wrap gap-2">
                {SWEET.map((s) => (
                  <Pill
                    key={s.id}
                    label={s.label}
                    active={sweet === s.id}
                    onClick={() => setSweet(s.id)}
                  />
                ))}
              </div>
            </div>

            {/* วิธีทำ */}
            <div>
              <p className="mb-2 text-sm font-semibold text-ink">
                🌀 เลือกวิธีทำ
              </p>
              <div className="flex flex-wrap gap-2">
                {METHOD.map((m) => (
                  <Pill
                    key={m.id}
                    label={m.label}
                    active={method === m.id}
                    onClick={() => setMethod(m.id)}
                  />
                ))}
              </div>
            </div>

            {/* ตัวเลือกน้ำแข็ง — เลือกได้เฉพาะ "ไม่ปั่น" (ปั่นแล้วน้ำแข็งรวมอยู่ในแก้ว แยกไม่ได้) */}
            <div className={isBlend ? "opacity-50" : ""}>
              <p className="mb-2 text-sm font-semibold text-ink">
                🧊 ตัวเลือกน้ำแข็ง
                {isBlend && (
                  <span className="ml-1 font-medium text-ink/45">
                    (เมนูปั่นไม่แยกน้ำแข็ง)
                  </span>
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                {ICE.map((i) => (
                  <Pill
                    key={i.id}
                    label={i.label}
                    active={!isBlend && ice === i.id}
                    disabled={isBlend}
                    onClick={() => setIce(i.id)}
                  />
                ))}
              </div>
            </div>

            {/* ท็อปปิ้ง */}
            <div>
              <p className="mb-2 text-sm font-semibold text-ink">
                🧋 เลือกท็อปปิ้ง{" "}
                <span className="font-medium text-ink/45">
                  (เลือกได้หลายอย่าง · แตะรูปเพื่อดูรายละเอียด)
                </span>
              </p>
              <ToppingSelector selected={toppings} onToggle={toggleTopping} />
            </div>
          </div>

          {/* ท้าย: ราคารวม + เพิ่มลงตะกร้า */}
          <div className="border-t border-ink/5 p-5">
            {picked.length > 0 && (
              <div className="mb-2 max-h-24 space-y-0.5 overflow-y-auto text-xs">
                <div className="flex justify-between text-ink/60">
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                </div>
                {picked.map((i) => (
                  <div
                    key={i.nameEn}
                    className="flex justify-between text-ink/60"
                  >
                    <span>+ {i.nameTh}</span>
                    <span className="text-blossom-500">+{i.price}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-ink/60">ราคารวม</span>
              <span className="font-display text-2xl font-bold text-blossom-500">
                {total}
              </span>
            </div>
            <button
              onClick={handleAdd}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-grape-600 to-blossom-500 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
            >
              <Plus size={17} /> เพิ่มลงตะกร้า 🛒
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
