/**
 * 🌿 HerbalHeroArt — ภาพประกอบหัวหมวด "น้ำสมุนไพรโฮมเมด"
 * ขวด/แก้วน้ำสมุนไพร 5 สี (กระเจี๊ยบแดง · เก๊กฮวยทอง · อัญชันฟ้า · ใบเตยเขียว · มะตูมน้ำตาลอ่อน)
 * บรรจุขวดโฮมเมดมีฝาไม้ + ป้ายกระดาษ · รอบ ๆ มีวัตถุดิบสด (ดอกเก๊กฮวย กระเจี๊ยบ อัญชัน ใบเตย มะนาว ขิง)
 * SVG ล้วน โทนม่วง/ลาเวนเดอร์/ครีม + สีน้ำจริง · แอนิเมชันเบา ๆ ด้วยคลาสเดิม (floaty / twinkle / cat-tail ฯลฯ)
 */
type Bottle = {
  x: number;
  h: number; // ความสูงขวด
  top: string;
  bottom: string;
  label: string;
  emoji: string;
  delay: string;
};

const BOTTLES: Bottle[] = [
  {
    x: 26,
    h: 130,
    top: "#e0435c",
    bottom: "#a3122f",
    label: "กระเจี๊ยบ",
    emoji: "🌺",
    delay: "0s",
  },
  {
    x: 92,
    h: 150,
    top: "#ffd45c",
    bottom: "#e0a11c",
    label: "เก๊กฮวย",
    emoji: "🌼",
    delay: "0.8s",
  },
  {
    x: 160,
    h: 166,
    top: "#6fa8ff",
    bottom: "#2d4ec9",
    label: "อัญชัน",
    emoji: "🦋",
    delay: "1.6s",
  },
  {
    x: 228,
    h: 150,
    top: "#9bd66a",
    bottom: "#3f8f35",
    label: "ใบเตย",
    emoji: "🌿",
    delay: "0.4s",
  },
  {
    x: 294,
    h: 130,
    top: "#e9c48c",
    bottom: "#b07a3a",
    label: "มะตูม",
    emoji: "🌳",
    delay: "1.2s",
  },
];

