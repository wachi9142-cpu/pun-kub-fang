import { TOPPING_GROUPS } from "@/data/site";

export default function Toppings() {
  return (
    <section id="toppings" className="scroll-mt-24 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            🧋 ท็อปปิ้ง <span className="text-blossom-400">| Toppings</span>
          </h2>
          <p className="mt-2 text-ink/60">
            เพิ่มความอร่อยให้แก้วโปรด เลือกท็อปปิ้งได้ตามใจ
          </p>
          <p className="mt-1 text-xs text-ink/45">*ราคาเพิ่มต่อ 1 ท็อปปิ้ง</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOPPING_GROUPS.map((group) => (
            <div
              key={group.id}
              className="flex flex-col rounded-3xl bg-cream-white p-5 shadow-card ring-1 ring-ink/5"
            >
              <div className="mb-3 flex items-center gap-3 border-b border-ink/10 pb-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-grape-50 text-xl">
                  {group.emoji}
                </span>
                <div className="leading-tight">
                  <h3 className="font-display text-base font-bold text-ink">
                    {group.titleTh}
                  </h3>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-ink/45">
                    {group.titleEn}
                  </p>
                </div>
              </div>

              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item.nameEn}
                    className="flex items-start justify-between gap-3"
                  >
                    <span className="leading-tight">
                      <span className="block text-sm text-ink">{item.nameTh}</span>
                      <span className="block text-[11px] text-ink/45">
                        {item.nameEn}
                      </span>
                    </span>
                    <span className="mt-0.5 shrink-0 rounded-full bg-blossom-50 px-2.5 py-1 text-xs font-bold text-blossom-500">
                      +฿{item.price}
                    </span>
                  </li>
                ))}
              </ul>

              {group.note && (
                <div className="mt-4 rounded-2xl bg-amber-50 p-3 text-[11px] leading-relaxed text-amber-900/80 ring-1 ring-amber-200/70">
                  <span className="font-semibold text-amber-900">
                    📌 หมายเหตุ | Note:{" "}
                  </span>
                  {group.note}
                  {group.noteEn && (
                    <span className="mt-1 block italic text-amber-900/60">
                      {group.noteEn}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
