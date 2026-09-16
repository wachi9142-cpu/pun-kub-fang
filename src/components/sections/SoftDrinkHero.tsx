"use client";

import { useMemo } from "react";
import { SOFT_DRINKS, type SoftDrink } from "@/data/site";

/**
 * 🥤 SoftDrinkHero — หัวหมวด "น้ำอัดลม" คอนเซปต์ "น้ำอัดลมเย็น ๆ กำลังซ่า ฟองปุด ๆ รอบแก้ว" 🥤🫧✨
 * - แก้วน้ำอัดลม + น้ำแข็งใส + ละอองน้ำเกาะแก้ว · สีเครื่องดื่มดึงจาก SOFT_DRINKS[].palette (ไม่ hard-code)
 *   component `FizzGlass` ใช้ซ้ำได้กับทุกรายการ · ส่ง prop `items` เปลี่ยนชุดได้
 * - ฟองซ่าหลายขนาดลอยขึ้นในแก้ว/รอบแก้ว คนละความเร็ว จางหาย/แตกด้านบน · น้ำแข็งเด้งเบา ๆ · ประกายผิวแก้ว
 * - พื้น White/Lavender/Purple + bubble โปร่งด้านหลัง · สีน้ำอัดลมเป็น accent (ไม่ฟ้าทั้งหน้า)
 * - แยกจาก Italian Soda: ที่นี่คือแก้วเย็น + น้ำแข็ง + ซ่า + สีเครื่องดื่ม (ไม่มี DIY/ไซรัป)
 */

