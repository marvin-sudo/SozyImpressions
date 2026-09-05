import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import custom generated studio product assets matching i5j.png exactly
import tumblerMugImg from '../assets/images/tumbler_mug_1788634322323.jpg';
import cushionImg from '../assets/images/personalised_cushion_1788634222492.jpg';
import calendarFrameImg from '../assets/images/calendar_photo_frame_1788634271713.jpg';
import neonLightImg from '../assets/images/neon_lights_gift_1788634255448.jpg';
import rosesBouquetImg from '../assets/images/roses_bouquet_1788634336414.jpg';
import combosImg from '../assets/images/combos_gift_set_1788634366784.jpg';
import stationeryImg from '../assets/images/stationery_caddy_1788634352075.jpg';
import fridgeMagnetsImg from '../assets/images/fridge_photo_magnets_1788634286788.jpg';
import accessoriesImg from '../assets/images/g_lamp_accessories_1788634381991.jpg';
import caricatureImg from '../assets/images/caricature_standee_1788634238550.jpg';

// Real SozyImpressions product image assets for Sippers & Hampers
const SIPPERS_IMG = 'https://www.image2url.com/r2/default/images/1787245904300-92b2510a-35e8-48fb-baa3-cf6cad715088.jpg';
const HAMPERS_IMG = 'https://www.image2url.com/r2/default/images/1787603237030-2c152050-7643-4328-95ee-ee949ad1243e.jpg';

interface PersonalisedCategory {
  id: string;
  name: string;
  image: string;
  filterCategory: string; // The category key to filter the Shop catalog
  pillBg: string; // Soft pastel rounded pedestal base color inspired by reference
  row: 1 | 2;
}

const PERSONALISED_CATEGORIES: PersonalisedCategory[] = [
  // Row 1
  {
    id: 'mugs',
    name: 'Mugs',
    image: tumblerMugImg,
    filterCategory: 'Mugs',
    pillBg: 'bg-[#FCEEE2]', // soft peach podium
    row: 1
  },
  {
    id: 'cushions',
    name: 'Cushions',
    image: cushionImg,
    filterCategory: 'Cushions',
    pillBg: 'bg-[#FDEEF2]', // soft rose podium
    row: 1
  },
  {
    id: 'sippers',
    name: 'Sippers',
    image: SIPPERS_IMG,
    filterCategory: 'Sippers',
    pillBg: 'bg-[#EBF3FA]', // soft sky podium
    row: 1
  },
  {
    id: 'photo-frames',
    name: 'Photo Frames',
    image: calendarFrameImg,
    filterCategory: 'Photo Frames',
    pillBg: 'bg-[#F8F3E8]', // soft sand podium
    row: 1
  },
  {
    id: 'neon-lights',
    name: 'Neon Lights',
    image: neonLightImg,
    filterCategory: 'Neon Lights',
    pillBg: 'bg-[#FCF5E8]', // soft warm amber podium
    row: 1
  },
  {
    id: 'flowers',
    name: 'Flowers',
    image: rosesBouquetImg,
    filterCategory: 'Flowers',
    pillBg: 'bg-[#F3F6FA]', // soft floral mist podium
    row: 1
  },

  // Row 2
  {
    id: 'combos',
    name: 'Combos',
    image: combosImg,
    filterCategory: 'Combos',
    pillBg: 'bg-[#F0F4F8]', // soft pearl podium
    row: 2
  },
  {
    id: 'hampers',
    name: 'Hampers',
    image: HAMPERS_IMG,
    filterCategory: 'Hampers',
    pillBg: 'bg-[#FDF1EE]', // soft peach blush podium
    row: 2
  },
  {
    id: 'stationery',
    name: 'Stationery',
    image: stationeryImg,
    filterCategory: 'Stationery',
    pillBg: 'bg-[#F6F4EB]', // soft linen podium
    row: 2
  },
  {
    id: 'fridge-magnets',
    name: 'Fridge Magnets',
    image: fridgeMagnetsImg,
    filterCategory: 'Fridge Magnets',
    pillBg: 'bg-[#EEF7F2]', // soft sage podium
    row: 2
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: accessoriesImg,
    filterCategory: 'Accessories',
    pillBg: 'bg-[#EFF2F6]', // soft platinum podium
    row: 2
  },
  {
    id: 'caricatures',
    name: 'Caricatures',
    image: caricatureImg,
    filterCategory: 'Caricatures',
    pillBg: 'bg-[#F6F2EC]', // soft warm champagne podium
    row: 2
  }
];

interface PersonalisedGiftsCategoryShowcaseProps {
  selectedCategory: string;
  onSelectCategory: (filterCategory: string) => void;
}

