import React, { useState, useMemo, useEffect } from 'react';
import { 
  CheckCircle2,
  Sparkles,
  LayoutGrid
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

interface ShopPageProps {
  navigate?: (view: View, param?: string) => void;
  currency: Currency;
  products?: Product[];
  onOpenCustomizer: (product?: Product) => void;
  onAddToCart?: (item: CartItem) => void;
  selectedCategory?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  currency,
  products = PRODUCTS_DATA,
  onOpenCustomizer,
  onAddToCart,
  selectedCategory: initialCategory
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [isProductsModalOpen, setIsProductsModalOpen] = useState<boolean>(false);
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
        return (currency === 'UGX' ? a.priceUGX - b.priceUGX : a.priceUSD - b.priceUSD);
      }
      if (sortBy === 'price-desc') {
        return (currency === 'UGX' ? b.priceUGX - a.priceUGX : b.priceUSD - a.priceUSD);
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

      {/* DEDICATED CATEGORY VIEW (If specific category is selected or showAllCatalog is active) */}
      {(selectedCategory.toLowerCase() !== 'all' || showAllCatalog) ? (
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
          {/* Quick Direct Catalog Switcher Banner */}
          <div className="bg-gradient-to-r from-[#2D3094]/5 via-white to-[#ED008C]/5 border-b border-slate-200/80 py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#2D3094] text-white text-xs font-bold">
                  ★
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-800">
                  Prefer a dedicated grid view? Browse all categories with interactive price & subcategory filters.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedCategory('Best Sellers');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#2D3094] bg-white border border-[#2D3094]/30 hover:bg-[#2D3094] hover:text-white shadow-xs transition-all"
                >
                  <Sparkles size={13} className="text-[#ED008C]" />
                  <span>Bestselling Gifts</span>
                </button>

                <button
                  onClick={() => {
                    setShowAllCatalog(true);
                    setSelectedCategory('All Products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-[#2D3094] hover:bg-[#20236e] shadow-xs transition-all"
                >
                  <LayoutGrid size={13} />
                  <span>View All 280+ Gifts Catalog</span>
                </button>
              </div>
            </div>
          </div>

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

    </div>
  );
};
