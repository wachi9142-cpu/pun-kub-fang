/* ข้อมูลทั้งหมดของเว็บ ปั่นกับฟ่าง — แก้ที่ไฟล์นี้ที่เดียว */

export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "หน้าแรก", href: "#home" },
  { label: "เมนูทั้งหมด", href: "/menu" },
  { label: "มิกซ์กับฟ่าง ✨", href: "/mix" },
  { label: "โปรโมชั่น", href: "/promotions" },
  { label: "เกี่ยวกับร้าน", href: "#about" },
  { label: "ติดต่อเรา", href: "#contact" },
];

/* ลิงก์ในฟุตเตอร์ — ใส่รีวิว/หมวดย่อยไว้ตรงนี้ (ไม่รกแถบบน) */
export const FOOTER_LINKS: NavItem[] = [
  { label: "หน้าแรก", href: "#home" },
  { label: "เมนูทั้งหมด", href: "/menu" },
  { label: "เมนูปั่น", href: "/menu/smoothie" },
  { label: "น้ำสมุนไพรโฮมเมด", href: "/menu/herbal" },
  { label: "ท็อปปิ้ง", href: "/menu/toppings" },
  { label: "มิกซ์กับฟ่าง", href: "/mix" },
  { label: "โปรโมชั่น", href: "/promotions" },
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
/* หมวดเครื่องดื่มที่แสดงเป็นการ์ด (DrinkCard) — แยกเป็นหน้าละหมวด */
export type CategoryId =
  | "drinks"
  | "milk"
  | "tea"
  | "smoothie"
  | "soda"
  | "hot";

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
    id: "drinks",
    label: "เมนูกาแฟ",
    emoji: "☕",
    desc: "กาแฟหอมกรุ่น เข้มกำลังดี",
    palette: { foam: "#efe2d6", top: "#a9764f", bottom: "#5b3a24" },
    tint: "from-amber-100 to-orange-200/40",
  },
  {
    id: "milk",
    label: "เมนูนม",
    emoji: "🥛",
    desc: "นมสด นมหมี ชานม หอมมันละมุน",
    palette: { foam: "#fffaf0", top: "#ffe3c2", bottom: "#f3c17e" },
    tint: "from-amber-100 to-amber-200/50",
  },
  {
    id: "tea",
    label: "เมนูชา",
    emoji: "🍵",
    desc: "ชาดำ ชาเขียว หอมกลมกล่อม",
    palette: { foam: "#fff0df", top: "#f0a962", bottom: "#cf6f26" },
    tint: "from-orange-100 to-amber-200/50",
  },
  {
    id: "smoothie",
    label: "เมนูปั่น",
    emoji: "🍓",
    desc: "ผลไม้ปั่นสดใหม่ทุกแก้ว",
    palette: { foam: "#fff2f6", top: "#ff9ec0", bottom: "#f0507f" },
    tint: "from-blossom-100 to-blossom-200/50",
  },
  {
    id: "soda",
    label: "โซดา",
    emoji: "🫧",
    desc: "อิตาเลียนโซดา ซ่าสดชื่น",
    palette: { foam: "#eaf7ff", top: "#8fd6ff", bottom: "#2b9be0" },
    tint: "from-sky-100 to-sky-200/50",
  },
  {
    id: "hot",
    label: "เมนูร้อน",
    emoji: "☕",
    desc: "กาแฟ ชา นม ร้อน ๆ อุ่นสบาย",
    palette: { foam: "#efe2d6", top: "#c39a70", bottom: "#7a4f2e" },
    tint: "from-amber-100 to-orange-200/40",
  },
];

/* ---------- หมวดบนหน้า /menu (ฮับ) — รวมน้ำโฮมเมด + ท็อปปิ้ง ---------- */
export type MenuSection = {
  id: string;
  label: string;
  labelEn: string;
  emoji: string;
  href: string;
  desc: string;
  /** ถ้ามี palette จะวาดเป็นแก้ว SVG, ถ้าไม่มีจะโชว์อีโมจิ */
  palette?: SmoothiePalette;
};

export const MENU_SECTIONS: MenuSection[] = [
  {
    id: "drinks",
    label: "เมนูกาแฟ",
    labelEn: "Coffee",
    emoji: "☕",
    href: "/menu/drinks",
    desc: "กาแฟปลุกฟ่าง ☕",
    palette: { foam: "#efe2d6", top: "#a9764f", bottom: "#5b3a24" },
  },
  {
    id: "milk",
    label: "เมนูนม",
    labelEn: "Milk Drinks",
    emoji: "🥛",
    href: "/menu/milk",
    desc: "นมละมุนกอดใจ 🥛",
    palette: { foam: "#fffaf0", top: "#ffe3c2", bottom: "#f3c17e" },
  },
  {
    id: "tea",
    label: "เมนูชา",
    labelEn: "Tea Drinks",
    emoji: "🍵",
    href: "/menu/tea",
    desc: "ชาหอม ๆ มู้ดดี 🍵",
    palette: { foam: "#fff0df", top: "#f0a962", bottom: "#cf6f26" },
  },
  {
    id: "smoothie",
    label: "เมนูปั่น",
    labelEn: "Smoothies",
    emoji: "🍓",
    href: "/menu/smoothie",
    desc: "เติมความจึ้ง ✨",
    palette: { foam: "#fff2f6", top: "#ff9ec0", bottom: "#f0507f" },
  },
  {
    id: "soda",
    label: "โซดา",
    labelEn: "Soda",
    emoji: "🫧",
    href: "/menu/soda",
    desc: "ซ่าจนใจสั่น 🫧",
    palette: { foam: "#eaf7ff", top: "#8fd6ff", bottom: "#2b9be0" },
  },
  {
    id: "hot",
    label: "เมนูร้อน",
    labelEn: "Hot Drinks",
    emoji: "☕",
    href: "/menu/hot",
    desc: "อุ่น ๆ ฮีลใจ 🔥",
    palette: { foam: "#efe2d6", top: "#c39a70", bottom: "#7a4f2e" },
  },
  {
    id: "herbal",
    label: "น้ำสมุนไพรโฮมเมด",
    labelEn: "Homemade Herbal",
    emoji: "🌿",
    href: "/menu/herbal",
    desc: "จิบสดชื่นจากบ้านฟ่าง 🌿",
    palette: { foam: "#eef7ea", top: "#9ec97e", bottom: "#4f8a3c" },
  },
  {
    id: "whipped",
    label: "วิปครีมแก้ว",
    labelEn: "Whipped Cream Cups",
    emoji: "🍦",
    href: "/menu/whipped",
    desc: "วิปฟู ๆ ใจฟู 🍦",
    palette: { foam: "#fff6fa", top: "#ffe0ee", bottom: "#f9b6d4" },
  },
  {
    id: "soft",
    label: "น้ำอัดลม",
    labelEn: "Soft Drinks",
    emoji: "🥤",
    href: "/menu/soft",
    desc: "ซ่าซ่าเลือกเลย! 🥤",
    palette: { foam: "#e6f3ff", top: "#5ab0f0", bottom: "#1f6fc4" },
  },
  {
    id: "toppings",
    label: "ท็อปปิ้ง",
    labelEn: "Toppings",
    emoji: "🧋",
    href: "/menu/toppings",
    desc: "เพิ่มความอร่อยทุกแก้ว",
  },
];

