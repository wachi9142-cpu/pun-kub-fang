"use client";

import { useState } from "react";
import Mascot from "@/components/Mascot";

type BrandLogoProps = {
  size?: number;
  className?: string;
  /** ใช้ตอน fallback เป็นมาสคอต (โชว์แมวด้วย) */
  withCat?: boolean;
};

const LOGO_SRC = "/logo.png?v=2";
const MAX_RETRY = 3;

/**
 * โลโก้ร้าน — ใช้ไฟล์จริง /public/logo.png
 * ถ้าโหลดพลาดชั่วคราว (dev/HMR/เน็ตช้า) จะ retry อัตโนมัติก่อน
 * แล้วค่อย fallback เป็นมาสคอต SVG — กันอาการโลโก้หายจนต้องรีเฟรชเอง
 */
export default function BrandLogo({
  size = 46,
  className = "",
  withCat = false,
}: BrandLogoProps) {
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <Mascot size={size} className={className} withCat={withCat} />;
  }

  // เพิ่ม query กันแคช error ตอน retry เพื่อบังคับโหลดใหม่จริง ๆ
  const src = attempt === 0 ? LOGO_SRC : `${LOGO_SRC}&retry=${attempt}`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={src}
      src={src}
      alt="โลโก้ ปั่นกับฟ่าง"
      width={size}
      height={size}
      onError={() =>
        attempt < MAX_RETRY ? setAttempt((a) => a + 1) : setFailed(true)
      }
      className={`rounded-full object-cover ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
