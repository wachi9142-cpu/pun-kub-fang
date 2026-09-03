import type { Metadata } from "next";
import MixPageClient from "@/components/sections/MixPageClient";

export const metadata: Metadata = {
  title: "มิกซ์กับฟ่าง ✨ | ปั่นแก้วในแบบของคุณ",
  description: "เลือกฐาน ผลไม้ และท็อปปิ้งที่ชอบ แล้วให้ปั่นกับฟ่างปั่นสดให้เลย",
};

// แปลงพรีเซ็ตจากปุ่ม "เอาคู่นี้!" เป็นค่าเริ่มต้นของตัวมิกซ์
const PRESETS: Record<string, { base?: string; fruit?: string }> = {
  "strawberry-banana": { base: "milk", fruit: "strawberry" },
  "strawberry-lemon-soda": { base: "soda", fruit: "strawberry" },
  "bearmilk-cocoa": { base: "milk" },
};

export default async function MixPage({
  searchParams,
}: {
  searchParams: Promise<{ preset?: string }>;
}) {
  const { preset } = await searchParams;
  const mapped = preset ? PRESETS[preset] : undefined;

  return (
    <MixPageClient
      initialBaseId={mapped?.base}
      initialFruitId={mapped?.fruit}
    />
  );
}
