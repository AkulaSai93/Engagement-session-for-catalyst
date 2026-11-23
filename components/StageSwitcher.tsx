"use client";

import { setPreview, usePreview, type Stage } from "@/lib/access";
import { useReserved } from "@/lib/reserved";
import { setLivePreview, useLive } from "@/lib/live";

const chips: { stage: Stage; label: string; short: string }[] = [
  { stage: "free", label: "48-hr free", short: "Free" },
  { stage: "ended", label: "₹499 due", short: "₹499" },
  { stage: "paid", label: "₹499 paid", short: "Paid" },
  { stage: "blocked", label: "Year 1 fee due", short: "Year 1" },
];

// Demo/QA chips to jump between the student stages and back.
// Always shown while this is a demo site. Remove <StageSwitcher /> from app/page.tsx before real students use it.
export function StageSwitcher() {
  const { stage } = usePreview();
  const { resetPayment } = useReserved();
  const live = useLive();
  return (
    <div role="group" aria-label="Preview student stage"
      className="no-scrollbar fixed bottom-4 left-1/2 z-[60] flex max-w-[calc(100vw-2rem)] -translate-x-1/2 overflow-x-auto items-center gap-1 rounded-lg bg-ink/90 p-1 text-[12px] font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,.3)] ring-1 ring-white/10 backdrop-blur">
      <span className="hidden px-2.5 text-[10px] uppercase tracking-[1.2px] text-white/50 sm:block">Preview</span>
      {chips.map((c, i) => (
        <button key={c.stage} type="button" aria-pressed={stage === c.stage}
          onClick={() => { resetPayment(); setPreview(c.stage); }}
          className={`whitespace-nowrap rounded-md px-2.5 py-1.5 transition sm:px-3 ${stage === c.stage ? "bg-brand text-white" : "text-white/75 hover:bg-white/10 hover:text-white"}`}>
          {i + 1} · <span className="sm:hidden">{c.short}</span><span className="hidden sm:inline">{c.label}</span>
        </button>
      ))}
      <span aria-hidden className="mx-1 h-5 w-px bg-white/15" />
      <button type="button" aria-pressed={live} onClick={() => setLivePreview(!live)}
        className="flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-white/75 transition hover:bg-white/10 hover:text-white">
        <span className={`size-2 rounded-full ${live ? "animate-blink bg-brand-2" : "bg-white/30"}`} /> Live {live ? "on" : "off"}
      </button>
    </div>
  );
}
