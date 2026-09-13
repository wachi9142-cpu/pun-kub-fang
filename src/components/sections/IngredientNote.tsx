/**
 * หมายเหตุเรื่องรูปภาพ/วัตถุดิบ — ดีไซน์ subtle ไม่เด่นจนรบกวนการเลือกเมนู
 * - ทุกหมวด: ภาพใช้ประกอบการตัดสินใจเท่านั้น
 * - หมวดวัตถุดิบสด (fresh): เพิ่มหมายเหตุเรื่องผลไม้/วัตถุดิบสดต่างกันตามวัน
 */
export const IMAGE_NOTE =
  "ภาพปกใช้เพื่อประกอบการตัดสินใจเท่านั้น เมนูที่ได้รับจริงอาจมีสี หน้าตา ขนาด ปริมาณ หรือการจัดวางแตกต่างจากภาพเล็กน้อย เนื่องจากวัตถุดิบและการจัดเตรียมในแต่ละวัน ✨";

export const FRESH_NOTE =
  "สี ขนาด รูปร่าง และปริมาณของผลไม้หรือวัตถุดิบสดอาจแตกต่างจากภาพ ขึ้นอยู่กับฤดูกาล ความสด และวัตถุดิบที่มีในวันนั้น · บางรายการอาจไม่มีจำหน่ายในวันนั้น กรุณาสอบถามก่อนสั่ง";

export default function IngredientNote({ fresh = false }: { fresh?: boolean }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-3 rounded-2xl bg-cream-white/70 p-4 ring-1 ring-ink/10">
        <div>
          <p className="mb-1 text-xs font-bold text-ink">💜 หมายเหตุเกี่ยวกับรูปภาพ</p>
          <p className="text-[11px] leading-relaxed text-ink/75">{IMAGE_NOTE}</p>
        </div>
        {fresh && (
          <div className="border-t border-ink/10 pt-3">
            <p className="mb-1 text-xs font-bold text-ink">🍓 วัตถุดิบสดอาจแตกต่างกัน</p>
            <p className="text-[11px] leading-relaxed text-ink/75">{FRESH_NOTE}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/** ข้อความกำกับสั้น ๆ ใต้รูปเมนูแต่ละใบ */
export function ImageCaption({ fresh = false }: { fresh?: boolean }) {
  return (
    <p className="mt-1 text-[9px] leading-tight text-ink/35">
      {fresh ? "🍓 ภาพเป็นตัวอย่าง · วัตถุดิบสดต่างกันตามวัน" : "ภาพเป็นตัวอย่างประกอบเท่านั้น"}
    </p>
  );
}
