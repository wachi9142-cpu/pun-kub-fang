import { cache } from "react";
import {
  MENU_ITEMS,
  type CategoryId,
  type MenuItem,
  type SiteDataPayload,
} from "@/data/site";

type ProductsResponse = { items: MenuItem[] };

export type RecommendationMix = {
  id: string;
  name: string;
  price: number;
  reason: string;
  base: { kind: "base" | "tea" | "herbal"; id: string; label: string; emoji: string };
  syrups: { id: string; label: string; emoji: string }[];
  topping: { nameTh: string; nameEn: string; price: number } | null;
  palette: { foam: string; top: string; bottom: string };
};

export type DrinkRecommendations = {
  interpretation: {
    summary: string;
    budget: number | null;
    desired: string[];
    flavors: string[];
    likelyIngredients: string[];
    avoid: string[];
  };
  summary: string;
  mixes: RecommendationMix[];
  products: (MenuItem & { reason: string })[];
  meta: { steps: { step: string; provider: string; model: string; latencyMs: number }[] };
};

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL ?? "http://localhost:3001";

export const getSiteData = cache(async (): Promise<SiteDataPayload> => {
  try {
    const response = await fetch(
      new URL("/api/site", process.env.API_URL ?? API_URL),
      { cache: "no-store" },
    );
    if (!response.ok) throw new Error(`Site API returned ${response.status}`);
    const payload = (await response.json()) as { data: SiteDataPayload };
    return payload.data;
  } catch (error) {
    console.warn("Site API unavailable; using bundled fallback data", error);
    return {};
  }
});

/** ดึงเมนูจาก backend และ fallback เป็นข้อมูลเดิมเมื่อ API ยังไม่พร้อม */
export async function getMenuItems(category?: CategoryId): Promise<MenuItem[]> {
  try {
    const url = new URL("/api/products", process.env.API_URL ?? API_URL);
    if (category) url.searchParams.set("category", category);
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`Products API returned ${response.status}`);
    const data = (await response.json()) as ProductsResponse;
    return data.items;
  } catch (error) {
    console.warn("Products API unavailable; using bundled menu data", error);
    return category
      ? MENU_ITEMS.filter((item) => item.category === category)
      : MENU_ITEMS;
  }
}

export async function requestDrinkRecommendations(prompt: string): Promise<DrinkRecommendations> {
  const response = await fetch(new URL("/api/recommendations", API_URL), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  const payload = await response.json().catch(() => ({})) as DrinkRecommendations & { message?: string };
  if (!response.ok) throw new Error(payload.message || "ยังจัดแก้วให้ไม่ได้ ลองใหม่อีกครั้งนะ");
  return payload;
}
