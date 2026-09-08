import React, { useState } from 'react';
import { History, Search } from 'lucide-react';
import { useShopStore } from '../../context/ShopStoreContext';

export const ActivityLogView: React.FC = () => {
  const { activityLogs } = useShopStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = activityLogs.filter(log => {
    const q = searchTerm.toLowerCase();
    return !q ||
      log.action.toLowerCase().includes(q) ||
      log.description.toLowerCase().includes(q) ||
      (log.userName || log.user || '').toLowerCase().includes(q);
  });

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <History size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Admin Audit Trail & System Log</h2>
            <p className="text-xs text-slate-500">Immutable records of staff activities, status changes, and product operations</p>
          </div>
        </div>

        <div className="relative max-w-sm w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search activity events..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2D3094]"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="px-5 py-3">Timestamp</th>
                <th className="px-4 py-3">Staff / Admin</th>
                <th className="px-4 py-3">Operation Action</th>
                <th className="px-4 py-3">Target Reference</th>
                <th className="px-5 py-3">Details & Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5 whitespace-nowrap text-slate-500 text-[11px]">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#2D3094]/10 text-[#2D3094] flex items-center justify-center text-[10px] font-bold">
                        {log.userName.slice(0, 1).toUpperCase()}
                      </div>
                      <span className="font-bold text-slate-800">{log.userName}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="inline-block px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-slate-100 text-slate-700">
                      {log.action}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap font-semibold text-[#2D3094]">
                    {log.targetType.toUpperCase()}: {log.targetId.slice(0, 12)}
                  </td>

                  <td className="px-5 py-3.5 text-slate-600 max-w-md">
                    {log.description}
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
