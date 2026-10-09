"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  BrainCircuit, CloudCog, Layers, SquareTerminal,
} from "lucide-react";
import { roadmap } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";
import { Car } from "./Car";

const N = roadmap.length;
// Card colours from the Figma "Beyond the classroom" grid: [background, tint, accent].
const TILE_COLORS: [string, string, string][] = [
  ["#FDEDED", "#F7D2D2", "#E7000B"], // red
  ["#EAF4EC", "#D3E8D8", "#16A34A"], // green
  ["#FDF2DF", "#F6E2BB", "#D97706"], // amber
  ["#F0EBFB", "#DDD3F4", "#7C3AED"], // purple
  ["#DFEAFD", "#CFDEFA", "#2563EB"], // blue
  ["#FFFFFF", "#ECEEF1", "#0A0A0B"], // white
];
// One icon per stage, in order (cycles if there are more stages).
// Matched to the semesters: foundations (terminal), full stack (layers), cloud engineering, AI + career.
const STAGE_ICONS = [SquareTerminal, Layers, CloudCog, BrainCircuit];
const PER_LOOP = 4; // stages per repeat of the road shape
const LOOPS = Math.ceil(N / PER_LOOP);
const LOOP_H = 640; // px height of one repeat
const CAP = 24;
const R = 34; // corner radius (wide enough for a road to turn)
const H = LOOPS * LOOP_H + CAP * 2 + 40; // + room for the finish line

// One repeat of the hand-drawn road (x and y as fractions of width / loop height).
// Down → short jog right → long swing left → across → back UP → far right → down → back to centre.
const LOOP: [number, number][] = [
  [0.4, 0], [0.4, 0.2], [0.55, 0.2], [0.55, 0.4], [0.15, 0.4], [0.15, 0.68],
  [0.7, 0.68], [0.7, 0.4], [0.85, 0.4], [0.85, 0.86], [0.4, 0.86], [0.4, 1],
];

// Polyline → path with rounded corners.
function rounded(pts: [number, number][]) {
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1], [x, y] = pts[i], [nx, ny] = pts[i + 1];
    const r1 = Math.min(R, Math.hypot(x - px, y - py) / 2), r2 = Math.min(R, Math.hypot(nx - x, ny - y) / 2);
    const ax = x - Math.sign(x - px) * r1, ay = y - Math.sign(y - py) * r1;
    const bx = x + Math.sign(nx - x) * r2, by = y + Math.sign(ny - y) * r2;
    d += ` L ${ax} ${ay} Q ${x} ${y}, ${bx} ${by}`;
  }
  const [lx, ly] = pts[pts.length - 1];
  return d + ` L ${lx} ${ly}`;
}

function buildPath(w: number) {
  const pts: [number, number][] = [[0.4 * w, 0]];
  for (let l = 0; l < LOOPS; l++)
    for (const [x, y] of LOOP.slice(1)) pts.push([x * w, CAP + (l + y) * LOOP_H]);
  pts.push([0.4 * w, H]);
  return rounded(pts);
}

