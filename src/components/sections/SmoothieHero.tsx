"use client";

import { useMemo } from "react";
import { FRESH_FRUITS, FRESH_VEGGIES, type FreshItem } from "@/data/site";

/**
 * 🍓 SmoothieHero — หัวหมวด "สมูทตี้" คอนเซปต์ "สวนผลไม้และผักสด → ปั่นรวมกันเป็นสมูทตี้สด ๆ"
 * - วัตถุดิบ (ผลไม้ + ผัก) ดึงจาก FRESH_FRUITS / FRESH_VEGGIES ใน site.ts — ไม่ hard-code
 *   ส่ง prop `items` เพื่อกำหนดชุดวัตถุดิบเอง (เช่น ตามเมนู/สต็อกวันนั้น)
 * - แอนิเมชันวนรอบ ~11 วิ: วัตถุดิบลอยเข้าเครื่องปั่น → หมุนวนสีผสมกัน → เทลงแก้ว → แก้วเด้ง + ประกาย
 * - CSS transform/opacity ล้วน · รองรับ prefers-reduced-motion (จบที่ภาพนิ่ง แก้วเต็ม)
 */

/* สีของวัตถุดิบ (ใช้ผสมเป็นสีสมูทตี้ + จุดสีในโถ) */
const COLOR: Record<string, string> = {
  banana: "#f6d35c",
  strawberry: "#f0507f",
  apple: "#e8333f",
  pineapple: "#f2d130",
  watermelon: "#f26a6a",
  orange: "#ff9a3c",
  kiwi: "#7cc244",
  grape: "#7c3fc4",
  "shine-muscat": "#b9dd8a",
  blueberry: "#4a5fd0",
  mulberry: "#6b2d8f",
  dragonfruit: "#f05a9a",
  pomegranate: "#c8163a",
  passion: "#f4c542",
  pear: "#cfe38a",
  persimmon: "#f28c28",
  cantaloupe: "#f7b56d",
  melon: "#8fd35a",
  roseapple: "#f5a3bd",
  guava: "#a8ce7a",
  jicama: "#e9d9c2",
  carrot: "#f28c28",
  cucumber: "#9bd66a",
  tomato: "#e8433f",
  spinach: "#3f8f35",
  lettuce: "#a8ce7a",
  celery: "#7cc27a",
  beetroot: "#a3122f",
  kale: "#2f6f2a",
};
const fallback = "#c9b3e8";
const colorOf = (it: FreshItem) => COLOR[it.id] ?? fallback;

/* ชุดวัตถุดิบเริ่มต้น: ผลไม้ 6 + ผัก 3 (คละสี) */
function defaultItems(): FreshItem[] {
  const pick = (list: FreshItem[], ids: string[]) =>
    ids
      .map((id) => list.find((x) => x.id === id))
      .filter(Boolean) as FreshItem[];
  return [
    ...pick(FRESH_FRUITS, [
      "strawberry",
      "banana",
      "kiwi",
      "blueberry",
      "orange",
      "dragonfruit",
    ]),
    ...pick(FRESH_VEGGIES, ["carrot", "spinach", "beetroot"]),
  ];
}

