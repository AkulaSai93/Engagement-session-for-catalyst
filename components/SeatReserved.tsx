"use client";

import { ArrowRight, CircleCheck } from "lucide-react";
import { enrolment as en, freeAccess as fa } from "@/lib/data";
import { useAccess } from "@/lib/access";

// ₹499 paid, still inside the 10 days of access: confirm the seat and push the Year 1 enrolment.
// Same "event ticket" strip as the ₹499 offer; the stub stays brand red because enrolment is still pending.
export function SeatReserved() {
  if (useAccess() !== "paid") return null;

  return (
    <div className="relative overflow-hidden bg-black text-white">
      <div className="relative mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 px-4 sm:px-[52px] md:flex md:items-stretch md:gap-0">
        {/* Message */}
        <div className="col-span-2 flex min-w-0 flex-col justify-center pt-2.5 md:flex-1 md:py-4 md:pr-6">
          <span className="hidden w-max items-center gap-1.5 rounded-full bg-[#3FCF8E]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[1.5px] text-[#3FCF8E] ring-1 ring-[#3FCF8E]/30 md:flex">
            <CircleCheck className="size-3.5" /> Seat reserved
          </span>
          <a href={fa.enrolHref} className="group w-max text-[16px] font-extrabold leading-tight tracking-tight md:mt-2 md:text-[24px]">
            Complete your <span className="text-[#3FCF8E]">enrollment now</span>
          </a>
          <p className="mt-1.5 hidden max-w-[640px] text-[13px] leading-snug text-white/75 md:block">{en.body}</p>
        </div>

        {/* Classes start */}
        <div className="flex min-w-0 flex-col justify-center py-2 md:flex-none md:border-l md:border-white/10 md:px-6 md:py-0">
          <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-white/70">Classes start</span>
          <span className="mt-1 w-max rounded-md bg-white/10 px-2.5 py-1 text-[15px] font-bold md:mt-1.5 md:px-3 md:py-1.5 md:text-[20px]">{en.classesStart}</span>
        </div>

        {/* Ticket stub CTA */}
        <a href={fa.enrolHref}
          className="group relative my-2 flex shrink-0 items-center gap-2 rounded-xl bg-brand py-2 pl-3.5 pr-3 font-semibold transition hover:bg-brand-2 md:my-0 md:-mr-[52px] md:gap-4 md:rounded-none md:py-0 md:pl-9 md:pr-[52px] md:after:absolute md:after:inset-y-0 md:after:left-full md:after:w-[100vw] md:after:bg-inherit md:after:content-['']">
          <span aria-hidden className="absolute -left-2.5 -top-2.5 hidden size-5 rounded-full bg-black md:block" />
          <span aria-hidden className="absolute -bottom-2.5 -left-2.5 hidden size-5 rounded-full bg-black md:block" />
          <span aria-hidden className="absolute inset-y-[18px] -left-[5px] hidden flex-col justify-evenly md:flex">
            {Array.from({ length: 5 }, (_, i) => <span key={i} className="size-2.5 rounded-full bg-black" />)}
          </span>
          <span className="leading-tight">
            <span className="block whitespace-nowrap text-[9px] font-bold uppercase tracking-[1.5px] md:text-[13px]">Enrol now</span>
            <span className="block whitespace-nowrap text-[18px] font-extrabold md:mt-1 md:text-[30px] md:leading-none">Rs. {en.fee}</span>
            <span className="mt-0.5 block whitespace-nowrap text-[9px] font-medium text-white/80 md:mt-1.5 md:text-[11px]">Easy EMI options available</span>
          </span>
          <ArrowRight className="size-5 transition group-hover:translate-x-1 md:size-7" />
        </a>
        <p className="col-span-2 -mt-0.5 pb-2 text-[10px] leading-snug text-white/60 md:hidden">{en.body}</p>
      </div>
      <div className="h-1 bg-brand" />
    </div>
  );
}
