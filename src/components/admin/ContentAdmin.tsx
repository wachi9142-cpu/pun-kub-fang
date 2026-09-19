"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ImagePlus, LoaderCircle, Save, Search } from "lucide-react";
import { adminRequest, getAdminToken } from "@/lib/adminApi";

type Dataset = {
  key: string;
  label: string;
  groupName: string;
  value: unknown;
  updatedAt: string;
};

export default function ContentAdmin() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [editor, setEditor] = useState("");
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("ทั้งหมด");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [hasToken, setHasToken] = useState(true);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await adminRequest<{ items: Dataset[] }>("/api/admin/content");
      setDatasets(data.items);
      setSelectedKey((current) => current || data.items[0]?.key || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "โหลดข้อมูลไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const authenticated = Boolean(getAdminToken());
    setHasToken(authenticated);
    if (authenticated) void load();
    else setLoading(false);
  }, []);

  const selected = datasets.find((item) => item.key === selectedKey);
  useEffect(() => {
    if (selected) setEditor(JSON.stringify(selected.value, null, 2));
  }, [selected]);

  const groups = useMemo(
    () => ["ทั้งหมด", ...Array.from(new Set(datasets.map((item) => item.groupName)))],
    [datasets],
  );
  const filtered = datasets.filter((item) => {
    const matchesGroup = group === "ทั้งหมด" || item.groupName === group;
    const needle = search.toLowerCase().trim();
    return matchesGroup && (!needle || `${item.label} ${item.key}`.toLowerCase().includes(needle));
  });

  async function save() {
    if (!selected) return;
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const value = JSON.parse(editor);
      const data = await adminRequest<{ item: Dataset }>(
        `/api/admin/content/${encodeURIComponent(selected.key)}`,
        { method: "PUT", body: JSON.stringify({ value }) },
      );
      setDatasets((items) => items.map((item) => item.key === data.item.key ? data.item : item));
      setEditor(JSON.stringify(data.item.value, null, 2));
      setNotice(`บันทึก “${selected.label}” แล้ว`);
    } catch (err) {
      setError(err instanceof SyntaxError ? "JSON ไม่ถูกต้อง กรุณาตรวจ comma และวงเล็บ" : err instanceof Error ? err.message : "บันทึกไม่สำเร็จ");
    } finally {
      setSaving(false);
    }
  }

  async function upload(file: File | null) {
    if (!file) return;
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const data = await adminRequest<{ url: string }>("/api/admin/uploads", { method: "POST", body });
      await navigator.clipboard.writeText(data.url);
      setNotice("อัปโหลดแล้ว และคัดลอก URL รูปไว้ใน clipboard แล้ว");
    } catch (err) {
      setError(err instanceof Error ? err.message : "อัปโหลดไม่สำเร็จ");
    }
  }

  if (!hasToken) {
    return <main className="grid min-h-screen place-items-center bg-grape-50 p-6 text-center"><div><p className="text-lg font-semibold text-ink">กรุณาเข้าสู่ระบบก่อน</p><Link href="/admin" className="mt-4 inline-block rounded-xl bg-grape-600 px-5 py-3 font-semibold text-white">ไปหน้าเข้าสู่ระบบ</Link></div></main>;
  }

  return (
    <main className="min-h-screen bg-grape-50/50 pb-10">
      <header className="sticky top-0 z-40 border-b border-grape-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-3 sm:px-6">
          <div><h1 className="font-display text-xl font-bold text-grape-700">จัดการเนื้อหาทุกส่วน</h1><p className="text-xs text-ink/45">{datasets.length} ชุดข้อมูลจาก PostgreSQL</p></div>
          <nav className="flex gap-2 text-sm font-semibold"><Link href="/admin" className="rounded-xl px-3 py-2 text-grape-600 hover:bg-grape-50">สินค้า</Link><Link href="/admin/orders" className="rounded-xl px-3 py-2 text-grape-600 hover:bg-grape-50">ออเดอร์</Link><Link href="/" className="rounded-xl px-3 py-2 text-ink/50 hover:bg-grape-50">ดูหน้าร้าน</Link></nav>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1500px] gap-5 px-4 pt-5 sm:px-6 lg:grid-cols-[360px_1fr]">
        <aside className="h-fit rounded-3xl bg-white p-4 shadow-soft ring-1 ring-grape-100 lg:sticky lg:top-24">
          <div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/35" /><input value={search} onChange={(event) => setSearch(event.target.value)} className="w-full rounded-xl border border-grape-100 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-grape-400" placeholder="ค้นหาส่วนที่ต้องการ..." /></div>
          <select value={group} onChange={(event) => setGroup(event.target.value)} className="mt-2 w-full rounded-xl border border-grape-100 bg-white px-3 py-2.5 text-sm outline-none">{groups.map((name) => <option key={name}>{name}</option>)}</select>
          <div className="mt-3 max-h-[calc(100vh-220px)] space-y-1 overflow-y-auto pr-1">
            {loading ? <LoaderCircle className="mx-auto mt-8 animate-spin text-grape-500" /> : filtered.map((item) => <button key={item.key} onClick={() => { setSelectedKey(item.key); setNotice(""); setError(""); }} className={`w-full rounded-xl px-3 py-2.5 text-left transition ${selectedKey === item.key ? "bg-grape-600 text-white" : "hover:bg-grape-50"}`}><span className="block text-sm font-semibold">{item.label}</span><span className={`block truncate text-[10px] ${selectedKey === item.key ? "text-white/65" : "text-ink/35"}`}>{item.key}</span></button>)}
          </div>
        </aside>
        <section className="min-w-0 rounded-3xl bg-white p-5 shadow-soft ring-1 ring-grape-100">
          {selected ? <>
            <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold text-grape-400">{selected.groupName}</p><h2 className="font-display text-2xl font-bold text-ink">{selected.label}</h2><p className="mt-1 font-mono text-xs text-ink/35">{selected.key}</p></div><div className="flex gap-2"><label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-grape-50 px-3 py-2 text-sm font-semibold text-grape-700 hover:bg-grape-100"><ImagePlus size={16} /> อัปโหลดรูป<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={(event) => void upload(event.target.files?.[0] ?? null)} /></label><button onClick={() => { try { setEditor(JSON.stringify(JSON.parse(editor), null, 2)); setError(""); } catch { setError("JSON ไม่ถูกต้อง"); } }} className="rounded-xl bg-grape-50 px-3 py-2 text-sm font-semibold text-grape-700 hover:bg-grape-100">จัดรูปแบบ</button></div></div>
            <div className="mt-4 rounded-xl bg-amber-50 p-3 text-xs text-amber-800 ring-1 ring-amber-200">แก้เฉพาะ value ที่ต้องการและรักษาชื่อ field เดิมไว้ ระบบจะอัปเดตหน้า user โดยไม่เปลี่ยน layout</div>
            <textarea value={editor} onChange={(event) => setEditor(event.target.value)} spellCheck={false} className="mt-4 min-h-[62vh] w-full resize-y rounded-2xl border border-grape-100 bg-[#17121f] p-4 font-mono text-[13px] leading-6 text-[#f5eefe] outline-none focus:border-grape-400" />
            {error && <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}{notice && <p className="mt-3 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{notice}</p>}
            <div className="mt-4 flex justify-between"><Link href="/admin" className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold text-ink/50 hover:bg-grape-50"><ArrowLeft size={16} /> กลับหน้าสินค้า</Link><button onClick={() => void save()} disabled={saving} className="inline-flex min-w-40 items-center justify-center gap-2 rounded-xl bg-grape-600 px-5 py-3 font-semibold text-white hover:bg-grape-700 disabled:opacity-60">{saving ? <LoaderCircle size={18} className="animate-spin" /> : <Save size={18} />} บันทึก</button></div>
          </> : <div className="grid min-h-96 place-items-center text-ink/40">เลือกชุดข้อมูลด้านซ้าย</div>}
        </section>
      </div>
    </main>
  );
}
