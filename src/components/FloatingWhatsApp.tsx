import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const handleSend = () => {
    const text = customMsg.trim() 
      ? customMsg 
      : 'Hello Sozy Impressions! I would like to inquire about corporate branding, printing, and customized gifts.';
    const encoded = encodeURIComponent(text);
    window.open(`${COMPANY_INFO.whatsappDirectUrl}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      {isOpen && (
        <div className="bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 w-80 mb-3 text-left animate-in zoom-in-90 slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <MessageSquare size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Sozy Impressions</div>
                <div className="text-[10px] text-emerald-600 font-medium">Online • Instant Reply</div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700"
            >
              <X size={16} />
            </button>
          </div>

          <p className="text-xs text-slate-600 mb-3">
            👋 Hi there! Need an urgent quote, pre-press advice, or want to order custom corporate gifts?
          </p>

          <textarea
            rows={2}
            placeholder="Type your message or project requirements..."
            value={customMsg}
            onChange={(e) => setCustomMsg(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 outline-none focus:border-emerald-500 mb-3 resize-none"
          />

          <button
            onClick={handleSend}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Start WhatsApp Chat</span>
            <Send size={14} />
          </button>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 transition-transform duration-300 hover:scale-110 active:scale-95 group relative"
        title={`Chat on WhatsApp (${COMPANY_INFO.whatsapp})`}
      >
        <MessageSquare size={26} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#ED008C] rounded-full border-2 border-white animate-ping" />
      </button>
    </div>
  );
};
