/* 🪷 ปกลอยกระทงแบบเคลื่อนไหว — CSS/SVG layers, แต่ละเลเยอร์คนละจังหวะ */

function Krathong({
  left,
  bottom,
  size,
  dur,
  delay,
  hue,
}: {
  left: string;
  bottom: number;
  size: number;
  dur: number;
  delay: number;
  hue: string;
}) {
  return (
    <div
      className="absolute"
      style={{
        left,
        bottom,
        animation: `krathong-bob ${dur}s ease-in-out ${delay}s infinite`,
      }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        {/* เปลวเทียน (กะพริบ) */}
        <div
          className="animate-candle-flicker absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{
            top: -size * 0.42,
            width: size * 0.3,
            height: size * 0.55,
            background:
              "radial-gradient(circle at 50% 75%, #fff3c4 0%, #ffb444 55%, #ff7a1a 100%)",
            filter: "blur(0.3px)",
          }}
        />
        {/* แสงอุ่นรอบเทียน */}
        <div
          className="animate-magic-glow absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{
            top: -size * 0.5,
            width: size * 0.9,
            height: size * 0.9,
            background: "radial-gradient(circle, rgba(255,180,80,0.5), transparent 65%)",
          }}
        />
        {/* ฐานกระทง (ดอกไม้) */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
          style={{
            width: size,
            height: size * 0.5,
            background: `radial-gradient(circle at 50% 25%, ${hue} 0%, #8a5a1e 100%)`,
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          }}
        />
      </div>
    </div>
  );
}

