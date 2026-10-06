// Logo files have different built-in padding, so each gets its own height to look the same size.
const LOGO_HEIGHTS: Record<string, string> = {
  "upgrad-sot": "h-3.5", linkedin: "h-2.5", walmart: "h-3", paypal: "h-4", oracle: "h-[7px]",
};
const logoHeight = (src: string) =>
  LOGO_HEIGHTS[Object.keys(LOGO_HEIGHTS).find((k) => src.includes(k)) ?? ""] ?? "h-3";

export function CompanyLogos({ logos, className = "", nowrap = false }: { logos: string[]; className?: string; nowrap?: boolean }) {
  return (
    <div className={`flex items-center gap-x-3 gap-y-1 ${nowrap ? "flex-nowrap" : "flex-wrap"} ${className}`}>
      {logos.map((src) => (
        <span key={src} className="flex h-4 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" className={`w-auto max-w-[44px] object-contain ${logoHeight(src)}`} />
        </span>
      ))}
    </div>
  );
}
