import React, { useState } from 'react';
import { 
  Truck, 
  Search
} from 'lucide-react';
import { useShopStore } from '../../context/ShopStoreContext';
import { AdminOrder, DeliveryStatus } from '../../types/admin';

interface DeliveryViewProps {
  onSelectOrder: (order: AdminOrder) => void;
}

export const DeliveryView: React.FC<DeliveryViewProps> = ({ onSelectOrder }) => {
  const { orders, updateDeliveryStatus } = useShopStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [districtFilter, setDistrictFilter] = useState('all');

  const districts = [
    'Kampala Central',
    'Nakawa',
    'Kawempe',
    'Rubaga',
    'Makindye',
    'Entebbe',
    'Wakiso',
    'Mukono',
    'Jinja',
    'Upcountry Uganda'
  ];

  const filteredOrders = orders.filter(o => {
    const q = searchTerm.toLowerCase();
    const matchSearch = !q ||
      o.orderNumber.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      (o.deliveryAddress && o.deliveryAddress.toLowerCase().includes(q));

    const matchDistrict = districtFilter === 'all' || o.district?.toLowerCase() === districtFilter.toLowerCase();
    return matchSearch && matchDistrict;
  });

  return (
    <div className="space-y-4">
      
      {/* Top Header Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
            <Truck size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Delivery & Logistics Dispatch</h2>
            <p className="text-xs text-slate-500">Coordinate client drop-offs, district routing and couriers</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search recipient or address..."
              className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2D3094]"
            />
          </div>

          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none"
          >
            <option value="all">All Delivery Districts</option>
            {districts.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Delivery Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="px-5 py-3">Order</th>
                <th className="px-4 py-3">Recipient & Contact</th>
                <th className="px-4 py-3">Destination Address</th>
                <th className="px-4 py-3">District</th>
                <th className="px-4 py-3">Delivery Fee</th>
                <th className="px-4 py-3">Dispatch Status</th>
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
                    <span className="block text-[10px] text-slate-400">{ord.items?.length || 1} packages</span>
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <p className="font-bold text-slate-900">{ord.customerName}</p>
                    <p className="text-[10px] text-slate-400">{ord.customerPhone}</p>
                  </td>

                  <td className="px-4 py-3.5">
                    <p className="font-medium text-slate-800 line-clamp-1 max-w-xs">{ord.deliveryAddress}</p>
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">
                      {ord.district || 'Kampala Area'}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap font-bold text-slate-800">
                    UGX {(ord.deliveryFeeUGX || 0).toLocaleString()}
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <select
                      value={ord.deliveryStatus || 'pending'}
                      onChange={(e) => updateDeliveryStatus(ord.id, e.target.value as DeliveryStatus)}
                      className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 outline-none"
                    >
                      <option value="pending">Pending Packaging</option>
                      <option value="ready">Ready for Dispatch</option>
                      <option value="dispatched">Out with Courier</option>
                      <option value="delivered">Delivered to Client</option>
                    </select>
                  </td>

                  <td className="px-5 py-3.5 whitespace-nowrap text-right">
                    <button
                      onClick={() => onSelectOrder(ord)}
                      className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-[#2D3094] hover:text-white text-slate-700 font-bold text-[11px] transition-colors"
                    >
                      Dispatch Details →
                    </button>
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
