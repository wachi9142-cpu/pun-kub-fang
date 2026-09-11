"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/* เก็บตะกร้าไว้ใน localStorage — ให้ตะกร้าอยู่ครบตอนเปลี่ยนหน้า/รีเฟรช (แต่ละหน้ามี CartProvider ของตัวเอง) */
const STORAGE_KEY = "pkf-cart-v1";

export type CartLine = {
  /** ไอดีบรรทัด (unique ต่อการปรับแต่ง 1 แบบ) */
  id: string;
  /** ชื่อเมนูหลัก */
  name: string;
  /** ราคาต่อแก้ว (รวมท็อปปิ้งแล้ว) */
  price: number;
  qty: number;
  /** ตัวเลือกที่ลูกค้าเลือก (หวาน/ปั่น/ท็อปปิ้ง ฯลฯ) */
  options?: string[];
};

export type AddItemInput = {
  id: string;
  name: string;
  price: number;
  options?: string[];
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  total: number;
  addItem: (item: AddItemInput) => void;
  setQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  drawerOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // โหลดตะกร้าจากเครื่องตอน mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setLines(parsed);
      }
    } catch {
      /* ข้อมูลเสีย/ไม่มี localStorage → เริ่มตะกร้าว่าง */
    }
    setHydrated(true);
  }, []);

  // บันทึกทุกครั้งที่ตะกร้าเปลี่ยน (หลังโหลดเสร็จแล้วเท่านั้น กันเขียนทับด้วยค่าว่าง)
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* เต็ม/ปิดใช้งาน → ข้าม */
    }
  }, [lines, hydrated]);

  const addItem = useCallback((item: AddItemInput) => {
    setLines((prev) => {
      const found = prev.find((l) => l.id === item.id);
      if (found) {
        return prev.map((l) =>
          l.id === item.id ? { ...l, qty: l.qty + 1 } : l,
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      prev.map((l) => (l.id === id ? { ...l, qty: Math.max(1, qty) } : l)),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clear = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setDrawerOpen(true), []);
  const closeCart = useCallback(() => setDrawerOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const total = lines.reduce((s, l) => s + l.qty * l.price, 0);
    return {
      lines,
      count,
      total,
      addItem,
      setQty,
      removeItem,
      clear,
      drawerOpen,
      openCart,
      closeCart,
    };
  }, [
    lines,
    addItem,
    setQty,
    removeItem,
    clear,
    drawerOpen,
    openCart,
    closeCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart ต้องอยู่ภายใน <CartProvider>");
  return ctx;
}
