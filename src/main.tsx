import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import ClassicApp from './App'
import DaylightApp from './redesign/DaylightApp'
import { ErrorBoundary } from './components/ErrorBoundary'

// Daylight redesign is the default on this branch; ?ui=classic shows the current app.
const App = new URLSearchParams(window.location.search).get('ui') === 'classic' ? ClassicApp : DaylightApp

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
        {App === ClassicApp && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
)
