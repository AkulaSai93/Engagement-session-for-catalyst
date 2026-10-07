"use client";

import { useRef, useState } from "react";
import { CheckCircle2, ChevronDown, ClipboardCheck, Download, Eye, FileText, Link2, Paperclip, UploadCloud, Video, X } from "lucide-react";
import type { Assignment, Recording, Resource } from "@/lib/data";

/* ── Session details card (date tile + key facts) ───────────────────────── */
export function SessionInfoCard({ r }: { r: Recording }) {
  const [day, mon] = r.date.split(" ");
  const rows: [string, string | undefined][] = [["Date", r.date], ["Time", r.time], ["Duration", r.duration], ["Speaker", r.speaker]];
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="relative overflow-hidden bg-[#07070c] p-4 text-white">
        <span aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_90%_at_0%_100%,rgba(225,29,72,.45),transparent_70%)]" />
        <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/10 text-white backdrop-blur"><Video className="size-4" /></span>
        <p className="relative text-[11px] font-bold uppercase tracking-[2px] text-brand-2">{mon}</p>
        <p className="relative text-[34px] font-bold leading-none">{day.padStart(2, "0")}</p>
        <span className="relative mt-2 inline-block rounded-md bg-white/10 px-2 py-0.5 text-[11px] font-medium backdrop-blur">{r.time ?? r.duration}</span>
      </div>
      <dl className="px-4">
        {rows.filter(([, v]) => v).map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3 border-b border-line py-2.5 text-[13px] last:border-0">
            <dt className="text-dim">{k}</dt><dd className="text-right font-medium">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ── Assignments ───────────────────────────────────────────────────────── */
function AssignmentCard({ a }: { a: Assignment }) {
  const [open, setOpen] = useState(true);
  const [showTask, setShowTask] = useState(false);
  const [mode, setMode] = useState<"file" | "link">("file");
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState("");
  const [note, setNote] = useState("");
  const [drag, setDrag] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const ready = mode === "file" ? !!file : /^https?:\/\/\S+\.\S+/.test(link.trim());

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="flex flex-wrap items-center gap-3 p-4">
        <span className="grid size-11 place-items-center rounded-xl bg-[#FCE9EB] text-brand"><ClipboardCheck className="size-5" /></span>
        <div className="min-w-0 flex-1">
          <b className="block text-[15px] font-semibold">{a.title}</b>
          <small className="text-[12px] text-dim">Max marks {a.maxMarks}</small>
        </div>
        <span className={`rounded-full px-3 py-1 text-[12px] font-medium ${submitted ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
          {submitted ? "Submitted" : "Not submitted"}
        </span>
        <button type="button" aria-label={open ? "Collapse" : "Expand"} onClick={() => setOpen((v) => !v)} className="grid size-8 place-items-center rounded-lg text-dim hover:bg-bg">
          <ChevronDown className={`size-4 transition ${open ? "rotate-180" : ""}`} />
        </button>
        <button type="button" onClick={() => setShowTask((v) => !v)} className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-[13px] font-medium hover:border-brand/40">
          <Eye className="size-4" /> {showTask ? "Hide task" : "View task"}
        </button>
      </div>
      {showTask && <p className="mx-4 mb-3 rounded-xl bg-bg p-3 text-[13px] leading-relaxed text-muted">{a.task}</p>}

      {open && (
        <div className="border-t border-line bg-bg/60 p-4">
          {submitted ? (
            <p className="flex items-center gap-2 text-[13px] text-emerald-700">
              <CheckCircle2 className="size-5" /> Reply submitted{mode === "file" && file ? ` · ${file.name}` : link ? ` · ${link}` : ""}. Your mentor will review it.
            </p>
          ) : (
            <>
              <div className="inline-flex rounded-lg bg-bg p-1 text-[13px]">
                {(["file", "link"] as const).map((m) => (
                  <button key={m} type="button" onClick={() => setMode(m)}
                    className={`rounded-md px-3 py-1.5 font-medium transition ${mode === m ? "bg-white shadow-xs" : "text-muted"}`}>
                    {m === "file" ? "Upload a file" : "Share a link"}
                  </button>
                ))}
              </div>

              {mode === "file" ? (
                <div
                  onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
                  onDrop={(e) => { e.preventDefault(); setDrag(false); if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]); }}
                  onClick={() => input.current?.click()}
                  className={`mt-3 cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition ${drag ? "border-brand bg-brand/10" : "border-brand/25 bg-brand/[.03] hover:border-brand/50"}`}>
                  <input ref={input} type="file" hidden onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
                  {file ? (
                    <p className="flex items-center justify-center gap-2 text-[13px] font-medium">
                      <FileText className="size-4 text-brand" /> {file.name}
                      <button type="button" aria-label="Remove file" onClick={(e) => { e.stopPropagation(); setFile(null); }} className="text-dim hover:text-brand"><X className="size-4" /></button>
                    </p>
                  ) : (
                    <>
                      <UploadCloud className="mx-auto size-6 text-brand" />
                      <p className="mt-2 text-[14px] font-medium">Drop your answer file or browse</p>
                      <p className="mt-1 text-[12px] text-dim">PDF, docs, images, ZIP or any file · up to 100 MB</p>
                    </>
                  )}
                </div>
              ) : (
                <label className="mt-3 flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2.5">
                  <Link2 className="size-4 text-dim" />
                  <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://github.com/you/project or a Drive link"
                    className="w-full bg-transparent text-[13px] outline-none placeholder:text-dim" />
                </label>
              )}

              <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="Add a note for your mentor (optional)"
                className="mt-3 w-full resize-y rounded-xl border border-line bg-white px-3 py-2.5 text-[13px] outline-none placeholder:text-dim focus:border-brand/40" />
              <div className="mt-3 flex justify-end">
                <button type="button" disabled={!ready} onClick={() => setSubmitted(true)}
                  className="rounded-xl bg-brand px-4 py-2 text-[13px] font-semibold text-white shadow-[0_6px_18px_rgba(225,29,72,.3)] transition hover:bg-brand-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none">
                  Submit reply
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function Assignments({ items }: { items: Assignment[] }) {
  if (!items.length) return null;
  return (
    <section className="mt-6">
      <h4 className="mb-3 text-[17px] font-semibold">Assignments <span className="ml-1 text-[13px] font-normal text-dim">0/{items.length} submitted</span></h4>
      <div className="space-y-3">{items.map((a) => <AssignmentCard key={a.title} a={a} />)}</div>
    </section>
  );
}

/* ── Resources ─────────────────────────────────────────────────────────── */
export function Resources({ items }: { items: Resource[] }) {
  return (
    <section className="mt-6">
      <h4 className="mb-3 text-[17px] font-semibold">
        Resources {items.length > 0 && <span className="ml-1 font-normal text-dim">{items.length}</span>}
      </h4>
      {items.length ? (
        <div className="grid gap-3">
          {items.map((x) => (
            <div key={x.name} className="flex items-center gap-3.5 rounded-2xl border border-line bg-white p-3.5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand"><FileText className="size-5" /></span>
              <span className="min-w-0 flex-1">
                <b className="block truncate text-[15px] font-medium">{x.name}</b>
                <small className="text-[12px] text-dim">{x.type}{x.size ? ` · ${x.size}` : ""}</small>
              </span>
              <a href={x.url} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px] font-medium text-muted transition hover:bg-bg hover:text-ink">
                <Eye className="size-4" /> Preview
              </a>
              <a href={x.url} download aria-label={`Download ${x.name}`}
                className="grid size-8 place-items-center rounded-lg text-muted transition hover:bg-bg hover:text-ink">
                <Download className="size-4" />
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-line bg-white p-8 text-center">
          <Paperclip className="mx-auto size-6 text-dim" />
          <p className="mt-2 text-[14px] font-medium">No resources yet</p>
          <p className="mt-1 text-[12px] text-dim">Slides, notes and files from this session will show up here.</p>
        </div>
      )}
    </section>
  );
}
