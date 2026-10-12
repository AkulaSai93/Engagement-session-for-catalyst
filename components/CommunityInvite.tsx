"use client";

import { community as c, freeAccess as fa } from "@/lib/data";
import { Modal } from "./Modal";
import { WhatsApp } from "./WhatsAppIcon";
import { SuccessTick } from "./SuccessTick";

// Shown right after payment succeeds. Closing it leaves the invite on the page (JoinCommunity).
// Left-aligned and editorial — a receipt, not a celebration card.
export function CommunityInvite({ onClose }: { onClose: () => void }) {
  return (
    <Modal label="Payment successful" onClose={onClose} className="max-w-[560px]"
      closeClassName="bg-black/5 text-ink hover:bg-black/10">
      <div className="px-7 pb-6 pt-7 sm:px-9">
        {/* confirmation, centred */}
        <div className="text-center">
          <SuccessTick className="mx-auto size-[88px]" />
          <span className="mt-0.5 block text-[10.5px] font-bold uppercase tracking-[1.6px] text-[#128C4A]">
            Payment successful
          </span>
          <h2 className="mt-2 text-[34px] font-extrabold leading-[0.95] tracking-[-1.6px] text-brand">
            You&apos;re in.
          </h2>
          <p className="mx-auto mt-2 max-w-[360px] text-[13.5px] leading-relaxed text-muted">{c.body}</p>
        </div>

        {/* receipt line */}
        <div className="mt-5 flex items-center justify-between border-y border-dashed border-line py-2.5 text-[11px] font-bold uppercase tracking-[1.2px]">
          <span className="text-dim">Seat reserved</span>
          <span>₹{fa.price} paid</span>
        </div>

        {/* steps as a timeline */}
        <ol className="relative mt-5 space-y-4 before:absolute before:bottom-2 before:left-[9px] before:top-2 before:w-px before:bg-line">
          {c.steps.map((s, i) => (
            <li key={s.title} className="relative flex gap-3.5">
              <span className="z-10 mt-0.5 grid size-[19px] shrink-0 place-items-center rounded-full bg-brand text-[10px] font-bold text-white">
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-[13.5px] font-bold leading-snug">{s.title}</span>
                <span className="mt-0.5 block text-[12.5px] leading-snug text-muted">{s.body}</span>
              </span>
            </li>
          ))}
        </ol>

        <button type="button" onClick={onClose}
          className="mt-5 text-[12.5px] font-semibold text-dim transition hover:text-ink">
          I&apos;ll join later
        </button>
      </div>

      {/* the invite, as a full-bleed bar across the bottom edge */}
      <a href={c.href} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-3 bg-[#25D366] px-6 py-4 text-white transition hover:brightness-95 sm:px-7">
        <WhatsApp className="size-6 shrink-0" />
        <span className="min-w-0 flex-1">
          <span className="block text-[14.5px] font-bold leading-tight">{c.cta}</span>
          <span className="block text-[11.5px] leading-tight text-white/80">{c.ctaTitle}</span>
        </span>
        <span aria-hidden className="text-[18px] font-bold">→</span>
      </a>
    </Modal>
  );
}
