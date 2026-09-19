import type { Metadata } from "next";
import OrdersAdmin from "@/components/admin/OrdersAdmin";

export const metadata: Metadata = { title: "จัดการออเดอร์ | ปั่นกับฟ่าง" };

export default function AdminOrdersPage() {
  return <OrdersAdmin />;
}
