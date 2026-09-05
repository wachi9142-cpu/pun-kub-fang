"use client";

import { useEffect, useState } from "react";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import { NAV_ITEMS } from "@/data/site";
import { useCart } from "@/components/cart/CartContext";
import BrandLogo from "@/components/BrandLogo";

export default function Navbar() {
  const { count, openCart } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-ink/10 bg-cream-white/95 backdrop-blur-md shadow-[0_8px_24px_-18px_rgba(41,33,46,0.5)]"
          : "border-transparent bg-cream-white/80 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* โลโก้ */}
        <a href="#home" className="flex items-center gap-2.5 shrink-0">
          <BrandLogo size={46} className="ring-1 ring-ink/10" />
          <span className="leading-none">
            <span className="font-display block text-lg font-semibold text-ink sm:text-xl">
              ปั่นกับ<span className="text-blossom-500">ฟ่าง</span>
            </span>
            <span className="text-[10px] font-medium tracking-[0.28em] text-ink/45 uppercase">
              Smoothie &amp; Drinks
            </span>
          </span>
        </a>

        {/* เมนูจอใหญ่ */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item, i) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`rounded-full px-3.5 py-2 text-sm transition-colors hover:bg-grape-50 hover:text-grape-deep ${
                  i === 0
                    ? "font-semibold text-grape-deep"
                    : "font-medium text-ink/80"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ปุ่มขวา */}
        <div className="flex items-center gap-1.5">
          <button
            aria-label="บัญชีผู้ใช้"
            className="grid h-10 w-10 place-items-center rounded-full text-grape-500 transition-colors hover:bg-grape-100 hover:text-grape-700"
          >
            <User size={20} />
          </button>

          <button
            onClick={openCart}
            aria-label="ตะกร้าสินค้า"
            className="relative grid h-10 w-10 place-items-center rounded-full text-grape-500 transition-colors hover:bg-grape-100 hover:text-grape-700"
          >
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-blossom-500 px-1 text-[11px] font-bold text-white shadow">
                {count}
              </span>
            )}
          </button>

          <button
            aria-label="เปิดเมนู"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-grape-600 transition-colors hover:bg-grape-100 lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* เมนูมือถือ */}
      {open && (
        <div className="border-t border-grape-100 bg-white/95 px-4 pb-4 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-grape-600 hover:bg-grape-50"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
