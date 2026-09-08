"use client";

import { useEffect, useState } from "react";
import SmoothieCup from "@/components/SmoothieCup";
import type { SmoothiePalette } from "@/data/site";

type Emo = { emoji: string; label: string };

type Props = {
  method: string; // "blend" | "noblend" (อื่น ๆ = ปั่น)
  ingredients: Emo[];
  toppings: Emo[];
  palette: SmoothiePalette;
  onDone: () => void;
};

const MAGIC_SPARKS = ["✨", "💜", "⭐", "💫", "✨", "🌟"];

/* แก้วเสร็จโทนเมจิก: เรืองแสง + วงประกายหมุน + เด้ง (ใช้ทั้งปั่น/ไม่ปั่น) */
function MagicServeCup({
  palette,
  children,
}: {
  palette: SmoothiePalette;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative grid h-full w-full place-items-center">
      {/* เรืองแสง */}
      <div className="animate-magic-glow absolute h-36 w-36 rounded-full bg-blossom-300 blur-2xl" />
      {/* วงประกายหมุนรอบแก้ว */}
      <div className="animate-magic-ring pointer-events-none absolute h-[176px] w-[176px]">
        {MAGIC_SPARKS.map((s, i) => {
          const a = (i / MAGIC_SPARKS.length) * Math.PI * 2;
          const r = 84;
          return (
            <span
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `calc(50% + ${Math.cos(a) * r}px)`,
                top: `calc(50% + ${Math.sin(a) * r}px)`,
              }}
            >
              <span
                className="animate-twinkle inline-block text-base"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {s}
              </span>
            </span>
          );
        })}
      </div>
      {/* แก้ว */}
      <div className="animate-serve-pop relative z-10">
        <SmoothieCup palette={palette} emoji="🥤" size={150} />
      </div>
      {children}
    </div>
  );
}

/* ---------- โหมดปั่น: วัตถุดิบตกเข้าโถ → วนปั่น → แก้ว → ท็อปปิ้ง ---------- */
type BlendPhase = "drop" | "spin" | "reveal" | "topping" | "done";

function BlendStage({
  ingredients,
  toppings,
  palette,
  setStatus,
  onDone,
}: {
  ingredients: Emo[];
  toppings: Emo[];
  palette: SmoothiePalette;
  setStatus: (s: string) => void;
  onDone: () => void;
}) {
  const [phase, setPhase] = useState<BlendPhase>("drop");
  const hasTopping = toppings.length > 0;

  useEffect(() => {
    const seq: [BlendPhase, number][] = [
      ["drop", 0],
      ["spin", 1000],
      ["reveal", 2100],
      ...(hasTopping ? ([["topping", 2600]] as [BlendPhase, number][]) : []),
      ["done", hasTopping ? 3100 : 2600],
    ];
    const timers = seq.map(([p, at]) => window.setTimeout(() => setPhase(p), at));
    const end = window.setTimeout(onDone, (hasTopping ? 3100 : 2600) + 1050);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(end);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setStatus(
      phase === "drop"
        ? "🧺 กำลังใส่วัตถุดิบ..."
        : phase === "spin"
          ? "🌀 กำลังปั่น..."
          : phase === "topping"
            ? "🧋 เติมท็อปปิ้ง..."
            : phase === "done"
              ? "🥤 ปั่นเสร็จแล้ว! แก้วนี้เป็นของคุณ 💜"
              : "🥤 เกือบเสร็จแล้ว...",
    );
  }, [phase, setStatus]);

  const spinning = phase === "spin";
  const showCup = phase === "reveal" || phase === "topping" || phase === "done";
  const shown = ingredients.slice(0, 9);

  if (showCup) {
    return (
      <MagicServeCup palette={palette}>
        {/* ท็อปปิ้งหล่นลงบนแก้ว */}
        {(phase === "topping" || phase === "done") && (
          <div className="absolute left-1/2 top-6 z-20 flex -translate-x-1/2 gap-1.5">
            {toppings.slice(0, 5).map((t, i) => (
              <span
                key={i}
                className="animate-mix-fall text-xl"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                {t.emoji}
              </span>
            ))}
          </div>
        )}
      </MagicServeCup>
    );
  }

  return (
    <div className="relative h-full w-full">
      {/* ฝาโถ */}
      <div className="absolute left-1/2 top-3 h-4 w-[116px] -translate-x-1/2 rounded-full bg-grape-400 shadow" />
      {/* โถปั่น (โทนม่วง — ต่างจากโถแก้วใสของตักสด) */}
      <div
        className={`absolute bottom-4 left-1/2 h-[152px] w-[132px] -translate-x-1/2 overflow-hidden rounded-b-[42px] rounded-t-2xl bg-gradient-to-b from-grape-100 to-grape-200 shadow-card ring-4 ring-grape-300 ${
          spinning ? "animate-blend-shake" : ""
        }`}
      >
        {/* ของเหลว */}
        <div
          className="absolute inset-x-0 bottom-0 transition-[height] duration-500"
          style={{
            height: `${Math.min(70, 24 + shown.length * 6)}%`,
            background: palette.bottom,
            opacity: 0.9,
          }}
        />
        {/* กลุ่มวัตถุดิบ */}
        <div
          className={`absolute inset-0 flex flex-wrap content-center items-center justify-center gap-1 p-3 ${
            spinning ? "animate-blend-swirl blur-[1.5px]" : ""
          }`}
        >
          {shown.map((it, i) => (
            <span
              key={i}
              className={spinning ? "" : "animate-mix-fall"}
              style={{ animationDelay: spinning ? "0s" : `${i * 0.13}s` }}
            >
              <span className="text-xl">{it.emoji}</span>
            </span>
          ))}
        </div>
      </div>
      {/* ฐานเครื่องปั่น */}
      <div className="absolute bottom-0 left-1/2 h-4 w-[92px] -translate-x-1/2 rounded-b-xl rounded-t-md bg-grape-deep" />
    </div>
  );
}

