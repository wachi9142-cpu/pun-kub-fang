/**
 * ☕ CoffeeHero — หัวหมวด "เมนูกาแฟ" คอนเซปต์ "กลิ่นกาแฟลอยมา"
 * แก้วกาแฟร้อนลาเต้อาร์ตรูปหัวใจ + ไอร้อนสีครีมนุ่ม ๆ 3 เส้นลอยขึ้นคนละจังหวะ
 * เมล็ดกาแฟ / ผงกาแฟ / จานรอง / ประกายเล็ก ๆ รอบแก้ว · โทน Brown/Coffee/Cream + Purple/Lavender
 * SVG ล้วน · แอนิเมชันเบา (transform/opacity) · รองรับ prefers-reduced-motion
 */

function Bean({
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
      className="animate-floaty-slow"
      style={{ transformOrigin: `${x}px ${y}px`, animationDelay: delay }}
    >
      <g transform={`rotate(${r} ${x} ${y})`}>
        <ellipse cx={x} cy={y} rx="11" ry="15" fill="#6b4226" />
        <path
          d={`M${x} ${y - 12} C${x - 5} ${y - 4} ${x + 5} ${y + 4} ${x} ${y + 12}`}
          stroke="#3e2314"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse
          cx={x - 4}
          cy={y - 6}
          rx="2.5"
          ry="4"
          fill="#ffffff"
          opacity="0.18"
        />
      </g>
    </g>
  );
}

