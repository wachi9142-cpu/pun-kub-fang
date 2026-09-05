/* ข้อมูลทั้งหมดของเว็บ ปั่นกับฟ่าง — แก้ที่ไฟล์นี้ที่เดียว */

export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "หน้าแรก", href: "#home" },
  { label: "เมนูทั้งหมด", href: "/menu" },
  { label: "มิกซ์กับฟ่าง ✨", href: "/mix" },
  { label: "โปรโมชั่น", href: "#promo" },
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
/* หมวดเครื่องดื่มที่แสดงเป็นการ์ด (DrinkCard) — แยกเป็นหน้าละหมวด */
export type CategoryId = "drinks" | "milk" | "smoothie" | "soda";

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
    label: "เครื่องดื่ม",
    emoji: "🥤",
    desc: "ชา กาแฟ และเครื่องดื่มทั่วไป",
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
    label: "เครื่องดื่ม",
    labelEn: "Drinks",
    emoji: "🥤",
    href: "/menu/drinks",
    desc: "ชา กาแฟ ทั่วไป",
    palette: { foam: "#efe2d6", top: "#a9764f", bottom: "#5b3a24" },
  },
  {
    id: "milk",
    label: "เมนูนม",
    labelEn: "Milk Drinks",
    emoji: "🥛",
    href: "/menu/milk",
    desc: "นมสด นมหมี ชานม",
    palette: { foam: "#fffaf0", top: "#ffe3c2", bottom: "#f3c17e" },
  },
  {
    id: "smoothie",
    label: "เมนูปั่น",
    labelEn: "Smoothies",
    emoji: "🍓",
    href: "/menu/smoothie",
    desc: "ผลไม้ปั่นสดใหม่",
    palette: { foam: "#fff2f6", top: "#ff9ec0", bottom: "#f0507f" },
  },
  {
    id: "soda",
    label: "โซดา",
    labelEn: "Soda",
    emoji: "🫧",
    href: "/menu/soda",
    desc: "อิตาเลียนโซดา ซ่า",
    palette: { foam: "#eaf7ff", top: "#8fd6ff", bottom: "#2b9be0" },
  },
  {
    id: "herbal",
    label: "น้ำสมุนไพรโฮมเมด",
    labelEn: "Homemade Herbal",
    emoji: "🌿",
    href: "/menu/herbal",
    desc: "โฮมเมด หมุนเวียนรายวัน",
    palette: { foam: "#eef7ea", top: "#9ec97e", bottom: "#4f8a3c" },
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
    category: "smoothie",
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
    category: "smoothie",
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
    category: "smoothie",
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
    category: "smoothie",
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

  /* ชา */
  {
    id: "thai-milk-tea",
    name: "ชานมไทยปั่น",
    tagline: "ชาไทยแท้ หวานมันกลมกล่อม",
    price: 55,
    likes: 96,
    emoji: "🍵",
    category: "milk",
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
    category: "milk",
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
    category: "drinks",
    palette: { foam: "#fdf7d8", top: "#f2d873", bottom: "#c9a52a" },
  },
  {
    id: "green-tea-milk",
    name: "ชาเขียวนมปั่น",
    tagline: "ชาเขียวหอม + นมสด",
    price: 55,
    likes: 70,
    emoji: "🍵",
    category: "milk",
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

  /* น้ำอัดลม */
  {
    id: "cola",
    name: "โคล่าปั่นหิมะ",
    tagline: "โคล่าซ่า ปั่นเย็นเป็นเกล็ด",
    price: 45,
    likes: 66,
    emoji: "🥤",
    category: "soda",
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
    category: "soda",
    palette: { foam: "#ffeef0", top: "#ff8a99", bottom: "#e23b52" },
  },
  {
    id: "lemon-sprite",
    name: "สไปรท์เลมอนปั่น",
    tagline: "ซ่าเลมอนเย็นสดชื่น",
    price: 45,
    likes: 54,
    emoji: "🍋",
    category: "soda",
    palette: { foam: "#eefcf1", top: "#b8ecc4", bottom: "#5bc47a" },
  },
  {
    id: "grape-soda",
    name: "องุ่นโซดาปั่น",
    tagline: "องุ่นม่วงหวาน + โซดาซ่า",
    price: 45,
    likes: 60,
    emoji: "🍇",
    category: "soda",
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

/* ---------- 🧋 ท็อปปิ้ง | Toppings ---------- */
export type ToppingItem = {
  nameTh: string;
  nameEn: string;
  /** ราคาเพิ่มต่อ 1 ท็อปปิ้ง (บาท) */
  price: number;
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
  { emoji: "🌿", labelTh: "น้ำสมุนไพรโฮมเมด", labelEn: "Homemade Herbal Drinks", price: "20฿" },
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
  { emoji: "🌼", nameTh: "น้ำเก๊กฮวย", nameEn: "Chrysanthemum Tea", price: 20 },
  { emoji: "🌺", nameTh: "น้ำกระเจี๊ยบ", nameEn: "Roselle Juice", price: 20, soldOut: true },
  { emoji: "🦋", nameTh: "น้ำอัญชันมะนาว", nameEn: "Butterfly Pea Lemonade", price: 20 },
  { emoji: "🌿", nameTh: "น้ำใบเตย", nameEn: "Pandan Drink", price: 20 },
  { emoji: "❤️", nameTh: "น้ำมะม่วงหาวมะนาวโห่", nameEn: "Karonda Juice", price: 20 },
  { emoji: "🥭", nameTh: "น้ำเสาวรส", nameEn: "Passion Fruit Juice", price: 20 },
  { emoji: "🍋", nameTh: "มะนาวน้ำผึ้ง", nameEn: "Honey Lemon Drink", price: 20 },
  { emoji: "🖤", nameTh: "น้ำเฉาก๊วย", nameEn: "Grass Jelly Drink", price: 20 },
  { emoji: "🍵", nameTh: "ชาดำเย็น", nameEn: "Iced Black Tea", price: 20 },
  { emoji: "🌰", nameTh: "น้ำลำไย", nameEn: "Longan Drink", price: 20 },
  { emoji: "🥤", nameTh: "น้ำลำไยพร้อมเนื้อ", nameEn: "Longan Drink with Pulp", price: 30 },
  { emoji: "🌳", nameTh: "น้ำมะตูม", nameEn: "Bael Fruit Drink", price: 20 },
  { emoji: "🫚", nameTh: "น้ำขิง", nameEn: "Ginger Drink", price: 20 },
  { emoji: "🌿", nameTh: "น้ำใบบัวบก", nameEn: "Centella Juice", price: 20 },
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
  { label: "น้ำโฮมเมดทั่วไป", price: "20 บาท" },
  { label: "น้ำลำไย + เนื้อลำไย", price: "30 บาท" },
  { label: "น้ำสมุนไพร/ผลไม้ปั่น", price: "เริ่ม 30 บาท" },
  { label: "เพิ่มท็อปปิ้ง", price: "+5 / +10 บาท" },
];

export const HOMEMADE_NOTE = {
  th: "น้ำโฮมเมดของทางร้านทำสดใหม่เป็นรอบ ๆ เมนูจึงหมุนเวียนแตกต่างกันในแต่ละวัน และอาจมีบางรายการที่ไม่มีจำหน่ายในวันนั้น",
  en: "Our homemade drinks are freshly prepared in small batches. Available flavors may vary from day to day and some items may not be available every day.",
};

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
