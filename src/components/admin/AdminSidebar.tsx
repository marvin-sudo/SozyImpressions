import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Layers, 
  Boxes, 
  Users, 
  CreditCard, 
  Truck, 
  Receipt, 
  Mail, 
  BarChart3, 
  History, 
  Settings, 
  ExternalLink, 
  Lock, 
  ChevronRight,
  ShieldCheck,
  X
} from 'lucide-react';
import { AdminTab } from '../../types/admin';
import { useShopStore } from '../../context/ShopStoreContext';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
  onNavigateToShop: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpenMobile,
  setIsOpenMobile,
  onNavigateToShop
}) => {
  const { unreadOrdersCount, products, lockDashboard } = useShopStore();

  const navItems: Array<{
    id: AdminTab;
    label: string;
    icon: React.ElementType;
    badge?: number | string;
    badgeColor?: string;
  }> = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { 
      id: 'orders', 
      label: 'Orders', 
      icon: ShoppingBag, 
      badge: unreadOrdersCount > 0 ? unreadOrdersCount : undefined,
      badgeColor: 'bg-[#ED008C] text-white' 
    },
    { 
      id: 'products', 
      label: 'Products', 
      icon: Package,
      badge: products.length,
      badgeColor: 'bg-slate-700 text-slate-300'
    },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'inventory', label: 'Inventory', icon: Boxes },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'delivery', label: 'Delivery', icon: Truck },
    { id: 'receipts', label: 'Receipts', icon: Receipt },
    { id: 'emails', label: 'Email Templates', icon: Mail },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'activity', label: 'Activity Log', icon: History },
    { id: 'settings', label: 'Shop Settings', icon: Settings },
  ];

  const handleSelectTab = (tab: AdminTab) => {
    setActiveTab(tab);
    setIsOpenMobile(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={() => setIsOpenMobile(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#12142B] text-slate-200 flex flex-col border-r border-white/10
          transition-transform duration-300 ease-in-out lg:translate-x-0
          ${isOpenMobile ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Brand Header */}
        <div className="h-18 px-5 flex items-center justify-between border-b border-white/10 bg-[#161833]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2D3094] to-[#ED008C] flex items-center justify-center shadow-lg shadow-[#2D3094]/30">
              <span className="text-white font-extrabold text-base tracking-tighter">SI</span>
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-white tracking-wide leading-tight">
                SOZY<span className="text-[#ED008C]">SHOP</span>
              </h1>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider flex items-center gap-1">
                <ShieldCheck size={11} className="text-emerald-400" /> Admin Back-Office
              </span>
            </div>
          </div>

          <button 
            onClick={() => setIsOpenMobile(false)}
            aria-label="Close menu"
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
          >
            <X size={18} />
          </button>
        </div>

        {/* Live Shop Quick Link */}
        <div className="p-3">
          <button
            onClick={onNavigateToShop}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white transition-all border border-white/5 group"
          >
            <span className="flex items-center gap-2 font-medium">
              <ExternalLink size={13} className="text-[#ED008C] group-hover:scale-110 transition-transform" />
              View Live Storefront
            </span>
            <ChevronRight size={13} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 custom-scrollbar">
          <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Shop Management
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`
                  w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group
                  ${isActive 
                    ? 'bg-gradient-to-r from-[#2D3094] to-[#2E3192] text-white shadow-md shadow-[#2D3094]/30' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon 
                    size={17} 
                    className={`
                      shrink-0 transition-transform group-hover:scale-110
                      ${isActive ? 'text-[#ED008C]' : 'text-slate-400 group-hover:text-slate-200'}
                    `} 
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-white/10 text-white'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Quick Controls */}
        <div className="p-3 border-t border-white/10 bg-[#141630]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#2D3094] flex items-center justify-center text-xs font-bold text-white shrink-0">
                MS
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">Marvin Ssozi</p>
                <p className="text-[10px] text-slate-400 truncate">Director & Admin</p>
              </div>
            </div>

            <button
              onClick={lockDashboard}
              title="Lock Dashboard (Session Security)"
              aria-label="Lock Dashboard"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-rose-400 transition-colors"
            >
              <Lock size={15} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
