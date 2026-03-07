import { useState } from 'react'
import { X, Mail } from 'lucide-react'

// ─── Configure this once you've set up your Beehiiv publication ───────────────
// 1. Go to beehiiv.com, create a free account + publication
// 2. Go to Settings → Embed → copy the form action URL
// 3. Paste it here, e.g. "https://embeds.beehiiv.com/abc123"
const NEWSLETTER_FORM_URL = ''
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  open: boolean
  onClose: () => void
}

export function NewsletterModal({ open, onClose }: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  if (!open) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    if (!NEWSLETTER_FORM_URL) {
      // Not configured yet — open Beehiiv directly
      window.open('https://beehiiv.com', '_blank')
      return
    }

    setStatus('loading')
    try {
      const form = new FormData()
      form.append('email', email)
      await fetch(NEWSLETTER_FORM_URL, { method: 'POST', body: form, mode: 'no-cors' })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[3000] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed z-[3001] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-32px)] max-w-sm">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400" />

          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-amber-500 shrink-0" />
                <h2 className="text-base font-semibold text-stone-800">Weekly Parsha</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
                aria-label="Close"
              >
                <X size={15} />
              </button>
            </div>

            {status === 'success' ? (
              <div className="text-center py-4">
                <div className="text-3xl mb-2">📬</div>
                <p className="text-sm font-medium text-stone-800">You're in!</p>
                <p className="text-xs text-stone-500 mt-1">Check your inbox to confirm your subscription.</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-stone-500 mb-4">
                  Get the current Torah portion, its places, and historical context delivered to your inbox every week.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full text-sm px-3 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-medium rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all disabled:opacity-60"
                  >
                    {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
                  </button>
                  {status === 'error' && (
                    <p className="text-xs text-red-500 text-center">Something went wrong. Try again.</p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
