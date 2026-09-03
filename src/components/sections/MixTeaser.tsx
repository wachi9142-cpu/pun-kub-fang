import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

type Combo = {
  a: { emoji: string; label: string };
  b: { emoji: string; label: string };
  result: { emoji: string; label: string };
};

const COMBOS: Combo[] = [
  {
    a: { emoji: "🍓", label: "สตรอว์เบอร์รี" },
    b: { emoji: "🍌", label: "กล้วย" },
    result: { emoji: "🥤", label: "สตรอว์เบอร์รีบานาน่าปั่น" },
  },
  {
    a: { emoji: "🍋", label: "เลมอน" },
    b: { emoji: "🧊", label: "โซดา" },
    result: { emoji: "🥤", label: "เลมอนโซดาซ่า" },
  },
  {
    a: { emoji: "🥛", label: "นมหมี" },
    b: { emoji: "🍪", label: "โอรีโอ" },
    result: { emoji: "🥤", label: "นมหมีโอรีโอปั่น" },
  },
];

export default function MixTeaser() {
  return (
    <section id="mix" className="scroll-mt-24 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-grape-600 via-grape-500 to-blossom-500 p-6 text-center shadow-card sm:p-10 lg:p-12">
          {/* ประกายตกแต่ง */}
          <span className="pointer-events-none absolute left-8 top-8 text-3xl opacity-40">✨</span>
          <span className="pointer-events-none absolute right-10 bottom-10 text-4xl opacity-40">💜</span>

          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white">
            <Sparkles size={15} /> จุดเด่นของร้าน
          </span>
          <h2 className="font-display mt-4 text-3xl font-bold text-white sm:text-5xl">
            มิกซ์กับฟ่าง <span className="text-cream-100">✨</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            เบื่อรสเดิม ๆ? จับคู่ความอร่อยในแบบของคุณเอง
          </p>

          {/* คู่รสชาติ */}
          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            {COMBOS.map((c, i) => (
              <div
                key={i}
                className="rounded-3xl bg-white/90 p-5 shadow-soft ring-1 ring-white/60"
              >
                <div className="flex items-center justify-center gap-2.5">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-blossom-50 text-3xl">
                    {c.a.emoji}
                  </span>
                  <span className="font-display text-xl font-bold text-grape-400">＋</span>
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-grape-50 text-3xl">
                    {c.b.emoji}
                  </span>
                  <ArrowRight size={22} className="text-grape-400" />
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-grape-100 to-blossom-100 text-3xl">
                    {c.result.emoji}
                  </span>
                </div>
                <p className="mt-3 text-sm font-medium text-grape-600">
                  {c.a.label} + {c.b.label}
                </p>
                <p className="font-display text-base font-semibold text-grape-700">
                  = {c.result.label}
                </p>
              </div>
            ))}
          </div>

          {/* ปุ่มใหญ่ */}
          <Link
            href="/mix"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-9 py-4 text-lg font-bold text-grape-700 shadow-card transition-all hover:scale-[1.04] hover:text-blossom-500"
          >
            <Sparkles size={20} className="text-blossom-500" />
            สร้างแก้วของฉัน
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
