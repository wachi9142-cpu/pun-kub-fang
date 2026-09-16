"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, Send, X } from "lucide-react";
import { CONTACT } from "@/data/site";
import { answer, QUICK_QUESTIONS } from "@/lib/fangAnswers";

/**
 * 💬 FangChat — ศูนย์ช่วยเหลือ / แชตสอบถามร้าน (Floating Widget)
 *
 * ⚠️ โปรเจกต์นี้ยังไม่มี backend / AI API / WebSocket / Voice Call (ตรวจสอบแล้ว: ไม่มี src/app/api, ไม่มี env)
 *   → 🤖 AI Assistant = กฎตอบจากข้อมูลจริงใน site.ts (src/lib/fangAnswers.ts) ไม่เดาข้อมูล
 *   → 👩‍💻 Admin: ทำ flow "เรียกแอดมิน / รอแอดมิน" + auto-escalate 5 นาที ด้วย timer ฝั่ง client (fallback)
 *     เมื่อมี backend ให้เปลี่ยน `requestAdmin()` / สถานะ `stage` ไปอิง session/queue จริง
 *   → 📞 โทร: ยังไม่มี WebRTC → ปุ่ม "โทรหาแอดมิน" เป็น tel: ไปเบอร์ร้านจริง (CONTACT.phone) ไม่ทำระบบโทรปลอม
 * - บทสนทนาเก็บใน localStorage → ปิด/เปิดใหม่ไม่หาย
 */

type Role = "user" | "ai" | "admin" | "system";
type Msg = { id: string; role: Role; text: string; at: number };
type Stage = "ai" | "waiting" | "admin" | "calling";

const KEY = "pkf-chat-v1";
const ESCALATE_MS = 5 * 60 * 1000;

const GREETING: Msg = {
  id: "g0",
  role: "ai",
  text: "สวัสดีค่ะ ฟ่างเองน้า 🧋 มีอะไรสงสัยเรื่องเมนู ราคา โปรโมชั่น หรือท็อปปิ้ง ถามได้เลย 💜",
  at: 0,
};

function load(): { msgs: Msg[]; stage: Stage; waitingSince: number | null } {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { msgs: [GREETING], stage: "ai", waitingSince: null };
}

