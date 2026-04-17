import * as Tabs from '@radix-ui/react-tabs'
import { X, MapPin } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useAppStore } from '../../../store/useAppStore'
import { fetchWikipediaSummary } from '../../../api/wikipedia'
import { fetchVerseText, fetchSefariaTopicBySlug } from '../../../api/sefaria'
import { queryKeys } from '../../../api/queryKeys'
import { getParshaById } from '../../../utils/parshaUtils'
import { cn } from '../../../utils/cn'
import placesData from '../../../data/places.json'
import sitesData from '../../../data/archaeologicalSites.json'
import type { Place } from '../../../types/places'
import type { ArchaeologicalSite } from '../../../hooks/useArchaeologicalSites'
import type { ParshaListItem } from '../../../types/parsha'
import { PlaceTab } from './PlaceTab'
import { PeopleEventsTab } from './PeopleEventsTab'

const allPlaces = placesData as Place[]
const allSites = sitesData as ArchaeologicalSite[]

const SLUG_OVERRIDES: Record<string, string> = {
  'Mount Sinai': 'mount-sinai',
  'Ur of the Chaldees': 'ur-of-the-chaldees',
  'Jordan River': 'jordan-river',
  'Dead Sea': 'dead-sea',
  'Nile River': 'nile-river',
  'Nile': 'nile-river',
  'Sea of Reeds': 'sea-of-reeds',
  'Mount Moriah': 'mount-moriah',
  'Goshen': 'goshen',
  'Midian': 'midian',
  'Canaan': 'canaan',
  'Jerusalem': 'jerusalem',
  'Jericho': 'jericho',
  'Hebron': 'hebron',
  'Beersheba': 'beersheba',
  'Bethel': 'bethel',
  'Shechem': 'shechem',
  'Egypt': 'egypt',
  'Haran': 'haran',
}

