import type { Metadata } from "next";
import MenuPageShell from "@/components/sections/MenuPageShell";
import PromoCampaigns from "@/components/sections/PromoCampaigns";

export const metadata: Metadata = {
  title: "โปรโมชั่น | ปั่นกับฟ่าง",
  description:
    "โปรโมชั่นเทศกาลของปั่นกับฟ่าง — วันเดียวเท่านั้นในแต่ละเทศกาล ปีใหม่ วาเลนไทน์ สงกรานต์ วันแม่ คริสต์มาส และอีกมากมาย",
};

export default function PromotionsPage() {
  return (
    <MenuPageShell backHref="/" backLabel="กลับหน้าแรก">
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            🎁 โปรโมชั่น <span className="text-blossom-400">| Promotions</span>
          </h1>
          <p className="mt-2 text-ink/60">
            โปรเด็ดตามเทศกาล — วันเดียวเท่านั้น! อย่าพลาดนะคะ 💜
          </p>
        </div>

        <PromoCampaigns />
      </div>
    </MenuPageShell>
  );
}
