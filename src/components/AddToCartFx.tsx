"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { SmoothiePalette } from "@/data/site";
import SmoothieCup from "@/components/SmoothieCup";
import Portal from "@/components/Portal";

/**
 * ✨ AddToCartFx — "แก้ว → ตะกร้า" แอนิเมชันหลักตอนกดเพิ่มลงตะกร้า (เล่นครั้งเดียว ~2 วิ)
 * เปลี่ยนรายละเอียดตาม variant:
 *   soda     🫧 ฟองซ่าผุด + น้ำแข็งกรุ๊งกริ๊ง
 *   diy      🧪 หลอดสลิงหยดไซรัปทีละสี → สีกระจาย → ฟองซ่า
 *   mystery  🎲 หลอด 5 หลอดสลับหมุน ? ? ? → สุ่มหยุด 1 หลอด → ประกาย → ลงแก้ว
 *   coffee ☕ ไอน้ำ · milk 🥛 ฟองนุ่ม · tea 🍵 ใบชา · smoothie 🍓 ผลไม้เด้ง · sticky 🍪 ช้อน+แครกเกอร์ · default ✨
 * จบด้วยแก้วบินไปที่ไอคอนตะกร้า + ตะกร้า "ดึ๋ง" 1 ครั้ง แล้วเรียก onDone
 */
export type AddToCartVariant =
  | "soda"
  | "diy"
  | "mystery"
  | "coffee"
  | "milk"
  | "tea"
  | "smoothie"
  | "sticky"
  | "default";

export type AddToCartFxProps = {
  variant: AddToCartVariant;
  palette: SmoothiePalette;
  emoji?: string;
  /** สีไซรัปที่เลือก (diy) */
  syrupColors?: string[];
  onDone: () => void;
};

const FX_MS: Record<AddToCartVariant, number> = {
  soda: 1300,
  diy: 1900,
  mystery: 2600,
  coffee: 1200,
  milk: 1200,
  tea: 1200,
  smoothie: 1200,
  sticky: 1300,
  default: 1000,
};
const FLY_MS = 650;

const LABEL: Record<AddToCartVariant, string> = {
  soda: "🫧 เพิ่มความซ่าเข้าตะกร้าแล้ว!",
  diy: "🧪 มิกซ์เสร็จแล้ว! พร้อมเข้าตะกร้า 💜",
  mystery: "🎲 สุ่มได้แล้ว! สูตรนี้ฟ่างเลือกให้ 💜",
  coffee: "☕ หอมกรุ่น เข้าตะกร้าแล้ว!",
  milk: "🥛 นุ่มละมุน เข้าตะกร้าแล้ว!",
  tea: "🍵 หอมชา เข้าตะกร้าแล้ว!",
  smoothie: "🍓 ปั่นสด เข้าตะกร้าแล้ว!",
  sticky: "🍪 เหนียวหนึบ เข้าตะกร้าแล้ว!",
  default: "✨ เพิ่มลงตะกร้าแล้ว!",
};

/** หาไอคอนตะกร้าบนหน้า (Navbar / MenuPageShell ใช้ aria-label เดียวกัน) */
function findCartIcon(): HTMLElement | null {
  const els = Array.from(
    document.querySelectorAll<HTMLElement>('[aria-label="ตะกร้าสินค้า"]'),
  );
  return els.find((e) => e.getBoundingClientRect().width > 0) ?? els[0] ?? null;
}

