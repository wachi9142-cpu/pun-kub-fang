/** หมายเหตุเรื่องรูปภาพ/วัตถุดิบ — ดีไซน์ subtle ไม่เด่นจนรบกวนการเลือกเมนู */
export default function IngredientNote() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-cream-white/70 p-4 ring-1 ring-ink/10">
        <p className="mb-1.5 text-xs font-bold text-ink">
          🍓 หมายเหตุเกี่ยวกับรูปภาพและวัตถุดิบ
        </p>
        <p className="text-[11px] leading-relaxed text-ink/75">
          รูปภาพของเมนูและท็อปปิ้งใช้เพื่อประกอบการตัดสินใจเท่านั้น สี รูปลักษณ์
          ขนาด และปริมาณของวัตถุดิบจริงอาจแตกต่างจากภาพ · วัตถุดิบ โดยเฉพาะ
          <span className="font-semibold text-ink"> ผลไม้สด</span>{" "}
          อาจมีให้เลือกแตกต่างกันในแต่ละวันและตามฤดูกาล บางรายการอาจไม่มีจำหน่ายในวันนั้น
          ขึ้นอยู่กับความสดและสต็อกของร้าน · กรุณาสอบถามรายการผลไม้และท็อปปิ้งที่มีในวันนั้นก่อนสั่ง
          💜
        </p>
      </div>
    </div>
  );
}
