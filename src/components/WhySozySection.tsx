import React from 'react';
import { 
  Award, 
  Zap, 
  Sparkles, 
  ShieldCheck, 
  DollarSign, 
  Layers, 
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { View } from '../types';

interface WhySozySectionProps {
  navigate: (view: View, param?: string) => void;
}

export const WhySozySection: React.FC<WhySozySectionProps> = ({ navigate }) => {
  const pillars = [
    {
      icon: <Award className="w-6 h-6 text-[#ED008C]" />,
      title: '1. Premium German Quality',
      subtitle: 'Heidelberg Offset & Precision UV',
      description: 'We don’t cut corners. Advanced multi-color Heidelberg presses, Pantone PMS accuracy, and food-grade stainless materials ensure your brand exudes unmatched prestige.'
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: '2. Lightning-Fast Turnarounds',
      subtitle: 'Same-Day & 24h Rush Options',
      description: 'Tight event or conference deadline? Our agile digital printing and in-house merchandise workshops deliver express orders on time, every single time.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#2D3094]" />,
      title: '3. Senior Creative Expertise',
      subtitle: 'Pre-Press Engineers & Strategists',
      description: 'More than a printer—our senior designers refine your typography, prep vector separations, and generate 3D digital proofs before ink touches paper.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: '4. Reliable Corporate SLAs',
      subtitle: 'Zero-Defect Quality Guarantee',
      description: 'Transparent communication, dedicated account executives, and corporate invoice terms (LPO) with standard credit options for registered enterprises.'
    },
    {
      icon: <DollarSign className="w-6 h-6 text-sky-500" />,
      title: '5. Direct Factory Pricing',
      subtitle: 'Volume Tiered Bulk Discounts',
      description: 'By manufacturing and printing in-house, we eliminate broker markups and pass significant wholesale savings directly onto your organization.'
    },
    {
      icon: <Layers className="w-6 h-6 text-purple-500" />,
      title: '6. All-in-One Integration',
      subtitle: 'Print, Brand, Gifts & Supplies',
      description: 'Eliminate the headache of managing 5 different vendors. We handle everything from reception signage and vehicle wraps to office paper and VIP hampers.'
    },
    {
      icon: <MapPin className="w-6 h-6 text-red-500" />,
      title: '7. Nationwide Uganda Logistics',
      subtitle: 'Doorstep Delivery Everywhere',
      description: 'Fast Kampala CBD & Greater Kampala courier distribution, plus trusted scheduled regional logistics to Jinja, Mbarara, Gulu, Mbale, and upcountry.'
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-white border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2D3094]/10 text-[#2D3094] text-xs font-black uppercase tracking-wider mb-3">
            <ShieldCheck size={14} className="text-[#ED008C]" />
            <span>The Sozy Advantage</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-[#121212] tracking-tight leading-tight">
            Why Leading Businesses <br />
            <span className="text-[#2D3094]">Trust Sozy Impressions.</span>
          </h2>
          <p className="text-base text-slate-600 mt-3 font-normal leading-relaxed">
            In a market filled with unreliable print brokers, we combine state-of-the-art manufacturing infrastructure with strict corporate governance.
          </p>
        </div>

        {/* 7 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div 
              key={idx}
              className={`bg-[#F7F8FA] p-8 rounded-3xl border border-slate-200 hover:border-[#2D3094]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left group ${
                idx === 6 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <h3 className="font-heading font-black text-lg text-slate-900 leading-tight mb-1">
                  {pillar.title}
                </h3>
                <div className="text-[11px] font-bold text-[#ED008C] uppercase tracking-wider mb-3">
                  {pillar.subtitle}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center gap-1.5 text-[11px] font-bold text-[#2D3094]">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>Verified Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Action */}
        <div className="mt-14 text-center">
          <button
            onClick={() => navigate('about')}
            className="text-xs font-bold uppercase tracking-wider text-[#2D3094] hover:text-[#ED008C] transition-colors py-2 border-b-2 border-[#2D3094] hover:border-[#ED008C]"
          >
            Learn More About Our Company & Quality Standards →
          </button>
        </div>

      </div>
    </section>
  );
};
