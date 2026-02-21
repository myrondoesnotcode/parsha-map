export const queryKeys = {
  currentParsha: ['currentParsha'] as const,
  parshaText: (ref: string) => ['parshaText', ref] as const,
}
