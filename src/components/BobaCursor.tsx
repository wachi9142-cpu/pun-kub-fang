"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 🧋 BobaCursor — เปลี่ยนลูกศรเมาส์เป็นแก้วชาไข่มุกเล็ก ๆ (Desktop/เมาส์เท่านั้น)
 * - ตามเมาส์ทันที (อัปเดต transform ตรง ๆ ใน pointermove ไม่ผ่าน React state → ไม่หน่วง)
 * - เอียงตามทิศทางที่ลาก · hover ปุ่ม/ลิงก์/การ์ด = ขยาย + เด้ง + ✨ · กดคลิก = หดเล็กน้อย
 * - อุปกรณ์ touch / ไม่มี hover → ไม่แสดง (ใช้ cursor ปกติ) · prefers-reduced-motion → ยังแสดงแต่ไม่เด้ง (CSS ปิด animation ให้)
 * - pointer-events: none → ไม่กระทบ click/hover/drag/scroll เดิม · ไม่ทำให้เกิด overflow (fixed + ซ่อนใน body overflow)
 */
export default function BobaCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  /* 1) ตรวจอุปกรณ์ก่อน → ค่อยเปิดใช้ (เดิม wiring ใน effect เดียวกัน → ref ยังเป็น null ตอน enabled=false → error เงียบ ๆ cursor เลยไม่ขึ้น) */
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* 2) เมื่อเปิดใช้และ div ถูก render แล้ว → ผูก event */
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    document.documentElement.classList.add("boba-cursor-on");

    let lastX = 0;
    let lastY = 0;
    let tilt = 0;
    let raf = 0;
    let visible = false;

    const render = (x: number, y: number) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${tilt}deg)`;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      lastY = e.clientY;
      // เอียงตามทิศทาง (จำกัด ±14°) แล้วค่อย ๆ คืนตัวใน raf
      tilt = Math.max(-14, Math.min(14, dx * 0.6));
      if (!visible) {
        visible = true;
        el.style.opacity = "1";
      }
      render(lastX, lastY);
      cancelAnimationFrame(raf);
      const settle = () => {
        tilt *= 0.85;
        render(lastX, lastY);
        if (Math.abs(tilt) > 0.3) raf = requestAnimationFrame(settle);
      };
      raf = requestAnimationFrame(settle);
    };
    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element &&
      !!t.closest(
        "a, button, [role='button'], [role='tab'], [role='option'], [role='checkbox'], [role='radio'], summary, input, select, textarea, label, article, .hover-lift, .cursor-pointer, [data-cursor='hover']",
      );
    const onOver = (e: PointerEvent) => {
      el.classList.toggle("boba-cursor--hover", isInteractive(e.target));
    };
    const onDown = () => el.classList.add("boba-cursor--down");
    const onUp = () => el.classList.remove("boba-cursor--down");
    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };
    const onEnter = () => {
      visible = true;
      el.style.opacity = "1";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("boba-cursor-on");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={ref} className="boba-cursor" aria-hidden>
      {/* ✨ ประกาย/หัวใจ ตอน hover */}
      <span className="boba-cursor__spark boba-cursor__spark--1">✨</span>
      <span className="boba-cursor__spark boba-cursor__spark--2">💜</span>
      <svg
        viewBox="0 0 32 40"
        width="26"
        height="32"
        fill="none"
        className="boba-cursor__cup"
      >
        {/* จุดปลายชี้ (มุมซ้ายบน) */}
        <circle
          cx="3"
          cy="3"
          r="2.6"
          fill="#7b4ab8"
          stroke="#ffffff"
          strokeWidth="1.2"
        />
        {/* หลอด */}
        <rect
          x="18"
          y="1"
          width="4"
          height="14"
          rx="2"
          fill="#8a5cf0"
          transform="rotate(12 20 8)"
        />
        {/* แก้ว */}
        <path
          d="M7 12 h18 l-2 22 a3 3 0 0 1 -3 3 H12 a3 3 0 0 1 -3 -3 Z"
          fill="#f3d9b4"
          stroke="#ffffff"
          strokeWidth="1.6"
        />
        {/* ชานม ไล่สี */}
        <path
          d="M8.5 18 h15 l-1.4 15 a2 2 0 0 1 -2 2 H12 a2 2 0 0 1 -2 -2 Z"
          fill="#d9a35c"
          opacity="0.9"
        />
        {/* ฝา/ฟอง */}
        <rect
          x="6"
          y="10"
          width="20"
          height="4"
          rx="2"
          fill="#ffffff"
          stroke="#e6d9f5"
          strokeWidth="1"
        />
        {/* 🧋 ไข่มุก */}
        <circle cx="12" cy="31" r="2.2" fill="#3a2f45" />
        <circle cx="17" cy="33" r="2.2" fill="#3a2f45" />
        <circle cx="21" cy="30" r="2.2" fill="#3a2f45" />
        <circle cx="14.5" cy="27" r="2" fill="#3a2f45" />
        {/* แถบม่วง + แสง */}
        <rect
          x="8"
          y="21"
          width="16"
          height="3"
          rx="1.5"
          fill="#c9b3e8"
          opacity="0.8"
        />
        <path
          d="M10 15 l-0.8 16"
          stroke="#ffffff"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}
