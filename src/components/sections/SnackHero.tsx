"use client";

/**
 * 🥣 SnackHero — หัวหมวด "ขนมกินเพลิน | Snacks" คอนเซปต์ "กรุบกรอบ กินเพลิน ✨"
 * - โทน Cream #FFF9F0 → Caramel → Golden Brown → Chocolate Brown · ม่วง #7B4AB8 เป็น accent
 * - ภาพขวา = Illustration ล้วน (SVG): ชามคอนเฟลก คอนเฟลกกระเด้ง มะม่วงหิมพานต์ อัลมอนด์สไลซ์ ลูกเกด ช็อกโกแลต เศษเล็ก ๆ ดาว/หัวใจ/ประกาย
 * - Animation เบา ๆ: ชามโยก, คอนเฟลกเด้ง, ชิ้นขนมลอย, ประกายวิบวับ · รองรับ prefers-reduced-motion
 */

const FLOATERS = [
  ["⭐", "5%", "18%", "0s"],
  ["✨", "14%", "70%", "1.3s"],
  ["💜", "38%", "8%", "0.5s"],
  ["🍫", "60%", "82%", "2s"],
  ["🥜", "86%", "20%", "1.6s"],
  ["✨", "92%", "64%", "0.3s"],
  ["🌰", "26%", "86%", "2.4s"],
] as const;

