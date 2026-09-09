import React, { useState, useMemo, useEffect } from 'react';
import { 
  SlidersHorizontal, 
  ChevronDown, 
  X, 
  Heart, 
  ShoppingCart, 
  Check, 
  Search, 
  Truck, 
  ShieldCheck, 
  Gift,
  ArrowLeft
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Currency, Product, CartItem } from '../types';
import { BESTSELLERS_DATA } from '../data/bestsellersData';
import { PRODUCTS_DATA } from '../data/mockData';
import { SHOP_CATEGORIES } from '../data/shopCategories';

interface DedicatedCategoryViewProps {
  categoryName: string;
  subcategoryName?: string | null;
  currency: Currency;
  onOpenCustomizer: (product: Product) => void;
  onAddToCart?: (item: CartItem) => void;
  onBackToOverview?: () => void;
  onSelectCategory: (catName: string, subcatName?: string) => void;
}

type SortOption = 'recommended' | 'price_low' | 'price_high' | 'discount_high' | 'rating' | 'popular';

export const DedicatedCategoryView: React.FC<DedicatedCategoryViewProps> = ({
  categoryName,
  subcategoryName,
  currency,
  onOpenCustomizer,
  onAddToCart,
  onBackToOverview,
  onSelectCategory
}) => {
  // Wishlist persisted in localStorage
  const [wishlist, setWishlist] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('sozy_wishlist_map');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('sozy_wishlist_map', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Filter States
  const [selectedSubcat, setSelectedSubcat] = useState<string | null>(subcategoryName || null);
  const [selectedRecipient, setSelectedRecipient] = useState<string>('All');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All Occasions');
  const [minPrice, setMinPrice] = useState<number>(10000);
  const [maxPrice, setMaxPrice] = useState<number>(240000);
  const [selectedDiscount, setSelectedDiscount] = useState<number | null>(null);
  const [onlyPhotoGifts, setOnlyPhotoGifts] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');

  // Accordion toggle states
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isPersonaliseOpen, setIsPersonaliseOpen] = useState(false);
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(true);
  const [isRecipientOpen, setIsRecipientOpen] = useState(false);
  const [isOccasionOpen, setIsOccasionOpen] = useState(false);
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);

  // UI States
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState<Record<string, number>>({});
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 24;

  // Sync subcategory prop
  useEffect(() => {
    setSelectedSubcat(subcategoryName || null);
  }, [subcategoryName]);

  // Aggregate unified product list for this category
  const categoryRawProducts = useMemo(() => {
    const isBestsellers = categoryName.toLowerCase().includes('bestseller') || categoryName.toLowerCase() === 'best sellers';

    if (isBestsellers) {
      return BESTSELLERS_DATA.map(bp => ({
        id: bp.id,
        name: bp.name,
        badge: bp.badge || 'PERSONALISE IT!',
        category: bp.category,
        subcategories: [bp.category],
        recipient: bp.recipient,
        occasion: bp.occasion,
        priceUGX: bp.priceUGX,
        originalPriceUGX: bp.originalPriceUGX,
        priceUSD: bp.priceUSD,
        originalPriceUSD: bp.originalPriceUSD,
        discountPercent: bp.discountPercent,
        rating: bp.rating,
        reviewCount: bp.reviewCount,
        image: bp.image,
        gallery: bp.gallery,
        isCustomizable: bp.isCustomizable,
        description: `${bp.name} - Handcrafted personalised keepsake with high-definition laser engraving & UV colour printing.`
      }));
    }

    // Otherwise, find products in BESTSELLERS_DATA and PRODUCTS_DATA matching category
    const catLower = categoryName.toLowerCase();
    
    // 1. From PRODUCTS_DATA
    const fromProducts = PRODUCTS_DATA.filter(p => {
      const pCat = p.category.toLowerCase();
      const pName = p.name.toLowerCase();
      if (catLower === 'all' || catLower === 'all products') return true;
      if (catLower.includes('mug')) return pCat.includes('mug') || pName.includes('mug') || pName.includes('tumbler');
      if (catLower.includes('flask') || catLower.includes('bottle')) return pCat.includes('flask') || pCat.includes('bottle') || pName.includes('flask') || pName.includes('bottle');
      if (catLower.includes('apparel')) return pCat.includes('apparel') || pCat.includes('shirt') || pCat.includes('hoodie');
      if (catLower.includes('bamboo')) return pCat.includes('bamboo') || pName.includes('bamboo');
      if (catLower.includes('corporate')) return pCat.includes('corporate') || pCat.includes('gift');
      if (catLower.includes('gift set')) return pCat.includes('set') || pCat.includes('combo') || pName.includes('set');
      if (catLower.includes('glass')) return pCat.includes('glass') || pName.includes('glass');
      if (catLower.includes('keyholder')) return pCat.includes('key') || pName.includes('key');
      if (catLower.includes('troph') || catLower.includes('medal')) return pCat.includes('troph') || pCat.includes('medal') || pCat.includes('award');
      if (catLower.includes('clock')) return pCat.includes('clock') || pName.includes('clock');
      if (catLower.includes('watch')) return pCat.includes('watch') || pName.includes('watch');
      if (catLower.includes('umbrella')) return pCat.includes('umbrella') || pName.includes('umbrella');
      if (catLower.includes('tech')) return pCat.includes('tech') || pName.includes('bank') || pName.includes('wireless') || pName.includes('speaker');
      if (catLower.includes('frame') || catLower.includes('lamp')) return pCat.includes('frame') || pName.includes('frame') || pName.includes('lamp');
      return pCat.includes(catLower) || catLower.includes(pCat);
    }).map(p => {
      const origUGX = p.originalPriceUGX || Math.round(p.priceUGX * 1.2 / 1000) * 1000;
      const discount = Math.round(((origUGX - p.priceUGX) / origUGX) * 100);
      return {
        id: p.id,
        name: p.name,
        badge: p.badge || 'PERSONALISE IT!',
        category: p.category,
        subcategories: [p.category],
        recipient: 'Him / Her',
        occasion: 'Corporate / Birthday',
        priceUGX: p.priceUGX,
        originalPriceUGX: origUGX,
        priceUSD: p.priceUSD,
        originalPriceUSD: p.originalPriceUSD || Math.round(p.priceUSD * 1.2),
        discountPercent: discount > 0 ? `${discount}% OFF` : '',
        rating: p.rating || 4.9,
        reviewCount: p.reviewCount || p.reviewsCount || 85,
        image: p.image,
        gallery: p.gallery || [p.image],
        isCustomizable: p.isCustomizable !== false,
        description: p.description
      };
    });

    // 2. From BESTSELLERS_DATA matching this category
    const fromBestsellers = BESTSELLERS_DATA.filter(bp => {
      const bCat = bp.category.toLowerCase();
      const bName = bp.name.toLowerCase();
      if (catLower === 'all' || catLower === 'all products' || catLower === 'all gifts') return true;
      if (catLower.includes('cushion')) return bCat.includes('cushion') || bName.includes('cushion');
      if (catLower.includes('sipper')) return bCat.includes('sipper') || bCat.includes('bottle') || bName.includes('sipper') || bName.includes('tumbler') || bName.includes('flask');
      if (catLower.includes('jewel')) return bCat.includes('jewel') || bName.includes('necklace') || bName.includes('bracelet') || bName.includes('ring') || bName.includes('pendant');
      if (catLower.includes('flower')) return bCat.includes('flower') || bName.includes('rose') || bName.includes('orchid') || bName.includes('bouquet');
      if (catLower.includes('cake')) return bCat.includes('cake') || bName.includes('cake') || bName.includes('bento');
      if (catLower.includes('mug')) return bCat.includes('mug') || bName.includes('mug');
      if (catLower.includes('flask') || catLower.includes('bottle')) return bCat.includes('bottle') || bCat.includes('tumbler') || bName.includes('flask') || bName.includes('bottle') || bName.includes('tumbler');
      if (catLower.includes('bamboo')) return bName.includes('bamboo') || bCat.includes('bamboo');
      if (catLower.includes('corporate')) return bp.occasion.toLowerCase().includes('corporate') || bCat.includes('cufflinks') || bCat.includes('pen') || bName.includes('organis') || bName.includes('desk');
      if (catLower.includes('gift set')) return bCat.includes('hamper') || bName.includes('gift set') || bName.includes('box') || bName.includes('combo');
      if (catLower.includes('keyholder')) return bName.includes('key');
      if (catLower.includes('clock')) return bCat.includes('clock') || bName.includes('clock');
      if (catLower.includes('tech')) return bCat.includes('tech') || bName.includes('wireless') || bName.includes('lamp') || bName.includes('speaker');
      if (catLower.includes('frame') || catLower.includes('lamp')) return bCat.includes('frame') || bCat.includes('lamp') || bName.includes('frame') || bName.includes('lamp');
      return bCat.includes(catLower) || catLower.includes(bCat);
    }).map(bp => ({
      id: bp.id,
      name: bp.name,
      badge: bp.badge || 'PERSONALISE IT!',
      category: bp.category,
      subcategories: [bp.category],
      recipient: bp.recipient,
      occasion: bp.occasion,
      priceUGX: bp.priceUGX,
      originalPriceUGX: bp.originalPriceUGX,
      priceUSD: bp.priceUSD,
      originalPriceUSD: bp.originalPriceUSD,
      discountPercent: bp.discountPercent,
      rating: bp.rating,
      reviewCount: bp.reviewCount,
      image: bp.image,
      gallery: bp.gallery,
      isCustomizable: bp.isCustomizable,
      description: `${bp.name} - Customised gift.`
    }));

    // Deduplicate by ID
    const combined = [...fromBestsellers, ...fromProducts];
    const seen = new Set<string>();
    return combined.filter(item => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }, [categoryName]);

  // Subcategories available for this category
  const subcategoriesList = useMemo(() => {
    const matchedCategoryConfig = SHOP_CATEGORIES.find(
      c => c.name.toLowerCase() === categoryName.toLowerCase() || c.id.toLowerCase() === categoryName.toLowerCase()
    );
    if (matchedCategoryConfig?.subcategories && matchedCategoryConfig.subcategories.length > 0) {
      return matchedCategoryConfig.subcategories;
    }
    // Extract unique categories from items
    const set = new Set<string>();
    categoryRawProducts.forEach(p => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [categoryName, categoryRawProducts]);

  // Absolute min & max in this category
  const { absoluteMinPrice, absoluteMaxPrice } = useMemo(() => {
    if (categoryRawProducts.length === 0) return { absoluteMinPrice: 10000, absoluteMaxPrice: 240000 };
    let min = Infinity;
    let max = -Infinity;
    categoryRawProducts.forEach(p => {
      if (p.priceUGX < min) min = p.priceUGX;
      if (p.priceUGX > max) max = p.priceUGX;
    });
    return {
      absoluteMinPrice: Math.max(10000, Math.floor(min / 10000) * 10000),
      absoluteMaxPrice: Math.max(200000, Math.ceil(max / 10000) * 10000)
    };
  }, [categoryRawProducts]);

  // Initialize bounds
  useEffect(() => {
    setMinPrice(absoluteMinPrice);
    setMaxPrice(absoluteMaxPrice);
  }, [absoluteMinPrice, absoluteMaxPrice, categoryName]);

  // Calculate histogram buckets for Price filter
  const histogramBuckets = useMemo(() => {
    const bucketCount = 12;
    const range = Math.max(10000, absoluteMaxPrice - absoluteMinPrice);
    const step = range / bucketCount;
    const buckets = Array(bucketCount).fill(0);

    categoryRawProducts.forEach(item => {
      const p = item.priceUGX;
      const idx = Math.min(bucketCount - 1, Math.max(0, Math.floor((p - absoluteMinPrice) / step)));
      buckets[idx]++;
    });

    const maxCount = Math.max(...buckets, 1);
    return buckets.map((count, i) => ({
      count,
      heightPercent: Math.round((count / maxCount) * 100),
      rangeMin: Math.round(absoluteMinPrice + i * step),
      rangeMax: Math.round(absoluteMinPrice + (i + 1) * step),
      isActive: (absoluteMinPrice + (i + 1) * step >= minPrice) && (absoluteMinPrice + i * step <= maxPrice)
    }));
  }, [categoryRawProducts, minPrice, maxPrice, absoluteMinPrice, absoluteMaxPrice]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedSubcat(null);
    setSelectedRecipient('All');
    setSelectedOccasion('All Occasions');
    setMinPrice(absoluteMinPrice);
    setMaxPrice(absoluteMaxPrice);
    setSelectedDiscount(null);
    setOnlyPhotoGifts(false);
    setSearchQuery('');
    setSortBy('recommended');
    setCurrentPage(1);
  };

  const hasActiveFilters = 
    selectedSubcat !== null ||
    selectedRecipient !== 'All' ||
    selectedOccasion !== 'All Occasions' ||
    minPrice > absoluteMinPrice ||
    maxPrice < absoluteMaxPrice ||
    selectedDiscount !== null ||
    onlyPhotoGifts ||
    searchQuery.trim() !== '';

  // Filtered and Sorted list
  const filteredProducts = useMemo(() => {
    return categoryRawProducts.filter(item => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.recipient.toLowerCase().includes(q) ||
          item.occasion.toLowerCase().includes(q) ||
          item.badge.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Subcategory
      if (selectedSubcat) {
        const subLower = selectedSubcat.toLowerCase();
        const matchSub = 
          item.name.toLowerCase().includes(subLower) || 
          item.category.toLowerCase().includes(subLower);
        if (!matchSub) return false;
      }

      // Recipient
      if (selectedRecipient !== 'All') {
        const target = selectedRecipient.replace('For ', '').toLowerCase();
        if (!item.recipient.toLowerCase().includes(target)) return false;
      }

      // Occasion
      if (selectedOccasion !== 'All Occasions') {
        const occTarget = selectedOccasion.toLowerCase();
        if (!item.occasion.toLowerCase().includes(occTarget)) return false;
      }

      // Price Range
      if (item.priceUGX < minPrice || item.priceUGX > maxPrice) return false;

      // Discount
      if (selectedDiscount !== null) {
        const discountNum = parseInt(item.discountPercent.replace(/\D/g, ''), 10) || 0;
        if (discountNum < selectedDiscount) return false;
      }

      // Photo Gifts
      if (onlyPhotoGifts) {
        const isPhoto = 
          item.name.toLowerCase().includes('photo') || 
          item.name.toLowerCase().includes('polaroid') ||
          item.category.toLowerCase().includes('photo');
        if (!isPhoto) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.priceUGX - b.priceUGX;
      if (sortBy === 'price_high') return b.priceUGX - a.priceUGX;
      if (sortBy === 'discount_high') {
        const da = parseInt(a.discountPercent.replace(/\D/g, ''), 10) || 0;
        const db = parseInt(b.discountPercent.replace(/\D/g, ''), 10) || 0;
        return db - da;
      }
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'popular') return b.reviewCount - a.reviewCount;
      return 0;
    });
  }, [
    categoryRawProducts,
    searchQuery,
    selectedSubcat,
    selectedRecipient,
    selectedOccasion,
    minPrice,
    maxPrice,
    selectedDiscount,
    onlyPhotoGifts,
    sortBy
  ]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSubcat, selectedRecipient, selectedOccasion, minPrice, maxPrice, selectedDiscount, onlyPhotoGifts, searchQuery, sortBy]);

  // Paginated slice
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const formatPrice = (ugx: number, usd: number) => {
    if (currency === 'UGX') {
      return `UGX ${ugx.toLocaleString()}`;
    }
    return `$${usd.toFixed(0)}`;
  };

  const sortLabels: Record<SortOption, string> = {
    recommended: 'Recommended',
    price_low: 'Price: Low to High',
    price_high: 'Price: High to Low',
    discount_high: 'Discount: High to Low',
    rating: 'Customer Rating',
    popular: 'Most Popular'
  };

  const toStandardProduct = (item: typeof categoryRawProducts[0]): Product => ({
    id: item.id,
    name: item.name,
    category: item.category,
    priceUGX: item.priceUGX,
    priceUSD: item.priceUSD,
    originalPriceUGX: item.originalPriceUGX,
    originalPriceUSD: item.originalPriceUSD,
    image: item.image,
    gallery: item.gallery,
    description: item.description,
    isCustomizable: item.isCustomizable,
    minOrderQty: 1,
    rating: item.rating,
    reviewCount: item.reviewCount,
    badge: item.badge
  });

  const handleQuickAdd = (item: typeof categoryRawProducts[0], e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      const prod = toStandardProduct(item);
      onAddToCart({
        product: prod,
        quantity: 1,
        selectedColor: 'Standard',
        customText: 'Personalised'
      });
    } else {
      onOpenCustomizer(toStandardProduct(item));
    }
  };

  const handleWhatsAppOrder = (item: typeof categoryRawProducts[0], e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello Sozy Impressions! I would like to order "${item.name}" in UGX (${formatPrice(item.priceUGX, item.priceUSD)}). Please advise how to submit photo/text customization.`
    );
    window.open(`https://wa.me/256787662183?text=${text}`, '_blank');
  };

  const displayCategoryTitle = categoryName.toLowerCase() === 'bestsellers' 
    ? 'Bestselling Personalised Gifts' 
    : categoryName;

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-20 font-sans">
      
      {/* 1. Breadcrumbs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center text-xs font-medium text-slate-500">
          {onBackToOverview && (
            <button 
              onClick={onBackToOverview}
              className="mr-3 text-slate-600 hover:text-[#2D3094] flex items-center gap-1 font-bold text-xs"
            >
              <ArrowLeft size={14} />
              <span>Shop Home</span>
            </button>
          )}
          <button 
            onClick={onBackToOverview} 
            className="hover:text-[#2D3094] transition-colors"
          >
            Shop
          </button>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-slate-900 font-bold truncate">
            {displayCategoryTitle}
          </span>
          {selectedSubcat && (
            <>
              <span className="mx-2 text-slate-300">/</span>
              <span className="text-[#2D3094] font-bold truncate">
                {selectedSubcat}
              </span>
            </>
          )}
        </div>
      </div>

      {/* 2. Page Header Bar Matching Screenshot Layout */}
      <div className="bg-white border-b border-slate-200 shadow-xs sticky top-[72px] sm:top-[96px] z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Title & Count & Reviews */}
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl md:text-2xl font-heading font-black text-slate-900 tracking-tight">
              {displayCategoryTitle}
            </h1>
            
            <span className="text-xs font-bold text-slate-500">
              {filteredProducts.length} of {categoryRawProducts.length} Gifts
            </span>

            <span className="text-slate-300 hidden sm:inline">|</span>

            {/* Rating badge without star icon */}
            <button
              onClick={() => setIsReviewsModalOpen(true)}
              className="group flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#2D3094] bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 px-2.5 py-1 rounded-md transition-all"
              title="Click to view verified customer reviews"
            >
              <span className="bg-emerald-600 text-white text-[11px] font-black px-1.5 py-0.2 rounded-xs">
                5
              </span>
              <span className="text-emerald-900 font-semibold">118 Reviews</span>
              <ChevronDown size={14} className="text-emerald-700 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Controls: Search, Sort & Mobile Filter Toggle */}
          <div className="flex items-center gap-3">
            {/* Quick Search */}
            <div className="relative hidden sm:block w-48 lg:w-60">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search in ${categoryName}...`}
                className="w-full text-xs pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#2D3094] transition-all"
              />
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 text-xs font-bold bg-[#2D3094] text-white px-3.5 py-2 rounded-xl shadow-xs hover:bg-[#242677] transition-all"
            >
              <SlidersHorizontal size={14} />
              <span>Filter</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[#ED008C]"></span>
              )}
            </button>

            {/* Sort by Dropdown Matching Screenshot */}
            <div className="relative">
              <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="flex items-center gap-2 text-xs font-medium text-slate-800 bg-white border border-slate-300 hover:border-slate-400 px-3.5 py-2 rounded-xl shadow-2xs transition-all"
              >
                <span className="text-slate-500">Sort by :</span>
                <span className="font-bold text-slate-900">{sortLabels[sortBy]}</span>
                <ChevronDown size={14} className={`text-slate-500 transition-transform ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isSortDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setIsSortDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-40 origin-top-right animate-in fade-in zoom-in-95 duration-150">
                    {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option);
                          setIsSortDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between transition-colors ${
                          sortBy === option 
                            ? 'bg-[#2D3094]/10 text-[#2D3094] font-bold' 
                            : 'text-slate-700 hover:bg-slate-50 font-medium'
                        }`}
                      >
                        <span>{sortLabels[option]}</span>
                        {sortBy === option && <Check size={14} className="text-[#2D3094]" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* 3. Main Content: Filter Sidebar + Product Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* ================= DESKTOP FILTER SIDEBAR (EXACT SCREENSHOT LAYOUT) ================= */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs sticky top-32 space-y-6">
              
              {/* Filter Header with Title & Reset */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="font-heading font-black text-slate-900 text-lg tracking-tight">
                  Filter
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-xs font-bold text-[#ED008C] hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Price Filter Accordion with Histogram matching Screenshot */}
              <div className="border-b border-slate-100 pb-5">
                <button
                  onClick={() => setIsPriceOpen(!isPriceOpen)}
                  className="w-full flex items-center justify-between text-sm font-bold text-slate-800 mb-3"
                >
                  <span>Price</span>
                  <span className="text-slate-400 font-normal text-base">
                    {isPriceOpen ? '—' : '+'}
                  </span>
                </button>

                {isPriceOpen && (
                  <div className="space-y-4 pt-1">
                    
                    {/* Histogram Bars matching screenshot */}
                    <div className="h-12 flex items-end gap-1 px-1 pt-2 bg-transparent">
                      {histogramBuckets.map((b, idx) => (
                        <div
                          key={idx}
                          className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer"
                          onClick={() => {
                            setMinPrice(b.rangeMin);
                            setMaxPrice(b.rangeMax);
                          }}
                        >
                          <div 
                            className={`w-full rounded-xs transition-all ${
                              b.isActive 
                                ? 'bg-[#9BA383] group-hover:bg-[#2D3094]' 
                                : 'bg-[#D1D5DB] group-hover:bg-slate-400'
                            }`}
                            style={{ height: `${Math.max(16, b.heightPercent)}%` }}
                          />
                          {/* Hover Tooltip */}
                          <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] py-0.5 px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                            {b.count} items
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Dual Range Track / Sliders with olive-gold track matching screenshot */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-bold text-slate-400">
                        <span>UGX {absoluteMinPrice.toLocaleString()}</span>
                        <span>UGX {absoluteMaxPrice.toLocaleString()}+</span>
                      </div>

                      <div className="relative pt-1">
                        <input
                          type="range"
                          min={absoluteMinPrice}
                          max={absoluteMaxPrice}
                          step={5000}
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(Math.max(minPrice + 5000, Number(e.target.value)))}
                          className="w-full accent-[#7F8766] cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Minimum & Maximum Input Boxes matching screenshot */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div>
                        <span className="text-[11px] text-slate-600 block mb-1">
                          Minimum
                        </span>
                        <div className="flex items-center bg-white border border-slate-300 rounded-md px-2.5 py-1.5 focus-within:border-[#2D3094] transition-all">
                          <span className="text-[11px] font-bold text-slate-500 mr-1.5">
                            UGX
                          </span>
                          <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(Math.max(0, Number(e.target.value)))}
                            className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] text-slate-600 block mb-1">
                          Maximum
                        </span>
                        <div className="flex items-center bg-white border border-slate-300 rounded-md px-2.5 py-1.5 focus-within:border-[#2D3094] transition-all">
                          <span className="text-[11px] font-bold text-slate-500 mr-1.5">
                            UGX
                          </span>
                          <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Math.min(1000000, Number(e.target.value)))}
                            className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Quick Price Buttons */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <button
                        onClick={() => { setMinPrice(10000); setMaxPrice(35000); }}
                        className="text-[10px] font-semibold px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors"
                      >
                        Under 35K
                      </button>
                      <button
                        onClick={() => { setMinPrice(35000); setMaxPrice(75000); }}
                        className="text-[10px] font-semibold px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors"
                      >
                        35K - 75K
                      </button>
                      <button
                        onClick={() => { setMinPrice(75000); setMaxPrice(130000); }}
                        className="text-[10px] font-semibold px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors"
                      >
                        75K - 130K
                      </button>
                    </div>

                  </div>
                )}
              </div>

              {/* Personalise It Accordion matching screenshot */}
              <div className="border-b border-slate-100 pb-5">
                <button
                  onClick={() => setIsPersonaliseOpen(!isPersonaliseOpen)}
                  className="w-full flex items-center justify-between text-sm font-bold text-slate-800 mb-3"
                >
                  <span>Personalise It</span>
                  <span className="text-slate-400 font-normal text-base">
                    {isPersonaliseOpen ? '—' : '+'}
                  </span>
                </button>

                {isPersonaliseOpen && (
                  <div className="space-y-2 pt-1">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs text-slate-700 hover:text-slate-900">
                      <input
                        type="checkbox"
                        checked={onlyPhotoGifts}
                        onChange={(e) => setOnlyPhotoGifts(e.target.checked)}
                        className="w-4 h-4 rounded text-[#2D3094] accent-[#2D3094]"
                      />
                      <span className="font-medium">Photo Upload Gifts</span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs text-slate-700 hover:text-slate-900">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 rounded text-[#2D3094] accent-[#2D3094]"
                      />
                      <span className="font-medium">Name / Text Engraving</span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs text-slate-700 hover:text-slate-900">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 rounded text-[#2D3094] accent-[#2D3094]"
                      />
                      <span className="font-medium">Free Live Digital Proof</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Subcategories Accordion */}
              {subcategoriesList.length > 0 && (
                <div className="border-b border-slate-100 pb-5">
                  <button
                    onClick={() => setIsSubcategoryOpen(!isSubcategoryOpen)}
                    className="w-full flex items-center justify-between text-sm font-bold text-slate-800 mb-3"
                  >
                    <span>Subcategories</span>
                    <span className="text-slate-400 font-normal text-base">
                      {isSubcategoryOpen ? '—' : '+'}
                    </span>
                  </button>

                  {isSubcategoryOpen && (
                    <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                      <button
                        onClick={() => setSelectedSubcat(null)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                          selectedSubcat === null 
                            ? 'bg-[#2D3094] text-white font-bold' 
                            : 'text-slate-600 hover:bg-slate-100 font-medium'
                        }`}
                      >
                        <span>All {categoryName}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          selectedSubcat === null ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {categoryRawProducts.length}
                        </span>
                      </button>

                      {subcategoriesList.map((subcat) => {
                        const count = categoryRawProducts.filter(p => 
                          p.name.toLowerCase().includes(subcat.toLowerCase()) || 
                          p.category.toLowerCase().includes(subcat.toLowerCase())
                        ).length;

                        const isSelected = selectedSubcat === subcat;

                        return (
                          <button
                            key={subcat}
                            onClick={() => setSelectedSubcat(subcat)}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                              isSelected 
                                ? 'bg-[#2D3094] text-white font-bold' 
                                : 'text-slate-600 hover:bg-slate-100 font-medium'
                            }`}
                          >
                            <span className="truncate text-left">{subcat}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                            }`}>
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* All Shop Categories Accordion */}
              <div className="border-b border-slate-100 pb-5">
                <div className="flex items-center justify-between text-sm font-bold text-slate-800 mb-3">
                  <span>Categories</span>
                </div>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  {SHOP_CATEGORIES.map((cat) => {
                    const isCurrent = categoryName.toLowerCase() === cat.name.toLowerCase();
                    return (
                      <button
                        key={cat.id}
                        onClick={() => onSelectCategory(cat.name)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                          isCurrent
                            ? 'bg-[#2D3094] text-white font-bold'
                            : 'text-slate-600 hover:bg-slate-100 font-medium'
                        }`}
                      >
                        <span className="truncate text-left">{cat.name}</span>
                        {isCurrent && <Check size={12} className="text-white shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recipient Accordion */}
              <div className="border-b border-slate-100 pb-5">
                <button
                  onClick={() => setIsRecipientOpen(!isRecipientOpen)}
                  className="w-full flex items-center justify-between text-sm font-bold text-slate-800 mb-3"
                >
                  <span>Recipient</span>
                  <span className="text-slate-400 font-normal text-base">
                    {isRecipientOpen ? '—' : '+'}
                  </span>
                </button>

                {isRecipientOpen && (
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    {['All', 'For Him', 'For Her', 'For Mom', 'For Dad', 'For Kids', 'For Couples'].map((rec) => (
                      <button
                        key={rec}
                        onClick={() => setSelectedRecipient(rec)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border text-left truncate transition-colors ${
                          selectedRecipient === rec
                            ? 'border-[#2D3094] bg-[#2D3094]/10 text-[#2D3094] font-bold'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {rec}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Occasion Accordion */}
              <div className="border-b border-slate-100 pb-5">
                <button
                  onClick={() => setIsOccasionOpen(!isOccasionOpen)}
                  className="w-full flex items-center justify-between text-sm font-bold text-slate-800 mb-3"
                >
                  <span>Occasion</span>
                  <span className="text-slate-400 font-normal text-base">
                    {isOccasionOpen ? '—' : '+'}
                  </span>
                </button>

                {isOccasionOpen && (
                  <div className="space-y-1 pt-1">
                    {['All Occasions', 'Birthday', 'Anniversary', 'Corporate', 'Love & Romance'].map((occ) => (
                      <button
                        key={occ}
                        onClick={() => setSelectedOccasion(occ)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                          selectedOccasion === occ
                            ? 'bg-[#2D3094] text-white font-bold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {occ}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Discount Accordion */}
              <div>
                <button
                  onClick={() => setIsDiscountOpen(!isDiscountOpen)}
                  className="w-full flex items-center justify-between text-sm font-bold text-slate-800 mb-3"
                >
                  <span>Discount</span>
                  <span className="text-slate-400 font-normal text-base">
                    {isDiscountOpen ? '—' : '+'}
                  </span>
                </button>

                {isDiscountOpen && (
                  <div className="space-y-1 pt-1">
                    {[
                      { label: 'All Discounts', value: null },
                      { label: '30% or more', value: 30 },
                      { label: '20% or more', value: 20 },
                      { label: '10% or more', value: 10 },
                    ].map((d) => (
                      <button
                        key={d.label}
                        onClick={() => setSelectedDiscount(d.value)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                          selectedDiscount === d.value
                            ? 'bg-emerald-600 text-white font-bold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </aside>

          {/* ================= PRODUCT GRID (RIGHT) MATCHING ATTACHED SCREENSHOT ================= */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Active Filters Pill Bar */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-500 mr-1">Active filters:</span>
                
                {selectedSubcat && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-[#2D3094]/10 text-[#2D3094] px-2.5 py-1 rounded-full">
                    {selectedSubcat}
                    <button onClick={() => setSelectedSubcat(null)} className="hover:text-red-500">
                      <X size={12} />
                    </button>
                  </span>
                )}

                {selectedRecipient !== 'All' && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-[#2D3094]/10 text-[#2D3094] px-2.5 py-1 rounded-full">
                    {selectedRecipient}
                    <button onClick={() => setSelectedRecipient('All')} className="hover:text-red-500">
                      <X size={12} />
                    </button>
                  </span>
                )}

                {selectedOccasion !== 'All Occasions' && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-[#2D3094]/10 text-[#2D3094] px-2.5 py-1 rounded-full">
                    {selectedOccasion}
                    <button onClick={() => setSelectedOccasion('All Occasions')} className="hover:text-red-500">
                      <X size={12} />
                    </button>
                  </span>
                )}

                {(minPrice > absoluteMinPrice || maxPrice < absoluteMaxPrice) && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                    Price: {formatPrice(minPrice, Math.round(minPrice / 3700))} - {formatPrice(maxPrice, Math.round(maxPrice / 3700))}
                    <button onClick={() => { setMinPrice(absoluteMinPrice); setMaxPrice(absoluteMaxPrice); }} className="hover:text-red-500">
                      <X size={12} />
                    </button>
                  </span>
                )}

                {selectedDiscount !== null && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                    {selectedDiscount}%+ OFF
                    <button onClick={() => setSelectedDiscount(null)} className="hover:text-red-500">
                      <X size={12} />
                    </button>
                  </span>
                )}

                {onlyPhotoGifts && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-purple-100 text-purple-800 px-2.5 py-1 rounded-full">
                    Photo Gifts
                    <button onClick={() => setOnlyPhotoGifts(false)} className="hover:text-red-500">
                      <X size={12} />
                    </button>
                  </span>
                )}

                {searchQuery && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="hover:text-red-500">
                      <X size={12} />
                    </button>
                  </span>
                )}

                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-[#ED008C] hover:underline ml-auto"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <Gift size={28} />
                </div>
                <h3 className="text-lg font-heading font-black text-slate-900">
                  No matching gifts found in {displayCategoryTitle}
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try clearing your filters or broadening the price range to explore more custom gifts.
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 bg-[#2D3094] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-[#242677] transition-all"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              /* Product Grid Exact match to Screenshot 2026-09-05 225344.png */
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5">
                {paginatedProducts.map((product) => {
                  const isFav = !!wishlist[product.id];
                  const currentImgIdx = activeImageIndex[product.id] || 0;
                  const displayImg = product.gallery && product.gallery[currentImgIdx] ? product.gallery[currentImgIdx] : product.image;

                  return (
                    <div
                      key={product.id}
                      onClick={() => onOpenCustomizer(toStandardProduct(product))}
                      className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer relative min-w-0"
                    >
                      {/* Image Frame with Pagination Dots inside bottom as seen in screenshot */}
                      <div className="relative w-full pt-[100%] bg-slate-100 overflow-hidden rounded-t-2xl">
                        <img
                          src={displayImg}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                          loading="lazy"
                        />

                        {/* Top Right Wishlist Heart Button */}
                        <button
                          onClick={(e) => toggleWishlist(product.id, e)}
                          className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-600 hover:text-red-500 shadow-xs transition-transform active:scale-90"
                          title={isFav ? 'Remove from wishlist' : 'Save to wishlist'}
                        >
                          <Heart 
                            size={14} 
                            className={`sm:w-4 sm:h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} 
                          />
                        </button>

                        {/* Carousel 3 to 6 dots inside bottom of image matching screenshot */}
                        <div className="absolute bottom-2 sm:bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 sm:gap-1.5 z-10 bg-black/25 backdrop-blur-2xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
                          {[0, 1, 2].map((dotIdx) => (
                            <button
                              key={dotIdx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveImageIndex(prev => ({ ...prev, [product.id]: dotIdx % 2 }));
                              }}
                              className={`w-1.5 h-1.5 rounded-full transition-all ${
                                currentImgIdx === (dotIdx % 2) 
                                  ? 'bg-white w-2.5' 
                                  : 'bg-white/60 hover:bg-white'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Card Content Layout: Title, PERSONALISE IT! badge, Price in UGX */}
                      <div className="p-2.5 sm:p-4 flex flex-col flex-1 justify-between gap-2 sm:gap-2.5 min-w-0">
                        
                        <div className="min-w-0">
                          {/* Product Title matching screenshot (e.g. "Silver Personalised Initial...") */}
                          <h3 
                            className="font-bold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-1 group-hover:text-[#2D3094] transition-colors truncate"
                            title={product.name}
                          >
                            {product.name}
                          </h3>

                          {/* PERSONALISE IT! Blue Pill Badge matching screenshot */}
                          <div className="mt-1 sm:mt-1.5">
                            <span className="inline-block bg-[#1877F2] text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded uppercase tracking-wider truncate max-w-full">
                              {product.badge || 'PERSONALISE IT!'}
                            </span>
                          </div>
                        </div>

                        {/* Pricing Row in UGX matching screenshot */}
                        <div className="pt-0.5 sm:pt-1 min-w-0">
                          <div className="flex items-baseline flex-wrap gap-1 sm:gap-2">
                            {/* Current Price */}
                            <span className="text-xs sm:text-base font-black text-slate-900 tracking-tight">
                              {formatPrice(product.priceUGX, product.priceUSD)}
                            </span>

                            {/* Original Price Strikethrough */}
                            {product.originalPriceUGX > product.priceUGX && (
                              <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                                {formatPrice(product.originalPriceUGX, product.originalPriceUSD)}
                              </span>
                            )}

                            {/* Discount Percent in green */}
                            {product.discountPercent && (
                              <span className="text-[10px] sm:text-xs font-bold text-emerald-600">
                                {product.discountPercent}
                              </span>
                            )}
                          </div>

                          {/* Action Bar */}
                          <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-slate-100 flex items-center gap-1 sm:gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenCustomizer(toStandardProduct(product));
                              }}
                              className="flex-1 min-w-0 bg-[#2D3094] hover:bg-[#20236e] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider py-1.5 sm:py-2 px-1 sm:px-2.5 rounded-lg sm:rounded-xl shadow-2xs transition-all flex items-center justify-center gap-1"
                            >
                              <span className="truncate">Personalise</span>
                            </button>

                            <button
                              onClick={(e) => handleQuickAdd(product, e)}
                              className="p-1.5 sm:p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-[#2D3094] rounded-lg sm:rounded-xl transition-colors shrink-0"
                              title="Quick add to cart"
                            >
                              <ShoppingCart size={14} className="sm:w-[15px] sm:h-[15px]" />
                            </button>

                            <button
                              onClick={(e) => handleWhatsAppOrder(product, e)}
                              className="p-1.5 sm:p-2 bg-[#25D366] hover:bg-[#20ba5a] active:bg-[#1da851] text-white rounded-lg sm:rounded-xl shadow-xs transition-colors shrink-0 flex items-center justify-center cursor-pointer"
                              title="Order on WhatsApp: 0787662183"
                            >
                              <WhatsAppIcon size={14} className="sm:w-[15px] sm:h-[15px]" />
                            </button>
                          </div>

                        </div>

                      </div>

                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
                <span className="text-xs text-slate-500 font-medium">
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} gifts
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => {
                      setCurrentPage(p => Math.max(1, p - 1));
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                    className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
                  >
                    Previous
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = i + 1;
                    if (totalPages > 5 && currentPage > 3) {
                      pageNum = Math.min(totalPages - 4 + i, currentPage - 2 + i);
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => {
                          setCurrentPage(pageNum);
                          window.scrollTo({ top: 120, behavior: 'smooth' });
                        }}
                        className={`w-8 h-8 text-xs font-bold rounded-lg transition-all ${
                          currentPage === pageNum
                            ? 'bg-[#2D3094] text-white'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => {
                      setCurrentPage(p => Math.min(totalPages, p + 1));
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                    className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Delivery & Personalisation Assurance Banner */}
            <div className="mt-12 bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#2D3094]/10 text-[#2D3094] flex items-center justify-center shrink-0">
                  <Truck size={22} />
                </div>
                <div>
                  <h4 className="font-heading font-black text-slate-900 text-sm">
                    Same-Day Kampala Delivery
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Fast delivery across Kampala, Entebbe, Wakiso, Mukono & upcountry courier across Uganda.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#ED008C]/10 text-[#ED008C] flex items-center justify-center shrink-0">
                  <Gift size={22} />
                </div>
                <div>
                  <h4 className="font-heading font-black text-slate-900 text-sm">
                    Digital Proof Before Print
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    We share an instant WhatsApp proof of your custom gift preview before permanent laser engraving.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h4 className="font-heading font-black text-slate-900 text-sm">
                    Premium Quality Guarantee
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Built to last with food-grade steel, real solid wood, durable ceramics, and elegant gift boxing.
                  </p>
                </div>
              </div>
            </div>

          </main>

        </div>
      </div>

      {/* ================= MOBILE FILTER DRAWER ================= */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
            onClick={() => setIsMobileFilterOpen(false)}
          />

          <div className="relative ml-auto w-[85vw] max-w-md bg-white h-full shadow-2xl overflow-y-auto p-5 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-[#2D3094]" />
                  <span className="font-heading font-black text-slate-900 text-base">
                    Filter {displayCategoryTitle}
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Price */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Price (UGX)
                </span>
                <input
                  type="range"
                  min={absoluteMinPrice}
                  max={absoluteMaxPrice}
                  step={5000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#7F8766]"
                />
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>UGX {minPrice.toLocaleString()}</span>
                  <span>UGX {maxPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Mobile Subcategories */}
              {subcategoriesList.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Subcategory
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto">
                    {subcategoriesList.map((subcat) => (
                      <button
                        key={subcat}
                        onClick={() => setSelectedSubcat(selectedSubcat === subcat ? null : subcat)}
                        className={`text-xs px-2.5 py-2 rounded-xl text-left truncate transition-colors ${
                          selectedSubcat === subcat 
                            ? 'bg-[#2D3094] text-white font-bold' 
                            : 'bg-slate-50 text-slate-700'
                        }`}
                      >
                        {subcat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile Personalise */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={onlyPhotoGifts}
                    onChange={(e) => setOnlyPhotoGifts(e.target.checked)}
                    className="w-4 h-4 rounded text-[#2D3094] accent-[#2D3094]"
                  />
                  <span>Show Only Photo Upload Gifts</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 text-xs font-bold text-white bg-[#2D3094] rounded-xl hover:bg-[#242677] transition-colors"
              >
                Show {filteredProducts.length} Gifts
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= REVIEWS PREVIEW MODAL ================= */}
      {isReviewsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
            onClick={() => setIsReviewsModalOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl z-10 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-600 text-white text-xs font-black px-2 py-0.5 rounded">
                  5.0
                </span>
                <div>
                  <h3 className="text-sm font-heading font-black text-slate-900">
                    118 Verified Customer Reviews
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {displayCategoryTitle} • Sozy Impressions Kampala
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsReviewsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {[
                {
                  author: "Dr. Ronald K.",
                  location: "Kololo, Kampala",
                  product: "Custom Personalised Gift",
                  comment: "The precision of the engraving and fast same-day dispatch made this the perfect gift!",
                  rating: "5.0"
                },
                {
                  author: "Brenda Namutebi",
                  location: "Naguru",
                  product: "Personalised Keepsake",
                  comment: "My family was so impressed by the packaging and crystal-clear finish. Highly recommend!",
                  rating: "5.0"
                },
                {
                  author: "Brian & Sarah M.",
                  location: "Entebbe",
                  product: "Personalised Special Gift",
                  comment: "Top quality materials, responsive WhatsApp proof, and delivered right on time.",
                  rating: "5.0"
                }
              ].map((rev, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{rev.author}</span>
                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Rating: {rev.rating} / 5.0
                    </span>
                  </div>
                  <div className="text-[10px] font-semibold text-[#2D3094]">
                    Bought: {rev.product} • {rev.location}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsReviewsModalOpen(false)}
              className="w-full py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
