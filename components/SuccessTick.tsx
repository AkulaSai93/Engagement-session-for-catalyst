"use client";

import { useEffect, useRef } from "react";
import { Lottie, type LottieHandle } from "lottie-react";

// The success.lottie animation, served from /public.
// It plays once and holds the drawn tick — the file's last frames fade the
// artwork out, so playback stops before them instead of ending on an empty box.
export function SuccessTick({ className = "size-14" }: { className?: string }) {
  const ref = useRef<LottieHandle>(null);
  useEffect(() => {
    const id = setTimeout(() => ref.current?.playSegments([25, 69]), 0);
    return () => clearTimeout(id);
  }, []);

  return (
    <span className={`block shrink-0 ${className}`} aria-hidden>
      <Lottie ref={undefined} lottieRef={ref} src="/lottie/success.json"
        className="h-full w-full [&_svg]:!h-full [&_svg]:!w-full" />
    </span>
  );
}
