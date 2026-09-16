import { Product } from '../types';
import { PRODUCTS_DATA } from '../data/mockData';
import { BESTSELLERS_DATA, BestsellerProduct } from '../data/bestsellersData';

export const mapBestsellerToProduct = (bp: BestsellerProduct): Product => ({
  id: bp.id,
  name: bp.name,
  category: bp.category,
  priceUGX: bp.priceUGX,
  priceUSD: bp.priceUSD,
  originalPriceUGX: bp.originalPriceUGX,
  originalPriceUSD: bp.originalPriceUSD,
  image: bp.image,
  gallery: bp.gallery && bp.gallery.length > 0 ? bp.gallery : [bp.image],
  description: `${bp.name} — Handcrafted personalised keepsake with high-definition laser engraving & UV colour printing by Sozy Impressions Kampala. Engineered for premium presentation and lasting durability.`,
  isCustomizable: bp.isCustomizable ?? true,
  minOrderQty: 1,
  rating: bp.rating || 5.0,
  reviewCount: bp.reviewCount || 24,
  badge: bp.badge,
  inStock: true,
  colors: ['Default Classic', 'Matte Black', 'Silver Lustre', 'Royal Blue', 'Champagne Gold'],
  materials: ['Anodised Aluminium / Stainless Steel', 'Crystal Clear Acrylic', 'Natural Hardwood', 'PU Vegan Leather'],
  finishings: ['Laser Deep Engraved', 'Precision UV Color Print', 'Foil Stamped', 'Diamond Etched'],
  bulkTiers: [
    { minQty: 1, discountPercent: 0 },
    { minQty: 10, discountPercent: 5 },
    { minQty: 25, discountPercent: 10 },
    { minQty: 50, discountPercent: 15 },
    { minQty: 100, discountPercent: 20 }
  ],
  specifications: {
    'Production Facility': 'Sozy Impressions Workshop, Kampala, Uganda',
    'Customisation Method': 'Precision Fiber Laser Engraving & High-Res UV Printing',
    'Standard Turnaround': '24 - 48 Hours in Kampala (Express Same-Day Available)',
    'Proofing': 'Free Digital 3D Artwork Proof Provided Before Production',
    'Packaging': 'Delivered in Premium Sozy Impressions Presentation Box'
  }
});

export const getAllProducts = (): Product[] => {
  const productsMap = new Map<string, Product>();

  // 1. Add standard catalog products
  for (const prod of PRODUCTS_DATA) {
    productsMap.set(prod.id, {
      ...prod,
      gallery: prod.gallery && prod.gallery.length > 0 ? prod.gallery : [prod.image],
      colors: prod.colors && prod.colors.length > 0 ? prod.colors : ['Default', 'Black', 'Blue', 'White'],
      bulkTiers: prod.bulkTiers && prod.bulkTiers.length > 0 ? prod.bulkTiers : [
        { minQty: 1, discountPercent: 0 },
        { minQty: 10, discountPercent: 5 },
        { minQty: 25, discountPercent: 10 },
        { minQty: 50, discountPercent: 15 },
        { minQty: 100, discountPercent: 20 }
      ],
      specifications: prod.specifications || {
        'Production Facility': 'Sozy Impressions Workshop, Kampala, Uganda',
        'Customisation Method': 'Precision Fiber Laser Engraving & High-Res UV Printing',
        'Standard Turnaround': '24 - 48 Hours in Kampala',
        'Proofing': 'Free Digital 3D Artwork Proof Provided Before Production'
      }
    });
  }

  // 2. Add bestseller products
  for (const bp of BESTSELLERS_DATA) {
    if (!productsMap.has(bp.id)) {
      productsMap.set(bp.id, mapBestsellerToProduct(bp));
    }
  }

  return Array.from(productsMap.values());
};

