import { MENU_ITEMS, type CategoryId, type MenuItem } from "@/data/site";

type ProductsResponse = { items: MenuItem[] };

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL ?? "http://localhost:3001";

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
