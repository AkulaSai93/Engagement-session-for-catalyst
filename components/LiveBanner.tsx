"use client";

import { Calendar, ChevronRight, CircleDot, Clock, Play, Video } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { liveSession as s, spotlightRecording as rec, upcoming } from "@/lib/data";
import { useLive } from "@/lib/live";
import { LockBadge } from "./Lock";
import { SessionModal } from "./SessionModal";
import { RecordingModal } from "./RecordingModal";

export function LiveBanner() {
  if (!useLive()) return <NextUp />;
  return (
    <div className="lockable relative -mx-4 overflow-hidden bg-[#07070c] text-white sm:mx-0 sm:mt-0 sm:rounded-2xl">
      <div className="absolute inset-y-0 right-0 w-full sm:w-[60%]">
        <Image src={s.image} alt="" fill priority className="object-cover object-center" sizes="(max-width:640px) 100vw, 60vw" />
        <div className="absolute inset-0 bg-[#07070c]/70 sm:bg-transparent sm:bg-gradient-to-r sm:from-[#07070c] sm:via-[#07070c]/40 sm:to-transparent" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(50%_90%_at_0%_100%,rgba(225,29,72,.35),transparent_70%)]" />

      <LockBadge className="bottom-4 right-4 size-9" />
      <div className="relative px-4 pb-3 pt-3 sm:px-5 sm:pb-3.5 sm:pt-3.5">
        {/* LIVE badge left, mentor right — one row on every screen size */}
        <div className="flex items-center justify-between gap-2">
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand px-2.5 py-1 text-[9px] font-bold tracking-[1px]">
          <span className="size-1.5 animate-blink rounded-full bg-white" /> LIVE NOW
        </span>
        <div className="flex min-w-0 items-center gap-2 rounded-full border border-white/15 bg-black/40 py-0.5 pl-0.5 pr-3 backdrop-blur-md sm:gap-2.5 sm:py-1 sm:pl-1 sm:pr-3.5">
          <Image src={s.avatar} alt={s.speaker} width={34} height={34} className="size-6 rounded-full ring-2 ring-white/40 sm:size-[34px]" />
          <span className="leading-tight">
            <b className="block truncate text-[11px] sm:text-[12px]">{s.speaker}</b>
            <small className="block truncate text-[9px] text-zinc-300 sm:text-[10px]">{s.role}</small>
          </span>
        </div>
        </div>
        <h1 className="mt-2 text-[17px] font-bold leading-snug tracking-tight sm:mt-2.5 sm:text-[22px]">
          {s.title} <span className="text-brand-2">{s.titleAccent}</span>
        </h1>
        <div className="mt-1 flex flex-wrap gap-3 text-[10px] text-zinc-300">
          <span className="flex items-center gap-1"><Calendar className="size-3" />{s.date}</span><span className="flex items-center gap-1"><Clock className="size-3" />{s.time}</span><span className="hidden items-center gap-1 sm:flex"><CircleDot className="size-3" />Started {s.startedAgo}</span>
        </div>
        <div className="mt-2.5 flex gap-2 sm:mt-3">
          <a href={s.href} className="flex items-center gap-1.5 rounded-xl bg-brand px-3.5 py-2 text-[11px] font-semibold shadow-[0_6px_20px_rgba(225,29,72,.45)] transition hover:bg-brand-2">
            <Video className="size-3.5" /> Join Live Session
          </a>
        </div>
        <div className="mt-3 h-0.5 sm:mt-3.5 overflow-hidden rounded bg-white/15">
          <div className="h-full bg-brand-2" style={{ width: `${s.progress}%` }} />
        </div>
      </div>
    </div>
  );
}

