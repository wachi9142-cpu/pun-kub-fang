"use client";

import { useState } from "react";
import { Plus, X, ArrowLeft, Check } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";

type Phase = "cart" | "review" | "done";

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

  const close = () => {
    closeCart();
    // รีเซ็ตเฟสหลังปิด (กันค้างหน้า done)
    setTimeout(() => setPhase("cart"), 250);
  };

  const confirmTestOrder = () => {
    const id = "TEST-" + Math.random().toString(36).slice(2, 7).toUpperCase();
    const payload = {
      test: true,
      orderId: id,
      createdAt: new Date().toISOString(),
      itemCount: count,
      total,
      items: lines.map((l) => ({
        name: l.name,
        options: l.options ?? [],
        unitPrice: l.price,
        qty: l.qty,
        lineTotal: l.price * l.qty,
      })),
    };
    // จำลองการส่งไป backend (เสียบ endpoint จริงตรงนี้ได้เลย)
    // eslint-disable-next-line no-console
    console.log("🧪 TEST ORDER payload →", payload);
    setOrderId(id);
    setPhase("done");
  };

  return (
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
        {/* หัว + ป้าย TEST */}
        <div className="flex items-center justify-between gap-3 border-b border-ink/5 p-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-700 ring-1 ring-amber-300/60">
              🧪 โหมดทดลอง · TEST
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
                    <p className="text-xs">เลือกเครื่องดื่มแล้วเพิ่มลงตะกร้าได้เลย</p>
                  </div>
                </div>
              ) : (
                lines.map((l) => (
                  <div
                    key={l.id}
                    className="rounded-2xl bg-cream-white p-3 shadow-soft ring-1 ring-ink/5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-ink">{l.name}</p>
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
                        ฿{l.price * l.qty}
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
                  ฿{total}
                </span>
              </div>
              <button
                onClick={() => setPhase("review")}
                disabled={lines.length === 0}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-grape-600 to-blossom-500 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
              >
                🧪 สั่งซื้อ (ทดสอบ)
              </button>
            </div>
          </>
        )}

        {/* ===== REVIEW (ข้อมูลที่ร้านได้รับ) ===== */}
        {phase === "review" && (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              <div className="rounded-2xl bg-amber-50 p-3 text-xs text-amber-900/80 ring-1 ring-amber-200/70">
                🧪 นี่คือ <b>ออเดอร์ทดลอง</b> — ไม่ใช้เงินจริง ไม่กระทบออเดอร์จริง
                ใช้ตรวจว่าข้อมูลที่ร้านได้รับตรงกับที่เลือก
              </div>
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
                      ฿{l.price * l.qty}
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
                <span className="text-sm text-ink/60">ยอดรวม ({count} แก้ว)</span>
                <span className="font-display text-2xl font-bold text-blossom-500">
                  ฿{total}
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
                  onClick={confirmTestOrder}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-grape-600 to-blossom-500 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
                >
                  ✅ ยืนยันสั่งทดสอบ
                </button>
              </div>
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
              ส่งออเดอร์ทดสอบแล้ว! 🧪
            </h3>
            <p className="text-sm text-ink/60">
              เลขออเดอร์ทดลอง:{" "}
              <span className="font-semibold text-grape-deep">{orderId}</span>
            </p>
            <p className="max-w-xs text-xs text-ink/50">
              ไม่ใช้เงินจริง และไม่กระทบออเดอร์จริง · ข้อมูลออเดอร์ถูกส่ง (จำลอง)
              เรียบร้อย ดูรายละเอียดได้ใน Console
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
  );
}
