"use client";

import { useEffect, useState } from "react";

/**
 * 🥪 SandwichCharacter — "น้องแซนด์วิช" ตัวการ์ตูน Kawaii ประจำหมวดแซนด์วิช
 * - แซนด์วิชสามเหลี่ยม "หันด้านไส้ออกมา": ขนมปังแผ่นหน้า + แผ่นหลังเยื้องไปขวา
 *   ตรงกลางเห็นไส้เป็นชั้น ๆ ตลอดขอบเฉียง (ผัก มะเขือเทศ ชีส แฮม / แยม / ครีม+ผลไม้) — เหมือนภาพ ref
 * - ตากลม แก้มชมพู แขน-ขาเล็ก ๆ · ตาเป็น ✨ ตอน "ดีใจ"
 * - Animation: เข้าฉาก → ลอยเบา ๆ / ไส้ขยับ / ผลไม้เด้ง / ประกาย · `mood="happy"` เด้ง + หัวใจกระเด็น
 * - `SandwichSlice` export ให้ Hero ใช้วาดแซนด์วิชแบบเดียวกัน (ไม่มีหน้า)
 */

export type SandwichFilling =
  "savory" | "fruit" | "jam" | "choco" | "pandan" | "thaitea";
export type SandwichMood = "idle" | "happy";

/* ชั้นไส้: [สัดส่วนเริ่ม, สัดส่วนจบ, สี] ตามความหนาจากแผ่นหน้า → แผ่นหลัง */
const FILL: Record<
  SandwichFilling,
  { layers: [number, number, string][]; ruffle?: string; emoji: string[] }
> = {
  savory: {
    layers: [
      [0, 0.26, "#7dcc3a"],
      [0.26, 0.46, "#e5194f"],
      [0.46, 0.64, "#f5c400"],
      [0.64, 0.86, "#f5b7c8"],
      [0.86, 1, "#7dcc3a"],
    ],
    ruffle: "#7dcc3a",
    emoji: [],
  },
  fruit: {
    layers: [
      [0, 0.18, "#ffffff"],
      [0.18, 0.82, "#fff6fa"],
      [0.82, 1, "#ffffff"],
    ],
    ruffle: "#ffffff",
    emoji: ["🍓", "🥝", "🫐", "🍊"],
  },
  jam: { layers: [[0.12, 0.88, "#e5194f"]], emoji: ["🍓"] },
  choco: { layers: [[0.12, 0.88, "#5c3a2a"]], emoji: ["🍫"] },
  pandan: { layers: [[0.12, 0.88, "#5cb52e"]], emoji: ["🌿"] },
  thaitea: { layers: [[0.12, 0.88, "#e08a3a"]], emoji: ["🧋"] },
};

export function fillingOf(id: string): SandwichFilling {
  if (id.includes("choco") || id.includes("ovaltine") || id.includes("milo"))
    return "choco";
  if (id.includes("pandan")) return "pandan";
  if (id.includes("thaitea")) return "thaitea";
  if (id.includes("fruit")) return "fruit";
  if (id.includes("jam") || id.includes("butter") || id.includes("banana"))
    return "jam";
  return "savory";
}

/* จุดสามเหลี่ยมแผ่นหน้า (ใน viewBox 220) + ระยะเยื้องของแผ่นหลัง */
const T = [96, 34];
const L = [18, 196];
const R = [178, 196];
const O = [34, 12]; // เยื้องขวา-ลง
const lerp = (a: number[], b: number[], t: number) => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
];
const shift = (p: number[], t: number) => [p[0] + O[0] * t, p[1] + O[1] * t];
const pts = (...p: number[][]) => p.map((q) => q.join(",")).join(" ");