export function Roadmap() {
  const track = useRef<HTMLDivElement>(null);
  const pathEl = useRef<SVGPathElement>(null);
  const [w, setW] = useState(0);
  const [len, setLen] = useState(0);
  const [stops, setStops] = useState<{ x: number; y: number; t: number }[]>([]);
  const [progress, setProgress] = useState(0); // 0..1 along the road, eased toward the scroll position
  const target = useRef(0);
  const shown = useRef(0); // progress currently drawn
  const [hover, setHover] = useState<number | null>(null);
  const [driving, setDriving] = useState(false);
  const [car, setCar] = useState({ x: 0, y: 0, angle: 90 });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const wide = w >= 640;
  const d = wide ? buildPath(w) : `M 20 0 V ${N * 110 + CAP}`;
  const height = wide ? H : undefined;

  // Place stages at equal distances along the road.
  useLayoutEffect(() => {
    const p = pathEl.current;
    if (!p || !w) return;
    const L = p.getTotalLength();
    setLen(L);
    setStops(roadmap.map((_, i) => {
      const t = (i + 0.5) / N;
      const pt = p.getPointAtLength(t * L);
      return { x: pt.x, y: pt.y, t };
    }));
  }, [d, w]);

  // Fill is tied to scroll position over the track's own on-screen range, so it never jumps.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = track.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const y = window.scrollY;
      const docTop = r.top + y;
      const maxScroll = document.documentElement.scrollHeight - vh;
      // The road fills as it passes the middle of the screen: 0 when its top reaches the
      // middle (i.e. you've arrived at the section), 1 when its bottom gets there.
      const LINE = vh * 0.55;
      const start = docTop - LINE;
      const end = Math.min(docTop + r.height - LINE, maxScroll - 8); // finish just before the page bottom
      target.current = Math.min(1, Math.max(0, (y - start) / Math.max(1, end - start)));
      if (!ease) ease = requestAnimationFrame(glide);
    };
    let idle: ReturnType<typeof setTimeout>;
    // Ease the car toward the target so it glides instead of jumping with each wheel tick.
    let ease = 0;
    const glide = () => {
      ease = 0;
      // Follow the scroll directly — only a light smoothing so wheel ticks don't look jumpy.
      const p = shown.current;
      const next = Math.abs(target.current - p) < 0.0005 ? target.current : p + (target.current - p) * 0.35;
      shown.current = next;
      setProgress(next);
      if (next !== target.current) ease = requestAnimationFrame(glide);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
      setDriving(true);
      clearTimeout(idle);
      idle = setTimeout(() => setDriving(false), 180); // engine idles when scrolling stops
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); cancelAnimationFrame(ease); };
  }, []);

  // Car sits at the current progress point, turned to follow the road.
  useEffect(() => {
    const p = pathEl.current;
    if (!p || !len) return;
    const at = Math.min(len - 1, Math.max(1, progress * len));
    const back = p.getPointAtLength(Math.max(0, at - 4)), ahead = p.getPointAtLength(Math.min(len, at + 4));
    const pt = p.getPointAtLength(at);
    setCar({ x: pt.x, y: pt.y, angle: (Math.atan2(ahead.y - back.y, ahead.x - back.x) * 180) / Math.PI });
  }, [progress, len]);

  const reached = (i: number) => !!stops[i] && progress >= stops[i].t;

  return (
    <section className="pb-10 pt-10 sm:pb-40">
      <SectionHeader title={`${N} semester, one clear path`} sub="2-year Roadmap" titleClass="text-brand !text-[26px]" subClass="!text-[15px] text-muted" />

      {/* Map-like backdrop: soft colour glows over a faint dot grid */}
      <div className="relative mt-8 overflow-hidden rounded-[28px] border border-line bg-white px-5 pb-8 pt-8 sm:px-10 sm:pb-24 sm:pt-14">
        <div aria-hidden className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(15,15,30,.09)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div aria-hidden className="pointer-events-none absolute -left-24 top-10 size-[420px] rounded-full bg-[#FDEDED] opacity-80 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-24 top-1/3 size-[420px] rounded-full bg-[#DFEAFD] opacity-80 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/4 size-[420px] rounded-full bg-[#F0EBFB] opacity-80 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-20 -right-10 size-[360px] rounded-full bg-[#EAF4EC] opacity-80 blur-3xl" />
      <div ref={track} className="relative" style={{ height }}>
        {wide && (
          <svg width={w} height={height} className="absolute inset-0 overflow-visible">
            <defs>
              <linearGradient id="road-fill" x1="0" y1="0" x2="0" y2={height} gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#FF3B5C" />
                <stop offset="1" stopColor="#E11D48" />
              </linearGradient>
            </defs>
            {/* Asphalt with soft edges */}
            <path d={d} fill="none" stroke="rgba(15,15,30,.08)" strokeWidth="34" strokeLinecap="round" strokeLinejoin="round" />
            <path ref={pathEl} d={d} fill="none" stroke="#3B3B46" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
            {/* Stretch already walked glows red */}
            <path d={d} fill="none" stroke="url(#road-fill)" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray={len || 1} strokeDashoffset={(len || 1) * (1 - progress)}
              style={{ filter: "drop-shadow(0 0 10px rgba(225,29,72,.45))", opacity: len ? 0.92 : 0 }} />
            {/* Dashed centre line */}
            <path d={d} fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="10 12" strokeLinecap="round" opacity=".9" />
          </svg>
        )}

        {/* Finish line at the end of the road */}
        {wide && w > 0 && (
          <div className={`pointer-events-none absolute z-[5] ${progress >= 0.995 ? "finished" : ""}`} style={{ left: 0.4 * w, top: H - 28 }}>
            {/* chequered strip across the road */}
            <span className="absolute -left-[17px] top-0 h-2.5 w-[34px] rounded-[2px]"
              style={{ background: "repeating-conic-gradient(#111 0 25%, #fff 0 50%) 0 0 / 10px 10px" }} />
            {/* label below the road's end, under the car */}
            <span className={`absolute left-0 top-[52px] -translate-x-1/2 whitespace-nowrap text-center text-[11px] font-bold uppercase tracking-[1.5px] transition-colors ${progress >= 0.995 ? "text-brand" : "text-dim"}`}>
              Finish line
              <span className="block text-[11px] font-medium normal-case tracking-normal text-muted">
                {progress >= 0.995 ? "Two years done. Industry-ready." : `${N} semesters · 24 months`}
              </span>
            </span>
          </div>
        )}

        {wide && len > 0 && (
          <div className="pointer-events-none absolute left-0 top-0 z-10"
            style={{ transform: `translate(${car.x - 22}px, ${car.y - 12}px) rotate(${car.angle}deg)`, transformOrigin: "22px 12px" }}>
            <Car driving={driving} />
          </div>
        )}

        {wide && stops.map((p, i) => {
          const s = roadmap[i], lit = reached(i), now = s.status === "current", Icon = STAGE_ICONS[i % STAGE_ICONS.length];
          const [bg, tint, accent] = TILE_COLORS[i % TILE_COLORS.length];
          // Hover popup: title + description only
          const details = (
            <>
              <p className="text-[12px] font-semibold leading-snug">{s.title}</p>
              <p className="mt-1 text-[12px] leading-snug text-muted">{s.body}</p>
            </>
          );
          return (
            <div key={i} className={`absolute ${hover === i ? "z-30" : "z-20"}`} style={{ left: p.x, top: p.y }}
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
              {wide ? (
                // Tile sitting on the road: glassy outer frame, solid inner card with an icon
                <button type="button" onFocus={() => setHover(i)} onBlur={() => setHover(null)}
                  className={`-translate-x-1/2 -translate-y-1/2 rounded-[18px] border border-white/80 bg-white/55 p-1 backdrop-blur-md transition-all duration-500 ${
                    lit ? "scale-100 opacity-100" : "scale-95 opacity-70 saturate-50"
                  } ${now ? "ring-2 ring-brand ring-offset-2 ring-offset-bg" : ""}`}
                  style={{ boxShadow: lit ? `0 10px 28px ${accent}33, 0 0 0 1px ${accent}22` : "0 6px 20px rgba(15,15,30,.08)" }}>
                  <span className="relative flex h-[84px] w-[120px] flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-2 text-ink"
                    style={{ background: bg, border: bg === "#FFFFFF" ? "1px solid var(--color-line)" : undefined }}>
                    <span className="absolute left-2 top-1.5 text-[9px] font-bold" style={{ color: accent }}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="grid size-7 place-items-center rounded-full" style={{ background: tint, color: accent }}>
                      <Icon className="size-[14px]" />
                    </span>
                    <span className="line-clamp-3 text-center text-[10px] font-semibold leading-tight">{s.title}</span>
                  </span>
                </button>
              ) : (
                <button type="button"
                  className={`-translate-x-[14px] -translate-y-1/2 whitespace-nowrap rounded-lg border px-2.5 py-1 text-[12px] font-bold ${
                    lit ? "border-ink bg-ink text-white" : "border-line bg-white text-dim"}`}>
                  <span className={lit ? "text-brand-2" : ""}>{String(i + 1).padStart(2, "0")}</span>&nbsp; {s.title}
                </button>
              )}
              {wide ? (
                hover === i && (
                  <div className="absolute left-0 top-12 z-30 w-64 -translate-x-1/2 rounded-xl border border-line bg-white p-3 shadow-[0_12px_30px_rgba(15,15,30,.12)] animate-[pop_.15s_ease-out]">
                    {details}
                  </div>
                )
              ) : (
                <div className="ml-1 mt-1 w-[calc(100vw-120px)] max-w-sm">{details}</div>
              )}
            </div>
          );
        })}

        {/* Mobile: same road, car and coloured tiles — laid out as a straight road down the left */}
        {w > 0 && !wide && (
          <ol className="relative pb-14 pl-14">
            {/* asphalt */}
            <span className="absolute bottom-0 left-[8px] top-0 w-[26px] rounded-full bg-[#3B3B46] shadow-[0_0_0_4px_rgba(15,15,30,.06)]" />
            {/* stretch already driven */}
            <span className="absolute left-[8px] top-0 w-[26px] rounded-full"
              style={{ height: `${progress * 100}%`, background: "linear-gradient(#FF3B5C, #E11D48)", boxShadow: "0 0 14px rgba(225,29,72,.45)" }} />
            {/* dashed centre line */}
            <span className="absolute bottom-0 left-[20px] top-0 w-[2px]"
              style={{ background: "repeating-linear-gradient(#fff 0 10px, transparent 10px 22px)", opacity: 0.9 }} />
            {/* finish line */}
            <span className="absolute bottom-0 left-[8px] h-2.5 w-[26px]" style={{ background: "repeating-conic-gradient(#111 0 25%, #fff 0 50%) 0 0 / 9px 9px" }} />
            {/* car, nose pointing down the road */}
            <span className="pointer-events-none absolute left-[21px] z-20"
              style={{ top: `calc(${progress * 100}% - 12px)`, transform: "translate(-50%, 0) rotate(90deg)" }}>
              <Car driving={driving} />
            </span>

            {roadmap.map((s, i) => {
              const lit = progress * N >= i + 0.15;
              const now = s.status === "current";
              const Icon = STAGE_ICONS[i % STAGE_ICONS.length];
              const [, tint, accent] = TILE_COLORS[i % TILE_COLORS.length];
              return (
                <li key={i} className={`relative pb-8 transition-all duration-300 ${lit ? "opacity-100" : "opacity-45"}`}>
                  {/* stop marker on the road */}
                  <span className="absolute -left-[41px] top-4 z-10 size-3.5 rounded-full border-2 border-white"
                    style={{ background: lit ? accent : "#9CA3AF" }} />
                  {/* Big step number, then the details beside a thin rule */}
                  <p className="text-[44px] font-extrabold leading-none tracking-tight transition-colors duration-300"
                    style={{ color: lit ? accent : "rgba(15,15,30,.12)" }}>
                    {String(i + 1).padStart(2, "0")}<span style={{ color: lit ? tint : "rgba(15,15,30,.12)" }}>.</span>
                  </p>
                  <div className="mt-3 border-l-2 pl-4" style={{ borderColor: lit ? tint : "var(--color-line)" }}>
                    <p className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[10px] font-bold uppercase tracking-[1.2px]" style={{ color: lit ? accent : undefined }}>
                      <Icon className="size-3.5" /> Semester {s.sem}
                      {now && <span className="whitespace-nowrap text-brand">● You are here</span>}
                    </p>
                    <h4 className="mt-1 text-[17px] font-bold leading-snug">{s.title}</h4>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted">{s.body}</p>
                  </div>
                </li>
              );
            })}
            <li className="absolute -bottom-1 left-14 text-[11px] font-bold uppercase tracking-[1.5px]">
              <span className={progress >= 0.995 ? "text-brand" : "text-dim"}>Finish line</span>
              <span className="block text-[11px] font-medium normal-case tracking-normal text-muted">
                {progress >= 0.995 ? "Two years done. Industry-ready." : `${N} semesters · 24 months`}
              </span>
            </li>
          </ol>
        )}
      </div>
      </div>
    </section>
  );
}
