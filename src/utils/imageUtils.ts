// Global cache of successfully loaded image URLs to prevent re-shimmering on navigation or re-render
export const loadedImageCache = new Set<string>();

export type ImageSizeVariant = 'thumb' | 'card' | 'detail' | 'hero';

export interface ImageOptimizationOptions {
  width?: number;
  quality?: number;
  format?: string;
  variant?: ImageSizeVariant;
}

const VARIANT_CONFIGS: Record<ImageSizeVariant, { width: number; quality: number }> = {
  thumb: { width: 180, quality: 70 },
  card: { width: 400, quality: 70 },
  detail: { width: 750, quality: 75 },
  hero: { width: 1100, quality: 80 },
};

export const DEFAULT_PRODUCT_IMAGE = '/assets/images/tumbler_mug_1788634322323.jpg';

export const CATEGORY_LOCAL_FALLBACKS: Record<string, string> = {
  'mug': '/assets/images/tumbler_mug_1788634322323.jpg',
  'cushion': '/assets/images/personalised_cushion_1788634222492.jpg',
  'sipper': '/assets/images/bar_flask_1788635290861.jpg',
  'bottle': '/assets/images/bar_flask_1788635290861.jpg',
  'flask': '/assets/images/bar_flask_1788635290861.jpg',
  'frame': '/assets/images/tabletop_frame_1788635214871.jpg',
  'photo': '/assets/images/calendar_photo_frame_1788634271713.jpg',
  'neon': '/assets/images/neon_lights_gift_1788634255448.jpg',
  'flower': '/assets/images/roses_bouquet_1788634336414.jpg',
  'rose': '/assets/images/roses_bouquet_1788634336414.jpg',
  'combo': '/assets/images/combos_gift_set_1788634366784.jpg',
  'hamper': '/assets/images/combos_gift_set_1788634366784.jpg',
  'stationery': '/assets/images/stationery_caddy_1788634352075.jpg',
  'pen': '/assets/images/stationery_caddy_1788634352075.jpg',
  'magnet': '/assets/images/fridge_photo_magnets_1788634286788.jpg',
  'accessories': '/assets/images/g_lamp_accessories_1788634381991.jpg',
  'lamp': '/assets/images/g_lamp_accessories_1788634381991.jpg',
  'caricature': '/assets/images/caricature_standee_1788634238550.jpg',
  'clock': '/assets/images/desk_clock_1788635262427.jpg',
  'key': '/assets/images/couple_keychains_1788635276974.jpg',
  'tech': '/assets/images/photo_speaker_1788635229629.jpg',
  'speaker': '/assets/images/photo_speaker_1788635229629.jpg',
  'earbud': '/assets/images/custom_earbuds_1788635304232.jpg',
  'cake': '/assets/images/celebration_cake_1788635656003.jpg',
  'chocolate': '/assets/images/celebration_chocolates_1788635680950.jpg',
  'card': '/assets/images/celebration_greeting_card_1788635694483.jpg',
  'jewel': '/assets/images/celebration_jewellery_1788635705456.jpg',
  'explosion': '/assets/images/celebration_explosion_box_1788635668598.jpg',
  'success': '/assets/images/tabletop_frame_1788635214871.jpg',
  'sucess': '/assets/images/tabletop_frame_1788635214871.jpg',
  'award': '/assets/images/tabletop_frame_1788635214871.jpg',
  'trophy': '/assets/images/tabletop_frame_1788635214871.jpg'
};

export const getCategoryFallbackImage = (categoryOrName?: string): string => {
  if (!categoryOrName) return DEFAULT_PRODUCT_IMAGE;
  const lower = categoryOrName.toLowerCase().trim();
  for (const [token, fallback] of Object.entries(CATEGORY_LOCAL_FALLBACKS)) {
    if (lower.includes(token)) {
      return fallback;
    }
  }
  return DEFAULT_PRODUCT_IMAGE;
};

/**
 * Automatically optimizes image URLs:
 * 1. Normalizes local paths like /src/assets/images/ to /assets/images/ for static serving
 * 2. Compresses Unsplash photos down to small 15-30 KB WebP/AVIF assets
 * 3. Gracefully provides fallback for missing or empty URLs
 */
