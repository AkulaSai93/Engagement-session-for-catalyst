// Logo files have different built-in padding, so each gets its own height to look the same size.
const LOGO_HEIGHTS: Record<string, string> = {
  "upgrad-sot": "h-3.5", linkedin: "h-2.5", walmart: "h-3", paypal: "h-4", oracle: "h-[7px]",
  cisco: "h-3.5", barclays: "h-3", iiitd: "h-3.5", pw: "h-4", ineuron: "h-3", salesforce: "h-4", microsoft: "h-3", google: "h-3", amazon: "h-3", flipkart: "h-3", visa: "h-3", adobe: "h-3", deloitte: "h-3", bain: "h-3", zivame: "h-3",
};
const logoHeight = (src: string) =>
  LOGO_HEIGHTS[Object.keys(LOGO_HEIGHTS).find((k) => src.includes(k)) ?? ""] ?? "h-3";

export function CompanyLogos({ logos, className = "", nowrap = false, maxW = 44 }: { logos: string[]; className?: string; nowrap?: boolean; maxW?: number }) {
  return (
    <div className={`flex items-center gap-x-3 gap-y-1 ${nowrap ? "flex-nowrap overflow-hidden" : "flex-wrap"} ${className}`}>
      {logos.map((src) => (
        // min-w-0 + shrink lets a crowded row squeeze instead of spilling out of its box.
        <span key={src} className="flex h-4 min-w-0 shrink items-center justify-center" style={{ maxWidth: maxW }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" className={`w-auto max-w-full object-contain ${logoHeight(src)}`} />
        </span>
      ))}
    </div>
  );
}
