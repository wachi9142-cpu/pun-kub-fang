import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROMOTIONS, type Promotion } from "@/data/site";

const THEME: Record<
  Promotion["theme"],
  { card: string; chip: string; title: string; highlight: string }
> = {
  blossom: {
    card: "from-blossom-100 to-blossom-200/60",
    chip: "bg-blossom-500 text-white hover:bg-blossom-600",
    title: "text-blossom-600",
    highlight: "text-blossom-500",
  },
  grape: {
    card: "from-grape-100 to-grape-200/70",
    chip: "bg-grape-600 text-white hover:bg-grape-700",
    title: "text-grape-700",
    highlight: "text-grape-600",
  },
  cream: {
    card: "from-cream-100 to-blossom-100/60",
    chip: "bg-grape-600 text-white hover:bg-grape-700",
    title: "text-grape-700",
    highlight: "text-blossom-500",
  },
};

export default function Promotions() {
  return (
    <section id="promo" className="relative py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display mb-8 text-3xl font-bold text-grape-700 sm:text-4xl">
          โปรโมชั่นสุดคุ้ม! <span className="text-blossom-400">🎉</span>
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          {PROMOTIONS.map((promo) => {
            const t = THEME[promo.theme];
            return (
              <div
                key={promo.id}
                className={`hover-lift relative flex items-center justify-between gap-3 overflow-hidden rounded-3xl bg-gradient-to-br ${t.card} p-6 shadow-card ring-1 ring-white/60`}
              >
                <div className="relative z-10">
                  <h3 className={`font-display text-lg font-semibold ${t.title}`}>
                    {promo.title}
                  </h3>
                  <p className={`font-display text-2xl font-bold ${t.highlight}`}>
                    {promo.highlight}
                  </p>
                  <p className="mt-1 text-sm text-grape-500">{promo.detail}</p>
                  <button
                    className={`mt-4 rounded-full px-5 py-2 text-sm font-semibold shadow transition-colors ${t.chip}`}
                  >
                    {promo.cta}
                  </button>
                </div>
                <span className="animate-floaty-slow text-6xl drop-shadow-sm sm:text-7xl">
                  {promo.emoji}
                </span>

                {/* วงกลมตกแต่ง */}
                <span className="absolute -bottom-8 -right-6 h-24 w-24 rounded-full bg-white/30" />
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/promotions"
            className="group inline-flex items-center gap-2 rounded-full bg-grape-deep px-7 py-3 text-base font-semibold text-white shadow-card transition-all hover:scale-[1.03] hover:bg-[#5c2f92]"
          >
            🎁 ดูโปรโมชั่นเทศกาลทั้งหมด
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
