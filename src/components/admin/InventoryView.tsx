import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Plus, 
  Minus
} from 'lucide-react';
import { useShopStore } from '../../context/ShopStoreContext';
import { AdminProduct } from '../../types/admin';

export const InventoryView: React.FC = () => {
  const { products, updateProductStock, categories } = useShopStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockStatusFilter, setStockStatusFilter] = useState<'all' | 'low' | 'out'>('all');

  const lowStockCount = products.filter(p => (p.stockQuantity ?? 0) <= (p.lowStockAlert ?? 10) && (p.stockQuantity ?? 0) > 0).length;
  const outOfStockCount = products.filter(p => (p.stockQuantity ?? 0) === 0).length;
  const inStockCount = products.filter(p => (p.stockQuantity ?? 0) > (p.lowStockAlert ?? 10)).length;

  const filteredProducts = products.filter(p => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = !q || p.name.toLowerCase().includes(q) || (p.sku && p.sku.toLowerCase().includes(q));
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;

    const stock = p.stockQuantity ?? 0;
    const threshold = p.lowStockAlert ?? 10;

    let matchesStock = true;
    if (stockStatusFilter === 'low') matchesStock = stock <= threshold && stock > 0;
    if (stockStatusFilter === 'out') matchesStock = stock === 0;

    return matchesSearch && matchesCat && matchesStock;
  });

  const handleAdjustStock = (prod: AdminProduct, delta: number) => {
    const current = prod.stockQuantity ?? 0;
    const newQty = Math.max(0, current + delta);
    updateProductStock(prod.id, newQty, `Staff manual adjustment (${delta > 0 ? `+${delta}` : delta})`);
  };

  return (
    <div className="space-y-4">
      
      {/* 3 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div 
          onClick={() => setStockStatusFilter('all')}
          className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs cursor-pointer hover:border-[#2D3094] transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Optimal Stock</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{inStockCount}</p>
          <p className="text-[11px] text-slate-400">Inventory levels healthy</p>
        </div>

        <div 
          onClick={() => setStockStatusFilter('low')}
          className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs cursor-pointer hover:border-amber-400 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Low Stock Alerts</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle size={16} />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-amber-600 mt-2">{lowStockCount}</p>
          <p className="text-[11px] text-slate-400">Below threshold reorder point</p>
        </div>

        <div 
          onClick={() => setStockStatusFilter('out')}
          className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs cursor-pointer hover:border-rose-400 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Out of Stock</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <XCircle size={16} />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-rose-600 mt-2">{outOfStockCount}</p>
          <p className="text-[11px] text-slate-400">Requires urgent restock</p>
        </div>

      </div>

      {/* Filter bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md w-full">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search inventory items..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2D3094]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-200">
            <tr>
              <th className="px-5 py-3">Product</th>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Alert Threshold</th>
              <th className="px-4 py-3">Current Stock</th>
              <th className="px-4 py-3">Stock Health</th>
              <th className="px-5 py-3 text-right">Direct Quick Restock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredProducts.map((prod) => {
              const stock = prod.stockQuantity ?? 0;
              const threshold = prod.lowStockAlert ?? 10;
              const isOut = stock === 0;
              const isLow = stock <= threshold && stock > 0;

              return (
                <tr key={prod.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5 flex items-center gap-3">
                    <img src={prod.image} alt={prod.name} className="w-9 h-9 rounded-lg object-cover border" />
                    <span className="font-bold text-slate-900 truncate max-w-xs">{prod.name}</span>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-slate-500 text-[11px]">{prod.sku}</td>
                  <td className="px-4 py-3.5 text-slate-600">{prod.category}</td>
                  <td className="px-4 py-3.5 text-slate-500">{threshold} units</td>
                  <td className="px-4 py-3.5 font-extrabold text-sm text-slate-900">{stock}</td>
                  <td className="px-4 py-3.5">
                    {isOut ? (
                      <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold">Out of Stock</span>
                    ) : isLow ? (
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">Low ({stock})</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">In Stock</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => handleAdjustStock(prod, -10)}
                        title="Reduce 10"
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                      >
                        -10
                      </button>
                      <button
                        onClick={() => handleAdjustStock(prod, -1)}
                        title="Reduce 1"
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                      >
                        <Minus size={13} />
                      </button>
                      <button
                        onClick={() => handleAdjustStock(prod, 1)}
                        title="Add 1"
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                      >
                        <Plus size={13} />
                      </button>
                      <button
                        onClick={() => handleAdjustStock(prod, 50)}
                        title="Restock 50"
                        className="px-2 py-1 rounded bg-[#2D3094] hover:bg-[#232573] text-white font-bold text-[10px]"
                      >
                        +50 Restock
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};
