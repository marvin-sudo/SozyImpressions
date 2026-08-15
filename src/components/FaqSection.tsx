import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  MessageSquare, 
  Phone
} from 'lucide-react';
import { FAQS_DATA, COMPANY_INFO } from '../data/mockData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-[#F7F8FA] border-b border-slate-200/80 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2D3094]/10 text-[#2D3094] text-xs font-black uppercase tracking-wider mb-3">
            <HelpCircle size={14} className="text-[#ED008C]" />
            <span>Got Questions? We’ve Got Answers</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-[#121212] tracking-tight leading-tight">
            Frequently Asked <br />
            <span className="text-[#2D3094]">Questions.</span>
          </h2>
          <p className="text-base text-slate-600 mt-3 font-normal leading-relaxed">
            Everything you need to know about our pre-press procedures, turnaround guarantees, bulk discounts, and corporate LPO payment terms.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 text-left">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm ${
                  isOpen ? 'border-[#2D3094] shadow-md' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm md:text-base text-slate-900"
                >
                  <span className={isOpen ? 'text-[#2D3094]' : 'text-slate-800'}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-[#2D3094] text-white rotate-180' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Help Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div>
            <div className="font-heading font-black text-sm text-slate-900 mb-0.5">
              Still have questions or custom technical specs?
            </div>
            <div className="text-xs text-slate-500">
              Our pre-press technical advisors in Kampala are available to assist you right now.
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={COMPANY_INFO.whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-full flex items-center gap-2 shadow-md"
            >
              <MessageSquare size={14} />
              <span>Ask on WhatsApp</span>
            </a>
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-full flex items-center gap-2"
            >
              <Phone size={14} />
              <span>Call Us</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
