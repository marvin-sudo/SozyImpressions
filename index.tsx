import * as React from 'react';
import { useState, useEffect, Component } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { 
  Menu, X, ArrowRight, ArrowLeft, Check,
  Mail, Phone, MapPin, Instagram, 
  Facebook, Linkedin, Twitter, Star,
  MessageCircle, ShoppingCart, ShoppingBag,
  Rocket, Zap, Lock, ArrowUpRight, Users, CheckCircle2,
  Trash2, Filter, Sparkles, Send,
  Award, Eye, Target, Globe, ShieldCheck, BarChart, 
  Lightbulb, Shirt, PenTool, Briefcase,
  Printer, Car, Flag, Layout, Megaphone, UserCheck, ChevronRight, Gift,
  Code, Settings, Server, Smartphone, MousePointer, Moon, Sun,
  Play, PlayCircle, Video, MessageSquare
} from 'lucide-react';
import { Search as SearchIcon } from 'lucide-react';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { db, auth } from './firebase';
import { 
  collection, addDoc, serverTimestamp,
} from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO, SERVICES, PRODUCTS } from './src/constants';

// --- Assets ---
const HERO_IMAGE = "/src/assets/images/sozy_hero_workspace_1777014868067.png";
const SHOP_IMAGE = "/src/assets/images/sozy_merch_showcase_1777014885293.png";

// --- Navigation ---
const NAV_LINKS = [
  { label: 'Home', view: 'home' },
  { label: 'About', view: 'about' },
  { label: 'Services', view: 'services' },
  { label: 'Portfolio', view: 'portfolio' },
  { label: 'Shop', view: 'shop' },
  { label: 'Insights', view: 'insights' },
  { label: 'Contact', view: 'contact' },
];

// --- Types ---
type View = 'home' | 'about' | 'services' | 'shop' | 'portfolio' | 'contact' | 'admin' | 'service-detail' | 'insights';

