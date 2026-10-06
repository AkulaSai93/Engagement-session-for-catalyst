"use client";

import Image from "next/image";
import { CalendarDays, Clock } from "lucide-react";
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

          <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5"><CalendarDays className="size-4" />{session.day}, {session.date} {session.month}</span>
            <span className="flex items-center gap-1.5"><Clock className="size-4" />{session.time}</span>
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
