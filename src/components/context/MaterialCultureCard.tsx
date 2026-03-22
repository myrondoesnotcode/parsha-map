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
    <div className="rounded overflow-hidden shadow-ambient">
      <div className="px-4 py-2 bg-surface-container-high">
        <h4 className="font-label text-xs font-semibold text-on-surface-variant uppercase tracking-widest">
          Material Culture
        </h4>
        {era && (
          <p className="font-label text-[10px] text-on-surface-variant/60 mt-0.5">
            {era.name} · {era.endBCE}–{era.startBCE} BCE · Content reflects this era; multiple Torah portions may share it
          </p>
        )}
      </div>

      <Tabs.Root defaultValue="writing">
        <Tabs.List className="flex bg-surface-container overflow-x-auto">
          {TABS.map((tab) => (
            <Tabs.Trigger
              key={tab.id}
              value={tab.id}
              className={cn(
                'px-3 py-2 font-label text-xs font-medium whitespace-nowrap shrink-0',
                'text-on-surface-variant border-b-2 border-transparent',
                'data-[state=active]:text-primary data-[state=active]:border-primary',
                'hover:text-on-surface transition-colors outline-none'
              )}
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {TABS.map((tab) => (
          <Tabs.Content key={tab.id} value={tab.id} className="p-4 bg-surface-container">
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              {getContent(entry, tab.id)}
            </p>
          </Tabs.Content>
        ))}
      </Tabs.Root>

      {entry.keyPowers.length > 0 && (
        <div className="px-4 pb-3 bg-surface-container">
          <p className="font-label text-[10px] font-medium text-on-surface-variant uppercase tracking-widest mb-2 pt-2">
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
                    className="px-2 py-0.5 font-label text-xs rounded-full bg-surface-container-high text-on-surface hover:bg-primary-container hover:text-on-primary-container transition-colors cursor-pointer"
                    title={`View details: ${matched.name}`}
                  >
                    {power}
                  </button>
                )
              }
              return (
                <span
                  key={power}
                  className="px-2 py-0.5 font-label text-xs rounded-full bg-surface-container-high text-on-surface"
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
