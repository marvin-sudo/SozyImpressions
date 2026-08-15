import React, { useState } from 'react';
import { 
  X, 
  Search, 
  CheckCircle2, 
  FileText, 
  MessageSquare,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Order, QuoteRequest, Currency } from '../types';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders?: Order[];
  quotes?: QuoteRequest[];
  currency: Currency;
  navigate?: (view: any, param?: string) => void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  isOpen,
  onClose,
  orders = [],
  quotes = [],
  currency
}) => {
  const [searchId, setSearchId] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [foundQuote, setFoundQuote] = useState<QuoteRequest | null>(null);
  const [searched, setSearched] = useState(false);
  const [proofApproved, setProofApproved] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchId.trim().toUpperCase();
    if (!clean) return;

    setSearched(true);
    const orderMatch = orders.find(o => o.id.toUpperCase() === clean);
    const quoteMatch = quotes.find(q => q.id.toUpperCase() === clean);

    setFoundOrder(orderMatch || null);
    setFoundQuote(quoteMatch || null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'delivered':
      case 'approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'in_production':
      case 'printing':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'proof_sent':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 relative text-left my-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest bg-[#2D3094]/10 text-[#2D3094] px-2.5 py-1 rounded-full">
              Client Self-Service Portal
            </span>
            <span className="text-xs text-slate-400">• Order & Quote Tracking</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Header */}
        <div className="p-6 md:p-8 bg-[#F7F8FA] border-b border-slate-200">
          <h2 className="font-heading font-black text-2xl text-slate-900 mb-2">
            Track Production & Approve Proofs
          </h2>
          <p className="text-xs text-slate-600 mb-6">
            Enter your Order ID (e.g. <strong className="text-[#2D3094]">SOZY-ORD-2026-1048</strong>) or Quote Reference (e.g. <strong className="text-[#ED008C]">SOZY-Q2026-4421</strong>) to view real-time status and download official documents.
          </p>

          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Enter SOZY-ORD-2026-XXXX or SOZY-Q2026-XXXX"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-xs md:text-sm font-bold text-slate-900 outline-none focus:border-[#2D3094]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#2D3094] hover:bg-[#1f2168] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-md transition-all"
            >
              Track Job
            </button>
          </form>
        </div>

        {/* Portal Body */}
        <div className="p-6 md:p-8">
          {searched && !foundOrder && !foundQuote ? (
            <div className="text-center py-12 text-slate-400">
              <AlertCircle size={40} className="mx-auto mb-2 text-amber-500" />
              <div className="font-heading font-bold text-slate-800 text-sm">No matching order or quote found</div>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Please verify your reference number or contact our Kampala customer care team on WhatsApp.
              </p>
            </div>
          ) : foundOrder ? (
            /* Found Order View */
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Order Reference:</span>
                  <h3 className="font-heading font-black text-xl text-slate-900">{foundOrder.id}</h3>
                </div>
                <div className={`px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${getStatusColor(foundOrder.orderStatus)}`}>
                  Status: {foundOrder.orderStatus.replace('_', ' ')}
                </div>
              </div>

              {/* 5-Step Visual Production Tracker */}
              <div className="bg-[#F7F8FA] p-5 rounded-2xl border border-slate-200">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                  Live Production Milestone
                </div>
                <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-bold">
                  {[
                    { label: 'Received', done: true },
                    { label: '3D Proofing', done: true },
                    { label: 'Proof Approved', done: proofApproved || foundOrder.proofStatus === 'approved' },
                    { label: 'Offset Print', done: foundOrder.orderStatus === 'in_production' || foundOrder.orderStatus === 'delivered' },
                    { label: 'Dispatched', done: foundOrder.orderStatus === 'delivered' }
                  ].map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1.5">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                        step.done ? 'bg-emerald-500 text-white font-black' : 'bg-slate-200 text-slate-500'
                      }`}>
                        {step.done ? <CheckCircle2 size={16} /> : idx + 1}
                      </div>
                      <span className={step.done ? 'text-slate-900' : 'text-slate-400'}>{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Artwork Proof Approval Card */}
              <div className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 p-6 rounded-2xl border border-indigo-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-[#ED008C]" />
                    <h4 className="font-heading font-black text-sm text-slate-900">Pre-Press 3D Artwork Proof</h4>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full uppercase">
                    Proof v1.2 Ready
                  </span>
                </div>

                <p className="text-xs text-slate-600 mb-4">
                  Please review the digital separation, color Pantone codes, and bleed margins before mass offset fabrication begins.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setProofApproved(true)}
                    disabled={proofApproved}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow transition-all flex items-center gap-2"
                  >
                    <CheckCircle2 size={14} />
                    <span>{proofApproved ? 'Artwork Proof Approved!' : 'Approve Proof for Print'}</span>
                  </button>

                  <a
                    href="https://wa.me/256709390168"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-slate-300 hover:bg-white text-slate-700 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl flex items-center gap-2"
                  >
                    <MessageSquare size={14} />
                    <span>Request Changes via WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Order Items Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                <div className="bg-slate-100 px-4 py-2.5 font-bold text-slate-700 flex justify-between">
                  <span>Item Description</span>
                  <span>Amount</span>
                </div>
                <div className="divide-y divide-slate-100 p-2">
                  {foundOrder.items.map((it, idx) => (
                    <div key={idx} className="p-2 flex justify-between">
                      <div>
                        <div className="font-bold text-slate-900">{it.product.name}</div>
                        <div className="text-[10px] text-slate-500">Qty: {it.quantity} {it.customization?.color ? `• ${it.customization.color}` : ''}</div>
                      </div>
                      <div className="font-bold text-slate-800">
                        {currency === 'UGX' ? `UGX ${it.subtotalUGX.toLocaleString()}` : `$${it.subtotalUSD.toFixed(2)}`}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between font-heading font-black text-sm text-[#2D3094]">
                  <span>Total Paid / Invoiced:</span>
                  <span>{currency === 'UGX' ? `UGX ${foundOrder.totalUGX.toLocaleString()}` : `$${foundOrder.totalUSD}`}</span>
                </div>
              </div>

            </div>
          ) : foundQuote ? (
            /* Found Quote View */
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Quote Estimate:</span>
                  <h3 className="font-heading font-black text-xl text-slate-900">{foundQuote.id}</h3>
                </div>
                <div className="px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border-blue-200">
                  Status: {foundQuote.status.toUpperCase()}
                </div>
              </div>

              <div className="bg-[#F7F8FA] p-5 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Deliverable:</span>
                  <span className="font-bold text-slate-900">{foundQuote.product}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Quantity:</span>
                  <span className="font-bold text-slate-900">{foundQuote.quantity} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Total:</span>
                  <span className="font-bold text-[#2D3094]">
                    {currency === 'UGX' ? `UGX ${foundQuote.estimatedPriceUGX?.toLocaleString()}` : `$${foundQuote.estimatedPriceUSD}`}
                  </span>
                </div>
              </div>

              <a
                href={`https://wa.me/256709390168?text=Hello%20Sozy%20Impressions!%20I%20am%20ready%20to%20approve%20Quote%20${foundQuote.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#ED008C] hover:bg-[#d4007d] text-white font-bold text-xs uppercase tracking-wider py-4 rounded-full shadow-lg flex items-center justify-center gap-2"
              >
                <span>Convert to Official Print Order</span>
              </a>
            </div>
          ) : (
            /* Default State */
            <div className="text-center py-8 text-slate-400">
              <FileText size={48} className="mx-auto mb-2 text-slate-300" />
              <p className="text-xs text-slate-500">
                You can find your Reference ID on your email confirmation or WhatsApp chat from Sozy Impressions.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
