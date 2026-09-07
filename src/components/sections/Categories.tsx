import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MenuCategoryButtons from "@/components/MenuCategoryButtons";

export default function Categories() {
  return (
    <section
      id="categories"
      className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16"
    >
      <div className="mb-8 text-center">
        <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          <span className="text-blossom-400">💜</span> วันนี้ฟ่างมีอะไรให้ฟิน?
        </h2>
        <p className="mt-2 text-ink/60">
          เลือกหมวดที่ชอบ แล้วไปเลือกเมนูกันเลย! ✨
        </p>
      </div>

      <MenuCategoryButtons />

      <div className="mt-8 text-center">
        <Link
          href="/menu"
          className="group inline-flex items-center gap-2 rounded-full bg-grape-deep px-7 py-3 text-base font-semibold text-white shadow-card transition-all hover:scale-[1.03] hover:bg-[#5c2f92]"
        >
          <ArrowLeft
            size={18}
            className="transition-transform group-hover:-translate-x-1"
          />
          กลับมาดูทั้งหมด
        </Link>
      </div>
    </section>
  );
}
