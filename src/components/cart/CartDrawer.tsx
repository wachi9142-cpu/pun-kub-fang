"use client";

import { useEffect, useState } from "react";
import { Plus, X, ArrowLeft, Check } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { API_URL } from "@/lib/api";

type Phase = "cart" | "review" | "done";

/* ✨ "ปิ๊ง!" mini confirmation หลังเพิ่มลงตะกร้า — หายเองใน ~2 วิ */
function CartToastView() {
  const { toast, hideToast, openCart } = useCart();
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(hideToast, 2200);
    return () => clearTimeout(t);
  }, [toast, hideToast]);
  if (!toast) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[125] flex justify-center px-4">
      <div className="animate-toast-pop pointer-events-auto flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-card ring-1 ring-grape-200">
        <span className="animate-fx-bounce text-2xl">{toast.emoji}</span>
        <div className="leading-tight">
          <p className="font-display text-sm font-bold text-grape-700">
            {toast.title ?? "ปิ๊ง! ✨"}
          </p>
          <p className="text-xs text-ink/70">{toast.name} เพิ่มลงตะกร้าแล้ว!</p>
        </div>
        <button
          type="button"
          onClick={() => {
            hideToast();
            openCart();
          }}
          className="ml-1 rounded-full bg-gradient-to-r from-grape-600 to-blossom-500 px-3 py-1.5 text-xs font-semibold text-white"
        >
          ดูตะกร้า →
        </button>
      </div>
    </div>
  );
}

