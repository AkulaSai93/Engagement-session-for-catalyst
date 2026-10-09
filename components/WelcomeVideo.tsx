"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Play, Volume2, VolumeX, X } from "lucide-react";
import { welcomeVideo as w } from "@/lib/data";
import { Modal } from "./Modal";

// Used until a real welcome video is supplied (short CC0 clip from MDN).
const PLACEHOLDER = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const isEmbed = (url: string) => /youtube\.com|youtu\.be|vimeo\.com/.test(url);

// Full-bleed hero: the welcome film loops silently behind the copy; clicking opens it with sound.
export function WelcomeVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [muted, setMuted] = useState(true);
  const [motion, setMotion] = useState(true);
  const src = w.videoUrl || PLACEHOLDER;
  const embed = isEmbed(src);

  // Respect "reduce motion": show the poster frame instead of a looping film.
  useEffect(() => {
    setMotion(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    try { setHidden(sessionStorage.getItem("catalyst:welcome-hidden") === "1"); } catch { /* private mode */ }
  }, []);

  // Some browsers ignore the autoplay attribute; nudge it explicitly (muted autoplay is allowed).
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const start = () => { v.muted = true; v.play().catch(() => {}); };
    start();
    v.addEventListener("canplay", start);
    document.addEventListener("visibilitychange", start);
    return () => { v.removeEventListener("canplay", start); document.removeEventListener("visibilitychange", start); };
  }, [motion, hidden]);

  const expand = () => {
    setHidden(false);
    try { sessionStorage.removeItem("catalyst:welcome-hidden"); } catch { /* private mode */ }
  };

  const collapse = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHidden(true);
    // Session-only: it comes back on the next page load.
    try { sessionStorage.setItem("catalyst:welcome-hidden", "1"); } catch { /* private mode */ }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  // Collapsed: shrink to a play bubble in the same corner instead of disappearing.
  if (hidden) {
    return (
      <button type="button" onClick={expand} aria-label="Show welcome video"
        className="group fixed bottom-2 right-2 z-30 grid size-[92px] place-items-center transition hover:scale-105 sm:bottom-4 sm:right-4 sm:size-[112px]">
        {/* the film keeps playing inside the bubble, with its name orbiting around it */}
        <svg viewBox="0 0 100 100" aria-hidden
          className="absolute inset-0 size-full animate-[ring-spin_16s_linear_infinite] text-brand [animation-play-state:running] group-hover:[animation-duration:6s]">
          <defs>
            <path id="welcome-ring" fill="none" d="M50,50 m-39,0 a39,39 0 1,1 78,0 a39,39 0 1,1 -78,0" />
          </defs>
          <text className="fill-current text-[9.5px] font-extrabold uppercase tracking-[2px]">
            <textPath href="#welcome-ring" startOffset="0">Welcome to Catalyst · Start here ·&#160;</textPath>
          </text>
        </svg>

        <span className="relative block size-[58px] overflow-hidden rounded-full shadow-[0_8px_24px_rgba(225,29,72,.45)] ring-2 ring-brand sm:size-[70px]">
          {motion && !embed ? (
            <video ref={video} src={src} poster={w.poster} autoPlay muted loop playsInline className="size-full object-cover" />
          ) : (
            <Image src={w.poster} alt="" fill className="object-cover" sizes="70px" />
          )}
          <span className="absolute inset-0 grid place-items-center bg-black/35 transition group-hover:bg-black/15">
            <Play className="size-4 translate-x-px fill-white text-white drop-shadow sm:size-5" />
          </span>
        </span>
      </button>
    );
  }

  return (
    <>
      {/* Floats at the bottom-right of the screen, playing silently, until dismissed. */}
      <button type="button" onClick={() => setOpen(true)} aria-label={`Play ${w.title}`}
        className="group fixed bottom-3 right-3 z-30 w-[132px] overflow-hidden rounded-xl shadow-[0_10px_34px_rgba(0,0,0,.5)] ring-1 ring-white/20 transition hover:ring-white/50 sm:bottom-5 sm:right-5 sm:w-[224px]">
        <span className="relative block aspect-video">
          {motion && !embed ? (
            <video ref={video} src={src} poster={w.poster} autoPlay muted loop playsInline className="size-full object-cover" />
          ) : (
            <Image src={w.poster} alt="" fill className="object-cover" sizes="224px" />
          )}
          <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* label pill */}
          <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1.5 rounded-full bg-black/55 px-2 py-1 text-[8.5px] font-bold uppercase tracking-[1px] text-white backdrop-blur transition group-hover:bg-brand sm:bottom-2.5 sm:left-2.5 sm:gap-2 sm:px-2.5 sm:text-[10px]">
            <Play className="size-2.5 fill-current sm:size-3" /> {w.title}
          </span>

          <span onClick={collapse} role="button" tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && collapse(e as unknown as React.MouseEvent)}
            aria-label="Minimise welcome video"
            className="absolute left-1.5 top-1.5 grid size-6 place-items-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black/80 sm:left-2.5 sm:top-2.5 sm:size-7">
            <X className="size-3 sm:size-3.5" />
          </span>
          {motion && !embed && (
            <span onClick={toggleSound} role="button" tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && toggleSound(e as unknown as React.MouseEvent)}
              aria-label={muted ? "Unmute" : "Mute"}
              className="absolute right-1.5 top-1.5 grid size-6 place-items-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black/80 sm:right-2.5 sm:top-2.5 sm:size-7">
              {muted ? <VolumeX className="size-3 sm:size-3.5" /> : <Volume2 className="size-3 sm:size-3.5" />}
            </span>
          )}
        </span>
      </button>

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
