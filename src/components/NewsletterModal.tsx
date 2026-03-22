import { useEffect } from 'react'
import { X, Mail } from 'lucide-react'

const BEEHIIV_EMBED_URL = 'https://subscribe-forms.beehiiv.com/288d0ecc-e516-46d9-9047-716e43f4ae6a'

interface Props {
  open: boolean
  onClose: () => void
}

export function NewsletterModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return
    if (document.querySelector('script[src*="beehiiv.com/embed.js"]')) return
    const script = document.createElement('script')
    script.src = 'https://subscribe-forms.beehiiv.com/embed.js'
    script.async = true
    document.head.appendChild(script)
  }, [open])

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[3000] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed z-[3001] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-24px)] max-w-sm">
        <div className="bg-surface rounded shadow-ambient overflow-hidden">
          <div className="h-0.5 w-full bg-primary" />

          {/* Header */}
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-primary shrink-0" />
              <h2 className="font-headline text-base font-semibold text-on-surface">Weekly Parsha</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              aria-label="Close"
            >
              <X size={15} />
            </button>
          </div>

          {/* Beehiiv form — fixed at its natural 300px and centered */}
          <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 8 }}>
            <iframe
              src={BEEHIIV_EMBED_URL}
              className="beehiiv-embed"
              data-test-id="beehiiv-embed"
              frameBorder={0}
              scrolling="no"
              style={{
                display: 'block',
                width: 300,
                height: 340,
                backgroundColor: 'transparent',
                boxShadow: 'none',
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
