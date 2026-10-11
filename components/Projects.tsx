import Image from "next/image";
import { achievements, projectsLead as lead } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";

// No cards: the number and the achievements sit directly on the page, split by thin rules.
export function Projects() {
  return (
    <section className="pt-8">
      <SectionHeader title="Projects & Achievements" sub="What you'll build along the way:" />

      {/* The number, stated plainly */}
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-b border-line pb-8">
        <p className="text-[76px] font-extrabold leading-[0.85] tracking-[-4px] text-brand sm:text-[104px]">{lead.count}</p>
        <div className="min-w-[220px] flex-1">
          <h3 className="text-[20px] font-bold leading-tight tracking-tight sm:text-[24px]">{lead.title}</h3>
          <p className="mt-1.5 max-w-lg text-[13px] leading-relaxed text-muted sm:text-[14px]">{lead.body}</p>
        </div>
        <Image src="/images/achievements/build.png" alt="" width={400} height={298} unoptimized
          className="hidden h-[120px] w-auto object-contain lg:block" />
      </div>

      {/* Achievements, no boxes — just the illustration and the words */}
      <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => (
          <div key={a.title}
            className={`group flex items-center gap-4 py-6 ${i < achievements.length - 1 ? "border-b border-line" : ""} ${
              i >= achievements.length - 2 ? "sm:border-b-0" : ""} lg:[&:nth-last-child(-n+3)]:border-b-0`}>
            <Image src={a.image} alt="" width={400} height={300} unoptimized
              className="h-[72px] w-[72px] shrink-0 object-contain transition duration-500 group-hover:scale-110 sm:h-[84px] sm:w-[84px]" />
            <div className="min-w-0">
              <h3 className="text-[15px] font-bold leading-snug sm:text-[16px]">{a.title}</h3>
              <p className="mt-1 text-[11.5px] leading-snug text-muted sm:text-[12.5px]">{a.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
