"use client";

import { useEffect, useRef } from "react";
import { Lottie, type LottieHandle } from "lottie-react";

// The success.lottie animation, served from /public.
// It plays once and then parks on the frame where the badge is fully drawn —
// the file loops back to an empty burst straight after, so it is pinned there.
const LAST = 68;

export function SuccessTick({ className = "size-14" }: { className?: string }) {
  const ref = useRef<LottieHandle>(null);
  useEffect(() => {
    const play = setTimeout(() => ref.current?.play(), 0);
    const hold = setTimeout(() => { ref.current?.seek(LAST); ref.current?.pause(); }, 1600);
    return () => { clearTimeout(play); clearTimeout(hold); };
  }, []);

  return (
    <span className={`block shrink-0 ${className}`} aria-hidden>
      <Lottie lottieRef={ref} src="/lottie/success.json"
        className="h-full w-full [&_svg]:!h-full [&_svg]:!w-full" />
    </span>
  );
}
