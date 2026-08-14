import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  ShoppingBag, 
  Wand2 
} from 'lucide-react';
import { View, Currency, Product, CartItem } from '../types';
import { PRODUCTS_DATA } from '../data/mockData';

interface ShopPageProps {
  navigate?: (view: View, param?: string) => void;
  currency: Currency;
  products?: Product[];
  onOpenCustomizer: (product: Product) => void;
  onAddToCart?: (item: CartItem) => void;
  selectedCategory?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  currency,
  products = PRODUCTS_DATA,
  onOpenCustomizer,
  onAddToCart,
  selectedCategory: initialCategory
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Customised Gifts',
    'Drinkware & Flasks',
    'Apparel & Uniforms',
    'Stationery & Notebooks',
    'Corporate Gift Sets',
    'Offset & Promo Print'
  ];

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleQuickAdd = (product: Product) => {
    const item: CartItem = {
      product,
      quantity: product.minOrderQty || 10,
      customization: {
        color: product.customizationOptions?.colors?.[0] || 'Standard'
      },
      unitPriceUGX: product.priceUGX,
      unitPriceUSD: product.priceUSD,
      subtotalUGX: product.priceUGX * (product.minOrderQty || 10),
      subtotalUSD: product.priceUSD * (product.minOrderQty || 10)
    };
    if (onAddToCart) {
      onAddToCart(item);
    } else {
      onOpenCustomizer(product);
    }
  };

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen py-12 px-4 md:px-8 font-sans text-left">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Shop Hero Banner */}
        <div className="bg-[#181B34] text-white rounded-3xl p-8 md:p-14 relative overflow-hidden shadow-2xl border border-white/10">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-black uppercase tracking-wider mb-4 backdrop-blur-md">
              <Sparkles size={14} className="text-[#ED008C]" />
              <span>Direct Factory Catalogue & Customizer</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-black tracking-tight leading-tight mb-4">
              Custom Corporate Merchandise & <br />
              <span className="text-[#ED008C]">Executive Gift Collections.</span>
            </h1>
            <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed">
              Order customized smart drinkware, leather notebooks, premium tech accessories, and branded apparel with free 3D digital artwork proofs.
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 select-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#2D3094] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search merchandise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 outline-none focus:border-[#2D3094] focus:bg-white"
            />
          </div>

        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-[#2D3094]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo & Badge */}
                <div className="relative aspect-square bg-slate-100 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-[#ED008C] text-white text-[10px] font-heading font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {product.badge}
                    </div>
                  )}
                  {product.minOrderQty && (
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                      Min {product.minOrderQty} pcs
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="text-[10px] font-bold text-[#2D3094] uppercase tracking-wider mb-1">
                    {product.category}
                  </div>
                  <h3 className="font-heading font-bold text-sm text-slate-900 leading-snug line-clamp-1 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {product.description}
                  </p>

                  <div className="flex items-baseline justify-between pt-3 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block">Base Rate / Unit:</span>
                      <span className="font-heading font-black text-base text-[#2D3094]">
                        {currency === 'UGX' ? `UGX ${product.priceUGX.toLocaleString()}` : `$${product.priceUSD}`}
                      </span>
                    </div>
                    {product.bulkTiers && (
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                        Up to -{product.bulkTiers[product.bulkTiers.length - 1].discountPercent}% Bulk
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => onOpenCustomizer(product)}
                  className="bg-[#2D3094] hover:bg-[#1f2168] text-white text-[11px] font-heading font-bold uppercase tracking-wider py-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Wand2 size={13} className="text-[#ED008C]" />
                  <span>Customize</span>
                </button>
                <button
                  onClick={() => handleQuickAdd(product)}
                  className="border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 text-[11px] font-heading font-bold uppercase tracking-wider py-3 rounded-xl transition-colors flex items-center justify-center gap-1"
                >
                  <ShoppingBag size={13} />
                  <span>Add ({product.minOrderQty || 10})</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
