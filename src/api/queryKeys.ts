export const queryKeys = {
  currentParsha: ['currentParsha'] as const,
  parshaText: (ref: string) => ['parshaText', ref] as const,
  wikipedia: (title: string) => ['wikipedia', title] as const,
  sefariaLinks: (ref: string) => ['sefariaLinks', ref] as const,
}
