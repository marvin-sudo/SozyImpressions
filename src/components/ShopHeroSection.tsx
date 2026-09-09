import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Wand2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Currency } from '../types';

interface ShopHeroSectionProps {
  onSelectCollection: (collectionKey: string) => void;
  onShopNow: () => void;
  onOpenCustomizer: (product?: Product) => void;
  currency: Currency;
}

const heroSlides = [
  {
    id: 'personal',
    badge: 'Crafted in Kampala',
    titleLine1: 'MAKE IT PERSONAL.',
    titleLine2: 'Make it Sozy.',
    description: 'Bespoke personalised gifts, corporate branded merchandise, and custom creations crafted with precision laser engraving, vibrant full-colour UV printing, and premium embroidery.',
    image: 'https://www.image2url.com/r2/default/images/1788960062454-65f7424d-a425-45a6-9c91-c8dc0cf0dd9e.png',
    alt: 'Make it Personal. Make it Sozy.',
    accentColor: '#ED008C',
    tagline: 'Ready to craft a memorable keepsake or branded corporate order?'
  },
  {
    id: 'celebrations',
    badge: 'Luxury Custom Keepsakes',
    titleLine1: 'MOMENTS THAT LAST.',
    titleLine2: 'Crafted with Love.',
    description: 'Thoughtfully customized gift boxes, engraved drinkware, photo keepsakes, and celebration treasures tailored to make every birthday, anniversary, and milestone unforgettable.',
    image: 'https://www.image2url.com/r2/default/images/1788961670133-fd354901-222d-441d-9815-a4b9b20ea9dd.png',
    alt: 'Moments That Last. Crafted with Love.',
    accentColor: '#2D3094',
    tagline: 'Celebrate birthdays, anniversaries, and milestones with personal gifts.'
  },
  {
    id: 'cakes-celebrations',
    badge: 'Fresh Celebration Cakes',
    titleLine1: 'SWEET SURPRISES.',
    titleLine2: 'Baked for Celebrations.',
    description: 'Freshly baked gourmet celebration cakes, custom milestone cake toppers, and delightful sweet treat bundles made to complement your personalised gifts across Kampala.',
    image: 'https://www.image2url.com/r2/default/images/1788962855779-7aa562c8-5437-4b13-bab8-227e2866ddfc.png',
    alt: 'Celebration Cakes and Sweet Surprises',
    accentColor: '#ED008C',
    tagline: 'Pair your custom gift with fresh celebration cakes delivered right on time.'
  },
  {
    id: 'fresh-flowers',
    badge: 'Fresh Floral Bouquets',
    titleLine1: 'BLOOMS OF LOVE.',
    titleLine2: 'Freshly Handcrafted.',
    description: 'Handcrafted fresh flower bouquets, radiant roses, and vibrant floral arrangements paired seamlessly with personalised gift boxes for birthdays, romance, and special celebrations.',
    image: 'https://www.image2url.com/r2/default/images/1788963284870-0c5d0abc-b705-4b10-93ab-f41a77f117da.png',
    alt: 'Fresh Flower Bouquets and Floral Gifts',
    accentColor: '#ED008C',
    tagline: 'Pair your custom gift with stunning fresh floral arrangements delivered in Kampala.'
  }
];

