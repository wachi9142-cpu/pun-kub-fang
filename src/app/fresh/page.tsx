import type { Metadata } from "next";
import FreshPageClient from "@/components/sections/FreshPageClient";

export const metadata: Metadata = {
  title: "ตักสด ปั่นฟิน 🥝🍓 | บุฟเฟ่ต์ผัก/ผลไม้สดปั่น | ปั่นกับฟ่าง",
  description:
    "เลือกผักและผลไม้สดที่ชอบ ร้านตักใส่แก้วแล้วปั่นให้ ราคาเดียว 49 บาท (จาก 69 บาท) ไม่คิดเพิ่มตามชนิด",
};

export default function FreshPage() {
  return <FreshPageClient />;
}
