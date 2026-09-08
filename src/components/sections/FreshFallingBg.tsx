import type { CSSProperties } from "react";

type Drop = {
  e: string;
  left: string;
  dur: string;
  delay: string;
  spin: string;
  size: string;
  hide?: boolean; // ซ่อนบนมือถือเพื่อความลื่น
};

/* ผัก/ผลไม้ร่วงจากด้านบน — จังหวะ/ความเร็ว/หมุนต่างกัน */
const DROPS: Drop[] = [
  { e: "🍓", left: "5%", dur: "4.4s", delay: "0s", spin: "260deg", size: "text-2xl" },
  { e: "🥝", left: "17%", dur: "5.2s", delay: "0.6s", spin: "-220deg", size: "text-xl", hide: true },
  { e: "🍌", left: "29%", dur: "4.8s", delay: "1.1s", spin: "300deg", size: "text-2xl" },
  { e: "🍊", left: "41%", dur: "5.6s", delay: "0.3s", spin: "-280deg", size: "text-xl", hide: true },
  { e: "🥕", left: "53%", dur: "4.6s", delay: "1.5s", spin: "240deg", size: "text-2xl" },
  { e: "🥬", left: "65%", dur: "5.4s", delay: "0.9s", spin: "-260deg", size: "text-xl", hide: true },
  { e: "🍍", left: "77%", dur: "4.9s", delay: "0.2s", spin: "320deg", size: "text-2xl" },
  { e: "🍎", left: "88%", dur: "5.1s", delay: "1.3s", spin: "-240deg", size: "text-xl" },
  { e: "🫐", left: "95%", dur: "4.7s", delay: "0.7s", spin: "280deg", size: "text-lg", hide: true },
];

export default function FreshFallingBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {DROPS.map((d, i) => (
        <span
          key={i}
          className={`animate-fresh-fall absolute top-0 opacity-70 ${d.size} ${
            d.hide ? "hidden sm:inline-block" : ""
          }`}
          style={
            {
              left: d.left,
              "--dur": d.dur,
              "--delay": d.delay,
              "--spin": d.spin,
            } as CSSProperties
          }
        >
          {d.e}
        </span>
      ))}

      {/* ลอย/หมุนเบา ๆ รอบ ๆ (ซ่อนบนมือถือ) */}
      <span className="animate-fresh-float absolute left-2 top-24 hidden text-xl opacity-25 sm:inline-block">
        🥝
      </span>
      <span className="animate-fresh-float absolute right-3 top-40 hidden text-xl opacity-25 sm:inline-block">
        🍓
      </span>
      <span className="animate-fresh-float absolute left-6 bottom-24 hidden text-lg opacity-20 sm:inline-block">
        🥬
      </span>
    </div>
  );
}
