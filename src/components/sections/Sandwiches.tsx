import { SANDWICH_GROUPS } from "@/data/site";
import { SnackCard } from "@/components/sections/Snacks";

export default function Sandwiches() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          🥪 แซนวิช <span className="text-blossom-400">| Sandwiches</span>
        </h1>
        <p className="mt-2 text-ink/60">
          ไส้คาว · ผลไม้ครีมสด · แยม เลือกอร่อยได้ตามใจ 💜
        </p>
      </div>

      <div className="space-y-10">
        {SANDWICH_GROUPS.map((group) => (
          <div key={group.id}>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-amber-100 text-xl">
                {group.emoji}
              </span>
              <div className="leading-tight">
                <h2 className="font-display text-lg font-bold text-ink">
                  {group.titleTh}
                </h2>
                <p className="text-[11px] font-medium uppercase tracking-wide text-ink/45">
                  {group.titleEn}
                </p>
              </div>
            </div>

            {/* หมายเหตุ + ผลไม้วันนี้ (เฉพาะกลุ่มผลไม้ครีมสด) */}
            {group.note && (
              <div className="mb-4 rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-200/70">
                <p className="text-sm leading-relaxed text-amber-900/85">
                  {group.note}
                </p>
                {group.noteEn && (
                  <p className="mt-1 text-xs italic text-amber-900/55">
                    {group.noteEn}
                  </p>
                )}
                {group.fruitList && (
                  <div className="mt-2.5">
                    <p className="mb-1.5 text-xs font-semibold text-amber-900/80">
                      ผลไม้ที่เลือกได้ (หมุนเวียนรายวัน):
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.fruitList.map((f) => (
                        <span
                          key={f}
                          className="rounded-full bg-white/70 px-2.5 py-1 text-xs font-medium text-ink/70 ring-1 ring-amber-200/60"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
              {group.items.map((item) => (
                <SnackCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
