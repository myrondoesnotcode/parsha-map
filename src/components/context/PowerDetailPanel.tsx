import { X, MapPin, Calendar, Users, BookOpen } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { getPowerById } from '../../utils/powerUtils'

export function PowerDetailPanel() {
  const selectedPowerId = useAppStore((s) => s.selectedPowerId)
  const setSelectedPower = useAppStore((s) => s.setSelectedPower)

  const power = selectedPowerId ? getPowerById(selectedPowerId) : null

  return (
    <div
      className={`absolute inset-0 bg-white z-10 overflow-y-auto transition-transform duration-300 ${
        power ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {power && (
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-stone-900">{power.name}</h3>
              {power.alternateNames.length > 0 && (
                <p className="text-xs text-stone-400 mt-0.5">
                  Also: {power.alternateNames.slice(0, 3).join(', ')}
                </p>
              )}
            </div>
            <button
              onClick={() => setSelectedPower(null)}
              className="flex-shrink-0 p-1 rounded hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
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
            <div className="flex items-center gap-1 text-xs text-stone-500">
              <Calendar size={11} />
              <span>
                {power.startBCE} – {power.endBCE} BCE
              </span>
            </div>
          </div>

          {/* Capital */}
          <div className="flex items-start gap-1.5 text-xs">
            <MapPin size={12} className="text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium text-stone-700">Capital: </span>
              <span className="text-stone-600">{power.capital.name}</span>
              {power.capital.modernName && (
                <span className="text-stone-400"> ({power.capital.modernName})</span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-stone-600 leading-relaxed">{power.description}</p>

          {/* Relationship to Israel */}
          <div className="bg-amber-50 rounded-lg p-3">
            <p className="text-[10px] uppercase font-medium text-amber-700 mb-1.5 tracking-wide">
              Relationship to Israel
            </p>
            <p className="text-xs text-stone-700 leading-relaxed">{power.israelRelationship}</p>
          </div>

          {/* Biblical Figures */}
          {power.biblicalFigures.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Users size={12} className="text-stone-400" />
                <p className="text-[10px] uppercase font-medium text-stone-400 tracking-wide">
                  Key Figures
                </p>
              </div>
              <div className="flex flex-wrap gap-1">
                {power.biblicalFigures.map((fig) => (
                  <span
                    key={fig}
                    className="px-2 py-0.5 bg-stone-100 text-stone-600 text-[11px] rounded-full"
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
                <BookOpen size={12} className="text-stone-400" />
                <p className="text-[10px] uppercase font-medium text-stone-400 tracking-wide">
                  Biblical Events
                </p>
              </div>
              <ul className="space-y-1">
                {power.biblicalEvents.map((event) => (
                  <li
                    key={event}
                    className="text-[11px] text-stone-600 pl-2 border-l-2 border-amber-200 leading-relaxed"
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
