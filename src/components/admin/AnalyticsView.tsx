import React from 'react';
import { BarChart3 } from 'lucide-react';
import { useShopStore } from '../../context/ShopStoreContext';

export const AnalyticsView: React.FC = () => {
  const { orders, products, customers } = useShopStore();

  const totalGrossUGX = orders.reduce((sum, o) => sum + o.totalUGX, 0);
  const totalPaidOrders = orders.filter(o => o.paymentStatus === 'paid');
  const paidSalesUGX = totalPaidOrders.reduce((sum, o) => sum + o.totalUGX, 0);
  const averageOrderValueUGX = orders.length > 0 ? Math.round(totalGrossUGX / orders.length) : 0;

  // Payment method breakdown
  const paymentBreakdown = orders.reduce((acc, o) => {
    acc[o.paymentMethod] = (acc[o.paymentMethod] || 0) + o.totalUGX;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#2D3094] flex items-center justify-center">
            <BarChart3 size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Shop Analytics & Financial Reports</h2>
            <p className="text-xs text-slate-500">Real-time revenue metrics, order velocity, and customer growth</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
          Live Storefront Metrics
        </span>
      </div>

      {/* 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Gross Sales Value</span>
          <p className="text-xl font-black text-slate-900 mt-2">UGX {totalGrossUGX.toLocaleString()}</p>
          <p className="text-[11px] text-slate-400 mt-1">Across all order checkouts</p>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Collected Revenue</span>
          <p className="text-xl font-black text-emerald-600 mt-2">UGX {paidSalesUGX.toLocaleString()}</p>
          <p className="text-[11px] text-slate-400 mt-1">{totalPaidOrders.length} orders settled</p>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Average Order Value</span>
          <p className="text-xl font-black text-[#2D3094] mt-2">UGX {averageOrderValueUGX.toLocaleString()}</p>
          <p className="text-[11px] text-slate-400 mt-1">~ ${Math.round(averageOrderValueUGX / 3800)} USD per basket</p>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Catalog Capacity</span>
          <p className="text-xl font-black text-[#ED008C] mt-2">{products.length} Products</p>
          <p className="text-[11px] text-slate-400 mt-1">{customers.length} verified buyers</p>
        </div>

      </div>

      {/* Payment Methods Breakdown */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Payment Channel Volume (UGX)</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
          {Object.entries(paymentBreakdown).map(([method, amount]) => {
            const pct = totalGrossUGX > 0 ? Math.round((amount / totalGrossUGX) * 100) : 0;

            return (
              <div key={method} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-600 block truncate">{method}</span>
                <p className="text-base font-black text-slate-900 mt-1">UGX {amount.toLocaleString()}</p>
                <div className="mt-2 w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2D3094] rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-[10px] text-slate-400 font-semibold mt-1 block">{pct}% of total sales</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
