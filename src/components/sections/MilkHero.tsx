/**
 * 🥛 MilkHero — หัวหมวด "เมนูนม" คอนเซปต์ "นมละมุนกอดใจ 🥛🤍"
 * แก้วนมสีขาว/ครีมเนียนละมุน ฟองนมนุ่ม ๆ ด้านบน หลอดม่วง หน้ายิ้ม
 * รอบ ๆ มีหยดนม เส้นนม ฟองนม ประกายขาว · โทน White/Cream/Soft Lavender/Purple (ไม่ใช้ฟ้า)
 * SVG ล้วน · แอนิเมชันนุ่ม (floaty / twinkle / milk-drop) · รองรับ prefers-reduced-motion
 */

function Drop({
  x,
  y,
  s = 1,
  delay,
}: {
  x: number;
  y: number;
  s?: number;
  delay: string;
}) {
  return (
    <g
      className="animate-milk-drop"
      style={{ transformOrigin: `${x}px ${y}px`, animationDelay: delay }}
    >
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <path
          d="M0 -14 C6 -6 10 0 10 5 A10 10 0 0 1 -10 5 C-10 0 -6 -6 0 -14 Z"
          fill="#ffffff"
          stroke="#e6d9f5"
          strokeWidth="1.5"
        />
        <ellipse
          cx="-3.5"
          cy="2"
          rx="2"
          ry="3.5"
          fill="#f3ecfb"
          opacity="0.9"
        />
      </g>
    </g>
  );
}

function Bubble({
  x,
  y,
  r,
  delay,
}: {
  x: number;
  y: number;
  r: number;
  delay: string;
}) {
  return (
    <g
      className="animate-floaty"
      style={{ transformOrigin: `${x}px ${y}px`, animationDelay: delay }}
    >
      <circle
        cx={x}
        cy={y}
        r={r}
        fill="#ffffff"
        stroke="#e6d9f5"
        strokeWidth="1.5"
        opacity="0.95"
      />
      <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.28} fill="#f7f1ff" />
    </g>
  );
}

