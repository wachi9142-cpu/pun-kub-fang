/**
 * 🍵 TeaHero — หัวหมวด "เมนูชา" คอนเซปต์ "หอมใบชาออกมาจากหน้าจอ 🍵🌿✨"
 * แก้วชาเขียว/ชาไทยตรงกลาง · "กลิ่นหอม" ลอยขึ้นเป็นเส้นโค้งโปร่ง ๆ สีเขียวอ่อน/ครีม/ขาว (ไม่ใช่ควัน/ไอน้ำ)
 * ใบชาเล็ก ๆ ลอยตามกระแสกลิ่น + ประกาย · ใบชาสดใหญ่ประกอบข้าง ๆ · โทนเขียวชา + ครีม + ม่วงแบรนด์
 * SVG ล้วน · tea-aroma / tea-leaf-drift / floaty / twinkle · รองรับ prefers-reduced-motion
 */

function Leaf({
  x,
  y,
  r,
  s = 1,
  color = "#7cc27a",
  vein = "#4f8a3a",
}: {
  x: number;
  y: number;
  r: number;
  s?: number;
  color?: string;
  vein?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0 C-14 -10 -16 -30 0 -44 C16 -30 14 -10 0 0 Z" fill={color} />
      <path
        d="M0 -2 V-40 M0 -14 l-6 -6 M0 -14 l6 -6 M0 -24 l-5 -5 M0 -24 l5 -5"
        stroke={vein}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </g>
  );
}

/* เส้นกลิ่นหอม 1 เส้น: โค้งซ้าย-ขวา โปร่ง มีมิติ (ชั้นหนา+ชั้นขาวบาง) */
function Aroma({
  x,
  w,
  delay,
  dur,
  tint,
}: {
  x: number;
  w: number;
  delay: string;
  dur: string;
  tint: string;
}) {
  const d = `M${x} 0 C${x - w} -18 ${x + w} -34 ${x} -52 C${x - w} -70 ${x + w} -86 ${x} -104 C${x - w * 0.8} -118 ${x + w * 0.6} -130 ${x} -142`;
  return (
    <g
      className="animate-tea-aroma"
      style={{
        transformOrigin: `${x}px 0px`,
        animationDelay: delay,
        animationDuration: dur,
      }}
    >
      <path
        d={d}
        stroke={tint}
        strokeWidth={w * 0.9}
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d={d}
        stroke="#ffffff"
        strokeWidth={w * 0.32}
        strokeLinecap="round"
        opacity="0.75"
      />
    </g>
  );
}

