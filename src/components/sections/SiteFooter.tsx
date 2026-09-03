"use client";

import { useState } from "react";
import { Phone, Clock, MessageCircle, Send, Check } from "lucide-react";
import { CONTACT, FOOTER_LINKS } from "@/data/site";
import BrandLogo from "@/components/BrandLogo";
import {
  FacebookIcon,
  InstagramIcon,
  LineIcon,
  TiktokIcon,
} from "@/components/SocialIcons";

export default function SiteFooter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    setEmail("");
    setTimeout(() => setDone(false), 2500);
  };

  return (
    <footer
      id="contact"
      className="relative mt-8 overflow-hidden bg-gradient-to-br from-grape-600 to-grape-700 text-white"
    >
      {/* คลื่นด้านบน */}
      <div className="absolute -top-px left-0 right-0 h-10 bg-[radial-gradient(closest-side,transparent_98%,transparent)]" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* แบรนด์ */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="rounded-full bg-white/15 p-1">
                <BrandLogo size={44} />
              </div>
              <div>
                <div className="font-display text-lg font-semibold">
                  ปั่นกับฟ่าง
                </div>
                <div className="text-[10px] tracking-[0.28em] text-white/60 uppercase">
                  Smoothie &amp; Drinks
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              อร่อยสดชื่น ปั่นสดใหม่ทุกแก้ว
              <br />
              คัดสรรวัตถุดิบคุณภาพดี 💜
            </p>
            <div className="mt-4 flex gap-2.5">
              {[FacebookIcon, InstagramIcon, LineIcon, TiktokIcon].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/15 transition-colors hover:bg-white/30"
                    aria-label="ช่องทางโซเชียล"
                  >
                    <Icon size={18} />
                  </a>
                ),
              )}
            </div>
          </div>

          {/* เมนู */}
          <div>
            <h3 className="font-display mb-4 text-base font-semibold">เมนู</h3>
            <ul className="space-y-2.5 text-sm text-white/75">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ติดต่อ */}
          <div>
            <h3 className="font-display mb-4 text-base font-semibold">
              ช่องทางติดต่อ
            </h3>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
                  <Phone size={16} />
                </span>
                {CONTACT.phone}
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
                  <MessageCircle size={16} />
                </span>
                {CONTACT.line}
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
                  <Clock size={16} />
                </span>
                <span>
                  {CONTACT.hoursLabel}
                  <br />
                  {CONTACT.hours}
                </span>
              </li>
            </ul>
          </div>

          {/* จดหมายข่าว */}
          <div>
            <h3 className="font-display mb-4 text-base font-semibold">
              สมัครรับข่าวสาร
            </h3>
            <p className="text-sm text-white/75">
              รับโปรโมชั่นพิเศษก่อนใคร เมื่อสมัครรับข่าวสารจากเรา
            </p>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="อีเมลของคุณ"
                  className="w-full rounded-full bg-white/95 px-4 py-2.5 text-sm text-grape-700 placeholder:text-grape-300 outline-none focus:ring-2 focus:ring-blossom-300"
                />
                <button
                  type="submit"
                  className="grid shrink-0 place-items-center gap-1 rounded-full bg-blossom-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blossom-600"
                >
                  {done ? <Check size={16} /> : <Send size={16} />}
                </button>
              </div>
              {done && (
                <p className="mt-2 text-xs text-white/80">
                  สมัครเรียบร้อยแล้ว ขอบคุณค่ะ 💜
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-center text-sm text-white/60">
          © 2024 ปั่นกับฟ่าง · Smoothie &amp; Drinks | All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
