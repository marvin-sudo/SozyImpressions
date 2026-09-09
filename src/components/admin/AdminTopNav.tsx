import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Plus, 
  Lock, 
  LogOut, 
  ExternalLink, 
  ShoppingBag, 
  PackageCheck,
  ChevronDown
} from 'lucide-react';
import { AdminTab } from '../../types/admin';
import { useShopStore } from '../../context/ShopStoreContext';

interface AdminTopNavProps {
  activeTab: AdminTab;
  onOpenMobileMenu: () => void;
  onNavigateToShop: () => void;
  onOpenAddProductModal: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const AdminTopNav: React.FC<AdminTopNavProps> = ({
  activeTab,
  onOpenMobileMenu,
  onNavigateToShop,
  onOpenAddProductModal,
  searchQuery,
  setSearchQuery
}) => {
  const { adminUser, orders, lockDashboard, logoutAdmin, unreadOrdersCount } = useShopStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const tabTitles: Record<AdminTab, string> = {
    overview: 'Dashboard Overview',
    orders: 'Order Management',
    products: 'Products Catalog',
    categories: 'Shop Categories',
    inventory: 'Inventory & Stock Alerts',
    customers: 'Customer Directory',
    payments: 'Payment Transactions',
    delivery: 'Delivery & Logistics',
    receipts: 'Receipts & Invoicing',
    emails: 'Email Notifications & Templates',
    analytics: 'Sales Analytics & Reports',
    activity: 'Audit Activity Log',
    settings: 'Shop Configuration',
  };

  const recentOrders = orders.slice(0, 4);

  return (
    <header className="h-18 bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between shadow-xs">
      
      {/* Left: Mobile Toggle & Breadcrumb Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          aria-label="Open sidebar"
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <Menu size={20} />
        </button>

        <div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <span>Admin</span>
            <span>/</span>
            <span className="text-[#2D3094] font-semibold">Shop Back-Office</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 ml-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Auth Token Active
            </span>
          </div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
            {tabTitles[activeTab]}
          </h1>
        </div>
      </div>

      {/* Middle: Global Search Input */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders, products, customers..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs text-slate-800 rounded-xl border border-slate-200 focus:border-[#2D3094] focus:ring-2 focus:ring-[#2D3094]/15 outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Right Controls: Quick Add, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Quick Add Product Button */}
        <button
          onClick={onOpenAddProductModal}
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#2D3094] to-[#2E3192] hover:from-[#25287a] hover:to-[#242777] text-white text-xs font-bold shadow-md shadow-[#2D3094]/20 transition-all hover:scale-102 active:scale-98"
        >
          <Plus size={15} />
          <span>New Product</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            className="relative p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <Bell size={18} />
            {unreadOrdersCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#ED008C] text-white text-[9px] font-extrabold flex items-center justify-center animate-pulse">
                {unreadOrdersCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 animate-in fade-in-50 zoom-in-95">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Recent Shop Activity</span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                  Live Sync
                </span>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                {recentOrders.map((ord) => (
                  <div key={ord.id} className="p-3.5 hover:bg-slate-50 transition-colors flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#2D3094]/10 text-[#2D3094] flex items-center justify-center shrink-0">
                      <ShoppingBag size={15} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-800 truncate">Order #{ord.orderNumber}</p>
                        <span className="text-[10px] text-slate-400">
                          {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">{ord.customerName} placed order</p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#2D3094]">
                          UGX {ord.totalUGX.toLocaleString()}
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                          ord.orderStatus === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {ord.orderStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 pt-2 text-center border-t border-slate-100">
                <span className="text-[11px] text-slate-400">All notifications synced in real time</span>
              </div>
            </div>
          )}
        </div>

        {/* View Live Storefront Button (Icon on mobile) */}
        <button
          onClick={onNavigateToShop}
          title="Open live storefront"
          className="p-2.5 rounded-xl text-slate-600 hover:text-[#ED008C] hover:bg-pink-50 transition-colors"
        >
          <ExternalLink size={18} />
        </button>

        {/* Admin Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 pl-2 pr-1.5 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2D3094] to-[#ED008C] flex items-center justify-center text-white text-xs font-extrabold shadow-xs">
              MS
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold text-slate-900 leading-tight">{adminUser.name}</p>
              <p className="text-[10px] text-slate-400 leading-tight">Admin (Staff)</p>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in-50 zoom-in-95">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{adminUser.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{adminUser.email}</p>
                <span className="mt-1.5 inline-block text-[10px] font-bold bg-[#2D3094]/10 text-[#2D3094] px-2 py-0.5 rounded-full">
                  Super Administrator
                </span>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onNavigateToShop();
                  }}
                  className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                >
                  <PackageCheck size={15} className="text-slate-400" />
                  <span>Go to Shop Front</span>
                </button>

                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    lockDashboard();
                  }}
                  className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                >
                  <Lock size={15} className="text-slate-400" />
                  <span>Lock Dashboard</span>
                </button>

                <div className="my-1 border-t border-slate-100" />

                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    logoutAdmin();
                  }}
                  className="w-full px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 font-semibold"
                >
                  <LogOut size={15} />
                  <span>End Session</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </header>
  );
};
