import { Calendar, CircleDot, Clock, Video } from "lucide-react";
import Image from "next/image";
import { liveSession as s } from "@/lib/data";

export function LiveBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#07070c] text-white">
      <div className="absolute inset-y-0 right-0 w-full sm:w-[60%]">
        <Image src={s.image} alt="" fill priority className="object-cover object-center" sizes="(max-width:640px) 100vw, 60vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07070c] via-[#07070c]/40 to-transparent" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(50%_90%_at_0%_100%,rgba(225,29,72,.35),transparent_70%)]" />

      <div className="relative px-5 pb-3.5 pt-3.5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-2.5 py-1 text-[9px] font-bold tracking-[1px]">
          <span className="size-1.5 animate-blink rounded-full bg-white" /> LIVE NOW
        </span>
        {/* Mentor, top-right */}
        <div className="mt-2.5 flex w-max items-center gap-2.5 rounded-full sm:absolute sm:right-5 sm:top-3.5 sm:mt-0 border border-white/15 bg-black/40 py-1 pl-1 pr-3.5 backdrop-blur-md">
          <Image src={s.avatar} alt={s.speaker} width={34} height={34} className="size-[34px] rounded-full ring-2 ring-white/40" />
          <span className="leading-tight">
            <b className="block text-[12px]">{s.speaker}</b>
            <small className="text-[10px] text-zinc-300">{s.role}</small>
          </span>
        </div>
        <h1 className="mt-2.5 text-xl font-bold tracking-tight sm:text-[22px]">
          {s.title} <span className="text-brand-2">{s.titleAccent}</span>
        </h1>
        <div className="mt-1 flex flex-wrap gap-3 text-[10px] text-zinc-300">
          <span className="flex items-center gap-1"><Calendar className="size-3" />{s.date}</span><span className="flex items-center gap-1"><Clock className="size-3" />{s.time}</span><span className="flex items-center gap-1"><CircleDot className="size-3" />Started {s.startedAgo}</span>
        </div>
        <div className="mt-3 flex gap-2">
          <a href={s.href} className="flex items-center gap-1.5 rounded-xl bg-brand px-3.5 py-2 text-[11px] font-semibold shadow-[0_6px_20px_rgba(225,29,72,.45)] transition hover:bg-brand-2">
            <Video className="size-3.5" /> Join Live Session
          </a>
        </div>
        <div className="mt-3.5 h-0.5 overflow-hidden rounded bg-white/15">
          <div className="h-full bg-brand-2" style={{ width: `${s.progress}%` }} />
        </div>
      </div>
    </div>
  );
}
