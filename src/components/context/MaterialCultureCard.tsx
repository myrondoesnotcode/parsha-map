import * as Tabs from '@radix-ui/react-tabs'
import { cn } from '../../utils/cn'
import type { MaterialCultureEntry, Era } from '../../types/timeline'
import { getPowerByLabel } from '../../utils/powerUtils'
import { useAppStore } from '../../store/useAppStore'

interface Props {
  entry: MaterialCultureEntry
  era?: Era
}

const TABS = [
  { id: 'writing', label: 'Writing' },
  { id: 'politics', label: 'Politics' },
  { id: 'trade', label: 'Trade' },
  { id: 'religion', label: 'Religion' },
  { id: 'architecture', label: 'Building' },
] as const

type TabId = (typeof TABS)[number]['id']

function getContent(entry: MaterialCultureEntry, tab: TabId): string {
  return entry[tab] ?? ''
}

export function MaterialCultureCard({ entry, era }: Props) {
  const setSelectedPower = useAppStore((s) => s.setSelectedPower)

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm ring-1 ring-stone-100">
      <div className="px-4 py-2 bg-stone-50 border-b border-stone-100">
        <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
          Material Culture
        </h4>
        {era && (
          <p className="text-[10px] text-stone-400 mt-0.5">
            {era.name} · {era.endBCE}–{era.startBCE} BCE · Content reflects this era; multiple Torah portions may share it
          </p>
        )}
      </div>

      <Tabs.Root defaultValue="writing">
        <Tabs.List className="flex border-b border-stone-100 bg-white overflow-x-auto">
          {TABS.map((tab) => (
            <Tabs.Trigger
              key={tab.id}
              value={tab.id}
              className={cn(
                'px-3 py-2 text-xs font-medium whitespace-nowrap shrink-0',
                'text-stone-500 border-b-2 border-transparent',
                'data-[state=active]:text-amber-700 data-[state=active]:border-amber-500',
                'hover:text-stone-700 transition-colors outline-none'
              )}
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {TABS.map((tab) => (
          <Tabs.Content key={tab.id} value={tab.id} className="p-4">
            <p className="text-xs text-stone-600 leading-relaxed">
              {getContent(entry, tab.id)}
            </p>
          </Tabs.Content>
        ))}
      </Tabs.Root>

      {entry.keyPowers.length > 0 && (
        <div className="px-4 pb-3 border-t border-stone-100">
          <p className="text-xs font-medium text-stone-400 uppercase tracking-wide mb-2 pt-2">
            Key Powers
          </p>
          <div className="flex flex-wrap gap-1.5">
            {entry.keyPowers.map((power) => {
              const matched = getPowerByLabel(power)
              if (matched) {
                return (
                  <button
                    key={power}
                    onClick={() => setSelectedPower(matched.id)}
                    className="px-2 py-0.5 text-xs rounded-full bg-stone-100 text-stone-600 hover:bg-amber-100 hover:text-amber-800 transition-colors cursor-pointer"
                    title={`View details: ${matched.name}`}
                  >
                    {power}
                  </button>
                )
              }
              return (
                <span
                  key={power}
                  className="px-2 py-0.5 text-xs rounded-full bg-stone-100 text-stone-600"
                >
                  {power}
                </span>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
