"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

/**
 * 🎲 LuckyTeaser — การ์ด Feature "สุ่มแก้วกับฟ่าง" บนหน้าแรก (สไตล์เดียวกับ "มิกซ์กับฟ่าง")
 * - หน้าปกเท่านั้น: "อยากลองไหม?" → ไม่โชว์ตู้กาชาเต็มตัว ไม่มีแอนิเมชันหนัก
 * - ภาพประกอบ = ลูกกาชาปองน่ารัก ๆ 3 ลูก + ลูกกลาง "?" เด้ง/กระดุ๊กกระดิกเบา ๆ
 * - ปุ่ม "🎰 เข้าไปสุ่มเลย!" → /lucky-drink (ตู้กาชาปองจริง)
 */

const CAPSULES = [
  { top: "#b48cff", bottom: "#ece2ff", icon: "🧋", delay: "0s", size: 72 },
  { top: "#ff8fb1", bottom: "#ffe3ec", icon: "?", delay: "0.4s", size: 96 },
  { top: "#ffd76a", bottom: "#fff4cc", icon: "🍓", delay: "0.8s", size: 72 },
];

function Capsule({
  top,
  bottom,
  icon,
  delay,
  size,
}: (typeof CAPSULES)[number]) {
  return (
    <span
      className="lucky-teaser-capsule inline-block"
      style={{ width: size, height: size, animationDelay: delay }}
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden>
        <circle
          cx="50"
          cy="50"
          r="46"
          fill={bottom}
          stroke="#ffffff"
          strokeWidth="4"
        />
        <path d="M4 50 a46 46 0 0 1 92 0 Z" fill={top} />
        <rect
          x="4"
          y="47"
          width="92"
          height="6"
          fill="#ffffff"
          opacity="0.85"
        />
        <circle cx="30" cy="28" r="7" fill="#ffffff" opacity="0.85" />
        <text
          x="50"
          y={icon === "?" ? 82 : 78}
          textAnchor="middle"
          fontSize={icon === "?" ? 30 : 24}
          fontWeight="800"
          fill="#7b4ab8"
        >
          {icon}
        </text>
      </svg>
    </span>
  );
}

export default function LuckyTeaser() {
  return (
    <section id="lucky" className="scroll-mt-24 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-grape-700 via-grape-500 to-blossom-400 p-6 text-center shadow-card sm:p-10 lg:p-12">
          {/* ✨ ประกายมุมการ์ด */}
          <span className="animate-twinkle pointer-events-none absolute left-8 top-8 text-3xl">
            ✨
          </span>
          <span
            className="animate-twinkle pointer-events-none absolute right-10 top-12 text-2xl"
            style={{ animationDelay: "0.6s" }}
          >
            ⭐
          </span>
          <span
            className="animate-twinkle pointer-events-none absolute bottom-10 left-12 text-3xl"
            style={{ animationDelay: "1.2s" }}
          >
            💜
          </span>
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-blossom-200/30 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:text-left">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white">
                <Sparkles size={15} /> Fang&apos;s Lucky Drink
              </span>
              <h2 className="font-display mt-4 text-3xl font-bold text-white sm:text-5xl">
                🎲 สุ่มแก้วกับฟ่าง{" "}
                <span className="animate-twinkle inline-block text-cream-100">
                  ✨
                </span>
              </h2>
              <p className="font-display mt-3 text-lg font-semibold text-white/95 sm:text-xl">
                คิดไม่ออกว่าจะดื่มอะไร? ให้ฟ่างสุ่มให้เลย! 💜
              </p>
              <p className="mx-auto mt-2 max-w-md text-white/80 lg:mx-0">
                เมนูลับ เมนูมั่ว เมนูแปลก ๆ และเมนูที่ไม่มีอยู่ในเมนูหลัก
                บางครั้งดวงดีอาจได้เมนูปั่นหรือสมูทตี้ด้วย 👀🍀
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-1.5 lg:justify-start">
                {[
                  "👀 เมนูลับ",
                  "🧪 เมนูทดลอง",
                  "😂 เมนูมั่ว ๆ",
                  "🍀 ดวงดีได้เมนูปั่น",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/30"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Link
                href="/lucky-drink"
                className="font-display group mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-grape-700 shadow-lg ring-4 ring-white/30 transition hover:scale-105 hover:shadow-xl active:scale-95 sm:text-lg"
              >
                🎰 เข้าไปสุ่มเลย!
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* 🟣 ลูกกาชาปอง 3 ลูก เด้งเบา ๆ */}
            <div className="order-first flex items-end justify-center gap-2 sm:gap-4 lg:order-none">
              {CAPSULES.map((c) => (
                <Capsule key={c.icon} {...c} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
