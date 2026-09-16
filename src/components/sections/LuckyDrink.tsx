"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  MENU_ITEMS,
  DRINK_CATEGORIES,
  GACHA_MENUS,
  GACHA_FROM_MENU,
  GACHA_RARITY,
  type GachaMenu,
} from "@/data/site";
import SmoothieCup from "@/components/SmoothieCup";
import DrinkCustomizer from "@/components/DrinkCustomizer";
import { HelperCat } from "@/components/MagicCats";
import { ImageCaption } from "@/components/sections/IngredientNote";
import ImageLightbox from "@/components/ImageLightbox";

/**
 * 🎰 LuckyDrink — "สุ่มแก้วกับฟ่าง ✨ / Fang's Lucky Drink" ตู้กาชาปองทรงลูกโลก
 * - ตู้ใหญ่กลางหน้า (อ้างอิงภาพ ref): ป้ายมงกุฎมีไฟ → โดมกลมใสเต็มไปด้วยแคปซูล → ตัวตู้ม่วงมีป้าย "หมุนเลย!"
 *   + ลูกบิดใหญ่ + น้องแมวเมล่อน → ช่องรับแคปซูล → ฐาน PunKubFang
 * - รอบตู้: บับเบิลข้อความ / กล่อง "สุ่มได้ทุกหมวด" (ราคาเริ่มต้นจริงจาก data) / "ตัวอย่างเมนูที่อาจได้"
 * - ลำดับหมุน: สั่น → แคปซูลกลิ้ง → ลูกบิดหมุน → แคปซูลไหลออกช่อง → หยุดลุ้น → เปิด ✨ → โชว์เมนู
 * - Data: GACHA_MENUS (เมนูลับ) + GACHA_FROM_MENU (เมนูหลักบางส่วนจาก MENU_ITEMS) · ยังไม่กำหนดอัตราสุ่ม → เท่ากันทุกใบ
 * - "💜 เอาแก้วนี้!" → DrinkCustomizer เดิม → ตะกร้าเดิม · reduced-motion → ข้ามการหมุน
 */

type Phase =
  "idle" | "shake" | "tumble" | "knob" | "out" | "suspense" | "open" | "reveal";

const BUSY: Phase[] = ["shake", "tumble", "knob", "out", "suspense", "open"];

/* 🎟️ รวมใบในตู้: เมนูหลัก (จาก MENU_ITEMS จริง) + เมนูลับ */
function buildPool(): GachaMenu[] {
  const fromMenu: GachaMenu[] = GACHA_FROM_MENU.flatMap((id) => {
    const m = MENU_ITEMS.find((x) => x.id === id);
    if (!m || m.soldOut) return [];
    const blend = m.category === "smoothie" || m.name.includes("ปั่น");
    return [
      {
        id: m.id,
        name: m.name,
        englishName: m.nameEn ?? "",
        description: m.tagline,
        price: m.price,
        emoji: m.emoji,
        image: m.image,
        category: m.category,
        palette: m.palette,
        rarity: blend ? "lucky" : "common",
        isSmoothie: blend,
        askedOften: m.popular,
      },
    ];
  });
  return [...fromMenu, ...GACHA_MENUS.filter((g) => g.available !== false)];
}

const pick = <T,>(arr: T[], not?: T): T => {
  if (arr.length <= 1) return arr[0];
  let x = arr[Math.floor(Math.random() * arr.length)];
  while (x === not) x = arr[Math.floor(Math.random() * arr.length)];
  return x;
};

/* 💬 ข้อความตามช่วง */
const STATUS: Record<Phase, string> = {
  idle: "ลุ้นหน่อยนะ... ฟ่างก็ไม่รู้เหมือนกันว่าจะได้อะไร 👀",
  shake: "กำลังเขย่าดวง... 🎰",
  tumble: "กำลังเขย่าดวง... 🎰",
  knob: "✨ สุ่มอยู่... กำลังค้นหาแก้วของคุณ... 👀",
  out: "มาแล้วว ลูกกาชากำลังไหลออกมา!",
  suspense: "เอาล่ะ... เปิดเลยไหม!? 😳",
  open: "เปิดแล้วว ✨",
  reveal: "เย้! วันนี้คุณได้... 🎉",
};

