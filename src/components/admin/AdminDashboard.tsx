"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ImagePlus,
  LoaderCircle,
  LogOut,
  PackagePlus,
  Pencil,
  Save,
  Search,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { DRINK_CATEGORIES, type MenuItem } from "@/data/site";
import { API_URL } from "@/lib/api";

type AdminProduct = MenuItem & {
  databaseId: string;
  slug: string;
  active: boolean;
  sortOrder: number;
};

type ProductForm = {
  slug: string;
  name: string;
  nameEn: string;
  tagline: string;
  price: string;
  likes: string;
  emoji: string;
  category: string;
  badge: string;
  imageUrl: string;
  popular: boolean;
  soldOut: boolean;
  active: boolean;
  sortOrder: string;
  foam: string;
  top: string;
  bottom: string;
};

const EMPTY_FORM: ProductForm = {
  slug: "",
  name: "",
  nameEn: "",
  tagline: "",
  price: "35",
  likes: "0",
  emoji: "🥤",
  category: "drinks",
  badge: "",
  imageUrl: "",
  popular: false,
  soldOut: false,
  active: true,
  sortOrder: "0",
  foam: "#fff2f6",
  top: "#ff9ec0",
  bottom: "#f0507f",
};

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || `menu-${Date.now()}`;
}

function fromProduct(product: AdminProduct): ProductForm {
  return {
    slug: product.slug,
    name: product.name,
    nameEn: product.nameEn ?? "",
    tagline: product.tagline,
    price: String(product.price),
    likes: String(product.likes),
    emoji: product.emoji,
    category: product.category,
    badge: product.badge ?? "",
    imageUrl: product.image ?? "",
    popular: Boolean(product.popular),
    soldOut: Boolean(product.soldOut),
    active: product.active,
    sortOrder: String(product.sortOrder),
    foam: product.palette.foam,
    top: product.palette.top,
    bottom: product.palette.bottom,
  };
}

