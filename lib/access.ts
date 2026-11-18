"use client";

import { useEffect, useState } from "react";
import { freeAccess as fa } from "./data";
import { useReserved } from "./reserved";

const HOUR = 3_600_000;
export const ACCESS_END = new Date(fa.startedAt).getTime() + fa.hours * HOUR;
const EVENT = "catalyst:locked-click";

// Where the student is in the funnel:
//   free     – inside the 48-hour free window
//   ended    – free window over, ₹499 not paid       → sessions + recordings locked
//   paid     – ₹499 paid, inside the 10 extra days   → everything open
//   blocked  – 10 days over, Year 1 fee not paid     → all learning material locked + dimmed
//   enrolled – Year 1 fee paid                       → everything open
export type Stage = "free" | "ended" | "paid" | "blocked" | "enrolled";
const STAGES: Stage[] = ["free", "ended", "paid", "blocked", "enrolled"];

// ── Preview (demo/QA) ────────────────────────────────────────────────────────
// ?access=free|ended|paid|blocked|enrolled forces a stage; the preview chips switch it live.
const PREVIEW_EVENT = "catalyst:preview-change";
const pv = { stage: null as Stage | null, at: 0, read: false };

export function setPreview(stage: Stage) {
  Object.assign(pv, { stage, at: Date.now(), read: true });
  const url = new URL(location.href);
  url.searchParams.set("access", stage);
  history.replaceState(null, "", url);
  window.dispatchEvent(new Event(PREVIEW_EVENT));
}

// `at` is when the preview was picked, so a previewed 48-hour window counts down from then.
export function usePreview() {
  const [snap, setSnap] = useState({ stage: null as Stage | null, at: 0 });
  useEffect(() => {
    if (!pv.read) {
      const q = new URLSearchParams(location.search).get("access") as Stage | null;
      Object.assign(pv, { read: true, ...(q && STAGES.includes(q) ? { stage: q, at: Date.now() } : {}) });
    }
    const sync = () => setSnap({ stage: pv.stage, at: pv.at });
    sync();
    window.addEventListener(PREVIEW_EVENT, sync);
    return () => window.removeEventListener(PREVIEW_EVENT, sync);
  }, []);
  return snap;
}

export function useAccess(): Stage {
  const { reserved, reservedAt } = useReserved();
  const [now, setNow] = useState<number | null>(null);
  const preview = usePreview().stage;
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  const paid = fa.reserved || reserved;
  if (preview && !(paid && (preview === "free" || preview === "ended"))) return preview;
  if (fa.feePaid) return "enrolled";
  if (now === null) return paid ? "paid" : "free";
  if (paid) {
    const at = reservedAt ?? (fa.reservedAt ? Date.parse(fa.reservedAt) : null);
    return at !== null && now >= at + fa.extraDays * 24 * HOUR ? "blocked" : "paid";
  }
  return now < ACCESS_END ? "free" : "ended";
}

// A locked element was clicked; the popup for that stage opens (ended → ₹499, blocked → Enrol).
export const showLockedPopup = (stage: Stage) => window.dispatchEvent(new CustomEvent(EVENT, { detail: stage }));
export function onLockedPopup(fn: (stage: Stage) => void) {
  const h = (e: Event) => fn((e as CustomEvent<Stage>).detail);
  window.addEventListener(EVENT, h);
  return () => window.removeEventListener(EVENT, h);
}
