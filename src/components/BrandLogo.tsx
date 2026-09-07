"use client";

import { useState } from "react";
import Mascot from "@/components/Mascot";

type BrandLogoProps = {
  size?: number;
  className?: string;
  /** ใช้ตอน fallback เป็นมาสคอต (โชว์แมวด้วย) */
  withCat?: boolean;
};

/**
 * โลโก้ร้าน — ใช้ไฟล์จริง /public/logo.png
 * ถ้ายังไม่มีไฟล์ จะ fallback เป็นมาสคอต SVG ให้อัตโนมัติ (ไม่มีรูปแตก)
 */
export default function BrandLogo({
  size = 46,
  className = "",
  withCat = false,
}: BrandLogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <Mascot size={size} className={className} withCat={withCat} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png?v=2"
      alt="โลโก้ ปั่นกับฟ่าง"
      width={size}
      height={size}
      onError={() => setFailed(true)}
      className={`rounded-full object-cover ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
