import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  Play, 
  X, 
  Search, 
  ChevronRight
} from 'lucide-react';
import { View, Currency } from '../types';
import { EASE_PREMIUM } from '../utils/animations';

interface HeroSectionProps {
  navigate: (view: View, param?: string) => void;
  currency?: Currency;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ navigate }) => {
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const shouldReduceMotion = useReducedMotion();

  const quickSearchItems = [
    { title: 'Executive Business Cards', category: 'Offset Printing', link: 'services', param: 'offset-printing' },
    { title: 'Laser-Engraved Smart Flasks', category: 'Customised Gifts', link: 'services', param: 'customised-gifts' },
    { title: 'Broad-Base Roll-Up Banners', category: 'Large Format & Events', link: 'services', param: 'large-format' },
    { title: 'Fleet Vehicle Wrapping', category: 'Corporate Branding', link: 'services', param: 'corporate-branding' },
    { title: 'Brochures & Annual Reports', category: 'Offset Printing', link: 'services', param: 'offset-printing' },
    { title: 'Custom Branded Polos & Tees', category: 'Customised Gifts', link: 'services', param: 'customised-gifts' },
    { title: '3D Reception Signage', category: 'Corporate Branding', link: 'services', param: 'corporate-branding' }
  ];

  const filteredSearch = searchQuery.trim() === '' 
    ? [] 
    : quickSearchItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-16 px-4 md:px-8 bg-white text-slate-900 overflow-hidden border-b border-slate-200/80">
      
      {/* Background Subtle Geometric Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-[radial-gradient(#2E3192_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Atmospheric Soft Light Blooms */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 left-1/4 w-[600px] h-[600px] bg-[#2E3192]/5 rounded-full filter blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-[#ED008C]/5 rounded-full filter blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition & CTAs (lg:col-span-7) */}
          <div className="lg:col-span-7 text-left flex flex-col items-start">
            
            {/* Top Credibility Tagline Pill */}
            <motion.div 
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE_PREMIUM }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-800 mb-6 shadow-sm transition-all hover:bg-slate-200/70"
            >
              <Sparkles size={14} className="text-[#ED008C] animate-spin" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                Uganda's Leading Corporate Branding & Printing Authority
              </span>
            </motion.div>

            {/* Master Headline */}
            <motion.h1 
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: EASE_PREMIUM }}
              className="text-4xl sm:text-6xl xl:text-7xl font-heading font-black tracking-tight leading-[1.08] mb-6 text-slate-900"
            >
              We Build Brands <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2D3094] via-[#6C63FF] to-[#ED008C]">
                That Stand Out.
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p 
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.24, ease: EASE_PREMIUM }}
              className="text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-slate-600 mb-8 max-w-2xl"
            >
              From professional printing and corporate branding to customised gifts and creative design, we help businesses and organisations look professional, communicate effectively, and make a lasting impression.
            </motion.p>

            {/* Strategic CTAs */}
            <motion.div 
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.36, ease: EASE_PREMIUM }}
              className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto"
            >
              {/* Primary CTA: Get a Quote */}
              <button 
                onClick={() => navigate('quote')}
                className="bg-[#ED008C] hover:bg-[#d4007d] text-white font-heading font-bold text-xs uppercase tracking-wider px-8 py-4.5 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 shadow-xl shadow-[#ED008C]/30 flex items-center justify-center gap-2 group w-full sm:w-auto cursor-pointer"
              >
                <span>Get a Quote</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>

              {/* Secondary CTA: Explore Our Services */}
              <button 
                onClick={() => navigate('services')}
                className="bg-[#2D3094] hover:bg-[#242775] text-white font-heading font-bold text-xs uppercase tracking-wider px-8 py-4.5 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-[#2D3094]/25 w-full sm:w-auto cursor-pointer"
              >
                <span>Explore Our Services</span>
              </button>
            </motion.div>

            {/* Quick Instant Search Bar */}
            <motion.div 
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.46, ease: EASE_PREMIUM }}
              className="w-full max-w-xl relative"
            >
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-2 flex items-center shadow-md focus-within:border-[#2D3094] focus-within:ring-2 focus-within:ring-[#2D3094]/10 transition-all">
                <div className="pl-3 text-slate-400">
                  <Search size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder="Quick search products, printing services, corporate gifts..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-slate-400 hover:text-slate-700"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Search Suggestions Dropdown */}
              {filteredSearch.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-30 max-h-60 overflow-y-auto">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 py-1">
                    Matching Solutions
                  </div>
                  {filteredSearch.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        navigate(item.link as View, item.param);
                        setSearchQuery('');
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                    >
                      <span className="text-xs font-bold text-slate-800">{item.title}</span>
                      <span className="text-[10px] font-medium text-[#ED008C] bg-[#ED008C]/10 px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

          </div>

          {/* Right Column: Premium Visual Composition of Curated Assets (lg:col-span-5) */}
          <motion.div 
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.18, ease: EASE_PREMIUM }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Showcase Card Container */}
            <div className="relative group rounded-[2.5rem] overflow-hidden border border-slate-200/90 bg-slate-50/90 p-4 shadow-xl backdrop-blur-xl transition-all duration-500 hover:border-[#ED008C]/40 hover:shadow-2xl">
              
              {/* Curated Grid of Physical Media */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                
                {/* Visual 1: Corporate Packaging & Offset Printing */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group/img bg-slate-100">
                  <motion.img 
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.25, ease: EASE_PREMIUM }}
                    src="https://www.image2url.com/r2/default/images/1787246238224-3e208503-a79e-4276-a8a4-f4fd705244a2.jpg" 
                    alt="Offset & Packaging" 
                    loading="eager"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                      Offset & Packaging
                    </span>
                  </div>
                </div>

                {/* Visual 2: Corporate Gifts & Vacuum Flasks */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group/img bg-slate-100">
                  <motion.img 
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.35, ease: EASE_PREMIUM }}
                    src="https://www.image2url.com/r2/default/images/1787245904300-92b2510a-35e8-48fb-baa3-cf6cad715088.jpg" 
                    alt="VIP Custom Gifts" 
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                      VIP Custom Gifts
                    </span>
                  </div>
                </div>

                {/* Visual 3: Event Pull-Up Banners & Stage Graphics */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group/img bg-slate-100">
                  <motion.img 
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.45, ease: EASE_PREMIUM }}
                    src="https://www.image2url.com/r2/default/images/1787246892685-e45b897d-1612-4692-8cc4-e3290c8ade28.png" 
                    alt="Event Banners" 
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                      Event Banners
                    </span>
                  </div>
                </div>

                {/* Visual 4: Executive Business Cards & Stationery */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group/img bg-slate-100">
                  <motion.img 
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.55, ease: EASE_PREMIUM }}
                    src="https://www.image2url.com/r2/default/images/1787246355569-bd7ea187-358d-4f41-88d0-574e2fe335c7.jpg" 
                    alt="Foil Business Cards" 
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                      Foil Business Cards
                    </span>
                  </div>
                </div>

              </div>

              {/* Showreel Interactive Trigger Bar */}
              <motion.button 
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.65, ease: EASE_PREMIUM }}
                onClick={() => setIsShowreelOpen(true)}
                className="w-full bg-[#2D3094] hover:bg-[#202377] border border-[#2D3094]/20 p-3.5 rounded-2xl flex items-center justify-between text-left transition-all group/btn shadow-md cursor-pointer hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ED008C] text-white flex items-center justify-center shadow-md group-hover/btn:scale-110 transition-transform">
                    <Play size={18} className="ml-0.5 fill-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Watch Agency Showreel (1:45)</div>
                    <div className="text-[10px] text-white/80">See our Kampala production facilities & live projects</div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-white/70 group-hover/btn:translate-x-1 transition-transform" />
              </motion.button>

              {/* Bottom Floating Stats Pill */}
              <motion.div 
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.75, ease: EASE_PREMIUM }}
                className="mt-3 bg-white text-slate-800 border border-slate-200/90 p-3 rounded-2xl flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-slate-800">Fast Heidelberg Turnaround</span>
                </div>
                <span className="text-[10px] font-extrabold uppercase text-[#2D3094] bg-[#2D3094]/10 px-2.5 py-1 rounded-full">
                  Kampala & Nationwide
                </span>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Showreel Video Modal */}
      {isShowreelOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
          <div className="w-full max-w-4xl bg-[#181B30] border border-white/20 rounded-3xl p-6 md:p-8 text-white relative shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsShowreelOpen(false)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close Showreel"
            >
              <X size={20} />
            </button>

            <div className="text-[10px] font-black uppercase tracking-widest text-[#ED008C] mb-1">
              Sozy Impressions Production & Creative Showcase
            </div>
            <h3 className="text-xl md:text-3xl font-heading font-black mb-4">
              Excellence in Commercial Printing & Corporate Identity
            </h3>

            <div className="aspect-video rounded-2xl overflow-hidden bg-slate-900 mb-6 relative border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=1200" 
                alt="Production Facility" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#ED008C] flex items-center justify-center mb-3 shadow-2xl animate-pulse">
                  <Play size={28} className="ml-1 fill-white" />
                </div>
                <h4 className="font-heading font-black text-lg md:text-xl text-white mb-1">
                  Live Production Tour & Case Studies
                </h4>
                <p className="text-xs text-slate-300 max-w-md">
                  Heidelberg offset presses, UV flatbed printing, laser engraving, and architectural fleet wrapping in Kampala.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div>
                <div className="text-xs font-bold text-white">Ready to elevate your corporate presence?</div>
                <div className="text-[11px] text-slate-400">Request a comprehensive corporate quotation in minutes.</div>
              </div>
              <button 
                onClick={() => {
                  setIsShowreelOpen(false);
                  navigate('quote');
                }}
                className="bg-[#ED008C] hover:bg-[#d4007d] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full shadow-lg cursor-pointer hover:-translate-y-0.5 transition-transform"
              >
                Request Official Quote
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
