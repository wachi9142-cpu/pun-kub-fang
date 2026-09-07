import { BookOpen } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import SmoothieCup from "@/components/SmoothieCup";
import { MENU_ITEMS } from "@/data/site";

export default function About() {
  return (
    <section id="about" className="py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 rounded-[2.25rem] bg-white/70 p-6 shadow-card ring-1 ring-white/70 sm:p-10 lg:grid-cols-[280px_minmax(0,1fr)_240px]">
          {/* ภาพแก้ว */}
          <div className="relative grid place-items-center">
            <div className="absolute inset-0 m-auto h-52 w-52 rounded-full bg-gradient-to-br from-grape-200 to-blossom-200 blur-md" />
            <div className="relative animate-floaty-slow">
              <SmoothieCup palette={MENU_ITEMS[5].palette} emoji={MENU_ITEMS[5].emoji} size={190} />
            </div>
            <span className="absolute bottom-2 left-2 text-4xl">🍇</span>
          </div>

          {/* ข้อความ */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-grape-100 px-4 py-1.5 text-sm font-semibold text-grape-600">
              เกี่ยวกับร้าน 💜
            </span>
            <h2 className="font-display mt-4 text-3xl font-bold text-grape-700 sm:text-4xl">
              รู้จักร้าน{" "}
              <span className="text-grape-600">ปั่นกับฟ่าง</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-grape-600 lg:mx-0">
              เราใส่ใจในทุกแก้ว คัดสรรผลไม้สด คุณภาพดี ปั่นสดใหม่ทุกออร์เดอร์
              ไม่ใส่วัตถุกันเสีย เพื่อให้คุณได้ดื่มน้ำปั่นที่อร่อย สดชื่น และปลอดภัยที่สุด
              ขอบคุณที่ให้ <span className="font-semibold text-grape-700">“ปั่นกับฟ่าง”</span>{" "}
              ได้เป็นส่วนหนึ่งในวันของคุณนะคะ 💜
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
              {[
                { k: "10,000+", v: "แก้วที่ส่งมอบความสดชื่น" },
                { k: "4.9★", v: "คะแนนรีวิวเฉลี่ย" },
                { k: "20+", v: "เมนูให้เลือกสรร" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="rounded-2xl bg-grape-50 px-4 py-3 text-center"
                >
                  <div className="font-display text-xl font-bold text-grape-700">
                    {s.k}
                  </div>
                  <div className="text-xs text-grape-400">{s.v}</div>
                </div>
              ))}
            </div>

            <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-grape-600 px-6 py-3 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-grape-700">
              <BookOpen size={16} />
              อ่านเพิ่มเติม
            </button>
          </div>

          {/* มาสคอต */}
          <div className="hidden justify-center lg:flex">
            <div className="grid place-items-center rounded-full bg-gradient-to-br from-grape-100 to-blossom-100 p-4">
              <BrandLogo size={190} withCat />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
