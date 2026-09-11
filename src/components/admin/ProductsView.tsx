import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Edit3, 
  Copy, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ExternalLink,
  Package,
  RefreshCw
} from 'lucide-react';
import { AdminProduct } from '../../types/admin';
import { useShopStore } from '../../context/ShopStoreContext';
import { ProductFormModal } from './ProductFormModal';

interface ProductsViewProps {
  onNavigateToShopProduct?: (productId: string) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  onNavigateToShopProduct
}) => {
  const { 
    products, 
    categories, 
    deleteProduct, 
    addProduct, 
    updateProduct,
    isProductsLive,
    isFirestoreConnected,
    lastSyncTime,
    syncWithFirestore 
  } = useShopStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  const handleManualSync = async () => {
    setIsSyncing(true);
    await syncWithFirestore();
    setTimeout(() => setIsSyncing(false), 500);
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Search
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchName = prod.name.toLowerCase().includes(q);
        const matchSku = prod.sku?.toLowerCase().includes(q);
        const matchDesc = prod.description?.toLowerCase().includes(q);
        if (!matchName && !matchSku && !matchDesc) return false;
      }

      // Category
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
        return false;
      }

      // Stock
      const stock = prod.stockQuantity ?? 0;
      const lowThreshold = prod.lowStockAlert ?? 10;

      if (stockFilter === 'in_stock' && stock <= lowThreshold) return false;
      if (stockFilter === 'low_stock' && (stock > lowThreshold || stock <= 0)) return false;
      if (stockFilter === 'out_of_stock' && stock > 0) return false;

      return true;
    });
  }, [products, searchTerm, selectedCategory, stockFilter]);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prod: AdminProduct) => {
    setEditingProduct(prod);
    setIsModalOpen(true);
  };

  const handleDuplicateProduct = (prod: AdminProduct) => {
    const duplicateData: Omit<AdminProduct, 'id'> = {
      ...prod,
      name: `${prod.name} (Copy)`,
      sku: `${prod.sku || 'SI'}-COPY-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString()
    };
    addProduct(duplicateData);
  };

  const handleDeleteProduct = (prod: AdminProduct) => {
    if (window.confirm(`Are you sure you want to permanently delete "${prod.name}"?`)) {
      deleteProduct(prod.id);
    }
  };

  const handleToggleActive = (prod: AdminProduct) => {
    const newStatus = prod.status === 'active' ? 'draft' : 'active';
    updateProduct(prod.id, { status: newStatus });
  };

  return (
    <div className="space-y-4">
      
      {/* Top Search & Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products by title, SKU, keywords..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 focus:bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:border-[#2D3094] focus:ring-2 focus:ring-[#2D3094]/15 outline-none transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Realtime Live Firestore Status */}
            <div 
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-semibold transition-all ${
                isFirestoreConnected || isProductsLive
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-700'
                  : 'bg-amber-50/80 border-amber-200 text-amber-700'
              }`}
              title={lastSyncTime ? `Last Firestore sync: ${lastSyncTime}` : 'Connecting to Firestore...'}
            >
              <span className={`w-2 h-2 rounded-full ${
                isFirestoreConnected || isProductsLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`} />
              <span className="hidden sm:inline font-mono">
                {isFirestoreConnected || isProductsLive ? 'Live Sync' : 'Local Cache'}
              </span>
              {lastSyncTime && (
                <span className="text-[10px] text-emerald-600/80 hidden md:inline font-normal">
                  ({lastSyncTime})
                </span>
              )}
            </div>

            {/* Manual Sync Trigger */}
            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              title="Refresh and sync catalog with Firestore"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw size={14} className={isSyncing ? 'animate-spin text-[#2D3094]' : ''} />
            </button>

            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#2D3094] to-[#2E3192] hover:from-[#232573] hover:to-[#22256e] text-white text-xs font-bold shadow-md shadow-[#2D3094]/20 transition-all hover:scale-102 active:scale-98"
            >
              <Plus size={15} />
              <span>Add New Product</span>
            </button>
          </div>

        </div>

        {/* Category & Stock Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2 min-w-[200px]">
            <span className="font-bold text-slate-500 text-[11px] uppercase">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-[#2D3094]"
            >
              <option value="all">All Categories ({products.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-500 text-[11px] uppercase ml-2">Stock:</span>
            {(['all', 'in_stock', 'low_stock', 'out_of_stock'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStockFilter(st)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                  stockFilter === st ? 'bg-[#2D3094] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-200/60">
              <tr>
                <th className="px-5 py-3.5">Product</th>
                <th className="px-4 py-3.5">SKU</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Price (UGX)</th>
                <th className="px-4 py-3.5">Stock Status</th>
                <th className="px-4 py-3.5">Turnaround</th>
                <th className="px-4 py-3.5">Visibility</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-slate-400">
                    <Package size={32} className="mx-auto text-slate-300 mb-2" />
                    <p className="text-sm font-semibold">No products found</p>
                    <p className="text-xs text-slate-400 mt-1">Try changing category filter or search keywords.</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod) => {
                  const stock = prod.stockQuantity ?? 0;
                  const threshold = prod.lowStockAlert ?? 10;
                  const isLow = stock <= threshold && stock > 0;
                  const isOut = stock === 0;

                  return (
                    <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Image & Title */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-slate-900 line-clamp-1">{prod.name}</p>
                            {prod.badge && (
                              <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-[#ED008C]/10 text-[#ED008C]">
                                {prod.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="px-4 py-3.5 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                        {prod.sku || '—'}
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold">
                          {prod.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="font-extrabold text-[#2D3094]">
                          UGX {prod.priceUGX.toLocaleString()}
                        </span>
                        <span className="block text-[10px] text-slate-400">
                          ${prod.priceUSD} USD
                        </span>
                      </td>

                      {/* Stock Status */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {isOut ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                              <XCircle size={11} /> Out of Stock (0)
                            </span>
                          ) : isLow ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                              <AlertTriangle size={11} /> Low Stock ({stock})
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              <CheckCircle2 size={11} /> In Stock ({stock})
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Turnaround */}
                      <td className="px-4 py-3.5 whitespace-nowrap text-slate-500 text-[11px]">
                        {prod.turnaroundTime || '24-48 Hours'}
                      </td>

                      {/* Visibility Toggle */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleActive(prod)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                            prod.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                          }`}
                        >
                          {prod.status || 'active'}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {onNavigateToShopProduct && (
                            <button
                              onClick={() => onNavigateToShopProduct(prod.id)}
                              title="View in Shop"
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#ED008C] hover:text-white text-slate-600 transition-colors"
                            >
                              <ExternalLink size={14} />
                            </button>
                          )}
                          <button
                            onClick={() => handleOpenEditModal(prod)}
                            title="Edit Product"
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#2D3094] hover:text-white text-slate-600 transition-colors"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => handleDuplicateProduct(prod)}
                            title="Duplicate Product"
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                          >
                            <Copy size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod)}
                            title="Delete Product"
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-600 hover:text-white text-slate-600 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredProducts.length} of {products.length} products</span>
          <span className="font-semibold text-slate-700">
            Active in Shop: {products.filter(p => p.status === 'active').length}
          </span>
        </div>
      </div>

      {/* Product Form Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        product={editingProduct}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
      />

    </div>
  );
};
