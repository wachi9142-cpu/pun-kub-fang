"use client";

import { useMemo } from "react";
import { MENU_ITEMS, type MenuItem } from "@/data/site";

/**
 * 🔥 HotHero — หัวหมวด "เมนูร้อน" คอนเซปต์ "อุ่น ๆ ฮีลใจ" ☕💜
 * - แก้วร้อนหลายใบ สี/อีโมจิ ดึงจาก MENU_ITEMS (category "hot") — ไม่ hard-code ต่อเมนู
 *   ส่ง prop `items` เพื่อกำหนดชุดเอง · component `HotCup` ใช้ซ้ำได้กับทุกเครื่องดื่ม
 * - ไออุ่น (3 เส้น/แก้วหลัก) + เส้นกลิ่นหอม + องค์ประกอบตามชนิด (เมล็ดกาแฟ / ใบชา / ผงโกโก้ / คาราเมล)
 * - แก้วเด้งเบา ๆ ตอนเริ่ม แล้วลอยช้า ๆ · ประกายเป็นบางจังหวะ · รองรับ prefers-reduced-motion
 * - โทนอุ่น Cream/Caramel/Honey/Coffee/Cocoa + Lavender/Purple (ไม่แดง/ส้มจัด)
 */

/* องค์ประกอบเล็ก ๆ ตามชนิดเครื่องดื่ม (ดูจาก emoji/ชื่อ) */
function accentOf(
  item: MenuItem,
): "bean" | "leaf" | "cocoa" | "caramel" | "lemon" | "milk" {
  const n = item.name;
  if (item.emoji === "🍫" || n.includes("โกโก้") || n.includes("มอคค่า"))
    return "cocoa";
  if (item.emoji === "🍮" || n.includes("คาราเมล")) return "caramel";
  if (item.emoji === "🍋" || n.includes("มะนาว")) return "lemon";
  if (item.emoji === "🍵" || item.emoji === "🧋" || n.includes("ชา"))
    return "leaf";
  if (item.emoji === "🥛" || n.includes("นม")) return "milk";
  return "bean";
}

function Accent({
  kind,
  x,
  y,
  delay,
}: {
  kind: ReturnType<typeof accentOf>;
  x: number;
  y: number;
  delay: string;
}) {
  const g = (children: React.ReactNode) => (
    <g
      className="animate-floaty"
      style={{ transformOrigin: `${x}px ${y}px`, animationDelay: delay }}
    >
      {children}
    </g>
  );
  switch (kind) {
    case "bean":
      return g(
        <g transform={`rotate(-25 ${x} ${y})`}>
          <ellipse cx={x} cy={y} rx="7" ry="10" fill="#4a2a17" />
          <path
            d={`M${x} ${y - 8} C${x - 3} ${y - 3} ${x + 3} ${y + 3} ${x} ${y + 8}`}
            stroke="#22110a"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
        </g>,
      );
    case "leaf":
      return g(
        <g transform={`rotate(30 ${x} ${y})`}>
          <path
            d={`M${x} ${y + 12} C${x - 9} ${y + 4} ${x - 10} ${y - 10} ${x} ${y - 16} C${x + 10} ${y - 10} ${x + 9} ${y + 4} ${x} ${y + 12} Z`}
            fill="#7cc27a"
          />
          <path
            d={`M${x} ${y + 10} V${y - 13}`}
            stroke="#4f8a3a"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>,
      );
    case "cocoa":
      return g(
        <>
          <circle cx={x} cy={y} r="3" fill="#6b4a30" />
          <circle cx={x + 8} cy={y + 5} r="2.2" fill="#8a5a3c" />
          <circle cx={x - 6} cy={y + 6} r="2" fill="#6b4a30" />
          <circle cx={x + 3} cy={y - 7} r="1.8" fill="#8a5a3c" />
        </>,
      );
    case "caramel":
      return g(
        <>
          <path
            d={`M${x - 10} ${y} q5 -8 10 0 t10 0`}
            stroke="#f0b657"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <ellipse cx={x + 10} cy={y + 8} rx="3" ry="4" fill="#f0b657" />
        </>,
      );
    case "lemon":
      return g(
        <>
          <circle cx={x} cy={y} r="9" fill="#f4d35e" />
          <circle cx={x} cy={y} r="6.5" fill="#fff7c2" />
          {Array.from({ length: 6 }).map((_, i) => (
            <path
              key={i}
              d={`M${x} ${y} L${x} ${y - 6}`}
              stroke="#f4d35e"
              strokeWidth="1.2"
              transform={`rotate(${i * 60} ${x} ${y})`}
            />
          ))}
        </>,
      );
    default:
      return g(
        <>
          <circle
            cx={x}
            cy={y}
            r="5"
            fill="#ffffff"
            stroke="#e6d9f5"
            strokeWidth="1.2"
          />
          <circle
            cx={x + 8}
            cy={y + 6}
            r="3"
            fill="#ffffff"
            stroke="#e6d9f5"
            strokeWidth="1"
          />
        </>,
      );
  }
}

