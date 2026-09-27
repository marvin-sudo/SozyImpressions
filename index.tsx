import React, { Component, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './src/App';
import { ShopStoreProvider } from './src/context/ShopStoreContext';

// Global circular-safe JSON serialization guard
if (typeof window !== 'undefined') {
  const nativeStringify = JSON.stringify;
  JSON.stringify = function (
    value: any,
    replacer?: any,
    space?: string | number
  ): string {
    const seen = new WeakSet();
    const isArrayReplacer = Array.isArray(replacer);
    const safeReplacer = function (this: any, key: string, val: any) {
      if (typeof val === 'object' && val !== null) {
        if (seen.has(val)) {
          return '[Circular]';
        }
        seen.add(val);
      }
      if (typeof replacer === 'function') {
        return replacer.call(this, key, val);
      }
      if (isArrayReplacer && key !== '' && replacer.indexOf(key) === -1) {
        return undefined;
      }
      return val;
    };
    try {
      return nativeStringify(value, safeReplacer, space);
    } catch {
      return '"[Unserializable]"';
    }
  };
}

// Error Boundary for UI resilience & atmosphere loading guarantees
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorCount: number;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorCount: 0 };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Sozy Impressions App Error caught by boundary:', error?.message || String(error), errorInfo?.componentStack || '');
    
    // Auto-reload once on stale chunk error from hot deployment
    const isChunkError = 
      error?.message?.includes('dynamically imported module') ||
      error?.message?.includes('Loading chunk') ||
      error?.name === 'ChunkLoadError';

    if (isChunkError && typeof window !== 'undefined') {
      const reloaded = sessionStorage.getItem('sozy_chunk_reloaded');
      if (!reloaded) {
        sessionStorage.setItem('sozy_chunk_reloaded', 'true');
        window.location.reload();
        return;
      }
    }
  }

  handleReload = () => {
    try {
      sessionStorage.removeItem('sozy_chunk_reloaded');
    } catch { /* ignore */ }
    window.location.reload();
  };

  handleResetAndReload = () => {
    try {
      localStorage.removeItem('sozy_cart');
      localStorage.removeItem('sozy_deleted_product_ids');
      sessionStorage.clear();
    } catch { /* ignore */ }
    window.location.reload();
  };

  handleTryAgain = () => {
    this.setState({ hasError: false, error: undefined, errorCount: this.state.errorCount + 1 });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#181B34] text-white p-6 font-sans text-center">
          <div className="max-w-md space-y-6">
            <div className="w-16 h-16 bg-[#ED008C]/20 border border-[#ED008C] text-[#ED008C] rounded-2xl flex items-center justify-center mx-auto text-2xl font-black shadow-lg shadow-[#ED008C]/20">
              !
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-black font-heading tracking-tight">
                Sozy Impressions Studio
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                An unexpected display glitch occurred while rendering the interface. The Kampala production studio portal is ready to restore your workspace.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={this.handleReload}
                className="w-full sm:w-auto bg-[#ED008C] hover:bg-[#d4007d] text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition-all shadow-lg shadow-[#ED008C]/30 hover:-translate-y-0.5 cursor-pointer"
              >
                Reload Atmosphere
              </button>
              
              <button
                onClick={this.handleTryAgain}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-all border border-white/20 cursor-pointer"
              >
                Try Again
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={this.handleResetAndReload}
                className="text-[11px] text-slate-400 hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
              >
                Reset Studio Cache & Reload
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// App Initialization
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <ShopStoreProvider>
          <App />
        </ShopStoreProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}
