"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import {
  TOPPING_GROUPS,
  TOPPING_IMAGES,
  type ToppingGroup,
  type ToppingItem,
} from "@/data/site";
import Portal from "@/components/Portal";

/** ป้ายราคา: ฟรี / +5 / +10 */
function PriceTag({ price, active }: { price: number; active?: boolean }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-sm font-extrabold ${
        active
          ? "bg-white/25 text-white"
          : price === 0
            ? "bg-emerald-100 text-emerald-600"
            : "bg-blossom-100 text-ink"
      }`}
    >
      {price === 0 ? "ฟรี" : `+${price}`}
    </span>
  );
}

const imgOf = (it: ToppingItem) => it.image ?? TOPPING_IMAGES[it.nameEn];

/** การ์ดท็อปปิ้งใบเล็ก: แตะรูป = ดูรายละเอียด, แตะชื่อ/ราคา = เลือก */
function ToppingCard({
  item,
  emoji,
  selected,
  onToggle,
  onDetail,
}: {
  item: ToppingItem;
  emoji: string;
  selected: boolean;
  onToggle: () => void;
  onDetail: () => void;
}) {
  const image = imgOf(item);
  return (
    <div
      style={{ backgroundColor: selected ? "#e4d7f6" : "#ffffff" }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl text-center shadow-soft transition-all duration-200 ${
        selected
          ? "scale-[1.03] ring-2 ring-grape-deep"
          : "ring-1 ring-ink/10 hover:ring-grape-300"
      }`}
    >
      {selected && (
        <span className="animate-pop-in absolute right-1.5 top-1.5 z-10 grid h-7 w-7 place-items-center rounded-full bg-[#22C55E] text-white shadow-md ring-2 ring-white">
          <Check size={18} strokeWidth={3} />
        </span>
      )}

      {/* รูป → เปิด popup รายละเอียด */}
      <button
        type="button"
        onClick={onDetail}
        aria-label={`ดูรายละเอียด ${item.nameTh}`}
        className="relative grid aspect-square w-full place-items-center overflow-hidden bg-gradient-to-b from-grape-50 to-blossom-50/60"
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={item.nameTh}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="flex flex-col items-center gap-0.5 text-3xl opacity-70">
            {emoji}
            <span className="text-[9px] font-medium text-ink/35">
              รูปเร็ว ๆ นี้
            </span>
          </span>
        )}
        <span className="absolute bottom-1 right-1 grid h-5 w-5 place-items-center rounded-full bg-white/85 text-[10px] opacity-0 shadow transition-opacity group-hover:opacity-100">
          🔍
        </span>
      </button>

      {/* ชื่อ + ราคา → เลือก/ยกเลิก */}
      <button
        type="button"
        onClick={onToggle}
        className={`flex flex-1 flex-col items-center px-1.5 py-2 transition-colors ${
          selected ? "" : "hover:bg-grape-50/60"
        }`}
      >
        <span className="line-clamp-2 text-[11px] font-semibold leading-tight text-ink">
          {item.nameTh}
        </span>
        <span className="mt-0.5 line-clamp-1 text-[9px] text-ink/45">
          {item.nameEn}
        </span>
        <span className="mt-1">
          <PriceTag price={item.price} />
        </span>
      </button>
    </div>
  );
}

/** popup รายละเอียดท็อปปิ้ง */
function ToppingDetail({
  item,
  groupTh,
  selected,
  onToggle,
  onClose,
}: {
  item: ToppingItem;
  groupTh: string;
  selected: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const image = imgOf(item);
  return (
    <Portal lockScroll={false} onEscape={onClose}>
      <div
        className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="animate-pop-in w-full max-w-xs overflow-hidden rounded-3xl bg-white shadow-card"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative grid aspect-square w-full place-items-center overflow-hidden bg-gradient-to-b from-grape-50 to-blossom-50/60">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt={item.nameTh}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-6xl opacity-70">🍧</span>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="ปิด"
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink/60 shadow hover:bg-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-5 text-center">
            <h3 className="font-display text-lg font-bold text-ink">
              {item.nameTh}
            </h3>
            <p className="text-xs text-ink/45">{item.nameEn}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">
              {item.desc ??
                `ท็อปปิ้งในหมวด ${groupTh} เพิ่มความอร่อยให้แก้วโปรดของคุณ 💜`}
            </p>
            <p className="mt-3 font-display text-2xl font-bold text-blossom-500">
              {item.price === 0 ? "ฟรี" : `+${item.price}`}
            </p>

            <button
              type="button"
              onClick={() => {
                onToggle();
                onClose();
              }}
              className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all ${
                selected
                  ? "bg-ink/10 text-ink hover:bg-ink/15"
                  : "bg-gradient-to-r from-grape-600 to-blossom-500 text-white hover:scale-[1.02]"
              }`}
            >
              {selected
                ? "✓ เลือกแล้ว · แตะเพื่อเอาออก"
                : "เลือกท็อปปิ้งนี้ 🧋"}
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default function ToppingSelector({
  groups = TOPPING_GROUPS,
  selected,
  onToggle,
}: {
  /** กลุ่มท็อปปิ้ง (ค่าเริ่มต้น = TOPPING_GROUPS) */
  groups?: ToppingGroup[];
  /** รายการที่เลือก (เก็บด้วย nameEn) */
  selected: string[];
  onToggle: (nameEn: string) => void;
}) {
  const [detail, setDetail] = useState<{
    item: ToppingItem;
    groupTh: string;
  } | null>(null);

  return (
    <div className="space-y-5">
      {groups.map((g) => (
        <div key={g.id}>
          <p className="mb-2 text-xs font-semibold text-ink/55">
            {g.emoji} {g.titleTh}{" "}
            <span className="font-medium text-ink/35">{g.titleEn}</span>
          </p>
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-5">
            {g.items.map((it) => (
              <ToppingCard
                key={it.nameEn}
                item={it}
                emoji={g.emoji}
                selected={selected.includes(it.nameEn)}
                onToggle={() => onToggle(it.nameEn)}
                onDetail={() => setDetail({ item: it, groupTh: g.titleTh })}
              />
            ))}
          </div>

          {g.note && (
            <div className="mt-2.5 rounded-xl bg-amber-50 p-2.5 text-[11px] leading-relaxed text-amber-900/80 ring-1 ring-amber-200/70">
              <span className="font-semibold text-amber-900">
                📌 หมายเหตุ:{" "}
              </span>
              {g.note}
              {g.noteEn && (
                <span className="mt-0.5 block italic text-amber-900/60">
                  {g.noteEn}
                </span>
              )}
            </div>
          )}
        </div>
      ))}

      {detail && (
        <ToppingDetail
          item={detail.item}
          groupTh={detail.groupTh}
          selected={selected.includes(detail.item.nameEn)}
          onToggle={() => onToggle(detail.item.nameEn)}
          onClose={() => setDetail(null)}
        />
      )}
    </div>
  );
}
