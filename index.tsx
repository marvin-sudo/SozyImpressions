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

// Error Boundary for UI resilience
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Sozy Impressions App Error caught by boundary:', error?.message || String(error), errorInfo?.componentStack || '');
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#181B34] text-white p-6 font-sans text-center">
          <div className="max-w-md space-y-4">
            <div className="w-16 h-16 bg-[#ED008C]/20 border border-[#ED008C] text-[#ED008C] rounded-2xl flex items-center justify-center mx-auto text-2xl font-black">
              !
            </div>
            <h1 className="text-2xl font-black font-heading">
              Sozy Impressions Application
            </h1>
            <p className="text-sm text-slate-300">
              An unexpected display glitch occurred. Please refresh the page to reload the Kampala production studio portal.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#ED008C] hover:bg-[#d4007d] text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition-all shadow-lg"
            >
              Reload Atmosphere
            </button>
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
