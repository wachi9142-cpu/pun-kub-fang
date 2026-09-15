"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 🥂 ภาพประกอบตกแต่ง Section นมเหนียว — "แก้วนมเหนียว × แก้วแครกเกอร์ ชนกัน"
 * - วาดด้วย SVG ล้วน โทนม่วง/ลาเวนเดอร์/ครีม
 * - แอนิเมชัน "ชนแก้ว" เล่นตอน section ปรากฏบนจอ แล้วเล่นซ้ำเป็นช่วง ๆ (ทุก ~7 วิ) ไม่วนตลอดเวลา
 * - เป็นของตกแต่ง (aria-hidden, pointer-events-none) ไม่บังเนื้อหา
 */
export default function StickyCheersDecor({
  className = "",
}: {
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer = 0;
    const trigger = () => {
      setPlay(false);
      // รีสตาร์ท keyframes
      requestAnimationFrame(() => setPlay(true));
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          trigger();
          timer = window.setInterval(trigger, 7000);
        } else {
          clearInterval(timer);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`pointer-events-none select-none ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 260 200" className="h-full w-full" fill="none">
        <defs>
          <linearGradient id="cheers-milk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff4e0" />
            <stop offset="100%" stopColor="#f3d9b4" />
          </linearGradient>
          <linearGradient id="cheers-cream" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#f9ddb0" />
            <stop offset="100%" stopColor="#e8a35c" />
          </linearGradient>
          <linearGradient id="cheers-glass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#c9b3e8" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* เงาพื้น */}
        <ellipse
          cx="130"
          cy="188"
          rx="96"
          ry="9"
          fill="#7b4ab8"
          opacity="0.12"
        />

        {/* 🥛 แก้วนมเหนียว (ซ้าย) — เอียงเข้าหากลาง */}
        <g
          className={play ? "animate-cheers-left" : ""}
          style={{ transformOrigin: "88px 180px" }}
        >
          <g transform="rotate(-8 88 180)">
            {/* ตัวแก้ว */}
            <path
              d="M52 78 h72 l-8 96 a8 8 0 0 1 -8 7 H68 a8 8 0 0 1 -8 -7 Z"
              fill="url(#cheers-milk)"
            />
            {/* ชั้นนมเหนียวราดบน ข้น ๆ ย้อยลง */}
            <path
              d="M50 78 h76 v22 q-6 12 -12 2 q-5 16 -11 3 q-6 18 -12 4 q-5 12 -11 1 q-6 14 -12 3 q-5 8 -10 0 Z"
              fill="url(#cheers-cream)"
            />
            <path d="M50 78 h76 v10 H50 Z" fill="#e8a35c" />
            <ellipse
              cx="88"
              cy="80"
              rx="38"
              ry="6"
              fill="#ffffff"
              opacity="0.4"
            />
            {/* แสงบนแก้ว */}
            <path
              d="M52 78 h72 l-8 96 a8 8 0 0 1 -8 7 H68 a8 8 0 0 1 -8 -7 Z"
              fill="url(#cheers-glass)"
            />
            <path
              d="M64 92 l-5 76"
              stroke="#ffffff"
              strokeOpacity="0.6"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* ขอบแก้ว */}
            <rect
              x="48"
              y="73"
              width="80"
              height="9"
              rx="4.5"
              fill="#ffffff"
              opacity="0.95"
            />
            {/* หลอดม่วง */}
            <rect
              x="96"
              y="26"
              width="9"
              height="60"
              rx="4.5"
              fill="#8a5cf0"
              transform="rotate(-12 100 56)"
            />
            {/* หน้ายิ้ม kawaii */}
            <circle cx="78" cy="135" r="2.6" fill="#3a2f45" />
            <circle cx="98" cy="135" r="2.6" fill="#3a2f45" />
            <path
              d="M82 143 q6 5 12 0"
              stroke="#3a2f45"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <ellipse
              cx="70"
              cy="141"
              rx="4"
              ry="2.4"
              fill="#f5b7c8"
              opacity="0.8"
            />
            <ellipse
              cx="106"
              cy="141"
              rx="4"
              ry="2.4"
              fill="#f5b7c8"
              opacity="0.8"
            />
          </g>
        </g>

        {/* 🍪 แก้วแครกเกอร์ ฝาโดม (ขวา) — เอียงเข้าหากลาง */}
        <g
          className={play ? "animate-cheers-right" : ""}
          style={{ transformOrigin: "176px 180px" }}
        >
          <g transform="rotate(8 176 180)">
            <path
              d="M140 96 h72 l-7 80 a8 8 0 0 1 -8 7 h-42 a8 8 0 0 1 -8 -7 Z"
              fill="#ffffff"
              fillOpacity="0.55"
              stroke="#d8c7f0"
              strokeWidth="3"
            />
            {/* แครกเกอร์กรอบ ๆ ข้างใน */}
            {[
              { x: 150, y: 120, r: -18 },
              { x: 176, y: 112, r: 12 },
              { x: 162, y: 140, r: 4 },
              { x: 186, y: 142, r: -10 },
            ].map((c, i) => (
              <g key={i} transform={`rotate(${c.r} ${c.x + 12} ${c.y + 16})`}>
                <rect
                  x={c.x}
                  y={c.y}
                  width="24"
                  height="32"
                  rx="5"
                  fill="#e6b97a"
                  stroke="#c9924e"
                  strokeWidth="1.6"
                />
                <g fill="#b8823f" opacity="0.8">
                  <circle cx={c.x + 7} cy={c.y + 8} r="1.5" />
                  <circle cx={c.x + 17} cy={c.y + 8} r="1.5" />
                  <circle cx={c.x + 12} cy={c.y + 16} r="1.5" />
                  <circle cx={c.x + 7} cy={c.y + 24} r="1.5" />
                  <circle cx={c.x + 17} cy={c.y + 24} r="1.5" />
                </g>
              </g>
            ))}
            {/* ฝาโดม */}
            <path
              d="M136 96 q40 -46 80 0 Z"
              fill="#ffffff"
              fillOpacity="0.5"
              stroke="#d8c7f0"
              strokeWidth="3"
            />
            <ellipse
              cx="164"
              cy="70"
              rx="9"
              ry="4"
              fill="#ffffff"
              opacity="0.7"
            />
            <rect
              x="134"
              y="92"
              width="84"
              height="8"
              rx="4"
              fill="#efe6fb"
              stroke="#d8c7f0"
              strokeWidth="2"
            />
            {/* หน้ายิ้ม */}
            <circle cx="166" cy="160" r="2.4" fill="#3a2f45" />
            <circle cx="186" cy="160" r="2.4" fill="#3a2f45" />
            <path
              d="M170 167 q6 5 12 0"
              stroke="#3a2f45"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* ✨ ประกายตอนชน (กลางบน) */}
        <g
          className={play ? "animate-cheers-spark" : "opacity-0"}
          style={{ transformOrigin: "132px 70px" }}
        >
          <path
            d="M132 50 l3 9 l9 3 l-9 3 l-3 9 l-3 -9 l-9 -3 l9 -3 Z"
            fill="#f4d35e"
          />
          <path
            d="M112 84 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 Z"
            fill="#ffffff"
          />
          <path
            d="M152 88 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 Z"
            fill="#d492e0"
          />
        </g>

        {/* 💜 หัวใจ + ฟอง ลอยเบา ๆ */}
        <g
          className="animate-floaty-slow"
          style={{ transformOrigin: "40px 60px" }}
        >
          <path
            d="M36 62 c-6 -8 4 -14 6 -6 c2 -8 12 -2 6 6 l-6 6 Z"
            fill="#c9b3e8"
          />
        </g>
        <g className="animate-floaty" style={{ transformOrigin: "228px 52px" }}>
          <path
            d="M224 54 c-5 -7 3 -12 5 -5 c2 -7 10 -2 5 5 l-5 5 Z"
            fill="#f5b7c8"
          />
        </g>
        <circle
          cx="30"
          cy="120"
          r="5"
          fill="#ffffff"
          opacity="0.6"
          className="animate-twinkle"
        />
        <circle
          cx="240"
          cy="132"
          r="4"
          fill="#ffffff"
          opacity="0.6"
          className="animate-twinkle"
          style={{ animationDelay: "0.9s" }}
        />
        <circle
          cx="222"
          cy="24"
          r="2.5"
          fill="#f4d35e"
          opacity="0.8"
          className="animate-twinkle"
          style={{ animationDelay: "1.6s" }}
        />
      </svg>
    </div>
  );
}