/* ---------- เมนูเครื่องดื่มทั้งหมด ---------- */
export type MenuItem = {
  id: string;
  name: string;
  /** ชื่อภาษาอังกฤษ (ไม่บังคับ) — แสดงใต้ชื่อไทยในการ์ด */
  nameEn?: string;
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
    name: "ม่วงแบบตะโกน",
    nameEn: "Grape Yogurt",
    tagline: "องุ่นม่วงหวานฉ่ำ + โยเกิร์ต",
    price: 65,
    likes: 125,
    emoji: "🍇",
    category: "smoothie",
    badge: "ขายดี",
    popular: true,
    palette: { foam: "#f3e9ff", top: "#b98cf0", bottom: "#7c3fc4" },
  },
  {
    id: "strawberry-milk",
    name: "น้องสตรอว์ตัวตึง",
    nameEn: "Strawberry Yogurt",
    tagline: "สตรอว์เบอร์รีสด + นมสดเข้มข้น",
    price: 60,
    likes: 98,
    emoji: "🍓",
    category: "smoothie",
    popular: true,
    palette: { foam: "#fff2f6", top: "#ff9ec0", bottom: "#f0507f" },
  },
  {
    id: "mango-milk",
    name: "มะม่วงจึ้งมาก",
    nameEn: "Mango Smoothie",
    tagline: "มะม่วงสุกหวาน + นมสด",
    price: 65,
    likes: 112,
    emoji: "🥭",
    category: "smoothie",
    popular: true,
    palette: { foam: "#fff7e6", top: "#ffcf6b", bottom: "#f2a52c" },
  },
  {
    id: "blueberry-yogurt",
    name: "บลูเบอร์รีมันจึ้ง",
    nameEn: "Blueberry Yogurt",
    tagline: "บลูเบอร์รี + โยเกิร์ตเปรี้ยวหวาน",
    price: 65,
    likes: 103,
    emoji: "🔵",
    category: "smoothie",
    palette: { foam: "#eef0ff", top: "#8f9bf0", bottom: "#5257c9" },
  },

  /* 🍉 ผลไม้ปั่นตามฤดูกาล */
  {
    id: "watermelon-smoothie",
    name: "แตงโมตัวตึง",
    nameEn: "Watermelon",
    tagline: "แตงโมหวานฉ่ำ เย็นชื่นใจ",
    price: 50,
    likes: 118,
    emoji: "🍉",
    category: "smoothie",
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
    category: "smoothie",
    palette: { foam: "#fdfbe8", top: "#ffe08a", bottom: "#f2a52c" },
  },
  {
    id: "pineapple-smoothie",
    name: "สับปะรดปั่น",
    tagline: "สับปะรดหวานอมเปรี้ยว สดชื่น",
    price: 50,
    likes: 72,
    emoji: "🍍",
    category: "smoothie",
    palette: { foam: "#fdf7d8", top: "#f2d873", bottom: "#c9a52a" },
  },
  {
    id: "lychee-smoothie",
    name: "ลิ้นจี่ปั่น",
    tagline: "ลิ้นจี่หอมหวาน เนื้อนุ่มละมุน",
    price: 55,
    likes: 90,
    emoji: "🌸",
    category: "smoothie",
    badge: "ตามฤดู",
    palette: { foam: "#fff5fb", top: "#ffc0e6", bottom: "#e86fb0" },
  },
  {
    id: "greentea-smoothie",
    name: "ชาเขียวปั่น",
    nameEn: "Green Tea Smoothie",
    tagline: "ชาเขียวปั่นเย็น หอมสดชื่น",
    price: 55,
    likes: 62,
    emoji: "🍵",
    category: "smoothie",
    palette: { foam: "#f1f7e8", top: "#a8ce7a", bottom: "#5f9a3f" },
  },
  {
    id: "thaitea-smoothie",
    name: "ชาไทยปั่น",
    nameEn: "Thai Tea Smoothie",
    tagline: "ชาไทยปั่นเย็น หวานมันเข้ม",
    price: 55,
    likes: 74,
    emoji: "🍵",
    category: "smoothie",
    palette: { foam: "#fff0df", top: "#f0a962", bottom: "#cf6f26" },
  },
  {
    id: "strawberry-soda-smoothie",
    name: "สตรอว์เบอร์รีโซดาปั่น",
    nameEn: "Strawberry Soda Smoothie",
    tagline: "สตรอว์เบอร์รีปั่น + โซดาซ่าสดชื่น",
    price: 55,
    likes: 58,
    emoji: "🍓",
    category: "smoothie",
    palette: { foam: "#fff0f4", top: "#ff9db6", bottom: "#ef4b6e" },
  },
  {
    id: "grape-soda-smoothie",
    name: "องุ่นโซดาปั่น",
    nameEn: "Grape Soda Smoothie",
    tagline: "องุ่นปั่น + โซดาซ่า หวานชื่นใจ",
    price: 55,
    likes: 55,
    emoji: "🍇",
    category: "smoothie",
    palette: { foam: "#f3ecff", top: "#b98cf0", bottom: "#7c3fc4" },
  },
  {
    id: "avocado-smoothie",
    name: "อะโวคาโดเขียวเหนี่ยวใจ",
    nameEn: "Avocado Smoothie",
    tagline: "อะโวคาโดปั่นเนียนนุ่ม เขียวมันละมุน",
    price: 50,
    likes: 72,
    emoji: "🥑",
    category: "smoothie",
    palette: { foam: "#eef7e0", top: "#a7cf6a", bottom: "#5f8a2e" },
  },

  /* 🫧 โซดา — เริ่มต้น 30 บาท */
  {
    id: "red-soda",
    name: "แดงโซดา",
    tagline: "น้ำแดงหวานเย็น ซ่าสดชื่น",
    price: 30,
    likes: 71,
    emoji: "🫧",
    category: "soda",
    palette: { foam: "#ffeef0", top: "#ff8a99", bottom: "#e23b52" },
  },
  {
    id: "green-soda",
    name: "เขียวโซดา",
    tagline: "เขียวสดใส ซ่าชื่นใจ",
    price: 30,
    likes: 55,
    emoji: "🫧",
    category: "soda",
    palette: { foam: "#eefcf1", top: "#8fe0a6", bottom: "#3fb56b" },
  },
  {
    id: "lime-soda",
    name: "มะนาวโซดา",
    tagline: "มะนาวสด เปรี้ยวซ่ากำลังดี",
    price: 30,
    likes: 68,
    emoji: "🍋",
    category: "soda",
    palette: { foam: "#f7ffe0", top: "#e2ef7a", bottom: "#aac42a" },
  },
  {
    id: "strawberry-soda",
    name: "สตรอว์เบอร์รีโซดา",
    tagline: "หวานอมเปรี้ยว ซ่ากำลังดี",
    price: 30,
    likes: 90,
    emoji: "🍓",
    category: "soda",
    popular: true,
    palette: { foam: "#fff0f4", top: "#ff9db6", bottom: "#ef4b6e" },
  },
  {
    id: "grape-soda",
    name: "องุ่นโซดา",
    tagline: "องุ่นม่วงหวาน + โซดาซ่า",
    price: 30,
    likes: 64,
    emoji: "🍇",
    category: "soda",
    palette: { foam: "#f3ecff", top: "#b98cf0", bottom: "#7c3fc4" },
  },
  {
    id: "mango-soda",
    name: "มะม่วงโซดา",
    tagline: "มะม่วงหอมหวาน ซ่าสดชื่น",
    price: 30,
    likes: 62,
    emoji: "🥭",
    category: "soda",
    palette: { foam: "#fff7e6", top: "#ffcf6b", bottom: "#f2a52c" },
  },
  {
    id: "peach-soda",
    name: "พีชโซดา",
    tagline: "พีชหอมหวาน ละมุนซ่า",
    price: 30,
    likes: 58,
    emoji: "🍑",
    category: "soda",
    palette: { foam: "#fff1ea", top: "#ffb99a", bottom: "#f77e4f" },
  },
  {
    id: "kiwi-soda",
    name: "กีวีโซดา",
    tagline: "กีวีเปรี้ยวอมหวาน สดชื่น",
    price: 30,
    likes: 49,
    emoji: "🥝",
    category: "soda",
    palette: { foam: "#f2ffe8", top: "#b6e07a", bottom: "#6fae32" },
  },
  {
    id: "blueberry-soda",
    name: "บลูเบอร์รีโซดา",
    tagline: "บลูเบอร์รีหวานอมเปรี้ยว",
    price: 30,
    likes: 53,
    emoji: "🫐",
    category: "soda",
    palette: { foam: "#eef0ff", top: "#8f9bf0", bottom: "#5257c9" },
  },
  {
    id: "pineapple-soda",
    name: "สับปะรดโซดา",
    tagline: "สับปะรดเปรี้ยวหวาน ซ่าสดชื่น",
    price: 30,
    likes: 47,
    emoji: "🍍",
    category: "soda",
    palette: { foam: "#fdf7d8", top: "#f2d873", bottom: "#c9a52a" },
  },
  {
    id: "passionfruit-soda",
    name: "เสาวรสโซดา",
    tagline: "เสาวรสเปรี้ยวหอม ซ่าจี๊ดใจ",
    price: 30,
    likes: 60,
    emoji: "🥭",
    category: "soda",
    palette: { foam: "#fff3d8", top: "#ffcf5e", bottom: "#e79a2a" },
  },
  {
    id: "honey-lemon-soda",
    name: "น้ำผึ้งมะนาวโซดา",
    tagline: "น้ำผึ้งมะนาว ซ่าละมุน ชื่นคอ",
    price: 35,
    likes: 66,
    emoji: "🍯",
    category: "soda",
    badge: "พิเศษ",
    palette: { foam: "#fdf7d8", top: "#f2d873", bottom: "#d9a520" },
  },
  {
    id: "italian-soda",
    name: "โซดาซ่าจนงง",
    nameEn: "Italian Soda",
    tagline: "อิตาเลียนโซดาซ่า สีสันสดใส เลือกรสได้",
    price: 40,
    likes: 61,
    emoji: "🫧",
    category: "soda",
    palette: { foam: "#eaf7ff", top: "#8fd6ff", bottom: "#2b9be0" },
  },

  /* นมหมี */
  {
    id: "bear-original",
    name: "นมหมีออริจินัลปั่น",
    tagline: "นมสดหอมมัน นุ่มละมุน",
    price: 55,
    likes: 91,
    emoji: "🐻",
    category: "milk",
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
    category: "milk",
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
    category: "milk",
    palette: { foam: "#fff0e0", top: "#f4b06a", bottom: "#d97a2b" },
  },
  {
    id: "bear-choco",
    name: "นมหมีช็อกโกปั่น",
    tagline: "ช็อกโกเข้ม + นมสดหมี",
    price: 60,
    likes: 77,
    emoji: "🐻",
    category: "milk",
    palette: { foam: "#f3e9e0", top: "#b98a63", bottom: "#7a5334" },
  },
  {
    id: "banana-milk",
    name: "กล้วยนะ แต่ไม่กล้วย",
    nameEn: "Banana Milk",
    tagline: "นมกล้วยหอมหวาน นุ่มละมุน ดื่มง่าย",
    price: 40,
    likes: 64,
    emoji: "🍌",
    category: "milk",
    palette: { foam: "#fffbe8", top: "#ffe07a", bottom: "#e8b53a" },
  },
  {
    id: "coconut-milk",
    name: "มะพร้าวนัวเวอร์",
    nameEn: "Coconut Milk",
    tagline: "นมมะพร้าวหอมมัน นัวลงตัว",
    price: 40,
    likes: 58,
    emoji: "🥥",
    category: "milk",
    palette: { foam: "#fffdf8", top: "#f0ead8", bottom: "#cbbf9e" },
  },

  /* ชา */
  {
    id: "thai-milk-tea",
    name: "ชานมคนโปรด",
    nameEn: "Milk Tea",
    tagline: "ชาไทยแท้ หวานมันกลมกล่อม",
    price: 55,
    likes: 96,
    emoji: "🧋",
    category: "tea",
    popular: true,
    palette: { foam: "#fff0df", top: "#f0a962", bottom: "#cf6f26" },
  },
  {
    id: "matcha-milk",
    name: "มัทฉะมู้ดดี",
    nameEn: "Matcha",
    tagline: "มัทฉะแท้ + นมสดหอมมัน",
    price: 65,
    likes: 89,
    emoji: "🧋",
    category: "tea",
    popular: true,
    palette: { foam: "#f1f7e8", top: "#a8ce7a", bottom: "#5f9a3f" },
  },
  {
    id: "lemon-tea",
    name: "ชามะนาวปั่น",
    nameEn: "Lemon Tea (Blended)",
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
    nameEn: "Green Milk Tea",
    tagline: "ชาเขียวหอม + นมสด",
    price: 55,
    likes: 70,
    emoji: "🧋",
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
    category: "drinks",
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
    category: "drinks",
    palette: { foam: "#f3e7d8", top: "#c39a70", bottom: "#8a5f3a" },
  },
  {
    id: "mocha-blend",
    name: "มอคค่าปั่น",
    tagline: "กาแฟ + ช็อกโกเข้มข้น",
    price: 65,
    likes: 73,
    emoji: "☕",
    category: "drinks",
    palette: { foam: "#eaddd2", top: "#9c6f4c", bottom: "#5f3d24" },
  },
  {
    id: "caramel-blend",
    name: "คาราเมลมัคคิอาโตปั่น",
    tagline: "คาราเมลหอมหวาน + กาแฟ",
    price: 65,
    likes: 88,
    emoji: "☕",
    category: "drinks",
    badge: "แนะนำ",
    palette: { foam: "#f6e9d5", top: "#cf9a5f", bottom: "#9a6a34" },
  },

  /* 🍵 เมนูชา */
  {
    id: "thai-tea",
    name: "ชาไทยตัวจี๊ด",
    nameEn: "Thai Tea",
    tagline: "ชาไทยหอมเข้ม รสหวานมัน กลิ่นชาโดดเด่น",
    price: 25,
    likes: 96,
    emoji: "🍵",
    category: "tea",
    popular: true,
    palette: { foam: "#fff0df", top: "#f0a962", bottom: "#cf6f26" },
  },
  {
    id: "green-tea",
    name: "ชาเขียว",
    tagline: "ชาเขียวหอมละมุน รสกลมกล่อม สดชื่น",
    price: 25,
    likes: 78,
    emoji: "🍵",
    category: "tea",
    palette: { foam: "#f1f7e8", top: "#a8ce7a", bottom: "#5f9a3f" },
  },
  {
    id: "green-lemon-tea",
    name: "ชาเขียวมะนาว",
    tagline: "ชาเขียวหอม + มะนาวสด เปรี้ยวสดชื่น",
    price: 25,
    likes: 66,
    emoji: "🍋",
    category: "tea",
    palette: { foam: "#f3ffe0", top: "#bfe36a", bottom: "#6fae2e" },
  },
  {
    id: "iced-black-tea",
    name: "ชาดำเย็น",
    tagline: "ชาดำหอม เย็นชื่นใจ ราคาเบา ๆ",
    price: 20,
    likes: 58,
    emoji: "🍵",
    category: "tea",
    badge: "คุ้ม",
    palette: { foam: "#efe0cf", top: "#9a6a3f", bottom: "#4f3016" },
  },
  {
    id: "lemon-tea-plain",
    name: "เลมอนตื่นยัง",
    nameEn: "Lemon Tea",
    tagline: "ชาหอม + มะนาวสด เปรี้ยวสดชื่น",
    price: 25,
    likes: 71,
    emoji: "🍋",
    category: "tea",
    palette: { foam: "#fdf7d8", top: "#f2d873", bottom: "#c9a52a" },
  },
  {
    id: "peach-tea",
    name: "พีชนี้มีใจ",
    nameEn: "Peach Tea",
    tagline: "ชากลิ่นพีชหอมหวาน ละมุน",
    price: 30,
    likes: 64,
    emoji: "🍑",
    category: "tea",
    palette: { foam: "#fff1ea", top: "#ffb99a", bottom: "#f77e4f" },
  },
  {
    id: "black-peach-tea",
    name: "ชาดำพีช",
    nameEn: "Black Peach Tea",
    tagline: "ชาดำหอมเข้ม + กลิ่นพีชหวานละมุน",
    price: 30,
    likes: 57,
    emoji: "🍑",
    category: "tea",
    palette: { foam: "#f3e2d2", top: "#d0895f", bottom: "#7a4326" },
  },
  {
    id: "apple-tea",
    name: "ชาแอปเปิ้ล",
    tagline: "ชากลิ่นแอปเปิลเปรี้ยวอมหวาน",
    price: 30,
    likes: 52,
    emoji: "🍏",
    category: "tea",
    palette: { foam: "#f5ffe8", top: "#c3e87a", bottom: "#7cb32b" },
  },
  {
    id: "honey-lemon-tea",
    name: "ชาน้ำผึ้งมะนาว",
    nameEn: "Honey Lemon Tea",
    tagline: "ชาน้ำผึ้งมะนาว หอมหวาน ชื่นคอ",
    price: 30,
    likes: 69,
    emoji: "🍯",
    category: "tea",
    palette: { foam: "#fdf7d8", top: "#f2d873", bottom: "#d9a520" },
  },
  {
    id: "oolong-tea",
    name: "ชาอู่หลง",
    nameEn: "Oolong Tea",
    tagline: "ชาอู่หลงหอมละมุน กลมกล่อม ไม่ขม",
    price: 25,
    likes: 54,
    emoji: "🍵",
    category: "tea",
    palette: { foam: "#f0ead8", top: "#c2a86a", bottom: "#8a6f34" },
  },
  {
    id: "jasmine-tea",
    name: "ชามะลิ",
    nameEn: "Jasmine Tea",
    tagline: "ชามะลิหอมกลิ่นดอกไม้ ละมุนคอ",
    price: 25,
    likes: 51,
    emoji: "🌸",
    category: "tea",
    palette: { foam: "#fbf7f0", top: "#efe4d3", bottom: "#d8c39a" },
  },
  {
    id: "jasmine-green-tea",
    name: "ชาเขียวมะลิ",
    nameEn: "Jasmine Green Tea",
    tagline: "ชาเขียวหอมมะลิ สดชื่นละมุน",
    price: 25,
    likes: 57,
    emoji: "🍵",
    category: "tea",
    palette: { foam: "#eef7ea", top: "#a8ce7a", bottom: "#5f9a3f" },
  },
  {
    id: "honey-tea",
    name: "ชาน้ำผึ้ง",
    nameEn: "Honey Tea",
    tagline: "ชาหอม + น้ำผึ้งแท้ หวานละมุน",
    price: 25,
    likes: 60,
    emoji: "🍯",
    category: "tea",
    palette: { foam: "#fdf3d6", top: "#f0cf72", bottom: "#cf9a2a" },
  },

  /* ☕ เมนูร้อน */
  {
    id: "hot-americano",
    name: "กาแฟดำร้อน",
    nameEn: "Hot Americano",
    tagline: "กาแฟดำเข้ม กลิ่นหอมกรุ่น",
    price: 30,
    likes: 74,
    emoji: "☕",
    category: "hot",
    popular: true,
    palette: { foam: "#e7d7c6", top: "#8a5a37", bottom: "#43281a" },
  },
  {
    id: "hot-latte",
    name: "ลาเต้ร้อน",
    nameEn: "Hot Latte",
    tagline: "กาแฟนุ่ม + นมร้อนละมุน",
    price: 35,
    likes: 82,
    emoji: "☕",
    category: "hot",
    popular: true,
    palette: { foam: "#f3e7d8", top: "#c39a70", bottom: "#8a5f3a" },
  },
  {
    id: "hot-mocha",
    name: "มอคค่าร้อน",
    nameEn: "Hot Mocha",
    tagline: "กาแฟ + ช็อกโกแลตเข้มข้น",
    price: 35,
    likes: 70,
    emoji: "☕",
    category: "hot",
    palette: { foam: "#eaddd2", top: "#9c6f4c", bottom: "#5f3d24" },
  },
  {
    id: "hot-cocoa",
    name: "โกโก้คนโปรด",
    nameEn: "Hot Cocoa",
    tagline: "โกโก้เข้มข้น หอมหวาน อุ่นใจ",
    price: 30,
    likes: 66,
    emoji: "🍫",
    category: "hot",
    palette: { foam: "#e6d3c4", top: "#8a5a3c", bottom: "#4d2e1c" },
  },
  {
    id: "hot-milk",
    name: "นมสดโคตรละมุน",
    nameEn: "Hot Fresh Milk",
    tagline: "นมสดอุ่น ๆ หอมมันละมุน",
    price: 30,
    likes: 58,
    emoji: "🥛",
    category: "hot",
    palette: { foam: "#fffaf0", top: "#ffe9c9", bottom: "#f3c17e" },
  },
  {
    id: "hot-caramel-milk",
    name: "นมคาราเมลร้อน",
    nameEn: "Hot Caramel Milk",
    tagline: "นมร้อน + คาราเมลหอมหวาน",
    price: 35,
    likes: 63,
    emoji: "🍮",
    category: "hot",
    palette: { foam: "#f6e9d5", top: "#cf9a5f", bottom: "#9a6a34" },
  },
  {
    id: "hot-thai-tea",
    name: "ชาไทยร้อน",
    nameEn: "Hot Thai Tea",
    tagline: "ชาไทยเข้ม หวานมัน ร้อน ๆ",
    price: 30,
    likes: 77,
    emoji: "🍵",
    category: "hot",
    palette: { foam: "#fff0df", top: "#f0a962", bottom: "#cf6f26" },
  },
  {
    id: "hot-green-tea",
    name: "ชาเขียวร้อน",
    nameEn: "Hot Green Tea",
    tagline: "ชาเขียวหอม อุ่นสบาย",
    price: 30,
    likes: 61,
    emoji: "🍵",
    category: "hot",
    palette: { foam: "#eef7ea", top: "#9ec97e", bottom: "#568a3c" },
  },
  {
    id: "hot-taiwan-milk-tea",
    name: "ชานมไต้หวันร้อน",
    nameEn: "Hot Taiwanese Milk Tea",
    tagline: "ชานมไต้หวันหอมนุ่ม ดื่มง่าย",
    price: 35,
    likes: 68,
    emoji: "🧋",
    category: "hot",
    palette: { foam: "#f3e7d8", top: "#c69b74", bottom: "#8a5f3a" },
  },
  {
    id: "hot-oolong",
    name: "ชาอู่หลงร้อน",
    nameEn: "Hot Oolong Tea",
    tagline: "อู่หลงหอมละมุน กลมกล่อม ไม่ขม",
    price: 30,
    likes: 54,
    emoji: "🍵",
    category: "hot",
    palette: { foam: "#f0ead8", top: "#c2a86a", bottom: "#8a6f34" },
  },
  {
    id: "hot-lemon-tea",
    name: "ชามะนาวร้อน",
    nameEn: "Hot Lemon Tea",
    tagline: "ชาหอม + มะนาว เปรี้ยวหวานอุ่น ๆ",
    price: 30,
    likes: 57,
    emoji: "🍋",
    category: "hot",
    palette: { foam: "#fdf7d8", top: "#f2d873", bottom: "#c9a52a" },
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
  { id: "soda", label: "โซดา", emoji: "🧊", palette: { foam: "#eaf7ff", top: "#8fd6ff", bottom: "#2b9be0" } },
];

