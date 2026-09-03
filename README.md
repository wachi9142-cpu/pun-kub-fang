# ปั่นกับฟ่าง · Pun Kub Fang 💜

เว็บไซต์ร้านน้ำปั่น/เครื่องดื่ม **ปั่นกับฟ่าง** — สมูทตี้ผลไม้, อิตาเลียนโซดา, นมหมี, ชา, กาแฟ, น้ำอัดลม
โทนสี **ม่วง–ชมพู–ครีม** สไตล์น่ารัก พร้อมฟีเจอร์ **"มิกซ์กับฟ่าง"** ให้ลูกค้าปั่นแก้วเองได้

## เทคโนโลยี

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (ดีไซน์ทั้งหมด) · **Ant Design v6** (theme provider)
- ฟอนต์ไทย: **Mitr** (หัวเรื่อง) + **Prompt** (เนื้อความ) ผ่าน `next/font`
- รูปแก้วน้ำปั่น + มาสคอต วาดด้วย **inline SVG** (เปลี่ยนเป็นรูปจริงได้ทีหลัง)

## โครงหน้าเว็บ

| ส่วน | ไฟล์ |
|---|---|
| ① แถบเมนู | `sections/Navbar.tsx` |
| ② Banner (โชว์ความหลากหลาย) | `sections/Hero.tsx` |
| ③ วันนี้ดื่มอะไรดี? (เลือกหมวด) | `sections/Categories.tsx` |
| ④ 🔥 เมนูขายดี | `sections/BestSellers.tsx` |
| เมนูเครื่องดื่มเต็ม (กรองตามหมวด) | `sections/DrinkMenu.tsx` |
| ⑤ มิกซ์กับฟ่าง (teaser) | `sections/MixTeaser.tsx` |
| ⑥ ฟ่างจับคู่ให้ | `sections/MixPairings.tsx` |
| โปรโมชั่น / เกี่ยวกับร้าน / รีวิว / ฟุตเตอร์ | `sections/Promotions,About,Reviews,SiteFooter.tsx` |
| หน้ามิกซ์เอง | `app/mix/page.tsx` + `sections/MixYourOwn.tsx` |

**แก้ข้อมูลเมนู/หมวด/รีวิว/โปรฯ ได้ที่ไฟล์เดียว:** [`src/data/site.ts`](src/data/site.ts)

## เริ่มใช้งาน

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start   # production
```

## เปลี่ยนรูปเป็นของจริง

ตอนนี้ใช้ SVG วาดเองเป็นตัวแทน เมื่อมีรูปจริงแล้ววางไฟล์ใน `public/` แล้วบอกได้เลย เดี๋ยวเปลี่ยน `SmoothieCup` / `Mascot` เป็น `next/image` ให้