function revealLines(g: GachaMenu): string[] {
  const out: string[] = [];
  if (g.isSecret) out.push("👀 เดี๋ยวนะ... เมนูนี้ไม่มีในเมนูหลัก!");
  if (g.isSmoothie) out.push("🍀 ดวงดีมาก! วันนี้ได้เมนูปั่น!");
  if (g.askedOften) out.push("💜 เมนูนี้ลูกค้าถามหาบ่อยมากนะ!");
  return out;
}

/* 🟣 แคปซูลในโดม (ม่วง ชมพู ครีม ขาว เหลือง เขียว ฟ้า) — ตำแหน่งในวงกลม cx150 cy200 r96 */
const CAPS = [
  [110, 150, "#b48cff", "#ece2ff", "🧋"],
  [150, 138, "#ff8fb1", "#ffe3ec", ""],
  [190, 152, "#ffd76a", "#fff4cc", "☕"],
  [90, 190, "#8ee39a", "#e0f9e4", ""],
  [130, 182, "#ffffff", "#f4eeff", "🍵"],
  [170, 186, "#c78bff", "#f0e4ff", ""],
  [210, 194, "#7ad1ff", "#dcf1ff", "🫧"],
  [72, 228, "#ff8fb1", "#ffe3ec", "🍓"],
  [112, 226, "#ffd76a", "#fff4cc", ""],
  [152, 222, "#b48cff", "#ece2ff", "🥤"],
  [192, 228, "#f7e3c8", "#fff8ee", ""],
  [228, 232, "#8ee39a", "#e0f9e4", "🍋"],
  [90, 264, "#7ad1ff", "#dcf1ff", ""],
  [132, 266, "#ff8fb1", "#ffe3ec", "🥭"],
  [172, 264, "#ffffff", "#f4eeff", ""],
  [212, 266, "#c78bff", "#f0e4ff", "🍇"],
] as const;

