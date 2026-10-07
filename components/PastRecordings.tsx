"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import Image from "next/image";
import { featuredRecording as f, recordings, type Recording } from "@/lib/data";
import { RecordingModal } from "./RecordingModal";
import { SectionHeader } from "./SectionHeader";
import { AllRecordings } from "./AllRecordings";
import { CompanyLogos } from "./CompanyLogos";

export function PastRecordings() {
  const [open, setOpen] = useState<Recording | null>(null);
  return (
    <section className="pt-8">
      <SectionHeader title="Past Recordings" sub="Missed one? Catch up:" subClass="text-brand" action={<AllRecordings onPlay={setOpen} />} />
      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-3">
          {recordings.slice(0, 3).map((r) => (
            <button type="button" key={r.title} onClick={() => setOpen(r)} className="flex flex-1 items-center text-left gap-3.5 rounded-xl border border-line bg-white p-2.5 transition hover:shadow-[0_8px_24px_rgba(15,15,30,.06)]">
              <div className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-lg sm:w-[112px]">
                <Image src={r.image} alt="" fill className="object-cover" sizes="112px" />
              </div>
              {/* Title + date (left) */}
              <div className="min-w-0 flex-1">
                <b className="line-clamp-2 text-[13px] font-semibold leading-snug">{r.title}</b>
                <p className="mt-1 flex items-center gap-1.5 text-[11px] text-dim">{r.date} · {r.duration}</p>
                <p className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium sm:hidden">
                  <Image src={r.avatar} alt="" width={18} height={18} className="size-[18px] rounded-full object-cover" /> {r.speaker}
                </p>
              </div>
              {/* Mentor (right) */}
              <div className="hidden w-[96px] shrink-0 flex-col items-center sm:flex gap-0.5 border-l border-line pl-3 text-center">
                <Image src={r.avatar} alt={r.speaker} width={28} height={28} className="size-7 rounded-full object-cover ring-2 ring-white shadow-[0_0_0_1px_var(--color-line)]" />
                <p className="w-full truncate text-[11px] font-semibold leading-tight">{r.speaker}</p>
                <CompanyLogos logos={r.logos} className="origin-top scale-90 justify-center gap-x-1.5 [&_img]:max-w-[34px]" />
              </div>
            </button>
          ))}
        </div>

        <button type="button" onClick={() => setOpen(f)} className="group relative order-first text-left flex min-h-[300px] items-end overflow-hidden rounded-xl p-5 text-white lg:order-last transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,15,30,.12)]">
          <Image src={f.image} alt="" fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width:1024px) 100vw, 40vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-black/90" />
          <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/20 text-brand backdrop-blur-md transition group-hover:scale-110"><Play className="size-5 fill-current" /></span>
          <div className="relative">
            <p className="text-[9px] font-bold uppercase tracking-[2px] text-brand-2">Recent session</p>
            <h4 className="mt-1 text-lg font-semibold">{f.title}</h4>
            <div className="mt-3 flex items-center gap-3">
              <Image src={f.avatar} alt={f.speaker} width={56} height={56} className="size-14 shrink-0 rounded-full ring-2 ring-white/60" />
              <div>
                <p className="text-base font-semibold leading-tight text-white">{f.speaker}</p>
                <p className="mt-0.5 text-[12px] text-zinc-300">{f.date} · {f.duration}</p>
                <CompanyLogos logos={f.logos} className="mt-1.5 w-max rounded-md bg-white px-2 py-1" />
              </div>
            </div>
          </div>
        </button>
      </div>
      {open && <RecordingModal recording={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
