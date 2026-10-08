"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ProfileSidebar } from "./ProfileSidebar";
import { ReserveSeat } from "./ReserveSeat";

const links = ["Home", "Curriculum", "Student Journey", "ProjectBuilder Pro", "FAQs"];

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
    <nav className="sticky top-0 z-40 border-b-[0.5px] border-[#e5e7eb] bg-white">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-3.5 sm:px-[52px] lg:py-[26px]">
        <button aria-label="Open menu" onClick={() => setOpen(true)}
          className="-ml-1 grid size-10 place-items-center rounded-lg transition hover:bg-bg lg:hidden">
          <Menu className="size-6" />
        </button>
        <Image src="/images/logos/upgrad-catalyst.png" alt="upGrad School of Technology | Catalyst" width={187} height={34} priority unoptimized className="mr-auto h-[30px] w-auto lg:mr-0 lg:h-[34px]" />
        <div className="hidden gap-[30px] text-[15.2px] lg:flex">
          {links.map((l) => (
            <a key={l} href="#" className="text-black/90 transition hover:text-brand">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-[15px]">
          <a href="#" className="flex items-center gap-1.5 rounded-lg bg-[#040404] px-3 py-1.5 text-[12.85px] leading-[19px] text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/icons/phone.svg" alt="" width={14} height={14} className="size-3.5" />
            <span className="hidden sm:inline">Request Call</span>
          </a>
          <button aria-label="Account menu" className="hidden items-center gap-2 p-0.5 sm:flex">
            <span className="grid size-8 place-items-center rounded-full border border-[#ececec] bg-[#f3f4f6]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/icons/user.svg" alt="" width={15} height={15} className="size-[15px]" />
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/icons/chevron-down.svg" alt="" width={13} height={13} className="size-[13px]" />
          </button>
        </div>
      </div>

      <ReserveSeat />

      {/* Mobile drawer: site links + profile menu */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-[fade_.2s_ease-out]" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col overflow-y-auto bg-bg p-4 shadow-2xl animate-[slide_.25s_ease-out]">
            <div className="mb-4 flex items-center justify-between">
              <Image src="/images/logos/upgrad-catalyst.png" alt="upGrad School of Technology | Catalyst" width={187} height={34} unoptimized className="h-[30px] w-auto" />
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
