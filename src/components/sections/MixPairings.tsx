import Link from "next/link";

type Pairing = {
  theme: string;
  emoji: string;
  items: string[];
  accent: string; // gradient พื้นการ์ด
  href: string;
};

const PAIRINGS: Pairing[] = [
  {
    theme: "คู่ฮิต",
    emoji: "🔥",
    items: ["🍓 สตรอว์เบอร์รี", "🍌 กล้วย"],
    accent: "from-blossom-100 to-blossom-200/60",
    href: "/mix?preset=strawberry-banana",
  },
  {
    theme: "สายสดชื่น",
    emoji: "🧊",
    items: ["🍓 สตรอว์เบอร์รี", "🍋 เลมอน", "＋ โซดา"],
    accent: "from-sky-100 to-grape-100/70",
    href: "/mix?preset=strawberry-lemon-soda",
  },
  {
    theme: "สายหวาน",
    emoji: "🐻",
    items: ["🥛 นมหมี", "🍫 โกโก้"],
    accent: "from-amber-100 to-blossom-100/60",
    href: "/mix?preset=bearmilk-cocoa",
  },
];

export default function MixPairings() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
      <div className="mb-8 text-center">
        <h2 className="font-display text-3xl font-bold text-grape-700 sm:text-4xl">
          ไม่รู้จะมิกซ์อะไร? <span className="text-blossom-500">ฟ่างจับคู่ให้</span> 💕
        </h2>
        <p className="mt-2 text-grape-500">
          สูตรเด็ดที่ฟ่างการันตีว่าอร่อย เลือกคู่ที่ใช่แล้วจัดเลย!
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {PAIRINGS.map((p) => (
          <div
            key={p.theme}
            className={`hover-lift flex flex-col items-center rounded-3xl bg-gradient-to-br ${p.accent} p-6 text-center shadow-card ring-1 ring-white/70`}
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-white/80 text-4xl shadow-soft">
              {p.emoji}
            </span>
            <h3 className="font-display mt-4 text-lg font-bold text-grape-700">
              {p.theme}
            </h3>

            <div className="mt-3 flex flex-1 flex-col items-center gap-1.5">
              {p.items.map((it) => (
                <span
                  key={it}
                  className="rounded-full bg-white/70 px-4 py-1.5 text-sm font-medium text-grape-600"
                >
                  {it}
                </span>
              ))}
            </div>

            <Link
              href={p.href}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-grape-600 px-6 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:scale-[1.04] hover:bg-grape-700"
            >
              เอาคู่นี้! ✨
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
