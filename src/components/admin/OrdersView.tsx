import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Download, 
  Eye, 
  Receipt, 
  Trash2, 
  CheckSquare, 
  Square
} from 'lucide-react';
import { AdminOrder, OrderStatus } from '../../types/admin';
import { useShopStore } from '../../context/ShopStoreContext';

interface OrdersViewProps {
  initialStatusFilter?: string;
  onSelectOrder: (order: AdminOrder) => void;
  onOpenReceipt: (order: AdminOrder) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  initialStatusFilter,
  onSelectOrder,
  onOpenReceipt
}) => {
  const { orders, updateOrderStatus, deleteOrder, categories } = useShopStore();

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>(initialStatusFilter || 'all');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Selection for bulk actions
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);

  // Filter logic
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // 1. Search Query (Order #, Name, Phone, Email)
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchNumber = order.orderNumber.toLowerCase().includes(q) || order.id.toLowerCase().includes(q);
        const matchName = order.customerName.toLowerCase().includes(q);
        const matchPhone = order.customerPhone.toLowerCase().includes(q);
        const matchEmail = order.customerEmail.toLowerCase().includes(q);
        if (!matchNumber && !matchName && !matchPhone && !matchEmail) {
          return false;
        }
      }

      // 2. Order Status Filter
      if (statusFilter !== 'all' && order.orderStatus !== statusFilter) {
        return false;
      }

      // 3. Payment Status Filter
      if (paymentStatusFilter !== 'all' && order.paymentStatus !== paymentStatusFilter) {
        return false;
      }

      // 4. Payment Method Filter
      if (paymentMethodFilter !== 'all' && !order.paymentMethod.toLowerCase().includes(paymentMethodFilter.toLowerCase())) {
        return false;
      }

      // 5. Category Filter
      if (categoryFilter !== 'all') {
        const hasCategory = order.items?.some(i => i.product?.category?.toLowerCase() === categoryFilter.toLowerCase());
        if (!hasCategory) return false;
      }

      return true;
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [orders, searchTerm, statusFilter, paymentStatusFilter, paymentMethodFilter, categoryFilter]);

  // Bulk Selection Handlers
  const handleSelectAll = () => {
    if (selectedOrderIds.length === filteredOrders.length) {
      setSelectedOrderIds([]);
    } else {
      setSelectedOrderIds(filteredOrders.map(o => o.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedOrderIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Bulk Status Update
  const handleBulkStatusChange = (newStatus: OrderStatus) => {
    if (!selectedOrderIds.length) return;
    if (window.confirm(`Update ${selectedOrderIds.length} orders to ${newStatus.replace('_', ' ').toUpperCase()}?`)) {
      selectedOrderIds.forEach(id => {
        updateOrderStatus(id, newStatus, 'Updated via bulk action');
      });
      setSelectedOrderIds([]);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'Order Number',
      'Date',
      'Customer Name',
      'Phone',
      'Email',
      'Delivery Address',
      'District',
      'Total (UGX)',
      'Payment Method',
      'Payment Status',
      'Order Status',
      'Items Count'
    ];

    const rows = filteredOrders.map(o => [
      `"${o.orderNumber}"`,
      `"${new Date(o.createdAt).toLocaleDateString()}"`,
      `"${o.customerName}"`,
      `"${o.customerPhone}"`,
      `"${o.customerEmail}"`,
      `"${(o.deliveryAddress || '').replace(/"/g, '""')}"`,
      `"${o.district || ''}"`,
      o.totalUGX,
      `"${o.paymentMethod}"`,
      `"${o.paymentStatus}"`,
      `"${o.orderStatus}"`,
      o.items?.reduce((sum, it) => sum + it.quantity, 0) || 0
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SozyImpressions_Orders_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      
      {/* Search & Filter Header Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        
        {/* Top Line: Search & Export CSV */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by order #, customer name, phone, email..."
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
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
          </div>

        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
          {[
            { id: 'all', label: 'All Orders', count: orders.length },
            { id: 'pending', label: 'Pending', count: orders.filter(o => o.orderStatus === 'pending').length },
            { id: 'confirmed', label: 'Confirmed', count: orders.filter(o => o.orderStatus === 'confirmed').length },
            { id: 'processing', label: 'In Production', count: orders.filter(o => o.orderStatus === 'processing').length },
            { id: 'ready_delivery', label: 'Ready for Delivery', count: orders.filter(o => o.orderStatus === 'ready_delivery').length },
            { id: 'out_for_delivery', label: 'Out for Delivery', count: orders.filter(o => o.orderStatus === 'out_for_delivery').length },
            { id: 'completed', label: 'Completed', count: orders.filter(o => o.orderStatus === 'completed').length },
            { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.orderStatus === 'cancelled').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`
                px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5
                ${statusFilter === tab.id
                  ? 'bg-[#2D3094] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }
              `}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${statusFilter === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Dropdown Filters (Payment Status, Payment Method, Category) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs">
          
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Payment Status
            </label>
            <select
              value={paymentStatusFilter}
              onChange={(e) => setPaymentStatusFilter(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-[#2D3094]"
            >
              <option value="all">All Payment Statuses</option>
              <option value="paid">Paid / Verified</option>
              <option value="pending">Pending Payment</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Payment Method
            </label>
            <select
              value={paymentMethodFilter}
              onChange={(e) => setPaymentMethodFilter(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-[#2D3094]"
            >
              <option value="all">All Payment Methods</option>
              <option value="mtn">MTN Mobile Money</option>
              <option value="airtel">Airtel Money</option>
              <option value="visa">Visa / Mastercard</option>
              <option value="bank">Bank Transfer</option>
              <option value="cash">Cash on Delivery</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Product Department
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-[#2D3094]"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* Bulk Action Bar (when rows selected) */}
      {selectedOrderIds.length > 0 && (
        <div className="bg-[#12142B] text-white px-5 py-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckSquare size={16} className="text-[#ED008C]" />
            <span className="text-xs font-bold">{selectedOrderIds.length} orders selected</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400">Change status to:</span>
            <button
              onClick={() => handleBulkStatusChange('confirmed')}
              className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold"
            >
              Confirmed
            </button>
            <button
              onClick={() => handleBulkStatusChange('processing')}
              className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold"
            >
              In Production
            </button>
            <button
              onClick={() => handleBulkStatusChange('ready_delivery')}
              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold"
            >
              Ready for Delivery
            </button>
            <button
              onClick={() => handleBulkStatusChange('completed')}
              className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold"
            >
              Completed
            </button>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-200/60">
              <tr>
                <th className="px-4 py-3.5 w-10">
                  <button onClick={handleSelectAll} className="text-slate-400 hover:text-slate-600">
                    {selectedOrderIds.length === filteredOrders.length && filteredOrders.length > 0 ? (
                      <CheckSquare size={16} className="text-[#2D3094]" />
                    ) : (
                      <Square size={16} />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3.5">Order #</th>
                <th className="px-4 py-3.5">Customer</th>
                <th className="px-4 py-3.5">Date & Time</th>
                <th className="px-4 py-3.5">Items Summary</th>
                <th className="px-4 py-3.5">Total (UGX)</th>
                <th className="px-4 py-3.5">Payment</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Delivery Destination</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-16 text-center text-slate-400">
                    <p className="text-sm font-semibold">No orders match your filter criteria.</p>
                    <p className="text-xs text-slate-400 mt-1">Try clearing search keywords or resetting filters.</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => {
                  const isSelected = selectedOrderIds.includes(ord.id);
                  const totalItemsCount = ord.items?.reduce((s, it) => s + it.quantity, 0) || 0;

                  return (
                    <tr 
                      key={ord.id} 
                      className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-blue-50/50' : ''}`}
                    >
                      {/* Checkbox */}
                      <td className="px-4 py-4">
                        <button onClick={() => handleToggleSelect(ord.id)} className="text-slate-400 hover:text-slate-600">
                          {isSelected ? (
                            <CheckSquare size={16} className="text-[#2D3094]" />
                          ) : (
                            <Square size={16} />
                          )}
                        </button>
                      </td>

                      {/* Order Number & Artwork Badge */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span 
                            onClick={() => onSelectOrder(ord)}
                            className="font-extrabold text-[#2D3094] hover:underline cursor-pointer"
                          >
                            #{ord.orderNumber}
                          </span>
                        </div>
                        {ord.customerArtwork && (
                          <span className="inline-block mt-1 px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-pink-100 text-[#ED008C]">
                            Artwork Attached
                          </span>
                        )}
                      </td>

                      {/* Customer Info */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <p className="font-bold text-slate-900">{ord.customerName}</p>
                        {ord.companyName && (
                          <p className="text-[10px] text-slate-500 font-semibold">{ord.companyName}</p>
                        )}
                        <p className="text-[10px] text-slate-400">{ord.customerPhone}</p>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-4 whitespace-nowrap text-slate-500 text-[11px]">
                        <div>{new Date(ord.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                        <div className="text-[10px] text-slate-400">{new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      </td>

                      {/* Items Summary with thumbnails */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2 overflow-hidden">
                            {ord.items?.slice(0, 3).map((it, idx) => (
                              <img 
                                key={idx}
                                src={it.product?.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=200'} 
                                alt="item"
                                className="w-7 h-7 rounded-lg object-cover border-2 border-white"
                              />
                            ))}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-xs whitespace-nowrap">
                              {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
                            </p>
                            <p className="text-[10px] text-slate-400 truncate max-w-[130px]">
                              {ord.items?.[0]?.product?.name || 'Custom print'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Total Amount */}
                      <td className="px-4 py-4 whitespace-nowrap font-extrabold text-slate-900">
                        UGX {ord.totalUGX.toLocaleString()}
                        <span className="block text-[10px] text-slate-400 font-normal">
                          ${ord.totalUSD ? ord.totalUSD.toFixed(1) : (ord.totalUGX / 3800).toFixed(1)}
                        </span>
                      </td>

                      {/* Payment */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          ord.paymentStatus === 'paid' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : ord.paymentStatus === 'failed'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {ord.paymentStatus.toUpperCase()}
                        </span>
                        <p className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[120px]">
                          {ord.paymentMethod}
                        </p>
                      </td>

                      {/* Order Status (Dropdown in cell) */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="px-2 py-1 bg-slate-50 hover:bg-slate-100 text-[11px] font-bold text-slate-800 rounded-lg border border-slate-200 outline-none focus:border-[#2D3094] cursor-pointer"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">In Production</option>
                          <option value="ready_delivery">Ready for Delivery</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="refunded">Refunded</option>
                        </select>
                      </td>

                      {/* Delivery */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <p className="text-xs font-medium text-slate-800 truncate max-w-[160px]">{ord.deliveryAddress}</p>
                        <span className="text-[10px] text-slate-400">{ord.district || 'Kampala Area'}</span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onSelectOrder(ord)}
                            title="View Full Order Details"
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#2D3094] hover:text-white text-slate-600 transition-colors"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => onOpenReceipt(ord)}
                            title="Download / Print PDF Receipt"
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-600 transition-colors"
                          >
                            <Receipt size={14} />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete Order #${ord.orderNumber}?`)) {
                                deleteOrder(ord.id);
                              }
                            }}
                            title="Delete Order"
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

        {/* Footer with summary count */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredOrders.length} of {orders.length} orders</span>
          <span className="font-semibold text-slate-700">
            Total Displayed: UGX {filteredOrders.reduce((sum, o) => sum + o.totalUGX, 0).toLocaleString()}
          </span>
        </div>

      </div>

    </div>
  );
};
