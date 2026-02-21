import * as Select from '@radix-ui/react-select'
import { ChevronDown, ChevronUp, Check } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { getParshasGroupedByBook, BOOKS_ORDER } from '../../utils/parshaUtils'
import { cn } from '../../utils/cn'
import type { ParshaListItem } from '../../types/parsha'

const grouped = getParshasGroupedByBook()

interface Props {
  filterQuery?: string
}

function matchesQuery(parsha: ParshaListItem, query: string): boolean {
  const q = query.toLowerCase()
  return (
    parsha.name.toLowerCase().includes(q) ||
    parsha.hebrewName.includes(q) ||
    parsha.book.toLowerCase().includes(q)
  )
}

export function ParshaSelector({ filterQuery }: Props) {
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)
  const setSelectedParsha = useAppStore((s) => s.setSelectedParsha)

  const q = filterQuery?.trim() ?? ''

  return (
    <Select.Root value={selectedParshaId ?? ''} onValueChange={setSelectedParsha}>
      <Select.Trigger
        className={cn(
          'flex items-center justify-between w-full px-3 py-2 text-sm',
          'border border-stone-200 rounded-lg bg-white',
          'text-stone-800 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-500',
          'transition-colors'
        )}
        aria-label="Select Parsha"
      >
        <Select.Value placeholder="Choose a Parsha…" />
        <Select.Icon className="ml-2 text-stone-400">
          <ChevronDown size={16} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className={cn(
            'z-50 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xl',
            'max-h-[60vh] w-[--radix-select-trigger-width]'
          )}
          position="popper"
          sideOffset={4}
        >
          <Select.ScrollUpButton className="flex items-center justify-center py-1 text-stone-400 bg-white">
            <ChevronUp size={14} />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-1">
            {BOOKS_ORDER.map((book) => {
              const items = q
                ? grouped[book].filter((p) => matchesQuery(p, q))
                : grouped[book]
              if (items.length === 0) return null
              return (
                <Select.Group key={book}>
                  <Select.Label className="px-3 py-1.5 text-xs font-semibold text-stone-400 uppercase tracking-wide">
                    {book}
                  </Select.Label>
                  {items.map((parsha) => (
                    <Select.Item
                      key={parsha.id}
                      value={parsha.id}
                      className={cn(
                        'flex items-center gap-2 px-3 py-1.5 text-sm rounded-md cursor-pointer',
                        'text-stone-700 select-none outline-none',
                        'data-[highlighted]:bg-amber-50 data-[highlighted]:text-amber-900',
                        'data-[state=checked]:font-medium'
                      )}
                    >
                      <Select.ItemIndicator className="text-amber-600">
                        <Check size={12} />
                      </Select.ItemIndicator>
                      <Select.ItemText>
                        <span>{parsha.name}</span>
                        <span className="ml-1.5 text-stone-400 font-hebrew text-xs">
                          {parsha.hebrewName}
                        </span>
                      </Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Group>
              )
            })}
          </Select.Viewport>

          <Select.ScrollDownButton className="flex items-center justify-center py-1 text-stone-400 bg-white">
            <ChevronDown size={14} />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
