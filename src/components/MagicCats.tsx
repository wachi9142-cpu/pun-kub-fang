"use client";

/**
 * 🐱🐱 สองเหมียวผู้ช่วยนักปรุงเครื่องดื่มแห่งบ้านฟ่าง
 * - ChefCat   = "ฟักทอง" แมวลายสลิด (mackerel tabby) ตัวใหญ่ ตาปรือ ๆ ปลอกคอเขียวมีกระดิ่ง → หัวหน้าเชฟ (คน / โบกไม้กายสิทธิ์)
 * - HelperCat = "เมล่อน" แมวขาวปื้นส้ม (ลายวัว) ตาเขียวกลมโต ตัวเล็ก → ผู้ช่วย (หยิบ / เท / เฝ้าแก้ว)
 *
 * วาดเป็น "แมวนั่ง" ทรงแมวจริง ด้วย SVG ล้วน · ปรับท่าทางผ่าน prop `pose` (ขยับด้วย CSS keyframes)
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

const INK = "#3a2f45";

/* ---------- ตา ---------- */
function Eyes({
  cx1,
  cx2,
  cy,
  style,
  iris = INK,
}: {
  cx1: number;
  cx2: number;
  cy: number;
  /** sleepy = ปรือมีความสุข · open = ลืมตากลมโต · wow = ประกาย */
  style: "sleepy" | "open" | "wow";
  iris?: string;
}) {
  if (style === "wow") {
    const star = (cx: number) => (
      <g key={cx} className="animate-cat-eye-sparkle" style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <ellipse cx={cx} cy={cy} rx={5.5} ry={6.5} fill={iris} />
        <path
          d={`M${cx} ${cy - 6} L${cx + 1.6} ${cy - 1.6} L${cx + 6} ${cy} L${cx + 1.6} ${cy + 1.6} L${cx} ${cy + 6} L${cx - 1.6} ${cy + 1.6} L${cx - 6} ${cy} L${cx - 1.6} ${cy - 1.6} Z`}
          fill="#ffffff"
        />
        <circle cx={cx + 1.8} cy={cy - 2.2} r={1.4} fill="#ffffff" />
      </g>
    );
    return (
      <>
        {star(cx1)}
        {star(cx2)}
      </>
    );
  }
  if (style === "sleepy") {
    // ตาปรือ ๆ มีความสุข ︶ ︶
    return (
      <g>
        <path d={`M${cx1 - 6} ${cy - 1} q6 6 12 0`} stroke={INK} strokeWidth="2.6" strokeLinecap="round" fill="none" />
        <path d={`M${cx2 - 6} ${cy - 1} q6 6 12 0`} stroke={INK} strokeWidth="2.6" strokeLinecap="round" fill="none" />
      </g>
    );
  }
  // ตากลมโต (มีกะพริบ)
  return (
    <g className="animate-cat-blink" style={{ transformOrigin: `${(cx1 + cx2) / 2}px ${cy}px` }}>
      <ellipse cx={cx1} cy={cy} rx={5} ry={6} fill={iris} />
      <ellipse cx={cx2} cy={cy} rx={5} ry={6} fill={iris} />
      <ellipse cx={cx1} cy={cy + 0.5} rx={2.4} ry={4} fill={INK} />
      <ellipse cx={cx2} cy={cy + 0.5} rx={2.4} ry={4} fill={INK} />
      <circle cx={cx1 + 1.8} cy={cy - 2.4} r={1.6} fill="#ffffff" />
      <circle cx={cx2 + 1.8} cy={cy - 2.4} r={1.6} fill="#ffffff" />
    </g>
  );
}

