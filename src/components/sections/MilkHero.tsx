/**
 * 🥛 MilkHero — หัวหมวด "เมนูนม" คอนเซปต์ "นมละมุนสีฟุ้ง ๆ 🥛✨"
 * แก้วนมหลัก (นมสดขาวครีม + ฟองนมนุ่ม) กลางภาพ ล้อมด้วยแก้วนมสีต่าง ๆ:
 * 🌸 นมชมพู · 🍫 โกโก้/ไมโล · 🍵 ชาเขียวนม · 🧋 ชาไทย
 * เส้นของเหลวสีนมโค้งวนรอบแก้ว + ฟองนม + ประกาย · พื้นหลัง Lavender/Soft Purple/Pink/Cream + วงกลมใหญ่หลังแก้ว
 * SVG ล้วน · แอนิเมชันนุ่ม (floaty / milk-swirl / milk-drop / twinkle) · รองรับ prefers-reduced-motion
 */

type MilkTone = { top: string; bottom: string; foam: string };
const MILK = {
  fresh: { top: "#fffdf6", bottom: "#f5e6c8", foam: "#ffffff" },
  pink: { top: "#ffc2d8", bottom: "#f58bb1", foam: "#fff0f5" },
  cocoa: { top: "#b8865e", bottom: "#6b4a30", foam: "#f5ece4" },
  matcha: { top: "#a8ce7a", bottom: "#5f9a3f", foam: "#f1f7e8" },
  thai: { top: "#f7b56d", bottom: "#d97a2e", foam: "#fff0df" },
} satisfies Record<string, MilkTone>;

