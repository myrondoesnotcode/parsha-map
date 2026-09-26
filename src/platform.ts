import { Capacitor } from '@capacitor/core'

/**
 * True inside the Capacitor iOS app, false on parshamap.com.
 * Every intentional web/app divergence should branch on this — see CLAUDE.md.
 */
export const isNativeApp = Capacitor.isNativePlatform()
