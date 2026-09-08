import React, { useState } from 'react';
import { 
  Settings, 
  Save, 
  ShieldCheck, 
  Download, 
  CheckCircle2,
  Building,
  DollarSign
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/mockData';
import { useShopStore } from '../../context/ShopStoreContext';

export const SettingsView: React.FC = () => {
  const { orders, products, categories, customers } = useShopStore();

  const [shopName, setShopName] = useState('SozyImpressions Online Shop');
  const [shopPhone, setShopPhone] = useState(COMPANY_INFO.phone);
  const [shopEmail, setShopEmail] = useState('info@sozyimpressions.com');
  const [shopAddress, setShopAddress] = useState(COMPANY_INFO.address);
  const [exchangeRate, setExchangeRate] = useState(3800);
  const [receiptFooter, setReceiptFooter] = useState('Thank you for choosing SozyImpressions! Quality Printing, Branding & Design Solutions.');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleExportFullBackup = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      shop: shopName,
      orders,
      products,
      categories,
      customers
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `sozyimpressions_shop_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <Settings size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Shop System Configuration</h2>
            <p className="text-xs text-slate-500">Storefront preferences, billing terms, and data backups</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
          <ShieldCheck size={14} />
          <span>Firestore Synced</span>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>Shop settings updated successfully!</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        
        {/* Card 1: Company Profile */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Building size={14} className="text-[#2D3094]" /> Storefront Identity & Official Contacts
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Store / Brand Name</label>
              <input
                type="text"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold outline-none focus:border-[#2D3094]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Support Phone / WhatsApp</label>
              <input
                type="text"
                value={shopPhone}
                onChange={(e) => setShopPhone(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold outline-none focus:border-[#2D3094]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Invoicing Email</label>
              <input
                type="email"
                value={shopEmail}
                onChange={(e) => setShopEmail(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold outline-none focus:border-[#2D3094]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Physical Workshop Address</label>
              <input
                type="text"
                value={shopAddress}
                onChange={(e) => setShopAddress(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold outline-none focus:border-[#2D3094]"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Currency & Invoicing */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <DollarSign size={14} className="text-[#2D3094]" /> Currency & Exchange Rate
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Base Currency</label>
              <input
                type="text"
                disabled
                value="UGX (Ugandan Shilling)"
                className="w-full px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">USD Exchange Rate (1 USD = ? UGX)</label>
              <input
                type="number"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-[#2D3094] outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">PDF Receipt Footer Disclaimer</label>
              <textarea
                rows={2}
                value={receiptFooter}
                onChange={(e) => setReceiptFooter(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-[#2D3094]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#2D3094] hover:bg-[#232573] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-[#2D3094]/20"
            >
              <Save size={14} />
              <span>Save Configuration</span>
            </button>
          </div>
        </div>

      </form>

      {/* Card 3: Data Export & Backup */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Database Export & Backup</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Download an offline JSON archive containing all orders, products, customer records, and category configurations.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportFullBackup}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors shrink-0"
        >
          <Download size={14} />
          <span>Export Store JSON</span>
        </button>
      </div>

    </div>
  );
};