export const getProductById = (id?: string, liveProducts?: Product[]): Product => {
  if (liveProducts && liveProducts.length > 0) {
    if (!id) return liveProducts[0];
    const cleanId = id.toLowerCase().trim();
    const cleanSlug = cleanId.replace(/[^a-z0-9]+/g, '-');
    
    // 1. Direct ID match
    let found = liveProducts.find(p => p.id === id || p.id.toLowerCase() === cleanId);
    
    // 2. Slug match on name
    if (!found) {
      found = liveProducts.find(p => {
        const pSlug = (p.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return pSlug === cleanSlug || pSlug.includes(cleanSlug) || cleanSlug.includes(pSlug);
      });
    }

    // 3. Keyword-specific resolution
    if (!found) {
      if (cleanId.includes('children') && (cleanId.includes('mug') || cleanId.includes('chocolate'))) {
        found = liveProducts.find(p => p.name.toLowerCase().includes('children') && p.name.toLowerCase().includes('mug')) ||
                liveProducts.find(p => p.id === 'bs-113');
      } else if (cleanId.includes('love-heart') || (cleanId.includes('heart') && cleanId.includes('mug'))) {
        found = liveProducts.find(p => p.name.toLowerCase().includes('love heart') && p.name.toLowerCase().includes('mug')) ||
                liveProducts.find(p => p.id === 'bs-102');
      } else if (cleanId.includes('sibling') && (cleanId.includes('mug') || cleanId.includes('cup') || cleanId.includes('initial'))) {
        found = liveProducts.find(p => p.name.toLowerCase().includes('sibling') && p.name.toLowerCase().includes('mug')) ||
                liveProducts.find(p => p.id === 'bs-96');
      } else if (cleanId.includes('best-bro') || cleanId.includes('desi-mug') || (cleanId.includes('bro') && cleanId.includes('mug'))) {
        found = liveProducts.find(p => p.name.toLowerCase().includes('bro') && p.name.toLowerCase().includes('mug')) ||
                liveProducts.find(p => p.id === 'bs-84');
      } else if (cleanId.includes('heartfelt') && (cleanId.includes('mug') || cleanId.includes('cup') || cleanId.includes('photo'))) {
        found = liveProducts.find(p => p.name.toLowerCase().includes('heartfelt') && p.name.toLowerCase().includes('mug')) ||
                liveProducts.find(p => p.id === 'bs-80');
      } else if (cleanId.includes('main-character') || (cleanId.includes('polaroid') && (cleanId.includes('mug') || cleanId.includes('cup')))) {
        found = liveProducts.find(p => p.name.toLowerCase().includes('polaroid') && p.name.toLowerCase().includes('mug')) ||
                liveProducts.find(p => p.id === 'bs-75');
      } else if (cleanId.includes('magic') || cleanId.includes('reveal')) {
        found = liveProducts.find(p => p.name.toLowerCase().includes('magic') && (p.name.toLowerCase().includes('mug') || p.name.toLowerCase().includes('reveal'))) ||
                liveProducts.find(p => p.id === 'bs-53' || p.id === 'prod-magic-photo-mug');
      } else if (cleanId.includes('ghibli')) {
        found = liveProducts.find(p => p.name.toLowerCase().includes('ghibli') && p.name.toLowerCase().includes('mug')) ||
                liveProducts.find(p => p.name.toLowerCase().includes('ghibli'));
      } else if (cleanId.includes('cork') || (cleanId.includes('monogram') && cleanId.includes('mug'))) {
        found = liveProducts.find(p => p.name.toLowerCase().includes('cork') && p.name.toLowerCase().includes('mug')) ||
                liveProducts.find(p => p.name.toLowerCase().includes('cork'));
      } else if (cleanId.includes('balloon') && (cleanId.includes('mug') || cleanId.includes('cup'))) {
        found = liveProducts.find(p => p.name.toLowerCase().includes('balloon') && p.name.toLowerCase().includes('mug'));
      } else if (cleanId.includes('birthday') && (cleanId.includes('mug') || cleanId.includes('cup'))) {
        found = liveProducts.find(p => p.name.toLowerCase().includes('birthday') && p.name.toLowerCase().includes('mug'));
      } else if (cleanId.includes('balloon')) {
        found = liveProducts.find(p => p.name.toLowerCase().includes('balloon'));
      } else if (cleanId.includes('birthday') || cleanId.includes('bday')) {
        found = liveProducts.find(p => p.name.toLowerCase().includes('birthday'));
      } else if (cleanId.includes('success') || cleanId.includes('inspiration') || cleanId.includes('dream-big')) {
        found = liveProducts.find(p => p.name.toLowerCase().includes('success') || p.name.toLowerCase().includes('inspiration'));
      } else if (cleanId.includes('faith')) {
        found = liveProducts.find(p => p.name.toLowerCase().includes('faith'));
      } else if (cleanId.includes('fitness')) {
        found = liveProducts.find(p => p.name.toLowerCase().includes('fitness'));
      } else if (cleanId.includes('hoodie') || cleanId.includes('hoddie')) {
        found = liveProducts.find(p => p.name.toLowerCase().includes('hoodie'));
      }
    }

    if (found) {
      return {
        ...found,
        gallery: found.gallery && found.gallery.length > 0 ? found.gallery : [found.image],
        colors: found.colors && found.colors.length > 0 ? found.colors : ['Default', 'Black', 'Blue', 'White'],
        bulkTiers: found.bulkTiers && found.bulkTiers.length > 0 ? found.bulkTiers : [
          { minQty: 1, discountPercent: 0 },
          { minQty: 10, discountPercent: 5 },
          { minQty: 25, discountPercent: 10 },
          { minQty: 50, discountPercent: 15 },
          { minQty: 100, discountPercent: 20 }
        ],
        specifications: found.specifications || {
          'Production Facility': 'Sozy Impressions Workshop, Kampala, Uganda',
          'Customisation Method': 'Precision Fiber Laser Engraving & High-Res UV Printing',
          'Standard Turnaround': '24 - 48 Hours in Kampala',
          'Proofing': 'Free Digital 3D Artwork Proof Provided Before Production'
        }
      };
    }
  }

  if (!id) return PRODUCTS_DATA[0];

  // Try direct lookup in PRODUCTS_DATA
  const cleanId = id.toLowerCase().trim();
  const cleanSlug = cleanId.replace(/[^a-z0-9]+/g, '-');

  let foundInProducts = PRODUCTS_DATA.find(p => p.id === id || p.id.toLowerCase() === cleanId);
  if (!foundInProducts) {
    foundInProducts = PRODUCTS_DATA.find(p => {
      const pSlug = (p.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return pSlug === cleanSlug || pSlug.includes(cleanSlug) || cleanSlug.includes(pSlug);
    });
  }
  if (!foundInProducts) {
    if (cleanId.includes('children') && (cleanId.includes('mug') || cleanId.includes('chocolate'))) {
      foundInProducts = PRODUCTS_DATA.find(p => p.name.toLowerCase().includes('children') && p.name.toLowerCase().includes('mug')) ||
                        PRODUCTS_DATA.find(p => p.id === 'bs-113');
    } else if (cleanId.includes('love-heart') || (cleanId.includes('heart') && cleanId.includes('mug'))) {
      foundInProducts = PRODUCTS_DATA.find(p => p.name.toLowerCase().includes('love heart') && p.name.toLowerCase().includes('mug')) ||
                        PRODUCTS_DATA.find(p => p.id === 'bs-102');
    } else if (cleanId.includes('sibling') && (cleanId.includes('mug') || cleanId.includes('cup') || cleanId.includes('initial'))) {
      foundInProducts = PRODUCTS_DATA.find(p => p.name.toLowerCase().includes('sibling') && p.name.toLowerCase().includes('mug')) ||
                        PRODUCTS_DATA.find(p => p.id === 'bs-96');
    } else if (cleanId.includes('best-bro') || cleanId.includes('desi-mug') || (cleanId.includes('bro') && cleanId.includes('mug'))) {
      foundInProducts = PRODUCTS_DATA.find(p => p.name.toLowerCase().includes('bro') && p.name.toLowerCase().includes('mug')) ||
                        PRODUCTS_DATA.find(p => p.id === 'bs-84');
    } else if (cleanId.includes('heartfelt') && (cleanId.includes('mug') || cleanId.includes('cup') || cleanId.includes('photo'))) {
      foundInProducts = PRODUCTS_DATA.find(p => p.name.toLowerCase().includes('heartfelt') && p.name.toLowerCase().includes('mug')) ||
                        PRODUCTS_DATA.find(p => p.id === 'bs-80');
    } else if (cleanId.includes('main-character') || (cleanId.includes('polaroid') && (cleanId.includes('mug') || cleanId.includes('cup')))) {
      foundInProducts = PRODUCTS_DATA.find(p => p.name.toLowerCase().includes('polaroid') && p.name.toLowerCase().includes('mug')) ||
                        PRODUCTS_DATA.find(p => p.id === 'bs-75');
    } else if (cleanId.includes('magic') || cleanId.includes('reveal')) {
      foundInProducts = PRODUCTS_DATA.find(p => p.name.toLowerCase().includes('magic') && (p.name.toLowerCase().includes('mug') || p.name.toLowerCase().includes('reveal'))) ||
                        PRODUCTS_DATA.find(p => p.id === 'bs-53' || p.id === 'prod-magic-photo-mug');
    } else if (cleanId.includes('ghibli')) {
      foundInProducts = PRODUCTS_DATA.find(p => p.name.toLowerCase().includes('ghibli') && p.name.toLowerCase().includes('mug')) ||
                        PRODUCTS_DATA.find(p => p.name.toLowerCase().includes('ghibli'));
    } else if (cleanId.includes('cork') || (cleanId.includes('monogram') && cleanId.includes('mug'))) {
      foundInProducts = PRODUCTS_DATA.find(p => p.name.toLowerCase().includes('cork') && p.name.toLowerCase().includes('mug')) ||
                        PRODUCTS_DATA.find(p => p.name.toLowerCase().includes('cork'));
    } else if (cleanId.includes('balloon') && (cleanId.includes('mug') || cleanId.includes('cup'))) {
      foundInProducts = PRODUCTS_DATA.find(p => p.name.toLowerCase().includes('balloon') && p.name.toLowerCase().includes('mug'));
    } else if (cleanId.includes('birthday') && (cleanId.includes('mug') || cleanId.includes('cup'))) {
      foundInProducts = PRODUCTS_DATA.find(p => p.name.toLowerCase().includes('birthday') && p.name.toLowerCase().includes('mug'));
    } else if (cleanId.includes('balloon')) {
      foundInProducts = PRODUCTS_DATA.find(p => p.name.toLowerCase().includes('balloon'));
    } else if (cleanId.includes('birthday') || cleanId.includes('bday') || cleanId.includes('happy-birthday')) {
      foundInProducts = PRODUCTS_DATA.find(p => p.name.toLowerCase().includes('birthday'));
    } else if (cleanId.includes('success') || cleanId.includes('inspiration') || cleanId.includes('dream-big')) {
      foundInProducts = PRODUCTS_DATA.find(p => p.name.toLowerCase().includes('success') || p.name.toLowerCase().includes('inspiration'));
    } else if (cleanId.includes('faith')) {
      foundInProducts = PRODUCTS_DATA.find(p => p.name.toLowerCase().includes('faith'));
    } else if (cleanId.includes('fitness')) {
      foundInProducts = PRODUCTS_DATA.find(p => p.name.toLowerCase().includes('fitness'));
    } else if (cleanId.includes('hoodie') || cleanId.includes('hoddie')) {
      foundInProducts = PRODUCTS_DATA.find(p => p.name.toLowerCase().includes('hoodie'));
    }
  }
  if (foundInProducts) {
    return {
      ...foundInProducts,
      gallery: foundInProducts.gallery && foundInProducts.gallery.length > 0 ? foundInProducts.gallery : [foundInProducts.image],
      colors: foundInProducts.colors && foundInProducts.colors.length > 0 ? foundInProducts.colors : ['Default', 'Black', 'Blue', 'White'],
      bulkTiers: foundInProducts.bulkTiers && foundInProducts.bulkTiers.length > 0 ? foundInProducts.bulkTiers : [
        { minQty: 1, discountPercent: 0 },
        { minQty: 10, discountPercent: 5 },
        { minQty: 25, discountPercent: 10 },
        { minQty: 50, discountPercent: 15 },
        { minQty: 100, discountPercent: 20 }
      ],
      specifications: foundInProducts.specifications || {
        'Production Facility': 'Sozy Impressions Workshop, Kampala, Uganda',
        'Customisation Method': 'Precision Fiber Laser Engraving & High-Res UV Printing',
        'Standard Turnaround': '24 - 48 Hours in Kampala',
        'Proofing': 'Free Digital 3D Artwork Proof Provided Before Production'
      }
    };
  }

  // Try lookup in BESTSELLERS_DATA
  const foundInBestsellers = BESTSELLERS_DATA.find(bp => bp.id === id || bp.id.toLowerCase() === id.toLowerCase());
  if (foundInBestsellers) {
    return mapBestsellerToProduct(foundInBestsellers);
  }

  // Fallback to first available live product or mock product
  if (liveProducts && liveProducts.length > 0) {
    return liveProducts[0];
  }
  return PRODUCTS_DATA[0];
};

export const getRelatedProducts = (currentProduct: Product, limit: number = 4, liveProducts?: Product[]): Product[] => {
  const all = liveProducts && liveProducts.length > 0 ? liveProducts : getAllProducts();
  const sameCategory = all.filter(p => p.id !== currentProduct.id && p.category === currentProduct.category);
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const others = all.filter(p => p.id !== currentProduct.id && p.category !== currentProduct.category);
  return [...sameCategory, ...others].slice(0, limit);
};