/* ---------- จมูก + ปาก ω + หนวด (ใช้ร่วมกัน) ---------- */
function Muzzle({ cx, cy, noseColor = "#e58fa8" }: { cx: number; cy: number; noseColor?: string }) {
  return (
    <g>
      {/* ปากกระเปาะฟู */}
      <ellipse cx={cx - 5} cy={cy + 3} rx={6.5} ry={4.5} fill="#ffffff" opacity="0.55" />
      <ellipse cx={cx + 5} cy={cy + 3} rx={6.5} ry={4.5} fill="#ffffff" opacity="0.55" />
      {/* จมูก */}
      <path d={`M${cx - 3} ${cy - 1} h6 l-3 3.2 Z`} fill={noseColor} />
      {/* ปาก ω */}
      <path
        d={`M${cx} ${cy + 2} q-2.5 4 -6 1.5 M${cx} ${cy + 2} q2.5 4 6 1.5`}
        stroke={INK}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* หนวด */}
      <g stroke={INK} strokeWidth="1.1" strokeLinecap="round" opacity="0.55">
        <path d={`M${cx - 12} ${cy - 2} l-13 -3 M${cx - 12} ${cy + 2} l-14 0 M${cx - 12} ${cy + 6} l-13 3`} />
        <path d={`M${cx + 12} ${cy - 2} l13 -3 M${cx + 12} ${cy + 2} l14 0 M${cx + 12} ${cy + 6} l13 3`} />
      </g>
    </g>
  );
}

