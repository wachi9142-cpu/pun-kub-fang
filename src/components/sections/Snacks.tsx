"use client";

import ImageLightbox from "@/components/ImageLightbox";

import { useState } from "react";
import { Heart, Plus } from "lucide-react";
import { SNACK_GROUPS, type SnackItem } from "@/data/site";
import { useCart } from "@/components/cart/CartContext";
import SandwichCharacter, {
  fillingOf,
  type SandwichMood,
} from "@/components/SandwichCharacter";
import AddToCartFx from "@/components/AddToCartFx";

export function SnackCard({ item }: { item: SnackItem }) {
  const { addItem, openCart, showToast } = useCart();
  const [liked, setLiked] = useState(false);
  /* 🥪 แซนด์วิช: ใช้น้องแซนด์วิชแทน placeholder + ดีใจ + บินเข้าตะกร้า */
  const isSandwich = item.id.startsWith("sw-");
  const [mood, setMood] = useState<SandwichMood>("idle");
  const [zoom, setZoom] = useState(false);
  const [flying, setFlying] = useState(false);

  const add = () => {
    addItem({
      id: `${item.id}-${Date.now()}`,
      name: item.nameTh,
      price: item.price,
    });
    if (isSandwich) {
      setMood("happy");
      setFlying(true);
      return;
    }
    openCart();
  };
  const finishFly = () => {
    setFlying(false);
    setMood("idle");
    showToast({
      emoji: "🥪",
      name: item.nameTh,
      title: "🥪 เพิ่มแซนด์วิชแล้ว! พร้อมอร่อย ✨",
    });
  };

  return (
    <article className="hover-lift group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white/85 p-4 shadow-card ring-1 ring-white/70">
      {flying && (
        <AddToCartFx
          variant="sandwich"
          palette={{ foam: "#fff3d6", top: "#f5dfae", bottom: "#e3a85a" }}
          emoji="🥪"
          onDone={finishFly}
        />
      )}
      {item.badge && (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-blossom-500 px-2.5 py-1 text-[11px] font-bold text-white shadow">
          {item.badge}
        </span>
      )}
      <button
        onClick={() => setLiked((v) => !v)}
        aria-label="ถูกใจ"
        className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-blossom-400 shadow transition-transform hover:scale-110"
      >
        <Heart size={16} fill={liked ? "#7b4ab8" : "transparent"} />
      </button>

      {/* พื้นที่รูปสินค้า (placeholder ถ้ายังไม่มีรูป) */}
      <div className="grid h-40 place-items-center overflow-hidden rounded-2xl bg-gradient-to-b from-amber-50 to-blossom-50/60">
        {item.image ? (
          <button
            type="button"
            onClick={() => setZoom(true)}
            aria-label={`ดูรูป ${item.nameTh} เต็มจอ`}
            className="h-full w-full cursor-zoom-in"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.nameTh}
              className="h-full w-full object-contain p-1 transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ) : isSandwich ? (
          <SandwichCharacter
            filling={fillingOf(item.id)}
            mood={mood}
            size={140}
            interactive
          />
        ) : (
          <span className="flex flex-col items-center gap-1 text-6xl transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
            {item.emoji}
            <span className="text-[10px] font-medium text-ink/35">
              รูปเร็ว ๆ นี้
            </span>
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        {/* เว้นบรรทัดคงที่: ชื่อไทย 1 · ชื่ออังกฤษ 1 · คำอธิบาย 2 → ปุ่มทุกการ์ดอยู่ระดับเดียวกัน */}
        <h3 className="font-display truncate text-base font-semibold leading-snug text-grape-700">
          {item.nameTh}
        </h3>
        <p className="h-4 truncate text-[11px] font-medium leading-4 text-grape-400">
          {item.nameEn || " "}
        </p>
        <p className="mt-0.5 line-clamp-2 h-8 text-xs leading-4 text-grape-400">
          {item.desc}
        </p>

        <div className="mt-auto flex items-end justify-between pt-3">
          <span className="flex items-baseline gap-1.5">
            {item.oldPrice && (
              <span className="text-xs font-medium text-grape-400 line-through">
                {item.oldPrice}
              </span>
            )}
            <span className="font-display text-xl font-bold text-blossom-500">
              {item.price}
            </span>
          </span>
        </div>

        <button
          onClick={add}
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-grape-100 py-2.5 text-sm font-semibold text-grape-700 transition-all hover:bg-grape-600 hover:text-white"
        >
          <Plus size={16} /> เพิ่มลงตะกร้า
        </button>
      </div>
      {zoom && item.image && (
        <ImageLightbox
          src={item.image}
          alt={item.nameTh}
          onClose={() => setZoom(false)}
        />
      )}
    </article>
  );
}

export default function Snacks() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          🍪 ขนมกินเพลิน{" "}
          <span className="text-blossom-400">| Snacks &amp; Bakery</span>
        </h1>
        <p className="mt-2 text-ink/60">ของกินเล่น จับคู่กับแก้วโปรด 💜</p>
      </div>

      <div className="space-y-10">
        {SNACK_GROUPS.map((group) => (
          <div key={group.id}>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-amber-100 text-xl">
                {group.emoji}
              </span>
              <div className="leading-tight">
                <h2 className="font-display text-lg font-bold text-ink">
                  {group.titleTh}
                </h2>
                <p className="text-[11px] font-medium uppercase tracking-wide text-ink/45">
                  {group.titleEn}
                  {group.note && (
                    <span className="ml-1 normal-case text-ink/40">
                      · {group.note}
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
              {group.items.map((item) => (
                <SnackCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
