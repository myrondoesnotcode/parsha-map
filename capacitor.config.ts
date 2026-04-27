import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.parshamap.app',
  appName: 'Parsha Map',
  webDir: 'dist',
  // Do NOT set server.url — the app must load from the local bundle,
  // not from a remote URL, or Apple will reject it as a web clip.
  server: {
    androidScheme: 'https',
  },
  ios: {
    statusBarStyle: 'dark',
    backgroundColor: '#0f172a',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: '#fcf9f0',
      androidSplashResourceName: 'splash',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#0f172a',
    },
    Keyboard: {
      resize: 'body',
      resizeOnFullScreen: true,
    },
  },
};

export default config;
