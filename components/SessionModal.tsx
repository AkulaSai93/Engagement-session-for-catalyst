"use client";

import Image from "next/image";
import { CalendarDays, Check, Clock } from "lucide-react";
import type { upcoming } from "@/lib/data";
import { CompanyLogos } from "./CompanyLogos";
import { Modal } from "./Modal";

type Session = (typeof upcoming)[number];

export function SessionModal({ session, onClose }: { session: Session; onClose: () => void }) {
  return (
    <Modal label={session.title} onClose={onClose}>
        <div className="relative aspect-video w-full">
          <Image src={session.image} alt="" fill className="object-cover" sizes="760px" priority />
        </div>

        <div className="p-6">
          <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-semibold text-brand">{session.tag}</span>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">{session.title}</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">{session.description}</p>

          <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5"><CalendarDays className="size-4" />{session.day}, {session.date} {session.month}</span>
            <span className="flex items-center gap-1.5"><Clock className="size-4" />{session.time}</span>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[1.2px] text-dim">What you&apos;ll learn</p>
              <ul className="mt-2 space-y-1.5">
                {session.learn.map((l) => (
                  <li key={l} className="flex gap-2 text-[13px] leading-snug">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" /> {l}
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:max-w-[200px]">
              <p className="text-[11px] font-semibold uppercase tracking-[1.2px] text-dim">Connects to</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {session.connects.split(",").map((c) => (
                  <span key={c} className="rounded-full bg-bg px-2.5 py-1 text-[11px] font-medium">{c.trim()}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-line pt-5">
            <Image src={session.avatar} alt={session.speaker} width={48} height={48} className="size-12 rounded-full" />
            <div className="min-w-0 flex-1">
              <b className="block text-base font-semibold">{session.speaker}</b>
              <small className="text-sm text-dim">{session.role}</small>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-bg px-3 py-2.5">
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[1px] text-dim">Mentors from</p>
            <CompanyLogos logos={session.logos} className="gap-x-5 [&_img]:max-w-[64px] [&_img]:scale-125" />
          </div>
        </div>
    </Modal>
  );
}
