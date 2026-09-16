"use client";

import { useState } from "react";
import SandwichCharacter, {
  type SandwichMood,
} from "@/components/SandwichCharacter";

/**
 * 🥪 SandwichHero — หัวหมวด "แซนด์วิช" คอนเซปต์ "แซนด์วิชสด ๆ ไส้แน่น ขนมปังนุ่ม ทำใหม่ พร้อมกิน"
 * น้องแซนด์วิช 3 ตัว = 3 กลุ่ม (คาว / ผลไม้ครีมสด / แยม) · พื้น Cream + Warm Beige + Purple
 * มีเศษขนมปัง ดาว หัวใจ วัตถุดิบเล็ก ๆ ลอยเบา ๆ · กดน้องแซนด์วิชแล้วดีใจ
 */
export default function SandwichHero() {
  const [mood, setMood] = useState<Record<string, SandwichMood>>({});
  const cheer = (k: string) => {
    setMood((m) => ({ ...m, [k]: "happy" }));
    window.setTimeout(() => setMood((m) => ({ ...m, [k]: "idle" })), 1200);
  };
  return (
    <div className="relative mb-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#fff1d6] via-[#f6e6d2] to-grape-100 px-6 py-8 ring-1 ring-white/80 sm:px-10 lg:py-10">
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#f5c400]/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-[#e5194f]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 -top-8 h-80 w-80 rounded-full bg-grape-300/40 blur-3xl" />
      {/* 🍞 เศษขนมปัง / ดาว / หัวใจ / วัตถุดิบเล็ก ๆ */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {[
          ["🍞", "6%", "18%", "0s"],
          ["⭐", "14%", "72%", "1.2s"],
          ["💜", "46%", "10%", "0.6s"],
          ["🧀", "64%", "80%", "2s"],
          ["🍓", "88%", "22%", "1.6s"],
          ["✨", "92%", "70%", "0.3s"],
          ["🥬", "30%", "84%", "2.4s"],
          ["🫐", "74%", "8%", "0.9s"],
        ].map(([e, l, t, d], i) => (
          <span
            key={i}
            className="animate-floaty absolute text-lg opacity-70 sm:text-xl"
            style={{ left: l, top: t, animationDelay: d }}
          >
            {e}
          </span>
        ))}
        {[
          ["10%", "40%"],
          ["24%", "30%"],
          ["80%", "46%"],
          ["70%", "34%"],
          ["52%", "90%"],
        ].map(([l, t], i) => (
          <span
            key={`d${i}`}
            className="absolute h-2 w-2 rounded-full bg-grape-300/60"
            style={{ left: l, top: t }}
          />
        ))}
      </div>

      <div className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_480px]">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-[#8a5a3c] ring-1 ring-[#e9cfa5]">
            🥪 ทำใหม่ ไส้แน่น ขนมปังนุ่ม พร้อมกิน ✨
          </span>
          <h1 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
            แซนด์วิช
          </h1>
          <p className="font-display mt-1 text-lg font-semibold text-blossom-400">
            Sandwiches
          </p>
          <p className="mx-auto mt-3 max-w-xl text-ink/65 lg:mx-0">
            เหมือนโต๊ะอาหารเช้าที่บ้าน — ไส้คาวแฮมชีส ปูอัด ทูน่า ·
            ผลไม้ครีมสดสตรอว์เบอร์รี กีวี องุ่นไชน์มัสแคท · แยมสตรอว์เบอร์รี
            ช็อกโกแลต สังขยาใบเตย เลือกอร่อยได้ตามใจ 💜
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5 lg:justify-start">
            {[
              ["🥪 ไส้คาว", "#f5b7c8"],
              ["🍓 ผลไม้ครีมสด", "#e5194f"],
              ["🍯 แยม / สเปรด", "#e08a3a"],
              ["🍫 ช็อกโกแลต", "#5c3a2a"],
              ["🌿 สังขยาใบเตย", "#5cb52e"],
            ].map(([t, c]) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-ink ring-1 ring-ink/5"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full ring-1 ring-white"
                  style={{ background: c }}
                />
                {t}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink/45">
            แตะน้องแซนด์วิชดูสิ ดีใจทุกตัวเลย 🥪✨
          </p>
        </div>

        {/* 🥪 น้องแซนด์วิช 3 ตัว (3 กลุ่ม) — วางเรียงเหลื่อมกัน */}
        <div className="order-first flex items-end justify-center gap-0 lg:order-none">
          <button
            type="button"
            onClick={() => cheer("savory")}
            className="-mr-6 translate-y-2 sm:-mr-8"
            aria-label="แซนด์วิชไส้คาว"
          >
            <SandwichCharacter
              filling="savory"
              mood={mood.savory ?? "idle"}
              size={120}
              className="sm:!h-[150px] sm:!w-[150px]"
            />
          </button>
          <button
            type="button"
            onClick={() => cheer("fruit")}
            className="relative z-10"
            aria-label="แซนด์วิชผลไม้ครีมสด"
          >
            <SandwichCharacter
              filling="fruit"
              mood={mood.fruit ?? "idle"}
              size={160}
              className="sm:!h-[210px] sm:!w-[210px]"
            />
          </button>
          <button
            type="button"
            onClick={() => cheer("jam")}
            className="-ml-6 translate-y-2 sm:-ml-8"
            aria-label="แซนด์วิชแยม"
          >
            <SandwichCharacter
              filling="jam"
              mood={mood.jam ?? "idle"}
              size={120}
              className="sm:!h-[150px] sm:!w-[150px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
