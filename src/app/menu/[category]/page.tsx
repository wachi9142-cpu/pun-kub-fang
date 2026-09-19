import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DRINK_CATEGORIES, MENU_SECTIONS, hydrateSiteData, type CategoryId } from "@/data/site";
import MenuPageShell from "@/components/sections/MenuPageShell";
import CategoryMenuView from "@/components/sections/CategoryMenuView";
import TeaMenuView from "@/components/sections/TeaMenuView";
import SmoothieMenuView from "@/components/sections/SmoothieMenuView";
import HomemadeHerbal from "@/components/sections/HomemadeHerbal";
import WhippedCream from "@/components/sections/WhippedCream";
import BottledDrinks from "@/components/sections/BottledDrinks";
import Snacks from "@/components/sections/Snacks";
import Sandwiches from "@/components/sections/Sandwiches";
import Toppings from "@/components/sections/Toppings";
import StickyMilkView from "@/components/sections/StickyMilkView";
import StickyDripFrame from "@/components/sections/StickyDripFrame";
import SodaBubbleFrame from "@/components/sections/SodaBubbleFrame";
import CoffeeHero from "@/components/sections/CoffeeHero";
import MilkHero from "@/components/sections/MilkHero";
import HotHero from "@/components/sections/HotHero";
import IngredientNote from "@/components/sections/IngredientNote";
import { getMenuItems, getSiteData } from "@/lib/api";

export const dynamic = "force-dynamic";

const DRINK_IDS = DRINK_CATEGORIES.map((c) => c.id) as string[];

/* หมวดที่มีวัตถุดิบสด (ผลไม้/วิปครีม/ท็อปปิ้ง) — แสดงหมายเหตุเพิ่มเรื่องวัตถุดิบสดต่างกันตามวัน */
const FRESH_CATEGORIES = [
  "toppings",
  "sandwiches",
  "whipped",
  "smoothie",
  "snacks",
];

export function generateStaticParams() {
  return MENU_SECTIONS.map((s) => ({ category: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  hydrateSiteData(await getSiteData());
  const sec = MENU_SECTIONS.find((s) => s.id === category);
  return {
    title: sec ? `${sec.label} | ปั่นกับฟ่าง` : "เมนู | ปั่นกับฟ่าง",
    description: sec?.desc,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const sec = MENU_SECTIONS.find((s) => s.id === category);
  if (!sec) notFound();
  const menuItems = DRINK_IDS.includes(category)
    ? await getMenuItems(category as CategoryId)
    : undefined;

  return (
    <MenuPageShell>
      {category === "herbal" ? (
        <HomemadeHerbal />
      ) : category === "whipped" ? (
        <WhippedCream />
      ) : category === "soft" ? (
        <BottledDrinks />
      ) : category === "snacks" ? (
        <Snacks />
      ) : category === "sandwiches" ? (
        <Sandwiches />
      ) : category === "toppings" ? (
        <Toppings />
      ) : category === "sticky" ? (
        <StickyDripFrame>
          <StickyMilkView />
          <CategoryMenuView
            categoryId="sticky"
            items={menuItems}
            hero={
              <div className="mb-8 text-center">
                <h2 className="font-display text-3xl font-bold text-ink">
                  เมนูนมเหนียวพร้อมสั่ง
                </h2>
                <p className="mt-2 text-ink/60">
                  เลือกเมนูสำเร็จรูป หรือจัดชุดของตัวเองด้านบนได้เลย
                </p>
              </div>
            }
          />
        </StickyDripFrame>
      ) : category === "tea" ? (
        <TeaMenuView items={menuItems} />
      ) : category === "smoothie" ? (
        <SmoothieMenuView items={menuItems} />
      ) : category === "drinks" ? (
        <CategoryMenuView categoryId="drinks" hero={<CoffeeHero />} items={menuItems} />
      ) : category === "hot" ? (
        <CategoryMenuView categoryId="hot" hero={<HotHero />} items={menuItems} />
      ) : category === "milk" ? (
        <CategoryMenuView categoryId="milk" hero={<MilkHero />} items={menuItems} />
      ) : category === "soda" ? (
        <SodaBubbleFrame>
          <CategoryMenuView categoryId="soda" items={menuItems} />
        </SodaBubbleFrame>
      ) : DRINK_IDS.includes(category) ? (
        <CategoryMenuView categoryId={category as CategoryId} items={menuItems} />
      ) : (
        notFound()
      )}
      <IngredientNote fresh={FRESH_CATEGORIES.includes(category)} />
    </MenuPageShell>
  );
}
