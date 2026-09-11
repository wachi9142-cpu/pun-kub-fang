"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { SmoothiePalette } from "@/data/site";
import SmoothieCup from "@/components/SmoothieCup";
import Portal from "@/components/Portal";
import { ChefCat, HelperCat } from "@/components/MagicCats";

/**
 * 🪄🐱 MagicalDrinkAnimation — สองเหมียวปรุงเครื่องดื่มวิเศษ (เมนู "ไม่ปั่น")
 *
 * Component กลางตัวเดียว รับข้อมูลเมนูจริงเข้ามา แล้วเล่นครั้งเดียว (~5 วิ):
 *   prep → brew → fog → transform → reveal → wow → done
 *
 * ❌ ไม่ใช้กับ "มิกซ์กับฟ่าง" และ "ตักสด ปั่นฟิน" (มี flow ของตัวเอง)
 */

export type MagicalDrinkInput = {
  name: string;
  nameEn?: string;
  emoji?: string;
  palette: SmoothiePalette;
  /** ป้ายความหวานที่เลือก เช่น "หวานน้อย" */
  sweetLabel: string;
  /** "cup" = น้ำแข็งในแก้ว · "separate" = แยกน้ำแข็ง */
  ice: "cup" | "separate";
  /** ท็อปปิ้งที่เลือก (ชื่อไทย) */
  toppings: string[];
};

type Phase = "prep" | "brew" | "fog" | "transform" | "reveal" | "wow" | "done";

/* ⏱️ ไทม์ไลน์ (ms) ตามสเปค */
const TIMELINE: [Phase, number][] = [
  ["prep", 0],
  ["brew", 800],
  ["fog", 1700],
  ["transform", 2500],
  ["reveal", 3300],
  ["wow", 4200],
  ["done", 5000],
];
const AUTO_CLOSE_AT = 6200;

const STATUS: Record<Phase, string> = {
  prep: "🐾 เหมียวกำลังเตรียมแก้ว...",
  brew: "🪄 กำลังปรุงด้วยเวทมนตร์...",
  fog: "☁️ หมอกเวทมนตร์ปกคลุมแก้ว...",
  transform: "✨ กำลังเสก...",
  reveal: "👀 เปิดเผยแก้วของคุณ...",
  wow: "🪄 เวทมนตร์เสร็จแล้ว! พร้อมเสิร์ฟ ✨",
  done: "✨ ชงเสร็จแล้ว! แก้วนี้เป็นของคุณ 💜",
};

/* ---------- particle เบา ๆ: ดาว/หัวใจ/ฟอง (จำกัดจำนวน) ---------- */
const SPARKS = ["✨", "⭐", "💫", "✨", "💜", "🫧", "✨", "⭐"];

function Particles({
  count,
  seed = 0,
  rise,
}: {
  count: number;
  seed?: number;
  rise?: boolean;
}) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = ((i + seed) / count) * Math.PI * 2;
        return {
          emoji: SPARKS[(i + seed) % SPARKS.length],
          left: 50 + Math.cos(a) * (28 + (i % 3) * 8),
          top: 52 + Math.sin(a) * (22 + (i % 2) * 8),
          delay: (i % 5) * 0.12,
          dur: 1.4 + (i % 3) * 0.4,
        };
      }),
    [count, seed],
  );
  return (
    <>
      {items.map((p, i) => (
        <span
          key={i}
          className={`pointer-events-none absolute text-base sm:text-lg ${rise ? "animate-magic-particle-rise" : "animate-twinkle"}`}
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDelay: `${p.delay}s`,
              "--dur": `${p.dur}s`,
            } as React.CSSProperties
          }
        >
          {p.emoji}
        </span>
      ))}
    </>
  );
}