export const PersonalisedGiftsCategoryShowcase: React.FC<PersonalisedGiftsCategoryShowcaseProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category: PersonalisedCategory) => {
    onSelectCategory(category.filterCategory);
    
    // Smoothly scroll down to the product catalog below
    const catalogElement = document.getElementById('shop-products');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.75;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Check if a category is currently active
  const isCategoryActive = (category: PersonalisedCategory) => {
    if (!selectedCategory || selectedCategory === 'All') return false;
    const cleanActive = selectedCategory.toLowerCase().trim();
    const cleanCat = category.filterCategory.toLowerCase().trim();
    const cleanName = category.name.toLowerCase().trim();
    return cleanActive === cleanCat || cleanActive === cleanName;
  };

  return (
    <section 
      id="personalised-gifts-showcase" 
      className="w-full bg-white pt-10 pb-8 sm:pt-14 sm:pb-12 border-b border-slate-100 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Heading & Supporting Text */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-[#121212] tracking-tight leading-tight mb-2">
            Personalised Gifts
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal max-w-2xl mx-auto">
            Thoughtfully personalised gifts made to make every moment unforgettable.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP LAYOUT (2 ROWS × 6 COLUMNS) & TABLET LAYOUT (4 COLUMNS) */}
        {/* ========================================================================= */}
        <div className="hidden md:block">
          
          {/* Desktop 2 Rows x 6 Columns (>= 1024px) */}
          <div className="hidden lg:flex lg:flex-col lg:gap-8">
            {/* Row 1 (Mugs, Cushions, Sippers, Photo Frames, Neon Lights, Flowers) */}
            <div className="grid grid-cols-6 gap-5 xl:gap-8">
              {PERSONALISED_CATEGORIES.filter(c => c.row === 1).map((category) => {
                const isActive = isCategoryActive(category);
                return (
                  <button
                    key={category.id}
                    id={`cat-card-${category.id}`}
                    onClick={() => handleCategoryClick(category)}
                    className="group flex flex-col items-center text-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#2E3192] rounded-2xl p-1 transition-all duration-300"
                    aria-label={`View ${category.name}`}
                  >
                    {/* Image Container with Soft Rounded Podium Base */}
                    <div className="relative w-full aspect-square max-w-[170px] flex items-center justify-center rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5">
                      {/* Soft rounded pill pedestal background inspired by the reference image */}
                      <div 
                        className={`absolute bottom-1.5 inset-x-2.5 h-12 rounded-full ${category.pillBg} opacity-90 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100`} 
                      />
                      
                      {/* Product Photography */}
                      <img
                        src={category.image}
                        alt={category.name}
                        referrerPolicy="no-referrer"
                        className="relative z-10 w-full h-full object-contain p-1 transition-transform duration-300 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Category Name Centered Underneath */}
                    <div className="mt-3 w-full flex flex-col items-center">
                      <span className={`text-[15px] xl:text-base font-heading font-medium tracking-tight transition-colors duration-300 ${
                        isActive ? 'text-[#2E3192] font-semibold' : 'text-[#121212] group-hover:text-[#2E3192]'
                      }`}>
                        {category.name}
                      </span>
                      
                      {/* Very Subtle #ED008C Pink Accent Indicator */}
                      <span 
                        className={`h-[2px] rounded-full transition-all duration-300 mt-1.5 ${
                          isActive 
                            ? 'w-6 bg-[#ED008C]' 
                            : 'w-0 group-hover:w-5 bg-[#ED008C]'
                        }`} 
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Row 2 (Combos, Hampers, Stationery, Fridge Magnets, Accessories, Caricatures) */}
            <div className="grid grid-cols-6 gap-5 xl:gap-8">
              {PERSONALISED_CATEGORIES.filter(c => c.row === 2).map((category) => {
                const isActive = isCategoryActive(category);
                return (
                  <button
                    key={category.id}
                    id={`cat-card-${category.id}`}
                    onClick={() => handleCategoryClick(category)}
                    className="group flex flex-col items-center text-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#2E3192] rounded-2xl p-1 transition-all duration-300"
                    aria-label={`View ${category.name}`}
                  >
                    {/* Image Container with Soft Rounded Podium Base */}
                    <div className="relative w-full aspect-square max-w-[170px] flex items-center justify-center rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5">
                      {/* Soft rounded pill pedestal background */}
                      <div 
                        className={`absolute bottom-1.5 inset-x-2.5 h-12 rounded-full ${category.pillBg} opacity-90 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100`} 
                      />
                      
                      {/* Product Photography */}
                      <img
                        src={category.image}
                        alt={category.name}
                        referrerPolicy="no-referrer"
                        className="relative z-10 w-full h-full object-contain p-1 transition-transform duration-300 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Category Name Centered Underneath */}
                    <div className="mt-3 w-full flex flex-col items-center">
                      <span className={`text-[15px] xl:text-base font-heading font-medium tracking-tight transition-colors duration-300 ${
                        isActive ? 'text-[#2E3192] font-semibold' : 'text-[#121212] group-hover:text-[#2E3192]'
                      }`}>
                        {category.name}
                      </span>
                      
                      {/* Very Subtle #ED008C Pink Accent Indicator */}
                      <span 
                        className={`h-[2px] rounded-full transition-all duration-300 mt-1.5 ${
                          isActive 
                            ? 'w-6 bg-[#ED008C]' 
                            : 'w-0 group-hover:w-5 bg-[#ED008C]'
                        }`} 
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tablet 4 Categories Per Row (768px - 1023px) */}
          <div className="grid lg:hidden md:grid-cols-4 gap-6">
            {PERSONALISED_CATEGORIES.map((category) => {
              const isActive = isCategoryActive(category);
              return (
                <button
                  key={category.id}
                  id={`cat-card-tab-${category.id}`}
                  onClick={() => handleCategoryClick(category)}
                  className="group flex flex-col items-center text-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#2E3192] rounded-2xl p-1 transition-all duration-300"
                  aria-label={`View ${category.name}`}
                >
                  <div className="relative w-full aspect-square max-w-[160px] flex items-center justify-center rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5">
                    <div 
                      className={`absolute bottom-1.5 inset-x-2.5 h-12 rounded-full ${category.pillBg} opacity-90 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100`} 
                    />
                    <img
                      src={category.image}
                      alt={category.name}
                      referrerPolicy="no-referrer"
                      className="relative z-10 w-full h-full object-contain p-1 transition-transform duration-300 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-2.5 w-full flex flex-col items-center">
                    <span className={`text-sm font-heading font-medium tracking-tight transition-colors duration-300 ${
                      isActive ? 'text-[#2E3192] font-semibold' : 'text-[#121212] group-hover:text-[#2E3192]'
                    }`}>
                      {category.name}
                    </span>
                    <span 
                      className={`h-[2px] rounded-full transition-all duration-300 mt-1 ${
                        isActive 
                          ? 'w-6 bg-[#ED008C]' 
                          : 'w-0 group-hover:w-5 bg-[#ED008C]'
                      }`} 
                    />
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* MOBILE LAYOUT: SMOOTH HORIZONTAL SCROLL CAROUSEL (~2 CATEGORIES AT A TIME) */}
        {/* ========================================================================= */}
        <div className="block md:hidden relative">
          {/* Navigation arrow buttons for mobile carousel */}
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Browse 12 Categories
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => scrollCarousel('left')}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 flex items-center justify-center text-slate-700 transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 flex items-center justify-center text-slate-700 transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Carousel Track with smooth snap */}
          <div 
            ref={carouselRef}
            className="flex items-stretch overflow-x-auto snap-x snap-mandatory gap-3.5 pb-3 scrollbar-none no-scrollbar -mx-4 px-4"
          >
            {PERSONALISED_CATEGORIES.map((category) => {
              const isActive = isCategoryActive(category);
              return (
                <button
                  key={category.id}
                  id={`cat-card-mob-${category.id}`}
                  onClick={() => handleCategoryClick(category)}
                  className="group flex flex-col items-center text-center cursor-pointer outline-none rounded-2xl p-2 bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-all duration-300 w-[calc(50%-7px)] min-w-[145px] shrink-0 snap-start active:scale-[0.98]"
                  aria-label={`View ${category.name}`}
                >
                  <div className="relative w-full aspect-square flex items-center justify-center rounded-xl overflow-hidden">
                    <div 
                      className={`absolute bottom-1 inset-x-2 h-10 rounded-full ${category.pillBg} opacity-90`} 
                    />
                    <img
                      src={category.image}
                      alt={category.name}
                      referrerPolicy="no-referrer"
                      className="relative z-10 w-full h-full object-contain p-1 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-2 w-full flex flex-col items-center">
                    <span className={`text-sm font-heading font-medium tracking-tight ${
                      isActive ? 'text-[#2E3192] font-semibold' : 'text-[#121212]'
                    }`}>
                      {category.name}
                    </span>
                    <span 
                      className={`h-[2px] rounded-full transition-all duration-300 mt-1 ${
                        isActive ? 'w-5 bg-[#ED008C]' : 'w-0 group-hover:w-4 bg-[#ED008C]'
                      }`} 
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
