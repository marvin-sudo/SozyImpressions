import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CLIENT_LOGOS } from '../data/mockData';
import { EASE_PREMIUM, VIEWPORT_CONFIG } from '../utils/animations';

interface ClientLogoItemProps {
  brand: {
    name: string;
    category?: string;
    logoUrl?: string;
  };
}

const ClientLogoBadge: React.FC<ClientLogoItemProps> = ({ brand }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div 
      className="inline-flex items-center justify-center bg-white border border-slate-200/80 h-16 sm:h-20 w-36 sm:w-44 md:w-52 px-4 py-2.5 rounded-2xl shadow-xs hover:shadow-md hover:border-[#ED008C]/50 transition-all cursor-pointer group shrink-0"
      title={brand.name}
    >
      {brand.logoUrl && !hasError ? (
        <img 
          src={brand.logoUrl} 
          alt={`${brand.name} logo`}
          className="max-h-12 sm:max-h-14 w-auto max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          loading="eager"
        />
      ) : (
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2E3192] to-[#ED008C] text-white font-heading font-black text-sm flex items-center justify-center shadow-xs">
          {brand.name.charAt(0)}
        </div>
      )}
    </div>
  );
};

export const TrustedByMarquee: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-10 bg-[#F7F8FA] border-b border-slate-200/80 overflow-hidden">
      <motion.div 
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_CONFIG}
        transition={{ duration: 0.75, ease: EASE_PREMIUM }}
        className="max-w-7xl mx-auto px-4 text-center mb-6"
      >
        <span className="text-[11px] font-black uppercase tracking-widest text-[#2D3094] bg-[#2D3094]/10 px-4 py-1.5 rounded-full inline-block">
          Trusted by businesses, institutions and organisations across Uganda & East Africa
        </span>
      </motion.div>

      {/* Infinite Horizontal Logo Marquee */}
      <motion.div 
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT_CONFIG}
        transition={{ duration: 0.85, delay: 0.15, ease: EASE_PREMIUM }}
        className="relative w-full overflow-hidden select-none"
      >
        <div className="flex gap-4 sm:gap-6 md:gap-8 animate-marquee hover:[animation-play-state:paused] whitespace-nowrap py-2">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map((brand, idx) => (
            <ClientLogoBadge key={idx} brand={brand} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

