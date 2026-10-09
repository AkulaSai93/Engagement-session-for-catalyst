"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const stack: symbol[] = [];

// Shared popup shell: dark backdrop, Esc / backdrop click to close, page scroll locked while open.
export function Modal({
  label, onClose, className = "max-w-[760px]", closeClassName = "bg-black/50 text-white hover:bg-black/70", overlayClassName = "p-4", scrollClassName = "max-h-[calc(100vh-2rem)]", children,
}: { label: string; onClose: () => void; className?: string; closeClassName?: string; overlayClassName?: string; scrollClassName?: string; children: React.ReactNode }) {
  useEffect(() => {
    // Only the top-most open popup reacts to Esc (e.g. a player opened over "View all").
    const id = Symbol();
    stack.push(id);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && stack[stack.length - 1] === id && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      stack.splice(stack.indexOf(id), 1);
    };
  }, [onClose]);

  // Render at <body> level so the popup is never trapped under a parent's stacking/overflow (e.g. the sticky header).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={label} onClick={onClose}
      className={`fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm animate-[fade_.2s_ease-out] ${overlayClassName}`}>
      <div onClick={(e) => e.stopPropagation()}
        className={`relative w-full overflow-hidden rounded-2xl bg-white shadow-2xl animate-[pop_.25s_ease-out] ${className}`}>
        <button aria-label="Close" onClick={onClose} autoFocus
          className={`absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full backdrop-blur transition ${closeClassName}`}>
          <X className="size-5" />
        </button>
        {/* Only the content scrolls, so the close button stays put. */}
        <div className={`overflow-y-auto ${scrollClassName}`}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
