import React, { useEffect } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ArrowRight, 
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { motion } from 'motion/react';
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
  onBrowseShop?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
  onBrowseShop
}) => {
  // Lock body scroll while cart is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Handle ESC key to dismiss
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Safe pricing calculation to prevent NaN or undefined crashes
  const getItemPrices = (item: CartItem) => {
    const qty = item.quantity && item.quantity > 0 ? item.quantity : 1;
    const unitUGX = typeof item.unitPriceUGX === 'number' && !isNaN(item.unitPriceUGX)
      ? item.unitPriceUGX
      : (typeof item.product?.priceUGX === 'number' ? item.product.priceUGX : 0);
      
    const unitUSD = typeof item.unitPriceUSD === 'number' && !isNaN(item.unitPriceUSD)
      ? item.unitPriceUSD
      : (typeof item.product?.priceUSD === 'number' ? item.product.priceUSD : (unitUGX ? Number((unitUGX / 3800).toFixed(2)) : 0));

    const subUGX = typeof item.subtotalUGX === 'number' && !isNaN(item.subtotalUGX)
      ? item.subtotalUGX
      : (unitUGX * qty);

    const subUSD = typeof item.subtotalUSD === 'number' && !isNaN(item.subtotalUSD)
      ? item.subtotalUSD
      : (unitUSD * qty);

    return { qty, unitUGX, unitUSD, subUGX, subUSD };
  };

  const totalUGX = cart.reduce((sum, item) => sum + getItemPrices(item).subUGX, 0);
  const totalUSD = cart.reduce((sum, item) => sum + getItemPrices(item).subUSD, 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/65 backdrop-blur-xs flex justify-end transition-opacity duration-200"
      onClick={onClose}
    >
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md bg-white h-full shadow-2xl flex flex-col justify-between text-left relative overflow-hidden"
      >
        
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-100 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#2D3094]/10 text-[#2D3094]">
              <ShoppingCart size={18} />
            </div>
            <div>
              <h3 className="font-heading font-black text-base sm:text-lg text-slate-900 leading-tight">
                Shopping Cart
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} in order
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close Shopping Cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 divide-y divide-slate-100/80">
          {cart.length === 0 ? (
            <div className="text-center py-20 px-4 text-slate-400">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag size={28} />
              </div>
              <div className="font-heading font-bold text-slate-700 text-base mb-1.5">
                Your cart is empty
              </div>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed mb-6">
                Explore our corporate gifts, personalised keepsakes, and commercial print catalogue to add items.
              </p>
              <button
                onClick={() => {
                  onClose();
                  if (onBrowseShop) onBrowseShop();
                }}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#2D3094] hover:bg-[#20236e] text-white text-xs font-heading font-bold uppercase tracking-wider shadow-md shadow-[#2D3094]/20 transition-all cursor-pointer"
              >
                Browse Gift Shop
              </button>
            </div>
          ) : (
            cart.map((item, idx) => {
              const { qty, subUGX, subUSD } = getItemPrices(item);
              const productImage = item.product?.image || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&q=80';
              const productName = item.product?.name || 'Custom Product';

              return (
                <div 
                  key={idx}
                  className={`pt-3.5 first:pt-0 flex gap-3 relative group`}
                >
                  <img 
                    src={productImage} 
                    alt={productName} 
                    className="w-16 h-16 rounded-xl object-cover bg-slate-50 border border-slate-200 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&q=80';
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-heading font-bold text-xs text-slate-900 leading-snug line-clamp-2">
                        {productName}
                      </h4>
                      {/* Remove Item Button */}
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1 -mr-1 transition-colors cursor-pointer"
                        title="Remove Item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    
                    {/* Customization Details */}
                    {item.customization && (
                      <div className="text-[10px] text-slate-500 mt-1 space-y-0.5">
                        {item.customization.color && <div>Color: <strong className="text-slate-700">{item.customization.color}</strong></div>}
                        {item.customization.text && <div>Text: <strong className="text-[#2D3094]">"{item.customization.text}"</strong></div>}
                        {item.customization.placement && <div>Placement: <strong className="text-slate-700">{item.customization.placement}</strong></div>}
                      </div>
                    )}

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 bg-slate-100/90 border border-slate-200 rounded-lg p-0.5">
                        <button 
                          onClick={() => onUpdateQuantity(idx, Math.max(1, qty - 1))}
                          className="p-1 text-slate-600 hover:text-slate-950 hover:bg-white rounded transition-colors cursor-pointer disabled:opacity-40"
                          disabled={qty <= 1}
                          title="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-bold px-2 text-slate-800 tabular-nums">{qty}</span>
                        <button 
                          onClick={() => onUpdateQuantity(idx, qty + 1)}
                          className="p-1 text-slate-600 hover:text-slate-950 hover:bg-white rounded transition-colors cursor-pointer"
                          title="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="font-heading font-black text-xs text-[#2D3094] text-right">
                        {currency === 'UGX' 
                          ? `UGX ${Math.round(subUGX).toLocaleString()}` 
                          : `$${subUSD.toFixed(2)}`}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Checkout Bar */}
        {cart.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-slate-100 bg-white shadow-lg">
            <div className="flex justify-between items-baseline mb-3.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subtotal:</span>
              <span className="font-heading font-black text-xl text-[#2D3094]">
                {currency === 'UGX' 
                  ? `UGX ${Math.round(totalUGX).toLocaleString()}` 
                  : `$${totalUSD.toFixed(2)}`}
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="w-full bg-[#ED008C] hover:bg-[#d4007d] active:bg-[#ba006e] text-white font-heading font-bold text-xs uppercase tracking-wider py-4 rounded-full shadow-lg shadow-[#ED008C]/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>

            <div className="mt-3 flex items-center justify-center gap-2">
              <div className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded flex items-center justify-center h-5" title="MTN Mobile Money">
                <img 
                  src={PAYMENT_LOGOS.mtn} 
                  alt="MTN MoMo" 
                  className="h-3.5 w-auto object-contain" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded flex items-center justify-center h-5" title="Airtel Money">
                <img 
                  src={PAYMENT_LOGOS.airtelMoney} 
                  alt="Airtel Money" 
                  className="h-3.5 w-auto object-contain" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded flex items-center justify-center h-5" title="Visa / Mastercard">
                <img 
                  src={PAYMENT_LOGOS.visaMastercard} 
                  alt="Visa & Mastercard" 
                  className="h-3.5 w-auto object-contain" 
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="mt-2.5 text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5 font-medium">
              <ShieldCheck size={13} className="text-emerald-500 shrink-0" />
              <span>Free 3D Digital Proof & Quality Check Included</span>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
};
