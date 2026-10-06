// Three-tier heading: label, a light lead-in line, then the bold statement.
export function SectionHeader({
  eyebrow, lead, title, action,
}: { eyebrow: string; lead: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <p className="text-[14px] font-bold text-brand">{eyebrow}</p>
        <p className="mt-3 text-[20px] font-light leading-tight text-muted">{lead}</p>
        <h2 className="mt-0.5 text-[30px] font-bold leading-tight tracking-tight">{title}</h2>
      </div>
      {action}
    </div>
  );
}
