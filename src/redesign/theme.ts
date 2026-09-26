// Daylight design tokens — one source of truth for the redesign.
export const C = {
  sand: '#f4ecdc',
  land: '#efe3cb',
  ink: '#17182b',
  blue: '#2536c4',
  blueSoft: '#b9c0ff',
  warm: '#f39a55',
  water: '#bcd3e6',
  muted: '#7a7c90',
  body: '#4a4c63',
  hairline: '#ddd4c2',
  white: '#ffffff',
} as const

export const FONT = {
  display: "'Bricolage Grotesque', system-ui, sans-serif",
  hebrew: "'Suez One', 'Frank Ruhl Libre', serif",
  reading: "'Newsreader', Georgia, serif",
}

// Springs tuned to feel physical rather than floaty.
export const SPRING = {
  snappy: { type: 'spring', stiffness: 520, damping: 38 },
  soft: { type: 'spring', stiffness: 260, damping: 30 },
  sheet: { type: 'spring', stiffness: 340, damping: 34, mass: 0.9 },
} as const

export const SHADOW = {
  float: '0 6px 20px rgba(23,24,43,0.10)',
  sheet: '0 -10px 34px rgba(23,24,43,0.12)',
}
