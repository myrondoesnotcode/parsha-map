import { useAppStore } from '../../store/useAppStore'
import { PLACE_TYPE_FILTERS } from '../../utils/placeUtils'

export function PlaceTypeFilter() {
  const placeTypeFilter = useAppStore((s) => s.placeTypeFilter)
  const setPlaceTypeFilter = useAppStore((s) => s.setPlaceTypeFilter)

  return (
    <div className="flex gap-1 flex-wrap">
      {PLACE_TYPE_FILTERS.map((filter) => {
        const active = placeTypeFilter === filter.id
        return (
          <button
            key={filter.id}
            onClick={() => setPlaceTypeFilter(filter.id)}
            className={`px-2 py-0.5 text-[11px] rounded-full border transition-colors ${
              active
                ? 'bg-amber-500 border-amber-500 text-white'
                : 'bg-white border-stone-200 text-stone-500 hover:border-amber-300 hover:text-stone-700'
            }`}
          >
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}
