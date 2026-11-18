"use client";

import { createContext, useContext } from "react";
import { Lock, LockKeyhole } from "lucide-react";
import { showLockedPopup, useAccess, type Stage } from "@/lib/access";

const Locked = createContext(false);

// Wraps learning material. In the given stages every click or Enter/Space inside is
// swallowed and opens that stage's popup instead (₹499 seat, or Year 1 enrolment).
export function LockGate({ children, className = "", stages = ["ended", "blocked"] }:
  { children: React.ReactNode; className?: string; stages?: Stage[] }) {
  const stage = useAccess();
  const locked = stages.includes(stage);
  const stop = (e: React.SyntheticEvent) => { e.preventDefault(); e.stopPropagation(); showLockedPopup(stage); };
  return (
    <Locked.Provider value={locked}>
      <div data-locked={locked ? stage : undefined} className={`relative ${className}`}
        onClickCapture={locked ? stop : undefined}
        onKeyDownCapture={locked ? (e) => { if (e.key === "Enter" || e.key === " ") stop(e); } : undefined}>
        {children}
        {locked && stage === "blocked" && (
          // Hard lock: one clear label over the dimmed material. Clicks fall through to the gate.
          <span className="pointer-events-none absolute inset-0 z-[4] grid place-items-center p-4">
            <span className="flex items-center gap-2 rounded-full bg-ink/90 px-4 py-2 text-[12.5px] font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,.35)] ring-1 ring-white/10 backdrop-blur">
              <LockKeyhole className="size-4" /> Locked · Enrol in Year 1 to unlock
            </span>
          </span>
        )}
      </div>
    </Locked.Provider>
  );
}

// Lock pin on a clickable card. The card needs `relative lockable`; the pin stays vivid while the rest fades.
export function LockBadge({ className = "right-2 top-2 size-8", icon = "size-4" }: { className?: string; icon?: string }) {
  if (!useContext(Locked)) return null;
  return (
    <span aria-hidden className={`lock-badge absolute z-[3] grid place-items-center rounded-full bg-ink text-white shadow-[0_4px_14px_rgba(0,0,0,.35)] ring-2 ring-white ${className}`}>
      <Lock className={icon} />
    </span>
  );
}
