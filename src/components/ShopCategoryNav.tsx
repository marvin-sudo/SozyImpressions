import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { SHOP_CATEGORIES } from '../data/shopCategories';

interface ShopCategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (categoryName: string, subcategoryName?: string) => void;
}

export const ShopCategoryNav: React.FC<ShopCategoryNavProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (catId: string, hasDropdown?: boolean) => {
    if (!hasDropdown) {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
      setActiveDropdown(null);
      return;
    }
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(catId);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  return (
    <div className="w-full bg-white border-b border-slate-200/90 shadow-xs sticky top-[72px] sm:top-[96px] z-30 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        <div 
          ref={navContainerRef}
          className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 scrollbar-none no-scrollbar text-xs font-semibold select-none"
        >
          {SHOP_CATEGORIES.map((cat) => {
            const isSelected = 
              (cat.name === 'All Products' && (selectedCategory === 'All' || selectedCategory === 'All Products')) ||
              selectedCategory.toLowerCase() === cat.name.toLowerCase() ||
              selectedCategory.toLowerCase() === cat.id.toLowerCase();

            return (
              <div
                key={cat.id}
                className="relative shrink-0"
                onMouseEnter={() => handleMouseEnter(cat.id, cat.hasDropdown)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => {
                    onSelectCategory(cat.name === 'All Products' ? 'All' : cat.name);
                    setActiveDropdown(null);
                  }}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all text-xs tracking-tight ${
                    isSelected
                      ? 'text-[#2D3094] font-bold bg-[#2D3094]/8 border border-[#2D3094]/20 shadow-xs'
                      : 'text-slate-700 hover:text-[#2D3094] hover:bg-slate-50'
                  }`}
                >
                  <span>{cat.name}</span>
                  {cat.hasDropdown && (
                    <ChevronDown
                      size={13}
                      className={`text-slate-400 transition-transform duration-200 ${
                        activeDropdown === cat.id ? 'rotate-180 text-[#ED008C]' : ''
                      }`}
                    />
                  )}
                </button>

                {/* Subcategories Dropdown Menu */}
                {cat.hasDropdown && activeDropdown === cat.id && cat.subcategories && (
                  <div 
                    className="absolute top-full left-0 mt-1.5 w-60 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                    onMouseEnter={() => handleMouseEnter(cat.id, true)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between mb-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#2D3094]">
                        {cat.name} Sub-types
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      {cat.subcategories.map((subcat) => (
                        <button
                          key={subcat}
                          onClick={() => {
                            onSelectCategory(cat.name, subcat);
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:text-[#2D3094] hover:bg-slate-50 rounded-xl transition-colors font-medium flex items-center justify-between group"
                        >
                          <span>{subcat}</span>
                          <span className="text-[10px] text-slate-400 group-hover:text-[#ED008C] opacity-0 group-hover:opacity-100 transition-opacity">
                            View →
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
