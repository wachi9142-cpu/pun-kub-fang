"use client";

import { useEffect, useState } from "react";

/**
 * 🍦 WhipCupCharacter — "น้องแก้ววิปครีม" ตัวการ์ตูน Kawaii ประจำหมวดวิปครีมแก้ว
 * - แก้วใส + วิปครีมฟู ๆ 3 ชั้น + ท็อปปิ้ง/ผลไม้ (เปลี่ยนตาม prop `fruits` = ชื่ออังกฤษของ WHIP_FRUITS)
 * - ใบหน้าน่ารัก (ตากลม แก้มชมพู) · ตาเปลี่ยนเป็น ✨ ตอน "ดีใจ"
 * - Animation: เข้าฉาก (เด้ง+เอียงซ้าย/ขวา) → ลอยเบา ๆ / วิปขยับ / ผลไม้เด้ง / ประกาย
 *   hover = เด้งเอียง + sparkle · `mood="happy"` = bounce+wobble + หัวใจ/ดาวกระเด็น (ใช้ตอนเลือกเมนู/เพิ่มตะกร้า)
 * - นำกลับมาใช้ซ้ำได้ทุกที่ (Hero / การ์ดสรุป / ตัวเลือก) · CSS ล้วน · รองรับ prefers-reduced-motion
 */

const FRUIT_STYLE: Record<string, { emoji: string; color: string }> = {
  "Seedless Grapes": { emoji: "🍇", color: "#7c3fc4" },
  "Shine Muscat Grapes": { emoji: "🍇", color: "#b9dd8a" },
  Strawberry: { emoji: "🍓", color: "#e5194f" },
  Blueberry: { emoji: "🫐", color: "#2f3fc4" },
  Orange: { emoji: "🍊", color: "#ff7f11" },
  "Candied Lemon": { emoji: "🍋", color: "#f5c400" },
  "Witch Finger Grapes": { emoji: "🍇", color: "#6b2d8f" },
  Kiwi: { emoji: "🥝", color: "#5cb52e" },
  "Mixed Fruits": { emoji: "🍓", color: "#e5194f" },
};

export type WhipMood = "idle" | "happy";

