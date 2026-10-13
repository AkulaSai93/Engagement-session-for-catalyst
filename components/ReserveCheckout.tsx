"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ArrowRight, Minus, Plus, X } from "lucide-react";
import { checkout as ck, freeAccess as fa } from "@/lib/data";
import { SharePaymentLink } from "./SharePaymentLink";

// A read-only field: the details are already on file, this screen only confirms them.
function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-muted">{label}</span>
      <input readOnly value={value}
        className="mt-1.5 w-full rounded-xl border border-line bg-bg px-4 py-3 text-[14.5px] text-muted outline-none" />
    </label>
  );
}

function Faq({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-line">
      <button type="button" onClick={onToggle} aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-4 text-left">
        <span className="text-[14.5px] font-bold leading-snug">{q}</span>
        {open ? <Minus className="size-4 shrink-0 text-dim" /> : <Plus className="size-4 shrink-0 text-dim" />}
      </button>
      {open && <p className="-mt-1 pb-4 pr-8 text-[13.5px] leading-relaxed text-muted">{a}</p>}
    </div>
  );
}

// Takes over the whole screen rather than sitting in a popup.
export function ReserveCheckout({ onClose, onPaid }: { onClose: () => void; onPaid: () => void }) {
  const [open, setOpen] = useState(0);
  const [share, setShare] = useState(false);
  const [mounted, setMounted] = useState(false);
  // TODO: hand off to Razorpay here; onPaid() should run on its success callback.
  const pay = (e: React.MouseEvent) => { e.preventDefault(); onPaid(); };

  useEffect(() => {
    setMounted(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);
  if (!mounted) return null;

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="Block your seat"
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-bg animate-[fade_.2s_ease-out]">
      {/* brand bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line bg-white px-5 py-4 sm:px-9">
        <Image src="/images/logos/upgrad-catalyst.png" alt="" width={187} height={34} unoptimized className="h-7 w-auto" />
        <button type="button" onClick={onClose} aria-label="Close"
          className="grid size-9 place-items-center rounded-full bg-bg transition hover:bg-line">
          <X className="size-5" />
        </button>
      </div>

      <div className="mx-auto grid max-w-[1180px] gap-8 px-5 py-8 sm:px-9 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-10 lg:py-9">
        <div className="min-w-0">
          <h2 className="text-[30px] font-extrabold leading-tight tracking-[-1px] sm:text-[34px]">Block Your Seat</h2>
          <p className="mt-2 max-w-[560px] text-[14px] leading-relaxed text-muted">
            Confirm your place in the Catalyst cohort — the 2-year online technology accelerator you run alongside
            your degree. Your seat is held once this payment is received.
          </p>

          <div className="mt-7 rounded-2xl border border-line bg-white p-5 sm:p-6">
            <h3 className="text-[15px] font-bold">Applicant Information</h3>
            <div className="mt-4 space-y-4">
              <Field label="Applicant Name" value={ck.applicant.name} />
              <Field label="Email Address" value={ck.applicant.email} />
              <Field label="Mobile Number" value={ck.applicant.mobile} />
            </div>

            <h3 className="mt-7 text-[15px] font-bold">Program Information</h3>
            <div className="mt-4 space-y-4">
              <Field label="Program Name" value={ck.program.name} />
              <Field label="Cohort" value={ck.program.cohort} />
            </div>
          </div>

          <h3 className="mt-9 text-[22px] font-extrabold tracking-[-0.6px]">Frequently Asked Questions</h3>
          <div className="mt-3">
            {ck.faqs.map((f, i) => (
              <Faq key={f.q} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            ))}
          </div>
        </div>

        {/* Payment summary */}
        <aside className="lg:sticky lg:top-[100px] lg:self-start">
          <div className="rounded-2xl border border-line bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[13.5px] font-medium">Seat Booking Amount</span>
              <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-gold">{ck.closes}</span>
            </div>

            <p className="mt-2 text-[30px] font-extrabold leading-none tracking-[-1.2px]">₹ {fa.price}</p>
            <p className="mt-2 text-[12.5px] leading-snug text-muted">{ck.note}</p>

            <a href={fa.payHref} onClick={pay}
              className="group mt-4 flex items-center justify-center gap-2 rounded-xl bg-brand py-3 text-[14.5px] font-bold text-white transition hover:bg-brand-2">
              Proceed to pay <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </a>

            <div className="mt-4 flex items-center gap-2.5 border-t border-line pt-4">
              {/* a few learner faces — placeholders until real ones are supplied */}
              <span aria-hidden className="flex shrink-0 -space-x-2.5">
                {[32, 12, 5].map((n) => (
                  <Image key={n} src={`https://i.pravatar.cc/80?img=${n}`} alt="" width={24} height={24}
                    className="size-6 rounded-full object-cover ring-2 ring-white" unoptimized />
                ))}
              </span>
              <p className="text-[11.5px] leading-snug text-muted">{ck.backed}</p>
            </div>

            <div className="my-4 flex items-center gap-3 text-[11.5px] text-dim">
              <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
            </div>

            <p className="text-[12.5px] font-medium">Want your parent or guardian to pay on your behalf?</p>
            <div className="mt-2.5 flex gap-2">
              <input readOnly value={ck.shareUrl}
                className="min-w-0 flex-1 rounded-xl border border-line bg-white px-3 py-2 text-[12px] text-muted outline-none" />
              <button type="button" onClick={() => setShare(true)}
                className="shrink-0 rounded-xl border border-line bg-white px-3.5 py-2 text-[12.5px] font-semibold transition hover:bg-bg">
                Share
              </button>
            </div>
          </div>

          {/* What the seat unlocks — ₹1 Cr feature card beside two stacked cards (Figma 1288:2160) */}
          <div className="mt-4 flex items-stretch gap-3">
            <div className="relative shrink-0 overflow-hidden rounded-lg bg-[#FCE9EB] p-3 max-sm:flex-1 sm:w-[217px]">
              <p className="text-[40px] font-extrabold leading-none tracking-[-1.8px] text-brand">₹1 Cr</p>
              <p className="mt-3 max-w-[150px] text-[9.5px] leading-snug text-muted">
                Build, compete, and win from a prize pool of <b className="text-ink">1 crore!</b>
              </p>
              <Image src="/images/trophy-1cr.png" alt="" width={240} height={240} unoptimized
                className="pointer-events-none absolute -bottom-2 right-[-12px] w-[99px] -rotate-[5.42deg] object-contain" />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <div className="relative h-[79px] overflow-hidden rounded-lg bg-[#FFF7EC] p-3">
                <h4 className="max-w-[112px] text-[13.5px] font-extrabold leading-[1.1] tracking-[-0.35px] text-brand">
                  Guaranteed Paid Internship
                </h4>
                <p className="mt-1.5 max-w-[112px] text-[8.5px] leading-[1.3] text-muted">
                  Top performers get a paid internship.
                </p>
                <Image src="/images/paid-internship.png" alt="" width={213} height={197} unoptimized
                  className="pointer-events-none absolute right-2 top-2.5 h-[62px] w-auto object-contain" />
              </div>

              <div className="relative h-[79px] overflow-hidden rounded-lg bg-[#F1F6FF] p-3">
                <h4 className="max-w-[112px] text-[13.5px] font-extrabold leading-[1.1] tracking-[-0.35px] text-brand">
                  Internshala Pro FREE
                </h4>
                <p className="mt-1.5 max-w-[112px] text-[8.5px] leading-[1.3] text-muted">
                  Free 6-month subscription after the program.
                </p>
                <Image src="/images/internshala-pro.png" alt="" width={266} height={178} unoptimized
                  className="pointer-events-none absolute right-1 top-1/2 h-[50px] w-auto -translate-y-1/2 object-contain" />
              </div>
            </div>
          </div>

        </aside>
      </div>

      {share && <SharePaymentLink onClose={() => setShare(false)} />}
    </div>,
    document.body,
  );
}
