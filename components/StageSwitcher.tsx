"use client";

import { useEffect, useState } from "react";
import { setPreview, usePreview, type Stage } from "@/lib/access";
import { useReserved } from "@/lib/reserved";

const chips: { stage: Stage; label: string }[] = [
  { stage: "free", label: "48-hr free" },
  { stage: "ended", label: "₹499 due" },
  { stage: "blocked", label: "Year 1 fee due" },
];

// Demo/QA chips to jump between the three student stages and back.
// Shown in development, or anywhere the URL carries ?access=… .
export function StageSwitcher() {
  const { stage } = usePreview();
  const { resetPayment } = useReserved();
  const [show, setShow] = useState(false);
  useEffect(() => setShow(process.env.NODE_ENV !== "production" || new URLSearchParams(location.search).has("access")), []);
  if (!show) return null;

  return (
    <div role="group" aria-label="Preview student stage"
      className="fixed bottom-4 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-1 rounded-lg bg-ink/90 p-1 text-[12px] font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,.3)] ring-1 ring-white/10 backdrop-blur">
      <span className="hidden px-2.5 text-[10px] uppercase tracking-[1.2px] text-white/50 sm:block">Preview</span>
      {chips.map((c, i) => (
        <button key={c.stage} type="button" aria-pressed={stage === c.stage}
          onClick={() => { resetPayment(); setPreview(c.stage); }}
          className={`whitespace-nowrap rounded-md px-3 py-1.5 transition ${stage === c.stage ? "bg-brand text-white" : "text-white/75 hover:bg-white/10 hover:text-white"}`}>
          {i + 1} · {c.label}
        </button>
      ))}
    </div>
  );
}
