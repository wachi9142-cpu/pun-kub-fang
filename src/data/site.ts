/* ข้อมูลทั้งหมดของเว็บ ปั่นกับฟ่าง — แก้ที่ไฟล์นี้ที่เดียว */

export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "หน้าแรก", href: "#home" },
  { label: "เมนูเครื่องดื่ม", href: "#menu" },
  { label: "มิกซ์กับฟ่าง ✨", href: "#mix" },
  { label: "โปรโมชั่น", href: "#promo" },
  { label: "เกี่ยวกับร้าน", href: "#about" },
  { label: "ติดต่อเรา", href: "#contact" },
];

/* ลิงก์ในฟุตเตอร์ — ใส่รีวิวไว้ตรงนี้ (ไม่รกแถบบน) */
export const FOOTER_LINKS: NavItem[] = [
  { label: "หน้าแรก", href: "#home" },
  { label: "เมนูเครื่องดื่ม", href: "#menu" },
  { label: "มิกซ์กับฟ่าง", href: "#mix" },
  { label: "โปรโมชั่น", href: "#promo" },
  { label: "รีวิวลูกค้า", href: "#reviews" },
  { label: "เกี่ยวกับร้าน", href: "#about" },
  { label: "ติดต่อเรา", href: "#contact" },
];

export type SmoothiePalette = {
  /** สีบนสุด (วิปครีม/โฟม) */
  foam: string;
  /** สีเนื้อเครื่องดื่มด้านบน */
  top: string;
  /** สีเนื้อเครื่องดื่มด้านล่าง (ไล่เฉด) */
  bottom: string;
};

/* ---------- หมวดหมู่เครื่องดื่ม ---------- */
export type CategoryId =
  | "fruit"
  | "seasonal"
  | "soda"
  | "bearmilk"
  | "tea"
  | "coffee"
  | "soft";

export type DrinkCategory = {
  id: CategoryId;
  label: string;
  emoji: string;
  desc: string;
  palette: SmoothiePalette;
  tint: string; // สีพื้นการ์ดหมวด
};

export const DRINK_CATEGORIES: DrinkCategory[] = [
  {
    id: "fruit",
    label: "ผลไม้สด",
    emoji: "🍓",
    desc: "ปั่นสดจากผลไม้แท้ ๆ",
    palette: { foam: "#fff2f6", top: "#ff9ec0", bottom: "#f0507f" },
    tint: "from-blossom-100 to-blossom-200/50",
  },
  {
    id: "soda",
    label: "อิตาเลียนโซดา",
    emoji: "🧊",
    desc: "ซ่าสดชื่น สีสันสดใส",
    palette: { foam: "#eaf7ff", top: "#8fd6ff", bottom: "#2b9be0" },
    tint: "from-sky-100 to-sky-200/50",
  },
  {
    id: "bearmilk",
    label: "นมหมี",
    emoji: "🐻",
    desc: "นมสดปั่นหอมมัน นุ่มละมุน",
    palette: { foam: "#fffaf0", top: "#ffe3c2", bottom: "#f3c17e" },
    tint: "from-amber-100 to-amber-200/50",
  },
  {
    id: "tea",
    label: "ชา",
    emoji: "🍵",
    desc: "ชานม ชาเขียว หอมกลมกล่อม",
    palette: { foam: "#fff0df", top: "#f0a962", bottom: "#cf6f26" },
    tint: "from-orange-100 to-amber-200/50",
  },
  {
    id: "coffee",
    label: "กาแฟ",
    emoji: "☕",
    desc: "คั่วเข้ม สดชื่น ตื่นตัว",
    palette: { foam: "#efe2d6", top: "#a9764f", bottom: "#5b3a24" },
    tint: "from-amber-100 to-orange-200/40",
  },
  {
    id: "soft",
    label: "น้ำอัดลม",
    emoji: "🥤",
    desc: "ซ่า เย็น ดับกระหาย",
    palette: { foam: "#f3ecff", top: "#b98cf0", bottom: "#7c3fc4" },
    tint: "from-grape-100 to-grape-200/60",
  },
  {
    id: "seasonal",
    label: "ผลไม้ปั่นตามฤดูกาล",
    emoji: "🍉",
    desc: "ผลไม้ตามฤดู สดใหม่หมุนเวียน",
    palette: { foam: "#fff0f2", top: "#ff8faa", bottom: "#e8455f" },
    tint: "from-lime-100 to-rose-200/50",
  },
];