/* ชนิดชา (ฐานหมวด "ชา" — เลือกได้ 1 ชนิด นับเป็น 1 ฐาน) */
export const MIX_TEA_TYPES: MixOption[] = [
  { id: "thai", label: "ชาไทย", emoji: "🍵", palette: { foam: "#fff0df", top: "#f0a962", bottom: "#cf6f26" } },
  { id: "green", label: "ชาเขียว", emoji: "🍵", palette: { foam: "#f1f7e8", top: "#a8ce7a", bottom: "#5f9a3f" } },
  { id: "black", label: "ชาดำ", emoji: "🍵", palette: { foam: "#efe0cf", top: "#9a6a3f", bottom: "#4f3016" } },
  { id: "lemon", label: "ชามะนาว", emoji: "🍋", palette: { foam: "#fdf7d8", top: "#f2d873", bottom: "#c9a52a" } },
  { id: "peach", label: "ชาพีช", emoji: "🍑", palette: { foam: "#fff1ea", top: "#ffb99a", bottom: "#f77e4f" } },
  { id: "apple", label: "ชาแอปเปิ้ล", emoji: "🍏", palette: { foam: "#f5ffe8", top: "#c3e87a", bottom: "#7cb32b" } },
  { id: "honey", label: "ชาน้ำผึ้ง", emoji: "🍯", palette: { foam: "#fdf7d8", top: "#f2d873", bottom: "#d9a520" } },
];

