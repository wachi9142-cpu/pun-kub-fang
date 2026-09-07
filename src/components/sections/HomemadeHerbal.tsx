import {
  HOMEMADE_BOTTLED,
  HOMEMADE_BLENDED,
  HOMEMADE_SWEETNESS,
  HOMEMADE_PRICE_SUMMARY,
  HOMEMADE_NOTE,
  type HomemadeDrink,
} from "@/data/site";

function DrinkRow({ item }: { item: HomemadeDrink }) {
  return (
    <div
      className={`relative flex items-center gap-3 rounded-2xl bg-cream-white p-3 shadow-soft ring-1 ring-ink/5 ${
        item.soldOut ? "opacity-70" : ""
      }`}
    >
      {/* ช่องวางรูปสินค้า (ใส่ image ทีหลังได้ ไม่งั้นโชว์อีโมจิ) */}
      <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-lime-50">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt={item.nameTh}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-xl">{item.emoji}</span>
        )}
      </div>
      <div className="min-w-0 flex-1 leading-tight">
        <span
          className={`block truncate text-sm font-medium text-ink ${
            item.soldOut ? "line-through decoration-ink/30" : ""
          }`}
        >
          {item.nameTh}
        </span>
        <span className="block truncate text-[11px] text-ink/45">
          {item.nameEn}
        </span>
      </div>
      {item.soldOut ? (
        <span className="shrink-0 rounded-full bg-ink/10 px-2.5 py-1 text-[10px] font-bold text-ink/60">
          หมดวันนี้ · Sold Out
        </span>
      ) : (
        <span className="font-display shrink-0 text-sm font-bold text-blossom-500">
          ฿{item.price}
        </span>
      )}
    </div>
  );
}

export default function HomemadeHerbal() {
  return (
    <section id="herbal" className="scroll-mt-24 py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            🌿 น้ำสมุนไพรโฮมเมด{" "}
            <span className="text-blossom-400">| Homemade Herbal</span>
          </h2>
          <p className="mt-2 text-ink/60">
            เมนูน้ำโฮมเมดหมุนเวียน ไม่ได้มีทุกวัน — ทำสดใหม่ทุกขวด 💜
          </p>
        </div>

        {/* 📢 หมายเหตุสำคัญ */}
        <div className="mx-auto mb-8 max-w-3xl rounded-2xl bg-amber-50 p-4 text-center ring-1 ring-amber-200/70">
          <p className="text-sm leading-relaxed text-amber-900/85">
            📢 {HOMEMADE_NOTE.th}
          </p>
          <p className="mt-1.5 text-xs italic leading-relaxed text-amber-900/55">
            {HOMEMADE_NOTE.en}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* 🧴 น้ำโฮมเมดใส่ขวด */}
          <div className="lg:col-span-2">
            <div className="mb-3 flex items-baseline justify-between gap-2">
              <h3 className="font-display text-lg font-bold text-ink">
                🧋 น้ำโฮมเมดใส่แก้ว{" "}
                <span className="text-sm font-medium text-ink/45">
                  Homemade Drinks (Cup)
                </span>
              </h3>
              <span className="shrink-0 rounded-full bg-grape-50 px-3 py-1 text-xs font-semibold text-grape-deep">
                25 ฿/แก้ว
              </span>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {HOMEMADE_BOTTLED.map((item) => (
                <DrinkRow key={item.nameEn} item={item} />
              ))}
            </div>

            {/* 🍯 ระดับความหวาน */}
            <div className="mt-4 rounded-2xl bg-cream-white p-4 shadow-soft ring-1 ring-ink/5">
              <p className="text-sm font-semibold text-ink">
                🍯 เลือกระดับความหวาน{" "}
                <span className="font-medium text-ink/45">Choose Your Sweetness</span>
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {HOMEMADE_SWEETNESS.map((s) => (
                  <span
                    key={s.en}
                    className="rounded-full bg-grape-50 px-3.5 py-1.5 text-xs font-semibold text-grape-deep"
                  >
                    {s.th} · {s.en}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-ink/45">
                💡 น้ำโฮมเมดแต่ละรสอาจมีความหวานตามธรรมชาติของวัตถุดิบ
              </p>
            </div>
          </div>

          {/* ขวา: ปั่น + สรุปราคา */}
          <div className="flex flex-col gap-6">
            {/* 🥤 เมนูปั่น */}
            <div>
              <div className="mb-3 flex items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-bold text-ink">
                  🥤 เมนูปั่น{" "}
                  <span className="text-sm font-medium text-ink/45">Blended</span>
                </h3>
                <span className="shrink-0 rounded-full bg-grape-50 px-3 py-1 text-xs font-semibold text-grape-deep">
                  เริ่ม 30 ฿
                </span>
              </div>
              <p className="mb-2.5 text-xs text-ink/55">
                น้ำสมุนไพรบางชนิดสามารถทำเป็นแบบปั่นได้ เช่น
              </p>
              <div className="grid gap-2.5">
                {HOMEMADE_BLENDED.map((item) => (
                  <DrinkRow key={item.nameEn} item={item} />
                ))}
              </div>
            </div>

            {/* 💰 สรุปราคา */}
            <div className="rounded-2xl bg-cream-white p-4 shadow-soft ring-1 ring-ink/5">
              <p className="mb-2 font-display text-sm font-bold text-ink">
                💰 สรุปราคา
              </p>
              <ul className="divide-y divide-ink/5">
                {HOMEMADE_PRICE_SUMMARY.map((row) => (
                  <li
                    key={row.label}
                    className="flex items-center justify-between gap-3 py-2 text-sm"
                  >
                    <span className="text-ink/80">{row.label}</span>
                    <span className="font-semibold text-blossom-500">
                      {row.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
