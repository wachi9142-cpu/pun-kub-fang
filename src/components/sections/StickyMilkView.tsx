"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import {
  STICKY_BASES,
  STICKY_FLAVORS,
  STICKY_PACKAGES,
  STICKY_SERVE,
  STICKY_SEPARATE_NOTE,
  STICKY_EXAMPLES,
  STICKY_NOTE,
  type StickyBase,
  type StickyFlavor,
  type StickyPackageId,
} from "@/data/site";
import { useCart } from "@/components/cart/CartContext";
import StickyCheersDecor from "@/components/sections/StickyCheersDecor";

type ServeId = (typeof STICKY_SERVE)[number]["id"];

/* ---------- 🥄 นมเหนียวบนช้อน — โคลสอัปเนื้อข้นหนืด ไหลยืดเล็กน้อย (รูปตัวเลือกรส) ---------- */
function shade(hex: string, amt: number) {
  // ปรับความสว่างสี hex (amt -1..1)
  const n = parseInt(hex.slice(1), 16);
  const ch = (v: number) =>
    Math.max(
      0,
      Math.min(255, Math.round(v + (amt > 0 ? (255 - v) * amt : v * amt))),
    );
  const r = ch((n >> 16) & 255),
    g = ch((n >> 8) & 255),
    b = ch(n & 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

export function StickySpoon({
  color,
  image,
  size = 96,
}: {
  color: string;
  image?: string;
  size?: number;
}) {
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={image}
        alt=""
        width={size}
        height={size}
        className="object-contain"
        style={{ width: size, height: size }}
      />
    );
  }
  const light = shade(color, 0.45);
  const dark = shade(color, -0.22);
  const uid = color.replace("#", "");
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={`sp-${uid}`} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor={light} />
          <stop offset="55%" stopColor={color} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
        <linearGradient id={`spoon-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f7f7fb" />
          <stop offset="60%" stopColor="#cfd2dc" />
          <stop offset="100%" stopColor="#9a9eab" />
        </linearGradient>
      </defs>
      {/* เงา */}
      <ellipse cx="58" cy="108" rx="34" ry="6" fill="#7b4ab8" opacity="0.12" />
      {/* ด้ามช้อน: ต่อจากขอบขวาของหัวช้อน โค้งขึ้นไปมุมขวาบน */}
      <path
        d="M84 70 C98 62 104 44 110 20"
        stroke={`url(#spoon-${uid})`}
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M86 68 C98 60 103 44 108 24"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* หัวช้อน (มองเฉียงจากด้านบน) */}
      <g transform="rotate(-8 52 78)">
        <ellipse cx="52" cy="78" rx="36" ry="21" fill={`url(#spoon-${uid})`} />
        <ellipse cx="52" cy="76" rx="31" ry="16" fill="#aeb2bf" />
        <ellipse cx="52" cy="75" rx="27" ry="12" fill="#c9ccd6" />
      </g>
      {/* หยดที่ไหลยืดลงจากขอบช้อนด้านหน้า */}
      <path
        d="M30 88 C27 96 27 104 29 112"
        stroke={dark}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M30 88 C27 96 27 104 29 112"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <ellipse cx="29.5" cy="113" rx="4.5" ry="5" fill={color} />
      <circle cx="28" cy="111" r="1.4" fill="#ffffff" opacity="0.7" />
      <path
        d="M62 94 C62 100 63 104 62 108"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="62" cy="109" r="3" fill={color} />
      {/* กองนมเหนียว: ข้น นูน เนียน วางบนช้อน ขอบล่างย้อยเป็นคลื่น */}
      <path
        d="M22 74 C20 52 34 38 54 38 C74 38 88 50 86 68 C85 78 78 82 70 84 C66 90 60 90 56 85 C50 92 42 92 38 86 C30 88 24 84 22 74 Z"
        fill={`url(#sp-${uid})`}
      />
      {/* รอยพับ/ริ้วแสดงความหนืด */}
      <path
        d="M36 56 C42 44 60 42 72 50"
        stroke={light}
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M30 74 C40 80 58 82 74 76"
        stroke={dark}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M44 66 C50 70 60 70 66 66"
        stroke={dark}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.3"
      />
      {/* แสง glossy */}
      <ellipse
        cx="46"
        cy="50"
        rx="10"
        ry="4.5"
        fill="#ffffff"
        opacity="0.6"
        transform="rotate(-20 46 50)"
      />
      <circle cx="66" cy="54" r="2.6" fill="#ffffff" opacity="0.75" />
      <circle cx="58" cy="46" r="1.5" fill="#ffffff" opacity="0.6" />
    </svg>
  );
}

/* ---------- แครกเกอร์ (SVG ชิ้นเล็ก) ---------- */
function Cracker({ x, y, rotate }: { x: number; y: number; rotate: number }) {
  return (
    <g transform={`rotate(${rotate} ${x + 17} ${y + 23})`}>
      <rect
        x={x}
        y={y}
        width="34"
        height="46"
        rx="6"
        fill="#e6b97a"
        stroke="#c9924e"
        strokeWidth="2"
      />
      <g fill="#b8823f" opacity="0.8">
        <circle cx={x + 9} cy={y + 10} r="2" />
        <circle cx={x + 25} cy={y + 10} r="2" />
        <circle cx={x + 17} cy={y + 22} r="2" />
        <circle cx={x + 9} cy={y + 34} r="2" />
        <circle cx={x + 25} cy={y + 34} r="2" />
      </g>
    </g>
  );
}

/* ---------- 📦 แบบแยก: กระปุกนมเหนียว + แก้วแครกเกอร์มีฝา (+ แก้วน้ำถ้าเลือก) ---------- */
function SeparateSet({
  base,
  flavor,
  size = 150,
}: {
  base?: StickyBase | null;
  flavor?: StickyFlavor;
  size?: number;
}) {
  const color = flavor?.color ?? "#f2e6d2";
  const uid = `sep-${base?.id ?? "none"}`;
  return (
    <div style={{ width: size, height: size * 1.25 }} aria-hidden>
      <svg viewBox="0 0 200 250" width="100%" height="100%" fill="none">
        <defs>
          {base && (
            <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={base.palette.top} />
              <stop offset="100%" stopColor={base.palette.bottom} />
            </linearGradient>
          )}
        </defs>
        <ellipse
          cx="100"
          cy="236"
          rx="80"
          ry="10"
          fill="#7b4ab8"
          opacity="0.14"
        />
        {/* แก้วน้ำ (ถ้าเลือก) อยู่ด้านหลังซ้าย */}
        {base && (
          <g>
            <path
              d="M18 120 h54 l-6 92 a6 6 0 0 1 -6 5 H30 a6 6 0 0 1 -6 -5 Z"
              fill={`url(#${uid})`}
            />
            <rect
              x="15"
              y="116"
              width="60"
              height="8"
              rx="4"
              fill="#ffffff"
              opacity="0.9"
            />
            <rect
              x="52"
              y="86"
              width="7"
              height="40"
              rx="3.5"
              fill="#8a5cf0"
              transform="rotate(-8 55 100)"
            />
          </g>
        )}
        {/* กระปุกนมเหนียว (มีฝา) */}
        <g>
          <rect
            x="66"
            y="150"
            width="62"
            height="60"
            rx="10"
            fill="#ffffff"
            stroke="#e6d9f5"
            strokeWidth="3"
          />
          <rect x="69" y="166" width="56" height="41" rx="8" fill={color} />
          <rect
            x="62"
            y="142"
            width="70"
            height="14"
            rx="6"
            fill="#efe6fb"
            stroke="#d8c7f0"
            strokeWidth="2"
          />
          <ellipse
            cx="97"
            cy="185"
            rx="14"
            ry="10"
            fill="#ffffff"
            opacity="0.9"
          />
          <text x="97" y="189" textAnchor="middle" fontSize="11">
            {flavor?.emoji ?? "🥛"}
          </text>
        </g>
        {/* แก้วแครกเกอร์ ฝาโดม */}
        <g>
          <path
            d="M136 132 h50 l-5 78 a6 6 0 0 1 -6 5 h-28 a6 6 0 0 1 -6 -5 Z"
            fill="#ffffff"
            fillOpacity="0.55"
            stroke="#e6d9f5"
            strokeWidth="3"
          />
          <path
            d="M134 132 q27 -34 54 0 Z"
            fill="#ffffff"
            fillOpacity="0.5"
            stroke="#e6d9f5"
            strokeWidth="3"
          />
          <g transform="translate(140 140) scale(0.55)">
            <Cracker x={4} y={8} rotate={-20} />
            <Cracker x={40} y={30} rotate={18} />
            <Cracker x={10} y={60} rotate={6} />
          </g>
          <circle cx="161" cy="196" r="12" fill="#ffffff" opacity="0.9" />
          <text x="161" y="200" textAnchor="middle" fontSize="11">
            🍪
          </text>
        </g>
      </svg>
    </div>
  );
}

/* ---------- ภาพแก้ว: มีน้ำ = น้ำ + นมเหนียวราดบน · ไม่มีน้ำ = ถ้วยนมเหนียว + แครกเกอร์ ---------- */
function StickyCup({
  base,
  flavor,
  cracker,
  size = 150,
}: {
  base?: StickyBase | null;
  flavor?: StickyFlavor;
  cracker?: boolean;
  size?: number;
}) {
  const uid = `${base?.id ?? "none"}-${flavor?.id ?? "none"}`;
  const CUP =
    "M46 95 h108 l-12 132 a10 10 0 0 1 -10 9 H68 a10 10 0 0 1 -10 -9 Z";

  // 🍪 แบบไม่ใส่น้ำ: ถ้วยเตี้ย ๆ ใส่นมเหนียว + แครกเกอร์ปัก
  if (!base) {
    const color = flavor?.color ?? "#f2e6d2";
    return (
      <div style={{ width: size, height: size * 1.25 }} aria-hidden>
        <svg viewBox="0 0 200 250" width="100%" height="100%" fill="none">
          <ellipse
            cx="100"
            cy="236"
            rx="66"
            ry="10"
            fill="#7b4ab8"
            opacity="0.16"
          />
          {/* ถ้วย */}
          <path
            d="M36 150 h128 l-10 70 a10 10 0 0 1 -10 8 H56 a10 10 0 0 1 -10 -8 Z"
            fill="#ffffff"
            stroke="#e6d9f5"
            strokeWidth="3"
          />
          {/* นมเหนียวในถ้วย (นูนขึ้นมา) */}
          <path d="M40 152 q60 -30 120 0 v6 H40 Z" fill={color} />
          <ellipse cx="100" cy="152" rx="60" ry="14" fill={color} />
          <ellipse
            cx="82"
            cy="146"
            rx="18"
            ry="5"
            fill="#ffffff"
            opacity="0.4"
          />
          {cracker && (
            <>
              <Cracker x={64} y={92} rotate={-22} />
              <Cracker x={104} y={88} rotate={14} />
            </>
          )}
          <text x="100" y="205" textAnchor="middle" fontSize="24">
            {flavor?.emoji ?? "🍯"}
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div style={{ width: size, height: size * 1.25 }} aria-hidden>
      <svg viewBox="0 0 200 250" width="100%" height="100%" fill="none">
        <defs>
          <linearGradient id={`sb-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={base.palette.top} />
            <stop offset="100%" stopColor={base.palette.bottom} />
          </linearGradient>
          <clipPath id={`sc-${uid}`}>
            <path d={CUP} />
          </clipPath>
        </defs>
        <ellipse
          cx="100"
          cy="238"
          rx="62"
          ry="10"
          fill="#7b4ab8"
          opacity="0.16"
        />
        <path d={CUP} fill={`url(#sb-${uid})`} />
        {/* ชั้นนมเหนียวราดบน ไหลย้อย */}
        {flavor && (
          <g clipPath={`url(#sc-${uid})`}>
            <path
              d="M40 95 h120 v28 q-8 14 -16 2 q-6 18 -14 4 q-8 22 -16 6 q-6 14 -14 2 q-8 18 -16 4 q-6 10 -14 0 q-8 16 -16 4 Z"
              fill={flavor.color}
            />
            <path d="M40 95 h120 v12 H40 Z" fill={flavor.color} />
            <ellipse
              cx="100"
              cy="98"
              rx="60"
              ry="8"
              fill="#ffffff"
              opacity="0.35"
            />
          </g>
        )}
        <path
          d="M64 108 l-8 108"
          stroke="#ffffff"
          strokeOpacity="0.5"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <rect
          x="42"
          y="90"
          width="116"
          height="10"
          rx="5"
          fill="#ffffff"
          opacity="0.9"
        />
        {cracker && <Cracker x={112} y={46} rotate={-18} />}
        <rect
          x="66"
          y="26"
          width="12"
          height="76"
          rx="6"
          fill="#8a5cf0"
          transform="rotate(-10 72 60)"
        />
        <circle cx="100" cy="172" r="24" fill="#ffffff" opacity="0.92" />
        <text x="100" y="180" textAnchor="middle" fontSize="22">
          {flavor?.emoji ?? base.emoji}
        </text>
      </svg>
    </div>
  );
}

/* ---------- ปุ่มเลือกแบบชิป ---------- */
function Chip({
  label,
  sub,
  price,
  active,
  disabled,
  onClick,
}: {
  label: string;
  sub?: string;
  price?: number;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-left text-sm font-medium transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100 ${
        active
          ? "scale-[1.03] border-grape-500 bg-grape-deep text-white shadow-soft"
          : "border-ink/10 bg-white text-ink hover:border-grape-300 hover:bg-grape-50"
      }`}
    >
      {active && (
        <span className="animate-pop-in grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white shadow">
          <Check size={14} strokeWidth={3} className="text-[#22C55E]" />
        </span>
      )}
      <span className="flex flex-col leading-tight">
        <span>{label}</span>
        {sub && (
          <span
            className={`text-[10px] ${active ? "text-white/70" : "text-ink/45"}`}
          >
            {sub}
          </span>
        )}
      </span>
      {price !== undefined && (
        <span
          className={`ml-auto rounded-full px-2 py-0.5 text-xs font-extrabold ${
            active ? "bg-white/25 text-white" : "bg-blossom-100 text-ink"
          }`}
        >
          {price > 0 && "+"}
          {price}
        </span>
      )}
    </button>
  );
}

/* ตัวเลือกของแต่ละแบบที่เลือกไว้ (เลือกได้หลายแบบพร้อมกัน) */
type Pick = { base: string | null; flavor: string | null; serve: ServeId };
const EMPTY: Pick = { base: null, flavor: null, serve: "together" };

export default function StickyMilkView() {
  const { addItem, openCart } = useCart();
  const [sel, setSel] = useState<Partial<Record<StickyPackageId, Pick>>>({});
  const [added, setAdded] = useState(false);

  const selected = STICKY_PACKAGES.filter((p) => sel[p.id]);
  const pickOf = (id: StickyPackageId): Pick => sel[id] ?? EMPTY;
  const update = (id: StickyPackageId, patch: Partial<Pick>) =>
    setSel((s) => ({ ...s, [id]: { ...(s[id] ?? EMPTY), ...patch } }));
  const togglePkg = (id: StickyPackageId) =>
    setSel((s) => {
      if (s[id]) {
        const n = { ...s };
        delete n[id];
        return n;
      }
      return { ...s, [id]: { ...EMPTY } };
    });

  const baseOf = (pk: Pick) =>
    STICKY_BASES.find((b) => b.id === pk.base) ?? null;
  const flavorOf = (pk: Pick) =>
    STICKY_FLAVORS.find((f) => f.id === pk.flavor) ?? null;

  const isReady = (p: (typeof STICKY_PACKAGES)[number]) => {
    const pk = pickOf(p.id);
    return (
      (!p.needFlavor || Boolean(pk.flavor)) &&
      (!p.needDrink || Boolean(pk.base))
    );
  };
  const total = selected.reduce((s, p) => s + p.price, 0);
  const ready = selected.length > 0 && selected.every(isReady);

  const scrollToBuilder = () =>
    document
      .getElementById("sticky-builder")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  /* จากตัวอย่าง: มีน้ำ → น้ำ+นมเหนียว · ไม่มีน้ำ+แครกเกอร์ → นมเหนียว+แครกเกอร์ */
  const pickExample = (b: string | null, f: string, c?: boolean) => {
    const id: StickyPackageId = b
      ? "drinkMilk"
      : c
        ? "milkCracker"
        : "milkOnly";
    setSel((s) => ({ ...s, [id]: { base: b, flavor: f, serve: "together" } }));
    scrollToBuilder();
  };

  const lineName = (p: (typeof STICKY_PACKAGES)[number]) => {
    const pk = pickOf(p.id);
    const b = baseOf(pk);
    const f = flavorOf(pk);
    const parts: string[] = [];
    if (p.needDrink && b) parts.push(b.nameTh);
    if (p.needFlavor && f) parts.push(f.nameTh);
    if (p.id === "crackerOnly" || p.id === "milkCracker")
      parts.push("แครกเกอร์");
    return `${p.nameTh}: ${parts.join(" + ")}`;
  };

  const handleAdd = () => {
    if (!ready) return;
    selected.forEach((p, i) => {
      const pk = pickOf(p.id);
      const options = [
        `${p.emoji} ${p.nameTh} (${p.price}/${p.unit})`,
        ...(p.id === "milkCracker"
          ? [STICKY_SERVE.find((x) => x.id === pk.serve)!.label]
          : []),
      ];
      addItem({
        id: `sticky-${p.id}-${Date.now()}-${i}`,
        name: lineName(p),
        price: p.price,
        options,
      });
    });
    setSel({});
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
    openCart();
  };

  const nameOf = (b: string | null, f: string) => {
    const fl = STICKY_FLAVORS.find((x) => x.id === f)!;
    if (!b) return `🍪 แครกเกอร์ + ${fl.emoji} ${fl.nameTh}`;
    const bs = STICKY_BASES.find((x) => x.id === b)!;
    return `${bs.emoji} ${bs.nameTh} + ${fl.emoji} ${fl.nameTh}`;
  };

  /* พรีวิวของแต่ละแบบ */
  const preview = (p: (typeof STICKY_PACKAGES)[number], size = 96) => {
    const pk = pickOf(p.id);
    const f = flavorOf(pk) ?? undefined;
    if (p.id === "crackerOnly")
      return <StickyCup base={null} cracker size={size} />;
    if (p.id === "milkOnly")
      return <StickyCup base={null} flavor={f} size={size} />;
    if (p.id === "milkCracker")
      return pk.serve === "separate" ? (
        <SeparateSet base={null} flavor={f} size={size} />
      ) : (
        <StickyCup base={null} flavor={f} cracker size={size} />
      );
    return <StickyCup base={baseOf(pk)} flavor={f} size={size} />;
  };

  return (
    <section className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* 🥂 ภาพประกอบตกแต่ง: แก้วนมเหนียว × แก้วแครกเกอร์ ชนกัน (ไม่บังเนื้อหา) */}
      <StickyCheersDecor className="absolute -right-2 top-0 hidden w-44 opacity-90 md:block lg:-right-6 lg:w-56 xl:-right-16 xl:w-64" />
      <StickyCheersDecor className="absolute -left-4 top-2 hidden w-36 -scale-x-100 opacity-70 lg:block xl:-left-14 xl:w-44" />

      {/* หัว */}
      <div className="relative mb-6 text-center">
        <div className="mx-auto mb-1 w-40 md:hidden">
          <StickyCheersDecor className="w-full" />
        </div>
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          🥛 เมนูนมเหนียว{" "}
          <span className="text-blossom-400">| Sticky Milk</span>
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-ink/60">
          นมเหนียวเลือกกินได้หลายแบบ จะกิน{" "}
          <span className="font-semibold text-grape-600">
            นมเหนียวอย่างเดียว
          </span>
          , คู่กับแครกเกอร์ หรือเลือกเป็นเครื่องดื่มราดนมเหนียวก็ได้ ✨
        </p>
      </div>

      {/* 💜 ข้อความเด่น */}
      <div className="rounded-3xl bg-gradient-to-r from-grape-600 to-blossom-500 p-5 text-center text-white shadow-card">
        <p className="font-display text-xl font-bold sm:text-2xl">
          {STICKY_NOTE.title}
        </p>
        <p className="mt-1 text-sm text-white/90">{STICKY_NOTE.th}</p>
        <p className="mt-0.5 text-[11px] italic text-white/60">
          {STICKY_NOTE.en}
        </p>
      </div>

      {/* 📦 4 แบบ — เลือกได้หลายแบบ */}
      <div id="sticky-builder" className="mt-6 scroll-mt-24">
        <p className="mb-2 text-sm font-semibold text-ink">
          1️⃣ เลือกแบบที่อยากกิน{" "}
          <span className="font-medium text-ink/40">
            (เลือกได้มากกว่า 1 แบบ · ไม่บังคับสั่งน้ำ)
          </span>
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STICKY_PACKAGES.map((p) => {
            const active = Boolean(sel[p.id]);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => togglePkg(p.id)}
                className={`relative flex flex-col rounded-2xl border p-4 text-left transition-all duration-200 active:scale-[0.98] ${
                  active
                    ? "border-grape-500 bg-grape-50 shadow-soft ring-2 ring-grape-deep"
                    : "border-ink/10 bg-white hover:border-grape-300 hover:bg-grape-50/60"
                }`}
              >
                <span
                  className={`absolute right-2.5 top-2.5 grid h-6 w-6 place-items-center rounded-full ring-2 ring-white shadow ${
                    active
                      ? "animate-pop-in bg-[#22C55E] text-white"
                      : "bg-white text-ink/20 ring-ink/10"
                  }`}
                >
                  <Check size={14} strokeWidth={3} />
                </span>
                <span className="text-2xl">{p.emoji}</span>
                <span className="mt-1 font-display text-base font-bold text-ink">
                  {p.nameTh}
                </span>
                <span className="text-[11px] text-ink/45">{p.nameEn}</span>
                <span className="mt-1.5 flex-1 text-xs leading-relaxed text-ink/65">
                  {p.desc}
                </span>
                <span className="mt-3 inline-flex items-baseline gap-1">
                  <span className="font-display text-2xl font-bold text-blossom-500">
                    {p.price}
                  </span>
                  <span className="text-xs font-medium text-ink/50">
                    บาท/{p.unit}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 🖼️ ตัวอย่าง Combination */}
      <div className="mt-6 rounded-3xl bg-white/70 p-4 ring-1 ring-white/70 sm:p-6">
        <p className="mb-3 text-center text-sm font-semibold text-grape-700">
          🧁 ตัวอย่าง Combination{" "}
          <span className="font-medium text-ink/45">(แตะเพื่อลองคู่นี้)</span>
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {STICKY_EXAMPLES.map((ex, i) => {
            const b = ex.base
              ? STICKY_BASES.find((x) => x.id === ex.base)
              : null;
            const f = STICKY_FLAVORS.find((x) => x.id === ex.flavor)!;
            return (
              <button
                key={i}
                type="button"
                onClick={() => pickExample(ex.base, ex.flavor, ex.cracker)}
                className="hover-lift group flex flex-col items-center rounded-2xl bg-white p-3 text-center shadow-soft ring-1 ring-ink/5 transition-all hover:ring-grape-300"
              >
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    ex.base
                      ? "bg-grape-50 text-grape-600"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {ex.base
                    ? "🥤 น้ำ + นมเหนียว · 30"
                    : "🍪 นมเหนียว + แครกเกอร์ · 30"}
                </span>
                <div className="my-1 transition-transform group-hover:-rotate-3 group-hover:scale-105">
                  <StickyCup
                    base={b}
                    flavor={f}
                    cracker={ex.cracker}
                    size={96}
                  />
                </div>
                <p className="text-xs font-semibold leading-snug text-ink">
                  {nameOf(ex.base, ex.flavor)}
                </p>
                <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-ink/50">
                  {ex.desc}
                </p>
                <span className="mt-1.5 text-[11px] font-medium text-grape-500">
                  ลองคู่นี้ →
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-center text-[11px] text-ink/45">
          ✨ ภาพเป็นเพียงตัวอย่างการจับคู่ —
          ลูกค้าเลือกเครื่องดื่มและรสนมเหนียวได้ตามใจ 💜
        </p>
      </div>

      {/* 📦 แบบแยก — มิกซ์เองที่บ้าน */}
      <div className="mt-4 grid gap-4 rounded-3xl bg-white/80 p-5 ring-1 ring-grape-100 sm:grid-cols-[auto_1fr] sm:items-center sm:p-6">
        <div className="mx-auto">
          <SeparateSet flavor={STICKY_FLAVORS[1]} size={120} />
        </div>
        <div>
          <p className="font-display text-lg font-bold text-grape-700 sm:text-xl">
            {STICKY_SEPARATE_NOTE.title}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-ink/70">
            {STICKY_SEPARATE_NOTE.th}
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {STICKY_SEPARATE_NOTE.points.map((pt) => (
              <li
                key={pt}
                className="rounded-full bg-grape-50 px-2.5 py-1 text-[11px] font-medium text-grape-700"
              >
                {pt}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              update("milkCracker", { serve: "separate" });
              scrollToBuilder();
            }}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-grape-600 to-blossom-500 px-4 py-2 text-xs font-semibold text-white transition-all hover:scale-[1.03]"
          >
            📦 สั่งแบบแยก →
          </button>
        </div>
      </div>

      {/* 🛠️ รายละเอียดของแต่ละแบบที่เลือก */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          {selected.length === 0 && (
            <div className="rounded-2xl bg-grape-50/70 p-5 text-center text-sm text-ink/60">
              👆 เลือกแบบที่อยากกินด้านบนก่อน (เลือกได้หลายแบบ)
              แล้วค่อยเลือกรส/น้ำตรงนี้
            </div>
          )}

          {selected.map((p) => {
            const pk = pickOf(p.id);
            const okay = isReady(p);
            return (
              <div
                key={p.id}
                className={`animate-pop-in rounded-3xl bg-white/90 p-4 ring-1 sm:p-5 ${
                  okay ? "ring-emerald-200" : "ring-grape-200"
                }`}
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="font-display text-base font-bold text-ink">
                    {p.emoji} {p.nameTh}{" "}
                    <span className="text-sm font-semibold text-blossom-500">
                      {p.price}
                    </span>
                    <span className="text-xs font-medium text-ink/45">
                      {" "}
                      บาท/{p.unit}
                    </span>
                  </p>
                  <button
                    type="button"
                    onClick={() => togglePkg(p.id)}
                    className="rounded-full bg-ink/5 px-2.5 py-1 text-[11px] font-medium text-ink/60 hover:bg-ink/10"
                  >
                    ✕ เอาออก
                  </button>
                </div>

                {p.id === "crackerOnly" && (
                  <p className="text-sm text-emerald-600">
                    ✓ พร้อมเพิ่มลงตะกร้าได้เลย ไม่ต้องเลือกอะไรเพิ่ม
                  </p>
                )}

                {p.needDrink && (
                  <div className="mb-4">
                    <p className="mb-2 text-xs font-semibold text-ink/70">
                      🥤 เลือกเครื่องดื่ม{" "}
                      <span className="font-medium text-ink/40">
                        (รวมในราคาแล้ว)
                      </span>
                    </p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                      {STICKY_BASES.map((b) => (
                        <Chip
                          key={b.id}
                          label={`${b.emoji} ${b.nameTh}`}
                          sub={b.nameEn}
                          active={pk.base === b.id}
                          onClick={() => update(p.id, { base: b.id })}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {p.needFlavor && (
                  <div>
                    <p className="mb-2 text-xs font-semibold text-ink/70">
                      🥄 เลือกรสนมเหนียว{" "}
                      <span className="font-medium text-ink/40">
                        (รวมในราคาแล้ว)
                      </span>
                    </p>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                      {STICKY_FLAVORS.map((f) => {
                        const active = pk.flavor === f.id;
                        return (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => update(p.id, { flavor: f.id })}
                            className={`group relative flex flex-col items-center rounded-2xl border p-2 text-center transition-all duration-200 active:scale-95 ${
                              active
                                ? "scale-[1.03] border-grape-500 bg-grape-50 shadow-soft ring-2 ring-grape-deep"
                                : "border-ink/10 bg-white hover:border-grape-300 hover:bg-grape-50/60"
                            }`}
                          >
                            {active && (
                              <span className="animate-pop-in absolute right-1 top-1 z-10 grid h-5 w-5 place-items-center rounded-full bg-[#22C55E] text-white shadow ring-2 ring-white">
                                <Check size={12} strokeWidth={3} />
                              </span>
                            )}
                            <div className="grid aspect-square w-full place-items-center rounded-xl bg-gradient-to-b from-cream-50 to-grape-50/60 transition-transform group-hover:scale-105">
                              <StickySpoon
                                color={f.color}
                                image={f.image}
                                size={64}
                              />
                            </div>
                            <span className="mt-1 text-[11px] font-semibold leading-tight text-ink">
                              {f.nameTh.replace("นมเหนียว", "")}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {p.id === "milkCracker" && (
                  <div className="mt-4">
                    <p className="mb-2 text-xs font-semibold text-ink/70">
                      🍪 รับแบบไหนดี
                    </p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {STICKY_SERVE.map((sv) => (
                        <Chip
                          key={sv.id}
                          label={sv.label}
                          sub={sv.desc}
                          active={pk.serve === sv.id}
                          onClick={() => update(p.id, { serve: sv.id })}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* สรุป */}
        <div className="rounded-3xl bg-white/95 p-6 shadow-soft ring-1 ring-ink/5 lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-wrap justify-center gap-1">
            {selected.length === 0 ? (
              <div className="grid h-[120px] w-[96px] place-items-center rounded-3xl bg-grape-50 text-4xl">
                🥛
              </div>
            ) : (
              selected.map((p) => (
                <div key={p.id}>
                  {preview(p, selected.length > 2 ? 64 : 88)}
                </div>
              ))
            )}
          </div>
          <h3 className="font-display mt-1 text-center text-lg font-semibold text-grape-700">
            {selected.length === 0
              ? "ยังไม่ได้เลือก"
              : `เลือกแล้ว ${selected.length} รายการ`}
          </h3>

          <div className="mt-3 space-y-2 border-t border-ink/5 pt-3 text-sm">
            {selected.map((p) => {
              const pk = pickOf(p.id);
              const b = baseOf(pk);
              const f = flavorOf(pk);
              const okay = isReady(p);
              return (
                <div key={p.id}>
                  <div className="flex justify-between gap-3">
                    <span className="text-ink/80">
                      {p.emoji} {p.nameTh}
                    </span>
                    <span className="font-medium text-ink">{p.price}</span>
                  </div>
                  <p
                    className={`text-[11px] ${okay ? "text-ink/50" : "text-blossom-500"}`}
                  >
                    {okay
                      ? [
                          b?.nameTh,
                          f?.nameTh,
                          p.id === "milkCracker"
                            ? STICKY_SERVE.find((x) => x.id === pk.serve)!.label
                            : null,
                        ]
                          .filter(Boolean)
                          .join(" · ") || "พร้อมเพิ่ม"
                      : p.needDrink && !b
                        ? "ยังไม่ได้เลือกเครื่องดื่ม"
                        : "ยังไม่ได้เลือกรสนมเหนียว"}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-dashed border-ink/15 pt-3">
            <span className="text-sm font-semibold text-grape-500">
              ราคารวม
            </span>
            <span className="font-display text-3xl font-bold text-blossom-500">
              {total}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!ready}
            className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
              added
                ? "bg-grape-500"
                : "bg-gradient-to-r from-grape-600 to-blossom-500 hover:scale-[1.02]"
            }`}
          >
            {added ? (
              <>
                <Check size={17} /> เพิ่มลงตะกร้าแล้ว!
              </>
            ) : (
              <>
                <Plus size={17} /> เพิ่มลงตะกร้า
                {selected.length > 1 ? ` (${selected.length} รายการ)` : ""}
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
