import { useState, useEffect } from 'react'
import { Bell, X } from 'lucide-react'

const PROMPT_KEY = 'notif-prompt-dismissed'

export function NotificationPrompt() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(PROMPT_KEY)) return
    if (typeof Notification === 'undefined' || Notification.permission !== 'default') return
    const timer = setTimeout(() => setVisible(true), 30_000)
    return () => clearTimeout(timer)
  }, [])

  function handleEnable() {
    setVisible(false)
    localStorage.setItem(PROMPT_KEY, '1')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).OneSignalDeferred?.push((OneSignal: { showNativePrompt: () => void }) => {
      OneSignal.showNativePrompt()
    })
  }

  function handleDismiss() {
    setVisible(false)
    localStorage.setItem(PROMPT_KEY, '1')
  }

  if (!visible) return null

  return (
    <div className="absolute bottom-0 left-0 right-0 z-[2000] mx-3 mb-3 rounded-xl bg-surface-container-high shadow-lg border border-outline-variant p-3 flex items-center gap-3">
      <Bell size={18} className="text-primary shrink-0" />
      <p className="flex-1 font-label text-xs text-on-surface leading-snug">
        Get weekly parsha reminders every Shabbat
      </p>
      <button
        onClick={handleEnable}
        className="shrink-0 px-3 py-1.5 bg-primary text-on-primary rounded-lg font-label text-xs font-medium"
      >
        Enable
      </button>
      <button
        onClick={handleDismiss}
        className="shrink-0 p-1 text-on-surface-variant hover:text-on-surface"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  )
}
