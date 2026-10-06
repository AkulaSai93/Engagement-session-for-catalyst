"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, User, X } from "lucide-react";
import { ProfileSidebar } from "./ProfileSidebar";

const links = ["Home", "Curriculum", "Student Journey", "BuildSpace", "FAQs"];

export function Navbar() {
  const [open, setOpen] = useState(false);

  // Lock page scroll and close on Esc while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open]);

  return (
    <nav className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-4 sm:px-14 lg:h-[88px]">
        <button aria-label="Open menu" onClick={() => setOpen(true)}
          className="-ml-1 grid size-10 place-items-center rounded-lg transition hover:bg-bg lg:hidden">
          <Menu className="size-6" />
        </button>
        <Image src="/images/logos/upgrad-sot.webp" alt="upGrad School of Technology" width={467} height={144} priority unoptimized className="h-8 w-auto lg:h-9" />
        <div className="mx-auto hidden gap-8 text-[15px] lg:flex">
          {links.map((l) => (
            <a key={l} href="#" className="transition hover:text-brand">{l}</a>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-3 lg:ml-0 lg:gap-4">
          <a href="#" className="flex items-center gap-2 rounded-lg bg-ink px-3 py-2 text-[13px] text-white">
            <Phone className="size-4" /><span className="hidden sm:inline">Request Call</span>
          </a>
          <button aria-label="Account" className="hidden items-center gap-2 text-muted sm:flex">
            <span className="grid size-8 place-items-center rounded-full bg-bg"><User className="size-4" /></span><ChevronDown className="size-4" />
          </button>
        </div>
      </div>

      {/* Mobile drawer: site links + profile menu */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-[fade_.2s_ease-out]" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col overflow-y-auto bg-bg p-4 shadow-2xl animate-[slide_.25s_ease-out]">
            <div className="mb-4 flex items-center justify-between">
              <Image src="/images/logos/upgrad-sot.webp" alt="upGrad School of Technology" width={467} height={144} unoptimized className="h-8 w-auto" />
              <button aria-label="Close menu" onClick={() => setOpen(false)} autoFocus
                className="grid size-10 place-items-center rounded-lg transition hover:bg-white"><X className="size-6" /></button>
            </div>
            <ProfileSidebar className="" />
            <div className="mt-4 rounded-[20px] border border-line bg-white p-2">
              {links.map((l) => (
                <a key={l} href="#" onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-[15px] font-medium transition hover:bg-bg hover:text-brand">{l}</a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
