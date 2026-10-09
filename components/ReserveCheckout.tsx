"use client";

import Image from "next/image";
import {
  Briefcase, Crown, Hammer, Lock, PlayCircle, Radio, ShieldCheck, Trophy,
} from "lucide-react";
import { freeAccess as fa } from "@/lib/data";
import { Modal } from "./Modal";

// Everything the ₹499 reservation keeps unlocked — colours from the Figma card palette.
const BENEFITS = [
  { icon: Radio, chip: "Weekly", title: "Live mentor sessions", body: "Engineers and leaders from top tech companies.", bg: "#FDEDED", tint: "#F7D2D2", accent: "#E7000B" },
  { icon: PlayCircle, chip: "Unlimited", title: "Recordings & resources", body: "Rewatch sessions, submit assignments, get slides.", bg: "#EAF4EC", tint: "#D3E8D8", accent: "#16A34A" },
  { icon: Trophy, chip: "₹1 Cr", title: "Hackathon prize pool", body: "A ₹25 Lakh hackathon every semester.", bg: "#FDF2DF", tint: "#F6E2BB", accent: "#D97706" },
  { icon: Briefcase, chip: "Top 20%", title: "Guaranteed paid internship", body: "For the top performers in your cohort.", bg: "#F0EBFB", tint: "#DDD3F4", accent: "#7C3AED" },
  { icon: Crown, chip: "6 months", title: "Internshala Pro", body: "Free after you complete the 2-year program.", bg: "#DFEAFD", tint: "#CFDEFA", accent: "#2563EB" },
  { icon: Hammer, chip: "Free", title: "ProjectBuilder Pro", body: "Real projects, AI reviews, GitHub-tracked progress.", bg: "#F4F4F6", tint: "#E6E6EA", accent: "#0A0A0B" },
];

type Countdown = { d: number; h: number; m: number; sec: number; day: number; urgent: boolean };
const pad = (n: number) => String(n).padStart(2, "0");

export function ReserveCheckout({ t, onClose }: { t: Countdown; onClose: () => void }) {
  return (
    <Modal label="Reserve your Catalyst seat" onClose={onClose}
      overlayClassName="p-0 sm:p-4" scrollClassName="max-h-[100dvh] sm:max-h-[calc(100vh-2rem)]"
      className="max-w-[980px] max-sm:h-[100dvh] max-sm:rounded-none" closeClassName="bg-white/10 text-white hover:bg-white/20 md:bg-bg md:text-ink md:hover:bg-line">
      <div className="grid md:grid-cols-[minmax(0,1fr)_360px]">
        {/* What you keep */}
        <div className="order-2 p-6 pb-28 sm:p-8 md:order-1 md:pb-8">
          <p className="text-[11px] font-bold uppercase tracking-[1.5px] text-brand">Reserve your seat</p>
          <h3 className="mt-1.5 text-[26px] font-extrabold leading-[1.15] tracking-tight sm:text-[30px]">
            Keep everything<br className="hidden sm:block" /> you&apos;ve unlocked
          </h3>
          <p className="mt-2 max-w-md text-[14px] leading-relaxed text-muted">
            Free access ends after day {fa.days}. Reserve your seat for{" "}
            <b className="text-ink">₹{fa.price}</b> and keep all of this:
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {BENEFITS.map(({ icon: Icon, chip, title, body, bg, tint, accent }) => (
              <div key={title} className="rounded-2xl p-4 transition hover:-translate-y-0.5" style={{ background: bg }}>
                <div className="flex items-center justify-between gap-2">
                  <span className="grid size-10 place-items-center rounded-xl" style={{ background: tint, color: accent }}>
                    <Icon className="size-5" />
                  </span>
                  <span className="rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-bold" style={{ color: accent }}>{chip}</span>
                </div>
                <b className="mt-3 block text-[14.5px] font-bold leading-snug">{title}</b>
                <p className="mt-1 text-[12.5px] leading-snug text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order summary + pay */}
        <aside className="relative order-1 overflow-hidden bg-black p-6 text-white sm:p-8 md:order-2">
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-brand/30 blur-3xl" />
          <div className="relative">
            <Image src="/images/logos/upgrad-catalyst.png" alt="upGrad School of Technology | Catalyst" width={187} height={34} unoptimized
              className="h-7 w-auto rounded bg-white px-1.5 py-1" />

            <p className="mt-6 text-[11px] font-bold uppercase tracking-[1.5px] text-white/60">Free access ends in</p>
            <p className={`mt-1 text-[28px] font-bold tabular-nums leading-none ${t.urgent ? "text-brand-2" : ""}`}>
              {t.d}<small className="text-[13px] text-white/50">d</small> {pad(t.h)}<small className="text-[13px] text-white/50">h</small> {pad(t.m)}<small className="text-[13px] text-white/50">m</small> {pad(t.sec)}<small className="text-[13px] text-white/50">s</small>
            </p>
            <span className="mt-2 inline-block rounded-full bg-brand px-2.5 py-0.5 text-[11px] font-bold">Day {t.day} of {fa.days}</span>

            <dl className="mt-7 space-y-2.5 border-t border-white/10 pt-5 text-[14px]">
              <div className="flex justify-between"><dt className="text-white/70">Catalyst seat reservation</dt><dd>₹{fa.price}</dd></div>
              <div className="flex justify-between border-t border-dashed border-white/15 pt-2.5 text-[18px] font-bold"><dt>Total</dt><dd>₹{fa.price}</dd></div>
            </dl>

            {/* Desktop pay button (phones get a sticky one below) */}
            <a href={fa.payHref}
              className="mt-6 hidden w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-[16px] font-bold shadow-[0_10px_30px_rgba(225,29,72,.45)] transition hover:bg-brand-2 md:flex">
              <Lock className="size-4" /> Pay ₹{fa.price} securely
            </a>
            <p className="mt-3 hidden items-center justify-center gap-1.5 text-[12px] text-white/55 md:flex">
              <ShieldCheck className="size-4" /> Secure payment powered by Razorpay
            </p>
          </div>
        </aside>
      </div>

      {/* Phones: pay button pinned to the bottom of the sheet */}
      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-white p-4 md:hidden">
        <a href={fa.payHref}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-[16px] font-bold text-white shadow-[0_10px_30px_rgba(225,29,72,.35)]">
          <Lock className="size-4" /> Pay ₹{fa.price} securely
        </a>
        <p className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-dim"><ShieldCheck className="size-3.5" /> Secure payment powered by Razorpay</p>
      </div>
    </Modal>
  );
}