/* ---------- โหมดไม่ปั่น: หมอก + นาฬิกาชง → ปุ๊ง! → เผยแก้ว ---------- */
type BrewPhase = "mist" | "brew" | "pop" | "reveal" | "done";

function BrewStage({
  palette,
  setStatus,
  onDone,
}: {
  palette: SmoothiePalette;
  setStatus: (s: string) => void;
  onDone: () => void;
}) {
  const [phase, setPhase] = useState<BrewPhase>("mist");

  useEffect(() => {
    const seq: [BrewPhase, number][] = [
      ["mist", 0],
      ["brew", 850],
      ["pop", 1950],
      ["reveal", 2300],
      ["done", 2850],
    ];
    const timers = seq.map(([p, at]) => window.setTimeout(() => setPhase(p), at));
    const end = window.setTimeout(onDone, 3900);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(end);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setStatus(
      phase === "mist"
        ? "🔮 กำลังชง..."
        : phase === "brew"
          ? "⏳ ปรุงให้เข้ากัน..."
          : phase === "pop"
            ? "✨ ปุ๊ง!"
            : phase === "done"
              ? "✨ แก้วของคุณพร้อมแล้ว!"
              : "🪄 เผยแก้ว...",
    );
  }, [phase, setStatus]);

  const brewing = phase === "mist" || phase === "brew";
  const revealed = phase === "reveal" || phase === "done";
  const fogVisible = brewing || phase === "pop";

  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden">
      {/* แก้วสำเร็จ (โทนเมจิก) */}
      {revealed && <MagicServeCup palette={palette} />}

      {/* แก้วเปล่า + นาฬิกา ระหว่างชง */}
      {brewing && (
        <div className="relative grid place-items-center">
          <div className="h-[130px] w-[96px] rounded-b-[34px] rounded-t-xl border-4 border-grape-200 bg-white/40" />
          {/* นาฬิกาชง */}
          <svg viewBox="0 0 60 60" className="absolute h-14 w-14">
            <circle cx="30" cy="30" r="24" fill="#ffffff" stroke="#7b4ab8" strokeWidth="3" />
            <g
              style={{ transformOrigin: "30px 30px" }}
              className="animate-spin-soft"
              // เดินเร็วขึ้นตอน brew
            >
              <line x1="30" y1="30" x2="30" y2="13" stroke="#7b4ab8" strokeWidth="3" strokeLinecap="round" />
            </g>
            <g style={{ transformOrigin: "30px 30px" }} className="animate-spin-soft" >
              <line x1="30" y1="30" x2="43" y2="30" stroke="#c9b3e8" strokeWidth="2.5" strokeLinecap="round" />
            </g>
            <circle cx="30" cy="30" r="3" fill="#5f339c" />
          </svg>
        </div>
      )}

      {/* หมอก/ไอ */}
      {fogVisible && (
        <div className="pointer-events-none absolute inset-0">
          {[
            "left-2 top-6", "right-3 top-10", "left-8 bottom-8",
            "right-8 bottom-6", "left-1/2 top-2", "left-1/3 bottom-1/3",
          ].map((pos, i) => (
            <span
              key={i}
              className={`animate-fog-pulse absolute rounded-full bg-sky-100 blur-md ${pos} ${
                phase === "brew" || phase === "pop" ? "h-14 w-14 opacity-90" : "h-10 w-10"
              }`}
              style={{ animationDelay: `${(i % 3) * 0.3}s` }}
            />
          ))}
        </div>
      )}

      {/* ประกายปุ๊ง! */}
      {phase === "pop" && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <span className="animate-mix-burst text-6xl">✨</span>
        </div>
      )}
    </div>
  );
}

export default function MixBrewAnimation({
  method,
  ingredients,
  toppings,
  palette,
  onDone,
}: Props) {
  const [status, setStatus] = useState("");
  const isBrew = method === "noblend";

  return (
    <div className="fixed inset-0 z-[105] grid place-items-center bg-ink/55 p-4 backdrop-blur-sm">
      <div className="animate-pop-in w-full max-w-[300px] rounded-3xl bg-white p-6 text-center shadow-card">
        <div className="relative mx-auto h-[230px] w-[200px] select-none">
          {isBrew ? (
            <BrewStage palette={palette} setStatus={setStatus} onDone={onDone} />
          ) : (
            <BlendStage
              ingredients={ingredients}
              toppings={toppings}
              palette={palette}
              setStatus={setStatus}
              onDone={onDone}
            />
          )}
        </div>
        <p className="animate-pop-in mt-1 text-sm font-bold text-grape-700">{status}</p>
      </div>
    </div>
  );
}
