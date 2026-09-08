import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FRESH_BUFFET } from "@/data/site";

const INGREDIENTS = ["🍓", "🥝", "🍌", "🥕", "🥬", "🍍", "🫐"];

export default function FreshBuffetTeaser() {
  return (
    <section id="fresh-teaser" className="scroll-mt-24 pb-14 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-grape-600 via-grape-500 to-blossom-500 p-6 text-center shadow-card sm:p-10 lg:p-12">
          {/* ประกายตกแต่ง */}
          <span className="pointer-events-none absolute left-8 top-8 text-3xl opacity-40">🥬</span>
          <span className="pointer-events-none absolute right-10 bottom-10 text-4xl opacity-40">🍓</span>

          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white">
            🥝 จุดเด่นของร้าน
          </span>
          <h2 className="font-display mt-4 text-3xl font-bold text-white sm:text-5xl">
            ตักสด ปั่นฟิน <span className="text-cream-100">🍓</span>
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm font-medium uppercase tracking-wide text-white/70">
            Fresh Fruit &amp; Vegetable Smoothie Buffet
          </p>
          <p className="mx-auto mt-2 max-w-xl text-white/85">
            บุฟเฟ่ต์ผักและผลไม้สดปั่น เลือกวัตถุดิบที่ชอบได้ไม่อั้น
          </p>

          {/* ราคาโปรฯ */}
          <div className="mt-5 inline-flex items-baseline gap-2.5 rounded-full bg-white/95 px-5 py-2.5 shadow-soft">
            <span className="text-base text-ink/40 line-through">
              {FRESH_BUFFET.oldPrice} บาท
            </span>
            <span className="font-display text-3xl font-bold text-blossom-500">
              {FRESH_BUFFET.price}
            </span>
            <span className="text-sm font-semibold text-grape-600">บาท/แก้ว</span>
          </div>

          {/* วัตถุดิบ */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {INGREDIENTS.map((e, i) => (
              <span
                key={i}
                className="grid h-12 w-12 place-items-center rounded-2xl bg-white/90 text-2xl shadow-soft sm:h-14 sm:w-14 sm:text-3xl"
              >
                {e}
              </span>
            ))}
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-grape-100 to-blossom-100 text-2xl shadow-soft sm:h-14 sm:w-14 sm:text-3xl">
              🥤
            </span>
          </div>

          {/* ปุ่มใหญ่ */}
          <Link
            href="/fresh"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-9 py-4 text-lg font-bold text-grape-700 shadow-card transition-all hover:scale-[1.04] hover:text-blossom-500"
          >
            🥤 เลือกวัตถุดิบของฉัน
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