/** 🥪 ชิ้นแซนด์วิชล้วน ๆ (ไม่มีหน้า) — ใช้ใน Hero */
export function SandwichSlice({
  filling = "savory",
  fruits,
  animate = true,
}: {
  filling?: SandwichFilling;
  fruits?: string[];
  animate?: boolean;
}) {
  const f = FILL[filling];
  const emojis = (fruits?.length ? fruits : f.emoji).slice(0, 4);
  const Tb = shift(T, 1),
    Lb = shift(L, 1),
    Rb = shift(R, 1);
  return (
    <g>
      {/* แผ่นหลัง */}
      <polygon points={pts(Tb, Lb, Rb)} fill="#b9772e" />
      <polygon
        points={pts(
          lerp(Tb, [Tb[0], Tb[1] + 14], 1),
          shift([L[0] + 12, L[1] - 6], 1),
          shift([R[0] - 12, R[1] - 6], 1),
        )}
        fill="#f5dfae"
      />
      {/* ก้นขนมปัง (ช่องระหว่างขอบล่าง) */}
      <polygon points={pts(L, R, Rb, Lb)} fill="#d9a35c" />
      {/* 🥬 ไส้ตามขอบเฉียงขวา (ขยับเบา ๆ) */}
      <g
        className={animate ? "whip-cream" : ""}
        style={{ transformOrigin: "150px 120px" }}
      >
        {f.layers.map(([a, b, c], i) => (
          <polygon
            key={i}
            points={pts(shift(T, a), shift(R, a), shift(R, b), shift(T, b))}
            fill={c}
          />
        ))}
        {/* ระบายไส้ให้ล้นขอบ (ผัก/ครีม) */}
        {f.ruffle &&
          [0.1, 0.25, 0.4, 0.55, 0.7, 0.85].map((t, i) => {
            const p = lerp(shift(T, 0.13), shift(R, 0.13), t);
            const q = lerp(shift(T, 0.93), shift(R, 0.93), t);
            return (
              <g key={i}>
                <circle cx={p[0] - 3} cy={p[1] - 4} r="6" fill={f.ruffle} />
                <circle cx={q[0] + 4} cy={q[1] + 2} r="5.5" fill={f.ruffle} />
              </g>
            );
          })}
        {/* 🍓 ชิ้นผลไม้/อีโมจิไส้ */}
        {emojis.map((e, i) => {
          const p = lerp(shift(T, 0.5), shift(R, 0.5), 0.22 + i * 0.2);
          return (
            <g
              key={i}
              className={animate ? "whip-fruit" : ""}
              style={{
                transformOrigin: `${p[0]}px ${p[1]}px`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              <text x={p[0]} y={p[1] + 6} textAnchor="middle" fontSize="15">
                {e}
              </text>
            </g>
          );
        })}
      </g>
      {/* แผ่นหน้า */}
      <polygon points={pts(T, L, R)} fill="#e3a85a" />
      <polygon
        points={pts(
          [T[0], T[1] + 14],
          [L[0] + 12, L[1] - 6],
          [R[0] - 12, R[1] - 6],
        )}
        fill="#fff3d6"
      />
      {/* รูขนมปัง */}
      <circle cx="84" cy="120" r="2.4" fill="#f0d19a" />
      <circle cx="112" cy="146" r="2" fill="#f0d19a" />
      <circle cx="66" cy="166" r="2" fill="#f0d19a" />
      <circle cx="126" cy="176" r="2.4" fill="#f0d19a" />
      <circle cx="104" cy="92" r="1.8" fill="#f0d19a" />
    </g>
  );
}

export default function SandwichCharacter({
  filling = "savory",
  mood = "idle",
  size = 220,
  className = "",
  interactive = true,
  fruits,
}: {
  filling?: SandwichFilling;
  mood?: SandwichMood;
  size?: number;
  className?: string;
  interactive?: boolean;
  /** อีโมจิผลไม้ที่จะโผล่ (ใช้กับ fruit — เปลี่ยนตามวัตถุดิบวันนั้น) */
  fruits?: string[];
}) {
  const [burst, setBurst] = useState(0);
  useEffect(() => {
    if (mood === "happy") setBurst((b) => b + 1);
  }, [mood]);

  return (
    <div
      className={`whip-char relative inline-block select-none ${interactive ? "whip-char--hover" : ""} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <div className="whip-enter h-full w-full">
        <div
          className={`whip-idle h-full w-full ${mood === "happy" ? "whip-happy" : ""}`}
          key={burst}
        >
          <svg viewBox="0 0 220 220" width="100%" height="100%" fill="none">
            <ellipse
              cx="116"
              cy="212"
              rx="78"
              ry="8"
              fill="#7b4ab8"
              opacity="0.16"
            />

            {/* ✨ ประกาย */}
            {[
              [24, 50, "#f4d35e", "0s"],
              [200, 36, "#d492e0", "1.3s"],
              [14, 140, "#ffffff", "2.4s"],
              [206, 120, "#f4d35e", "0.7s"],
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

            {/* 🦶 ขาเล็ก ๆ */}
            <ellipse cx="78" cy="210" rx="12" ry="6" fill="#e3a85a" />
            <ellipse cx="130" cy="214" rx="12" ry="6" fill="#e3a85a" />

            <SandwichSlice filling={filling} fruits={fruits} />

            {/* 😊 หน้า (บนแผ่นหน้า) */}
            {mood === "happy" ? (
              <>
                <path
                  d="M74 132 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2 Z"
                  fill="#3a2f45"
                />
                <path
                  d="M114 132 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2 Z"
                  fill="#3a2f45"
                />
                <path
                  d="M82 154 q12 12 24 0"
                  stroke="#3a2f45"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <>
                <g
                  className="whip-blink"
                  style={{ transformOrigin: "94px 138px" }}
                >
                  <ellipse cx="76" cy="138" rx="5" ry="6" fill="#3a2f45" />
                  <ellipse cx="112" cy="138" rx="5" ry="6" fill="#3a2f45" />
                  <circle cx="78" cy="135.5" r="1.8" fill="#ffffff" />
                  <circle cx="114" cy="135.5" r="1.8" fill="#ffffff" />
                </g>
                <path
                  d="M86 154 q8 8 16 0"
                  stroke="#3a2f45"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <ellipse
                  cx="94"
                  cy="156"
                  rx="4"
                  ry="2.4"
                  fill="#f38aa0"
                  opacity="0.9"
                />
              </>
            )}
            <ellipse cx="62" cy="152" rx="6" ry="3.6" fill="#f5b7c8" />
            <ellipse cx="126" cy="152" rx="6" ry="3.6" fill="#f5b7c8" />

            {/* 🖐️ แขนเล็ก ๆ */}
            <path
              d="M28 160 q-14 4 -18 16"
              stroke="#e3a85a"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M186 176 q14 4 18 16"
              stroke="#e3a85a"
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* 🍞 เศษขนมปัง */}
            <circle cx="30" cy="206" r="2.5" fill="#e3a85a" />
            <circle cx="190" cy="208" r="2" fill="#e3a85a" />
            <circle cx="204" cy="200" r="1.6" fill="#b9772e" />
          </svg>
        </div>
      </div>

      {mood === "happy" && (
        <div key={`b${burst}`} className="pointer-events-none absolute inset-0">
          {["💜", "⭐", "✨", "💖", "⭐", "✨"].map((e, i) => {
            const a = (i / 6) * Math.PI * 2;
            return (
              <span
                key={i}
                className="animate-magic-heart-burst absolute left-1/2 top-1/2 text-lg"
                style={
                  {
                    "--tx": `${Math.cos(a) * 70}px`,
                    "--ty": `${Math.sin(a) * 60 - 20}px`,
                    animationDelay: `${i * 0.05}s`,
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
  );
}
