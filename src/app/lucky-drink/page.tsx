import type { Metadata } from "next";
import MenuPageShell from "@/components/sections/MenuPageShell";
import LuckyDrink from "@/components/sections/LuckyDrink";
import { getSiteData } from "@/lib/api";
import { hydrateSiteData } from "@/data/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "สุ่มแก้วกับฟ่าง 🎲 | Fang's Lucky Drink",
  description:
    "ตู้กาชาปองสุ่มเครื่องดื่มของปั่นกับฟ่าง — เมนูลับ เมนูมั่ว เมนูทดลอง และเมนูที่ไม่มีในเมนูหลัก กดหมุนแล้วลุ้นเลย!",
};

/* 🎰 หน้าตู้กาชาปองจริง — "เอาล่ะ มาลุ้นกันจริง ๆ!" */
export default async function LuckyDrinkPage() {
  hydrateSiteData(await getSiteData());
  return (
    <MenuPageShell backHref="/" backLabel="กลับหน้าแรก">
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            🎲 สุ่มแก้วกับฟ่าง <span className="text-blossom-400">✨</span>
          </h1>
          <p className="font-display mt-1 text-lg font-semibold text-grape-400">
            Fang&apos;s Lucky Drink
          </p>
          <p className="mt-2 text-ink/60">
            เอาล่ะ มาลุ้นกันจริง ๆ! กดหมุนแล้วดูว่าวันนี้ฟ่างจะสุ่มแก้วไหนให้
            🎰💜
          </p>
        </div>
      </div>
      <LuckyDrink />
    </MenuPageShell>
  );
}
