import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';
import { SHOP_CATEGORIES, CategoryItem } from '../data/shopCategories';

interface ShopCategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (categoryName: string, subcategoryName?: string) => void;
}

interface ActiveDropdownData {
  cat: CategoryItem;
  left: number;
}

export const ShopCategoryNav: React.FC<ShopCategoryNavProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdownData | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const barWrapperRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (navContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const nav = navContainerRef.current;
    if (nav) {
      nav.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      return () => {
        nav.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const scrollNav = (direction: 'left' | 'right') => {
    if (navContainerRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      navContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleButtonMouseEnter = (cat: CategoryItem, e: React.MouseEvent<HTMLButtonElement>) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    if (!cat.hasDropdown) {
      setActiveDropdown(null);
      return;
    }
    const buttonRect = e.currentTarget.getBoundingClientRect();
    const parentRect = barWrapperRef.current?.getBoundingClientRect() || { left: 0 };
    const relativeLeft = buttonRect.left - parentRect.left;
    setActiveDropdown({
      cat,
      left: Math.max(12, relativeLeft)
    });
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 220);
  };

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  return (
    <div className="w-full bg-white border-b border-slate-200 sticky top-[68px] sm:top-[112px] md:top-[116px] z-30 font-sans shadow-xs">
      <div 
        ref={barWrapperRef}
        className="max-w-7xl mx-auto px-4 md:px-8 relative flex items-center"
      >
        
        {/* Category Label Section Anchor */}
        <div className="flex items-center gap-1.5 shrink-0 pr-3 sm:pr-4 border-r border-slate-200 mr-2 sm:mr-3 py-3 sm:py-3.5 text-xs text-slate-500 font-normal">
          <LayoutGrid size={14} className="text-slate-400" />
          <span className="text-slate-600 hidden sm:inline">Categories:</span>
        </div>

        {/* Left Scroll Button */}
        {canScrollLeft && (
          <button
            onClick={() => scrollNav('left')}
            className="absolute left-8 sm:left-32 z-20 w-6 h-6 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-[#2D3094] transition-all cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft size={14} />
          </button>
        )}

        {/* Scrollable Categories List */}
        <div 
          ref={navContainerRef}
          className="flex-1 flex items-center gap-3 sm:gap-5 md:gap-6 overflow-x-auto py-2.5 sm:py-3.5 scrollbar-none no-scrollbar text-xs font-normal select-none scroll-smooth"
        >
          {SHOP_CATEGORIES.map((cat) => {
            const isSelected = 
              (cat.name === 'All Products' && (selectedCategory === 'All' || selectedCategory === 'All Products')) ||
              selectedCategory.toLowerCase() === cat.name.toLowerCase() ||
              selectedCategory.toLowerCase() === cat.id.toLowerCase();

            const isDropdownActive = activeDropdown?.cat.id === cat.id;

            return (
              <div
                key={cat.id}
                className="relative shrink-0"
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onMouseEnter={(e) => handleButtonMouseEnter(cat, e)}
                  onClick={() => {
                    onSelectCategory(cat.name === 'All Products' ? 'All' : cat.name);
                    setActiveDropdown(null);
                  }}
                  className={`inline-flex items-center gap-1 py-1 px-1 whitespace-nowrap transition-colors text-xs font-normal cursor-pointer ${
                    isSelected
                      ? 'text-[#2D3094] border-b-2 border-[#2D3094] pb-0.5'
                      : isDropdownActive
                      ? 'text-[#2D3094]'
                      : 'text-slate-700 hover:text-[#2D3094]'
                  }`}
                >
                  <span>{cat.name}</span>
                  {cat.hasDropdown && (
                    <ChevronDown
                      size={13}
                      className={`text-slate-400 transition-transform duration-200 ${
                        isDropdownActive ? 'rotate-180 text-[#2D3094]' : ''
                      }`}
                    />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Right Scroll Button */}
        {canScrollRight && (
          <button
            onClick={() => scrollNav('right')}
            className="shrink-0 ml-1 sm:ml-2 w-6 h-6 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-[#2D3094] transition-all cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight size={14} />
          </button>
        )}

        {/* Subcategories Dropdown Menu - Extending down freely below bar without being clipped */}
        {activeDropdown && activeDropdown.cat.subcategories && (
          <div 
            className="absolute top-full mt-1 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150"
            style={{ 
              left: `${activeDropdown.left}px`,
              maxWidth: 'calc(100vw - 32px)'
            }}
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between mb-1.5">
              <span className="text-[11px] uppercase tracking-wider text-[#2D3094] font-medium">
                {activeDropdown.cat.name} Subcategories
              </span>
              <span className="text-[10px] text-slate-400">
                {activeDropdown.cat.subcategories.length} items
              </span>
            </div>
            <div className="space-y-0.5 max-h-72 overflow-y-auto">
              {activeDropdown.cat.subcategories.map((subcat) => (
                <button
                  key={subcat}
                  onClick={() => {
                    onSelectCategory(activeDropdown.cat.name, subcat);
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:text-[#2D3094] hover:bg-slate-50 rounded-xl transition-colors font-normal flex items-center justify-between group cursor-pointer"
                >
                  <span>{subcat}</span>
                  <span className="text-[10px] text-[#2D3094] opacity-0 group-hover:opacity-100 transition-opacity">
                    View →
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
