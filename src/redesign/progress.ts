// Per-device progress: finished stories and the weekly streak.
const KEY = 'dl_completed_stories_v1'

function read(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}')
  } catch {
    return {}
  }
}

export function isStoryComplete(parshaId: string): boolean {
  return parshaId in read()
}

export function markStoryComplete(parshaId: string) {
  try {
    const all = read()
    all[parshaId] = Date.now()
    localStorage.setItem(KEY, JSON.stringify(all))
  } catch {
    /* storage unavailable — progress just isn't remembered */
  }
}

export function completedCount(): number {
  return Object.keys(read()).length
}