export const getOptimizedImageUrl = (
  url?: string,
  options?: ImageOptimizationOptions | ImageSizeVariant
): string => {
  if (!url || typeof url !== 'string') return DEFAULT_PRODUCT_IMAGE;

  const trimmed = url.trim();
  if (!trimmed) return DEFAULT_PRODUCT_IMAGE;

  // Normalize /src/assets/images/ to /assets/images/
  if (trimmed.startsWith('/src/assets/images/')) {
    return trimmed.replace('/src/assets/images/', '/assets/images/');
  }

  // Resolve options from preset variant or custom config
  let width = 400;
  let quality = 70;

  if (typeof options === 'string') {
    const config = VARIANT_CONFIGS[options] || VARIANT_CONFIGS.card;
    width = config.width;
    quality = config.quality;
  } else if (options) {
    if (options.variant && VARIANT_CONFIGS[options.variant]) {
      const config = VARIANT_CONFIGS[options.variant];
      width = options.width || config.width;
      quality = options.quality || config.quality;
    } else {
      width = options.width || 400;
      quality = options.quality || 70;
    }
  }

  // Optimize Unsplash images dynamically
  if (trimmed.includes('images.unsplash.com')) {
    try {
      const baseUrl = trimmed.split('?')[0];
      return `${baseUrl}?auto=format&fit=crop&q=${quality}&w=${width}`;
    } catch {
      return trimmed;
    }
  }

  return trimmed;
};

/**
 * Generate a responsive srcSet for supported CDNs (like Unsplash)
 */
export const getOptimizedSrcSet = (url?: string): string | undefined => {
  if (!url || !url.includes('images.unsplash.com')) return undefined;
  try {
    const baseUrl = url.split('?')[0];
    return [
      `${baseUrl}?auto=format&fit=crop&q=65&w=300 300w`,
      `${baseUrl}?auto=format&fit=crop&q=70&w=420 420w`,
      `${baseUrl}?auto=format&fit=crop&q=75&w=600 600w`
    ].join(', ');
  } catch {
    return undefined;
  }
};

/**
 * Preload a single image URL into browser cache and memory set
 */
export const preloadImage = (
  url?: string,
  options?: ImageOptimizationOptions | ImageSizeVariant
): Promise<void> => {
  if (!url || typeof window === 'undefined') return Promise.resolve();

  const targetUrl = getOptimizedImageUrl(url, options);
  if (!targetUrl || loadedImageCache.has(targetUrl)) return Promise.resolve();

  return new Promise((resolve) => {
    const img = new Image();
    img.referrerPolicy = 'no-referrer';
    img.decoding = 'async';
    img.onload = () => {
      loadedImageCache.add(targetUrl);
      loadedImageCache.add(url); // Also cache original reference
      resolve();
    };
    img.onerror = () => {
      resolve(); // Graceful resolve so Promise.all doesn't break
    };
    img.src = targetUrl;
  });
};

/**
 * Preload multiple image URLs in parallel
 */
export const preloadImages = (
  urls: (string | undefined)[],
  options?: ImageOptimizationOptions | ImageSizeVariant
): Promise<void[]> => {
  const validUrls = urls.filter((u): u is string => Boolean(u));
  if (validUrls.length === 0) return Promise.resolve([]);
  return Promise.all(validUrls.map(u => preloadImage(u, options)));
};

/**
 * Smart Catalog Preloader:
 * 1. Eagerly loads initial batch of images for immediate visibility.
 * 2. Preloads remaining product images during browser idle time.
 */
export const preloadCatalogImages = (
  items: Array<{ image?: string; gallery?: string[] } | string>,
  initialCount = 20,
  variant: ImageSizeVariant = 'card'
): void => {
  if (typeof window === 'undefined' || !items || items.length === 0) return;

  const rawUrls: string[] = [];
  items.forEach(item => {
    if (typeof item === 'string') {
      rawUrls.push(item);
    } else if (item) {
      if (item.image) rawUrls.push(item.image);
      if (item.gallery && item.gallery[0] && item.gallery[0] !== item.image) {
        rawUrls.push(item.gallery[0]);
      }
    }
  });

  const uniqueUrls = Array.from(new Set(rawUrls)).filter(Boolean);
  if (uniqueUrls.length === 0) return;

  // Immediate priority chunk
  const urgent = uniqueUrls.slice(0, initialCount);
  preloadImages(urgent, variant);

  // Fast background chunking for remainder
  const remaining = uniqueUrls.slice(initialCount);
  if (remaining.length === 0) return;

  const scheduleBatch = (list: string[]) => {
    if (list.length === 0) return;
    const batch = list.slice(0, 8);
    const nextList = list.slice(8);

    const runBatch = () => {
      preloadImages(batch, variant).then(() => {
        if (nextList.length > 0) {
          scheduleBatch(nextList);
        }
      });
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(runBatch, { timeout: 800 });
    } else {
      setTimeout(runBatch, 100);
    }
  };

  scheduleBatch(remaining);
};

