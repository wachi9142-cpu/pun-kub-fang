"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { adminRequest, getAdminToken } from "@/lib/adminApi";

const STATUSES = [
  ["new", "ใหม่"], ["confirmed", "ยืนยันแล้ว"], ["preparing", "กำลังทำ"],
  ["ready", "พร้อมรับ"], ["completed", "สำเร็จ"], ["cancelled", "ยกเลิก"],
] as const;

type Order = {
  id: string; orderNumber: string; status: string; customerName?: string;
  customerPhone?: string; note?: string; itemCount: number; total: number;
  createdAt: string; items: { id: string; name: string; unitPrice: number; quantity: number; options: string[]; lineTotal: number }[];
};

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasToken, setHasToken] = useState(true);

  async function load() {
    setLoading(true); setError("");
    try {
      const query = filter ? `?status=${filter}` : "";
      const data = await adminRequest<{ items: Order[] }>(`/api/admin/orders${query}`);
      setOrders(data.items);
    } catch (err) { setError(err instanceof Error ? err.message : "โหลดออเดอร์ไม่สำเร็จ"); }
    finally { setLoading(false); }
  }

  useEffect(() => { const ok = Boolean(getAdminToken()); setHasToken(ok); if (ok) void load(); else setLoading(false); }, [filter]);

  async function setStatus(id: string, status: string) {
    try {
      await adminRequest(`/api/admin/orders/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) });
      setOrders((items) => items.map((item) => item.id === id ? { ...item, status } : item));
    } catch (err) { setError(err instanceof Error ? err.message : "อัปเดตไม่สำเร็จ"); }
  }

  async function removeOrder(order: Order) {
    if (!window.confirm(`ลบออเดอร์ ${order.orderNumber} ถาวรหรือไม่?`)) return;
    try {
      await adminRequest(`/api/admin/orders/${order.id}`, { method: "DELETE" });
      setOrders((items) => items.filter((item) => item.id !== order.id));
    } catch (err) { setError(err instanceof Error ? err.message : "ลบออเดอร์ไม่สำเร็จ"); }
  }

  if (!hasToken) return <main className="grid min-h-screen place-items-center bg-grape-50"><Link href="/admin" className="rounded-xl bg-grape-600 px-5 py-3 font-semibold text-white">เข้าสู่ระบบแอดมิน</Link></main>;

  return <main className="min-h-screen bg-grape-50/50 pb-12">
    <header className="sticky top-0 z-40 border-b border-grape-100 bg-white/95"><div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3"><div><h1 className="font-display text-xl font-bold text-grape-700">ออเดอร์</h1><p className="text-xs text-ink/45">{orders.length} รายการ</p></div><nav className="flex gap-2 text-sm font-semibold"><Link href="/admin" className="rounded-xl px-3 py-2 text-grape-600 hover:bg-grape-50">สินค้า</Link><Link href="/admin/content" className="rounded-xl px-3 py-2 text-grape-600 hover:bg-grape-50">เนื้อหา</Link><Link href="/" className="rounded-xl px-3 py-2 text-ink/50 hover:bg-grape-50">หน้าร้าน</Link></nav></div></header>
    <div className="mx-auto max-w-6xl px-4 pt-6"><div className="mb-4 flex flex-wrap gap-2"><button onClick={() => setFilter("")} className={`rounded-full px-4 py-2 text-sm font-semibold ${!filter ? "bg-grape-600 text-white" : "bg-white text-grape-600"}`}>ทั้งหมด</button>{STATUSES.map(([value, label]) => <button key={value} onClick={() => setFilter(value)} className={`rounded-full px-4 py-2 text-sm font-semibold ${filter === value ? "bg-grape-600 text-white" : "bg-white text-grape-600"}`}>{label}</button>)}</div>
      {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-red-600">{error}</p>}
      {loading ? <LoaderCircle className="mx-auto mt-20 animate-spin text-grape-500" size={32} /> : <div className="space-y-4">{orders.map((order) => <article key={order.id} className="rounded-3xl bg-white p-5 shadow-soft ring-1 ring-grape-100"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="font-display text-lg font-bold text-grape-700">{order.orderNumber}</h2><p className="text-xs text-ink/45">{new Date(order.createdAt).toLocaleString("th-TH")}</p>{(order.customerName || order.customerPhone) && <p className="mt-1 text-sm text-ink/65">{order.customerName} {order.customerPhone}</p>}</div><div className="text-right"><p className="font-display text-2xl font-bold text-blossom-500">฿{Number(order.total)}</p><div className="mt-1 flex gap-2"><select value={order.status} onChange={(event) => void setStatus(order.id, event.target.value)} className="rounded-xl border border-grape-100 bg-white px-3 py-2 text-sm">{STATUSES.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><button onClick={() => void removeOrder(order)} className="rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-100">ลบ</button></div></div></div><div className="mt-4 divide-y divide-grape-50 rounded-2xl bg-grape-50/50 px-4">{order.items.map((item) => <div key={item.id} className="flex justify-between gap-3 py-3"><div><p className="text-sm font-semibold text-ink">{item.name} × {item.quantity}</p>{item.options?.length > 0 && <p className="text-xs text-ink/45">{item.options.join(" · ")}</p>}</div><span className="font-semibold text-grape-700">฿{Number(item.lineTotal)}</span></div>)}</div>{order.note && <p className="mt-3 text-sm text-ink/60">หมายเหตุ: {order.note}</p>}</article>)}{orders.length === 0 && <div className="rounded-3xl bg-white py-20 text-center text-ink/40">ยังไม่มีออเดอร์</div>}</div>}
    </div>
  </main>;
}
