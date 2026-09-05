import { PRICE_TIERS } from "@/data/site";

export default function PricingGuide() {
  return (
    <section id="pricing" className="scroll-mt-24 py-14 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            💰 โครงสร้างราคาเมนู <span className="text-blossom-400">| Menu Pricing</span>
          </h2>
          <p className="mt-2 text-ink/60">
            ราคาย่อมเยา คุ้มทุกแก้ว ปั่นสดใหม่คุณภาพเต็มร้อย
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-cream-white shadow-card ring-1 ring-ink/5">
          <ul className="divide-y divide-ink/5">
            {PRICE_TIERS.map((tier) => (
              <li
                key={tier.labelEn}
                className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-grape-50/50 sm:px-6"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-grape-50 text-lg">
                  {tier.emoji}
                </span>
                <div className="min-w-0 flex-1 leading-tight">
                  <span className="block text-sm font-semibold text-ink">
                    {tier.labelTh}
                  </span>
                  <span className="block text-[11px] text-ink/45">
                    {tier.labelEn}
                    {tier.note && <span className="italic"> · {tier.note}</span>}
                  </span>
                </div>
                <span className="font-display shrink-0 text-base font-bold text-blossom-500 sm:text-lg">
                  {tier.price}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 text-center text-xs text-ink/45">
          *ราคาอาจเปลี่ยนแปลงตามฤดูกาลและต้นทุนวัตถุดิบ
        </p>
      </div>
    </section>
  );
}