/* ---------- เมนูเครื่องดื่มทั้งหมด ---------- */
export type MenuItem = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  likes: number;
  emoji: string;
  category: CategoryId;
  palette: SmoothiePalette;
  badge?: string;
  popular?: boolean;
  /** รูปจริงของเมนู เช่น "/menu/grape-yogurt.webp" — ถ้าไม่ใส่จะใช้แก้ว SVG อัตโนมัติ */
  image?: string;
};

export const MENU_ITEMS: MenuItem[] = [
  /* ผลไม้สด */
  {
    id: "grape-yogurt",
    name: "องุ่นโยเกิร์ตปั่น",
    tagline: "องุ่นม่วงหวานฉ่ำ + โยเกิร์ต",
    price: 65,
    likes: 125,
    emoji: "🍇",
    category: "fruit",
    badge: "ขายดี",
    popular: true,
    palette: { foam: "#f3e9ff", top: "#b98cf0", bottom: "#7c3fc4" },
  },
  {
    id: "strawberry-milk",
    name: "สตรอว์เบอร์รีนมสดปั่น",
    tagline: "สตรอว์เบอร์รีสด + นมสดเข้มข้น",
    price: 60,
    likes: 98,
    emoji: "🍓",
    category: "fruit",
    popular: true,
    palette: { foam: "#fff2f6", top: "#ff9ec0", bottom: "#f0507f" },
  },
  {
    id: "mango-milk",
    name: "มะม่วงนมสดปั่น",
    tagline: "มะม่วงสุกหวาน + นมสด",
    price: 65,
    likes: 112,
    emoji: "🥭",
    category: "fruit",
    popular: true,
    palette: { foam: "#fff7e6", top: "#ffcf6b", bottom: "#f2a52c" },
  },
  {
    id: "blueberry-yogurt",
    name: "บลูเบอร์รีโยเกิร์ตปั่น",
    tagline: "บลูเบอร์รี + โยเกิร์ตเปรี้ยวหวาน",
    price: 65,
    likes: 103,
    emoji: "🔵",
    category: "fruit",
    palette: { foam: "#eef0ff", top: "#8f9bf0", bottom: "#5257c9" },
  },

  /* 🍉 ผลไม้ปั่นตามฤดูกาล */
  {
    id: "watermelon-smoothie",
    name: "แตงโมปั่น",
    tagline: "แตงโมหวานฉ่ำ เย็นชื่นใจ",
    price: 50,
    likes: 118,
    emoji: "🍉",
    category: "seasonal",
    badge: "ตามฤดู",
    popular: true,
    palette: { foam: "#fff0f2", top: "#ff8faa", bottom: "#e8455f" },
  },
  {
    id: "cantaloupe-milk",
    name: "แคนตาลูปนมสดปั่น",
    tagline: "แคนตาลูปหอมหวาน + นมสด",
    price: 55,
    likes: 84,
    emoji: "🍈",
    category: "seasonal",
    palette: { foam: "#fdfbe8", top: "#ffe08a", bottom: "#f2a52c" },
  },
  {
    id: "pineapple-smoothie",
    name: "สับปะรดปั่น",
    tagline: "สับปะรดหวานอมเปรี้ยว สดชื่น",
    price: 50,
    likes: 72,
    emoji: "🍍",
    category: "seasonal",
    palette: { foam: "#fdf7d8", top: "#f2d873", bottom: "#c9a52a" },
  },
  {
    id: "lychee-smoothie",
    name: "ลิ้นจี่ปั่น",
    tagline: "ลิ้นจี่หอมหวาน เนื้อนุ่มละมุน",
    price: 55,
    likes: 90,
    emoji: "🌸",
    category: "seasonal",
    badge: "ตามฤดู",
    palette: { foam: "#fff5fb", top: "#ffc0e6", bottom: "#e86fb0" },
  },

  /* อิตาเลียนโซดา */
  {
    id: "blue-hawaii-soda",
    name: "บลูฮาวายโซดา",
    tagline: "สีฟ้าสดใส ซ่าเย็นชื่นใจ",
    price: 55,
    likes: 87,
    emoji: "🧊",
    category: "soda",
    popular: true,
    palette: { foam: "#eaf7ff", top: "#8fd6ff", bottom: "#2b9be0" },
  },
  {
    id: "strawberry-soda",
    name: "สตรอว์เบอร์รีโซดา",
    tagline: "หวานอมเปรี้ยว ซ่ากำลังดี",
    price: 55,
    likes: 74,
    emoji: "🍓",
    category: "soda",
    palette: { foam: "#fff0f4", top: "#ff9db6", bottom: "#ef4b6e" },
  },
  {
    id: "lychee-soda",
    name: "ลิ้นจี่โซดา",
    tagline: "กลิ่นลิ้นจี่หอม ๆ ซ่าละมุน",
    price: 55,
    likes: 69,
    emoji: "🌸",
    category: "soda",
    palette: { foam: "#fff5fb", top: "#ffc0e6", bottom: "#e86fb0" },
  },
  {
    id: "green-apple-soda",
    name: "กรีนแอปเปิลโซดา",
    tagline: "แอปเปิลเขียวเปรี้ยวสดชื่น",
    price: 55,
    likes: 63,
    emoji: "🍏",
    category: "soda",
    palette: { foam: "#f5ffe8", top: "#c3e87a", bottom: "#7cb32b" },
  },

  /* นมหมี */
  {
    id: "bear-original",
    name: "นมหมีออริจินัลปั่น",
    tagline: "นมสดหอมมัน นุ่มละมุน",
    price: 55,
    likes: 91,
    emoji: "🐻",
    category: "bearmilk",
    popular: true,
    palette: { foam: "#fffaf0", top: "#ffe9c9", bottom: "#f3c17e" },
  },
  {
    id: "bear-pink",
    name: "นมหมีชมพูปั่น",
    tagline: "นมชมพูหวานหอม น่ารักสุด ๆ",
    price: 60,
    likes: 108,
    emoji: "🐻",
    category: "bearmilk",
    badge: "น่ารัก",
    popular: true,
    palette: { foam: "#fff2f6", top: "#ffcde0", bottom: "#f68fb4" },
  },
  {
    id: "bear-thaitea",
    name: "นมหมีชาไทยปั่น",
    tagline: "ชาไทยเข้ม + นมสดหมี",
    price: 60,
    likes: 82,
    emoji: "🐻",
    category: "bearmilk",
    palette: { foam: "#fff0e0", top: "#f4b06a", bottom: "#d97a2b" },
  },
  {
    id: "bear-choco",
    name: "นมหมีช็อกโกปั่น",
    tagline: "ช็อกโกเข้ม + นมสดหมี",
    price: 60,
    likes: 77,
    emoji: "🐻",
    category: "bearmilk",
    palette: { foam: "#f3e9e0", top: "#b98a63", bottom: "#7a5334" },
  },

  /* ชา */
  {
    id: "thai-milk-tea",
    name: "ชานมไทยปั่น",
    tagline: "ชาไทยแท้ หวานมันกลมกล่อม",
    price: 55,
    likes: 96,
    emoji: "🍵",
    category: "tea",
    popular: true,
    palette: { foam: "#fff0df", top: "#f0a962", bottom: "#cf6f26" },
  },
  {
    id: "matcha-milk",
    name: "มัทฉะนมสดปั่น",
    tagline: "มัทฉะแท้ + นมสดหอมมัน",
    price: 65,
    likes: 89,
    emoji: "🍵",
    category: "tea",
    popular: true,
    palette: { foam: "#f1f7e8", top: "#a8ce7a", bottom: "#5f9a3f" },
  },
  {
    id: "lemon-tea",
    name: "ชามะนาวปั่น",
    tagline: "ชาหอม + มะนาวสด เปรี้ยวซ่า",
    price: 50,
    likes: 61,
    emoji: "🍋",
    category: "tea",
    palette: { foam: "#fdf7d8", top: "#f2d873", bottom: "#c9a52a" },
  },
  {
    id: "green-tea-milk",
    name: "ชาเขียวนมปั่น",
    tagline: "ชาเขียวหอม + นมสด",
    price: 55,
    likes: 70,
    emoji: "🍵",
    category: "tea",
    palette: { foam: "#eef7ea", top: "#9ec97e", bottom: "#568a3c" },
  },

  /* กาแฟ */
  {
    id: "espresso-blend",
    name: "เอสเพรสโซเย็นปั่น",
    tagline: "กาแฟคั่วเข้ม สดชื่นตื่นตัว",
    price: 60,
    likes: 84,
    emoji: "☕",
    category: "coffee",
    popular: true,
    palette: { foam: "#efe2d6", top: "#a9764f", bottom: "#5b3a24" },
  },
  {
    id: "latte-blend",
    name: "ลาเต้เย็นปั่น",
    tagline: "กาแฟนุ่ม + นมสดละมุน",
    price: 60,
    likes: 79,
    emoji: "☕",
    category: "coffee",
    palette: { foam: "#f3e7d8", top: "#c39a70", bottom: "#8a5f3a" },
  },
  {
    id: "mocha-blend",
    name: "มอคค่าปั่น",
    tagline: "กาแฟ + ช็อกโกเข้มข้น",
    price: 65,
    likes: 73,
    emoji: "☕",
    category: "coffee",
    palette: { foam: "#eaddd2", top: "#9c6f4c", bottom: "#5f3d24" },
  },
  {
    id: "caramel-blend",
    name: "คาราเมลมัคคิอาโตปั่น",
    tagline: "คาราเมลหอมหวาน + กาแฟ",
    price: 65,
    likes: 88,
    emoji: "☕",
    category: "coffee",
    badge: "แนะนำ",
    palette: { foam: "#f6e9d5", top: "#cf9a5f", bottom: "#9a6a34" },
  },

  /* น้ำอัดลม */
  {
    id: "cola",
    name: "โคล่าปั่นหิมะ",
    tagline: "โคล่าซ่า ปั่นเย็นเป็นเกล็ด",
    price: 45,
    likes: 66,
    emoji: "🥤",
    category: "soft",
    popular: true,
    palette: { foam: "#e8ddd5", top: "#6b4a35", bottom: "#3a251a" },
  },
  {
    id: "red-soda",
    name: "น้ำแดงมะนาวโซดา",
    tagline: "น้ำแดงหวานเย็น + มะนาวซ่า",
    price: 45,
    likes: 58,
    emoji: "🥤",
    category: "soft",
    palette: { foam: "#ffeef0", top: "#ff8a99", bottom: "#e23b52" },
  },
  {
    id: "lemon-sprite",
    name: "สไปรท์เลมอนปั่น",
    tagline: "ซ่าเลมอนเย็นสดชื่น",
    price: 45,
    likes: 54,
    emoji: "🍋",
    category: "soft",
    palette: { foam: "#eefcf1", top: "#b8ecc4", bottom: "#5bc47a" },
  },
  {
    id: "grape-soda",
    name: "องุ่นโซดาปั่น",
    tagline: "องุ่นม่วงหวาน + โซดาซ่า",
    price: 45,
    likes: 60,
    emoji: "🍇",
    category: "soft",
    palette: { foam: "#f3ecff", top: "#b98cf0", bottom: "#7c3fc4" },
  },
];

