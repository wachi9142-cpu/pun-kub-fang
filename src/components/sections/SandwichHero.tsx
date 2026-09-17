"use client";

import { HelperCat } from "@/components/MagicCats";
import { SandwichSlice } from "@/components/SandwichCharacter";

/**
 * 🥪 SandwichHero — หัวหมวด "แซนด์วิช" (อ้างอิงภาพ ref): พื้นครีม-พีช-ลาเวนเดอร์
 * ซ้าย = ข้อความ + ชิปไส้ · ขวา = ฉาก Illustration: แซนด์วิชสามเหลี่ยม 4 ชิ้นเรียงบนเขียง
 * ผ้าลายตารางม่วง น้องแมวเมล่อนโผล่หลังแซนด์วิช ขวดนมหน้ายิ้ม สตรอว์เบอร์รี กีวี ถ้วยแยม ผักสลัด มะเขือเทศ ขนมปัง
 * Animation เบา ๆ: แมวเด้ง (animate-cat-bob เดิม), หัวใจ/ประกายลอย, ผัก-มะเขือเทศลอยเบา ๆ · reduced-motion ปิดหมด
 */

const CHIPS = [
  ["🥓", "ไส้หมู"],
  ["🦀", "ปูอัด"],
  ["🌭", "ไส้กรอก"],
  ["🥪", "ทูน่า"],
  ["🍳", "แบบโบราณ"],
  ["🍑", "ผลไม้ครีมสด"],
  ["🍓", "แยม"],
];

