"use client";

import { useEffect, useState } from "react";

/**
 * 🥪 SandwichCharacter — "น้องแซนด์วิช" ตัวการ์ตูน Kawaii ประจำหมวดแซนด์วิช
 * - ขนมปังสามเหลี่ยมนุ่ม ๆ ขอบทอง · ไส้โผล่ออกมา (เปลี่ยนตาม `filling`: savory / fruit / jam หรือ custom)
 * - ตากลม แก้มชมพู แขน-ขาเล็ก ๆ · ตาเป็น ✨ ตอน "ดีใจ"
 * - Animation: เข้าฉาก (เด้ง+เอียง) → ลอยเบา ๆ / ไส้ขยับ / ผลไม้เด้ง / ประกาย · hover เด้งเอียง · `mood="happy"` bounce+wobble + หัวใจกระเด็น
 * - ใช้ซ้ำได้ทุกรายการ (Hero / การ์ด) · CSS ล้วน · รองรับ prefers-reduced-motion
 */

export type SandwichFilling =
  "savory" | "fruit" | "jam" | "choco" | "pandan" | "thaitea";
export type SandwichMood = "idle" | "happy";

const FILL: Record<
  SandwichFilling,
  { layers: string[]; emoji: string[]; jam?: string }
> = {
  savory: { layers: ["#f5b7c8", "#f5c400", "#7dcc3a"], emoji: ["🧀", "🥬"] },
  fruit: {
    layers: ["#ffffff", "#fff0f5", "#ffffff"],
    emoji: ["🍓", "🥝", "🫐", "🍊"],
  },
  jam: { layers: ["#e5194f"], emoji: ["🍓"], jam: "#e5194f" },
  choco: { layers: ["#5c3a2a"], emoji: ["🍫"], jam: "#5c3a2a" },
  pandan: { layers: ["#5cb52e"], emoji: ["🌿"], jam: "#5cb52e" },
  thaitea: { layers: ["#e08a3a"], emoji: ["🧋"], jam: "#e08a3a" },
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
  const f = FILL[filling];
  const emojis = (fruits?.length ? fruits : f.emoji).slice(0, 4);

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
            <defs>
              <linearGradient id="sw-bread" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff3d6" />
                <stop offset="100%" stopColor="#f5dfae" />
              </linearGradient>
              <linearGradient id="sw-crust" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e3a85a" />
                <stop offset="100%" stopColor="#b9772e" />
              </linearGradient>
            </defs>
            <ellipse
              cx="110"
              cy="206"
              rx="70"
              ry="9"
              fill="#7b4ab8"
              opacity="0.16"
            />

            {/* ✨ ประกาย */}
            {[
              [26, 50, "#f4d35e", "0s"],
              [194, 40, "#d492e0", "1.3s"],
              [20, 150, "#ffffff", "2.4s"],
              [200, 150, "#f4d35e", "0.7s"],
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
            <ellipse cx="86" cy="210" rx="12" ry="6" fill="#e3a85a" />
            <ellipse cx="134" cy="210" rx="12" ry="6" fill="#e3a85a" />

            {/* 🍞 ขนมปังแผ่นหลัง (สามเหลี่ยม) */}
            <path d="M28 204 L110 30 L192 204 Z" fill="url(#sw-crust)" />
            <path d="M38 198 L110 44 L182 198 Z" fill="url(#sw-bread)" />

            {/* 🥬 ไส้โผล่ (ขยับตามเบา ๆ) */}
            <g
              className="whip-cream"
              style={{ transformOrigin: "110px 150px" }}
            >
              {f.jam ? (
                <path
                  d="M40 190 Q110 168 180 190 L176 206 Q110 184 44 206 Z"
                  fill={f.jam}
                />
              ) : (
                f.layers.map((c, i) => (
                  <path
                    key={i}
                    d={`M${40 + i * 2} ${186 + i * 6} Q110 ${164 + i * 6} ${180 - i * 2} ${186 + i * 6} L${176 - i * 2} ${198 + i * 6} Q110 ${176 + i * 6} ${44 + i * 2} ${198 + i * 6} Z`}
                    fill={c}
                  />
                ))
              )}
              {/* ชิ้น/อีโมจิไส้ */}
              {emojis.map((e, i) => (
                <g
                  key={i}
                  className="whip-fruit"
                  style={{
                    transformOrigin: `${62 + i * 32}px 196px`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  <text
                    x={62 + i * 32}
                    y={204}
                    textAnchor="middle"
                    fontSize="18"
                  >
                    {e}
                  </text>
                </g>
              ))}
            </g>

            {/* 🍞 ขนมปังแผ่นหน้า (เยื้องลง ให้เห็นชั้น) */}
            <path d="M22 188 L104 40 L186 188 Z" fill="url(#sw-crust)" />
            <path d="M32 182 L104 54 L176 182 Z" fill="url(#sw-bread)" />
            {/* รูขนมปัง */}
            <circle cx="90" cy="120" r="2.5" fill="#f0d19a" />
            <circle cx="120" cy="138" r="2" fill="#f0d19a" />
            <circle cx="72" cy="160" r="2" fill="#f0d19a" />
            <circle cx="138" cy="166" r="2.5" fill="#f0d19a" />

            {/* 😊 หน้า */}
            {mood === "happy" ? (
              <>
                <path
                  d="M84 118 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2 Z"
                  fill="#3a2f45"
                />
                <path
                  d="M124 118 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2 Z"
                  fill="#3a2f45"
                />
                <path
                  d="M92 142 q12 12 24 0"
                  stroke="#3a2f45"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <>
                <g
                  className="whip-blink"
                  style={{ transformOrigin: "104px 124px" }}
                >
                  <ellipse cx="86" cy="124" rx="5" ry="6" fill="#3a2f45" />
                  <ellipse cx="122" cy="124" rx="5" ry="6" fill="#3a2f45" />
                  <circle cx="88" cy="121.5" r="1.8" fill="#ffffff" />
                  <circle cx="124" cy="121.5" r="1.8" fill="#ffffff" />
                </g>
                <path
                  d="M96 140 q8 6 16 0"
                  stroke="#3a2f45"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </>
            )}
            <ellipse cx="72" cy="138" rx="6" ry="3.6" fill="#f5b7c8" />
            <ellipse cx="136" cy="138" rx="6" ry="3.6" fill="#f5b7c8" />

            {/* 🖐️ แขนเล็ก ๆ */}
            <path
              d="M40 150 q-14 4 -18 16"
              stroke="#e3a85a"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M170 150 q14 4 18 16"
              stroke="#e3a85a"
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* 🍞 เศษขนมปัง */}
            <circle cx="36" cy="206" r="2.5" fill="#e3a85a" />
            <circle cx="186" cy="204" r="2" fill="#e3a85a" />
            <circle cx="196" cy="196" r="1.6" fill="#b9772e" />
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
