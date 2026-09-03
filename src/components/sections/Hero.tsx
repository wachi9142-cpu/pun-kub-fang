"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { DRINK_CATEGORIES } from "@/data/site";
import SmoothieCup from "@/components/SmoothieCup";

const byId = (id: string) => DRINK_CATEGORIES.find((c) => c.id === id)!;

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  // แก้วโชว์ความหลากหลายของร้าน
  const fruit = byId("fruit");
  const soda = byId("soda");
  const bear = byId("bearmilk");
  const tea = byId("tea");

  return (
    <section id="home" className="relative overflow-hidden bg-[#f8f4fa]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-28 top-8 h-64 w-64 rounded-full bg-grape-300/20 blur-3xl" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-blossom-300/15 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-12 pt-10 sm:px-6 lg:grid-cols-2 lg:gap-6 lg:px-8 lg:pb-20 lg:pt-16">
        {/* ซ้าย: ข้อความ */}
        <div className="animate-pop-in text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream-white px-4 py-1.5 text-sm font-medium text-ink shadow-soft ring-1 ring-ink/5">
            <Sparkles size={15} className="text-blossom-500" /> ปั่นสด อร่อยชัวร์!
          </span>

          <h1 className="font-display mt-5 text-5xl font-bold leading-[1.05] sm:text-6xl xl:text-7xl">
            <span className="text-ink">ปั่นกับ</span>
            <span className="text-blossom-500">ฟ่าง</span>{" "}
            <span className="align-middle text-4xl sm:text-5xl">💜</span>
          </h1>

          <p className="mx-auto mt-5 max-w-md text-lg font-semibold text-ink lg:mx-0">
            อยากดื่มแบบไหน เลือกได้ในแก้วของคุณ
          </p>
          <p className="mx-auto mt-2 max-w-md text-base text-ink/60 lg:mx-0">
            เย็นก็ได้ 🧊 ปั่นก็ดี 🥤
            <br className="hidden sm:block" />
            หรือจะจับคู่รสชาติในแบบของคุณเอง ✨
          </p>

          {/* หมวดเด่น โชว์ความหลากหลาย */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
            {["ผลไม้ปั่น", "อิตาเลียนโซดา", "นมหมีปั่น", "ชาเขียว", "กาแฟ"].map(
              (label) => (
                <span
                  key={label}
                  className="rounded-full bg-cream-white px-3.5 py-1.5 text-sm font-medium text-ink shadow-soft ring-1 ring-ink/10"
                >
                  {label}
                </span>
              ),
            )}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <button
              onClick={() => scrollTo("menu")}
              className="group inline-flex items-center gap-3 rounded-full bg-grape-deep px-7 py-3.5 text-base font-semibold text-white shadow-card transition-all hover:scale-[1.03] hover:bg-[#5c2f92]"
            >
              🥤 ดูเมนู
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/25 transition-transform group-hover:translate-x-1">
                <ArrowRight size={16} />
              </span>
            </button>
            <button
              onClick={() => scrollTo("mix")}
              className="inline-flex items-center gap-2 rounded-full bg-cream-white px-7 py-3.5 text-base font-semibold text-ink shadow-soft ring-1 ring-ink/70 transition-all hover:bg-white hover:scale-[1.03]"
            >
              <Sparkles size={17} className="text-blossom-500" /> มิกซ์เองเลย
            </button>
          </div>
        </div>

        {/* ขวา: แก้วหลากหลาย */}
        <div className="relative mx-auto flex h-[340px] w-full max-w-lg items-end justify-center sm:h-[420px]">
          <div className="absolute bottom-6 h-40 w-[90%] rounded-[999px] bg-gradient-to-t from-grape-300/60 to-grape-200/20 blur-xl" />

          <div className="relative z-10 animate-floaty-slow -translate-x-1">
            <SmoothieCup palette={soda.palette} emoji="🧊" size={132} />
          </div>
          <div className="relative z-20 -mx-5 animate-floaty">
            <SmoothieCup palette={fruit.palette} emoji="🍓" size={182} />
          </div>
          <div className="relative z-10 animate-floaty-slow translate-x-1" style={{ animationDelay: "1s" }}>
            <SmoothieCup palette={bear.palette} emoji="🐻" size={140} />
          </div>
          <div className="relative z-0 -ml-4 hidden animate-floaty-slow sm:block" style={{ animationDelay: "1.6s" }}>
            <SmoothieCup palette={tea.palette} emoji="🍵" size={116} />
          </div>

          <span className="absolute left-2 top-4 animate-floaty text-3xl" style={{ animationDelay: "0.4s" }}>🍓</span>
          <span className="absolute right-4 top-12 animate-floaty-slow text-3xl" style={{ animationDelay: "0.9s" }}>🧊</span>
          <span className="absolute right-12 bottom-2 animate-floaty text-3xl" style={{ animationDelay: "1.4s" }}>🥭</span>
        </div>
      </div>
    </section>
  );
}