export default function CartDrawer() {
  const {
    lines,
    total,
    count,
    setQty,
    removeItem,
    clear,
    drawerOpen,
    closeCart,
  } = useCart();
  const [phase, setPhase] = useState<Phase>("cart");
  const [orderId, setOrderId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const close = () => {
    closeCart();
    // รีเซ็ตเฟสหลังปิด (กันค้างหน้า done)
    setTimeout(() => setPhase("cart"), 250);
  };

  const confirmOrder = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName || null,
          customerPhone: customerPhone || null,
          note: note || null,
          source: "web",
          items: lines,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "ส่งออเดอร์ไม่สำเร็จ");
      setOrderId(data.order.orderNumber);
      setPhase("done");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "ส่งออเดอร์ไม่สำเร็จ");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <CartToastView />
      <div
        className={`fixed inset-0 z-[110] ${drawerOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!drawerOpen}
      >
        {/* backdrop */}
        <div
          onClick={close}
          className={`absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-300 ${
            drawerOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* panel */}
        <aside
          className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-card transition-transform duration-300 ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* หัวตะกร้า */}
          <div className="flex items-center justify-between gap-3 border-b border-ink/5 p-4">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-grape-100 px-2.5 py-1 text-[11px] font-bold text-grape-700 ring-1 ring-grape-200">
                🥤 สั่งกับฟ่าง
              </span>
              <h3 className="font-display text-lg font-bold text-ink">
                {phase === "review"
                  ? "ตรวจสอบออเดอร์"
                  : phase === "done"
                    ? "สำเร็จ!"
                    : "ตะกร้าของคุณ"}
              </h3>
            </div>
            <button
              onClick={close}
              aria-label="ปิด"
              className="grid h-9 w-9 place-items-center rounded-full bg-grape-50 text-ink/60 hover:bg-grape-100"
            >
              <X size={18} />
            </button>
          </div>

          {/* ===== CART ===== */}
          {phase === "cart" && (
            <>
              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {lines.length === 0 ? (
                  <div className="grid h-full place-items-center text-center text-ink/50">
                    <div>
                      <div className="text-5xl">🧋</div>
                      <p className="mt-2">ตะกร้ายังว่างอยู่</p>
                      <p className="text-xs">
                        เลือกเครื่องดื่มแล้วเพิ่มลงตะกร้าได้เลย
                      </p>
                    </div>
                  </div>
                ) : (
                  lines.map((l) => (
                    <div
                      key={l.id}
                      className="rounded-2xl bg-cream-white p-3 shadow-soft ring-1 ring-ink/5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-ink">
                          {l.name}
                        </p>
                        <button
                          onClick={() => removeItem(l.id)}
                          aria-label="ลบ"
                          className="shrink-0 rounded-full px-1.5 text-base leading-none text-ink/40 hover:bg-blossom-50 hover:text-blossom-500"
                        >
                          🗑
                        </button>
                      </div>
                      {l.options && l.options.length > 0 && (
                        <ul className="mt-1 space-y-0.5">
                          {l.options.map((o, i) => (
                            <li key={i} className="text-[11px] text-ink/55">
                              • {o}
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setQty(l.id, l.qty - 1)}
                            aria-label="ลดจำนวน"
                            className="grid h-7 w-7 place-items-center rounded-full bg-white text-base leading-none ring-1 ring-ink/10 hover:bg-grape-50 disabled:opacity-40"
                            disabled={l.qty <= 1}
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm font-semibold text-ink">
                            {l.qty}
                          </span>
                          <button
                            onClick={() => setQty(l.id, l.qty + 1)}
                            aria-label="เพิ่มจำนวน"
                            className="grid h-7 w-7 place-items-center rounded-full bg-white ring-1 ring-ink/10 hover:bg-grape-50"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-display text-base font-bold text-blossom-500">
                          {l.price * l.qty}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-ink/5 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-ink/60">รวม {count} แก้ว</span>
                  <span className="font-display text-2xl font-bold text-blossom-500">
                    {total}
                  </span>
                </div>
                <button
                  onClick={() => setPhase("review")}
                  disabled={lines.length === 0}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-grape-600 to-blossom-500 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                >
                  ตรวจสอบออเดอร์
                </button>
              </div>
            </>
          )}

          {/* ===== REVIEW (ข้อมูลที่ร้านได้รับ) ===== */}
          {phase === "review" && (
            <>
              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                <div className="rounded-2xl bg-grape-50 p-3 text-xs text-grape-800 ring-1 ring-grape-100">
                  ตรวจรายการและกรอกข้อมูลติดต่อก่อนส่งออเดอร์ให้ร้าน
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <input value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="ชื่อผู้สั่ง" className="rounded-xl border border-grape-100 px-3 py-2.5 text-sm outline-none focus:border-grape-400" />
                  <input value={customerPhone} onChange={(event) => setCustomerPhone(event.target.value)} placeholder="เบอร์โทร" inputMode="tel" className="rounded-xl border border-grape-100 px-3 py-2.5 text-sm outline-none focus:border-grape-400" />
                </div>
                <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="หมายเหตุถึงร้าน (ถ้ามี)" className="min-h-20 resize-y rounded-xl border border-grape-100 px-3 py-2.5 text-sm outline-none focus:border-grape-400" />
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">
                  รายการที่ร้านจะได้รับ
                </p>
                {lines.map((l) => (
                  <div
                    key={l.id}
                    className="rounded-2xl bg-cream-white p-3 shadow-soft ring-1 ring-ink/5"
                  >
                    <div className="flex justify-between gap-2">
                      <p className="text-sm font-semibold text-ink">
                        {l.name} × {l.qty}
                      </p>
                      <span className="font-semibold text-blossom-500">
                        {l.price * l.qty}
                      </span>
                    </div>
                    {l.options && l.options.length > 0 && (
                      <ul className="mt-1 space-y-0.5">
                        {l.options.map((o, i) => (
                          <li key={i} className="text-[11px] text-ink/55">
                            • {o}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
              <div className="border-t border-ink/5 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-ink/60">
                    ยอดรวม ({count} แก้ว)
                  </span>
                  <span className="font-display text-2xl font-bold text-blossom-500">
                    {total}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPhase("cart")}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-grape-100 px-4 py-3 text-sm font-semibold text-grape-deep hover:bg-grape-200"
                  >
                    <ArrowLeft size={16} /> แก้ไข
                  </button>
                  <button
                    onClick={() => void confirmOrder()}
                    disabled={submitting}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-grape-600 to-blossom-500 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-60"
                  >
                    {submitting ? "กำลังส่ง..." : "✅ ยืนยันออเดอร์"}
                  </button>
                </div>
                {submitError && <p className="mt-2 rounded-xl bg-red-50 p-2 text-xs text-red-600">{submitError}</p>}
              </div>
            </>
          )}

          {/* ===== DONE ===== */}
          {phase === "done" && (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                <Check size={40} />
              </div>
              <h3 className="font-display text-xl font-bold text-ink">
                ส่งออเดอร์แล้ว! ✨
              </h3>
              <p className="text-sm text-ink/60">
                เลขออเดอร์:{" "}
                <span className="font-semibold text-grape-deep">{orderId}</span>
              </p>
              <p className="max-w-xs text-xs text-ink/50">
                ร้านได้รับรายการแล้ว สามารถแจ้งเลขออเดอร์นี้เมื่อติดต่อร้าน
              </p>
              <button
                onClick={() => {
                  clear();
                  close();
                }}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-grape-600 to-blossom-500 px-8 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
              >
                เสร็จสิ้น
              </button>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
