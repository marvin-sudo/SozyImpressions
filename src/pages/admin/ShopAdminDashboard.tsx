import React, { useState } from 'react';
import { AdminTab, AdminOrder } from '../../types/admin';
import { useShopStore } from '../../context/ShopStoreContext';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminTopNav } from '../../components/admin/AdminTopNav';
import { OverviewView } from '../../components/admin/OverviewView';
import { OrdersView } from '../../components/admin/OrdersView';
import { ProductsView } from '../../components/admin/ProductsView';
import { CategoriesView } from '../../components/admin/CategoriesView';
import { InventoryView } from '../../components/admin/InventoryView';
import { CustomersView } from '../../components/admin/CustomersView';
import { PaymentsView } from '../../components/admin/PaymentsView';
import { DeliveryView } from '../../components/admin/DeliveryView';
import { ReceiptsView } from '../../components/admin/ReceiptsView';
import { EmailsView } from '../../components/admin/EmailsView';
import { AnalyticsView } from '../../components/admin/AnalyticsView';
import { ActivityLogView } from '../../components/admin/ActivityLogView';
import { SettingsView } from '../../components/admin/SettingsView';

import { OrderDetailsModal } from '../../components/admin/OrderDetailsModal';
import { ReceiptPreviewModal } from '../../components/admin/ReceiptPreviewModal';
import { CustomerArtworkModal } from '../../components/admin/CustomerArtworkModal';
import { ProductFormModal } from '../../components/admin/ProductFormModal';
import { DashboardLockScreen } from '../../components/admin/DashboardLockScreen';

interface ShopAdminDashboardProps {
  onNavigateToShop: () => void;
}

export const ShopAdminDashboard: React.FC<ShopAdminDashboardProps> = ({
  onNavigateToShop
}) => {
  const { isLocked } = useShopStore();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Modals
  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState<AdminOrder | null>(null);
  const [selectedOrderForReceipt, setSelectedOrderForReceipt] = useState<AdminOrder | null>(null);
  const [artworkPreview, setArtworkPreview] = useState<{ url: string; fileName?: string } | null>(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [ordersInitialFilter, setOrdersInitialFilter] = useState<string | undefined>(undefined);

  // Quick navigation helpers
  const handleNavigateToOrders = (filterStatus?: string) => {
    setOrdersInitialFilter(filterStatus);
    setActiveTab('orders');
  };

  // If locked, render lock screen
  if (isLocked) {
    return <DashboardLockScreen onNavigateToShop={onNavigateToShop} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900 antialiased selection:bg-[#ED008C] selection:text-white">
      
      {/* Left Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpenMobile={isSidebarMobileOpen}
        setIsOpenMobile={setIsSidebarMobileOpen}
        onNavigateToShop={onNavigateToShop}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        
        {/* Sticky Top Navigation */}
        <AdminTopNav
          activeTab={activeTab}
          onOpenMobileMenu={() => setIsSidebarMobileOpen(true)}
          onNavigateToShop={onNavigateToShop}
          onOpenAddProductModal={() => setIsAddProductModalOpen(true)}
          searchQuery={globalSearchQuery}
          setSearchQuery={setGlobalSearchQuery}
        />

        {/* Tab Body Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'overview' && (
            <OverviewView
              onSelectOrder={(ord) => setSelectedOrderForDetails(ord)}
              onNavigateToOrders={handleNavigateToOrders}
              onOpenReceipt={(ord) => setSelectedOrderForReceipt(ord)}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersView
              initialStatusFilter={ordersInitialFilter}
              onSelectOrder={(ord) => setSelectedOrderForDetails(ord)}
              onOpenReceipt={(ord) => setSelectedOrderForReceipt(ord)}
            />
          )}

          {activeTab === 'products' && (
            <ProductsView />
          )}

          {activeTab === 'categories' && (
            <CategoriesView />
          )}

          {activeTab === 'inventory' && (
            <InventoryView />
          )}

          {activeTab === 'customers' && (
            <CustomersView 
              onSelectOrder={(ord) => setSelectedOrderForDetails(ord)}
            />
          )}

          {activeTab === 'payments' && (
            <PaymentsView
              onSelectOrder={(ord) => setSelectedOrderForDetails(ord)}
              onOpenReceipt={(ord) => setSelectedOrderForReceipt(ord)}
            />
          )}

          {activeTab === 'delivery' && (
            <DeliveryView
              onSelectOrder={(ord) => setSelectedOrderForDetails(ord)}
            />
          )}

          {activeTab === 'receipts' && (
            <ReceiptsView
              onOpenReceipt={(ord) => setSelectedOrderForReceipt(ord)}
            />
          )}

          {activeTab === 'emails' && (
            <EmailsView />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView />
          )}

          {activeTab === 'activity' && (
            <ActivityLogView />
          )}

          {activeTab === 'settings' && (
            <SettingsView />
          )}
        </main>
      </div>

      {/* Global Modals */}
      {selectedOrderForDetails && (
        <OrderDetailsModal
          order={selectedOrderForDetails}
          onClose={() => setSelectedOrderForDetails(null)}
          onOpenReceipt={(ord) => setSelectedOrderForReceipt(ord)}
          onOpenArtworkModal={(url, name) => setArtworkPreview({ url, fileName: name })}
        />
      )}

      {selectedOrderForReceipt && (
        <ReceiptPreviewModal
          order={selectedOrderForReceipt}
          onClose={() => setSelectedOrderForReceipt(null)}
        />
      )}

      {artworkPreview && (
        <CustomerArtworkModal
          artworkUrl={artworkPreview.url}
          fileName={artworkPreview.fileName}
          onClose={() => setArtworkPreview(null)}
        />
      )}

      <ProductFormModal
        isOpen={isAddProductModalOpen}
        product={null}
        onClose={() => setIsAddProductModalOpen(false)}
      />

    </div>
  );
};
