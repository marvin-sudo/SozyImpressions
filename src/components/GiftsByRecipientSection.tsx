import React from 'react';
import africanManImg from '../assets/images/african_man_him_1788636032439.jpg';
import africanWomanImg from '../assets/images/african_woman_her_1788636045505.jpg';
import africanKidImg from '../assets/images/african_kid_kids_1788636058555.jpg';

interface RecipientCard {
  id: 'him' | 'her' | 'kids';
  label: string;
  recipientKey: string;
  bgColor: string;
  textColor: string;
  glowColor: string;
  image: string;
  alt: string;
  description: string;
}

const RECIPIENT_CARDS: RecipientCard[] = [
  {
    id: 'him',
    label: 'HIM',
    recipientKey: 'Him',
    bgColor: 'bg-[#FCA5B3]',
    textColor: 'text-white',
    glowColor: 'group-hover:ring-[#FCA5B3]/50',
    image: africanManImg,
    alt: 'Personalised Gifts For Him - African Gentleman',
    description: 'Executive barware, smart tech, sleek keychains & desk essentials'
  },
  {
    id: 'her',
    label: 'HER',
    recipientKey: 'Her',
    bgColor: 'bg-[#F5A623]',
    textColor: 'text-amber-100',
    glowColor: 'group-hover:ring-[#F5A623]/50',
    image: africanWomanImg,
    alt: 'Personalised Gifts For Her - African Lady',
    description: 'Sparkling jewellery, custom lamps, fresh florals & gourmet chocolates'
  },
  {
    id: 'kids',
    label: 'KIDS',
    recipientKey: 'Kids',
    bgColor: 'bg-[#83182E]',
    textColor: 'text-[#FFA8B6]',
    glowColor: 'group-hover:ring-[#83182E]/50',
    image: africanKidImg,
    alt: 'Personalised Gifts For Kids - African Child',
    description: 'Playful caricatures, 3D glow nightlights & surprise celebration treats'
  }
];

interface GiftsByRecipientSectionProps {
  onSelectRecipient: (recipientKey: string) => void;
  selectedRecipient?: string | null;
}

export const GiftsByRecipientSection: React.FC<GiftsByRecipientSectionProps> = ({
  onSelectRecipient,
  selectedRecipient
}) => {
  return (
    <section 
      id="gifts-by-recipient" 
      aria-label="Shop Gifts By Recipient - Him, Her, Kids"
      className="py-12 sm:py-16 px-4 md:px-8 max-w-7xl mx-auto"
    >
      {/* 3-COLUMN RECIPIENT BANNER CARDS - MATCHING REFERENCE LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 pt-8 sm:pt-12">
        {RECIPIENT_CARDS.map((card) => {
          const isSelected = selectedRecipient?.toLowerCase() === card.recipientKey.toLowerCase();

          return (
            <div
              key={card.id}
              id={`recipient-card-${card.id}`}
              onClick={() => onSelectRecipient(card.recipientKey)}
              className="group relative cursor-pointer pt-8 sm:pt-10 select-none"
            >
              {/* PILL / ROUNDED BANNER CARD CONTAINER */}
              <div 
                className={`relative w-full h-[120px] sm:h-[135px] lg:h-[145px] rounded-[26px] sm:rounded-[30px] lg:rounded-[34px] ${card.bgColor} px-6 sm:px-8 flex items-center justify-between transition-all duration-300 shadow-sm hover:shadow-xl ${
                  isSelected 
                    ? 'ring-4 ring-[#ED008C] shadow-lg scale-[1.02]' 
                    : 'group-hover:scale-[1.015]'
                }`}
              >
                {/* LEFT: BOLD TYPOGRAPHY LABEL (HIM / HER / KIDS) */}
                <div className="relative z-10">
                  <h3 
                    className={`font-heading font-black text-3xl sm:text-4xl lg:text-[44px] tracking-wider leading-none drop-shadow-xs ${card.textColor}`}
                  >
                    {card.label}
                  </h3>
                  
                  {/* Subtle Subtitle / CTA on Hover */}
                  <span className="inline-block mt-2 text-xs sm:text-[13px] font-semibold text-white/90 tracking-tight group-hover:underline">
                    Explore Gifts →
                  </span>
                </div>

                {/* RIGHT: PORTRAIT IMAGE BREAKING OUT OVER TOP BORDER */}
                <div className="absolute right-2 sm:right-4 bottom-0 w-[140px] sm:w-[165px] lg:w-[185px] h-[160px] sm:h-[185px] lg:h-[205px] z-20 pointer-events-none flex items-end justify-center transition-transform duration-400 ease-out group-hover:scale-105 group-hover:-translate-y-1">
                  <img
                    src={card.image}
                    alt={card.alt}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="max-h-full max-w-full object-contain drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
