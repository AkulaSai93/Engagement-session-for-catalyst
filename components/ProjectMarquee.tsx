"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { semesterProjects } from "@/lib/data";

// Figma: Catalyst › Semester 1–4 project strips. Scrolls continuously; pauses on hover/touch.
export function ProjectMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const SPEED = 36; // px per second
    let pos = 0;
    let last = performance.now();
    let raf = requestAnimationFrame(function tick(now) {
      // The list is rendered twice; once past the first copy, jump back by its width.
      const first = el.children[0] as HTMLElement;
      const copy = el.children[semesterProjects.length] as HTMLElement | undefined;
      const half = copy ? copy.offsetLeft - first.offsetLeft : el.scrollWidth / 2;
      if (paused.current) pos = el.scrollLeft;
      else pos += (SPEED * (now - last)) / 1000;
      if (pos >= half) pos -= half;
      if (!paused.current) el.scrollLeft = pos;
      last = now;
      raf = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const hold = (v: boolean) => () => { paused.current = v; };

  return (
    <div
      ref={ref}
      onMouseEnter={hold(true)} onMouseLeave={hold(false)}
      onFocus={hold(true)} onBlur={hold(false)} onTouchStart={hold(true)}
      className="no-scrollbar -mx-4 flex gap-[18px] overflow-x-auto px-4 [mask-image:linear-gradient(to_right,transparent,#000_24px,#000_calc(100%-24px),transparent)] sm:mx-0 sm:px-0"
    >
      {[...semesterProjects, ...semesterProjects].map((p, i) => (
        <article key={i} aria-hidden={i >= semesterProjects.length || undefined}
          className="group flex w-[270px] shrink-0 flex-col gap-4 rounded-[11px] bg-bg p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,15,30,.10)] sm:w-[314px]">
          <div className="relative h-[150px] overflow-hidden rounded-[10px] sm:h-[179px]" style={{ background: p.bg }}>
            <Image src={p.image} alt="" fill className="object-cover transition duration-500 group-hover:scale-105" sizes="314px" />
          </div>
          <div>
            <h3 className="line-clamp-2 text-[13px] font-medium leading-snug tracking-[-0.31px] text-[#1E2022]">{p.title}</h3>
            <p className="mt-2 line-clamp-3 text-[11.5px] leading-snug text-[#1E2022]/75">{p.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