/* ---------- 🐈 หัวหน้าเชฟ "ฟักทอง": แมวลายสลิด นั่งชิล ๆ ---------- */
export function ChefCat({ pose = "idle", size = 120, className = "", flip }: CatProps) {
  const fur = "#d3c8b6";
  const furLight = "#efe8dc";
  const stripe = "#8e7d66";
  const stirring = pose === "stir";
  const waving = pose === "wow" || pose === "watch";
  const eye = pose === "wow" ? "wow" : "sleepy";

  return (
    <div
      className={className}
      style={{ width: size, height: size * 1.15, transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden
    >
      {/* ชั้นในรับ animation หายใจ แยกจากชั้นนอกที่ใช้ flip (ไม่ให้ transform ทับกัน) */}
      <svg viewBox="0 0 120 138" width="100%" height="100%" fill="none" className="animate-cat-bob">
        {/* หาง: ม้วนมาข้างหน้าด้านซ้าย */}
        <path
          className="animate-cat-tail"
          style={{ transformOrigin: "34px 118px" }}
          d="M34 118 q-26 4 -22 -18 q2 -9 10 -8"
          stroke={fur}
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path d="M18 108 q-2 -4 0 -8 M22 100 q-1 -3 1 -6" stroke={stripe} strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />

        {/* ลำตัวทรงลูกแพร์ (นั่ง) */}
        <path d="M60 62 C34 62 26 88 28 112 C29 126 40 132 60 132 C80 132 91 126 92 112 C94 88 86 62 60 62 Z" fill={fur} />
        {/* ท้องสีอ่อน */}
        <path d="M60 84 C48 84 42 98 43 114 C44 124 50 128 60 128 C70 128 76 124 77 114 C78 98 72 84 60 84 Z" fill={furLight} />
        {/* ลายสลิดข้างตัว */}
        <g stroke={stripe} strokeWidth="2.6" strokeLinecap="round" opacity="0.65">
          <path d="M34 86 q6 3 8 10 M31 98 q6 2 9 9 M32 110 q5 1 8 7" />
          <path d="M86 86 q-6 3 -8 10 M89 98 q-6 2 -9 9 M88 110 q-5 1 -8 7" />
        </g>
        {/* อุ้งเท้าหน้า */}
        <ellipse cx="48" cy="130" rx="9" ry="5.5" fill={fur} />
        <ellipse cx="72" cy="130" rx="9" ry="5.5" fill={fur} />
        <path d="M44 131 v2 M48 130 v3 M52 131 v2 M68 131 v2 M72 130 v3 M76 131 v2" stroke={stripe} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />

        {/* ปลอกคอเขียว + กระดิ่ง */}
        <path d="M36 70 q24 12 48 0" stroke="#79c06f" strokeWidth="5" strokeLinecap="round" fill="none" />
        <circle cx="60" cy="77" r="4.2" fill="#f4d35e" stroke="#c9a52a" strokeWidth="1" />
        <path d="M58 78 h4" stroke="#c9a52a" strokeWidth="1" />

        {/* หัว (กว้างกว่าสูง) */}
        <g className={waving ? "animate-cat-head-look" : ""} style={{ transformOrigin: "60px 54px" }}>
          {/* หู */}
          <g className="animate-cat-ear" style={{ transformOrigin: "40px 34px" }}>
            <path d="M28 40 C26 26 30 14 36 10 C44 18 50 24 54 30 Z" fill={fur} />
            <path d="M33 36 C32 28 34 20 37 16 C42 21 46 25 48 30 Z" fill="#f3c4cf" />
          </g>
          <g className="animate-cat-ear-r" style={{ transformOrigin: "80px 34px" }}>
            <path d="M92 40 C94 26 90 14 84 10 C76 18 70 24 66 30 Z" fill={fur} />
            <path d="M87 36 C88 28 86 20 83 16 C78 21 74 25 72 30 Z" fill="#f3c4cf" />
          </g>
          {/* หน้า + แก้มฟู */}
          <path d="M60 24 C40 24 26 36 26 52 C26 66 38 76 60 76 C82 76 94 66 94 52 C94 36 80 24 60 24 Z" fill={fur} />
          <path d="M28 58 q-4 4 -2 8 M92 58 q4 4 2 8" stroke={fur} strokeWidth="6" strokeLinecap="round" />
          {/* ลาย M หน้าผาก + แก้ม (สลิด) */}
          <g stroke={stripe} strokeWidth="2.4" strokeLinecap="round" opacity="0.7">
            <path d="M48 27 l3 11 M54 25 l2 12 M60 24 v13 M66 25 l-2 12 M72 27 l-3 11" />
            <path d="M30 50 l9 2 M30 56 l9 0 M90 50 l-9 2 M90 56 l-9 0" strokeWidth="2" opacity="0.5" />
          </g>
          {/* แก้มชมพู */}
          <ellipse cx="38" cy="60" rx="6" ry="3.6" fill="#f5b7c8" opacity="0.6" />
          <ellipse cx="82" cy="60" rx="6" ry="3.6" fill="#f5b7c8" opacity="0.6" />
          <Eyes cx1={47} cx2={73} cy={52} style={eye} iris="#8a6a3d" />
          <Muzzle cx={60} cy={62} />
          {/* หมวกเชฟใบจิ๋ว เอียง ๆ บนหัว */}
          <g transform="rotate(-14 84 24)">
            <path d="M74 26 q10 -16 22 -2 v6 h-22 Z" fill="#ffffff" />
            <rect x="73" y="28" width="24" height="5" rx="2.5" fill="#ede3f7" />
          </g>
        </g>

        {/* แขนขวา: ถือช้อน / ไม้กายสิทธิ์ */}
        <g
          className={stirring ? "animate-cat-arm-stir" : waving ? "animate-cat-arm-wave" : ""}
          style={{ transformOrigin: "86px 92px" }}
        >
          <path d="M86 92 q14 -8 20 -22" stroke={fur} strokeWidth="10" strokeLinecap="round" />
          <path d="M92 86 q2 -3 4 -6" stroke={stripe} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          <ellipse cx="107" cy="68" rx="6.5" ry="5.5" fill={fur} />
          {/* ไม้กายสิทธิ์ */}
          <path d="M107 68 l9 -26" stroke="#7b4ab8" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M116 40 l1.6 -4.2 l1.6 4.2 l4.2 1.6 l-4.2 1.6 l-1.6 4.2 l-1.6 -4.2 l-4.2 -1.6 Z" fill="#f4d35e" />
        </g>
      </svg>
    </div>
  );
}

/* ---------- 🐈 ผู้ช่วย "เมล่อน": แมวขาวปื้นส้ม ตาเขียวกลมโต ---------- */
export function HelperCat({ pose = "idle", size = 96, className = "", flip }: CatProps) {
  const fur = "#fdfaf5";
  const patch = "#e0a56b";
  const pouring = pose === "pour";
  const looking = pose === "watch" || pose === "wow";
  const eye = pose === "wow" ? "wow" : "open";

  return (
    <div
      className={className}
      style={{ width: size, height: size * 1.15, transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden
    >
      {/* ชั้นในรับ animation หายใจ แยกจากชั้นนอกที่ใช้ flip (ไม่ให้ transform ทับกัน) */}
      <svg viewBox="0 0 120 138" width="100%" height="100%" fill="none" className="animate-cat-bob-fast">
        {/* หาง: ยกขึ้นด้านขวา ปลายส้ม */}
        <path
          className="animate-cat-tail"
          style={{ transformOrigin: "88px 116px" }}
          d="M88 116 q24 -2 20 -26 q-2 -8 -9 -9"
          stroke={fur}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path d="M108 92 q-2 -8 -9 -11" stroke={patch} strokeWidth="8" strokeLinecap="round" />

        {/* ลำตัว */}
        <path d="M60 66 C38 66 30 90 32 112 C33 126 44 132 60 132 C76 132 87 126 88 112 C90 90 82 66 60 66 Z" fill={fur} />
        {/* ปื้นส้มบนหลัง/ไหล่ */}
        <path d="M70 70 C84 74 88 92 86 106 C80 100 72 92 66 84 C64 78 66 72 70 70 Z" fill={patch} opacity="0.95" />
        {/* อุ้งเท้า */}
        <ellipse cx="50" cy="130" rx="8" ry="5" fill={fur} />
        <ellipse cx="70" cy="130" rx="8" ry="5" fill={fur} />
        <path d="M47 131 v2 M50 130 v3 M53 131 v2 M67 131 v2 M70 130 v3 M73 131 v2" stroke="#d9b48c" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />

        {/* โบว์ม่วง */}
        <path d="M44 74 l-9 -6 v12 Z M44 74 l9 -6 v12 Z" fill="#a344bf" />
        <circle cx="44" cy="74" r="2.6" fill="#d492e0" />

        {/* หัว */}
        <g className={looking ? "animate-cat-head-look" : ""} style={{ transformOrigin: "60px 56px" }}>
          <g className="animate-cat-ear-r" style={{ transformOrigin: "42px 38px" }}>
            <path d="M30 44 C28 30 32 18 38 14 C46 22 51 28 55 34 Z" fill={fur} />
            <path d="M35 40 C34 32 36 24 39 20 C44 25 47 29 49 34 Z" fill="#f7c9d3" />
          </g>
          <g className="animate-cat-ear" style={{ transformOrigin: "78px 38px" }}>
            <path d="M90 44 C92 30 88 18 82 14 C74 22 69 28 65 34 Z" fill={patch} />
            <path d="M85 40 C86 32 84 24 81 20 C76 25 73 29 71 34 Z" fill="#f7c9d3" />
          </g>
          {/* หน้า */}
          <path d="M60 28 C42 28 29 40 29 56 C29 69 41 79 60 79 C79 79 91 69 91 56 C91 40 78 28 60 28 Z" fill={fur} />
          {/* ปื้นส้มคาดตาขวา */}
          <path d="M66 30 C80 32 90 42 90 56 C86 50 80 46 72 46 C68 42 66 36 66 30 Z" fill={patch} opacity="0.95" />
          <path d="M31 62 q-4 4 -2 8 M89 62 q4 4 2 8" stroke={fur} strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="40" cy="64" rx="5.5" ry="3.4" fill="#f5b7c8" opacity="0.65" />
          <ellipse cx="80" cy="64" rx="5.5" ry="3.4" fill="#f5b7c8" opacity="0.65" />
          <Eyes cx1={48} cx2={72} cy={56} style={eye} iris="#6fae4c" />
          <Muzzle cx={60} cy={66} noseColor="#ef9ab0" />
        </g>

        {/* แขนซ้าย: ถือขวดส่วนผสม (เท) */}
        <g className={pouring ? "animate-cat-arm-pour" : ""} style={{ transformOrigin: "36px 94px" }}>
          <path d="M36 94 q-12 -10 -16 -24" stroke={fur} strokeWidth="9" strokeLinecap="round" />
          <ellipse cx="19" cy="68" rx="6" ry="5" fill={fur} />
          {/* ขวดเล็ก */}
          <rect x="7" y="48" width="15" height="24" rx="5.5" fill="#d8c7f0" />
          <rect x="10.5" y="43" width="8" height="7" rx="2" fill="#7b4ab8" />
          <circle cx="14.5" cy="63" r="3" fill="#ffffff" opacity="0.75" />
        </g>
      </svg>
    </div>
  );
}
