"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import {
  STICKY_BASES,
  STICKY_FLAVORS,
  STICKY_STYLES,
  STICKY_CRACKER_PRICE,
  STICKY_CRACKER_SET_PRICE,
  STICKY_SEPARATE_SET_PRICE,
  STICKY_SEPARATE_NOTE,
  STICKY_EXAMPLES,
  STICKY_NOTE,
  type StickyBase,
  type StickyFlavor,
} from "@/data/site";
import { useCart } from "@/components/cart/CartContext";

type StyleId = (typeof STICKY_STYLES)[number]["id"];

const SWEET = [
  { id: "less", label: "หวานน้อย" },
  { id: "50", label: "หวานกลาง 50%" },
  { id: "regular", label: "หวานปกติ" },
];

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

export default function StickyMilkView() {
  const { addItem, openCart } = useCart();
  const [style, setStyle] = useState<StyleId>("pour");
  const [baseId, setBaseId] = useState<string | null>(null);
  const [flavorId, setFlavorId] = useState<string | null>(null);
  const [extraCracker, setExtraCracker] = useState(false);
  const [sweet, setSweet] = useState("regular");
  const [added, setAdded] = useState(false);

  const noDrink = style === "crackerOnly";
  const separate = style === "separate";
  const base = noDrink
    ? null
    : (STICKY_BASES.find((b) => b.id === baseId) ?? null);
  const flavor = STICKY_FLAVORS.find((f) => f.id === flavorId);
  const cracker = noDrink || separate || extraCracker;

  const total = noDrink
    ? STICKY_CRACKER_SET_PRICE + (flavor?.price ?? 0)
    : separate
      ? (base?.price ?? 0) + STICKY_SEPARATE_SET_PRICE + (flavor?.price ?? 0)
      : (base?.price ?? 0) +
        (flavor?.price ?? 0) +
        (extraCracker ? STICKY_CRACKER_PRICE : 0);
  // แบบแยก: มีน้ำหรือไม่ก็ได้ · แบบราด: ต้องมีน้ำ · แบบแครกเกอร์: ไม่มีน้ำ
  const ready = Boolean(flavor) && (noDrink || separate || Boolean(base));

  const chooseBase = (id: string | null) => {
    if (id === null) {
      if (!separate) setStyle("crackerOnly");
      setBaseId(null);
    } else {
      if (noDrink) setStyle("pour");
      setBaseId(id);
    }
  };
  const chooseStyle = (id: StyleId) => {
    setStyle(id);
    if (id === "crackerOnly") setBaseId(null);
  };

  const pick = (b: string | null, f: string, c?: boolean) => {
    chooseBase(b);
    setFlavorId(f);
    setExtraCracker(Boolean(b && c));
    document
      .getElementById("sticky-builder")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAdd = () => {
    if (!ready || !flavor) return;
    const name = separate
      ? `แบบแยก: ${flavor.nameTh} + แครกเกอร์${base ? ` + ${base.nameTh}` : ""}`
      : noDrink
        ? `แครกเกอร์ + ${flavor.nameTh}`
        : `${base!.nameTh} + ${flavor.nameTh}`;
    const options = [
      STICKY_STYLES.find((s) => s.id === style)!.label,
      ...(base ? [SWEET.find((s) => s.id === sweet)!.label] : []),
      ...(style === "pour" && extraCracker ? ["🍪 เพิ่มแครกเกอร์"] : []),
    ];
    addItem({ id: `sticky-${Date.now()}`, name, price: total, options });
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

  return (
    <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
      {/* หัว */}
      <div className="mb-6 text-center">
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          🥛 นมเหนียว <span className="text-blossom-400">| Sticky Milk</span>
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-ink/60">
          เลือกได้ตามสไตล์ที่ชอบ — จะกินคู่กับเครื่องดื่ม หรือเลือกเป็น{" "}
          <span className="font-semibold text-grape-600">
            นมเหนียวกับแครกเกอร์อย่างเดียว
          </span>{" "}
          ก็ได้ ✨
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

      {/* 🖼️ ตัวอย่าง Combination */}
      <div className="mt-4 rounded-3xl bg-white/70 p-4 ring-1 ring-white/70 sm:p-6">
        <p className="mb-3 text-center text-sm font-semibold text-grape-700">
          🧁 ตัวอย่าง Combination{" "}
          <span className="font-medium text-ink/45">
            (แตะเพื่อลองคู่นี้ — หรือจัดเองด้านล่าง)
          </span>
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
                onClick={() => pick(ex.base, ex.flavor, ex.cracker)}
                className="hover-lift group flex flex-col items-center rounded-2xl bg-white p-3 text-center shadow-soft ring-1 ring-ink/5 transition-all hover:ring-grape-300"
              >
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    ex.base
                      ? "bg-grape-50 text-grape-600"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {ex.base ? "🥤 มีน้ำ" : "🍪 ไม่ใส่น้ำ"}
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
              chooseStyle("separate");
              document
                .getElementById("sticky-builder")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-grape-600 to-blossom-500 px-4 py-2 text-xs font-semibold text-white transition-all hover:scale-[1.03]"
          >
            📦 สั่งแบบแยก →
          </button>
        </div>
      </div>

      {/* 🛠️ จัดเอง */}
      <div
        id="sticky-builder"
        className="mt-8 grid scroll-mt-24 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"
      >
        <div className="space-y-6">
          {/* 1️⃣ */}
          <div>
            <p className="mb-2 text-sm font-semibold text-ink">
              1️⃣ เลือกเครื่องดื่ม{" "}
              <span className="font-medium text-ink/40">
                — เลือกได้ หรือไม่เลือกก็ได้
              </span>
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {STICKY_BASES.map((b) => (
                <Chip
                  key={b.id}
                  label={`${b.emoji} ${b.nameTh}`}
                  sub={b.nameEn}
                  price={b.price}
                  active={!noDrink && baseId === b.id}
                  onClick={() => chooseBase(b.id)}
                />
              ))}
              <Chip
                label="🚫 ไม่เอาน้ำ"
                sub={
                  separate
                    ? "เอาแค่กระปุก + แครกเกอร์"
                    : "กินนมเหนียวกับแครกเกอร์"
                }
                active={noDrink || (separate && !base)}
                onClick={() => chooseBase(null)}
              />
            </div>
          </div>

          {/* 2️⃣ */}
          <div>
            <p className="mb-2 text-sm font-semibold text-ink">
              2️⃣ เลือกรสนมเหนียว{" "}
              <span className="font-medium text-ink/40">(จับคู่ได้ทุกแบบ)</span>
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {STICKY_FLAVORS.map((f) => (
                <Chip
                  key={f.id}
                  label={`${f.emoji} ${f.nameTh}`}
                  sub={f.nameEn}
                  price={f.price}
                  active={flavorId === f.id}
                  onClick={() => setFlavorId(f.id)}
                />
              ))}
            </div>
          </div>

          {/* 3️⃣ */}
          <div>
            <p className="mb-2 text-sm font-semibold text-ink">
              3️⃣ เลือกรูปแบบการกิน 🍪
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {STICKY_STYLES.map((s) => (
                <Chip
                  key={s.id}
                  label={s.label}
                  sub={s.desc}
                  price={
                    s.id === "crackerOnly"
                      ? STICKY_CRACKER_SET_PRICE
                      : s.id === "separate"
                        ? STICKY_SEPARATE_SET_PRICE
                        : undefined
                  }
                  active={style === s.id}
                  onClick={() => chooseStyle(s.id)}
                />
              ))}
            </div>
            {style === "pour" && (
              <div className="mt-2">
                <Chip
                  label="🍪 เพิ่มแครกเกอร์"
                  sub="ตัวเลือกเสริมของแบบราดน้ำ"
                  price={STICKY_CRACKER_PRICE}
                  active={extraCracker}
                  onClick={() => setExtraCracker((v) => !v)}
                />
              </div>
            )}
            <p className="mt-2 text-[11px] text-ink/45">
              * อยากซื้อแครกเกอร์อย่างเดียว เลือกได้จากเมนู{" "}
              <a
                href="/menu/snacks"
                className="font-semibold text-grape-600 underline-offset-2 hover:underline"
              >
                ขนม
              </a>
            </p>
          </div>

          {/* ความหวาน (เฉพาะมีน้ำ) */}
          {!noDrink && !(separate && !base) && (
            <div>
              <p className="mb-2 text-sm font-semibold text-ink">
                🍯 ระดับความหวานของน้ำ
              </p>
              <div className="flex flex-wrap gap-2">
                {SWEET.map((s) => (
                  <Chip
                    key={s.id}
                    label={s.label}
                    active={sweet === s.id}
                    onClick={() => setSweet(s.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* สรุป + พรีวิว */}
        <div className="rounded-3xl bg-white/95 p-6 shadow-soft ring-1 ring-ink/5 lg:sticky lg:top-24 lg:self-start">
          <div className="grid place-items-center">
            {separate ? (
              <SeparateSet base={base} flavor={flavor} size={130} />
            ) : ready || base || noDrink ? (
              <StickyCup
                base={base}
                flavor={flavor}
                cracker={cracker}
                size={130}
              />
            ) : (
              <div className="grid h-[162px] w-[130px] place-items-center rounded-3xl bg-grape-50 text-4xl">
                🥛
              </div>
            )}
          </div>
          <h3 className="font-display mt-1 text-center text-lg font-semibold text-grape-700">
            {ready
              ? (separate ? "📦 แบบแยก: " : "") +
                nameOf(base?.id ?? null, flavor!.id)
                  .replace(/[^\p{L}\p{M}\p{N}\s+:]/gu, "")
                  .trim()
              : "แก้วของคุณ"}
          </h3>
          {!ready && (
            <p className="mt-1 text-center text-xs text-ink/50">
              {noDrink || separate
                ? "เลือกรสนมเหนียวได้เลย"
                : "เลือกน้ำ (หรือไม่เอาน้ำ) และรสนมเหนียว"}
            </p>
          )}

          <div className="mt-3 space-y-1.5 border-t border-ink/5 pt-3 text-sm">
            {separate && (
              <div className="flex justify-between gap-3">
                <span className="text-ink/70">
                  📦 ชุดแยก: กระปุก + แครกเกอร์มีฝา
                </span>
                <span className="font-medium text-ink">
                  {STICKY_SEPARATE_SET_PRICE}
                </span>
              </div>
            )}
            {noDrink ? (
              <div className="flex justify-between gap-3">
                <span className="text-ink/70">🍪 ชุดนมเหนียว + แครกเกอร์</span>
                <span className="font-medium text-ink">
                  {STICKY_CRACKER_SET_PRICE}
                </span>
              </div>
            ) : (
              base && (
                <div className="flex justify-between gap-3">
                  <span className="text-ink/70">
                    {base.emoji} {base.nameTh}
                  </span>
                  <span className="font-medium text-ink">{base.price}</span>
                </div>
              )
            )}
            {flavor && (
              <div className="flex justify-between gap-3">
                <span className="text-ink/70">
                  {flavor.emoji} {flavor.nameTh}
                </span>
                <span className="font-medium text-blossom-500">
                  +{flavor.price}
                </span>
              </div>
            )}
            {style === "pour" && extraCracker && (
              <div className="flex justify-between gap-3">
                <span className="text-ink/70">🍪 เพิ่มแครกเกอร์</span>
                <span className="font-medium text-blossom-500">
                  +{STICKY_CRACKER_PRICE}
                </span>
              </div>
            )}
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
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
