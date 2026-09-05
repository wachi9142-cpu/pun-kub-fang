import { DRINK_CATEGORIES, MENU_ITEMS, type CategoryId } from "@/data/site";
import DrinkCard from "@/components/DrinkCard";

/** แสดงเมนูของหมวดเครื่องดื่มหมวดเดียว (ผลไม้ปั่น/นม/โซดา/เครื่องดื่ม) */
export default function CategoryMenuView({
  categoryId,
}: {
  categoryId: CategoryId;
}) {
  const cat = DRINK_CATEGORIES.find((c) => c.id === categoryId)!;
  const items = MENU_ITEMS.filter((m) => m.category === categoryId);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          <span className="mr-1">{cat.emoji}</span>
          {cat.label}
        </h1>
        <p className="mt-2 text-ink/60">{cat.desc}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <DrinkCard key={item.id} item={item} buttonLabel="เพิ่มลงตะกร้า" />
        ))}
      </div>
    </section>
  );
}
