import type { StyleSpecification, LayerSpecification } from 'maplibre-gl'
import { parchmentStyle } from '../map/mapStyles'
import { C } from './theme'

// The parchment basemap, recoloured for Daylight: warm sand land, soft blue
// water, gentle terrain. Same sources and layer structure, so the two stay in sync.
type Paint = Record<string, unknown>

const PAINT_OVERRIDES: Record<string, Paint> = {
  background: { 'background-color': C.land },
  hillshade: {
    'hillshade-shadow-color': '#b39668',
    'hillshade-highlight-color': '#fff9ec',
    'hillshade-accent-color': '#d8c49a',
    'hillshade-exaggeration': 0.38,
  },
  'landcover-sand': { 'fill-color': '#ead8b3', 'fill-opacity': 0.55 },
  water: { 'fill-color': C.water },
  waterway: { 'line-color': '#a4c1da' },
  'water-shoreline': { 'line-color': '#9dbad3', 'line-width': 1.2, 'line-opacity': 0.9 },
  'label-water-marine': { 'text-color': '#6f93b4', 'text-halo-color': C.water },
  'label-country-water': { 'text-color': '#6f93b4', 'text-halo-color': C.water },
  'label-mountain-peaks': { 'text-color': '#8f7a55', 'text-halo-color': '#f6ecd6' },
  'label-places': { 'text-color': '#8f7a55', 'text-halo-color': '#f6ecd6', 'text-opacity': 0.5 },
}

function restyle(layer: LayerSpecification): LayerSpecification {
  const paint = PAINT_OVERRIDES[layer.id]
  const next = { ...layer } as LayerSpecification & { paint?: Paint; layout?: Paint }
  if (paint) next.paint = { ...(next.paint ?? {}), ...paint }
  if (next.layout && 'text-font' in next.layout) {
    next.layout = { ...next.layout, 'text-font': ['Noto Sans Regular'] }
  }
  return next as LayerSpecification
}

export const daylightStyle: StyleSpecification = {
  ...parchmentStyle,
  name: 'Daylight',
  layers: parchmentStyle.layers.map(restyle),
}
