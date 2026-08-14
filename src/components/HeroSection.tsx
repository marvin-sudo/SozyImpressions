import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Play, 
  X, 
  Search, 
  ChevronRight,
  Package
} from 'lucide-react';
import { View, Currency } from '../types';

interface HeroSectionProps {
  navigate: (view: View, param?: string) => void;
  currency?: Currency;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ navigate }) => {
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const quickSearchItems = [
    { title: 'Executive Business Cards', category: 'Offset Printing', link: 'services', param: 'offset-printing' },
    { title: 'Laser-Engraved Smart Flasks', category: 'Customised Gifts', link: 'shop' },
    { title: 'Broad-Base Roll-Up Banners', category: 'Event Branding', link: 'shop' },
    { title: 'Fleet Vehicle Wrapping', category: 'Corporate Branding', link: 'services', param: 'corporate-branding' },
    { title: 'Brochures & Annual Reports', category: 'Offset Printing', link: 'services', param: 'offset-printing' },
    { title: 'Custom Branded Polos & Tees', category: 'Apparel', link: 'shop' },
    { title: '3D Reception Signage', category: 'Corporate Branding', link: 'services', param: 'corporate-branding' }
  ];

  const filteredSearch = searchQuery.trim() === '' 
    ? [] 
    : quickSearchItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-16 px-4 md:px-8 bg-gradient-to-b from-[#0F1224] via-[#121212] to-[#181B2F] text-white overflow-hidden border-b border-white/10">
      
      {/* Background Subtle Geometric Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[radial-gradient(#2E3192_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Atmospheric Ambient Light Blooms */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 left-1/4 w-[500px] h-[500px] bg-[#2E3192] rounded-full filter blur-[150px] opacity-35 animate-pulse" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#ED008C] rounded-full filter blur-[160px] opacity-25 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition & CTAs (lg:col-span-7) */}
          <div className="lg:col-span-7 text-left flex flex-col items-start">
            
            {/* Top Credibility Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white mb-6 backdrop-blur-md shadow-sm transition-all hover:bg-white/15">
              <Sparkles size={14} className="text-[#ED008C] animate-spin" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-200">
                Uganda's Leading Corporate Branding & Printing Authority
              </span>
            </div>

            {/* Master Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-heading font-black tracking-tight leading-[1.08] mb-6 text-white">
              We Build Brands <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2E3192] via-[#6C63FF] to-[#ED008C]">
                That Stand Out.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg lg:text-xl font-light leading-relaxed text-slate-300 mb-8 max-w-2xl">
              From professional printing and corporate branding to customised gifts and creative design, we help businesses and organisations look professional, communicate effectively, and make a lasting impression.
            </p>

            {/* 3 Strategic CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
              {/* Primary CTA: Get a Quote */}
              <button 
                onClick={() => navigate('quote')}
                className="bg-[#ED008C] hover:bg-[#d4007d] text-white font-heading font-bold text-xs uppercase tracking-wider px-8 py-4.5 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl shadow-[#ED008C]/30 flex items-center justify-center gap-2 group w-full sm:w-auto cursor-pointer"
              >
                <span>Get a Quote</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>

              {/* Secondary CTA: Explore Our Services */}
              <button 
                onClick={() => navigate('services')}
                className="bg-[#2D3094] hover:bg-[#2E3192] text-white font-heading font-bold text-xs uppercase tracking-wider px-8 py-4.5 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border border-white/20 shadow-lg shadow-[#2D3094]/30 w-full sm:w-auto cursor-pointer"
              >
                <span>Explore Our Services</span>
              </button>

              {/* Third CTA: Shop Products */}
              <button 
                onClick={() => navigate('shop')}
                className="border-2 border-white/30 hover:border-white text-white hover:bg-white/10 font-heading font-bold text-xs uppercase tracking-wider px-7 py-4.5 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
              >
                <Package size={16} className="text-[#ED008C]" />
                <span>Shop Products</span>
              </button>
            </div>

            {/* Quick Instant Search Bar */}
            <div className="w-full max-w-xl relative">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 flex items-center shadow-2xl">
                <div className="pl-3 text-slate-400">
                  <Search size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder="Quick search products, printing services, corporate gifts..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-400 outline-none"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Search Suggestions Dropdown */}
              {filteredSearch.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1B1E33] border border-white/15 rounded-2xl shadow-2xl p-2 z-30 max-h-60 overflow-y-auto">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
                    Matching Solutions
                  </div>
                  {filteredSearch.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        navigate(item.link as View, item.param);
                        setSearchQuery('');
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/10 transition-colors text-left"
                    >
                      <span className="text-xs font-bold text-white">{item.title}</span>
                      <span className="text-[10px] font-medium text-[#ED008C] bg-[#ED008C]/10 px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Premium Visual Composition of Curated Assets (lg:col-span-5) */}
          <div className="lg:col-span-5 relative">
            {/* Visual Showcase Card Container */}
            <div className="relative group rounded-[2.5rem] overflow-hidden border border-white/20 bg-gradient-to-b from-[#181B38] to-[#121422] p-4 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-[#ED008C]/40 hover:shadow-[#ED008C]/20">
              
              {/* Curated Grid of Physical Media */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                
                {/* Visual 1: Corporate Packaging & Offset Printing */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group/img">
                  <img 
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600" 
                    alt="Sozy Impressions Corporate Branding" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                      Offset & Packaging
                    </span>
                  </div>
                </div>

                {/* Visual 2: Corporate Gifts & Vacuum Flasks */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group/img">
                  <img 
                    src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600" 
                    alt="Customised Gifts and Flasks" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                      VIP Custom Gifts
                    </span>
                  </div>
                </div>

                {/* Visual 3: Event Pull-Up Banners & Stage Graphics */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group/img">
                  <img 
                    src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600" 
                    alt="Event Branding and Signage" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                      Event Banners
                    </span>
                  </div>
                </div>

                {/* Visual 4: Executive Business Cards & Stationery */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group/img">
                  <img 
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600" 
                    alt="Luxury Foil Business Cards" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                      Foil Business Cards
                    </span>
                  </div>
                </div>

              </div>

              {/* Showreel Interactive Trigger Bar */}
              <button 
                onClick={() => setIsShowreelOpen(true)}
                className="w-full bg-[#2D3094]/80 hover:bg-[#2D3094] border border-white/20 p-3.5 rounded-2xl flex items-center justify-between text-left transition-all group/btn shadow-lg cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ED008C] text-white flex items-center justify-center shadow-md group-hover/btn:scale-110 transition-transform">
                    <Play size={18} className="ml-0.5 fill-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Watch Agency Showreel (1:45)</div>
                    <div className="text-[10px] text-slate-300">See our Kampala production facilities & live projects</div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-white/60 group-hover/btn:translate-x-1 transition-transform" />
              </button>

              {/* Bottom Floating Stats Pill */}
              <div className="mt-3 bg-white/95 text-[#121212] p-3 rounded-2xl flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-bold">Fast Heidelberg Turnaround</span>
                </div>
                <span className="text-[10px] font-extrabold uppercase text-[#2D3094] bg-[#2D3094]/10 px-2.5 py-1 rounded-full">
                  Kampala & Nationwide
                </span>
              </div>

            </div>
          </div>

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
                className="bg-[#ED008C] hover:bg-[#d4007d] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full shadow-lg cursor-pointer"
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
