import type { StyleSpecification } from 'maplibre-gl'

// ── Parchment palette ─────────────────────────────────────────────────────────
// Ancient-world basemap: no modern roads, borders, or POIs. Terrain hillshade
// gives the land physical character; water and labels stay muted and serif-like.
const PARCHMENT = {
  land: '#f0e7d0',
  water: '#b4cdd1',
  waterDeep: '#a5c2c8',
  river: '#a8c4c9',
  shadow: '#9b8256',
  highlight: '#fffdf4',
  accent: '#c9b88a',
  label: '#7a6a4c',
  labelHalo: '#f6efdc',
  waterLabel: '#5c7a80',
}

// OpenFreeMap vector tiles — free, no API key (https://openfreemap.org)
// AWS Terrain Tiles (terrarium DEM) — free, no API key, public dataset
export const parchmentStyle: StyleSpecification = {
  version: 8,
  name: 'Parchment (ancient world)',
  glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
  sources: {
    openmaptiles: {
      type: 'vector',
      url: 'https://tiles.openfreemap.org/planet',
      attribution:
        '<a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> © <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
    },
    terrain: {
      type: 'raster-dem',
      tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
      encoding: 'terrarium',
      tileSize: 256,
      maxzoom: 12,
      attribution: 'Terrain: <a href="https://registry.opendata.aws/terrain-tiles/" target="_blank">Mapzen/AWS</a>',
    },
  },
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: { 'background-color': PARCHMENT.land },
    },
    {
      id: 'hillshade',
      type: 'hillshade',
      source: 'terrain',
      paint: {
        'hillshade-shadow-color': PARCHMENT.shadow,
        'hillshade-highlight-color': PARCHMENT.highlight,
        'hillshade-accent-color': PARCHMENT.accent,
        'hillshade-exaggeration': 0.45,
        'hillshade-illumination-anchor': 'viewport',
      },
    },
    {
      id: 'landcover-sand',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'landcover',
      filter: ['==', ['get', 'class'], 'sand'],
      paint: { 'fill-color': '#ece0bd', 'fill-opacity': 0.6 },
    },
    {
      id: 'water',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'water',
      filter: ['!=', ['get', 'brunnel'], 'tunnel'],
      paint: { 'fill-color': PARCHMENT.water },
    },
    {
      id: 'waterway',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'waterway',
      filter: ['in', ['get', 'class'], ['literal', ['river', 'canal']]],
      paint: {
        'line-color': PARCHMENT.river,
        'line-width': ['interpolate', ['exponential', 1.4], ['zoom'], 6, 0.8, 12, 3.5],
        'line-opacity': 0.9,
      },
    },
    {
      id: 'water-shoreline',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'water',
      filter: ['!=', ['get', 'brunnel'], 'tunnel'],
      paint: {
        'line-color': PARCHMENT.waterDeep,
        'line-width': 1,
        'line-opacity': 0.7,
      },
    },
    {
      id: 'label-water-marine',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'water_name',
      filter: ['==', ['geometry-type'], 'Point'],
      layout: {
        'text-field': ['coalesce', ['get', 'name:en'], ['get', 'name']],
        'text-font': ['Noto Sans Italic'],
        'text-size': ['interpolate', ['linear'], ['zoom'], 4, 11, 9, 16],
        'text-letter-spacing': 0.15,
        'text-max-width': 6,
      },
      paint: {
        'text-color': PARCHMENT.waterLabel,
        'text-halo-color': PARCHMENT.water,
        'text-halo-width': 1,
        'text-opacity': 0.85,
      },
    },
    {
      id: 'label-mountain-peaks',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'mountain_peak',
      minzoom: 9,
      filter: ['==', ['get', 'class'], 'peak'],
      layout: {
        'text-field': ['coalesce', ['get', 'name:en'], ['get', 'name']],
        'text-font': ['Noto Sans Italic'],
        'text-size': 10,
        'text-letter-spacing': 0.08,
        'text-offset': [0, 0.6],
        'text-anchor': 'top',
      },
      paint: {
        'text-color': PARCHMENT.label,
        'text-halo-color': PARCHMENT.labelHalo,
        'text-halo-width': 1,
        'text-opacity': 0.7,
      },
    },
    {
      // Modern orientation labels — deliberately faint, only at closer zooms,
      // so the ancient markers stay the visual authority
      id: 'label-places',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'place',
      minzoom: 7.5,
      filter: ['in', ['get', 'class'], ['literal', ['city', 'town']]],
      layout: {
        'text-field': ['coalesce', ['get', 'name:en'], ['get', 'name']],
        'text-font': ['Noto Sans Italic'],
        'text-size': ['interpolate', ['linear'], ['zoom'], 7.5, 10, 12, 13],
        'text-letter-spacing': 0.06,
      },
      paint: {
        'text-color': PARCHMENT.label,
        'text-halo-color': PARCHMENT.labelHalo,
        'text-halo-width': 1.2,
        'text-opacity': 0.55,
      },
    },
    {
      id: 'label-country-water',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'water_name',
      filter: ['==', ['geometry-type'], 'LineString'],
      layout: {
        'text-field': ['coalesce', ['get', 'name:en'], ['get', 'name']],
        'text-font': ['Noto Sans Italic'],
        'symbol-placement': 'line',
        'text-size': 11,
        'text-letter-spacing': 0.1,
      },
      paint: {
        'text-color': PARCHMENT.waterLabel,
        'text-halo-color': PARCHMENT.water,
        'text-halo-width': 1,
        'text-opacity': 0.8,
      },
    },
  ],
}

export const satelliteStyle: StyleSpecification = {
  version: 8,
  name: 'Satellite',
  sources: {
    esri: {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
      maxzoom: 18,
      attribution:
        'Tiles © Esri — Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community',
    },
  },
  layers: [{ id: 'esri-imagery', type: 'raster', source: 'esri' }],
}