export default function LoyKrathongCover() {
  return (
    <div className="relative mx-auto h-44 w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#241640] via-[#3a2568] to-[#6a4a9e] shadow-inner sm:h-52">
      {/* 🌕 พระจันทร์ + แสงเรือง */}
      <div className="animate-magic-glow absolute right-8 top-4 h-24 w-24 rounded-full bg-[#ffe9a8]/40 blur-xl" />
      <div className="absolute right-10 top-6 h-16 w-16 rounded-full bg-gradient-to-br from-[#fff6d8] to-[#f4d98a] shadow-[0_0_30px_8px_rgba(255,235,170,0.45)]" />

      {/* ✨ ดาวกระพริบ (บางจุด) */}
      {[
        { l: "12%", t: "14%", d: "0s" },
        { l: "28%", t: "8%", d: "0.6s" },
        { l: "44%", t: "20%", d: "1.2s" },
        { l: "60%", t: "10%", d: "0.3s" },
        { l: "76%", t: "26%", d: "0.9s" },
        { l: "20%", t: "30%", d: "1.5s" },
        { l: "88%", t: "16%", d: "0.4s" },
      ].map((s, i) => (
        <span
          key={i}
          className={`animate-twinkle absolute h-1.5 w-1.5 rounded-full bg-white ${
            i > 3 ? "hidden sm:block" : ""
          }`}
          style={{ left: s.l, top: s.t, animationDelay: s.d }}
        />
      ))}

      {/* 🌫️ หมอกเหนือน้ำ (เคลื่อนช้ามาก) */}
      <div
        className="absolute bottom-12 left-0 h-10 w-2/3 rounded-full bg-white/25 blur-2xl"
        style={{ animation: "mist-drift 16s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-8 right-0 h-8 w-1/2 rounded-full bg-white/20 blur-2xl"
        style={{ animation: "mist-drift 22s ease-in-out 2s infinite reverse" }}
      />

      {/* 🌊 แม่น้ำ */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-[#3a2a72]/70 to-[#2a1c56]" />
      {/* เงาพระจันทร์สะท้อนน้ำ (ระยิบตามคลื่น) */}
      <div
        className="absolute bottom-0 right-[22%] h-2/5 w-8 bg-gradient-to-b from-[#ffe9a8]/60 to-transparent blur-[2px]"
        style={{ animation: "water-shimmer 5s ease-in-out infinite", transformOrigin: "top" }}
      />
      {/* ประกายผิวน้ำ */}
      {["30%", "55%", "70%"].map((l, i) => (
        <span
          key={i}
          className="absolute h-[3px] w-8 rounded-full bg-white/30 blur-[1px]"
          style={{
            left: l,
            bottom: 10 + i * 8,
            animation: `water-shimmer ${4 + i}s ease-in-out ${i * 0.5}s infinite`,
          }}
        />
      ))}

      {/* 🪷 กระทงลอย (บ๊อบคนละจังหวะ) */}
      <Krathong left="34%" bottom={22} size={22} dur={4} delay={0} hue="#ffd27a" />
      <Krathong left="52%" bottom={14} size={26} dur={5.2} delay={0.6} hue="#ffb0c8" />
      <Krathong left="70%" bottom={26} size={18} dur={3.6} delay={1.1} hue="#ffe08a" />

      {/* ✨ แสงเล็ก ๆ ลอยขึ้นจากกระทง */}
      {[
        { l: "35%", dur: 4.5 },
        { l: "53%", dur: 6 },
        { l: "71%", dur: 5 },
      ].map((s, i) => (
        <span
          key={i}
          className="animate-magic-float absolute bottom-10 h-1 w-1 rounded-full bg-[#ffcf7a]"
          style={
            {
              left: s.l,
              "--dur": `${s.dur}s`,
              "--delay": `${i * 1.2}s`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* 🌸 กลีบดอกไม้ลอยผ่าน (เป็นครั้งคราว) */}
      {[
        { t: "40%", dur: 9, delay: 0 },
        { t: "55%", dur: 12, delay: 4 },
      ].map((p, i) => (
        <span
          key={i}
          className="absolute left-0 hidden h-2 w-2.5 rounded-full rounded-tl-none bg-[#ff9ec8]/80 sm:block"
          style={{
            top: p.t,
            animation: `petal-drift ${p.dur}s linear ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* 👩🥤 คน 2 คน (ฝั่งซ้าย) — โยกเบา ๆ */}
      <div className="absolute bottom-6 left-4 flex items-end gap-1.5">
        {/* คนถือกระทง */}
        <div style={{ animation: "gentle-sway 4.5s ease-in-out infinite", transformOrigin: "bottom" }}>
          <div className="relative h-14 w-8">
            <span className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full bg-[#1c1230]" />
            <span className="absolute bottom-0 left-1/2 h-10 w-6 -translate-x-1/2 rounded-t-[10px] bg-[#241736]" />
            {/* กระทงในมือ (แสงอุ่น) */}
            <span className="animate-candle-flicker absolute -right-1 top-6 h-2 w-2 rounded-full bg-[#ffcf7a] shadow-[0_0_6px_2px_rgba(255,190,90,0.7)]" />
          </div>
        </div>
        {/* คนถือแก้วปั่นกับฟ่าง */}
        <div style={{ animation: "gentle-sway 5.5s ease-in-out 0.4s infinite", transformOrigin: "bottom" }}>
          <div className="relative h-16 w-8">
            <span className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full bg-[#1c1230]" />
            <span className="absolute bottom-0 left-1/2 h-11 w-6 -translate-x-1/2 rounded-t-[10px] bg-[#2a1a40]" />
            {/* แก้ว (โลโก้ = 💜 ติดกับแก้ว) */}
            <span
              className="absolute -right-2 top-4"
              style={{ animation: "cup-raise 3.5s ease-in-out infinite", transformOrigin: "bottom" }}
            >
              <span className="relative flex h-5 w-4 flex-col items-center justify-end rounded-b-[6px] rounded-t-[3px] bg-gradient-to-b from-[#b98cf0] to-[#7b4ab8] ring-1 ring-white/40">
                <span className="absolute -top-1.5 right-0.5 h-2 w-[2px] rounded-full bg-[#c9b3e8]" />
                <span className="text-[6px] leading-none">💜</span>
              </span>
              {/* ประกายข้างแก้ว */}
              <span className="animate-twinkle absolute -right-1 -top-1 text-[8px]">✨</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