/** แก้วน้ำอัดลมใช้ร่วมกันทุกรายการ */
export function FizzGlass({
  item,
  x,
  y,
  scale = 1,
  delay,
  uid,
  main,
}: {
  item: SoftDrink;
  x: number;
  y: number;
  scale?: number;
  delay: string;
  uid: string;
  main?: boolean;
}) {
  const { top, bottom, foam } = item.palette;
  const bubbles = useMemo(
    () =>
      Array.from({ length: main ? 14 : 7 }, (_, i) => ({
        bx: -30 + ((i * 37) % 60),
        r: 2 + (i % 3) * 1.4,
        d: (i * 0.45) % 3.2,
        dur: 2.4 + (i % 4) * 0.5,
      })),
    [main],
  );
  return (
    <g
      className={main ? "animate-serve-pop" : ""}
      style={{ transformOrigin: `${x}px ${y + 130 * scale}px` }}
    >
      <g
        className="animate-floaty-slow"
        style={{
          transformOrigin: `${x}px ${y + 130 * scale}px`,
          animationDelay: delay,
        }}
      >
        <g transform={`translate(${x} ${y}) scale(${scale})`}>
          <defs>
            <linearGradient id={`fz-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={top} />
              <stop offset="100%" stopColor={bottom} />
            </linearGradient>
            <clipPath id={`fzc-${uid}`}>
              <path d="M-42 0 h84 l-8 118 a10 10 0 0 1 -10 9 H-24 a10 10 0 0 1 -10 -9 Z" />
            </clipPath>
          </defs>
          <ellipse
            cx="0"
            cy="134"
            rx="52"
            ry="8"
            fill="#7b4ab8"
            opacity="0.16"
          />
          {/* เครื่องดื่ม */}
          <path
            d="M-42 0 h84 l-8 118 a10 10 0 0 1 -10 9 H-24 a10 10 0 0 1 -10 -9 Z"
            fill={`url(#fz-${uid})`}
          />
          <g clipPath={`url(#fzc-${uid})`}>
            {/* 🧊 น้ำแข็งใส (เด้งเบา ๆ) */}
            {[
              [-18, 22, -14, "0s"],
              [12, 16, 18, "0.7s"],
              [-4, 48, 8, "1.3s"],
              [18, 56, -20, "0.4s"],
            ].map(([ix, iy, ir, d], i) => (
              <g
                key={i}
                className="animate-ice-bob"
                style={{
                  transformOrigin: `${ix}px ${iy}px`,
                  animationDelay: d as string,
                }}
              >
                <rect
                  x={(ix as number) - 12}
                  y={(iy as number) - 12}
                  width="24"
                  height="24"
                  rx="5"
                  fill="#ffffff"
                  opacity="0.55"
                  transform={`rotate(${ir} ${ix} ${iy})`}
                />
                <rect
                  x={(ix as number) - 12}
                  y={(iy as number) - 12}
                  width="24"
                  height="24"
                  rx="5"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  opacity="0.9"
                  transform={`rotate(${ir} ${ix} ${iy})`}
                />
                <path
                  d={`M${(ix as number) - 6} ${(iy as number) - 6} l4 -2`}
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  transform={`rotate(${ir} ${ix} ${iy})`}
                />
              </g>
            ))}
            {/* 🫧 ฟองซ่าในแก้ว */}
            {bubbles.map((b, i) => (
              <circle
                key={i}
                cx={b.bx}
                cy="110"
                r={b.r}
                fill="#ffffff"
                opacity="0.85"
                className="animate-fizz-bubble"
                style={{
                  transformOrigin: `${b.bx}px 110px`,
                  animationDelay: `${b.d}s`,
                  animationDuration: `${b.dur}s`,
                }}
              />
            ))}
            {/* ฟองที่ผิวน้ำ */}
            <ellipse cx="0" cy="4" rx="40" ry="6" fill={foam} opacity="0.5" />
          </g>
          {/* ตัวแก้วใส + แสง */}
          <path
            d="M-42 0 h84 l-8 118 a10 10 0 0 1 -10 9 H-24 a10 10 0 0 1 -10 -9 Z"
            fill="#ffffff"
            fillOpacity="0.12"
            stroke="#ffffff"
            strokeWidth="2.6"
          />
          <path
            d="M-30 14 l-5 92"
            stroke="#ffffff"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.75"
          />
          {/* 💧 ละอองน้ำเกาะแก้ว */}
          {[
            [-34, 70],
            [-28, 96],
            [30, 60],
            [34, 92],
            [26, 112],
            [-36, 40],
          ].map(([dx, dy], i) => (
            <circle
              key={i}
              cx={dx}
              cy={dy}
              r={1.8 + (i % 2)}
              fill="#ffffff"
              opacity="0.85"
            />
          ))}
          {/* ขอบแก้ว */}
          <rect
            x="-46"
            y="-5"
            width="92"
            height="9"
            rx="4.5"
            fill="#ffffff"
            stroke="#e6d9f5"
            strokeWidth="1.5"
          />
          {/* หลอด */}
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
          <path
            d="M-38 56 h76 l-1.5 16 H-36.5 Z"
            fill="#ffffff"
            opacity="0.85"
          />
          <text
            x="0"
            y="68"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#5f339c"
          >
            {item.emoji} {item.nameTh}
          </text>
          <circle cx="-13" cy="94" r="2.2" fill="#ffffff" />
          <circle cx="13" cy="94" r="2.2" fill="#ffffff" />
          <path
            d="M-6 100 q6 4 12 0"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* ✨ ประกายผิวแก้ว */}
          <g className="animate-twinkle" style={{ animationDelay: delay }}>
            <path
              d="M28 30 l1.6 4.8 l4.8 1.6 l-4.8 1.6 l-1.6 4.8 l-1.6 -4.8 l-4.8 -1.6 l4.8 -1.6 Z"
              fill="#ffffff"
            />
          </g>
        </g>
      </g>
    </g>
  );
}

export function SoftDrinkHeroArt({
  items,
  className = "",
}: {
  items?: SoftDrink[];
  className?: string;
}) {
  const list = useMemo(
    () => (items?.length ? items : SOFT_DRINKS).slice(0, 5),
    [items],
  );
  const main = list[0];
  const others = list.slice(1, 5);
  const pos = [
    { x: 86, y: 110, s: 0.58, d: "0.5s" },
    { x: 334, y: 110, s: 0.58, d: "1.2s" },
    { x: 126, y: 170, s: 0.46, d: "1.8s" },
    { x: 296, y: 170, s: 0.46, d: "0.9s" },
  ];
  if (!main) return null;
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden>
      <svg viewBox="0 0 420 320" className="h-full w-full" fill="none">
        <defs>
          <radialGradient id="sd-bg" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#f3e9ff" />
            <stop offset="65%" stopColor="#e6d9f5" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#c9b3e8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="210" cy="170" r="150" fill="url(#sd-bg)" />
        {/* 🫧 bubble โปร่งด้านหลัง (หลายขนาด) */}
        {[
          [60, 60, 26, "0s"],
          [356, 52, 20, "1s"],
          [40, 250, 16, "2s"],
          [384, 240, 22, "0.6s"],
          [210, 26, 12, "1.6s"],
          [150, 300, 10, "2.4s"],
          [280, 300, 14, "0.3s"],
        ].map(([x, y, r, d], i) => (
          <g
            key={i}
            className="animate-floaty"
            style={{
              transformOrigin: `${x}px ${y}px`,
              animationDelay: d as string,
            }}
          >
            <circle
              cx={x as number}
              cy={y as number}
              r={r as number}
              fill="#ffffff"
              opacity="0.5"
              stroke="#c9b3e8"
              strokeWidth="1.5"
            />
            <circle
              cx={(x as number) - (r as number) * 0.3}
              cy={(y as number) - (r as number) * 0.3}
              r={(r as number) * 0.25}
              fill="#ffffff"
            />
          </g>
        ))}

        {others.map((it, i) => (
          <FizzGlass
            key={it.id}
            item={it}
            x={pos[i].x}
            y={pos[i].y}
            scale={pos[i].s}
            delay={pos[i].d}
            uid={it.id}
          />
        ))}
        <FizzGlass
          item={main}
          x={210}
          y={92}
          scale={1.1}
          delay="0s"
          uid={main.id}
          main
        />

        {/* 🫧 ฟองซ่ารอบแก้วหลัก ลอยขึ้น จางหาย (สีตามเครื่องดื่ม) */}
        {Array.from({ length: 12 }).map((_, i) => {
          const bx = 150 + ((i * 53) % 120);
          const r = 3 + (i % 4) * 1.5;
          const c = i % 3 === 0 ? main.palette.top : "#ffffff";
          return (
            <circle
              key={i}
              cx={bx}
              cy="250"
              r={r}
              fill={c}
              opacity="0.8"
              stroke="#ffffff"
              strokeWidth="1"
              className="animate-fizz-bubble"
              style={{
                transformOrigin: `${bx}px 250px`,
                animationDelay: `${(i * 0.55) % 4}s`,
                animationDuration: `${3 + (i % 5) * 0.6}s`,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

export default function SoftDrinkHero({ items }: { items?: SoftDrink[] }) {
  return (
    <div className="relative mb-6 overflow-hidden rounded-[2rem] bg-gradient-to-br from-white via-grape-50 to-grape-100 px-6 py-8 ring-1 ring-white/80 sm:px-10 lg:py-10">
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#ff9a3c]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-[#5ab0f0]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 -top-8 h-80 w-80 rounded-full bg-[#ff6a86]/15 blur-3xl" />
      <div className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_440px]">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-grape-700 ring-1 ring-grape-200">
            🧊 เย็นจัด ซ่าอยู่ตลอด 🫧
          </span>
          <h1 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
            น้ำอัดลม
          </h1>
          <p className="font-display mt-1 text-lg font-semibold text-blossom-400">
            Bottled Soft Drinks
          </p>
          <p className="mx-auto mt-3 max-w-xl text-ink/60 lg:mx-0">
            เหมือนเปิดตู้เย็นแล้วหยิบน้ำอัดลมเย็น ๆ ออกมา — ใส่น้ำแข็งใส ฟองปุด
            ๆ ซ่าสดชื่นทุกอึก 🥤💜 (แยกจากอิตาเลียนโซดาที่ร้านชงเอง)
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5 lg:justify-start">
            {SOFT_DRINKS.slice(0, 6).map((d) => (
              <span
                key={d.id}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-ink ring-1 ring-ink/5"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full ring-1 ring-white"
                  style={{ background: d.palette.top }}
                />
                {d.emoji} {d.nameTh}
              </span>
            ))}
          </div>
        </div>
        <SoftDrinkHeroArt
          items={items}
          className="order-first mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:order-none lg:max-w-none"
        />
      </div>
    </div>
  );
}
