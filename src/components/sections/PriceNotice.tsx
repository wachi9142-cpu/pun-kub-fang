export default function PriceNotice() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="mb-4 text-center text-sm font-semibold text-ink/70">
        💡 เรื่องราคาที่อยากบอกก่อนสั่ง~
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {/* ราคาหน้าร้าน */}
        <div className="rounded-3xl bg-gradient-to-br from-cream-white to-blossom-50 p-5 shadow-soft ring-1 ring-blossom-200/50">
          <div className="mb-2 flex items-center gap-2">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-2xl shadow-soft">
              🏪
            </span>
            <h3 className="font-display text-base font-bold text-ink">
              ราคาหน้าร้าน
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-ink/70">
            ราคาหน้าร้าน <b className="text-blossom-500">อาจถูกกว่า</b>{" "}
            ราคาในแอป Delivery นะคะ~ มาที่ร้านฟ่างคุ้มกว่าเยอะเลย 💜
          </p>
        </div>

        {/* สั่งผ่าน Delivery */}
        <div className="rounded-3xl bg-gradient-to-br from-cream-white to-grape-50 p-5 shadow-soft ring-1 ring-grape-200/50">
          <div className="mb-2 flex items-center gap-2">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-2xl shadow-soft">
              🛵
            </span>
            <h3 className="font-display text-base font-bold text-ink">
              สั่งผ่าน Delivery
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-ink/70">
            ราคาบน{" "}
            <span className="font-semibold text-grape-deep">LINE MAN</span> /{" "}
            <span className="font-semibold text-grape-deep">Grab</span>{" "}
            และแอปอื่น ๆ อาจต่างจากหน้าร้าน เพราะมีค่าบริการ &amp;
            ค่าธรรมเนียมของแพลตฟอร์มเพิ่มเข้ามาน้า 🥺
          </p>
        </div>
      </div>
    </section>
  );
}
