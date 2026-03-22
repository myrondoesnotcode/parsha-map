import * as Slider from '@radix-ui/react-slider'
import { useAppStore } from '../../store/useAppStore'
import { useEraContext } from '../../hooks/useEraContext'
import { SLIDER_MIN, SLIDER_MAX } from '../../utils/yearUtils'
import timeline from '../../data/timeline.json'
import type { Era } from '../../types/timeline'

const eras = timeline as Era[]
const TOTAL_SPAN = SLIDER_MAX - SLIDER_MIN

export function TimelineSlider() {
  const currentYearBCE = useAppStore((s) => s.currentYearBCE)
  const setCurrentYear = useAppStore((s) => s.setCurrentYear)
  const { era } = useEraContext(currentYearBCE)

  return (
    <div className="space-y-1.5 select-none">

      {/* Row 1: Era name + year */}
      <div className="flex items-center gap-2">
        {era && (
          <div
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: era.color }}
          />
        )}
        <span className="font-label text-xs font-semibold text-on-surface truncate leading-none">
          {era ? era.name : 'Unknown Period'}
        </span>
        <span className="ml-auto font-label text-xs text-on-surface-variant shrink-0 tabular-nums leading-none">
          {currentYearBCE.toLocaleString()} BCE
        </span>
      </div>

      {/* Row 2: Era bands (clickable) with slider overlaid */}
      <div className="relative h-7">

        {/* Colored era bands — visual background */}
        <div className="absolute inset-x-0 top-1.5 bottom-1.5 flex gap-px rounded-full overflow-hidden pointer-events-none">
          {eras.map((e) => {
            const widthPct = ((e.startBCE - e.endBCE) / TOTAL_SPAN) * 100
            return (
              <div
                key={e.id}
                className="h-full transition-opacity duration-200"
                style={{
                  width: `${widthPct}%`,
                  backgroundColor: e.color,
                  opacity: era?.id === e.id ? 1 : 0.35,
                }}
              />
            )
          })}
        </div>

        {/* Era click zones — invisible, let you jump to an era */}
        <div className="absolute inset-0 flex gap-px">
          {eras.map((e) => {
            const widthPct = ((e.startBCE - e.endBCE) / TOTAL_SPAN) * 100
            const midpoint = Math.round((e.startBCE + e.endBCE) / 2)
            return (
              <button
                key={e.id}
                onClick={() => setCurrentYear(midpoint)}
                title={`${e.name} — ${e.startBCE}–${e.endBCE} BCE`}
                className="h-full hover:bg-white/25 transition-colors"
                style={{ width: `${widthPct}%` }}
              />
            )
          })}
        </div>

        {/* Slider — transparent track, amber thumb rides on top */}
        <Slider.Root
          className="absolute inset-0 flex items-center touch-none"
          value={[currentYearBCE]}
          min={SLIDER_MIN}
          max={SLIDER_MAX}
          step={50}
          inverted
          onValueChange={([val]) => setCurrentYear(val)}
          aria-label="Timeline year"
        >
          <Slider.Track className="relative grow h-full bg-transparent">
            <Slider.Range className="bg-transparent" />
          </Slider.Track>
          <Slider.Thumb
            className="block w-5 h-5 rounded-full bg-surface border-[2.5px] border-primary
              shadow-ambient-md hover:border-primary/80 cursor-grab active:cursor-grabbing
              focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-1
              transition-colors z-10"
          />
        </Slider.Root>
      </div>
    </div>
  )
}
