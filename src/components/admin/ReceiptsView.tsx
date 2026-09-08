import React, { useState } from 'react';
import { 
  Receipt, 
  Search, 
  Download, 
  Printer, 
  Eye
} from 'lucide-react';
import { useShopStore } from '../../context/ShopStoreContext';
import { AdminOrder } from '../../types/admin';
import { downloadReceiptPDF, printReceiptPDF } from '../../utils/receiptGenerator';

interface ReceiptsViewProps {
  onOpenReceipt: (order: AdminOrder) => void;
}

export const ReceiptsView: React.FC<ReceiptsViewProps> = ({ onOpenReceipt }) => {
  const { orders } = useShopStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(o => {
    const q = searchTerm.toLowerCase();
    return !q ||
      o.orderNumber.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.customerEmail.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Receipt size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Official Receipts & Invoicing Hub</h2>
            <p className="text-xs text-slate-500">Generate, download and email PDF invoices for any client transaction</p>
          </div>
        </div>

        <div className="relative max-w-sm w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by order #, receipt #, customer..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2D3094]"
          />
        </div>
      </div>

      {/* Receipts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="px-5 py-3">Receipt Ref</th>
                <th className="px-4 py-3">Order #</th>
                <th className="px-4 py-3">Billed Customer</th>
                <th className="px-4 py-3">Issue Date</th>
                <th className="px-4 py-3">Total (UGX)</th>
                <th className="px-4 py-3">Payment Status</th>
                <th className="px-5 py-3 text-right">Receipt Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5 whitespace-nowrap font-bold text-slate-800">
                    REC-{ord.orderNumber}
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap font-extrabold text-[#2D3094]">
                    #{ord.orderNumber}
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <p className="font-bold text-slate-900">{ord.customerName}</p>
                    <p className="text-[10px] text-slate-400">{ord.customerEmail}</p>
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap text-slate-500">
                    {new Date(ord.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap font-extrabold text-slate-900">
                    UGX {ord.totalUGX.toLocaleString()}
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      ord.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ord.paymentStatus}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onOpenReceipt(ord)}
                        title="View Preview"
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      >
                        <Eye size={13} />
                      </button>

                      <button
                        onClick={() => downloadReceiptPDF(ord)}
                        title="Download PDF Receipt"
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors shadow-xs"
                      >
                        <Download size={12} />
                        <span>PDF</span>
                      </button>

                      <button
                        onClick={() => printReceiptPDF(ord)}
                        title="Print Receipt"
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      >
                        <Printer size={13} />
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
