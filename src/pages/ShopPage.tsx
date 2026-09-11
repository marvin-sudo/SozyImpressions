import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  CheckCircle2,
  Search,
  X,
  Gift,
  Sparkles
} from 'lucide-react';
import { View, Currency, Product, CartItem } from '../types';
import { PRODUCTS_DATA } from '../data/mockData';
import { ShopCategoryNav } from '../components/ShopCategoryNav';
import { ShopHeroSection } from '../components/ShopHeroSection';
import { PersonalisedGiftsCategoryShowcase } from '../components/PersonalisedGiftsCategoryShowcase';
import { ShopOccasionsSection } from '../components/ShopOccasionsSection';
import { TailorMadeTreasuresSection } from '../components/TailorMadeTreasuresSection';
import { MakeCelebrationsSpecialSection } from '../components/MakeCelebrationsSpecialSection';
import { GiftsByRecipientSection } from '../components/GiftsByRecipientSection';
import { CustomerReviewsSection } from '../components/CustomerReviewsSection';
import { CategoryProductsModal } from '../components/CategoryProductsModal';
import { DedicatedCategoryView } from '../components/DedicatedCategoryView';
import { GiftFinderModal } from '../components/GiftFinderModal';
import { useShopStore } from '../context/ShopStoreContext';

interface ShopPageProps {
  navigate?: (view: View, param?: string) => void;
  currency: Currency;
  products?: Product[];
  onOpenCustomizer: (product?: Product) => void;
  onAddToCart?: (item: CartItem) => void;
  selectedCategory?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  navigate,
  currency,
  products: initialProducts = PRODUCTS_DATA,
  onOpenCustomizer,
  onAddToCart,
  selectedCategory: initialCategory
}) => {
  const { shopProducts } = useShopStore();
  const products = useMemo(() => {
    if (shopProducts && shopProducts.length > 0) return shopProducts;
    if (initialProducts && initialProducts.length > 0) return initialProducts;
    return PRODUCTS_DATA;
  }, [shopProducts, initialProducts]);

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus and activate search field
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [isProductsModalOpen, setIsProductsModalOpen] = useState<boolean>(false);
  const [isGiftFinderOpen, setIsGiftFinderOpen] = useState<boolean>(false);
  const [showAllCatalog, setShowAllCatalog] = useState<boolean>(false);
  
  // Wishlist persisted in localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sozy_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toastNotification, setToastNotification] = useState<string | null>(null);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sozy_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const toggleWishlist = (productId: string, productName: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter(id => id !== productId) : [...prev, productId];
      showToast(exists ? `Removed "${productName}" from Wishlist` : `Saved "${productName}" to Wishlist! ❤️`);
      return next;
    });
  };

  const showToast = (msg: string) => {
    setToastNotification(msg);
    setTimeout(() => {
      setToastNotification(null);
    }, 3000);
  };

  // Handler for category navigation selection
  const handleCategorySelect = (categoryName: string, subcatName?: string) => {
    if (categoryName.toLowerCase() === 'all') {
      setSelectedCategory('All');
      setShowAllCatalog(false);
      setSelectedSubcategory(null);
    } else if (categoryName.toLowerCase() === 'all products') {
      setSelectedCategory('All Products');
      setShowAllCatalog(true);
      setSelectedSubcategory(null);
    } else {
      setSelectedCategory(categoryName);
      setSelectedSubcategory(subcatName || null);
      setShowAllCatalog(false);
    }
    setSelectedOccasion(null);
    setSelectedRecipient(null);
    setIsProductsModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler for Occasion Card Selection (Anniversary, Birthday, Wedding, Love & Romance)
  const handleOccasionSelect = (occasionKey: string, occasionTitle: string) => {
    setSelectedCategory('Best Sellers');
    setSelectedOccasion(occasionTitle);
    setSelectedSubcategory(null);
    setSelectedRecipient(null);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler for Recipient Selection (Him, Her, Kids)
  const handleRecipientSelect = (recipientKey: string) => {
    setSelectedCategory('Best Sellers');
    setSelectedRecipient(recipientKey);
    setSelectedOccasion(null);
    setSelectedSubcategory(null);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler for 2x2 Hero Collections
  const handleCollectionSelect = (collectionKey: string) => {
    setSelectedOccasion(null);
    setSelectedRecipient(null);
    switch (collectionKey) {
      case 'bestsellers':
        setSelectedCategory('Best Sellers');
        break;
      case 'new-arrivals':
        setSelectedCategory('Bamboo Gifts');
        setSortBy('featured');
        break;
      case 'corporate-gifts':
        setSelectedCategory('Corporate Gifts');
        setSortBy('featured');
        break;
      case 'all-gifts':
      default:
        setSelectedCategory('All Products');
        setShowAllCatalog(true);
        break;
    }
    setIsProductsModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShopNowScroll = () => {
    setSelectedCategory('Best Sellers');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Titles for Curated Selection Modal
  const modalTitle = useMemo(() => {
    if (selectedRecipient) return `Personalised Gifts for ${selectedRecipient}`;
    if (selectedOccasion) return `${selectedOccasion} Gifts & Keepsakes`;
    if (selectedCategory !== 'All' && selectedCategory !== 'All Products') return `${selectedCategory} Collection`;
    return 'All Personalised Products';
  }, [selectedRecipient, selectedOccasion, selectedCategory]);

  const modalSubtitle = useMemo(() => {
    if (selectedRecipient) return `Handcrafted gifts and surprises specially selected for ${selectedRecipient.toLowerCase()}.`;
    if (selectedOccasion) return `Memorable personalized gifts curated for ${selectedOccasion.toLowerCase()}.`;
    if (selectedCategory !== 'All' && selectedCategory !== 'All Products') return `High-definition custom ${selectedCategory.toLowerCase()} with precision laser engraving & UV printing.`;
    return 'Browse our catalog of custom printable gifts, apparel, and awards in Uganda.';
  }, [selectedRecipient, selectedOccasion, selectedCategory]);

  // Shop-wide search results across the entire catalog
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q))) ||
        (p.badge && p.badge.toLowerCase().includes(q))
      );
    });
  }, [products, searchQuery]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category matching
      let matchesCat = true;
      if (selectedCategory && selectedCategory !== 'All' && selectedCategory !== 'All Products') {
        const catClean = selectedCategory.toLowerCase().trim();
        const pCatClean = p.category.toLowerCase().trim();
        
        if (catClean === 'bottles & flasks' || catClean === 'flasks' || catClean === 'sippers') {
          matchesCat = pCatClean.includes('flask') || pCatClean.includes('bottle') || pCatClean.includes('drinkware') || pCatClean.includes('sipper') || p.name.toLowerCase().includes('sipper') || p.name.toLowerCase().includes('flask');
        } else if (catClean === 'gift sets' || catClean === 'combos') {
          matchesCat = pCatClean.includes('set') || pCatClean.includes('gift') || pCatClean.includes('combo') || p.name.toLowerCase().includes('combo') || p.name.toLowerCase().includes('set');
        } else if (catClean === 'corporate gifts') {
          matchesCat = pCatClean.includes('corporate') || pCatClean.includes('gift') || pCatClean.includes('vip');
        } else if (catClean === 'trophies & medals') {
          matchesCat = pCatClean.includes('troph') || pCatClean.includes('medal') || pCatClean.includes('award') || pCatClean.includes('plaque');
        } else if (catClean === 'bamboo gifts') {
          matchesCat = pCatClean.includes('bamboo') || p.name.toLowerCase().includes('bamboo');
        } else if (catClean === 'wall clocks') {
          matchesCat = pCatClean.includes('clock') || p.name.toLowerCase().includes('clock');
        } else if (catClean === 'mugs') {
          matchesCat = pCatClean.includes('mug') || p.name.toLowerCase().includes('mug') || p.name.toLowerCase().includes('tumbler');
        } else if (catClean === 'cushions') {
          matchesCat = pCatClean.includes('cushion') || p.name.toLowerCase().includes('cushion') || p.name.toLowerCase().includes('pillow');
        } else if (catClean === 'photo frames') {
          matchesCat = pCatClean.includes('frame') || p.name.toLowerCase().includes('frame') || p.name.toLowerCase().includes('standee') || p.name.toLowerCase().includes('photo');
        } else if (catClean === 'neon lights') {
          matchesCat = pCatClean.includes('neon') || p.name.toLowerCase().includes('neon') || p.name.toLowerCase().includes('light');
        } else if (catClean === 'flowers') {
          matchesCat = pCatClean.includes('flower') || p.name.toLowerCase().includes('flower') || p.name.toLowerCase().includes('rose') || p.name.toLowerCase().includes('bouquet');
        } else if (catClean === 'hampers') {
          matchesCat = pCatClean.includes('hamper') || pCatClean.includes('holiday') || p.name.toLowerCase().includes('hamper') || p.name.toLowerCase().includes('crate');
        } else if (catClean === 'stationery') {
          matchesCat = pCatClean.includes('stationery') || pCatClean.includes('notebook') || p.name.toLowerCase().includes('caddy') || p.name.toLowerCase().includes('organizer') || p.name.toLowerCase().includes('journal') || p.name.toLowerCase().includes('pen');
        } else if (catClean === 'fridge magnets') {
          matchesCat = pCatClean.includes('magnet') || p.name.toLowerCase().includes('magnet');
        } else if (catClean === 'accessories') {
          matchesCat = pCatClean.includes('accessori') || pCatClean.includes('technology') || pCatClean.includes('keyholder') || p.name.toLowerCase().includes('lamp') || p.name.toLowerCase().includes('wireless') || p.name.toLowerCase().includes('speaker');
        } else if (catClean === 'caricatures') {
          matchesCat = pCatClean.includes('caricature') || p.name.toLowerCase().includes('caricature') || p.name.toLowerCase().includes('standee');
        } else if (catClean === 'table tops') {
          matchesCat = pCatClean.includes('table') || pCatClean.includes('frame') || p.name.toLowerCase().includes('table') || p.name.toLowerCase().includes('frame') || p.name.toLowerCase().includes('plaque') || p.name.toLowerCase().includes('standee');
        } else if (catClean === 'speakers') {
          matchesCat = pCatClean.includes('speaker') || pCatClean.includes('technology') || p.name.toLowerCase().includes('speaker') || p.name.toLowerCase().includes('sound');
        } else if (catClean === 'lamps') {
          matchesCat = pCatClean.includes('lamp') || pCatClean.includes('neon') || p.name.toLowerCase().includes('lamp') || p.name.toLowerCase().includes('light');
        } else if (catClean === 'clocks') {
          matchesCat = pCatClean.includes('clock') || p.name.toLowerCase().includes('clock');
        } else if (catClean === 'key chains' || catClean === 'keychains') {
          matchesCat = pCatClean.includes('key') || p.name.toLowerCase().includes('keyring') || p.name.toLowerCase().includes('keyholder') || p.name.toLowerCase().includes('keychain');
        } else if (catClean === 'bar accessories') {
          matchesCat = pCatClean.includes('bar') || pCatClean.includes('flask') || pCatClean.includes('glass') || p.name.toLowerCase().includes('flask') || p.name.toLowerCase().includes('whiskey') || p.name.toLowerCase().includes('wine');
        } else if (catClean === 'personalised electronics') {
          matchesCat = pCatClean.includes('electronic') || pCatClean.includes('technology') || p.name.toLowerCase().includes('earbud') || p.name.toLowerCase().includes('speaker') || p.name.toLowerCase().includes('power') || p.name.toLowerCase().includes('usb');
        } else if (catClean === 'personalised flowers' || catClean === 'flowers') {
          matchesCat = pCatClean.includes('flower') || pCatClean.includes('rose') || p.name.toLowerCase().includes('flower') || p.name.toLowerCase().includes('rose') || p.name.toLowerCase().includes('bouquet');
        } else if (catClean === 'photo cakes' || catClean === 'cakes') {
          matchesCat = pCatClean.includes('cake') || p.name.toLowerCase().includes('cake');
        } else if (catClean === 'explosion box') {
          matchesCat = pCatClean.includes('explosion') || p.name.toLowerCase().includes('explosion') || p.name.toLowerCase().includes('surprise box');
        } else if (catClean === 'chocolates') {
          matchesCat = pCatClean.includes('chocolate') || p.name.toLowerCase().includes('chocolate') || p.name.toLowerCase().includes('hamper');
        } else if (catClean === 'greeting cards' || catClean === 'cards') {
          matchesCat = pCatClean.includes('card') || p.name.toLowerCase().includes('card');
        } else if (catClean === 'jewellery' || catClean === 'jewelry') {
          matchesCat = pCatClean.includes('jewel') || pCatClean.includes('bangle') || p.name.toLowerCase().includes('bangle') || p.name.toLowerCase().includes('bracelet') || p.name.toLowerCase().includes('pendant');
        } else {
          matchesCat = pCatClean.includes(catClean) || catClean.includes(pCatClean);
        }
      }

      // Subcategory matching if selected
      let matchesSubcat = true;
      if (selectedSubcategory) {
        const subClean = selectedSubcategory.toLowerCase();
        matchesSubcat = 
          p.name.toLowerCase().includes(subClean) || 
          p.description.toLowerCase().includes(subClean) ||
          (p.specifications && Object.values(p.specifications).some(val => val.toLowerCase().includes(subClean)));
      }

      // Search query matching
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        matchesSearch = 
          p.name.toLowerCase().includes(q) || 
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q);
      }

      // Occasion matching
      let matchesOccasion = true;
      if (selectedOccasion) {
        const occ = selectedOccasion.toLowerCase();
        const pName = p.name.toLowerCase();
        const pDesc = p.description.toLowerCase();
        const pCat = p.category.toLowerCase();

        if (occ.includes('anniversary')) {
          matchesOccasion = 
            pCat.includes('cushion') ||
            pCat.includes('frame') ||
            pCat.includes('glass') ||
            pName.includes('cushion') ||
            pName.includes('wine') ||
            pName.includes('glass') ||
            pName.includes('frame') ||
            pName.includes('calendar') ||
            pName.includes('caricature') ||
            pName.includes('roses') ||
            pName.includes('bouquet') ||
            pName.includes('plaque') ||
            pName.includes('mug') ||
            pDesc.includes('anniversary') ||
            pDesc.includes('couple') ||
            pDesc.includes('keepsake');
        } else if (occ.includes('birthday')) {
          matchesOccasion = 
            pCat.includes('mug') ||
            pCat.includes('hamper') ||
            pCat.includes('neon') ||
            pCat.includes('stationery') ||
            pName.includes('mug') ||
            pName.includes('tumbler') ||
            pName.includes('hamper') ||
            pName.includes('neon') ||
            pName.includes('lamp') ||
            pName.includes('accessories') ||
            pName.includes('set') ||
            pName.includes('caddy') ||
            pName.includes('flask') ||
            pDesc.includes('birthday') ||
            pDesc.includes('celebration') ||
            pDesc.includes('party');
        } else if (occ.includes('wedding')) {
          matchesOccasion = 
            pCat.includes('glass') ||
            pCat.includes('frame') ||
            pCat.includes('caricature') ||
            pName.includes('wine') ||
            pName.includes('glass') ||
            pName.includes('caricature') ||
            pName.includes('frame') ||
            pName.includes('calendar') ||
            pName.includes('hamper') ||
            pName.includes('plaque') ||
            pName.includes('neon') ||
            pName.includes('cushion') ||
            pDesc.includes('wedding') ||
            pDesc.includes('monogram') ||
            pDesc.includes('newlywed') ||
            pDesc.includes('couple');
        } else if (occ.includes('romance') || occ.includes('love')) {
          matchesOccasion = 
            pCat.includes('cushion') ||
            pCat.includes('flower') ||
            pCat.includes('neon') ||
            pName.includes('cushion') ||
            pName.includes('neon') ||
            pName.includes('rose') ||
            pName.includes('bouquet') ||
            pName.includes('magnet') ||
            pName.includes('wine') ||
            pName.includes('glass') ||
            pName.includes('caricature') ||
            pName.includes('mug') ||
            pDesc.includes('romantic') ||
            pDesc.includes('love') ||
            pDesc.includes('couple');
        }
      }

      // Recipient matching (Him, Her, Kids)
      let matchesRecipient = true;
      if (selectedRecipient) {
        const recip = selectedRecipient.toLowerCase();
        const pCat = p.category.toLowerCase();
        const pName = p.name.toLowerCase();
        const pDesc = p.description.toLowerCase();

        if (recip === 'him') {
          matchesRecipient = 
            pCat.includes('bar') ||
            pCat.includes('electronic') ||
            pCat.includes('speaker') ||
            pCat.includes('key') ||
            pCat.includes('clock') ||
            pCat.includes('corporate') ||
            pName.includes('flask') ||
            pName.includes('earbud') ||
            pName.includes('speaker') ||
            pName.includes('keychain') ||
            pName.includes('tumbler') ||
            pName.includes('caddy') ||
            pName.includes('pen') ||
            pName.includes('clock') ||
            pDesc.includes('men') ||
            pDesc.includes('gentleman') ||
            pDesc.includes('him') ||
            pDesc.includes('groom') ||
            pDesc.includes('husband') ||
            pDesc.includes('executive');
        } else if (recip === 'her') {
          matchesRecipient = 
            pCat.includes('jewel') ||
            pCat.includes('flower') ||
            pCat.includes('cake') ||
            pCat.includes('lamp') ||
            pCat.includes('explosion') ||
            pCat.includes('chocolate') ||
            pCat.includes('card') ||
            pName.includes('bangle') ||
            pName.includes('bracelet') ||
            pName.includes('rose') ||
            pName.includes('flower') ||
            pName.includes('cake') ||
            pName.includes('moon') ||
            pName.includes('lamp') ||
            pName.includes('cushion') ||
            pName.includes('chocolate') ||
            pName.includes('greeting') ||
            pDesc.includes('her') ||
            pDesc.includes('lady') ||
            pDesc.includes('bride') ||
            pDesc.includes('wife') ||
            pDesc.includes('girlfriend') ||
            pDesc.includes('love');
        } else if (recip === 'kids') {
          matchesRecipient = 
            pCat.includes('caricature') ||
            pCat.includes('lamp') ||
            pCat.includes('cake') ||
            pCat.includes('explosion') ||
            pCat.includes('magnet') ||
            pName.includes('caricature') ||
            pName.includes('lamp') ||
            pName.includes('night') ||
            pName.includes('cake') ||
            pName.includes('explosion') ||
            pName.includes('mug') ||
            pName.includes('magnet') ||
            pDesc.includes('kid') ||
            pDesc.includes('child') ||
            pDesc.includes('children') ||
            pDesc.includes('fun') ||
            pDesc.includes('playful') ||
            pDesc.includes('birthday');
        }
      }

      return matchesCat && matchesSubcat && matchesSearch && matchesOccasion && matchesRecipient;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        const pA = currency === 'UGX' ? (a.priceUGX || (a as any).price || 0) : (a.priceUSD || ((a.priceUGX || (a as any).price || 0) / 3800));
        const pB = currency === 'UGX' ? (b.priceUGX || (b as any).price || 0) : (b.priceUSD || ((b.priceUGX || (b as any).price || 0) / 3800));
        return pA - pB;
      }
      if (sortBy === 'price-desc') {
        const pA = currency === 'UGX' ? (a.priceUGX || (a as any).price || 0) : (a.priceUSD || ((a.priceUGX || (a as any).price || 0) / 3800));
        const pB = currency === 'UGX' ? (b.priceUGX || (b as any).price || 0) : (b.priceUSD || ((b.priceUGX || (b as any).price || 0) / 3800));
        return pB - pA;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, selectedSubcategory, selectedOccasion, selectedRecipient, searchQuery, sortBy, currency]);

  // Quick Add handler
  const handleQuickAdd = (product: Product) => {
    const qty = product.minOrderQty || 1;
    const item: CartItem = {
      product,
      quantity: qty,
      selectedColor: product.colors?.[0] || 'Standard',
      selectedSize: product.sizes?.[0] || undefined,
      customization: {
        color: product.colors?.[0] || 'Standard'
      },
      unitPriceUGX: product.priceUGX,
      unitPriceUSD: product.priceUSD,
      subtotalUGX: product.priceUGX * qty,
      subtotalUSD: product.priceUSD * qty,
      itemTotalPriceUGX: product.priceUGX * qty,
      itemTotalPriceUSD: product.priceUSD * qty
    };

    if (onAddToCart) {
      onAddToCart(item);
      showToast(`Added ${qty}x "${product.name}" to cart!`);
    } else {
      onOpenCustomizer(product);
    }
  };

  return (
    <div className="w-full bg-[#FCFDFE] min-h-screen text-slate-900 font-sans">
      
      {/* Toast Notification */}
      {toastNotification && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#181B34] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 animate-in slide-in-from-bottom-3 duration-300">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastNotification}</span>
        </div>
      )}

      {/* 1. SHOP PAGE HEADER / HORIZONTAL CATEGORY NAVIGATION DIRECTLY BELOW WEBSITE HEADER */}
      <ShopCategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      {/* Active Global Shop Product Search Bar - Always active & visible across entire shop */}
      <div className="bg-gradient-to-r from-[#2D3094]/10 via-white to-[#ED008C]/10 border-b border-slate-200 py-3 sm:py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchInputRef.current) {
                searchInputRef.current.focus();
              }
            }}
            className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3"
          >
            {/* Search Input Box with Active Styling & Button */}
            <div className="relative flex-1 max-w-3xl flex items-center gap-2">
              <div className="relative flex-1 flex items-center">
                <Search className="absolute left-3.5 text-[#2D3094] pointer-events-none" size={18} />
                <input
                  ref={searchInputRef}
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search any product across the shop (e.g. mugs, photo frames, corporate gifts, bottles, hoodies)..."
                  className="w-full pl-10 pr-10 py-2.5 bg-white rounded-xl border-2 border-[#2D3094] ring-2 ring-[#2D3094]/20 focus:ring-4 focus:ring-[#2D3094]/30 outline-none text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 transition-all shadow-xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      searchInputRef.current?.focus();
                    }}
                    className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Clear search"
                    aria-label="Clear search query"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Active Search Button */}
              <button
                type="submit"
                onClick={() => searchInputRef.current?.focus()}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#2D3094] hover:bg-[#20236e] active:scale-95 shadow-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Search size={14} />
                <span className="hidden sm:inline">Search</span>
              </button>

              {/* ✨ Finder Button in the same field */}
              <button
                type="button"
                onClick={() => setIsGiftFinderOpen(true)}
                className="group relative p-[1.5px] rounded-2xl bg-gradient-to-r from-[#ED008C] via-pink-400 to-[#2D3094] hover:shadow-md hover:shadow-[#ED008C]/20 active:scale-95 transition-all shrink-0 cursor-pointer"
                title="Open Joy Gift Finder"
                id="shop-gift-finder-btn"
              >
                <div className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 bg-white rounded-[14px] transition-colors group-hover:bg-pink-50/50">
                  <div className="relative flex items-center">
                    <Gift size={16} className="text-[#ED008C]" />
                    <Sparkles size={10} className="text-[#ED008C] fill-[#ED008C] absolute -bottom-1 -right-1" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#ED008C] transition-colors">Finder</span>
                </div>
              </button>
            </div>

            {/* Popular Search Quick Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scrollbar-none text-xs">
              <span className="text-[11px] font-semibold text-slate-600 shrink-0 hidden lg:inline">Popular:</span>
              {['Mugs', 'LED Lamps', 'Water Bottles', 'Executive Sets', 'Hoodies', 'Trophies'].map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    searchInputRef.current?.focus();
                  }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border cursor-pointer ${
                    searchQuery.toLowerCase() === tag.toLowerCase()
                      ? 'bg-[#2D3094] text-white border-[#2D3094] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-[#2D3094] hover:text-[#2D3094]'
                  }`}
                >
                  {tag}
                </button>
              ))}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    searchInputRef.current?.focus();
                  }}
                  className="px-2 py-1 rounded-lg text-xs text-rose-600 hover:bg-rose-50 border border-rose-200 whitespace-nowrap font-medium transition-colors cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Conditional Display: Search Results View OR Dedicated Category View OR Default Shop Sections */}
      {searchQuery.trim() ? (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-heading font-black text-[#2D3094]">
                Search Results for "{searchQuery}"
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Found {searchResults.length} product{searchResults.length === 1 ? '' : 's'} across the shop
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                searchInputRef.current?.focus();
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X size={14} />
              <span>Clear Search</span>
            </button>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    if (navigate) {
                      navigate('product', product.id);
                    } else {
                      onOpenCustomizer(product);
                    }
                  }}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-[#2D3094]/30 transition-all duration-300 flex flex-col cursor-pointer"
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {product.badge && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ED008C] text-white shadow-xs">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#2D3094] tracking-wider">
                        {product.category}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#2D3094] transition-colors line-clamp-2 mt-0.5">
                        {product.name}
                      </h3>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-extrabold text-[#2D3094]">
                        {(() => {
                          const pUGX = product.priceUGX || (product as any).price || 0;
                          const pUSD = product.priceUSD || (pUGX ? pUGX / 3800 : 0);
                          return currency === 'USD' ? `$${pUSD.toFixed(2)}` : `UGX ${pUGX.toLocaleString()}`;
                        })()}
                      </span>
                      <span className="text-[11px] font-bold text-[#ED008C] group-hover:underline">
                        View & Buy →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <Search size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                No products found matching "{searchQuery}"
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
                Try searching for different keywords like "mug", "lamp", "bottle", "hoodie", or "gift set".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  searchInputRef.current?.focus();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#2D3094] hover:bg-[#20236e] transition-all cursor-pointer"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      ) : (selectedCategory.toLowerCase() !== 'all' || showAllCatalog) ? (
        <DedicatedCategoryView
          categoryName={showAllCatalog ? 'All Products' : selectedCategory}
          subcategoryName={selectedSubcategory}
          currency={currency}
          onOpenCustomizer={(p) => onOpenCustomizer(p || products[0])}
          onAddToCart={onAddToCart}
          onBackToOverview={() => {
            setSelectedCategory('All');
            setShowAllCatalog(false);
            setSelectedSubcategory(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectCategory={handleCategorySelect}
        />
      ) : (
        <>
          {/* 2. & 3. HERO SECTION — FOLLOW THE REFERENCE STRUCTURE (LEFT 2x2 COLLECTIONS + RIGHT PROMO BANNER) */}
          <ShopHeroSection
            onSelectCollection={handleCollectionSelect}
            onShopNow={handleShopNowScroll}
            onOpenCustomizer={(p) => onOpenCustomizer(p || products[0])}
            currency={currency}
          />

          {/* DEDICATED "PERSONALISED GIFTS" CATEGORY SHOWCASE SECTION DIRECTLY BELOW HERO (REFERENCE: i5j.png) */}
          <PersonalisedGiftsCategoryShowcase
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />

          {/* "FOR EVERY OCCASION" SECTION IMMEDIATELY AFTER PERSONALISED GIFTS CATEGORY SECTION */}
          <ShopOccasionsSection
            onSelectOccasion={handleOccasionSelect}
            selectedOccasion={selectedOccasion}
          />

          {/* "TAILOR-MADE TREASURES" SECTION IMMEDIATELY AFTER FOR EVERY OCCASION SECTION */}
          <TailorMadeTreasuresSection
            onSelectItem={handleCategorySelect}
            selectedCategory={selectedCategory}
          />

          {/* "MAKE CELEBRATIONS SPECIAL WITH" SECTION IMMEDIATELY AFTER TAILOR-MADE TREASURES */}
          <MakeCelebrationsSpecialSection
            onSelectCelebration={handleCategorySelect}
            selectedCategory={selectedCategory}
          />

          {/* "GIFTS BY RECIPIENT (HIM, HER, KIDS)" SECTION IMMEDIATELY AFTER MAKE CELEBRATIONS SPECIAL WITH */}
          <GiftsByRecipientSection
            onSelectRecipient={handleRecipientSelect}
            selectedRecipient={selectedRecipient}
          />

          {/* CUSTOMER REVIEWS SECTION - REPLACED EXPLORE PERSONALISED PRODUCTS */}
          <CustomerReviewsSection />
        </>
      )}

      {/* CURATED PRODUCTS MODAL */}
      <CategoryProductsModal
        isOpen={isProductsModalOpen}
        onClose={() => setIsProductsModalOpen(false)}
        title={modalTitle}
        subtitle={modalSubtitle}
        products={filteredProducts}
        currency={currency}
        onOpenCustomizer={onOpenCustomizer}
        onAddToCart={handleQuickAdd}
        wishlist={wishlist}
        onToggleWishlist={(productId) => {
          const prod = products.find(p => p.id === productId);
          toggleWishlist(productId, prod?.name || "Product");
        }}
      />

      {/* JOY GIFT FINDER MODAL */}
      <GiftFinderModal
        isOpen={isGiftFinderOpen}
        onClose={() => setIsGiftFinderOpen(false)}
        products={products}
        currency={currency}
        onOpenCustomizer={onOpenCustomizer}
        onAddToCart={handleQuickAdd}
        navigate={navigate}
        onApplyToShop={(cat, query) => {
          if (cat) setSelectedCategory(cat);
          if (query) setSearchQuery(query);
          window.scrollTo({ top: 380, behavior: 'smooth' });
        }}
      />

    </div>
  );
};
