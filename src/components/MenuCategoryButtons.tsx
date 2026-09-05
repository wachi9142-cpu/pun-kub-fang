import Link from "next/link";
import { MENU_SECTIONS } from "@/data/site";
import SmoothieCup from "@/components/SmoothieCup";

/** การ์ดปุ่มหมวดเมนู — กดแล้วไปหน้าหมวดนั้น (ใช้ทั้งหน้าแรกและหน้า /menu) */
export default function MenuCategoryButtons() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {MENU_SECTIONS.map((sec) => (
        <Link
          key={sec.id}
          href={sec.href}
          className="hover-lift group flex flex-col items-center gap-2 overflow-hidden rounded-3xl bg-cream-white p-5 text-center shadow-card ring-1 ring-ink/5"
        >
          <div className="grid h-28 place-items-center transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
            {sec.palette ? (
              <SmoothieCup palette={sec.palette} emoji={sec.emoji} size={92} />
            ) : (
              <span className="grid h-24 w-24 place-items-center rounded-full bg-grape-50 text-5xl">
                {sec.emoji}
              </span>
            )}
          </div>
          <span className="font-display text-base font-semibold text-ink">
            {sec.label}
          </span>
          <span className="text-[11px] font-medium uppercase tracking-wide text-ink/40">
            {sec.labelEn}
          </span>
          <span className="text-xs font-medium text-blossom-500">
            {sec.desc}
          </span>
          <span className="mt-1 rounded-full bg-grape-50 px-3.5 py-1 text-[11px] font-semibold text-grape-deep transition-colors group-hover:bg-grape-deep group-hover:text-white">
            ดูเมนู →
          </span>
        </Link>
      ))}
    </div>
  );
}
