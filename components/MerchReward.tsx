import { merchReward as m } from "@/lib/data";

// Not a card and not a banner: a borderless notice held between two hairlines,
// sitting straight on the page background above the live banner.
const TICKER = ["T-shirt", "Hoodie", "Sticker pack", "Bottle", "Tote bag"];

export function MerchReward() {
  return (
    <div className="mb-7 pb-2 sm:pb-4">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        <p className="text-[56px] font-extrabold leading-[0.85] tracking-[-3px] text-brand sm:text-[76px] sm:tracking-[-4px]">
          {m.rank}
        </p>
        <div className="min-w-[240px] flex-1">
          <h3 className="text-[20px] font-extrabold leading-tight tracking-[-0.6px] sm:text-[26px] sm:tracking-[-1px]">{m.title}</h3>
          <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-muted sm:text-[14.5px]">{m.body}</p>
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
