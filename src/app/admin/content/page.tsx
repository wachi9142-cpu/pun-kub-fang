import type { Metadata } from "next";
import ContentAdmin from "@/components/admin/ContentAdmin";

export const metadata: Metadata = { title: "จัดการเนื้อหา | ปั่นกับฟ่าง" };

export default function AdminContentPage() {
  return <ContentAdmin />;
}