/* 🍬 รสชาติ/ไซรัป (ไม่ใช่ผลไม้สด) — ใช้ชื่อผลไม้เฉย ๆ ไม่ต้องมีคำว่า "ไซรัป" */
export const MIX_SYRUPS: MixOption[] = [
  { id: "apple", label: "แอปเปิ้ล", emoji: "🍏" },
  { id: "peach", label: "พีช", emoji: "🍑" },
  { id: "strawberry-syrup", label: "สตรอว์เบอร์รี", emoji: "🍓" },
  { id: "lychee", label: "ลิ้นจี่", emoji: "🌸" },
  { id: "mango-syrup", label: "มะม่วง", emoji: "🥭" },
  { id: "blueberry-syrup", label: "บลูเบอร์รี", emoji: "🫐" },
];

/* 🍓 ผลไม้สด */
export const MIX_FRUITS: MixOption[] = [
  { id: "strawberry", label: "สตรอว์เบอร์รี", emoji: "🍓" },
  { id: "grape", label: "องุ่น", emoji: "🍇" },
  { id: "mango", label: "มะม่วง", emoji: "🥭" },
  { id: "blueberry", label: "บลูเบอร์รี", emoji: "🫐" },
  { id: "kiwi", label: "กีวี", emoji: "🥝" },
];