/* ---------- แก้วใสตอนกำลังปรุง: น้ำค่อย ๆ เติมขึ้นตามสีเมนู ---------- */
function BrewingGlass({
  palette,
  filling,
  stirring,
}: {
  palette: SmoothiePalette;
  filling: boolean;
  stirring: boolean;
}) {
  return (
    <svg
      viewBox="0 0 200 250"
      className="h-full w-full"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="brew-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.top} />
          <stop offset="100%" stopColor={palette.bottom} />
        </linearGradient>
        <clipPath id="brew-clip">
          <path d="M46 95 h108 l-12 132 a10 10 0 0 1 -10 9 H68 a10 10 0 0 1 -10 -9 Z" />
        </clipPath>
      </defs>
      <ellipse
        cx="100"
        cy="238"
        rx="62"
        ry="10"
        fill="#7b4ab8"
        opacity="0.14"
      />
      {/* น้ำที่เติมขึ้น */}
      <g clipPath="url(#brew-clip)">
        <rect
          x="40"
          y="95"
          width="120"
          height="150"
          fill="url(#brew-fill)"
          className={filling ? "animate-magic-liquid-fill" : ""}
          style={{
            transformOrigin: "100px 245px",
            transform: filling ? undefined : "scaleY(0)",
          }}
          opacity="0.92"
        />
        {/* ฟองเล็ก ๆ ตอนคน */}
        {stirring && (
          <>
            <circle
              cx="80"
              cy="200"
              r="4"
              fill="#fff"
              opacity="0.6"
              className="animate-magic-bubble"
            />
            <circle
              cx="110"
              cy="210"
              r="3"
              fill="#fff"
              opacity="0.6"
              className="animate-magic-bubble"
              style={{ animationDelay: "0.3s" }}
            />
            <circle
              cx="125"
              cy="195"
              r="3.5"
              fill="#fff"
              opacity="0.6"
              className="animate-magic-bubble"
              style={{ animationDelay: "0.6s" }}
            />
          </>
        )}
      </g>
      {/* ตัวแก้วใส */}
      <path
        d="M46 95 h108 l-12 132 a10 10 0 0 1 -10 9 H68 a10 10 0 0 1 -10 -9 Z"
        stroke="#b98cf0"
        strokeWidth="3"
        fill="#ffffff"
        fillOpacity="0.18"
      />
      <path
        d="M64 108 l-8 108"
        stroke="#ffffff"
        strokeOpacity="0.6"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <rect
        x="42"
        y="90"
        width="116"
        height="12"
        rx="6"
        fill="#ffffff"
        opacity="0.9"
      />
      {/* ช้อนคน */}
      {stirring && (
        <g
          className="animate-magic-spoon"
          style={{ transformOrigin: "100px 100px" }}
        >
          <path
            d="M100 40 l10 100"
            stroke="#7b4ab8"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <ellipse cx="111" cy="146" rx="9" ry="6" fill="#9161c9" />
        </g>
      )}
    </svg>
  );
}