export default function FangChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [stage, setStage] = useState<Stage>("ai");
  const [waitingSince, setWaitingSince] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // โหลด/บันทึกบทสนทนา
  useEffect(() => {
    const s = load();
    setMsgs(s.msgs);
    setStage(s.stage);
    setWaitingSince(s.waitingSince);
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ msgs, stage, waitingSince }));
    } catch {}
  }, [msgs, stage, waitingSince, hydrated]);

  // เลื่อนลงล่างเมื่อมีข้อความใหม่
  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgs, open, typing]);

  // ⏱️ auto-escalate หลังรอ 5 นาที (client fallback — ควรย้ายไป backend เมื่อมี)
  useEffect(() => {
    if (stage !== "waiting" || !waitingSince) return;
    const left = ESCALATE_MS - (Date.now() - waitingSince);
    const t = window.setTimeout(
      () => {
        push(
          "system",
          "🟡 กำลังรอแอดมิน — แอดมินกำลังเข้ามาช่วยตอบนะ 💜 (หากเร่งด่วน โทร/ไลน์หาร้านได้เลย)",
        );
      },
      Math.max(0, left),
    );
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, waitingSince]);

  const push = (role: Role, text: string) =>
    setMsgs((m) => [
      ...m,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        role,
        text,
        at: Date.now(),
      },
    ]);

  const requestAdmin = () => {
    if (stage === "waiting" || stage === "admin") return;
    setStage("waiting");
    setWaitingSince(Date.now());
    push(
      "system",
      "🟡 กำลังเรียกแอดมิน... เดี๋ยวฟ่างเรียกแอดมินมาช่วยตอบให้นะ 💜",
    );
    push(
      "system",
      `ระหว่างรอ ติดต่อร้านโดยตรงได้ที่ 📞 ${CONTACT.phone} · LINE ${CONTACT.line}`,
    );
  };

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    push("user", t);
    setInput("");
    if (stage === "admin" || stage === "calling") return; // คุยกับแอดมินโดยตรง (รอ backend ส่งต่อ)
    setTyping(true);
    window.setTimeout(
      () => {
        const a = answer(t);
        push("ai", a.text);
        setTyping(false);
        if (!a.confident) requestAdmin();
      },
      500 + Math.min(900, t.length * 15),
    );
  };

  const reset = () => {
    setMsgs([{ ...GREETING, at: Date.now() }]);
    setStage("ai");
    setWaitingSince(null);
  };

  const status =
    stage === "ai"
      ? { dot: "bg-emerald-500", text: "🤖 AI Assistant · พร้อมช่วยตอบคำถาม" }
      : stage === "waiting"
        ? { dot: "bg-amber-400", text: "🟡 กำลังรอแอดมิน" }
        : stage === "calling"
          ? { dot: "bg-emerald-500", text: "📞 กำลังคุยกับแอดมิน" }
          : { dot: "bg-emerald-500", text: "👩‍💻 แอดมินเข้ามาแล้ว" };

  return (
    <>
      {/* 💬 ปุ่มลอย (มุมขวาล่าง เหนือปุ่ม BackToTop) */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fang-chat-fab fixed bottom-20 right-4 z-[90] flex items-center gap-2 rounded-full bg-gradient-to-r from-grape-600 to-blossom-500 py-2.5 pl-3 pr-4 text-sm font-semibold text-white shadow-card ring-2 ring-white/70 transition-transform hover:scale-105 sm:bottom-6 sm:right-24"
          aria-label="เปิดแชตช่วยเหลือ"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-lg">
            🧋
          </span>
          <span className="hidden sm:inline">ทักฟ่างได้เลย!</span>
          <span className="sm:hidden">💬</span>
          <span className="animate-twinkle absolute -right-1 -top-1 text-sm">
            ✨
          </span>
        </button>
      )}

      {/* 🪟 Chat Panel */}
      {open && (
        <div className="fixed inset-x-0 bottom-0 z-[95] flex h-[88dvh] flex-col overflow-hidden rounded-t-3xl bg-cream-white shadow-card ring-1 ring-grape-200 sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[560px] sm:w-[380px] sm:rounded-3xl">
          {/* Header */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-grape-600 to-blossom-500 px-4 py-3 text-white">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white/20 text-xl">
              🧋
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="font-display text-sm font-bold">
                💜 ช่วยเหลือจากปั่นกับฟ่าง
              </p>
              <p className="flex items-center gap-1.5 text-[11px] text-white/85">
                <span className={`h-2 w-2 rounded-full ${status.dot}`} />
                {status.text}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="ปิดแชต"
              className="grid h-8 w-8 place-items-center rounded-full bg-white/15 hover:bg-white/25"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            className="flex-1 space-y-2.5 overflow-y-auto px-3 py-3"
          >
            {msgs.map((m) => (
              <Bubble key={m.id} m={m} />
            ))}
            {typing && (
              <div className="flex items-end gap-2">
                <Avatar role="ai" />
                <div className="rounded-2xl rounded-bl-md bg-white px-3 py-2 text-xs text-ink/50 ring-1 ring-ink/5">
                  กำลังพิมพ์…
                </div>
              </div>
            )}

            {/* Quick questions (ตอนยังคุยกับ AI) */}
            {stage === "ai" && msgs.length <= 2 && (
              <div className="pt-1">
                <p className="mb-1.5 text-[11px] font-medium text-ink/45">
                  คำถามยอดนิยม 👇
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_QUESTIONS.map((qq) => (
                    <button
                      key={qq.label}
                      type="button"
                      onClick={() => send(qq.q)}
                      className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-grape-700 ring-1 ring-grape-200 hover:bg-grape-50"
                    >
                      {qq.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* สถานะรอแอดมิน */}
            {stage === "waiting" && (
              <div className="rounded-2xl bg-amber-50 p-3 text-center text-xs text-amber-900 ring-1 ring-amber-200">
                🟡 <b>กำลังรอแอดมิน</b> — แอดมินกำลังเข้ามาช่วยตอบนะ 💜
                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                  <a
                    href={`tel:${CONTACT.phone.replace(/-/g, "")}`}
                    className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1.5 font-semibold text-white"
                  >
                    <Phone size={12} /> โทรหาร้าน {CONTACT.phone}
                  </a>
                  <button
                    type="button"
                    onClick={() => setStage("ai")}
                    className="rounded-full bg-white px-3 py-1.5 font-medium text-ink/70 ring-1 ring-ink/10"
                  >
                    🤖 กลับไปถาม AI
                  </button>
                </div>
              </div>
            )}
            {stage === "calling" && (
              <div className="rounded-2xl bg-emerald-50 p-3 text-center text-xs text-emerald-900 ring-1 ring-emerald-200">
                📞 <b>กำลังคุยกับแอดมิน</b> (ผ่านโทรศัพท์)
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setStage("admin");
                      push("system", "วางสายแล้ว — คุยต่อทางแชตได้เลยค่ะ 💜");
                    }}
                    className="inline-flex items-center gap-1 rounded-full bg-red-500 px-3 py-1.5 font-semibold text-white"
                  >
                    🔴 วางสาย
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Actions + Input */}
          <div className="border-t border-ink/5 bg-white p-2.5">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {stage === "ai" && (
                <button
                  type="button"
                  onClick={requestAdmin}
                  className="rounded-full bg-grape-50 px-3 py-1 text-[11px] font-semibold text-grape-700 ring-1 ring-grape-200 hover:bg-grape-100"
                >
                  👩‍💻 คุยกับแอดมิน
                </button>
              )}
              {stage === "admin" && (
                <a
                  href={`tel:${CONTACT.phone.replace(/-/g, "")}`}
                  onClick={() => {
                    setStage("calling");
                    push("system", "📞 กำลังเชื่อมต่อการโทร...");
                  }}
                  className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-semibold text-white"
                >
                  <Phone size={12} /> โทรคุยกับแอดมิน
                </a>
              )}
              <button
                type="button"
                onClick={reset}
                className="ml-auto rounded-full px-2 py-1 text-[11px] text-ink/40 hover:text-ink/70"
              >
                เริ่มใหม่
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  stage === "admin" || stage === "calling"
                    ? "พิมพ์ถึงแอดมิน…"
                    : "ถามฟ่างได้เลย เช่น ชาไทยราคาเท่าไหร่"
                }
                className="min-w-0 flex-1 rounded-full bg-cream-100 px-4 py-2.5 text-sm outline-none ring-1 ring-ink/10 focus:ring-grape-400"
              />
              <button
                type="submit"
                aria-label="ส่ง"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-r from-grape-600 to-blossom-500 text-white shadow-soft"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function Avatar({ role }: { role: Role }) {
  const map: Record<Role, string> = {
    ai: "🤖",
    admin: "👩‍💻",
    user: "👤",
    system: "💜",
  };
  return (
    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-grape-100 text-sm">
      {map[role]}
    </span>
  );
}

function Bubble({ m }: { m: Msg }) {
  if (m.role === "system") {
    return (
      <p className="mx-auto max-w-[90%] rounded-xl bg-grape-50 px-3 py-1.5 text-center text-[11px] text-grape-700">
        {m.text}
      </p>
    );
  }
  const mine = m.role === "user";
  return (
    <div className={`flex items-end gap-2 ${mine ? "flex-row-reverse" : ""}`}>
      {!mine && <Avatar role={m.role} />}
      <div className={`max-w-[80%] ${mine ? "text-right" : ""}`}>
        {!mine && (
          <p className="mb-0.5 text-[10px] font-semibold text-ink/45">
            {m.role === "ai" ? "🤖 AI Assistant" : "👩‍💻 Admin"}
          </p>
        )}
        <div
          className={`whitespace-pre-line rounded-2xl px-3 py-2 text-left text-sm leading-relaxed ${
            mine
              ? "rounded-br-md bg-gradient-to-r from-grape-600 to-blossom-500 text-white"
              : "rounded-bl-md bg-white text-ink ring-1 ring-ink/5"
          }`}
        >
          {m.text}
        </div>
      </div>
    </div>
  );
}