/* ---------- เอฟเฟกต์เฉพาะ variant (วางทับแก้ว) ---------- */
function Bubbles({ n = 8, tint = "#ffffff" }: { n?: number; tint?: string }) {
  const items = useMemo(
    () =>
      Array.from({ length: n }, (_, i) => ({
        left: 30 + ((i * 37) % 45),
        delay: (i % 4) * 0.18,
        size: 6 + (i % 3) * 4,
        dur: 0.9 + (i % 3) * 0.25,
      })),
    [n],
  );
  return (
    <>
      {items.map((b, i) => (
        <span
          key={i}
          className="animate-fx-bubble pointer-events-none absolute bottom-[18%] rounded-full ring-1 ring-white/70"
          style={
            {
              left: `${b.left}%`,
              width: b.size,
              height: b.size,
              background: tint,
              opacity: 0.85,
              animationDelay: `${b.delay}s`,
              "--dur": `${b.dur}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </>
  );
}

function FloatEmojis({ items, up = true }: { items: string[]; up?: boolean }) {
  return (
    <>
      {items.map((e, i) => (
        <span
          key={i}
          className={`pointer-events-none absolute text-xl ${up ? "animate-fx-rise" : "animate-fx-bounce"}`}
          style={{
            left: `${18 + ((i * 29) % 64)}%`,
            top: up ? "30%" : "10%",
            animationDelay: `${i * 0.12}s`,
          }}
        >
          {e}
        </span>
      ))}
    </>
  );
}

/* หลอดสลิงไซรัป */
function Tube({
  color,
  className = "",
  style,
  mystery,
}: {
  color: string;
  className?: string;
  style?: React.CSSProperties;
  mystery?: boolean;
}) {
  return (
    <span className={`inline-block ${className}`} style={style} aria-hidden>
      <svg viewBox="0 0 24 64" width="22" height="58" fill="none">
        <rect x="6" y="2" width="12" height="8" rx="2" fill="#7b4ab8" />
        <rect
          x="4"
          y="10"
          width="16"
          height="50"
          rx="8"
          fill="#ffffff"
          stroke="#d8c7f0"
          strokeWidth="2"
        />
        <rect
          x="6"
          y="26"
          width="12"
          height="32"
          rx="6"
          fill={mystery ? "#c9b3e8" : color}
        />
        {mystery && (
          <text
            x="12"
            y="47"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="#5f339c"
          >
            ?
          </text>
        )}
        <rect
          x="7"
          y="14"
          width="3"
          height="20"
          rx="1.5"
          fill="#ffffff"
          opacity="0.7"
        />
      </svg>
    </span>
  );
}

export default function AddToCartFx({
  variant,
  palette,
  emoji,
  syrupColors = [],
  onDone,
}: AddToCartFxProps) {
  const [phase, setPhase] = useState<"fx" | "fly" | "done">("fx");
  const [pick, setPick] = useState<number | null>(null); // mystery: หลอดที่สุ่มหยุด
  const cupRef = useRef<HTMLDivElement>(null);
  const [fly, setFly] = useState<{ x: number; y: number; s: number } | null>(
    null,
  );

  useEffect(() => {
    const t1 = window.setTimeout(() => {
      // คำนวณระยะบินไปยังไอคอนตะกร้า
      const icon = findCartIcon();
      const cup = cupRef.current;
      if (icon && cup) {
        const a = cup.getBoundingClientRect();
        const b = icon.getBoundingClientRect();
        setFly({
          x: b.left + b.width / 2 - (a.left + a.width / 2),
          y: b.top + b.height / 2 - (a.top + a.height / 2),
          s: Math.max(0.12, Math.min(0.25, b.width / a.width)),
        });
      } else {
        setFly({ x: 0, y: -window.innerHeight * 0.5, s: 0.15 });
      }
      setPhase("fly");
    }, FX_MS[variant]);
    const t2 = window.setTimeout(() => {
      const icon = findCartIcon();
      if (icon) {
        icon.classList.add("cart-bump");
        window.setTimeout(() => icon.classList.remove("cart-bump"), 700);
      }
      setPhase("done");
      onDone();
    }, FX_MS[variant] + FLY_MS);
    // mystery: สุ่มหยุดหลอดหลังหมุน ~1.1 วิ
    const t3 =
      variant === "mystery"
        ? window.setTimeout(() => setPick(Math.floor(Math.random() * 5)), 1100)
        : 0;
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (t3) clearTimeout(t3);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isSoda =
    variant === "soda" || variant === "diy" || variant === "mystery";
  const cupPalette = palette;

  return (
    <Portal lockScroll={false}>
      {/* ฉากหลังจาง ๆ ไม่บังหน้า */}
      <div className="pointer-events-none fixed inset-0 z-[130] grid place-items-center">
        <div
          className={`transition-opacity duration-300 ${phase === "fx" ? "opacity-100" : "opacity-0"} absolute inset-0 bg-ink/25 backdrop-blur-[2px]`}
        />

        {/* 🎲 mystery: หลอด 5 หลอดสลับหมุน แล้วหยุดที่ 1 หลอด */}
        {variant === "mystery" && phase === "fx" && (
          <div className="absolute top-[26%] flex items-end gap-2 sm:gap-3">
            {Array.from({ length: 5 }).map((_, i) => {
              const picked = pick === i;
              const dim = pick !== null && !picked;
              return (
                <div key={i} className="relative">
                  <Tube
                    color="#c9b3e8"
                    mystery
                    className={
                      pick === null
                        ? "animate-fx-shuffle"
                        : picked
                          ? "animate-fx-pick"
                          : "opacity-30 transition-opacity duration-300"
                    }
                    style={{
                      animationDelay: `${i * 0.08}s`,
                      opacity: dim ? 0.3 : 1,
                    }}
                  />
                  {picked && (
                    <span className="animate-fx-sparkle absolute -inset-3 grid place-items-center text-2xl">
                      ✨
                    </span>
                  )}
                </div>
              );
            })}
            {pick === null && (
              <span className="animate-fx-qmark absolute -top-8 left-1/2 -translate-x-1/2 font-display text-2xl font-bold text-white drop-shadow">
                ? ? ?
              </span>
            )}
          </div>
        )}

        {/* 🧪 diy: หลอดสลิงหยดไซรัปทีละสี */}
        {variant === "diy" && phase === "fx" && (
          <div className="absolute top-[30%] flex gap-3">
            {(syrupColors.length ? syrupColors : ["#f0507f"])
              .slice(0, 3)
              .map((c, i) => (
                <div key={i} className="relative">
                  <Tube
                    color={c}
                    className="animate-fx-tube-tilt"
                    style={{ animationDelay: `${i * 0.45}s` }}
                  />
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="animate-fx-drip absolute left-1/2 top-[90%] h-2.5 w-2.5 -translate-x-1/2 rounded-full"
                      style={{
                        background: c,
                        animationDelay: `${0.25 + i * 0.45 + d * 0.12}s`,
                      }}
                    />
                  ))}
                </div>
              ))}
          </div>
        )}

        {/* 🥤 แก้ว — บินเข้าตะกร้าตอน phase fly */}
        <div
          ref={cupRef}
          className={`relative ${phase === "fx" ? (isSoda ? "animate-fx-cup-fizz" : "animate-fx-cup-pop") : ""}`}
          style={
            phase !== "fx" && fly
              ? {
                  transition: `transform ${FLY_MS}ms cubic-bezier(0.5, -0.1, 0.6, 1), opacity ${FLY_MS}ms ease-in`,
                  transform: `translate(${fly.x}px, ${fly.y}px) scale(${fly.s}) rotate(18deg)`,
                  opacity: 0.2,
                }
              : undefined
          }
        >
          <div className="relative">
            <SmoothieCup
              palette={cupPalette}
              emoji={emoji ?? "🥤"}
              size={140}
            />
            {/* สีไซรัปกระจายในแก้ว (diy) */}
            {variant === "diy" && phase === "fx" && (
              <div className="pointer-events-none absolute inset-x-[26%] bottom-[12%] top-[40%] overflow-hidden rounded-b-[30px]">
                {(syrupColors.length ? syrupColors : ["#f0507f"])
                  .slice(0, 3)
                  .map((c, i) => (
                    <span
                      key={i}
                      className="animate-fx-swirl absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
                      style={{
                        background: c,
                        opacity: 0.75,
                        animationDelay: `${0.6 + i * 0.45}s`,
                      }}
                    />
                  ))}
              </div>
            )}
            {phase === "fx" && (
              <div className="pointer-events-none absolute inset-0">
                {isSoda && <Bubbles n={variant === "mystery" ? 12 : 9} />}
                {isSoda && <FloatEmojis items={["🧊", "🧊"]} up={false} />}
                {variant === "coffee" && (
                  <FloatEmojis items={["♨️", "☁️", "♨️"]} />
                )}
                {variant === "milk" && <Bubbles n={7} tint="#fff6ea" />}
                {variant === "tea" && (
                  <FloatEmojis items={["🍃", "✨", "🍃"]} />
                )}
                {variant === "smoothie" && (
                  <FloatEmojis items={["🍓", "🥭", "🫐", "🍌"]} up={false} />
                )}
                {variant === "sticky" && (
                  <FloatEmojis items={["🥄", "🍪", "🍪"]} up={false} />
                )}
                {variant === "default" && (
                  <FloatEmojis items={["✨", "💜", "✨"]} />
                )}
              </div>
            )}
          </div>
        </div>

        {/* ข้อความสั้น ๆ */}
        {phase === "fx" && (
          <p className="animate-reveal-in absolute bottom-[26%] rounded-full bg-white/90 px-4 py-1.5 font-display text-sm font-bold text-grape-700 shadow-soft sm:text-base">
            {variant === "mystery"
              ? pick === null
                ? "🎲 ฟ่างกำลังสุ่มให้... ? ? ?"
                : LABEL.mystery
              : LABEL[variant]}
          </p>
        )}
        {variant === "mystery" && phase === "fx" && pick !== null && (
          <p className="animate-reveal-in absolute bottom-[20%] text-xs text-white/90 drop-shadow">
            🤫 จะเป็น SECRET หรือเปล่า... ต้องรอเปิดดูตอนได้ของ 👀
          </p>
        )}
      </div>
    </Portal>
  );
}
