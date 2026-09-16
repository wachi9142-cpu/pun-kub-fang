/**
 * 🤖 fangAnswers — "AI Assistant" ของฟ่าง แบบตอบจากข้อมูลจริงใน site.ts เท่านั้น
 * - ไม่มี LLM/backend ในโปรเจกต์นี้ → ใช้กฎจับคู่คำถามกับข้อมูลเมนู/ราคา/โปรฯ/ท็อปปิ้ง/เวลาเปิด
 * - ห้ามเดา: ถ้าจับคู่ไม่ได้ → confident=false → UI ส่งต่อแอดมิน
 * - ถ้าวันหน้ามี AI API ให้แทนที่ฟังก์ชัน `answer()` ด้วยการเรียก API โดยคง contract เดิม
 */
import {
  MENU_ITEMS,
  MENU_SECTIONS,
  TOPPING_GROUPS,
  PROMOTIONS,
  PROMO_CAMPAIGNS,
  CONTACT,
  FRESH_FRUITS,
  FRESH_VEGGIES,
  FRESH_BUFFET,
  STICKY_FLAVORS,
  STICKY_PACKAGES,
  HOMEMADE_NOTE,
  SODA_MODES,
} from "@/data/site";

export type FangAnswer = {
  text: string;
  confident: boolean;
  suggest?: string[];
};

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();
const has = (q: string, ...keys: string[]) => keys.some((k) => q.includes(k));

const HANDOFF = "เรื่องนี้ฟ่างขอให้แอดมินช่วยตอบเพิ่มเติมนะ 💜 รอสักครู่น้า";

