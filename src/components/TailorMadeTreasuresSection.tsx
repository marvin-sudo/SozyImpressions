import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import tabletopFrameImg from '../assets/images/tabletop_frame_1788635214871.jpg';
import photoSpeakerImg from '../assets/images/photo_speaker_1788635229629.jpg';
import moonLampImg from '../assets/images/moon_lamp_1788635244442.jpg';
import deskClockImg from '../assets/images/desk_clock_1788635262427.jpg';
import coupleKeychainsImg from '../assets/images/couple_keychains_1788635276974.jpg';
import barFlaskImg from '../assets/images/bar_flask_1788635290861.jpg';
import customEarbudsImg from '../assets/images/custom_earbuds_1788635304232.jpg';

interface TailorMadeItem {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  pillColor: string;
  itemCount: string;
}

const TAILOR_MADE_ITEMS: TailorMadeItem[] = [
  {
    id: 'table-tops',
    title: 'Table Tops',
    category: 'Table Tops',
    image: tabletopFrameImg,
    alt: 'Table Tops Custom Photo Frame',
    pillColor: 'bg-[#DCE3FA]',
    itemCount: '18+ Designs'
  },
  {
    id: 'speakers',
    title: 'Speakers',
    category: 'Speakers',
    image: photoSpeakerImg,
    alt: 'Speakers Personalised LED Ambient Speaker',
    pillColor: 'bg-[#DFE5FC]',
    itemCount: '12+ Models'
  },
  {
    id: 'lamps',
    title: 'Lamps',
    category: 'Lamps',
    image: moonLampImg,
    alt: 'Lamps Custom Moon and Cloud Photo Night Lamp',
    pillColor: 'bg-[#E1E6FC]',
    itemCount: '16+ Styles'
  },
  {
    id: 'clocks',
    title: 'Clocks',
    category: 'Clocks',
    image: deskClockImg,
    alt: 'Clocks Personalised Photo Desk Clock',
    pillColor: 'bg-[#DEE3FA]',
    itemCount: '14+ Types'
  },
  {
    id: 'key-chains',
    title: 'Key Chains',
    category: 'Key Chains',
    image: coupleKeychainsImg,
    alt: 'Key Chains Engraved Couple Metal Keyrings',
    pillColor: 'bg-[#E0E5FB]',
    itemCount: '24+ Varieties'
  },
  {
    id: 'bar-accessories',
    title: 'Bar Accessories',
    category: 'Bar Accessories',
    image: barFlaskImg,
    alt: 'Bar Accessories Engraved Stainless Steel Hip Flask',
    pillColor: 'bg-[#DCE2FA]',
    itemCount: '10+ Accessories'
  },
  {
    id: 'personalised-electronics',
    title: 'Personalised Electronics',
    category: 'Personalised Electronics',
    image: customEarbudsImg,
    alt: 'Personalised Electronics Custom Engraved Wireless Earbuds',
    pillColor: 'bg-[#DFE5FC]',
    itemCount: '15+ Tech Gadgets'
  }
];

interface TailorMadeTreasuresSectionProps {
  onSelectItem: (categoryName: string) => void;
  selectedCategory?: string | null;
}

export const TailorMadeTreasuresSection: React.FC<TailorMadeTreasuresSectionProps> = ({
  onSelectItem,
  selectedCategory
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="tailor-made-treasures" 
      aria-label="Tailor-Made Treasures"
      className="py-12 sm:py-16 px-4 md:px-8 max-w-7xl mx-auto"
    >
      {/* SECTION HEADER - Matching Reference Image Typography */}
      <div className="flex items-end justify-between mb-8 sm:mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D3094]/10 text-[#2D3094] text-xs font-bold uppercase tracking-wider mb-2.5">
            <span>Artisanal Collections</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-heading font-black text-slate-950 tracking-tight leading-none">
            Tailor-Made Treasures
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal mt-2">
            Custom-crafted lifestyle accessories, smart gadgets, and keepsakes made uniquely yours.
          </p>
        </div>

        {/* Desktop / Mobile Carousel Navigation Controls */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 hover:text-[#2D3094] hover:border-[#2D3094] transition-all shadow-xs active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 hover:text-[#2D3094] hover:border-[#2D3094] transition-all shadow-xs active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* 7 SHOWCASE ITEMS - DESKTOP 7 COLUMNS, RESPONSIVE HORIZONTAL SCROLL ON TABLET/MOBILE */}
      <div 
        ref={scrollContainerRef}
        className="flex lg:grid lg:grid-cols-7 gap-4 sm:gap-6 lg:gap-5 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {TAILOR_MADE_ITEMS.map((item) => {
          const isSelected = selectedCategory === item.category;

          return (
            <div
              key={item.id}
              id={`tailor-item-${item.id}`}
              onClick={() => onSelectItem(item.category)}
              className="flex-shrink-0 w-[145px] sm:w-[165px] lg:w-auto flex flex-col items-center group cursor-pointer snap-start select-none"
            >
              {/* PODIUM & PRODUCT CONTAINER */}
              <div className="relative w-full aspect-[4/5] flex items-end justify-center">
                {/* Rounded Podium/Pedestal Base matching Reference image */}
                <div 
                  className={`absolute inset-x-0 bottom-0 h-[62%] rounded-[28px] sm:rounded-[34px] ${item.pillColor} transition-all duration-300 ease-out group-hover:shadow-md ${
                    isSelected ? 'ring-2 ring-[#ED008C] shadow-md' : 'group-hover:ring-2 group-hover:ring-[#2E3192]/30'
                  }`}
                  aria-hidden="true"
                />

                {/* Floating Product Photography (isolated packshot standing on podium) */}
                <div className="relative z-10 w-[88%] h-[88%] flex items-center justify-center transform transition-transform duration-400 ease-out group-hover:-translate-y-2 group-hover:scale-105">
                  <img
                    src={item.image}
                    alt={item.alt}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="max-h-full max-w-full object-contain drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300"
                  />
                </div>
              </div>

              {/* Centered Category Label Underneath with SozyImpressions Hover Transitions */}
              <div className="mt-3.5 text-center flex flex-col items-center px-1">
                <span 
                  className={`text-sm sm:text-[15px] font-semibold tracking-tight transition-colors duration-200 line-clamp-2 leading-snug ${
                    isSelected 
                      ? 'text-[#2E3192] font-bold' 
                      : 'text-slate-800 group-hover:text-[#2E3192]'
                  }`}
                >
                  {item.title}
                </span>

                {/* Subtle Pink Accent Indicator on Hover / Active Selection */}
                <span 
                  className={`h-0.5 rounded-full bg-[#ED008C] transition-all duration-300 mt-1.5 ${
                    isSelected ? 'w-6 opacity-100' : 'w-0 opacity-0 group-hover:w-4 group-hover:opacity-100'
                  }`}
                  aria-hidden="true"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