export const ShopHeroSection: React.FC<ShopHeroSectionProps> = ({
  onSelectCollection,
  onShopNow,
  onOpenCustomizer
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  // Auto-advance slide every 6 seconds when not hovered
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  const activeSlide = heroSlides[currentSlide];
  const collections = [
    {
      id: 'bestsellers',
      title: 'Bestsellers',
      badge: 'Popular',
      bgColor: 'bg-[#FBF1EC]', // soft warm blush/cream
      blobShape: 'rounded-[42%_58%_70%_30%/45%_45%_55%_55%]',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=500',
      description: 'Customer favourite mugs, flasks & apparel'
    },
    {
      id: 'new-arrivals',
      title: 'New Arrivals',
      badge: '2026 Drops',
      bgColor: 'bg-[#F3F4EE]', // soft olive/sand
      blobShape: 'rounded-[55%_45%_35%_65%/60%_50%_50%_40%]',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=500',
      description: 'Latest bamboo sets & desk accessories'
    },
    {
      id: 'corporate-gifts',
      title: 'Corporate Gifts',
      badge: 'VIP Quality',
      bgColor: 'bg-[#EDF2F7]', // soft corporate blue/gray
      blobShape: 'rounded-[40%_60%_50%_50%/55%_35%_65%_45%]',
      image: 'https://www.image2url.com/r2/default/images/1787603237030-2c152050-7643-4328-95ee-ee949ad1243e.jpg',
      description: 'Luxury executive kits & partner awards'
    },
    {
      id: 'all-gifts',
      title: 'All Gifts',
      badge: 'Curated',
      bgColor: 'bg-[#FDF0EE]', // soft peach/coral
      blobShape: 'rounded-[60%_40%_60%_40%/40%_60%_40%_60%]',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=500',
      description: 'Explore full personalised collection'
    }
  ];

  return (
    <section className="w-full bg-white pt-6 pb-12 px-4 md:px-8 border-b border-slate-200/80 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Two-Column Hero Grid: Left 2x2 Collections (~35-40%), Right Promo Hero (~60-65%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT SIDE — FEATURED SHOP COLLECTIONS (2x2 Grid) */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-4 h-full">
              {collections.map((col) => (
                <div
                  key={col.id}
                  onClick={() => onSelectCollection(col.id)}
                  className="group cursor-pointer bg-white rounded-2xl p-4 flex flex-col items-center justify-between text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-slate-100 hover:border-[#2D3094]/20 select-none relative overflow-hidden"
                >
                  {/* Organic Background Shape behind Cutout Image */}
                  <div className="relative w-full aspect-square flex items-center justify-center mb-3">
                    <div 
                      className={`absolute inset-2 ${col.bgColor} ${col.blobShape} transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2 opacity-90`} 
                    />
                    
                    {/* Cutout Image with Hover Transition */}
                    <img 
                      src={col.image} 
                      alt={col.title} 
                      className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110"
                      loading="eager"
                    />

                    {/* Small Badge */}
                    <span className="absolute top-1 right-1 z-20 text-[9px] font-bold text-slate-600 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full border border-slate-200/60 shadow-xs">
                      {col.badge}
                    </span>
                  </div>

                  {/* Title underneath */}
                  <div className="mt-1">
                    <h3 className="font-heading font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#2D3094] transition-colors leading-tight">
                      {col.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {col.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE — LARGE PROMOTIONAL HERO BANNER (Occupying ~65% width) */}
          <div className="lg:col-span-8 xl:col-span-8">
            <div 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-full h-full min-h-[480px] sm:min-h-[520px] rounded-[28px] border border-amber-100/80 bg-gradient-to-br from-[#FFFDF9] via-[#FAF8F5] to-[#FFF5F7] shadow-sm flex flex-col justify-between p-6 sm:p-8 lg:p-10 overflow-hidden group"
            >
              
              {/* Top Bar with Micro Brand Indicator & Slider Navigation */}
              <div className="relative z-20 flex items-center justify-between gap-3 mb-2">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-slate-200/80 text-[10px] sm:text-xs font-heading font-black uppercase tracking-wider text-[#2D3094] shadow-xs">
                  <span>{activeSlide.badge}</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Slide Indicators */}
                  <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full border border-slate-200/70 shadow-xs">
                    {heroSlides.map((slide, idx) => (
                      <button
                        key={slide.id}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                          currentSlide === idx ? 'w-6 bg-[#ED008C]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Prev & Next Arrow Controls */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={prevSlide}
                      className="w-8 h-8 rounded-full bg-white/90 hover:bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-slate-600 hover:text-[#2D3094] transition-all cursor-pointer hover:scale-105 active:scale-95"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="w-8 h-8 rounded-full bg-white/90 hover:bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-slate-600 hover:text-[#2D3094] transition-all cursor-pointer hover:scale-105 active:scale-95"
                      aria-label="Next slide"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Central Typographic & Brand Image Content Area with Smooth Slide Animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="my-auto py-4 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-10 w-full"
                >
                  <div className="flex-1 max-w-xl text-left">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-slate-950 leading-[1.12]">
                      {activeSlide.titleLine1} <br />
                      <span className="italic font-serif font-bold" style={{ color: activeSlide.accentColor }}>
                        {activeSlide.titleLine2}
                      </span>
                    </h2>
                    
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-4 max-w-md">
                      {activeSlide.description}
                    </p>
                  </div>

                  <div className="w-full md:w-auto md:flex-1 flex items-center justify-center">
                    <img 
                      src={activeSlide.image} 
                      alt={activeSlide.alt}
                      referrerPolicy="no-referrer"
                      className="w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[540px] h-auto max-h-[340px] sm:max-h-[400px] lg:max-h-[440px] object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom Section: CTA Action Buttons */}
              <div className="pt-5 border-t border-slate-200/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <span className="text-xs text-slate-500 font-medium">
                  {activeSlide.tagline}
                </span>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    onClick={onShopNow}
                    className="flex-1 sm:flex-none bg-[#ED008C] hover:bg-[#d4007d] active:bg-[#b8006e] text-white text-xs font-heading font-black uppercase tracking-wider px-6 py-3 rounded-xl shadow-md shadow-[#ED008C]/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Shop Now</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    onClick={() => onOpenCustomizer()}
                    className="flex-1 sm:flex-none bg-white hover:bg-slate-50 border border-slate-300 text-[#2D3094] hover:text-[#181B34] text-xs font-heading font-bold uppercase tracking-wider px-5 py-3 rounded-xl shadow-xs transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Wand2 size={13} className="text-[#ED008C]" />
                    <span>Customise Order</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