function BottleSvg({ b }: { b: Bottle }) {
  const baseY = 220;
  const y = baseY - b.h;
  const uid = b.bottom.replace("#", "");
  const w = 54;
  return (
    <g
      className="animate-floaty"
      style={{
        animationDelay: b.delay,
        transformOrigin: `${b.x + w / 2}px ${baseY}px`,
      }}
    >
      <defs>
        <linearGradient id={`hb-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={b.top} />
          <stop offset="100%" stopColor={b.bottom} />
        </linearGradient>
      </defs>
      {/* เงา */}
      <ellipse
        cx={b.x + w / 2}
        cy={baseY + 6}
        rx={w / 2 + 4}
        ry="5"
        fill="#7b4ab8"
        opacity="0.14"
      />
      {/* ตัวขวด (ไหล่โค้ง) */}
      <path
        d={`M${b.x} ${y + 34} q0 -14 14 -16 h26 q14 2 14 16 V${baseY - 8} a8 8 0 0 1 -8 8 H${b.x + 8} a8 8 0 0 1 -8 -8 Z`}
        fill="#ffffff"
        fillOpacity="0.35"
        stroke="#d8c7f0"
        strokeWidth="2"
      />
      {/* น้ำสมุนไพร (เว้นคอขวด) */}
      <path
        d={`M${b.x + 3} ${y + 46} h${w - 6} V${baseY - 9} a6 6 0 0 1 -6 6 H${b.x + 9} a6 6 0 0 1 -6 -6 Z`}
        fill={`url(#hb-${uid})`}
        opacity="0.92"
      />
      {/* แสงสะท้อนบนขวด */}
      <path
        d={`M${b.x + 9} ${y + 52} v${b.h - 70}`}
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* คอขวด + ฝาไม้ */}
      <rect
        x={b.x + 14}
        y={y + 8}
        width={w - 28}
        height="14"
        rx="3"
        fill="#ffffff"
        fillOpacity="0.5"
        stroke="#d8c7f0"
        strokeWidth="2"
      />
      <rect
        x={b.x + 11}
        y={y}
        width={w - 22}
        height="12"
        rx="4"
        fill="#c99a63"
      />
      <rect
        x={b.x + 11}
        y={y + 3}
        width={w - 22}
        height="3"
        fill="#ffffff"
        opacity="0.25"
      />
      {/* ป้ายกระดาษ */}
      <rect
        x={b.x + 8}
        y={y + 80}
        width={w - 16}
        height="34"
        rx="6"
        fill="#fffdf7"
        stroke="#e6d9f5"
        strokeWidth="1.5"
      />
      <text x={b.x + w / 2} y={y + 96} textAnchor="middle" fontSize="12">
        {b.emoji}
      </text>
      <text
        x={b.x + w / 2}
        y={y + 109}
        textAnchor="middle"
        fontSize="8"
        fontWeight="700"
        fill="#5f339c"
      >
        {b.label}
      </text>
      {/* ฟองเล็ก ๆ ในน้ำ */}
      <circle
        cx={b.x + w - 14}
        cy={baseY - 40}
        r="2.5"
        fill="#ffffff"
        opacity="0.6"
      />
      <circle
        cx={b.x + w - 20}
        cy={baseY - 60}
        r="1.8"
        fill="#ffffff"
        opacity="0.5"
      />
    </g>
  );
}

export default function HerbalHeroArt({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden>
      <svg viewBox="0 0 380 250" className="h-full w-full" fill="none">
        {/* พื้นโต๊ะไม้อ่อน / ผ้าครีม */}
        <ellipse cx="190" cy="226" rx="176" ry="16" fill="#ede3f7" />
        <ellipse cx="190" cy="222" rx="160" ry="10" fill="#fffdf7" />

        {/* 🌿 ใบเตย/ใบไม้ด้านหลัง */}
        <g
          className="animate-floaty-slow"
          style={{ transformOrigin: "60px 120px" }}
        >
          <path
            d="M40 150 C20 110 40 70 70 56 C74 96 66 130 40 150 Z"
            fill="#7cc27a"
          />
          <path
            d="M44 146 C50 110 58 86 70 60"
            stroke="#4f8a3a"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
        <g
          className="animate-floaty"
          style={{ transformOrigin: "330px 110px", animationDelay: "1s" }}
        >
          <path
            d="M340 150 C360 110 340 70 310 56 C306 96 314 130 340 150 Z"
            fill="#9bd66a"
          />
          <path
            d="M336 146 C330 110 322 86 310 60"
            stroke="#4f8a3a"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* ขวดน้ำสมุนไพร 5 สี */}
        {BOTTLES.map((b) => (
          <BottleSvg key={b.label} b={b} />
        ))}

        {/* 🌼 ดอกเก๊กฮวย */}
        <g
          className="animate-floaty"
          style={{ transformOrigin: "128px 232px", animationDelay: "0.6s" }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <ellipse
              key={i}
              cx="128"
              cy="222"
              rx="3"
              ry="9"
              fill="#ffd45c"
              transform={`rotate(${i * 36} 128 232)`}
            />
          ))}
          <circle cx="128" cy="232" r="5" fill="#e0a11c" />
        </g>
        {/* 🌺 กระเจี๊ยบ */}
        <g
          className="animate-floaty-slow"
          style={{ transformOrigin: "62px 226px" }}
        >
          <path
            d="M62 214 C50 214 46 232 62 240 C78 232 74 214 62 214 Z"
            fill="#c8163a"
          />
          <path
            d="M62 214 l-3 -8 M62 214 l3 -8"
            stroke="#3f8f35"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <ellipse
            cx="58"
            cy="224"
            rx="2.5"
            ry="5"
            fill="#ffffff"
            opacity="0.3"
          />
        </g>
        {/* 🦋 ดอกอัญชัน */}
        <g
          className="animate-floaty"
          style={{ transformOrigin: "262px 230px", animationDelay: "1.4s" }}
        >
          <ellipse cx="252" cy="230" rx="9" ry="7" fill="#5b7cff" />
          <ellipse cx="272" cy="230" rx="9" ry="7" fill="#5b7cff" />
          <ellipse cx="262" cy="222" rx="7" ry="9" fill="#7c94ff" />
          <circle cx="262" cy="231" r="3" fill="#fff7c2" />
        </g>
        {/* 🍋 มะนาวผ่าครึ่ง */}
        <g
          className="animate-floaty-slow"
          style={{ transformOrigin: "330px 228px", animationDelay: "0.3s" }}
        >
          <circle cx="330" cy="226" r="13" fill="#c9e34a" />
          <circle cx="330" cy="226" r="10" fill="#f6f9c8" />
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              d="M330 226 L330 217"
              stroke="#c9e34a"
              strokeWidth="1.5"
              transform={`rotate(${i * 45} 330 226)`}
            />
          ))}
        </g>
        {/* 🫚 ขิง */}
        <g
          className="animate-floaty"
          style={{ transformOrigin: "20px 228px", animationDelay: "2s" }}
        >
          <path
            d="M8 228 q6 -12 16 -6 q10 -4 14 6 q-4 10 -14 6 q-10 6 -16 -6 Z"
            fill="#e8c27a"
          />
          <path
            d="M14 226 q6 2 12 0"
            stroke="#c99a63"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* ✨ ประกาย + 🍃 ใบไม้ลอยผ่าน */}
        <g className="animate-twinkle">
          <path
            d="M120 40 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2 Z"
            fill="#f4d35e"
          />
        </g>
        <g className="animate-twinkle" style={{ animationDelay: "1.1s" }}>
          <path
            d="M300 28 l1.5 4.5 l4.5 1.5 l-4.5 1.5 l-1.5 4.5 l-1.5 -4.5 l-4.5 -1.5 l4.5 -1.5 Z"
            fill="#d492e0"
          />
        </g>
        <g
          className="animate-magic-float"
          style={
            {
              "--dur": "7s",
              transformOrigin: "200px 60px",
            } as React.CSSProperties
          }
        >
          <path
            d="M196 62 C200 50 214 48 220 56 C214 66 202 68 196 62 Z"
            fill="#9bd66a"
          />
        </g>
        <g
          className="animate-magic-float"
          style={
            {
              "--dur": "9s",
              "--delay": "3s",
              transformOrigin: "80px 40px",
            } as React.CSSProperties
          }
        >
          <path
            d="M76 42 C80 30 94 28 100 36 C94 46 82 48 76 42 Z"
            fill="#7cc27a"
          />
        </g>
        <circle
          cx="352"
          cy="70"
          r="3"
          fill="#ffffff"
          className="animate-twinkle"
          style={{ animationDelay: "0.5s" }}
        />
        <circle
          cx="34"
          cy="60"
          r="2.4"
          fill="#c9b3e8"
          className="animate-twinkle"
          style={{ animationDelay: "1.8s" }}
        />
      </svg>
    </div>
  );
}
