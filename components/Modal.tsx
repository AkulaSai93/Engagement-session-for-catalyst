"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

// Shared popup shell: dark backdrop, Esc / backdrop click to close, page scroll locked while open.
export function Modal({
  label, onClose, className = "max-w-[760px]", closeClassName = "bg-black/50 text-white hover:bg-black/70", children,
}: { label: string; onClose: () => void; className?: string; closeClassName?: string; children: React.ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label={label} onClick={onClose}
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm animate-[fade_.2s_ease-out]">
      <div onClick={(e) => e.stopPropagation()}
        className={`relative w-full overflow-hidden rounded-2xl bg-white shadow-2xl animate-[pop_.25s_ease-out] ${className}`}>
        <button aria-label="Close" onClick={onClose} autoFocus
          className={`absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full backdrop-blur transition ${closeClassName}`}>
          <X className="size-5" />
        </button>
        {/* Only the content scrolls, so the close button stays put. */}
        <div className="max-h-[calc(100vh-2rem)] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