/* แก้วนมใบเล็ก (รอบ ๆ) */
function MiniGlass({
  x,
  y,
  tone,
  emoji,
  scale = 0.62,
  delay,
  uid,
}: {
  x: number;
  y: number;
  tone: MilkTone;
  emoji: string;
  scale?: number;
  delay: string;
  uid: string;
}) {
  return (
    <g
      className="animate-floaty"
      style={{ transformOrigin: `${x}px ${y + 70}px`, animationDelay: delay }}
    >
      <g transform={`translate(${x} ${y}) scale(${scale})`}>
        <defs>
          <linearGradient id={`mg-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tone.top} />
            <stop offset="100%" stopColor={tone.bottom} />
          </linearGradient>
        </defs>
        <ellipse cx="0" cy="118" rx="44" ry="7" fill="#7b4ab8" opacity="0.14" />
        <path
          d="M-40 0 h80 l-7 100 a9 9 0 0 1 -9 8 H-24 a9 9 0 0 1 -9 -8 Z"
          fill={`url(#mg-${uid})`}
        />
        <path
          d="M-40 0 h80 l-7 100 a9 9 0 0 1 -9 8 H-24 a9 9 0 0 1 -9 -8 Z"
          fill="#ffffff"
          fillOpacity="0.14"
          stroke="#ffffff"
          strokeOpacity="0.8"
          strokeWidth="2.5"
        />
        <path
          d="M-28 14 l-5 76"
          stroke="#ffffff"
          strokeOpacity="0.7"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* ฟองนม */}
        <ellipse cx="0" cy="0" rx="44" ry="11" fill={tone.foam} />
        <circle cx="-20" cy="-8" r="13" fill={tone.foam} />
        <circle cx="4" cy="-14" r="15" fill="#ffffff" />
        <circle cx="26" cy="-6" r="12" fill={tone.foam} />
        <rect
          x="-44"
          y="-4"
          width="88"
          height="8"
          rx="4"
          fill="#ffffff"
          opacity="0.95"
        />
        {/* หลอด */}
        <rect
          x="16"
          y="-52"
          width="9"
          height="60"
          rx="4.5"
          fill="#8a5cf0"
          transform="rotate(12 20 -20)"
        />
        {/* โลโก้ */}
        <circle cx="0" cy="56" r="14" fill="#ffffff" opacity="0.92" />
        <text x="0" y="61" textAnchor="middle" fontSize="14">
          {emoji}
        </text>
      </g>
    </g>
  );
}

function Drop({
  x,
  y,
  color,
  s = 1,
  delay,
}: {
  x: number;
  y: number;
  color: string;
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
          fill={color}
          stroke="#ffffff"
          strokeWidth="1.5"
        />
        <ellipse
          cx="-3.5"
          cy="2"
          rx="2"
          ry="3.5"
          fill="#ffffff"
          opacity="0.7"
        />
      </g>
    </g>
  );
}

export function MilkHeroArt({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden>
      <svg viewBox="0 0 420 300" className="h-full w-full" fill="none">
        <defs>
          <linearGradient id="mk-main" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={MILK.fresh.top} />
            <stop offset="100%" stopColor={MILK.fresh.bottom} />
          </linearGradient>
          <linearGradient id="mk-glass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#c9b3e8" stopOpacity="0.45" />
          </linearGradient>
          <radialGradient id="mk-bg" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#f3d9ff" />
            <stop offset="60%" stopColor="#d9c3f5" />
            <stop offset="100%" stopColor="#c9b3e8" stopOpacity="0.4" />
          </radialGradient>
        </defs>

        {/* 🟣 วงกลมใหญ่ด้านหลัง (ให้แก้วเด่น) */}
        <circle cx="210" cy="150" r="128" fill="url(#mk-bg)" />
        <circle
          cx="210"
          cy="150"
          r="128"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.6"
          strokeWidth="6"
          strokeDasharray="6 14"
          className="animate-milk-swirl"
          style={{ transformOrigin: "210px 150px", animationDuration: "60s" }}
        />

        {/* 🌀 เส้นของเหลวสีนมโค้งวนรอบแก้ว (3 เส้น คนละสี คนละความเร็ว) */}
        <g
          className="animate-milk-swirl"
          style={{ transformOrigin: "210px 150px", animationDuration: "26s" }}
        >
          <path
            d="M100 150 A110 110 0 0 1 210 40"
            stroke={MILK.pink.top}
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M100 150 A110 110 0 0 1 210 40"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>
        <g
          className="animate-milk-swirl-rev"
          style={{ transformOrigin: "210px 150px", animationDuration: "34s" }}
        >
          <path
            d="M320 150 A110 110 0 0 1 210 260"
            stroke={MILK.matcha.top}
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M320 150 A110 110 0 0 1 210 260"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>
        <g
          className="animate-milk-swirl"
          style={{
            transformOrigin: "210px 150px",
            animationDuration: "44s",
            animationDelay: "-10s",
          }}
        >
          <path
            d="M210 260 A110 110 0 0 1 100 150"
            stroke={MILK.thai.top}
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M210 40 A110 110 0 0 1 320 150"
            stroke={MILK.cocoa.top}
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.75"
          />
        </g>

        {/* แก้วนมสีรอบ ๆ (หลัง) */}
        <MiniGlass
          x={92}
          y={150}
          tone={MILK.pink}
          emoji="🌸"
          delay="0.4s"
          uid="pink"
        />
        <MiniGlass
          x={330}
          y={150}
          tone={MILK.cocoa}
          emoji="🍫"
          delay="1.1s"
          uid="cocoa"
        />

        {/* 🥛 แก้วนมหลัก (นมสด) */}
        <g
          className="animate-floaty-slow"
          style={{ transformOrigin: "210px 260px" }}
        >
          <ellipse
            cx="210"
            cy="266"
            rx="74"
            ry="9"
            fill="#7b4ab8"
            opacity="0.18"
          />
          <path
            d="M152 108 h116 l-10 132 a11 11 0 0 1 -11 10 H173 a11 11 0 0 1 -11 -10 Z"
            fill="url(#mk-main)"
          />
          <path
            d="M152 108 h116 l-10 132 a11 11 0 0 1 -11 10 H173 a11 11 0 0 1 -11 -10 Z"
            fill="url(#mk-glass)"
            stroke="#ffffff"
            strokeWidth="3"
          />
          <path
            d="M170 126 l-7 104"
            stroke="#ffffff"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.85"
          />
          {/* แถบม่วง + โลโก้ */}
          <path
            d="M157 164 h106 l-1.5 18 H158.5 Z"
            fill="#b795d8"
            opacity="0.75"
          />
          <circle cx="210" cy="173" r="12" fill="#ffffff" />
          <text x="210" y="178" textAnchor="middle" fontSize="13">
            🥛
          </text>
          {/* หน้ายิ้ม */}
          <circle cx="192" cy="208" r="2.6" fill="#3a2f45" />
          <circle cx="228" cy="208" r="2.6" fill="#3a2f45" />
          <path
            d="M202 215 q8 6 16 0"
            stroke="#3a2f45"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <ellipse cx="181" cy="214" rx="4.5" ry="2.6" fill="#f5b7c8" />
          <ellipse cx="239" cy="214" rx="4.5" ry="2.6" fill="#f5b7c8" />
          {/* ฟองนมนุ่มด้านบน */}
          <g
            className="animate-floaty"
            style={{ transformOrigin: "210px 104px", animationDelay: "0.6s" }}
          >
            <ellipse cx="210" cy="108" rx="64" ry="15" fill="#ffffff" />
            <circle cx="176" cy="96" r="17" fill="#ffffff" />
            <circle cx="198" cy="84" r="20" fill="#fffdf9" />
            <circle cx="224" cy="86" r="18" fill="#ffffff" />
            <circle cx="246" cy="98" r="15" fill="#fffdf9" />
            <circle cx="210" cy="72" r="15" fill="#ffffff" />
            <ellipse
              cx="210"
              cy="113"
              rx="60"
              ry="6"
              fill="#e6d9f5"
              opacity="0.8"
            />
            <ellipse cx="194" cy="78" rx="6" ry="3" fill="#ffffff" />
            <circle cx="188" cy="92" r="2.6" fill="#f3ecfb" />
            <circle cx="232" cy="94" r="2.2" fill="#f3ecfb" />
          </g>
          <rect
            x="148"
            y="104"
            width="124"
            height="10"
            rx="5"
            fill="#ffffff"
            stroke="#e6d9f5"
            strokeWidth="1.5"
          />
          {/* หลอด */}
          <rect
            x="236"
            y="34"
            width="12"
            height="82"
            rx="6"
            fill="#8a5cf0"
            transform="rotate(14 242 75)"
          />
          <rect
            x="236"
            y="34"
            width="4"
            height="82"
            rx="2"
            fill="#ffffff"
            opacity="0.35"
            transform="rotate(14 242 75)"
          />
        </g>

        {/* แก้วนมสีรอบ ๆ (หน้า) */}
        <MiniGlass
          x={128}
          y={196}
          tone={MILK.matcha}
          emoji="🍵"
          scale={0.5}
          delay="1.6s"
          uid="matcha"
        />
        <MiniGlass
          x={296}
          y={196}
          tone={MILK.thai}
          emoji="🧋"
          scale={0.5}
          delay="0.9s"
          uid="thai"
        />

        {/* 💧 หยดนมหลากสี */}
        <Drop x={60} y={70} color={MILK.pink.top} delay="0s" />
        <Drop x={368} y={62} color={MILK.cocoa.top} s={0.8} delay="1.2s" />
        <Drop x={46} y={240} color={MILK.matcha.top} s={0.75} delay="2.1s" />
        <Drop x={380} y={236} color={MILK.thai.top} s={0.9} delay="0.7s" />
        <Drop x={210} y={24} color="#ffffff" s={0.7} delay="1.7s" />

        {/* 🫧 ฟองนม */}
        {[
          [112, 44, 9, "0.3s"],
          [312, 38, 7, "1.5s"],
          [40, 150, 6, "0.9s"],
          [388, 140, 8, "2.2s"],
          [150, 280, 5, "1.8s"],
          [280, 284, 6, "0.5s"],
        ].map(([x, y, r, d], i) => (
          <g
            key={i}
            className="animate-floaty"
            style={{
              transformOrigin: `${x}px ${y}px`,
              animationDelay: d as string,
            }}
          >
            <circle
              cx={x as number}
              cy={y as number}
              r={r as number}
              fill="#ffffff"
              stroke="#e6d9f5"
              strokeWidth="1.5"
            />
            <circle
              cx={(x as number) - (r as number) * 0.3}
              cy={(y as number) - (r as number) * 0.3}
              r={(r as number) * 0.28}
              fill="#f7f1ff"
            />
          </g>
        ))}

        {/* ✨ ประกาย */}
        <g className="animate-twinkle">
          <path
            d="M70 120 l2.2 6.6 l6.6 2.2 l-6.6 2.2 l-2.2 6.6 l-2.2 -6.6 l-6.6 -2.2 l6.6 -2.2 Z"
            fill="#ffffff"
          />
        </g>
        <g className="animate-twinkle" style={{ animationDelay: "1.2s" }}>
          <path
            d="M352 110 l1.8 5.4 l5.4 1.8 l-5.4 1.8 l-1.8 5.4 l-1.8 -5.4 l-5.4 -1.8 l5.4 -1.8 Z"
            fill="#f5b7c8"
          />
        </g>
        <g className="animate-twinkle" style={{ animationDelay: "2.1s" }}>
          <path
            d="M170 34 l1.6 4.8 l4.8 1.6 l-4.8 1.6 l-1.6 4.8 l-1.6 -4.8 l-4.8 -1.6 l4.8 -1.6 Z"
            fill="#d492e0"
          />
        </g>
        <circle
          cx="330"
          cy="272"
          r="2.8"
          fill="#ffffff"
          className="animate-twinkle"
          style={{ animationDelay: "0.8s" }}
        />
        <g
          className="animate-floaty"
          style={{ transformOrigin: "392px 84px", animationDelay: "0.4s" }}
        >
          <path
            d="M388 86 c-5 -7 3 -12 5 -5 c2 -7 10 -2 5 5 l-5 5 Z"
            fill="#f5b7c8"
            stroke="#ffffff"
            strokeWidth="1.2"
          />
        </g>
      </svg>
    </div>
  );
}

export default function MilkHero() {
  return (
    <div className="relative mb-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-grape-200 via-[#f6e3f5] to-cream-100 px-6 py-8 ring-1 ring-white/80 sm:px-10 lg:py-10">
      {/* Shape ใหญ่ด้านหลัง */}
      <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-grape-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/3 h-64 w-64 rounded-full bg-[#f5b7c8]/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-6 h-80 w-80 rounded-full bg-white/50 blur-2xl" />
      <div className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_440px]">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-grape-700 ring-1 ring-grape-200">
            🥛 นมละมุนสีฟุ้ง ๆ ✨
          </span>
          <h1 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
            เมนูนม
          </h1>
          <p className="font-display mt-1 text-lg font-semibold text-blossom-500">
            Milk Drinks
          </p>
          <p className="mx-auto mt-3 max-w-xl text-ink/65 lg:mx-0">
            นมสด นมหมี นมชมพู โกโก้ ชาเขียวนม ชาไทย — หอมมัน นุ่มละมุน
            หวานกำลังดี เลือกสีที่ชอบได้เลย 💜
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5 lg:justify-start">
            {[
              ["🥛 นมสด", "#f5e6c8"],
              ["🌸 นมชมพู", "#f58bb1"],
              ["🍫 โกโก้ / ไมโล", "#8a5a3c"],
              ["🍵 ชาเขียวนม", "#7cb454"],
              ["🧋 ชาไทย", "#e0873a"],
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
        <MilkHeroArt className="order-first mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:order-none lg:max-w-none" />
      </div>
    </div>
  );
}
