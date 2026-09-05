import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROMO_CAMPAIGNS } from "@/data/site";
import MenuPageShell from "@/components/sections/MenuPageShell";
import PromoDetail from "@/components/sections/PromoDetail";

export function generateStaticParams() {
  return PROMO_CAMPAIGNS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const p = PROMO_CAMPAIGNS.find((x) => x.id === id);
  return {
    title: p
      ? `${p.titleTh} | โปรโมชั่น ปั่นกับฟ่าง`
      : "โปรโมชั่น | ปั่นกับฟ่าง",
    description: p?.slogan,
  };
}

export default async function PromoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const campaign = PROMO_CAMPAIGNS.find((x) => x.id === id);
  if (!campaign) notFound();

  return (
    <MenuPageShell backHref="/promotions" backLabel="กลับไปโปรโมชั่น">
      <PromoDetail campaign={campaign} />
    </MenuPageShell>
  );
}