export default function AdminDashboard() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const logout = useCallback(() => {
    sessionStorage.removeItem("pkf-admin-token");
    setToken("");
    setProducts([]);
  }, []);

  const request = useCallback(
    async <T,>(path: string, init: RequestInit = {}, authToken = token): Promise<T> => {
      const headers = new Headers(init.headers);
      if (authToken) headers.set("Authorization", `Bearer ${authToken}`);
      if (init.body && !(init.body instanceof FormData)) {
        headers.set("Content-Type", "application/json");
      }
      const response = await fetch(`${API_URL}${path}`, { ...init, headers });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (response.status === 401 && path !== "/api/admin/login") logout();
        throw new Error(data.message || "เชื่อมต่อระบบไม่สำเร็จ");
      }
      return data as T;
    },
    [logout, token],
  );

  const loadProducts = useCallback(
    async (authToken = token) => {
      setLoading(true);
      setError("");
      try {
        const data = await request<{ items: AdminProduct[] }>(
          "/api/admin/products",
          {},
          authToken,
        );
        setProducts(data.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : "โหลดเมนูไม่สำเร็จ");
      } finally {
        setLoading(false);
      }
    },
    [request, token],
  );

  useEffect(() => {
    const saved = sessionStorage.getItem("pkf-admin-token");
    if (saved) {
      setToken(saved);
      void loadProducts(saved);
    }
  }, [loadProducts]);

  useEffect(() => {
    if (!file) {
      setFilePreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(file);
    setFilePreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return products.filter((product) =>
      !needle
        ? true
        : [product.name, product.nameEn, product.slug, product.category]
            .filter(Boolean)
            .some((value) => String(value).toLowerCase().includes(needle)),
    );
  }, [products, search]);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await request<{ token: string }>(
        "/api/admin/login",
        { method: "POST", body: JSON.stringify({ password }) },
        "",
      );
      sessionStorage.setItem("pkf-admin-token", data.token);
      setToken(data.token);
      setPassword("");
      await loadProducts(data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "เข้าสู่ระบบไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  }

  function startNew() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFile(null);
    setError("");
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startEdit(product: AdminProduct) {
    setEditingId(product.databaseId);
    setForm(fromProduct(product));
    setFile(null);
    setError("");
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSave(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");
    try {
      let imageUrl = form.imageUrl || null;
      if (file) {
        const upload = new FormData();
        upload.append("file", file);
        const uploaded = await request<{ url: string }>("/api/admin/uploads", {
          method: "POST",
          body: upload,
        });
        imageUrl = uploaded.url;
      }

      const payload = {
        slug: form.slug || slugify(form.nameEn || form.name),
        name: form.name,
        nameEn: form.nameEn || null,
        tagline: form.tagline,
        price: Number(form.price),
        likes: Number(form.likes),
        emoji: form.emoji,
        category: form.category,
        badge: form.badge || null,
        imageUrl,
        popular: form.popular,
        soldOut: form.soldOut,
        active: form.active,
        sortOrder: Number(form.sortOrder),
        palette: { foam: form.foam, top: form.top, bottom: form.bottom },
      };

      await request(
        editingId ? `/api/admin/products/${editingId}` : "/api/admin/products",
        {
          method: editingId ? "PUT" : "POST",
          body: JSON.stringify(payload),
        },
      );
      setNotice(editingId ? "บันทึกการแก้ไขแล้ว" : "สร้างเมนูใหม่แล้ว");
      setEditingId(null);
      setForm(EMPTY_FORM);
      setFile(null);
      await loadProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "บันทึกไม่สำเร็จ");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(product: AdminProduct) {
    if (!window.confirm(`ลบ “${product.name}” ถาวรหรือไม่?`)) return;
    setError("");
    try {
      await request(`/api/admin/products/${product.databaseId}`, { method: "DELETE" });
      if (editingId === product.databaseId) startNew();
      setNotice(`ลบ ${product.name} แล้ว`);
      await loadProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "ลบไม่สำเร็จ");
    }
  }

  if (!token) {
    return (
      <main className="grid min-h-screen place-items-center bg-gradient-to-br from-grape-50 via-white to-blossom-50 px-4">
        <form onSubmit={handleLogin} className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-card ring-1 ring-grape-100">
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-grape-100 text-3xl">🥤</div>
            <h1 className="font-display text-2xl font-bold text-grape-700">หลังบ้านปั่นกับฟ่าง</h1>
            <p className="mt-2 text-sm text-ink/55">เข้าสู่ระบบเพื่อจัดการเมนูและรูปสินค้า</p>
          </div>
          <label className="block text-sm font-semibold text-ink/70">รหัสผ่านแอดมิน</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-grape-200 px-4 py-3 outline-none focus:border-grape-500 focus:ring-4 focus:ring-grape-100"
            placeholder="••••••••"
            autoFocus
            autoComplete="current-password"
            required
          />
          {error && <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}
          <button disabled={loading} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-grape-600 py-3 font-semibold text-white hover:bg-grape-700 disabled:opacity-60">
            {loading && <LoaderCircle size={18} className="animate-spin" />}
            เข้าสู่ระบบ
          </button>
          <Link href="/" className="mt-5 flex items-center justify-center gap-1 text-sm text-grape-500 hover:text-grape-700">
            <ArrowLeft size={15} /> กลับหน้าร้าน
          </Link>
        </form>
      </main>
    );
  }

  const fieldClass = "mt-1.5 w-full rounded-xl border border-grape-100 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-grape-400 focus:ring-4 focus:ring-grape-50";
  const imagePreview = filePreviewUrl || form.imageUrl;

  return (
    <main className="min-h-screen bg-grape-50/50 pb-16">
      <header className="sticky top-0 z-40 border-b border-grape-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div>
            <h1 className="font-display text-xl font-bold text-grape-700">จัดการเมนู 🥤</h1>
            <p className="text-xs text-ink/45">{products.length} รายการในระบบ</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/content" className="rounded-xl px-3 py-2 text-sm font-semibold text-grape-600 hover:bg-grape-50">เนื้อหา</Link>
            <Link href="/admin/orders" className="rounded-xl px-3 py-2 text-sm font-semibold text-grape-600 hover:bg-grape-50">ออเดอร์</Link>
            <Link href="/" className="rounded-xl px-3 py-2 text-sm font-semibold text-grape-600 hover:bg-grape-50">ดูหน้าร้าน</Link>
            <button onClick={logout} className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"><LogOut size={16} /> ออกจากระบบ</button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 pt-6 sm:px-6 lg:grid-cols-[390px_1fr]">
        <section className="h-fit rounded-3xl bg-white p-5 shadow-soft ring-1 ring-grape-100 lg:sticky lg:top-24">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-ink">{editingId ? "แก้ไขเมนู" : "เพิ่มเมนูใหม่"}</h2>
            {editingId && <button onClick={startNew} className="rounded-lg p-2 text-ink/40 hover:bg-grape-50 hover:text-grape-600" aria-label="ยกเลิก"><X size={18} /></button>}
          </div>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-[1fr_72px] gap-3">
              <label className="text-sm font-medium text-ink/70">ชื่อเมนู *<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={fieldClass} required /></label>
              <label className="text-sm font-medium text-ink/70">อีโมจิ<input value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} className={fieldClass} maxLength={8} required /></label>
            </div>
            <label className="block text-sm font-medium text-ink/70">ชื่ออังกฤษ<input value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} className={fieldClass} /></label>
            <label className="block text-sm font-medium text-ink/70">Slug (เว้นว่างให้ระบบสร้าง)<div className="flex gap-2"><input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase() })} className={fieldClass} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="strawberry-smoothie" /><button type="button" onClick={() => setForm({ ...form, slug: slugify(form.nameEn || form.name) })} className="mt-1.5 shrink-0 rounded-xl bg-grape-50 px-3 text-xs font-semibold text-grape-600">สร้างให้</button></div></label>
            <label className="block text-sm font-medium text-ink/70">คำโปรย<textarea value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} className={`${fieldClass} min-h-20 resize-y`} /></label>
            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm font-medium text-ink/70">ราคา *<input type="number" min="0" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={fieldClass} required /></label>
              <label className="text-sm font-medium text-ink/70">หมวด<select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={fieldClass}>{DRINK_CATEGORIES.map((category) => <option key={category.id} value={category.id}>{category.emoji} {category.label}</option>)}</select></label>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <label className="text-xs font-medium text-ink/60">สีโฟม<input type="color" value={form.foam} onChange={(e) => setForm({ ...form, foam: e.target.value })} className="mt-1 h-10 w-full rounded-lg border border-grape-100 bg-white p-1" /></label>
              <label className="text-xs font-medium text-ink/60">สีบน<input type="color" value={form.top} onChange={(e) => setForm({ ...form, top: e.target.value })} className="mt-1 h-10 w-full rounded-lg border border-grape-100 bg-white p-1" /></label>
              <label className="text-xs font-medium text-ink/60">สีล่าง<input type="color" value={form.bottom} onChange={(e) => setForm({ ...form, bottom: e.target.value })} className="mt-1 h-10 w-full rounded-lg border border-grape-100 bg-white p-1" /></label>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <label className="text-sm font-medium text-ink/70">ป้าย<input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} className={fieldClass} placeholder="ขายดี" /></label>
              <label className="text-sm font-medium text-ink/70">ยอดใจ<input type="number" min="0" value={form.likes} onChange={(e) => setForm({ ...form, likes: e.target.value })} className={fieldClass} /></label>
              <label className="text-sm font-medium text-ink/70">ลำดับ<input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} className={fieldClass} /></label>
            </div>
            <div className="overflow-hidden rounded-2xl border-2 border-dashed border-grape-200 bg-grape-50/60">
              <div className="relative grid h-48 place-items-center overflow-hidden bg-[linear-gradient(45deg,#f4edfb_25%,transparent_25%),linear-gradient(-45deg,#f4edfb_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f4edfb_75%),linear-gradient(-45deg,transparent_75%,#f4edfb_75%)] bg-[length:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0px]">
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="ตัวอย่างรูปสินค้า"
                      className="absolute inset-0 block max-h-full max-w-full object-contain p-3"
                      style={{ width: "100%", height: "100%" }}
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-grape-700 shadow-sm">
                      {file ? "รูปใหม่ (ยังไม่บันทึก)" : "รูปปัจจุบัน"}
                    </span>
                  </>
                ) : (
                  <div className="text-center text-grape-400">
                    <ImagePlus className="mx-auto" size={34} />
                    <p className="mt-2 text-sm font-semibold">ยังไม่มีรูปสินค้า</p>
                  </div>
                )}
              </div>
              <div className="border-t border-grape-100 bg-white/90 p-3">
                <div className="flex gap-2">
                  <label className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-grape-100 px-3 py-2.5 text-sm font-semibold text-grape-700 transition hover:bg-grape-200">
                    <ImagePlus size={17} />
                    {imagePreview ? "เปลี่ยนรูป" : "เลือกรูปสินค้า"}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                      className="hidden"
                    />
                  </label>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        setForm({ ...form, imageUrl: "" });
                      }}
                      className="rounded-xl bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-100"
                    >
                      เอารูปออก
                    </button>
                  )}
                </div>
                <p className="mt-2 truncate text-center text-xs text-ink/45">
                  {file ? file.name : "JPG, PNG, WebP หรือ GIF ไม่เกิน 5 MB"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs font-medium text-ink/70">
              <label className="flex items-center gap-2 rounded-xl bg-grape-50 p-2"><input type="checkbox" checked={form.popular} onChange={(e) => setForm({ ...form, popular: e.target.checked })} /> ขายดี</label>
              <label className="flex items-center gap-2 rounded-xl bg-grape-50 p-2"><input type="checkbox" checked={form.soldOut} onChange={(e) => setForm({ ...form, soldOut: e.target.checked })} /> หมด</label>
              <label className="flex items-center gap-2 rounded-xl bg-grape-50 p-2"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> แสดง</label>
            </div>
            {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}
            {notice && <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{notice}</p>}
            <button disabled={saving} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-grape-600 py-3 font-semibold text-white hover:bg-grape-700 disabled:opacity-60">{saving ? <LoaderCircle size={18} className="animate-spin" /> : editingId ? <Save size={18} /> : <PackagePlus size={18} />}{editingId ? "บันทึกการแก้ไข" : "สร้างเมนู"}</button>
          </form>
        </section>

        <section>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <div className="relative min-w-56 flex-1"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/35" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ค้นหาชื่อ, slug หรือหมวด..." className="w-full rounded-2xl border border-grape-100 bg-white py-3 pl-10 pr-4 outline-none focus:border-grape-400" /></div>
            <button onClick={startNew} className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-grape-700 shadow-sm ring-1 ring-grape-100 hover:bg-grape-50"><PackagePlus size={17} /> เพิ่มใหม่</button>
          </div>
          {loading ? <div className="grid min-h-64 place-items-center"><LoaderCircle className="animate-spin text-grape-500" size={32} /></div> : (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => (
                <article key={product.databaseId} className={`overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ${product.active ? "ring-grape-100" : "opacity-60 ring-ink/10"}`}>
                  <div className="relative grid h-36 place-items-center overflow-hidden bg-gradient-to-br from-grape-50 to-blossom-50">
                    {product.image ? <img src={product.image} alt={product.name} className="absolute inset-0 block max-h-full max-w-full object-contain p-2" style={{ width: "100%", height: "100%" }} /> : <span className="text-6xl">{product.emoji}</span>}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3"><div className="min-w-0"><h3 className="truncate font-display font-semibold text-grape-700">{product.name}</h3><p className="truncate text-xs text-ink/40">{product.slug}</p></div><span className="shrink-0 font-display text-lg font-bold text-blossom-500">฿{product.price}</span></div>
                    <div className="mt-2 flex flex-wrap gap-1 text-[10px]"><span className="rounded-full bg-grape-50 px-2 py-1 text-grape-600">{DRINK_CATEGORIES.find((c) => c.id === product.category)?.label ?? product.category}</span>{product.popular && <span className="rounded-full bg-amber-50 px-2 py-1 text-amber-700">ขายดี</span>}{product.soldOut && <span className="rounded-full bg-red-50 px-2 py-1 text-red-600">หมด</span>}{!product.active && <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-600">ซ่อน</span>}</div>
                    <div className="mt-4 grid grid-cols-2 gap-2"><button onClick={() => startEdit(product)} className="inline-flex items-center justify-center gap-1 rounded-xl bg-grape-50 py-2 text-xs font-semibold text-grape-700 hover:bg-grape-100"><Pencil size={14} /> แก้ไข</button><button onClick={() => void handleDelete(product)} className="inline-flex items-center justify-center gap-1 rounded-xl bg-red-50 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"><Trash2 size={14} /> ลบ</button></div>
                  </div>
                </article>
              ))}
            </div>
          )}
          {!loading && filtered.length === 0 && <div className="rounded-3xl bg-white py-16 text-center text-ink/45">ไม่พบเมนูที่ค้นหา</div>}
        </section>
      </div>
    </main>
  );
}
