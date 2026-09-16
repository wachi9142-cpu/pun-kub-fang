"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  MENU_ITEMS,
  GACHA_MENUS,
  GACHA_FROM_MENU,
  GACHA_RARITY,
  type GachaMenu,
} from "@/data/site";
import SmoothieCup from "@/components/SmoothieCup";
import DrinkCustomizer from "@/components/DrinkCustomizer";
import { ImageCaption } from "@/components/sections/IngredientNote";

/**
 * 🎰 LuckyDrink — "สุ่มแก้วกับฟ่าง ✨" ตู้กาชาปองสุ่มเครื่องดื่ม
 * - ตู้ใหญ่กลางหน้า: โดมใส + แคปซูลหลากสี + ป้าย + ลูกบิด + ช่องรับ · idle ขยับ/เด้ง/ประกาย/glow
 * - ลำดับตอนหมุน: สั่น → แคปซูลกลิ้งในโดม → ลูกบิด/วงแหวนหมุน → แคปซูลไหลออกช่อง → หยุดลุ้น → เปิดแคปซูล ✨ → โชว์เมนู
 * - Data: GACHA_MENUS (เมนูลับ ไม่มีในเมนูหลัก) + GACHA_FROM_MENU (เมนูหลักบางส่วน ดึงจาก MENU_ITEMS จริง)
 *   ยังไม่กำหนดอัตราสุ่ม → ทุกใบโอกาสเท่ากัน · rarity เป็นแค่ป้าย
 * - "💜 เอาแก้วนี้!" → DrinkCustomizer เดิม → ตะกร้าเดิม (ไม่มีระบบใหม่)
 * - CSS animation ล้วน · reduced-motion → ข้ามการหมุน โชว์ผลเลย
 */

type Phase =
  | "idle"
  | "shake"
  | "tumble"
  | "knob"
  | "out"
  | "suspense"
  | "open"
  | "reveal";

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

/* 💬 ข้อความตามช่วง (ไม่พูดเกิน data จริง) */
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

/* สีแคปซูลในโดม (ม่วง ชมพู ครีม ขาว เหลือง เขียว) */
const CAPS = [
  [64, 118, "#b48cff", "#e9dcff", "☕"],
  [104, 96, "#ff8fb1", "#ffe0ea", ""],
  [146, 116, "#ffd76a", "#fff3c8", "🍓"],
  [82, 150, "#8ee39a", "#dcf8e0", ""],
  [124, 150, "#ffffff", "#f3ecff", "🍵"],
  [166, 152, "#f7e3c8", "#fff6ea", ""],
  [54, 154, "#c78bff", "#efe3ff", "🫧"],
  [188, 128, "#ff8fb1", "#ffe0ea", ""],
  [44, 128, "#ffd76a", "#fff3c8", ""],
] as const;

