/**
 * 🍯 StickyDripFrame — พื้นหลังแบบ "นมเหนียวไหลย้อยจากขอบบน + นูนขึ้นจากขอบล่าง"
 * (สไตล์ chocolate drip frame) ใช้ครอบทั้งหน้าเมนูนมเหนียว
 * - พื้นครีม · ดริปสีคาราเมลนมเหนียว · วาด SVG ยืดเต็มความกว้าง
 * - เป็นพื้นหลังล้วน (aria-hidden, pointer-events-none) เนื้อหาอยู่ชั้นบน
 */
const CARAMEL = "#c9782e";

export function DripTop({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 300"
      preserveAspectRatio="none"
      className={`pointer-events-none block w-full ${className}`}
      aria-hidden
    >
      <path
        fill={CARAMEL}
        d="M0 0 H1200 V70 C1190 70 1188 118 1176 150 C1166 176 1150 176 1142 150 C1134 124 1140 78 1118 74 C1094 70 1096 110 1090 150 C1084 190 1062 190 1056 150 C1050 108 1056 76 1030 72 C1000 68 1004 122 998 160 C992 200 966 200 960 160 C954 118 962 78 934 74 C904 70 906 128 900 180 C894 232 862 232 856 180 C850 130 858 78 826 74 C796 70 798 108 792 150 C786 192 760 192 754 150 C748 106 756 78 726 74 C694 70 696 140 690 200 C684 260 648 260 642 200 C636 140 646 78 612 74 C578 70 582 118 576 160 C570 202 540 202 534 160 C528 116 536 78 506 74 C474 70 478 150 472 210 C466 270 428 270 422 210 C416 150 424 78 392 74 C362 70 364 112 358 150 C352 188 326 188 320 150 C314 110 322 78 292 74 C262 70 264 130 258 180 C252 230 220 230 214 180 C208 128 216 78 186 74 C156 70 158 108 152 145 C146 182 122 182 116 145 C110 106 118 78 90 74 C60 70 62 120 56 165 C50 210 24 210 18 165 C12 118 20 80 0 72 Z"
      />
      {/* หยดกำลังจะหลุด */}
      <ellipse cx="666" cy="262" rx="12" ry="14" fill={CARAMEL} />
      <ellipse cx="447" cy="272" rx="11" ry="13" fill={CARAMEL} />
      <ellipse cx="878" cy="240" rx="10" ry="12" fill={CARAMEL} />
      {/* แสง glossy */}
      <path
        d="M40 22 q160 -12 320 0"
        stroke="#ffffff"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.28"
      />
      <path
        d="M760 22 q160 -12 320 0"
        stroke="#ffffff"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.28"
      />
      <circle cx="660" cy="256" r="3" fill="#ffffff" opacity="0.6" />
      <circle cx="441" cy="266" r="3" fill="#ffffff" opacity="0.6" />
    </svg>
  );
}

export function DripBottom({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 220"
      preserveAspectRatio="none"
      className={`pointer-events-none block w-full ${className}`}
      aria-hidden
    >
      <path
        fill={CARAMEL}
        d="M0 220 V150 C10 150 8 96 20 70 C32 44 52 44 60 70 C68 96 62 150 84 150 C108 150 104 120 112 96 C120 72 140 72 148 96 C156 120 150 150 176 150 C204 150 200 130 206 118 C214 100 232 100 238 118 C244 136 240 150 262 150 C290 150 284 60 298 30 C312 0 340 0 350 30 C360 60 356 150 386 150 C416 150 410 110 418 84 C426 58 452 58 460 84 C468 110 462 150 496 150 C530 150 524 104 532 76 C540 48 566 48 574 76 C582 104 576 150 610 150 C644 150 640 130 648 116 C656 102 676 102 684 116 C692 130 686 150 720 150 C754 150 748 90 758 60 C768 30 796 30 806 60 C816 90 810 150 846 150 C882 150 876 122 884 100 C892 78 916 78 924 100 C932 122 926 150 958 150 C990 150 986 136 992 124 C1000 108 1020 108 1026 124 C1032 140 1028 150 1054 150 C1080 150 1076 66 1088 40 C1100 14 1130 14 1140 40 C1150 66 1146 150 1176 150 C1190 150 1192 150 1200 150 V220 Z"
      />
      <ellipse cx="324" cy="24" rx="7" ry="4" fill="#ffffff" opacity="0.35" />
      <ellipse cx="782" cy="52" rx="7" ry="4" fill="#ffffff" opacity="0.35" />
      <ellipse cx="1114" cy="34" rx="7" ry="4" fill="#ffffff" opacity="0.35" />
    </svg>
  );
}

/** ครอบเนื้อหา: พื้นครีม + ดริปบน/ล่าง */
export default function StickyDripFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden bg-[#fff6dc]">
      <DripTop className="absolute inset-x-0 top-0 h-32 sm:h-44 lg:h-56" />
      <DripBottom className="absolute inset-x-0 bottom-0 h-24 sm:h-32 lg:h-40" />
      <div className="relative z-10 pb-28 pt-24 sm:pb-36 sm:pt-32 lg:pb-44 lg:pt-40">
        {children}
      </div>
    </div>
  );
}
