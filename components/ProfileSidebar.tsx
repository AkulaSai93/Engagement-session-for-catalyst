import { CreditCard, GraduationCap, Radio, User } from "lucide-react";
import Image from "next/image";
import { avatar } from "@/lib/data";

const items = [
  { icon: User, title: "Personal Details", sub: "Basic & contact information" },
  { icon: GraduationCap, title: "Academic Details", sub: "Education & qualifications" },
  { icon: CreditCard, title: "Payment Details", sub: "Fees & transaction history" },
  { icon: Radio, title: "Engagement", sub: "Live sessions & opportunities", active: true },
];

export function ProfileSidebar({ className = "hidden lg:block lg:sticky lg:top-[205px]" }: { className?: string }) {
  return (
    <aside className={`h-max rounded-[20px] border border-line bg-white p-6.5 ${className}`}>
      <h2 className="text-xl font-semibold">My Profile</h2>
      <p className="mt-1.5 text-[13px] leading-snug text-muted">Manage your personal information and preferences</p>
      <div className="my-5 flex flex-col items-center border-y border-line py-5">
        <Image src={avatar(12)} alt="" width={80} height={80} className="rounded-full" />
        <p className="mt-3 text-base font-medium">Your Name</p>
        <span className="mt-1.5 rounded-full border border-brand/40 px-3 py-0.5 text-[11px] font-medium text-brand">STUDENT</span>
      </div>
      <ul className="flex flex-col gap-2">
        {items.map((i) => (
          <li key={i.title}>
            <a href="#" className={`flex items-center gap-3.5 rounded-xl p-3 transition ${i.active ? "bg-brand text-white shadow-[0_8px_20px_rgba(225,29,72,.3)]" : "hover:bg-bg"}`}>
              <span className={`grid size-8 place-items-center rounded-lg text-sm ${i.active ? "bg-white/20" : "bg-bg"}`}><i.icon className="size-4" /></span>
              <span>
                <b className="block text-[13px] font-medium">{i.title}</b>
                <small className={`text-[11px] ${i.active ? "text-white/80" : "text-muted"}`}>{i.sub}</small>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