export const MIX_TOPPINGS: MixOption[] = [
  { id: "boba", label: "ไข่มุก", emoji: "🟤" },
  { id: "jelly", label: "เจลลี่", emoji: "🟣" },
  { id: "cookie", label: "คุกกี้", emoji: "🍪" },
  { id: "whip", label: "วิปครีม", emoji: "🍨" },
];

/* ---------- 🧋 ท็อปปิ้ง | Toppings ---------- */
export type ToppingItem = {
  nameTh: string;
  nameEn: string;
  /** ราคาเพิ่มต่อ 1 ท็อปปิ้ง (บาท) */
  price: number;
  /** รูปท็อปปิ้ง เช่น "/toppings/boba.png" — ถ้าไม่ใส่จะโชว์ placeholder */
  image?: string;
};

export type ToppingGroup = {
  id: string;
  titleTh: string;
  titleEn: string;
  emoji: string;
  items: ToppingItem[];
  /** หมายเหตุพิเศษของกลุ่ม (เช่น เรื่องฤดูกาล) */
  note?: string;
  noteEn?: string;
};

export const TOPPING_GROUPS: ToppingGroup[] = [
  {
    id: "tapioca",
    titleTh: "ไข่มุกแป้งมันสำปะหลัง",
    titleEn: "Tapioca Pearls",
    emoji: "🟤",
    items: [
      { nameTh: "ไข่มุกดำ / ไข่มุกคลาสสิก", nameEn: "Classic Black Tapioca Pearls", price: 5 },
      { nameTh: "ไข่มุกสีทอง", nameEn: "Golden Tapioca Pearls", price: 5 },
      { nameTh: "ไข่มุกสีมรกต", nameEn: "Emerald Tapioca Pearls", price: 5 },
      { nameTh: "ไข่มุกบราวน์ชูการ์", nameEn: "Brown Sugar Tapioca Pearls", price: 10 },
    ],
  },
  {
    id: "popping",
    titleTh: "ไข่มุกป๊อป",
    titleEn: "Popping Boba",
    emoji: "🟣",
    items: [
      { nameTh: "ไข่มุกป๊อปรสสตรอว์เบอร์รี", nameEn: "Strawberry Popping Boba", price: 10 },
      { nameTh: "ไข่มุกป๊อปรสลิ้นจี่", nameEn: "Lychee Popping Boba", price: 10 },
      { nameTh: "ไข่มุกป๊อปรสมะม่วง", nameEn: "Mango Popping Boba", price: 10 },
      { nameTh: "ไข่มุกป๊อปรสเสาวรส", nameEn: "Passion Fruit Popping Boba", price: 10 },
    ],
  },
  {
    id: "konjac",
    titleTh: "บุกและคริสตัล",
    titleEn: "Konjac & Crystal Jelly",
    emoji: "🟢",
    items: [
      { nameTh: "บุกใส / บุกเพชร", nameEn: "Crystal Konjac Jelly", price: 5 },
      { nameTh: "บุกบราวน์ชูการ์", nameEn: "Brown Sugar Konjac Jelly", price: 5 },
    ],
  },
  {
    id: "jelly",
    titleTh: "เยลลี่และวุ้น",
    titleEn: "Jelly & Jelly Toppings",
    emoji: "🍮",
    items: [
      { nameTh: "วุ้นมะพร้าว", nameEn: "Coconut Jelly", price: 5 },
      { nameTh: "วุ้นคาราเมล", nameEn: "Caramel Jelly", price: 5 },
      { nameTh: "เฉาก๊วย", nameEn: "Grass Jelly", price: 5 },
      { nameTh: "เยลลี่ฟรุตสลัด", nameEn: "Fruit Cocktail Jelly", price: 5 },
      { nameTh: "เยลลี่องุ่น", nameEn: "Grape Jelly", price: 5 },
      { nameTh: "เยลลี่สตรอว์เบอร์รี", nameEn: "Strawberry Jelly", price: 5 },
    ],
  },
  {
    id: "premium",
    titleTh: "ท็อปปิ้งพรีเมียม",
    titleEn: "Premium Toppings",
    emoji: "🍨",
    items: [
      { nameTh: "พุดดิ้ง", nameEn: "Pudding", price: 10 },
      { nameTh: "ครีมชีส", nameEn: "Cream Cheese", price: 10 },
      { nameTh: "วิปครีม", nameEn: "Whipped Cream", price: 10 },
      { nameTh: "ไอศกรีม", nameEn: "Ice Cream", price: 10 },
    ],
  },
  {
    id: "extra-fruit",
    titleTh: "เพิ่มเนื้อผลไม้",
    titleEn: "Extra Fruit",
    emoji: "🥥",
    note: "เนื้อผลไม้สดบางชนิดมีจำหน่ายตามฤดูกาลและอาจไม่มีให้บริการตลอดเวลา กรุณาสอบถามก่อนสั่ง",
    noteEn:
      "Fresh fruit availability may vary by season and may not always be available. Please check with us before ordering.",
    items: [
      { nameTh: "เนื้อมะพร้าว", nameEn: "Fresh Coconut Meat", price: 5 },
      { nameTh: "เนื้อมะม่วง", nameEn: "Fresh Mango", price: 5 },
      { nameTh: "เนื้อสตรอว์เบอร์รี", nameEn: "Fresh Strawberry", price: 5 },
      { nameTh: "เนื้อกล้วย", nameEn: "Fresh Banana", price: 5 },
      { nameTh: "เนื้ออะโวคาโด", nameEn: "Extra Avocado", price: 10 },
    ],
  },
  {
    id: "cereal",
    titleTh: "ซีเรียล & ถั่ว",
    titleEn: "Cereal & Nuts",
    emoji: "🥣",
    items: [
      { nameTh: "โกโก้ครั้นซ์", nameEn: "Cocoa Crunch", price: 5 },
      { nameTh: "ซีเรียลฮันนี่สตาร์", nameEn: "Honey Stars Cereal", price: 5 },
      { nameTh: "อัลมอนด์หั่นบาง", nameEn: "Sliced Almonds", price: 10 },
    ],
  },
];

/* ---------- 💰 โครงสร้างราคาเมนู | Menu Pricing ---------- */
export type PriceTier = {
  emoji: string;
  labelTh: string;
  labelEn: string;
  price: string;
  note?: string;
};

