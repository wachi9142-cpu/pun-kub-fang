/**
 * lucide-react@1.17.0 ไม่ได้แนบไฟล์ .d.ts มาให้
 * ประกาศชนิดข้อมูลแบบเบา ๆ ให้ไอคอนรับ props ของ SVG ได้ (size, color, fill ฯลฯ)
 */
declare module "lucide-react" {
  import type { FC, SVGProps } from "react";

  export interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
  }

  export type LucideIcon = FC<LucideProps>;

  const icons: Record<string, LucideIcon>;
  export default icons;

  export const Menu: LucideIcon;
  export const X: LucideIcon;
  export const User: LucideIcon;
  export const ShoppingCart: LucideIcon;
  export const Heart: LucideIcon;
  export const Plus: LucideIcon;
  export const Check: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const ArrowLeft: LucideIcon;
  export const ArrowUp: LucideIcon;
  export const Sparkles: LucideIcon;
  export const Star: LucideIcon;
  export const Phone: LucideIcon;
  export const Clock: LucideIcon;
  export const MessageCircle: LucideIcon;
  export const Facebook: LucideIcon;
  export const Instagram: LucideIcon;
  export const Send: LucideIcon;
  export const BookOpen: LucideIcon;

  // ไอคอนอื่น ๆ ทั้งหมดของ lucide-react
  const _default: LucideIcon;
  export { _default };
}
