import React, { useState, useEffect, useRef } from 'react';
import { 
  loadedImageCache, 
  getOptimizedImageUrl, 
  getOptimizedSrcSet, 
  preloadImage,
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
  referrerPolicy = 'no-referrer',
  ...rest
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  
  // Calculate category-specific zero-latency fallback
  const resolvedFallback = fallbackSrc || getCategoryFallbackImage(category || alt);

  // Calculate the optimized image URL
  const targetSrc = src && src.trim() ? getOptimizedImageUrl(src.trim(), sizeVariant) : resolvedFallback;

  const isAlreadyCached = Boolean(
    targetSrc && (loadedImageCache.has(targetSrc) || loadedImageCache.has(src || ''))
  );

  const [isLoaded, setIsLoaded] = useState<boolean>(isAlreadyCached);
  const [hasError, setHasError] = useState<boolean>(false);
  const [currentSrc, setCurrentSrc] = useState<string>(targetSrc || resolvedFallback);

  // Sync currentSrc when src, sizeVariant, or category changes
  useEffect(() => {
    const freshFallback = fallbackSrc || getCategoryFallbackImage(category || alt);
    const newTarget = src && src.trim() ? getOptimizedImageUrl(src.trim(), sizeVariant) : freshFallback;
    
    setCurrentSrc(newTarget);
    setHasError(false);

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

    if (newTarget && (priority || sizeVariant === 'card')) {
      preloadImage(newTarget, sizeVariant);
    }

    // Safety timeout: if remote image doesn't load within 2.5 seconds, show fallback
    let timer: NodeJS.Timeout | null = null;
    if (newTarget && !newTarget.startsWith('/assets/') && !loadedImageCache.has(newTarget)) {
      timer = setTimeout(() => {
        if (!imgRef.current?.complete || imgRef.current?.naturalWidth === 0) {
          setCurrentSrc(freshFallback);
          setIsLoaded(true);
        }
      }, 2500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [src, sizeVariant, priority, fallbackSrc, category, alt]);

  // Synchronous DOM ref callback
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
    if (!hasError && resolvedFallback && currentSrc !== resolvedFallback) {
      setHasError(true);
      setCurrentSrc(resolvedFallback);
      setIsLoaded(true); // Display fallback immediately, no blank state!
    } else {
      setIsLoaded(true);
    }
    if (rest.onError) {
      rest.onError(e);
    }
  };

  // Only use srcSet if no error occurred and not showing fallback
  const activeSrcSet = !hasError && src && currentSrc === targetSrc ? getOptimizedSrcSet(src) : undefined;
  const isTransparent = transparent || wrapperClassName.includes('bg-transparent');

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
        loading={priority ? 'eager' : (loading || 'eager')}
        decoding={decoding || (priority ? 'async' : 'async')}
        referrerPolicy={referrerPolicy}
        // @ts-expect-error - fetchPriority is supported in modern browsers
        fetchPriority={priority ? 'high' : (rest.fetchPriority || 'auto')}
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} ${
          isLoaded ? 'opacity-100' : 'opacity-95'
        } transition-opacity duration-150 ease-out`}
        {...rest}
      />
    </div>
  );
};

