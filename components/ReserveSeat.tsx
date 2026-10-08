"use client";

import { useEffect, useState } from "react";
import { ArrowRight, LockOpen } from "lucide-react";
import { freeAccess as fa } from "@/lib/data";

const END = new Date(fa.startedAt).getTime() + fa.days * 86_400_000;
const pad = (n: number) => String(n).padStart(2, "0");

// Ticks every second; returns time left and how far into the free period we are.
function useCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const left = now === null ? fa.days * 86_400_000 : Math.max(0, END - now);
  const s = Math.floor(left / 1000);
  return {
    d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), sec: s % 60,
    day: Math.min(fa.days, Math.max(1, Math.ceil(fa.days - left / 86_400_000))),
    used: 1 - left / (fa.days * 86_400_000),
    urgent: left < 86_400_000, expired: left === 0,
  };
}

// Split-flap style digit pair; re-keys on change so it flips in.
function Flap({ v, label, urgent }: { v: number; label: string; urgent: boolean }) {
  return (
    <span className="flex flex-col items-center">
      <span className="flex gap-[3px]">
        {pad(v).split("").map((c, i) => (
          <span key={`${i}-${c}`}
            className={`relative grid h-9 w-[21px] place-items-center overflow-hidden rounded-md text-[19px] font-bold tabular-nums text-white animate-[flip_.35s_ease-out] sm:h-11 sm:w-7 sm:text-[24px] ${
              urgent ? "bg-brand" : "bg-white/10"}`}>
            {c}
            <span aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-black/40" />
          </span>
        ))}
      </span>
      <span className="mt-1 text-[9px] font-semibold uppercase tracking-[1.2px] text-white/70">{label}</span>
    </span>
  );
}

// Full-width "event ticket" strip pinned under the top bar until the seat is reserved.
export function ReserveSeat() {
  const t = useCountdown();
  if (fa.reserved) return null;

  return (
    <div className="relative overflow-hidden bg-black text-white">
      {/* ambient glow + moving sheen */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 animate-[sheen_6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[.06] to-transparent" />

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 px-4 sm:px-[52px] md:flex md:items-stretch md:gap-0">
        {/* Message: label → headline → one supporting line */}
        <div className="col-span-2 flex min-w-0 flex-col justify-center pt-2.5 md:flex-1 md:py-4 md:pr-6">
          <span className="hidden w-max items-center gap-1.5 whitespace-nowrap rounded-full bg-brand/15 md:flex px-2.5 py-1 text-[10px] font-bold uppercase tracking-[1.5px] text-brand-2 ring-1 ring-brand/40">
            <span className="relative flex size-2"><span className="absolute inset-0 animate-ping rounded-full bg-brand-2" /><span className="relative size-2 rounded-full bg-brand-2" /></span>
            <LockOpen className="size-3.5" /> Free access unlocked<span className="md:hidden"> · 10 days</span>
          </span>
          <p className="text-[16px] font-extrabold leading-tight tracking-tight md:mt-2 md:text-[24px]">
            Your 10-Day Free Access Is{" "}
            <span className="bg-gradient-to-r from-brand-2 to-rose-300 bg-clip-text text-transparent">Unlocked</span>
          </p>
          <p className="mt-1.5 hidden text-[14px] leading-snug text-white/80 md:block">
            Reserve your seat for{" "}
            <span className="rounded-md bg-brand px-1.5 py-0.5 font-bold text-white">₹{fa.price}</span>{" "}
            to keep learning after day {fa.days}.
          </p>
        </div>

        {/* Countdown: label above the flip digits */}
        <div className="flex min-w-0 flex-col justify-center py-2 md:flex-none md:border-l md:border-white/10 md:px-6 md:py-0" aria-live="off">
          <span className="mb-1 flex items-center gap-2 whitespace-nowrap md:mb-1.5">
            <span className={`text-[10px] font-bold uppercase tracking-[1.5px] ${t.urgent ? "text-brand-2" : "text-white/80"}`}>
              {t.expired ? "Free access has ended" : "Ends in"}
            </span>
            <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-white">Day {t.day} of {fa.days}</span>
          </span>
          <span className={`text-[20px] font-bold tabular-nums leading-none md:hidden ${t.urgent ? "text-brand-2" : ""}`}>
            {t.d}<small className="text-[11px] text-white/60">d</small> {pad(t.h)}<small className="text-[11px] text-white/60">h</small> {pad(t.m)}<small className="text-[11px] text-white/60">m</small> {pad(t.sec)}<small className="text-[11px] text-white/60">s</small>
          </span>
          <div className="hidden items-start gap-2 md:flex">
            <Flap v={t.d} label="days" urgent={t.urgent} />
            <span className="pt-2 text-white/30">:</span>
            <Flap v={t.h} label="hrs" urgent={t.urgent} />
            <span className="pt-2 text-white/30">:</span>
            <Flap v={t.m} label="min" urgent={t.urgent} />
            <span className="hidden pt-2 text-white/30 sm:block">:</span>
            <span className="hidden sm:block"><Flap v={t.sec} label="sec" urgent={t.urgent} /></span>
          </div>
        </div>

        {/* Ticket stub CTA with perforated edge */}
        <a href={fa.reserveHref}
          className="group relative my-2 flex shrink-0 items-center gap-2 rounded-xl bg-brand py-2 pl-3.5 pr-3 md:my-0 md:py-0 font-semibold transition hover:bg-brand-2 md:my-0 md:-mr-[52px] md:rounded-none md:gap-4 md:pl-9 md:pr-[52px] md:after:absolute md:after:inset-y-0 md:after:left-full md:after:w-[100vw] md:after:bg-inherit md:after:content-['']">
          {/* Ticket perforation: corner notches + evenly spaced bites, all the same size */}
          <span aria-hidden className="absolute -left-2.5 -top-2.5 hidden size-5 rounded-full bg-black md:block" />
          <span aria-hidden className="absolute -bottom-2.5 -left-2.5 hidden size-5 rounded-full bg-black md:block" />
          <span aria-hidden className="absolute inset-y-[18px] -left-[5px] hidden flex-col justify-evenly md:flex">
            {Array.from({ length: 5 }, (_, i) => <span key={i} className="size-2.5 rounded-full bg-black" />)}
          </span>
          <span className="leading-tight">
            <span className="block whitespace-nowrap text-[9px] font-bold uppercase tracking-[1.5px] text-white md:text-[13px]">Reserve seat</span>
            <span className="block text-[18px] font-extrabold md:text-[32px] md:leading-none md:mt-1">₹{fa.price}</span>
          </span>
          <ArrowRight className="size-5 transition group-hover:translate-x-1 md:size-7" />
        </a>
      </div>

      {/* Day progress along the bottom edge */}
      <div className="relative h-1 bg-white/10">
        <div className="h-full bg-gradient-to-r from-brand-2 to-brand shadow-[0_0_10px_rgba(225,29,72,.8)] transition-[width] duration-1000" style={{ width: `${t.used * 100}%` }} />
      </div>
    </div>
  );
}