/* ---------- มิกซ์กับฟ่าง (ปั่นเอง) ---------- */
export type MixOption = {
  id: string;
  label: string;
  emoji: string;
  palette?: SmoothiePalette;
};

export const MIX_BASES: MixOption[] = [
  { id: "milk", label: "นมสด", emoji: "🥛", palette: { foam: "#fff7ef", top: "#ffe3c2", bottom: "#f4c48a" } },
  { id: "yogurt", label: "โยเกิร์ต", emoji: "🍦", palette: { foam: "#fef1f7", top: "#ffd0e4", bottom: "#f89bc4" } },
  { id: "green-tea", label: "ชาเขียว", emoji: "🍵", palette: { foam: "#f1f7e8", top: "#a8ce7a", bottom: "#5f9a3f" } },
  { id: "soda", label: "โซดา", emoji: "🧊", palette: { foam: "#eaf7ff", top: "#8fd6ff", bottom: "#2b9be0" } },
];

export const MIX_FRUITS: MixOption[] = [
  { id: "strawberry", label: "สตรอว์เบอร์รี", emoji: "🍓" },
  { id: "mango", label: "มะม่วง", emoji: "🥭" },
  { id: "grape", label: "องุ่น", emoji: "🍇" },
  { id: "blueberry", label: "บลูเบอร์รี", emoji: "🔵" },
];

