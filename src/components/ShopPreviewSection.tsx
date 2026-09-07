import React, { useState } from 'react';
import { 
  ShoppingCart, 
  ArrowRight, 
  Eye
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { View, Currency, Product, CartItem } from '../types';
import { PRODUCTS_DATA } from '../data/mockData';

interface ShopPreviewSectionProps {
  navigate: (view: View, param?: string) => void;
  currency: Currency;
  onAddToCart: (item: CartItem) => void;
}

export const ShopPreviewSection: React.FC<ShopPreviewSectionProps> = ({
  navigate,
  currency
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Apparel',
    'Flasks',
    'Mugs',
    'Gift Sets',
    'Notebooks',
    'Pens',
    'Trophies',
    'Banners',
    'Business Cards',
    'Brochures',
    'Packaging',
    'Stickers',
    'Umbrellas'
  ];

  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter(p => p.category === selectedCategory);

  const handleDirectWhatsApp = (product: Product) => {
    const priceText = currency === 'UGX' ? `UGX ${product.priceUGX.toLocaleString()}` : `${product.priceUSD}`;
    const message = `Hello Sozy Impressions! I am interested in inquiring/ordering "${product.name}" (Price: ${priceText}). Please guide me on customization and delivery.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/256787662183?text=${encoded}`, '_blank');
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-[#F7F8FA] border-b border-slate-200/80 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ED008C]/10 text-[#ED008C] text-xs font-black uppercase tracking-wider mb-3">
              <span>Direct E-Commerce & Corporate Swag Store</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-[#121212] tracking-tight leading-tight">
              Shop Products That Make <br />
              <span className="text-[#2D3094]">Your Brand Stand Out.</span>
            </h2>
            <p className="text-base text-slate-600 mt-3 font-normal leading-relaxed">
              Order customized corporate gifts, executive apparel, marketing collateral, and awards directly online. Upload your logo for free 3D digital proofing and doorstep delivery across Uganda.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('shop')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D3094] hover:text-[#ED008C] transition-colors py-2 border-b-2 border-[#2D3094] hover:border-[#ED008C]"
            >
              <span>Explore Complete 17+ Catalogue</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar select-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[#2D3094] text-white shadow-md shadow-[#2D3094]/20 scale-105'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-[#2D3094]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group text-left"
            >
              {/* Product Visual Top */}
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />

                {/* Badge if available */}
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-[#ED008C] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                    {product.badge}
                  </div>
                )}

                {/* Customisable Indicator */}
                {product.isCustomizable && (
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-[#2D3094] text-[9px] font-bold px-2 py-0.5 rounded-full border border-slate-200 flex items-center gap-1 shadow-sm">
                    <span>Customisable</span>
                  </div>
                )}

                {/* Hover Quick Action Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('product', product.id);
                    }}
                    className="bg-white text-slate-900 text-xs font-bold px-4 py-2.5 rounded-full shadow-lg hover:bg-[#2D3094] hover:text-white transition-all transform hover:scale-105 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye size={14} />
                    <span>View Details & Customise</span>
                  </button>
                </div>
              </div>

              {/* Product Meta */}
              <div 
                onClick={() => navigate('product', product.id)}
                className="p-5 flex-1 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {product.category}
                    </span>
                    {product.rating && (
                      <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700">
                        <span>{product.rating}</span>
                        <span className="text-slate-400 text-[10px]">({product.reviewCount})</span>
                      </div>
                    )}
                  </div>

                  <h3 className="font-heading font-black text-sm text-slate-900 leading-snug line-clamp-2 mb-2 group-hover:text-[#2D3094] transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {product.description}
                  </p>
                </div>

                {/* Pricing and Action Strip */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                      Unit Price:
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-heading font-black text-base text-[#2D3094]">
                        {currency === 'UGX' 
                          ? `UGX ${product.priceUGX.toLocaleString()}` 
                          : `$${product.priceUSD.toFixed(2)}`
                        }
                      </span>
                      {product.originalPriceUGX && (
                        <span className="text-[10px] text-slate-400 line-through">
                          {currency === 'UGX' 
                            ? `UGX ${product.originalPriceUGX.toLocaleString()}` 
                            : `$${product.originalPriceUSD}`
                          }
                        </span>
                      )}
                    </div>
                    {product.minOrderQty && (
                      <div className="text-[9px] text-slate-500 font-medium">
                        Min: {product.minOrderQty} pcs
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDirectWhatsApp(product);
                      }}
                      className="p-2 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-sm cursor-pointer"
                      title="Direct WhatsApp Order"
                    >
                      <WhatsAppIcon size={16} />
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('product', product.id);
                      }}
                      className="bg-[#2D3094] hover:bg-[#20236e] text-white p-2.5 rounded-full shadow-md transition-all hover:scale-105 cursor-pointer"
                      title="Customise on Product Page"
                    >
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* View All Store CTA Bar */}
        <div className="mt-14 text-center">
          <button
            onClick={() => navigate('shop')}
            className="bg-[#2D3094] hover:bg-[#2E3192] text-white font-heading font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all shadow-lg hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Explore All 17+ Store Categories & Custom Merch</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
};