export default function LuckyDrink() {
  const pool = useMemo(buildPool, []);
  /* ราคาเริ่มต้นจริงของแต่ละหมวดที่อยู่ในตู้ */
  const catRows = useMemo(
    () =>
      DRINK_CATEGORIES.flatMap((c) => {
        const ps = pool.filter((g) => g.category === c.id).map((g) => g.price);
        return ps.length ? [{ ...c, min: Math.min(...ps) }] : [];
      }),
    [pool],
  );
  const secretNames = useMemo(
    () => GACHA_MENUS.filter((g) => g.isSecret).slice(0, 2),
    [],
  );

  const [phase, setPhase] = useState<Phase>("idle");
  const [prize, setPrize] = useState<GachaMenu | null>(null);
  const [tick, setTick] = useState(0);
  const [customizing, setCustomizing] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [zoom, setZoom] = useState(false);
  const timers = useRef<number[]>([]);
  const pending = useRef<GachaMenu | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clear, []);
  useEffect(() => {
    if (phase === "reveal")
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
  }, [phase]);

  const spin = () => {
    if (BUSY.includes(phase) || pool.length === 0) return;
    clear();
    setImgFailed(false);
    // 🎯 สุ่มจริงจาก data ตั้งแต่ตอนกด — แอนิเมชันแค่ "เปิดเผย"
    const next = pick(pool, prize ?? undefined);
    pending.current = next;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPrize(next);
      setPhase("reveal");
      return;
    }
    setPrize(null);
    const at = (ms: number, fn: () => void) =>
      timers.current.push(window.setTimeout(fn, ms));
    setPhase("shake"); //                    0.0s ตู้สั่น
    at(800, () => setPhase("tumble")); //     0.8s แคปซูลกลิ้งในโดม
    for (let i = 0; i < 14; i++) at(800 + i * 110, () => setTick(i));
    at(2300, () => setPhase("knob")); //      2.3s หมุนลูกบิด
    at(3100, () => setPhase("out")); //       3.1s แคปซูลไหลออก
    at(4000, () => setPhase("suspense")); //  4.0s หยุดลุ้น
    at(4900, () => setPhase("open")); //      4.9s เปิดแคปซูล
    at(5500, () => {
      setPrize(pending.current);
      setPhase("reveal");
    });
  };

  const busy = BUSY.includes(phase);
  const capsuleClass =
    phase === "tumble" || phase === "knob"
      ? "gacha-tumble"
      : phase === "idle" || phase === "shake"
        ? "gacha-cap-idle"
        : "";
  const ticker = pool[tick % pool.length];
  const rar = prize ? GACHA_RARITY[prize.rarity] : null;
  const catPose =
    phase === "reveal" || phase === "open" ? "wow" : busy ? "watch" : "idle";

  return (
    <section
      id="gacha"
      className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10"
      aria-label="ตู้กาชาปองสุ่มแก้วกับฟ่าง"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-grape-700 via-grape-500 to-blossom-300 px-4 pb-8 pt-8 text-white shadow-card ring-1 ring-white/30 sm:px-8 sm:pt-10">
        {/* ✨ พื้นหลัง: ตารางหมากรุกจาง ๆ + แสงฟุ้ง + ดาว/หัวใจ/ฟอง */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            className="absolute inset-x-0 bottom-0 h-40 opacity-25"
            style={{
              backgroundImage:
                "linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%), linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%)",
              backgroundSize: "40px 40px",
              backgroundPosition: "0 0, 20px 20px",
              maskImage: "linear-gradient(to top, black, transparent)",
              WebkitMaskImage: "linear-gradient(to top, black, transparent)",
            }}
          />
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute -bottom-28 -right-24 h-96 w-96 rounded-full bg-blossom-200/40 blur-3xl" />
          {[
            ["✨", "4%", "8%", "0s"],
            ["💜", "10%", "56%", "1.1s"],
            ["⭐", "24%", "22%", "0.4s"],
            ["🫧", "28%", "78%", "1.7s"],
            ["✨", "72%", "16%", "0.8s"],
            ["💜", "82%", "52%", "2.2s"],
            ["⭐", "94%", "26%", "1.4s"],
            ["🫧", "90%", "80%", "0.2s"],
          ].map(([e, l, t, d], i) => (
            <span
              key={i}
              className="animate-floaty absolute text-base opacity-60 sm:text-2xl"
              style={{ left: l, top: t, animationDelay: d }}
            >
              {e}
            </span>
          ))}
        </div>

        {/* 🎰 ตู้กลาง + กล่องซ้าย/ขวา */}
        <div className="relative mx-auto grid max-w-5xl items-center gap-5 lg:grid-cols-[230px_minmax(0,1fr)_230px] lg:gap-6">
          {/* ⬅️ ซ้าย: บับเบิล + ราคาเริ่มต้นแต่ละหมวด */}
          <div className="order-2 grid gap-3 sm:grid-cols-2 lg:order-1 lg:grid-cols-1">
            <Bubble tail="right" className="hidden lg:block">
              <span className="font-display text-base font-bold leading-snug">
                คิดไม่ออก
                <br />
                ว่าจะดื่มอะไร?
              </span>
              <br />
              <span className="text-xs">ให้ฟ่างสุ่มให้เลย! 💜</span>
            </Bubble>
            <Card title="สุ่มได้ทุกหมวด!">
              <ul className="space-y-1.5">
                {catRows.map((c) => (
                  <li
                    key={c.id}
                    className="flex items-center gap-2 rounded-xl bg-grape-50 px-2.5 py-1.5 text-sm"
                  >
                    <span>{c.emoji}</span>
                    <span className="flex-1 font-semibold text-ink">
                      {c.label.replace("เมนู", "")}
                    </span>
                    <span className="font-display font-bold text-blossom-500">
                      {c.min}.-
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[10px] text-ink/45">ราคาเริ่มต้นในตู้</p>
            </Card>
          </div>

          {/* 🎰 ตู้ */}
          <div className="order-1 mx-auto w-full max-w-[340px] sm:max-w-[400px] lg:order-2">
            <Bubble tail="down" className="mx-auto mb-2 w-fit lg:hidden">
              <span className="text-xs font-semibold">
                คิดไม่ออกว่าจะดื่มอะไร? ให้ฟ่างสุ่มให้เลย! 💜
              </span>
            </Bubble>
            <div
              className={`relative ${phase === "idle" ? "gacha-idle" : ""} ${phase === "shake" || phase === "tumble" ? "gacha-shake" : ""}`}
            >
              <GachaMachine
                phase={phase}
                capsuleClass={capsuleClass}
                prize={
                  phase === "reveal" || phase === "open"
                    ? (prize ?? pending.current)
                    : null
                }
              />
              {/* 🐱 น้องเมล่อนข้างตู้ */}
              <div className="pointer-events-none absolute bottom-[9%] left-[3%] w-[24%]">
                <HelperCat
                  pose={catPose}
                  size={80}
                  className="!h-auto !w-full"
                />
              </div>
              {/* ✨ ประกายวิ่งผ่านตอน idle */}
              {phase === "idle" && (
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[3rem]">
                  <div className="gacha-shine absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                </div>
              )}
            </div>

            <p
              className="font-display mt-2 min-h-[1.75rem] text-center text-sm font-semibold text-white sm:text-base"
              aria-live="polite"
            >
              {(phase === "tumble" || phase === "knob") && ticker ? (
                <>
                  <span key={tick} className="gacha-tick mr-1.5">
                    {ticker.emoji}
                  </span>
                  {STATUS[phase]}
                </>
              ) : (
                STATUS[phase]
              )}
            </p>
            <div className="mt-2 text-center">
              <button
                type="button"
                onClick={spin}
                disabled={busy}
                className={`font-display inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-bold text-grape-700 shadow-lg ring-4 ring-white/30 transition hover:scale-105 hover:shadow-xl active:scale-95 disabled:cursor-wait disabled:opacity-70 sm:text-lg ${phase === "idle" ? "gacha-pulse" : ""}`}
              >
                {busy
                  ? "🎰 กำลังสุ่ม…"
                  : phase === "reveal"
                    ? "🎰 หมุนอีกครั้ง!"
                    : "🧋 สุ่มเลย! →"}
              </button>
            </div>
          </div>

          {/* ➡️ ขวา: บับเบิล + ตัวอย่างเมนู */}
          <div className="order-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <Bubble tail="left" className="hidden lg:block">
              <span className="font-display text-base font-bold">
                กาชานี้ไม่ใช่กาชาธรรมดา!
              </span>
              <br />
              <span className="text-xs">
                มีเมนูมั่ว เมนูลับ เมนูแปลก ๆ เยอะมากกว่าที่คิดนะ 🧋
              </span>
            </Bubble>
            <Card title="ตัวอย่างเมนูที่อาจได้">
              <ul className="space-y-1.5 text-sm font-semibold text-ink">
                {secretNames.map((g) => (
                  <li key={g.id} className="flex items-center gap-2">
                    <span>{g.emoji}</span> {g.name}
                  </li>
                ))}
                <li className="flex items-center gap-2">
                  <span>🧋</span> เมนูปั่น / สมูทตี้
                </li>
                <li className="flex items-center gap-2">
                  <span>🧪</span> เมนูมิกซ์แปลก ๆ
                </li>
                <li className="flex items-center gap-2">
                  <span>⭐</span> และอีกเพียบ!
                </li>
              </ul>
              <div className="mt-2 flex flex-wrap gap-1">
                {(
                  Object.keys(GACHA_RARITY) as (keyof typeof GACHA_RARITY)[]
                ).map((k) => (
                  <span
                    key={k}
                    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold text-ink"
                    style={{ background: `${GACHA_RARITY[k].color}66` }}
                  >
                    {GACHA_RARITY[k].emoji} {GACHA_RARITY[k].label}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* 🎉 ผลลัพธ์ */}
        <div ref={resultRef} className="relative mx-auto mt-6 max-w-2xl">
          {phase === "reveal" && prize && rar && (
            <div className="gacha-reveal relative rounded-3xl bg-white p-5 text-ink shadow-card ring-1 ring-white/70">
              <Confetti />
              <p className="font-display text-center text-lg font-bold text-grape-600 sm:text-xl">
                🎉 ดวงวันนี้ของคุณคือ...
              </p>
              <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                <div className="relative grid h-32 w-32 shrink-0 place-items-center overflow-hidden rounded-3xl bg-gradient-to-b from-grape-50 to-blossom-50/70 ring-2 ring-grape-100">
                  {prize.image && !imgFailed ? (
                    <button
                      type="button"
                      onClick={() => setZoom(true)}
                      aria-label={`ดูรูป ${prize.name} เต็มจอ`}
                      className="h-full w-full cursor-zoom-in"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={prize.image}
                        alt={prize.name}
                        onError={() => setImgFailed(true)}
                        className="h-full w-full object-contain p-1"
                      />
                    </button>
                  ) : (
                    <SmoothieCup
                      palette={prize.palette}
                      emoji={prize.emoji}
                      size={104}
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1 text-center sm:text-left">
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold text-ink ring-1 ring-black/5"
                    style={{ background: `${rar.color}66` }}
                  >
                    {rar.emoji}{" "}
                    {prize.isSecret && prize.rarity !== "secret"
                      ? "เมนูลับของฟ่าง"
                      : rar.label}
                  </span>
                  <h3 className="font-display mt-2 text-2xl font-bold text-grape-700">
                    {prize.emoji} {prize.name}
                  </h3>
                  {prize.englishName && (
                    <p className="text-sm font-medium text-grape-400">
                      {prize.englishName}
                    </p>
                  )}
                  <p className="mt-1.5 text-sm text-ink/65">
                    {prize.description}
                  </p>
                  <p className="font-display mt-2 text-xl font-bold text-ink">
                    ราคา {prize.price} บาท
                  </p>
                  {revealLines(prize).map((l) => (
                    <p
                      key={l}
                      className="mt-1 text-xs font-semibold text-blossom-500"
                    >
                      {l}
                    </p>
                  ))}
                </div>
              </div>
              <ImageCaption fresh={prize.category === "smoothie"} />
              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setCustomizing(true)}
                  className="font-display rounded-full bg-grape-500 px-4 py-3 text-sm font-bold text-white shadow transition hover:bg-grape-600 hover:shadow-lg active:scale-95"
                >
                  💜 เอาแก้วนี้!
                </button>
                <button
                  type="button"
                  onClick={spin}
                  className="font-display rounded-full bg-grape-50 px-4 py-3 text-sm font-bold text-grape-700 ring-1 ring-grape-200 transition hover:bg-grape-100 active:scale-95"
                >
                  🎰 ไม่ใช่ทาง! สุ่มใหม่
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 💡 แล้วทำไมต้องสุ่มกับฟ่าง? */}
        <div className="relative mx-auto mt-6 max-w-5xl rounded-3xl bg-white/90 p-5 text-ink ring-1 ring-white/70 sm:flex sm:items-center sm:gap-5">
          <div className="flex items-center gap-2 sm:w-56 sm:shrink-0">
            <span className="text-3xl">💡</span>
            <h3 className="font-display text-lg font-bold text-grape-700">
              แล้วทำไมต้องสุ่มกับฟ่าง?
            </h3>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink/75 sm:mt-0">
            เพราะกาชาของฟ่างไม่ได้มีแค่เมนูในเมนูหลัก! มีทั้งเมนูทดลอง เมนูมิกซ์
            เมนูมั่ว เมนูแปลก และเมนูลับที่ฟ่างลองทำเอง
            บางแก้วไม่มีอยู่ในหมวดไหนเลย 😂 แต่ถ้าอร่อยจนลูกค้าถามหาบ่อย ๆ
            อาจได้เลื่อนขั้นมาเป็นเมนูหลักของร้านก็ได้นะ! ✨
          </p>
        </div>
      </div>

      {zoom && prize?.image && (
        <ImageLightbox
          src={prize.image}
          alt={prize.name}
          onClose={() => setZoom(false)}
        />
      )}

      {/* 🛒 ตัวปรับแต่ง + ตะกร้าเดิม */}
      {customizing && prize && (
        <DrinkCustomizer
          item={{
            id: prize.id,
            name: prize.name,
            nameEn: prize.englishName || undefined,
            price: prize.price,
            palette: prize.palette,
            emoji: prize.emoji,
            category: prize.category,
          }}
          onClose={() => setCustomizing(false)}
        />
      )}
    </section>
  );
}

/* 💬 บับเบิลข้อความ */
function Bubble({
  children,
  tail,
  className = "",
}: {
  children: React.ReactNode;
  tail: "left" | "right" | "down";
  className?: string;
}) {
  const t =
    tail === "right"
      ? "right-[-8px] top-1/2 -translate-y-1/2"
      : tail === "left"
        ? "left-[-8px] top-1/2 -translate-y-1/2"
        : "bottom-[-8px] left-1/2 -translate-x-1/2";
  return (
    <div
      className={`relative rounded-2xl bg-white px-4 py-3 text-center text-grape-700 shadow-md ${className}`}
    >
      <span className={`absolute h-4 w-4 rotate-45 bg-white ${t}`} />
      <span className="relative">{children}</span>
    </div>
  );
}

/* 🗂️ กล่องข้างตู้ */
function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-white p-3.5 text-ink shadow-md ring-1 ring-white/70">
      <p className="font-display mb-2 rounded-full bg-grape-100 px-3 py-1 text-center text-sm font-bold text-grape-700">
        {title}
      </p>
      {children}
    </div>
  );
}

/* 🎊 คอนเฟตติ/หัวใจกระจายตอนเปิด */
function Confetti() {
  const bits = [
    "✨",
    "💜",
    "⭐",
    "💖",
    "🫧",
    "✨",
    "💜",
    "⭐",
    "🎉",
    "✨",
    "💖",
    "⭐",
  ];
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-8 z-10"
      aria-hidden
    >
      {bits.map((e, i) => {
        const a = (i / bits.length) * Math.PI * 2;
        const r = 90 + (i % 3) * 40;
        return (
          <span
            key={i}
            className="gacha-confetti absolute text-lg"
            style={
              {
                "--cx": `${Math.cos(a) * r}px`,
                "--cy": `${Math.sin(a) * r * 0.7 - 30}px`,
                animationDelay: `${i * 0.03}s`,
              } as React.CSSProperties
            }
          >
            {e}
          </span>
        );
      })}
    </div>
  );
}

/* 🎰 ตู้กาชาปองทรงลูกโลก (SVG) */
function GachaMachine({
  phase,
  capsuleClass,
  prize,
}: {
  phase: Phase;
  capsuleClass: string;
  prize: GachaMenu | null;
}) {
  const capOut = phase === "out" || phase === "suspense";
  const opening = phase === "open" || phase === "reveal";
  const CX = 150;
  return (
    <svg
      viewBox="0 0 300 450"
      className="mx-auto h-auto w-full drop-shadow-[0_18px_30px_rgba(40,10,80,0.45)]"
      aria-hidden
    >
      <defs>
        <linearGradient id="gk-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7b4ab8" />
          <stop offset="45%" stopColor="#a678e8" />
          <stop offset="100%" stopColor="#6d3fa8" />
        </linearGradient>
        <linearGradient id="gk-sign" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a678e8" />
          <stop offset="100%" stopColor="#7b4ab8" />
        </linearGradient>
        <linearGradient id="gk-collar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff3fb" />
          <stop offset="100%" stopColor="#e6c9f7" />
        </linearGradient>
        <radialGradient id="gk-dome" cx="35%" cy="28%" r="75%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#efe4ff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#d8c2f5" stopOpacity="0.7" />
        </radialGradient>
        <clipPath id="gk-globe">
          <circle cx={CX} cy="205" r="96" />
        </clipPath>
      </defs>

      {/* เงา */}
      <ellipse cx={CX} cy="440" rx="110" ry="9" fill="#2b1348" opacity="0.3" />

      {/* 👑 ป้ายมงกุฎด้านบน */}
      <g className="gacha-sign" style={{ transformOrigin: "150px 40px" }}>
        <path
          d="M60 92 L52 40 Q70 30 90 34 L105 10 Q125 2 150 6 Q175 2 195 10 L210 34 Q230 30 248 40 L240 92 Z"
          fill="url(#gk-sign)"
          stroke="#ffffff"
          strokeWidth="3.5"
        />
        {/* หลอดไฟรอบป้าย */}
        {[
          [62, 44],
          [82, 36],
          [104, 18],
          [126, 10],
          [150, 8],
          [174, 10],
          [196, 18],
          [218, 36],
          [238, 44],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="3.4"
            fill={i % 2 ? "#ffd76a" : "#fff0b3"}
            className="gacha-glow"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
        <text
          x={CX}
          y="30"
          textAnchor="middle"
          fontSize="9.5"
          fontWeight="800"
          fill="#ffffff"
          letterSpacing="0.5"
        >
          🧋 PunKubFang
        </text>
        <text
          x={CX}
          y="60"
          textAnchor="middle"
          fontSize="24"
          fontWeight="800"
          fill="#ffffff"
          stroke="#5b2fa0"
          strokeWidth="0.6"
        >
          สุ่มแก้วกับฟ่าง
        </text>
        <text
          x={CX}
          y="80"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="#ffe9ff"
        >
          Fang&apos;s Lucky Drink 💜
        </text>
      </g>
      {/* คอป้าย */}
      <rect
        x="96"
        y="90"
        width="108"
        height="22"
        rx="8"
        fill="#7b4ab8"
        stroke="#ffffff"
        strokeWidth="3"
      />
      {[112, 150, 188].map((x) => (
        <circle
          key={x}
          cx={x}
          cy="101"
          r="3"
          fill="#ffd76a"
          className="gacha-glow"
        />
      ))}

      {/* 🔮 โดมกลม */}
      <circle
        cx={CX}
        cy="205"
        r="98"
        fill="url(#gk-dome)"
        stroke="#ffffff"
        strokeWidth="4"
      />
      <g clipPath="url(#gk-globe)">
        {/* กองแคปซูลด้านล่างให้ดูเต็ม */}
        {[
          [60, 292, "#b48cff"],
          [100, 300, "#ffd76a"],
          [150, 302, "#ff8fb1"],
          [200, 300, "#8ee39a"],
          [240, 292, "#7ad1ff"],
        ].map(([x, y, c], i) => (
          <circle
            key={`b${i}`}
            cx={x}
            cy={y}
            r="19"
            fill={c as string}
            opacity="0.85"
          />
        ))}
        {CAPS.map(([x, y, a, b, ic], i) => (
          <g
            key={i}
            className={capsuleClass}
            style={{
              transformOrigin: `${x}px ${y}px`,
              animationDelay: `${(i * 0.17) % 1}s`,
              animationDuration:
                capsuleClass === "gacha-tumble"
                  ? `${0.7 + (i % 4) * 0.12}s`
                  : undefined,
            }}
          >
            <circle
              cx={x}
              cy={y}
              r="19"
              fill={b}
              stroke="#ffffff"
              strokeWidth="1.5"
            />
            <path d={`M${x - 19} ${y} a19 19 0 0 1 38 0 Z`} fill={a} />
            <circle
              cx={x - 7}
              cy={y - 9}
              r="3.5"
              fill="#ffffff"
              opacity="0.85"
            />
            {ic && (
              <text x={x} y={y + 12} textAnchor="middle" fontSize="12">
                {ic}
              </text>
            )}
          </g>
        ))}
      </g>
      {/* แสงสะท้อนโดม */}
      <path
        d="M78 176 q10 -50 60 -60"
        stroke="#ffffff"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle cx="220" cy="150" r="5" fill="#ffffff" opacity="0.8" />
      <circle
        cx={CX}
        cy="205"
        r="98"
        fill="none"
        stroke="#b48cff"
        strokeWidth="1.5"
        opacity="0.5"
      />

      {/* 🟣 คอ/ปกตู้ */}
      <rect
        x="70"
        y="292"
        width="160"
        height="22"
        rx="10"
        fill="url(#gk-collar)"
        stroke="#ffffff"
        strokeWidth="3"
      />
      {/* ตัวตู้ทรงกระบอก */}
      <path
        d="M78 312 h144 a6 6 0 0 1 6 6 v92 a14 14 0 0 1 -14 14 H86 a14 14 0 0 1 -14 -14 v-92 a6 6 0 0 1 6 -6 Z"
        fill="url(#gk-body)"
        stroke="#ffffff"
        strokeWidth="3.5"
      />
      {/* สติกเกอร์ดาว/หัวใจบนตู้ */}
      <text x="96" y="346" fontSize="12">
        ⭐
      </text>
      <text x="200" y="338" fontSize="12">
        ✨
      </text>
      <text x="206" y="392" fontSize="12">
        💜
      </text>

      {/* 🏷️ ป้าย "หมุนเลย!" */}
      <rect
        x="112"
        y="318"
        width="76"
        height="20"
        rx="10"
        fill="#5b2fa0"
        stroke="#ffd76a"
        strokeWidth="2"
      />
      <text
        x={CX}
        y="332"
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        fill="#ffffff"
      >
        หมุนเลย!
      </text>

      {/* 🎡 ลูกบิดใหญ่ */}
      <g
        className={phase === "knob" ? "gacha-ring" : ""}
        style={{ transformOrigin: "150px 362px" }}
      >
        <circle
          cx={CX}
          cy="362"
          r="26"
          fill="#f3e8ff"
          stroke="#b48cff"
          strokeWidth="3"
          strokeDasharray="6 5"
        />
      </g>
      <g
        className={phase === "knob" ? "gacha-knob" : ""}
        style={{ transformOrigin: "150px 362px" }}
      >
        <circle
          cx={CX}
          cy="362"
          r="20"
          fill="#8a5cf0"
          stroke="#ffffff"
          strokeWidth="3"
        />
        <rect x="145" y="344" width="10" height="36" rx="5" fill="#ffffff" />
        <circle cx={CX} cy="362" r="4" fill="#ffd76a" />
      </g>

      {/* 📤 ช่องรับแคปซูล */}
      <path
        d="M116 386 h68 a8 8 0 0 1 8 8 v22 a8 8 0 0 1 -8 8 h-68 a8 8 0 0 1 -8 -8 v-22 a8 8 0 0 1 8 -8 Z"
        fill="#3b1d66"
      />
      {/* 🥚 แคปซูลที่ไหลออกมา */}
      {(capOut || opening) && (
        <g
          className={
            phase === "out"
              ? "gacha-out"
              : phase === "suspense"
                ? "gacha-wiggle"
                : ""
          }
          style={{
            transformOrigin: "150px 410px",
            transform: opening ? "rotate(90deg)" : undefined,
          }}
        >
          <g
            className={opening ? "gacha-open-bottom" : ""}
            style={{ transformOrigin: "150px 410px" }}
          >
            <path
              d="M132 410 a18 18 0 0 0 36 0 Z"
              fill="#ffe4f0"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          </g>
          <g
            className={opening ? "gacha-open-top" : ""}
            style={{ transformOrigin: "150px 410px" }}
          >
            <path
              d="M132 410 a18 18 0 0 1 36 0 Z"
              fill="#b48cff"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
            <circle cx="143" cy="401" r="3" fill="#ffffff" opacity="0.9" />
          </g>
        </g>
      )}
      {opening && (
        <>
          <circle
            cx={CX}
            cy="408"
            r="24"
            fill="#ffffff"
            className="gacha-flash"
            style={{ transformOrigin: "150px 408px" }}
          />
          <g className="gacha-prize" style={{ transformOrigin: "150px 406px" }}>
            <circle
              cx={CX}
              cy="406"
              r="18"
              fill="#ffffff"
              stroke="#ffd76a"
              strokeWidth="3"
            />
            <text x={CX} y="413" textAnchor="middle" fontSize="20">
              {prize?.emoji ?? "🥤"}
            </text>
          </g>
        </>
      )}
      {/* ถาดรับ */}
      <path
        d="M104 418 h92 a8 8 0 0 1 8 8 v4 H96 v-4 a8 8 0 0 1 8 -8 Z"
        fill="#e6c9f7"
        stroke="#ffffff"
        strokeWidth="2"
      />

      {/* 🧱 ฐาน */}
      <rect
        x="60"
        y="424"
        width="180"
        height="16"
        rx="7"
        fill="#7b4ab8"
        stroke="#ffffff"
        strokeWidth="2.5"
      />
      <text
        x={CX}
        y="436"
        textAnchor="middle"
        fontSize="9"
        fontWeight="800"
        fill="#ffffff"
        letterSpacing="1"
      >
        🧋 PunKubFang
      </text>
    </svg>
  );
}
