/* ข้อมูลทั้งหมดของเว็บ ปั่นกับฟ่าง — แก้ที่ไฟล์นี้ที่เดียว */

export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "หน้าแรก", href: "#home" },
  { label: "เมนูทั้งหมด", href: "/menu" },
  { label: "มิกซ์กับฟ่าง ✨", href: "/mix" },
  { label: "สุ่มแก้วกับฟ่าง 🎲", href: "/lucky-drink" },
  { label: "โปรโมชั่น", href: "/promotions" },
  { label: "เกี่ยวกับร้าน", href: "#about" },
  { label: "ติดต่อเรา", href: "#contact" },
];

/* ลิงก์ในฟุตเตอร์ — ใส่รีวิว/หมวดย่อยไว้ตรงนี้ (ไม่รกแถบบน) */
export const FOOTER_LINKS: NavItem[] = [
  { label: "หน้าแรก", href: "#home" },
  { label: "เมนูทั้งหมด", href: "/menu" },
  { label: "สมูทตี้", href: "/menu/smoothie" },
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
  "drinks" | "milk" | "tea" | "smoothie" | "soda" | "hot" | "sticky";

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
    label: "สมูทตี้",
    emoji: "🍓",
    desc: "ผลไม้ปั่นสดใหม่ทุกแก้ว",
    palette: { foam: "#fff2f6", top: "#ff9ec0", bottom: "#f0507f" },
    tint: "from-blossom-100 to-blossom-200/50",
  },
  {
    id: "soda",
    label: "อิตาเลียนโซดา",
    emoji: "🫧",
    desc: "Italian Soda · ซ่าสดชื่น",
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
  {
    id: "sticky",
    label: "นมเหนียว",
    emoji: "🍮",
    desc: "กินคู่เครื่องดื่ม หรือคู่แครกเกอร์แบบไม่ใส่น้ำก็ได้",
    palette: { foam: "#fff8ec", top: "#f5e2c0", bottom: "#e0b97e" },
    tint: "from-amber-50 to-yellow-200/50",
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
  /** รูปจริงของหมวด เช่น "/menu/coffee.png" (แนะนำ 400×400 พื้นโปร่ง) — ถ้าใส่จะแสดงแทนแก้ว SVG */
  image?: string;
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
    label: "สมูทตี้",
    labelEn: "Smoothies",
    emoji: "🍓",
    href: "/menu/smoothie",
    desc: "เติมความจึ้ง ✨",
    palette: { foam: "#fff2f6", top: "#ff9ec0", bottom: "#f0507f" },
  },
  {
    id: "soda",
    label: "อิตาเลียนโซดา",
    labelEn: "Italian Soda",
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
    id: "sticky",
    label: "นมเหนียว",
    labelEn: "Sticky Milk",
    emoji: "🍮",
    href: "/menu/sticky",
    desc: "เลือกคู่ที่ใช่ในแก้วของคุณ 💜",
    palette: { foam: "#fff8ec", top: "#f5e2c0", bottom: "#e0b97e" },
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
    id: "snacks",
    label: "ขนมกินเพลิน",
    labelEn: "Snacks & Bakery",
    emoji: "🍪",
    href: "/menu/snacks",
    desc: "ของกินเล่น จับคู่แก้วโปรด 🍪",
  },
  {
    id: "sandwiches",
    label: "แซนด์วิช",
    labelEn: "Sandwiches",
    emoji: "🥪",
    href: "/menu/sandwiches",
    desc: "คาว/ผลไม้ครีมสด/แยม 🥪",
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
  /** หมดชั่วคราว — ฟีเจอร์ "สุ่มแก้วกับฟ่าง" จะข้ามเมนูนี้ */
  soldOut?: boolean;
};

/** เรียงเมนู: มีรูปจริงขึ้นก่อน → แก้วการ์ตูน (SVG) ต่อท้าย (ลำดับเดิมภายในกลุ่มคงไว้) */
export const byRealImageFirst = (a: MenuItem, b: MenuItem) =>
  Number(Boolean(b.image)) - Number(Boolean(a.image));

export const MENU_ITEMS: MenuItem[] = [
  /* ผลไม้สด */
  {
    id: "grape-yogurt",
    name: "ม่วงแบบตะโกน",
    nameEn: "Grape Yogurt",
    tagline: "องุ่นม่วงหวานฉ่ำ + โยเกิร์ต",
    price: 50,
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
    price: 50,
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
    price: 50,
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
    price: 50,
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
    nameEn: "Cantaloupe Milk Smoothie",
    tagline: "แคนตาลูปหอมหวาน + นมสด",
    price: 50,
    likes: 84,
    emoji: "🍈",
    category: "smoothie",
    palette: { foam: "#fdfbe8", top: "#ffe08a", bottom: "#f2a52c" },
  },
  {
    id: "pineapple-smoothie",
    name: "สับปะรดปั่น",
    nameEn: "Pineapple Smoothie",
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
    nameEn: "Lychee Smoothie",
    tagline: "ลิ้นจี่หอมหวาน เนื้อนุ่มละมุน",
    price: 50,
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
    price: 50,
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
    price: 50,
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
    price: 50,
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
    price: 50,
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
    nameEn: "Red Soda",
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
    nameEn: "Green Soda",
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
    nameEn: "Lime Soda",
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
    nameEn: "Strawberry Soda",
    tagline: "หวานอมเปรี้ยว ซ่ากำลังดี",
    price: 30,
    likes: 90,
    emoji: "🍓",
    category: "soda",
    popular: true,
    palette: { foam: "#fff0f4", top: "#ff9db6", bottom: "#ef4b6e" },
    image: "/menu/strawberry-soda.webp",
  },
  {
    id: "grape-soda",
    name: "องุ่นโซดา",
    nameEn: "Grape Soda",
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
    nameEn: "Mango Soda",
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
    nameEn: "Peach Soda",
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
    nameEn: "Kiwi Soda",
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
    nameEn: "Blueberry Soda",
    tagline: "บลูเบอร์รีหวานอมเปรี้ยว",
    price: 30,
    likes: 53,
    emoji: "🫐",
    category: "soda",
    palette: { foam: "#eef0ff", top: "#8f9bf0", bottom: "#5257c9" },
    image: "/menu/blueberry-soda.webp",
  },
  {
    id: "pineapple-soda",
    name: "สับปะรดโซดา",
    nameEn: "Pineapple Soda",
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
    nameEn: "Passion Fruit Soda",
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
    nameEn: "Honey Lemon Soda",
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
    nameEn: "Bear Brand Milk Smoothie",
    tagline: "นมสดหอมมัน นุ่มละมุน",
    price: 50,
    likes: 91,
    emoji: "🐻",
    category: "milk",
    popular: true,
    palette: { foam: "#fffaf0", top: "#ffe9c9", bottom: "#f3c17e" },
  },
  {
    id: "bear-pink",
    name: "นมหมีชมพูปั่น",
    nameEn: "Pink Bear Milk Smoothie",
    tagline: "นมชมพูหวานหอม น่ารักสุด ๆ",
    price: 50,
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
    nameEn: "Thai Tea Bear Milk Smoothie",
    tagline: "ชาไทยเข้ม + นมสดหมี",
    price: 50,
    likes: 82,
    emoji: "🐻",
    category: "milk",
    palette: { foam: "#fff0e0", top: "#f4b06a", bottom: "#d97a2b" },
  },
  {
    id: "bear-choco",
    name: "นมหมีช็อกโกปั่น",
    nameEn: "Chocolate Bear Milk Smoothie",
    tagline: "ช็อกโกเข้ม + นมสดหมี",
    price: 50,
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
  {
    id: "two-tone-milk",
    name: "นมทูโทน",
    nameEn: "Two-Tone Milk",
    tagline: "ชาไทยเข้มด้านบน + นมสดด้านล่าง สองชั้นสวย ๆ",
    price: 40,
    likes: 64,
    emoji: "🥛",
    category: "milk",
    badge: "ใหม่",
    // ภาพตัวอย่างชั่วคราว: บน = ชาไทย ล่าง = นมสด (รอรูปจริง → ใส่ image: "/menu/two-tone-milk.jpg")
    palette: { foam: "#fff3e4", top: "#e8853a", bottom: "#fff8ee" },
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
    image: "/menu/matcha-milk.webp",
  },
  {
    id: "lemon-tea",
    name: "ชามะนาว",
    nameEn: "Lemon Tea",
    tagline: "ชาหอม + มะนาวสด เปรี้ยวซ่า",
    price: 50,
    likes: 61,
    emoji: "🍋",
    category: "tea",
    palette: { foam: "#fdf7d8", top: "#f2d873", bottom: "#c9a52a" },
    image: "/menu/lemon-tea.webp",
  },
  {
    id: "green-tea-milk",
    name: "ชาเขียวนมปั่น",
    nameEn: "Green Milk Tea",
    tagline: "ชาเขียวหอม + นมสด",
    price: 50,
    likes: 70,
    emoji: "🧋",
    category: "tea",
    palette: { foam: "#eef7ea", top: "#9ec97e", bottom: "#568a3c" },
  },

  /* กาแฟ */
  {
    id: "espresso-blend",
    name: "เอสเพรสโซเย็นปั่น",
    nameEn: "Iced Espresso Frappe",
    tagline: "กาแฟคั่วเข้ม สดชื่นตื่นตัว",
    price: 50,
    likes: 84,
    emoji: "☕",
    category: "drinks",
    popular: true,
    palette: { foam: "#efe2d6", top: "#a9764f", bottom: "#5b3a24" },
  },
  {
    id: "latte-blend",
    name: "ลาเต้เย็นปั่น",
    nameEn: "Iced Latte Frappe",
    tagline: "กาแฟนุ่ม + นมสดละมุน",
    price: 50,
    likes: 79,
    emoji: "☕",
    category: "drinks",
    palette: { foam: "#f3e7d8", top: "#c39a70", bottom: "#8a5f3a" },
  },
  {
    id: "mocha-blend",
    name: "มอคค่าปั่น",
    nameEn: "Mocha Frappe",
    tagline: "กาแฟ + ช็อกโกเข้มข้น",
    price: 50,
    likes: 73,
    emoji: "☕",
    category: "drinks",
    palette: { foam: "#eaddd2", top: "#9c6f4c", bottom: "#5f3d24" },
  },
  {
    id: "caramel-blend",
    name: "คาราเมลมัคคิอาโตปั่น",
    nameEn: "Caramel Macchiato Frappe",
    tagline: "คาราเมลหอมหวาน + กาแฟ",
    price: 50,
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
    nameEn: "Green Tea",
    tagline: "ชาเขียวหอมละมุน รสกลมกล่อม สดชื่น",
    price: 25,
    likes: 78,
    emoji: "🍵",
    category: "tea",
    palette: { foam: "#f1f7e8", top: "#a8ce7a", bottom: "#5f9a3f" },
    image: "/menu/green-tea.webp",
  },
  {
    id: "green-lemon-tea",
    name: "ชาเขียวมะนาว",
    nameEn: "Green Tea with Lemon",
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
    nameEn: "Iced Black Tea",
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
    image: "/menu/lemon-tea-plain.webp",
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
    name: "ชาแอปเปิล",
    nameEn: "Apple Tea",
    tagline: "ชากลิ่นแอปเปิลเปรี้ยวอมหวาน",
    price: 30,
    likes: 52,
    emoji: "🍏",
    category: "tea",
    palette: { foam: "#f5ffe8", top: "#c3e87a", bottom: "#7cb32b" },
    image: "/menu/apple-tea.webp",
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
    image: "/menu/honey-lemon-tea.webp",
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
    image: "/menu/jasmine-green-tea.webp",
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
  /* ☕ กาแฟ (เพิ่มจากรูปเมนูจริง) */
  {
    id: "coffee-milk",
    name: "กาแฟนมสด",
    nameEn: "Iced Coffee with Fresh Milk",
    tagline: "กาแฟเข้ม ๆ ตัดด้วยนมสดละมุน",
    price: 40,
    likes: 0,
    emoji: "☕",
    category: "drinks",
    palette: { foam: "#efe2d6", top: "#a9764f", bottom: "#5b3a24" },
    image: "/menu/coffee-milk.webp",
  },
  {
    id: "coffee-two-tone-pink",
    name: "กาแฟทูโทนนมชมพู",
    nameEn: "Two-Tone Coffee & Pink Milk",
    tagline: "กาแฟชั้นบน นมชมพูชั้นล่าง สวยแปลกตา",
    price: 45,
    likes: 0,
    emoji: "☕",
    category: "drinks",
    palette: { foam: "#efe2d6", top: "#a9764f", bottom: "#5b3a24" },
    image: "/menu/coffee-two-tone-pink.webp",
  },
  /* 🍵 ชา (เพิ่มจากรูปเมนูจริง) */
  {
    id: "kiwi-tea",
    name: "ชากีวี",
    nameEn: "Kiwi Tea",
    tagline: "ชาหอม ๆ เปรี้ยวอมหวานด้วยกีวี",
    price: 30,
    likes: 0,
    emoji: "🥝",
    category: "tea",
    palette: { foam: "#eef8dc", top: "#a3d65c", bottom: "#5e9a2c" },
    image: "/menu/kiwi-tea.webp",
  },
  {
    id: "taro-milk-tea",
    name: "ชานมเผือกหอม",
    nameEn: "Taro Milk Tea",
    tagline: "ชานมหอมนุ่ม ผสมเผือกหอมเข้มข้น",
    price: 40,
    likes: 0,
    emoji: "🟣",
    category: "tea",
    palette: { foam: "#f3e9ff", top: "#b99be0", bottom: "#7d5cb0" },
    image: "/menu/taro-milk-tea.webp",
  },
  {
    id: "lemon-tea-blend",
    name: "ชามะนาวปั่น",
    nameEn: "Lemon Tea Smoothie",
    tagline: "ชามะนาวเปรี้ยวซ่า ปั่นเย็นชื่นใจ",
    price: 50,
    likes: 0,
    emoji: "🍋",
    category: "tea",
    palette: { foam: "#fff9d6", top: "#f5d76e", bottom: "#d9a520" },
    image: "/menu/lemon-tea-blend.webp",
  },
  {
    id: "jasmine-butterfly-orange-tea",
    name: "ชามะลิอัญชันส้ม",
    nameEn: "Jasmine Butterfly Pea Orange Tea",
    tagline: "ชามะลิหอม + อัญชันสีสวย + ส้มสดชื่น",
    price: 35,
    likes: 0,
    emoji: "🌸",
    category: "tea",
    palette: { foam: "#ece8ff", top: "#8f8cf0", bottom: "#4f46b8" },
    image: "/menu/jasmine-butterfly-orange-tea.webp",
  },
  {
    id: "lychee-tea",
    name: "ชาลิ้นจี่",
    nameEn: "Lychee Tea",
    tagline: "ชาดำหอม ๆ กับลิ้นจี่ฉ่ำ ๆ",
    price: 30,
    likes: 0,
    emoji: "🍈",
    category: "tea",
    palette: { foam: "#fff2e0", top: "#f2b37c", bottom: "#c67a3c" },
    image: "/menu/lychee-tea.webp",
  },
  {
    id: "strawberry-tea",
    name: "ชาสตรอว์เบอร์รี",
    nameEn: "Strawberry Tea",
    tagline: "ชาหอมหวานอมเปรี้ยวด้วยสตรอว์เบอร์รี",
    price: 30,
    likes: 0,
    emoji: "🍓",
    category: "tea",
    palette: { foam: "#ffe3ea", top: "#f4788f", bottom: "#c8375a" },
    image: "/menu/strawberry-tea.webp",
  },
  {
    id: "pineapple-tea",
    name: "ชาสับปะรด",
    nameEn: "Pineapple Tea",
    tagline: "ชาเย็นซ่าหอมสับปะรด",
    price: 30,
    likes: 0,
    emoji: "🍍",
    category: "tea",
    palette: { foam: "#fff8d6", top: "#ffd95a", bottom: "#e0a51a" },
    image: "/menu/pineapple-tea.webp",
  },
  {
    id: "green-apple-tea",
    name: "ชาเขียวแอปเปิล",
    nameEn: "Green Apple Tea",
    tagline: "ชาเขียวหอม ๆ กับแอปเปิลเขียวสดชื่น",
    price: 30,
    likes: 0,
    emoji: "🍏",
    category: "tea",
    palette: { foam: "#eef9e0", top: "#b6e07a", bottom: "#6bb13a" },
    image: "/menu/green-apple-tea.webp",
  },
  {
    id: "passionfruit-tea",
    name: "ชาเสาวรส",
    nameEn: "Passion Fruit Tea",
    tagline: "ชาเปรี้ยวหวานหอมเสาวรส",
    price: 30,
    likes: 0,
    emoji: "🥭",
    category: "tea",
    palette: { foam: "#fff3cc", top: "#f6b93b", bottom: "#c97a12" },
    image: "/menu/passionfruit-tea.webp",
  },
  {
    id: "passionfruit-tea-pearl",
    name: "ชาเสาวรสไข่มุก",
    nameEn: "Passion Fruit Tea with Pearls",
    tagline: "ชาเสาวรสหอม ๆ เคี้ยวเพลินกับไข่มุก",
    price: 35,
    likes: 0,
    emoji: "🧋",
    category: "tea",
    palette: { foam: "#fff3cc", top: "#f6b93b", bottom: "#c97a12" },
    image: "/menu/passionfruit-tea-pearl.webp",
  },
  {
    id: "thai-tea-whip-cheese",
    name: "ชาไทยวิปครีมชีสขูด",
    nameEn: "Thai Tea with Whipped Cream & Cheese",
    tagline: "ชาไทยเข้ม ท็อปวิปครีมนุ่ม โรยชีสขูด",
    price: 45,
    likes: 0,
    emoji: "🧀",
    category: "tea",
    palette: { foam: "#fde7cf", top: "#e8934a", bottom: "#c1642a" },
    image: "/menu/thai-tea-whip-cheese.webp",
  },
  {
    id: "thai-tea-whip-pearl",
    name: "ชาไทยวิปครีมไข่มุก",
    nameEn: "Thai Tea with Whipped Cream & Pearls",
    tagline: "ชาไทยหอมเข้ม วิปครีมนุ่ม + ไข่มุกหนึบ",
    price: 45,
    likes: 0,
    emoji: "🧋",
    category: "tea",
    palette: { foam: "#fde7cf", top: "#e8934a", bottom: "#c1642a" },
    image: "/menu/thai-tea-whip-pearl.webp",
  },
  {
    id: "matcha-orange",
    name: "มัทฉะน้ำส้ม",
    nameEn: "Orange Matcha",
    tagline: "มัทฉะเข้ม ตัดด้วยน้ำส้มสดชื่น",
    price: 45,
    likes: 0,
    emoji: "🍊",
    category: "tea",
    palette: { foam: "#edf7e4", top: "#7fb85a", bottom: "#3f7a34" },
    image: "/menu/matcha-orange.webp",
  },
  {
    id: "matcha-strawberry",
    name: "มัทฉะสตรอว์เบอร์รี",
    nameEn: "Strawberry Matcha",
    tagline: "มัทฉะหอม ๆ กับสตรอว์เบอร์รีหวานอมเปรี้ยว",
    price: 50,
    likes: 0,
    emoji: "🍓",
    category: "tea",
    palette: { foam: "#edf7e4", top: "#7fb85a", bottom: "#3f7a34" },
    image: "/menu/matcha-strawberry.webp",
  },
  {
    id: "matcha-butterfly",
    name: "มัทฉะอัญชัน",
    nameEn: "Butterfly Pea Matcha",
    tagline: "มัทฉะเขียว ชั้นอัญชันม่วงสวย",
    price: 45,
    likes: 0,
    emoji: "💜",
    category: "tea",
    palette: { foam: "#edf7e4", top: "#7fb85a", bottom: "#3f7a34" },
    image: "/menu/matcha-butterfly.webp",
  },
  {
    id: "pure-matcha",
    name: "เพียวมัทฉะ",
    nameEn: "Pure Matcha",
    tagline: "มัทฉะแท้ ๆ เข้มข้น ไม่ผสมนม",
    price: 45,
    likes: 0,
    emoji: "🍵",
    category: "tea",
    palette: { foam: "#edf7e4", top: "#7fb85a", bottom: "#3f7a34" },
    image: "/menu/pure-matcha.webp",
  },
  {
    id: "oreo-milk-tea",
    name: "ชานมโอรีโอ",
    nameEn: "Oreo Milk Tea",
    tagline: "ชานมหอมนุ่ม โรยโอรีโอกรุบกรอบ",
    price: 45,
    likes: 0,
    emoji: "🍪",
    category: "tea",
    palette: { foam: "#f4f4f4", top: "#8c8c8c", bottom: "#3a3a3a" },
    image: "/menu/oreo-milk-tea.webp",
  },
  {
    id: "green-tea-two-tone-pink",
    name: "ชาเขียวทูโทนนมชมพู",
    nameEn: "Two-Tone Green Tea & Pink Milk",
    tagline: "ชาเขียวชั้นบน นมชมพูชั้นล่าง",
    price: 40,
    likes: 0,
    emoji: "🍵",
    category: "tea",
    palette: { foam: "#eaf5df", top: "#8fc36a", bottom: "#4f8a3c" },
    image: "/menu/green-tea-two-tone-pink.webp",
  },
  {
    id: "thai-tea-two-tone-green",
    name: "ชาไทยทูโทนชาเขียว",
    nameEn: "Two-Tone Thai Tea & Green Tea",
    tagline: "ชาไทยเข้มคู่ชาเขียวหอมในแก้วเดียว",
    price: 40,
    likes: 0,
    emoji: "🍵",
    category: "tea",
    palette: { foam: "#fde7cf", top: "#e8934a", bottom: "#c1642a" },
    image: "/menu/thai-tea-two-tone-green.webp",
  },
  {
    id: "thai-tea-two-tone-pink",
    name: "ชาไทยทูโทนนมชมพู",
    nameEn: "Two-Tone Thai Tea & Pink Milk",
    tagline: "ชาไทยชั้นบน นมชมพูชั้นล่าง หวานละมุน",
    price: 40,
    likes: 0,
    emoji: "🧋",
    category: "tea",
    palette: { foam: "#fde7cf", top: "#e8934a", bottom: "#c1642a" },
    image: "/menu/thai-tea-two-tone-pink.webp",
  },
  /* 🥛 นม (เพิ่มจากรูปเมนูจริง) */
  {
    id: "fresh-milk",
    name: "นมสด",
    nameEn: "Fresh Milk",
    tagline: "นมสดเย็น ๆ หอมมันละมุน",
    price: 30,
    likes: 0,
    emoji: "🥛",
    category: "milk",
    palette: { foam: "#ffffff", top: "#fbf7f2", bottom: "#eadfd2" },
    image: "/menu/fresh-milk.webp",
  },
  {
    id: "fresh-milk-blend",
    name: "นมสดปั่น",
    nameEn: "Fresh Milk Smoothie",
    tagline: "นมสดปั่นเนียนนุ่มเย็นชื่นใจ",
    price: 50,
    likes: 0,
    emoji: "🥛",
    category: "milk",
    palette: { foam: "#ffffff", top: "#fbf7f2", bottom: "#eadfd2" },
    image: "/menu/fresh-milk-blend.webp",
  },
  {
    id: "pink-milk",
    name: "นมชมพู",
    nameEn: "Pink Milk",
    tagline: "นมชมพูหวานหอม สีสวยน่ารัก",
    price: 30,
    likes: 0,
    emoji: "🌸",
    category: "milk",
    palette: { foam: "#fff0f5", top: "#f7a8c4", bottom: "#e56b9a" },
    image: "/menu/pink-milk.webp",
  },
  {
    id: "pink-milk-two-tone",
    name: "นมชมพูทูโทน",
    nameEn: "Two-Tone Pink Milk",
    tagline: "นมชมพูสองชั้น สวยละมุน",
    price: 35,
    likes: 0,
    emoji: "🌸",
    category: "milk",
    palette: { foam: "#fff0f5", top: "#f7a8c4", bottom: "#e56b9a" },
    image: "/menu/pink-milk-two-tone.webp",
  },
  {
    id: "pink-milk-blend-two-tone",
    name: "นมชมพูปั่นทูโทน",
    nameEn: "Two-Tone Pink Milk Smoothie",
    tagline: "นมชมพูปั่นเนียน ๆ ไล่สีสองชั้น",
    price: 50,
    likes: 0,
    emoji: "🌸",
    category: "milk",
    palette: { foam: "#fff0f5", top: "#f7a8c4", bottom: "#e56b9a" },
    image: "/menu/pink-milk-blend-two-tone.webp",
  },
  {
    id: "kiwi-milk",
    name: "นมสดกีวี",
    nameEn: "Kiwi Fresh Milk",
    tagline: "นมสดละมุนกับกีวีเปรี้ยวอมหวาน",
    price: 40,
    likes: 0,
    emoji: "🥝",
    category: "milk",
    palette: { foam: "#eef8dc", top: "#a3d65c", bottom: "#5e9a2c" },
    image: "/menu/kiwi-milk.webp",
  },
  {
    id: "blueberry-milk",
    name: "นมสดบลูเบอร์รี",
    nameEn: "Blueberry Fresh Milk",
    tagline: "นมสดหอมมันกับบลูเบอร์รีหวานฉ่ำ",
    price: 40,
    likes: 0,
    emoji: "🫐",
    category: "milk",
    palette: { foam: "#ede7ff", top: "#8e7cd6", bottom: "#4d3a9e" },
    image: "/menu/blueberry-milk.webp",
  },
  {
    id: "butterfly-milk",
    name: "นมสดอัญชัน",
    nameEn: "Butterfly Pea Milk",
    tagline: "นมสดสีม่วงสวยจากดอกอัญชัน",
    price: 35,
    likes: 0,
    emoji: "💜",
    category: "milk",
    palette: { foam: "#ece8ff", top: "#8f8cf0", bottom: "#4f46b8" },
    image: "/menu/butterfly-milk.webp",
  },
  {
    id: "honey-milk-whip",
    name: "นมสดน้ำผึ้งวิปครีม",
    nameEn: "Honey Milk with Whipped Cream",
    tagline: "นมสดหวานน้ำผึ้ง ท็อปวิปครีมนุ่ม ๆ",
    price: 45,
    likes: 0,
    emoji: "🍯",
    category: "milk",
    palette: { foam: "#fff3d6", top: "#f2c15a", bottom: "#c98a1d" },
    image: "/menu/honey-milk-whip.webp",
  },
  {
    id: "unicorn-milk",
    name: "นมสดยูนิคอร์น",
    nameEn: "Unicorn Milk",
    tagline: "นมสดสีพาสเทลหลายชั้น สวยเหมือนยูนิคอร์น",
    price: 45,
    likes: 0,
    emoji: "🦄",
    category: "milk",
    palette: { foam: "#fff0fb", top: "#c9a6ff", bottom: "#7fd3ff" },
    image: "/menu/unicorn-milk.webp",
  },
  {
    id: "brown-sugar-pearl-milk",
    name: "นมสดไข่มุกบราวน์ชูการ์",
    nameEn: "Brown Sugar Pearl Milk",
    tagline: "นมสดกับไข่มุกบราวน์ชูการ์หนึบหอม",
    price: 45,
    likes: 0,
    emoji: "🧋",
    category: "milk",
    palette: { foam: "#f7ead8", top: "#c8945a", bottom: "#7a4a1e" },
    image: "/menu/brown-sugar-pearl-milk.webp",
  },
  {
    id: "oreo-milk-blend-whip",
    name: "นมสดโอรีโอปั่นวิปครีม",
    nameEn: "Oreo Milk Smoothie with Whipped Cream",
    tagline: "นมสดปั่นกับโอรีโอ ท็อปวิปครีมเต็ม ๆ",
    price: 50,
    likes: 0,
    emoji: "🍪",
    category: "milk",
    palette: { foam: "#f4f4f4", top: "#8c8c8c", bottom: "#3a3a3a" },
    image: "/menu/oreo-milk-blend-whip.webp",
  },
  {
    id: "taro-milk",
    name: "นมเผือกหอม",
    nameEn: "Taro Milk",
    tagline: "นมเผือกหอมหวานมัน สีม่วงน่ารัก",
    price: 40,
    likes: 0,
    emoji: "🟣",
    category: "milk",
    palette: { foam: "#f3e9ff", top: "#b99be0", bottom: "#7d5cb0" },
    image: "/menu/taro-milk.webp",
  },
  {
    id: "taro-milk-whip",
    name: "นมสดเผือกหอมวิปครีม",
    nameEn: "Taro Milk with Whipped Cream",
    tagline: "นมสดเผือกหอม ท็อปวิปครีมนุ่ม ๆ",
    price: 50,
    likes: 0,
    emoji: "🟣",
    category: "milk",
    palette: { foam: "#f3e9ff", top: "#b99be0", bottom: "#7d5cb0" },
    image: "/menu/taro-milk-whip.webp",
  },
  {
    id: "taro-milk-blend-whip",
    name: "นมสดเผือกหอมปั่นวิปครีม",
    nameEn: "Taro Milk Smoothie with Whipped Cream",
    tagline: "เผือกหอมปั่นเนียน ๆ กับนมสด ท็อปวิปครีม",
    price: 50,
    likes: 0,
    emoji: "🟣",
    category: "milk",
    palette: { foam: "#f3e9ff", top: "#b99be0", bottom: "#7d5cb0" },
    image: "/menu/taro-milk-blend-whip.webp",
  },
  {
    id: "taro-choco-two-tone",
    name: "นมสดเผือกหอมทูโทนช็อกโกแลต",
    nameEn: "Two-Tone Taro & Chocolate Milk",
    tagline: "เผือกหอมชั้นบน ช็อกโกแลตชั้นล่าง",
    price: 45,
    likes: 0,
    emoji: "🍫",
    category: "milk",
    palette: { foam: "#f3e9ff", top: "#b99be0", bottom: "#7d5cb0" },
    image: "/menu/taro-choco-two-tone.webp",
  },
  {
    id: "taro-pink-two-tone",
    name: "เผือกหอมทูโทนนมชมพู",
    nameEn: "Two-Tone Taro & Pink Milk",
    tagline: "เผือกหอมม่วงคู่นมชมพูหวานละมุน",
    price: 45,
    likes: 0,
    emoji: "🟣",
    category: "milk",
    palette: { foam: "#f3e9ff", top: "#b99be0", bottom: "#7d5cb0" },
    image: "/menu/taro-pink-two-tone.webp",
  },
  {
    id: "cocoa-two-tone-green",
    name: "โกโก้ทูโทนชาเขียว",
    nameEn: "Two-Tone Cocoa & Green Tea",
    tagline: "โกโก้เข้มชั้นล่าง ชาเขียวหอมชั้นบน",
    price: 45,
    likes: 0,
    emoji: "🍫",
    category: "milk",
    palette: { foam: "#f1e4d8", top: "#8a5a3c", bottom: "#4e2f1e" },
    image: "/menu/cocoa-two-tone-green.webp",
  },
  {
    id: "cocoa-two-tone-mint",
    name: "โกโก้ทูโทนมินต์",
    nameEn: "Two-Tone Cocoa & Mint",
    tagline: "โกโก้เข้มตัดด้วยมินต์เย็นสดชื่น",
    price: 45,
    likes: 0,
    emoji: "🍫",
    category: "milk",
    palette: { foam: "#e8fbf3", top: "#7fd9b0", bottom: "#3f9f78" },
    image: "/menu/cocoa-two-tone-mint.webp",
  },
  {
    id: "ovaltine-volcano",
    name: "โอวัลตินภูเขาไฟ",
    nameEn: "Ovaltine Volcano",
    tagline: "โอวัลตินเข้ม ๆ โรยผงโอวัลตินล้นแก้วเหมือนภูเขาไฟ",
    price: 50,
    likes: 0,
    emoji: "🌋",
    category: "milk",
    palette: { foam: "#f1e4d8", top: "#8a5a3c", bottom: "#4e2f1e" },
    image: "/menu/ovaltine-volcano.webp",
  },
  /* 🫧 โซดา (เพิ่มจากรูปเมนูจริง) */
  {
    id: "blue-lemon-soda",
    name: "บลูเลมอนโซดา",
    nameEn: "Blue Lemon Soda",
    tagline: "โซดาสีฟ้าสดใส เปรี้ยวซ่ามะนาว",
    price: 35,
    likes: 0,
    emoji: "🍋",
    category: "soda",
    palette: { foam: "#e6f4ff", top: "#6cc4ff", bottom: "#2a7fd6" },
    image: "/menu/blue-lemon-soda.webp",
  },
  {
    id: "blue-ocean-soda",
    name: "บลูโอเชียนโซดา",
    nameEn: "Blue Ocean Soda",
    tagline: "โซดาสีฟ้าเหมือนทะเล ซ่าสดชื่น",
    price: 35,
    likes: 0,
    emoji: "🌊",
    category: "soda",
    palette: { foam: "#e6f4ff", top: "#6cc4ff", bottom: "#2a7fd6" },
    image: "/menu/blue-ocean-soda.webp",
  },
  {
    id: "orange-soda",
    name: "ส้มโซดา",
    nameEn: "Orange Soda",
    tagline: "ส้มสดชื่นซ่า ๆ",
    price: 30,
    likes: 0,
    emoji: "🍊",
    category: "soda",
    palette: { foam: "#fff0d6", top: "#ffb347", bottom: "#e07a1f" },
    image: "/menu/orange-soda.webp",
  },
  {
    id: "apple-soda",
    name: "แอปเปิลโซดา",
    nameEn: "Apple Soda",
    tagline: "แอปเปิลเขียวหอมหวานซ่า",
    price: 30,
    likes: 0,
    emoji: "🍏",
    category: "soda",
    palette: { foam: "#eef9e0", top: "#b6e07a", bottom: "#6bb13a" },
    image: "/menu/apple-soda.webp",
  },
  /* 🍓 สมูทตี้ (เพิ่มจากรูปเมนูจริง) */
  {
    id: "passionfruit-blend-whip",
    name: "เสาวรสปั่นวิปครีมซอสเสาวรส",
    nameEn: "Passion Fruit Smoothie with Whipped Cream",
    tagline: "เสาวรสปั่นเปรี้ยวหวาน ท็อปวิปครีม ราดซอสเสาวรส",
    price: 50,
    likes: 0,
    emoji: "🥭",
    category: "smoothie",
    palette: { foam: "#fff3cc", top: "#f6b93b", bottom: "#c97a12" },
    image: "/menu/passionfruit-blend-whip.webp",
  },
];

/* ---------- มิกซ์กับฟ่าง (ปั่นเอง) ---------- */
export type MixOption = {
  id: string;
  label: string;
  /** ชื่อภาษาอังกฤษ */
  labelEn?: string;
  emoji: string;
  palette?: SmoothiePalette;
};

export const MIX_BASES: MixOption[] = [
  {
    id: "milk",
    label: "นมสด",
    labelEn: "Fresh Milk",
    emoji: "🥛",
    palette: { foam: "#fff7ef", top: "#ffe3c2", bottom: "#f4c48a" },
  },
  {
    id: "yogurt",
    label: "โยเกิร์ต",
    labelEn: "Yogurt",
    emoji: "🍦",
    palette: { foam: "#fef1f7", top: "#ffd0e4", bottom: "#f89bc4" },
  },
  {
    id: "soda",
    label: "โซดา",
    labelEn: "Soda",
    emoji: "🧊",
    palette: { foam: "#eaf7ff", top: "#8fd6ff", bottom: "#2b9be0" },
  },
  {
    id: "smoothie",
    label: "สมูทตี้",
    labelEn: "Smoothie",
    emoji: "🍓",
    palette: { foam: "#fff2f6", top: "#ff9ec0", bottom: "#f0507f" },
  },
  {
    id: "coffee",
    label: "กาแฟ",
    labelEn: "Coffee",
    emoji: "☕",
    palette: { foam: "#efe2d6", top: "#a9764f", bottom: "#5b3a24" },
  },
];

/* ชนิดน้ำสมุนไพรโฮมเมด (ฐานหมวด "น้ำสมุนไพร" — เลือกได้ 1 ชนิด นับเป็น 1 ฐาน) */
export const MIX_HERBAL_TYPES: MixOption[] = [
  {
    id: "chrysanth",
    label: "เก๊กฮวย",
    labelEn: "Chrysanthemum",
    emoji: "🌼",
    palette: { foam: "#fff8e6", top: "#f4d97a", bottom: "#d9a520" },
  },
  {
    id: "butterfly",
    label: "อัญชันมะนาว",
    labelEn: "Butterfly Pea Lemon",
    emoji: "🦋",
    palette: { foam: "#eef0ff", top: "#9db4f0", bottom: "#5566c9" },
  },
  {
    id: "pandan",
    label: "ใบเตย",
    labelEn: "Pandan",
    emoji: "🌿",
    palette: { foam: "#eefae8", top: "#a8ce7a", bottom: "#5f9a3f" },
  },
  {
    id: "passion",
    label: "เสาวรส",
    labelEn: "Passion Fruit",
    emoji: "🥭",
    palette: { foam: "#fff3e0", top: "#ffc46b", bottom: "#e88a1f" },
  },
  {
    id: "honeylemon",
    label: "มะนาวน้ำผึ้ง",
    labelEn: "Honey Lemon",
    emoji: "🍋",
    palette: { foam: "#fdf7d8", top: "#f2d873", bottom: "#c9a52a" },
  },
  {
    id: "grassjelly",
    label: "เฉาก๊วย",
    labelEn: "Grass Jelly",
    emoji: "🖤",
    palette: { foam: "#e9e6ea", top: "#7a7280", bottom: "#332b3a" },
  },
  {
    id: "longan",
    label: "ลำไย",
    labelEn: "Longan",
    emoji: "🌰",
    palette: { foam: "#f6ece0", top: "#d3a976", bottom: "#9a6a3f" },
  },
  {
    id: "roselle",
    label: "กระเจี๊ยบ",
    labelEn: "Roselle",
    emoji: "🌺",
    palette: { foam: "#fdeaf0", top: "#e77aa0", bottom: "#c02a5a" },
  },
];

/* ---------- 🥝 ตักสด ปั่นฟิน — บุฟเฟ่ต์ผัก/ผลไม้สดปั่น ---------- */
/* ราคาเดียว ไม่คิดเพิ่มตามชนิด · ลูกค้าเลือกวัตถุดิบ ร้านตักใส่แก้วแล้วปั่นให้ */
export const FRESH_BUFFET = {
  price: 49,
  oldPrice: 69,
};

export type FreshItem = {
  id: string;
  label: string;
  /** ชื่อภาษาอังกฤษ — แสดงใต้ชื่อไทยในชิป */
  en?: string;
  emoji: string;
  /** รูปวัตถุดิบ เช่น "/fresh/banana.png" (แนะนำ 96×96 พื้นโปร่ง) — ถ้าใส่จะแสดงแทน emoji */
  image?: string;
};

export const FRESH_FRUITS: FreshItem[] = [
  { id: "banana", label: "กล้วย", en: "Banana", emoji: "🍌" },
  { id: "strawberry", label: "สตรอว์เบอร์รี", en: "Strawberry", emoji: "🍓" },
  { id: "apple", label: "แอปเปิล", en: "Apple", emoji: "🍎" },
  { id: "pineapple", label: "สับปะรด", en: "Pineapple", emoji: "🍍" },
  { id: "watermelon", label: "แตงโม", en: "Watermelon", emoji: "🍉" },
  { id: "orange", label: "ส้ม", en: "Orange", emoji: "🍊" },
  { id: "kiwi", label: "กีวี", en: "Kiwi", emoji: "🥝" },
  { id: "grape", label: "องุ่น", en: "Grapes", emoji: "🍇" },
  {
    id: "shine-muscat",
    label: "องุ่นไชน์มัสแคท",
    en: "Shine Muscat Grapes",
    emoji: "🍇",
  },
  { id: "blueberry", label: "บลูเบอร์รี", en: "Blueberry", emoji: "🫐" },
  { id: "mulberry", label: "มัลเบอร์รี", en: "Mulberry", emoji: "🫐" },
  { id: "dragonfruit", label: "แก้วมังกร", en: "Dragon Fruit", emoji: "🩷" },
  { id: "pomegranate", label: "ทับทิม", en: "Pomegranate", emoji: "❤️" },
  { id: "passion", label: "เสาวรส", en: "Passion Fruit", emoji: "💛" },
  { id: "pear", label: "สาลี่", en: "Asian Pear", emoji: "🍐" },
  { id: "persimmon", label: "ลูกพลับ", en: "Persimmon", emoji: "🟠" },
  { id: "cantaloupe", label: "แคนตาลูป", en: "Cantaloupe", emoji: "🍈" },
  { id: "melon", label: "เมล่อน", en: "Melon", emoji: "🟢" },
  { id: "roseapple", label: "ชมพู่", en: "Rose Apple", emoji: "🌸" },
  { id: "guava", label: "ฝรั่ง", en: "Guava", emoji: "💚" },
  { id: "jicama", label: "มันแกว", en: "Jicama", emoji: "🤎" },
];

export const FRESH_VEGGIES: FreshItem[] = [
  { id: "carrot", label: "แครอท", en: "Carrot", emoji: "🥕" },
  { id: "cucumber", label: "แตงกวา", en: "Cucumber", emoji: "🥒" },
  { id: "tomato", label: "มะเขือเทศ", en: "Tomato", emoji: "🍅" },
  { id: "spinach", label: "ผักโขม", en: "Spinach", emoji: "🌿" },
  { id: "lettuce", label: "ผักกาดหอม", en: "Lettuce", emoji: "🥬" },
  { id: "celery", label: "เซเลอรี", en: "Celery", emoji: "🌿" },
  { id: "beetroot", label: "บีตรูท", en: "Beetroot", emoji: "❤️" },
  { id: "kale", label: "เคล", en: "Kale", emoji: "🥬" },
];

/* ✨ เพิ่มรสชาติ — รวมอยู่ในราคา 49 บาท ไม่คิดเพิ่ม */
export const FRESH_FLAVORS: FreshItem[] = [
  { id: "honey", label: "น้ำผึ้ง", en: "Honey", emoji: "🍯" },
  { id: "yogurt", label: "โยเกิร์ต", en: "Yogurt", emoji: "🍦" },
  { id: "milk", label: "นมสด", en: "Fresh Milk", emoji: "🥛" },
  { id: "syrup", label: "น้ำเชื่อม", en: "Simple Syrup", emoji: "💧" },
];

/* ชนิดชา (ฐานหมวด "ชา" — เลือกได้ 1 ชนิด นับเป็น 1 ฐาน) */
export const MIX_TEA_TYPES: MixOption[] = [
  {
    id: "thai",
    label: "ชาไทย",
    labelEn: "Thai Tea",
    emoji: "🍵",
    palette: { foam: "#fff0df", top: "#f0a962", bottom: "#cf6f26" },
  },
  {
    id: "green",
    label: "ชาเขียว",
    labelEn: "Green Tea",
    emoji: "🍵",
    palette: { foam: "#f1f7e8", top: "#a8ce7a", bottom: "#5f9a3f" },
  },
  {
    id: "black",
    label: "ชาดำ",
    labelEn: "Black Tea",
    emoji: "🍵",
    palette: { foam: "#efe0cf", top: "#9a6a3f", bottom: "#4f3016" },
  },
  {
    id: "lemon",
    label: "ชามะนาว",
    labelEn: "Lemon Tea",
    emoji: "🍋",
    palette: { foam: "#fdf7d8", top: "#f2d873", bottom: "#c9a52a" },
  },
  {
    id: "peach",
    label: "ชาพีช",
    labelEn: "Peach Tea",
    emoji: "🍑",
    palette: { foam: "#fff1ea", top: "#ffb99a", bottom: "#f77e4f" },
  },
  {
    id: "apple",
    label: "ชาแอปเปิล",
    labelEn: "Apple Tea",
    emoji: "🍏",
    palette: { foam: "#f5ffe8", top: "#c3e87a", bottom: "#7cb32b" },
  },
  {
    id: "honey",
    label: "ชาน้ำผึ้ง",
    labelEn: "Honey Tea",
    emoji: "🍯",
    palette: { foam: "#fdf7d8", top: "#f2d873", bottom: "#d9a520" },
  },
  {
    id: "rose",
    label: "ชากุหลาบ",
    labelEn: "Rose Tea",
    emoji: "🌹",
    palette: { foam: "#fdeef4", top: "#f3a9c6", bottom: "#d95f8f" },
  },
  {
    id: "jasmine",
    label: "ชามะลิ",
    labelEn: "Jasmine Tea",
    emoji: "🌼",
    palette: { foam: "#fbf8ec", top: "#ecdfa8", bottom: "#c9b85e" },
  },
  {
    id: "lychee",
    label: "ชาลิ้นจี่",
    labelEn: "Lychee Tea",
    emoji: "🌸",
    palette: { foam: "#fdf0f2", top: "#f2c0c8", bottom: "#d97b88" },
  },
  {
    id: "strawberry",
    label: "ชาสตรอว์เบอร์รี",
    labelEn: "Strawberry Tea",
    emoji: "🍓",
    palette: { foam: "#fff0f3", top: "#ff9fb0", bottom: "#e8536f" },
  },
];

/* 🍬 รสชาติ/ไซรัป (ไม่ใช่ผลไม้สด) — ใช้ชื่อผลไม้เฉย ๆ ไม่ต้องมีคำว่า "ไซรัป" */
export const MIX_SYRUPS: MixOption[] = [
  { id: "apple", label: "แอปเปิล", labelEn: "Apple", emoji: "🍏" },
  { id: "peach", label: "พีช", labelEn: "Peach", emoji: "🍑" },
  {
    id: "strawberry-syrup",
    label: "สตรอว์เบอร์รี",
    labelEn: "Strawberry",
    emoji: "🍓",
  },
  { id: "lychee", label: "ลิ้นจี่", labelEn: "Lychee", emoji: "🌸" },
  { id: "mango-syrup", label: "มะม่วง", labelEn: "Mango", emoji: "🥭" },
  {
    id: "blueberry-syrup",
    label: "บลูเบอร์รี",
    labelEn: "Blueberry",
    emoji: "🫐",
  },
];

/* 🍓 ผลไม้สด */
export const MIX_FRUITS: MixOption[] = [
  {
    id: "strawberry",
    label: "สตรอว์เบอร์รี",
    labelEn: "Strawberry",
    emoji: "🍓",
  },
  { id: "grape", label: "องุ่น", labelEn: "Grape", emoji: "🍇" },
  { id: "mango", label: "มะม่วง", labelEn: "Mango", emoji: "🥭" },
  { id: "blueberry", label: "บลูเบอร์รี", labelEn: "Blueberry", emoji: "🫐" },
  { id: "kiwi", label: "กีวี", labelEn: "Kiwi", emoji: "🥝" },
];

export const MIX_TOPPINGS: MixOption[] = [
  { id: "boba", label: "ไข่มุก", labelEn: "Boba", emoji: "🟤" },
  { id: "jelly", label: "เจลลี่", labelEn: "Jelly", emoji: "🟣" },
  { id: "cookie", label: "คุกกี้", labelEn: "Cookie", emoji: "🍪" },
  { id: "whip", label: "วิปครีม", labelEn: "Whipped Cream", emoji: "🍨" },
];

/* ---------- 🧋 ท็อปปิ้ง | Toppings ---------- */
export type ToppingItem = {
  nameTh: string;
  nameEn: string;
  /** ราคาเพิ่มต่อ 1 ท็อปปิ้ง (บาท) */
  price: number;
  /** รูปท็อปปิ้ง เช่น "/toppings/boba.png" — ถ้าไม่ใส่จะโชว์ placeholder */
  image?: string;
  /** คำอธิบายสั้น ๆ (แสดงใน popup รายละเอียด) */
  desc?: string;
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
      {
        nameTh: "ไข่มุกดำ / ไข่มุกคลาสสิก",
        nameEn: "Classic Black Tapioca Pearls",
        price: 5,
      },
      { nameTh: "ไข่มุกสีทอง", nameEn: "Golden Tapioca Pearls", price: 5 },
      { nameTh: "ไข่มุกสีมรกต", nameEn: "Emerald Tapioca Pearls", price: 5 },
      {
        nameTh: "ไข่มุกบราวน์ชูการ์",
        nameEn: "Brown Sugar Tapioca Pearls",
        price: 10,
      },
    ],
  },
  {
    id: "popping",
    titleTh: "ไข่มุกป๊อป",
    titleEn: "Popping Boba",
    emoji: "🟣",
    items: [
      {
        nameTh: "ไข่มุกป๊อปรสสตรอว์เบอร์รี",
        nameEn: "Strawberry Popping Boba",
        price: 10,
      },
      {
        nameTh: "ไข่มุกป๊อปรสลิ้นจี่",
        nameEn: "Lychee Popping Boba",
        price: 10,
      },
      { nameTh: "ไข่มุกป๊อปรสมะม่วง", nameEn: "Mango Popping Boba", price: 10 },
      {
        nameTh: "ไข่มุกป๊อปรสเสาวรส",
        nameEn: "Passion Fruit Popping Boba",
        price: 10,
      },
    ],
  },
  {
    id: "konjac",
    titleTh: "บุกและคริสตัล",
    titleEn: "Konjac & Crystal Jelly",
    emoji: "🟢",
    items: [
      { nameTh: "บุกใส / บุกเพชร", nameEn: "Crystal Konjac Jelly", price: 5 },
      {
        nameTh: "บุกบราวน์ชูการ์",
        nameEn: "Brown Sugar Konjac Jelly",
        price: 5,
      },
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
      { nameTh: "เยลลี่องุ่น", nameEn: "Grape Jelly", price: 5 },
      { nameTh: "เยลลี่สตรอว์เบอร์รี", nameEn: "Strawberry Jelly", price: 5 },
      {
        nameTh: "ฟรุตสลัด กลิ่นแอปเปิล",
        nameEn: "Apple Fruit Cocktail Jelly",
        price: 5,
      },
      {
        nameTh: "ฟรุตสลัด กลิ่นบลูฮาวาย",
        nameEn: "Blue Hawaii Fruit Cocktail Jelly",
        price: 5,
      },
      {
        nameTh: "ฟรุตสลัด กลิ่นสตรอว์เบอร์รี",
        nameEn: "Strawberry Fruit Cocktail Jelly",
        price: 5,
      },
      { nameTh: "เยลลี่น้องทะเล", nameEn: "Ocean Animal Jelly", price: 5 },
    ],
  },
  {
    id: "premium",
    titleTh: "ท็อปปิ้งพรีเมียม",
    titleEn: "Premium Toppings",
    emoji: "🍨",
    items: [
      { nameTh: "พุดดิ้ง", nameEn: "Pudding", price: 10 },
      { nameTh: "เต้าฮวยนมสด", nameEn: "Fresh Milk Tofu Pudding", price: 10 },
      { nameTh: "ครีมชีส", nameEn: "Cream Cheese", price: 10 },
      { nameTh: "วิปครีม", nameEn: "Whipped Cream", price: 10 },
      { nameTh: "ไอศกรีม", nameEn: "Ice Cream", price: 10 },
      { nameTh: "นมเหนียว", nameEn: "Sticky Milk", price: 10 },
      { nameTh: "ชีสขูด", nameEn: "Shredded Cheese", price: 10 },
    ],
  },
  {
    id: "fresh-fruit",
    titleTh: "ท็อปปิ้งผลไม้สด",
    titleEn: "Fresh Fruit Toppings",
    emoji: "🍌",
    note: "🍓 ผลไม้สดมีให้เลือกแตกต่างกันในแต่ละวัน ขึ้นอยู่กับความสดและวัตถุดิบที่มีในวันนั้น กรุณาสอบถามก่อนสั่ง",
    noteEn:
      "Fresh fruit availability varies by day, depending on freshness and daily ingredients. Please check before ordering.",
    items: [
      { nameTh: "กล้วยหั่นบาง", nameEn: "Sliced Banana", price: 10 },
      {
        nameTh: "สตรอว์เบอร์รีหั่นบาง",
        nameEn: "Sliced Strawberry",
        price: 10,
      },
      { nameTh: "สตรอว์เบอร์รีลูก", nameEn: "Whole Strawberry", price: 10 },
      { nameTh: "อะโวคาโดหั่นบาง", nameEn: "Sliced Avocado", price: 10 },
      { nameTh: "เนื้อมะพร้าว", nameEn: "Fresh Coconut Meat", price: 10 },
      { nameTh: "เนื้อสับปะรด", nameEn: "Fresh Pineapple", price: 10 },
      { nameTh: "องุ่นไชน์มัสแคท", nameEn: "Shine Muscat Grapes", price: 10 },
      { nameTh: "องุ่นไร้เม็ด", nameEn: "Seedless Grapes", price: 10 },
      { nameTh: "ส้มหั่นบาง", nameEn: "Sliced Orange", price: 10 },
      { nameTh: "เลมอนหั่นบาง", nameEn: "Sliced Lemon", price: 10 },
      { nameTh: "กีวีหั่นบาง", nameEn: "Sliced Kiwi", price: 10 },
      { nameTh: "แอปเปิลหั่นบาง", nameEn: "Sliced Apple", price: 10 },
      { nameTh: "แตงโมหั่นบาง", nameEn: "Sliced Watermelon", price: 10 },
      { nameTh: "บลูเบอร์รี", nameEn: "Blueberries", price: 10 },
      { nameTh: "มัลเบอร์รี", nameEn: "Mulberries", price: 10 },
      { nameTh: "แก้วมังกรหั่นบาง", nameEn: "Sliced Dragon Fruit", price: 10 },
      {
        nameTh: "แก้วมังกรสีแดงหั่นบาง",
        nameEn: "Sliced Red Dragon Fruit",
        price: 10,
      },
      { nameTh: "ทับทิม", nameEn: "Pomegranate Arils", price: 10 },
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
      { nameTh: "อัลมอนด์สไลด์", nameEn: "Sliced Almonds", price: 10 },
      { nameTh: "เวเฟอร์", nameEn: "Wafer", price: 5 },
    ],
  },
  {
    id: "sauce-shot",
    titleTh: "ซอส ไซรัป & ช็อต",
    titleEn: "Sauces, Syrups & Shots",
    emoji: "🍯",
    items: [
      { nameTh: "น้ำผึ้ง ช็อต", nameEn: "Honey Shot", price: 5 },
      { nameTh: "คาราเมล ไซรัป", nameEn: "Caramel Syrup", price: 5 },
      { nameTh: "น้ำตาลโตนด ซอส", nameEn: "Palm Sugar Sauce", price: 5 },
      { nameTh: "มัทฉะ ช็อต", nameEn: "Matcha Shot", price: 10 },
      { nameTh: "ชาไทย ช็อต", nameEn: "Thai Tea Shot", price: 10 },
      { nameTh: "ชาเขียว ช็อต", nameEn: "Green Tea Shot", price: 10 },
      { nameTh: "ซอสส้ม", nameEn: "Orange Sauce", price: 5 },
      { nameTh: "เอสเพรสโซ ช็อต", nameEn: "Espresso Shot", price: 10 },
      { nameTh: "ช็อกโกแลต ซอส", nameEn: "Chocolate Sauce", price: 5 },
      { nameTh: "สตรอว์เบอร์รี ซอส", nameEn: "Strawberry Sauce", price: 5 },
    ],
  },
];

/** รูปท็อปปิ้ง — key = nameEn (ไฟล์อยู่ใน /public/toppings) */
export const TOPPING_IMAGES: Record<string, string> = {
  // ซอส ไซรัป & ช็อต — วางรูปใน /public/toppings แล้วเอา // ออก (แนะนำ 400×400)
  // "Honey Shot": "/toppings/honey-shot.jpg",
  // "Caramel Syrup": "/toppings/caramel-syrup.jpg",
  // "Palm Sugar Sauce": "/toppings/palm-sugar-sauce.jpg",
  // "Matcha Shot": "/toppings/matcha-shot.jpg",
  // "Thai Tea Shot": "/toppings/thai-tea-shot.jpg",
  // "Green Tea Shot": "/toppings/green-tea-shot.jpg",
  // "Orange Sauce": "/toppings/orange-sauce.jpg",
  // "Espresso Shot": "/toppings/espresso-shot.jpg",
  // "Chocolate Sauce": "/toppings/chocolate-sauce.jpg",
  // "Strawberry Sauce": "/toppings/strawberry-sauce.jpg",
  // "Sticky Milk": "/toppings/sticky-milk.jpg",
  // "Shredded Cheese": "/toppings/shredded-cheese.jpg",
  // "Wafer": "/toppings/wafer.jpg",
  // ไข่มุก
  "Classic Black Tapioca Pearls": "/toppings/black-tapioca.jpg",
  "Golden Tapioca Pearls": "/toppings/golden-tapioca.png",
  "Emerald Tapioca Pearls": "/toppings/emerald-tapioca.jpg",
  "Brown Sugar Tapioca Pearls": "/toppings/brown-sugar-tapioca.jpg",
  "Strawberry Popping Boba": "/toppings/strawberry-boba.jpg",
  "Lychee Popping Boba": "/toppings/lychee-boba.jpg",
  "Mango Popping Boba": "/toppings/mango-boba.jpg",
  "Passion Fruit Popping Boba": "/toppings/passionfruit-boba.jpg",
  // บุก
  "Crystal Konjac Jelly": "/toppings/crystal-konjac.jpg",
  "Brown Sugar Konjac Jelly": "/toppings/brown-sugar-konjac.jpg",
  // เยลลี่และวุ้น
  "Coconut Jelly": "/toppings/coconut-jelly.jpg",
  "Caramel Jelly": "/toppings/caramel-jelly.jpg",
  "Grass Jelly": "/toppings/grass-jelly.jpg",
  "Grape Jelly": "/toppings/grape-jelly.jpg",
  "Strawberry Jelly": "/toppings/strawberry-jelly.jpg",
  "Apple Fruit Cocktail Jelly": "/toppings/apple-cocktail-jelly.jpg",
  "Blue Hawaii Fruit Cocktail Jelly": "/toppings/bluehawaii-cocktail-jelly.jpg",
  "Strawberry Fruit Cocktail Jelly": "/toppings/fruit-cocktail-jelly.jpg",
  "Ocean Animal Jelly": "/toppings/ocean-jelly.jpg",
  // พรีเมียม
  Pudding: "/toppings/pudding.jpg",
  "Fresh Milk Tofu Pudding": "/toppings/tofu-pudding.jpg",
  "Cream Cheese": "/toppings/cream-cheese.jpg",
  "Whipped Cream": "/toppings/whipped-cream.jpg",
  "Ice Cream": "/toppings/ice-cream.jpg",
  // ผลไม้สด
  "Sliced Banana": "/toppings/banana.jpg",
  "Sliced Strawberry": "/toppings/strawberry-sliced.jpg",
  "Whole Strawberry": "/toppings/strawberry-whole.jpg",
  "Sliced Avocado": "/toppings/avocado.jpg",
  "Fresh Coconut Meat": "/toppings/coconut-meat.jpg",
  "Fresh Pineapple": "/toppings/pineapple.jpg",
  "Shine Muscat Grapes": "/toppings/shine-muscat.jpg",
  "Seedless Grapes": "/toppings/seedless-grape.jpg",
  "Sliced Orange": "/toppings/orange.jpg",
  "Sliced Lemon": "/toppings/lemon.jpg",
  "Sliced Kiwi": "/toppings/kiwi.jpg",
  "Sliced Apple": "/toppings/apple.jpg",
  "Sliced Watermelon": "/toppings/watermelon.jpg",
  Blueberries: "/toppings/blueberry.jpg",
  Mulberries: "/toppings/mulberry.jpg",
  "Sliced Dragon Fruit": "/toppings/dragonfruit.jpg",
  "Sliced Red Dragon Fruit": "/toppings/dragonfruit-red.jpg",
  "Pomegranate Arils": "/toppings/pomegranate.jpg",
  // ซีเรียล & ถั่ว
  "Cocoa Crunch": "/toppings/cocoa-crunch.png",
  "Honey Stars Cereal": "/toppings/honey-stars.png",
  "Sliced Almonds": "/toppings/sliced-almonds.png",
};

/* ---------- 💰 โครงสร้างราคาเมนู | Menu Pricing ---------- */
export type PriceTier = {
  emoji: string;
  labelTh: string;
  labelEn: string;
  price: string;
  note?: string;
};

export const PRICE_TIERS: PriceTier[] = [
  {
    emoji: "🥤",
    labelTh: "เมนูธรรมดา",
    labelEn: "Regular Drinks",
    price: "เริ่มต้น 30฿",
  },
  { emoji: "🥛", labelTh: "เมนูนม", labelEn: "Milk Drinks", price: "35–40฿" },
  {
    emoji: "🍓",
    labelTh: "สมูทตี้",
    labelEn: "Smoothies",
    price: "45 / 50 / 60฿",
    note: "ตามชนิดและต้นทุนวัตถุดิบ",
  },
  {
    emoji: "🥑",
    labelTh: "อะโวคาโดปั่น",
    labelEn: "Avocado Smoothie",
    price: "50฿",
  },
  {
    emoji: "🌿",
    labelTh: "น้ำสมุนไพรโฮมเมด",
    labelEn: "Homemade Herbal Drinks",
    price: "25฿",
  },
  {
    emoji: "🧊",
    labelTh: "น้ำสมุนไพรปั่น",
    labelEn: "Blended Herbal Drinks",
    price: "30฿",
  },
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
  /** รูปสินค้า เช่น "/homemade/xxx.webp" — ถ้าไม่ใส่จะโชว์อีโมจิ placeholder */
  image?: string;
};

/* 🧋 น้ำโฮมเมดใส่แก้ว — 20 บาท/แก้ว (ยกเว้นที่ระบุ) */
export const HOMEMADE_BOTTLED: HomemadeDrink[] = [
  { emoji: "🌼", nameTh: "น้ำเก๊กฮวย", nameEn: "Chrysanthemum Tea", price: 25 },
  {
    emoji: "🌺",
    nameTh: "น้ำกระเจี๊ยบ",
    nameEn: "Roselle Juice",
    price: 25,
    soldOut: true,
  },
  {
    emoji: "🦋",
    nameTh: "น้ำอัญชันมะนาว",
    nameEn: "Butterfly Pea Lemonade",
    price: 25,
  },
  { emoji: "🌿", nameTh: "น้ำใบเตย", nameEn: "Pandan Drink", price: 25 },
  {
    emoji: "❤️",
    nameTh: "น้ำมะม่วงหาวมะนาวโห่",
    nameEn: "Karonda Juice",
    price: 25,
  },
  {
    emoji: "🥭",
    nameTh: "น้ำเสาวรส",
    nameEn: "Passion Fruit Juice",
    price: 25,
  },
  {
    emoji: "🍋",
    nameTh: "มะนาวน้ำผึ้ง",
    nameEn: "Honey Lemon Drink",
    price: 25,
  },
  { emoji: "🖤", nameTh: "น้ำเฉาก๊วย", nameEn: "Grass Jelly Drink", price: 25 },
  { emoji: "🌰", nameTh: "น้ำลำไย", nameEn: "Longan Drink", price: 25 },
  {
    emoji: "🥤",
    nameTh: "น้ำลำไยพร้อมเนื้อ",
    nameEn: "Longan Drink with Pulp",
    price: 30,
  },
  { emoji: "🌳", nameTh: "น้ำมะตูม", nameEn: "Bael Fruit Drink", price: 25 },
  { emoji: "🫚", nameTh: "น้ำขิง", nameEn: "Ginger Drink", price: 25 },
  { emoji: "🌿", nameTh: "น้ำใบบัวบก", nameEn: "Centella Juice", price: 25 },
];

/* 🥤 เมนูปั่น — เริ่มต้น 30 บาท (บางรสทำแบบปั่นได้) */
export const HOMEMADE_BLENDED: HomemadeDrink[] = [
  {
    emoji: "🥭",
    nameTh: "น้ำเสาวรสปั่น",
    nameEn: "Blended Passion Fruit",
    price: 30,
  },
  {
    emoji: "❤️",
    nameTh: "น้ำมะม่วงหาวมะนาวโห่ปั่น",
    nameEn: "Blended Karonda",
    price: 30,
  },
  {
    emoji: "🍋",
    nameTh: "น้ำมะนาวน้ำผึ้งปั่น",
    nameEn: "Blended Honey Lemon",
    price: 30,
  },
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
/* ---------- 🫧 อิตาเลียนโซดา 3 รูปแบบ | Italian Soda Modes ---------- */
export type SodaModeId = "regular" | "diy" | "mystery";
export type SodaMode = {
  id: SodaModeId;
  nameTh: string;
  nameEn: string;
  emoji: string;
  desc: string;
  /** ราคาเพิ่มจากเมนูโซดาปกติ (แบบปกติ = 0 · ไม่แตะราคาเมนูเดิม) */
  extra: number;
  badge?: string;
};

export const SODA_MODES: SodaMode[] = [
  {
    id: "regular",
    nameTh: "อิตาเลียนโซดาปกติ",
    nameEn: "Classic Italian Soda",
    emoji: "🥤",
    desc: "ร้านผสมไซรัปให้เรียบร้อย พร้อมดื่มทันที",
    extra: 0,
  },
  {
    id: "diy",
    nameTh: "ซ่าผสมเอง",
    nameEn: "DIY Italian Soda",
    emoji: "🧪",
    desc: "โซดา + น้ำแข็งในแก้ว · ไซรัปที่เลือกแยกใส่หลอดสลิง กด/หยดเองตามใจ",
    extra: 10,
    badge: "ผสมเอง",
  },
  {
    id: "mystery",
    nameTh: "ซ่ามิกซ์กับฟ่าง",
    nameEn: "Fang's Mystery Italian Soda",
    emoji: "🫧",
    desc: "ฟ่างสุ่มหลอดสลิงให้ 1 ใน 5 สูตร (ผสม 2–5 รส) · ไม่บอกรสจนกว่าจะได้ของ",
    extra: 15,
    badge: "สุ่ม 🎲",
  },
];

/** ไซรัปที่ร้านมี — ใช้กับ "ซ่าผสมเอง" (เลือกได้สูงสุด SODA_DIY_MAX) */
export type SodaSyrup = {
  id: string;
  label: string;
  labelEn: string;
  emoji: string;
  color: string;
};
export const SODA_SYRUPS: SodaSyrup[] = [
  {
    id: "strawberry",
    label: "สตรอว์เบอร์รี",
    labelEn: "Strawberry",
    emoji: "🍓",
    color: "#f0507f",
  },
  {
    id: "grape",
    label: "องุ่น",
    labelEn: "Grape",
    emoji: "🍇",
    color: "#7c3fc4",
  },
  {
    id: "mango",
    label: "มะม่วง",
    labelEn: "Mango",
    emoji: "🥭",
    color: "#f5b32d",
  },
  {
    id: "peach",
    label: "พีช",
    labelEn: "Peach",
    emoji: "🍑",
    color: "#ff9c7a",
  },
  { id: "kiwi", label: "กีวี", labelEn: "Kiwi", emoji: "🥝", color: "#7cc244" },
  {
    id: "blueberry",
    label: "บลูเบอร์รี",
    labelEn: "Blueberry",
    emoji: "🫐",
    color: "#4a5fd0",
  },
  {
    id: "pineapple",
    label: "สับปะรด",
    labelEn: "Pineapple",
    emoji: "🍍",
    color: "#f2d130",
  },
  {
    id: "passionfruit",
    label: "เสาวรส",
    labelEn: "Passion Fruit",
    emoji: "🍈",
    color: "#e89b2c",
  },
  {
    id: "lychee",
    label: "ลิ้นจี่",
    labelEn: "Lychee",
    emoji: "🌸",
    color: "#f3a6c8",
  },
  {
    id: "apple",
    label: "แอปเปิล",
    labelEn: "Apple",
    emoji: "🍏",
    color: "#8fd35a",
  },
  {
    id: "lime",
    label: "มะนาว",
    labelEn: "Lime",
    emoji: "🍋",
    color: "#c9e34a",
  },
  {
    id: "honey-lemon",
    label: "น้ำผึ้งมะนาว",
    labelEn: "Honey Lemon",
    emoji: "🍯",
    color: "#f4c542",
  },
  {
    id: "red",
    label: "แดง (สละ)",
    labelEn: "Red (Sala)",
    emoji: "❤️",
    color: "#e8333f",
  },
  {
    id: "green",
    label: "เขียว (ครีมโซดา)",
    labelEn: "Green (Cream Soda)",
    emoji: "💚",
    color: "#3ecf8e",
  },
];
export const SODA_DIY_MAX = 3;

/** ซ่ามิกซ์กับฟ่าง — ข้อความ (ไม่เปิดเผยสูตร) */
export const SODA_MYSTERY = {
  tubes: 5,
  secret: 1,
  taglines: [
    "5 สูตร 5 ความลับ สุ่มให้ 1 หลอด 💜",
    "ไม่บอกรสชาติ ให้ฟ่างเป็นคนสุ่มให้!",
    "และใน 5 หลอด...มี 1 หลอดเป็น SECRET 👀✨",
  ],
  chips: ["🎲 สุ่ม 1 ใน 5 สูตร", "🤫 มี 1 สูตร SECRET!", "🧪 ไซรัปผสม 2–5 รส"],
  question: "วันนี้ฟ่างจะสุ่มรสอะไรให้คุณนะ?",
};

/* ---------- 🥛 นมเหนียว | Sticky Milk — เลือกน้ำ → เลือกรสนมเหนียว → เลือกเพิ่มแครกเกอร์ ---------- */
export type StickyBase = {
  id: string;
  nameTh: string;
  nameEn: string;
  price: number;
  emoji: string;
  palette: SmoothiePalette;
};

/** น้ำพื้นฐานสำหรับแพ็กเกจ "น้ำ + นมเหนียว" (ราคารวมในแพ็กเกจแล้ว) */
export const STICKY_BASES: StickyBase[] = [
  {
    id: "thaitea",
    nameTh: "ชาไทย",
    nameEn: "Thai Tea",
    price: 0,
    emoji: "🧋",
    palette: { foam: "#fff0df", top: "#f0a962", bottom: "#cf6f26" },
  },
  {
    id: "cocoa",
    nameTh: "โกโก้",
    nameEn: "Cocoa",
    price: 0,
    emoji: "🍫",
    palette: { foam: "#f4e9e2", top: "#a8735a", bottom: "#5c3a2a" },
  },
  {
    id: "greentea",
    nameTh: "ชาเขียว",
    nameEn: "Green Tea",
    price: 0,
    emoji: "🍵",
    palette: { foam: "#f1f7e8", top: "#a8ce7a", bottom: "#5f9a3f" },
  },
  {
    id: "pinkmilk",
    nameTh: "นมชมพู",
    nameEn: "Pink Milk",
    price: 0,
    emoji: "🌸",
    palette: { foam: "#fff5f9", top: "#ffc2d8", bottom: "#f38bb1" },
  },
  {
    id: "milo",
    nameTh: "ไมโล",
    nameEn: "Milo",
    price: 0,
    emoji: "🥛",
    palette: { foam: "#f5ece4", top: "#b8865e", bottom: "#6b4a30" },
  },
  {
    id: "ovaltine",
    nameTh: "โอวัลติน",
    nameEn: "Ovaltine",
    price: 0,
    emoji: "🥛",
    palette: { foam: "#f5ede3", top: "#c4a37a", bottom: "#7d5a3a" },
  },
  {
    id: "milk",
    nameTh: "นมสด",
    nameEn: "Fresh Milk",
    price: 0,
    emoji: "🥛",
    palette: { foam: "#fffaf0", top: "#fff4e4", bottom: "#f3d9b4" },
  },
];

export type StickyFlavor = {
  id: string;
  nameTh: string;
  nameEn: string;
  price: number;
  emoji: string;
  /** สีชั้นนมเหนียว (ใช้วาดชั้นบนของแก้ว) */
  color: string;
  /** รูปจริง เช่น "/sticky/thaitea.png" (ถ้าไม่ใส่ใช้อีโมจิ) */
  image?: string;
};

/** รสนมเหนียว (ราคารวมในแพ็กเกจแล้ว) */
export const STICKY_FLAVORS: StickyFlavor[] = [
  {
    id: "milk",
    nameTh: "นมเหนียวนมสด",
    nameEn: "Fresh Milk Sticky Cream",
    price: 0,
    emoji: "🥛",
    color: "#f7e7c8",
  },
  {
    id: "thaitea",
    nameTh: "นมเหนียวชาไทย",
    nameEn: "Thai Tea Sticky Cream",
    price: 0,
    emoji: "🧋",
    color: "#e8a35c",
  },
  {
    id: "pinkmilk",
    nameTh: "นมเหนียวนมชมพู",
    nameEn: "Pink Milk Sticky Cream",
    price: 0,
    emoji: "🌸",
    color: "#f7b8cf",
  },
  {
    id: "greentea",
    nameTh: "นมเหนียวชาเขียว",
    nameEn: "Green Tea Sticky Cream",
    price: 0,
    emoji: "🍵",
    color: "#9cc47a",
  },
  {
    id: "cocoa",
    nameTh: "นมเหนียวโกโก้",
    nameEn: "Cocoa Sticky Cream",
    price: 0,
    emoji: "🍫",
    color: "#8a5a3c",
  },
  {
    id: "taro",
    nameTh: "นมเหนียวเผือกหอม",
    nameEn: "Taro Sticky Cream",
    price: 0,
    emoji: "🍠",
    color: "#b795d8",
  },
];

/** 📦 แพ็กเกจนมเหนียว 4 แบบ — เลือกได้ตามใจ ไม่บังคับสั่งน้ำ (ราคาเหมา) */
export type StickyPackageId =
  "milkOnly" | "crackerOnly" | "drinkMilk" | "milkCracker";
export type StickyPackage = {
  id: StickyPackageId;
  nameTh: string;
  nameEn: string;
  emoji: string;
  price: number;
  unit: string;
  desc: string;
  needFlavor: boolean;
  needDrink: boolean;
};
export const STICKY_PACKAGES: StickyPackage[] = [
  {
    id: "milkOnly",
    nameTh: "นมเหนียวอย่างเดียว",
    nameEn: "Sticky Milk",
    emoji: "🥛",
    price: 20,
    unit: "แก้ว",
    desc: "นมเหนียวเนื้อข้น หนึบหนับ หอมหวาน กินเพลิน",
    needFlavor: true,
    needDrink: false,
  },
  {
    id: "crackerOnly",
    nameTh: "แครกเกอร์",
    nameEn: "Crackers",
    emoji: "🍪",
    price: 20,
    unit: "แก้ว",
    desc: "แครกเกอร์กรอบ ๆ กินเล่นเพลิน หรือเอาไว้กินคู่กับนมเหนียว",
    needFlavor: false,
    needDrink: false,
  },
  {
    id: "drinkMilk",
    nameTh: "น้ำ + นมเหนียว",
    nameEn: "Drink + Sticky Milk",
    emoji: "🥤🥛",
    price: 30,
    unit: "แก้ว",
    desc: "เลือกเครื่องดื่มที่ชอบ แล้วเพิ่มนมเหนียวราดด้านบน",
    needFlavor: true,
    needDrink: true,
  },
  {
    id: "milkCracker",
    nameTh: "นมเหนียว + แครกเกอร์",
    nameEn: "Sticky Milk + Crackers",
    emoji: "🍪🥛",
    price: 30,
    unit: "ชุด",
    desc: "นมเหนียวเนื้อข้นคู่กับแครกเกอร์กรอบ ๆ จะกินคู่กัน หรือแยกไว้ผสมเองก็ได้ 💜",
    needFlavor: true,
    needDrink: false,
  },
];

/** วิธีรับสำหรับชุด "นมเหนียว + แครกเกอร์" */
export const STICKY_SERVE = [
  { id: "together", label: "🍪 กินคู่กัน", desc: "จัดมาพร้อมกิน" },
  {
    id: "separate",
    label: "📦 แยกไว้ผสมเอง",
    desc: "นมเหนียวใส่กระปุก + แครกเกอร์ใส่แก้วมีฝา ไม่ผสม",
  },
] as const;

export const STICKY_SEPARATE_NOTE = {
  title: "🍪 นมเหนียวแบบแยก — เอาไปมิกซ์เองที่บ้านได้เลย!",
  th: "สำหรับคนที่อยากสนุกกับการจัดเมนูเอง เราจะแยก นมเหนียวใส่กระปุกเล็ก และ แครกเกอร์ใส่ภาชนะมีฝาปิด ไม่ผสมรวมกัน เพื่อให้ลูกค้านำกลับไปเท ราด หรือกินคู่กันเองได้ตามใจ 💜✨",
  points: [
    "🫙 นมเหนียว → กระปุกเล็กปิดฝาสนิท (เลือกได้หลายรส)",
    "🍪 แครกเกอร์ → แก้วใสมีฝาปิด ยังกรอบ สะอาด น่ากิน",
    "🚫 แยกบรรจุ ไม่ผสมกัน",
  ],
};

/** ตัวอย่างการจับคู่ (Inspiration) · base = null คือไม่ใส่น้ำ */
export const STICKY_EXAMPLES: {
  base: string | null;
  flavor: string;
  cracker?: boolean;
  desc: string;
  /** รูปจริง (ถ้ามี) แทนแก้ว SVG */
  image?: string;
}[] = [
  {
    base: "thaitea",
    flavor: "milk",
    desc: "ชาไทยหอม ๆ ราดนมเหนียวนมสดนุ่มละมุน",
  },
  {
    base: "cocoa",
    flavor: "greentea",
    desc: "โกโก้เข้ม ตัดด้วยนมเหนียวชาเขียวหอม",
  },
  {
    base: null,
    flavor: "cocoa",
    cracker: true,
    desc: "ไม่ใส่น้ำ — แครกเกอร์กรอบ ๆ จิ้มนมเหนียวโกโก้เข้มข้น",
  },
  {
    base: null,
    flavor: "thaitea",
    cracker: true,
    desc: "ไม่ใส่น้ำ — แครกเกอร์กรอบคู่นมเหนียวชาไทยหอมหวาน",
  },
  { base: "milk", flavor: "thaitea", desc: "นมสดละมุน ราดนมเหนียวชาไทยเข้ม" },
  {
    base: "milk",
    flavor: "greentea",
    desc: "นมสดเย็น ๆ ราดนมเหนียวชาเขียวหอมละมุน",
    image: "/menu/sticky-milk-greentea.webp",
  },
];

export const STICKY_NOTE = {
  title: "💜 อยากกินแบบไหน เลือกได้เลย!",
  th: "นมเหนียวอย่างเดียว / แครกเกอร์อย่างเดียว / น้ำ + นมเหนียว / นมเหนียว + แครกเกอร์ — ไม่จำเป็นต้องสั่งเครื่องดื่มทุกแบบ ✨",
  en: "Sticky milk alone, crackers alone, drink + sticky milk, or sticky milk + crackers — no drink required.",
};

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
      {
        nameTh: "ไข่มุกดำ / คลาสสิก",
        nameEn: "Classic Black Tapioca Pearls",
        price: 5,
      },
      { nameTh: "ไข่มุกสีทอง", nameEn: "Golden Tapioca Pearls", price: 5 },
      { nameTh: "ไข่มุกสีมรกต", nameEn: "Emerald Tapioca Pearls", price: 5 },
      {
        nameTh: "ไข่มุกบราวน์ชูการ์",
        nameEn: "Brown Sugar Tapioca Pearls",
        price: 10,
      },
    ],
  },
  {
    id: "popping",
    emoji: "🟣",
    titleTh: "ไข่มุกป๊อป",
    titleEn: "Popping Boba",
    items: [
      {
        nameTh: "ป๊อปสตรอว์เบอร์รี",
        nameEn: "Strawberry Popping Boba",
        price: 10,
      },
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
      {
        nameTh: "บุกบราวน์ชูการ์",
        nameEn: "Brown Sugar Konjac Jelly",
        price: 5,
      },
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
      { nameTh: "เยลลี่องุ่น", nameEn: "Grape Jelly", price: 5 },
      { nameTh: "เยลลี่สตรอว์เบอร์รี", nameEn: "Strawberry Jelly", price: 5 },
      {
        nameTh: "ฟรุตสลัด กลิ่นแอปเปิล",
        nameEn: "Apple Fruit Cocktail Jelly",
        price: 5,
      },
      {
        nameTh: "ฟรุตสลัด กลิ่นบลูฮาวาย",
        nameEn: "Blue Hawaii Fruit Cocktail Jelly",
        price: 5,
      },
      {
        nameTh: "ฟรุตสลัด กลิ่นสตรอว์เบอร์รี",
        nameEn: "Strawberry Fruit Cocktail Jelly",
        price: 5,
      },
      { nameTh: "เยลลี่น้องทะเล", nameEn: "Ocean Animal Jelly", price: 5 },
    ],
  },
  {
    id: "premium",
    emoji: "🍨",
    titleTh: "ท็อปปิ้งพรีเมียม",
    titleEn: "Premium",
    items: [
      { nameTh: "พุดดิ้ง", nameEn: "Pudding", price: 10 },
      { nameTh: "เต้าฮวยนมสด", nameEn: "Fresh Milk Tofu Pudding", price: 10 },
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
  {
    id: "coke",
    nameTh: "โค้ก",
    nameEn: "Coca-Cola",
    price: 20,
    emoji: "🥤",
    desc: "รสโคล่าหอมเข้ม ซ่า สดชื่น มีความหวานกลมกล่อม",
    palette: { foam: "#e8ddd5", top: "#8a4a3a", bottom: "#3a1a14" },
  },
  {
    id: "coke-zero",
    nameTh: "โค้กไม่มีน้ำตาล",
    nameEn: "Coca-Cola Zero Sugar",
    price: 20,
    emoji: "🥤",
    desc: "รสโคล่าเข้ม หอมซ่า สดชื่น หวานน้อยโดยไม่มีน้ำตาล",
    palette: { foam: "#dcdcdc", top: "#3a3a3a", bottom: "#141414" },
  },
  {
    id: "fanta-orange",
    nameTh: "แฟนต้าส้ม",
    nameEn: "Fanta Orange",
    price: 20,
    emoji: "🥤",
    desc: "รสส้มหวานอมเปรี้ยว หอมกลิ่นส้ม ซ่าชื่นใจ",
    palette: { foam: "#fff1e0", top: "#ff9a3c", bottom: "#e2620f" },
  },
  {
    id: "fanta-strawberry",
    nameTh: "แฟนต้าแดง",
    nameEn: "Fanta Strawberry",
    price: 20,
    emoji: "🥤",
    desc: "หวานหอมกลิ่นสตรอว์เบอร์รี ซ่า สดชื่น ดื่มง่าย",
    palette: { foam: "#ffe9ee", top: "#ff6a86", bottom: "#d61e42" },
  },
  {
    id: "fanta-blue",
    nameTh: "แฟนต้าสีฟ้า",
    nameEn: "Fanta Blue",
    price: 20,
    emoji: "🥤",
    desc: "รสชาติเปรี้ยว ๆ หวาน ๆ หอมกลิ่นบลูเบอร์รี ผสมผสานกับกลิ่นดอกไม้จากดอกชบา",
    palette: { foam: "#e6f3ff", top: "#5ab0f0", bottom: "#1f6fc4" },
  },
  {
    id: "sprite",
    nameTh: "สไปรท์",
    nameEn: "Sprite",
    price: 20,
    emoji: "🥤",
    desc: "รสมะนาวเลมอน หอมสดชื่น เปรี้ยวหวาน ซ่าชื่นใจ",
    palette: { foam: "#eafdf0", top: "#7fd69a", bottom: "#2f9b57" },
  },
  {
    id: "est-cola",
    nameTh: "เอสโคล่า",
    nameEn: "est Cola",
    price: 20,
    emoji: "🥤",
    desc: "รสโคล่าหอมหวาน ซ่ากำลังดี ดื่มแล้วสดชื่น",
    palette: { foam: "#e5dbe8", top: "#6a3f7a", bottom: "#331a3d" },
  },
];

/* ---------- 🍪 ขนมกินเพลิน | Snacks & Bakery ---------- */
export type SnackItem = {
  id: string;
  nameTh: string;
  nameEn: string;
  desc: string;
  price: number;
  /** ราคาปกติ (ถ้ามี = แสดงขีดฆ่าเป็นราคาโปรฯ) */
  oldPrice?: number;
  emoji: string;
  badge?: string;
  image?: string; // /snacks/xxx.webp — ถ้าไม่ใส่จะโชว์ placeholder
};

export type SnackGroup = {
  id: string;
  titleTh: string;
  titleEn: string;
  emoji: string;
  note?: string;
  noteEn?: string;
  /** รายการผลไม้ที่เลือกได้ (หมุนเวียนรายวัน) — โชว์เป็นชิป */
  fruitList?: string[];
  items: SnackItem[];
};

export const SNACK_GROUPS: SnackGroup[] = [
  {
    id: "cornflakes",
    titleTh: "คอนเฟลคกรุบกรอบ",
    titleEn: "Crunchy Cornflakes",
    emoji: "🥣",
    note: "ขนาด 80 กรัม / ถุง",
    items: [
      {
        id: "cf-caramel",
        nameTh: "คอนเฟลคคาราเมลเนย",
        nameEn: "Caramel Butter Cornflakes",
        desc: "เคลือบคาราเมลหอมเนย + ลูกเกด + อัลมอนด์สไลด์",
        price: 39,
        emoji: "🍯",
        badge: "ขายดี",
      },
      {
        id: "cf-honey-caramel",
        nameTh: "คอนเฟลคคาราเมลน้ำผึ้ง",
        nameEn: "Honey Caramel Cornflakes",
        desc: "เคลือบคาราเมลหอมน้ำผึ้ง + ลูกเกด + อัลมอนด์สไลด์",
        price: 39,
        emoji: "🍯",
      },
      {
        id: "cf-dubai",
        nameTh: "คอนเฟลคช็อกโกแลตดูไบ",
        nameEn: "Dubai Chocolate Cornflakes",
        desc: "ช็อกโกแลตเข้มข้น + คูนาฟ่ากรอบ ๆ ดับเบิลครันช์",
        price: 59,
        emoji: "🍫",
        badge: "พิเศษ",
      },
      {
        id: "cf-salt",
        nameTh: "คอนเฟลครสเค็ม",
        nameEn: "Salted Cornflakes",
        desc: "รสเค็มหอมมัน กินเพลิน ฟีลป๊อปคอร์นรสเค็ม",
        price: 39,
        emoji: "🧂",
      },
      {
        id: "cf-tomyum",
        nameTh: "คอนเฟลครสต้มยำ",
        nameEn: "Tom Yum Cornflakes",
        desc: "หอมเครื่องต้มยำ เปรี้ยว เผ็ด เค็ม กินเล่นเพลิน",
        price: 39,
        emoji: "🌶️",
      },
      {
        id: "cf-mala",
        nameTh: "คอนเฟลครสหม่าล่า",
        nameEn: "Mala Cornflakes",
        desc: "หอมเครื่องเทศหม่าล่า เผ็ดชา เคี้ยวกรุบกรอบ",
        price: 39,
        emoji: "🌶️",
      },
      {
        id: "cf-greentea",
        nameTh: "คอนเฟลครสชาเขียว",
        nameEn: "Green Tea Cornflakes",
        desc: "หอมชาเขียว รสละมุน หวานพอดี",
        price: 39,
        emoji: "🍵",
      },
      {
        id: "cf-thaitea",
        nameTh: "คอนเฟลครสชาไทย",
        nameEn: "Thai Tea Cornflakes",
        desc: "หอมชาไทย รสหวานละมุน กรอบเคี้ยวเพลิน",
        price: 39,
        emoji: "🧋",
      },
      {
        id: "cf-cheese",
        nameTh: "คอนเฟลครสชีส",
        nameEn: "Cheese Cornflakes",
        desc: "หอมชีส รสเค็มมัน กรอบเพลิน",
        price: 39,
        emoji: "🧀",
      },
      {
        id: "cf-milkgrain",
        nameTh: "คอนเฟลครสครีมนมธัญพืช",
        nameEn: "Creamy Milk & Grain Cornflakes",
        desc: "หอมครีมนม รสหวานมัน ผสมธัญพืช เคี้ยวเพลิน",
        price: 39,
        emoji: "🥛",
      },
      {
        id: "cf-passion",
        nameTh: "คอนเฟลครสเสาวรส",
        nameEn: "Passion Fruit Cornflakes",
        desc: "เคลือบซอสเสาวรส หอมกลิ่นเสาวรส เปรี้ยวหวานสดชื่น",
        price: 39,
        emoji: "💛",
      },
    ],
  },
  {
    id: "fruit-cornflakes",
    titleTh: "คอนเฟลคผลไม้",
    titleEn: "Fruit Cornflakes",
    emoji: "🍓",
    note: "เพิ่มผลไม้อบแห้ง/แปรรูป · เพิ่มรสอื่นได้ในอนาคต",
    items: [
      {
        id: "cf-mango",
        nameTh: "คอนเฟลคมะม่วงอบแห้ง",
        nameEn: "Dried Mango Cornflakes",
        desc: "คอนเฟลคกรุบกรอบ + มะม่วงอบแห้งเคี้ยวหนึบ ๆ",
        price: 39,
        oldPrice: 49,
        emoji: "🥭",
        badge: "โปรฯ",
      },
      {
        id: "cf-banana",
        nameTh: "คอนเฟลคกล้วยตาก",
        nameEn: "Dried Banana Cornflakes",
        desc: "คอนเฟลคกรุบกรอบ + กล้วยตากหอมหวาน เนื้อนุ่มหนึบ",
        price: 39,
        oldPrice: 49,
        emoji: "🍌",
        badge: "โปรฯ",
      },
    ],
  },
  {
    id: "bakery",
    titleTh: "ขนม & เบเกอรี่",
    titleEn: "Snacks & Bakery",
    emoji: "🍪",
    items: [
      {
        id: "butter-corn",
        nameTh: "ข้าวโพดอบเนย",
        nameEn: "Buttered Corn",
        desc: "ข้าวโพดหวานอบเนยหอม ๆ กินเพลิน",
        price: 30,
        emoji: "🌽",
      },
      {
        id: "cookie",
        nameTh: "คุกกี้",
        nameEn: "Cookie",
        desc: "คุกกี้หอมเนย กรอบนอกนุ่มใน",
        price: 25,
        emoji: "🍪",
      },
      {
        id: "brownie",
        nameTh: "บราวนี่",
        nameEn: "Brownie",
        desc: "บราวนี่ช็อกโกแลตเข้มข้น เนื้อหนึบ",
        price: 35,
        emoji: "🍫",
      },
      {
        id: "cake",
        nameTh: "เค้ก/ขนมหวาน",
        nameEn: "Cake & Dessert",
        desc: "เค้กนุ่ม ๆ ขนมหวานประจำวัน",
        price: 45,
        emoji: "🍰",
      },
    ],
  },
];

/* ---------- 🥪 แซนด์วิช | Sandwiches ---------- */
export const SANDWICH_GROUPS: SnackGroup[] = [
  {
    id: "savory",
    titleTh: "แซนด์วิชไส้คาว",
    titleEn: "Savory Sandwiches",
    emoji: "🥪",
    items: [
      {
        id: "sw-ham-cheese",
        nameTh: "แซนด์วิชแฮมชีส",
        nameEn: "Ham & Cheese Sandwich",
        desc: "แฮม + ชีสละมุน ในขนมปังนุ่ม",
        price: 49,
        emoji: "🥪",
        badge: "ขายดี",
      },
      {
        id: "sw-crab",
        nameTh: "แซนด์วิชปูอัด",
        nameEn: "Crab Stick Sandwich",
        desc: "ปูอัดผสมสลัดครีม รสกลมกล่อม",
        price: 49,
        emoji: "🦀",
      },
      {
        id: "sw-sausage",
        nameTh: "แซนด์วิชไส้กรอก",
        nameEn: "Sausage Sandwich",
        desc: "ไส้กรอกหมูรมควัน หอมอร่อย",
        price: 49,
        emoji: "🌭",
      },
      {
        id: "sw-tuna",
        nameTh: "แซนด์วิชทูน่า",
        nameEn: "Tuna Sandwich",
        desc: "ทูน่าผสมมายองเนส เนื้อแน่น",
        price: 49,
        emoji: "🐟",
      },
      {
        id: "sw-thai",
        nameTh: "แซนด์วิชโบราณ",
        nameEn: "Thai-Style Sandwich",
        desc: "แซนด์วิชสไตล์ไทยโบราณ รสคุ้นเคย",
        price: 45,
        emoji: "🥪",
      },
    ],
  },
  {
    id: "fruit-cream",
    titleTh: "แซนด์วิชผลไม้ครีมสด",
    titleEn: "Fresh Fruit & Cream",
    emoji: "🍓",
    note: "🍓 ผลไม้สดมีให้เลือกแตกต่างกันในแต่ละวัน ขึ้นอยู่กับความสดและวัตถุดิบที่มีในวันนั้น",
    noteEn:
      "Fresh fruit availability varies by day, depending on freshness and daily ingredients.",
    fruitList: [
      "🍓 สตรอว์เบอร์รี",
      "🍇 องุ่นไชน์มัสแคท",
      "🥝 กีวี",
      "🍌 กล้วย",
      "🍊 ส้ม",
      "🫐 บลูเบอร์รี",
    ],
    items: [
      {
        id: "sw-fruit-cream",
        nameTh: "แซนด์วิชผลไม้ครีมสด",
        nameEn: "Fresh Fruit & Cream Sandwich",
        desc: "ครีมสดนุ่ม + ผลไม้สดหมุนเวียนตามวัน",
        price: 59,
        emoji: "🍓",
        badge: "แนะนำ",
      },
    ],
  },
  {
    id: "jam",
    titleTh: "แซนด์วิชแยม",
    titleEn: "Jam Sandwiches",
    emoji: "🍯",
    items: [
      {
        id: "sw-jam-strawberry",
        nameTh: "แซนด์วิชแยมสตรอว์เบอร์รี",
        nameEn: "Strawberry Jam",
        desc: "แยมสตรอว์เบอร์รีหวานอมเปรี้ยว",
        price: 35,
        emoji: "🍓",
      },
      {
        id: "sw-jam-orange",
        nameTh: "แซนด์วิชแยมส้ม",
        nameEn: "Orange Marmalade",
        desc: "แยมส้มหอม ๆ รสสดชื่น",
        price: 35,
        emoji: "🍊",
      },
      {
        id: "sw-jam-choco",
        nameTh: "แซนด์วิชแยมช็อกโกแลต",
        nameEn: "Chocolate Spread",
        desc: "ช็อกโกแลตสเปรดเข้มข้น",
        price: 35,
        emoji: "🍫",
      },
      {
        id: "sw-jam-banana",
        nameTh: "แซนด์วิชแยมกล้วย",
        nameEn: "Banana Spread",
        desc: "แยมกล้วยหอมหวาน",
        price: 35,
        emoji: "🍌",
      },
      {
        id: "sw-jam-pandan",
        nameTh: "แซนด์วิชใบเตยสังขยา",
        nameEn: "Pandan Custard",
        desc: "สังขยาใบเตยหอมละมุน",
        price: 35,
        emoji: "🌿",
      },
      {
        id: "sw-jam-thaitea",
        nameTh: "แซนด์วิชสังขยาชาไทย",
        nameEn: "Thai Tea Custard",
        desc: "สังขยาชาไทยหวานหอม",
        price: 35,
        emoji: "🧋",
      },
      {
        id: "sw-jam-blueberry",
        nameTh: "แซนด์วิชแยมบลูเบอร์รี",
        nameEn: "Blueberry Jam",
        desc: "แยมบลูเบอร์รีหวานอมเปรี้ยว",
        price: 35,
        emoji: "🫐",
      },
      {
        id: "sw-jam-butter",
        nameTh: "แซนด์วิชเนยนมน้ำตาล",
        nameEn: "Butter, Milk & Sugar",
        desc: "เนย + นมข้น + น้ำตาล คลาสสิก",
        price: 30,
        emoji: "🧈",
      },
      {
        id: "sw-jam-ovaltine",
        nameTh: "แซนด์วิชโอวัลติน",
        nameEn: "Ovaltine Spread",
        desc: "โอวัลตินสเปรดหอมมอลต์",
        price: 35,
        emoji: "🥛",
      },
      {
        id: "sw-jam-milo",
        nameTh: "แซนด์วิชไมโล",
        nameEn: "Milo Spread",
        desc: "ไมโลสเปรดเข้มข้น",
        price: 35,
        emoji: "🍫",
      },
    ],
  },
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
    highlight: "มัทฉะนมสด 55",
    detail: "จากปกติ 65 พิเศษเดือนนี้เท่านั้น!",
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
  /** รูปหัวโปร เช่น "/promotions/loykrathong.png" (แนะนำ 400×400) — ถ้าใส่จะแสดงแทนอีโมจิใหญ่ */
  image?: string;
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
    reward: "รับส่วนลดทันที 5 บาท! เมื่อแสดงโพสต์ให้ทางร้านตรวจสอบก่อนชำระเงิน",
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
    titleTh: "ลอยกระทง ลอยใจ",
    titleEn: "Loy Krathong",
    month: 11,
    day: 24,
    slogan: "คืนนี้อย่าลอยแค่กระทง ลอยความอร่อยไปด้วยกัน! 🪷💜",
    points: [
      "🥤 ซื้อเครื่องดื่ม 1 แก้ว รับท็อปปิ้งฟรี 1 อย่าง",
      "📸 ถ่ายรูป + แชร์ Tag ร้าน รับคูปองส่วนลด 5 บาทครั้งถัดไป",
    ],
    theme: "loykrathong",
    activityTitle: "ลอยกระทงนี้ แชะแล้วแชร์กับฟ่าง 📸",
    activityDesc: [
      "🪷 ลอยกระทง ลอยใจ กับปั่นกับฟ่าง — คืนนี้อย่าลอยแค่กระทง ลอยความอร่อยไปด้วยกัน!",
      "🥤 ซื้อเครื่องดื่ม 1 แก้ว → 🎁 รับท็อปปิ้งฟรีทันที 1 อย่าง",
      "📸 ถ่ายรูปแก้วโปรดของคุณ แล้วร่วมสนุกกับเรา — Sip • Snap • Share • Repeat ✨",
    ],
    reward:
      "ท็อปปิ้งฟรี 1 อย่างทุกแก้ว + 🎟️ คูปองส่วนลด 5 บาทครั้งถัดไป เมื่อถ่ายรูป & แชร์",
    steps: [
      "🥤 สั่งเครื่องดื่มที่ร่วมรายการ รับท็อปปิ้งฟรี 1 อย่างทันที",
      "📸 ถ่ายรูปคู่กับแก้วปั่นกับฟ่าง",
      "📤 โพสต์ลง Facebook หรือ Instagram แบบสาธารณะ พร้อม Tag PunKubFang",
      "🎟️ แสดงโพสต์ให้พนักงาน รับคูปองส่วนลด 5 บาทสำหรับครั้งถัดไป",
    ],
    conditions: [
      "ท็อปปิ้งฟรี 1 อย่าง / 1 แก้ว (เฉพาะเมนูที่ร่วมรายการ)",
      "โพสต์ต้องตั้งค่าเป็นสาธารณะ และ Tag ร้าน PunKubFang",
      "คูปองส่วนลด 5 บาท ใช้ได้ในการซื้อครั้งถัดไป · 1 สิทธิ์ต่อ 1 โพสต์",
      "ไม่สามารถเปลี่ยนเป็นเงินสด และใช้ร่วมกับโปรโมชั่นอื่นไม่ได้",
      "เฉพาะช่วงเทศกาลลอยกระทงเท่านั้น · เงื่อนไขอาจเปลี่ยนแปลงได้โดยไม่ต้องแจ้งล่วงหน้า",
    ],
    sampleCaption:
      "ลอยกระทงนี้ ขอลอยความอร่อยกับ @PunKubFang 🪷💜 #ปั่นกับฟ่าง #ลอยกระทง #แชะแล้วแชร์กับฟ่าง",
  },
  {
    id: "father",
    emoji: "👨‍👧‍👦",
    titleTh: "แก้วนี้ให้พ่อ",
    titleEn: "Father's Day",
    month: 12,
    day: 5,
    slogan: "แก้วนี้ให้พ่อ เพื่อคุณพ่อคนเก่ง 👨‍👧‍👦💜",
    points: [
      "🥤 ซื้อเครื่องดื่ม 2 แก้ว รับท็อปปิ้งฟรี 2 อย่าง",
      "📸 ถ่ายรูปคู่คุณพ่อ + แชร์ Tag ร้าน รับคูปองส่วนลด 5 บาทครั้งถัดไป",
    ],
    theme: "father",
    activityTitle: "แก้วนี้ให้พ่อ แชะคู่คุณพ่อกับฟ่าง 📸",
    activityDesc: [
      "👨‍👧‍👦 แก้วนี้ให้พ่อ — วันพ่อปีนี้ ชวนคุณพ่อมาปั่นความอร่อยด้วยกัน 💜",
      "🥤 ซื้อเครื่องดื่ม 2 แก้ว → 🎁 รับท็อปปิ้งฟรี 2 อย่าง (สำหรับแก้วของพ่อและแก้วของเรา)",
      "📸 ถ่ายรูปคู่กับคุณพ่อและแก้วโปรด แล้วร่วมสนุกกับเรา ✨",
    ],
    reward:
      "ท็อปปิ้งฟรี 2 อย่าง (เมื่อซื้อ 2 แก้ว) + 🎟️ คูปองส่วนลด 5 บาทครั้งถัดไป เมื่อถ่ายรูป & แชร์",
    steps: [
      "🥤 สั่งเครื่องดื่ม 2 แก้ว รับท็อปปิ้งฟรี 2 อย่างทันที",
      "📸 ถ่ายรูปคู่กับคุณพ่อและแก้วปั่นกับฟ่าง",
      "📤 โพสต์ลง Facebook หรือ Instagram แบบสาธารณะ พร้อม Tag PunKubFang",
      "🎟️ แสดงโพสต์ให้พนักงาน รับคูปองส่วนลด 5 บาทสำหรับครั้งถัดไป",
    ],
    conditions: [
      "ท็อปปิ้งฟรี 2 อย่าง เมื่อซื้อเครื่องดื่ม 2 แก้ว (เฉพาะเมนูที่ร่วมรายการ)",
      "โพสต์ต้องตั้งค่าเป็นสาธารณะ และ Tag ร้าน PunKubFang",
      "คูปองส่วนลด 5 บาท ใช้ได้ในการซื้อครั้งถัดไป · 1 สิทธิ์ต่อ 1 โพสต์",
      "ไม่สามารถเปลี่ยนเป็นเงินสด และใช้ร่วมกับโปรโมชั่นอื่นไม่ได้",
      "เฉพาะช่วงเทศกาลวันพ่อเท่านั้น · เงื่อนไขอาจเปลี่ยนแปลงได้โดยไม่ต้องแจ้งล่วงหน้า",
    ],
    sampleCaption:
      "วันพ่อปีนี้ พาพ่อมาปั่นความอร่อยกับ @PunKubFang 👨‍👧‍👦💜 #ปั่นกับฟ่าง #วันพ่อ #แก้วนี้ให้พ่อ",
  },
  {
    id: "christmas",
    emoji: "🎄",
    titleTh: "คริสต์มาส",
    titleEn: "Christmas",
    month: 12,
    day: 25,
    slogan: "Christmas Special 🎄",
    points: ["เมนูธีมสีแดง – เขียว – ขาว", "โปรโมชั่นซื้อคู่ราคาพิเศษ"],
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
    const diff = Math.round((target.getTime() - today.getTime()) / 86400000);
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
  { emoji: "🌿", title: "ไม่ใส่วัตถุกันเสีย", detail: "ปลอดภัย อร่อยแน่นอน" },
];

/* ═══════════════════════════════════════════════════════════
   🎰 สุ่มแก้วกับฟ่าง — ข้อมูล "ตู้กาชาปอง" (แยกจากเมนูหลัก ไม่กระทบ MENU_ITEMS)
   - GACHA_FROM_MENU: id ของเมนูหลักที่ยอมให้อยู่ในตู้ (ดึงชื่อ/ราคา/รูปจาก MENU_ITEMS จริง)
   - GACHA_MENUS: เมนูลับ/เมนูมั่ว/เมนูทดลองของฟ่าง ที่ "ไม่มี" ในเมนูหลัก
   - rarity ใช้แค่ป้ายบอกความพิเศษ · ยัง "ไม่กำหนดอัตราสุ่ม" → สุ่มทุกใบเท่ากัน
   - available: false = วันนี้ไม่มี → ตู้จะข้าม
   - ⚠️ ราคาเมนูลับตั้งไว้เป็นตัวอย่าง แก้ได้ที่นี่ที่เดียว
   ═══════════════════════════════════════════════════════════ */
export type GachaRarity = "common" | "special" | "lucky" | "secret";

export const GACHA_RARITY: Record<
  GachaRarity,
  { label: string; labelEn: string; emoji: string; color: string }
> = {
  common: { label: "ธรรมดา", labelEn: "Common", emoji: "🍀", color: "#8ee39a" },
  special: {
    label: "พิเศษ",
    labelEn: "Special",
    emoji: "✨",
    color: "#ffd76a",
  },
  lucky: {
    label: "Lucky Drink",
    labelEn: "Lucky",
    emoji: "💜",
    color: "#b48cff",
  },
  secret: {
    label: "SECRET MENU",
    labelEn: "Secret",
    emoji: "👀",
    color: "#ff8fb1",
  },
};

export type GachaMenu = {
  id: string;
  name: string;
  englishName: string;
  description: string;
  price: number;
  emoji: string;
  image?: string;
  category: CategoryId;
  palette: SmoothiePalette;
  rarity: GachaRarity;
  available?: boolean;
  /** เมนูลับ — ไม่มีในเมนูหลัก */
  isSecret?: boolean;
  /** เป็นเมนูปั่น/สมูทตี้ */
  isSmoothie?: boolean;
  /** เมนูทดลอง/มิกซ์พิเศษของฟ่าง */
  isSpecial?: boolean;
  /** ลูกค้าถามหาบ่อย (ใส่ตามจริงเท่านั้น) */
  askedOften?: boolean;
};

/* เมนูหลักที่อยู่ในตู้ (อ้างอิง MENU_ITEMS จริง) */
export const GACHA_FROM_MENU: string[] = [
  "latte-blend",
  "caramel-blend",
  "bear-pink",
  "bear-choco",
  "two-tone-milk",
  "thai-milk-tea",
  "matcha-milk",
  "peach-tea",
  "lime-soda",
  "passionfruit-soda",
  "grape-yogurt",
  "strawberry-milk",
  "watermelon-smoothie",
  "lychee-smoothie",
  "avocado-smoothie",
];

/* เมนูลับ / เมนูมั่ว / เมนูทดลองของฟ่าง (ไม่มีในเมนูหลัก) */
export const GACHA_MENUS: GachaMenu[] = [
  {
    id: "gacha-tamarind-soda",
    name: "มะขามเปรี้ยวซ่า",
    englishName: "Tamarind Fizz",
    description: "มะขามเปรี้ยวหวาน + โซดาซ่า ๆ แบบที่ไม่มีในเมนูหลัก 🌶️🫧",
    price: 45,
    emoji: "🌶️",
    category: "soda",
    palette: { foam: "#fde7c8", top: "#d98a3c", bottom: "#8a4b12" },
    rarity: "secret",
    isSecret: true,
    isSpecial: true,
  },
  {
    id: "gacha-lychee-rose-tea",
    name: "ชาลิ้นจี่กุหลาบ",
    englishName: "Lychee Rose Tea",
    description: "ชาดำหอม ๆ + ลิ้นจี่ + กลิ่นกุหลาบบาง ๆ เมนูทดลองของฟ่าง 🌹",
    price: 50,
    emoji: "🌹",
    category: "tea",
    palette: { foam: "#ffe3ec", top: "#f2a0bd", bottom: "#b23a62" },
    rarity: "special",
    isSecret: true,
    isSpecial: true,
  },
  {
    id: "gacha-pineapple-mint-soda",
    name: "สับปะรดมินต์โซดา",
    englishName: "Pineapple Mint Soda",
    description: "สับปะรดหวานฉ่ำ + ใบมินต์ + โซดา เย็นซ่าถึงใจ 🍍🌿",
    price: 45,
    emoji: "🍍",
    category: "soda",
    palette: { foam: "#fff7c2", top: "#ffe066", bottom: "#4fbf8a" },
    rarity: "special",
    isSecret: true,
    isSpecial: true,
  },
  {
    id: "gacha-choco-banana-blend",
    name: "กล้วยช็อกโกปั่นลับ",
    englishName: "Secret Choco Banana Blend",
    description:
      "กล้วยหอม + ช็อกโกแลตเข้ม + นมสด ปั่นเนียน ๆ ไม่ได้อยู่ในหมวดสมูทตี้ 🍌🍫",
    price: 55,
    emoji: "🍌",
    category: "smoothie",
    palette: { foam: "#f3e2c8", top: "#a9714b", bottom: "#5c3a2a" },
    rarity: "lucky",
    isSecret: true,
    isSmoothie: true,
  },
  {
    id: "gacha-mango-thaitea-blend",
    name: "มะม่วงชาไทยปั่น",
    englishName: "Mango Thai Tea Blend",
    description:
      "มะม่วงสุก + ชาไทยเข้ม ปั่นเป็นสองรสในแก้วเดียว มั่วแต่เข้ากัน 😂",
    price: 60,
    emoji: "🥭",
    category: "smoothie",
    palette: { foam: "#ffe9b8", top: "#ffb84d", bottom: "#c9662b" },
    rarity: "lucky",
    isSecret: true,
    isSmoothie: true,
    isSpecial: true,
  },
  {
    id: "gacha-butterfly-lemon-milk",
    name: "นมอัญชันเลมอน",
    englishName: "Butterfly Pea Lemon Milk",
    description: "นมสด + อัญชัน + เลมอน เปลี่ยนสีม่วง-ชมพูตอนคน 💜🍋",
    price: 45,
    emoji: "🦋",
    category: "milk",
    palette: { foam: "#ffffff", top: "#b9a6ff", bottom: "#6d4bd6" },
    rarity: "special",
    isSecret: true,
    isSpecial: true,
  },
  {
    id: "gacha-coconut-coffee",
    name: "กาแฟมะพร้าว",
    englishName: "Coconut Coffee",
    description: "เอสเพรสโซ + น้ำมะพร้าว + นมมะพร้าว หอมมันแบบไม่คาดคิด 🥥☕",
    price: 55,
    emoji: "🥥",
    category: "drinks",
    palette: { foam: "#f7efe6", top: "#b58a63", bottom: "#5b3a24" },
    rarity: "special",
    isSecret: true,
    isSpecial: true,
  },
  {
    id: "gacha-strawberry-matcha-blend",
    name: "สตรอว์เบอร์รีมัทฉะปั่น",
    englishName: "Strawberry Matcha Blend",
    description: "ชั้นสตรอว์เบอร์รีสด + มัทฉะปั่น สีสวยแปลกตา 🍓🍵",
    price: 65,
    emoji: "🍓",
    category: "smoothie",
    palette: { foam: "#ffe3ec", top: "#ff8fb1", bottom: "#4f9a5a" },
    rarity: "secret",
    isSecret: true,
    isSmoothie: true,
    isSpecial: true,
  },
];
