import * as Select from '@radix-ui/react-select'
import { ChevronDown, ChevronUp, Check } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { getParshasGroupedByBook, BOOKS_ORDER } from '../../utils/parshaUtils'
import { formatYearBCE } from '../../utils/yearUtils'
import { cn } from '../../utils/cn'
import type { ParshaListItem } from '../../types/parsha'

function parshaDateLabel(parsha: ParshaListItem): string | null {
  const { start, end } = parsha.approximateDateBCE
  if (!start) return null
  if (!end || end === start) return formatYearBCE(start)
  return `${start.toLocaleString()}–${end.toLocaleString()} BCE`
}

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
          'flex items-center justify-between w-full px-3 py-2',
          'bg-surface-container rounded',
          'font-label text-sm text-on-surface hover:bg-surface-container-high',
          'focus:outline-none focus:ring-1 focus:ring-primary/40',
          'transition-colors'
        )}
        aria-label="Select Parsha"
      >
        <Select.Value placeholder="Choose a Torah portion…" />
        <Select.Icon className="ml-2 text-stone-400">
          <ChevronDown size={16} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className={cn(
            'z-50 overflow-hidden rounded bg-surface shadow-ambient-md',
            'max-h-[60vh] w-[--radix-select-trigger-width]'
          )}
          position="popper"
          sideOffset={4}
        >
          <Select.ScrollUpButton className="flex items-center justify-center py-1 text-on-surface-variant bg-surface">
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
                  <Select.Label className="px-3 py-1.5 font-label text-xs text-on-surface-variant uppercase tracking-widest">
                    {book}
                  </Select.Label>
                  {items.map((parsha) => (
                    <Select.Item
                      key={parsha.id}
                      value={parsha.id}
                      className={cn(
                        'flex items-center gap-2 px-3 py-1.5 font-label text-sm rounded cursor-pointer',
                        'text-on-surface select-none outline-none',
                        'data-[highlighted]:bg-primary-container data-[highlighted]:text-on-primary-container',
                        'data-[state=checked]:text-primary data-[state=checked]:font-medium'
                      )}
                    >
                      <Select.ItemIndicator className="text-primary">
                        <Check size={12} />
                      </Select.ItemIndicator>
                      <Select.ItemText>
                        <span>{parsha.name}</span>
                        <span className="ml-1.5 text-stone-400 font-hebrew text-xs">
                          {parsha.hebrewName}
                        </span>
                        {parshaDateLabel(parsha) && (
                          <span className="ml-2 text-stone-400 text-xs font-sans">
                            · {parshaDateLabel(parsha)}
                          </span>
                        )}
                      </Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Group>
              )
            })}
          </Select.Viewport>

          <Select.ScrollDownButton className="flex items-center justify-center py-1 text-on-surface-variant bg-surface">
            <ChevronDown size={14} />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