export function TeaHeroArt({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden>
      <svg viewBox="0 0 420 300" className="h-full w-full" fill="none">
        <defs>
          <linearGradient id="tea-liquid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b9dd8a" />
            <stop offset="100%" stopColor="#5f9a3f" />
          </linearGradient>
          <linearGradient id="tea-glass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#c9b3e8" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="tea-bg" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#eaf7d9" />
            <stop offset="65%" stopColor="#d5efc0" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#c9e6ad" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="tea-aroma-g" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#c9e6ad" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* วงแสงเขียวอ่อนหลังแก้ว */}
        <circle cx="210" cy="170" r="130" fill="url(#tea-bg)" />

        {/* 🌿 ใบชาสดใหญ่ประกอบซ้าย/ขวา (ขยับเบา ๆ) */}
        <g
          className="animate-floaty-slow"
          style={{ transformOrigin: "70px 200px" }}
        >
          <Leaf x={60} y={236} r={-38} s={1.7} />
          <Leaf x={96} y={250} r={-10} s={1.25} color="#9bd66a" />
        </g>
        <g
          className="animate-floaty"
          style={{ transformOrigin: "350px 200px", animationDelay: "1s" }}
        >
          <Leaf x={358} y={238} r={36} s={1.7} color="#6db36a" />
          <Leaf x={326} y={252} r={12} s={1.2} color="#9bd66a" />
        </g>

        {/* 🍵 แก้วชา (ลอยเบา ๆ) */}
        <g
          className="animate-floaty-slow"
          style={{ transformOrigin: "210px 270px", animationDelay: "0.4s" }}
        >
          <ellipse
            cx="210"
            cy="274"
            rx="76"
            ry="9"
            fill="#3f8f35"
            opacity="0.18"
          />
          <path
            d="M150 128 h120 l-10 124 a11 11 0 0 1 -11 10 H171 a11 11 0 0 1 -11 -10 Z"
            fill="url(#tea-liquid)"
          />
          <path
            d="M150 128 h120 l-10 124 a11 11 0 0 1 -11 10 H171 a11 11 0 0 1 -11 -10 Z"
            fill="url(#tea-glass)"
            stroke="#ffffff"
            strokeWidth="3"
          />
          <path
            d="M168 146 l-7 96"
            stroke="#ffffff"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.8"
          />
          {/* ใบชาลอยในแก้ว */}
          <Leaf
            x={190}
            y={236}
            r={-30}
            s={0.42}
            color="#4f8a3a"
            vein="#2f5f22"
          />
          <Leaf
            x={236}
            y={214}
            r={40}
            s={0.38}
            color="#4f8a3a"
            vein="#2f5f22"
          />
          <Leaf
            x={214}
            y={250}
            r={110}
            s={0.36}
            color="#3f7a2f"
            vein="#2f5f22"
          />
          {/* น้ำแข็ง */}
          <rect
            x="176"
            y="160"
            width="20"
            height="20"
            rx="4"
            fill="#ffffff"
            opacity="0.55"
            transform="rotate(-12 186 170)"
          />
          <rect
            x="222"
            y="172"
            width="18"
            height="18"
            rx="4"
            fill="#ffffff"
            opacity="0.5"
            transform="rotate(16 231 181)"
          />
          {/* แถบม่วง + โลโก้ + หน้ายิ้ม */}
          <path
            d="M155 190 h110 l-1.5 18 H156.5 Z"
            fill="#b795d8"
            opacity="0.7"
          />
          <circle cx="210" cy="199" r="12" fill="#ffffff" />
          <text x="210" y="204" textAnchor="middle" fontSize="13">
            🍵
          </text>
          <circle cx="192" cy="230" r="2.6" fill="#3a2f45" />
          <circle cx="228" cy="230" r="2.6" fill="#3a2f45" />
          <path
            d="M202 237 q8 6 16 0"
            stroke="#3a2f45"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <ellipse cx="181" cy="236" rx="4.5" ry="2.6" fill="#f5b7c8" />
          <ellipse cx="239" cy="236" rx="4.5" ry="2.6" fill="#f5b7c8" />
          {/* ผิวน้ำชา + ขอบแก้ว */}
          <ellipse
            cx="210"
            cy="128"
            rx="60"
            ry="9"
            fill="#d7efb6"
            opacity="0.9"
          />
          <rect
            x="146"
            y="122"
            width="128"
            height="10"
            rx="5"
            fill="#ffffff"
            stroke="#e6d9f5"
            strokeWidth="1.5"
          />
          {/* หลอด */}
          <rect
            x="236"
            y="52"
            width="12"
            height="84"
            rx="6"
            fill="#8a5cf0"
            transform="rotate(14 242 94)"
          />
          <rect
            x="236"
            y="52"
            width="4"
            height="84"
            rx="2"
            fill="#ffffff"
            opacity="0.35"
            transform="rotate(14 242 94)"
          />
        </g>

        {/* 🌬️ กลิ่นหอมลอยขึ้นจากแก้ว (5 เส้น โค้งซ้าย-ขวา คนละจังหวะ) */}
        <g transform="translate(0 124)">
          <Aroma x={172} w={16} delay="0s" dur="6.5s" tint="#c9e6ad" />
          <Aroma x={192} w={22} delay="1.6s" dur="7.5s" tint="#fff6dc" />
          <Aroma x={212} w={18} delay="3.1s" dur="7s" tint="#d7efb6" />
          <Aroma x={232} w={20} delay="0.9s" dur="8s" tint="#ffffff" />
          <Aroma x={250} w={14} delay="2.4s" dur="6.8s" tint="#c9e6ad" />
        </g>

        {/* 🍃 ใบชาเล็ก ๆ ลอยตามกระแสกลิ่น */}
        {[
          [180, "0s", "9s", -20],
          [206, "2.2s", "10s", 25],
          [232, "4.5s", "8.5s", -35],
          [196, "6.4s", "9.5s", 40],
        ].map(([x, d, dur, r], i) => (
          <g
            key={i}
            className="animate-tea-leaf-drift"
            style={{
              transformOrigin: `${x}px 124px`,
              animationDelay: d as string,
              animationDuration: dur as string,
            }}
          >
            <Leaf
              x={x as number}
              y={124}
              r={r as number}
              s={0.32}
              color="#7cc27a"
            />
          </g>
        ))}

        {/* ✨ ประกายรอบกลิ่น (สื่อความหอม/สดชื่น) */}
        {[
          [150, 70, "#ffffff", "0s"],
          [268, 52, "#f4d35e", "0.9s"],
          [188, 24, "#d492e0", "1.7s"],
          [246, 96, "#ffffff", "2.5s"],
          [166, 110, "#c9e6ad", "1.2s"],
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
              d={`M${x} ${(y as number) - 6} l1.8 4.2 l4.2 1.8 l-4.2 1.8 l-1.8 4.2 l-1.8 -4.2 l-4.2 -1.8 l4.2 -1.8 Z`}
              fill={c as string}
            />
          </g>
        ))}
        <circle
          cx="120"
          cy="140"
          r="2.5"
          fill="#ffffff"
          className="animate-twinkle"
          style={{ animationDelay: "0.5s" }}
        />
        <circle
          cx="304"
          cy="132"
          r="2.2"
          fill="#c9b3e8"
          className="animate-twinkle"
          style={{ animationDelay: "2s" }}
        />
      </svg>
    </div>
  );
}

export default function TeaHero() {
  return (
    <div className="relative mb-6 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#e6f4d8] via-cream-white to-grape-50 px-6 py-8 ring-1 ring-white/80 sm:px-10 lg:py-10">
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#9bd66a]/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-12 h-72 w-72 rounded-full bg-grape-300/25 blur-3xl" />
      <div className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_440px]">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            🌿 หอมใบชาออกมาจากหน้าจอ ✨
          </span>
          <h1 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
            เมนูชา
          </h1>
          <p className="font-display mt-1 text-lg font-semibold text-blossom-400">
            Tea Drinks
          </p>
          <p className="mx-auto mt-3 max-w-xl text-ink/60 lg:mx-0">
            ชาไทย ชาเขียว ชานม ชาผลไม้ ชาใส — ใบชาหอมกรุ่น ชงสดใหม่
            เปิดแก้วแล้วกลิ่นหอมลอยมาเลย 🍵💜
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5 lg:justify-start">
            {[
              ["🧋 ชานม", "#e0a56b"],
              ["🧡 ชาไทย", "#cf6f26"],
              ["🍵 ชาเขียว", "#5f9a3f"],
              ["🍑 ชาผลไม้", "#f2a0a0"],
              ["🌿 ชาใส", "#c9e6ad"],
            ].map(([t, c]) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-ink ring-1 ring-ink/5"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full ring-1 ring-white"
                  style={{ background: c }}
                />
                {t}
              </span>
            ))}
          </div>
        </div>
        <TeaHeroArt className="order-first mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:order-none lg:max-w-none" />
      </div>
    </div>
  );
}
