/**
 * ☕ CoffeeHero — หัวหมวด "เมนูกาแฟ" คอนเซปต์ "กาแฟเข้ม หอมคาราเมล ☕✨"
 * แก้วกาแฟใหญ่ (เอสเพรสโซเข้ม ลาเต้อาร์ตหัวใจ + ไอร้อนครีม) ตรงกลาง
 * ล้อมด้วยแก้วกาแฟเฉดต่าง ๆ: ☕ อเมริกาโน (เข้ม) · 🥛 ลาเต้ (น้ำตาลนม) · 🍮 คาราเมล (อำพัน) · 🍫 มอคค่า
 * Coffee swirl / caramel drizzle / เมล็ดกาแฟ / glow ทอง · พื้นหลัง Coffee Brown → Caramel → Soft Purple
 * SVG ล้วน · แอนิเมชันนุ่ม (coffee-steam / milk-swirl / floaty / twinkle / serve-pop) · รองรับ prefers-reduced-motion
 */

type Tone = { top: string; bottom: string; foam: string };
const COFFEE = {
  espresso: { top: "#6b3f22", bottom: "#2f1a0e", foam: "#d9a35c" },
  americano: { top: "#5a3520", bottom: "#24130a", foam: "#3e2314" },
  latte: { top: "#d2a06a", bottom: "#9a6438", foam: "#fff3e2" },
  caramel: { top: "#f0b657", bottom: "#c9782e", foam: "#ffe6b3" },
  mocha: { top: "#8a5232", bottom: "#4a2a17", foam: "#f5e1d3" },
} satisfies Record<string, Tone>;

function Bean({
  x,
  y,
  r,
  delay,
  s = 1,
}: {
  x: number;
  y: number;
  r: number;
  delay: string;
  s?: number;
}) {
  return (
    <g
      className="animate-floaty-slow"
      style={{ transformOrigin: `${x}px ${y}px`, animationDelay: delay }}
    >
      <g transform={`rotate(${r} ${x} ${y}) translate(${x} ${y}) scale(${s})`}>
        <ellipse cx="0" cy="0" rx="11" ry="15" fill="#4a2a17" />
        <path
          d="M0 -12 C-5 -4 5 4 0 12"
          stroke="#22110a"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse
          cx="-4"
          cy="-6"
          rx="2.5"
          ry="4"
          fill="#ffffff"
          opacity="0.22"
        />
      </g>
    </g>
  );
}

