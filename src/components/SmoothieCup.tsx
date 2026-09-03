import type { SmoothiePalette } from "@/data/site";

type SmoothieCupProps = {
  palette: SmoothiePalette;
  emoji?: string;
  className?: string;
  /** ความกว้างของแก้ว (px) */
  size?: number;
};

/**
 * แก้วน้ำปั่นแบบ SVG น่ารัก ๆ — วิปครีมด้านบน + เนื้อปั่นไล่เฉด + หลอดสีม่วง
 * ปรับสีได้ผ่าน palette เพื่อให้แต่ละเมนูมีเอกลักษณ์ของตัวเอง
 */
export default function SmoothieCup({
  palette,
  emoji,
  className = "",
  size = 180,
}: SmoothieCupProps) {
  const uid = palette.bottom.replace("#", "");

  return (
    <div
      className={className}
      style={{ width: size, height: size * 1.25 }}
      aria-hidden
    >
      <svg
        viewBox="0 0 200 250"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={palette.top} />
            <stop offset="100%" stopColor={palette.bottom} />
          </linearGradient>
          <linearGradient id={`cup-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#b98cf0" stopOpacity="0.18" />
          </linearGradient>
        </defs>

        {/* เงาใต้แก้ว */}
        <ellipse cx="100" cy="238" rx="62" ry="10" fill="#7c3fc4" opacity="0.16" />

        {/* ตัวแก้ว (ทรงสอบ) */}
        <path
          d="M46 95 h108 l-12 132 a10 10 0 0 1 -10 9 H68 a10 10 0 0 1 -10 -9 Z"
          fill={`url(#fill-${uid})`}
        />
        {/* ประกายแสงบนแก้ว */}
        <path
          d="M46 95 h108 l-12 132 a10 10 0 0 1 -10 9 H68 a10 10 0 0 1 -10 -9 Z"
          fill={`url(#cup-${uid})`}
        />
        <path
          d="M64 108 l-8 108"
          stroke="#ffffff"
          strokeOpacity="0.5"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* วิปครีม / โฟมด้านบน */}
        <g>
          <ellipse cx="100" cy="96" rx="56" ry="16" fill={palette.foam} />
          <circle cx="66" cy="84" r="17" fill={palette.foam} />
          <circle cx="90" cy="76" r="20" fill="#ffffff" />
          <circle cx="116" cy="78" r="18" fill={palette.foam} />
          <circle cx="136" cy="86" r="15" fill="#ffffff" />
          <circle cx="100" cy="72" r="16" fill={palette.foam} />
        </g>

        {/* ท็อปปิ้งบนวิปครีม */}
        <circle cx="82" cy="70" r="6" fill={palette.bottom} opacity="0.85" />
        <circle cx="118" cy="72" r="5" fill={palette.bottom} opacity="0.7" />
        <circle cx="100" cy="62" r="5.5" fill={palette.bottom} opacity="0.8" />

        {/* ฝาขอบแก้ว */}
        <rect x="42" y="90" width="116" height="12" rx="6" fill="#ffffff" opacity="0.9" />

        {/* หลอด */}
        <rect
          x="120"
          y="20"
          width="12"
          height="80"
          rx="6"
          fill="#8a5cf0"
          transform="rotate(12 126 60)"
        />
        <rect
          x="120"
          y="20"
          width="5"
          height="80"
          rx="3"
          fill="#ffffff"
          opacity="0.35"
          transform="rotate(12 126 60)"
        />

        {/* โลโก้กลม ๆ บนแก้ว */}
        <circle cx="100" cy="168" r="26" fill="#ffffff" opacity="0.92" />
        <circle cx="100" cy="168" r="26" fill="none" stroke={palette.bottom} strokeWidth="2" opacity="0.5" />
        <text
          x="100"
          y="176"
          textAnchor="middle"
          fontSize="24"
        >
          {emoji ?? "🥤"}
        </text>
      </svg>
    </div>
  );
}
