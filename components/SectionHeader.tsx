// Section heading: bold title with a short line underneath. Colours vary per section (per design).
export function SectionHeader({
  title, sub, titleClass = "text-ink", subClass = "text-muted", action,
}: { title: string; sub: string; titleClass?: string; subClass?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className={`text-[24px] font-bold leading-tight sm:text-[30px] tracking-tight ${titleClass}`}>{title}</h2>
        <p className={`mt-1 text-[15px] leading-tight sm:text-[18px] ${subClass}`}>{sub}</p>
      </div>
      {action}
    </div>
  );
}
