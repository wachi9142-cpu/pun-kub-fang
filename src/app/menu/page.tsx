import type { Metadata } from "next";
import MenuPageShell from "@/components/sections/MenuPageShell";
import MenuCategoryButtons from "@/components/MenuCategoryButtons";
import PriceNotice from "@/components/sections/PriceNotice";
import PricingGuide from "@/components/sections/PricingGuide";
import { getSiteData } from "@/lib/api";
import { hydrateSiteData } from "@/data/site";

export const metadata: Metadata = {
  title: "เมนูทั้งหมด | ปั่นกับฟ่าง",
  description: "เลือกหมวดเมนูที่ชอบ — เครื่องดื่ม นม ปั่น โซดา น้ำสมุนไพรโฮมเมด และท็อปปิ้ง",
};

export const dynamic = "force-dynamic";

export default async function MenuHubPage() {
  hydrateSiteData(await getSiteData());
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

      <PriceNotice />
      <PricingGuide />
    </MenuPageShell>
  );
}
