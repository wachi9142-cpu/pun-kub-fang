"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { CartProvider, useCart } from "@/components/cart/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import BrandLogo from "@/components/BrandLogo";

function ShellHeader({
  backHref,
  backLabel,
}: {
  backHref: string;
  backLabel: string;
}) {
  const { count, openCart } = useCart();
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <BrandLogo size={44} className="ring-1 ring-ink/10" />
          <span className="leading-none">
            <span className="font-display block text-lg font-semibold text-ink">
              ปั่นกับ<span className="text-grape-600">ฟ่าง</span>
            </span>
            <span className="text-[10px] font-medium tracking-[0.28em] text-ink/45 uppercase">
              Smoothie &amp; Drinks
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 rounded-full bg-grape-100 px-4 py-2 text-sm font-semibold text-grape-deep transition-colors hover:bg-grape-200"
          >
            <ArrowLeft size={16} /> {backLabel}
          </Link>
          <button
            onClick={openCart}
            aria-label="ตะกร้าสินค้า"
            className="relative grid h-10 w-10 place-items-center rounded-full text-ink/70 transition-colors hover:bg-grape-100"
          >
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-blossom-500 px-1 text-[11px] font-bold text-white shadow">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

type MenuPageShellProps = {
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
};

/** โครงหน้าสำหรับหน้าเมนูย่อย — มี CartProvider + header (โลโก้/ปุ่มกลับ/ตะกร้า) + footer */
export default function MenuPageShell({
  children,
  backHref = "/menu",
  backLabel = "กลับไปเมนูทั้งหมด",
}: MenuPageShellProps) {
  return (
    <CartProvider>
      <ShellHeader backHref={backHref} backLabel={backLabel} />
      <CartDrawer />
      <main className="pb-12">{children}</main>
      <footer className="bg-gradient-to-br from-grape-600 to-grape-700 py-6 text-center text-sm text-white/70">
        © 2024 ปั่นกับฟ่าง · Smoothie &amp; Drinks
      </footer>
    </CartProvider>
  );
}
