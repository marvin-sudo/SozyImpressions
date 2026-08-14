import React from 'react';
import { CLIENT_LOGOS } from '../data/mockData';

export const TrustedByMarquee: React.FC = () => {
  return (
    <section className="py-10 bg-[#F7F8FA] border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center mb-6">
        <span className="text-[11px] font-black uppercase tracking-widest text-[#2D3094] bg-[#2D3094]/10 px-4 py-1.5 rounded-full inline-block">
          Trusted by businesses, institutions and organisations across Uganda & East Africa
        </span>
      </div>

      {/* Infinite Horizontal Logo Marquee */}
      <div className="relative w-full overflow-hidden select-none">
        <div className="flex gap-8 md:gap-12 animate-marquee whitespace-nowrap py-2">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map((brand, idx) => (
            <div 
              key={idx}
              className="inline-flex items-center gap-3 bg-white border border-slate-200 px-6 py-3 rounded-2xl shadow-sm hover:shadow-md hover:border-[#ED008C]/40 transition-all cursor-default group shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#2E3192] to-[#ED008C] text-white font-heading font-black text-sm flex items-center justify-center shadow-sm">
                {brand.name.charAt(0)}
              </div>
              <div className="text-left">
                <span className="font-heading font-black text-sm text-slate-800 group-hover:text-[#2D3094] transition-colors block leading-tight">
                  {brand.name}
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  {brand.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
