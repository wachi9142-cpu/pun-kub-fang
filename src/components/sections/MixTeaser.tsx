"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight } from "lucide-react";

type Combo = {
  a: { emoji: string; label: string };
  b: { emoji: string; label: string };
  result: { emoji: string; label: string };
};

const COMBOS: Combo[] = [
  {
    a: { emoji: "🍓", label: "สตรอว์เบอร์รี" },
    b: { emoji: "🍌", label: "กล้วย" },
    result: { emoji: "🥤", label: "สตรอว์เบอร์รีบานาน่าปั่น" },
  },
  {
    a: { emoji: "🍋", label: "เลมอน" },
    b: { emoji: "🧊", label: "โซดา" },
    result: { emoji: "🥤", label: "เลมอนโซดาซ่า" },
  },
  {
    a: { emoji: "🥛", label: "นมหมี" },
    b: { emoji: "🍪", label: "โอรีโอ" },
    result: { emoji: "🥤", label: "นมหมีโอรีโอปั่น" },
  },
];

/* ประกายเวทมนตร์ลอยขึ้น (พื้นหลังการ์ด) */
const MAGIC = [
  { e: "✨", left: "8%", dur: "5.5s", delay: "0s", size: "text-xl" },
  { e: "💜", left: "22%", dur: "6.4s", delay: "1.2s", size: "text-lg" },
  { e: "⭐", left: "38%", dur: "5.8s", delay: "0.5s", size: "text-base" },
  { e: "💫", left: "58%", dur: "6.8s", delay: "1.8s", size: "text-xl" },
  { e: "✨", left: "74%", dur: "5.6s", delay: "0.9s", size: "text-lg" },
  { e: "🌟", left: "90%", dur: "6.2s", delay: "0.2s", size: "text-base" },
];

export default function MixTeaser() {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);

  const goMix = (e: React.MouseEvent) => {
    e.preventDefault();
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => router.push("/mix"), 900);
  };

  return (
    <section id="mix" className="scroll-mt-24 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-grape-600 via-grape-500 to-blossom-500 p-6 text-center shadow-card sm:p-10 lg:p-12">
          {/* ✨ ประกายเวทมนตร์ลอยขึ้น */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            {MAGIC.map((m, i) => (
              <span
                key={i}
                className={`animate-magic-float absolute bottom-4 ${m.size}`}
                style={
                  { left: m.left, "--dur": m.dur, "--delay": m.delay } as CSSProperties
                }
              >
                {m.e}
              </span>
            ))}
          </div>

          {/* ประกายมุมการ์ด (กะพริบ) */}
          <span className="animate-twinkle pointer-events-none absolute left-8 top-8 text-3xl">✨</span>
          <span className="animate-twinkle pointer-events-none absolute right-10 bottom-10 text-4xl" style={{ animationDelay: "1s" }}>💜</span>

          <span className="relative inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white">
            <Sparkles size={15} /> จุดเด่นของร้าน
          </span>
          <h2 className="font-display relative mt-4 text-3xl font-bold text-white sm:text-5xl">
            มิกซ์กับฟ่าง <span className="animate-twinkle inline-block text-cream-100">✨</span>
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-white/85">
            เบื่อรสเดิม ๆ? จับคู่ความอร่อยในแบบของคุณเอง
          </p>

          {/* คู่รสชาติ — hover แล้ว "มิกซ์" */}
          <div className="relative mt-9 grid gap-4 sm:grid-cols-3">
            {COMBOS.map((c, i) => (
              <div
                key={i}
                className="group relative cursor-default rounded-3xl bg-white/90 p-5 shadow-soft ring-1 ring-white/60 transition-all hover:-translate-y-1 hover:shadow-card"
              >
                {/* ประกายตอน hover */}
                <span className="pointer-events-none absolute right-4 top-3 text-lg opacity-0 transition-opacity duration-300 group-hover:animate-twinkle group-hover:opacity-100">
                  ✨
                </span>
                <div className="flex items-center justify-center gap-2.5">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-blossom-50 text-3xl transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
                    {c.a.emoji}
                  </span>
                  <span className="font-display text-xl font-bold text-grape-400 transition-transform duration-300 group-hover:scale-125">
                    ＋
                  </span>
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-grape-50 text-3xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                    {c.b.emoji}
                  </span>
                  <ArrowRight
                    size={22}
                    className="text-grape-400 transition-transform duration-300 group-hover:translate-x-1"
                  />
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-grape-100 to-blossom-100 text-3xl transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6">
                    {c.result.emoji}
                  </span>
                </div>
                <p className="mt-3 text-sm font-medium text-grape-600">
                  {c.a.label} + {c.b.label}
                </p>
                <p className="font-display text-base font-semibold text-grape-700">
                  = {c.result.label}
                </p>
              </div>
            ))}
          </div>

          {/* ปุ่มใหญ่ */}
          <Link
            href="/mix"
            onClick={goMix}
            className="relative mt-9 inline-flex items-center gap-3 rounded-full bg-white px-9 py-4 text-lg font-bold text-grape-700 shadow-card transition-all hover:scale-[1.04] hover:text-blossom-500"
          >
            <Sparkles size={20} className="animate-twinkle text-blossom-500" />
            สร้างแก้วของฉัน
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* ✨ Transition เวทมนตร์ → เปลี่ยนหน้า /mix */}
      {leaving && (
        <div className="animate-pop-in fixed inset-0 z-[105] grid place-items-center bg-gradient-to-br from-grape-700 via-grape-600 to-blossom-500">
          <div className="relative grid h-48 w-48 place-items-center">
            {["✨", "💜", "⭐", "💫", "🌟", "✨", "💜", "⭐"].map((s, i) => {
              const ang = (i / 8) * Math.PI * 2;
              return (
                <span
                  key={i}
                  className="animate-fresh-gather absolute text-3xl"
                  style={
                    {
                      "--tx": `${Math.cos(ang) * 90}px`,
                      "--ty": `${Math.sin(ang) * 90}px`,
                      animationDelay: `${i * 0.05}s`,
                    } as CSSProperties
                  }
                >
                  {s}
                </span>
              );
            })}
            <span className="animate-mix-burst absolute text-6xl">🥤</span>
          </div>
          <p className="absolute bottom-24 text-lg font-bold text-white">
            กำลังเสกแก้วของคุณ... ✨
          </p>
        </div>
      )}
    </section>
  );
}
