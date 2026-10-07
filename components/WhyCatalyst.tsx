import Image from "next/image";
import { usps } from "@/lib/data";
import { ProjectBuilderCard } from "./ProjectBuilderCard";

const sideUsps = usps.filter((u) => !u.stat.startsWith("₹"));

export function WhyCatalyst() {
  return (
    <section className="grid gap-5 pt-6 lg:grid-cols-[1.45fr_1fr]">
      <div className="group relative min-h-[316px] overflow-hidden rounded-2xl bg-[#FCE9EB] p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,15,30,.12)]">
        <p className="text-[10px] font-bold uppercase tracking-[2px]">Catalyst Prize Pool</p>
        <p className="mt-5 text-[88px] font-extrabold leading-none tracking-[-4px] text-brand">₹1 Cr</p>
        <p className="relative z-10 mt-6 max-w-[56%] text-[14px] leading-relaxed text-muted">
          A <b className="text-ink">₹25 Lakh hackathon</b> at the end of every semester. Four semesters. Build, compete and win real money.
        </p>
        <Image src="/images/trophy-1cr.png" alt="" width={459} height={450} priority unoptimized
          className="pointer-events-none absolute -bottom-[12%] -right-[4%] h-auto w-[44%] min-w-[220px] transition duration-500 group-hover:scale-105" />
      </div>

      <div className="grid gap-5">
        {sideUsps.map((u) => (
          <div key={u.title} className={`group relative flex items-center overflow-hidden rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,15,30,.12)] ${u.tint}`}>
            <div className="relative z-10 max-w-[62%]">
              <p className="text-[30px] font-extrabold leading-none tracking-tight text-brand">{u.stat}</p>
              <h3 className="mt-4 text-sm font-semibold">{u.title}</h3>
              <p className="mt-2 text-[11px] leading-snug text-muted">{u.body}</p>
            </div>
            {u.image && <Image src={u.image} alt="" width={u.imgW} height={u.imgH} priority unoptimized className={`pointer-events-none absolute h-auto transition duration-500 group-hover:scale-105 ${u.imgClass}`} />}
          </div>
        ))}
      </div>
      <ProjectBuilderCard />
    </section>
  );
}
