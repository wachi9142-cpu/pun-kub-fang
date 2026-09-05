"use client";

import { useMemo, useState } from "react";
import { Check, Plus, Sparkles } from "lucide-react";
import { MIX_BASES, MIX_TEA_TYPES, MIX_FRUITS, TOPPING_GROUPS } from "@/data/site";
import { useCart } from "@/components/cart/CartContext";
import SmoothieCup from "@/components/SmoothieCup";

const BASE_PRICE = 45; // แก้วพื้นฐาน (รวมฐาน 1 อย่าง)
const EXTRA_BASE_PRICE = 15; // ฐานเพิ่มอันที่ 2
const MAX_BASE = 2;
const FRUIT_PRICE = 10; // ต่อผลไม้ 1 อย่าง

/* โปรฯ: ฟรีเฉพาะไข่มุกดำ/คลาสสิก 1 อย่าง — ไข่มุก/ท็อปปิ้งอื่นคิดราคาปกติ */
const FREE_BOBA_EN = "Classic Black Tapioca Pearls";

function Chip({
  emoji,
  label,
  active,
  priceLabel,
  freeLabel,
  onClick,
}: {
  emoji?: string;
  label: string;
  active: boolean;
  priceLabel?: string;
  freeLabel?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-2xl border px-3 py-2 text-sm font-medium transition-all ${
        active
          ? "border-grape-500 bg-grape-600 text-white shadow-soft"
          : "border-grape-100 bg-white/85 text-grape-600 hover:border-grape-300 hover:bg-grape-50"
      }`}
    >
      {active && <Check size={14} />}
      {emoji && <span className="text-base">{emoji}</span>}
      {label}
      {priceLabel && (
        <span
          className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
            active ? "bg-white/25 text-white" : "bg-blossom-100 text-blossom-600"
          }`}
        >
          {priceLabel}
        </span>
      )}
      {freeLabel && (
        <span
          className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
            active ? "bg-white/25 text-white" : "bg-emerald-100 text-emerald-600"
          }`}
        >
          ฟรี
        </span>
      )}
    </button>
  );
}

/* ปุ่มตัวเลือกน้ำแข็ง/ความหวาน (อยู่บนพื้นม่วง) */
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
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95 ${
        active
          ? "scale-105 border-white bg-white text-grape-700 shadow-soft"
          : "border-white/40 bg-white/10 text-white hover:scale-105 hover:bg-white/20"
      }`}
    >
      {active && <Check size={14} />}
      {label}
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
  const { addItem, openCart } = useCart();

  // ฟรีเฉพาะไข่มุกดำ/คลาสสิก — ตัวอื่นทั้งหมดคิดราคาปกติในท็อปปิ้ง
  const bobaItems = TOPPING_GROUPS.flatMap((g) => g.items).filter(
    (i) => i.nameEn === FREE_BOBA_EN,
  );
  const paidGroups = TOPPING_GROUPS.map((g) => ({
    ...g,
    items: g.items.filter((i) => i.nameEn !== FREE_BOBA_EN),
  })).filter((g) => g.items.length > 0);
  const extraItems = paidGroups.flatMap((g) => g.items);

  const [baseIds, setBaseIds] = useState<string[]>([
    MIX_BASES.some((b) => b.id === initialBaseId)
      ? initialBaseId!
      : MIX_BASES[0].id,
  ]);
  const [fruitIds, setFruitIds] = useState<string[]>([
    MIX_FRUITS.some((f) => f.id === initialFruitId)
      ? initialFruitId!
      : MIX_FRUITS[0].id,
  ]);
  const [teaType, setTeaType] = useState<string>("");
  const [teaOpen, setTeaOpen] = useState(false);
  const [freeBoba, setFreeBoba] = useState<string>("");
  const [extras, setExtras] = useState<string[]>([]);
  const [other, setOther] = useState("");
  const [ice, setIce] = useState<string>(""); // "" = ปกติ
  const [sweet, setSweet] = useState<string>("regular");
  const [added, setAdded] = useState(false);

  const ICE_OPTIONS = [
    { id: "less", label: "น้ำแข็งน้อย" },
    { id: "extra", label: "น้ำแข็งมาก" },
  ];
  const SWEET_OPTIONS = [
    { id: "less", label: "หวานน้อย" },
    { id: "50", label: "หวาน 50%" },
    { id: "regular", label: "หวานปกติ" },
  ];
  const iceLabel = ICE_OPTIONS.find((o) => o.id === ice)?.label;
  const sweetLabel = SWEET_OPTIONS.find((o) => o.id === sweet)?.label;

  const totalBases = baseIds.length + (teaType ? 1 : 0);

  const toggleSimpleBase = (id: string) =>
    setBaseIds((prev) => {
      if (prev.includes(id)) return totalBases > 1 ? prev.filter((x) => x !== id) : prev;
      return totalBases >= MAX_BASE ? prev : [...prev, id];
    });
  const selectTea = (id: string) =>
    setTeaType((prev) => {
      if (prev === id) return totalBases > 1 ? "" : prev; // ยกเลิกชา (เหลือฐาน ≥1)
      if (prev) return id; // สลับชนิดชา (จำนวนฐานเท่าเดิม)
      return totalBases >= MAX_BASE ? prev : id; // เพิ่มชาใหม่
    });
  const toggleFruit = (id: string) =>
    setFruitIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  const toggleExtra = (nameEn: string) =>
    setExtras((prev) =>
      prev.includes(nameEn) ? prev.filter((t) => t !== nameEn) : [...prev, nameEn],
    );

  const selectedBases = [
    ...baseIds.map((id) => MIX_BASES.find((b) => b.id === id)!),
    ...(teaType ? [MIX_TEA_TYPES.find((t) => t.id === teaType)!] : []),
  ];
  const teaLabel = MIX_TEA_TYPES.find((t) => t.id === teaType)?.label;
  const fruits = fruitIds.map((id) => MIX_FRUITS.find((f) => f.id === id)!);

  const extraPrice = useMemo(
    () =>
      extraItems
        .filter((i) => extras.includes(i.nameEn))
        .reduce((s, i) => s + i.price, 0),
    [extras, extraItems],
  );
  const extraBaseCount = Math.max(0, totalBases - 1);
  const price =
    BASE_PRICE +
    extraBaseCount * EXTRA_BASE_PRICE +
    fruits.length * FRUIT_PRICE +
    extraPrice;

  const freeBobaLabel = bobaItems.find((b) => b.nameEn === freeBoba)?.nameTh;
  const extraLabels = extraItems
    .filter((i) => extras.includes(i.nameEn))
    .map((i) => i.nameTh);

  const previewPalette = selectedBases[0]?.palette ?? MIX_BASES[0].palette!;
  const previewEmoji = fruits[0]?.emoji ?? "🥤";
  const drinkName = `${fruits.map((f) => f.label).join(" + ")}${
    fruits.length ? " " : ""
  }${selectedBases.map((b) => b.label).join(" + ")}ปั่น`;

  // ⭐ เมนูแนะนำจากฟ่าง — เลือกส่วนผสมให้อัตโนมัติ
  const applySignature = () => {
    setBaseIds([]);
    setTeaType("green");
    setTeaOpen(true);
    setFruitIds(["apple"]);
    setFreeBoba("");
    setExtras(["Strawberry Popping Boba"]);
    setSweet("regular");
    setIce("");
  };

  const handleAdd = () => {
    const options: string[] = [];
    if (sweetLabel) options.push(sweetLabel);
    if (iceLabel) options.push(iceLabel);
    if (freeBobaLabel) options.push(`ไข่มุกฟรี: ${freeBobaLabel}`);
    if (extraLabels.length) options.push(`เพิ่ม: ${extraLabels.join(", ")}`);
    if (other.trim()) options.push(`อื่นๆ: ${other.trim()}`);
    addItem({
      id: `mix-${Date.now()}`,
      name: `${drinkName} (มิกซ์เอง)`,
      price,
      options,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
    openCart();
  };

  return (
    <section id="mix" className="relative py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-grape-600 via-grape-500 to-blossom-500 p-6 shadow-card sm:p-10">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            {/* ตัวเลือก */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white">
                <Sparkles size={15} /> มิกซ์กับฟ่าง
              </span>
              <h2 className="font-display mt-4 text-3xl font-bold text-white sm:text-4xl">
                ปั่นเองได้ดั่งใจ 💜
              </h2>
              <p className="mt-2 max-w-md text-white/80">
                เลือกได้หลายอย่างในแก้วเดียว กดซ้ำเพื่อยกเลิก ✓
              </p>

              {/* ⭐ เมนูแนะนำจากฟ่าง (Signature) */}
              <div className="mt-6 rounded-3xl bg-white/15 p-5 ring-1 ring-white/25">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blossom-500 px-3 py-1 text-[11px] font-bold text-white shadow-soft">
                  ⭐ เมนูแนะนำจากฟ่าง
                </span>
                <h3 className="font-display mt-2 text-xl font-bold text-white">
                  🍏🍓 เขียว ๆ แต่ป๊อปนะ
                </h3>
                <p className="text-xs font-medium uppercase tracking-wide text-white/60">
                  Green Tea × Apple × Strawberry Popping Boba
                </p>
                <p className="mt-2 text-sm text-white/85">
                  ชาเขียวหอม ๆ ผสมความสดชื่นของแอปเปิ้ล เติมมุกป๊อปสตรอว์เบอร์รีให้แตกป๊อปในปาก 💚🍓
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["🍵 ชาเขียว", "🍏 แอปเปิ้ล", "🍓 มุกป๊อปสตรอว์เบอร์รี"].map(
                    (t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white"
                      >
                        {t}
                      </span>
                    ),
                  )}
                </div>
                <button
                  onClick={applySignature}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-grape-700 shadow-soft transition-all hover:scale-[1.03]"
                >
                  ลองแก้วนี้เลย ✨
                </button>
              </div>

              <div className="mt-6 space-y-6">
                {/* 1. ฐาน */}
                <div>
                  <p className="mb-1 text-sm font-semibold text-white/90">
                    1. เลือกฐานเครื่องดื่ม (ได้สูงสุด {MAX_BASE} ฐาน)
                  </p>
                  <p className="mb-2.5 text-xs text-white/70">
                    รวมฐาน 1 อย่างในราคาพื้นฐาน · เพิ่มฐานที่ 2 +฿{EXTRA_BASE_PRICE}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {MIX_BASES.slice(0, 2).map((o) => {
                      const active = baseIds.includes(o.id);
                      const atMax = !active && totalBases >= MAX_BASE;
                      return (
                        <span key={o.id} className={atMax ? "opacity-40" : ""}>
                          <Chip
                            emoji={o.emoji}
                            label={o.label}
                            active={active}
                            onClick={() => toggleSimpleBase(o.id)}
                          />
                        </span>
                      );
                    })}
                    {/* หมวดชา (มีชนิดย่อย) */}
                    <Chip
                      emoji="🍵"
                      label={teaLabel ? `ชา · ${teaLabel} ▾` : "ชา ▾"}
                      active={!!teaType}
                      onClick={() => setTeaOpen((o) => !o)}
                    />
                    {MIX_BASES.slice(2).map((o) => {
                      const active = baseIds.includes(o.id);
                      const atMax = !active && totalBases >= MAX_BASE;
                      return (
                        <span key={o.id} className={atMax ? "opacity-40" : ""}>
                          <Chip
                            emoji={o.emoji}
                            label={o.label}
                            active={active}
                            onClick={() => toggleSimpleBase(o.id)}
                          />
                        </span>
                      );
                    })}
                  </div>

                  {/* ชนิดชา */}
                  {teaOpen && (
                    <div className="mt-2.5 rounded-2xl bg-white/12 p-3 ring-1 ring-white/20">
                      <p className="mb-2 text-xs text-white/70">
                        เลือกชนิดชา (นับเป็น 1 ฐาน)
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {MIX_TEA_TYPES.map((t) => {
                          const active = teaType === t.id;
                          const atMax = !active && !teaType && totalBases >= MAX_BASE;
                          return (
                            <span key={t.id} className={atMax ? "opacity-40" : ""}>
                              <Chip
                                emoji={t.emoji}
                                label={t.label}
                                active={active}
                                onClick={() => selectTea(t.id)}
                              />
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. ผลไม้ */}
                <div>
                  <p className="mb-1 text-sm font-semibold text-white/90">
                    2. เลือกผลไม้ (เลือกได้หลายอย่าง)
                  </p>
                  <p className="mb-2.5 text-xs text-white/70">
                    +฿{FRUIT_PRICE} ต่อผลไม้ 1 อย่าง
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {MIX_FRUITS.map((o) => (
                      <Chip
                        key={o.id}
                        emoji={o.emoji}
                        label={o.label}
                        priceLabel={`+฿${FRUIT_PRICE}`}
                        active={fruitIds.includes(o.id)}
                        onClick={() => toggleFruit(o.id)}
                      />
                    ))}
                  </div>
                </div>

                {/* 🧊 ปริมาณน้ำแข็ง + 🍯 ความหวาน */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 text-sm font-semibold text-white/90">
                      🧊 ปริมาณน้ำแข็ง
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ICE_OPTIONS.map((o) => (
                        <PrefPill
                          key={o.id}
                          label={o.label}
                          active={ice === o.id}
                          onClick={() =>
                            setIce((prev) => (prev === o.id ? "" : o.id))
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-semibold text-white/90">
                      🍯 ระดับความหวาน
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SWEET_OPTIONS.map((o) => (
                        <PrefPill
                          key={o.id}
                          label={o.label}
                          active={sweet === o.id}
                          onClick={() => setSweet(o.id)}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* 🧋 ไข่มุกฟรี 1 อย่าง */}
                <div className="rounded-2xl bg-white/12 p-4 ring-1 ring-white/20">
                  <p className="mb-1 text-sm font-semibold text-white">
                    🧋 ไข่มุกฟรี 1 อย่าง{" "}
                    <span className="rounded-full bg-blossom-500 px-2 py-0.5 text-[10px] font-bold">
                      ฟรี! ตามโปรฯ ช่วงนี้
                    </span>
                  </p>
                  <p className="mb-2.5 text-xs text-white/70">
                    ฟรีไข่มุกดำ/คลาสสิก 1 อย่าง / แก้ว · ไข่มุกอื่นคิดราคาปกติในท็อปปิ้ง
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setFreeBoba("")}
                      className={`rounded-2xl border px-3 py-1.5 text-sm font-medium transition-all ${
                        freeBoba === ""
                          ? "border-white bg-white text-grape-700"
                          : "border-white/40 bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      ไม่รับ
                    </button>
                    {bobaItems.map((b) => (
                      <button
                        key={b.nameEn}
                        onClick={() => setFreeBoba(b.nameEn)}
                        className={`flex items-center gap-1.5 rounded-2xl border px-3 py-1.5 text-sm font-medium transition-all ${
                          freeBoba === b.nameEn
                            ? "border-white bg-white text-grape-700 shadow-soft"
                            : "border-white/40 bg-white/10 text-white hover:bg-white/20"
                        }`}
                      >
                        {freeBoba === b.nameEn && <Check size={14} />}
                        {b.nameTh}
                        <span
                          className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                            freeBoba === b.nameEn
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-white/20 text-white"
                          }`}
                        >
                          ฟรี
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. ท็อปปิ้งเพิ่มเติม */}
                <div>
                  <p className="mb-1 text-sm font-semibold text-white/90">
                    3. เลือกท็อปปิ้ง (เลือกได้หลายอย่าง)
                  </p>
                  <p className="mb-2.5 text-xs text-white/70">
                    คิดราคาตามปกติ +฿5 / +฿10 ต่ออย่าง
                  </p>
                  <div className="space-y-3">
                    {paidGroups.map((g) => (
                      <div key={g.id}>
                        <p className="mb-1.5 text-xs font-medium text-white/70">
                          {g.emoji} {g.titleTh}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {g.items.map((it) => (
                            <Chip
                              key={it.nameEn}
                              label={it.nameTh}
                              priceLabel={`+฿${it.price}`}
                              active={extras.includes(it.nameEn)}
                              onClick={() => toggleExtra(it.nameEn)}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* อื่น ๆ / Other */}
                <div>
                  <label
                    htmlFor="mix-other"
                    className="mb-2 block text-sm font-semibold text-white/90"
                  >
                    ✍️ อื่น ๆ / Other
                  </label>
                  <input
                    id="mix-other"
                    type="text"
                    value={other}
                    onChange={(e) => setOther(e.target.value)}
                    maxLength={120}
                    placeholder="พิมพ์ท็อปปิ้ง/คำขอพิเศษเพิ่มเติม เช่น เพิ่มน้ำแข็งน้อย"
                    className="w-full rounded-2xl border border-white/30 bg-white/90 px-4 py-2.5 text-sm text-grape-700 placeholder:text-grape-300 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <p className="mt-1 text-[11px] text-white/60">
                    * รายการที่พิมพ์เองจะถูกส่งไปพร้อมออเดอร์ ราคาคิดตามหน้าร้าน
                  </p>
                </div>
              </div>
            </div>

            {/* สรุป + พรีวิว */}
            <div className="rounded-3xl bg-white/95 p-6 shadow-soft lg:sticky lg:top-24">
              <div className="grid place-items-center">
                <SmoothieCup palette={previewPalette} emoji={previewEmoji} size={140} />
              </div>
              <h3 className="font-display mt-2 text-center text-lg font-semibold text-grape-700">
                {drinkName}
              </h3>

              <div className="mt-3 space-y-1.5 border-t border-grape-100 pt-3 text-sm">
                <SummaryRow
                  label="ฐาน"
                  value={selectedBases.map((b) => b.label).join(", ")}
                />
                <SummaryRow
                  label="ผลไม้"
                  value={fruits.length ? fruits.map((f) => f.label).join(", ") : "—"}
                />
                <SummaryRow label="ความหวาน" value={sweetLabel ?? "—"} />
                <SummaryRow label="น้ำแข็ง" value={iceLabel ?? "ปกติ"} />
                <SummaryRow
                  label="ไข่มุกฟรี"
                  value={freeBobaLabel ?? "ไม่รับ"}
                  free={!!freeBobaLabel}
                />
                {extraLabels.length > 0 && (
                  <SummaryRow label="ท็อปปิ้ง" value={extraLabels.join(", ")} />
                )}
                {other.trim() && <SummaryRow label="อื่นๆ" value={other.trim()} />}
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-grape-100 pt-3">
                <span className="text-sm font-medium text-grape-500">รวมทั้งหมด</span>
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

function SummaryRow({
  label,
  value,
  free,
}: {
  label: string;
  value: string;
  free?: boolean;
}) {
  return (
    <div className="flex justify-between gap-3">
      <span className="shrink-0 text-grape-400">{label}</span>
      <span className="text-right font-medium text-grape-700">
        {value}
        {free && (
          <span className="ml-1 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600">
            ฟรี
          </span>
        )}
      </span>
    </div>
  );
}
