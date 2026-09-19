"use client";

import { useState } from "react";
import { Check, LoaderCircle, Send, ShoppingCart, Sparkles } from "lucide-react";
import SmoothieCup from "@/components/SmoothieCup";
import { useCart } from "@/components/cart/CartContext";
import {
  requestDrinkRecommendations,
  type DrinkRecommendations,
  type RecommendationMix,
} from "@/lib/api";

const EXAMPLES = [
  "อยากกินอะไรดีดๆ วิ่งๆ ราคาไม่เกิน 50",
  "อยากได้เปรี้ยวสดชื่น ไม่เอานม งบ 45",
  "วันนี้เหนื่อย อยากได้หวานน้อย หอมชา",
];

export default function AIRecommendationHero() {
  const { addItem, openCart, showToast } = useCart();
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<DrinkRecommendations | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (value = prompt) => {
    const text = value.trim();
    if (text.length < 3 || loading) return;
    setPrompt(text);
    setLoading(true);
    setError("");
    try {
      setResult(await requestDrinkRecommendations(text));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "ระบบแนะนำติดขัด ลองใหม่อีกครั้งนะ");
    } finally {
      setLoading(false);
    }
  };

  const addMix = (mix: RecommendationMix) => {
    const options = [
      `ฐาน: ${mix.base.label}`,
      ...(mix.syrups.length ? [`ไซรัป: ${mix.syrups.map((item) => item.label).join(", ")}`] : []),
      ...(mix.topping ? [`ท็อปปิ้ง: ${mix.topping.nameTh}`] : []),
      "🌀 ปั่น",
    ];
    addItem({ id: `ai-${mix.id}`, name: `${mix.name} (ฟ่างจัดให้)`, price: mix.price, options });
    showToast({ emoji: mix.base.emoji, name: mix.name, title: "เพิ่มแก้วแนะนำแล้ว!" });
    openCart();
  };

  const addProduct = (item: DrinkRecommendations["products"][number]) => {
    addItem({ id: item.id, name: item.name, price: item.price });
    showToast({ emoji: item.emoji, name: item.name, title: "เพิ่มเมนูแนะนำแล้ว!" });
    openCart();
  };

  return (
    <section className="relative overflow-hidden border-b border-grape-100 bg-gradient-to-br from-[#fff8fc] via-[#f8f1ff] to-[#fff4e8] px-4 py-8 sm:px-6 sm:py-12">
      <div className="pointer-events-none absolute -left-16 top-2 h-48 w-48 rounded-full bg-blossom-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 bottom-0 h-52 w-52 rounded-full bg-grape-200/45 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-grape-700 shadow-soft ring-1 ring-grape-100">
            <Sparkles size={16} className="text-blossom-500" /> ฟ่างจัดแก้วให้ด้วย AI
          </span>
          <h1 className="font-display mt-4 text-3xl font-bold text-grape-800 sm:text-5xl">
            วันนี้อยากกินอะไร <span className="text-blossom-500">บอกฟ่างมาเลย</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-grape-500 sm:text-base">
            พิมพ์อารมณ์ รสชาติ งบ หรือสิ่งที่ไม่ชอบ ฟ่างจะคิดหลายรอบแล้วจัดให้ 3 สูตรมิกซ์ + 3 เมนูจากร้าน
          </p>
          <form
            onSubmit={(event) => { event.preventDefault(); void submit(); }}
            className="mx-auto mt-6 flex max-w-3xl items-center gap-2 rounded-[1.75rem] bg-white p-2 shadow-card ring-1 ring-grape-100"
          >
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void submit();
                }
              }}
              rows={2}
              maxLength={500}
              placeholder="เช่น อยากกินอะไรดีดๆ วิ่งๆ ราคาไม่เกิน 50"
              className="min-h-14 flex-1 resize-none rounded-2xl bg-grape-50/60 px-4 py-3 text-sm text-ink outline-none placeholder:text-grape-300 focus:ring-2 focus:ring-grape-300"
            />
            <button
              type="submit"
              disabled={loading || prompt.trim().length < 3}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-r from-grape-600 to-blossom-500 text-white shadow-soft transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="ให้ฟ่างแนะนำ"
            >
              {loading ? <LoaderCircle size={20} className="animate-spin" /> : <Send size={19} />}
            </button>
          </form>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {EXAMPLES.map((example) => (
              <button key={example} type="button" onClick={() => void submit(example)} disabled={loading} className="rounded-full bg-white/75 px-3 py-1.5 text-xs text-grape-600 ring-1 ring-grape-100 transition-colors hover:bg-white">
                {example}
              </button>
            ))}
          </div>
          {loading && <p className="mt-5 animate-pulse text-sm font-medium text-grape-600">กำลังตีความ → ออกแบบสูตร → คัดเมนู → ตรวจทาน…</p>}
          {error && <p role="alert" className="mx-auto mt-5 max-w-2xl rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600 ring-1 ring-red-100">{error}</p>}
        </div>

        {result && !loading && (
          <div className="mt-9 animate-fade-in">
            <div className="mx-auto max-w-3xl rounded-2xl bg-white/80 px-5 py-4 text-center shadow-soft ring-1 ring-grape-100">
              <p className="font-display font-semibold text-grape-700">ฟ่างเข้าใจว่า: {result.interpretation.summary}</p>
              <p className="mt-1 text-sm text-ink/60">{result.summary}</p>
            </div>

            <RecommendationGroup title="สูตรมิกซ์ที่ฟ่างออกแบบ" subtitle="ราคาและส่วนผสมตรวจจากร้านแล้ว">
              {result.mixes.map((mix) => (
                <article key={mix.id} className="flex flex-col rounded-3xl bg-white p-5 shadow-card ring-1 ring-grape-100">
                  <div className="grid h-36 place-items-center rounded-2xl bg-grape-50/70">
                    <SmoothieCup palette={mix.palette} emoji={mix.syrups[0]?.emoji ?? mix.base.emoji} size={112} />
                  </div>
                  <h3 className="font-display mt-4 text-lg font-bold text-grape-700">{mix.name}</h3>
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-ink/55">{mix.reason}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] text-grape-600">
                    <span className="rounded-full bg-grape-50 px-2 py-1">{mix.base.label}</span>
                    {mix.syrups.map((item) => <span key={item.id} className="rounded-full bg-blossom-50 px-2 py-1">{item.label}</span>)}
                    {mix.topping && <span className="rounded-full bg-amber-50 px-2 py-1">{mix.topping.nameTh}</span>}
                  </div>
                  <AddButton price={mix.price} onClick={() => addMix(mix)} />
                </article>
              ))}
            </RecommendationGroup>

            <RecommendationGroup title="เมนูสำเร็จที่ตรงใจ" subtitle="เลือกจากเมนูที่เปิดขายและอยู่ในงบ">
              {result.products.map((item) => (
                <article key={item.id} className="flex flex-col rounded-3xl bg-white p-5 shadow-card ring-1 ring-grape-100">
                  <div className="grid h-36 place-items-center overflow-hidden rounded-2xl bg-grape-50/70">
                    {item.image ? <img src={item.image} alt={item.name} className="h-full w-full object-cover" /> : <span className="text-6xl">{item.emoji}</span>}
                  </div>
                  <h3 className="font-display mt-4 text-lg font-bold text-grape-700">{item.name}</h3>
                  <p className="mt-1 text-xs text-grape-400">{item.tagline}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/55">{item.reason}</p>
                  <AddButton price={item.price} onClick={() => addProduct(item)} />
                </article>
              ))}
            </RecommendationGroup>

            <details className="mx-auto mt-5 max-w-3xl text-center text-xs text-ink/45">
              <summary className="cursor-pointer">AI คิดอย่างไรบ้าง?</summary>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {result.meta.steps.map((step) => <span key={step.step} className="rounded-full bg-white px-3 py-1 ring-1 ring-grape-100"><Check size={11} className="mr-1 inline text-emerald-500" />{step.step}</span>)}
              </div>
            </details>
          </div>
        )}
      </div>
    </section>
  );
}

function RecommendationGroup({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return <div className="mt-8"><div className="mb-4 text-center"><h2 className="font-display text-2xl font-bold text-grape-700">{title}</h2><p className="mt-1 text-sm text-grape-400">{subtitle}</p></div><div className="grid gap-4 md:grid-cols-3">{children}</div></div>;
}

function AddButton({ price, onClick }: { price: number; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-grape-100 px-4 py-2.5 text-sm font-bold text-grape-700 transition-colors hover:bg-grape-600 hover:text-white"><ShoppingCart size={16} /> เพิ่มลงตะกร้า · ฿{price}</button>;
}
