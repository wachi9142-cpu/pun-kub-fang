"use client";

/**
 * 🐱🐱 สองเหมียวผู้ช่วยนักปรุงเครื่องดื่มแห่งบ้านฟ่าง
 * - ChefCat  = "ฟักทอง" เหมียวลายเทา ตัวใหญ่ ตาปรือ ๆ ปลอกคอเขียวมีกระดิ่ง → หัวหน้าเชฟ (คน / โบกไม้กายสิทธิ์)
 * - HelperCat = "เมล่อน" เหมียวขาวแต้มส้ม/น้ำตาล (ลายวัว) ตาเขียว ตัวเล็ก → ผู้ช่วย (หยิบ / เท / เฝ้าแก้ว)
 *
 * วาดด้วย SVG ล้วน ปรับท่าทางผ่าน prop `pose` (ขยับด้วย CSS keyframes)
 * เอาไปใช้เป็น Mascot ที่อื่นของเว็บได้เลย
 */

export type CatPose = "idle" | "pour" | "stir" | "watch" | "wow";

export const CAT_NAMES = { chef: "ฟักทอง", helper: "เมล่อน" } as const;

type CatProps = {
  pose?: CatPose;
  /** ความกว้าง (px) */
  size?: number;
  className?: string;
  /** กลับด้านซ้าย-ขวา */
  flip?: boolean;
};

/* ---------- ตา: ปกติ / ปรือ / เป็นประกาย ---------- */
function Eyes({
  cx1,
  cx2,
  cy,
  sleepy,
  wow,
  color = "#3b2f4a",
}: {
  cx1: number;
  cx2: number;
  cy: number;
  sleepy?: boolean;
  wow?: boolean;
  color?: string;
}) {
  if (wow) {
    // ตาเป็นประกาย ✨
    const star = (cx: number) => (
      <g
        key={cx}
        className="animate-cat-eye-sparkle"
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        <path
          d={`M${cx} ${cy - 7} L${cx + 2} ${cy - 2} L${cx + 7} ${cy} L${cx + 2} ${cy + 2} L${cx} ${cy + 7} L${cx - 2} ${cy + 2} L${cx - 7} ${cy} L${cx - 2} ${cy - 2} Z`}
          fill="#a344bf"
        />
        <circle cx={cx} cy={cy} r={2} fill="#ffffff" />
      </g>
    );
    return (
      <>
        {star(cx1)}
        {star(cx2)}
      </>
    );
  }
  if (sleepy) {
    // ตาปรือ ๆ ชิล ๆ
    return (
      <>
        <path
          d={`M${cx1 - 5} ${cy} q5 4 10 0`}
          stroke={color}
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={`M${cx2 - 5} ${cy} q5 4 10 0`}
          stroke={color}
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
      </>
    );
  }
  return (
    <>
      <circle cx={cx1} cy={cy} r={3.2} fill={color} />
      <circle cx={cx2} cy={cy} r={3.2} fill={color} />
      <circle cx={cx1 + 1.2} cy={cy - 1.2} r={1} fill="#ffffff" />
      <circle cx={cx2 + 1.2} cy={cy - 1.2} r={1} fill="#ffffff" />
    </>
  );
}

