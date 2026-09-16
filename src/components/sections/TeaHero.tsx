"use client";

import { useMemo } from "react";
import { MENU_ITEMS, type MenuItem } from "@/data/site";

/**
 * 🍵 TeaHero — หัวหมวด "เมนูชา" คอนเซปต์ "ชาหอมเข้ม สีสวย สดชื่น และมีกลิ่นอายของใบชา" 🍵🌿✨
 * - แก้วชาหลายสี (สีดึงจาก palette ของ MENU_ITEMS หมวด tea — ไม่ hard-code) แก้วหลักชาไทยอำพันเข้ม
 * - กลิ่นหอมของใบชา = เส้นโค้งโปร่ง ๆ สีครีม/เขียวอ่อน ลอยขึ้น (ไม่ใช่ควัน) + ใบชาลอยตามกลิ่น
 * - แสงวิ่งผ่านแก้วเป็นบางจังหวะ · ประกายทอง/ครีม · ชิ้นผลไม้สำหรับชาผลไม้
 * - พื้นหลัง Deep Green → Tea Amber → Deep Purple (Cream เป็นตัวอักษร) · รองรับ prefers-reduced-motion
 */

function Leaf({
  x,
  y,
  r,
  s = 1,
  color = "#5f9a3f",
  vein = "#2f5f22",
}: {
  x: number;
  y: number;
  r: number;
  s?: number;
  color?: string;
  vein?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0 C-14 -10 -16 -30 0 -44 C16 -30 14 -10 0 0 Z" fill={color} />
      <path
        d="M0 -2 V-40 M0 -14 l-6 -6 M0 -14 l6 -6 M0 -24 l-5 -5 M0 -24 l5 -5"
        stroke={vein}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </g>
  );
}

function Aroma({
  x,
  w,
  delay,
  dur,
  tint,
}: {
  x: number;
  w: number;
  delay: string;
  dur: string;
  tint: string;
}) {
  const d = `M${x} 0 C${x - w} -18 ${x + w} -34 ${x} -52 C${x - w} -70 ${x + w} -86 ${x} -104 C${x - w * 0.8} -118 ${x + w * 0.6} -130 ${x} -142`;
  return (
    <g
      className="animate-tea-aroma"
      style={{
        transformOrigin: `${x}px 0px`,
        animationDelay: delay,
        animationDuration: dur,
      }}
    >
      <path
        d={d}
        stroke={tint}
        strokeWidth={w * 0.9}
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d={d}
        stroke="#fff6dc"
        strokeWidth={w * 0.32}
        strokeLinecap="round"
        opacity="0.8"
      />
    </g>
  );
}

