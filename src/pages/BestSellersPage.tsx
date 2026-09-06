import React, { useState, useMemo, useEffect } from 'react';
import { 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  X, 
  Heart, 
  ShoppingCart, 
  SlidersHorizontal,
  ArrowUpDown,
  Check,
  Search,
  MessageCircle,
  Truck,
  ShieldCheck,
  Gift
} from 'lucide-react';
import { View, Currency, Product, CartItem } from '../types';
import { 
  BESTSELLERS_DATA, 
  BESTSELLER_CATEGORIES, 
  BESTSELLER_RECIPIENTS, 
  BESTSELLER_OCCASIONS,
  BestsellerProduct 
} from '../data/bestsellersData';

interface BestSellersPageProps {
  navigate: (view: View, param?: string) => void;
  currency: Currency;
  onOpenCustomizer: (product: Product) => void;
  onAddToCart: (item: CartItem) => void;
}

type SortOption = 'recommended' | 'price_low' | 'price_high' | 'discount_high' | 'rating' | 'popular';

export const BestSellersPage: React.FC<BestSellersPageProps> = ({
  navigate,
  currency,
  onOpenCustomizer,
  onAddToCart
}) => {
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('All Gifts');
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
  const [isPersonaliseOpen, setIsPersonaliseOpen] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isRecipientOpen, setIsRecipientOpen] = useState(false);
  const [isOccasionOpen, setIsOccasionOpen] = useState(false);
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);

  // UI States
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [activeImageIndex, setActiveImageIndex] = useState<Record<string, number>>({});
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 24;

  // Toggle Wishlist
  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Convert BestsellerProduct to standard Product for Customizer & Cart
  const mapToProduct = (bp: BestsellerProduct): Product => ({
    id: bp.id,
    name: bp.name,
    category: bp.category,
    priceUGX: bp.priceUGX,
    priceUSD: bp.priceUSD,
    originalPriceUGX: bp.originalPriceUGX,
    originalPriceUSD: bp.originalPriceUSD,
    image: bp.image,
    gallery: bp.gallery,
    description: `${bp.name} - Handcrafted personalised keepsake with high-definition laser engraving & UV colour printing by Sozy Impressions Kampala.`,
    isCustomizable: bp.isCustomizable,
    minOrderQty: 1,
    rating: bp.rating,
    reviewCount: bp.reviewCount,
    badge: bp.badge
  });

  const handleQuickAdd = (bp: BestsellerProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    const product = mapToProduct(bp);
    onAddToCart({
      product,
      quantity: 1,
      selectedColor: 'Standard',
      customText: 'Personalised'
    });
  };

  const handleOpenCustomizer = (bp: BestsellerProduct) => {
    const product = mapToProduct(bp);
    onOpenCustomizer(product);
  };

  // WhatsApp Order helper
  const handleWhatsAppOrder = (bp: BestsellerProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello Sozy Impressions! I would like to order the "${bp.name}" (${currency === 'UGX' ? `UGX ${bp.priceUGX.toLocaleString()}` : `$${bp.priceUSD}`}). Please advise how I can send my photo and custom text for personalization.`
    );
    window.open(`https://wa.me/256700000000?text=${text}`, '_blank');
  };

  // Price bounds in dataset
  const absoluteMinPrice = 10000;
  const absoluteMaxPrice = 240000;

  // Histogram calculation (10 buckets across price range)
  const histogramBuckets = useMemo(() => {
    const bucketCount = 12;
    const step = (absoluteMaxPrice - absoluteMinPrice) / bucketCount;
    const buckets = Array(bucketCount).fill(0);

    BESTSELLERS_DATA.forEach(item => {
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
  }, [minPrice, maxPrice]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('All Gifts');
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
    selectedCategory !== 'All Gifts' ||
    selectedRecipient !== 'All' ||
    selectedOccasion !== 'All Occasions' ||
    minPrice > absoluteMinPrice ||
    maxPrice < absoluteMaxPrice ||
    selectedDiscount !== null ||
    onlyPhotoGifts ||
    searchQuery.trim() !== '';

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return BESTSELLERS_DATA.filter(item => {
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

      // Category
      if (selectedCategory !== 'All Gifts' && item.category !== selectedCategory) {
        return false;
      }

      // Recipient
      if (selectedRecipient !== 'All') {
        const target = selectedRecipient.replace('For ', '');
        if (item.recipient.toLowerCase() !== target.toLowerCase()) {
          return false;
        }
      }

      // Occasion
      if (selectedOccasion !== 'All Occasions' && item.occasion !== selectedOccasion) {
        return false;
      }

      // Price range
      if (item.priceUGX < minPrice || item.priceUGX > maxPrice) {
        return false;
      }

      // Discount
      if (selectedDiscount !== null) {
        const discountNum = parseInt(item.discountPercent.replace(/\D/g, ''), 10) || 0;
        if (discountNum < selectedDiscount) return false;
      }

      // Photo Gifts filter
      if (onlyPhotoGifts) {
        const hasPhoto = 
          item.name.toLowerCase().includes('photo') || 
          item.name.toLowerCase().includes('polaroid') ||
          item.category.includes('Photo') ||
          item.category.includes('Frame');
        if (!hasPhoto) return false;
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
      return 0; // recommended maintains best-selling order
    });
  }, [
    selectedCategory,
    selectedRecipient,
    selectedOccasion,
    minPrice,
    maxPrice,
    selectedDiscount,
    onlyPhotoGifts,
    searchQuery,
    sortBy
  ]);

  // Reset page on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedRecipient, selectedOccasion, minPrice, maxPrice, selectedDiscount, onlyPhotoGifts, searchQuery, sortBy]);

  // Paginated Products
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Format currency helpers
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

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-20">
      
      {/* 1. Breadcrumbs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center text-xs font-medium text-slate-500">
          <button 
            onClick={() => navigate('home')} 
            className="hover:text-[#2D3094] transition-colors"
          >
            Home
          </button>
          <span className="mx-2 text-slate-300">/</span>
          <button 
            onClick={() => navigate('shop')} 
            className="hover:text-[#2D3094] transition-colors"
          >
            Shop
          </button>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-slate-900 font-bold truncate">
            Bestselling Personalised Gifts
          </span>
        </div>
      </div>

      {/* 2. Page Header Bar Matching Prompt Layout */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Title & Count & Reviews */}
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl md:text-2xl font-heading font-black text-[#2D3094] tracking-tight">
              Bestselling Personalised Gifts
            </h1>
            
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
              {filteredProducts.length} of 658 Gifts
            </span>

            <span className="text-slate-300 hidden sm:inline">|</span>

            {/* Rating pill without star icon */}
            <button
              onClick={() => setIsReviewsModalOpen(true)}
              className="group flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#2D3094] bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200/80 px-2.5 py-1 rounded-full transition-all"
              title="Click to view verified customer reviews"
            >
              <span className="bg-emerald-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded">
                5.0
              </span>
              <span className="text-emerald-900 font-semibold">118 Reviews</span>
              <ChevronDown size={14} className="text-emerald-700 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Controls: Search, Sort & Mobile Filter Toggle */}
          <div className="flex items-center gap-3">
            {/* Quick Search */}
            <div className="relative hidden sm:block w-48 lg:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search best sellers..."
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
              className="lg:hidden flex items-center gap-2 text-xs font-bold bg-[#2D3094] text-white px-3.5 py-2 rounded-xl shadow-sm hover:bg-[#242677] transition-all"
            >
              <Filter size={14} />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[#ED008C]"></span>
              )}
            </button>

            {/* Sort by Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="flex items-center gap-2 text-xs font-bold text-slate-800 bg-white border border-slate-200 hover:border-slate-300 px-3.5 py-2 rounded-xl shadow-xs transition-all"
              >
                <ArrowUpDown size={13} className="text-slate-500" />
                <span className="text-slate-500 font-normal">Sort by :</span>
                <span className="text-[#2D3094]">{sortLabels[sortBy]}</span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
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
                            ? 'bg-[#2D3094]/5 text-[#2D3094] font-bold' 
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
          
          {/* ================= DESKTOP FILTER SIDEBAR ================= */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs sticky top-24 space-y-6">
              
              {/* Filter Header with Reset */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={16} className="text-[#2D3094]" />
                  <span className="font-heading font-black text-slate-900 text-sm tracking-wide uppercase">
                    Filter
                  </span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-xs font-bold text-[#ED008C] hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Price Filter Accordion with Histogram */}
              <div className="border-b border-slate-100 pb-5">
                <button
                  onClick={() => setIsPriceOpen(!isPriceOpen)}
                  className="w-full flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider mb-3"
                >
                  <span>Price</span>
                  {isPriceOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </button>

                {isPriceOpen && (
                  <div className="space-y-4 pt-1">
                    
                    {/* Histogram Bars matching layout */}
                    <div className="h-14 flex items-end gap-1 px-1 pt-2 bg-slate-50 rounded-xl border border-slate-100">
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
                            className={`w-full rounded-t transition-all ${
                              b.isActive 
                                ? 'bg-[#2D3094] group-hover:bg-[#ED008C]' 
                                : 'bg-slate-300/80 group-hover:bg-slate-400'
                            }`}
                            style={{ height: `${Math.max(12, b.heightPercent)}%` }}
                          />
                          {/* Tooltip */}
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                            {b.count} items
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Dual Range Track / Sliders */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-[11px] font-bold text-slate-500">
                        <span>{currency === 'UGX' ? 'UGX 10,000' : '$3'}</span>
                        <span>{currency === 'UGX' ? 'UGX 240,000+' : '$65+'}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min={absoluteMinPrice}
                          max={absoluteMaxPrice}
                          step={5000}
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(Math.max(minPrice + 5000, Number(e.target.value)))}
                          className="w-full accent-[#2D3094] cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Minimum & Maximum Input Boxes matching screenshot layout */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Minimum
                        </span>
                        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus-within:border-[#2D3094] focus-within:bg-white transition-all">
                          <span className="text-[11px] font-bold text-slate-500 mr-1">
                            {currency === 'UGX' ? 'UGX' : '$'}
                          </span>
                          <input
                            type="number"
                            value={currency === 'UGX' ? minPrice : Math.round(minPrice / 3700)}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setMinPrice(currency === 'UGX' ? Math.max(0, val) : Math.max(0, val * 3700));
                            }}
                            className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Maximum
                        </span>
                        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus-within:border-[#2D3094] focus-within:bg-white transition-all">
                          <span className="text-[11px] font-bold text-slate-500 mr-1">
                            {currency === 'UGX' ? 'UGX' : '$'}
                          </span>
                          <input
                            type="number"
                            value={currency === 'UGX' ? maxPrice : Math.round(maxPrice / 3700)}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setMaxPrice(currency === 'UGX' ? Math.min(500000, val) : Math.min(500000, val * 3700));
                            }}
                            className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Quick Price Buttons */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <button
                        onClick={() => { setMinPrice(10000); setMaxPrice(35000); }}
                        className="text-[10px] font-semibold px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                      >
                        Under 35K
                      </button>
                      <button
                        onClick={() => { setMinPrice(35000); setMaxPrice(75000); }}
                        className="text-[10px] font-semibold px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                      >
                        35K - 75K
                      </button>
                      <button
                        onClick={() => { setMinPrice(75000); setMaxPrice(130000); }}
                        className="text-[10px] font-semibold px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                      >
                        75K - 130K
                      </button>
                      <button
                        onClick={() => { setMinPrice(130000); setMaxPrice(240000); }}
                        className="text-[10px] font-semibold px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                      >
                        130K+
                      </button>
                    </div>

                  </div>
                )}
              </div>

              {/* Personalise It Accordion */}
              <div className="border-b border-slate-100 pb-5">
                <button
                  onClick={() => setIsPersonaliseOpen(!isPersonaliseOpen)}
                  className="w-full flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider mb-3"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Personalise It</span>
                  </div>
                  {isPersonaliseOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </button>

                {isPersonaliseOpen && (
                  <div className="space-y-2 pt-1">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs text-slate-700 hover:text-slate-900">
                      <input
                        type="checkbox"
                        checked={onlyPhotoGifts}
                        onChange={(e) => setOnlyPhotoGifts(e.target.checked)}
                        className="w-4 h-4 rounded text-[#2D3094] focus:ring-[#2D3094] accent-[#2D3094]"
                      />
                      <span className="font-medium">Photo Upload Gifts</span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs text-slate-700 hover:text-slate-900">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 rounded text-[#2D3094] focus:ring-[#2D3094] accent-[#2D3094]"
                      />
                      <span className="font-medium">Name / Monogram Engraved</span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs text-slate-700 hover:text-slate-900">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 rounded text-[#2D3094] focus:ring-[#2D3094] accent-[#2D3094]"
                      />
                      <span className="font-medium">100% Personalisation Guarantee</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Categories Filter Accordion */}
              <div className="border-b border-slate-100 pb-5">
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="w-full flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider mb-3"
                >
                  <span>Category</span>
                  {isCategoryOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </button>

                {isCategoryOpen && (
                  <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                    {BESTSELLER_CATEGORIES.map((cat) => {
                      const count = cat === 'All Gifts' 
                        ? BESTSELLERS_DATA.length 
                        : BESTSELLERS_DATA.filter(i => i.category === cat).length;
                      
                      const isSelected = selectedCategory === cat;

                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                            isSelected 
                              ? 'bg-[#2D3094] text-white font-bold' 
                              : 'text-slate-600 hover:bg-slate-100 font-medium'
                          }`}
                        >
                          <span className="truncate text-left">{cat}</span>
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

              {/* Recipient Accordion */}
              <div className="border-b border-slate-100 pb-5">
                <button
                  onClick={() => setIsRecipientOpen(!isRecipientOpen)}
                  className="w-full flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider mb-3"
                >
                  <span>Recipient</span>
                  {isRecipientOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </button>

                {isRecipientOpen && (
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    {BESTSELLER_RECIPIENTS.map((rec) => (
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
                  className="w-full flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider mb-3"
                >
                  <span>Occasion</span>
                  {isOccasionOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </button>

                {isOccasionOpen && (
                  <div className="space-y-1 pt-1">
                    {BESTSELLER_OCCASIONS.map((occ) => (
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
                  className="w-full flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider mb-3"
                >
                  <span>Discount</span>
                  {isDiscountOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
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

          {/* ================= PRODUCT GRID (RIGHT) ================= */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Active Filters Pill Bar */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-500 mr-1">Active filters:</span>
                
                {selectedCategory !== 'All Gifts' && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-[#2D3094]/10 text-[#2D3094] px-2.5 py-1 rounded-full">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory('All Gifts')} className="hover:text-red-500">
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
                  No matching personalised gifts found
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try adjusting your price range, selecting a different category, or clearing your active filters to view all 281+ gifts.
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 bg-[#2D3094] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-[#242677] transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              /* Product Grid Matching Exact User Prompt & Screenshot */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {paginatedProducts.map((product) => {
                  const isFav = !!wishlist[product.id];
                  const currentImgIdx = activeImageIndex[product.id] || 0;
                  const displayImg = product.gallery && product.gallery[currentImgIdx] ? product.gallery[currentImgIdx] : product.image;

                  return (
                    <div
                      key={product.id}
                      onClick={() => handleOpenCustomizer(product)}
                      className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
                    >
                      {/* Image Frame with Overlay Controls */}
                      <div className="relative w-full pt-[100%] bg-slate-100 overflow-hidden">
                        <img
                          src={displayImg}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />

                        {/* Top Right Wishlist Heart Button */}
                        <button
                          onClick={(e) => toggleWishlist(product.id, e)}
                          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-600 hover:text-red-500 shadow-sm transition-transform active:scale-90"
                          title={isFav ? 'Remove from wishlist' : 'Save to wishlist'}
                        >
                          <Heart 
                            size={16} 
                            className={isFav ? 'fill-red-500 text-red-500' : ''} 
                          />
                        </button>

                        {/* Carousel dots indicator at bottom of image as seen in screenshot */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/20 backdrop-blur-xs px-2.5 py-1 rounded-full">
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

                      {/* Card Body Matching Exact Screenshot Layout */}
                      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-2.5">
                        
                        <div>
                          {/* Product Title (e.g. "Silver Personalised Initial...") */}
                          <h3 
                            className="font-bold text-slate-900 text-sm leading-snug line-clamp-1 group-hover:text-[#2D3094] transition-colors"
                            title={product.name}
                          >
                            {product.name}
                          </h3>

                          {/* PERSONALISE IT! Blue Pill Badge underneath title */}
                          <div className="mt-1.5">
                            <span className="inline-block bg-[#1877F2] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                              {product.badge || 'PERSONALISE IT!'}
                            </span>
                          </div>
                        </div>

                        {/* Pricing Row matching screenshot & UGX currency */}
                        <div className="pt-1">
                          <div className="flex items-baseline flex-wrap gap-2">
                            {/* Current Price */}
                            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                              {formatPrice(product.priceUGX, product.priceUSD)}
                            </span>

                            {/* Original Price Strikethrough */}
                            {product.originalPriceUGX > product.priceUGX && (
                              <span className="text-xs text-slate-400 line-through">
                                {formatPrice(product.originalPriceUGX, product.originalPriceUSD)}
                              </span>
                            )}

                            {/* Discount Percent */}
                            {product.discountPercent && (
                              <span className="text-xs font-bold text-emerald-600">
                                {product.discountPercent}
                              </span>
                            )}
                          </div>

                          {/* Quick Actions Row */}
                          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenCustomizer(product);
                              }}
                              className="flex-1 bg-[#2D3094] hover:bg-[#20236e] text-white text-[11px] font-bold uppercase tracking-wider py-2 px-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1"
                            >
                              <span>Personalise</span>
                            </button>

                            <button
                              onClick={(e) => handleQuickAdd(product, e)}
                              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-[#2D3094] rounded-xl transition-colors shrink-0"
                              title="Quick add to cart"
                            >
                              <ShoppingCart size={15} />
                            </button>

                            <button
                              onClick={(e) => handleWhatsAppOrder(product, e)}
                              className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition-colors shrink-0"
                              title="Order on WhatsApp with photo"
                            >
                              <MessageCircle size={15} />
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
                    Express Kampala Delivery
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Same-day and 24-hour courier dispatch across Kampala, Entebbe, Wakiso, Mukono & upcountry Uganda.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#ED008C]/10 text-[#ED008C] flex items-center justify-center shrink-0">
                  <Gift size={22} />
                </div>
                <div>
                  <h4 className="font-heading font-black text-slate-900 text-sm">
                    Live Photo Mockup Proof
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    We share a digital proof of your customised gift via WhatsApp or email before laser engraving or printing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h4 className="font-heading font-black text-slate-900 text-sm">
                    100% Quality Guaranteed
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Premium food-grade steel, natural bamboo wood, crystal-clear acrylic, and enduring gift packaging.
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
                    Filter Gifts
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
                  className="w-full accent-[#2D3094]"
                />
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>UGX {minPrice.toLocaleString()}</span>
                  <span>UGX {maxPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Mobile Category */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Category
                </span>
                <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto">
                  {BESTSELLER_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs px-2.5 py-2 rounded-xl text-left truncate transition-colors ${
                        selectedCategory === cat 
                          ? 'bg-[#2D3094] text-white font-bold' 
                          : 'bg-slate-50 text-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

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
                    Bestselling Personalised Gifts • Sozy Impressions Kampala
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
                  product: "Silver Personalised Initial Cufflinks",
                  comment: "The engraving on the silver cufflinks was flawless. Dispatched to my office within 3 hours!",
                  rating: "5.0"
                },
                {
                  author: "Brenda Namutebi",
                  location: "Naguru",
                  product: "Dear Dad Polaroid Photo LED Lamp",
                  comment: "My father cried when he opened the glowing photo lamp on his birthday. Best gift ever!",
                  rating: "5.0"
                },
                {
                  author: "Brian & Sarah M.",
                  location: "Entebbe",
                  product: "Personalised Bamboo Wireless Charger Clock",
                  comment: "Super modern, sleek bamboo finish. Works beautifully with my iPhone and looks premium on the desk.",
                  rating: "5.0"
                },
                {
                  author: "Fatuma A.",
                  location: "Muyenga",
                  product: "Personalised Monogram Cork Mug",
                  comment: "The cork base prevents desk scratches and the floral monogram is top quality. Highly recommend!",
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