export const MIX_TOPPINGS: MixOption[] = [
  { id: "boba", label: "ไข่มุก", emoji: "🟤" },
  { id: "jelly", label: "เจลลี่", emoji: "🟣" },
  { id: "cookie", label: "คุกกี้", emoji: "🍪" },
  { id: "whip", label: "วิปครีม", emoji: "🍨" },
];

/* ---------- โปรโมชั่น ---------- */
export type Promotion = {
  id: string;
  title: string;
  highlight: string;
  detail: string;
  cta: string;
  emoji: string;
  theme: "grape" | "blossom" | "cream";
};

export const PROMOTIONS: Promotion[] = [
  {
    id: "delivery",
    title: "ส่งฟรี!",
    highlight: "เมื่อสั่งครบ 300.-",
    detail: "ส่งไวถึงมือ ปั่นสดไม่แยกชั้น",
    cta: "สั่งเลย",
    emoji: "🛵",
    theme: "cream",
  },
  {
    id: "month",
    title: "เมนูประจำเดือน 🍵",
    highlight: "มัทฉะนมสด ฿55",
    detail: "จากปกติ ฿65 พิเศษเดือนนี้เท่านั้น!",
    cta: "สั่งเลย",
    emoji: "🎀",
    theme: "grape",
  },
  {
    id: "bundle",
    title: "ซื้อ 5 แก้ว",
    highlight: "ลดทันที 10%",
    detail: "ชวนเพื่อนมาปั่น คุ้มกว่าเดิม",
    cta: "รับส่วนลด",
    emoji: "🎉",
    theme: "blossom",
  },
];