export function MilkHeroArt({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden>
      <svg viewBox="0 0 380 260" className="h-full w-full" fill="none">
        <defs>
          <linearGradient id="mk-glass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#e6d9f5" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="mk-milk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffdf9" />
            <stop offset="100%" stopColor="#f7edd9" />
          </linearGradient>
        </defs>

        {/* แสงฟุ้งลาเวนเดอร์ */}
        <circle cx="190" cy="150" r="112" fill="#efe6fb" opacity="0.7" />
        <circle cx="190" cy="150" r="80" fill="#f8f3ff" opacity="0.8" />

        {/* 🫧 เส้นนม/ริบบิ้นนมลอยรอบแก้ว */}
        <g
          className="animate-floaty-slow"
          style={{ transformOrigin: "78px 120px" }}
        >
          <path
            d="M40 140 C60 110 90 130 108 100"
            stroke="#ffffff"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M40 140 C60 110 90 130 108 100"
            stroke="#e6d9f5"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
        </g>
        <g
          className="animate-floaty"
          style={{ transformOrigin: "300px 120px", animationDelay: "1.2s" }}
        >
          <path
            d="M340 150 C320 120 296 140 272 108"
            stroke="#ffffff"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M340 150 C320 120 296 140 272 108"
            stroke="#e6d9f5"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
        </g>

        {/* 🥛 แก้วนม (ทั้งแก้วขยับขึ้นลงนุ่ม ๆ) */}
        <g
          className="animate-floaty-slow"
          style={{ transformOrigin: "190px 230px" }}
        >
          {/* เงา */}
          <ellipse
            cx="190"
            cy="236"
            rx="70"
            ry="9"
            fill="#7b4ab8"
            opacity="0.12"
          />
          {/* นมในแก้ว */}
          <path
            d="M136 108 h108 l-9 112 a10 10 0 0 1 -10 9 H155 a10 10 0 0 1 -10 -9 Z"
            fill="url(#mk-milk)"
          />
          {/* ตัวแก้ว (ใส) */}
          <path
            d="M136 108 h108 l-9 112 a10 10 0 0 1 -10 9 H155 a10 10 0 0 1 -10 -9 Z"
            fill="url(#mk-glass)"
            stroke="#e6d9f5"
            strokeWidth="2.5"
          />
          <path
            d="M152 124 l-6 92"
            stroke="#ffffff"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.8"
          />
          {/* แถบม่วงคาดแก้ว + โลโก้ */}
          <path
            d="M141 152 h98 l-1.5 16 H142.5 Z"
            fill="#c9b3e8"
            opacity="0.7"
          />
          <circle cx="190" cy="160" r="11" fill="#ffffff" />
          <text x="190" y="165" textAnchor="middle" fontSize="12">
            🥛
          </text>
          {/* หน้ายิ้ม */}
          <circle cx="172" cy="190" r="2.4" fill="#3a2f45" />
          <circle cx="208" cy="190" r="2.4" fill="#3a2f45" />
          <path
            d="M183 196 q7 5 14 0"
            stroke="#3a2f45"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <ellipse
            cx="162"
            cy="196"
            rx="4"
            ry="2.4"
            fill="#f5b7c8"
            opacity="0.8"
          />
          <ellipse
            cx="218"
            cy="196"
            rx="4"
            ry="2.4"
            fill="#f5b7c8"
            opacity="0.8"
          />
          {/* ฟองนม/ครีมนุ่ม ๆ ด้านบน */}
          <g
            className="animate-floaty"
            style={{ transformOrigin: "190px 104px", animationDelay: "0.5s" }}
          >
            <ellipse cx="190" cy="108" rx="60" ry="14" fill="#ffffff" />
            <circle cx="158" cy="96" r="16" fill="#ffffff" />
            <circle cx="180" cy="86" r="19" fill="#fffdf9" />
            <circle cx="204" cy="88" r="17" fill="#ffffff" />
            <circle cx="224" cy="98" r="14" fill="#fffdf9" />
            <circle cx="190" cy="76" r="14" fill="#ffffff" />
            {/* เงาอ่อนใต้ฟอง + แสง */}
            <ellipse
              cx="190"
              cy="112"
              rx="56"
              ry="6"
              fill="#efe6fb"
              opacity="0.7"
            />
            <ellipse
              cx="176"
              cy="80"
              rx="6"
              ry="3"
              fill="#ffffff"
              opacity="0.9"
            />
            <circle cx="170" cy="92" r="2.5" fill="#f3ecfb" />
            <circle cx="212" cy="94" r="2" fill="#f3ecfb" />
            <circle cx="196" cy="102" r="1.8" fill="#f3ecfb" />
          </g>
          {/* ขอบแก้ว */}
          <rect
            x="132"
            y="104"
            width="116"
            height="10"
            rx="5"
            fill="#ffffff"
            stroke="#e6d9f5"
            strokeWidth="1.5"
          />
          {/* หลอดม่วง */}
          <rect
            x="214"
            y="36"
            width="11"
            height="80"
            rx="5.5"
            fill="#8a5cf0"
            transform="rotate(14 220 76)"
          />
          <rect
            x="214"
            y="36"
            width="4"
            height="80"
            rx="2"
            fill="#ffffff"
            opacity="0.35"
            transform="rotate(14 220 76)"
          />
        </g>

        {/* 💧 หยดนมลอยเด้งเบา ๆ */}
        <Drop x={96} y={66} delay="0s" />
        <Drop x={300} y={72} s={0.8} delay="1.1s" />
        <Drop x={70} y={196} s={0.7} delay="2s" />
        <Drop x={318} y={200} s={0.9} delay="0.6s" />
        {/* 🫧 ฟองนม */}
        <Bubble x={120} y={40} r={9} delay="0.3s" />
        <Bubble x={262} y={34} r={7} delay="1.5s" />
        <Bubble x={56} y={150} r={6} delay="0.9s" />
        <Bubble x={334} y={140} r={8} delay="2.2s" />
        <Bubble x={110} y={230} r={5} delay="1.8s" />

        {/* ✨ ประกายขาว/ม่วง เป็นบางจังหวะ */}
        <g className="animate-twinkle">
          <path
            d="M86 116 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2 Z"
            fill="#ffffff"
          />
        </g>
        <g className="animate-twinkle" style={{ animationDelay: "1.2s" }}>
          <path
            d="M290 118 l1.6 4.8 l4.8 1.6 l-4.8 1.6 l-1.6 4.8 l-1.6 -4.8 l-4.8 -1.6 l4.8 -1.6 Z"
            fill="#d492e0"
          />
        </g>
        <g className="animate-twinkle" style={{ animationDelay: "2.1s" }}>
          <path
            d="M160 30 l1.4 4.2 l4.2 1.4 l-4.2 1.4 l-1.4 4.2 l-1.4 -4.2 l-4.2 -1.4 l4.2 -1.4 Z"
            fill="#c9b3e8"
          />
        </g>
        <circle
          cx="244"
          cy="238"
          r="2.5"
          fill="#ffffff"
          className="animate-twinkle"
          style={{ animationDelay: "0.8s" }}
        />
        {/* 🤍 หัวใจเล็ก */}
        <g
          className="animate-floaty"
          style={{ transformOrigin: "342px 60px", animationDelay: "0.4s" }}
        >
          <path
            d="M338 62 c-5 -7 3 -12 5 -5 c2 -7 10 -2 5 5 l-5 5 Z"
            fill="#ffffff"
            stroke="#e6d9f5"
            strokeWidth="1.2"
          />
        </g>
      </svg>
    </div>
  );
}

export default function MilkHero() {
  return (
    <div className="relative mb-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-white via-cream-white to-grape-50 px-6 py-8 ring-1 ring-white/80 sm:px-10 lg:py-10">
      <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-grape-300/25 blur-3xl" />
      <div className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-grape-700 ring-1 ring-grape-200">
            🥛 นมละมุนกอดใจ 🤍
          </span>
          <h1 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
            เมนูนม
          </h1>
          <p className="font-display mt-1 text-lg font-semibold text-blossom-400">
            Milk Drinks
          </p>
          <p className="mx-auto mt-3 max-w-xl text-ink/60 lg:mx-0">
            นมสด นมหมี ชานม นมชมพู — หอมมัน นุ่มละมุน หวานกำลังดี
            แก้วนี้กอดใจให้อุ่นทุกอึก 🤍💜
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5 lg:justify-start">
            {["🥛 นมสด", "🐻 นมหมี", "🧋 ชานม", "🌸 นมชมพู", "🍌 นมกล้วย"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-ink ring-1 ring-ink/5"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
        <MilkHeroArt className="order-first mx-auto w-full max-w-[280px] sm:max-w-[340px] lg:order-none lg:max-w-none" />
      </div>
    </div>
  );
}
