import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Eye, 
  X
} from 'lucide-react';
import { useShopStore } from '../../context/ShopStoreContext';
import { AdminCustomer, AdminOrder } from '../../types/admin';

interface CustomersViewProps {
  onSelectOrder: (order: AdminOrder) => void;
}

export const CustomersView: React.FC<CustomersViewProps> = ({ onSelectOrder }) => {
  const { customers, orders } = useShopStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null);

  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();
      return c.name.toLowerCase().includes(q) ||
             c.email.toLowerCase().includes(q) ||
             c.phone.toLowerCase().includes(q) ||
             (c.company && c.company.toLowerCase().includes(q));
    });
  }, [customers, searchTerm]);

  // WhatsApp Icon URL specified by user
  const WHATSAPP_ICON_URL = "https://www.image2url.com/r2/default/images/1788778555859-9cfbf16d-5574-4e39-bcc2-cc48f55de4ce.png";

  const getCleanPhone = (phone: string) => {
    return phone.replace(/[^0-9]/g, '');
  };

  return (
    <div className="space-y-4">
      
      {/* Top Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2D3094]/10 text-[#2D3094] flex items-center justify-center">
            <Users size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Customer Directory</h2>
            <p className="text-xs text-slate-500">{customers.length} registered buyers and corporate clients</p>
          </div>
        </div>

        <div className="relative max-w-sm w-full">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by customer name, phone, email, company..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2D3094]"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="px-5 py-3">Customer</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Company / Org</th>
                <th className="px-4 py-3 text-center">Orders</th>
                <th className="px-4 py-3">Total Spend (UGX)</th>
                <th className="px-4 py-3">Last Order Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.map((cust) => {
                const isVIP = (cust.totalSpentUGX || 0) > 1000000;

                return (
                  <tr key={cust.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#2D3094]/10 text-[#2D3094] flex items-center justify-center font-bold text-xs">
                          {cust.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{cust.name}</p>
                          <p className="text-[10px] text-slate-400">{cust.deliveryAddress || 'Kampala'}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap text-slate-600">
                      <p className="font-medium">{cust.phone}</p>
                      <p className="text-[10px] text-slate-400">{cust.email}</p>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap text-slate-700 font-semibold">
                      {cust.company || 'Individual Client'}
                    </td>

                    <td className="px-4 py-3.5 text-center whitespace-nowrap font-bold text-slate-800">
                      {cust.totalOrders}
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap font-extrabold text-[#2D3094]">
                      UGX {cust.totalSpentUGX.toLocaleString()}
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap text-slate-500 text-[11px]">
                      {new Date(cust.lastOrderDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isVIP ? 'bg-pink-100 text-[#ED008C]' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {isVIP ? '★ VIP Client' : 'Active'}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`https://wa.me/${getCleanPhone(cust.phone)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Contact on WhatsApp"
                          className="p-1 rounded-lg hover:bg-emerald-50 transition-colors"
                        >
                          <img src={WHATSAPP_ICON_URL} alt="WhatsApp" className="w-5 h-5 object-contain" />
                        </a>

                        <button
                          onClick={() => setSelectedCustomer(cust)}
                          title="View Profile & Orders"
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#2D3094] hover:text-white text-slate-600 transition-colors"
                        >
                          <Eye size={13} />
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

      {/* Customer Detail Profile Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in-50">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="px-6 py-4 bg-[#12142B] text-white flex items-center justify-between">
              <div>
                <h2 className="text-base font-black">{selectedCustomer.name}</h2>
                <p className="text-xs text-slate-300">Customer Profile & Order History</p>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="p-1.5 text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 custom-scrollbar text-xs">
              
              {/* Contact Information Card */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-500 uppercase">Contact & Profile</span>
                  <a
                    href={`https://wa.me/${getCleanPhone(selectedCustomer.phone)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs"
                  >
                    <img src={WHATSAPP_ICON_URL} alt="WhatsApp" className="w-4 h-4" />
                    <span>WhatsApp Chat</span>
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Email</span>
                    <p className="font-semibold text-slate-800">{selectedCustomer.email}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Phone</span>
                    <p className="font-semibold text-slate-800">{selectedCustomer.phone}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Company / Organization</span>
                    <p className="font-semibold text-slate-800">{selectedCustomer.company || 'None'}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Delivery Address</span>
                    <p className="font-semibold text-slate-800">{selectedCustomer.deliveryAddress || 'Kampala'}</p>
                  </div>
                </div>
              </div>

              {/* Order History */}
              <div className="space-y-2">
                <h3 className="font-extrabold uppercase text-slate-500">
                  Customer Orders ({orders.filter(o => o.customerPhone === selectedCustomer.phone || o.customerEmail === selectedCustomer.email).length})
                </h3>

                <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
                  {orders
                    .filter(o => o.customerPhone === selectedCustomer.phone || o.customerEmail === selectedCustomer.email)
                    .map((ord) => (
                      <div key={ord.id} className="p-3 hover:bg-slate-50 flex items-center justify-between">
                        <div>
                          <span className="font-extrabold text-[#2D3094]">#{ord.orderNumber}</span>
                          <span className="text-slate-400 ml-2">
                            {new Date(ord.createdAt).toLocaleDateString()}
                          </span>
                          <p className="text-slate-600 text-[11px] mt-0.5">
                            {ord.items?.map(it => it.product?.name).join(', ')}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-extrabold text-slate-900">UGX {ord.totalUGX.toLocaleString()}</p>
                          <button
                            onClick={() => {
                              setSelectedCustomer(null);
                              onSelectOrder(ord);
                            }}
                            className="text-[11px] font-bold text-[#2D3094] hover:underline"
                          >
                            View Order Details →
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