/* ---------- 🐈 หัวหน้าเชฟ "ฟักทอง": เหมียวลายเทา ---------- */
export function ChefCat({
  pose = "idle",
  size = 120,
  className = "",
  flip,
}: CatProps) {
  const fur = "#c9c2b8";
  const stripe = "#8f867c";
  const stirring = pose === "stir";
  const waving = pose === "wow" || pose === "watch";

  return (
    <div
      className={`animate-cat-bob ${className}`}
      style={{
        width: size,
        height: size,
        transform: flip ? "scaleX(-1)" : undefined,
      }}
      aria-hidden
    >
      <svg viewBox="0 0 120 120" width="100%" height="100%" fill="none">
        {/* หาง */}
        <path
          className="animate-cat-tail"
          style={{ transformOrigin: "22px 92px" }}
          d="M22 92 q-18 -6 -12 -24"
          stroke={fur}
          strokeWidth="9"
          strokeLinecap="round"
        />
        {/* ตัว */}
        <ellipse cx="60" cy="88" rx="34" ry="24" fill={fur} />
        <path
          d="M40 78 q6 8 0 16 M52 74 q6 10 0 20 M68 74 q6 10 0 20 M80 78 q6 8 0 16"
          stroke={stripe}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.7"
        />
        {/* ท้อง */}
        <ellipse cx="60" cy="94" rx="18" ry="13" fill="#efe9e0" />
        {/* ปลอกคอเขียว + กระดิ่ง */}
        <path
          d="M38 72 q22 12 44 0"
          stroke="#7cc47a"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <circle
          cx="60"
          cy="79"
          r="4"
          fill="#f4d35e"
          stroke="#c9a52a"
          strokeWidth="1"
        />

        {/* หัว */}
        <g
          className={
            pose === "watch" || pose === "wow" ? "animate-cat-head-look" : ""
          }
          style={{ transformOrigin: "60px 56px" }}
        >
          <path d="M30 40 l6 -20 l16 12 Z" fill={fur} />
          <path d="M90 40 l-6 -20 l-16 12 Z" fill={fur} />
          <path d="M34 38 l4 -13 l10 8 Z" fill="#f2c7d4" />
          <path d="M86 38 l-4 -13 l-10 8 Z" fill="#f2c7d4" />
          <circle cx="60" cy="50" r="27" fill={fur} />
          {/* ลายหน้าผาก */}
          <path
            d="M52 27 v9 M60 25 v10 M68 27 v9"
            stroke={stripe}
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
          />
          {/* แก้ม */}
          <circle cx="42" cy="58" r="5" fill="#f5b7c8" opacity="0.7" />
          <circle cx="78" cy="58" r="5" fill="#f5b7c8" opacity="0.7" />
          <Eyes
            cx1={49}
            cx2={71}
            cy={50}
            sleepy={pose !== "wow"}
            wow={pose === "wow"}
          />
          {/* จมูก + ปาก */}
          <path d="M57 59 h6 l-3 3 Z" fill="#e58fa8" />
          <path
            d="M60 62 q-4 5 -8 1 M60 62 q4 5 8 1"
            stroke="#3b2f4a"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* หนวด */}
          <path
            d="M30 56 h12 M30 61 h12 M78 56 h12 M78 61 h12"
            stroke="#3b2f4a"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>

        {/* หมวกเชฟเล็ก ๆ */}
        <path d="M44 26 q16 -18 32 0 v6 h-32 Z" fill="#ffffff" />
        <rect x="42" y="30" width="36" height="6" rx="3" fill="#ede3f7" />

        {/* แขนซ้าย (วางบนโต๊ะ) + ลายขา */}
        <ellipse cx="34" cy="98" rx="9" ry="6" fill={fur} />
        <path d="M30 95 v5 M35 94 v6" stroke={stripe} strokeWidth="2" strokeLinecap="round" opacity="0.6" />

        {/* แขนขวา: ถือช้อน / ไม้กายสิทธิ์ */}
        <g
          className={
            stirring
              ? "animate-cat-arm-stir"
              : waving
                ? "animate-cat-arm-wave"
                : ""
          }
          style={{ transformOrigin: "84px 80px" }}
        >
          <path
            d="M84 80 l16 -18"
            stroke={fur}
            strokeWidth="10"
            strokeLinecap="round"
          />
          <circle cx="100" cy="62" r="6" fill={fur} />
          {/* ไม้กายสิทธิ์ */}
          <path
            d="M100 62 l12 -22"
            stroke="#7b4ab8"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M112 40 l1.5 -4 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5 Z"
            fill="#f4d35e"
          />
        </g>
      </svg>
    </div>
  );
}

