import { useState, useEffect } from 'react'
import { ParshaSelector } from '../parsha/ParshaSelector'
import { ParshaHeader } from '../parsha/ParshaHeader'
import { ParshaTextViewer } from '../parsha/ParshaTextViewer'
import { useAppStore } from '../../store/useAppStore'
import { useTranslation } from '../../i18n/useTranslation'
import { Search } from 'lucide-react'

export function Sidebar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)
  const t = useTranslation()

  // Reset scroll state when parsha changes
  useEffect(() => {
    setIsScrolled(false)
  }, [selectedParshaId])

  return (
    <div className="flex flex-col md:h-full">
      {/* Selector + search */}
      <div className="px-4 pt-4 pb-3 bg-surface-container-low shrink-0 space-y-3">
        <div className="relative">
          <Search
            size={12}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
          />
          <input
            type="search"
            placeholder={t.sidebar.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-5 pr-3 py-2 font-label text-xs border-0 border-b border-outline/30 rounded-none bg-transparent text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-tertiary transition-colors"
          />
        </div>
        <ParshaSelector filterQuery={searchQuery} />
      </div>

      {/* Parsha header with name + dates */}
      <ParshaHeader summaryCollapsed={isScrolled} />

      {/* Scrollable verse text */}
      <ParshaTextViewer onScrollStart={() => setIsScrolled(true)} />
    </div>
  )
}
