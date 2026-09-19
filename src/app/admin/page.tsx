import type { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "จัดการเมนู | ปั่นกับฟ่าง",
  description: "ระบบหลังบ้านสำหรับจัดการเมนูและรูปสินค้า",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
