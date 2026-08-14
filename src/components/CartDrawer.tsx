import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ArrowRight, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { CartItem, Currency } from '../types';
import { PAYMENT_LOGOS } from '../data/mockData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currency: Currency;
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout
}) => {
  if (!isOpen) return null;

  const totalUGX = cart.reduce((sum, item) => sum + item.subtotalUGX, 0);
  const totalUSD = cart.reduce((sum, item) => sum + item.subtotalUSD, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between text-left animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-[#2D3094]" size={20} />
            <h3 className="font-heading font-black text-lg text-slate-900">
              Your Custom Order ({cart.length})
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <ShoppingCart size={48} className="mx-auto mb-3 text-slate-300" />
              <div className="font-heading font-bold text-slate-600 mb-1">Your cart is empty</div>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Explore our customized corporate gifts, executive apparel, and print catalogue to add items.
              </p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div 
                key={idx}
                className="bg-[#F7F8FA] rounded-2xl p-4 border border-slate-200 flex gap-3 relative group"
              >
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  className="w-16 h-16 rounded-xl object-cover bg-white border border-slate-200 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-bold text-xs text-slate-900 leading-snug line-clamp-1">
                    {item.product.name}
                  </h4>
                  
                  {/* Customization Badges */}
                  {item.customization && (
                    <div className="text-[10px] text-slate-500 mt-1 space-y-0.5">
                      {item.customization.color && <div>Color: <strong className="text-slate-700">{item.customization.color}</strong></div>}
                      {item.customization.text && <div>Text: <strong className="text-[#2D3094]">"{item.customization.text}"</strong></div>}
                      {item.customization.placement && <div>Placement: <strong className="text-slate-700">{item.customization.placement}</strong></div>}
                    </div>
                  )}

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200/80">
                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-0.5">
                      <button 
                        onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 5))}
                        className="p-1 text-slate-500 hover:text-slate-900 rounded"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-bold px-1.5 text-slate-800">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(idx, item.quantity + 5)}
                        className="p-1 text-slate-500 hover:text-slate-900 rounded"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className="font-heading font-black text-xs text-[#2D3094]">
                      {currency === 'UGX' ? `UGX ${item.subtotalUGX.toLocaleString()}` : `$${item.subtotalUSD.toFixed(2)}`}
                    </div>
                  </div>
                </div>

                {/* Remove Item Button */}
                <button
                  onClick={() => onRemoveItem(idx)}
                  className="text-slate-400 hover:text-red-500 p-1"
                  title="Remove Item"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Bar */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-white">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subtotal:</span>
              <span className="font-heading font-black text-xl text-[#2D3094]">
                {currency === 'UGX' ? `UGX ${totalUGX.toLocaleString()}` : `$${totalUSD.toFixed(2)}`}
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="w-full bg-[#ED008C] hover:bg-[#d4007d] text-white font-heading font-bold text-xs uppercase tracking-wider py-4 rounded-full shadow-lg shadow-[#ED008C]/25 transition-all flex items-center justify-center gap-2 hover:scale-105"
            >
              <span>Proceed to Checkout & Delivery</span>
              <ArrowRight size={16} />
            </button>

            <div className="mt-3 flex items-center justify-center gap-2">
              <div className="bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded flex items-center justify-center h-5" title="MTN Mobile Money">
                <img 
                  src={PAYMENT_LOGOS.mtn} 
                  alt="MTN MoMo" 
                  className="h-3.5 w-auto object-contain" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded flex items-center justify-center h-5" title="Airtel Money">
                <img 
                  src={PAYMENT_LOGOS.airtelMoney} 
                  alt="Airtel Money" 
                  className="h-3.5 w-auto object-contain" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded flex items-center justify-center h-5" title="Visa / Mastercard">
                <img 
                  src={PAYMENT_LOGOS.visaMastercard} 
                  alt="Visa & Mastercard" 
                  className="h-3.5 w-auto object-contain" 
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="mt-2 text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span>Includes Free Digital 3D Artwork Proof</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