export const PRICE_TIERS: PriceTier[] = [
  { emoji: "🥤", labelTh: "เมนูธรรมดา", labelEn: "Regular Drinks", price: "เริ่มต้น 30฿" },
  { emoji: "🥛", labelTh: "เมนูนม", labelEn: "Milk Drinks", price: "35–40฿" },
  {
    emoji: "🍓",
    labelTh: "เมนูปั่น",
    labelEn: "Smoothies",
    price: "45 / 50 / 60฿",
    note: "ตามชนิดและต้นทุนวัตถุดิบ",
  },
  { emoji: "🥑", labelTh: "อะโวคาโดปั่น", labelEn: "Avocado Smoothie", price: "50฿" },
  { emoji: "🌿", labelTh: "น้ำสมุนไพรโฮมเมด", labelEn: "Homemade Herbal Drinks", price: "25฿" },
  { emoji: "🧊", labelTh: "น้ำสมุนไพรปั่น", labelEn: "Blended Herbal Drinks", price: "30฿" },
  {
    emoji: "🥥",
    labelTh: "เพิ่มเนื้อผลไม้ / ท็อปปิ้ง",
    labelEn: "Extra Fruit / Toppings",
    price: "+5 / +10฿",
    note: "ต่ออย่าง",
  },
];

/* ---------- 🌿 น้ำสมุนไพรโฮมเมด | Homemade Herbal Drinks ---------- */
export type HomemadeDrink = {
  emoji: string;
  nameTh: string;
  nameEn: string;
  price: number;
  /** true = หมดวันนี้ (แสดงป้าย "หมดวันนี้ · Sold Out" แทนการลบเมนู) */
  soldOut?: boolean;
};

/* 🧋 น้ำโฮมเมดใส่แก้ว — 20 บาท/แก้ว (ยกเว้นที่ระบุ) */
export const HOMEMADE_BOTTLED: HomemadeDrink[] = [
  { emoji: "🌼", nameTh: "น้ำเก๊กฮวย", nameEn: "Chrysanthemum Tea", price: 25 },
  { emoji: "🌺", nameTh: "น้ำกระเจี๊ยบ", nameEn: "Roselle Juice", price: 25, soldOut: true },
  { emoji: "🦋", nameTh: "น้ำอัญชันมะนาว", nameEn: "Butterfly Pea Lemonade", price: 25 },
  { emoji: "🌿", nameTh: "น้ำใบเตย", nameEn: "Pandan Drink", price: 25 },
  { emoji: "❤️", nameTh: "น้ำมะม่วงหาวมะนาวโห่", nameEn: "Karonda Juice", price: 25 },
  { emoji: "🥭", nameTh: "น้ำเสาวรส", nameEn: "Passion Fruit Juice", price: 25 },
  { emoji: "🍋", nameTh: "มะนาวน้ำผึ้ง", nameEn: "Honey Lemon Drink", price: 25 },
  { emoji: "🖤", nameTh: "น้ำเฉาก๊วย", nameEn: "Grass Jelly Drink", price: 25 },
  { emoji: "🌰", nameTh: "น้ำลำไย", nameEn: "Longan Drink", price: 25 },
  { emoji: "🥤", nameTh: "น้ำลำไยพร้อมเนื้อ", nameEn: "Longan Drink with Pulp", price: 30 },
  { emoji: "🌳", nameTh: "น้ำมะตูม", nameEn: "Bael Fruit Drink", price: 25 },
  { emoji: "🫚", nameTh: "น้ำขิง", nameEn: "Ginger Drink", price: 25 },
  { emoji: "🌿", nameTh: "น้ำใบบัวบก", nameEn: "Centella Juice", price: 25 },
];

/* 🥤 เมนูปั่น — เริ่มต้น 30 บาท (บางรสทำแบบปั่นได้) */
export const HOMEMADE_BLENDED: HomemadeDrink[] = [
  { emoji: "🥭", nameTh: "น้ำเสาวรสปั่น", nameEn: "Blended Passion Fruit", price: 30 },
  { emoji: "❤️", nameTh: "น้ำมะม่วงหาวมะนาวโห่ปั่น", nameEn: "Blended Karonda", price: 30 },
  { emoji: "🍋", nameTh: "น้ำมะนาวน้ำผึ้งปั่น", nameEn: "Blended Honey Lemon", price: 30 },
  { emoji: "🌰", nameTh: "น้ำลำไยปั่น", nameEn: "Blended Longan", price: 30 },
];

export const HOMEMADE_SWEETNESS: { th: string; en: string }[] = [
  { th: "หวานปกติ", en: "Regular Sweet" },
  { th: "ไม่หวาน", en: "No Added Sugar" },
];

/* สรุปราคาแบบย่อของหมวดน้ำโฮมเมด */
export const HOMEMADE_PRICE_SUMMARY: { label: string; price: string }[] = [
  { label: "น้ำโฮมเมดทั่วไป", price: "25 บาท" },
  { label: "น้ำลำไย + เนื้อลำไย", price: "30 บาท" },
  { label: "น้ำสมุนไพร/ผลไม้ปั่น", price: "เริ่ม 30 บาท" },
  { label: "เพิ่มท็อปปิ้ง", price: "+5 / +10 บาท" },
];

export const HOMEMADE_NOTE = {
  th: "น้ำโฮมเมดของทางร้านทำสดใหม่เป็นรอบ ๆ เมนูจึงหมุนเวียนแตกต่างกันในแต่ละวัน และอาจมีบางรายการที่ไม่มีจำหน่ายในวันนั้น",
  en: "Our homemade drinks are freshly prepared in small batches. Available flavors may vary from day to day and some items may not be available every day.",
};

/* ---------- 🥛 วิปครีมแก้ว | Whipped Cream Cups ---------- */
/* ฐานวิปครีม ฿20 + ท็อปปิ้งตามที่เลือก (คิดราคาต่อชิ้น) */
export const WHIP_BASE_PRICE = 20;
export const WHIP_FRUIT_PRICE = 10;

export type WhipTopping = { nameTh: string; nameEn: string; price: number };
export type WhipToppingGroup = {
  id: string;
  emoji: string;
  titleTh: string;
  titleEn: string;
  items: WhipTopping[];
};

export const WHIP_TOPPING_GROUPS: WhipToppingGroup[] = [
  {
    id: "tapioca",
    emoji: "🟤",
    titleTh: "ไข่มุกแป้งมันสำปะหลัง",
    titleEn: "Tapioca Pearls",
    items: [
      { nameTh: "ไข่มุกดำ / คลาสสิก", nameEn: "Classic Black Tapioca Pearls", price: 5 },
      { nameTh: "ไข่มุกสีทอง", nameEn: "Golden Tapioca Pearls", price: 5 },
      { nameTh: "ไข่มุกสีมรกต", nameEn: "Emerald Tapioca Pearls", price: 5 },
      { nameTh: "ไข่มุกบราวน์ชูการ์", nameEn: "Brown Sugar Tapioca Pearls", price: 10 },
    ],
  },
  {
    id: "popping",
    emoji: "🟣",
    titleTh: "ไข่มุกป๊อป",
    titleEn: "Popping Boba",
    items: [
      { nameTh: "ป๊อปสตรอว์เบอร์รี", nameEn: "Strawberry Popping Boba", price: 10 },
      { nameTh: "ป๊อปลิ้นจี่", nameEn: "Lychee Popping Boba", price: 10 },
      { nameTh: "ป๊อปมะม่วง", nameEn: "Mango Popping Boba", price: 10 },
      { nameTh: "ป๊อปเสาวรส", nameEn: "Passion Fruit Popping Boba", price: 10 },
    ],
  },
  {
    id: "konjac",
    emoji: "🟢",
    titleTh: "บุกและคริสตัล",
    titleEn: "Konjac & Crystal Jelly",
    items: [
      { nameTh: "บุกใส / บุกเพชร", nameEn: "Crystal Konjac Jelly", price: 5 },
      { nameTh: "บุกบราวน์ชูการ์", nameEn: "Brown Sugar Konjac Jelly", price: 5 },
    ],
  },
  {
    id: "jelly",
    emoji: "🍮",
    titleTh: "เยลลี่และวุ้น",
    titleEn: "Jelly",
    items: [
      { nameTh: "วุ้นมะพร้าว", nameEn: "Coconut Jelly", price: 5 },
      { nameTh: "วุ้นคาราเมล", nameEn: "Caramel Jelly", price: 5 },
      { nameTh: "เฉาก๊วย", nameEn: "Grass Jelly", price: 5 },
      { nameTh: "เยลลี่ฟรุตสลัด", nameEn: "Fruit Cocktail Jelly", price: 5 },
      { nameTh: "เยลลี่องุ่น", nameEn: "Grape Jelly", price: 5 },
      { nameTh: "เยลลี่สตรอว์เบอร์รี", nameEn: "Strawberry Jelly", price: 5 },
    ],
  },
  {
    id: "premium",
    emoji: "🍨",
    titleTh: "ท็อปปิ้งพรีเมียม",
    titleEn: "Premium",
    items: [
      { nameTh: "พุดดิ้ง", nameEn: "Pudding", price: 10 },
      { nameTh: "ครีมชีส", nameEn: "Cream Cheese", price: 10 },
      { nameTh: "วิปครีม", nameEn: "Whipped Cream", price: 10 },
    ],
  },
  {
    id: "sauces",
    emoji: "🍫",
    titleTh: "ซอส (ฟรี! รวมในวิปครีม)",
    titleEn: "Sauces",
    items: [
      { nameTh: "ซอสช็อกโกแลต", nameEn: "Chocolate Sauce", price: 0 },
      { nameTh: "ซอสสตรอว์เบอร์รี", nameEn: "Strawberry Sauce", price: 0 },
      { nameTh: "ซอสคาราเมล", nameEn: "Caramel Sauce", price: 0 },
    ],
  },
];

