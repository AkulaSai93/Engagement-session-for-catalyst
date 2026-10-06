import { Calendar, CircleDot, Clock, Video } from "lucide-react";
import Image from "next/image";
import { liveSession as s } from "@/lib/data";

export function LiveBanner() {
  return (
    <div className="relative -mx-4 -mt-10 overflow-hidden bg-[#07070c] text-white sm:mx-0 sm:mt-0 sm:rounded-2xl">
      <div className="absolute inset-y-0 right-0 w-full sm:w-[60%]">
        <Image src={s.image} alt="" fill priority className="object-cover object-center" sizes="(max-width:640px) 100vw, 60vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07070c] via-[#07070c]/40 to-transparent" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(50%_90%_at_0%_100%,rgba(225,29,72,.35),transparent_70%)]" />

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
          <span className="flex items-center gap-1"><Calendar className="size-3" />{s.date}</span><span className="flex items-center gap-1"><Clock className="size-3" />{s.time}</span><span className="flex items-center gap-1"><CircleDot className="size-3" />Started {s.startedAgo}</span>
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
