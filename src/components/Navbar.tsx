import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ShoppingCart, 
  Phone, 
  Mail, 
  ChevronDown, 
  Sparkles, 
  Printer, 
  Layers, 
  Gift, 
  Flag, 
  ArrowRight 
} from 'lucide-react';
import { View, Currency, CartItem } from '../types';
import { COMPANY_INFO } from '../data/mockData';

interface NavbarProps {
  currentView: View;
  navigate: (view: View, param?: string) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  setIsSearchOpen?: (open: boolean) => void;
  openAdminModal: () => void;
  openClientPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  navigate,
  currency,
  setCurrency,
  cart,
  setIsCartOpen,
  openAdminModal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cart total items
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 5-click logo activation for hidden CMS access
  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    if (newCount >= 5) {
      setLogoClickCount(0);
      openAdminModal();
    } else {
      navigate('home');
      setTimeout(() => setLogoClickCount(0), 3000);
    }
  };

  // Keyboard shortcut Ctrl + Shift + A for Admin CMS
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        openAdminModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openAdminModal]);

  const handleMouseEnter = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    setIsMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 150);
  };

  // Mega Horizontal Menu Categories
  const megaMenuColumns = [
    {
      title: 'Commercial Printing',
      icon: Printer,
      accent: 'text-[#2D3094]',
      serviceId: 'offset-printing',
      items: [
        { name: 'Foil & Embossed Business Cards', desc: 'Luxury spot UV & metallic foils', view: 'services' as View, param: 'offset-printing' },
        { name: 'Corporate Brochures & Profiles', desc: 'Saddle stitch & perfect bound', view: 'services' as View, param: 'offset-printing' },
        { name: 'Annual Reports & Catalogues', desc: 'Executive print finishes', view: 'services' as View, param: 'offset-printing' },
        { name: 'NCR Invoices & Receipt Books', desc: 'Duplicate & triplicate numbered', view: 'services' as View, param: 'offset-printing' },
        { name: 'Pocket Presentation Folders', desc: 'Die-cut corporate document folders', view: 'services' as View, param: 'offset-printing' },
      ]
    },
    {
      title: 'Corporate Branding & Fleet',
      icon: Layers,
      accent: 'text-[#ED008C]',
      serviceId: 'corporate-branding',
      items: [
        { name: '3D Illuminated & Acrylic Signage', desc: 'Reception & exterior building signs', view: 'services' as View, param: 'corporate-branding' },
        { name: 'Fleet & Vehicle Full/Half Wraps', desc: 'Cast vinyl with UV laminate', view: 'services' as View, param: 'corporate-branding' },
        { name: 'Frosted Glass & Window Vinyl', desc: 'Office privacy film & decals', view: 'services' as View, param: 'corporate-branding' },
        { name: 'Architectural Wall Murals', desc: 'High-definition wall graphics', view: 'services' as View, param: 'corporate-branding' },
        { name: 'Wayfinding & Pylon Signboards', desc: 'Interior directional systems', view: 'services' as View, param: 'corporate-branding' },
      ]
    },
    {
      title: 'Customised Gifts & Apparel',
      icon: Gift,
      accent: 'text-amber-500',
      serviceId: 'customised-gifts',
      items: [
        { name: 'Smart Temperature LED Flasks', desc: 'Laser-engraved vacuum bottles', view: 'shop' as View, param: 'Drinkware' },
        { name: 'Executive Notebooks & Metal Pens', desc: 'Embossed leather organizers', view: 'shop' as View, param: 'Stationery' },
        { name: 'Embroidered Polos & Hoodies', desc: 'Premium cotton corporate wear', view: 'shop' as View, param: 'Apparel' },
        { name: 'Custom VIP Gift Hampers', desc: 'Curated corporate executive boxes', view: 'shop' as View, param: 'Gift Sets' },
        { name: 'Branded ID Lanyards & Badges', desc: 'Sublimated conference badge sets', view: 'shop' as View, param: 'Event Supplies' },
      ]
    },
    {
      title: 'Large Format & Events',
      icon: Flag,
      accent: 'text-emerald-500',
      serviceId: 'large-format',
      items: [
        { name: 'Broad-Base Roll-Up Banners', desc: 'Heavy-duty tear-resistant pull-ups', view: 'shop' as View, param: 'Banners' },
        { name: 'Tear-Drop & Flying Feather Flags', desc: 'Double-sided outdoor flags', view: 'shop' as View, param: 'Banners' },
        { name: 'Step & Repeat Media Backdrops', desc: 'Press & photography wall displays', view: 'services' as View, param: 'large-format' },
        { name: 'Branded Gazebo Tents & Tables', desc: 'Full event exhibition setups', view: 'services' as View, param: 'large-format' },
        { name: 'Die-Cut Product Packaging Boxes', desc: 'Custom retail & shipping packaging', view: 'services' as View, param: 'offset-printing' },
      ]
    }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 font-sans">
      {/* Top Announcement Bar */}
      <div className="bg-[#2D3094] text-white text-xs py-2 px-4 md:px-8 border-b border-white/10 hidden sm:block">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px] font-medium">
            <span className="inline-flex items-center gap-1.5 font-bold text-[#ED008C] bg-white/10 px-2 py-0.5 rounded-full">
              <Sparkles size={12} className="animate-pulse" />
              NATIONWIDE UGANDA DELIVERY
            </span>
            <span className="text-white/80 hidden md:inline">
              Fast Turnaround & Heidelberg Offset Precision
            </span>
          </div>

          <div className="flex items-center gap-5 text-[11px] font-medium">
            <a 
              href={`mailto:${COMPANY_INFO.email}`} 
              className="flex items-center gap-1 text-white/90 hover:text-[#ED008C] transition-colors"
            >
              <Mail size={12} />
              <span>{COMPANY_INFO.email}</span>
            </a>
            <a 
              href={`tel:${COMPANY_INFO.phone}`} 
              className="flex items-center gap-1 text-white/90 hover:text-[#ED008C] transition-colors"
            >
              <Phone size={12} />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            
            {/* Currency Switcher */}
            <div className="flex items-center gap-1 bg-white/10 rounded-full p-0.5 text-[10px] font-bold">
              <button 
                onClick={() => setCurrency('UGX')}
                className={`px-2 py-0.5 rounded-full transition-colors ${currency === 'UGX' ? 'bg-[#ED008C] text-white' : 'text-white/70 hover:text-white'}`}
              >
                UGX
              </button>
              <button 
                onClick={() => setCurrency('USD')}
                className={`px-2 py-0.5 rounded-full transition-colors ${currency === 'USD' ? 'bg-[#ED008C] text-white' : 'text-white/70 hover:text-white'}`}
              >
                USD
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-100' 
          : 'bg-white py-4 border-b border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
          
          {/* Logo Brandmark */}
          <div 
            onClick={handleLogoClick}
            className="flex items-center gap-3 cursor-pointer select-none group py-1"
            title="Sozy Impressions Ltd - We Build Brands That Stand Out"
          >
            <img 
              src={COMPANY_INFO.logoUrl} 
              alt="Sozy Impressions Ltd Logo" 
              className="h-10 sm:h-12 w-auto max-w-[200px] sm:max-w-[240px] object-contain group-hover:scale-105 transition-transform duration-200"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Desktop Navigation Links with Mega Horizontal Dropdown */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <button 
              onClick={() => navigate('home')}
              className={`text-xs uppercase tracking-wider font-bold transition-colors py-1.5 ${
                currentView === 'home' 
                  ? 'text-[#ED008C] border-b-2 border-[#ED008C]' 
                  : 'text-slate-700 hover:text-[#2D3094]'
              }`}
            >
              Home
            </button>

            <button 
              onClick={() => navigate('about')}
              className={`text-xs uppercase tracking-wider font-bold transition-colors py-1.5 ${
                currentView === 'about' 
                  ? 'text-[#ED008C] border-b-2 border-[#ED008C]' 
                  : 'text-slate-700 hover:text-[#2D3094]'
              }`}
            >
              About
            </button>

            {/* Services with Full-Width Mega Horizontal Menu */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                onClick={() => {
                  navigate('services');
                  setIsMegaMenuOpen(false);
                }}
                className={`flex items-center gap-1 text-xs uppercase tracking-wider font-bold transition-colors py-1.5 ${
                  currentView === 'services' 
                    ? 'text-[#ED008C] border-b-2 border-[#ED008C]' 
                    : 'text-slate-700 hover:text-[#2D3094]'
                }`}
              >
                <span>Services</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-[#ED008C]' : ''}`} />
              </button>

              {/* Mega Horizontal Dropdown Menu Container */}
              {isMegaMenuOpen && (
                <div 
                  className="fixed left-1/2 -translate-x-1/2 top-[108px] sm:top-[112px] w-[95vw] max-w-6xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-6 z-50 animate-in fade-in slide-in-from-top-3 duration-200"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Top Header of Mega Menu */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-black uppercase tracking-widest bg-[#2D3094] text-white px-3 py-1 rounded-full">
                        Comprehensive Corporate Capabilities
                      </span>
                      <span className="text-xs text-slate-500 font-medium hidden md:inline">
                        High-precision offset printing, corporate branding, custom gifts & signage in Uganda
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        navigate('services');
                        setIsMegaMenuOpen(false);
                      }}
                      className="text-xs font-bold text-[#2D3094] hover:text-[#ED008C] flex items-center gap-1 transition-colors"
                    >
                      <span>Explore All 7 Services</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Mega Horizontal 4-Column Grid + Spotlight Feature Card */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {megaMenuColumns.map((col, idx) => {
                      const IconComp = col.icon;
                      return (
                        <div key={idx} className="flex flex-col">
                          <button
                            onClick={() => {
                              navigate('services', col.serviceId);
                              setIsMegaMenuOpen(false);
                            }}
                            className="flex items-center gap-2 pb-2.5 mb-2.5 border-b border-slate-100 text-left group/colTitle"
                          >
                            <div className={`p-1.5 rounded-lg bg-slate-100 group-hover/colTitle:bg-[#2D3094] group-hover/colTitle:text-white transition-colors ${col.accent}`}>
                              <IconComp size={16} />
                            </div>
                            <span className="text-xs font-heading font-black text-slate-900 group-hover/colTitle:text-[#2D3094] transition-colors">
                              {col.title}
                            </span>
                          </button>

                          <ul className="space-y-1">
                            {col.items.map((item, itemIdx) => (
                              <li key={itemIdx}>
                                <button
                                  onClick={() => {
                                    navigate(item.view, item.param);
                                    setIsMegaMenuOpen(false);
                                  }}
                                  className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition-colors group/item"
                                >
                                  <div className="text-xs font-bold text-slate-700 group-hover/item:text-[#2D3094] transition-colors">
                                    {item.name}
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-normal leading-tight">
                                    {item.desc}
                                  </div>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mega Menu Footer Banner with High-Converting Shortcuts */}
                  <div className="mt-6 pt-4 border-t border-slate-100 bg-gradient-to-r from-[#F4F6FF] via-slate-50 to-[#FFF0F8] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#ED008C] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-md">
                        <Sparkles size={16} />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-slate-900">
                          Need Custom Corporate Branding or Urgent Press Turnaround?
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Heidelberg Speedmaster 5-Color Offset Quality with physical sample proofing in Kampala.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => {
                          navigate('shop');
                          setIsMegaMenuOpen(false);
                        }}
                        className="text-xs font-bold text-slate-700 hover:text-[#2D3094] px-4 py-2 rounded-xl hover:bg-white transition-all"
                      >
                        Browse Product Store
                      </button>
                      <button
                        onClick={() => {
                          navigate('quote');
                          setIsMegaMenuOpen(false);
                        }}
                        className="bg-[#ED008C] hover:bg-[#d4007d] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md transition-all hover:scale-105"
                      >
                        Instant Smart Quote →
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </div>

            <button 
              onClick={() => navigate('portfolio')}
              className={`text-xs uppercase tracking-wider font-bold transition-colors py-1.5 ${
                currentView === 'portfolio' 
                  ? 'text-[#ED008C] border-b-2 border-[#ED008C]' 
                  : 'text-slate-700 hover:text-[#2D3094]'
              }`}
            >
              Portfolio
            </button>

            <button 
              onClick={() => navigate('shop')}
              className={`text-xs uppercase tracking-wider font-bold transition-colors py-1.5 flex items-center gap-1 ${
                currentView === 'shop' 
                  ? 'text-[#ED008C] border-b-2 border-[#ED008C]' 
                  : 'text-slate-700 hover:text-[#2D3094]'
              }`}
            >
              <span>Shop</span>
              <span className="bg-[#ED008C] text-white text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">
                Store
              </span>
            </button>

            <button 
              onClick={() => navigate('blog')}
              className={`text-xs uppercase tracking-wider font-bold transition-colors py-1.5 ${
                currentView === 'blog' 
                  ? 'text-[#ED008C] border-b-2 border-[#ED008C]' 
                  : 'text-slate-700 hover:text-[#2D3094]'
              }`}
            >
              Blog
            </button>

            <button 
              onClick={() => navigate('contact')}
              className={`text-xs uppercase tracking-wider font-bold transition-colors py-1.5 ${
                currentView === 'contact' 
                  ? 'text-[#ED008C] border-b-2 border-[#ED008C]' 
                  : 'text-slate-700 hover:text-[#2D3094]'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Action CTAs: Shopping Cart & Primary Get a Quote CTA (No WhatsApp, No Login, No Search) */}
          <div className="flex items-center gap-3">
            {/* Shopping Cart Drawer Trigger */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full text-slate-700 hover:text-[#ED008C] hover:bg-slate-100 transition-colors cursor-pointer"
              title="View Cart & Custom Orders"
            >
              <ShoppingCart size={20} />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ED008C] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scale">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Primary High-Converting CTA: Get a Quote (Hidden on Mobile, Visible on Tablet & Desktop) */}
            <button 
              onClick={() => navigate('quote')}
              className="hidden sm:flex bg-[#ED008C] hover:bg-[#d4007d] text-white text-[11px] font-bold uppercase tracking-wider px-5 sm:px-6 py-2.5 rounded-full shadow-lg shadow-[#ED008C]/25 transition-all transform hover:scale-105 active:scale-95 items-center gap-1.5 cursor-pointer"
            >
              <span>Get a Quote</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer (No WhatsApp, No Login, No Industries) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-6 py-6 animate-in slide-in-from-top-4 duration-300 shadow-xl max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col gap-3">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500">Currency</span>
                <div className="flex items-center gap-1 bg-slate-100 rounded-full p-1 text-xs font-bold">
                  <button 
                    onClick={() => setCurrency('UGX')}
                    className={`px-3 py-1 rounded-full ${currency === 'UGX' ? 'bg-[#2D3094] text-white' : 'text-slate-600'}`}
                  >
                    UGX
                  </button>
                  <button 
                    onClick={() => setCurrency('USD')}
                    className={`px-3 py-1 rounded-full ${currency === 'USD' ? 'bg-[#2D3094] text-white' : 'text-slate-600'}`}
                  >
                    USD
                  </button>
                </div>
              </div>

              {[
                { name: 'Home', view: 'home' },
                { name: 'About Company', view: 'about' },
                { name: '7 Core Printing & Branding Services', view: 'services' },
                { name: 'Portfolio & Case Studies', view: 'portfolio' },
                { name: 'Product Store', view: 'shop' },
                { name: 'Quote Calculator', view: 'quote' },
                { name: 'Blog & Articles', view: 'blog' },
                { name: 'Contact Us', view: 'contact' },
              ].map((item) => (
                <button
                  key={item.view}
                  onClick={() => {
                    navigate(item.view as View);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left font-bold text-sm py-2 px-3 rounded-xl transition-colors ${
                    currentView === item.view 
                      ? 'bg-[#2D3094]/10 text-[#2D3094]' 
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <button 
                  onClick={() => {
                    navigate('quote');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-[#ED008C] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl text-center shadow-md shadow-[#ED008C]/20"
                >
                  Get an Instant Quote
                </button>
              </div>

            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
