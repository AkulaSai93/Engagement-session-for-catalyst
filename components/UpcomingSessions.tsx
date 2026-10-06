"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { upcoming } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";
import { CompanyLogos } from "./CompanyLogos";
import { SessionModal } from "./SessionModal";

export function UpcomingSessions() {
  const ref = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const [open, setOpen] = useState<number | null>(null);
  const setPaused = (v: boolean) => { paused.current = v; };

  // Arrow buttons: jump one card; the loop below keeps the position seamless.
  const scroll = (dir: number) => {
    const el = ref.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    paused.current = true;
    el.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: "smooth" });
    setTimeout(() => { paused.current = false; }, 700);
  };

  // Continuous marquee. Cards are rendered twice, so once we pass the first set
  // we jump back by its width without any visible change.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const SPEED = 40; // px per second
    let pos = el.scrollLeft;
    let last = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      // Distance from a card to its copy in the second set (includes the gap).
      const first = el.children[0] as HTMLElement;
      const copy = el.children[upcoming.length] as HTMLElement;
      const half = copy.offsetLeft - first.offsetLeft;
      // Hold still while hovered or while the session popup is open.
      const hold = paused.current || document.body.style.overflow === "hidden";
      if (hold) pos = el.scrollLeft;
      else pos += (SPEED * (now - last)) / 1000;
      if (pos >= half) pos -= half;
      if (pos < 0) pos += half;
      if (!hold) el.scrollLeft = pos;
      last = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const arrow = "grid size-10 place-items-center rounded-full border border-line bg-white text-lg transition hover:border-brand/40";

  return (
    <section className="pt-7">
      <SectionHeader eyebrow="Live Sessions" lead="This week:" title="Upcoming Sessions"
        action={
          <div className="flex gap-3">
            <button aria-label="Previous" onClick={() => scroll(-1)} className={arrow}><ChevronLeft className="size-5" /></button>
            <button aria-label="Next" onClick={() => scroll(1)} className={arrow}><ChevronRight className="size-5" /></button>
          </div>
        }
      />
      <div ref={ref}
        onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        className="no-scrollbar grid [mask-image:linear-gradient(to_right,transparent,#000_24px,#000_calc(100%-24px),transparent)] auto-cols-[78%] grid-flow-col gap-5 overflow-x-auto sm:auto-cols-[42%] lg:auto-cols-[280px]">
        {[...upcoming, ...upcoming].map((u, i) => (
          <article key={i} aria-hidden={i >= upcoming.length || undefined}
            role="button" tabIndex={i >= upcoming.length ? -1 : 0}
            onClick={() => setOpen(i % upcoming.length)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setOpen(i % upcoming.length))} className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,15,30,.08)]">
            <div className="relative aspect-video">
              <Image src={u.image} alt="" fill className="object-cover" sizes="280px" />
            </div>
            <div className="flex flex-1 flex-col px-3 pb-3 pt-3">
              <h4 className="mb-2.5 line-clamp-2 text-[14px] font-medium leading-tight">{u.title}</h4>
              <div className="mt-auto flex items-center gap-2.5 border-t border-line pt-2.5">
                <Image src={u.avatar} alt={u.speaker} width={28} height={28} className="size-7 shrink-0 rounded-full" />
                <div className="min-w-0 flex-1">
                  <b className="block truncate text-[12px] font-semibold">{u.speaker}</b>
                  <small className="block truncate text-[10px] text-dim">{u.role}</small>
                </div>
                <span className="shrink-0 rounded-md bg-brand/8 px-1.5 py-1 text-[10px] font-medium text-brand">{u.day} {u.time}</span>
              </div>
              <div className="mt-2 rounded-lg bg-bg px-2 py-1.5">
                <p className="mb-1 text-[8px] font-semibold uppercase tracking-[1px] text-dim">Mentors from</p>
                <CompanyLogos logos={u.logos} nowrap className="justify-between gap-x-1.5 [&_img]:max-w-[44px]" />
              </div>
            </div>
          </article>
        ))}
      </div>
      {open !== null && <SessionModal session={upcoming[open]} onClose={() => setOpen(null)} />}
    </section>
  );
}
