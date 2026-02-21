import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-stone-50 p-8 text-center">
          <div className="text-5xl mb-4">🗺️</div>
          <h1 className="text-lg font-semibold text-stone-800 mb-2">Something went wrong</h1>
          <p className="text-stone-500 text-sm mb-6">
            The map couldn't load. Try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
          >
            Refresh page
          </button>
          <details className="mt-6 text-xs text-stone-400 max-w-sm text-left">
            <summary className="cursor-pointer text-center">Error details</summary>
            <pre className="mt-2 whitespace-pre-wrap break-all bg-stone-100 rounded p-2">
              {this.state.error.message}
            </pre>
          </details>
        </div>
      )
    }

    return this.props.children
  }
}
