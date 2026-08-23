import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { View, Currency, ServiceDetail } from '../types';
import { SERVICES_DATA } from '../data/mockData';
import { QuoteCalculatorSection } from '../components/QuoteCalculatorSection';

interface ServicesPageProps {
  navigate: (view: View, param?: string) => void;
  currency?: Currency;
  selectedServiceId?: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  navigate,
  currency = 'UGX',
  selectedServiceId
}) => {
  const [selectedLocalId, setSelectedLocalId] = useState<string>(
    selectedServiceId || SERVICES_DATA[0].id
  );

  const activeService: ServiceDetail = 
    SERVICES_DATA.find(s => s.id === (selectedServiceId && !selectedLocalId ? selectedServiceId : selectedLocalId)) || 
    SERVICES_DATA[0];

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen py-12 px-4 md:px-8 font-sans text-left">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Hero Banner */}
        <div className="bg-[#181B34] text-white rounded-3xl p-8 md:p-14 mb-12 relative overflow-hidden shadow-2xl border border-white/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ED008C]/15 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-black uppercase tracking-wider mb-4 backdrop-blur-md">
              <Sparkles size={14} className="text-[#ED008C]" />
              <span>Full-Stack Industrial & Creative Capabilities</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-black tracking-tight leading-tight mb-4">
              Comprehensive Printing, Branding & <br />
              <span className="text-[#ED008C]">Corporate Solutions.</span>
            </h1>
            <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed">
              We operate high-capacity German Heidelberg offset presses, wide-format digital UV printers, laser CNC engravers, and a senior design studio on Nkrumah Road, Kampala.
            </p>
          </div>
        </div>

        {/* 2-Column Interactive Services Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Services Sidebar Menu (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-3 sticky top-24">
            <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 px-1">
              Select Core Department:
            </div>
            {SERVICES_DATA.map((service) => {
              const isActive = activeService.id === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedLocalId(service.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between group ${
                    isActive
                      ? 'bg-[#2D3094] border-[#2D3094] text-white shadow-xl scale-[1.02]'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-black px-2 py-0.5 rounded-md ${
                      isActive ? 'bg-[#ED008C] text-white' : 'bg-slate-100 text-[#2D3094]'
                    }`}>
                      {service.number}
                    </span>
                    <div>
                      <div className="font-heading font-bold text-xs leading-snug">
                        {service.title}
                      </div>
                      <div className={`text-[10px] ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                        {service.popularProducts.length} key products
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={16} className={`transition-transform ${isActive ? 'text-white translate-x-1' : 'text-slate-400 group-hover:translate-x-1'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Service Deep-Dive View (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-xl">
              
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest bg-[#2D3094]/10 text-[#2D3094] px-3 py-1 rounded-full">
                  Department {activeService.number}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Estimated Turnaround: <strong className="text-slate-900">{activeService.turnaround}</strong>
                </span>
              </div>

              <h2 className="font-heading font-black text-2xl md:text-3xl text-slate-900 mb-2">
                {activeService.title}
              </h2>
              <p className="text-xs font-bold text-[#ED008C] uppercase tracking-wider mb-4">
                {activeService.subtitle}
              </p>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-6">
                {activeService.description}
              </p>

              {/* Service Hero Photo */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8 border border-slate-200 shadow-md">
                <img 
                  src={activeService.image} 
                  alt={activeService.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Deliverables Checklist */}
              <div className="mb-8">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-800 mb-3">
                  Key Products & Deliverables:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeService.popularProducts.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700">
                      <CheckCircle2 size={16} className="text-[#ED008C] shrink-0 mt-0.5" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment & Quality Standards */}
              <div className="bg-[#2D3094]/5 border border-[#2D3094]/15 p-5 rounded-2xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-[#2D3094] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <ShieldCheck size={16} className="text-[#ED008C]" />
                    <span>Industrial Equipment & Proofing SLA</span>
                  </div>
                  <div className="text-xs text-slate-600">
                    Direct Heidelberg Speedmaster Presses • Roland TrueVIS UV Inks • Pantone PMS Color Calibration
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => navigate('quote')}
                  className="bg-[#ED008C] hover:bg-[#d4007d] text-white font-heading font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg shadow-[#ED008C]/25 transition-all hover:scale-105 flex items-center gap-2"
                >
                  <span>Request Quote for {activeService.title}</span>
                  <ArrowRight size={16} />
                </button>

                <a
                  href={`https://wa.me/256787662183?text=Hello%20Sozy%20Impressions!%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(activeService.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-5 py-3.5 rounded-full border border-emerald-200"
                >
                  <MessageSquare size={16} />
                  <span>Discuss Specs on WhatsApp</span>
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Instant Quote Calculator & RFQ */}
        <div className="mt-16 bg-white rounded-3xl p-4 md:p-8 border border-slate-200 shadow-xl overflow-hidden">
          <QuoteCalculatorSection currency={currency || 'UGX'} />
        </div>

      </div>
    </div>
  );
};
