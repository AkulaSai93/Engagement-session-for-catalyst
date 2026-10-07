import Image from "next/image";

// Full-width "FREE ProjectBuilder Pro" banner (Figma: FDE-Engineering › Container 125:11476).
const STEPS = ["Build", "AI Review", "Push to GitHub", "Ship"];
const LIME = "#D4F56B";

export function ProjectBuilderCard() {
  return (
    <div className="group relative flex min-h-[180px] overflow-hidden rounded-2xl bg-[#141418] text-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,15,30,.25)] lg:col-span-2">
      <div aria-hidden className="pointer-events-none absolute left-[33%] -top-10 size-80 rounded-full blur-[64px]" style={{ background: "rgba(212,245,107,.1)" }} />

      <div className="relative z-10 flex flex-col justify-center px-6 py-5">
        <span className="inline-flex w-max items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[9px] font-semibold uppercase leading-[13px] tracking-[1.5px] text-white/80">
          <span className="size-1.5 rounded-full" style={{ background: LIME }} /> Included free · ₹0
        </span>
        <h3 className="pt-2.5 text-[22px] font-semibold leading-[27.5px] tracking-[-0.55px]">
          Build like a pro with <span className="text-brand-2">ProjectBuilder Pro</span> on us.
        </h3>
        <p className="pt-1.5 text-[11px] leading-[15px] text-white/60">
          Real projects, AI reviews and GitHub-tracked progress — <b className="text-white">free for every Catalyst learner</b>.
        </p>
        <div className="flex flex-wrap gap-1.5 pt-3">
          {STEPS.map((s) => (
            <span key={s}
              className={`rounded-full border px-2.5 py-0.5 text-[10px] leading-[14px] ${
                s === "Push to GitHub" ? "border-[#D4F56B]/60 bg-[#D4F56B]/10 text-[#D4F56B]" : "border-white/15 text-white/70"}`}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Product screenshot, vertically centred on the right */}
      <Image src="/images/projectbuilder-pro.png" alt="ProjectBuilder Pro workspace" width={749} height={524}
        className="pointer-events-none absolute right-[8.5%] top-1/2 hidden h-[153px] w-auto -translate-y-1/2 rounded-[7px] transition duration-500 group-hover:scale-105 md:block"
        sizes="220px" />
    </div>
  );
}
