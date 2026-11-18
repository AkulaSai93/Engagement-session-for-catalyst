"use client";

import { LockKeyhole } from "lucide-react";
import { accessNote, freeAccess as fa } from "@/lib/data";
import { Modal } from "./Modal";

// Shown when a locked session / recording is clicked after the free window.
export function AccessEnded({ onClose, onReserve }: { onClose: () => void; onReserve: () => void }) {
  return (
    <Modal label="Free access has ended" onClose={onClose} className="max-w-[400px] rounded-lg!"
      closeClassName="size-8 text-dim hover:bg-bg hover:text-ink">
      <div className="px-7 pb-6 pt-8 text-center">
        <span className="relative mx-auto grid size-14 place-items-center">
          <span aria-hidden className="absolute inset-0 rounded-full bg-brand/15 blur-md" />
          <span className="relative grid size-14 place-items-center rounded-full bg-gradient-to-b from-brand-2 to-brand text-white shadow-[0_6px_16px_rgba(225,29,72,.35),inset_0_1px_0_rgba(255,255,255,.35)] ring-4 ring-brand/10">
            <LockKeyhole className="size-6" strokeWidth={2.25} />
          </span>
        </span>
        <h2 className="mt-4 text-[20px] font-bold leading-tight tracking-tight">
          Your {fa.hours}-hour free access has ended
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-muted">
          Continue learning with access to recorded sessions and live classes for just{" "}
          <span className="font-semibold text-ink">₹{fa.price}*</span>.
        </p>
        <button type="button" onClick={onReserve}
          className="mt-6 w-full rounded-md bg-brand py-3 text-[15px] font-semibold text-white transition hover:bg-brand-2">
          Reserve seat for ₹{fa.price}
        </button>
        <p className="mt-4 border-t border-line pt-4 text-[11px] leading-snug text-dim">{accessNote}</p>
      </div>
    </Modal>
  );
}
