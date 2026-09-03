"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type CartLine = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  total: number;
  addItem: (item: { id: string; name: string; price: number }) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // เริ่มต้นที่ 2 แก้ว ให้ตรงกับดีไซน์ตัวอย่าง
  const [lines, setLines] = useState<CartLine[]>([
    { id: "grape-yogurt", name: "องุ่นโยเกิร์ตปั่น", price: 65, qty: 1 },
    { id: "strawberry-milk", name: "สตรอว์เบอร์รีนมสดปั่น", price: 60, qty: 1 },
  ]);

  const addItem = useCallback(
    (item: { id: string; name: string; price: number }) => {
      setLines((prev) => {
        const found = prev.find((l) => l.id === item.id);
        if (found) {
          return prev.map((l) =>
            l.id === item.id ? { ...l, qty: l.qty + 1 } : l,
          );
        }
        return [...prev, { ...item, qty: 1 }];
      });
    },
    [],
  );

  const removeItem = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const total = lines.reduce((s, l) => s + l.qty * l.price, 0);
    return { lines, count, total, addItem, removeItem, clear };
  }, [lines, addItem, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart ต้องอยู่ภายใน <CartProvider>");
  return ctx;
}
