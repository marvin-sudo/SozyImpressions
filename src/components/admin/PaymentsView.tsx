import React, { useState, useMemo } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  Receipt
} from 'lucide-react';
import { useShopStore } from '../../context/ShopStoreContext';
import { AdminOrder } from '../../types/admin';

interface PaymentsViewProps {
  onOpenReceipt: (order: AdminOrder) => void;
  onSelectOrder: (order: AdminOrder) => void;
}

export const PaymentsView: React.FC<PaymentsViewProps> = ({
  onOpenReceipt,
  onSelectOrder
}) => {
  const { orders, updatePaymentStatus } = useShopStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const q = searchTerm.toLowerCase();
      const matchSearch = !q || 
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        (o.transactionReference && o.transactionReference.toLowerCase().includes(q));

      const matchMethod = methodFilter === 'all' || o.paymentMethod.toLowerCase().includes(methodFilter.toLowerCase());
      const matchStatus = statusFilter === 'all' || o.paymentStatus === statusFilter;

      return matchSearch && matchMethod && matchStatus;
    });
  }, [orders, searchTerm, methodFilter, statusFilter]);

  const totalPaidUGX = orders
    .filter(o => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.totalUGX, 0);

  const totalPendingUGX = orders
    .filter(o => o.paymentStatus === 'pending')
    .reduce((sum, o) => sum + o.totalUGX, 0);

  return (
    <div className="space-y-4">
      
      {/* 2 Big Financial Snapshot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">Total Verified Payments</span>
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <p className="text-2xl font-black mt-2">UGX {totalPaidUGX.toLocaleString()}</p>
          <p className="text-xs text-emerald-100 mt-0.5">
            Confirmed across Mobile Money, Visa and Bank Transfers
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-100">Pending Collection</span>
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <Clock size={16} />
            </div>
          </div>
          <p className="text-2xl font-black mt-2">UGX {totalPendingUGX.toLocaleString()}</p>
          <p className="text-xs text-amber-100 mt-0.5">
            Awaiting customer payment confirmation
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md w-full">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by order #, customer name, transaction reference..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2D3094]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none"
          >
            <option value="all">All Payment Statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>

          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none"
          >
            <option value="all">All Payment Channels</option>
            <option value="mtn">MTN Mobile Money</option>
            <option value="airtel">Airtel Money</option>
            <option value="visa">Visa / Mastercard</option>
            <option value="bank">Bank Transfer</option>
            <option value="cash">Cash on Delivery</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="px-5 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Payment Channel</th>
                <th className="px-4 py-3">Transaction Reference</th>
                <th className="px-4 py-3">Amount (UGX)</th>
                <th className="px-4 py-3">Payment Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span 
                      onClick={() => onSelectOrder(ord)} 
                      className="font-extrabold text-[#2D3094] hover:underline cursor-pointer"
                    >
                      #{ord.orderNumber}
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <p className="font-bold text-slate-900">{ord.customerName}</p>
                    <p className="text-[10px] text-slate-400">{ord.customerPhone}</p>
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap font-semibold text-slate-700">
                    {ord.paymentMethod}
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap font-mono text-slate-500 text-[11px]">
                    {ord.transactionReference || 'PENDING-TX'}
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap font-extrabold text-slate-900">
                    UGX {ord.totalUGX.toLocaleString()}
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      ord.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                      ord.paymentStatus === 'refunded' ? 'bg-slate-100 text-slate-800' :
                      ord.paymentStatus === 'failed' ? 'bg-rose-100 text-rose-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {ord.paymentStatus.toUpperCase()}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {ord.paymentStatus !== 'paid' && (
                        <button
                          onClick={() => updatePaymentStatus(ord.id, 'paid')}
                          title="Confirm & Mark Paid"
                          className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px]"
                        >
                          Mark Paid
                        </button>
                      )}

                      <button
                        onClick={() => onOpenReceipt(ord)}
                        title="Download / Print Receipt"
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#2D3094] hover:text-white text-slate-600 transition-colors"
                      >
                        <Receipt size={13} />
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
