"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

type Variant = "hearts" | "cool" | "sparkle";

type Pairing = {
  theme: string;
  emoji: string;
  items: string[];
  menuName: string;
  accent: string;
  href: string;
  variant: Variant;
};

const PAIRINGS: Pairing[] = [
  {
    theme: "คู่ฮิต",
    emoji: "🔥",
    items: ["🍓 สตรอว์เบอร์รี", "🍌 กล้วย"],
    menuName: "สตรอว์เบอร์รีกล้วยปั่น",
    accent: "from-blossom-100 to-blossom-200/60",
    href: "/mix?preset=strawberry-banana",
    variant: "hearts",
  },
  {
    theme: "สายสดชื่น",
    emoji: "🧊",
    items: ["🍓 สตรอว์เบอร์รี", "🍋 เลมอน", "＋ โซดา"],
    menuName: "สตรอว์เบอร์รีเลมอนโซดา",
    accent: "from-sky-100 to-grape-100/70",
    href: "/mix?preset=strawberry-lemon-soda",
    variant: "cool",
  },
  {
    theme: "สายหวาน",
    emoji: "🐻",
    items: ["🥛 นมหมี", "🍫 โกโก้"],
    menuName: "นมหมีโกโก้ปั่น",
    accent: "from-amber-100 to-blossom-100/60",
    href: "/mix?preset=bearmilk-cocoa",
    variant: "sparkle",
  },
];

const VARIANT_EMOJI: Record<Variant, string> = {
  hearts: "💕",
  cool: "❄️",
  sparkle: "✨",
};

function PairingCard({ p }: { p: Pairing }) {
  const [phase, setPhase] = useState<"idle" | "mixing" | "done">("idle");

  const f1 = p.items[0]?.split(" ")[0] ?? "🍓";
  const f2 = p.items[1]?.split(" ")[0] ?? "🍌";
  const deco = VARIANT_EMOJI[p.variant];
  const spin = p.variant !== "hearts"; // เลมอน/คุกกี้ หมุนเบา ๆ

  const startMix = () => {
    if (phase !== "idle") return;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setPhase("done");
      return;
    }
    setPhase("mixing");
    setTimeout(() => setPhase("done"), 950);
  };

  return (
    <div
      className={`group hover-lift relative flex min-h-[320px] flex-col items-center overflow-hidden rounded-3xl bg-gradient-to-br ${p.accent} p-6 text-center shadow-card ring-1 ring-white/70`}
    >
      {/* แสง gradient เบา ๆ ตอน hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {/* ประกายมุมขวาบนตอน hover */}
      <span className="pointer-events-none absolute right-3 top-3 text-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:[animation:twinkle_1.4s_ease-in-out_infinite]">
        ✨
      </span>

      {phase === "done" ? (
        /* ---- ผลลัพธ์ ---- */
        <div className="animate-reveal-in relative flex flex-1 flex-col items-center justify-center">
          <span className="animate-mix-pop text-5xl">🥤</span>
          <p className="mt-3 font-display text-base font-bold text-grape-700">
            ลองเมนูนี้ไหม? 💜
          </p>
          <p className="font-display text-lg font-bold text-blossom-500">
            {p.menuName}
          </p>
          <p className="mt-1 text-xs text-grape-500">{p.items.join(" + ")}</p>
          <Link
            href={p.href}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-grape-deep px-6 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:scale-[1.04]"
          >
            สร้างแก้วนี้ 🍹
          </Link>
          <button
            onClick={() => setPhase("idle")}
            className="mt-2 text-xs font-medium text-grape-500 underline-offset-2 hover:underline"
          >
            ↺ ผสมใหม่
          </button>
        </div>
      ) : (
        /* ---- idle / mixing (กดที่การ์ดเพื่อผสม) ---- */
        <button
          onClick={startMix}
          className="relative flex flex-1 flex-col items-center"
          aria-label={`ผสม ${p.menuName}`}
        >
          {phase === "mixing" ? (
            /* แอนิเมชันผสม: ผลไม้วิ่งเข้าหากัน + ประกาย + เดโครลอยขึ้น */
            <div className="relative grid h-16 w-full place-items-center">
              <div className="flex items-center">
                <span className="animate-converge-r text-4xl">{f1}</span>
                <span
                  className={`text-4xl ${
                    spin ? "[animation:spin-soft_0.9s_ease-in-out]" : "animate-converge-l"
                  }`}
                >
                  {f2}
                </span>
              </div>
              <span className="animate-mix-burst pointer-events-none absolute text-3xl">
                ✨
              </span>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="animate-mix-rise pointer-events-none absolute text-xl"
                  style={{
                    left: `${30 + i * 20}%`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                >
                  {deco}
                </span>
              ))}
            </div>
          ) : (
            <span className="grid h-16 w-16 place-items-center rounded-full bg-white/80 text-4xl shadow-soft transition-transform group-hover:[animation:wiggle_0.6s_ease-in-out]">
              {p.emoji}
            </span>
          )}

          <h3 className="font-display mt-4 text-lg font-bold text-grape-700">
            {p.theme}
          </h3>

          <div className="mt-3 flex flex-1 flex-col items-center gap-1.5">
            {p.items.map((it) => (
              <span
                key={it}
                className="rounded-full bg-white/70 px-4 py-1.5 text-sm font-medium text-grape-600"
              >
                {it}
              </span>
            ))}
          </div>

          <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-grape-600 px-6 py-2.5 text-sm font-semibold text-white shadow-soft transition-all group-hover:bg-grape-700">
            {phase === "mixing" ? (
              <>
                <Sparkles size={16} className="animate-spin" /> กำลังผสม...
              </>
            ) : (
              <>
                เอาคู่นี้!
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </>
            )}
          </span>
        </button>
      )}
    </div>
  );
}

export default function MixPairings() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
      <div className="mb-8 text-center">
        <h2 className="font-display text-3xl font-bold text-grape-700 sm:text-4xl">
          ไม่รู้จะมิกซ์อะไร? <span className="text-blossom-500">ฟ่างจับคู่ให้</span> 💕
        </h2>
        <p className="mt-2 text-grape-500">
          แตะการ์ดเพื่อดูสูตรที่ฟ่างจับคู่ให้ แล้วสร้างแก้วนั้นได้เลย!
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {PAIRINGS.map((p) => (
          <PairingCard key={p.theme} p={p} />
        ))}
      </div>
    </section>
  );
}
