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

export const getProductById = (id?: string): Product => {
  if (!id) return PRODUCTS_DATA[0];

  // Try direct lookup in PRODUCTS_DATA
  const foundInProducts = PRODUCTS_DATA.find(p => p.id === id || p.id.toLowerCase() === id.toLowerCase());
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

  // Fallback to first available product
  return PRODUCTS_DATA[0];
};

export const getRelatedProducts = (currentProduct: Product, limit: number = 4): Product[] => {
  const all = getAllProducts();
  const sameCategory = all.filter(p => p.id !== currentProduct.id && p.category === currentProduct.category);
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const others = all.filter(p => p.id !== currentProduct.id && p.category !== currentProduct.category);
  return [...sameCategory, ...others].slice(0, limit);
};