function deriveSefariaSlug(name: string): string {
  if (SLUG_OVERRIDES[name]) return SLUG_OVERRIDES[name]
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export function PlaceDetailPanel() {
  const selectedPlacePanel = useAppStore((s) => s.selectedPlacePanel)
  const closePlacePanel = useAppStore((s) => s.closePlacePanel)
  const setSelectedParsha = useAppStore((s) => s.setSelectedParsha)
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)

  const item = selectedPlacePanel
    ? selectedPlacePanel.type === 'place'
      ? allPlaces.find((p) => p.id === selectedPlacePanel.id)
      : allSites.find((s) => s.id === selectedPlacePanel.id)
    : null

  const isPlace = selectedPlacePanel?.type === 'place'
  const place = isPlace ? (item as Place) : null
  const slug = item ? deriveSefariaSlug(item.name) : null

  const otherParshas = place
    ? place.parshas
        .filter((id) => id !== selectedParshaId)
        .map((id) => getParshaById(id))
        .filter((p): p is ParshaListItem => p !== undefined)
    : []

  const { data: wiki, isLoading: wikiLoading } = useQuery({
    queryKey: queryKeys.wikipedia(item?.name ?? ''),
    queryFn: () => fetchWikipediaSummary(item!.name),
    enabled: !!item,
    staleTime: 1000 * 60 * 60,
    retry: false,
  })

  const firstVerse = place?.verses?.[0] ?? null
  const { data: verseText } = useQuery({
    queryKey: queryKeys.verseText(firstVerse ?? ''),
    queryFn: () => fetchVerseText(firstVerse!),
    enabled: !!firstVerse && !!selectedPlacePanel,
    staleTime: 1000 * 60 * 60 * 24 * 7,
    retry: false,
  })

  const { data: topicData, isLoading: topicLoading } = useQuery({
    queryKey: queryKeys.sefariaTopics(slug ?? ''),
    queryFn: () => fetchSefariaTopicBySlug(slug!),
    enabled: !!slug && !!selectedPlacePanel,
    staleTime: 1000 * 60 * 60 * 24,
    retry: false,
  })

  // Collect people and event slugs from the dict-based links structure
  // e.g. links = { "person-participates-in-event": { links: [{topic: "moses"}] }, ... }
  const PEOPLE_LINK_TYPES = ['person-participates-in-event', 'has-leader', 'leader-of', 'lived-in', 'born-in', 'died-in', 'buried-in']
  const EVENT_LINK_TYPES = ['has-event', 'biblical-event']

  const peopleTopicSlugs: string[] = []
  const eventTopicSlugs: string[] = []

  if (topicData?.links) {
    for (const [linkType, linkGroup] of Object.entries(topicData.links)) {
      for (const entry of linkGroup.links) {
        if (PEOPLE_LINK_TYPES.includes(linkType)) {
          peopleTopicSlugs.push(entry.topic)
        } else if (EVENT_LINK_TYPES.includes(linkType)) {
          eventTopicSlugs.push(entry.topic)
        }
      }
    }
  }

  const showPeopleTab = peopleTopicSlugs.length > 0 || eventTopicSlugs.length > 0

  function handleNavigateParsha(id: string) {
    setSelectedParsha(id)
    closePlacePanel()
  }

  return (
    <div
      className={`absolute inset-y-0 right-0 left-0 sm:left-8 bg-surface z-10 transition-transform duration-300 sm:rounded-tl sm:rounded-bl shadow-ambient flex flex-col ${
        item ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {item && (
        <>
          {/* Header */}
          <div className="px-4 pt-4 pb-3 shrink-0 border-b border-outline/20">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-headline text-base font-semibold text-on-surface">{item.name}</h3>
                {item.alternateNames.length > 0 && (
                  <p className="font-label text-xs text-on-surface-variant mt-0.5">
                    Also: {item.alternateNames.slice(0, 4).join(', ')}
                  </p>
                )}
                {place?.modernName && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin size={10} className="text-primary" />
                    <p className="font-label text-xs text-on-surface-variant">
                      Modern: {place.modernName}
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={closePlacePanel}
                className="flex-shrink-0 p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs.Root defaultValue="place" className="flex flex-col flex-1 min-h-0">
            <Tabs.List className="flex shrink-0 border-b border-outline/20 px-4">
              <Tabs.Trigger
                value="place"
                className={cn(
                  'py-2 px-1 mr-4 font-label text-xs border-b-2 border-transparent text-on-surface-variant',
                  'data-[state=active]:border-primary data-[state=active]:text-on-surface',
                  'transition-colors outline-none'
                )}
              >
                Place
              </Tabs.Trigger>
              {showPeopleTab && (
                <Tabs.Trigger
                  value="people"
                  className={cn(
                    'py-2 px-1 font-label text-xs border-b-2 border-transparent text-on-surface-variant',
                    'data-[state=active]:border-primary data-[state=active]:text-on-surface',
                    'transition-colors outline-none'
                  )}
                >
                  People & Events
                </Tabs.Trigger>
              )}
            </Tabs.List>

            <Tabs.Content value="place" className="flex-1 overflow-y-auto scrollbar-thin p-4">
              <PlaceTab
                item={item}
                place={place}
                isPlace={!!isPlace}
                topicData={topicData ?? null}
                topicLoading={topicLoading}
                wiki={wiki}
                wikiLoading={wikiLoading}
                verseText={verseText}
                otherParshas={otherParshas}
                onNavigateParsha={handleNavigateParsha}
              />
            </Tabs.Content>

            {showPeopleTab && (
              <Tabs.Content
                value="people"
                className="flex-1 overflow-y-auto scrollbar-thin p-4 relative"
              >
                <PeopleEventsTab peopleSlugs={peopleTopicSlugs} eventSlugs={eventTopicSlugs} />
              </Tabs.Content>
            )}
          </Tabs.Root>
        </>
      )}
    </div>
  )
}
