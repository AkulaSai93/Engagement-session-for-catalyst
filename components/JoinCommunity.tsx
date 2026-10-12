"use client";

import { ArrowRight } from "lucide-react";
import { community as c } from "@/lib/data";
import { useReserved } from "@/lib/reserved";
import { WhatsApp } from "./WhatsAppIcon";

// Fallback for students who paid but skipped the invite in the success popup.
export function JoinCommunity() {
  const { reserved, joined, markJoined } = useReserved();
  if (!reserved || joined) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-4 rounded-[16px] border border-[#25D366]/30 bg-white px-4 py-4 sm:px-6 sm:py-5">
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#25D366] text-white sm:size-12">
        <WhatsApp className="size-6 sm:size-[26px]" />
      </span>

      <div className="min-w-[200px] flex-1">
        <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#128C4A]">One last step</span>
        <h3 className="mt-0.5 text-[16px] font-extrabold leading-tight tracking-[-0.4px] sm:text-[18px]">{c.ctaTitle}</h3>
        <p className="mt-1 text-[12.5px] leading-snug text-muted sm:text-[13.5px]">{c.ctaBody}</p>
      </div>

      <a href={c.href} target="_blank" rel="noopener noreferrer" onClick={markJoined}
        className="group flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-[14px] font-bold text-white shadow-[0_8px_20px_rgba(37,211,102,.3)] transition hover:brightness-95 sm:w-auto">
        {c.cta}
        <ArrowRight className="size-[18px] transition group-hover:translate-x-1" />
      </a>
    </div>
  );
}
