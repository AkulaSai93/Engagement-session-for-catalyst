"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CalendarDays, Check, ChevronDown, Clock } from "lucide-react";
import { allRecordings, type Recording } from "@/lib/data";
import { CompanyLogos } from "./CompanyLogos";
import { Modal } from "./Modal";
import { Assignments, Resources, SessionInfoCard } from "./SessionExtras";

// Used until a recording has its own `videoUrl` (short CC0 clip from MDN).
const PLACEHOLDER_VIDEO = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const isEmbed = (url: string) => /youtube\.com|youtu\.be|vimeo\.com/.test(url);
const withAutoplay = (url: string) => url + (url.includes("?") ? "&" : "?") + "autoplay=1";

// YouTube-style watch view: player + details on the left, "Up next" on the right.
export function RecordingModal({ recording, onClose }: { recording: Recording; onClose: () => void }) {
  const [r, setR] = useState(recording);
  const [more, setMore] = useState(false);
  const top = useRef<HTMLDivElement>(null);
  const src = r.videoUrl ?? PLACEHOLDER_VIDEO;
  const upNext = allRecordings.filter((x) => x !== r).slice(0, 8);

  // Switching video: collapse the description and jump back to the player.
  useEffect(() => {
    setMore(false);
    top.current?.scrollIntoView({ block: "start" });
  }, [r]);

  return (
    <Modal label={r.title} onClose={onClose} className="max-w-[1240px] bg-white" closeClassName="!top-2.5 bg-bg text-ink hover:bg-line">
      <div ref={top} className="flex h-14 items-center border-b border-line px-4 pr-16 sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-brand">● Recorded session</p>
      </div>
      <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Player + details */}
        <div className="min-w-0">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
            {isEmbed(src) ? (
              <iframe key={src} src={withAutoplay(src)} title={r.title} className="absolute inset-0 size-full"
                allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
            ) : (
              <video key={r.title + r.date} src={src} poster={r.image} controls autoPlay playsInline
                className="absolute inset-0 size-full bg-black" />
            )}
          </div>

          <h3 className="mt-4 text-[20px] font-semibold leading-snug tracking-tight">{r.title}</h3>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-3">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <Image src={r.avatar} alt={r.speaker} width={44} height={44} className="size-11 rounded-full object-cover" />
              <div className="min-w-0">
                <b className="block truncate text-[15px] font-semibold">{r.speaker}</b>
                <small className="block truncate text-[12px] text-dim">{r.role}</small>
              </div>
            </div>
            <div className="rounded-xl bg-bg px-3 py-2">
              <CompanyLogos logos={r.logos} />
            </div>
          </div>

          {/* Description box (expandable, like YouTube) */}
          <div className="mt-4 rounded-xl bg-bg p-4">
            <p className="flex flex-wrap gap-4 text-[13px] font-semibold">
              <span className="flex items-center gap-1.5"><CalendarDays className="size-4" />{r.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="size-4" />{r.duration}</span>
            </p>
            <p className={`mt-2 text-[14px] leading-relaxed text-muted ${more ? "" : "line-clamp-2"}`}>{r.description}</p>
            {more && (
              <>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[1.2px] text-dim">What you&apos;ll learn</p>
                <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                  {r.learn.map((l) => (
                    <li key={l} className="flex gap-2 text-[13px] leading-snug"><Check className="mt-0.5 size-4 shrink-0 text-brand" /> {l}</li>
                  ))}
                </ul>
                <p className="mt-4 text-[12px] text-dim">Connects to: {r.connects}</p>
              </>
            )}
            <button type="button" onClick={() => setMore((v) => !v)}
              className="mt-2 flex items-center gap-1 text-[13px] font-semibold transition hover:text-brand">
              {more ? "Show less" : "…more"} <ChevronDown className={`size-4 transition ${more ? "rotate-180" : ""}`} />
            </button>
          </div>

          <Assignments key={`a-${r.title}-${r.date}`} items={r.assignments ?? []} />
          <Resources items={r.resources ?? []} />
        </div>

        {/* Session details + Up next */}
        <aside className="min-w-0">
          <SessionInfoCard r={r} />
          <p className="mb-3 mt-5 text-[14px] font-semibold">Up next</p>
          <div className="flex flex-col gap-2.5">
            {upNext.map((x, i) => (
              <button key={i} type="button" onClick={() => setR(x)}
                className="flex gap-2.5 rounded-lg p-1 text-left transition hover:bg-bg">
                <span className="relative aspect-video w-[150px] shrink-0 overflow-hidden rounded-lg">
                  <Image src={x.image} alt="" fill className="object-cover" sizes="150px" />
                  <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 text-[10px] font-semibold text-white">{x.duration}</span>
                </span>
                <span className="min-w-0">
                  <b className="line-clamp-2 text-[13px] font-semibold leading-snug">{x.title}</b>
                  <small className="mt-1 block truncate text-[11px] text-dim">{x.speaker}</small>
                  <small className="block text-[11px] text-dim">{x.date}</small>
                </span>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </Modal>
  );
}
