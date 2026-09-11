import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  ArrowRight, 
  Printer, 
  Package, 
  HelpCircle 
} from 'lucide-react';
import { View, Currency, Product } from '../types';
import { SERVICES_DATA, PRODUCTS_DATA, PORTFOLIO_PROJECTS, FAQS_DATA } from '../data/mockData';
import { useShopStore } from '../context/ShopStoreContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  navigate: (view: View, param?: string) => void;
  currency?: Currency;
  onOpenCustomizer?: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  navigate,
  currency = 'UGX',
  onOpenCustomizer
}) => {
  const { shopProducts } = useShopStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Search Results
  const matchingServices = cleanQuery
    ? SERVICES_DATA.filter(s => 
        s.title.toLowerCase().includes(cleanQuery) || 
        s.description.toLowerCase().includes(cleanQuery) ||
        s.popularProducts.some(p => p.toLowerCase().includes(cleanQuery))
      )
    : [];

  const productsCatalog = shopProducts && shopProducts.length > 0 ? shopProducts : PRODUCTS_DATA;

  const matchingProducts = cleanQuery
    ? productsCatalog.filter(p => 
        p.name.toLowerCase().includes(cleanQuery) || 
        p.category.toLowerCase().includes(cleanQuery) ||
        p.description.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchingPortfolio = cleanQuery
    ? PORTFOLIO_PROJECTS.filter(p => 
        p.title.toLowerCase().includes(cleanQuery) || 
        p.client.toLowerCase().includes(cleanQuery) ||
        p.category.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchingFaqs = cleanQuery
    ? FAQS_DATA.filter(f => 
        f.question.toLowerCase().includes(cleanQuery) || 
        f.answer.toLowerCase().includes(cleanQuery)
      )
    : [];

  const hasResults = matchingServices.length > 0 || matchingProducts.length > 0 || matchingPortfolio.length > 0 || matchingFaqs.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-16 px-4 pb-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-100 overflow-hidden text-left">
        
        {/* Search Bar Input */}
        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
          <Search size={22} className="text-[#2D3094] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products, offset printing, banners, smart flasks, quotes, FAQs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base sm:text-lg font-heading font-medium text-slate-900 placeholder-slate-400 outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-700"
            >
              <X size={18} />
            </button>
          )}
          <button 
            onClick={onClose}
            className="text-xs font-bold uppercase text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-lg bg-slate-100"
          >
            ESC
          </button>
        </div>

        {/* Search Content Body */}
        <div className="max-h-[65vh] overflow-y-auto p-6 space-y-6">
          {cleanQuery === '' ? (
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                Popular Quick Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'Offset Printing',
                  'Executive Business Cards',
                  'Smart LED Flasks',
                  'Roll-Up Banners',
                  'Vehicle Fleet Wraps',
                  '3D Reception Signs',
                  'Corporate Polos',
                  'Annual Reports'
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : !hasResults ? (
            <div className="text-center py-12 text-slate-400">
              <Search size={36} className="mx-auto mb-2 text-slate-300" />
              <div className="font-bold text-slate-700">No matching results found</div>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for general terms like "Printing", "T-Shirts", "Flasks", or "Banners".
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Services Results */}
              {matchingServices.length > 0 && (
                <div>
                  <div className="text-[10px] font-black text-[#2D3094] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Printer size={12} />
                    <span>Core Services ({matchingServices.length})</span>
                  </div>
                  <div className="grid gap-2">
                    {matchingServices.map((srv) => (
                      <button
                        key={srv.id}
                        onClick={() => {
                          navigate('services', srv.id);
                          onClose();
                        }}
                        className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-[#2D3094]/5 border border-slate-200 text-left flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <span className="text-[10px] font-black text-[#ED008C] mr-2">{srv.number}</span>
                          <span className="text-xs font-bold text-slate-900 group-hover:text-[#2D3094]">{srv.title}</span>
                          <span className="text-[11px] text-slate-500 block">{srv.subtitle}</span>
                        </div>
                        <ArrowRight size={14} className="text-slate-400 group-hover:text-[#2D3094] group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Products Results */}
              {matchingProducts.length > 0 && (
                <div>
                  <div className="text-[10px] font-black text-[#ED008C] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Package size={12} />
                    <span>Store Products ({matchingProducts.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchingProducts.map((prod) => (
                      <button
                        key={prod.id}
                        onClick={() => {
                          if (onOpenCustomizer) {
                            onOpenCustomizer(prod);
                          } else {
                            navigate('shop');
                          }
                          onClose();
                        }}
                        className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left flex items-center gap-3 group transition-colors"
                      >
                        <img src={prod.image} alt={prod.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 truncate group-hover:text-[#2D3094]">{prod.name}</div>
                          <div className="text-[10px] text-slate-500">{prod.category}</div>
                          <div className="text-xs font-black text-[#2D3094]">
                            {currency === 'UGX' ? `UGX ${prod.priceUGX.toLocaleString()}` : `$${prod.priceUSD}`}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs Results */}
              {matchingFaqs.length > 0 && (
                <div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <HelpCircle size={12} />
                    <span>Frequently Asked Questions ({matchingFaqs.length})</span>
                  </div>
                  <div className="space-y-2">
                    {matchingFaqs.map((faq, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                        <div className="font-bold text-slate-900 mb-1">{faq.question}</div>
                        <div className="text-slate-600 text-[11px] line-clamp-2">{faq.answer}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
