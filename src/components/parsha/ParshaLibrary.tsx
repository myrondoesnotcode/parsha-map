import { useState } from 'react'
import { Search } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { getParshasGroupedByBook, BOOKS_ORDER } from '../../utils/parshaUtils'
import parshaList from '../../data/parshaList.json'
import type { ParshaListItem } from '../../types/parsha'

const parshas = parshaList as ParshaListItem[]
const grouped = getParshasGroupedByBook()

const BOOK_HEBREW: Record<string, string> = {
  Genesis: 'בְּרֵאשִׁית',
  Exodus: 'שְׁמוֹת',
  Leviticus: 'וַיִּקְרָא',
  Numbers: 'בְּמִדְבַּר',
  Deuteronomy: 'דְּבָרִים',
}

function verseRange(seferiaUrl: string): string {
  // e.g. "Genesis.1.1-6.8" → "1:1 – 6:8"
  const parts = seferiaUrl.split('.')
  if (parts.length < 3) return ''
  const range = parts.slice(1).join('.') // "1.1-6.8"
  return range.replace(/\./g, ':').replace('-', ' – ')
}

function matchesQuery(parsha: ParshaListItem, query: string): boolean {
  const q = query.toLowerCase()
  return (
    parsha.name.toLowerCase().includes(q) ||
    parsha.hebrewName.includes(q) ||
    parsha.book.toLowerCase().includes(q)
  )
}

interface Props {
  onSelect?: () => void
}

export function ParshaLibrary({ onSelect }: Props) {
  const [query, setQuery] = useState('')
  const setSelectedParsha = useAppStore((s) => s.setSelectedParsha)
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)

  const q = query.trim()

  const handleSelect = (id: string) => {
    setSelectedParsha(id)
    onSelect?.()
  }

  return (
    <div className="flex flex-col h-full bg-surface-container-low overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 shrink-0">
        <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-1">
          Digital Archivist Index
        </p>
        <h1 className="font-headline text-3xl font-bold text-on-surface leading-tight">
          Parsha Library
        </h1>

        {/* Search */}
        <div className="relative mt-4">
          <Search
            size={13}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
          />
          <input
            type="search"
            placeholder="Search the scrolls…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-5 pr-3 py-2 font-label text-sm border-0 border-b border-outline/30 rounded-none bg-transparent text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-tertiary transition-colors"
          />
        </div>
      </div>

      {/* Parsha list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-5 pb-8">
        {BOOKS_ORDER.map((book) => {
          const items = q
            ? parshas.filter((p) => p.book === book && matchesQuery(p, q))
            : grouped[book] ?? []
          if (items.length === 0) return null

          return (
            <div key={book} className="mb-8">
              {/* Book header */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                  {book}
                </span>
                <span className="font-hebrew text-sm text-on-surface-variant/60">
                  {BOOK_HEBREW[book]}
                </span>
              </div>

              {/* Parsha rows */}
              <div className="space-y-6">
                {items.map((parsha) => {
                  const isSelected = parsha.id === selectedParshaId
                  return (
                    <button
                      key={parsha.id}
                      onClick={() => handleSelect(parsha.id)}
                      className={`w-full text-left flex items-center gap-4 group transition-opacity ${
                        isSelected ? 'opacity-100' : 'opacity-90 hover:opacity-100'
                      }`}
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-16 shrink-0 bg-surface-container overflow-hidden rounded">
                        {parsha.doreImageUrl ? (
                          <img
                            src={parsha.doreImageUrl}
                            alt={parsha.name}
                            className="w-full h-full object-cover mix-blend-multiply"
                          />
                        ) : (
                          <div className="w-full h-full bg-surface-container-high" />
                        )}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className={`font-headline text-base leading-snug transition-colors ${
                            isSelected
                              ? 'text-primary'
                              : 'text-on-surface group-hover:text-primary'
                          }`}>
                            {parsha.name}
                          </span>
                          <span className="font-hebrew text-sm text-on-surface-variant shrink-0">
                            {parsha.hebrewName}
                          </span>
                        </div>
                        <p className="font-label text-xs text-on-surface-variant mt-0.5 uppercase tracking-wide">
                          {book} · {verseRange(parsha.seferiaUrl)}
                        </p>
                      </div>

                      {/* Selected indicator */}
                      {isSelected && (
                        <div className="w-1 h-8 bg-primary rounded-full shrink-0" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