/* ---------- แก้วจริงตอน Reveal: สี + น้ำแข็ง + ท็อปปิ้ง ตามข้อมูลเมนู ---------- */
function RevealCup({
  input,
  size,
}: {
  input: MagicalDrinkInput;
  size: number;
}) {
  const pearls = Math.min(input.toppings.length, 6);
  return (
    <div className="relative" style={{ width: size, height: size * 1.25 }}>
      <SmoothieCup
        palette={input.palette}
        emoji={input.emoji ?? "🥤"}
        size={size}
      />
      {/* 🧊 น้ำแข็งในแก้ว */}
      {input.ice === "cup" && (
        <div className="pointer-events-none absolute inset-0">
          {[
            { l: 30, t: 46, r: -12 },
            { l: 52, t: 44, r: 18 },
            { l: 62, t: 58, r: -6 },
            { l: 34, t: 62, r: 22 },
          ].map((c, i) => (
            <span
              key={i}
              className="absolute rounded-[3px] bg-white/70 ring-1 ring-aqua-300/70 shadow"
              style={{
                left: `${c.l}%`,
                top: `${c.t}%`,
                width: size * 0.09,
                height: size * 0.09,
                transform: `rotate(${c.r}deg)`,
              }}
            />
          ))}
        </div>
      )}
      {/* 🧋 ท็อปปิ้งก้นแก้ว */}
      {pearls > 0 && (
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: pearls }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full shadow"
              style={{
                left: `${34 + (i % 4) * 9 + (i > 3 ? 4 : 0)}%`,
                top: `${i > 3 ? 78 : 84}%`,
                width: size * 0.075,
                height: size * 0.075,
                background: i % 2 ? "#3b2f4a" : input.palette.bottom,
                opacity: 0.9,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MagicalDrinkAnimation({
  input,
  onDone,
}: {
  input: MagicalDrinkInput;
  onDone: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("prep");
  /* วัดความกว้างช่องแก้ว เพื่อให้แก้วจริงสเกลพอดีทุกขนาดจอ */
  const cupSlot = useRef<HTMLDivElement>(null);
  const [cupW, setCupW] = useState(110);

  useEffect(() => {
    const el = cupSlot.current;
    if (!el) return;
    const measure = () => setCupW(el.clientWidth || 110);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const timers = TIMELINE.map(([p, at]) =>
      window.setTimeout(() => setPhase(p), at),
    );
    const end = window.setTimeout(onDone, AUTO_CLOSE_AT);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(end);
    };
    // เล่นครั้งเดียวต่อการยืนยัน
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const idx = TIMELINE.findIndex(([p]) => p === phase);
  const at = (p: Phase) => idx >= TIMELINE.findIndex(([x]) => x === p);

  const showFog =
    phase === "fog" || phase === "transform" || phase === "reveal";
  const showReal = at("reveal");
  const isWow = at("wow");

  const chefPose =
    phase === "prep"
      ? "idle"
      : phase === "brew"
        ? "stir"
        : showReal
          ? isWow
            ? "wow"
            : "watch"
          : "watch";
  const helperPose =
    phase === "prep"
      ? "pour"
      : phase === "brew"
        ? "idle"
        : showReal
          ? isWow
            ? "wow"
            : "watch"
          : "watch";

  const summary = [
    input.sweetLabel,
    input.ice === "cup" ? "🧊 ใส่แก้ว" : "🧊 แยกน้ำแข็ง",
    ...(input.toppings.length ? [`🧋 ${input.toppings.join(", ")}`] : []),
  ];

  return (
    <Portal>
      <div className="animate-pop-in fixed inset-0 z-[120] grid place-items-center overflow-hidden bg-gradient-to-br from-grape-600 via-grape-500 to-blossom-500 px-4">
        {/* ประกายพื้นหลังจาง ๆ */}
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <Particles count={6} seed={3} rise />
        </div>

        <div className="relative w-full max-w-md">
          {/* ชื่อเมนู */}
          <div className="mb-3 text-center text-white">
            <p className="text-xs font-medium uppercase tracking-widest text-white/60">
              Magical Brewing
            </p>
            <h3 className="font-display text-xl font-bold sm:text-2xl">
              {input.emoji ?? "🥤"} {input.name}
            </h3>
          </div>

          {/* 🪄 ฉากโต๊ะปรุง */}
          <div className="relative mx-auto aspect-[4/3] w-full max-w-sm overflow-hidden rounded-[2rem] bg-white/15 shadow-card ring-1 ring-white/25 backdrop-blur-sm">
            {/* โต๊ะ */}
            <div className="absolute inset-x-0 bottom-0 h-[26%] rounded-t-[50%] bg-cream-100/90" />
            <div className="absolute inset-x-6 bottom-[22%] h-1.5 rounded-full bg-grape-200/70" />

            {/* เรืองแสงหลังแก้ว */}
            <div
              className={`absolute left-1/2 top-[48%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blossom-300 blur-2xl transition-opacity duration-700 ${
                showReal ? "animate-magic-glow opacity-70" : "opacity-20"
              }`}
            />

            {/* 🐈 หัวหน้าเชฟ (ซ้าย) */}
            <div className="absolute bottom-[14%] left-[2%] w-[30%] max-w-[120px]">
              <ChefCat pose={chefPose} size={999} className="!h-auto !w-full" />
            </div>
            {/* 🐈 ผู้ช่วย (ขวา) */}
            <div className="absolute bottom-[15%] right-[3%] w-[25%] max-w-[100px]">
              <HelperCat
                pose={helperPose}
                size={999}
                className="!h-auto !w-full"
                flip
              />
            </div>

            {/* 🥤 แก้ว (กลาง) */}
            <div className="absolute left-1/2 top-[50%] w-[34%] -translate-x-1/2 -translate-y-1/2">
              <div ref={cupSlot} className="relative aspect-[4/5] w-full">
                {!showReal && (
                  <BrewingGlass
                    palette={input.palette}
                    filling={at("brew")}
                    stirring={phase === "brew"}
                  />
                )}
                {showReal && (
                  <div
                    className={`absolute inset-0 grid place-items-center ${isWow ? "animate-serve-pop" : "animate-magic-reveal"}`}
                  >
                    <RevealCup input={input} size={cupW} />
                  </div>
                )}
              </div>

              {/* ประกายเวทมนตร์รอบแก้วตอนปรุง */}
              {phase === "brew" && (
                <div className="pointer-events-none absolute -inset-6">
                  <Particles count={5} />
                </div>
              )}
              {/* วงเวทน่ารัก ๆ */}
              {(phase === "brew" || phase === "transform") && (
                <div className="animate-magic-ring pointer-events-none absolute -inset-4 rounded-full border-2 border-dashed border-white/60" />
              )}
            </div>

            {/* ☁️ หมอกเวทมนตร์ */}
            {showFog && (
              <div
                className={`pointer-events-none absolute inset-0 ${phase === "reveal" ? "animate-magic-fog-out" : ""}`}
              >
                {[
                  { l: 30, t: 40, s: 110, d: 0 },
                  { l: 55, t: 36, s: 130, d: 0.15 },
                  { l: 42, t: 58, s: 120, d: 0.3 },
                  { l: 22, t: 56, s: 90, d: 0.45 },
                  { l: 66, t: 56, s: 100, d: 0.5 },
                  { l: 48, t: 24, s: 90, d: 0.6 },
                ].map((c, i) => (
                  <span
                    key={i}
                    className={`absolute rounded-full blur-xl ${phase === "transform" ? "animate-magic-fog-swirl" : "animate-magic-fog-rise"} ${
                      i % 2 ? "bg-aqua-300/80" : "bg-white/90"
                    }`}
                    style={{
                      left: `${c.l}%`,
                      top: `${c.t}%`,
                      width: c.s,
                      height: c.s * 0.7,
                      marginLeft: -c.s / 2,
                      animationDelay: `${c.d}s`,
                    }}
                  />
                ))}
                <Particles count={6} seed={1} rise />
              </div>
            )}

            {/* ✨ แสงวาบตอน transform */}
            {phase === "transform" && (
              <div className="animate-magic-flash pointer-events-none absolute inset-0 bg-white" />
            )}

            {/* 💜 หัวใจ/ประกายเด้งออกตอน WOW */}
            {isWow && (
              <div className="pointer-events-none absolute inset-0">
                {["💜", "✨", "💫", "🫧", "💜", "⭐"].map((e, i) => {
                  const a = (i / 6) * Math.PI * 2;
                  return (
                    <span
                      key={i}
                      className="animate-magic-heart-burst absolute left-1/2 top-1/2 text-lg sm:text-xl"
                      style={
                        {
                          "--tx": `${Math.cos(a) * 90}px`,
                          "--ty": `${Math.sin(a) * 70 - 30}px`,
                          animationDelay: `${i * 0.06}s`,
                        } as React.CSSProperties
                      }
                    >
                      {e}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {/* สถานะ + สรุปตัวเลือก */}
          <div className="mt-4 text-center">
            <p
              key={phase}
              className="animate-reveal-in font-display text-base font-bold text-white sm:text-lg"
            >
              {STATUS[phase]}
            </p>
            <div
              className={`mt-2 flex flex-wrap justify-center gap-1.5 transition-opacity duration-500 ${showReal ? "opacity-100" : "opacity-0"}`}
            >
              {summary.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-medium text-white"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onDone}
            className="absolute -top-2 right-0 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/80 hover:bg-white/25"
          >
            ข้าม ›
          </button>
        </div>
      </div>
    </Portal>
  );
}