/* แก้วกาแฟใบเล็กรอบ ๆ */
function MiniCup({
  x,
  y,
  tone,
  emoji,
  scale = 0.6,
  delay,
  uid,
}: {
  x: number;
  y: number;
  tone: Tone;
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
          <linearGradient id={`cc-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tone.top} />
            <stop offset="100%" stopColor={tone.bottom} />
          </linearGradient>
        </defs>
        <ellipse cx="0" cy="118" rx="46" ry="7" fill="#2f1a0e" opacity="0.25" />
        <path
          d="M-40 0 h80 l-7 100 a9 9 0 0 1 -9 8 H-24 a9 9 0 0 1 -9 -8 Z"
          fill={`url(#cc-${uid})`}
        />
        <path
          d="M-40 0 h80 l-7 100 a9 9 0 0 1 -9 8 H-24 a9 9 0 0 1 -9 -8 Z"
          fill="#ffffff"
          fillOpacity="0.1"
          stroke="#ffffff"
          strokeOpacity="0.7"
          strokeWidth="2.5"
        />
        <path
          d="M-28 14 l-5 76"
          stroke="#ffffff"
          strokeOpacity="0.5"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* ฟอง/ครีมด้านบน */}
        <ellipse cx="0" cy="0" rx="44" ry="11" fill={tone.foam} />
        <circle cx="-18" cy="-8" r="12" fill={tone.foam} />
        <circle cx="6" cy="-13" r="14" fill={tone.foam} />
        <circle cx="26" cy="-6" r="11" fill={tone.foam} />
        <rect
          x="-44"
          y="-4"
          width="88"
          height="8"
          rx="4"
          fill="#ffffff"
          opacity="0.9"
        />
        <rect
          x="16"
          y="-52"
          width="9"
          height="60"
          rx="4.5"
          fill="#8a5cf0"
          transform="rotate(12 20 -20)"
        />
        <circle cx="0" cy="56" r="14" fill="#ffffff" opacity="0.92" />
        <text x="0" y="61" textAnchor="middle" fontSize="14">
          {emoji}
        </text>
      </g>
    </g>
  );
}

export function CoffeeHeroArt({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden>
      <svg viewBox="0 0 420 300" className="h-full w-full" fill="none">
        <defs>
          <linearGradient id="cf-cup" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#efe6fb" />
          </linearGradient>
          <radialGradient id="cf-coffee" cx="0.5" cy="0.4" r="0.7">
            <stop offset="0%" stopColor="#7a4a2a" />
            <stop offset="100%" stopColor="#2f1a0e" />
          </radialGradient>
          <linearGradient id="cf-steam" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#fff3e2" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="cf-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#f6c25c" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#c9782e" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#6b3f22" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cf-caramel" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f6c25c" />
            <stop offset="100%" stopColor="#c9782e" />
          </linearGradient>
        </defs>

        {/* ✨ glow ทองอุ่น + วงกลมคาราเมลโปร่งด้านหลัง */}
        <circle
          cx="210"
          cy="160"
          r="140"
          fill="url(#cf-glow)"
          className="animate-magic-glow"
          style={{ transformOrigin: "210px 160px", animationDuration: "5s" }}
        />
        <circle cx="210" cy="160" r="112" fill="#c9782e" opacity="0.28" />
        <circle
          cx="210"
          cy="160"
          r="112"
          fill="none"
          stroke="#f6c25c"
          strokeOpacity="0.55"
          strokeWidth="5"
          strokeDasharray="4 16"
          className="animate-milk-swirl"
          style={{ transformOrigin: "210px 160px", animationDuration: "70s" }}
        />

        {/* 🌀 Coffee swirl + caramel drizzle วนรอบแก้ว */}
        <g
          className="animate-milk-swirl"
          style={{ transformOrigin: "210px 160px", animationDuration: "30s" }}
        >
          <path
            d="M100 160 A110 110 0 0 1 210 50"
            stroke="url(#cf-caramel)"
            strokeWidth="13"
            strokeLinecap="round"
            opacity="0.95"
          />
          <path
            d="M100 160 A110 110 0 0 1 210 50"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>
        <g
          className="animate-milk-swirl-rev"
          style={{ transformOrigin: "210px 160px", animationDuration: "40s" }}
        >
          <path
            d="M320 160 A110 110 0 0 1 210 270"
            stroke="#5a3520"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M320 160 A110 110 0 0 1 210 270"
            stroke="#c9782e"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
          />
        </g>
        <g
          className="animate-milk-swirl"
          style={{
            transformOrigin: "210px 160px",
            animationDuration: "48s",
            animationDelay: "-12s",
          }}
        >
          <path
            d="M210 270 A110 110 0 0 1 100 160"
            stroke="#fff3e2"
            strokeWidth="9"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M210 50 A110 110 0 0 1 320 160"
            stroke="#d2a06a"
            strokeWidth="9"
            strokeLinecap="round"
            opacity="0.85"
          />
        </g>

        {/* แก้วรอบ ๆ (หลัง) */}
        <MiniCup
          x={90}
          y={150}
          tone={COFFEE.americano}
          emoji="☕"
          delay="0.4s"
          uid="am"
        />
        <MiniCup
          x={332}
          y={150}
          tone={COFFEE.latte}
          emoji="🥛"
          delay="1.1s"
          uid="la"
        />

        {/* ☁️ ไอร้อน 3 เส้น */}
        {[
          { x: 178, delay: "0s", dur: "4.2s", w: 26 },
          { x: 210, delay: "1.3s", dur: "4.8s", w: 32 },
          { x: 242, delay: "2.4s", dur: "4.4s", w: 24 },
        ].map((s, i) => (
          <g
            key={i}
            className="animate-coffee-steam"
            style={{
              transformOrigin: `${s.x}px 112px`,
              animationDelay: s.delay,
              animationDuration: s.dur,
            }}
          >
            <path
              d={`M${s.x} 112 C${s.x - s.w / 2} 94 ${s.x + s.w / 2} 80 ${s.x} 62 C${s.x - s.w / 2} 46 ${s.x + s.w / 2} 32 ${s.x} 14`}
              stroke="url(#cf-steam)"
              strokeWidth={s.w * 0.55}
              strokeLinecap="round"
              opacity="0.95"
            />
            <path
              d={`M${s.x} 112 C${s.x - s.w / 2} 94 ${s.x + s.w / 2} 80 ${s.x} 62 C${s.x - s.w / 2} 46 ${s.x + s.w / 2} 32 ${s.x} 14`}
              stroke="#ffffff"
              strokeWidth={s.w * 0.22}
              strokeLinecap="round"
              opacity="0.8"
            />
          </g>
        ))}

        {/* ☕ แก้วกาแฟหลัก (เด้งตอนเปิด แล้วลอยเบา ๆ) */}
        <g
          className="animate-serve-pop"
          style={{ transformOrigin: "210px 260px" }}
        >
          <g
            className="animate-floaty-slow"
            style={{ transformOrigin: "210px 260px" }}
          >
            {/* จานรอง */}
            <ellipse
              cx="210"
              cy="248"
              rx="104"
              ry="17"
              fill="#3e2314"
              opacity="0.35"
            />
            <ellipse cx="210" cy="244" rx="94" ry="13" fill="#fbf7ff" />
            <ellipse cx="210" cy="244" rx="60" ry="6" fill="#e6d9f5" />
            {/* หูแก้ว */}
            <path
              d="M276 152 c30 -6 38 36 8 46 l-8 2"
              stroke="#e6d9f5"
              strokeWidth="15"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M276 152 c30 -6 38 36 8 46 l-8 2"
              stroke="url(#cf-cup)"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
            {/* ตัวแก้ว */}
            <path
              d="M140 128 h140 l-11 88 a13 13 0 0 1 -13 11 H164 a13 13 0 0 1 -13 -11 Z"
              fill="url(#cf-cup)"
              stroke="#e6d9f5"
              strokeWidth="2.5"
            />
            {/* แถบม่วง + โลโก้ */}
            <path
              d="M146 168 h128 l-2 18 H148 Z"
              fill="#b795d8"
              opacity="0.85"
            />
            <circle cx="210" cy="177" r="13" fill="#ffffff" />
            <text x="210" y="182" textAnchor="middle" fontSize="14">
              ☕
            </text>
            {/* หน้ายิ้ม */}
            <circle cx="186" cy="206" r="2.6" fill="#3a2f45" />
            <circle cx="234" cy="206" r="2.6" fill="#3a2f45" />
            <path
              d="M200 212 q10 7 20 0"
              stroke="#3a2f45"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <ellipse cx="174" cy="212" rx="4.5" ry="2.6" fill="#f5b7c8" />
            <ellipse cx="246" cy="212" rx="4.5" ry="2.6" fill="#f5b7c8" />
            {/* ขอบ + กาแฟเข้ม + ลาเต้อาร์ต */}
            <ellipse
              cx="210"
              cy="128"
              rx="72"
              ry="18"
              fill="#fbf7ff"
              stroke="#e6d9f5"
              strokeWidth="2.5"
            />
            <ellipse cx="210" cy="128" rx="63" ry="13" fill="url(#cf-coffee)" />
            <ellipse
              cx="210"
              cy="126"
              rx="52"
              ry="8"
              fill="#c9782e"
              opacity="0.35"
            />
            {/* caramel drizzle บนหน้า */}
            <path
              d="M172 126 q10 -6 20 0 t20 0 t20 0 t20 0"
              stroke="#f6c25c"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.9"
            />
            <g className="animate-twinkle" style={{ animationDuration: "5s" }}>
              <path
                d="M210 138 c-11 -9 -22 -7 -20 -1 c2 6 13 9 20 13 c7 -4 18 -7 20 -13 c2 -6 -9 -8 -20 1 Z"
                fill="#fff3e2"
              />
              <path
                d="M210 137 c-7 -5 -13 -3 -12 0 c1 3 8 6 12 9 c4 -3 11 -6 12 -9 c1 -3 -5 -5 -12 0 Z"
                fill="#d9a35c"
                opacity="0.65"
              />
            </g>
          </g>
        </g>

        {/* แก้วรอบ ๆ (หน้า) */}
        <MiniCup
          x={126}
          y={200}
          tone={COFFEE.caramel}
          emoji="🍮"
          scale={0.5}
          delay="1.6s"
          uid="ca"
        />
        <MiniCup
          x={296}
          y={200}
          tone={COFFEE.mocha}
          emoji="🍫"
          scale={0.5}
          delay="0.9s"
          uid="mo"
        />

        {/* ☕ เมล็ดกาแฟ */}
        <Bean x={52} y={78} r={-25} delay="0s" />
        <Bean x={372} y={70} r={30} delay="1.2s" s={0.9} />
        <Bean x={40} y={232} r={20} delay="0.6s" s={0.85} />
        <Bean x={386} y={240} r={-35} delay="1.8s" />
        <Bean x={108} y={278} r={50} delay="2.4s" s={0.7} />
        <Bean x={312} y={282} r={-10} delay="0.3s" s={0.7} />
        {/* ผงกาแฟ */}
        {[
          [150, 268],
          [162, 276],
          [258, 272],
          [272, 280],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.2" fill="#4a2a17" opacity="0.7" />
        ))}

        {/* 💧 หยดคาราเมล / กาแฟ */}
        {[
          [70, 150, "#f6c25c", "0s"],
          [352, 120, "#c9782e", "1.1s"],
          [210, 20, "#fff3e2", "2s"],
        ].map(([x, y, c, d], i) => (
          <g
            key={i}
            className="animate-milk-drop"
            style={{
              transformOrigin: `${x}px ${y}px`,
              animationDelay: d as string,
            }}
          >
            <path
              d={`M${x} ${(y as number) - 12} C${(x as number) + 5} ${(y as number) - 5} ${(x as number) + 8} ${y} ${(x as number) + 8} ${(y as number) + 4} A8 8 0 0 1 ${(x as number) - 8} ${(y as number) + 4} C${(x as number) - 8} ${y} ${(x as number) - 5} ${(y as number) - 5} ${x} ${(y as number) - 12} Z`}
              fill={c as string}
              stroke="#ffffff"
              strokeWidth="1.2"
            />
          </g>
        ))}

        {/* ✨ ประกายทอง/ม่วง บริเวณคาราเมล */}
        <g className="animate-twinkle">
          <path
            d="M120 60 l2.2 6.6 l6.6 2.2 l-6.6 2.2 l-2.2 6.6 l-2.2 -6.6 l-6.6 -2.2 l6.6 -2.2 Z"
            fill="#f6c25c"
          />
        </g>
        <g className="animate-twinkle" style={{ animationDelay: "1.4s" }}>
          <path
            d="M318 56 l1.8 5.4 l5.4 1.8 l-5.4 1.8 l-1.8 5.4 l-1.8 -5.4 l-5.4 -1.8 l5.4 -1.8 Z"
            fill="#d492e0"
          />
        </g>
        <g className="animate-twinkle" style={{ animationDelay: "2.2s" }}>
          <path
            d="M96 124 l1.6 4.8 l4.8 1.6 l-4.8 1.6 l-1.6 4.8 l-1.6 -4.8 l-4.8 -1.6 l4.8 -1.6 Z"
            fill="#fff3e2"
          />
        </g>
        <circle
          cx="330"
          cy="258"
          r="2.8"
          fill="#f6c25c"
          className="animate-twinkle"
          style={{ animationDelay: "0.8s" }}
        />
        <circle
          cx="86"
          cy="270"
          r="2.2"
          fill="#ffffff"
          className="animate-twinkle"
          style={{ animationDelay: "1.9s" }}
        />
      </svg>
    </div>
  );
}

