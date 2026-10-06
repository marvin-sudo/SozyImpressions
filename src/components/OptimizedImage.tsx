import React, { useState, useEffect, useRef } from 'react';
import { 
  loadedImageCache, 
  getOptimizedImageUrl, 
  getOptimizedSrcSet, 
  getCategoryFallbackImage,
  ImageSizeVariant 
} from '../utils/imageUtils';

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  category?: string;
  fallbackSrc?: string;
  wrapperClassName?: string;
  aspectRatio?: string; // e.g., "aspect-square", "aspect-video"
  priority?: boolean; // high priority (LCP, Hero, above-the-fold)
  blurPlaceholder?: boolean;
  sizeVariant?: ImageSizeVariant; // 'thumb' (180px) | 'card' (400px) | 'detail' (750px) | 'hero' (1100px)
  transparent?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto';
  fetchpriority?: 'high' | 'low' | 'auto';
}

/**
 * High-Performance Image Component:
 * - Prevents blank display by never hiding valid pixels behind opacity-0.
 * - Dynamically optimizes and compresses CDN images for fast sub-50ms downloads.
 * - Immediate category-aware fallback if remote URL is slow or inaccessible.
 * - Synchronously detects cached assets on initial mount.
 * - Safely recovers from errors using local zero-latency static fallback.
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  category,
  fallbackSrc,
  className = '',
  wrapperClassName = '',
  aspectRatio,
  priority = false,
  blurPlaceholder = true,
  sizeVariant = 'card',
  transparent = false,
  loading,
  decoding,
  referrerPolicy = 'no-referrer-when-downgrade',
  fetchPriority,
  fetchpriority,
  ...rest
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  
  // Calculate category-specific zero-latency fallback only if remote image genuinely fails
  const resolvedFallback = fallbackSrc || getCategoryFallbackImage(category || alt);

  // Compute the primary optimized image URL
  const targetSrc = src && src.trim() ? getOptimizedImageUrl(src.trim(), sizeVariant) : resolvedFallback;

  const isAlreadyCached = Boolean(
    targetSrc && (loadedImageCache.has(targetSrc) || loadedImageCache.has(src || ''))
  );

  const [isLoaded, setIsLoaded] = useState<boolean>(isAlreadyCached);
  const [retryAttempt, setRetryAttempt] = useState<number>(0);
  const [currentSrc, setCurrentSrc] = useState<string>(targetSrc);

  // Sync currentSrc when src, sizeVariant, or category changes
  useEffect(() => {
    const newTarget = src && src.trim() ? getOptimizedImageUrl(src.trim(), sizeVariant) : resolvedFallback;
    
    setCurrentSrc(newTarget);
    setRetryAttempt(0);

    if (newTarget && (loadedImageCache.has(newTarget) || loadedImageCache.has(src || ''))) {
      setIsLoaded(true);
    } else {
      if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
        setIsLoaded(true);
        if (newTarget) loadedImageCache.add(newTarget);
      } else {
        setIsLoaded(false);
      }
    }
  }, [src, sizeVariant, resolvedFallback]);

  // Synchronous DOM ref callback for instant cached image detection
  const handleRef = (node: HTMLImageElement | null) => {
    imgRef.current = node;
    if (node && node.complete && node.naturalWidth > 0) {
      setIsLoaded(true);
      if (currentSrc) loadedImageCache.add(currentSrc);
      if (src) loadedImageCache.add(src);
    }
  };

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (currentSrc) {
      loadedImageCache.add(currentSrc);
      if (src) loadedImageCache.add(src);
    }
    setIsLoaded(true);
    if (rest.onLoad) {
      rest.onLoad(e);
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // If the image failed on first attempt, retry once after 400ms
    if (retryAttempt === 0 && src && src.trim() && currentSrc !== src.trim()) {
      setRetryAttempt(1);
      setTimeout(() => {
        // Retry with the raw direct URL without extra query parameters
        setCurrentSrc(src.trim());
      }, 400);
      return;
    }

    // Only if retry also fails and fallback is different, use the fallback image
    if (resolvedFallback && currentSrc !== resolvedFallback) {
      setCurrentSrc(resolvedFallback);
      setIsLoaded(true);
    } else {
      setIsLoaded(true);
    }

    if (rest.onError) {
      rest.onError(e);
    }
  };

  // Only use srcSet for Unsplash images if on the primary target
  const activeSrcSet = src && currentSrc === targetSrc ? getOptimizedSrcSet(src) : undefined;
  const isTransparent = transparent || wrapperClassName.includes('bg-transparent');

  // Proper loading priority: above-the-fold images get eager + high fetchpriority,
  // below-the-fold images use native lazy loading and async decoding for maximum bandwidth efficiency
  const effectiveLoading = priority ? 'eager' : (loading || 'lazy');
  const effectiveFetchPriority = priority ? 'high' : (fetchpriority || fetchPriority || 'auto');

  return (
    <div className={`relative overflow-hidden ${isTransparent ? 'bg-transparent' : 'bg-slate-100'} ${aspectRatio ? aspectRatio : ''} ${wrapperClassName}`}>
      {/* Subtle skeleton shimmer behind image while loading */}
      {!isLoaded && blurPlaceholder && !isTransparent && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200/50 to-slate-100 animate-pulse z-0 pointer-events-none" 
          aria-hidden="true"
        />
      )}

      <img
        ref={handleRef}
        src={currentSrc}
        srcSet={activeSrcSet}
        sizes={rest.sizes || "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"}
        alt={alt || 'Product image'}
        loading={effectiveLoading}
        decoding={decoding || 'async'}
        referrerPolicy={referrerPolicy}
        // @ts-expect-error - lowercase fetchpriority is supported in modern browsers and avoids React 18 DOM prop warnings
        fetchpriority={effectiveFetchPriority}
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} ${
          isLoaded ? 'opacity-100' : 'opacity-90'
        } transition-opacity duration-200 ease-out`}
        {...rest}
      />
    </div>
  );
};

