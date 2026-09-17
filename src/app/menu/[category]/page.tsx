import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DRINK_CATEGORIES, MENU_SECTIONS, type CategoryId } from "@/data/site";
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
        </StickyDripFrame>
      ) : category === "tea" ? (
        <TeaMenuView />
      ) : category === "smoothie" ? (
        <SmoothieMenuView />
      ) : category === "drinks" ? (
        <CategoryMenuView categoryId="drinks" hero={<CoffeeHero />} />
      ) : category === "hot" ? (
        <CategoryMenuView categoryId="hot" hero={<HotHero />} />
      ) : category === "milk" ? (
        <CategoryMenuView categoryId="milk" hero={<MilkHero />} />
      ) : category === "soda" ? (
        <SodaBubbleFrame>
          <CategoryMenuView categoryId="soda" />
        </SodaBubbleFrame>
      ) : DRINK_IDS.includes(category) ? (
        <CategoryMenuView categoryId={category as CategoryId} />
      ) : (
        notFound()
      )}
      <IngredientNote fresh={FRESH_CATEGORIES.includes(category)} />
    </MenuPageShell>
  );
}