export default function LuckyDrink() {
  const pool = useMemo(buildPool, []);
  const [phase, setPhase] = useState<Phase>("idle");
  const [prize, setPrize] = useState<GachaMenu | null>(null);
  const [tick, setTick] = useState(0);
  const [customizing, setCustomizing] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const timers = useRef<number[]>([]);
  const pending = useRef<GachaMenu | null>(null);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clear, []);

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
    setPhase("shake"); //           0.0s ตู้สั่น
    at(800, () => setPhase("tumble")); //   0.8s แคปซูลกลิ้งในโดม
    for (let i = 0; i < 14; i++) at(800 + i * 110, () => setTick(i));
    at(2300, () => setPhase("knob")); //    2.3s หมุนลูกบิด/วงแหวน
    at(3100, () => setPhase("out")); //     3.1s แคปซูลไหลออก
    at(4000, () => setPhase("suspense")); //4.0s หยุดลุ้น
    at(4900, () => setPhase("open")); //    4.9s เปิดแคปซูล
    at(5500, () => {
      setPrize(pending.current);
      setPhase("reveal");
    });
  };

  const busy = BUSY.includes(phase);
  const capsuleClass =
    phase === "shake"
      ? "gacha-cap-idle"
      : phase === "tumble" || phase === "knob"
        ? "gacha-tumble"
        : phase === "idle"
          ? "gacha-cap-idle"
          : "";
  const ticker = pool[tick % pool.length];
  const rar = prize ? GACHA_RARITY[prize.rarity] : null;

  return (
    <section
      id="lucky"
      className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16"
      aria-labelledby="lucky-title"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-grape-700 via-grape-500 to-blossom-400 px-4 pb-8 pt-10 text-white shadow-card ring-1 ring-white/30 sm:px-8 sm:pt-12">
        {/* ✨ พื้นหลัง: แสงฟุ้ง + ดาว/หัวใจ/ฟอง */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute -bottom-28 -right-24 h-96 w-96 rounded-full bg-blossom-200/30 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-grape-300/25 blur-3xl" />
          {[
            ["✨", "5%", "12%", "0s"],
            ["💜", "12%", "70%", "1.1s"],
            ["⭐", "22%", "30%", "0.4s"],
            ["🫧", "30%", "86%", "1.7s"],
            ["✨", "70%", "20%", "0.8s"],
            ["💜", "80%", "60%", "2.2s"],
            ["⭐", "92%", "30%", "1.4s"],
            ["🫧", "88%", "84%", "0.2s"],
            ["✨", "50%", "6%", "2.6s"],
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

        {/* 📝 หัวเรื่อง */}
        <div className="relative mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold ring-1 ring-white/40 backdrop-blur">
            🎰 Fang&apos;s Lucky Gacha · ตู้กาชาสุ่มน้ำ
          </span>
          <h2
            id="lucky-title"
            className="font-display mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl"
          >
            🎲 สุ่มแก้วกับฟ่าง ✨
          </h2>
          <p className="font-display mt-2 text-lg font-semibold text-white/95 sm:text-xl">
            ไม่รู้จะกินอะไร? ให้ตู้กาชาสุ่มให้เลย! 💜
          </p>
          <p className="mt-3 text-sm text-white/80 sm:text-base">
            กาชานี้ไม่ใช่กาชาธรรมดา 👀✨ ข้างในไม่ได้มีแค่เมนูจากหน้าหลัก
            แต่มี <b>เมนูมั่ว ๆ เมนูลับ เมนูทดลอง</b> ที่ฟ่างจับมามิกซ์เอง
            บางแก้วไม่มีในหมวดไหนเลย เช่น{" "}
            <b>“มะขามเปรี้ยวซ่า” 🌶️🫧</b> และถ้าดวงดี 🍀
            อาจเจอเมนูปั่น/สมูทตี้แปลก ๆ ที่ไม่ได้อยู่ในหมวดปกติด้วย!
          </p>
        </div>

        {/* 🎰 ตู้ + ผล */}
        <div className="relative mx-auto mt-6 grid max-w-5xl items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
          <div className="mx-auto w-full max-w-[380px] sm:max-w-[420px]">
            <div
              className={`relative ${phase === "idle" ? "gacha-idle" : ""} ${phase === "shake" || phase === "tumble" ? "gacha-shake" : ""}`}
            >
              <GachaMachine
                phase={phase}
                capsuleClass={capsuleClass}
                prize={phase === "reveal" || phase === "open" ? (prize ?? pending.current) : null}
              />
              {/* ✨ ประกายวิ่งผ่านตู้ตอน idle */}
              {phase === "idle" && (
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
                  <div className="gacha-shine absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </div>
              )}
            </div>

            {/* 💬 สถานะ */}
            <p
              className="font-display mt-3 min-h-[1.75rem] text-center text-sm font-semibold text-white sm:text-base"
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

            <div className="mt-3 text-center">
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
                    : "🎰 หมุนเลย!"}
              </button>
            </div>
          </div>

          {/* 🎉 ผลลัพธ์ / กล่องจุดขาย */}
          <div className="w-full">
            {phase === "reveal" && prize && rar ? (
              <div className="gacha-reveal relative rounded-3xl bg-white p-5 text-ink shadow-card ring-1 ring-white/70">
                <Confetti />
                <p className="font-display text-center text-lg font-bold text-grape-600 sm:text-xl">
                  🎉 ดวงวันนี้ของคุณคือ...
                </p>
                <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                  <div className="relative grid h-32 w-32 shrink-0 place-items-center overflow-hidden rounded-3xl bg-gradient-to-b from-grape-50 to-blossom-50/70 ring-2 ring-grape-100">
                    {prize.image && !imgFailed ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={prize.image}
                        alt={prize.name}
                        onError={() => setImgFailed(true)}
                        className="h-full w-full object-cover"
                      />
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
                      style={{ background: `${rar.color}55` }}
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
            ) : (
              <WhyBox />
            )}
          </div>
        </div>

        {/* 🥤 กล่องจุดขาย (โชว์ใต้ตู้เมื่อมีผลลัพธ์ทางขวาแล้ว) */}
        {phase === "reveal" && (
          <div className="relative mx-auto mt-6 max-w-5xl">
            <WhyBox compact />
          </div>
        )}
      </div>

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

/* 🥤 แล้วทำไมต้องสุ่มกับฟ่าง? */
function WhyBox({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`rounded-3xl bg-white/15 p-5 ring-1 ring-white/30 backdrop-blur ${compact ? "sm:flex sm:items-center sm:gap-5" : ""}`}
    >
      <h3 className="font-display text-lg font-bold sm:text-xl">
        แล้วทำไมต้องสุ่มกับฟ่าง? 👀💜
      </h3>
      <div
        className={`mt-2 space-y-1.5 text-sm text-white/90 ${compact ? "sm:mt-0" : ""}`}
      >
        <p>เพราะกาชาของฟ่างไม่ได้มีแค่เมนูในเมนูหลัก!</p>
        <p>
          มีทั้งเมนูทดลอง เมนูมิกซ์ เมนูมั่ว เมนูแปลก
          และเมนูลับที่ฟ่างลองทำเอง บางแก้วไม่มีอยู่ในหมวดไหนเลย 😂
        </p>
        <p>
          แต่ถ้าอร่อยจนลูกค้าถามหาบ่อย ๆ
          อาจได้เลื่อนขั้นมาเป็นเมนูหลักของร้านก็ได้นะ! ✨
        </p>
      </div>
      {!compact && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {(Object.keys(GACHA_RARITY) as (keyof typeof GACHA_RARITY)[]).map(
            (k) => (
              <span
                key={k}
                className="inline-flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-bold text-ink"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: GACHA_RARITY[k].color }}
                />
                {GACHA_RARITY[k].emoji} {GACHA_RARITY[k].label}
              </span>
            ),
          )}
        </div>
      )}
    </div>
  );
}

