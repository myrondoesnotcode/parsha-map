export {}

declare global {
  interface Window {
    OneSignalDeferred?: Array<(OneSignal: { showNativePrompt: () => void }) => void>
  }
}
