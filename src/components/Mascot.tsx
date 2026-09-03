type MascotProps = {
  size?: number;
  className?: string;
  withCat?: boolean;
};

/**
 * มาสคอตน้องฟ่าง — สาวผมมวยแก้มแดง สไตล์น่ารัก วาดด้วย SVG ล้วน
 * ใช้ซ้ำได้ทั้งโลโก้ ส่วนเกี่ยวกับร้าน และฟุตเตอร์
 */
export default function Mascot({ size = 48, className = "", withCat = false }: MascotProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <radialGradient id="mascot-bg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#fbeef8" />
          <stop offset="100%" stopColor="#ede4fb" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="58" fill="url(#mascot-bg)" />
      <circle cx="60" cy="60" r="58" fill="none" stroke="#c6a9f0" strokeWidth="3" opacity="0.6" />

      {/* ผมมวย */}
      <circle cx="60" cy="26" r="12" fill="#5b3b2e" />
      <path d="M32 60 C30 34 48 22 60 22 C72 22 90 34 88 60 C82 46 70 42 60 42 C50 42 38 46 32 60 Z" fill="#6b4630" />

      {/* หน้า */}
      <circle cx="60" cy="64" r="26" fill="#ffe6d2" />

      {/* ผมด้านข้าง */}
      <path d="M34 60 C33 74 37 84 42 90 C36 80 36 68 38 60 Z" fill="#6b4630" />
      <path d="M86 60 C87 74 83 84 78 90 C84 80 84 68 82 60 Z" fill="#6b4630" />

      {/* ตา */}
      <circle cx="50" cy="64" r="3.4" fill="#4a3324" />
      <circle cx="70" cy="64" r="3.4" fill="#4a3324" />
      <circle cx="51.2" cy="62.8" r="1.1" fill="#fff" />
      <circle cx="71.2" cy="62.8" r="1.1" fill="#fff" />

      {/* แก้มแดง */}
      <circle cx="44" cy="72" r="4.5" fill="#f89bc4" opacity="0.75" />
      <circle cx="76" cy="72" r="4.5" fill="#f89bc4" opacity="0.75" />

      {/* ปากยิ้ม */}
      <path d="M54 74 Q60 80 66 74" stroke="#d3236e" strokeWidth="2.4" strokeLinecap="round" fill="none" />

      {/* โบว์ */}
      <path d="M74 34 l8 -5 l0 10 Z" fill="#f265a2" />
      <path d="M74 34 l8 5 l0 -10 Z" fill="#e8408a" />
      <circle cx="74" cy="34" r="3" fill="#fff" />

      {withCat && (
        <g>
          <circle cx="90" cy="92" r="14" fill="#fff" stroke="#c6a9f0" strokeWidth="2" />
          <path d="M80 84 l3 -6 l5 4 Z" fill="#fff" stroke="#c6a9f0" strokeWidth="2" />
          <path d="M100 84 l-3 -6 l-5 4 Z" fill="#fff" stroke="#c6a9f0" strokeWidth="2" />
          <circle cx="86" cy="91" r="1.8" fill="#4a3324" />
          <circle cx="94" cy="91" r="1.8" fill="#4a3324" />
          <path d="M88 95 q2 2 4 0" stroke="#d3236e" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}