export function answer(raw: string): FangAnswer {
  const q = norm(raw);
  if (!q) return { text: "พิมพ์คำถามมาได้เลยน้า 💜", confident: true };

  // 🎰 สุ่มแก้วกับฟ่าง
  if (has(q, "สุ่ม", "กาชา", "gacha", "lucky", "เมนูลับ")) {
    return {
      text: "ตู้กาชา \"สุ่มแก้วกับฟ่าง\" อยู่หน้าแรกค่ะ 🎰 ข้างในมีทั้งเมนูหลักบางส่วน + เมนูลับ/เมนูทดลองที่ไม่มีในเมนูหลัก กดหมุนแล้วลุ้นได้เลย ถ้าถูกใจกด \"เอาแก้วนี้!\" ก็ลงตะกร้าได้ทันที 💜",
      confident: true,
    };
  }

  // 👩‍💻 ขอคุยกับคน
  if (has(q, "แอดมิน", "admin", "คุยกับคน", "พนักงาน", "เจ้าหน้าที่")) {
    return {
      text: "ได้เลย เดี๋ยวฟ่างเรียกแอดมินมาช่วยตอบให้นะ 💜",
      confident: false,
    };
  }

  // 🕒 เวลาเปิด / ติดต่อ
  if (has(q, "เปิด", "ปิด", "กี่โมง", "เวลา", "hours", "open")) {
    return {
      text: `ร้าน${CONTACT.hoursLabel} ${CONTACT.hours} ค่ะ 🕒`,
      confident: true,
    };
  }
  if (has(q, "เบอร์", "โทร", "ติดต่อ", "line", "ไลน์", "contact")) {
    return {
      text: `ติดต่อร้านได้ที่ 📞 ${CONTACT.phone} หรือ LINE ${CONTACT.line} ค่ะ 💜`,
      confident: true,
    };
  }

  // 🎁 โปรโมชั่น
  if (has(q, "โปร", "promotion", "promo", "ส่วนลด", "ลด", "ส่งฟรี", "แคมเปญ")) {
    const lines = PROMOTIONS.map(
      (p) => `${p.emoji} ${p.title} ${p.highlight} — ${p.detail}`,
    );
    const ongoing = PROMO_CAMPAIGNS.filter((c) => c.ongoing).map(
      (c) => `${c.emoji} ${c.titleTh} — ${c.slogan}`,
    );
    return {
      text: `โปรตอนนี้มีแบบนี้ค่ะ 🎁\n${[...lines, ...ongoing].join("\n")}\n\nดูรายละเอียดเต็มได้ที่หน้า "โปรโมชั่น" นะคะ`,
      confident: true,
      suggest: ["🥤 เมนูเครื่องดื่ม", "📦 การสั่งซื้อ"],
    };
  }

  // 🍓 วัตถุดิบวันนี้ / ตักสด
  if (
    has(
      q,
      "วัตถุดิบ",
      "ผลไม้วันนี้",
      "ผลไม้อะไร",
      "ผักอะไร",
      "ตักสด",
      "บุฟเฟ่ต์",
      "บุฟเฟต์",
    )
  ) {
    const fr = FRESH_FRUITS.slice(0, 12)
      .map((f) => `${f.emoji}${f.label}`)
      .join(" ");
    const vg = FRESH_VEGGIES.map((f) => `${f.emoji}${f.label}`).join(" ");
    return {
      text: `"ตักสด ปั่นฟิน" ราคาเดียว ${FRESH_BUFFET.price} บาท (จาก ${FRESH_BUFFET.oldPrice}) เลือกได้ไม่อั้น 🥝\nผลไม้ที่มี: ${fr} …\nผัก: ${vg}\n\n⚠️ ${HOMEMADE_NOTE.th}`,
      confident: true,
    };
  }

  // 🧋 ท็อปปิ้ง
  if (has(q, "ท็อปปิ้ง", "topping", "ไข่มุก", "เจลลี่", "วิปครีม", "พุดดิ้ง")) {
    const groups = TOPPING_GROUPS.map(
      (g) =>
        `${g.emoji} ${g.titleTh}: ${g.items.map((i) => `${i.nameTh} (+${i.price})`).join(", ")}`,
    );
    return {
      text: `ท็อปปิ้งที่มีค่ะ 🧋\n${groups.join("\n")}`,
      confident: true,
    };
  }

  // 🥛 นมเหนียว
  if (has(q, "นมเหนียว", "sticky")) {
    const fl = STICKY_FLAVORS.map((f) => `${f.emoji} ${f.nameTh}`).join(", ");
    const pk = STICKY_PACKAGES.map(
      (p) => `${p.emoji} ${p.nameTh} ${p.price} บาท/${p.unit}`,
    ).join("\n");
    return {
      text: `นมเหนียวมี ${STICKY_FLAVORS.length} รส: ${fl}\n\nเลือกแบบได้ 4 แบบ:\n${pk}\n\nสั่งได้ที่หน้า "นมเหนียว" ค่ะ 💜`,
      confident: true,
    };
  }

  // 🫧 อิตาเลียนโซดา 3 แบบ
  if (has(q, "ซ่าผสมเอง", "ซ่ามิกซ์", "mystery", "diy", "หลอดสลิง")) {
    const m = SODA_MODES.map(
      (x) =>
        `${x.emoji} ${x.nameTh}${x.extra ? ` (+${x.extra})` : ""} — ${x.desc}`,
    ).join("\n");
    return { text: `อิตาเลียนโซดามี 3 แบบค่ะ 🫧\n${m}`, confident: true };
  }

  // 🍯 ความหวาน / ไม่หวาน
  if (has(q, "ไม่หวาน", "หวานน้อย", "ความหวาน", "น้ำตาล")) {
    return {
      text: "สั่งได้ค่ะ 🍯 ตอนเพิ่มลงตะกร้าเลือกระดับความหวานได้ 3 แบบ: หวานน้อย / หวานกลาง 50% / หวานปกติ",
      confident: true,
    };
  }

  // 📦 การสั่งซื้อ / จัดส่ง
  if (
    has(
      q,
      "สั่ง",
      "ออเดอร์",
      "order",
      "จัดส่ง",
      "ส่ง",
      "delivery",
      "ตะกร้า",
      "ชำระ",
      "จ่าย",
    )
  ) {
    const d = PROMOTIONS.find((p) => p.id === "delivery");
    return {
      text: `สั่งง่าย ๆ ค่ะ 📦\n1) เลือกเมนู → กด "เพิ่มลงตะกร้า" เลือกหวาน/ปั่น/ท็อปปิ้ง\n2) เปิดตะกร้ามุมขวาบน → กด "สั่งซื้อ"\n${d ? `\n🛵 ${d.title} ${d.highlight}` : ""}\n\nเรื่องช่องทางชำระเงินและติดตามออเดอร์ ฟ่างขอให้แอดมินช่วยยืนยันอีกทีนะ 💜`,
      confident: true,
    };
  }

  // ⭐ เมนูแนะนำ
  if (has(q, "แนะนำ", "ขายดี", "popular", "recommend", "อร่อย")) {
    const top = MENU_ITEMS.filter((m) => m.popular || m.badge)
      .slice(0, 6)
      .map((m) => `${m.emoji} ${m.name} ${m.price} บาท`);
    return {
      text: `เมนูขายดีของร้านค่ะ ⭐\n${top.join("\n")}`,
      confident: true,
      suggest: ["💰 สอบถามราคา", "🧋 ท็อปปิ้ง"],
    };
  }

  // 💰 ราคา / เมนูเฉพาะ — ค้นชื่อเมนูจากข้อความ
  const hit = MENU_ITEMS.filter((m) => {
    const n = norm(m.name),
      e = norm(m.nameEn ?? "");
    return (
      (n && q.includes(n)) ||
      (e && q.includes(e)) ||
      (n.length >= 4 &&
        n.split(" ").some((w) => w.length >= 4 && q.includes(w)))
    );
  });
  if (hit.length) {
    const lines = hit
      .slice(0, 5)
      .map(
        (m) =>
          `${m.emoji} ${m.name}${m.nameEn ? ` (${m.nameEn})` : ""} — เริ่มต้น ${m.price} บาท · ${m.tagline}`,
      );
    return {
      text: `เจอเมนูนี้ค่ะ 💜\n${lines.join("\n")}\n\n(ราคาอาจเพิ่มตามท็อปปิ้งที่เลือกนะคะ)`,
      confident: true,
    };
  }

  // หมวด
  const sec = MENU_SECTIONS.find(
    (s) => q.includes(norm(s.label)) || q.includes(norm(s.labelEn)),
  );
  if (sec) {
    const items = MENU_ITEMS.filter((m) => m.category === sec.id).slice(0, 8);
    if (items.length) {
      return {
        text: `หมวด ${sec.label} มีเช่น:\n${items.map((m) => `${m.emoji} ${m.name} ${m.price} บาท`).join("\n")}\n\nดูทั้งหมดได้ที่หน้า ${sec.label} ค่ะ`,
        confident: true,
      };
    }
    return {
      text: `หมวด ${sec.label} — ${sec.desc} ดูรายละเอียดได้ที่หน้า ${sec.label} ค่ะ 💜`,
      confident: true,
    };
  }
  if (has(q, "ราคา", "เท่าไหร่", "กี่บาท", "price")) {
    return {
      text: 'บอกชื่อเมนูที่อยากรู้ราคาได้เลยค่ะ เช่น "ชาไทยปั่นราคาเท่าไหร่" 💰 หรือดูหมวดเมนูทั้งหมดได้ที่หน้า "เมนูทั้งหมด"',
      confident: true,
    };
  }
  if (has(q, "เมนู", "menu", "มีอะไร")) {
    return {
      text: `เมนูของร้านมี ${MENU_SECTIONS.length} หมวดค่ะ: ${MENU_SECTIONS.map((s) => `${s.emoji}${s.label}`).join(" ")}\nอยากรู้หมวดไหนพิมพ์ชื่อหมวดมาได้เลย 💜`,
      confident: true,
    };
  }

  return { text: HANDOFF, confident: false };
}

export const QUICK_QUESTIONS = [
  { label: "💰 สอบถามราคา", q: "ราคา" },
  { label: "🎁 โปรโมชั่น", q: "มีโปรโมชั่นอะไรบ้าง" },
  { label: "🥤 เมนูเครื่องดื่ม", q: "มีเมนูอะไรบ้าง" },
  { label: "🧋 ท็อปปิ้ง", q: "ท็อปปิ้งมีอะไรบ้าง" },
  { label: "🍓 วัตถุดิบวันนี้", q: "วันนี้มีผลไม้อะไร" },
  { label: "📦 การสั่งซื้อ", q: "สั่งซื้อยังไง" },
  { label: "👩‍💻 คุยกับแอดมิน", q: "ขอคุยกับแอดมิน" },
];
