import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { 
  MessageSquare, 
  ArrowUp, 
  CheckCircle2,
  Loader2
} from 'lucide-react';

import { 
  View, 
  Currency, 
  CartItem, 
  Product, 
  QuoteRequest, 
  Order, 
  PortfolioProject, 
  BlogPost 
} from './types';

import { 
  PRODUCTS_DATA, 
  COMPANY_INFO 
} from './data/mockData';

// Layout Components (Eagerly loaded for instant top-level layout)
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Multi-Page Views (HomePage eager, secondary pages dynamically lazy-loaded)
import { HomePage } from './pages/HomePage';
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage').then(m => ({ default: m.PortfolioPage })));
const QuotePage = lazy(() => import('./pages/QuotePage').then(m => ({ default: m.QuotePage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const AccountPage = lazy(() => import('./pages/AccountPage').then(m => ({ default: m.AccountPage })));
const ShopPage = lazy(() => import('./pages/ShopPage').then(m => ({ default: m.ShopPage })));
const BestSellersPage = lazy(() => import('./pages/BestSellersPage').then(m => ({ default: m.BestSellersPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then(m => ({ default: m.CheckoutPage })));

// Modals & Shared Views
import { CaseStudyModal } from './components/CaseStudyModal';
import { BlogArticleModal } from './components/BlogArticleModal';

// Modals & Drawers (Dynamically lazy-loaded on demand)
const CartDrawer = lazy(() => import('./components/CartDrawer').then(m => ({ default: m.CartDrawer })));
const ClientPortalModal = lazy(() => import('./components/ClientPortalModal').then(m => ({ default: m.ClientPortalModal })));
const AdminModal = lazy(() => import('./components/AdminModal').then(m => ({ default: m.AdminModal })));
const SearchModal = lazy(() => import('./components/SearchModal').then(m => ({ default: m.SearchModal })));

// Page Loading Spinner Fallback
const PageLoadingFallback = () => (
  <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4 py-20">
    <div className="w-12 h-12 rounded-full border-4 border-[#2D3094]/20 border-t-[#2D3094] animate-spin flex items-center justify-center">
      <Loader2 className="w-5 h-5 text-[#2D3094] animate-pulse" />
    </div>
    <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Loading Experience...</span>
  </div>
);

// Helper to parse hash route
const parseHashRoute = (): { view: View; param?: string } => {
  const hash = window.location.hash.replace(/^#\/?/, '').trim();
  if (!hash) return { view: 'home' };

  const parts = hash.split('/');
  const rawView = parts[0]?.toLowerCase();
  const param = parts.slice(1).join('/') || undefined;

  const validViews: View[] = [
    'home',
    'services',
    'about',
    'portfolio',
    'shop',
    'bestsellers',
    'product',
    'checkout',
    'quote',
    'blog',
    'contact',
    'account',
    'admin'
  ];

  if (validViews.includes(rawView as View)) {
    return { view: rawView as View, param };
  }

  return { view: 'home' };
};

export const App: React.FC = () => {
  // Navigation & Multi-Page Routing State
  const [currentView, setCurrentView] = useState<View>(() => parseHashRoute().view);
  const [routeParam, setRouteParam] = useState<string | undefined>(() => parseHashRoute().param);

  // Global Settings
  const [currency, setCurrency] = useState<Currency>('UGX');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // E-Commerce & Interactive Modals State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sozy_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [products, setProducts] = useState<Product[]>(PRODUCTS_DATA);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Modal Open/Close Controls
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  
  // Active Deep-Dive Items
  const [activeCaseStudy, setActiveCaseStudy] = useState<PortfolioProject | null>(null);
  const [activeBlogArticle, setActiveBlogArticle] = useState<BlogPost | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize router on URL hash change (back/forward history & direct links)
  const handleHashChange = useCallback(() => {
    const { view, param } = parseHashRoute();
    setCurrentView(view);
    setRouteParam(param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [handleHashChange]);

  // Update document title dynamically based on page
  useEffect(() => {
    const titles: Record<View, string> = {
      home: 'Sozy Impressions Ltd | Premier Commercial Printing & Branding in Uganda',
      services: '7 Core Services & Capabilities | Sozy Impressions Ltd',
      about: 'About Our Company & Heritage | Sozy Impressions Ltd',
      portfolio: 'Portfolio & Client Case Studies | Sozy Impressions Ltd',
      shop: 'Corporate Product Store & Custom Gifts | Sozy Impressions Ltd',
      bestsellers: 'Top Best Sellers & Popular Keepsakes | Sozy Impressions Ltd',
      product: 'Personalised Product Details & Live Customiser | Sozy Impressions Ltd',
      checkout: 'Secure Checkout & Delivery | Sozy Impressions Ltd',
      quote: 'Smart Quote Calculator & RFQ | Sozy Impressions Ltd',
      blog: 'Printing & Brand Insights Blog | Sozy Impressions Ltd',
      contact: 'Contact & Kampala Studio | Sozy Impressions Ltd',
      account: 'Client Order Tracking & Quotes | Sozy Impressions Ltd',
      admin: 'Admin Management | Sozy Impressions Ltd'
    };
    document.title = titles[currentView] || 'Sozy Impressions Ltd';
  }, [currentView]);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sozy_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Scroll listener for Back-to-Top
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Multi-page Router navigation helper
  const navigate = (view: View, param?: string) => {
    setCurrentView(view);
    setRouteParam(param);
    const newHash = param ? `#/${view}/${param}` : view === 'home' ? '#/' : `#/${view}`;
    if (window.location.hash !== newHash) {
      window.history.pushState(null, '', newHash);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (item: CartItem) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(i => 
        i.product.id === item.product.id && 
        i.customization?.color === item.customization?.color &&
        i.customization?.text === item.customization?.text
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        const newQty = updated[existingIdx].quantity + item.quantity;
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: newQty,
          subtotalUGX: (updated[existingIdx].product.priceUGX * newQty),
          subtotalUSD: Number(((updated[existingIdx].product.priceUGX * newQty) / 3800).toFixed(2))
        };
        return updated;
      }
      return [...prev, item];
    });

    setCustomizingProduct(null);
    setIsCartOpen(true);
    showToast(`Added ${item.product.name} to cart`);
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCart(prev => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = {
          ...updated[index],
          quantity: newQty,
          subtotalUGX: (updated[index].product.priceUGX * newQty),
          subtotalUSD: Number(((updated[index].product.priceUGX * newQty) / 3800).toFixed(2))
        };
      }
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    showToast('Item removed from cart');
  };

  const handleOrderCompleted = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    setCart([]);
    showToast(`Order ${order.id} placed successfully!`);
    navigate('account');
  };

  // Dedicated View / Multi-Page Renderer
  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage navigate={navigate} />;

      case 'services':
        return (
          <ServicesPage
            navigate={navigate}
            currency={currency}
            selectedServiceId={routeParam}
          />
        );

      case 'about':
        return <AboutPage navigate={navigate} />;

      case 'portfolio':
        return (
          <PortfolioPage
            navigate={navigate}
            onOpenCaseStudy={(project) => setActiveCaseStudy(project)}
          />
        );

      case 'shop':
        return (
          <ShopPage
            navigate={navigate}
            currency={currency}
            products={products}
            onOpenCustomizer={(product) => navigate('product', product?.id || products[0].id)}
            onAddToCart={handleAddToCart}
            selectedCategory={routeParam}
          />
        );

      case 'bestsellers':
        return (
          <BestSellersPage
            navigate={navigate}
            currency={currency}
            onOpenCustomizer={(product) => navigate('product', product.id)}
            onAddToCart={handleAddToCart}
          />
        );

      case 'product':
        return (
          <ProductDetailPage
            productId={routeParam}
            navigate={navigate}
            currency={currency}
            onAddToCart={handleAddToCart}
            showToast={showToast}
          />
        );

      case 'checkout':
        return (
          <CheckoutPage
            cart={cart}
            currency={currency}
            navigate={navigate}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onRemoveCartItem={handleRemoveCartItem}
            onClearCart={() => setCart([])}
            onOrderCompleted={handleOrderCompleted}
            showToast={showToast}
          />
        );

      case 'quote':
        return <QuotePage navigate={navigate} currency={currency} />;

      case 'blog':
        return <BlogPage navigate={navigate} />;

      case 'contact':
        return <ContactPage navigate={navigate} />;

      case 'account':
        return <AccountPage navigate={navigate} currency={currency} />;

      case 'admin':
        return <HomePage navigate={navigate} />;

      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA] text-[#121212] font-sans antialiased selection:bg-[#ED008C] selection:text-white">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#181B34] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navigation (No WhatsApp, No Login, No Search, Mega Horizontal Menu) */}
      <Navbar
        currentView={currentView}
        navigate={navigate}
        currency={currency}
        setCurrency={setCurrency}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        setIsSearchOpen={setIsSearchOpen}
        openAdminModal={() => setIsAdminModalOpen(true)}
        openClientPortal={() => setIsClientPortalOpen(true)}
      />

      {/* Page Content Viewport */}
      <main className="flex-1 w-full pt-[72px] sm:pt-[96px]">
        <Suspense fallback={<PageLoadingFallback />}>
          {renderCurrentView()}
        </Suspense>
      </main>

      {/* Main Footer */}
      <Footer
        navigate={navigate}
        openAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Persistent Floating Quick WhatsApp Button */}
      <a
        href={COMPANY_INFO.whatsappDirectUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Production Desk"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20b858] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
      >
        <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold px-0 group-hover:px-2">
          Chat With Production Team
        </span>
      </a>

      {/* Back to Top Floating Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll back to top"
          className="fixed bottom-24 right-6 z-30 bg-white/90 hover:bg-white text-slate-700 hover:text-[#2D3094] p-3 rounded-full shadow-lg border border-slate-200 backdrop-blur-md transition-all hover:-translate-y-1"
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* --- Global Modals & Drawers with lazy Suspense --- */}
      <Suspense fallback={null}>
        {/* Cart Drawer */}
        {isCartOpen && (
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            currency={currency}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onOpenCheckout={() => {
              setIsCartOpen(false);
              navigate('checkout');
            }}
          />
        )}

        {/* Client Portal Modal */}
        {isClientPortalOpen && (
          <ClientPortalModal
            isOpen={isClientPortalOpen}
            onClose={() => setIsClientPortalOpen(false)}
            navigate={navigate}
            currency={currency}
            orders={orders}
            quotes={quotes}
          />
        )}

        {/* Admin Operations Modal */}
        {isAdminModalOpen && (
          <AdminModal
            isOpen={isAdminModalOpen}
            onClose={() => setIsAdminModalOpen(false)}
            products={products}
            quotes={quotes}
            orders={orders}
            onUpdateProducts={(prods) => setProducts(prods)}
            onUpdateQuotes={(qts) => setQuotes(qts)}
            onUpdateOrders={(ords) => setOrders(ords)}
            currency={currency}
          />
        )}

        {/* Global Search Modal */}
        {isSearchOpen && (
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            navigate={navigate}
            onOpenCustomizer={(prod) => {
              setIsSearchOpen(false);
              navigate('product', prod.id);
            }}
          />
        )}

        {/* Case Study Modal */}
        {activeCaseStudy && (
          <CaseStudyModal
            project={activeCaseStudy}
            onClose={() => setActiveCaseStudy(null)}
            navigate={navigate}
          />
        )}

        {/* Blog Article Modal */}
        {activeBlogArticle && (
          <BlogArticleModal
            article={activeBlogArticle}
            onClose={() => setActiveBlogArticle(null)}
            navigate={navigate}
          />
        )}
      </Suspense>

    </div>
  );
};