/** แก้วชาใช้ร่วมกันทุกรายการ — สีจาก palette ของเมนู */
function TeaGlass({
  item,
  x,
  y,
  scale = 1,
  delay,
  uid,
  main,
  fruit,
}: {
  item: MenuItem;
  x: number;
  y: number;
  scale?: number;
  delay: string;
  uid: string;
  main?: boolean;
  fruit?: string;
}) {
  const { top, bottom, foam } = item.palette;
  return (
    <g
      className="animate-floaty-slow"
      style={{
        transformOrigin: `${x}px ${y + 130 * scale}px`,
        animationDelay: delay,
      }}
    >
      <g transform={`translate(${x} ${y}) scale(${scale})`}>
        <defs>
          <linearGradient id={`tg-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={top} />
            <stop offset="100%" stopColor={bottom} />
          </linearGradient>
          <clipPath id={`tgc-${uid}`}>
            <path d="M-42 0 h84 l-8 118 a10 10 0 0 1 -10 9 H-24 a10 10 0 0 1 -10 -9 Z" />
          </clipPath>
        </defs>
        <ellipse cx="0" cy="134" rx="52" ry="8" fill="#1f2a14" opacity="0.35" />
        {/* น้ำชา อิ่มสี */}
        <path
          d="M-42 0 h84 l-8 118 a10 10 0 0 1 -10 9 H-24 a10 10 0 0 1 -10 -9 Z"
          fill={`url(#tg-${uid})`}
        />
        <g clipPath={`url(#tgc-${uid})`}>
          {/* น้ำแข็ง */}
          <rect
            x="-26"
            y="14"
            width="22"
            height="22"
            rx="5"
            fill="#ffffff"
            opacity="0.4"
            transform="rotate(-12 -15 25)"
          />
          <rect
            x="8"
            y="30"
            width="20"
            height="20"
            rx="5"
            fill="#ffffff"
            opacity="0.35"
            transform="rotate(16 18 40)"
          />
          {/* ใบชาลอยในแก้ว */}
          <Leaf
            x={-14}
            y={100}
            r={-30}
            s={0.34}
            color="#3f7a2f"
            vein="#1f3d17"
          />
          <Leaf x={20} y={84} r={40} s={0.3} color="#3f7a2f" vein="#1f3d17" />
          {/* ชิ้นผลไม้ (ชาผลไม้) */}
          {fruit && (
            <text
              x="0"
              y="70"
              textAnchor="middle"
              fontSize="22"
              className="animate-floaty"
              style={{ transformOrigin: "0px 64px", animationDelay: delay }}
            >
              {fruit}
            </text>
          )}
          {/* ✨ แสงวิ่งผ่านแก้ว */}
          <rect
            x="-14"
            y="-10"
            width="18"
            height="150"
            fill="#ffffff"
            opacity="0.35"
            className="animate-glass-shine"
            style={{ animationDelay: delay }}
          />
          <ellipse cx="0" cy="4" rx="40" ry="6" fill={foam} opacity="0.55" />
        </g>
        <path
          d="M-42 0 h84 l-8 118 a10 10 0 0 1 -10 9 H-24 a10 10 0 0 1 -10 -9 Z"
          fill="#ffffff"
          fillOpacity="0.08"
          stroke="#fff6dc"
          strokeOpacity="0.9"
          strokeWidth="2.6"
        />
        <path
          d="M-30 14 l-5 92"
          stroke="#ffffff"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.6"
        />
        <rect x="-46" y="-5" width="92" height="9" rx="4.5" fill="#fff6dc" />
        <rect
          x="16"
          y="-56"
          width="10"
          height="64"
          rx="5"
          fill="#8a5cf0"
          transform="rotate(14 20 -24)"
        />
        {/* ป้าย + หน้ายิ้ม */}
        <path d="M-38 54 h76 l-1.5 16 H-36.5 Z" fill="#fff6dc" opacity="0.9" />
        <text
          x="0"
          y="66"
          textAnchor="middle"
          fontSize="10.5"
          fontWeight="700"
          fill="#5f339c"
        >
          {item.emoji} {item.name}
        </text>
        {main && (
          <>
            <circle cx="-13" cy="92" r="2.2" fill="#fff6dc" />
            <circle cx="13" cy="92" r="2.2" fill="#fff6dc" />
            <path
              d="M-6 98 q6 4 12 0"
              stroke="#fff6dc"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </>
        )}
      </g>
    </g>
  );
}

const FRUIT_EMOJI: Record<string, string> = {
  "peach-tea": "🍑",
  "apple-tea": "🍎",
  "lemon-tea": "🍋",
  "green-lemon-tea": "🍋",
  "honey-lemon-tea": "🍯",
  "lychee-tea": "🌸",
  "strawberry-tea": "🍓",
};

export function TeaHeroArt({
  items,
  className = "",
}: {
  items?: MenuItem[];
  className?: string;
}) {
  const list = useMemo(() => {
    const src = items?.length
      ? items
      : MENU_ITEMS.filter((m) => m.category === "tea");
    // เลือกให้หลากสี: ชาไทย, ชาเขียว, ชานม, ชาผลไม้, ชามะนาว
    const want = [
      "thai-tea",
      "green-tea",
      "thai-milk-tea",
      "peach-tea",
      "lemon-tea",
    ];
    const picked = want
      .map((id) => src.find((m) => m.id === id))
      .filter(Boolean) as MenuItem[];
    const rest = src.filter((m) => !picked.includes(m));
    return [...picked, ...rest].slice(0, 5);
  }, [items]);
  const main = list[0];
  const others = list.slice(1, 5);
  const pos = [
    { x: 86, y: 112, s: 0.58, d: "0.5s" },
    { x: 334, y: 112, s: 0.58, d: "1.2s" },
    { x: 126, y: 172, s: 0.46, d: "1.8s" },
    { x: 296, y: 172, s: 0.46, d: "0.9s" },
  ];
  if (!main) return null;
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden>
      <svg viewBox="0 0 420 320" className="h-full w-full" fill="none">
        <defs>
          <radialGradient id="tea-bg" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#f0a962" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#8a6a2a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2f5f22" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle
          cx="210"
          cy="170"
          r="150"
          fill="url(#tea-bg)"
          className="animate-magic-glow"
          style={{ transformOrigin: "210px 170px", animationDuration: "6s" }}
        />

        {/* 🌿 ใบชาสดใหญ่ */}
        <g
          className="animate-floaty-slow"
          style={{ transformOrigin: "60px 240px" }}
        >
          <Leaf x={48} y={262} r={-38} s={1.8} color="#4f8a3a" />
          <Leaf x={86} y={278} r={-10} s={1.3} color="#7cc27a" vein="#3f6f2a" />
        </g>
        <g
          className="animate-floaty"
          style={{ transformOrigin: "360px 240px", animationDelay: "1s" }}
        >
          <Leaf x={372} y={262} r={36} s={1.8} color="#3f7a2f" />
          <Leaf x={336} y={280} r={12} s={1.3} color="#9bd66a" vein="#3f6f2a" />
        </g>

        {others.map((it, i) => (
          <TeaGlass
            key={it.id}
            item={it}
            x={pos[i].x}
            y={pos[i].y}
            scale={pos[i].s}
            delay={pos[i].d}
            uid={it.id}
            fruit={FRUIT_EMOJI[it.id]}
          />
        ))}
        <TeaGlass
          item={main}
          x={210}
          y={96}
          scale={1.1}
          delay="0s"
          uid={main.id}
          main
          fruit={FRUIT_EMOJI[main.id]}
        />

        {/* 🌬️ กลิ่นหอมใบชาลอยจากแก้วหลัก */}
        <g transform="translate(0 92)">
          <Aroma x={178} w={16} delay="0s" dur="6.5s" tint="#c9e6ad" />
          <Aroma x={198} w={22} delay="1.6s" dur="7.5s" tint="#fff6dc" />
          <Aroma x={218} w={18} delay="3.1s" dur="7s" tint="#d7efb6" />
          <Aroma x={238} w={20} delay="0.9s" dur="8s" tint="#fff6dc" />
        </g>
        {/* 🍃 ใบชาลอยตามกลิ่น */}
        {[
          [186, "0s", "9s", -20],
          [212, "2.2s", "10s", 25],
          [236, "4.5s", "8.5s", -35],
        ].map(([x, d, dur, r], i) => (
          <g
            key={i}
            className="animate-tea-leaf-drift"
            style={{
              transformOrigin: `${x}px 92px`,
              animationDelay: d as string,
              animationDuration: dur as string,
            }}
          >
            <Leaf
              x={x as number}
              y={92}
              r={r as number}
              s={0.32}
              color="#9bd66a"
              vein="#4f8a3a"
            />
          </g>
        ))}
        {/* ✨ ประกายทอง/ครีม */}
        {[
          [150, 60, "#f4d35e", "0s"],
          [272, 44, "#fff6dc", "0.9s"],
          [60, 150, "#f4d35e", "1.7s"],
          [364, 140, "#fff6dc", "2.5s"],
          [210, 20, "#d492e0", "1.2s"],
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
      </svg>
    </div>
  );
}

export default function TeaHero({ items }: { items?: MenuItem[] }) {
  const chips = useMemo(
    () => MENU_ITEMS.filter((m) => m.category === "tea").slice(0, 6),
    [],
  );
  return (
    <div className="relative mb-6 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2f5f22] via-[#8a5a1e] to-[#4a2a6b] px-6 py-8 text-white shadow-card ring-1 ring-white/10 sm:px-10 lg:py-10">
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#f0a962]/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-[#5f9a3f]/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 -top-10 h-80 w-80 rounded-full bg-grape-500/40 blur-3xl" />
      <div className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_440px]">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-[#fff6dc] ring-1 ring-white/25 backdrop-blur-sm">
            🌿 ชาหอมเข้ม สีสวย สดชื่น ✨
          </span>
          <h1 className="font-display mt-3 text-3xl font-bold text-[#fff6dc] sm:text-4xl lg:text-5xl">
            เมนูชา
          </h1>
          <p className="font-display mt-1 text-lg font-semibold text-[#f4d35e]">
            Tea Drinks
          </p>
          <p className="mx-auto mt-3 max-w-xl text-white/85 lg:mx-0">
            ชาไทยอำพันเข้ม ชาเขียวมัทฉะ ชานมคาราเมล ชาผลไม้สีสด ชามะนาวเหลืองทอง
            อู่หลง — ใบชาหอมกรุ่น ชงสดใหม่ เปิดแก้วแล้วกลิ่นลอยมาเลย 🍵💜
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5 lg:justify-start">
            {chips.map((d) => (
              <span
                key={d.id}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-[#fff6dc] ring-1 ring-white/20 backdrop-blur-sm"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full ring-1 ring-white/70"
                  style={{ background: d.palette.bottom }}
                />
                {d.emoji} {d.name}
              </span>
            ))}
          </div>
        </div>
        <TeaHeroArt
          items={items}
          className="order-first mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:order-none lg:max-w-none"
        />
      </div>
    </div>
  );
}