export default function WhipCupCharacter({
  fruits = [],
  toppings = 0,
  mood = "idle",
  size = 220,
  className = "",
  interactive = true,
}: {
  /** ชื่ออังกฤษของผลไม้ที่เลือก (WHIP_FRUITS[].nameEn) */
  fruits?: string[];
  /** จำนวนท็อปปิ้งที่เลือก (โชว์เป็นไข่มุก/เม็ดบนวิป) */
  toppings?: number;
  mood?: WhipMood;
  size?: number;
  className?: string;
  interactive?: boolean;
}) {
  const [burst, setBurst] = useState(0);
  useEffect(() => {
    if (mood === "happy") setBurst((b) => b + 1);
  }, [mood]);

  const shown = fruits
    .slice(0, 4)
    .map((f) => FRUIT_STYLE[f] ?? { emoji: "🍓", color: "#e5194f" });
  const fruitPos = [
    { x: 74, y: 62, r: -12 },
    { x: 126, y: 54, r: 10 },
    { x: 100, y: 40, r: 0 },
    { x: 150, y: 76, r: 18 },
  ];
  const pearls = Math.min(toppings, 6);

  return (
    <div
      className={`whip-char relative inline-block select-none ${interactive ? "whip-char--hover" : ""} ${className}`}
      style={{ width: size, height: size * 1.2 }}
      aria-hidden
    >
      {/* เข้าฉาก: เด้ง + เอียงซ้าย/ขวา แล้วลอยเบา ๆ */}
      <div className="whip-enter h-full w-full">
        <div
          className={`whip-idle h-full w-full ${mood === "happy" ? "whip-happy" : ""}`}
          key={burst}
        >
          <svg viewBox="0 0 200 240" width="100%" height="100%" fill="none">
            <defs>
              <linearGradient id="wc-glass" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="55%" stopColor="#ffffff" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#c9b3e8" stopOpacity="0.45" />
              </linearGradient>
              <linearGradient id="wc-cream" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f3e6ff" />
              </linearGradient>
              <linearGradient id="wc-inside" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff8fc" />
                <stop offset="100%" stopColor="#ecdcff" />
              </linearGradient>
            </defs>

            {/* เงา */}
            <ellipse
              cx="100"
              cy="230"
              rx="60"
              ry="8"
              fill="#7b4ab8"
              opacity="0.18"
            />

            {/* ✨ ประกายรอบแก้ว (บางจังหวะ) */}
            {[
              [30, 60, "#f4d35e", "0s"],
              [176, 50, "#d492e0", "1.3s"],
              [22, 150, "#ffffff", "2.4s"],
              [182, 140, "#f4d35e", "0.7s"],
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

            {/* แก้วใส */}
            <path
              d="M46 98 h108 l-10 116 a10 10 0 0 1 -10 9 H66 a10 10 0 0 1 -10 -9 Z"
              fill="url(#wc-inside)"
            />
            {/* ชั้นวิปในแก้ว */}
            <path d="M52 120 h96 l-4 46 H56 Z" fill="#ffffff" opacity="0.7" />
            <path
              d="M46 98 h108 l-10 116 a10 10 0 0 1 -10 9 H66 a10 10 0 0 1 -10 -9 Z"
              fill="url(#wc-glass)"
              stroke="#ffffff"
              strokeWidth="3"
            />
            <path
              d="M64 112 l-7 92"
              stroke="#ffffff"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.85"
            />
            {/* แถบม่วง + โลโก้ */}
            <path
              d="M51 150 h98 l-1.5 16 H52.5 Z"
              fill="#c9b3e8"
              opacity="0.75"
            />
            <circle cx="100" cy="158" r="11" fill="#ffffff" />
            <text x="100" y="163" textAnchor="middle" fontSize="12">
              🍦
            </text>

            {/* 😊 ใบหน้า */}
            <g className="whip-face">
              {mood === "happy" ? (
                <>
                  <path
                    d="M76 190 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2 Z"
                    fill="#3a2f45"
                  />
                  <path
                    d="M124 190 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2 Z"
                    fill="#3a2f45"
                  />
                  <path
                    d="M88 206 q12 12 24 0"
                    stroke="#3a2f45"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                  />
                </>
              ) : (
                <>
                  <g
                    className="whip-blink"
                    style={{ transformOrigin: "100px 194px" }}
                  >
                    <ellipse cx="78" cy="194" rx="5" ry="6" fill="#3a2f45" />
                    <ellipse cx="122" cy="194" rx="5" ry="6" fill="#3a2f45" />
                    <circle cx="80" cy="191.5" r="1.8" fill="#ffffff" />
                    <circle cx="124" cy="191.5" r="1.8" fill="#ffffff" />
                  </g>
                  <path
                    d="M92 206 q8 6 16 0"
                    stroke="#3a2f45"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </>
              )}
              <ellipse cx="66" cy="204" rx="6" ry="3.6" fill="#f5b7c8" />
              <ellipse cx="134" cy="204" rx="6" ry="3.6" fill="#f5b7c8" />
            </g>

            {/* ขอบแก้ว */}
            <rect
              x="42"
              y="93"
              width="116"
              height="10"
              rx="5"
              fill="#ffffff"
              stroke="#e6d9f5"
              strokeWidth="1.5"
            />

            {/* 🍦 วิปครีมฟู 3 ชั้น (ขยับนุ่ม ๆ) */}
            <g className="whip-cream" style={{ transformOrigin: "100px 98px" }}>
              <ellipse cx="100" cy="96" rx="58" ry="14" fill="url(#wc-cream)" />
              <circle cx="66" cy="84" r="17" fill="#ffffff" />
              <circle cx="134" cy="84" r="17" fill="#ffffff" />
              <circle cx="84" cy="70" r="19" fill="url(#wc-cream)" />
              <circle cx="116" cy="70" r="19" fill="url(#wc-cream)" />
              <circle cx="100" cy="56" r="17" fill="#ffffff" />
              <path
                d="M96 42 q4 -10 8 0"
                stroke="#ffffff"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* เงาอ่อน + แสง */}
              <ellipse
                cx="100"
                cy="100"
                rx="54"
                ry="6"
                fill="#e6d9f5"
                opacity="0.8"
              />
              <ellipse cx="88" cy="62" rx="6" ry="3" fill="#ffffff" />
              <circle cx="72" cy="80" r="2.4" fill="#f3ecfb" />
              <circle cx="128" cy="82" r="2" fill="#f3ecfb" />
              {/* ไข่มุก/ท็อปปิ้ง */}
              {Array.from({ length: pearls }).map((_, i) => (
                <circle
                  key={i}
                  cx={64 + i * 14}
                  cy={92 - (i % 2) * 6}
                  r="4"
                  fill={i % 2 ? "#3a2f45" : "#7c3fc4"}
                  opacity="0.9"
                />
              ))}
              {/* 🍓 ผลไม้บนวิป (เด้งเบา ๆ) */}
              {shown.map((f, i) => (
                <g
                  key={i}
                  className="whip-fruit"
                  style={{
                    transformOrigin: `${fruitPos[i].x}px ${fruitPos[i].y}px`,
                    animationDelay: `${i * 0.35}s`,
                  }}
                >
                  <circle
                    cx={fruitPos[i].x}
                    cy={fruitPos[i].y}
                    r="11"
                    fill={f.color}
                    opacity="0.18"
                  />
                  <text
                    x={fruitPos[i].x}
                    y={fruitPos[i].y + 7}
                    textAnchor="middle"
                    fontSize="20"
                    transform={`rotate(${fruitPos[i].r} ${fruitPos[i].x} ${fruitPos[i].y})`}
                  >
                    {f.emoji}
                  </text>
                </g>
              ))}
              {shown.length === 0 && (
                <text
                  x="100"
                  y="52"
                  textAnchor="middle"
                  fontSize="18"
                  className="whip-fruit"
                  style={{ transformOrigin: "100px 46px" }}
                >
                  🍒
                </text>
              )}
            </g>
          </svg>
        </div>
      </div>

      {/* 💜⭐ กระเด็นตอนดีใจ */}
      {mood === "happy" && (
        <div key={`b${burst}`} className="pointer-events-none absolute inset-0">
          {["💜", "⭐", "✨", "💖", "⭐", "✨"].map((e, i) => {
            const a = (i / 6) * Math.PI * 2;
            return (
              <span
                key={i}
                className="animate-magic-heart-burst absolute left-1/2 top-1/3 text-lg"
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
