import React, { useState, useEffect } from 'react';

// Global cache of successfully loaded image URLs to prevent re-shimmering on navigation or re-render
export const loadedImageCache = new Set<string>();

/**
 * Preload a single image URL into browser cache and memory set
 */
export const preloadImage = (url?: string): Promise<void> => {
  if (!url || typeof window === 'undefined') return Promise.resolve();
  if (loadedImageCache.has(url)) return Promise.resolve();

  return new Promise((resolve) => {
    const img = new Image();
    img.referrerPolicy = 'no-referrer';
    img.onload = () => {
      loadedImageCache.add(url);
      resolve();
    };
    img.onerror = () => {
      resolve(); // Graceful resolve so Promise.all doesn't break
    };
    img.src = url;
  });
};

/**
 * Preload multiple image URLs in parallel
 */
export const preloadImages = (urls: (string | undefined)[]): Promise<void[]> => {
  const validUrls = urls.filter((u): u is string => Boolean(u));
  return Promise.all(validUrls.map(preloadImage));
};

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  fallbackSrc?: string;
  wrapperClassName?: string;
  aspectRatio?: string; // e.g., "aspect-square", "aspect-video"
  priority?: boolean; // high priority (LCP, Hero, above-the-fold)
  blurPlaceholder?: boolean;
}

/**
 * Universal Optimized Image Component:
 * - Pre-connects & pre-caches loaded image URLs to prevent layout shift & flickering.
 * - Supports native lazy loading with 'async' decoding.
 * - Includes smooth skeleton shimmer transition with zero cumulative layout shift.
 * - Handles fetch failures with automatic fallback image or graceful retry.
 * - Priority mode for hero/above-the-fold banners (`fetchPriority="high"`, `loading="eager"`).
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc = 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
  className = '',
  wrapperClassName = '',
  aspectRatio,
  priority = false,
  blurPlaceholder = true,
  loading,
  decoding = 'async',
  referrerPolicy = 'no-referrer',
  ...rest
}) => {
  const initialLoaded = src ? loadedImageCache.has(src) : false;
  const [isLoaded, setIsLoaded] = useState<boolean>(initialLoaded);
  const [hasError, setHasError] = useState<boolean>(false);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);

  useEffect(() => {
    if (src !== currentSrc) {
      setCurrentSrc(src);
      if (src && loadedImageCache.has(src)) {
        setIsLoaded(true);
        setHasError(false);
      } else {
        setIsLoaded(false);
        setHasError(false);
      }
    }
  }, [src, currentSrc]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (currentSrc) {
      loadedImageCache.add(currentSrc);
    }
    setIsLoaded(true);
    if (rest.onLoad) {
      rest.onLoad(e);
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError && fallbackSrc && currentSrc !== fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
    if (rest.onError) {
      rest.onError(e);
    }
  };

  return (
    <div className={`relative overflow-hidden ${aspectRatio ? aspectRatio : ''} ${wrapperClassName}`}>
      {/* Smooth Skeleton Pulse Shimmer */}
      {!isLoaded && blurPlaceholder && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200/70 to-slate-100 animate-pulse z-0 pointer-events-none" 
          aria-hidden="true"
        />
      )}

      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          loading={priority ? 'eager' : (loading || 'lazy')}
          decoding={priority ? 'sync' : decoding}
          referrerPolicy={referrerPolicy}
          // @ts-expect-error - fetchPriority is supported in modern browsers
          fetchpriority={priority ? 'high' : 'auto'}
          onLoad={handleLoad}
          onError={handleError}
          className={`${className} ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-300 ease-out`}
          {...rest}
        />
      )}
    </div>
  );
};