export default function CoffeeHero() {
  return (
    <div className="relative mb-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#3e2314] via-[#7a4a2a] to-[#6b4a9c] px-6 py-8 text-white shadow-card ring-1 ring-white/10 sm:px-10 lg:py-10">
      {/* Shape / glow ด้านหลัง */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#c9782e]/45 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-[#f6c25c]/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 -top-10 h-80 w-80 rounded-full bg-grape-400/35 blur-3xl" />
      <div className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_440px]">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-[#ffe6b3] ring-1 ring-white/25 backdrop-blur-sm">
            ☕ กาแฟเข้ม หอมคาราเมล ✨
          </span>
          <h1 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            เมนูกาแฟ
          </h1>
          <p className="font-display mt-1 text-lg font-semibold text-[#f6c25c]">
            Coffee
          </p>
          <p className="mx-auto mt-3 max-w-xl text-white/80 lg:mx-0">
            เอสเพรสโซ อเมริกาโน ลาเต้ มอคค่า คาราเมลมัคคิอาโต — คั่วเข้ม
            หอมกรุ่น ราดคาราเมลหวานละมุน ปลุกฟ่างให้ตื่นทุกเช้า ☕💜
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5 lg:justify-start">
            {[
              ["☕ เอสเพรสโซ", "#2f1a0e"],
              ["🖤 อเมริกาโน", "#4a2a17"],
              ["🥛 ลาเต้", "#c99a63"],
              ["🍫 มอคค่า", "#6b3f22"],
              ["🍮 คาราเมล", "#f0b657"],
            ].map(([t, c]) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full ring-1 ring-white/70"
                  style={{ background: c }}
                />
                {t}
              </span>
            ))}
          </div>
        </div>
        <CoffeeHeroArt className="order-first mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:order-none lg:max-w-none" />
      </div>
    </div>
  );
}
