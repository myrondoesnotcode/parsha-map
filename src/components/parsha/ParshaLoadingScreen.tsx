export function ParshaLoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#fcf9f0] select-none">
      {/* Hebrew watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-hebrew text-[180px] text-stone-900/[0.04] leading-none select-none">
          פרשה
        </span>
      </div>

      {/* Pulsing logo */}
      <div className="animate-pulse relative z-10">
        <svg width="48" height="60" viewBox="0 0 20 24" fill="none" aria-hidden="true">
          <path
            d="M10 0C4.477 0 0 4.477 0 10c0 7.5 10 14 10 14s10-6.5 10-14C20 4.477 15.523 0 10 0z"
            fill="#6c2f00"
          />
          <circle cx="10" cy="10" r="3.5" fill="#fcf9f0" />
        </svg>
      </div>

      {/* Label */}
      <div className="relative z-10 mt-5 text-center space-y-1">
        <p className="font-label text-[11px] tracking-widest uppercase text-[#6c2f00]/70">
          Parsha Map
        </p>
        <p className="text-xs text-stone-400 italic">
          Loading this week's portion…
        </p>
      </div>
    </div>
  )
}
