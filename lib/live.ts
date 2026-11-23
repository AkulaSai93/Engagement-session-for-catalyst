"use client";

import { useEffect, useState } from "react";
import { liveSession } from "./data";

// Is a class live right now? From `liveSession.isLive`; the preview chips / ?live=0|1 can override it.
const EVENT = "catalyst:live-change";
const st = { live: null as boolean | null, read: false };

export function setLivePreview(live: boolean) {
  Object.assign(st, { live, read: true });
  const url = new URL(location.href);
  url.searchParams.set("live", live ? "1" : "0");
  history.replaceState(null, "", url);
  window.dispatchEvent(new Event(EVENT));
}

export function useLive() {
  const [live, setLive] = useState(liveSession.isLive);
  useEffect(() => {
    if (!st.read) {
      const q = new URLSearchParams(location.search).get("live");
      Object.assign(st, { read: true, live: q === "1" ? true : q === "0" ? false : null });
    }
    const sync = () => setLive(st.live ?? liveSession.isLive);
    sync();
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);
  return live;
}
