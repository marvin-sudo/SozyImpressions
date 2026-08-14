import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Printer,
  Zap,
  Building2,
  Gift,
  PackageCheck,
  PenTool,
  ChevronRight
} from 'lucide-react';
import { View, Currency, ServiceItem } from '../types';
import { SERVICES_DATA } from '../data/mockData';

interface CoreServicesSectionProps {
  navigate: (view: View, param?: string) => void;
  currency: Currency;
  onSelectService?: (service: ServiceItem) => void;
}

export const CoreServicesSection: React.FC<CoreServicesSectionProps> = ({ 
  navigate, 
  currency,
  onSelectService 
}) => {

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Printer': return <Printer className="w-5 h-5 text-white" />;
      case 'Zap': return <Zap className="w-5 h-5 text-white" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-white" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-white" />;
      case 'Gift': return <Gift className="w-5 h-5 text-white" />;
      case 'PackageCheck': return <PackageCheck className="w-5 h-5 text-white" />;
      case 'PenTool': return <PenTool className="w-5 h-5 text-white" />;
      default: return <Sparkles className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-white border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2D3094]/10 text-[#2D3094] text-xs font-black uppercase tracking-wider mb-3">
              <Sparkles size={14} className="text-[#ED008C]" />
              <span>Full-Spectrum Solutions</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-[#121212] tracking-tight leading-tight">
              Everything Your Brand Needs <br />
              <span className="text-[#2D3094]">to Stand Out.</span>
            </h2>
            <p className="text-base text-slate-600 mt-3 font-normal leading-relaxed">
              We eliminate the friction of working with fragmented suppliers. From high-volume commercial offset printing and architectural office branding to luxury VIP gifts and supplies, all under one roof in Uganda.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('services')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D3094] hover:text-[#ED008C] transition-colors py-2 border-b-2 border-[#2D3094] hover:border-[#ED008C]"
            >
              <span>View Detailed Capabilities</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* 7 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, idx) => (
            <div
              key={service.id}
              className="bg-[#F7F8FA] rounded-3xl overflow-hidden border border-slate-200 hover:border-[#2D3094]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group text-left"
            >
              <div>
                {/* Image Banner with Badge */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Number Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-heading font-black text-[#2D3094] shadow-md">
                    {service.number}
                  </div>

                  {/* Turnaround Badge */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1.5 border border-white/20">
                    <Clock size={12} className="text-[#ED008C]" />
                    <span>{service.turnaroundTime}</span>
                  </div>

                  {/* Icon and Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2E3192] to-[#ED008C] flex items-center justify-center shrink-0 shadow-lg">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <div>
                      <h3 className="font-heading font-black text-xl text-white leading-tight">
                        {service.title}
                      </h3>
                      <div className="text-[11px] text-slate-300 font-medium">
                        {service.subtitle}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6">
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Popular Products Checklist */}
                  <div className="space-y-1.5 mb-6">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Key Deliverables & Products:
                    </div>
                    {service.popularProducts.slice(0, 4).map((prod, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 size={14} className="text-[#ED008C] shrink-0" />
                        <span className="truncate">{prod}</span>
                      </div>
                    ))}
                    {service.popularProducts.length > 4 && (
                      <div className="text-[11px] font-bold text-[#2D3094] pt-1">
                        + {service.popularProducts.length - 4} more products & options
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Actions Footer */}
              <div className="px-6 pb-6 pt-2 border-t border-slate-200/80 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Starting From:
                  </div>
                  <div className="text-sm font-heading font-black text-[#2D3094]">
                    {currency === 'UGX' 
                      ? `UGX ${service.startingPriceUGX.toLocaleString()}` 
                      : `$${service.startingPriceUSD}`
                    }
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      if (onSelectService) {
                        onSelectService(service);
                      } else {
                        navigate('services', service.id);
                      }
                    }}
                    className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-[#2D3094] hover:border-[#2D3094] transition-all hover:scale-105"
                    title="Explore Full Service Details"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <button 
                    onClick={() => navigate('quote')}
                    className="bg-[#2D3094] hover:bg-[#2E3192] text-white text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-full transition-all hover:scale-105 shadow-md shadow-[#2D3094]/20"
                  >
                    Get Quote
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Comprehensive CTA */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-[#F0F2FA] to-[#FAF0F6] border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div>
            <h4 className="font-heading font-black text-xl text-[#121212] mb-1">
              Need a custom multi-service corporate procurement package?
            </h4>
            <p className="text-xs text-slate-600">
              We construct custom corporate SLAs with dedicated account managers, priority pre-press queues, and 30-day invoice terms.
            </p>
          </div>
          <button 
            onClick={() => navigate('contact')}
            className="bg-[#ED008C] hover:bg-[#d4007d] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full transition-all shadow-lg shrink-0"
          >
            Talk to Corporate Sales
          </button>
        </div>

      </div>
    </section>
  );
};
