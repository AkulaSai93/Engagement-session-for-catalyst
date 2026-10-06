// Top-down car (nose pointing right at 0°). The parent rotates it to follow the road.
export function Car({ driving }: { driving: boolean }) {
  return (
    <svg viewBox="0 0 44 24" width="44" height="24" className={driving ? "car driving" : "car"} aria-hidden>
      {/* shadow */}
      <rect x="3" y="3" width="40" height="20" rx="7" fill="rgba(0,0,0,.25)" />
      {/* wheels */}
      <rect x="7" y="0.5" width="8" height="4" rx="1.5" fill="#111827" />
      <rect x="28" y="0.5" width="8" height="4" rx="1.5" fill="#111827" />
      <rect x="7" y="19.5" width="8" height="4" rx="1.5" fill="#111827" />
      <rect x="28" y="19.5" width="8" height="4" rx="1.5" fill="#111827" />
      {/* body */}
      <rect x="1" y="2.5" width="41" height="19" rx="7" fill="#E11D48" />
      <rect x="1" y="2.5" width="41" height="19" rx="7" fill="url(#car-shine)" />
      {/* windscreens & roof */}
      <path d="M26 5.5 h4 a3 3 0 0 1 3 3 v7 a3 3 0 0 1 -3 3 h-4 z" fill="#1E293B" />
      <path d="M11 6 h3 v12 h-3 a2 2 0 0 1 -2 -2 v-8 a2 2 0 0 1 2 -2z" fill="#1E293B" />
      <rect x="14" y="5.5" width="12" height="13" rx="2" fill="#BE123C" />
      {/* headlights & tail lights */}
      <rect x="39" y="4.5" width="2.5" height="3.5" rx="1" fill="#FEF3C7" />
      <rect x="39" y="16" width="2.5" height="3.5" rx="1" fill="#FEF3C7" />
      <rect x="1.2" y="5" width="1.8" height="3" rx=".8" fill="#7F1D1D" />
      <rect x="1.2" y="16" width="1.8" height="3" rx=".8" fill="#7F1D1D" />
      <defs>
        <linearGradient id="car-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".25" />
          <stop offset=".5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".15" />
        </linearGradient>
      </defs>
    </svg>
  );
}
