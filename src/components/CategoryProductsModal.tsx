import React from 'react';
import { X, ShoppingBag, ArrowRight, Heart } from 'lucide-react';
import { Product, Currency, CartItem } from '../types';

interface CategoryProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  products: Product[];
  currency: Currency;
  onOpenCustomizer: (product: Product) => void;
  onAddToCart?: (item: CartItem) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

export const CategoryProductsModal: React.FC<CategoryProductsModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  products,
  currency,
  onOpenCustomizer,
  onAddToCart,
  wishlist,
  onToggleWishlist
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* MODAL HEADER */}
        <div className="p-5 sm:p-7 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50/70">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2D3094]/10 text-[#2D3094] text-xs font-bold uppercase tracking-wider mb-1.5">
              <span>Curated Selection</span>
            </div>
            <h3 className="font-heading font-black text-xl sm:text-2xl text-slate-900 tracking-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors shadow-xs hover:shadow-md cursor-pointer shrink-0"
            title="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* MODAL CONTENT: PRODUCTS GRID */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                <ShoppingBag size={24} />
              </div>
              <h4 className="font-heading font-bold text-base text-slate-800 mb-1">
                No products found in this category
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mb-5">
                Our artisans are preparing new customized items for this collection.
              </p>
              <button
                onClick={onClose}
                className="bg-[#2D3094] text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer"
              >
                Back to Showcases
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
              {products.map((product) => {
                const isWishlisted = wishlist.includes(product.id);
                const displayPrice = currency === 'UGX'
                  ? `UGX ${product.priceUGX.toLocaleString()}`
                  : `$${product.priceUSD.toFixed(2)}`;

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-[#2D3094]/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group min-w-0"
                  >
                    <div className="min-w-0">
                      {/* Product Image */}
                      <div className="relative aspect-square bg-[#F8F9FB] p-2 sm:p-4 flex items-center justify-center overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        
                        {/* Wishlist Button */}
                        <button
                          onClick={() => onToggleWishlist(product.id)}
                          className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/90 shadow-xs flex items-center justify-center text-slate-400 hover:text-[#ED008C] transition-colors cursor-pointer"
                        >
                          <Heart
                            size={12}
                            className={`sm:w-3.5 sm:h-3.5 ${isWishlisted ? 'fill-[#ED008C] text-[#ED008C]' : ''}`}
                          />
                        </button>

                        {/* Badge */}
                        {product.badge && (
                          <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-[#2D3094] text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md shadow-xs">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="p-2.5 sm:p-4 min-w-0">
                        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5 sm:mb-1 truncate">
                          {product.category}
                        </span>
                        <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 leading-snug line-clamp-2 mb-1.5 sm:mb-2 group-hover:text-[#2D3094] transition-colors">
                          {product.name}
                        </h4>
                        <div className="flex items-baseline flex-wrap gap-1 sm:gap-2 mb-1">
                          <span className="font-heading font-black text-xs sm:text-base text-slate-950">
                            {displayPrice}
                          </span>
                          {product.originalPriceUGX && (
                            <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                              {currency === 'UGX'
                                ? `UGX ${product.originalPriceUGX.toLocaleString()}`
                                : `$${product.originalPriceUSD?.toFixed(2)}`}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-2.5 sm:p-4 pt-0 flex gap-1.5 sm:gap-2">
                      <button
                        onClick={() => {
                          onClose();
                          onOpenCustomizer(product);
                        }}
                        className="flex-1 min-w-0 bg-[#2D3094] hover:bg-[#1e2063] text-white py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span className="truncate">Customise</span>
                        <ArrowRight size={12} />
                      </button>

                      {onAddToCart && (
                        <button
                          onClick={() => {
                            onAddToCart({
                              product,
                              quantity: 1,
                              customization: {
                                text: 'Sample Custom Text'
                              }
                            });
                          }}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                          title="Quick Add to Cart"
                        >
                          <ShoppingBag size={14} />
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 px-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {products.length} products with custom UV/laser personalization in Uganda</span>
          <button
            onClick={onClose}
            className="font-bold text-[#2D3094] hover:text-[#ED008C] transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
