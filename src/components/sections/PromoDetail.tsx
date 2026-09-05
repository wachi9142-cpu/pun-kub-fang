"use client";

import { useEffect, useState } from "react";
import type { PromoCampaign, PromoTheme } from "@/data/site";

const THAI_MONTHS = [
  "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
  "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
];

const HEADER: Record<PromoTheme, string> = {
  newyear: "from-amber-100 to-grape-100",
  valentine: "from-rose-100 to-blossom-100",
  chinese: "from-red-100 to-amber-100",
  songkran: "from-sky-100 to-cyan-100",
  mother: "from-sky-100 to-grape-100",
  halloween: "from-grape-200 to-orange-100",
  loykrathong: "from-indigo-100 to-amber-100",
  father: "from-sky-100 to-amber-100",
  christmas: "from-rose-100 to-emerald-100",
  nye: "from-grape-200 to-amber-100",
  special: "from-grape-100 to-blossom-100",
};

export default function PromoDetail({ campaign: p }: { campaign: PromoCampaign }) {
  const [now, setNow] = useState<Date | null>(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => setNow(new Date()), []);

  const status = (() => {
    if (p.ongoing) return "ช่วงนี้เท่านั้น";
    if (!now || p.month == null || p.day == null) return null;
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const target = new Date(now.getFullYear(), p.month - 1, p.day);
    const diff = Math.round((target.getTime() - today.getTime()) / 86400000);
    if (diff === 0) return "🎉 วันนี้เท่านั้น!";
    if (diff > 0) return `อีก ${diff} วัน`;
    return "หมดเขตแล้ว · Ended";
  })();

  const copyCaption = async () => {
    if (!p.sampleCaption) return;
    try {
      await navigator.clipboard.writeText(p.sampleCaption);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* เบราว์เซอร์บล็อก clipboard */
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6 lg:px-8">
      {/* หัวการ์ด */}
      <div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${HEADER[p.theme]} p-7 text-center shadow-card ring-1 ring-ink/5`}
      >
        <div className="text-6xl">{p.emoji}</div>
        <h1 className="font-display mt-2 text-3xl font-bold text-ink sm:text-4xl">
          {p.titleTh}
        </h1>
        <p className="text-sm font-medium uppercase tracking-wide text-ink/45">
          {p.titleEn}
        </p>
        <p className="mt-2 font-medium italic text-ink/70">{p.slogan}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="rounded-full bg-white/70 px-3 py-1 font-semibold text-ink/80">
            {p.ongoing
              ? "🧋 โปรโมชั่นพิเศษช่วงนี้"
              : `📅 ${p.day} ${THAI_MONTHS[p.month! - 1]} · วันเดียวเท่านั้น!`}
          </span>
          {status && (
            <span
              className={`rounded-full px-3 py-1 font-bold ${
                status.includes("หมดเขต")
                  ? "bg-ink/15 text-ink/70"
                  : "bg-blossom-500 text-white"
              }`}
            >
              {status}
            </span>
          )}
        </div>
      </div>

      {/* กิจกรรม */}
      {p.activityTitle && (
        <section className="mt-6 rounded-3xl bg-cream-white p-6 shadow-soft ring-1 ring-ink/5">
          <h2 className="font-display text-xl font-bold text-ink">
            🎃 {p.activityTitle}
          </h2>
          {p.activityDesc && (
            <ul className="mt-3 space-y-2 text-sm text-ink/75">
              {p.activityDesc.map((d) => (
                <li key={d} className="flex gap-2">
                  <span className="text-blossom-500">•</span>
                  {d}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* รางวัล */}
      {p.reward && (
        <div className="mt-4 rounded-3xl bg-gradient-to-r from-blossom-100 to-grape-100 p-5 text-center shadow-soft ring-1 ring-blossom-200/60">
          <p className="font-display text-lg font-bold text-grape-deep">
            🎁 {p.reward}
          </p>
        </div>
      )}

      {/* กติกา */}
      {p.steps && (
        <section className="mt-4 rounded-3xl bg-cream-white p-6 shadow-soft ring-1 ring-ink/5">
          <h2 className="font-display text-lg font-bold text-ink">📌 กติกา</h2>
          <ol className="mt-3 space-y-2.5 text-sm text-ink/80">
            {p.steps.map((s, i) => (
              <li key={s} className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-grape-deep text-xs font-bold text-white">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* แคปชั่นตัวอย่าง */}
      {p.sampleCaption && (
        <section className="mt-4 rounded-3xl bg-cream-white p-6 shadow-soft ring-1 ring-ink/5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-bold text-ink">
              💬 แคปชั่นตัวอย่าง
            </h2>
            <button
              onClick={copyCaption}
              className="inline-flex items-center gap-1.5 rounded-full bg-grape-100 px-3.5 py-1.5 text-xs font-semibold text-grape-deep transition-colors hover:bg-grape-200"
            >
              {copied ? "✓ คัดลอกแล้ว!" : "📋 คัดลอก"}
            </button>
          </div>
          <p className="mt-3 whitespace-pre-line rounded-2xl bg-grape-50 p-4 text-sm leading-relaxed text-ink/80">
            {p.sampleCaption}
          </p>
        </section>
      )}

      {/* เงื่อนไข */}
      {p.conditions && (
        <section className="mt-4 rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200/70">
          <h2 className="text-sm font-bold text-amber-900">⚠️ เงื่อนไข</h2>
          <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-amber-900/80">
            {p.conditions.map((c) => (
              <li key={c} className="flex gap-2">
                <span>•</span>
                {c}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
