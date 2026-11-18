"use client";

import { useEffect, useState } from "react";

// Demo payment state: kept in memory only, so a reload returns to the unpaid start.
// TODO: back this with the real payment record once Razorpay is wired up.
const EVENT = "catalyst:reserved-change";
const state = { reserved: false, joined: false, reservedAt: null as number | null };
const emit = () => window.dispatchEvent(new Event(EVENT));

export function useReserved() {
  const [snap, setSnap] = useState(state);
  useEffect(() => {
    const sync = () => setSnap({ ...state });
    sync();
    // Keep every mounted copy (strip, popup, page invite) in step.
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);
  return {
    ...snap,
    reserve: () => { state.reserved = true; state.reservedAt = Date.now(); emit(); },
    markJoined: () => { state.joined = true; emit(); },
    // Preview chips: start the chosen stage as an unpaid student again.
    resetPayment: () => { state.reserved = false; state.reservedAt = null; emit(); },
  };
}