export type WhipFruit = {
  nameTh: string;
  nameEn: string;
  soldOut?: boolean;
};

/* ผลไม้สด (+10 บาท/ชนิด) — soldOut = หมดวันนี้ กดเลือกไม่ได้ */
export const WHIP_FRUITS: WhipFruit[] = [
  { nameTh: "องุ่นไร้เม็ด", nameEn: "Seedless Grapes" },
  { nameTh: "องุ่นไชน์มัสแคท", nameEn: "Shine Muscat Grapes" },
  { nameTh: "สตรอว์เบอร์รี", nameEn: "Strawberry" },
  { nameTh: "บลูเบอร์รี", nameEn: "Blueberry", soldOut: true },
  { nameTh: "ส้ม", nameEn: "Orange" },
  { nameTh: "เลมอนเชื่อม", nameEn: "Candied Lemon" },
  { nameTh: "องุ่นนิ้วมือแม่มด", nameEn: "Witch Finger Grapes", soldOut: true },
  { nameTh: "กีวี", nameEn: "Kiwi" },
  { nameTh: "ผลไม้รวม", nameEn: "Mixed Fruits" },
];

export const WHIP_NOTE = {
  th: "🍓 ผลไม้สดมีให้เลือกแตกต่างกันในแต่ละวัน กรุณาตรวจสอบรายการผลไม้ที่มีในวันนี้ก่อนสั่ง",
  en: "Fresh fruit availability varies by day. Please check today's available fruits before ordering.",
};

/* ---------- 🥤 น้ำอัดลมแบบขวด | Bottled Soft Drinks ---------- */
/* สินค้าพร้อมดื่ม ขายเป็นขวด (แยกจากเมนูโซดาที่ร้านชง) — แสดงแบบรายการ */
export type SoftDrink = {
  id: string;
  nameTh: string;
  nameEn: string;
  price: number;
  emoji: string;
  desc?: string;
  soldOut?: boolean;
  palette: SmoothiePalette;
};

