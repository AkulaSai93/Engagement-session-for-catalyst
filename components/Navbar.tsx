import Image from "next/image";
import { ChevronDown, Phone, User } from "lucide-react";
const links = ["Home", "Curriculum", "Student Journey", "BuildSpace", "FAQs"];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-20 border-b border-line bg-white">
      <div className="mx-auto flex h-[88px] max-w-[1440px] items-center px-4 sm:px-14">
        <Image src="/images/logos/upgrad-sot.webp" alt="upGrad School of Technology" width={467} height={144} priority unoptimized className="h-9 w-auto" />
        <div className="mx-auto hidden gap-8 text-[15px] lg:flex">
          {links.map((l) => (
            <a key={l} href="#" className="transition hover:text-brand">{l}</a>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-4 lg:ml-0">
          <a href="#" className="flex items-center gap-2 rounded-lg bg-ink px-3.5 py-2 text-[13px] text-white"><Phone className="size-4" /> Request Call</a>
          <button aria-label="Account" className="flex items-center gap-2 text-muted">
            <span className="grid size-8 place-items-center rounded-full bg-bg"><User className="size-4" /></span><ChevronDown className="size-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}