/* ---------- รีวิว ---------- */
export type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  avatarColor: string;
};

export const REVIEWS: Review[] = [
  {
    id: "mint",
    name: "น้องมิ้นท์",
    rating: 5,
    text: "อร่อยมากกก ผลไม้สดจริง ปั่นละเอียด เนื้อเนียนสุด ๆ เลยค่ะ 💜",
    avatarColor: "#c6a9f0",
  },
  {
    id: "praew",
    name: "K. Praew",
    rating: 5,
    text: "สั่งประจำเลยค่ะ ชอบทุกเมนู ร้านนี้ไม่หวานเกินไป ดีมาก ๆ",
    avatarColor: "#f89bc4",
  },
  {
    id: "mayji",
    name: "Mayji",
    rating: 5,
    text: "แพ็กเกจจิ้งน่ารักมาก ส่งไว แถมออร์เดอร์ตัวด้วยค่ะ",
    avatarColor: "#ffcf6b",
  },
  {
    id: "beam",
    name: "B.Beam",
    rating: 5,
    text: "มัทฉะนมสดคือดีงาม หอมเข้มข้น ไม่หวานเกิน ชอบค่ะ",
    avatarColor: "#a8ce7a",
  },
];

/* ---------- ข้อมูลติดต่อ / จุดเด่น ---------- */
export const CONTACT = {
  phone: "089-123-4567",
  line: "@pankubfang",
  hoursLabel: "เปิดทุกวัน",
  hours: "09:00 - 20:00 น.",
};

export const FEATURES = [
  { emoji: "🍒", title: "ผลไม้สด", detail: "คัดเกรดพรีเมียม" },
  { emoji: "🥤", title: "ปั่นสดใหม่", detail: "ทุกออร์เดอร์" },
  { emoji: "🌿", title: "ไม่ใส่วัตถุกันเสีย", detail: "ปลอดภัย อร่อยแน่น" },
];
