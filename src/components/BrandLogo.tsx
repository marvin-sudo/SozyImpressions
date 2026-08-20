import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/mockData';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'footer' | 'pill';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  className = '',
  size = 'md',
  showTagline = false
}) => {
  const [imgError, setImgError] = useState(false);

  // Height configurations
  const heightClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11 md:h-12',
    lg: 'h-12 sm:h-14 md:h-16'
  }[size];

  // Fallback vector brandmark if image fails or while rendering
  const renderVectorFallback = () => {
    const isDark = variant === 'dark' || variant === 'footer';
    
    return (
      <div className={`inline-flex items-center gap-2.5 select-none font-sans ${className}`}>
        {/* Stylized Print CMYK Emblem */}
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#2E3192] to-[#2D3094] p-1.5 shadow-md shadow-[#2D3094]/20 border border-white/20">
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="38" cy="38" r="28" fill="#00AEEF" fillOpacity="0.85" />
            <circle cx="62" cy="38" r="28" fill="#ED008C" fillOpacity="0.85" />
            <circle cx="50" cy="62" r="28" fill="#FFF200" fillOpacity="0.75" />
            <circle cx="50" cy="50" r="18" fill="#2E3192" />
            <path d="M50 32C42 32 36 38 36 46C36 54 44 58 50 62C56 66 64 70 64 78C64 86 58 92 50 92" stroke="white" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>

        {/* Brand Typography */}
        <div className="flex flex-col text-left">
          <div className="flex items-baseline tracking-tight font-heading font-black leading-none">
            <span className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-[#2D3094]'}`}>
              SOZY
            </span>
            <span className="text-xl sm:text-2xl font-black text-[#ED008C] ml-1">
              IMPRESSIONS
            </span>
            <span className={`text-[10px] font-bold ml-1 uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              LTD
            </span>
          </div>

          {(showTagline || isDark) && (
            <span className={`text-[9px] uppercase tracking-widest font-semibold mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
              Print • Brand • Create • Impress
            </span>
          )}
        </div>
      </div>
    );
  };

  // If the image encountered an error, render the clean vector fallback
  if (imgError) {
    return renderVectorFallback();
  }

  // Footer / Dark variant
  if (variant === 'footer' || variant === 'dark') {
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        {/* High contrast crisp presentation on dark footer */}
        <div className="bg-white/95 hover:bg-white px-3 py-1.5 rounded-xl border border-white/20 shadow-lg transition-all flex items-center justify-center backdrop-blur-sm">
          <img
            src={COMPANY_INFO.logoUrl}
            alt="Sozy Impressions Ltd Logo"
            className={`${heightClasses} w-auto max-w-[200px] sm:max-w-[230px] object-contain`}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            loading="eager"
          />
        </div>
      </div>
    );
  }

  // Pill variant (contained)
  if (variant === 'pill') {
    return (
      <div className={`inline-flex items-center bg-white px-3.5 py-1.5 rounded-2xl shadow-sm border border-slate-100 ${className}`}>
        <img
          src={COMPANY_INFO.logoUrl}
          alt="Sozy Impressions Ltd Logo"
          className={`${heightClasses} w-auto max-w-[190px] sm:max-w-[220px] object-contain`}
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
          loading="eager"
        />
      </div>
    );
  }

  // Standard Header / Light variant
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={COMPANY_INFO.logoUrl}
        alt="Sozy Impressions Ltd Logo"
        className={`${heightClasses} w-auto max-w-[200px] sm:max-w-[250px] object-contain group-hover:scale-105 transition-transform duration-200`}
        onError={() => setImgError(true)}
        referrerPolicy="no-referrer"
        loading="eager"
      />
    </div>
  );
};
