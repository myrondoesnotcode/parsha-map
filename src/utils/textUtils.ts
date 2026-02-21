import type { Place } from '../types/places'

/**
 * Wraps place names found in HTML verse text with clickable buttons.
 * Splits on HTML tags to avoid modifying attributes or tag content.
 * Places sorted longest-first to prevent partial replacements.
 */
export function highlightPlaceNames(html: string, places: Place[]): string {
  const eligiblePlaces = places
    .filter((p) => p.name.length >= 3)
    .sort((a, b) => b.name.length - a.name.length)

  if (eligiblePlaces.length === 0) return html

  // Split into text nodes and HTML tags alternately
  const parts = html.split(/(<[^>]+>)/)

  return parts
    .map((part) => {
      // Skip HTML tags — only process text nodes
      if (part.startsWith('<')) return part

      let text = part
      for (const place of eligiblePlaces) {
        // Build word-boundary-aware regex (handle Hebrew names without \b issues)
        try {
          const escapedName = place.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          const regex = new RegExp(`\\b(${escapedName})\\b`, 'gi')
          text = text.replace(
            regex,
            `<button class="place-highlight" data-place-id="${place.id}">$1</button>`
          )
        } catch {
          // Skip places with regex-unsafe names
        }
      }
      return text
    })
    .join('')
}