// No class live right now: the next session and a past recording, shown as two equal cards.
function NextUp() {
  // Skip an upcoming session that is also the spotlight recording, so the two never repeat.
  const next = upcoming.find((u) => u.title !== rec.title) ?? upcoming[0];
  // Clicking opens that session's details / the recording player right here.
  const [open, setOpen] = useState<"session" | "recording" | null>(null);
  return (
    <section className="relative -mx-4 overflow-hidden bg-[#07070c] text-white sm:mx-0 sm:rounded-2xl">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(50%_90%_at_0%_100%,rgba(225,29,72,.28),transparent_70%)]" />
      <div className="relative p-4 sm:p-5">
        <div className="grid gap-3 xl:grid-cols-2">
          <Tile onClick={() => setOpen("session")} image={next.image}
            badge={<span className="grid min-w-11 place-items-center rounded-md bg-white px-1.5 py-1 leading-none text-ink shadow">
              <span className="text-[8px] font-bold uppercase tracking-[1px] text-brand">{next.month}</span>
              <span className="text-[16px] font-extrabold">{next.date}</span>
            </span>}
            tag={<><span className="size-1.5 animate-blink rounded-full bg-brand" /> Up next · {next.day} {next.time}</>}
            title={next.title} avatar={next.avatar} speaker={next.speaker} role={next.role} cta="Details" />
          <Tile onClick={() => setOpen("recording")} image={rec.image}
            badge={<span className="rounded-md bg-black/75 px-1.5 py-0.5 text-[10px] font-semibold text-white">{rec.duration}</span>}
            play
            tag={<><Play className="size-3 fill-current" /> Past recording · {rec.date}</>}
            title={rec.title} avatar={rec.avatar} speaker={rec.speaker} role={rec.role} cta="Watch" />
        </div>
      </div>
      {open === "session" && <SessionModal session={next} onClose={() => setOpen(null)} />}
      {open === "recording" && <RecordingModal recording={rec} onClose={() => setOpen(null)} />}
    </section>
  );
}

// One card in the no-live panel. Both cards share this so they carry equal weight.
function Tile({ onClick, image, badge, play, tag, title, avatar, speaker, role, cta }: {
  onClick: () => void; image: string; badge: React.ReactNode; play?: boolean; tag: React.ReactNode;
  title: string; avatar: string; speaker: string; role: string; cta: string;
}) {
  return (
    <button type="button" onClick={onClick}
      className="lockable group relative flex items-stretch gap-3.5 overflow-hidden rounded-xl bg-white p-2.5 text-left text-ink transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,.35)]">
      <span className="relative aspect-video w-[40%] shrink-0 self-center overflow-hidden rounded-lg">
        <Image src={image} alt="" fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width:768px) 40vw, 200px" />
        {play && (
          <span className="absolute inset-0 grid place-items-center bg-black/20">
            <span className="grid size-8 place-items-center rounded-full bg-white/25 ring-1 ring-white/50 backdrop-blur-md transition group-hover:scale-110">
              <Play className="size-3.5 fill-white text-white" />
            </span>
          </span>
        )}
        <span className="absolute left-2 top-2">{badge}</span>
      </span>
      <LockBadge className="right-3 top-3 size-7" icon="size-3.5" />
      <span className="flex min-w-0 flex-1 flex-col py-0.5 pr-1">
        <span className="flex items-center gap-1.5 truncate text-[10px] font-bold uppercase tracking-[1px] text-brand">{tag}</span>
        <span className="mt-1 line-clamp-2 text-[15px] font-semibold leading-snug">{title}</span>
        <span className="mt-auto flex items-center gap-2 pt-2">
          <Image src={avatar} alt="" width={26} height={26} className="size-[26px] shrink-0 rounded-full object-cover" />
          <span className="min-w-0 leading-tight">
            <b className="block truncate text-[12px] font-semibold">{speaker}</b>
            <small className="block truncate text-[10px] text-dim">{role}</small>
          </span>
          <span className="ml-auto flex shrink-0 items-center text-[12px] font-semibold text-brand">
            {cta} <ChevronRight className="size-3.5 transition group-hover:translate-x-0.5" />
          </span>
        </span>
      </span>
    </button>
  );
}
