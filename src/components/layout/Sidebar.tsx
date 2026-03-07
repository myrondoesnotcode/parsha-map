import { useState } from 'react'
import { ParshaSelector } from '../parsha/ParshaSelector'
import { ParshaHeader } from '../parsha/ParshaHeader'
import { ParshaTextViewer } from '../parsha/ParshaTextViewer'
import { Search } from 'lucide-react'

export function Sidebar() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="flex flex-col h-full">
      {/* Selector + search */}
      <div className="p-3 border-b border-stone-100 shrink-0 space-y-2">
        <div className="relative">
          <Search
            size={12}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
          />
          <input
            type="search"
            placeholder="Search portions…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-7 pr-3 py-2 text-xs border border-stone-200 rounded-xl bg-white text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
        <ParshaSelector filterQuery={searchQuery} />
      </div>

      {/* Parsha header with name + dates */}
      <ParshaHeader />

      {/* Scrollable verse text */}
      <ParshaTextViewer />
    </div>
  )
}
