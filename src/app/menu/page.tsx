import type { Metadata } from "next";
import MenuPageShell from "@/components/sections/MenuPageShell";
import MenuCategoryButtons from "@/components/MenuCategoryButtons";
import PricingGuide from "@/components/sections/PricingGuide";

export const metadata: Metadata = {
  title: "เมนูทั้งหมด | ปั่นกับฟ่าง",
  description: "เลือกหมวดเมนูที่ชอบ — เครื่องดื่ม นม ปั่น โซดา น้ำสมุนไพรโฮมเมด และท็อปปิ้ง",
};

export default function MenuHubPage() {
  return (
    <MenuPageShell backHref="/" backLabel="กลับหน้าแรก">
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            วันนี้ฟ่างปั่นอะไร? <span className="text-blossom-400">👀</span>
          </h1>
          <p className="mt-2 text-ink/60">
            เลือกหมวดที่ชอบ แล้วไปดูเมนูของหมวดนั้นได้เลย
          </p>
        </div>

        <MenuCategoryButtons />
      </div>

      <PricingGuide />
    </MenuPageShell>
  );
}
