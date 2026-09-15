/**
 * 🍪 SnackShopFrame — พื้นหลังหน้าขนมสไตล์ "หน้าร้านขนม"
 * - ด้านบน: กันสาดหยัก (scalloped awning) ลายสลับ ม่วงลาเวนเดอร์ / ครีม + สปริงเกิลเล็ก ๆ
 * - ใต้กันสาด: เชือกแขวนขนมที่ขายในหน้านี้ (คอนเฟลค, ช็อกโกแลต, คุกกี้, เค้ก, ชีส, พริก ฯลฯ) แกว่งเบา ๆ
 * - ด้านล่าง: ลายทางแนวตั้ง ฟ้าอ่อน/ขาว (ตามโทน aqua ของแบรนด์)
 * - โทนม่วง/ลาเวนเดอร์/ครีม/ฟ้าอ่อน — ไม่ใช้ชมพู
 */
const PURPLE = "#c9b3e8";
const PURPLE_DEEP = "#b795d8";
const CREAM = "#fffdf7";
const SPRINKLES = ["#8ed8f8", "#f4d35e", "#d492e0", "#ffffff", "#a8ce7a"];

/* ขนมที่แขวน (อีโมจิของกลุ่มในหน้าขนม) */
const HANGING = ["🥣", "🍫", "🍪", "🍰", "🧀", "🌶️", "🍯", "🍌", "🧋", "🍓"];

function Awning() {
  const n = 14; // จำนวนแถบ
  const w = 1200 / n;
  return (
    <svg
      viewBox="0 0 1200 150"
      preserveAspectRatio="none"
      className="pointer-events-none block h-full w-full"
      aria-hidden
    >
      {/* ลำตัวกันสาด (ลาดเอียง) */}
      {Array.from({ length: n }).map((_, i) => (
        <path
          key={i}
          d={`M${i * w} 0 H${(i + 1) * w} L${(i + 1) * w + 26} 96 H${i * w + 26} Z`}
          fill={i % 2 ? CREAM : PURPLE}
        />
      ))}
      {/* ชายหยัก (scallop) */}
      {Array.from({ length: n }).map((_, i) => {
        const x0 = i * w + 26;
        return (
          <path
            key={`s${i}`}
            d={`M${x0} 92 H${x0 + w} V110 A${w / 2} ${w / 2} 0 0 1 ${x0} 110 Z`}
            fill={i % 2 ? CREAM : PURPLE}
          />
        );
      })}
      {/* เงาใต้กันสาด */}
      <path
        d={`M26 110 H${1200 + 26} V116 H26 Z`}
        fill="#7b4ab8"
        opacity="0.08"
      />
      {/* สปริงเกิล */}
      {Array.from({ length: 46 }).map((_, i) => {
        const x = (i * 97) % 1200;
        const y = 8 + ((i * 53) % 78);
        const r = (i * 37) % 180;
        return (
          <rect
            key={`p${i}`}
            x={x}
            y={y}
            width="14"
            height="5"
            rx="2.5"
            fill={SPRINKLES[i % SPRINKLES.length]}
            transform={`rotate(${r} ${x + 7} ${y + 2.5})`}
            opacity="0.9"
          />
        );
      })}
    </svg>
  );
}

function Garland() {
  return (
    <div
      className="pointer-events-none relative h-24 w-full sm:h-28"
      aria-hidden
    >
      {/* เชือกโค้ง */}
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-10 w-full"
      >
        <path
          d="M0 8 Q600 60 1200 8"
          stroke={PURPLE_DEEP}
          strokeWidth="2.5"
          fill="none"
        />
      </svg>
      {/* ขนมแขวน */}
      {HANGING.map((e, i) => {
        const left = 4 + (i * 92) / (HANGING.length - 1);
        // ตามความโค้งของเชือก: กลางต่ำสุด
        const t = (left - 50) / 50;
        const drop = 26 - Math.round(t * t * 20);
        return (
          <span
            key={i}
            className="animate-garland-swing absolute flex flex-col items-center"
            style={{
              left: `${left}%`,
              top: drop,
              transformOrigin: "50% 0%",
              animationDelay: `${(i % 5) * 0.35}s`,
            }}
          >
            <span className="h-4 w-px bg-[#b795d8]" />
            <span className="text-2xl drop-shadow sm:text-3xl">{e}</span>
          </span>
        );
      })}
    </div>
  );
}

function BottomStripes() {
  const n = 40;
  const w = 1200 / n;
  return (
    <svg
      viewBox="0 0 1200 80"
      preserveAspectRatio="none"
      className="pointer-events-none block h-full w-full"
      aria-hidden
    >
      <rect x="0" y="0" width="1200" height="80" fill="#ffffff" />
      {Array.from({ length: n }).map((_, i) =>
        i % 2 ? null : (
          <rect key={i} x={i * w} y="0" width={w} height="80" fill="#bfe6fb" />
        ),
      )}
      <rect x="0" y="0" width="1200" height="8" rx="4" fill="#ffffff" />
    </svg>
  );
}

export default function SnackShopFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden bg-[#fffdf7]">
      <div className="absolute inset-x-0 top-0 h-16 sm:h-20 lg:h-24">
        <Awning />
      </div>
      <div className="absolute inset-x-0 top-14 sm:top-[4.5rem] lg:top-[5.5rem]">
        <Garland />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-12 sm:h-16">
        <BottomStripes />
      </div>
      <div className="relative z-10 pb-20 pt-40 sm:pb-24 sm:pt-48 lg:pt-52">
        {children}
      </div>
    </div>
  );
}
