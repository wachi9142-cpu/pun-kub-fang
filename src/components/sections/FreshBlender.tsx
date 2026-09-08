"use client";

import type { FreshItem } from "@/data/site";
import SmoothieCup from "@/components/SmoothieCup";

export type BlendPhase = "idle" | "blending" | "done";

/* สีตัวแทนของแต่ละวัตถุดิบ — ใช้ผสมเป็นสีสมูทตี้ */
const COLORS: Record<string, string> = {
  banana: "#f6e58d", strawberry: "#ff5e78", apple: "#e74c3c",
  pineapple: "#f6c945", watermelon: "#ff6b81", orange: "#ff9f43",
  kiwi: "#7bc043", grape: "#8e6cef", "shine-muscat": "#a8d84f",
  blueberry: "#4a69bd", mulberry: "#7d3560", dragonfruit: "#ff4d94",
  pomegranate: "#c0392b", passion: "#f7b731", pear: "#c8d96f",
  persimmon: "#e67e22", cantaloupe: "#f6b93b", melon: "#78e08f",
  roseapple: "#ff9ff3", guava: "#8fd14f", jicama: "#efe4cf",
  carrot: "#ff7f27", cucumber: "#7bed9f", tomato: "#ff6348",
  spinach: "#4cae50", lettuce: "#a3cb38", celery: "#9ccc4f",
  beetroot: "#a83279", kale: "#2e8b57",
  honey: "#f9ca24", yogurt: "#fff7ea", milk: "#f6f6ff", syrup: "#f5e6c8",
};
const DEFAULT_COLOR = "#e9d8f5";

const hexToRgb = (h: string): [number, number, number] => {
  const s = h.replace("#", "");
  return [
    parseInt(s.slice(0, 2), 16),
    parseInt(s.slice(2, 4), 16),
    parseInt(s.slice(4, 6), 16),
  ];
};
const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
const rgbToHex = (r: number, g: number, b: number) =>
  "#" + [r, g, b].map((n) => clamp(n).toString(16).padStart(2, "0")).join("");
const mixColors = (hexes: string[]) => {
  if (!hexes.length) return DEFAULT_COLOR;
  const sum = hexes.reduce(
    (a, h) => {
      const [r, g, b] = hexToRgb(h);
      return [a[0] + r, a[1] + g, a[2] + b];
    },
    [0, 0, 0],
  );
  return rgbToHex(sum[0] / hexes.length, sum[1] / hexes.length, sum[2] / hexes.length);
};
const lighten = (hex: string, amt: number) => {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(r + (255 - r) * amt, g + (255 - g) * amt, b + (255 - b) * amt);
};
const darken = (hex: string, amt: number) => {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(r * (1 - amt), g * (1 - amt), b * (1 - amt));
};

/* ตำแหน่งวัตถุดิบลอยในโถ (%) */
const POS = [
  [22, 16], [60, 12], [40, 32], [74, 38], [16, 50],
  [52, 54], [30, 70], [66, 66], [46, 84],
];

