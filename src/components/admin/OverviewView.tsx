import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Clock, 
  Cog, 
  CheckCircle2, 
  Truck, 
  XCircle, 
  DollarSign, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowRight,
  Receipt,
  Eye,
  ChevronRight
} from 'lucide-react';
import { AdminOrder } from '../../types/admin';
import { useShopStore } from '../../context/ShopStoreContext';

type DateFilterOption = 'today' | 'week' | 'month' | 'year' | 'all';

interface OverviewViewProps {
  onSelectOrder: (order: AdminOrder) => void;
  onNavigateToOrders: (filterStatus?: string) => void;
  onOpenReceipt: (order: AdminOrder) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onSelectOrder,
  onNavigateToOrders,
  onOpenReceipt
}) => {
  const { orders, products } = useShopStore();
  const [dateFilter, setDateFilter] = useState<DateFilterOption>('month');
  const [currencyMode, setCurrencyMode] = useState<'UGX' | 'USD'>('UGX');

  // Filter orders according to selected date filter
  const filteredOrders = useMemo(() => {
    const now = new Date();
    return orders.filter(ord => {
      const orderDate = new Date(ord.createdAt);
      if (dateFilter === 'today') {
        return orderDate.toDateString() === now.toDateString();
      }
      if (dateFilter === 'week') {
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
        return orderDate >= oneWeekAgo;
      }
      if (dateFilter === 'month') {
        const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 3600 * 1000);
        return orderDate >= oneMonthAgo;
      }
      if (dateFilter === 'year') {
        return orderDate.getFullYear() === now.getFullYear();
      }
      return true;
    });
  }, [orders, dateFilter]);

  // Statistics Computations
  const totalOrders = filteredOrders.length;
  const pendingOrders = filteredOrders.filter(o => o.orderStatus === 'pending').length;
  const processingOrders = filteredOrders.filter(o => o.orderStatus === 'processing').length;
  const readyOrders = filteredOrders.filter(o => o.orderStatus === 'ready_delivery').length;
  const completedOrders = filteredOrders.filter(o => o.orderStatus === 'completed').length;
  const cancelledOrders = filteredOrders.filter(o => o.orderStatus === 'cancelled').length;

  const totalSalesUGX = filteredOrders
    .filter(o => o.paymentStatus === 'paid' || o.orderStatus === 'completed')
    .reduce((sum, o) => sum + (o.totalUGX || 0), 0);

  const totalSalesUSD = filteredOrders
    .filter(o => o.paymentStatus === 'paid' || o.orderStatus === 'completed')
    .reduce((sum, o) => sum + (o.totalUSD || (o.totalUGX / 3800)), 0);

  const pendingPaymentsCount = filteredOrders.filter(o => o.paymentStatus === 'pending').length;
  const pendingPaymentsUGX = filteredOrders
    .filter(o => o.paymentStatus === 'pending')
    .reduce((sum, o) => sum + (o.totalUGX || 0), 0);

  const averageOrderValueUGX = totalOrders > 0 ? Math.round(totalSalesUGX / Math.max(1, totalOrders)) : 0;
  const averageOrderValueUSD = totalOrders > 0 ? Number((totalSalesUSD / Math.max(1, totalOrders)).toFixed(1)) : 0;

  // Recent Orders (most recent 6)
  const recentOrders = useMemo(() => {
    return [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 6);
  }, [orders]);

  // Category Revenue Share
  const categorySales = useMemo(() => {
    const map = new Map<string, number>();
    filteredOrders.forEach(ord => {
      ord.items?.forEach(item => {
        const cat = item.product?.category || 'General';
        const itemTotal = item.subtotalUGX || ((item.unitPriceUGX || 0) * item.quantity);
        map.set(cat, (map.get(cat) || 0) + itemTotal);
      });
    });

    return Array.from(map.entries())
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [filteredOrders]);

  const maxCatSales = Math.max(...categorySales.map(c => c.total), 1);

  // Status Badge Helper
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800"><Clock size={11} /> Pending</span>;
      case 'confirmed':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800"><CheckCircle2 size={11} /> Confirmed</span>;
      case 'processing':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800"><Cog size={11} className="animate-spin" /> In Production</span>;
      case 'ready_delivery':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800"><Truck size={11} /> Ready</span>;
      case 'out_for_delivery':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800"><Truck size={11} /> Out for Delivery</span>;
      case 'completed':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900"><CheckCircle2 size={11} /> Completed</span>;
      case 'cancelled':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800"><XCircle size={11} /> Cancelled</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Controls: Date Filter Bar & Currency Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-sm font-bold text-slate-900">Performance Snapshot</h2>
          <p className="text-xs text-slate-500">Live summary of orders, sales revenue, and shop activity.</p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Currency Toggle */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setCurrencyMode('UGX')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                currencyMode === 'UGX' ? 'bg-[#2D3094] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              UGX
            </button>
            <button
              onClick={() => setCurrencyMode('USD')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                currencyMode === 'USD' ? 'bg-[#2D3094] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              USD ($)
            </button>
          </div>

          {/* Date Filter Pills */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl overflow-x-auto">
            {(['today', 'week', 'month', 'year', 'all'] as DateFilterOption[]).map((opt) => (
              <button
                key={opt}
                onClick={() => setDateFilter(opt)}
                className={`px-3 py-1 text-xs font-bold rounded-lg capitalize transition-all whitespace-nowrap ${
                  dateFilter === opt 
                    ? 'bg-white text-[#2D3094] shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt === 'all' ? 'All Time' : opt === 'today' ? 'Today' : `This ${opt}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 8 Metric KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        
        {/* 1. Total Orders */}
        <div 
          onClick={() => onNavigateToOrders()}
          className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#2D3094]/40 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Orders</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2D3094] flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShoppingBag size={16} />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{totalOrders}</span>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center">
              <ArrowUpRight size={12} /> Active
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">All customer checkouts</p>
        </div>

        {/* 2. Pending Orders */}
        <div 
          onClick={() => onNavigateToOrders('pending')}
          className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Pending Orders</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock size={16} />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-amber-600">{pendingOrders}</span>
            {pendingOrders > 0 && (
              <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">
                Action Req.
              </span>
            )}
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Awaiting admin review</p>
        </div>

        {/* 3. In Production */}
        <div 
          onClick={() => onNavigateToOrders('processing')}
          className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-purple-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">In Production</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Cog size={16} />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-purple-700">{processingOrders}</span>
            <span className="text-[10px] text-slate-500 font-medium">On press floor</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Printing, cutting & assembling</p>
        </div>

        {/* 4. Ready for Delivery */}
        <div 
          onClick={() => onNavigateToOrders('ready_delivery')}
          className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Ready for Delivery</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Truck size={16} />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-emerald-600">{readyOrders}</span>
            <span className="text-[10px] text-slate-500 font-medium">QA Passed</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Packaged for courier dispatch</p>
        </div>

        {/* 5. Total Sales Revenue */}
        <div className="bg-gradient-to-br from-[#2D3094] to-[#1F2265] text-white p-4.5 rounded-2xl shadow-md shadow-[#2D3094]/15">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-200">Total Confirmed Sales</span>
            <div className="w-8 h-8 rounded-xl bg-white/15 text-white flex items-center justify-center">
              <DollarSign size={16} />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-xl sm:text-2xl font-black tracking-tight">
              {currencyMode === 'UGX' 
                ? `UGX ${totalSalesUGX.toLocaleString()}`
                : `$${totalSalesUSD.toLocaleString()}`
              }
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-300">Paid & delivered orders</p>
        </div>

        {/* 6. Completed Orders */}
        <div 
          onClick={() => onNavigateToOrders('completed')}
          className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Completed Orders</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{completedOrders}</span>
            <span className="text-[10px] text-emerald-600 font-bold">Fulfilled</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Successfully delivered</p>
        </div>

        {/* 7. Pending Payments */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Pending Payments</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertCircle size={16} />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-xl font-extrabold text-rose-600">
              {currencyMode === 'UGX' 
                ? `UGX ${pendingPaymentsUGX.toLocaleString()}`
                : `$${Number((pendingPaymentsUGX / 3800).toFixed(0)).toLocaleString()}`
              }
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">{pendingPaymentsCount} orders awaiting payment</p>
        </div>

        {/* 8. Cancelled Orders */}
        <div 
          onClick={() => onNavigateToOrders('cancelled')}
          className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-400 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Cancelled</span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
              <XCircle size={16} />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-700">{cancelledOrders}</span>
            <span className="text-[10px] text-slate-400">Voided</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Cancelled or refunded</p>
        </div>

      </div>

      {/* Analytics Breakdown & Category Share */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Sales Analytics & AOV */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Sales Revenue by Category</h3>
              <p className="text-xs text-slate-500">Top earning merchandise departments in current date filter</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase text-slate-400">Average Order Value</span>
              <p className="text-base font-extrabold text-[#2D3094]">
                {currencyMode === 'UGX' ? `UGX ${averageOrderValueUGX.toLocaleString()}` : `$${averageOrderValueUSD}`}
              </p>
            </div>
          </div>

          {/* Visual Bars */}
          <div className="space-y-3.5 pt-2">
            {categorySales.map((cat, idx) => {
              const percent = Math.round((cat.total / maxCatSales) * 100);
              const colors = ['bg-[#2D3094]', 'bg-[#ED008C]', 'bg-[#2E3192]', 'bg-indigo-600', 'bg-violet-600'];
              const barColor = colors[idx % colors.length];

              return (
                <div key={cat.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{cat.name}</span>
                    <span className="font-semibold text-slate-600">
                      {currencyMode === 'UGX' ? `UGX ${cat.total.toLocaleString()}` : `$${Math.round(cat.total / 3800)}`}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${barColor} rounded-full transition-all duration-500`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Best Sellers Snapshot */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Top Popular Products</h3>
              <span className="text-[10px] bg-pink-50 text-[#ED008C] font-bold px-2 py-0.5 rounded-full">
                High Demand
              </span>
            </div>
            
            <div className="divide-y divide-slate-100">
              {products.slice(0, 4).map((prod) => (
                <div key={prod.id} className="py-2.5 flex items-center gap-3">
                  <img 
                    src={prod.image} 
                    alt={prod.name}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0" 
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">{prod.name}</p>
                    <p className="text-[10px] text-slate-400">{prod.category} • In stock: {prod.stockQuantity}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-extrabold text-[#2D3094]">
                      {currencyMode === 'UGX' ? `UGX ${prod.priceUGX.toLocaleString()}` : `$${prod.priceUSD}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => onNavigateToOrders()}
              className="w-full py-2 text-xs font-bold text-[#2D3094] hover:text-[#ED008C] flex items-center justify-center gap-1.5 transition-colors"
            >
              View Full Catalog & Stats <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent Customer Orders</h3>
            <p className="text-xs text-slate-500">Live order stream connected to storefront checkout</p>
          </div>

          <button
            onClick={() => onNavigateToOrders()}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2D3094] hover:text-[#ED008C] transition-colors"
          >
            <span>View All Orders ({orders.length})</span>
            <ChevronRight size={15} />
          </button>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="px-5 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="font-extrabold text-[#2D3094]">#{ord.orderNumber}</span>
                    {ord.customerArtwork && (
                      <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-pink-100 text-[#ED008C]">
                        Artwork Attached
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <p className="font-bold text-slate-900">{ord.customerName}</p>
                    <p className="text-[10px] text-slate-400">{ord.customerPhone}</p>
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap text-slate-500 text-[11px]">
                    {new Date(ord.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap font-extrabold text-slate-900">
                    UGX {ord.totalUGX.toLocaleString()}
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      ord.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ord.paymentStatus.toUpperCase()}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-0.5 truncate max-w-[120px]">
                      {ord.paymentMethod}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap">
                    {getStatusBadge(ord.orderStatus)}
                  </td>

                  <td className="px-5 py-3.5 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onSelectOrder(ord)}
                        title="View Order Details"
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#2D3094] hover:text-white text-slate-600 transition-colors"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => onOpenReceipt(ord)}
                        title="Download / Print Receipt"
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-600 transition-colors"
                      >
                        <Receipt size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
