"use client";

import { useMemo } from "react";

/**
 * 🫧 SodaBubbleFrame — พื้นหลัง "โลกของอิตาเลียนโซดา"
 * - ฟองอากาศหลายขนาด สีขาว/ฟ้าอ่อน/ฟ้าใส โปร่งแสง มีแสงสะท้อน + เงาอ่อน (radial-gradient) ดูมีมิติ
 * - 3 ชั้นความลึก: ไกล (เล็ก จาง เบลอ) · กลาง · ใกล้ (ใหญ่ ชัด)
 * - ฟองบางส่วนลอยขึ้นช้า ๆ คนละจังหวะ จางหายด้านบน แล้ววนใหม่ (CSS keyframes ล้วน ใช้ transform/opacity)
 * - ฟองนิ่งบางลูกวางไว้เป็นของตกแต่ง
 * - รองรับ prefers-reduced-motion (ฟองหยุดนิ่ง) · pointer-events-none ไม่บังเนื้อหา
 */

type Bubble = {
  left: number; // %
  size: number; // px
  dur: number; // s
  delay: number; // s
  drift: number; // px แกว่งซ้ายขวา
  tint: "white" | "sky" | "clear";
  depth: "far" | "mid" | "near";
  rise: boolean;
  top?: number; // % สำหรับฟองนิ่ง
};

const TINT: Record<Bubble["tint"], string> = {
  // แสงสะท้อนมุมซ้ายบน + ตัวฟองโปร่ง + ขอบเข้มขึ้นเล็กน้อย
  white:
    "radial-gradient(circle at 30% 28%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 22%, rgba(255,255,255,0.14) 55%, rgba(200,232,255,0.30) 100%)",
  sky: "radial-gradient(circle at 30% 28%, rgba(255,255,255,0.9) 0%, rgba(190,230,255,0.55) 24%, rgba(142,216,248,0.16) 58%, rgba(90,175,224,0.34) 100%)",
  clear:
    "radial-gradient(circle at 30% 28%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.18) 26%, rgba(255,255,255,0.04) 60%, rgba(142,216,248,0.26) 100%)",
};

/* ฟองแบบ deterministic (ไม่สุ่มตอน render → ไม่มี hydration mismatch) */
function makeBubbles(): Bubble[] {
  const tints: Bubble["tint"][] = [
    "white",
    "sky",
    "clear",
    "clear",
    "white",
    "sky",
  ];
  const out: Bubble[] = [];
  // ลอยขึ้น 22 ลูก
  for (let i = 0; i < 30; i++) {
    const depth: Bubble["depth"] =
      i % 3 === 0 ? "near" : i % 3 === 1 ? "mid" : "far";
    const base = depth === "near" ? 64 : depth === "mid" ? 34 : 14;
    out.push({
      left: (i * 37 + 5) % 96,
      size: base + ((i * 13) % (depth === "near" ? 60 : depth === "mid" ? 30 : 18)),
      dur: (depth === "near" ? 16 : depth === "mid" ? 20 : 26) + ((i * 7) % 9),
      delay: -((i * 3.7) % 24), // ค่าลบ = เริ่มกลางทาง กระจายทั่วจอทันที
      drift: (i % 2 ? 1 : -1) * (8 + ((i * 5) % 16)),
      tint: tints[i % tints.length],
      depth,
      rise: true,
    });
  }
  // ฟองนิ่ง 8 ลูก (ตกแต่ง)
  const stat: [number, number, number, Bubble["tint"], Bubble["depth"]][] = [
    [2, 6, 150, "clear", "near"],
    [86, 4, 190, "white", "near"],
    [10, 40, 90, "sky", "mid"],
    [93, 34, 110, "clear", "mid"],
    [46, 2, 44, "white", "far"],
    [70, 52, 60, "sky", "far"],
    [30, 70, 34, "white", "far"],
    [84, 78, 120, "clear", "near"],
    [4, 88, 100, "sky", "near"],
    [52, 92, 48, "clear", "mid"],
  ];
  stat.forEach(([left, top, size, tint, depth], i) => {
    out.push({
      left,
      top,
      size,
      dur: 6 + i,
      delay: -i * 1.3,
      drift: 0,
      tint,
      depth,
      rise: false,
    });
  });
  return out;
}

export default function SodaBubbleFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  const bubbles = useMemo(makeBubbles, []);
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#e6f6ff] via-[#f7fcff] to-[#dff2ff]">
      {/* แสงฟุ้งฟ้าอ่อน */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-aqua-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-24 h-80 w-80 rounded-full bg-aqua-400/15 blur-3xl" />

      {/* 🫧 ฟองอากาศ */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {bubbles.map((b, i) => (
          <span
            key={i}
            className={`absolute rounded-full ${b.rise ? "animate-soda-rise" : "animate-soda-bob"} ${
              b.depth === "far"
                ? "blur-[1.5px]"
                : b.depth === "mid"
                  ? "blur-[0.5px]"
                  : ""
            }`}
            style={
              {
                left: `${b.left}%`,
                // ฟองลอย: กระจายจุดเริ่มทั่วความสูงของ section (หน้ายาว) แล้วลอยขึ้น ~90vh
                top: b.rise ? `${(i * 29 + 10) % 100}%` : `${b.top}%`,
                width: b.size,
                height: b.size,
                background: TINT[b.tint],
                boxShadow:
                  "inset -3px -4px 8px rgba(90,175,224,0.38), inset 2px 2px 4px rgba(255,255,255,0.9), 0 6px 14px rgba(90,175,224,0.18), 0 0 0 1px rgba(142,216,248,0.35)",
                opacity:
                  b.depth === "far" ? 0.45 : b.depth === "mid" ? 0.7 : 0.9,
                animationDuration: `${b.dur}s`,
                animationDelay: `${b.delay}s`,
                "--drift": `${b.drift}px`,
              } as React.CSSProperties
            }
          >
            {/* จุดแสงสะท้อนเล็ก ๆ */}
            <span
              className="absolute rounded-full bg-white"
              style={{
                left: "22%",
                top: "18%",
                width: Math.max(3, b.size * 0.18),
                height: Math.max(2, b.size * 0.12),
                opacity: 0.9,
                transform: "rotate(-30deg)",
              }}
            />
          </span>
        ))}
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
