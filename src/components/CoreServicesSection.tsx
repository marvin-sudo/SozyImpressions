import React from 'react';
import { motion } from 'motion/react';
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
  currency?: Currency;
  onSelectService?: (service: ServiceItem) => void;
}

export const CoreServicesSection: React.FC<CoreServicesSectionProps> = ({ 
  navigate, 
  currency = 'UGX',
  onSelectService 
}) => {

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Printer': return <Printer className="w-5 h-5 text-[#2D3094]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#2D3094]" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-[#2D3094]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#2D3094]" />;
      case 'Gift': return <Gift className="w-5 h-5 text-[#2D3094]" />;
      case 'PackageCheck': return <PackageCheck className="w-5 h-5 text-[#2D3094]" />;
      case 'PenTool': return <PenTool className="w-5 h-5 text-[#2D3094]" />;
      default: return <Sparkles className="w-5 h-5 text-[#2D3094]" />;
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-slate-50/50 border-b border-slate-100 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header with Fade-in and Upward Movement */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 text-left"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2D3094]/10 text-[#2D3094] text-xs font-black uppercase tracking-wider mb-3">
              <Sparkles size={14} className="text-[#ED008C]" />
              <span>Full-Spectrum Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#121212] tracking-tight leading-tight">
              <span className="block">Everything Your Brand Needs</span>
              <span className="block text-[#2D3094]">to Stand Out.</span>
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
        </motion.div>

        {/* Horizontal Services List with Alternating Layout & Fade-in + Upward Animation */}
        <div className="flex flex-col gap-8">
          {SERVICES_DATA.map((service, index) => {
            const isReversed = index % 2 === 1; // 1st (index 0) is left, 2nd (index 1) is right, 3rd is left, etc.

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  duration: 0.6, 
                  delay: (index % 2) * 0.1, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className={`bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-[#2D3094]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col ${
                  isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } group text-left`}
              >
                {/* Separate Image Container */}
                <div className="lg:w-5/12 relative overflow-hidden bg-slate-900 min-h-[260px] lg:min-h-[340px]">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
                  
                  {/* Number Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-heading font-black text-[#2D3094] shadow-md border border-slate-100">
                    {service.number}
                  </div>

                  {/* Turnaround Badge */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white flex items-center gap-1.5 border border-white/20">
                    <Clock size={12} className="text-[#ED008C]" />
                    <span>{service.turnaroundTime}</span>
                  </div>
                </div>

                {/* Separate Content & Description Container */}
                <div className="lg:w-7/12 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    {/* Top Bar: Icon + Title + Subtitle */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#2D3094]/10 border border-[#2D3094]/20 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-[#2D3094] transition-colors">
                        <div className="group-hover:text-white transition-colors [&>svg]:group-hover:text-white">
                          {getServiceIcon(service.iconName)}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 leading-tight group-hover:text-[#2D3094] transition-colors">
                          {service.title}
                        </h3>
                        <div className="text-xs sm:text-sm font-semibold text-[#ED008C] mt-0.5">
                          {service.subtitle}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Popular Products & Key Deliverables (2-column layout) */}
                    <div className="mb-6 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-[#ED008C]" />
                        <span>Key Deliverables & Products:</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.popularProducts.slice(0, 6).map((prod, pIdx) => (
                          <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2D3094] shrink-0" />
                            <span className="truncate">{prod}</span>
                          </div>
                        ))}
                      </div>
                      {service.popularProducts.length > 6 && (
                        <div className="text-[11px] font-bold text-[#2D3094] pt-2 mt-2 border-t border-slate-200/60">
                          + {service.popularProducts.length - 6} more custom products & specs
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Actions Footer */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        Starting From:
                      </div>
                      <div className="text-lg sm:text-xl font-heading font-black text-[#2D3094]">
                        {currency === 'UGX' 
                          ? `UGX ${service.startingPriceUGX.toLocaleString()}` 
                          : `$${service.startingPriceUSD}`
                        }
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => {
                          if (onSelectService) {
                            onSelectService(service);
                          } else {
                            navigate('services', service.id);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#2D3094] px-4 py-2.5 rounded-full border border-slate-200 hover:border-[#2D3094] transition-all bg-white shadow-sm"
                        title="Explore Full Service Details"
                      >
                        <span>Explore Details</span>
                        <ChevronRight size={15} />
                      </button>
                      <button 
                        onClick={() => navigate('quote')}
                        className="bg-[#2D3094] hover:bg-[#202377] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-md shadow-[#2D3094]/20 hover:scale-105 active:scale-95"
                      >
                        Get Quote
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Comprehensive CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-[#F0F2FA] to-[#FAF0F6] border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-left"
        >
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
            className="bg-[#ED008C] hover:bg-[#d4007d] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full transition-all shadow-lg shrink-0 hover:scale-105 active:scale-95"
          >
            Talk to Corporate Sales
          </button>
        </motion.div>

      </div>
    </section>
  );
};