/* 🎊 คอนเฟตติ/หัวใจกระจายตอนเปิด */
function Confetti() {
  const bits = ["✨", "💜", "⭐", "💖", "🫧", "✨", "💜", "⭐", "🎉", "✨", "💖", "⭐"];
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

/* 🎰 ตู้กาชาปอง SVG ขนาดใหญ่ */
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
  const ringSpin = phase === "knob" || phase === "tumble";
  return (
    <svg
      viewBox="0 0 240 340"
      className="mx-auto h-auto w-full drop-shadow-[0_18px_30px_rgba(40,10,80,0.45)]"
      aria-hidden
    >
      <defs>
        <linearGradient id="gk-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f6efff" />
          <stop offset="100%" stopColor="#cdb6ee" />
        </linearGradient>
        <linearGradient id="gk-sign" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8a5cf0" />
          <stop offset="100%" stopColor="#c46fd6" />
        </linearGradient>
        <radialGradient id="gk-dome" cx="38%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#e6d8ff" stopOpacity="0.5" />
        </radialGradient>
        <radialGradient id="gk-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <clipPath id="gk-domeclip">
          <path d="M34 178 a86 86 0 0 1 172 0 Z" />
        </clipPath>
      </defs>

      {/* เงา */}
      <ellipse cx="120" cy="330" rx="96" ry="9" fill="#2b1348" opacity="0.3" />

      {/* 🪧 ป้ายบน */}
      <g className="gacha-sign" style={{ transformOrigin: "120px 30px" }}>
        <rect x="46" y="8" width="148" height="44" rx="14" fill="url(#gk-sign)" stroke="#ffffff" strokeWidth="3" />
        <text x="120" y="27" textAnchor="middle" fontSize="11" fontWeight="800" fill="#ffffff" letterSpacing="1.5">
          PUN KUB FANG
        </text>
        <text x="120" y="44" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ffffff">
          สุ่มแก้วกับฟ่าง ✨
        </text>
        <circle cx="52" cy="14" r="3" fill="#ffd76a" />
        <circle cx="188" cy="14" r="3" fill="#ffd76a" />
        <circle cx="52" cy="46" r="3" fill="#ff8fb1" />
        <circle cx="188" cy="46" r="3" fill="#ff8fb1" />
      </g>

      {/* 🔮 โดม */}
      <path d="M34 178 a86 86 0 0 1 172 0 Z" fill="url(#gk-dome)" stroke="#ffffff" strokeWidth="4" />
      <g clipPath="url(#gk-domeclip)">
        {CAPS.map(([x, y, a, b, ic], i) => (
          <g
            key={i}
            className={capsuleClass}
            style={{
              transformOrigin: `${x}px ${y}px`,
              animationDelay: `${(i * 0.17) % 1}s`,
              animationDuration:
                capsuleClass === "gacha-tumble" ? `${0.7 + (i % 4) * 0.12}s` : undefined,
            }}
          >
            <circle cx={x} cy={y} r="17" fill={b} stroke="#ffffff" strokeWidth="1.5" />
            <path d={`M${x - 17} ${y} a17 17 0 0 1 34 0 Z`} fill={a} />
            <circle cx={x - 6} cy={y - 8} r="3.2" fill="#ffffff" opacity="0.85" />
            {ic && (
              <text x={x} y={y + 11} textAnchor="middle" fontSize="11">
                {ic}
              </text>
            )}
          </g>
        ))}
      </g>
      {/* แสงโดม */}
      <path d="M58 150 q8 -46 54 -56" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
      <circle cx="120" cy="90" r="60" fill="url(#gk-glow)" className="gacha-glow" opacity="0.4" />

      {/* 🟣 ตัวตู้ */}
      <rect x="30" y="176" width="180" height="134" rx="22" fill="url(#gk-body)" stroke="#ffffff" strokeWidth="4" />
      <rect x="30" y="176" width="180" height="16" fill="#8a5cf0" opacity="0.9" />
      {/* ไฟรอบตู้ */}
      {[48, 72, 96, 120, 144, 168, 192].map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy="184"
          r="3.2"
          fill={i % 2 ? "#ffd76a" : "#ff8fb1"}
          className="gacha-glow"
          style={{ animationDelay: `${i * 0.25}s` }}
        />
      ))}

      {/* 🎡 วงแหวน + ลูกบิด */}
      <g className={ringSpin ? "gacha-ring" : ""} style={{ transformOrigin: "78px 246px" }}>
        <circle cx="78" cy="246" r="30" fill="#ffffff" stroke="#b48cff" strokeWidth="5" strokeDasharray="8 6" />
      </g>
      <g className={phase === "knob" ? "gacha-knob" : ""} style={{ transformOrigin: "78px 246px" }}>
        <circle cx="78" cy="246" r="21" fill="#8a5cf0" />
        <circle cx="78" cy="246" r="15" fill="#ffffff" />
        <rect x="73" y="226" width="10" height="40" rx="5" fill="#8a5cf0" />
        <circle cx="78" cy="246" r="4" fill="#ffd76a" />
      </g>

      {/* 📤 ช่องรับ */}
      <path d="M124 214 h64 a10 10 0 0 1 10 10 v50 a10 10 0 0 1 -10 10 h-64 a10 10 0 0 1 -10 -10 v-50 a10 10 0 0 1 10 -10 Z" fill="#3b1d66" />
      <path d="M118 279 h80 v6 a6 6 0 0 1 -6 6 h-68 a6 6 0 0 1 -6 -6 Z" fill="#d9c6f5" />
      <text x="156" y="232" textAnchor="middle" fontSize="9" fontWeight="700" fill="#e9dcff">
        PUSH ▼
      </text>

      {/* 🥚 แคปซูลที่ไหลออกมา (ในช่องรับ) */}
      {(capOut || opening) && (
        <g
          className={phase === "out" ? "gacha-out" : phase === "suspense" ? "gacha-wiggle" : ""}
          style={{ transformOrigin: "156px 258px", transform: !opening ? undefined : "rotate(90deg)" }}
        >
          {/* ครึ่งล่าง */}
          <g className={opening ? "gacha-open-bottom" : ""} style={{ transformOrigin: "156px 258px" }}>
            <path d="M136 258 a20 20 0 0 0 40 0 Z" fill="#ffe4f0" stroke="#ffffff" strokeWidth="1.5" />
          </g>
          {/* ครึ่งบน */}
          <g className={opening ? "gacha-open-top" : ""} style={{ transformOrigin: "156px 258px" }}>
            <path d="M136 258 a20 20 0 0 1 40 0 Z" fill="#b48cff" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="148" cy="248" r="3.5" fill="#ffffff" opacity="0.9" />
          </g>
          <rect x="136" y="256" width="40" height="4" fill="#ffffff" opacity="0.8" />
        </g>
      )}
      {/* ✨ ของรางวัลโผล่ตอนเปิด */}
      {opening && (
        <>
          <circle cx="156" cy="256" r="26" fill="#ffffff" className="gacha-flash" style={{ transformOrigin: "156px 256px" }} />
          <g className="gacha-prize" style={{ transformOrigin: "156px 252px" }}>
            <circle cx="156" cy="252" r="20" fill="#ffffff" stroke="#ffd76a" strokeWidth="3" />
            <text x="156" y="260" textAnchor="middle" fontSize="22">
              {prize?.emoji ?? "🥤"}
            </text>
          </g>
        </>
      )}

      {/* ขาตู้ */}
      <rect x="46" y="310" width="30" height="14" rx="5" fill="#7b4ab8" />
      <rect x="164" y="310" width="30" height="14" rx="5" fill="#7b4ab8" />
    </svg>
  );
}
