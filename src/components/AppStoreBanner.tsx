import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const BANNER_KEY = 'app-banner-dismissed'

export function AppStoreBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(BANNER_KEY)) return
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (!isMobile) return
    const timer = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  function handleDismiss() {
    setVisible(false)
    localStorage.setItem(BANNER_KEY, '1')
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-20 left-3 right-3 z-[2000] rounded-xl bg-surface-container-high shadow-lg border border-outline-variant p-3 flex items-center gap-3">
      <img src="/icon-192.png" alt="Parsha Map" className="w-10 h-10 rounded-xl shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-label text-xs font-semibold text-on-surface">Parsha Map</p>
        <p className="font-label text-[10px] text-on-surface-variant">Better on the iPhone app</p>
      </div>
      <a
        href="https://apps.apple.com/app/id6762464493"
        target="_blank"
        rel="noreferrer"
        className="shrink-0 px-3 py-1.5 bg-primary text-on-primary rounded-lg font-label text-xs font-semibold"
        onClick={handleDismiss}
      >
        Get App
      </a>
      <button
        onClick={handleDismiss}
        className="shrink-0 p-1 text-on-surface-variant"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  )
}
