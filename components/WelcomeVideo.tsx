"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import { welcomeVideo as w } from "@/lib/data";
import { Modal } from "./Modal";

// Used until a real welcome video is supplied (short CC0 clip from MDN).
const PLACEHOLDER = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const isEmbed = (url: string) => /youtube\.com|youtu\.be|vimeo\.com/.test(url);

// Full-bleed hero: the welcome film loops silently behind the copy; clicking opens it with sound.
export function WelcomeVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const [motion, setMotion] = useState(true);
  const src = w.videoUrl || PLACEHOLDER;
  const embed = isEmbed(src);

  // Respect "reduce motion": show the poster frame instead of a looping film.
  useEffect(() => {
    setMotion(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <>
      {/* Deliberately not a banner: the film loops inside a circle on the page background. */}
      <section className="mb-5 flex items-center gap-4 sm:gap-6">
        <button type="button" onClick={() => setOpen(true)} aria-label={`Play ${w.title}`}
          className="group relative shrink-0">
          {/* pulsing ring */}
          <span aria-hidden className="absolute -inset-1.5 animate-ping rounded-full bg-brand/20 [animation-duration:2.5s]" />
          <span className="relative block size-[92px] overflow-hidden rounded-full ring-[3px] ring-brand ring-offset-4 ring-offset-bg transition group-hover:ring-brand-2 sm:size-[132px]">
            {motion && !embed ? (
              <video ref={video} src={src} poster={w.poster} autoPlay muted loop playsInline
                className="size-full object-cover" />
            ) : (
              <Image src={w.poster} alt="" fill className="object-cover" sizes="132px" />
            )}
            <span className="absolute inset-0 bg-black/15 transition group-hover:bg-black/30" />
            <span className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-brand shadow-lg transition group-hover:scale-110 sm:size-11">
              <Play className="size-4 translate-x-px fill-current sm:size-5" />
            </span>
          </span>
          {motion && !embed && (
            <span onClick={toggleSound} role="button" tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && toggleSound(e as unknown as React.MouseEvent)}
              aria-label={muted ? "Unmute" : "Mute"}
              className="absolute -bottom-1 -right-1 grid size-7 place-items-center rounded-full border border-line bg-white text-ink shadow-md transition hover:bg-bg sm:size-8">
              {muted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
            </span>
          )}
        </button>

        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-brand">Start here</p>
          <h2 className="mt-1 text-[20px] font-extrabold leading-tight tracking-tight sm:text-[26px]">{w.title}</h2>
          <p className="mt-1 line-clamp-2 max-w-lg text-[12.5px] leading-snug text-muted sm:line-clamp-none sm:text-[13.5px]">{w.body}</p>
          <button type="button" onClick={() => setOpen(true)}
            className="mt-2 inline-flex flex-wrap items-center gap-x-1.5 whitespace-nowrap text-[13px] font-semibold text-brand transition hover:gap-x-2.5">
            Watch full video
            <span className="text-dim"><span className="hidden sm:inline">· {w.speaker} </span>· {w.duration}</span>
          </button>
        </div>
      </section>

      {open && (
        <Modal label={w.title} onClose={() => setOpen(false)} className="max-w-[900px]">
          <div className="relative aspect-video w-full bg-black">
            {embed ? (
              <iframe src={`${src}${src.includes("?") ? "&" : "?"}autoplay=1`} title={w.title}
                className="absolute inset-0 size-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
            ) : (
              <video src={src} poster={w.poster} controls autoPlay playsInline className="absolute inset-0 size-full" />
            )}
          </div>
          <div className="flex flex-wrap items-center gap-4 p-5 sm:p-6">
            <Image src={w.avatar} alt={w.speaker} width={44} height={44} className="size-11 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <b className="block text-[17px] font-bold">{w.title}</b>
              <small className="text-[13px] text-dim">{w.speaker} · {w.role} · {w.duration}</small>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