// --- Main App Component ---
function App() {
  const [view, setView] = useState<View>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u && u.email === 'ssozimarvin5@gmail.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  const navigate = (v: View, serviceId?: string) => {
    setView(v);
    if (serviceId) setSelectedServiceId(serviceId);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const addToCart = (product: any) => {
    setCart([...cart, product]);
  };

  // Real search filtering logic across multiple lists
  const searchResults = searchQuery.trim() === '' ? [] : [
    ...SERVICES.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase())).map(s => ({ ...s, type: 'Service', targetView: 'services' as View })),
    ...PORTFOLIO.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase())).map(p => ({ ...p, type: 'Portfolio', targetView: 'portfolio' as View })),
    ...PRODUCTS.filter(pr => pr.name.toLowerCase().includes(searchQuery.toLowerCase()) || pr.description.toLowerCase().includes(searchQuery.toLowerCase())).map(pr => ({ ...pr, type: 'Shop Product', targetView: 'shop' as View }))
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-[#0D0D0D] text-white' : 'bg-[#F8F9FB] text-[#0D0D0D]'}`}>
      {/* Sticky Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? (isDarkMode ? 'bg-[#0D0D0D]/90 border-b border-white/10 shadow-lg' : 'bg-white/90 border-b border-slate-100 shadow-md') + ' backdrop-blur-md py-4' 
          : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => navigate('home')}>
            <div className="w-10 h-10 bg-[#FF4FA3] flex items-center justify-center rounded-xl rotate-12 transition-all duration-300 group-hover:rotate-0 shadow-lg shadow-[#FF4FA3]/25">
              <span className="text-white font-extrabold text-2xl font-display">S</span>
            </div>
            <span className="text-2xl font-display font-extrabold tracking-tighter">
              SOZY<span className="text-[#FF4FA3]">IMPRESSIONS</span>
            </span>
          </div>

          {/* Center: Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <button
                key={link.view}
                onClick={() => navigate(link.view as View)}
                className={`text-[11px] font-bold uppercase tracking-widest transition-all duration-300 hover:text-[#FF4FA3] relative py-1 ${
                  view === link.view 
                    ? 'text-[#FF4FA3]' 
                    : (isDarkMode ? 'text-white/80' : 'text-[#0D0D0D]/80')
                }`}
              >
                {link.label}
                {view === link.view && (
                  <motion.span 
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF4FA3]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center gap-6">
            {/* Search Icon */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className={`p-2.5 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-[#0D0D0D]/5 text-[#0D0D0D]'}`}
              title="Search services, projects..."
            >
              <SearchIcon size={20} />
            </button>

            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10 text-yellow-400' : 'hover:bg-[#0D0D0D]/5 text-slate-700'}`}
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Shopping Cart */}
            <div 
              className={`relative cursor-pointer p-2.5 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-[#0D0D0D]/5 text-[#0D0D0D]'}`} 
              onClick={() => navigate('shop')}
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#FF4FA3] text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {cart.length}
                </span>
              )}
            </div>

            {/* Admin toggle if authorized */}
            {isAdmin && (
              <button onClick={() => navigate('admin')} className="p-2.5 hover:bg-red-500/10 text-[#FF4FA3] rounded-full" title="Admin Control Center">
                <Lock size={18} />
              </button>
            )}

            {/* Secondary CTA: Let's Talk */}
            <button 
              onClick={() => navigate('contact')}
              className={`hidden xl:inline-flex items-center gap-1.5 font-extrabold text-[11px] tracking-widest uppercase px-5 py-2.5 rounded-full border transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                isDarkMode 
                  ? 'border-white/20 text-white hover:bg-white/10 hover:border-white/40' 
                  : 'border-slate-300 text-slate-800 hover:bg-slate-100'
              }`}
            >
              Let’s Talk
            </button>

            {/* Primary CTA: Get Started */}
            <button 
              onClick={() => navigate('contact')}
              className="bg-[#FF4FA3] hover:bg-[#FF4FA3]/90 text-white font-extrabold text-[11px] tracking-widest uppercase px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-[#FF4FA3]/30 flex items-center gap-1.5"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full ${isDarkMode ? 'text-yellow-400' : 'text-slate-700'}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              className={`p-2 ${isDarkMode ? 'text-white' : 'text-[#0D0D0D]'}`} 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-x-0 top-0 z-40 pt-28 pb-12 px-6 flex flex-col gap-6 shadow-2xl ${
              isDarkMode ? 'bg-[#0D0D0D]/95 border-b border-white/10' : 'bg-white/95 border-b border-slate-100'
            } backdrop-blur-xl`}
          >
            <div className="flex flex-col gap-4 text-center">
              {NAV_LINKS.map(link => (
                <button
                  key={link.view}
                  onClick={() => navigate(link.view as View)}
                  className={`text-lg font-bold uppercase tracking-wider py-2 transition-all ${
                    view === link.view ? 'text-[#FF4FA3]' : (isDarkMode ? 'text-white' : 'text-[#0D0D0D]')
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="h-[1px] bg-slate-200 dark:bg-white/10 my-2" />
            <div className="flex flex-col gap-4 items-center">
              <button 
                onClick={() => { setIsMobileMenuOpen(false); setIsSearchOpen(true); }}
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent"
              >
                <SearchIcon size={18} /> Search Agency
              </button>
              <button 
                onClick={() => navigate('contact')}
                className="w-full bg-[#FF4FA3] hover:bg-[#FF4FA3]/90 text-white font-extrabold text-xs tracking-widest uppercase py-4 rounded-full text-center transition-all shadow-md"
              >
                Book Discovery Call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Glassmorphic Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0D0D0D]/80 backdrop-blur-xl flex items-start justify-center pt-24 px-6"
          >
            <motion.div 
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className={`w-full max-w-2xl rounded-3xl p-8 shadow-2xl border ${
                isDarkMode ? 'bg-[#151515] border-white/10' : 'bg-white border-slate-100'
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-display font-extrabold tracking-tight">Search SozyImpressions</h3>
                <button 
                  onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="relative mb-6">
                <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input 
                  type="text"
                  placeholder="Search services, projects or resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white placeholder-white/40 outline-none focus:border-[#FF4FA3] transition-colors"
                />
              </div>

              <div className="max-h-[300px] overflow-y-auto space-y-4 pr-2">
                {searchResults.length > 0 ? (
                  searchResults.map((result: any, i) => (
                    <div 
                      key={i}
                      onClick={() => {
                        navigate(result.targetView);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="p-4 rounded-xl bg-white/5 hover:bg-[#FF4FA3]/15 border border-white/5 hover:border-[#FF4FA3]/30 transition-all cursor-pointer flex justify-between items-center group"
                    >
                      <div>
                        <div className="text-[10px] uppercase font-black tracking-widest text-[#FF4FA3] mb-1">{result.type}</div>
                        <h4 className="font-bold text-base text-white group-hover:text-white transition-colors">{result.title || result.name}</h4>
                        <p className="text-xs text-white/50 line-clamp-1">{result.description}</p>
                      </div>
                      <ArrowRight size={16} className="text-white/40 group-hover:text-[#FF4FA3] transition-colors group-hover:translate-x-1" />
                    </div>
                  ))
                ) : searchQuery.trim() !== '' ? (
                  <p className="text-sm text-white/40 text-center py-8">No results found for "{searchQuery}"</p>
                ) : (
                  <div className="text-center py-6 text-sm text-white/30">
                    Type above to search across our Creative Core, Masterpiece Portfolios, and Agency Digital Products.
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        <AnimatePresence mode="wait">
          {view === 'home' && <HomeView navigate={navigate} isDarkMode={isDarkMode} />}
          {view === 'about' && <AboutView />}
          {view === 'services' && <ServicesView navigate={navigate} />}
          {view === 'service-detail' && <ServiceDetailView serviceId={selectedServiceId} navigate={navigate} />}
          {view === 'shop' && <ShopView addToCart={addToCart} />}
          {view === 'portfolio' && <PortfolioView />}
          {view === 'insights' && <InsightsView navigate={navigate} />}
          {view === 'contact' && <ContactView />}
          {view === 'admin' && <AdminView />}
        </AnimatePresence>
      </main>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/1234567890" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
      >
        <MessageCircle size={28} />
        <span className="absolute right-full mr-4 bg-white text-dark text-xs font-bold py-2 px-4 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with us on WhatsApp
        </span>
      </a>

      {/* Footer */}
      <footer className="bg-dark text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary flex items-center justify-center rounded">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-xl font-display font-bold">SOZY IMPRESSIONS</span>
            </div>
            <p className="text-2xl font-display font-bold mb-6 text-white max-w-sm">From Concept to Creation — Let’s Build Your Brand.</p>
            <p className="text-white/60 mb-6 leading-relaxed max-w-md">
              Transforming concepts into vibrant creative realities. Your partner in branding and digital excellence.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center rounded-full hover:bg-primary transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4">
              <li><button onClick={() => navigate('about')} className="text-white/60 hover:text-white transition-colors">Our Story</button></li>
              <li><button onClick={() => navigate('portfolio')} className="text-white/60 hover:text-white transition-colors">Portfolio</button></li>
              <li><button onClick={() => navigate('services')} className="text-white/60 hover:text-white transition-colors">Services</button></li>
              <li><button onClick={() => navigate('contact')} className="text-white/60 hover:text-white transition-colors">Careers</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-white/60">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent shrink-0" />
                <span>123 Creative Studio, Arts District, City</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent shrink-0" />
                <span>hello@sozyimpressions.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent shrink-0" />
                <span>+1 234 567 890</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-white/60 mb-4">Get the latest branding tips and shop updates.</p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button type="submit" className="absolute right-1 top-1 bg-primary p-2 rounded-full hover:bg-primary/90 transition-all">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-10 flex flex-col md:row justify-between items-center gap-4 text-sm text-white/40">
          <p>© 2026 Sozy Impressions. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            {isAdmin ? (
               <div className="flex items-center gap-4">
                 <button onClick={() => navigate('admin')} className="text-primary font-bold">Admin Dashboard</button>
                 <button onClick={() => auth.signOut()} className="text-white/40 hover:text-white text-xs underline">Logout</button>
               </div>
            ) : (
               <button onClick={() => signInWithPopup(auth, new GoogleAuthProvider())} className="hover:text-white flex items-center gap-1">
                 <Lock size={12} /> Staff Login
               </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Views ---

function HomeView({ navigate, isDarkMode }: { navigate: (v: View) => void, isDarkMode: boolean }) {
  // Stat counters
  const [stats, setStats] = useState({ brands: 0, projects: 0, satisfaction: 0, services: 0 });
  useEffect(() => {
    const duration = 1500; // ms
    const steps = 30;
    const stepTime = duration / steps;
    let step = 0;
    
    const timer = setInterval(() => {
      step++;
      setStats({
        brands: Math.min(120, Math.round((120 / steps) * step)),
        projects: Math.min(300, Math.round((300 / steps) * step)),
        satisfaction: Math.min(98, Math.round((98 / steps) * step)),
        services: Math.min(8, Math.round((8 / steps) * step))
      });
      if (step >= steps) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  // Search input state on Hero
  const [heroSearch, setHeroSearch] = useState("");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activePortfolioFilter, setActivePortfolioFilter] = useState("All");
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);

  const heroCards = [
    { title: "Brand Identity", emoji: "🎨", desc: "Crafting complete visual languages.", link: "branding" },
    { title: "Logo Design", emoji: "✨", desc: "Memorable icons representing your core values.", link: "graphic-design" },
    { title: "Website Design", emoji: "💻", desc: "Stunning, bespoke, high-converting portals.", link: "web-design" },
    { title: "UI/UX", emoji: "📱", desc: "Intuitive, slick, responsive user experiences.", link: "web-design" },
    { title: "Graphic Design", emoji: "📐", desc: "Bespoke graphics for print and digital media.", link: "graphic-design" },
    { title: "Packaging Design", emoji: "📦", desc: "Tangible brand designs that scream premium.", link: "branding" },
    { title: "Social Media Marketing", emoji: "📈", desc: "Strategic marketing that grows communities.", link: "marketing" },
    { title: "Photography", emoji: "📷", desc: "Sleek professional lifestyle & product shots.", link: "content-creation" },
    { title: "Videography", emoji: "🎥", desc: "High-definition promotional & brand reels.", link: "content-creation" },
    { title: "Motion Graphics", emoji: "🎬", desc: "Dynamic animated videos that capture eyes.", link: "content-creation" },
    { title: "SEO", emoji: "🔍", desc: "First page rankings that attract organic buyers.", link: "web-design" },
    { title: "Digital Products", emoji: "⚡", desc: "High-quality templates ready for immediate scale.", link: "shop" }
  ];

  const filteredHeroCards = heroSearch.trim() === "" 
    ? heroCards 
    : heroCards.filter(c => c.title.toLowerCase().includes(heroSearch.toLowerCase()) || c.desc.toLowerCase().includes(heroSearch.toLowerCase()));

  // Testimonial slide list
  const testimonials = [
    {
      name: "Brenda Namatovu",
      role: "Managing Director, Xani Foods",
      quote: "SozyImpressions did not just design a logo for Xani Foods — they developed an entire culinary visual ecosystem. Our packaging is now the talk of Kampala and stands out on supermarket shelves. Professionalism at its finest!",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Marcus Katuramu",
      role: "Founder, A3 Collections",
      quote: "The web application and custom checkout designed by SozyImpressions completely redefined our streetwear sales in East Africa. Our online conversion rate shot up by 42% in just two months. A premier digital agency!",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    },
    {
      name: "Pastor David Ssenyange",
      role: "Director, Kairos Ministries",
      quote: "SozyImpressions delivered a beautiful, warm, and highly functional community platform that connects our regional outreach. They have premium standards and high integrity. We highly recommend them.",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
    }
  ];

  // Portfolio list corresponding to the request
  const portfolioItems = [
    { id: "p1", title: "Xani Foods Identity", category: "Branding", desc: "Premium organic food packaging and strategy.", image: "https://images.unsplash.com/photo-1612538498456-e861df91d4d0?auto=format&fit=crop&q=80&w=800" },
    { id: "p2", title: "A3 Collections Portal", category: "Web Design", desc: "High-performance streetwear e-commerce platform.", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800" },
    { id: "p3", title: "Kairos Community App", category: "Web Design", desc: "Sleek web application and booking system.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
    { id: "p4", title: "Elayna Estates Identity", category: "Branding", desc: "Corporate branding for luxury real estate developer.", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" },
    { id: "p5", title: "Social Launch Strategy", category: "Marketing", desc: "Viral campaign setup that gained 10k organic leads.", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800" },
    { id: "p6", title: "Minimalist Pack Series", category: "Packaging", desc: "Eco-friendly, tactile cosmetic container design.", image: "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=800" }
  ];

  const filteredPortfolio = activePortfolioFilter === "All"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activePortfolioFilter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-hidden"
    >
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 bg-gradient-to-b from-[#0B0F19] via-[#0D0D0D] to-[#111625] text-white overflow-hidden border-b border-white/10">
        {/* Subtle SVG Grid & Abstract Vector Line Overlay for Background Depth */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:24px_24px]" />
        
        {/* Glowing Ambient Background Radial Blobs */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              x: [0, 60, -30, 0],
              y: [0, -40, 30, 0],
              scale: [1, 1.15, 0.95, 1]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-[#FF4FA3] rounded-full filter blur-[140px] opacity-25"
          />
          <motion.div 
            animate={{ 
              x: [0, -80, 40, 0],
              y: [0, 50, -40, 0],
              scale: [1, 0.85, 1.1, 1]
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-[#6C63FF] rounded-full filter blur-[160px] opacity-20"
          />
        </div>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto w-full relative z-10 my-auto py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
            
            {/* Left Section: Messaging & CTAs (lg:col-span-7) */}
            <div className="lg:col-span-7 text-left flex flex-col items-start">
              
              {/* Credibility / Experience Badge */}
              <motion.div 
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-[#FF4FA3]/15 border border-[#FF4FA3]/35 text-[#FF4FA3] mb-6 backdrop-blur-md shadow-sm"
              >
                <Sparkles size={14} className="animate-spin-slow text-[#FF4FA3]" />
                <span className="text-[11px] font-black uppercase tracking-widest text-[#FF4FA3]">
                  Established in 2018 • Trusted by Growing & Established Brands
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight leading-[1.08] mb-6 text-white"
              >
                We Are a <br className="hidden sm:inline" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF4FA3] via-[#A855F7] to-[#3B82F6]">
                  Creative Branding
                </span> <br className="hidden sm:inline" />
                & Digital Agency.
              </motion.h1>

              {/* Supporting Text (Value Proposition) */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-lg lg:text-xl font-light leading-relaxed text-slate-300 mb-8 max-w-2xl"
              >
                We help brands grow, stand out, and dominate their markets through strategic branding, premium printing, digital marketing, and innovative creative solutions.
              </motion.p>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto"
              >
                {/* Primary CTA */}
                <button 
                  onClick={() => navigate('contact')}
                  className="bg-[#FF4FA3] hover:bg-[#FF4FA3]/90 text-white font-extrabold text-xs tracking-widest uppercase px-8 py-4.5 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl shadow-[#FF4FA3]/25 flex items-center justify-center gap-2 group w-full sm:w-auto"
                >
                  <span>Get Started</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>

                {/* Secondary CTA */}
                <button 
                  onClick={() => navigate('contact')}
                  className="border-2 border-white/25 hover:border-white/60 text-white hover:bg-white/10 font-extrabold text-xs tracking-widest uppercase px-8 py-4.5 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <MessageSquare size={16} className="text-[#FF4FA3]" />
                  <span>Let’s Talk</span>
                </button>

                {/* Tertiary Link */}
                <button
                  onClick={() => navigate('portfolio')}
                  className="text-slate-400 hover:text-white font-bold text-xs tracking-widest uppercase px-4 py-2 transition-colors flex items-center gap-1.5 underline decoration-[#FF4FA3]/40 underline-offset-8 hover:decoration-[#FF4FA3] mx-auto sm:mx-0"
                >
                  <span>View Our Portfolio</span>
                </button>
              </motion.div>

              {/* Trust Metrics / Stat Counters */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 w-full max-w-xl"
              >
                <div className="flex flex-col">
                  <span className="text-3xl md:text-4xl font-display font-black text-white">{stats.brands || 8}+ Years</span>
                  <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Experience</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl md:text-4xl font-display font-black text-[#FF4FA3]">{stats.projects || 300}+</span>
                  <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Completed Projects</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl md:text-4xl font-display font-black text-white">{stats.brands || 120}+</span>
                  <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Trusted Clients</span>
                </div>
              </motion.div>

            </div>

            {/* Right Section: Media Card Showcase (lg:col-span-5) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative group rounded-[2.5rem] overflow-hidden border border-white/15 bg-[#12121A]/80 p-3 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-[#FF4FA3]/40 hover:shadow-[#FF4FA3]/20">
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-900">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
                    alt="Sozy Impressions Creative Workspace" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/20 to-transparent" />

                  {/* Play Video Reel Trigger */}
                  <button 
                    onClick={() => setIsShowreelOpen(true)}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 group/btn cursor-pointer"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#FF4FA3]/90 text-white flex items-center justify-center shadow-2xl transition-all duration-300 transform group-hover/btn:scale-110 group-hover/btn:bg-[#FF4FA3] border-4 border-white/20">
                      <Play size={32} className="ml-1 fill-white" />
                    </div>
                    <span className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-black uppercase tracking-widest border border-white/20 group-hover/btn:border-[#FF4FA3] shadow-lg">
                      Watch Showreel (1:45)
                    </span>
                  </button>

                  {/* Floating Badge Top Left */}
                  <div className="absolute top-5 left-5 bg-[#0D0D0D]/80 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Full-Service Studio</span>
                  </div>

                  {/* Floating Badge Bottom Info */}
                  <div className="absolute bottom-5 left-5 right-5 bg-white/95 text-[#0D0D0D] p-4 rounded-2xl shadow-2xl flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-black text-xs uppercase tracking-tight">Kampala & Global</h4>
                      <p className="text-[10px] font-bold text-slate-500">Branding • Printing • Digital Marketing</p>
                    </div>
                    <div className="flex items-center gap-1 text-[#FF4FA3] font-black text-xs bg-[#FF4FA3]/10 px-3 py-1.5 rounded-xl">
                      ★ 4.9 / 5.0
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Embedded Quick Search Input */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full max-w-2xl mx-auto rounded-2xl p-2 shadow-2xl border flex items-center mt-12 bg-[#151520] border-white/15 relative z-20"
          >
            <div className="pl-4 text-white/40"><SearchIcon size={20} /></div>
            <input 
              type="text" 
              placeholder="Search services, branding packages, merchandise or projects..." 
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder-white/40 outline-none"
            />
            {heroSearch.trim() !== "" && (
              <button 
                onClick={() => setHeroSearch("")} 
                className="p-2 text-xs font-bold text-[#FF4FA3] hover:underline"
              >
                Clear
              </button>
            )}
          </motion.div>

          {/* Curved Apple-style Showcase Deck when searching */}
          {heroSearch.trim() !== "" && (
            <div className="w-full relative py-6 max-w-7xl mx-auto overflow-hidden mt-4">
              <motion.div 
                className="flex gap-6 overflow-x-auto pb-8 px-8 scrollbar-hide select-none snap-x"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {filteredHeroCards.map((card, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    whileHover={{ y: -8, scale: 1.03 }}
                    onClick={() => {
                      if (card.link === 'shop') {
                        navigate('shop');
                      } else {
                        navigate('services', card.link);
                      }
                    }}
                    className="snap-center shrink-0 w-64 rounded-3xl p-6 border border-white/10 transition-all duration-300 cursor-pointer flex flex-col justify-between text-left h-48 relative bg-[#181824] hover:border-[#FF4FA3]/40 shadow-xl"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#FF4FA3]/10 flex items-center justify-center text-2xl">
                      {card.emoji}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg mb-1 text-white">{card.title}</h4>
                      <p className="text-xs leading-relaxed line-clamp-2 text-white/60">{card.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {/* Brand Credibility Strip at Bottom of Hero */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="pt-14 pb-4 border-t border-white/10 mt-14 text-center"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-6">
              Trusted by Industry-Leading Brands & Growing Enterprises
            </span>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-70 hover:opacity-100 transition-opacity">
              {["Xani Foods", "A3 Collections", "Kairos Ministries", "Elayna Estates", "Nile Exports", "Apex Creative"].map((brand, bIdx) => (
                <span 
                  key={bIdx}
                  className="text-lg md:text-2xl font-display font-black tracking-tight text-white/80 hover:text-[#FF4FA3] transition-colors cursor-default"
                >
                  {brand}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* Showreel Modal */}
      <AnimatePresence>
        {isShowreelOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-4xl bg-[#12121A] border border-white/15 rounded-[2.5rem] p-8 text-white relative shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setIsShowreelOpen(false)}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-[10px] font-black uppercase tracking-widest text-[#FF4FA3] mb-2">Sozy Impressions Creative Reel</div>
              <h3 className="text-2xl md:text-4xl font-display font-black mb-6">Crafting Visual Legacies Since 2018</h3>

              <div className="aspect-video rounded-2xl overflow-hidden bg-slate-900 mb-8 relative border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200" 
                  alt="Showreel Preview" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-[#FF4FA3] flex items-center justify-center mb-4 shadow-xl">
                    <Play size={28} className="ml-1 fill-white" />
                  </div>
                  <h4 className="font-display font-black text-xl mb-1">Interactive Agency Showcase</h4>
                  <p className="text-xs text-white/70 max-w-md">Highlighting our recent branding identity overhauls, high-speed website deployments, and packaging designs for Xani Foods, A3 Collections & more.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div>
                  <div className="text-xs font-bold">Ready to elevate your brand presence?</div>
                  <div className="text-[10px] text-white/50">Schedule a 15-minute direct strategy call with our creative leads.</div>
                </div>
                <button 
                  onClick={() => { setIsShowreelOpen(false); navigate('contact'); }}
                  className="bg-[#FF4FA3] hover:bg-[#FF4FA3]/90 text-white font-extrabold text-xs tracking-widest uppercase px-6 py-3.5 rounded-full transition-all shadow-lg"
                >
                  Book A Discovery Call
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trusted By Section (Infinite Marquee) */}
      <section className={`py-12 border-y ${isDarkMode ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-6 mb-4 text-center">
          <span className={`text-[10px] font-black tracking-widest uppercase ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>Trusted by Growing and Established Brands</span>
        </div>
        <div className="relative overflow-hidden w-full h-16 flex items-center">
          <div className="flex w-[200%] animate-marquee">
            {[1, 2].map((loop) => (
              <div key={loop} className="flex justify-around items-center w-1/2 shrink-0">
                {["Xani Foods", "A3 Collections", "Kairos Ministries", "Elayna Estates", "Sozy Design", "Nile Exports", "Apex Creative"].map((brand, bIdx) => (
                  <span 
                    key={brand + bIdx} 
                    className={`text-xl md:text-3xl font-display font-extrabold tracking-tight grayscale opacity-45 hover:opacity-90 hover:grayscale-0 transition-all duration-300 cursor-default ${
                      isDarkMode ? 'text-white' : 'text-[#0D0D0D]'
                    }`}
                  >
                    {brand}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`section-padding ${isDarkMode ? 'bg-[#111111]' : 'bg-[#F8F9FB]'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div className="max-w-xl">
              <span className="text-[#FF4FA3] text-xs font-black uppercase tracking-widest block mb-3">Our Creative Core</span>
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight leading-none">
                Everything Your Brand <br/>
                <span className="italic font-serif text-[#FF4FA3]">Needs Under One Roof.</span>
              </h2>
            </div>
            <p className={`text-base leading-relaxed max-w-sm font-light ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>
              We merge strategy, award-winning design, and scalable technology to elevate your brand presence and drive continuous consumer engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Branding & Identity", desc: "Developing timeless visual guidelines, color schemes, typography & core statements.", emoji: "🎨", id: "branding" },
              { title: "Website Design", desc: "Stunning responsive layouts constructed to convert visitors into repeat customers.", emoji: "💻", id: "web-design" },
              { title: "Social Media Management", desc: "Targeted curation, content planning, and community management across platforms.", emoji: "📱", id: "marketing" },
              { title: "Packaging Design", desc: "Sensory, modern physical packaging and premium label layouts that drive product sales.", emoji: "📦", id: "branding" },
              { title: "Content Production", desc: "HD photography, commercials, corporate video guides, and premium soundscapes.", emoji: "🎥", id: "content-creation" },
              { title: "Digital Marketing", desc: "Result-driven performance marketing campaigns, lead funnels, and organic strategy.", emoji: "📈", id: "marketing" },
              { title: "E-commerce Solutions", desc: "Secure multi-payment gateways, cards, dynamic order handling, and mobile money setups.", emoji: "🛒", id: "web-design" },
              { title: "Brand Strategy", desc: "Competitor research, target indexing, and conceptual position mapping for growth.", emoji: "🧠", id: "branding" }
            ].map((srv, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                onClick={() => navigate('services', srv.id)}
                className={`p-8 rounded-[2rem] border transition-all duration-500 cursor-pointer group flex flex-col justify-between h-[340px] relative ${
                  isDarkMode 
                    ? 'bg-[#181818] border-white/5 hover:border-[#FF4FA3]/30 shadow-[#000000]/40' 
                    : 'bg-white border-slate-100 hover:border-[#FF4FA3]/30 shadow-sm'
                } hover:shadow-2xl`}
              >
                {/* Hover Glow effect */}
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#FF4FA3]/0 via-transparent to-[#FF4FA3]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#FF4FA3]/10 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">
                    {srv.emoji}
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3 tracking-tight group-hover:text-[#FF4FA3] transition-colors">{srv.title}</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{srv.desc}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FF4FA3] pt-4 group">
                  <span>Explore Service</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase (Filterable Grid) */}
      <section className={`section-padding ${isDarkMode ? 'bg-[#0D0D0D]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#FF4FA3] text-xs font-black uppercase tracking-widest block mb-3">Portfolio Highlights</span>
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight">Our Masterpieces</h2>
            </div>
            
            {/* Filter controls */}
            <div className="flex flex-wrap gap-2.5">
              {["All", "Branding", "Web Design", "Marketing", "Packaging"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActivePortfolioFilter(filter)}
                  className={`px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-full transition-all ${
                    activePortfolioFilter === filter 
                      ? 'bg-[#FF4FA3] text-white shadow-md' 
                      : (isDarkMode ? 'bg-white/5 text-white/70 hover:bg-white/10' : 'bg-slate-100 text-[#0D0D0D]/70 hover:bg-slate-200')
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredPortfolio.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="group relative h-[450px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl"
                  onClick={() => navigate('portfolio')}
                >
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-[#FF4FA3] font-black uppercase tracking-widest text-[10px] mb-2 block">{item.category}</span>
                    <h3 className="text-2xl font-display font-extrabold mb-2">{item.title}</h3>
                    <p className="text-sm text-white/70 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.desc}</p>
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white border-b-2 border-white/20 hover:border-white w-max">
                      View Case Study <ArrowUpRight size={14} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Our Creative Process */}
      <section className={`section-padding ${isDarkMode ? 'bg-[#111111]' : 'bg-[#F8F9FB]'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[#FF4FA3] text-xs font-black uppercase tracking-widest block mb-3">Our Methodology</span>
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-4">Our Creative Process</h2>
            <div className="w-16 h-1 bg-[#FF4FA3] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF4FA3] via-[#6C63FF] to-[#3B82F6] opacity-20 hidden md:block" />

            {[
              { num: "01", step: "Discover", desc: "Active research, brand auditing, competitor mapping, and requirement scoping." },
              { num: "02", step: "Strategy", desc: "Setting milestones, defining unique positioning, and outlining product funnels." },
              { num: "03", step: "Design", desc: "Drafting user interface wireframes, mood boards, vectors, and layouts." },
              { num: "04", step: "Build", desc: "Clean development, modern styling, search optimization, and integration." },
              { num: "05", step: "Launch", desc: "Rigorous testing across browsers, domain routing, and final deployments." },
              { num: "06", step: "Grow", desc: "Ongoing analysis, continuous marketing, speed tuning, and scaling operations." }
            ].map((p, pIdx) => (
              <div 
                key={pIdx}
                className={`p-6 rounded-[2rem] border transition-all duration-300 flex flex-col justify-between h-64 relative z-10 hover:-translate-y-2 ${
                  isDarkMode 
                    ? 'bg-[#151515] border-white/5 hover:border-[#FF4FA3]/25 hover:bg-[#1C1C1C]' 
                    : 'bg-white border-slate-100 hover:border-[#FF4FA3]/25 hover:bg-slate-50'
                }`}
              >
                <div>
                  <span className="text-3xl font-display font-black text-[#FF4FA3]/30 mb-4 block">{p.num}</span>
                  <h4 className="text-lg font-display font-bold mb-2 tracking-tight">{p.step}</h4>
                </div>
                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose SozyImpressions */}
      <section className={`section-padding ${isDarkMode ? 'bg-[#0D0D0D]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left: Beautiful Creative Graphic Layout */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-8 border-white/5">
                <img src="https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=1200" alt="Workspace Creative Studio" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#6C63FF]/10 rounded-[3rem] -z-0 blur-xl" />
              <div className="absolute -top-8 -left-8 w-48 h-48 bg-[#FF4FA3]/10 rounded-[3rem] -z-0 blur-xl" />
            </motion.div>

            {/* Right: Bullet Core values */}
            <div className="space-y-8">
              <div>
                <span className="text-[#FF4FA3] text-xs font-black uppercase tracking-widest block mb-3">Our Core Distinction</span>
                <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight leading-none mb-6">Why Choose SozyImpressions</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Strategy Before Design", desc: "Every design is preceded by target user intelligence to secure conversion success." },
                  { title: "Premium Quality", desc: "No templates or quick workarounds. Unique design files customized to capture eyes." },
                  { title: "Fast Turnaround", desc: "Agile project workflows that maintain deadlines and keep operations on path." },
                  { title: "Business-Focused Creativity", desc: "Visual assets tailored explicitly to improve lead numbers and bottom-line profit." },
                  { title: "Results-Driven Marketing", desc: "Calculated campaigns designed around cost-per-lead optimization and scale." },
                  { title: "Long-Term Partnership", desc: "Ongoing optimization, regular design help, updates, and collaborative growth." }
                ].map((item, i) => (
                  <div key={i} className={`p-5 rounded-2xl border transition-all ${
                    isDarkMode ? 'bg-[#151515] border-white/5 hover:bg-white/5' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
                  }`}>
                    <div className="w-8 h-8 rounded-full bg-[#FF4FA3]/10 text-[#FF4FA3] flex items-center justify-center mb-3">
                      <Check size={14} className="font-extrabold" />
                    </div>
                    <h4 className="font-bold text-sm mb-1 tracking-tight">{item.title}</h4>
                    <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section (Counters) */}
      <section className="relative py-24 bg-gradient-to-r from-[#FF4FA3] to-[#6C63FF] text-white overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <h3 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-2 text-white">{stats.brands}+</h3>
              <p className="text-xs uppercase tracking-widest font-black text-white/80">Brands Created</p>
            </div>
            <div>
              <h3 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-2 text-white">{stats.projects}+</h3>
              <p className="text-xs uppercase tracking-widest font-black text-white/80">Projects Completed</p>
            </div>
            <div>
              <h3 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-2 text-white">{stats.satisfaction}%</h3>
              <p className="text-xs uppercase tracking-widest font-black text-white/80">Client Satisfaction</p>
            </div>
            <div>
              <h3 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-2 text-white">{stats.services}+</h3>
              <p className="text-xs uppercase tracking-widest font-black text-white/80">Creative Services</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (Smooth Carousel) */}
      <section className={`section-padding ${isDarkMode ? 'bg-[#111111]' : 'bg-[#F8F9FB]'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[#FF4FA3] text-xs font-black uppercase tracking-widest block mb-3">Client Success</span>
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-4">What Our Clients Say</h2>
            <div className="w-16 h-1 bg-[#FF4FA3] mx-auto rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto relative px-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className={`rounded-[3rem] p-10 md:p-16 border text-center ${
                  isDarkMode ? 'bg-[#151515] border-white/5 shadow-2xl' : 'bg-white border-slate-100 shadow-xl'
                }`}
              >
                <div className="flex justify-center gap-1.5 mb-8">
                  {Array.from({ length: testimonials[activeTestimonial].stars }).map((_, sIdx) => (
                    <Star key={sIdx} size={20} className="fill-[#FF4FA3] text-[#FF4FA3]" />
                  ))}
                </div>
                <p className="text-lg md:text-2xl font-light italic mb-8 leading-relaxed">
                  "{testimonials[activeTestimonial].quote}"
                </p>
                <div className="flex flex-col items-center gap-3">
                  <img src={testimonials[activeTestimonial].avatar} alt={testimonials[activeTestimonial].name} className="w-16 h-16 rounded-full object-cover border-4 border-[#FF4FA3]/20" />
                  <div>
                    <h4 className="font-display font-bold text-base leading-tight">{testimonials[activeTestimonial].name}</h4>
                    <p className="text-xs text-[#FF4FA3] font-extrabold uppercase tracking-wider">{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider arrows */}
            <button 
              onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center border hover:bg-[#FF4FA3] hover:text-white hover:border-[#FF4FA3] transition-all"
            >
              <ArrowLeft size={18} />
            </button>
            <button 
              onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center border hover:bg-[#FF4FA3] hover:text-white hover:border-[#FF4FA3] transition-all"
            >
              <ArrowRight size={18} />
            </button>

            {/* Carousel dots */}
            <div className="flex justify-center gap-2.5 mt-8">
              {testimonials.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveTestimonial(dotIdx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${activeTestimonial === dotIdx ? 'w-8 bg-[#FF4FA3]' : 'w-2.5 bg-slate-300 dark:bg-white/20'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shop Preview (Digital Products) */}
      <section className={`section-padding ${isDarkMode ? 'bg-[#0D0D0D]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#FF4FA3] text-xs font-black uppercase tracking-widest block mb-3">Agency Resources</span>
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight leading-none">Shop Premium Brand Assets</h2>
            </div>
            <button 
              onClick={() => navigate('shop')}
              className="bg-[#FF4FA3] hover:bg-[#FF4FA3]/90 text-white font-extrabold text-xs tracking-widest uppercase px-8 py-4 rounded-full transition-all"
            >
              Visit Full Shop
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Premium Brand Kits", price: "$49.00", desc: "Timeless UI asset libraries, vector shapes, logos & typography guidelines.", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=400" },
              { name: "Sleek Canva Templates", price: "$19.00", desc: "Drag-and-drop social packs styled with gorgeous pink-dark gradients.", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400" },
              { name: "Business Proposal Guides", price: "$29.00", desc: "High-converting corporate proposals tailored to win client trust.", img: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=400" }
            ].map((prod, pIdx) => (
              <div 
                key={pIdx}
                className={`p-6 rounded-[2.5rem] border transition-all duration-300 group ${
                  isDarkMode ? 'bg-[#151515] border-white/5 hover:bg-[#1C1C1C]' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
                }`}
              >
                <div className="aspect-video rounded-2xl overflow-hidden mb-6 relative">
                  <img src={prod.img} alt={prod.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute top-4 right-4 bg-[#FF4FA3] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">{prod.price}</span>
                </div>
                <h4 className="text-xl font-display font-bold mb-2">{prod.name}</h4>
                <p className={`text-xs mb-6 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}>{prod.desc}</p>
                <button 
                  onClick={() => navigate('shop')}
                  className="w-full py-3 text-xs font-black uppercase tracking-widest border border-[#FF4FA3] text-[#FF4FA3] rounded-full hover:bg-[#FF4FA3] hover:text-white transition-colors"
                >
                  Buy Template
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Section (Editorial Preview) */}
      <section className={`section-padding ${isDarkMode ? 'bg-[#111111]' : 'bg-[#F8F9FB]'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#FF4FA3] text-xs font-black uppercase tracking-widest block mb-3">Creative Journalism</span>
              <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight">Latest Insights</h2>
            </div>
            <button 
              onClick={() => navigate('insights')}
              className="group flex items-center gap-2 font-extrabold text-sm uppercase tracking-widest hover:text-[#FF4FA3] transition-colors"
            >
              View All Articles <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "Ten Essential Branding Tips for Kampala Startups", cat: "Branding Tips", read: "5 min read", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400" },
              { title: "How Global Marketing Trends are Shifting in 2026", cat: "Marketing Trends", read: "8 min read", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400" },
              { title: "Bespoke Website Advice: Improving UX Under 3 Seconds", cat: "Website Advice", read: "6 min read", img: "https://images.unsplash.com/photo-1581291518137-450a1482ed2c?auto=format&fit=crop&q=80&w=400" },
              { title: "Ultimate Local SEO Guides: How to Rank Fast in Uganda", cat: "SEO Guides", read: "10 min read", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400" }
            ].map((art, aIdx) => (
              <div 
                key={aIdx} 
                onClick={() => navigate('insights')}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-5 relative">
                  <img src={art.img} alt={art.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest text-[#FF4FA3] mb-2">
                  <span>{art.cat}</span>
                  <span className={isDarkMode ? 'text-white/40' : 'text-black/40'}>{art.read}</span>
                </div>
                <h4 className="font-display font-extrabold text-base line-clamp-2 leading-snug group-hover:text-[#FF4FA3] transition-colors">{art.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action (Large Card with Glowing Blobs) */}
      <section className={`section-padding relative overflow-hidden ${isDarkMode ? 'bg-[#0D0D0D]' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="bg-gradient-to-r from-[#FF4FA3] via-[#6C63FF] to-[#3B82F6] rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
            {/* Background floating overlay */}
            <div className="absolute inset-0 bg-black/15 mix-blend-overlay" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -top-24 -right-24 w-96 h-96 bg-[#FF4FA3] rounded-full blur-[100px] opacity-35"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#6C63FF] rounded-full blur-[100px] opacity-35"
            />

            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <h2 className="text-4xl md:text-7xl font-display font-black tracking-tight leading-none mb-6">
                Ready to Build a Brand <br/>
                <span className="italic font-serif">That Stands Out?</span>
              </h2>
              <p className="text-lg md:text-xl text-white/80 font-light mb-12 max-w-2xl leading-relaxed">
                Empower your business with strategic branding, elegant layouts, and high-performance websites that leave a lasting digital footprint.
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                <button 
                  onClick={() => navigate('contact')}
                  className="bg-white hover:bg-slate-100 text-[#0D0D0D] font-extrabold text-xs tracking-widest uppercase px-10 py-5 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl"
                >
                  Book Discovery Call
                </button>
                <button 
                  onClick={() => navigate('contact')}
                  className="border-2 border-white/30 hover:border-white hover:bg-white/10 text-white font-extrabold text-xs tracking-widest uppercase px-10 py-5 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Get a Free Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function AboutView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="section-padding pt-32"
    >
      <div className="max-w-4xl mx-auto text-center mb-24">
         <h1 className="text-6xl md:text-8xl font-display font-extrabold mb-8 tracking-tighter">The <span className="text-primary italic">Soul</span> Behind Sozy.</h1>
         <p className="text-2xl text-dark/60 leading-relaxed font-light italic">
           Transforming digital landscapes through bold creativity and human-centered design.
         </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 mb-32 items-center">
         <div>
            <h2 className="text-4xl font-display font-bold mb-6">Our DNA</h2>
            <p className="text-lg text-dark/70 mb-8 leading-relaxed">
              Sozy Impressions was founded as a creative rebellion against the generic. We believe that every business, regardless of size, deserves a brand that pulses with personality and screams quality.
            </p>
            <div className="space-y-8">
               <div className="flex gap-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0 text-accent">
                     <Target size={24} />
                  </div>
                  <div>
                     <h4 className="font-bold text-xl mb-2">Our Mission</h4>
                     <p className="text-dark/60">To empower startups and established businesses with visual identities that are not only beautiful but strategically sound.</p>
                  </div>
               </div>
               <div className="flex gap-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 text-primary">
                     <Eye size={24} />
                  </div>
                  <div>
                     <h4 className="font-bold text-xl mb-2">Our Vision</h4>
                     <p className="text-dark/60">To be the global benchmark for creative excellence and digital innovation for brands that dare to be different.</p>
                  </div>
               </div>
            </div>
         </div>
         <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400" className="rounded-3xl h-64 w-full object-cover shadow-xl" />
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400" className="rounded-3xl h-64 w-full object-cover translate-y-8  shadow-xl" />
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400" className="rounded-3xl h-64 w-full object-cover -translate-y-8  shadow-xl" />
            <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400" className="rounded-3xl h-64 w-full object-cover  shadow-xl" />
         </div>
      </div>

      <div className="bg-slate-50 rounded-[4rem] p-20 text-center max-w-7xl mx-auto shadow-sm">
         <h2 className="text-4xl font-display font-bold mb-12">Why Choose Us?</h2>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { title: 'Strategic Edge', desc: 'No fluff, just results.' },
              { title: 'Bespoke Customization', desc: 'No templates ever.' },
              { title: 'Agile Process', desc: 'Speed without compromise.' },
              { title: 'Obsessed with Quality', desc: 'Detail is our religion.' },
            ].map((item, i) => (
              <div key={i} className="group">
                 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md shadow-slate-200 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Award size={32} />
                 </div>
                 <h4 className="font-display font-bold text-xl mb-2">{item.title}</h4>
                 <p className="text-dark/60 italic">{item.desc}</p>
              </div>
            ))}
         </div>
      </div>
    </motion.div>
  );
}

function ServicesView({ navigate }: { navigate: (v: View, serviceId?: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24"
    >
      <div className="section-padding pt-32">
        <div className="max-w-4xl mx-auto text-center mb-24">
           <h1 className="text-6xl md:text-7xl font-display font-extrabold mb-8 tracking-tighter">Tools of <span className="text-accent underline decoration-primary underline-offset-8">Innovation.</span></h1>
           <p className="text-2xl text-dark/60 leading-relaxed font-light">
             We provide end-to-end creative solutions that bridge the gap between imagination and execution.
           </p>
        </div>

        <div className="max-w-7xl mx-auto space-y-32">
           {SERVICES.map((service, i) => (
              <div key={service.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                 <motion.div
                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                 >
                    <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center text-primary mb-10 shadow-lg shadow-primary/5">
                       {service.icon}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 tracking-tight">{service.title}</h2>
                    <p className="text-xl text-dark/70 mb-10 leading-relaxed">{service.description}</p>
                    <div className="space-y-4 mb-10">
                       {service.benefits.slice(0, 3).map((benefit, j) => (
                          <div key={j} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-accent transition-colors cursor-default">
                             <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center shadow-sm">
                                <Check size={18} />
                             </div>
                             <span className="font-semibold text-dark/80">{benefit}</span>
                          </div>
                       ))}
                    </div>
                    <button 
                      onClick={() => navigate('service-detail', service.id)}
                      className="btn-accent px-10 py-4 text-lg"
                    >
                      Discover More
                    </button>
                 </motion.div>
                 <div className={`relative ${i % 2 === 1 ? 'lg:order-first' : ''}`}>
                    <div className="aspect-video bg-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl">
                       <img 
                         src={`https://images.unsplash.com/photo-${[
                           '1618005182384-a83a8bd57fbe', '1561070791-2526d30994b5', '1611162617474-5b21e879e113',
                           '1460925895917-afdab827c52f', '1492724441997-5dc865305da7', '1586717791821-3f44a563eb4c'
                         ][i]}?auto=format&fit=crop&q=80&w=800`} 
                         alt={service.title} 
                         className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                       />
                    </div>
                    <div className="absolute -top-10 -left-10 w-40 h-40 border-l-4 border-t-4 border-primary/20 rounded-tl-[3rem] hidden lg:block"></div>
                 </div>
              </div>
           ))}
        </div>
      </div>

      {/* Services Footer CTA */}
      <section className="section-padding bg-slate-50 mt-20">
         <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold mb-6">Not sure what you need?</h2>
            <p className="text-xl text-dark/60 mb-10">We’re experts at finding the perfect creative fit for any vision. Let’s have a chat and build your plan.</p>
            <button onClick={() => navigate('contact')} className="btn-primary px-12 py-5 text-xl">Let’s Talk</button>
         </div>
      </section>
    </motion.div>
  );
}

function ServiceDetailView({ serviceId, navigate }: { serviceId: string | null, navigate: (v: View) => void }) {
  const service = SERVICES.find(s => s.id === serviceId);
  if (!service) return null;

  if (serviceId === 'branding') {
    return <BrandingDetailView navigate={navigate} />;
  }

  if (serviceId === 'web-design') {
    return <WebsiteDetailView navigate={navigate} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pb-24"
    >
      {/* Service Detail Hero */}
      <section className="bg-dark text-white pt-40 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <button 
            onClick={() => navigate('services')}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={20} /> Back to Services
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-8 border border-primary/20">
                {service.icon}
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-8 tracking-tighter">{service.title}</h1>
              <p className="text-2xl text-white/70 leading-relaxed font-light mb-10">
                {service.fullDescription}
              </p>
              <button onClick={() => navigate('contact')} className="btn-accent px-12 py-5 text-xl font-bold">Request This Service</button>
            </div>
            <div className="relative">
              <div className="aspect-square bg-slate-800 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative z-10">
                <img 
                  src={`https://images.unsplash.com/photo-${[
                    '1618005182384-a83a8bd57fbe', '1561070791-2526d30994b5', '1611162617474-5b21e879e113',
                    '1460925895917-afdab827c52f', '1492724441997-5dc865305da7', '1586717791821-3f44a563eb4c'
                  ][SERVICES.indexOf(service)]}?auto=format&fit=crop&q=80&w=800`} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Breakdown */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              <h2 className="text-3xl font-display font-bold mb-10 flex items-center gap-4">
                <div className="w-2 h-10 bg-primary rounded-full"></div>
                What's Included
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {['Direct Strategy Consultations', 'Custom Creative Execution', 'Multiple Revisions', 'Delivery in All Formats', 'Post-Launch Support'].map((item, i) => (
                  <div key={i} className="flex gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100 items-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                      <Check size={20} />
                    </div>
                    <span className="font-bold text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold mb-10 flex items-center gap-4">
                 <div className="w-2 h-10 bg-accent rounded-full"></div>
                 Key Benefits
              </h2>
              <div className="space-y-8">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="group">
                    <h4 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{benefit}</h4>
                    <p className="text-dark/60 leading-relaxed italic">Expertly crafted solution to ensure your brand reaches its full potential in the digital space.</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Detail CTA */}
      <section className="section-padding bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-display font-bold mb-8 italic">Ready to transform your brand with <span className="text-primary">{service.title}?</span></h2>
          <p className="text-xl text-white/60 mb-12">Join 150+ successful brands that chose Sozy Impressions for creative excellence.</p>
          <button onClick={() => navigate('contact')} className="btn-primary bg-white text-dark hover:bg-primary hover:text-white px-12 py-5 text-xl">Get a Custom Quote</button>
        </div>
      </section>
    </motion.div>
  );
}

function ShopView({ addToCart }: { addToCart: (p: any) => void }) {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Apparel', 'Accessories', 'Digital'];

  const filteredProducts = filter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24"
    >
       {/* Shop Hero */}
       <section className="h-[60vh] bg-dark relative flex items-center justify-center overflow-hidden">
          <img src={SHOP_IMAGE} alt="Shop" className="absolute inset-0 w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
          <div className="relative z-10 text-center text-white px-6">
             <motion.span 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-accent uppercase font-bold tracking-[0.3em] text-sm mb-4 block"
             >
               Wear the Creative Pulse
             </motion.span>
             <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-6xl md:text-8xl font-display font-extrabold mb-8"
             >
               Sozy <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Merch</span> Drop.
             </motion.h1>
             <div className="p-1 px-4 bg-white/10 backdrop-blur-md rounded-full inline-block border border-white/20">
                <p className="text-sm">Limited Edition: "Creative Rebellion" Series</p>
             </div>
          </div>
       </section>

       {/* Shop Main */}
       <div className="section-padding max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
             <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0 w-full md:w-auto no-scrollbar">
                {categories.map(cat => (
                   <button
                     key={cat}
                     onClick={() => setFilter(cat)}
                     className={`px-8 py-3 rounded-full font-bold transition-all whitespace-nowrap ${filter === cat ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' : 'bg-slate-100 text-dark/60 hover:bg-slate-200'}`}
                   >
                      {cat}
                   </button>
                ))}
             </div>
             <div className="relative w-full md:w-72">
                <input type="text" placeholder="Search products..." className="w-full bg-slate-50 border border-slate-200 rounded-full py-4 pl-12 pr-6 focus:outline-none focus:border-accent" />
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
             {filteredProducts.map((product) => (
                <motion.div 
                   key={product.id}
                   layout
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.3 }}
                   className="group"
                >
                   <div className="aspect-[3/4] bg-slate-100 rounded-[2.5rem] overflow-hidden relative mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-700 border border-slate-200/50">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end p-8">
                         <button 
                           onClick={() => addToCart(product)}
                           className="w-full bg-white text-dark py-5 px-8 rounded-2xl transform translate-y-10 group-hover:translate-y-0 transition-all font-bold flex items-center justify-center gap-2 hover:bg-accent hover:text-white shadow-xl"
                         >
                            <ShoppingCart size={20} /> Add to Bag
                         </button>
                      </div>
                      <div className="absolute top-6 left-6">
                        <span className="bg-white/90 backdrop-blur-md text-dark text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                          {product.category}
                        </span>
                      </div>
                   </div>
                   <div className="px-2">
                      <h3 className="text-2xl font-display font-bold group-hover:text-primary transition-colors cursor-pointer mb-2">{product.name}</h3>
                      <div className="flex justify-between items-center">
                         <span className="text-2xl font-display font-bold text-accent">${product.price.toFixed(2)}</span>
                         <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} className="fill-accent text-accent" />)}
                         </div>
                      </div>
                      <p className="text-dark/40 mt-4 leading-relaxed line-clamp-2 italic text-sm">{product.description}</p>
                   </div>
                </motion.div>
             ))}
          </div>

          <div className="mt-20 p-12 bg-dark rounded-[3rem] text-center text-white relative overflow-hidden">
             <div className="absolute left-0 bottom-0 p-10 opacity-5 rotate-12">
                <Shirt size={200} />
             </div>
             <div className="relative z-10">
                <h2 className="text-4xl font-display font-bold mb-6 italic">Support the <span className="text-accent underline">Creative Rebellion</span></h2>
                <p className="text-white/60 mb-10 max-w-lg mx-auto leading-relaxed">
                   Tag us <span className="text-white font-bold">@SozyImpressions</span> on Instagram showing off your new gear for a chance to be featured and win a creative toolkit.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                   <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 px-6 rounded-2xl">
                      <Truck className="text-accent" />
                      <span className="font-bold">Fast Delivery</span>
                   </div>
                   <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 px-6 rounded-2xl">
                      <ShieldCheck className="text-accent" />
                      <span className="font-bold">Secure Checkout</span>
                   </div>
                   <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 px-6 rounded-2xl">
                      <Zap className="text-accent" />
                      <span className="font-bold">Premium Quality</span>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </motion.div>
  );
}

function BrandingDetailView({ navigate }: { navigate: (v: View) => void }) {
  const categories = [
    {
      title: "Print Marketing Materials",
      icon: <Printer size={32} />,
      items: ["Flyers (single-page, double-sided)", "Posters (A3, A2, A1, large format)", "Brochures (bi-fold, tri-fold, multi-page)"],
      description: "Professionally designed print materials that communicate your brand message clearly, attract attention, and drive action — perfect for campaigns, promotions, and corporate communication.",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Outdoor & Large-Format Branding",
      icon: <Flag size={32} />,
      items: ["Roll-up & pull-up banners", "Tear drop banners & X-banners", "Street banners", "Billboards (static & digital)", "Wall branding & murals", "Window branding & glass stickers"],
      description: "High-impact outdoor branding that ensures your business is seen, remembered, and trusted — even from a distance.",
      image: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Vehicle Branding & Wrapping",
      icon: <Car size={32} />,
      items: ["Full vehicle wrapping", "Partial vehicle wrapping", "Vehicle decals & stickers", "Fleet branding (cars, vans, trucks, bikes)"],
      description: "Turn your vehicles into moving billboards that promote your brand everywhere you go — professionally, boldly, and consistently.",
      image: "https://images.unsplash.com/photo-1621360841013-c7683c659ec6?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Event Branding & Activation",
      icon: <Sparkles size={32} />,
      items: ["Event posters & flyers", "Stage backdrops", "Step-and-repeat banners", "Event signage & wayfinding", "Booth & exhibition stand branding", "Pop-up display branding", "Event passes, wristbands & badges"],
      description: "Create unforgettable brand experiences at events through cohesive, visually striking branding that commands attention.",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Retail & In-Store Branding",
      icon: <ShoppingBag size={32} />,
      items: ["Point-of-sale (POS) displays", "Shelf talkers & wobblers", "Price tags & promotional labels", "In-store posters & signage", "Counter displays"],
      description: "Strategic retail branding designed to influence buying decisions and increase customer engagement at the point of sale.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Corporate Promotional Items & Engravings",
      icon: <Gift size={32} />,
      items: ["Branded T-shirts & uniforms", "Caps & hats", "Mugs, thermos flasks & bottles", "Notebooks & diaries", "Pens & office merchandise", "Gift boxes & hampers", "Custom engravings (metal, glass, wood, plastic)"],
      description: "Premium branded merchandise that strengthens brand recall, loyalty, and corporate identity.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Brand Guidelines & Identity Systems",
      icon: <ShieldCheck size={32} />,
      items: ["Logo usage rules", "Color palette specifications", "Typography systems", "Brand voice & tone", "Visual identity rules", "Digital & print consistency standards"],
      description: "We create comprehensive brand guidelines that ensure your brand remains consistent, professional, and recognizable across all platforms and materials.",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const marketingCategories = categories.filter(c => c.title !== "Brand Guidelines & Identity Systems");
  const brandGuidelines = categories.find(c => c.title === "Brand Guidelines & Identity Systems");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen"
    >
      {/* Hero Area */}
      <section className="relative pt-40 pb-24 bg-dark text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000" 
            alt="Corporate background" 
            className="w-full h-full object-cover grayscale"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <button 
              onClick={() => navigate('services')}
              className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-12 transition-colors group"
            >
              <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" /> Back to Services
            </button>
            <h1 className="text-5xl md:text-8xl font-display font-extrabold mb-8 tracking-tighter leading-tight">
              Branding & Identity <br/> 
              <span className="text-secondary italic font-light">Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
              We help brands stand out, connect, and dominate their market through powerful visual identity, strategic branding, and high-impact promotional materials.
            </p>
            <button 
              onClick={() => navigate('contact')}
              className="btn-accent px-12 py-5 text-xl font-bold shadow-[0_0_30px_rgba(255,20,147,0.3)] hover:shadow-[0_0_50px_rgba(255,20,147,0.5)] transition-all"
            >
              Request This Service
            </button>
          </motion.div>
        </div>
      </section>

      {/* Marketing & Promotional Branding Services */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-dark tracking-tighter">Marketing & Promotional Branding</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {marketingCategories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col"
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={cat.image} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-8 text-white flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                      {cat.icon}
                    </div>
                    <h3 className="text-2xl font-display font-bold">{cat.title}</h3>
                  </div>
                </div>
                <div className="p-10 flex-grow">
                  <p className="text-dark/70 mb-8 leading-relaxed italic border-l-4 border-primary/20 pl-6">
                    {cat.description}
                  </p>
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">Includes:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {cat.items.map((item, j) => (
                        <div key={j} className="flex items-center gap-3 text-sm font-medium text-dark/60">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Guidelines & Identity Systems (FEATURED SECTION) */}
      {brandGuidelines && (
        <section className="section-padding bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-green-200">New Service</span>
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 text-dark tracking-tighter">Brand Guidelines & <span className="text-primary italic">Identity Systems</span></h2>
                <p className="text-xl text-dark/70 mb-10 leading-relaxed italic">
                  {brandGuidelines.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {brandGuidelines.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm">
                      <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                        <Check size={16} />
                      </div>
                      <span className="font-bold text-dark/80 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                   <img src={brandGuidelines.image} alt="Brand Guidelines" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary rounded-full blur-[100px] opacity-20"></div>
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent rounded-full blur-[100px] opacity-20"></div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Section */}
      <section className="section-padding bg-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-[100px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-10 tracking-tighter">Why Choose <br/><span className="text-primary italic">Sozy Impressions?</span></h2>
              <p className="text-xl text-white/60 mb-12 font-light">Experience the perfect blend of strategy and creativity that sets your brand apart in a competitive landscape.</p>
              
              <div className="space-y-8">
                {[
                  { title: "Strategic branding approach", desc: "Every design choice is rooted in your business goals and market positioning." },
                  { title: "Premium-quality design & production", desc: "We use top-tier materials and cutting-edge software for flawless output." },
                  { title: "Attention to detail", desc: "From pixel-perfect alignment to high-fidelity printing—we never miss a beat." },
                  { title: "Consistent brand storytelling", desc: "Ensure your message is clear and powerful across all touchpoints." },
                  { title: "Trusted by growing and established brands", desc: "Our track record speaks for itself." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                      <UserCheck className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 transition-colors group-hover:text-primary">{item.title}</h4>
                      <p className="text-white/40">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 scale-110 translate-x-10">
              <div className="space-y-6 pt-12">
                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0" className="rounded-3xl shadow-2xl h-80 w-full object-cover" />
                <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174" className="rounded-3xl shadow-2xl h-60 w-full object-cover" />
              </div>
              <div className="space-y-6">
                <img src="https://images.unsplash.com/photo-1551434678-e076c223a692" className="rounded-3xl shadow-2xl h-60 w-full object-cover" />
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" className="rounded-3xl shadow-2xl h-80 w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-primary text-white text-center relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/20 rounded-full"></div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-7xl font-display font-extrabold mb-8 tracking-tighter italic">Ready to elevate your <span className="text-accent">brand presence?</span></h2>
          <p className="text-xl text-white/80 mb-12">Our team of experts is ready to transform your vision into an iconic brand identity.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <button 
              onClick={() => navigate('contact')}
              className="btn-accent bg-white text-primary hover:bg-white/90 py-5 px-10 text-xl font-bold flex items-center gap-3"
            >
              Request This Service <ArrowRight />
            </button>
            <button 
              onClick={() => navigate('contact')}
              className="btn-accent border-2 border-white bg-transparent hover:bg-white hover:text-primary py-5 px-10 text-xl font-bold"
            >
              Talk to a Branding Expert
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function WebsiteDetailView({ navigate }: { navigate: (v: View) => void }) {
  const categories = [
    {
      title: "Custom Website Design",
      icon: <Smartphone size={32} />,
      items: ["Custom UI/UX design", "Brand-aligned layouts", "Mobile-first responsive design", "User experience optimization"],
      description: "We design visually stunning, intuitive websites tailored to your brand identity and audience — ensuring clarity, trust, and engagement.",
      image: "https://images.unsplash.com/photo-1581291518137-450a1482ed2c?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Business & Corporate Websites",
      icon: <Briefcase size={32} />,
      items: ["Company profile websites", "Institutional & NGO websites", "Portfolio & service websites", "Professional landing pages"],
      description: "Professional websites built to establish credibility, communicate value, and convert visitors into clients.",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "CMS Website Development",
      icon: <Server size={32} />,
      items: ["WordPress development", "Easy content management", "Secure admin dashboards", "Scalable architecture"],
      description: "Powerful, flexible CMS websites that allow you to manage content easily without technical complexity.",
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "E-Commerce Website Development",
      icon: <ShoppingCart size={32} />,
      items: ["Online stores & product catalogs", "Secure payment integrations", "Mobile money, cards & PayPal", "Inventory & order management"],
      description: "Conversion-optimized e-commerce websites that make selling online seamless, secure, and scalable.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Web Applications & Portals",
      icon: <Code size={32} />,
      items: ["Custom dashboards", "Client portals", "Booking & management systems", "API integrations"],
      description: "Custom-built web solutions designed to automate operations and enhance user interaction.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const optimization = {
    title: "Website Performance & Optimization",
    icon: <Megaphone size={48} />,
    items: ["Speed optimization", "SEO-friendly structure", "Security & SSL setup", "Performance testing"],
    description: "We optimize websites for speed, visibility, and security to ensure maximum performance and search engine ranking.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  };

  const maintenance = {
    title: "Website Maintenance & Support",
    icon: <Settings size={48} />,
    items: ["Website updates", "Security monitoring", "Content updates", "Technical support"],
    description: "Reliable ongoing support to keep your website updated, secure, and performing at its best.",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen"
    >
      {/* Hero Area */}
      <section className="relative pt-40 pb-24 bg-dark text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000" 
            alt="Digital workspace" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/60 to-dark"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <button 
              onClick={() => navigate('services')}
              className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-12 transition-colors group"
            >
              <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" /> Back to Services
            </button>
            <h1 className="text-5xl md:text-8xl font-display font-extrabold mb-8 tracking-tighter leading-tight">
              Website Design & <br/> 
              <span className="text-primary italic">Development</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-12 font-light leading-relaxed">
              We design and build fast, secure, and visually compelling websites that elevate brands, attract customers, and drive real business growth.
            </p>
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={() => navigate('contact')}
                className="btn-accent px-10 py-5 text-lg font-bold shadow-lg transition-all"
              >
                Request This Service
              </button>
              <button 
                onClick={() => navigate('contact')}
                className="px-10 py-5 text-lg font-bold border-2 border-white/20 hover:border-white transition-all rounded-xl"
              >
                Talk to a Web Expert
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Website Design Services */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-dark tracking-tighter">Website Design <span className="text-primary">&</span> Development</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col"
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={cat.image} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-8 text-white flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                      {cat.icon}
                    </div>
                    <h3 className="text-2xl font-display font-bold">{cat.title}</h3>
                  </div>
                </div>
                <div className="p-10 flex-grow">
                  <p className="text-dark/70 mb-8 leading-relaxed italic border-l-4 border-primary/20 pl-6">
                    {cat.description}
                  </p>
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">Includes:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {cat.items.map((item, j) => (
                        <div key={j} className="flex items-center gap-3 text-sm font-medium text-dark/60">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Optimization Section */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mb-10 border border-primary/20">
                {optimization.icon}
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 text-dark tracking-tighter">{optimization.title}</h2>
              <p className="text-xl text-dark/70 mb-10 leading-relaxed">
                {optimization.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {optimization.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="w-8 h-8 bg-accent/10 text-accent rounded-full flex items-center justify-center shrink-0">
                      <Check size={16} />
                    </div>
                    <span className="font-bold text-dark/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-8 border-white">
                 <img src={optimization.image} alt="Optimization" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-10"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent rounded-full blur-[100px] opacity-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Maintenance Section */}
      <section className="section-padding bg-slate-50">
         <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="bg-dark rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 skew-x-12 translate-x-1/4"></div>
               <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <div className="w-20 h-20 bg-white/10 text-white rounded-3xl flex items-center justify-center mb-10 border border-white/20 backdrop-blur-md">
                      {maintenance.icon}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 tracking-tighter">{maintenance.title}</h2>
                    <p className="text-xl text-white/50 mb-10 leading-relaxed font-light">
                      {maintenance.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                       {maintenance.items.map((item, i) => (
                         <span key={i} className="px-6 py-3 bg-white/5 rounded-full border border-white/10 text-sm font-medium">
                           {item}
                         </span>
                       ))}
                    </div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] space-y-8">
                     <h3 className="text-2xl font-bold mb-4">Why Choose Sozy Impressions?</h3>
                     {[
                       { title: "Strategy-driven web design", desc: "We focus on your business goals first." },
                       { title: "Premium visual standards", desc: "Your site will look like it cost 10x more." },
                       { title: "Clean, scalable code", desc: "Built to last and grow with your business." },
                       { title: "Business-focused approach", desc: "Conversion is our middle name." }
                     ].map((item, i) => (
                       <div key={i} className="flex gap-4">
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                            <Check size={12} />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg">{item.title}</h4>
                            <p className="text-white/40 text-sm">{item.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-7xl font-display font-extrabold mb-8 tracking-tighter text-dark leading-tight">Let’s build a website that <br/><span className="text-primary italic">works for your business.</span></h2>
          <p className="text-xl text-dark/60 mb-12">Our team of experts is ready to transform your digital presence into a growth engine.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <button 
              onClick={() => navigate('contact')}
              className="btn-primary py-5 px-10 text-xl font-bold flex items-center gap-3 transition-transform hover:scale-105"
            >
              Request This Service <ArrowRight />
            </button>
            <button 
              onClick={() => navigate('contact')}
              className="px-10 py-5 text-xl font-bold border-2 border-dark/10 hover:border-dark transition-all rounded-xl"
            >
              Talk to a Web Expert
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function InsightsView({ navigate }: { navigate: (v: View) => void }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  const articles = [
    {
      id: "art1",
      title: "Ten Essential Branding Tips for Kampala Startups",
      category: "Branding",
      date: "May 12, 2026",
      readTime: "5 min read",
      author: "Marvin Sozy",
      img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
      excerpt: "Building a brand in Kampala's dynamic marketplace requires more than a beautiful logo. Here are 10 actionable tactics to secure user trust and win market share.",
      content: `### 1. Know Your Target Kampala Consumer
Kampala has a unique consumer demographic—highly youthful, mobile-first, and highly community-driven. Understand whether your product speaks to the corporate class of Nakasero or the bustling traders of Kikuubo.

### 2. Formulate a Distinct Value Proposition
Don't copy competitors. If you are launching a food startup, what makes you unique? Is it faster delivery or local organic sourcing?

### 3. Craft an Unforgettable Logo & Visual System
Your logo is the handshake of your business. Ensure it scales beautifully on mobile screens, physical stickers, banners, and t-shirts. Keep your color scheme to 2-3 primary premium colors.

### 4. Tell an Authentic Local Story
Our communities resonate with stories. Share the 'why' behind your startup. Let them see the humans building the solution.

### 5. Prioritize Trust and Consistency
From your social media posts to your delivery packaging, ensure the brand aesthetic is consistently high quality. A premium appearance justifies premium pricing.

### 6. Leverage Tangible Branding (Merchandise)
Kampala loves high-quality custom merchandise. Branded t-shirts, hoodies, and tote bags act as floating billboards for your business.

### 7. Optimize for Mobile & Offline Payments
Ensure your brand is associated with seamless, modern transactional experiences. Support Mobile Money (MTN & Airtel) alongside standard cards.

### 8. Build a Localized Content Engine
Produce video snippets, client reels, and local photography. Raw, high-definition local content converts 5x better than generic stock images.

### 9. Establish a Premium Digital Storefront
A custom website increases startup credibility tenfold compared to just a WhatsApp Business or Instagram account.

### 10. Partner for Long-Term Brand Strategy
Don't treat branding as a one-off expense. Partner with creative professionals to regularly audit your brand's growth and scale systematically.`
    },
    {
      id: "art2",
      title: "How Global Marketing Trends are Shifting in 2026",
      category: "Marketing",
      date: "June 24, 2026",
      readTime: "8 min read",
      author: "Sarah Namata",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
      excerpt: "From short-form immersive video campaigns to hyper-personalized AI content flows, explore the major shifts in digital marketing for the year.",
      content: `### The Rise of Immersive Video Content
Consumers no longer watch standard banner ads. Engagement has completely shifted to organic storytelling, behind-the-scenes vlogs, and conversational reels that feel authentic.

### Interactive Brand Playgrounds
Modern marketing uses gamification, dynamic digital assets, and interactive product wizards to involve the consumer in the brand journey.

### Authentic Localized Copywriting
In 2026, clinical, overly polished corporate copywriting is out. Human, community-focused, and highly empathetic local copywriting is in.`
    },
    {
      id: "art3",
      title: "Bespoke Website Advice: Improving UX Under 3 Seconds",
      category: "Web Design",
      date: "April 18, 2026",
      readTime: "6 min read",
      author: "Derrick Mukasa",
      img: "https://images.unsplash.com/photo-1581291518137-450a1482ed2c?auto=format&fit=crop&q=80&w=1200",
      excerpt: "Every extra second your website takes to load cost you 20% in customer retention. Discover the framework to make your web apps lightning fast.",
      content: `### Speed is the Ultimate Conversion Metric
If your e-commerce site takes longer than 3 seconds to load, 40% of your visitors will return to Google. Speed directly controls your bottom line.

### Core Web Vitals to Optimize
Focus on Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS). Compress all high-definition hero images, lazy load non-critical resources, and bundle files into single-request chunks.

### Mobile-First Layout Precision
Over 80% of East African web traffic is on mobile. If your desktop navigation is glorious but your mobile layout feels squished, you are throwing away lead opportunities.`
    },
    {
      id: "art4",
      title: "Ultimate Local SEO Guides: How to Rank Fast in Uganda",
      category: "SEO Guides",
      date: "March 05, 2026",
      readTime: "10 min read",
      author: "Allan Sseba",
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
      excerpt: "Master local search engine optimization. Claim Google Business profiles, target high-intent Uganda keywords, and generate authoritative local links.",
      content: `### Claim Your Google Business Profile
Ensure your physical address, operating hours, and phone numbers are identical across your website, maps, and social profiles. Encourage satisfied clients to write keyword-rich reviews.

### Keyword Targeting for Local Buyers
Optimize for high-intent queries. Instead of trying to rank for generic 'web designers', target localized phrases like 'website design Uganda' or 'branding agency Kampala'.

### High-Authority Local Backlinks
Earn links from Ugandan news portals, business listings, and regional partner companies to build immense domain authority.`
    }
  ];

  const categories = ["All", "Branding", "Marketing", "Web Design", "SEO Guides"];

  const filteredArticles = activeCategory === "All"
    ? articles
    : articles.filter(art => art.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 md:px-12 py-16"
    >
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[#FF4FA3] text-xs font-black uppercase tracking-widest block mb-3">Creative Journalism</span>
        <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-6">Sozy Insights</h1>
        <p className="text-lg font-light leading-relaxed text-slate-500 dark:text-white/60">
          Thought leadership, expert frameworks, design philosophies, and practical advice to help scale your business in Nakasero, Kampala, and across the globe.
        </p>
      </div>

      {/* Categories Bar */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeCategory === cat
                ? "bg-[#FF4FA3] text-white shadow-md shadow-[#FF4FA3]/20"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {filteredArticles.map((art) => (
          <motion.div
            layout
            key={art.id}
            whileHover={{ y: -8 }}
            onClick={() => setSelectedArticle(art)}
            className="group cursor-pointer rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 p-6 flex flex-col justify-between h-[540px] transition-all hover:shadow-2xl hover:border-[#FF4FA3]/25 dark:hover:border-[#FF4FA3]/25"
          >
            <div className="aspect-video rounded-2xl overflow-hidden mb-6 relative">
              <img src={art.img} alt={art.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute top-4 left-4 bg-white/95 dark:bg-[#0D0D0D]/95 text-xs font-bold px-4 py-2 rounded-full shadow-sm">
                {art.category}
              </span>
            </div>

            <div className="flex-grow flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-white/40 mb-3">
                  <span>{art.date}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>
                <h3 className="text-2xl font-display font-black tracking-tight leading-snug group-hover:text-[#FF4FA3] transition-colors mb-4 line-clamp-2">
                  {art.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-500 dark:text-white/50 line-clamp-3">
                  {art.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FF4FA3]/15 text-[#FF4FA3] flex items-center justify-center font-black text-xs font-display">
                    {art.author[0]}
                  </div>
                  <span className="text-xs font-bold">{art.author}</span>
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-[#FF4FA3] flex items-center gap-1.5 group-hover:underline">
                  Read Article <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Newsletter Box */}
      <div className="mt-24 bg-gradient-to-r from-[#FF4FA3] via-[#6C63FF] to-[#3B82F6] rounded-[3.5rem] p-12 md:p-20 text-white text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-black/15 mix-blend-overlay" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-white/80 text-[10px] font-black uppercase tracking-widest mb-3 block">Subscribe to insights</span>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight mb-4">Stay Ahead of Your Competition</h2>
          <p className="text-sm font-light text-white/80 mb-8">
            Get monthly design blueprints, brand guidelines, e-commerce reports, and conversion hacks delivered straight to your inbox. No spam.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); alert("Successfully subscribed to Sozy Insights!"); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your professional email"
              required
              className="flex-grow bg-white/10 border border-white/20 rounded-full py-4 px-6 text-white placeholder-white/50 outline-none focus:border-white transition-colors text-xs"
            />
            <button
              type="submit"
              className="bg-white hover:bg-slate-100 text-[#0D0D0D] font-extrabold text-xs tracking-widest uppercase px-8 py-4 rounded-full transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Reader Modal Overlay */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0D0D0D]/90 backdrop-blur-xl overflow-y-auto flex items-start justify-center pt-24 pb-12 px-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -30 }}
              className="w-full max-w-3xl rounded-[2.5rem] bg-white text-[#0D0D0D] dark:bg-[#121212] dark:text-white p-8 md:p-12 border border-slate-100 dark:border-white/10 shadow-2xl relative"
            >
              {/* Progress bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#FF4FA3]/20">
                <div className="h-full bg-[#FF4FA3] w-full animate-pulse" />
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-[10px] uppercase font-black tracking-widest text-[#FF4FA3] mb-4">
                {selectedArticle.category} • {selectedArticle.readTime}
              </div>

              <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight leading-tight mb-6">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-3 mb-10 pb-6 border-b border-slate-100 dark:border-white/10">
                <div className="w-10 h-10 rounded-full bg-[#FF4FA3]/10 text-[#FF4FA3] flex items-center justify-center font-black">
                  {selectedArticle.author[0]}
                </div>
                <div>
                  <h4 className="font-bold text-sm">{selectedArticle.author}</h4>
                  <span className="text-[10px] text-slate-400 dark:text-white/40">{selectedArticle.date}</span>
                </div>
              </div>

              {/* Cover Image */}
              <div className="aspect-[21/9] rounded-2xl overflow-hidden mb-10">
                <img src={selectedArticle.img} alt={selectedArticle.title} className="w-full h-full object-cover" />
              </div>

              {/* Markdown Render Container */}
              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-white/80 space-y-6 leading-relaxed">
                {selectedArticle.content.split("\n\n").map((chunk: string, index: number) => {
                  if (chunk.startsWith("### ")) {
                    return (
                      <h3 key={index} className="text-xl md:text-2xl font-display font-black tracking-tight text-[#0D0D0D] dark:text-white pt-6">
                        {chunk.replace("### ", "")}
                      </h3>
                    );
                  }
                  return <p key={index} className="text-sm md:text-base">{chunk}</p>;
                })}
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-1">Ready to apply this strategy?</h4>
                  <p className="text-xs text-slate-400 dark:text-white/40">Work with SozyImpressions to craft your custom blueprint.</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    navigate('contact');
                  }}
                  className="bg-[#FF4FA3] hover:bg-[#FF4FA3]/90 text-white font-extrabold text-xs tracking-widest uppercase px-6 py-4 rounded-full transition-all transform hover:scale-105"
                >
                  Request A Strategy Call
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


function PortfolioView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="section-padding pt-32"
    >
      <div className="max-w-4xl mx-auto text-center mb-24">
         <h1 className="text-6xl md:text-8xl font-display font-extrabold mb-8 tracking-tighter leading-tight text-gradient">The Portfolio.</h1>
         <p className="text-2xl text-dark/60 leading-relaxed font-light">
           Where ideas morph into visual reality. Dive into our gallery of bold executions.
         </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
         {PORTFOLIO.map((project, i) => (
            <motion.div 
               key={project.id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className={`group block overflow-hidden rounded-[3rem] relative ${i % 3 === 0 ? 'md:col-span-2' : ''}`}
            >
               <div className="aspect-video overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
               </div>
               <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity p-12 flex flex-col justify-end">
                  <span className="text-accent font-bold uppercase tracking-widest text-xs mb-2 block">{project.category}</span>
                  <h3 className="text-4xl font-display font-bold text-white mb-4 italic leading-none">{project.title}</h3>
                  <p className="text-white/80 max-w-xl text-lg mb-8">{project.description}</p>
                  <button className="flex items-center gap-3 text-white font-bold group/btn">
                     Explore Breakdown 
                     <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center transition-all group-hover/btn:bg-accent group-hover/btn:border-accent">
                        <ArrowRight size={18} />
                     </div>
                  </button>
               </div>
            </motion.div>
         ))}
      </div>
    </motion.div>
  );
}

function ContactView() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      service: formData.get('service'),
      createdAt: serverTimestamp(),
      status: 'new'
    };

    try {
      await addDoc(collection(db, 'contacts'), data);
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-40 pb-20 px-6 text-center">
         <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-slow">
            <CheckCircle2 size={48} />
         </div>
         <h2 className="text-5xl font-display font-bold mb-6">Message <span className="text-accent underline decoration-primary">Ignited!</span></h2>
         <p className="text-xl text-dark/60 mb-12 max-w-md mx-auto">We've received your concept and our creative team is already buzzing. Expect a response within 24 hours.</p>
         <button onClick={() => setSubmitted(false)} className="btn-primary">Back to Home</button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="section-padding pt-32"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
         <div>
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Get In Touch</span>
            <h1 className="text-6xl font-display font-extrabold mb-10 tracking-tighter">Ready to <span className="text-accent italic">Soar?</span></h1>
            <p className="text-2xl text-dark/60 mb-12 leading-relaxed font-light">
              We're excited to hear about your next big project. Let's build something exceptional together.
            </p>
            
            <div className="space-y-10 group">
               <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                     <Mail size={24} />
                  </div>
                  <div>
                     <p className="text-xs font-bold uppercase tracking-widest text-dark/40 mb-1">Email Us</p>
                     <p className="text-xl font-display font-bold">hello@sozyimpressions.com</p>
                  </div>
               </div>
               <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-all">
                     <Phone size={24} />
                  </div>
                  <div>
                     <p className="text-xs font-bold uppercase tracking-widest text-dark/40 mb-1">Call Us</p>
                     <p className="text-xl font-display font-bold">+1 (234) 567 890</p>
                  </div>
               </div>
               <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-primary group-hover:bg-dark group-hover:text-white transition-all">
                     <MessageCircle size={24} />
                  </div>
                  <div>
                     <p className="text-xs font-bold uppercase tracking-widest text-dark/40 mb-1">WhatsApp</p>
                     <p className="text-xl font-display font-bold">+1 (987) 654 321</p>
                  </div>
               </div>
            </div>

            <div className="mt-20 p-10 bg-slate-50 rounded-[3rem] border border-slate-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-5">
                  <Globe size={150} />
               </div>
               <h4 className="font-display font-bold text-2xl mb-4">Location</h4>
               <p className="text-dark/60 leading-relaxed italic">
                  Digital first. Physically located in the heartbeat of the Creative District. We work with visionaries across all time zones.
               </p>
            </div>
         </div>

         <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 relative shadow-primary/5">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent rounded-full flex items-center justify-center text-white rotate-12 shadow-xl">
               <PenTool size={32} />
            </div>
            <h3 className="text-3xl font-display font-bold mb-10">Brief Your Project</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-dark/50 ml-4">Full Name</label>
                     <input required name="name" type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary transition-all" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-dark/50 ml-4">Email Address</label>
                     <input required name="email" type="email" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary transition-all" />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-dark/50 ml-4">Select Service</label>
                  <select name="service" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer">
                     <option>Branding & Identity</option>
                     <option>Website Design</option>
                     <option>Graphic Design</option>
                     <option>Marketing Strategy</option>
                     <option>Merchandise Design</option>
                     <option>Other / Not Sure</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-dark/50 ml-4">Your Vision</label>
                  <textarea required name="message" rows={5} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary transition-all resize-none"></textarea>
               </div>
               <button 
                  disabled={isSubmitting}
                  type="submit" 
                  className="w-full btn-primary py-5 text-xl flex items-center justify-center gap-3 disabled:opacity-50"
               >
                  {isSubmitting ? 'Igniting...' : 'Send Concept'} <Send size={20} />
               </button>
            </form>
         </div>
      </div>
    </motion.div>
  );
}

function AdminView() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSubmissions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <div className="p-20 text-center font-display text-2xl animate-pulse">Accessing Secure Vault...</div>;

  return (
    <div className="section-padding pt-32">
       <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-16">
             <div>
                <h1 className="text-5xl font-display font-extrabold text-gradient">Command Center</h1>
                <p className="text-dark/40 italic font-medium">Monitoring the creative pulse of Sozy Impressions.</p>
             </div>
             <button onClick={() => auth.signOut()} className="btn-accent bg-dark py-3 px-6">Logout</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
             {[
               { title: 'Total Leads', val: submissions.length, icon: Users, color: 'primary' },
               { title: 'Peding Concepts', val: submissions.filter(s => s.status === 'new').length, icon: Lightbulb, color: 'accent' },
               { title: 'Avg. Budget', val: '$5.2k', icon: BarChart, color: 'dark' },
             ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                   <div className={`w-12 h-12 bg-${stat.color}/10 text-${stat.color} rounded-xl flex items-center justify-center mb-6`}>
                      <stat.icon size={24} />
                   </div>
                   <p className="text-xs font-bold uppercase tracking-widest text-dark/40 mb-1">{stat.title}</p>
                   <h3 className="text-3xl font-display font-bold">{stat.val}</h3>
                </div>
             ))}
          </div>

          <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm">
             <div className="p-10 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <h3 className="text-2xl font-display font-bold">Incoming Briefs</h3>
                <div className="flex gap-2">
                   <button className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-all"><Filter size={18} /></button>
                   <button className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-all"><SearchIcon size={18} /></button>
                </div>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="bg-slate-50 text-dark/40 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100">
                         <th className="px-10 py-6">Date</th>
                         <th className="px-10 py-6">Conceptualizer</th>
                         <th className="px-10 py-6">Requested Service</th>
                         <th className="px-10 py-6">Brief Status</th>
                         <th className="px-10 py-6">Action</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {submissions.map((sub) => (
                         <tr key={sub.id} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-10 py-8 text-sm font-medium text-dark/60">{sub.createdAt?.toDate().toLocaleDateString() || 'Just now'}</td>
                            <td className="px-10 py-8">
                               <p className="font-bold text-dark">{sub.name}</p>
                               <p className="text-xs text-dark/40 italic">{sub.email}</p>
                            </td>
                            <td className="px-10 py-8">
                               <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 text-primary rounded-full text-xs font-bold italic">
                                  {sub.service}
                               </div>
                            </td>
                            <td className="px-10 py-8">
                               <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${sub.status === 'new' ? 'bg-accent/10 text-accent' : 'bg-slate-100 text-dark/40'}`}>
                                  {sub.status}
                               </span>
                            </td>
                            <td className="px-10 py-8">
                               <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button onClick={() => updateDoc(doc(db, 'contacts', sub.id), { status: 'read' })} className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all"><Eye size={18} /></button>
                                  <button onClick={() => deleteDoc(doc(db, 'contacts', sub.id))} className="p-2 bg-accent/10 text-accent rounded-lg hover:bg-accent hover:text-white transition-all"><Trash2 size={18} /></button>
                               </div>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
       </div>
    </div>
  );
}

// --- Error Boundary ---
class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-dark text-white p-6">
          <div className="text-center">
            <h1 className="text-4xl font-display font-bold mb-4">A Creative Glitch Occurred.</h1>
            <p className="text-white/60 mb-8">Even the best designs have off days. We're on it.</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-accent px-10"
            >
              Reload Atmosphere
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- Initialization ---
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
