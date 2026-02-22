import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useAllTradeRoutes } from '../../hooks/useTradeRoutes'
import { useAppStore } from '../../store/useAppStore'
import { useTerritories } from '../../hooks/useTerritories'

export function MapLegend() {
  const routes = useAllTradeRoutes()
  const showTerritories = useAppStore((s) => s.showTerritories)
  const showArchaeologicalSites = useAppStore((s) => s.showArchaeologicalSites)
  const currentYearBCE = useAppStore((s) => s.currentYearBCE)
  const territories = useTerritories(currentYearBCE)
  const [collapsed, setCollapsed] = useState(false)

  const hasContent =
    showArchaeologicalSites ||
    routes.length > 0 ||
    (showTerritories && territories.length > 0)

  if (!hasContent) return null

  return (
    <div className="absolute bottom-6 left-3 z-[1000] bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-md border border-stone-200 px-3 py-2 text-xs">
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="flex items-center justify-between w-full gap-2"
      >
        <p className="font-semibold text-stone-600 text-[10px] uppercase tracking-wide">
          Legend
        </p>
        {collapsed ? (
          <ChevronDown size={12} className="text-stone-400" />
        ) : (
          <ChevronUp size={12} className="text-stone-400" />
        )}
      </button>

      {!collapsed && <div className="space-y-1.5 mt-1.5">

      {/* Archaeological sites */}
      {showArchaeologicalSites && (
        <div className="pt-1 border-t border-stone-100">
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 border-2 border-white shadow-sm shrink-0"
              style={{
                backgroundColor: '#7C3AED',
                transform: 'rotate(45deg)',
              }}
            />
            <span className="text-stone-500">Archaeological site</span>
          </div>
        </div>
      )}

      {/* Trade routes */}
      {routes.length > 0 && (
        <div className="space-y-1 pt-1 border-t border-stone-100">
          {routes.map((r) => (
            <div key={r.properties.id} className="flex items-center gap-2">
              <div
                className="h-0.5 w-5 shrink-0"
                style={{
                  borderTop: `2px dashed ${r.properties.color}`,
                }}
              />
              <span className="text-stone-500">{r.properties.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Territory colors */}
      {showTerritories && territories.length > 0 && (
        <div className="space-y-1 pt-1 border-t border-stone-100">
          {territories.slice(0, 5).map((t) => (
            <div key={t.properties.id} className="flex items-center gap-2">
              <div
                className="w-4 h-2.5 shrink-0 rounded-sm"
                style={{
                  backgroundColor: t.properties.fillColor,
                  opacity: 0.8,
                  border: `1px solid ${t.properties.strokeColor}`,
                }}
              />
              <span className="text-stone-500 truncate max-w-[120px]">{t.properties.name}</span>
            </div>
          ))}
          {territories.length > 5 && (
            <p className="text-stone-400 text-[10px]">+{territories.length - 5} more territories</p>
          )}
        </div>
      )}
      </div>}
    </div>
  )
}
