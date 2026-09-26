import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import ClassicApp from './App'
import DaylightApp from './redesign/DaylightApp'
import { ErrorBoundary } from './components/ErrorBoundary'
import { isNativeApp } from './platform'

// Daylight redesign is the default on this branch; ?ui=classic shows the current app (web only).
const wantsClassic = !isNativeApp && new URLSearchParams(window.location.search).get('ui') === 'classic'
const App = wantsClassic ? ClassicApp : DaylightApp

// Devtools are dev-server only, so neither the web nor the app bundle ships them.
const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() => import('@tanstack/react-query-devtools').then((m) => ({ default: m.ReactQueryDevtools })))
  : null

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <App />
        {ReactQueryDevtools && App === ClassicApp && (
          <Suspense fallback={null}>
            <ReactQueryDevtools initialIsOpen={false} />
          </Suspense>
        )}
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
)
