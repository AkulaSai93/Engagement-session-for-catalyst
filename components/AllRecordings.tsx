"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Play, Search } from "lucide-react";
import { allRecordings as all } from "@/lib/data";
import { CompanyLogos } from "./CompanyLogos";
import { Modal } from "./Modal";

const PAGE = 10; // two rows of five

export function AllRecordings({ onPlay }: { onPlay: (r: (typeof all)[number]) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? all.filter((r) => `${r.title} ${r.speaker}`.toLowerCase().includes(q)) : all;
  }, [query]);
  const visible = matches.slice(0, shown);

  return (
    <>
      <button onClick={() => { setOpen(true); setShown(PAGE); setQuery(""); }} className="text-lg font-medium text-brand transition hover:opacity-80">
        View all
      </button>

      {open && (
        <Modal label="All past recordings" onClose={() => setOpen(false)} className="max-w-[1320px]"
          closeClassName="bg-bg text-ink hover:bg-line">
          <div className="sticky top-0 z-[5] border-b border-line bg-white/95 px-6 pb-4 pt-6 backdrop-blur sm:px-8">
            <p className="mb-1 text-[13px] font-medium uppercase text-brand">Catch up</p>
            <div className="flex flex-wrap items-end justify-between gap-3 pr-10">
              <h3 className="text-[26px] font-semibold tracking-tight">
                All <span className="text-brand">recordings</span>
                <span className="ml-2 align-middle text-sm font-normal text-dim">{matches.length} sessions</span>
              </h3>
              <label className="flex w-full items-center gap-2 rounded-xl border border-line bg-bg px-3 py-2 sm:w-72">
                <Search className="size-4 text-dim" />
                <input value={query} onChange={(e) => { setQuery(e.target.value); setShown(PAGE); }}
                  placeholder="Search by topic or mentor" className="w-full bg-transparent text-sm outline-none placeholder:text-dim" />
              </label>
            </div>
          </div>
          <div className="px-6 pb-6 sm:px-8">
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {visible.map((r, i) => (
                <button type="button" key={i} onClick={() => onPlay(r)} className="group overflow-hidden text-left rounded-xl border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,15,30,.08)]">
                  <div className="relative aspect-video">
                    <Image src={r.image} alt="" fill className="object-cover" sizes="(max-width:768px) 50vw, 250px" />
                    <span className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/40 text-brand-2 backdrop-blur-md transition group-hover:scale-110">
                      <Play className="size-4 fill-current" />
                    </span>
                    <span className="absolute bottom-2 right-2 rounded-md bg-black/75 px-1.5 py-0.5 text-[11px] font-semibold text-white">{r.duration}</span>
                  </div>
                  <div className="p-3">
                    <h4 className="line-clamp-2 text-[13px] font-semibold leading-snug">{r.title}</h4>
                    <div className="mt-3 flex items-center gap-2.5 border-t border-line pt-3">
                      <Image src={r.avatar} alt={r.speaker} width={30} height={30} className="size-[30px] shrink-0 rounded-full" />
                      <div className="min-w-0">
                        <p className="text-[12px] font-semibold leading-tight">{r.speaker}</p>
                        <p className="text-[11px] text-dim">{r.date}</p>
                      </div>
                    </div>
                    <CompanyLogos logos={r.logos} nowrap className="mt-3 justify-between gap-x-1.5 rounded-lg bg-bg px-2 py-1.5 [&_img]:max-w-[32px]" />
                  </div>
                </button>
              ))}
            </div>

            {matches.length === 0 && <p className="py-16 text-center text-muted">No recordings match “{query}”.</p>}
            {shown < matches.length && (
              <div className="mt-6 text-center">
                <button onClick={() => setShown((n) => n + PAGE)}
                  className="rounded-xl border border-line bg-white px-5 py-2.5 text-sm font-semibold transition hover:border-brand/40 hover:text-brand">
                  Load more · {matches.length - shown} left
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