/** แก้วร้อนใช้ร่วมกันทุกเมนู — สีจาก palette ของเมนู */
export function HotCup({
  item,
  x,
  y,
  scale = 1,
  delay,
  uid,
  main,
}: {
  item: MenuItem;
  x: number;
  y: number;
  scale?: number;
  delay: string;
  uid: string;
  main?: boolean;
}) {
  const { top, bottom, foam } = item.palette;
  return (
    <g
      className={main ? "animate-serve-pop" : ""}
      style={{ transformOrigin: `${x}px ${y + 90 * scale}px` }}
    >
      <g
        className="animate-floaty-slow"
        style={{
          transformOrigin: `${x}px ${y + 90 * scale}px`,
          animationDelay: delay,
        }}
      >
        <g transform={`translate(${x} ${y}) scale(${scale})`}>
          <defs>
            <linearGradient id={`hc-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={top} />
              <stop offset="100%" stopColor={bottom} />
            </linearGradient>
          </defs>
          {/* ☁️ ไออุ่น + เส้นกลิ่นหอม */}
          {[
            { dx: -16, d: "0s", dur: "4.6s", w: 12 },
            { dx: 0, d: "1.5s", dur: "5.2s", w: 15 },
            { dx: 16, d: "2.8s", dur: "4.8s", w: 11 },
          ].map((s, i) => (
            <g
              key={i}
              className="animate-coffee-steam"
              style={{
                transformOrigin: `${s.dx}px 0px`,
                animationDelay: s.d,
                animationDuration: s.dur,
              }}
            >
              <path
                d={`M${s.dx} 0 C${s.dx - s.w} -14 ${s.dx + s.w} -26 ${s.dx} -40 C${s.dx - s.w} -54 ${s.dx + s.w} -66 ${s.dx} -82`}
                stroke="#fff3e2"
                strokeWidth={s.w * 0.7}
                strokeLinecap="round"
                opacity="0.85"
              />
              <path
                d={`M${s.dx} 0 C${s.dx - s.w} -14 ${s.dx + s.w} -26 ${s.dx} -40 C${s.dx - s.w} -54 ${s.dx + s.w} -66 ${s.dx} -82`}
                stroke="#ffffff"
                strokeWidth={s.w * 0.25}
                strokeLinecap="round"
                opacity="0.8"
              />
            </g>
          ))}
          {/* จานรอง */}
          <ellipse
            cx="0"
            cy="92"
            rx="60"
            ry="10"
            fill="#3e2314"
            opacity="0.18"
          />
          <ellipse cx="0" cy="88" rx="54" ry="8" fill="#fbf7ff" />
          {/* หูแก้ว */}
          <path
            d="M40 24 c22 -4 28 28 6 36 l-6 1"
            stroke="#e6d9f5"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M40 24 c22 -4 28 28 6 36 l-6 1"
            stroke="#ffffff"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* ตัวแก้ว */}
          <path
            d="M-44 6 h88 l-8 66 a10 10 0 0 1 -10 9 H-26 a10 10 0 0 1 -10 -9 Z"
            fill="#ffffff"
            stroke="#e6d9f5"
            strokeWidth="2.2"
          />
          <path
            d="M-40 34 h80 l-1.5 14 H-38.5 Z"
            fill="#c9b3e8"
            opacity="0.8"
          />
          <circle cx="0" cy="41" r="9" fill="#ffffff" />
          <text x="0" y="45" textAnchor="middle" fontSize="10">
            {item.emoji}
          </text>
          <circle cx="-14" cy="64" r="2" fill="#3a2f45" />
          <circle cx="14" cy="64" r="2" fill="#3a2f45" />
          <path
            d="M-6 69 q6 4 12 0"
            stroke="#3a2f45"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <ellipse cx="-24" cy="68" rx="3.5" ry="2" fill="#f5b7c8" />
          <ellipse cx="24" cy="68" rx="3.5" ry="2" fill="#f5b7c8" />
          {/* ขอบ + เครื่องดื่ม (สีจริงจาก palette) */}
          <ellipse
            cx="0"
            cy="6"
            rx="50"
            ry="13"
            fill="#fbf7ff"
            stroke="#e6d9f5"
            strokeWidth="2.2"
          />
          <ellipse cx="0" cy="6" rx="43" ry="9.5" fill={`url(#hc-${uid})`} />
          <ellipse cx="-10" cy="3" rx="14" ry="4" fill={foam} opacity="0.55" />
        </g>
      </g>
    </g>
  );
}

export function HotHeroArt({
  items,
  className = "",
}: {
  items?: MenuItem[];
  className?: string;
}) {
  const list = useMemo(() => {
    const src = items?.length
      ? items
      : MENU_ITEMS.filter((m) => m.category === "hot");
    return src.slice(0, 5);
  }, [items]);
  const main = list[0];
  const others = list.slice(1, 5);
  const pos = [
    { x: 92, y: 128, s: 0.62, d: "0.5s" },
    { x: 330, y: 128, s: 0.62, d: "1.2s" },
    { x: 130, y: 196, s: 0.5, d: "1.8s" },
    { x: 292, y: 196, s: 0.5, d: "0.9s" },
  ];
  if (!main) return null;

  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden>
      <svg viewBox="0 0 420 300" className="h-full w-full" fill="none">
        <defs>
          <radialGradient id="hot-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#f6c25c" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#e9cfa5" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#c9b3e8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle
          cx="210"
          cy="160"
          r="140"
          fill="url(#hot-glow)"
          className="animate-magic-glow"
          style={{ transformOrigin: "210px 160px", animationDuration: "6s" }}
        />
        <circle cx="210" cy="160" r="112" fill="#e9cfa5" opacity="0.3" />

        {/* แก้วรอบ ๆ */}
        {others.map((it, i) => (
          <g key={it.id}>
            <HotCup
              item={it}
              x={pos[i].x}
              y={pos[i].y}
              scale={pos[i].s}
              delay={pos[i].d}
              uid={it.id}
            />
            <Accent
              kind={accentOf(it)}
              x={pos[i].x + (i % 2 ? 38 : -38)}
              y={pos[i].y + 84}
              delay={pos[i].d}
            />
          </g>
        ))}

        {/* แก้วหลัก */}
        <HotCup
          item={main}
          x={210}
          y={128}
          scale={1.05}
          delay="0s"
          uid={main.id}
          main
        />
        <Accent kind={accentOf(main)} x={150} y={252} delay="0.3s" />
        <Accent kind={accentOf(main)} x={272} y={256} delay="1.4s" />

        {/* ✨ ประกายเป็นบางจังหวะ */}
        {[
          [120, 60, "#f6c25c", "0s"],
          [300, 48, "#d492e0", "1.3s"],
          [66, 210, "#ffffff", "2.4s"],
          [356, 214, "#f6c25c", "0.7s"],
        ].map(([x, y, c, d], i) => (
          <g
            key={i}
            className="animate-twinkle"
            style={{
              transformOrigin: `${x}px ${y}px`,
              animationDelay: d as string,
            }}
          >
            <path
              d={`M${x} ${(y as number) - 6} l1.8 4.2 l4.2 1.8 l-4.2 1.8 l-1.8 4.2 l-1.8 -4.2 l-4.2 -1.8 l4.2 -1.8 Z`}
              fill={c as string}
            />
          </g>
        ))}
        {/* 💜 หัวใจอุ่น ๆ */}
        <g
          className="animate-floaty"
          style={{ transformOrigin: "382px 90px", animationDelay: "0.6s" }}
        >
          <path
            d="M378 92 c-5 -7 3 -12 5 -5 c2 -7 10 -2 5 5 l-5 5 Z"
            fill="#c9b3e8"
          />
        </g>
      </svg>
    </div>
  );
}

export default function HotHero({ items }: { items?: MenuItem[] }) {
  return (
    <div className="relative mb-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#fff3e2] via-[#f3e6d8] to-grape-100 px-6 py-8 ring-1 ring-white/80 sm:px-10 lg:py-10">
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#f6c25c]/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-[#c9782e]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 -top-8 h-80 w-80 rounded-full bg-grape-300/35 blur-3xl" />
      <div className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_440px]">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-[#8a5a3c] ring-1 ring-[#e9cfa5]">
            🔥 อุ่น ๆ ฮีลใจ · เพิ่งชงเสร็จ กำลังเสิร์ฟ ☕
          </span>
          <h1 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
            เมนูร้อน
          </h1>
          <p className="font-display mt-1 text-lg font-semibold text-blossom-400">
            Hot Drinks
          </p>
          <p className="mx-auto mt-3 max-w-xl text-ink/60 lg:mx-0">
            ขอเครื่องดื่มร้อน ๆ สักแก้ว นั่งพักแป๊บหนึ่งก็ยังดี — กาแฟ ลาเต้
            โกโก้ นมสด ชาไทย ชาเขียว อู่หลง ชามะนาว ไออุ่นลอยขึ้นมาพร้อมกลิ่นหอม
            ☕💜
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5 lg:justify-start">
            {[
              ["☕ กาแฟ", "#5b3a24"],
              ["🍫 โกโก้", "#6b4a30"],
              ["🥛 นมสด", "#f3d9b4"],
              ["🍮 คาราเมล", "#f0b657"],
              ["🍵 ชา", "#cf6f26"],
              ["🍋 ชามะนาว", "#c9a52a"],
            ].map(([t, c]) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-ink ring-1 ring-ink/5"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full ring-1 ring-white"
                  style={{ background: c }}
                />
                {t}
              </span>
            ))}
          </div>
        </div>
        <HotHeroArt
          items={items}
          className="order-first mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:order-none lg:max-w-none"
        />
      </div>
    </div>
  );
}
