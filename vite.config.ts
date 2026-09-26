import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `vite build --mode native` (npm run build:ios) emits relative asset paths so the
// bundle loads from capacitor://localhost inside the iOS app. The web build keeps '/'.
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'native' ? './' : '/',
}))
