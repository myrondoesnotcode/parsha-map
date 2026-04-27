import { useEffect, useState } from 'react'

export function SplashScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setVisible(false), 1200)
    const doneTimer = setTimeout(onDone, 1700)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0f172a]"
      style={{
        transition: 'opacity 500ms ease-out',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <img
        src="/icon-512.png"
        alt="Parsha Map"
        className="w-24 h-24 rounded-2xl shadow-2xl"
        style={{ animation: 'splashPulse 1s ease-out forwards' }}
      />
      <p className="mt-4 font-hebrew text-2xl font-medium text-white tracking-wide">Parsha</p>
      <p className="font-label text-[11px] text-white/50 tracking-widest uppercase mt-0.5">Map</p>
      <style>{`
        @keyframes splashPulse {
          0% { opacity: 0; transform: scale(0.88); }
          60% { opacity: 1; transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