export function SmoothieHeroArt({
  items,
  className = "",
}: {
  items?: FreshItem[];
  className?: string;
}) {
  const list = useMemo(
    () => (items?.length ? items.slice(0, 10) : defaultItems()),
    [items],
  );
  const colors = list.map(colorOf);
  const mixTop = colors[0] ?? "#f0507f";
  const mixMid = colors[Math.floor(colors.length / 2)] ?? "#f6d35c";
  const mixBot = colors[colors.length - 1] ?? "#7c3fc4";

  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden>
      <svg viewBox="0 0 420 320" className="h-full w-full" fill="none">
        <defs>
          <linearGradient id="sm-mix" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={mixTop} />
            <stop offset="50%" stopColor={mixMid} />
            <stop offset="100%" stopColor={mixBot} />
          </linearGradient>
          <linearGradient id="sm-glass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#c9b3e8" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="sm-bg" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#fff0f6" />
            <stop offset="60%" stopColor="#efe6fb" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#c9b3e8" stopOpacity="0" />
          </radialGradient>
          <clipPath id="sm-jar-clip">
            <path d="M160 92 h100 l-8 96 H168 Z" />
          </clipPath>
          <clipPath id="sm-cup-clip">
            <path d="M292 190 h76 l-7 92 a8 8 0 0 1 -8 7 H307 a8 8 0 0 1 -8 -7 Z" />
          </clipPath>
        </defs>

        <circle cx="210" cy="170" r="140" fill="url(#sm-bg)" />

        {/* 🌿 ใบไม้/ใบผักประกอบ */}
        <g
          className="animate-floaty-slow"
          style={{ transformOrigin: "48px 250px" }}
        >
          <path
            d="M30 270 C12 240 30 200 66 190 C70 232 58 262 30 270 Z"
            fill="#7cc27a"
          />
          <path
            d="M34 266 C42 236 50 214 66 194"
            stroke="#4f8a3a"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
        <g
          className="animate-floaty"
          style={{ transformOrigin: "392px 250px", animationDelay: "1.1s" }}
        >
          <path
            d="M400 270 C418 240 400 200 364 190 C360 232 372 262 400 270 Z"
            fill="#9bd66a"
          />
          <path
            d="M396 266 C388 236 380 214 364 194"
            stroke="#4f8a3a"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* 🧃 เครื่องปั่น (โถใส + ฐาน) */}
        <g
          className="animate-smoothie-blender"
          style={{ transformOrigin: "210px 220px" }}
        >
          {/* ฐาน */}
          <rect x="164" y="208" width="92" height="46" rx="12" fill="#b795d8" />
          <rect x="164" y="208" width="92" height="14" rx="7" fill="#c9b3e8" />
          <rect x="196" y="230" width="28" height="9" rx="4.5" fill="#7b4ab8" />
          <circle cx="182" cy="234" r="4" fill="#f4d35e" />
          {/* เนื้อสมูทตี้ในโถ (ระดับขึ้นตามเฟส) */}
          <g clipPath="url(#sm-jar-clip)">
            <rect
              x="150"
              y="92"
              width="120"
              height="100"
              fill="url(#sm-mix)"
              className="animate-smoothie-fill"
              style={{ transformOrigin: "210px 190px" }}
            />
            {/* วงหมุนวน + จุดสีวัตถุดิบ */}
            <g
              className="animate-smoothie-swirl"
              style={{ transformOrigin: "210px 150px" }}
            >
              {colors.slice(0, 8).map((c, i) => {
                const a = (i / 8) * Math.PI * 2;
                return (
                  <circle
                    key={i}
                    cx={210 + Math.cos(a) * 30}
                    cy={150 + Math.sin(a) * 26}
                    r={6 - (i % 3)}
                    fill={c}
                    opacity="0.9"
                  />
                );
              })}
              <path
                d="M186 150 q24 -18 48 0 q-24 18 -48 0 Z"
                fill="#ffffff"
                opacity="0.28"
              />
            </g>
          </g>
          {/* โถใส */}
          <path
            d="M160 92 h100 l-8 96 H168 Z"
            fill="url(#sm-glass)"
            stroke="#ffffff"
            strokeWidth="3"
          />
          <path
            d="M172 104 l-4 74"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.8"
          />
          <rect
            x="154"
            y="84"
            width="112"
            height="12"
            rx="6"
            fill="#e6d9f5"
            stroke="#ffffff"
            strokeWidth="2"
          />
          {/* ฝา */}
          <rect x="186" y="72" width="48" height="14" rx="6" fill="#7b4ab8" />
          {/* ใบมีด */}
          <g
            className="animate-smoothie-blade"
            style={{ transformOrigin: "210px 182px" }}
          >
            <path
              d="M196 182 h28 M210 176 v12"
              stroke="#5f339c"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
          {/* หน้ายิ้มบนฐาน */}
          <circle cx="200" cy="246" r="2" fill="#3a2f45" />
          <circle cx="220" cy="246" r="2" fill="#3a2f45" />
          <path
            d="M206 250 q4 3 8 0"
            stroke="#3a2f45"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </g>

        {/* 🫗 สายสมูทตี้เทลงแก้ว */}
        <path
          d="M262 100 C296 100 318 130 322 186"
          stroke="url(#sm-mix)"
          strokeWidth="9"
          strokeLinecap="round"
          className="animate-smoothie-pour"
          style={{ transformOrigin: "262px 100px" }}
        />

        {/* 🥤 แก้วสมูทตี้ (ขวา) */}
        <g
          className="animate-smoothie-cup"
          style={{ transformOrigin: "330px 292px" }}
        >
          <ellipse
            cx="330"
            cy="294"
            rx="48"
            ry="7"
            fill="#7b4ab8"
            opacity="0.16"
          />
          <g clipPath="url(#sm-cup-clip)">
            <rect
              x="286"
              y="190"
              width="90"
              height="100"
              fill="url(#sm-mix)"
              className="animate-smoothie-cup-fill"
              style={{ transformOrigin: "330px 290px" }}
            />
          </g>
          <path
            d="M292 190 h76 l-7 92 a8 8 0 0 1 -8 7 H307 a8 8 0 0 1 -8 -7 Z"
            fill="url(#sm-glass)"
            stroke="#ffffff"
            strokeWidth="2.5"
          />
          <path
            d="M304 204 l-4 68"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.8"
          />
          <rect
            x="288"
            y="185"
            width="84"
            height="9"
            rx="4.5"
            fill="#ffffff"
            stroke="#e6d9f5"
            strokeWidth="1.5"
          />
          <rect
            x="348"
            y="128"
            width="9"
            height="64"
            rx="4.5"
            fill="#8a5cf0"
            transform="rotate(14 352 160)"
          />
          <circle cx="330" cy="246" r="11" fill="#ffffff" opacity="0.92" />
          <text x="330" y="251" textAnchor="middle" fontSize="12">
            🍓
          </text>
          {/* ประกายตอนแก้วเต็ม */}
          <g
            className="animate-smoothie-spark"
            style={{ transformOrigin: "330px 180px" }}
          >
            <path
              d="M300 170 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2 Z"
              fill="#f4d35e"
            />
            <path
              d="M366 160 l1.6 4.8 l4.8 1.6 l-4.8 1.6 l-1.6 4.8 l-1.6 -4.8 l-4.8 -1.6 l4.8 -1.6 Z"
              fill="#d492e0"
            />
            <path
              d="M378 200 l1.4 4.2 l4.2 1.4 l-4.2 1.4 l-1.4 4.2 l-1.4 -4.2 l-4.2 -1.4 l4.2 -1.4 Z"
              fill="#ffffff"
            />
          </g>
        </g>

        {/* 🍓🥕 วัตถุดิบ (จาก site.ts) ลอยเข้าเครื่องปั่น — จุดเริ่มกระจายรอบโถ */}
        {list.map((it, i) => {
          const n = list.length;
          const a = (i / n) * Math.PI * 2 - Math.PI / 2;
          const sx = 210 + Math.cos(a) * 150;
          const sy = 150 + Math.sin(a) * 105;
          return (
            <g
              key={it.id}
              className="animate-smoothie-ingredient"
              style={
                {
                  transformOrigin: `${sx}px ${sy}px`,
                  animationDelay: `${(i / n) * 2.2}s`,
                  "--tx": `${210 - sx}px`,
                  "--ty": `${118 - sy}px`,
                  "--spin": `${i % 2 ? 1 : -1}`,
                } as React.CSSProperties
              }
            >
              <circle
                cx={sx}
                cy={sy}
                r="17"
                fill="#ffffff"
                opacity="0.9"
                stroke={colorOf(it)}
                strokeWidth="2.5"
              />
              {it.image ? (
                <image
                  href={it.image}
                  x={sx - 13}
                  y={sy - 13}
                  width="26"
                  height="26"
                />
              ) : (
                <text x={sx} y={sy + 7} textAnchor="middle" fontSize="20">
                  {it.emoji}
                </text>
              )}
            </g>
          );
        })}

        {/* 🍃 เศษใบไม้/ชิ้นเล็กลอยรอบ ๆ */}
        {[
          [80, 80, "#7cc27a", "0s"],
          [340, 60, "#9bd66a", "1.4s"],
          [120, 300, "#a8ce7a", "2.6s"],
        ].map(([x, y, c, d], i) => (
          <g
            key={i}
            className="animate-magic-float"
            style={
              {
                "--dur": "7s",
                "--delay": d as string,
                transformOrigin: `${x}px ${y}px`,
              } as React.CSSProperties
            }
          >
            <path
              d={`M${x} ${y} C${(x as number) + 6} ${(y as number) - 10} ${(x as number) + 18} ${(y as number) - 10} ${(x as number) + 22} ${(y as number) - 2} C${(x as number) + 14} ${(y as number) + 6} ${(x as number) + 4} ${(y as number) + 6} ${x} ${y} Z`}
              fill={c as string}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function SmoothieHero({ items }: { items?: FreshItem[] }) {
  return (
    <div className="relative mb-6 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#ffe9f2] via-cream-white to-grape-100 px-6 py-8 ring-1 ring-white/80 sm:px-10 lg:py-10">
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#f0507f]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-[#f6d35c]/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 -top-8 h-80 w-80 rounded-full bg-[#9bd66a]/25 blur-3xl" />
      <div className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_460px]">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-blossom-500 ring-1 ring-blossom-200">
            🍓🥬 สวนผลไม้และผักสด → ปั่นสด ๆ ตรงหน้า ✨
          </span>
          <h1 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
            สมูทตี้
          </h1>
          <p className="font-display mt-1 text-lg font-semibold text-blossom-400">
            Smoothies
          </p>
          <p className="mx-auto mt-3 max-w-xl text-ink/60 lg:mx-0">
            ผลไม้และผักสดหลากสี ปั่นรวมกันเป็นแก้วฉ่ำ ๆ — สตรอว์เบอร์รี กล้วย
            กีวี บลูเบอร์รี แครอท ผักโขม บีตรูท เลือกได้ตามใจ 🍹💜
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5 lg:justify-start">
            {[
              ["🍓 แดง/ชมพู", "#f0507f"],
              ["🍌 เหลือง/ส้ม", "#f6d35c"],
              ["🥝 เขียว", "#7cc244"],
              ["🫐 ม่วง/น้ำเงิน", "#4a5fd0"],
              ["🩷 แก้วมังกร/ทับทิม", "#f05a9a"],
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
        <SmoothieHeroArt
          items={items}
          className="order-first mx-auto w-full max-w-[320px] sm:max-w-[380px] lg:order-none lg:max-w-none"
        />
      </div>
    </div>
  );
}
