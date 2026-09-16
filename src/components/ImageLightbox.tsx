"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Portal from "@/components/Portal";

/**
 * 🔍 ImageLightbox — กดรูปแล้วเด้งขึ้นเต็มจอ (ใช้ซ้ำได้ทุกการ์ดที่มีรูปจริง)
 * - ครอบรูปด้วย <button> → กด/Enter เปิด · กดพื้นหลัง / ปุ่ม ✕ / Esc ปิด
 * - วาดผ่าน Portal (กันติด transform/overflow ของการ์ด) · รูปเต็มไม่โดนตัด (object-contain)
 */
export function useLightbox() {
  const [open, setOpen] = useState(false);
  return { open, show: () => setOpen(true), hide: () => setOpen(false) };
}

export default function ImageLightbox({
  src,
  alt,
  caption,
  onClose,
}: {
  src: string;
  alt: string;
  caption?: string;
  onClose: () => void;
}) {
  return (
    <Portal onEscape={onClose}>
      <div
        className="fixed inset-0 z-[120] grid place-items-center bg-ink/80 p-4 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={alt}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="ปิด"
          className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-ink shadow-lg transition hover:scale-105 hover:bg-white"
        >
          <X size={20} />
        </button>
        <figure
          className="lightbox-pop flex max-h-full w-full max-w-3xl flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="max-h-[80vh] w-auto max-w-full rounded-3xl bg-white/95 object-contain p-3 shadow-2xl ring-1 ring-white/40"
          />
          <figcaption className="mt-3 text-center">
            <p className="font-display text-lg font-bold text-white">{alt}</p>
            {caption && <p className="text-xs text-white/70">{caption}</p>}
          </figcaption>
        </figure>
      </div>
    </Portal>
  );
}
