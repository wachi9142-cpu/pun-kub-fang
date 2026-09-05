"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PROMO_CAMPAIGNS, type PromoTheme } from "@/data/site";

const THAI_MONTHS = [
  "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
  "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
];

const THEME: Record<PromoTheme, { card: string; chip: string }> = {
  newyear: { card: "from-amber-50 to-grape-50 ring-amber-200/60", chip: "bg-amber-100 text-amber-700" },
  valentine: { card: "from-rose-50 to-blossom-50 ring-blossom-200/60", chip: "bg-blossom-100 text-blossom-600" },
  chinese: { card: "from-red-50 to-amber-50 ring-red-200/60", chip: "bg-red-100 text-red-600" },
  songkran: { card: "from-sky-50 to-cyan-50 ring-sky-200/60", chip: "bg-sky-100 text-sky-700" },
  mother: { card: "from-sky-50 to-grape-50 ring-sky-200/60", chip: "bg-sky-100 text-sky-700" },
  halloween: { card: "from-grape-100 to-orange-100 ring-grape-200/60", chip: "bg-grape-100 text-grape-deep" },
  loykrathong: { card: "from-indigo-50 to-amber-50 ring-indigo-200/60", chip: "bg-indigo-100 text-indigo-700" },
  father: { card: "from-sky-50 to-amber-50 ring-sky-200/60", chip: "bg-sky-100 text-sky-700" },
  christmas: { card: "from-rose-50 to-emerald-50 ring-emerald-200/60", chip: "bg-emerald-100 text-emerald-700" },
  nye: { card: "from-grape-100 to-amber-100 ring-grape-200/60", chip: "bg-grape-100 text-grape-deep" },
  special: { card: "from-grape-50 to-blossom-50 ring-grape-200/60", chip: "bg-grape-100 text-grape-deep" },
};

type Status =
  | { kind: "upcoming"; days: number }
  | { kind: "today" }
  | { kind: "ended" }
  | { kind: "ongoing" };

function statusFor(now: Date, month: number, day: number): Status {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(now.getFullYear(), month - 1, day);
  const diff = Math.round((target.getTime() - today.getTime()) / 86400000);
  if (diff === 0) return { kind: "today" };
  if (diff > 0) return { kind: "upcoming", days: diff };
  return { kind: "ended" };
}

export default function PromoCampaigns() {
  // คำนวณหลัง mount เพื่อกัน hydration mismatch (server/client คนละวัน)
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {PROMO_CAMPAIGNS.map((p) => {
        const status: Status | null = p.ongoing
          ? { kind: "ongoing" }
          : now && p.month != null && p.day != null
            ? statusFor(now, p.month, p.day)
            : null;
        const ended = status?.kind === "ended";
        const t = THEME[p.theme];
        return (
          <Link
            key={p.id}
            href={`/promotions/${p.id}`}
            className={`hover-lift relative flex flex-col rounded-3xl bg-gradient-to-br ${t.card} p-6 shadow-card ring-1 transition ${
              ended ? "opacity-60 grayscale" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-4xl">{p.emoji}</span>
              {status?.kind === "today" && (
                <span className="rounded-full bg-blossom-500 px-3 py-1 text-[11px] font-bold text-white shadow-soft">
                  🎉 วันนี้เท่านั้น!
                </span>
              )}
              {status?.kind === "upcoming" && (
                <span className="rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-ink/70">
                  อีก {status.days} วัน
                </span>
              )}
              {status?.kind === "ended" && (
                <span className="rounded-full bg-ink/15 px-3 py-1 text-[11px] font-bold text-ink/70">
                  หมดเขตแล้ว · Ended
                </span>
              )}
              {status?.kind === "ongoing" && (
                <span className="rounded-full bg-grape-deep px-3 py-1 text-[11px] font-bold text-white">
                  ช่วงนี้เท่านั้น
                </span>
              )}
            </div>

            <h3 className="font-display mt-3 text-xl font-bold text-ink">
              {p.titleTh}{" "}
              <span className="text-sm font-medium text-ink/45">{p.titleEn}</span>
            </h3>
            <p className="mt-1 text-sm font-medium italic text-ink/70">{p.slogan}</p>

            {p.points && (
              <ul className="mt-3 space-y-1.5 text-sm text-ink/75">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2">
                    <span className="text-blossom-500">✓</span>
                    {pt}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-auto flex flex-wrap items-center gap-2 pt-4 text-xs">
              {p.ongoing ? (
                <span className={`rounded-full px-2.5 py-1 font-semibold ${t.chip}`}>
                  🧋 โปรโมชั่นพิเศษช่วงนี้
                </span>
              ) : (
                <>
                  <span className={`rounded-full px-2.5 py-1 font-semibold ${t.chip}`}>
                    📅 {p.day} {THAI_MONTHS[p.month! - 1]}
                  </span>
                  <span className="text-ink/50">⏰ วันเดียวเท่านั้น!</span>
                </>
              )}
            </div>

            {(p.steps || p.activityTitle) && (
              <span className="mt-3 inline-flex w-fit items-center gap-1 text-xs font-semibold text-grape-deep">
                ดูรายละเอียด / กติกา →
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
