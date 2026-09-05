"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  DRINK_CATEGORIES,
  DEFAULT_HERO_DECOR,
  getActiveFestivalDecor,
} from "@/data/site";
import SmoothieCup from "@/components/SmoothieCup";

const byId = (id: string) => DRINK_CATEGORIES.find((c) => c.id === id)!;

export default function Hero() {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);

  // ✨ ของตกแต่งลอย — เปลี่ยนตามเทศกาล (คำนวณหลัง mount กัน hydration mismatch)
  const [decor, setDecor] = useState<string[]>(DEFAULT_HERO_DECOR);
  useEffect(() => {
    const f = getActiveFestivalDecor(new Date());
    if (f) setDecor(f);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  // 🍹 กด "ดูเมนู" → แก้วไหลออกนิด ๆ แล้วค่อยเปลี่ยนหน้า
  const goMenu = (e: React.MouseEvent) => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return; // ปล่อยให้ Link เปลี่ยนหน้าปกติ
    e.preventDefault();
    setLeaving(true);
    setTimeout(() => router.push("/menu"), 340);
  };

  // แก้วโชว์ความหลากหลายของร้าน — หล่นลงมาทีละใบ (stagger) แล้วลอยเบา ๆ
  const cups = [
    { palette: byId("soda").palette, emoji: "🧊", size: 132, wrap: "z-10", floaty: "animate-floaty-slow", drop: 0, float: 1.3 },
    { palette: byId("smoothie").palette, emoji: "🍓", size: 182, wrap: "z-20 -mx-5", floaty: "animate-floaty", drop: 0.14, float: 1.5 },
    { palette: byId("milk").palette, emoji: "🐻", size: 140, wrap: "z-10", floaty: "animate-floaty-slow", drop: 0.28, float: 1.9 },
    { palette: byId("drinks").palette, emoji: "🍵", size: 116, wrap: "z-0 -ml-4 hidden sm:block", floaty: "animate-floaty-slow", drop: 0.42, float: 2.3 },
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-[#f8f4fa]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-28 top-8 h-64 w-64 rounded-full bg-grape-300/20 blur-3xl" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-blossom-300/15 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-12 pt-10 sm:px-6 lg:grid-cols-2 lg:gap-6 lg:px-8 lg:pb-20 lg:pt-16">
        {/* ซ้าย: ข้อความ */}
        <div className="animate-pop-in min-w-0 text-center lg:text-left">
          <span className="shimmer inline-flex items-center gap-2 rounded-full bg-cream-white px-4 py-1.5 text-sm font-medium text-ink shadow-soft ring-1 ring-ink/5">
            <Sparkles size={15} className="animate-twinkle text-blossom-500" />{" "}
            ปั่นสด อร่อยชัวร์!
          </span>

          <h1 className="font-display mt-5 text-4xl font-bold leading-[1.05] sm:text-6xl xl:text-7xl">
            <span className="text-ink">ปั่นกับ</span>
            <span className="text-blossom-500">ฟ่าง</span>{" "}
            <span className="animate-heartbeat align-middle text-4xl sm:text-5xl">
              💜
            </span>
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
            <Link
              href="/menu"
              onClick={goMenu}
              className="group inline-flex items-center gap-3 rounded-full bg-grape-deep px-7 py-3.5 text-base font-semibold text-white shadow-card transition-all hover:scale-[1.03] hover:bg-[#5c2f92]"
            >
              🥤 ดูเมนู
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/25 transition-transform group-hover:translate-x-1">
                <ArrowRight size={16} />
              </span>
            </Link>
            <button
              onClick={() => scrollTo("mix")}
              className="shimmer inline-flex items-center gap-2 rounded-full bg-cream-white px-7 py-3.5 text-base font-semibold text-ink shadow-soft ring-1 ring-ink/70 transition-all hover:scale-[1.03] hover:bg-white"
            >
              <Sparkles size={17} className="animate-twinkle text-blossom-500" />{" "}
              มิกซ์เองเลย
            </button>
          </div>
        </div>

        {/* ขวา: แก้วหลากหลาย */}
        <div
          className={`relative mx-auto flex h-[280px] w-full min-w-0 max-w-lg items-end justify-center sm:h-[380px] lg:h-[420px] ${
            leaving ? "animate-drink-exit" : ""
          }`}
        >
          <div className="absolute bottom-6 h-40 w-[90%] rounded-[999px] bg-gradient-to-t from-grape-300/60 to-grape-200/20 blur-xl" />

          {/* ย่อกลุ่มแก้วให้พอดีจอเล็ก — กันแก้วถูกตัด/ล้น */}
          <div className="relative flex origin-bottom scale-[0.7] items-end justify-center sm:scale-90 lg:scale-100">
            {cups.map((c, i) => (
              <div
                key={i}
                className={`animate-drop-in relative ${c.wrap}`}
                style={{ animationDelay: `${c.drop}s` }}
              >
                <div
                  className={c.floaty}
                  style={{ animationDelay: `${c.float}s` }}
                >
                  <div className="cup-hover">
                    <SmoothieCup palette={c.palette} emoji={c.emoji} size={c.size} />
                  </div>
                </div>
              </div>
            ))}

            <span className="absolute left-0 top-2 animate-floaty text-3xl" style={{ animationDelay: "0.4s" }}>{decor[0]}</span>
            <span className="absolute right-2 top-10 animate-floaty-slow text-3xl" style={{ animationDelay: "0.9s" }}>{decor[1]}</span>
            <span className="absolute right-8 bottom-0 animate-floaty text-3xl" style={{ animationDelay: "1.4s" }}>{decor[2]}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