export default function SandwichHero() {
  return (
    <div className="relative mb-8 overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#fff5e6] via-[#fff1f0] to-[#f3ebff] px-6 py-8 ring-1 ring-white/80 sm:px-10 lg:py-10">
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#ffd9a8]/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-[#ffc4d6]/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 -top-8 h-80 w-80 rounded-full bg-grape-300/40 blur-3xl" />
      {/* ✨ ดาว หัวใจ ประกายลอย */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {[
          ["✨", "4%", "12%", "0s"],
          ["💜", "10%", "78%", "1.2s"],
          ["⭐", "44%", "10%", "0.6s"],
          ["💜", "58%", "86%", "2s"],
          ["✨", "93%", "14%", "1.6s"],
          ["⭐", "90%", "72%", "0.3s"],
        ].map(([e, l, t, d], i) => (
          <span
            key={i}
            className="animate-floaty absolute text-lg opacity-70 sm:text-xl"
            style={{ left: l, top: t, animationDelay: d }}
          >
            {e}
          </span>
        ))}
      </div>

      <div className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-[#8a5a3c] ring-1 ring-[#e9cfa5]">
            🥪 อร่อยง่าย ๆ ในทุกวัน · หอม นุ่ม ไส้แน่น ✨
          </span>
          <h1 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
            แซนด์วิช <span className="text-blossom-400">💜</span>
          </h1>
          <p className="font-display mt-1 text-lg font-semibold text-blossom-400">
            Sandwiches
          </p>
          <p className="mx-auto mt-3 max-w-xl text-ink/65 lg:mx-0">
            เหมือนโต๊ะอาหารเช้าที่บ้าน — ไส้ความอร่อย ปังนุ่ม ฟินทุกคำ
            อุ่นใจในมื้อเล็ก ๆ แซนด์วิชอร่อยได้ทุกเช้า 🍞💜
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5 lg:justify-start">
            {CHIPS.map(([e, t]) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[12px] font-semibold text-ink ring-1 ring-grape-100"
              >
                {e} {t}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-grape-400">
            เลือกความอร่อยในแบบที่ชอบได้เลย 💜
          </p>
        </div>

        {/* 🥪 ฉากแซนด์วิชบนเขียง */}
        <div className="relative order-first mx-auto w-full max-w-[520px] lg:order-none">
          {/* 🐱 น้องเมล่อนโผล่หลังแซนด์วิช */}
          <div className="pointer-events-none absolute left-[46%] top-[6%] z-0 w-[22%]">
            <HelperCat pose="wow" size={100} className="!h-auto !w-full" />
            <span className="animate-floaty absolute -right-3 -top-4 rounded-full bg-white px-1.5 py-0.5 text-sm shadow">
              💜
            </span>
          </div>
          <SandwichScene />
        </div>
      </div>
    </div>
  );
}

/* 🥪 ฉาก SVG: ผ้าตารางม่วง + เขียงไม้ + แซนด์วิช 4 ชิ้น + ขวดนม + ผลไม้ + ผัก */
function SandwichScene() {
  return (
    <svg
      viewBox="0 0 560 330"
      className="relative z-10 h-auto w-full"
      aria-hidden
    >
      <defs>
        <pattern
          id="sw-check"
          width="26"
          height="26"
          patternUnits="userSpaceOnUse"
        >
          <rect width="26" height="26" fill="#efe4ff" />
          <rect width="13" height="13" fill="#c9b3e8" />
          <rect x="13" y="13" width="13" height="13" fill="#c9b3e8" />
        </pattern>
        <linearGradient id="sw-board" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e9b978" />
          <stop offset="100%" stopColor="#c48a4a" />
        </linearGradient>
      </defs>

      {/* 🟪 ผ้าตารางม่วง */}
      <path
        d="M40 282 L520 282 L560 330 L0 330 Z"
        fill="url(#sw-check)"
        opacity="0.9"
      />
      {/* 🪵 เขียงไม้ */}
      <path
        d="M60 268 h420 a10 10 0 0 1 10 10 v14 a10 10 0 0 1 -10 10 H60 a10 10 0 0 1 -10 -10 v-14 a10 10 0 0 1 10 -10 Z"
        fill="url(#sw-board)"
      />
      <path d="M50 284 h440" stroke="#a86b3c" strokeWidth="2" opacity="0.5" />
      <circle cx="486" cy="282" r="4" fill="#a86b3c" opacity="0.6" />

      {/* 🥬 ผัก / 🍅 มะเขือเทศ / 🍞 ขนมปัง ลอยหลัง */}
      <g className="sw-drift" style={{ animationDelay: "0s" }}>
        <path
          d="M40 60 q-18 -14 -8 -34 q14 -8 26 4 q18 -10 26 8 q4 20 -14 30 q-20 10 -30 -8 Z"
          fill="#7dcc3a"
        />
        <path
          d="M40 60 q-18 -14 -8 -34 q14 -8 26 4 q18 -10 26 8 q4 20 -14 30 q-20 10 -30 -8 Z"
          fill="none"
          stroke="#4f9a1e"
          strokeWidth="2"
        />
      </g>
      <g className="sw-drift" style={{ animationDelay: "1.1s" }}>
        <circle cx="120" cy="86" r="18" fill="#e5194f" />
        <circle cx="120" cy="86" r="12" fill="#ff5c7a" />
        <path
          d="M114 78 l6 8 l6 -8"
          stroke="#fff0f3"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M108 80 q12 0 24 0 M112 90 q8 0 16 0"
          stroke="#ffd0da"
          strokeWidth="1.5"
        />
      </g>
      <g className="sw-drift" style={{ animationDelay: "0.6s" }}>
        <rect
          x="470"
          y="34"
          width="44"
          height="40"
          rx="10"
          fill="#f5dfae"
          stroke="#e0a85a"
          strokeWidth="3"
        />
        <path d="M470 50 q22 -24 44 0" fill="#e0a85a" opacity="0.6" />
      </g>

      {/* 🥪 แซนด์วิช 4 ชิ้น — หันด้านไส้ออกมา (SandwichSlice ตัวเดียวกับการ์ด) */}
      {(
        [
          [40, "savory"],
          [150, "fruit"],
          [260, "jam"],
          [370, "choco"],
        ] as const
      ).map(([x, f], i) => (
        <g key={i} transform={`translate(${x} 74) scale(0.9)`}>
          <SandwichSlice filling={f} animate={false} />
        </g>
      ))}

      {/* 🍓 สตรอว์เบอร์รี / 🥝 กีวี / 🫙 แยม */}
      <g className="sw-drift" style={{ animationDelay: "1.6s" }}>
        <path d="M108 268 q-16 26 8 42 q24 -16 8 -42 Z" fill="#e5194f" />
        <path
          d="M100 266 q8 -8 16 0 q8 -8 16 0 q-8 6 -16 4 q-8 2 -16 -4 Z"
          fill="#4f9a1e"
        />
        {[
          [104, 282],
          [112, 292],
          [120, 280],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.4" fill="#ffd6df" />
        ))}
      </g>
      <g className="sw-drift" style={{ animationDelay: "0.9s" }}>
        <circle cx="470" cy="290" r="22" fill="#6c9a2a" />
        <circle cx="470" cy="290" r="18" fill="#a8d95c" />
        <circle cx="470" cy="290" r="7" fill="#e9f7c8" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <circle
            key={a}
            cx={470 + Math.cos((a * Math.PI) / 180) * 12}
            cy={290 + Math.sin((a * Math.PI) / 180) * 12}
            r="1.4"
            fill="#2f4a12"
          />
        ))}
      </g>
      <g>
        <path
          d="M506 282 h34 a6 6 0 0 1 6 6 v18 a8 8 0 0 1 -8 8 h-30 a8 8 0 0 1 -8 -8 v-18 a6 6 0 0 1 6 -6 Z"
          fill="#fff1d6"
          stroke="#e0a85a"
          strokeWidth="2"
        />
        <path d="M506 288 h40 v10 h-40 Z" fill="#e5194f" opacity="0.85" />
      </g>

      {/* 🥛 ขวดนมหน้ายิ้ม */}
      <g className="sw-drift" style={{ animationDelay: "0.3s" }}>
        <rect
          x="500"
          y="118"
          width="52"
          height="118"
          rx="16"
          fill="#ffffff"
          stroke="#e6d9f5"
          strokeWidth="3"
        />
        <rect
          x="510"
          y="104"
          width="32"
          height="20"
          rx="6"
          fill="#ffffff"
          stroke="#e6d9f5"
          strokeWidth="3"
        />
        <rect x="506" y="150" width="40" height="80" rx="10" fill="#fbf7f2" />
        <rect
          x="528"
          y="70"
          width="6"
          height="90"
          rx="3"
          fill="#b48cff"
          transform="rotate(10 531 115)"
        />
        <path
          d="M510 124 q16 -8 32 0"
          stroke="#b48cff"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="516" cy="184" r="2.6" fill="#3a2f45" />
        <circle cx="536" cy="184" r="2.6" fill="#3a2f45" />
        <path
          d="M520 194 q6 5 12 0"
          stroke="#3a2f45"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="509" cy="192" rx="4" ry="2.4" fill="#f5b7c8" />
        <ellipse cx="543" cy="192" rx="4" ry="2.4" fill="#f5b7c8" />
      </g>

      {/* ✨ ประกาย */}
      {[
        [30, 130, "#f4d35e", "0s"],
        [250, 40, "#d492e0", "1.3s"],
        [420, 60, "#f4d35e", "0.7s"],
        [545, 250, "#ffffff", "2s"],
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
            d={`M${x} ${(y as number) - 7} l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 Z`}
            fill={c as string}
          />
        </g>
      ))}
    </svg>
  );
}
