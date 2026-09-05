import React, { useState, useRef, useCallback } from 'react';
import { ArrowRight, Sparkles, Wand2, SlidersHorizontal } from 'lucide-react';
import { Product, Currency } from '../types';

interface ShopHeroSectionProps {
  onSelectCollection: (collectionKey: string) => void;
  onShopNow: () => void;
  onOpenCustomizer: (product?: Product) => void;
  currency: Currency;
}

export const ShopHeroSection: React.FC<ShopHeroSectionProps> = ({
  onSelectCollection,
  onShopNow,
  onOpenCustomizer
}) => {
  // Before-and-After Slider Position (percentage from 0 to 100, default 48% like reference)
  const [sliderPosition, setSliderPosition] = useState<number>(48);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = Math.max(15, Math.min(85, (offsetX / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handlePointerMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handlePointerMove(e.touches[0].clientX);
    }
  };

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
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchMove={handleTouchMove}
              className="relative w-full h-full min-h-[440px] sm:min-h-[480px] rounded-[28px] border border-amber-100/80 bg-gradient-to-br from-[#FFFDF9] via-[#FAF8F5] to-[#FFF5F7] shadow-sm overflow-hidden flex flex-col justify-between p-6 sm:p-8 lg:p-10 select-none group"
            >
              
              {/* Top Bar with Micro Brand Indicator */}
              <div className="relative z-20 flex items-center justify-between gap-2 mb-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-slate-200/80 text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#2D3094] shadow-xs">
                  <Sparkles size={13} className="text-[#ED008C]" />
                  <span>Interactive Customization Visualizer</span>
                </div>
                
                <div className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-500 font-medium bg-white/70 px-2.5 py-0.5 rounded-full border border-slate-200/50">
                  <SlidersHorizontal size={12} className="text-[#ED008C]" />
                  <span>Drag slider to see personalisation</span>
                </div>
              </div>

              {/* Central Split Before & After Visual Area */}
              <div className="relative z-10 flex-1 my-2 flex items-center justify-between w-full overflow-hidden">
                
                {/* BEFORE SIDE (Left: Plain / Customisable) */}
                <div 
                  className="w-1/2 flex items-center justify-center gap-4 sm:gap-6 pr-4 transition-opacity duration-300"
                  style={{ opacity: sliderPosition < 30 ? 0.35 : 1 }}
                >
                  {/* Plain Mug with "Your Design Comes Here!" */}
                  <div className="relative flex flex-col items-center text-center">
                    <div className="relative w-28 h-28 sm:w-36 sm:h-36 bg-white rounded-2xl p-2 shadow-sm border border-slate-200/70 flex items-center justify-center">
                      {/* Blank Mug SVG representation / mockup */}
                      <img 
                        src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400" 
                        alt="Plain Blank Mug"
                        className="w-full h-full object-contain grayscale opacity-65"
                      />
                      {/* Visual Badge overlay */}
                      <div className="absolute inset-x-2 inset-y-6 flex items-center justify-center">
                        <div className="border border-dashed border-[#2D3094] bg-white/95 backdrop-blur-xs px-2 py-1.5 rounded-lg shadow-sm text-center">
                          <p className="text-[10px] sm:text-[11px] font-black text-[#2D3094] leading-tight uppercase tracking-tight">
                            Your Design <br /> Comes Here!
                          </p>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider">
                      Plain Product
                    </span>
                  </div>

                  {/* Plain Pillow / Shirt Mockup with "Your Photo Comes Here!" */}
                  <div className="relative hidden md:flex flex-col items-center text-center">
                    <div className="relative w-28 h-28 sm:w-36 sm:h-36 bg-white rounded-2xl p-2 shadow-sm border border-slate-200/70 flex items-center justify-center">
                      <img 
                        src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400" 
                        alt="Plain T-Shirt / Pillow"
                        className="w-full h-full object-contain grayscale opacity-65"
                      />
                      <div className="absolute inset-x-2 inset-y-6 flex items-center justify-center">
                        <div className="border border-dashed border-[#ED008C] bg-white/95 backdrop-blur-xs px-2 py-1.5 rounded-lg shadow-sm text-center">
                          <p className="text-[10px] sm:text-[11px] font-black text-[#ED008C] leading-tight uppercase tracking-tight">
                            Your Photo <br /> Comes Here!
                          </p>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider">
                      Custom Canvas
                    </span>
                  </div>
                </div>

                {/* SLIDER DIVIDER LINE & CIRCULAR HANDLE (Inspired by the Reference Image < | >) */}
                <div 
                  className="absolute top-0 bottom-0 z-30 flex flex-col items-center cursor-ew-resize select-none"
                  style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleMouseDown}
                >
                  {/* Subtle vertical dividing line */}
                  <div className="w-[2px] h-full bg-[#2D3094]/30 shadow-xs" />
                  
                  {/* Circular handle badge in the center with < > arrows */}
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border-2 border-[#2D3094] shadow-xl flex items-center justify-center text-[#2D3094] hover:scale-110 active:scale-95 transition-transform duration-150"
                    title="Drag to compare plain vs personalised"
                  >
                    <div className="flex items-center gap-0.5 text-xs font-black">
                      <span className="text-[#2D3094]">◀</span>
                      <span className="text-[#ED008C]">▶</span>
                    </div>
                  </div>
                </div>

                {/* AFTER SIDE (Right: Finished Personalised Sozy Product) */}
                <div 
                  className="w-1/2 flex items-center justify-center sm:justify-start gap-4 sm:gap-6 pl-4 transition-opacity duration-300"
                  style={{ opacity: sliderPosition > 70 ? 0.35 : 1 }}
                >
                  {/* Personalised Mug with Photo & Text */}
                  <div className="relative flex flex-col items-center text-center">
                    <div className="relative w-28 h-28 sm:w-36 sm:h-36 bg-gradient-to-tr from-rose-50 to-pink-100/50 rounded-2xl p-2 shadow-md border border-pink-200/80 flex items-center justify-center overflow-hidden">
                      <img 
                        src="https://www.image2url.com/r2/default/images/1787603237030-2c152050-7643-4328-95ee-ee949ad1243e.jpg" 
                        alt="Personalised Sozy Gift"
                        className="w-full h-full object-cover rounded-xl drop-shadow-sm"
                      />
                      <div className="absolute bottom-1 right-1 bg-[#2D3094] text-white text-[8px] font-black px-1.5 py-0.5 rounded-md shadow-xs">
                        SOZY PRINT
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#ED008C] mt-2 uppercase tracking-wider">
                      Finished Gift
                    </span>
                  </div>

                  {/* Personalised Frame / Award */}
                  <div className="relative hidden md:flex flex-col items-center text-center">
                    <div className="relative w-28 h-28 sm:w-36 sm:h-36 bg-gradient-to-tr from-blue-50 to-indigo-100/40 rounded-2xl p-2 shadow-md border border-blue-200/80 flex items-center justify-center overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400" 
                        alt="VIP Gift Box Set"
                        className="w-full h-full object-cover rounded-xl drop-shadow-sm"
                      />
                      <div className="absolute bottom-1 right-1 bg-[#ED008C] text-white text-[8px] font-black px-1.5 py-0.5 rounded-md shadow-xs">
                        VIP BOX
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#2D3094] mt-2 uppercase tracking-wider">
                      Laser Engraved
                    </span>
                  </div>
                </div>

              </div>

              {/* Bottom Section: Typography & CTA Buttons */}
              <div className="relative z-20 pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                <div className="max-w-md">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black tracking-tight text-slate-950 leading-tight">
                    MAKE IT PERSONAL. <br />
                    <span className="text-[#ED008C] italic font-serif font-bold">Make it Sozy.</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mt-1">
                    Premium personalised gifts, branded merchandise & custom products made for every occasion.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
                  <button
                    onClick={onShopNow}
                    className="flex-1 sm:flex-none bg-[#ED008C] hover:bg-[#d4007d] text-white text-xs font-heading font-black uppercase tracking-wider px-6 py-3 rounded-xl shadow-md shadow-[#ED008C]/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <span>Shop Now</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    onClick={() => onOpenCustomizer()}
                    className="flex-1 sm:flex-none bg-white hover:bg-slate-50 border border-slate-300 text-[#2D3094] hover:text-[#181B34] text-xs font-heading font-bold uppercase tracking-wider px-5 py-3 rounded-xl shadow-xs transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5"
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
