"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, LockKeyhole } from "lucide-react";
import { freeAccess as fa, seatBlocked as sb } from "@/lib/data";
import { onLockedPopup, useAccess } from "@/lib/access";
import { Modal } from "./Modal";

// Paid access (₹499 + 10 days) is over and the Year 1 fee isn't paid:
// a slim strip under the top bar, plus the enrol popup on arrival and on any locked click.
export function SeatBlocked() {
  const blocked = useAccess() === "blocked";
  const [open, setOpen] = useState(false);
  useEffect(() => { if (blocked) setOpen(true); }, [blocked]);
  useEffect(() => onLockedPopup((s) => s === "blocked" && setOpen(true)), []);
  if (!blocked) return null;

  return (
    <>
      <div className="bg-ink text-white">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-[52px]">
          <p className="flex min-w-0 items-center gap-2.5 text-[14px] leading-snug">
            <LockKeyhole className="size-4 shrink-0 text-brand-2" />
            <span><b className="font-bold">{sb.title}</b> <span className="text-white/70">Your learning access has expired.</span></span>
          </p>
          <div className="flex items-center gap-4">
            <span className="hidden text-[11px] text-white/55 md:block">{sb.note}</span>
            <a href={fa.enrolHref} className="flex items-center gap-1.5 rounded-md bg-brand px-4 py-2 text-[13px] font-semibold transition hover:bg-brand-2">
              {sb.cta} <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>

      {open && (
        <Modal label="Your seat is blocked" onClose={() => setOpen(false)} className="max-w-[460px] rounded-lg!"
          closeClassName="size-8 text-dim hover:bg-bg hover:text-ink">
          <div className="px-7 pb-6 pt-8">
            <span className="grid size-12 place-items-center rounded-full bg-brand text-white shadow-[0_6px_16px_rgba(225,29,72,.35),inset_0_1px_0_rgba(255,255,255,.35)] ring-4 ring-brand/10">
              <LockKeyhole className="size-5" strokeWidth={2.25} />
            </span>
            <h2 className="mt-4 text-[22px] font-bold leading-tight tracking-tight">
              {sb.title} <span className="text-brand">{sb.titleAccent}</span>
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">{sb.body}</p>

            <p className="mt-5 text-[13px] font-semibold">{sb.listTitle}</p>
            <ul className="mt-2.5 space-y-2">
              {sb.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[14px] leading-snug">
                  <span className="mt-px grid size-[18px] shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <p className="mt-5 border-t border-line pt-4 text-[14px] font-medium leading-snug">{sb.closing}</p>
            <a href={fa.enrolHref}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-brand py-3 text-[15px] font-semibold text-white transition hover:bg-brand-2">
              {sb.cta} <ArrowRight className="size-4" />
            </a>
            <p className="mt-2.5 text-center text-[11px] leading-snug text-dim">{sb.note}</p>
          </div>
        </Modal>
      )}
    </>
  );
}