export const SOFT_DRINKS: SoftDrink[] = [
  { id: "coke", nameTh: "โค้ก", nameEn: "Coca-Cola", price: 20, emoji: "🥤", desc: "รสโคล่าหอมเข้ม ซ่า สดชื่น มีความหวานกลมกล่อม", palette: { foam: "#e8ddd5", top: "#8a4a3a", bottom: "#3a1a14" } },
  { id: "coke-zero", nameTh: "โค้กไม่มีน้ำตาล", nameEn: "Coca-Cola Zero Sugar", price: 20, emoji: "🥤", desc: "รสโคล่าเข้ม หอมซ่า สดชื่น หวานน้อยโดยไม่มีน้ำตาล", palette: { foam: "#dcdcdc", top: "#3a3a3a", bottom: "#141414" } },
  { id: "fanta-orange", nameTh: "แฟนต้าส้ม", nameEn: "Fanta Orange", price: 20, emoji: "🥤", desc: "รสส้มหวานอมเปรี้ยว หอมกลิ่นส้ม ซ่าชื่นใจ", palette: { foam: "#fff1e0", top: "#ff9a3c", bottom: "#e2620f" } },
  { id: "fanta-strawberry", nameTh: "แฟนต้าแดง", nameEn: "Fanta Strawberry", price: 20, emoji: "🥤", desc: "หวานหอมกลิ่นสตรอว์เบอร์รี ซ่า สดชื่น ดื่มง่าย", palette: { foam: "#ffe9ee", top: "#ff6a86", bottom: "#d61e42" } },
  {
    id: "fanta-blue",
    nameTh: "แฟนต้าสีฟ้า",
    nameEn: "Fanta Blue",
    price: 20,
    emoji: "🥤",
    desc: "รสชาติเปรี้ยว ๆ หวาน ๆ หอมกลิ่นบลูเบอร์รี ผสมผสานกับกลิ่นดอกไม้จากดอกชบา",
    palette: { foam: "#e6f3ff", top: "#5ab0f0", bottom: "#1f6fc4" },
  },
  { id: "sprite", nameTh: "สไปรท์", nameEn: "Sprite", price: 20, emoji: "🥤", desc: "รสมะนาวเลมอน หอมสดชื่น เปรี้ยวหวาน ซ่าชื่นใจ", palette: { foam: "#eafdf0", top: "#7fd69a", bottom: "#2f9b57" } },
  { id: "est-cola", nameTh: "เอสโคล่า", nameEn: "est Cola", price: 20, emoji: "🥤", desc: "รสโคล่าหอมหวาน ซ่ากำลังดี ดื่มแล้วสดชื่น", palette: { foam: "#e5dbe8", top: "#6a3f7a", bottom: "#331a3d" } },
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

/* ---------- 🎁 แคมเปญโปรโมชั่นเทศกาล (หน้า /promotions) ---------- */
/* โปรวันเดียวต่อปี — สถานะ (เร็ว ๆ นี้ / วันนี้ / หมดเขต) คำนวณจากวันที่จริง */
export type PromoTheme =
  | "newyear"
  | "valentine"
  | "chinese"
  | "songkran"
  | "mother"
  | "halloween"
  | "loykrathong"
  | "father"
  | "christmas"
  | "nye"
  | "special";

export type PromoCampaign = {
  id: string;
  emoji: string;
  titleTh: string;
  titleEn: string;
  /** เดือน 1-12 (เว้นว่างถ้าเป็นโปรแบบ ongoing) */
  month?: number;
  /** วันที่ของเดือน (เว้นว่างถ้าเป็นโปรแบบ ongoing) */
  day?: number;
  /** โปรแบบไม่มีวันตายตัว — แสดง "ช่วงนี้" แทนวันที่/นับถอยหลัง */
  ongoing?: boolean;
  slogan: string;
  points?: string[];
  theme: PromoTheme;
  /* ---- รายละเอียดเต็ม (หน้า /promotions/[id]) ---- */
  activityTitle?: string;
  activityDesc?: string[];
  reward?: string;
  steps?: string[];
  conditions?: string[];
  sampleCaption?: string;
};

export const PROMO_CAMPAIGNS: PromoCampaign[] = [
  {
    id: "free-boba",
    emoji: "🧋",
    titleTh: "ไข่มุกฟรี",
    titleEn: "Free Boba",
    ongoing: true,
    slogan: "เติมความหนึบให้แก้วโปรด! 🧋",
    points: [
      "ฟรี! ไข่มุก 1 ท็อปปิ้ง / แก้ว",
      "เลือกไข่มุกที่ร่วมรายการได้ 1 อย่าง",
    ],
    theme: "special",
    activityTitle: "รับไข่มุกฟรี 1 อย่าง 🧋",
    activityDesc: [
      "เติมความหนึบให้แก้วโปรด — รับไข่มุกฟรี 1 อย่าง สำหรับเครื่องดื่มที่ร่วมรายการ",
      "🎁 ฟรี! ไข่มุก 1 ท็อปปิ้ง",
      "🧋 เลือกไข่มุกที่ร่วมรายการได้ 1 อย่างต่อ 1 แก้ว",
    ],
    reward: "ฟรีไข่มุก 1 อย่าง สำหรับเมนูที่ร่วมรายการ",
    conditions: [
      "ฟรีไข่มุก 1 อย่าง / 1 แก้ว",
      "เฉพาะเมนูที่ร่วมรายการ",
      "ไม่สามารถเปลี่ยนเป็นเงินสดหรือส่วนลดได้",
      "ท็อปปิ้งชนิดอื่นคิดราคาตามปกติ",
      "โปรโมชั่นอาจสิ้นสุดหรือเปลี่ยนแปลงได้โดยไม่ต้องแจ้งล่วงหน้า",
    ],
  },
  {
    id: "newyear",
    emoji: "🎆",
    titleTh: "ปีใหม่",
    titleEn: "New Year",
    month: 1,
    day: 1,
    slogan: "เริ่มปีใหม่สดชื่น 🎆",
    theme: "newyear",
  },
  {
    id: "valentine",
    emoji: "💕",
    titleTh: "วาเลนไทน์",
    titleEn: "Valentine's Day",
    month: 2,
    day: 14,
    slogan: "ปั่นรักให้หวาน 💕",
    points: [
      "Strawberry Milk / Strawberry Smoothie",
      "ซื้อคู่ 2 แก้ว ราคาพิเศษ",
      "เพิ่มวิปครีม + Popping Boba ฟรี",
    ],
    theme: "valentine",
  },
  {
    id: "chinese",
    emoji: "🧧",
    titleTh: "ตรุษจีน",
    titleEn: "Chinese New Year",
    month: 2,
    day: 17,
    slogan: "เฮง ๆ รับตรุษจีน 🧧",
    theme: "chinese",
  },
  {
    id: "songkran",
    emoji: "💦",
    titleTh: "สงกรานต์",
    titleEn: "Songkran",
    month: 4,
    day: 13,
    slogan: "ดับร้อนสงกรานต์ 💦",
    theme: "songkran",
  },
  {
    id: "mother",
    emoji: "👩‍👧",
    titleTh: "วันแม่",
    titleEn: "Mother's Day",
    month: 8,
    day: 12,
    slogan: "หวานใจแม่ 💐",
    points: [
      "ซื้อเครื่องดื่ม 2 แก้ว ราคาพิเศษ",
      "เมนูพิเศษสีฟ้า/ม่วง สำหรับวันแม่",
      "แถมท็อปปิ้งฟรี 1 อย่าง",
    ],
    theme: "mother",
  },
  {
    id: "halloween",
    emoji: "👻",
    titleTh: "ฮาโลวีน",
    titleEn: "Halloween",
    month: 10,
    day: 31,
    slogan: "Spooky Smoothie 👻",
    points: [
      "เครื่องดื่มธีมสีม่วง / ดำ / ส้ม",
      "แก้ว & สติกเกอร์ธีมฮาโลวีน",
      "🎃 Halloween Photo Challenge — ลด 5 บาท!",
    ],
    theme: "halloween",
    activityTitle: "Halloween Photo Challenge 🎃",
    activityDesc: [
      "แต่งหน้า 👻 หรือแต่งตัว 🎃 ในธีมฮาโลวีน",
      "ถ่ายรูปคู่กับเครื่องดื่มจากร้าน “ปั่นกับฟ่าง”",
      "📸 โพสต์รูปลง Facebook / Instagram",
      "✍️ ใส่แคปชั่นเกี่ยวกับ Halloween หรือเครื่องดื่มของร้าน",
      "🏷️ แท็กเพจร้าน PunKubFang",
    ],
    reward:
      "รับส่วนลดทันที 5 บาท! เมื่อแสดงโพสต์ให้ทางร้านตรวจสอบก่อนชำระเงิน",
    steps: [
      "แต่งหน้า หรือแต่งตัวในธีม Halloween",
      "ซื้อเครื่องดื่มจากร้าน “ปั่นกับฟ่าง”",
      "ถ่ายรูปคู่กับเครื่องดื่ม",
      "โพสต์รูปแบบสาธารณะ",
      "ใส่แคปชั่น",
      "แท็กเพจ PunKubFang",
      "แสดงโพสต์ให้ทางร้านตรวจสอบ",
      "รับส่วนลด 5 บาทต่อ 1 ออเดอร์",
    ],
    conditions: [
      "โปรโมชั่นเฉพาะวันที่ 31 ตุลาคมเท่านั้น",
      "1 สิทธิ์ / 1 ออเดอร์",
      "ต้องเป็นโพสต์ใหม่ที่สร้างในวันที่จัดกิจกรรม",
      "ขอสงวนสิทธิ์ในการตรวจสอบโพสต์ก่อนใช้สิทธิ์",
      "ไม่สามารถใช้ร่วมกับโปรโมชั่นอื่นได้",
    ],
    sampleCaption:
      "🎃 Halloween นี้ไม่หลอน แต่หวานมาก! 👻🧋\nวันนี้มาเติมความสดชื่นกับ “ปั่นกับฟ่าง” 💜\n#Halloween #PunKubFang #ปั่นกับฟ่าง",
  },
  {
    id: "loykrathong",
    emoji: "🪷",
    titleTh: "ลอยกระทง",
    titleEn: "Loy Krathong",
    month: 11,
    day: 24,
    slogan: "คืนเพ็ญหวานละมุน 🪷",
    theme: "loykrathong",
  },
  {
    id: "father",
    emoji: "👨‍👧",
    titleTh: "วันพ่อ",
    titleEn: "Father's Day",
    month: 12,
    day: 5,
    slogan: "เพื่อคุณพ่อคนเก่ง 💛",
    theme: "father",
  },
  {
    id: "christmas",
    emoji: "🎄",
    titleTh: "คริสต์มาส",
    titleEn: "Christmas",
    month: 12,
    day: 25,
    slogan: "Christmas Special 🎄",
    points: [
      "เมนูธีมสีแดง – เขียว – ขาว",
      "โปรโมชั่นซื้อคู่ราคาพิเศษ",
    ],
    theme: "christmas",
  },
  {
    id: "nye",
    emoji: "🎆",
    titleTh: "ส่งท้ายปีเก่า",
    titleEn: "New Year's Eve",
    month: 12,
    day: 31,
    slogan: "ส่งท้ายปีเก่าแบบสดชื่น 🎆",
    theme: "nye",
  },
];

/* ---------- ✨ ของตกแต่งลอยใน Hero ตามเทศกาล ---------- */
export const DEFAULT_HERO_DECOR = ["🍓", "🧊", "🥭"];

export const FESTIVAL_DECOR: Record<PromoTheme, string[]> = {
  newyear: ["🎆", "✨", "⭐"],
  valentine: ["💕", "💗", "🍓"],
  chinese: ["🧧", "🏮", "✨"],
  songkran: ["💦", "🌊", "🧊"],
  mother: ["🌼", "💙", "💐"],
  halloween: ["👻", "🎃", "🦇"],
  loykrathong: ["🪷", "🌕", "✨"],
  father: ["💛", "🌼", "⭐"],
  christmas: ["❄️", "⭐", "🎄"],
  nye: ["🎆", "✨", "⭐"],
  special: ["🧋", "🫧", "🍓"],
};

/** คืน emoji ตกแต่งของเทศกาลที่กำลังจะถึงภายใน 7 วัน (รวมวันงาน) ไม่งั้น null */
export function getActiveFestivalDecor(now: Date): string[] | null {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let best: { diff: number; theme: PromoTheme } | null = null;
  for (const p of PROMO_CAMPAIGNS) {
    if (p.month == null || p.day == null) continue; // ข้ามโปรแบบ ongoing
    const target = new Date(now.getFullYear(), p.month - 1, p.day);
    const diff = Math.round(
      (target.getTime() - today.getTime()) / 86400000,
    );
    if (diff >= 0 && diff <= 7 && (!best || diff < best.diff)) {
      best = { diff, theme: p.theme };
    }
  }
  return best ? FESTIVAL_DECOR[best.theme] : null;
}

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