export function CoffeeHeroArt({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden>
      <svg viewBox="0 0 380 260" className="h-full w-full" fill="none">
        <defs>
          <linearGradient id="cf-cup" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#efe6fb" />
          </linearGradient>
          <radialGradient id="cf-coffee" cx="0.5" cy="0.4" r="0.7">
            <stop offset="0%" stopColor="#a9764f" />
            <stop offset="100%" stopColor="#5b3a24" />
          </radialGradient>
          <linearGradient id="cf-steam" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#fff6ea" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* แสงฟุ้งอุ่น ๆ ด้านหลัง */}
        <circle cx="190" cy="150" r="110" fill="#f5e6d3" opacity="0.55" />
        <circle cx="190" cy="150" r="80" fill="#fff3e2" opacity="0.7" />

        {/* ☁️ ไอร้อน 3 เส้น (สีครีม นุ่ม โปร่ง) */}
        {[
          { x: 160, delay: "0s", dur: "4.2s", w: 26 },
          { x: 192, delay: "1.3s", dur: "4.8s", w: 32 },
          { x: 224, delay: "2.4s", dur: "4.4s", w: 24 },
        ].map((s, i) => (
          <g
            key={i}
            className="animate-coffee-steam"
            style={{
              transformOrigin: `${s.x}px 118px`,
              animationDelay: s.delay,
              animationDuration: s.dur,
            }}
          >
            <path
              d={`M${s.x} 118 C${s.x - s.w / 2} 100 ${s.x + s.w / 2} 86 ${s.x} 68 C${s.x - s.w / 2} 52 ${s.x + s.w / 2} 38 ${s.x} 20`}
              stroke="url(#cf-steam)"
              strokeWidth={s.w * 0.55}
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d={`M${s.x} 118 C${s.x - s.w / 2} 100 ${s.x + s.w / 2} 86 ${s.x} 68 C${s.x - s.w / 2} 52 ${s.x + s.w / 2} 38 ${s.x} 20`}
              stroke="#ffffff"
              strokeWidth={s.w * 0.22}
              strokeLinecap="round"
              opacity="0.7"
            />
          </g>
        ))}

        {/* จานรอง */}
        <ellipse cx="190" cy="226" rx="96" ry="16" fill="#ede3f7" />
        <ellipse cx="190" cy="222" rx="84" ry="11" fill="#fbf7ff" />
        <ellipse cx="190" cy="222" rx="56" ry="6" fill="#e6d9f5" />

        {/* หูแก้ว */}
        <path
          d="M250 150 c26 -6 34 32 8 42 l-8 2"
          stroke="#e6d9f5"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M250 150 c26 -6 34 32 8 42 l-8 2"
          stroke="url(#cf-cup)"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />

        {/* ตัวแก้ว */}
        <path
          d="M128 130 h124 l-10 78 a12 12 0 0 1 -12 10 H150 a12 12 0 0 1 -12 -10 Z"
          fill="url(#cf-cup)"
          stroke="#e6d9f5"
          strokeWidth="2.5"
        />
        {/* แถบม่วงคาดแก้ว + โลโก้ */}
        <path d="M133 166 h114 l-2 16 H135 Z" fill="#c9b3e8" opacity="0.8" />
        <circle cx="190" cy="174" r="12" fill="#ffffff" />
        <text x="190" y="179" textAnchor="middle" fontSize="13">
          ☕
        </text>
        {/* หน้ายิ้มบนแก้ว */}
        <circle cx="168" cy="200" r="2.4" fill="#3a2f45" />
        <circle cx="212" cy="200" r="2.4" fill="#3a2f45" />
        <path
          d="M182 205 q8 6 16 0"
          stroke="#3a2f45"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <ellipse
          cx="158"
          cy="205"
          rx="4"
          ry="2.4"
          fill="#f5b7c8"
          opacity="0.8"
        />
        <ellipse
          cx="222"
          cy="205"
          rx="4"
          ry="2.4"
          fill="#f5b7c8"
          opacity="0.8"
        />

        {/* ขอบแก้ว + กาแฟ + ลาเต้อาร์ตหัวใจ */}
        <ellipse
          cx="190"
          cy="130"
          rx="64"
          ry="16"
          fill="#fbf7ff"
          stroke="#e6d9f5"
          strokeWidth="2.5"
        />
        <ellipse cx="190" cy="130" rx="56" ry="12" fill="url(#cf-coffee)" />
        <ellipse
          cx="190"
          cy="129"
          rx="46"
          ry="8"
          fill="#c99a63"
          opacity="0.35"
        />
        {/* ฟองนม / ลาเต้อาร์ต */}
        <g className="animate-twinkle" style={{ animationDuration: "5s" }}>
          <path
            d="M190 138 c-10 -8 -20 -6 -18 -1 c2 5 12 8 18 12 c6 -4 16 -7 18 -12 c2 -5 -8 -7 -18 1 Z"
            fill="#fff3e2"
            opacity="0.95"
          />
          <path
            d="M190 137 c-6 -4 -12 -3 -11 0 c1 3 7 5 11 8 c4 -3 10 -5 11 -8 c1 -3 -5 -4 -11 0 Z"
            fill="#d9a35c"
            opacity="0.6"
          />
        </g>

        {/* ☕ เมล็ดกาแฟ */}
        <Bean x={70} y={200} r={-25} delay="0s" />
        <Bean x={92} y={226} r={30} delay="1.2s" />
        <Bean x={308} y={206} r={20} delay="0.6s" />
        <Bean x={330} y={232} r={-35} delay="1.8s" />
        <Bean x={60} y={110} r={45} delay="2.4s" />
        {/* ผงกาแฟโรย */}
        {[
          [104, 236],
          [116, 244],
          [126, 236],
          [270, 240],
          [284, 246],
          [296, 238],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2" fill="#6b4226" opacity="0.6" />
        ))}

        {/* ✨ ประกายเล็ก ๆ (เป็นบางจังหวะ) */}
        <g className="animate-twinkle">
          <path
            d="M96 60 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2 Z"
            fill="#f4d35e"
          />
        </g>
        <g className="animate-twinkle" style={{ animationDelay: "1.4s" }}>
          <path
            d="M296 50 l1.5 4.5 l4.5 1.5 l-4.5 1.5 l-1.5 4.5 l-1.5 -4.5 l-4.5 -1.5 l4.5 -1.5 Z"
            fill="#d492e0"
          />
        </g>
        <circle
          cx="130"
          cy="96"
          r="2.5"
          fill="#ffffff"
          className="animate-twinkle"
          style={{ animationDelay: "0.7s" }}
        />
        <circle
          cx="262"
          cy="104"
          r="2"
          fill="#c9b3e8"
          className="animate-twinkle"
          style={{ animationDelay: "2.1s" }}
        />
      </svg>
    </div>
  );
}

export default function CoffeeHero() {
  return (
    <div className="relative mb-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#fff8f0] via-cream-white to-grape-50 px-6 py-8 ring-1 ring-white/80 sm:px-10 lg:py-10">
      <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[#c99a63]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-grape-300/25 blur-3xl" />
      <div className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[#6b4226] ring-1 ring-[#e9cfa5]">
            ☕ กลิ่นกาแฟลอยมา · คั่วหอมชงสด
          </span>
          <h1 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
            เมนูกาแฟ
          </h1>
          <p className="font-display mt-1 text-lg font-semibold text-blossom-400">
            Coffee
          </p>
          <p className="mx-auto mt-3 max-w-xl text-ink/60 lg:mx-0">
            เอสเพรสโซ ลาเต้ มอคค่า คาราเมลมัคคิอาโต — หอมกรุ่น เข้มกำลังดี
            ปลุกฟ่างให้ตื่นทุกเช้า ☕💜
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5 lg:justify-start">
            {["☕ เอสเพรสโซ", "🥛 ลาเต้", "🍫 มอคค่า", "🍮 คาราเมล"].map(
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
        <CoffeeHeroArt className="order-first mx-auto w-full max-w-[280px] sm:max-w-[340px] lg:order-none lg:max-w-none" />
      </div>
    </div>
  );
}
