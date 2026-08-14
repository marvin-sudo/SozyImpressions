import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  FileText, 
  Download, 
  MessageSquare, 
  Sparkles
} from 'lucide-react';
import { View, Currency } from '../types';

interface AccountPageProps {
  navigate?: (view: View, param?: string) => void;
  currency: Currency;
}

export const AccountPage: React.FC<AccountPageProps> = ({ currency }) => {
  const [searchTrackingId, setSearchTrackingId] = useState('');
  const [activeTab, setActiveTab] = useState<'tracker' | 'orders' | 'invoices'>('tracker');

  // Simulated active sample orders
  const sampleOrders = [
    {
      id: 'SOZY-ORD-84920',
      date: 'Aug 12, 2026',
      client: 'Stanbic Bank Uganda (Brand Dept)',
      items: '500x Executive Laser-Engraved Smart LED Flasks + 1,000x Soft-Touch VIP Gift Sets',
      totalUGX: 38500000,
      totalUSD: 10130,
      stage: 'Production', // Stage in 7-step pipeline
      estimatedDelivery: 'Aug 16, 2026',
      deliveryAddress: 'Stanbic Bank Towers, Crested Towers Branch, Kampala',
      assignedManager: 'Alex Mukasa (Senior Production Lead)',
      managerPhone: '+256 708 000 000'
    },
    {
      id: 'SOZY-ORD-73105',
      date: 'Aug 08, 2026',
      client: 'Xani Foods Ltd',
      items: '5,000x Matte Laminated Food-Grade Packaging Boxes (Offset Heidelberg)',
      totalUGX: 14200000,
      totalUSD: 3736,
      stage: 'Ready',
      estimatedDelivery: 'Aug 14, 2026',
      deliveryAddress: 'Xani Foods Distribution Hub, Jinja Industrial Area',
      assignedManager: 'Sarah Namatovu',
      managerPhone: '+256 708 000 000'
    }
  ];

  const stages = [
    'Enquiry',
    'Quote',
    'Design',
    'Approval',
    'Production',
    'Ready',
    'Delivered'
  ];

  const currentOrder = sampleOrders.find(o => 
    o.id.toLowerCase().includes(searchTrackingId.trim().toLowerCase())
  ) || sampleOrders[0];

  const currentStageIndex = stages.indexOf(currentOrder.stage);

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen py-12 px-4 md:px-8 font-sans text-left">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Hero Banner */}
        <div className="bg-[#181B34] text-white rounded-3xl p-8 md:p-14 relative overflow-hidden shadow-2xl border border-white/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ED008C]/15 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-black uppercase tracking-wider mb-4 backdrop-blur-md">
              <Sparkles size={14} className="text-[#ED008C]" />
              <span>Client Self-Service & Production Portal</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-black tracking-tight leading-tight mb-4">
              Real-Time Order Tracking & <br />
              <span className="text-[#ED008C]">Production Stage Monitor.</span>
            </h1>
            <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed">
              Track your commercial print runs and corporate merchandise jobs from initial pre-press approval to live Heidelberg press runs, packaging, and doorstep courier delivery.
            </p>
          </div>
        </div>

        {/* Tracking Search & Status Bar */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Enter Order or Tracking # (e.g. SOZY-ORD-84920)..."
              value={searchTrackingId}
              onChange={(e) => setSearchTrackingId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-800 outline-none focus:border-[#2D3094] focus:bg-white font-mono font-bold"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('tracker')}
              className={`flex-1 md:flex-none px-5 py-3 rounded-2xl text-xs font-heading font-bold transition-all ${
                activeTab === 'tracker'
                  ? 'bg-[#2D3094] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Active Pipeline Monitor
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`flex-1 md:flex-none px-5 py-3 rounded-2xl text-xs font-heading font-bold transition-all ${
                activeTab === 'invoices'
                  ? 'bg-[#2D3094] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Invoices & Proformas
            </button>
          </div>
        </div>

        {/* Active Order Stage Monitor */}
        {activeTab === 'tracker' && (
          <div className="space-y-8">
            
            {/* Live Visual Tracker Card */}
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-xl space-y-8">
              
              {/* Order Info Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ED008C]/10 text-[#ED008C] text-[10px] font-black uppercase tracking-widest mb-1.5">
                    Live Production Job
                  </div>
                  <h2 className="font-heading font-black text-xl md:text-2xl text-slate-900 font-mono">
                    {currentOrder.id}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Account: <strong className="text-slate-800">{currentOrder.client}</strong> • Placed on {currentOrder.date}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`https://wa.me/256708000000?text=Hello%20Sozy%20Impressions!%20Inquiring%20about%20status%20for%20order%20${currentOrder.id}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2"
                  >
                    <MessageSquare size={14} />
                    <span>Inquire with Job Manager</span>
                  </a>
                </div>
              </div>

              {/* 7-Step Production Progress Bar */}
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-6">
                  Quality Assurance & Production Milestones (Step {currentStageIndex + 1} of 7):
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                  {stages.map((stage, idx) => {
                    const isCompleted = idx <= currentStageIndex;
                    const isCurrent = idx === currentStageIndex;

                    return (
                      <div
                        key={stage}
                        className={`p-3.5 rounded-2xl border text-center transition-all ${
                          isCurrent
                            ? 'bg-[#ED008C] border-[#ED008C] text-white shadow-lg shadow-[#ED008C]/25 scale-105'
                            : isCompleted
                            ? 'bg-[#2D3094]/10 border-[#2D3094]/20 text-[#2D3094]'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                        }`}
                      >
                        <div className="text-[10px] font-bold opacity-80 mb-1">
                          Stage 0{idx + 1}
                        </div>
                        <div className="font-heading font-black text-xs">
                          {stage}
                        </div>
                        {isCompleted && (
                          <CheckCircle2 size={14} className={`mx-auto mt-2 ${isCurrent ? 'text-white' : 'text-[#2D3094]'}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Specification Summary Box */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Deliverable Items
                  </span>
                  <p className="font-bold text-slate-800 leading-snug">
                    {currentOrder.items}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Target Delivery SLA
                  </span>
                  <p className="font-bold text-emerald-600 text-sm">
                    {currentOrder.estimatedDelivery} (Guaranteed)
                  </p>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Destination: {currentOrder.deliveryAddress}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Financial Summary
                  </span>
                  <p className="font-heading font-black text-base text-[#2D3094]">
                    {currency === 'UGX' ? `UGX ${currentOrder.totalUGX.toLocaleString()}` : `$${currentOrder.totalUSD.toLocaleString()}`}
                  </p>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Status: Verified / 50% Advance Received
                  </span>
                </div>
              </div>

            </div>

            {/* Past Completed Orders List */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md space-y-4">
              <h3 className="font-heading font-black text-base text-slate-900">
                Recent Organization Orders & Production Runs
              </h3>
              <div className="space-y-3">
                {sampleOrders.map((ord) => (
                  <div
                    key={ord.id}
                    onClick={() => setSearchTrackingId(ord.id)}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-[#2D3094] hover:bg-slate-50 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#2D3094]">{ord.id}</span>
                        <span className="text-[10px] font-bold bg-[#ED008C]/10 text-[#ED008C] px-2 py-0.5 rounded-md uppercase">
                          {ord.stage}
                        </span>
                      </div>
                      <div className="text-xs text-slate-700 font-medium mt-1">
                        {ord.items}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-heading font-bold text-xs text-slate-900">
                        {currency === 'UGX' ? `UGX ${ord.totalUGX.toLocaleString()}` : `$${ord.totalUSD.toLocaleString()}`}
                      </div>
                      <span className="text-[10px] text-slate-400">{ord.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Invoices & Proformas Tab */}
        {activeTab === 'invoices' && (
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-xl space-y-6">
            <h3 className="font-heading font-black text-xl text-slate-900">
              Official Invoices, EFRIS Receipts & Proforma Quotations
            </h3>
            <p className="text-xs text-slate-500">
              Download formal PDF documents with URA Tax Identification Number (TIN) validation for company accounting and procurement audits.
            </p>

            <div className="space-y-3">
              {sampleOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#2D3094] text-white flex items-center justify-center shrink-0">
                      <FileText size={20} />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-xs text-slate-900">
                        Tax Invoice #{ord.id}-INV
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Issued for {ord.client} • {ord.date}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-heading font-bold text-xs text-[#2D3094]">
                      {currency === 'UGX' ? `UGX ${ord.totalUGX.toLocaleString()}` : `$${ord.totalUSD.toLocaleString()}`}
                    </span>
                    <button
                      onClick={() => alert(`Downloading Proforma PDF for ${ord.id}...`)}
                      className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <Download size={13} />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