export default function FreshBlender({
  items,
  phase,
}: {
  items: FreshItem[];
  phase: BlendPhase;
}) {
  const blendColor = mixColors(items.map((i) => COLORS[i.id] ?? DEFAULT_COLOR));
  const cupPalette = {
    foam: lighten(blendColor, 0.6),
    top: blendColor,
    bottom: darken(blendColor, 0.24),
  };

  // ระดับน้ำในโถ ตามจำนวนวัตถุดิบ
  const level = items.length === 0 ? 0 : Math.min(78, 34 + items.length * 4);
  const liquidY = 176 - (124 * level) / 100; // ในพิกัด SVG (โถ ~52..176)

  const blending = phase === "blending";
  const visible = items.slice(0, POS.length);
  const extra = items.length - visible.length;

  if (phase === "done") {
    const sparkles = [
      { e: "✨", pos: "left-1 top-3", d: "0s" },
      { e: "💧", pos: "right-2 top-7", d: "0.3s" },
      { e: "✨", pos: "right-4 top-1/3", d: "0.15s" },
      { e: "💫", pos: "left-3 top-12", d: "0.4s" },
      { e: "💧", pos: "left-6 bottom-20", d: "0.5s" },
      { e: "✨", pos: "right-1 bottom-24", d: "0.25s" },
    ];
    return (
      <div className="relative mx-auto grid h-[230px] w-[190px] place-items-center">
        <div className="animate-serve-pop">
          <SmoothieCup palette={cupPalette} emoji="🥤" size={150} />
        </div>
        {/* ประกาย + หยดน้ำ (เล่นครั้งเดียวแล้วจางหาย) */}
        <div className="pointer-events-none absolute inset-0">
          {sparkles.map((s, i) => (
            <span
              key={i}
              className={`animate-serve-sparkle absolute text-lg ${s.pos}`}
              style={{ animationDelay: s.d }}
            >
              {s.e}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto h-[230px] w-[190px] select-none">
      <svg
        viewBox="0 0 190 230"
        className={`absolute inset-0 h-full w-full ${blending ? "animate-blend-shake" : ""}`}
      >
        <defs>
          <clipPath id="jarClip">
            <rect x="46" y="54" width="98" height="122" rx="12" />
          </clipPath>
        </defs>

        {/* ฐานเครื่องปั่น */}
        <rect x="50" y="186" width="90" height="36" rx="13" fill="#5f339c" />
        <rect x="58" y="214" width="74" height="12" rx="6" fill="#4a2680" />
        <circle cx="95" cy="204" r="5.5" fill={blending ? "#8ed8f8" : "#c9b3e8"} />
        <rect x="105" y="200" width="18" height="8" rx="4" fill="#7b4ab8" />

        {/* โถแก้ว (สีเห็นชัดบนพื้นขาว) */}
        <rect x="42" y="50" width="106" height="130" rx="14"
          fill="#f0e9fb" stroke="#a98fd6" strokeWidth="3" />
        <rect x="42" y="50" width="106" height="130" rx="14" fill="none"
          stroke="#ffffff" strokeWidth="1" opacity="0.6" />
        {/* เส้นไฮไลต์แก้ว */}
        <rect x="52" y="60" width="6" height="108" rx="3" fill="#ffffff" opacity="0.55" />
        {/* ฝา */}
        <rect x="36" y="34" width="118" height="18" rx="9" fill="#c9b3e8" />
        <rect x="82" y="24" width="26" height="13" rx="6.5" fill="#a98fd6" />

        {/* น้ำสมูทตี้ */}
        {level > 0 && (
          <g clipPath="url(#jarClip)">
            <rect x="46" y={liquidY} width="98" height={176 - liquidY} fill={blendColor} opacity="0.92" />
            <ellipse cx="95" cy={liquidY} rx="49" ry="6" fill={lighten(blendColor, 0.18)} />
          </g>
        )}

        {/* ใบมีด */}
        <g style={{ transformOrigin: "95px 172px" }} className={blending ? "animate-blade-spin" : ""}>
          <rect x="80" y="169" width="30" height="5" rx="2.5" fill="#b9b9c9" />
          <rect x="80" y="169" width="30" height="5" rx="2.5" fill="#b9b9c9" transform="rotate(90 95 171.5)" />
          <circle cx="95" cy="171.5" r="3.5" fill="#8a8aa0" />
        </g>
      </svg>

      {/* วัตถุดิบลอยในโถ (overlay) */}
      <div
        className={`pointer-events-none absolute transition-opacity duration-300 ${
          blending ? "opacity-70 blur-[1.5px]" : "opacity-100"
        }`}
        style={{ left: "24%", right: "24%", top: "24%", bottom: "26%" }}
      >
        {visible.map((it, i) => {
          const [x, y] = POS[i];
          return (
            <span
              key={it.id}
              className={`animate-ingredient-drop absolute grid place-items-center ${
                blending ? "animate-blend-swirl" : "animate-floaty-slow"
              }`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                animationDelay: blending ? "0s" : `${(i % 4) * 0.4}s`,
              }}
            >
              {it.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={it.image} alt={it.label} className="h-5 w-5 object-contain sm:h-6 sm:w-6" />
              ) : (
                <span className="text-lg sm:text-xl">{it.emoji}</span>
              )}
            </span>
          );
        })}
        {extra > 0 && (
          <span className="absolute bottom-0 right-0 rounded-full bg-white/85 px-1.5 text-[10px] font-bold text-grape-700 shadow">
            +{extra}
          </span>
        )}
      </div>
    </div>
  );
}
