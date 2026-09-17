"use client";

/**
 * 🥣 SnackHero — หัวหมวด "ขนมกินเพลิน | Snacks" (อ้างอิงภาพ ref)
 * ซ้าย = ข้อความ + ชิปประเภทขนม · ขวา = ฉาก Illustration:
 * ชามม่วง "PunKubFang" (หูแมว) นมเทลงชาม คอนเฟลก/กล้วยอบกรอบ/ลูกเกด/มะม่วงหิมพานต์/กราโนล่ากระเด้ง
 * ชามไม้ถั่วด้านซ้าย ผ้าตารางม่วง ถุงขนมลายแมวด้านขวา สตรอว์เบอร์รี เศษเล็ก ๆ
 * โทน Cream → Caramel → Golden Brown · ม่วง #7B4AB8 accent · Animation เบา ๆ (reduced-motion ปิด)
 */

const CHIPS = [
  ["🥣", "คอนเฟลก"],
  ["🌽", "ข้าวโพดอบกรอบ"],
  ["🍘", "ขนมขบเคี้ยว"],
  ["🥜", "ถั่ว / ธัญพืช"],
  ["🍞", "ขนมปัง / แซนด์วิช"],
  ["🍪", "ขนมทานเล่นอื่น ๆ"],
];

export default function SnackHero() {
  return (
    <div className="relative mb-8 overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#fff9f0] via-[#fff1dc] to-[#ffe4bd] px-6 py-8 ring-1 ring-white/80 sm:px-10 lg:py-10">
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#f2b64e]/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-[#7a4a1e]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 -top-8 h-80 w-80 rounded-full bg-[#7b4ab8]/15 blur-3xl" />
      {/* ✨ ดาว หัวใจ เศษขนมลอยจาง ๆ ด้านหลัง */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {[
          ["✨", "4%", "14%", "0s"],
          ["💜", "12%", "80%", "1.2s"],
          ["⭐", "42%", "8%", "0.6s"],
          ["💜", "60%", "12%", "2s"],
          ["✨", "94%", "18%", "1.6s"],
          ["🥜", "6%", "50%", "0.9s"],
        ].map(([e, l, t, d], i) => (
          <span
            key={i}
            className="animate-floaty absolute text-lg opacity-60 sm:text-xl"
            style={{ left: l, top: t, animationDelay: d }}
          >
            {e}
          </span>
        ))}
      </div>

      <div className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-[#8a5a3c] ring-1 ring-[#e9cfa5]">
            🍪 กรุบกรอบ หอมหวาน กินเพลิน ✨
          </span>
          <h1 className="font-display mt-3 text-3xl font-bold text-[#4a2c14] sm:text-4xl lg:text-5xl">
            ขนมกินเพลิน <span className="text-blossom-400">💜</span>
          </h1>
          <p className="font-display mt-1 text-lg font-semibold text-[#7b4ab8]">
            Snacks
          </p>
          <p className="mx-auto mt-3 max-w-xl text-[#5c3a1e]/75 lg:mx-0">
            ขนมกรุบกรอบหลายรส หวานบ้าง เค็มบ้าง แซ่บบ้าง หยิบกินเล่นก็เพลิน
            กินคู่กับเครื่องดื่มก็เข้ากัน 💜
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5 lg:justify-start">
            {CHIPS.map(([e, t]) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[12px] font-semibold text-[#4a2c14] ring-1 ring-[#e9cfa5]"
              >
                {e} {t}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs italic text-[#7b4ab8]/80">
            อร่อยได้ทุกวัน ที่ปั่นกับฟ่าง 💜
          </p>
        </div>

        <div className="order-first mx-auto w-full max-w-[540px] lg:order-none">
          <SnackScene />
        </div>
      </div>
    </div>
  );
}

/* 🥣 ฉาก SVG: ชามม่วง PunKubFang + นมเท + ขนมกระเด้ง + ชามถั่ว + ถุงขนม */
function SnackScene() {
  const flake = (x: number, y: number, r: number, rot = 0) => (
    <path
      d={`M${x - r} ${y} q${r * 0.4} ${-r * 0.9} ${r} ${-r * 0.5} q${r * 0.9} ${r * 0.2} ${r * 0.9} ${r} q${-r * 0.3} ${r * 0.9} ${-r} ${r * 0.8} q${-r} ${-r * 0.1} ${-r * 0.9} ${-r * 1.3} Z`}
      fill="#f2b64e"
      stroke="#c9862e"
      strokeWidth="1.6"
      transform={`rotate(${rot} ${x} ${y})`}
    />
  );
  const banana = (x: number, y: number, r: number) => (
    <g>
      <circle
        cx={x}
        cy={y}
        r={r}
        fill="#f7dd8a"
        stroke="#d9a520"
        strokeWidth="1.6"
      />
      <circle cx={x} cy={y} r={r * 0.45} fill="#e9c15a" />
      <circle cx={x} cy={y} r={r * 0.12} fill="#8a5a1e" />
    </g>
  );
  const raisin = (x: number, y: number) => (
    <ellipse
      cx={x}
      cy={y}
      rx="6"
      ry="7.5"
      fill="#5b2f6b"
      stroke="#3b1d48"
      strokeWidth="1.2"
    />
  );
  const cashew = (x: number, y: number, rot: number) => (
    <path
      d="M-14 0 a14 9 0 0 1 28 0 a10 7 0 0 1 -8 6 q-6 -4 -12 0 a10 7 0 0 1 -8 -6 Z"
      fill="#f5d9a6"
      stroke="#c9862e"
      strokeWidth="1.4"
      transform={`translate(${x} ${y}) rotate(${rot})`}
    />
  );
  const granola = (x: number, y: number) => (
    <g>
      <circle cx={x} cy={y} r="9" fill="#b9793a" />
      <circle cx={x - 5} cy={y - 4} r="4" fill="#d9a35c" />
      <circle cx={x + 4} cy={y + 3} r="4.5" fill="#a86b3c" />
      <circle cx={x + 3} cy={y - 5} r="3" fill="#e0b57a" />
    </g>
  );
  const almond = (x: number, y: number, rot: number) => (
    <ellipse
      cx={x}
      cy={y}
      rx="5"
      ry="9"
      fill="#e9c58f"
      stroke="#a86b3c"
      strokeWidth="1.3"
      transform={`rotate(${rot} ${x} ${y})`}
    />
  );

  return (
    <svg viewBox="0 0 560 340" className="h-auto w-full" aria-hidden>
      <defs>
        <pattern
          id="sk-check"
          width="26"
          height="26"
          patternUnits="userSpaceOnUse"
        >
          <rect width="26" height="26" fill="#efe4ff" />
          <rect width="13" height="13" fill="#c9b3e8" />
          <rect x="13" y="13" width="13" height="13" fill="#c9b3e8" />
        </pattern>
        <linearGradient id="sk-bowl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b48cff" />
          <stop offset="100%" stopColor="#7b4ab8" />
        </linearGradient>
        <linearGradient id="sk-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d9a35c" />
          <stop offset="100%" stopColor="#a86b3c" />
        </linearGradient>
        <linearGradient id="sk-bag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f6efff" />
          <stop offset="100%" stopColor="#e4d4ff" />
        </linearGradient>
      </defs>

      {/* 🟪 ผ้าตารางม่วง + โต๊ะไม้ */}
      <path
        d="M0 296 L560 296 L560 340 L0 340 Z"
        fill="#e9c58f"
        opacity="0.6"
      />
      <path
        d="M150 288 L470 288 L520 340 L100 340 Z"
        fill="url(#sk-check)"
        opacity="0.95"
      />

      {/* 🥜 ชามไม้ถั่ว (ซ้าย) */}
      <g className="snack-float" style={{ animationDelay: "1.2s" }}>
        <ellipse cx="96" cy="262" rx="70" ry="16" fill="url(#sk-wood)" />
        <path d="M26 262 h140 q-8 34 -70 38 q-62 -4 -70 -38 Z" fill="#c48a4a" />
        {cashew(66, 252, -15)}
        {cashew(112, 250, 20)}
        {cashew(90, 258, 5)}
        {almond(50, 258, 30)}
        {almond(136, 256, -35)}
        {raisin(80, 246)}
        {raisin(124, 260)}
        {granola(100, 244)}
        {almond(78, 262, 60)}
        {cashew(140, 264, 40)}
      </g>
      {/* เศษบนโต๊ะ */}
      {cashew(190, 300, 10)}
      {almond(230, 306, -20)}
      {raisin(212, 310)}
      {banana(250, 298, 8)}
      {flake(300, 306, 8, 20)}

      {/* 🛍️ ถุงขนม PunKubFang (ขวา) */}
      <g className="snack-float" style={{ animationDelay: "0.5s" }}>
        <path
          d="M456 120 h84 a8 8 0 0 1 8 8 v150 a10 10 0 0 1 -10 10 h-80 a10 10 0 0 1 -10 -10 v-150 a8 8 0 0 1 8 -8 Z"
          fill="url(#sk-bag)"
          stroke="#c9b3e8"
          strokeWidth="3"
        />
        <path d="M448 120 h108 v18 h-108 Z" fill="#b48cff" />
        <path
          d="M456 114 q50 -10 92 0"
          stroke="#b48cff"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <text
          x="498"
          y="172"
          textAnchor="middle"
          fontSize="13"
          fontWeight="800"
          fill="#7b4ab8"
        >
          PunKubFang
        </text>
        <path
          d="M498 182 l1.6 4 l4 1.6 l-4 1.6 l-1.6 4 l-1.6 -4 l-4 -1.6 l4 -1.6 Z"
          fill="#f4d35e"
        />
        {/* 🐱 หน้าแมวบนถุง */}
        <circle
          cx="498"
          cy="226"
          r="26"
          fill="#ffffff"
          stroke="#e6d9f5"
          strokeWidth="2"
        />
        <path
          d="M478 210 l-4 -18 l16 10 Z"
          fill="#ffffff"
          stroke="#e6d9f5"
          strokeWidth="2"
        />
        <path
          d="M518 210 l4 -18 l-16 10 Z"
          fill="#ffffff"
          stroke="#e6d9f5"
          strokeWidth="2"
        />
        <path d="M480 236 q-8 -20 6 -22 q6 4 2 22 Z" fill="#b48cff" />
        <circle cx="489" cy="226" r="2.6" fill="#3a2f45" />
        <circle cx="507" cy="226" r="2.6" fill="#3a2f45" />
        <path
          d="M494 234 q4 4 8 0"
          stroke="#3a2f45"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="482" cy="232" rx="4" ry="2.4" fill="#f5b7c8" />
        <ellipse cx="514" cy="232" rx="4" ry="2.4" fill="#f5b7c8" />
        {flake(470, 266, 8, 10)}
        {banana(510, 266, 8)}
      </g>

      {/* 🍓 สตรอว์เบอร์รี */}
      <g className="snack-float" style={{ animationDelay: "1.7s" }}>
        <path d="M418 272 q-18 30 10 48 q28 -18 10 -48 Z" fill="#e5194f" />
        <path
          d="M410 270 q9 -8 18 0 q9 -8 18 0 q-9 6 -18 4 q-9 2 -18 -4 Z"
          fill="#4f9a1e"
        />
        {[
          [416, 288],
          [426, 300],
          [436, 286],
          [428, 312],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.5" fill="#ffd6df" />
        ))}
      </g>

      {/* 🥛 นมเทลงชาม */}
      <g className="snack-pour" style={{ transformOrigin: "300px 40px" }}>
        <path
          d="M292 0 q-6 60 -2 130 q4 40 14 60 q10 -30 6 -70 q-4 -70 -2 -120 Z"
          fill="#ffffff"
          stroke="#efe6ff"
          strokeWidth="2"
        />
        <path
          d="M296 20 q-2 50 0 100"
          stroke="#f3ecff"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {[
          [280, 60],
          [318, 90],
          [284, 130],
          [322, 150],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="3"
            fill="#ffffff"
            className="snack-crumb"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}
      </g>

      {/* 🥣 ชามม่วง PunKubFang (โยกเบา ๆ) */}
      <g className="snack-bowl" style={{ transformOrigin: "300px 290px" }}>
        {/* กองขนมในชาม */}
        {flake(240, 186, 14, 10)}
        {flake(272, 176, 16, -20)}
        {flake(306, 178, 15, 35)}
        {flake(340, 186, 14, -8)}
        {banana(256, 196, 13)}
        {banana(324, 198, 12)}
        {granola(290, 192)}
        {raisin(276, 200)}
        {raisin(310, 190)}
        {cashew(300, 204, 10)}
        {flake(360, 196, 12, 50)}
        {almond(236, 200, 30)}
        {/* ตัวชาม */}
        <path
          d="M196 200 h208 q6 0 5 6 q-14 60 -58 82 q-51 12 -102 0 q-44 -22 -58 -82 q-1 -6 5 -6 Z"
          fill="url(#sk-bowl)"
        />
        <ellipse
          cx="300"
          cy="200"
          rx="110"
          ry="15"
          fill="#c9b3e8"
          stroke="#7b4ab8"
          strokeWidth="2.5"
        />
        <ellipse
          cx="300"
          cy="200"
          rx="100"
          ry="10"
          fill="#f6efff"
          opacity="0.8"
        />
        {/* 🥣 กองคอนเฟลกพูนล้นชาม */}
        {(
          [
            [214, 196, 12, 15],
            [236, 184, 14, -20],
            [258, 174, 15, 30],
            [282, 166, 16, -10],
            [306, 164, 16, 25],
            [330, 170, 15, -30],
            [354, 180, 14, 15],
            [378, 194, 12, -15],
            [226, 200, 11, 50],
            [250, 190, 13, 70],
            [274, 182, 14, -45],
            [300, 178, 15, 10],
            [326, 182, 14, -60],
            [352, 192, 13, 40],
            [372, 202, 11, -25],
            [292, 150, 13, 55],
            [268, 156, 12, -35],
            [318, 152, 12, 20],
          ] as const
        ).map(([x, y, r, rot], i) => (
          <g key={`h${i}`}>{flake(x, y, r, rot)}</g>
        ))}
        {banana(244, 172, 11)}
        {banana(340, 160, 11)}
        {raisin(262, 194)}
        {raisin(312, 172)}
        {raisin(362, 198)}
        {granola(296, 190)}
        {cashew(280, 200, -10)}
        {cashew(344, 196, 20)}
        {almond(230, 186, 30)}
        <path
          d="M212 236 q88 22 176 0"
          stroke="#ffffff"
          strokeWidth="2"
          opacity="0.35"
          fill="none"
        />
        {/* โลโก้หูแมว + ชื่อ */}
        <path
          d="M258 246 l-3 -10 l9 6 Z M292 246 l3 -10 l-9 6 Z"
          fill="#ffffff"
        />
        <path
          d="M256 246 q19 -8 38 0"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <text
          x="300"
          y="266"
          textAnchor="middle"
          fontSize="15"
          fontWeight="800"
          fill="#ffffff"
        >
          PunKubFang
        </text>
        <path
          d="M300 276 l1.6 4 l4 1.6 l-4 1.6 l-1.6 4 l-1.6 -4 l-4 -1.6 l4 -1.6 Z"
          fill="#f4d35e"
        />
      </g>

      {/* 🥣 ขนมกระเด้ง/ลอยรอบชาม */}
      {[
        [200, 120, "flake", 13, 20, "0s"],
        [244, 84, "banana", 12, 0, "0.5s"],
        [336, 70, "flake", 14, -25, "1s"],
        [384, 118, "cashew", 0, 30, "1.5s"],
        [214, 60, "raisin", 0, 0, "0.8s"],
        [372, 60, "raisin", 0, 0, "1.3s"],
        [402, 158, "banana", 11, 0, "0.3s"],
        [180, 156, "granola", 0, 0, "1.8s"],
        [352, 110, "flake", 11, 60, "0.7s"],
        [232, 148, "almond", 0, -30, "1.1s"],
      ].map(([x, y, kind, r, rot, d], i) => (
        <g
          key={i}
          className="snack-pop"
          style={{
            transformOrigin: `${x}px ${y}px`,
            animationDelay: d as string,
          }}
        >
          {kind === "flake" &&
            flake(x as number, y as number, r as number, rot as number)}
          {kind === "banana" && banana(x as number, y as number, r as number)}
          {kind === "cashew" && cashew(x as number, y as number, rot as number)}
          {kind === "raisin" && raisin(x as number, y as number)}
          {kind === "granola" && granola(x as number, y as number)}
          {kind === "almond" && almond(x as number, y as number, rot as number)}
        </g>
      ))}
      {/* เศษเล็ก ๆ */}
      {[
        [170, 100],
        [420, 90],
        [160, 210],
        [440, 210],
        [260, 40],
      ].map(([x, y], i) => (
        <rect
          key={`m${i}`}
          x={x}
          y={y}
          width="4"
          height="4"
          rx="1"
          fill="#c9862e"
          className="snack-crumb"
          style={{ animationDelay: `${i * 0.5}s` }}
        />
      ))}
      {/* 💜 หัวใจ + ✨ */}
      {[
        [150, 60, "#f4d35e", "0s"],
        [430, 40, "#d492e0", "1.2s"],
        [140, 180, "#ffffff", "2.3s"],
        [540, 100, "#f4d35e", "0.6s"],
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
      <text x="166" y="130" fontSize="14" className="animate-floaty">
        💜
      </text>
    </svg>
  );
}
