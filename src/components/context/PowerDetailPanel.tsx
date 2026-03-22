import { X, MapPin, Calendar, Users, BookOpen } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { getPowerById } from '../../utils/powerUtils'

export function PowerDetailPanel() {
  const selectedPowerId = useAppStore((s) => s.selectedPowerId)
  const setSelectedPower = useAppStore((s) => s.setSelectedPower)

  const power = selectedPowerId ? getPowerById(selectedPowerId) : null

  return (
    <div
      className={`absolute inset-0 bg-surface z-10 overflow-y-auto transition-transform duration-300 ${
        power ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {power && (
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-headline text-base font-semibold text-on-surface">{power.name}</h3>
              {power.alternateNames.length > 0 && (
                <p className="font-label text-xs text-on-surface-variant mt-0.5">
                  Also: {power.alternateNames.slice(0, 3).join(', ')}
                </p>
              )}
            </div>
            <button
              onClick={() => setSelectedPower(null)}
              className="flex-shrink-0 p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          {/* Date range badge */}
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-sm flex-shrink-0"
              style={{ backgroundColor: power.color }}
            />
            <div className="flex items-center gap-1 font-label text-xs text-on-surface-variant">
              <Calendar size={11} />
              <span>
                {power.startBCE} – {power.endBCE} BCE
              </span>
            </div>
          </div>

          {/* Capital */}
          <div className="flex items-start gap-1.5 font-label text-xs">
            <MapPin size={12} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium text-on-surface">Capital: </span>
              <span className="text-on-surface-variant">{power.capital.name}</span>
              {power.capital.modernName && (
                <span className="text-on-surface-variant/50"> ({power.capital.modernName})</span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="font-body text-xs text-on-surface-variant leading-relaxed">{power.description}</p>

          {/* Relationship to Israel */}
          <div className="bg-primary-container rounded p-3">
            <p className="font-label text-[10px] uppercase font-medium text-on-primary-container mb-1.5 tracking-widest">
              Relationship to Israel
            </p>
            <p className="font-body text-xs text-on-primary-container leading-relaxed">{power.israelRelationship}</p>
          </div>

          {/* Biblical Figures */}
          {power.biblicalFigures.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Users size={12} className="text-on-surface-variant" />
                <p className="font-label text-[10px] uppercase font-medium text-on-surface-variant tracking-widest">
                  Key Figures
                </p>
              </div>
              <div className="flex flex-wrap gap-1">
                {power.biblicalFigures.map((fig) => (
                  <span
                    key={fig}
                    className="px-2 py-0.5 bg-surface-container font-label text-on-surface text-[11px] rounded-full"
                  >
                    {fig}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Biblical Events */}
          {power.biblicalEvents.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <BookOpen size={12} className="text-on-surface-variant" />
                <p className="font-label text-[10px] uppercase font-medium text-on-surface-variant tracking-widest">
                  Biblical Events
                </p>
              </div>
              <ul className="space-y-1">
                {power.biblicalEvents.map((event) => (
                  <li
                    key={event}
                    className="font-body text-[11px] text-on-surface-variant pl-2 border-l-2 border-primary/20 leading-relaxed"
                  >
                    {event}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