/* ---------- 🐈 ผู้ช่วย "เมล่อน": เหมียวขาวแต้มเทา ตาเขียว ---------- */
export function HelperCat({
  pose = "idle",
  size = 96,
  className = "",
  flip,
}: CatProps) {
  const fur = "#fbf8f3";
  const patch = "#d9a066"; // ปื้นส้ม-น้ำตาล ลายวัว
  const pouring = pose === "pour";

  return (
    <div
      className={`animate-cat-bob-fast ${className}`}
      style={{
        width: size,
        height: size,
        transform: flip ? "scaleX(-1)" : undefined,
      }}
      aria-hidden
    >
      <svg viewBox="0 0 120 120" width="100%" height="100%" fill="none">
        {/* หาง */}
        <path
          className="animate-cat-tail"
          style={{ transformOrigin: "96px 96px" }}
          d="M96 96 q18 -4 14 -22"
          stroke={patch}
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* ตัว */}
        <ellipse cx="60" cy="92" rx="28" ry="20" fill={fur} />
        <path
          d="M74 76 q14 6 10 22 q-10 -4 -14 -14 Z"
          fill={patch}
          opacity="0.9"
        />

        {/* หัว */}
        <g
          className={
            pose === "watch" || pose === "wow" ? "animate-cat-head-look" : ""
          }
          style={{ transformOrigin: "60px 60px" }}
        >
          <path d="M36 48 l4 -20 l16 12 Z" fill={fur} />
          <path d="M84 48 l-4 -20 l-16 12 Z" fill={patch} />
          <path d="M40 46 l3 -13 l10 8 Z" fill="#f7c9d3" />
          <circle cx="60" cy="58" r="24" fill={fur} />
          {/* ปื้นส้มบนหัว */}
          <path d="M64 36 q18 4 18 22 q-8 -6 -18 -4 Z" fill={patch} />
          <circle cx="44" cy="66" r="4.5" fill="#f5b7c8" opacity="0.7" />
          <circle cx="76" cy="66" r="4.5" fill="#f5b7c8" opacity="0.7" />
          <Eyes
            cx1={50}
            cx2={70}
            cy={58}
            wow={pose === "wow"}
            color="#5f9a3f"
          />
          <path d="M57 66 h6 l-3 3 Z" fill="#e58fa8" />
          <path
            d="M60 69 q-3 4 -7 1 M60 69 q3 4 7 1"
            stroke="#3b2f4a"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M32 64 h10 M32 68 h10 M78 64 h10 M78 68 h10"
            stroke="#3b2f4a"
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity="0.55"
          />
        </g>

        {/* โบว์ม่วงเล็ก ๆ */}
        <path d="M40 78 l-8 -5 v10 Z M40 78 l8 -5 v10 Z" fill="#a344bf" />
        <circle cx="40" cy="78" r="2.5" fill="#d492e0" />

        {/* แขนซ้าย: ถือขวดส่วนผสม (เท) */}
        <g
          className={pouring ? "animate-cat-arm-pour" : ""}
          style={{ transformOrigin: "36px 86px" }}
        >
          <path
            d="M36 86 l-14 -16"
            stroke={fur}
            strokeWidth="9"
            strokeLinecap="round"
          />
          <circle cx="22" cy="70" r="5.5" fill={fur} />
          {/* ขวดเล็ก */}
          <rect x="10" y="52" width="14" height="22" rx="5" fill="#d8c7f0" />
          <rect x="13" y="47" width="8" height="7" rx="2" fill="#7b4ab8" />
          <circle cx="17" cy="66" r="3" fill="#ffffff" opacity="0.7" />
        </g>
        {/* แขนขวาวางโต๊ะ */}
        <ellipse cx="82" cy="102" rx="8" ry="5.5" fill={fur} />
      </svg>
    </div>
  );
}
