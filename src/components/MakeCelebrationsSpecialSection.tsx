import React from 'react';
import { ArrowRight } from 'lucide-react';
import celebrationFlowersImg from '../assets/images/celebration_flowers_1788635644325.jpg';
import celebrationCakeImg from '../assets/images/celebration_cake_1788635656003.jpg';
import celebrationExplosionBoxImg from '../assets/images/celebration_explosion_box_1788635668598.jpg';
import celebrationChocolatesImg from '../assets/images/celebration_chocolates_1788635680950.jpg';
import celebrationGreetingCardImg from '../assets/images/celebration_greeting_card_1788635694483.jpg';
import celebrationJewelleryImg from '../assets/images/celebration_jewellery_1788635705456.jpg';

interface CelebrationCard {
  id: string;
  title: string;
  category: string;
  bgColor: string;
  hoverBorderColor: string;
  image: string;
  alt: string;
  imageWidthClass?: string;
}

const CELEBRATION_CARDS: CelebrationCard[] = [
  {
    id: 'flowers',
    title: 'Personalised Flowers',
    category: 'Personalised Flowers',
    bgColor: 'bg-[#EBF0F6]',
    hoverBorderColor: 'hover:border-[#2D3094]/40',
    image: celebrationFlowersImg,
    alt: 'Personalised Flowers in Wooden Photo Box',
    imageWidthClass: 'w-[105px] sm:w-[125px] lg:w-[135px]'
  },
  {
    id: 'photo-cakes',
    title: 'Photo Cakes',
    category: 'Photo Cakes',
    bgColor: 'bg-[#D8E3EF]',
    hoverBorderColor: 'hover:border-[#2E3192]/40',
    image: celebrationCakeImg,
    alt: 'Custom Edible Photo Birthday Cake',
    imageWidthClass: 'w-[110px] sm:w-[130px] lg:w-[140px]'
  },
  {
    id: 'explosion-box',
    title: 'Explosion Box',
    category: 'Explosion Box',
    bgColor: 'bg-[#E8B6BA]',
    hoverBorderColor: 'hover:border-[#ED008C]/40',
    image: celebrationExplosionBoxImg,
    alt: 'Handcrafted Multi-Layer 3D Photo Explosion Box',
    imageWidthClass: 'w-[115px] sm:w-[135px] lg:w-[145px]'
  },
  {
    id: 'chocolates',
    title: 'Chocolates',
    category: 'Chocolates',
    bgColor: 'bg-[#D9B89C]',
    hoverBorderColor: 'hover:border-[#9A6B43]/40',
    image: celebrationChocolatesImg,
    alt: 'Gourmet Chocolate Gift Set with Photo Frame',
    imageWidthClass: 'w-[115px] sm:w-[135px] lg:w-[145px]'
  },
  {
    id: 'greeting-cards',
    title: 'Greeting Cards',
    category: 'Greeting Cards',
    bgColor: 'bg-[#CBE3DF]',
    hoverBorderColor: 'hover:border-[#2D3094]/40',
    image: celebrationGreetingCardImg,
    alt: 'Bespoke Standing Photo Greeting Card with Rustic Base',
    imageWidthClass: 'w-[100px] sm:w-[120px] lg:w-[130px]'
  },
  {
    id: 'jewellery',
    title: 'Jewellery',
    category: 'Jewellery',
    bgColor: 'bg-[#E1E2E5]',
    hoverBorderColor: 'hover:border-slate-400',
    image: celebrationJewelleryImg,
    alt: 'Engraved Silver Zirconia Couple Cuff Bangle',
    imageWidthClass: 'w-[105px] sm:w-[125px] lg:w-[135px]'
  }
];

interface MakeCelebrationsSpecialSectionProps {
  onSelectCelebration: (categoryName: string) => void;
  selectedCategory?: string | null;
}

export const MakeCelebrationsSpecialSection: React.FC<MakeCelebrationsSpecialSectionProps> = ({
  onSelectCelebration,
  selectedCategory
}) => {
  return (
    <section 
      id="make-celebrations-special" 
      aria-label="Make Celebrations Special With"
      className="py-14 sm:py-20 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-10 xl:gap-12">
        
        {/* LEFT COLUMN: Large Heading with Soft Ambient Halo (Matching Image Layout) */}
        <div className="relative lg:w-[28%] xl:w-[26%] flex-shrink-0 flex flex-col justify-center min-h-[140px] lg:min-h-full">
          {/* Soft circular background glow */}
          <div 
            className="absolute -left-6 top-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-gradient-to-br from-amber-50/80 via-orange-50/40 to-transparent pointer-events-none -z-10 blur-xl"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[46px] font-heading font-black text-slate-900 tracking-tight leading-[1.1] sm:leading-[1.12]">
              Make Celebrations<br />
              <span className="text-slate-900">Special With</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-3 hidden sm:block">
              Express profound love and joy with handcrafted delights made to surprise and delight.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: 2 Rows × 3 Columns Cards Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-5 xl:gap-6 pt-4 sm:pt-6">
          {CELEBRATION_CARDS.map((card) => {
            const isSelected = selectedCategory === card.category;

            return (
              <div
                key={card.id}
                id={`celebration-card-${card.id}`}
                onClick={() => onSelectCelebration(card.category)}
                className="group relative cursor-pointer pt-6 sm:pt-7"
              >
                {/* CARD BACKGROUND CONTAINER */}
                <div 
                  className={`relative w-full h-[105px] sm:h-[115px] lg:h-[120px] rounded-[22px] sm:rounded-[24px] ${card.bgColor} p-4 sm:p-5 flex items-center justify-between transition-all duration-300 shadow-xs hover:shadow-md border ${
                    isSelected 
                      ? 'border-[#ED008C] ring-3 ring-[#ED008C]/20 shadow-md' 
                      : `border-transparent ${card.hoverBorderColor}`
                  }`}
                >
                  {/* Left Side Label & Arrow Link */}
                  <div className="relative z-10 max-w-[55%] pr-2">
                    <div className="inline-flex items-center gap-1 text-slate-900 font-heading font-bold text-sm sm:text-[15px] lg:text-base leading-snug group-hover:text-[#2D3094] transition-colors">
                      <span className="whitespace-pre-line">{card.title}</span>
                      <ArrowRight 
                        size={15} 
                        className="flex-shrink-0 text-slate-700 group-hover:text-[#ED008C] group-hover:translate-x-1 transition-all duration-300" 
                      />
                    </div>
                  </div>

                  {/* Right Side 3D Image popping out over the top boundary */}
                  <div className={`absolute right-1.5 sm:right-2.5 -top-6 sm:-top-7 lg:-top-8 ${card.imageWidthClass || 'w-[110px] sm:w-[130px]'} aspect-square z-20 pointer-events-none transition-transform duration-400 ease-out group-hover:-translate-y-2 group-hover:scale-105`}>
                    <img
                      src={card.image}
                      alt={card.alt}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-contain drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
