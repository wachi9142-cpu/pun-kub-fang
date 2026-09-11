"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * วาด children ไปที่ <body> โดยตรง
 * ใช้กับ modal/popup ที่เป็น position: fixed — กันไม่ให้ไปติดอยู่ในการ์ดที่มี transform/overflow-hidden
 * (transform บน parent จะทำให้ fixed ยึดกับ parent แทน viewport)
 */
export default function Portal({
  children,
  lockScroll = true,
  onEscape,
}: {
  children: React.ReactNode;
  /** ล็อกไม่ให้หน้าเว็บด้านหลังเลื่อนตอน popup เปิด */
  lockScroll?: boolean;
  /** เรียกเมื่อกดปุ่ม Esc (ใช้ปิด popup) */
  onEscape?: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!lockScroll) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lockScroll]);

  useEffect(() => {
    if (!onEscape) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onEscape();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onEscape]);

  if (!mounted) return null;
  return createPortal(children, document.body);
}