export default function SnackHero() {
  return (
    <div className="relative mb-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#fff9f0] via-[#ffe9c7] to-[#e8b56a] px-6 py-8 ring-1 ring-white/80 sm:px-10 lg:py-10">
      {/* แสงฟุ้งคาราเมล/ช็อกโกแลต/ม่วง */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#f2b64e]/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-[#7a4a1e]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 -top-8 h-80 w-80 rounded-full bg-[#7b4ab8]/15 blur-3xl" />
      {/* ✨ ดาว/หัวใจ/เศษขนมลอย */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {FLOATERS.map(([e, l, t, d], i) => (
          <span
            key={i}
            className="animate-floaty absolute text-lg opacity-70 sm:text-xl"
            style={{ left: l, top: t, animationDelay: d }}
          >
            {e}
          </span>
        ))}
        {[
          ["10%", "44%"],
          ["22%", "30%"],
          ["78%", "44%"],
          ["70%", "34%"],
          ["52%", "92%"],
          ["44%", "60%"],
        ].map(([l, t], i) => (
          <span
            key={`c${i}`}
            className="snack-crumb absolute h-2 w-2 rounded-sm bg-[#c9862e]/60"
            style={{ left: l, top: t, animationDelay: `${i * 0.4}s` }}
          />
        ))}
      </div>

      <div className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_460px]">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-[#8a5a3c] ring-1 ring-[#e9cfa5]">
            🥣 กรุบกรอบ กินเพลิน ✨
          </span>
          <h1 className="font-display mt-3 text-3xl font-bold text-[#4a2c14] sm:text-4xl lg:text-5xl">
            ขนมกินเพลิน
          </h1>
          <p className="font-display mt-1 text-lg font-semibold text-[#7b4ab8]">
            Snacks
          </p>
          <p className="mx-auto mt-3 max-w-xl text-[#5c3a1e]/75 lg:mx-0">
            ขนมกรุบกรอบหลายรส หวานบ้าง เค็มบ้าง แซ่บบ้าง หยิบกินเล่นก็เพลิน
            กินคู่กับเครื่องดื่มก็เข้ากัน 💜
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5 lg:justify-start">
            {[
              ["🥣 คอนเฟลก", "#e8b56a"],
              ["🥜 มะม่วงหิมพานต์", "#c9862e"],
              ["🌰 อัลมอนด์", "#a86b3c"],
              ["🍇 ลูกเกด", "#7b4ab8"],
              ["🍫 ช็อกโกแลต", "#5c3a2a"],
            ].map(([t, c]) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-[#4a2c14] ring-1 ring-[#e9cfa5]"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full ring-1 ring-white"
                  style={{ background: c }}
                />
                {t}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-[#5c3a1e]/50">
            เปิดถุงแล้วหยุดไม่ได้ กินเพลินจนหมดถุง 😂
          </p>
        </div>

        {/* 🥣 Illustration ชามคอนเฟลก */}
        <div className="order-first mx-auto w-full max-w-[340px] sm:max-w-[420px] lg:order-none">
          <CerealBowl />
        </div>
      </div>
    </div>
  );
}

/* 🥣 ชามคอนเฟลก SVG — คอนเฟลกกระเด้ง + ถั่ว/อัลมอนด์/ลูกเกด/ช็อกโกแลตลอย */
function CerealBowl() {
  const flake = (x: number, y: number, r: number, rot = 0) => (
    <path
      d={`M${x - r} ${y} q${r * 0.4} ${-r * 0.9} ${r} ${-r * 0.5} q${r * 0.9} ${r * 0.2} ${r * 0.9} ${r} q${-r * 0.3} ${r * 0.9} ${-r} ${r * 0.8} q${-r} ${-r * 0.1} ${-r * 0.9} ${-r * 1.3} Z`}
      fill="#f2b64e"
      stroke="#c9862e"
      strokeWidth="1.6"
      transform={`rotate(${rot} ${x} ${y})`}
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
  const almond = (x: number, y: number, rot: number) => (
    <ellipse
      cx={x}
      cy={y}
      rx="6"
      ry="11"
      fill="#e9c58f"
      stroke="#a86b3c"
      strokeWidth="1.4"
      transform={`rotate(${rot} ${x} ${y})`}
    />
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
  const choco = (x: number, y: number, rot: number) => (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect x="-11" y="-8" width="22" height="16" rx="3" fill="#5c3a2a" />
      <rect x="-9" y="-6" width="8" height="5" rx="1" fill="#7a4a30" />
      <rect x="1" y="-6" width="8" height="5" rx="1" fill="#7a4a30" />
      <rect x="-9" y="1" width="8" height="5" rx="1" fill="#7a4a30" />
      <rect x="1" y="1" width="8" height="5" rx="1" fill="#7a4a30" />
    </g>
  );

  return (
    <svg viewBox="0 0 320 300" className="h-auto w-full" aria-hidden>
      <defs>
        <linearGradient id="sn-bowl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff9f0" />
          <stop offset="100%" stopColor="#e7cfae" />
        </linearGradient>
        <linearGradient id="sn-rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a678e8" />
          <stop offset="100%" stopColor="#7b4ab8" />
        </linearGradient>
        <radialGradient id="sn-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd27a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffd27a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="160" cy="150" r="130" fill="url(#sn-glow)" />
      <ellipse
        cx="160"
        cy="278"
        rx="120"
        ry="12"
        fill="#7a4a1e"
        opacity="0.18"
      />

      {/* ✨ ประกาย */}
      {[
        [34, 60, "#f2b64e", "0s"],
        [290, 50, "#d492e0", "1.2s"],
        [24, 190, "#ffffff", "2.3s"],
        [300, 200, "#f2b64e", "0.6s"],
        [160, 24, "#ffffff", "1.7s"],
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

      {/* 🥜 ชิ้นขนมลอยรอบชาม */}
      <g className="snack-float" style={{ animationDelay: "0s" }}>
        {cashew(52, 120, -20)}
      </g>
      <g className="snack-float" style={{ animationDelay: "0.8s" }}>
        {almond(272, 110, 30)}
      </g>
      <g className="snack-float" style={{ animationDelay: "1.4s" }}>
        {raisin(64, 200)}
      </g>
      <g className="snack-float" style={{ animationDelay: "0.4s" }}>
        {choco(268, 178, -12)}
      </g>
      <g className="snack-float" style={{ animationDelay: "1.9s" }}>
        {almond(40, 150, -40)}
      </g>
      <g className="snack-float" style={{ animationDelay: "1.1s" }}>
        {cashew(282, 232, 25)}
      </g>

      {/* 🥣 ชาม (โยกเบา ๆ) */}
      <g className="snack-bowl" style={{ transformOrigin: "160px 250px" }}>
        {/* คอนเฟลกกองในชาม */}
        <g>
          {flake(110, 150, 14, 10)}
          {flake(140, 138, 16, -20)}
          {flake(172, 140, 15, 35)}
          {flake(204, 150, 14, -8)}
          {flake(126, 166, 13, 60)}
          {flake(160, 160, 16, 15)}
          {flake(192, 166, 13, -30)}
          {raisin(150, 152)}
          {raisin(185, 158)}
          {almond(120, 156, 25)}
          {choco(176, 150, 8)}
          {cashew(140, 168, 10)}
        </g>
        {/* ตัวชาม */}
        <path
          d="M56 170 h208 q4 0 3 5 q-14 62 -60 84 q-47 12 -94 0 q-46 -22 -60 -84 q-1 -5 3 -5 Z"
          fill="url(#sn-bowl)"
          stroke="#c9862e"
          strokeWidth="2.5"
        />
        <ellipse
          cx="160"
          cy="170"
          rx="106"
          ry="14"
          fill="#fff9f0"
          stroke="#c9862e"
          strokeWidth="2.5"
        />
        <ellipse
          cx="160"
          cy="170"
          rx="106"
          ry="14"
          fill="none"
          stroke="url(#sn-rim)"
          strokeWidth="5"
          opacity="0.9"
        />
        {/* ลายม่วง + ดาวบนชาม */}
        <path
          d="M76 214 q84 22 168 0"
          stroke="#7b4ab8"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.8"
          fill="none"
        />
        <text
          x="160"
          y="240"
          textAnchor="middle"
          fontSize="12"
          fontWeight="800"
          fill="#7b4ab8"
        >
          ปั่นกับฟ่าง 💜
        </text>
        <path
          d="M78 190 l1.6 4 l4 1.6 l-4 1.6 l-1.6 4 l-1.6 -4 l-4 -1.6 l4 -1.6 Z"
          fill="#f2b64e"
        />
        <path
          d="M242 190 l1.6 4 l4 1.6 l-4 1.6 l-1.6 4 l-1.6 -4 l-4 -1.6 l4 -1.6 Z"
          fill="#f2b64e"
        />
        {/* 😊 หน้าชาม */}
        <ellipse cx="140" cy="205" rx="3.5" ry="4.5" fill="#4a2c14" />
        <ellipse cx="180" cy="205" rx="3.5" ry="4.5" fill="#4a2c14" />
        <path
          d="M150 214 q10 8 20 0"
          stroke="#4a2c14"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse
          cx="126"
          cy="214"
          rx="6"
          ry="3.5"
          fill="#f5b7c8"
          opacity="0.8"
        />
        <ellipse
          cx="194"
          cy="214"
          rx="6"
          ry="3.5"
          fill="#f5b7c8"
          opacity="0.8"
        />
      </g>

      {/* 🥣 คอนเฟลกกระเด้งออกจากชาม */}
      {[
        [96, 112, 13, 20, "0s"],
        [150, 92, 15, -15, "0.5s"],
        [214, 104, 13, 40, "1s"],
        [180, 70, 11, -30, "1.5s"],
        [120, 82, 10, 55, "0.8s"],
      ].map(([x, y, r, rot, d], i) => (
        <g
          key={i}
          className="snack-pop"
          style={{
            transformOrigin: `${x}px ${y}px`,
            animationDelay: d as string,
          }}
        >
          {flake(x as number, y as number, r as number, rot as number)}
        </g>
      ))}
      {/* เศษคอนเฟลกเล็ก ๆ */}
      {[
        [84, 132],
        [236, 126],
        [110, 100],
        [200, 80],
        [244, 156],
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
    </svg>
  );
}
