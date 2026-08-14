import React from 'react';
import { MessageSquare, Phone, Calculator, ShoppingBag } from 'lucide-react';
import { View, CartItem } from '../types';
import { COMPANY_INFO } from '../data/mockData';

interface StickyMobileBarProps {
  navigate: (view: View, param?: string) => void;
  cart: CartItem[];
  onOpenCart: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({
  navigate,
  cart,
  onOpenCart
}) => {
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2.5 px-4 shadow-2xl flex items-center justify-between gap-2 font-sans">
      
      {/* 1. Quick Quote */}
      <button
        onClick={() => navigate('quote')}
        className="flex-1 bg-[#2D3094] active:bg-[#1f2168] text-white text-[11px] font-heading font-black uppercase tracking-wider py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5 shadow-md"
      >
        <Calculator size={14} className="text-[#ED008C]" />
        <span>Get Quote</span>
      </button>

      {/* 2. WhatsApp Direct */}
      <a
        href={COMPANY_INFO.whatsappDirectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-emerald-600 active:bg-emerald-700 text-white text-[11px] font-heading font-black uppercase tracking-wider py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5 shadow-md"
      >
        <MessageSquare size={14} />
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

      {/* 4. Cart Button */}
      {cart.length > 0 && (
        <button
          onClick={onOpenCart}
          className="relative w-10 h-10 rounded-xl bg-[#ED008C] text-white flex items-center justify-center shrink-0 shadow-md"
          title="Open Cart"
        >
          <ShoppingBag size={16} />
          <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
            {totalCartCount}
          </span>
        </button>
      )}

    </div>
  );
};
