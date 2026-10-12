import { merchReward as m } from "@/lib/data";

// Not a card and not a banner: a borderless notice sitting straight on the page
// background above the live banner.
const TICKER = ["T-shirt", "Hoodie", "Sticker pack", "Bottle", "Tote bag"];

export function MerchReward() {
  return (
    <div className="pt-8">
      <div className="flex flex-col items-start gap-y-1.5 sm:flex-row sm:items-center sm:gap-x-5">
        <p className="shrink-0 text-[34px] font-extrabold leading-[0.85] tracking-[-1.6px] text-brand sm:text-[60px] sm:tracking-[-3.5px]">
          {m.rank}
        </p>
        <div className="min-w-0 flex-1">
          <h3 className="text-[14px] font-extrabold leading-snug tracking-[-0.3px] sm:whitespace-nowrap sm:text-[clamp(13px,1.45vw,20px)] sm:leading-tight sm:tracking-[-0.7px]">{m.title}</h3>
        </div>
      </div>

      {/* what's up for grabs, quietly scrolling */}
      <div className="mt-5 overflow-hidden"
        style={{ maskImage: "linear-gradient(90deg,#000 80%,transparent)", WebkitMaskImage: "linear-gradient(90deg,#000 80%,transparent)" }}>
        <div className="flex w-max animate-[merch_18s_linear_infinite] gap-6 whitespace-nowrap text-[11.5px] font-semibold uppercase tracking-[1.6px] text-dim motion-reduce:animate-none">
          {[...TICKER, ...TICKER].map((x, i) => (
            <span key={i} className="flex items-center gap-6">{x}<span className="text-brand/50">◆</span></span>
          ))}
        </div>
      </div>
    </div>
  );
}
