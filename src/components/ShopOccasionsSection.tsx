import React from 'react';
import { ArrowRight, Sparkles, Heart, Gift, Cake, Crown } from 'lucide-react';
import anniversaryImg from '../assets/images/anniversary_gifts_1788634691472.jpg';
import birthdayImg from '../assets/images/birthday_gifts_1788634707174.jpg';
import weddingImg from '../assets/images/wedding_gifts_1788634722972.jpg';
import romanceImg from '../assets/images/romance_gifts_1788634737203.jpg';

interface OccasionCardData {
  id: string;
  title: string;
  scriptKicker: string;
  description: string;
  tag: string;
  image: string;
  icon: React.ElementType;
  accentBadgeColor: string;
  itemCount: string;
}

const OCCASIONS: OccasionCardData[] = [
  {
    id: 'anniversary',
    title: 'Anniversary Gifts',
    scriptKicker: 'Cherished Milestones',
    description: 'Celebrate enduring love with engraved wine crystal, memory block frames & timeless keepsake gifts.',
    tag: 'Milestone Love',
    image: anniversaryImg,
    icon: Heart,
    accentBadgeColor: 'bg-[#ED008C]',
    itemCount: '24+ Curated Gifts'
  },
  {
    id: 'birthday',
    title: 'Birthday Gifts',
    scriptKicker: 'Joyful Celebrations',
    description: 'Delight them with magic photo mugs, insulated tumblers, celebration hampers & bespoke tech.',
    tag: 'Make It Unforgettable',
    image: birthdayImg,
    icon: Cake,
    accentBadgeColor: 'bg-[#2E3192]',
    itemCount: '36+ Unique Surprises'
  },
  {
    id: 'wedding',
    title: 'Wedding Gifts',
    scriptKicker: 'A Lifetime of Togetherness',
    description: 'Bless the newlyweds with customized couple caricatures, monogrammed crystal & celebration crates.',
    tag: 'Ever After',
    image: weddingImg,
    icon: Crown,
    accentBadgeColor: 'bg-[#ED008C]',
    itemCount: '28+ Heirloom Keepsakes'
  },
  {
    id: 'romance',
    title: 'Love & Romance',
    scriptKicker: 'Expressions of the Heart',
    description: 'Express what words cannot with plush photo cushions, radiant neon love signs & fresh rose bouquets.',
    tag: 'Pure Emotion',
    image: romanceImg,
    icon: Gift,
    accentBadgeColor: 'bg-[#2D3094]',
    itemCount: '30+ Romantic Delights'
  }
];

interface ShopOccasionsSectionProps {
  onSelectOccasion: (occasionKey: string, occasionTitle: string) => void;
  selectedOccasion?: string | null;
}

export const ShopOccasionsSection: React.FC<ShopOccasionsSectionProps> = ({
  onSelectOccasion,
  selectedOccasion
}) => {
  return (
    <section 
      id="shop-occasions" 
      aria-label="For Every Occasion"
      className="py-14 sm:py-20 px-4 md:px-8 max-w-7xl mx-auto"
    >
      {/* SECTION HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2D3094]/10 text-[#2D3094] text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles size={14} className="text-[#ED008C]" />
          <span>Celebration Moments</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-950 tracking-tight leading-tight">
          For Every Occasion
        </h2>
        
        <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-normal mt-2.5 leading-relaxed">
          Find the perfect gift for every celebration, milestone and special moment.
        </p>
      </div>

      {/* 2 × 2 OCCASION CARDS GRID (16:7 WIDE CARDS, ROUNDED 22-24px) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
        {OCCASIONS.map((occasion) => {
          const isSelected = selectedOccasion === occasion.title;
          const IconComponent = occasion.icon;

          return (
            <div
              key={occasion.id}
              id={`occasion-card-${occasion.id}`}
              onClick={() => onSelectOccasion(occasion.id, occasion.title)}
              className={`group relative overflow-hidden rounded-[22px] sm:rounded-[24px] aspect-[16/9] sm:aspect-[16/7.5] lg:aspect-[16/7] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border ${
                isSelected 
                  ? 'border-[#ED008C] ring-4 ring-[#ED008C]/20 shadow-xl' 
                  : 'border-slate-200/80 hover:border-[#2D3094]/40'
              }`}
            >
              {/* Cinematic Lifestyle Photography Background */}
              <img
                src={occasion.image}
                alt={occasion.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Sophisticated Dark Soft Gradient Overlay for Optimal Legibility */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/65 to-slate-950/20 group-hover:from-slate-950/95 group-hover:via-slate-950/75 group-hover:to-slate-950/35 transition-colors duration-500"
                aria-hidden="true"
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80"
                aria-hidden="true"
              />

              {/* Foreground Card Content */}
              <div className="absolute inset-0 p-5 sm:p-7 lg:p-9 flex flex-col justify-between z-10">
                
                {/* Top Row: Pill Tag + Item Count Badge */}
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-semibold tracking-wide">
                    <IconComponent size={12} className="text-pink-300" />
                    <span>{occasion.tag}</span>
                  </div>

                  <span className="hidden sm:inline-block text-[11px] text-white/70 font-medium tracking-wide uppercase">
                    {occasion.itemCount}
                  </span>
                </div>

                {/* Bottom Section: Script Kicker, Bold Heading, Subtitle & Interactive CTA */}
                <div className="transform group-hover:-translate-y-1 transition-transform duration-300 ease-out">
                  
                  {/* Elegant Script Typography Kicker */}
                  <span 
                    className="block text-pink-300 font-serif italic text-sm sm:text-base lg:text-lg mb-1 tracking-normal drop-shadow-sm font-medium"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {occasion.scriptKicker}
                  </span>

                  {/* Bold Modern Occasion Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-white tracking-tight leading-tight drop-shadow-md">
                    {occasion.title}
                  </h3>

                  {/* Refined Descriptive Subtitle */}
                  <p className="text-white/85 text-xs sm:text-sm font-normal mt-1.5 sm:mt-2 max-w-sm sm:max-w-md line-clamp-2 leading-relaxed drop-shadow">
                    {occasion.description}
                  </p>

                  {/* "Shop Gifts →" Interactive CTA Button */}
                  <div className="mt-3.5 sm:mt-4.5 pt-1">
                    <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white text-slate-900 text-xs sm:text-sm font-bold shadow-lg group-hover:bg-[#ED008C] group-hover:text-white transition-all duration-300">
                      <span>Shop Gifts</span>
                      <ArrowRight 
                        size={14} 
                        className="group-hover:translate-x-1 transition-transform duration-300 text-[#2D3094] group-hover:text-white" 
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Active Indicator Bar on Selection */}
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#ED008C] z-20" />
              )}
            </div>
          );
        })}
      </div>

      {/* Trust Subtext */}
      <div className="mt-8 sm:mt-10 text-center">
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Whatever the occasion, <span className="text-[#2D3094] font-bold">SozyImpressions</span> crafts thoughtful personalised treasures made for the moment.
        </p>
      </div>
    </section>
  );
};
