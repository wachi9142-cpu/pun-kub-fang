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
import IngredientNote from "@/components/sections/IngredientNote";

const DRINK_IDS = DRINK_CATEGORIES.map((c) => c.id) as string[];

/* หมวดที่เกี่ยวกับวัตถุดิบ/ผลไม้สด — แสดงหมายเหตุเรื่องรูปภาพและวัตถุดิบ */
const INGREDIENT_CATEGORIES = ["toppings", "sandwiches", "whipped", "smoothie"];

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
        <StickyMilkView />
      ) : category === "tea" ? (
        <TeaMenuView />
      ) : category === "smoothie" ? (
        <SmoothieMenuView />
      ) : DRINK_IDS.includes(category) ? (
        <CategoryMenuView categoryId={category as CategoryId} />
      ) : (
        notFound()
      )}
      {INGREDIENT_CATEGORIES.includes(category) && <IngredientNote />}
    </MenuPageShell>
  );
}
