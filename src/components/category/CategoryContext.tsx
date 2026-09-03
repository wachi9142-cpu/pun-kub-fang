"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { CategoryId } from "@/data/site";

type CategoryContextValue = {
  active: CategoryId;
  setActive: (id: CategoryId) => void;
  /** เลือกหมวด + เลื่อนไปยังเมนูเครื่องดื่ม */
  goToCategory: (id: CategoryId) => void;
};

const CategoryContext = createContext<CategoryContextValue | null>(null);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<CategoryId>("fruit");

  const goToCategory = useCallback((id: CategoryId) => {
    setActive(id);
    // รอ state อัปเดตนิดนึงแล้วค่อยเลื่อน
    requestAnimationFrame(() => {
      document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  return (
    <CategoryContext.Provider value={{ active, setActive, goToCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const ctx = useContext(CategoryContext);
  if (!ctx) throw new Error("useCategory ต้องอยู่ภายใน <CategoryProvider>");
  return ctx;
}
