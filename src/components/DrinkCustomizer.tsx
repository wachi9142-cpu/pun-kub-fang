"use client";

import { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import {
  TOPPING_GROUPS,
  SODA_MODES,
  SODA_SYRUPS,
  SODA_DIY_MAX,
  SODA_MYSTERY,
  type SmoothiePalette,
  type CategoryId,
  type SodaModeId,
} from "@/data/site";
import { useCart } from "@/components/cart/CartContext";
import ToppingSelector from "@/components/ToppingSelector";
import Portal from "@/components/Portal";
import MagicalDrinkAnimation, {
  type MagicalDrinkInput,
} from "@/components/MagicalDrinkAnimation";
import AddToCartFx, {
  type AddToCartFxProps,
  type AddToCartVariant,
} from "@/components/AddToCartFx";

/** เมนูที่ปรับแต่งได้ — ใช้แค่ฟิลด์ที่จำเป็น เพื่อให้เมนูปกติ + น้ำสมุนไพรใช้ร่วมกันได้ */
export type CustomizableItem = {
  id: string;
  name: string;
  nameEn?: string;
  price: number;
  /** สีแก้วสำหรับแอนิเมชันเสก (ถ้าไม่มีใช้โทนม่วงของแบรนด์) */
  palette?: SmoothiePalette;
  emoji?: string;
  /** หมวด — ใช้เลือกแอนิเมชัน และเปิดตัวเลือกพิเศษ (เช่น โซดา 3 รูปแบบ) */
  category?: CategoryId;
};

/* variant ของแอนิเมชัน "แก้ว → ตะกร้า" ตามหมวด */
const FX_BY_CATEGORY: Partial<Record<CategoryId, AddToCartVariant>> = {
  drinks: "coffee",
  hot: "coffee",
  milk: "milk",
  tea: "tea",
  smoothie: "smoothie",
  soda: "soda",
  sticky: "sticky",
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
  const { addItem, openCart, showToast } = useCart();
  const [sweet, setSweet] = useState("regular");
  /* เมนูที่ชื่อมีคำว่า "ปั่น" = ปั่นเสมอ → ไม่ต้องให้เลือกวิธีทำ/น้ำแข็ง */
  const alwaysBlend = item.name.includes("ปั่น");
  const [method, setMethod] = useState(alwaysBlend ? "blend" : "noblend");
  const [ice, setIce] = useState("cup");
  const [toppings, setToppings] = useState<string[]>([]);
  /* 🪄 แอนิเมชันเหมียวปรุง — เล่นครั้งเดียวตอนยืนยันเมนู "ไม่ปั่น" */
  const [brewing, setBrewing] = useState<MagicalDrinkInput | null>(null);
  /* ✨ แอนิเมชันแก้ว → ตะกร้า */
  const [fx, setFx] = useState<Omit<AddToCartFxProps, "onDone"> | null>(null);

  /* 🫧 อิตาเลียนโซดา 3 รูปแบบ (เฉพาะหมวดโซดา) */
  const isSoda = item.category === "soda";
  const [sodaMode, setSodaMode] = useState<SodaModeId>("regular");
  const [syrups, setSyrups] = useState<string[]>([]);
  const mode = SODA_MODES.find((m) => m.id === sodaMode)!;
  const isDiy = isSoda && sodaMode === "diy";
  const isMystery = isSoda && sodaMode === "mystery";
  const pickedSyrups = SODA_SYRUPS.filter((sy) => syrups.includes(sy.id));
  const toggleSyrup = (id: string) =>
    setSyrups((p) =>
      p.includes(id)
        ? p.filter((x) => x !== id)
        : p.length >= SODA_DIY_MAX
          ? p
          : [...p, id],
    );

  const toggleTopping = (nameEn: string) =>
    setToppings((p) =>
      p.includes(nameEn) ? p.filter((x) => x !== nameEn) : [...p, nameEn],
    );

  // DIY / สุ่ม = ร้านเตรียมโซดา+น้ำแข็งในแก้ว ไม่ปั่น ไม่แยกน้ำแข็ง
  const isBlend = method === "blend" && !isDiy && !isMystery;
  const hideMethod = alwaysBlend || isDiy || isMystery;

  const allToppings = TOPPING_GROUPS.flatMap((g) => g.items);
  const picked = allToppings.filter((i) => toppings.includes(i.nameEn));
  const modeExtra = isSoda ? mode.extra : 0;
  const total =
    item.price + modeExtra + picked.reduce((s, i) => s + i.price, 0);
  const canAdd = !isDiy || pickedSyrups.length > 0;

  const handleAdd = () => {
    if (!canAdd) return;
    const options: string[] = [];
    let name = item.name;

    if (isDiy) {
      name = `${item.name} - ซ่าผสมเอง`;
      options.push(
        `🧪 ซ่าผสมเอง (DIY) · ไซรัปแยกหลอดสลิง: ${pickedSyrups.map((sy) => sy.label).join(", ")}`,
      );
    } else if (isMystery) {
      name = `${item.name} - ซ่ามิกซ์กับฟ่าง (สุ่ม 1 ใน 5 สูตร)`;
      options.push("🫧 ซ่ามิกซ์กับฟ่าง · ร้านสุ่มหลอดสลิงให้ 1 ใน 5 สูตร 🎲");
    } else {
      options.push(
        SWEET.find((s) => s.id === sweet)!.label,
        ...(alwaysBlend ? [] : [METHOD.find((m) => m.id === method)!.label]),
      );
      if (!isBlend) options.push(ICE.find((i) => i.id === ice)!.label);
    }
    if (picked.length)
      options.push(`ท็อปปิ้ง: ${picked.map((i) => i.nameTh).join(", ")}`);
    addItem({
      id: `${item.id}-${Date.now()}`,
      name,
      price: total,
      options,
    });

    const palette = item.palette ?? DEFAULT_PALETTE;

    // 🫧 โซดา → แอนิเมชันเฉพาะแบบ (ปกติ/ผสมเอง/สุ่ม) แล้ว "ปิ๊ง!"
    if (isSoda) {
      setFx({
        variant: isDiy ? "diy" : isMystery ? "mystery" : "soda",
        palette,
        emoji: item.emoji,
        syrupColors: pickedSyrups.map((sy) => sy.color),
      });
      return;
    }

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
    // ปั่น → แก้วบินเข้าตะกร้าตามหมวด
    setFx({
      variant: (item.category && FX_BY_CATEGORY[item.category]) || "default",
      palette,
      emoji: item.emoji,
    });
  };

  const finishBrewing = () => {
    setBrewing(null);
    onClose();
    openCart();
  };

  const finishFx = () => {
    const f = fx;
    setFx(null);
    onClose();
    showToast({
      emoji: item.emoji ?? "🥤",
      name:
        f?.variant === "mystery"
          ? "ซ่ามิกซ์กับฟ่าง"
          : f?.variant === "diy"
            ? `${item.name} (ซ่าผสมเอง)`
            : item.name,
      title:
        f?.variant === "mystery"
          ? "🎲 สุ่มได้แล้ว!"
          : f?.variant === "diy"
            ? "🧪 มิกซ์เสร็จแล้ว!"
            : "ปิ๊ง! ✨",
    });
  };

  if (brewing) {
    return <MagicalDrinkAnimation input={brewing} onDone={finishBrewing} />;
  }
  if (fx) {
    return <AddToCartFx {...fx} onDone={finishFx} />;
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
            {/* 🫧 อิตาเลียนโซดา 3 รูปแบบ */}
            {isSoda && (
              <div>
                <p className="mb-2 text-sm font-semibold text-ink">
                  🫧 เลือกรูปแบบอิตาเลียนโซดา{" "}
                  <span className="font-medium text-ink/45">(3 แบบ)</span>
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {SODA_MODES.map((m) => {
                    const active = sodaMode === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSodaMode(m.id)}
                        className={`relative flex flex-col items-start rounded-2xl border p-3 text-left transition-all duration-200 active:scale-[0.98] ${
                          active
                            ? "border-grape-500 bg-grape-50 shadow-soft ring-2 ring-grape-deep"
                            : "border-ink/10 bg-white hover:border-grape-300 hover:bg-grape-50/60"
                        }`}
                      >
                        {active && (
                          <span className="animate-pop-in absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-[#22C55E] text-white shadow ring-2 ring-white">
                            <Check size={14} strokeWidth={3} />
                          </span>
                        )}
                        <span
                          className={`text-2xl ${active && m.id === "mystery" ? "animate-fx-bounce inline-block" : ""}`}
                        >
                          {m.emoji}
                        </span>
                        <span className="mt-1 font-display text-sm font-bold text-ink">
                          {m.nameTh}
                        </span>
                        <span className="text-[10px] text-ink/45">
                          {m.nameEn}
                        </span>
                        <span className="mt-1 text-[11px] leading-snug text-ink/65">
                          {m.desc}
                        </span>
                        <span
                          className={`mt-2 rounded-full px-2 py-0.5 text-xs font-extrabold ${
                            m.extra === 0
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-blossom-100 text-ink"
                          }`}
                        >
                          {m.extra === 0 ? "ราคาปกติ" : `+${m.extra}`}
                        </span>
                        {m.badge && (
                          <span className="absolute left-2 top-2 rounded-full bg-blossom-500 px-2 py-0.5 text-[10px] font-bold text-white">
                            {m.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 🧪 ซ่าผสมเอง — เลือกไซรัป (แยกใส่หลอดสลิง) */}
            {isDiy && (
              <div className="animate-pop-in rounded-2xl bg-grape-50/60 p-3">
                <p className="mb-1 text-sm font-semibold text-ink">
                  🧪 เลือกไซรัปที่จะใส่หลอดสลิง{" "}
                  <span className="font-medium text-ink/45">
                    (เลือกได้สูงสุด {SODA_DIY_MAX} รส · ลูกค้ากด/หยดเองในแก้ว)
                  </span>
                </p>
                <p className="mb-2 text-[11px] text-ink/50">
                  ร้านเตรียมโซดา + น้ำแข็งในแก้วให้ ·
                  ไซรัปแยกใส่หลอดสลิงขนาดเล็ก
                </p>
                <div className="flex flex-wrap gap-2">
                  {SODA_SYRUPS.map((sy) => {
                    const active = syrups.includes(sy.id);
                    const full = !active && syrups.length >= SODA_DIY_MAX;
                    return (
                      <button
                        key={sy.id}
                        type="button"
                        onClick={() => toggleSyrup(sy.id)}
                        disabled={full}
                        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 ${
                          active
                            ? "scale-105 border-grape-500 bg-grape-deep text-white shadow-soft"
                            : "border-ink/10 bg-white text-ink hover:border-grape-300"
                        }`}
                      >
                        <span
                          className="inline-block h-3 w-3 rounded-full ring-1 ring-white/80"
                          style={{ background: sy.color }}
                        />
                        {sy.emoji} {sy.label}
                      </button>
                    );
                  })}
                </div>
                {pickedSyrups.length === 0 && (
                  <p className="mt-2 text-[11px] font-medium text-blossom-500">
                    * เลือกไซรัปอย่างน้อย 1 รสก่อนเพิ่มลงตะกร้า
                  </p>
                )}
              </div>
            )}

            {/* 🎲 ซ่ามิกซ์กับฟ่าง — ไม่แสดงตัวเลือกรส (ร้านสุ่มให้) */}
            {isMystery && (
              <div className="animate-pop-in relative overflow-hidden rounded-2xl bg-gradient-to-br from-grape-600 via-grape-500 to-blossom-500 p-4 text-white">
                <span className="animate-twinkle pointer-events-none absolute right-3 top-2 text-2xl">
                  ✨
                </span>
                <span
                  className="animate-twinkle pointer-events-none absolute bottom-2 left-4 text-xl"
                  style={{ animationDelay: "0.6s" }}
                >
                  💜
                </span>
                <p className="font-display text-base font-bold">
                  🫧 ซ่ามิกซ์กับฟ่าง{" "}
                  <span className="text-xs font-medium text-white/70">
                    Fang&apos;s Mystery Italian Soda
                  </span>
                </p>
                <ul className="mt-1.5 space-y-0.5 text-xs text-white/90">
                  {SODA_MYSTERY.taglines.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {SODA_MYSTERY.chips.map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  {Array.from({ length: SODA_MYSTERY.tubes }).map((_, i) => (
                    <span
                      key={i}
                      className="animate-fx-bounce grid h-8 w-5 place-items-center rounded-full bg-white/25 text-xs font-bold ring-1 ring-white/50"
                      style={{ animationDelay: `${i * 0.12}s` }}
                    >
                      ?
                    </span>
                  ))}
                  <span className="ml-1 text-xs font-semibold text-white/90">
                    {SODA_MYSTERY.question}
                  </span>
                </div>
              </div>
            )}

            {/* ความหวาน (สุ่ม/DIY: ไซรัปแยก ไม่ต้องเลือก) */}
            {!isMystery && !isDiy && (
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
            )}

            {!hideMethod && (
              <>
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
              </>
            )}

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
            {isSoda && (
              <div className="mb-2 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="rounded-full bg-grape-100 px-2.5 py-1 font-semibold text-grape-700">
                  {mode.emoji} {mode.nameTh}
                  {mode.extra > 0 && ` (+${mode.extra})`}
                </span>
                {isDiy && pickedSyrups.length > 0 && (
                  <span className="text-ink/60">
                    ไซรัป: {pickedSyrups.map((sy) => sy.label).join(", ")}
                  </span>
                )}
                {isMystery && (
                  <span className="text-ink/60">
                    🎲 สุ่ม 1 ใน 5 สูตร · 🤫 ไม่เปิดเผยรส
                  </span>
                )}
              </div>
            )}
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
              disabled={!canAdd}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-grape-600 to-blossom-500 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus size={17} /> เพิ่มลงตะกร้า 🛒
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
