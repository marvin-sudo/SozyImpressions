import React from 'react';
import { Phone, Calculator } from 'lucide-react';
import { View } from '../types';
import { COMPANY_INFO } from '../data/mockData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface StickyMobileBarProps {
  navigate: (view: View, param?: string) => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({
  navigate
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2.5 px-4 shadow-2xl flex items-center justify-between gap-2 font-sans">
      
      {/* 1. Quick Quote */}
      <button
        onClick={() => navigate('quote')}
        className="flex-1 bg-[#2D3094] active:bg-[#1f2168] text-white text-[11px] font-heading font-black uppercase tracking-wider py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5 shadow-md whitespace-nowrap"
      >
        <Calculator size={14} className="text-[#ED008C] shrink-0" />
        <span className="whitespace-nowrap">Get Quote</span>
      </button>

      {/* 2. WhatsApp Direct */}
      <a
        href={COMPANY_INFO.whatsappDirectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-emerald-600 active:bg-emerald-700 text-white text-[11px] font-heading font-black uppercase tracking-wider py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5 shadow-md"
      >
        <WhatsAppIcon size={16} />
        <span>WhatsApp</span>
      </a>

      {/* 3. Call */}
      <a
        href={`tel:${COMPANY_INFO.phone}`}
        className="w-10 h-10 rounded-xl bg-slate-100 active:bg-slate-200 text-slate-800 flex items-center justify-center border border-slate-200 shrink-0"
        title="Call Sozy Impressions"
      >
        <Phone size={16} className="text-[#ED008C]" />
      </a>

    </div>
  );
};
