import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  Building, 
  Truck, 
  Layers, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck
} from 'lucide-react';
import { View } from '../types';
import { EASE_PREMIUM, VIEWPORT_CONFIG } from '../utils/animations';

interface FeaturedCorporateBrandingProps {
  navigate: (view: View, param?: string) => void;
}

export const FeaturedCorporateBranding: React.FC<FeaturedCorporateBrandingProps> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState<'office' | 'fleet' | 'murals' | 'stationery'>('office');
  const shouldReduceMotion = useReducedMotion();

  const brandingAreas = {
    office: {
      title: '3D Reception Signage & Architectural Frosted Glass',
      subtitle: 'Make your physical workplace radiate corporate authority the moment visitors enter.',
      image: 'https://www.image2url.com/r2/default/images/1787602576366-b2c6de93-70bd-4614-b866-d971b97cfa34.jpg',
      bullets: [
        'Precision Laser-Cut 3D Acrylic & Brushed Brass Lettering',
        'Energy-Efficient Warm & Cool Backlit LED Halo Signs',
        'Acoustic Glass Privacy Frosted Vinyl with Custom Geometric Watermarks',
        'Directional Wayfinding Totems and Boardroom Identifiers'
      ],
      turnaround: '3 - 5 Business Days',
      cta: 'Request Office Branding Survey'
    },
    fleet: {
      title: 'Commercial Fleet Vehicle Branding & Wrapping',
      subtitle: 'Turn your delivery vans, trucks, and executive SUVs into high-ROI moving billboards across East Africa.',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=1200',
      bullets: [
        '5-Year Cast Vinyl with Anti-UV and Anti-Scratch Overlaminate',
        'Full, Half, and Decal Fleet Installations with Zero Paint Damage',
        'High-Resolution 1440 DPI Photographic Quality Reproduction',
        'Nationwide Fleet Installation Crew Onsite at Your Logistics Yard'
      ],
      turnaround: '2 - 4 Days per Vehicle',
      cta: 'Brand Your Fleet Today'
    },
    murals: {
      title: 'Corporate Wall Murals & Culture Graphics',
      subtitle: 'Inspire your team and visitors with monumental core values and company timeline walls.',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200',
      bullets: [
        'Seamless Non-Glare Matte Fabric & Heavy Wallcoverings',
        'Custom Infographic Timeline & Milestone Wall Displays',
        'High-Tack Vinyl Engineered for Commercial Drywall & Glass',
        'Turnkey Site Inspection & Exact Wall Dimensioning'
      ],
      turnaround: '2 - 4 Business Days',
      cta: 'Get Wall Graphic Quote'
    },
    stationery: {
      title: 'Executive Corporate Stationery & Identity Suites',
      subtitle: 'Impeccable tactile touchpoints for legal briefs, board presentations, and contracts.',
      image: 'https://www.image2url.com/r2/default/images/1787246355569-bd7ea187-358d-4f41-88d0-574e2fe335c7.jpg',
      bullets: [
        '450gsm Velvet Soft-Touch Business Cards with Raised Gold/Silver Foil',
        'Official Watermarked Letterheads & Continuation Sheets',
        'Heavyweight Presentation Pocket Folders with Die-Cut Card Slots',
        'Custom Corporate Envelopes (DL, C5, C4) with Peel & Seal'
      ],
      turnaround: '2 - 3 Business Days',
      cta: 'Order Corporate Stationery'
    }
  };

  const current = brandingAreas[activeTab];

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-[#0E1020] via-[#13162C] to-[#0E1020] text-white border-b border-white/10 font-sans relative overflow-hidden">
      
      {/* Subtle Glow Accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#2E3192]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#ED008C]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#ED008C] text-xs font-black uppercase tracking-wider mb-3">
            <span>Transform Physical Spaces</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-white tracking-tight leading-tight">
            Turn Every Touchpoint Into <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2E3192] via-[#6C63FF] to-[#ED008C]">
              a Brand Experience.
            </span>
          </h2>
          <p className="text-sm md:text-base text-slate-300 mt-3 font-light leading-relaxed">
            First impressions are physical. When clients visit your headquarters or see your fleet in traffic, your branding should signal institutional permanence, prestige, and market leadership.
          </p>
        </motion.div>

        {/* Interactive Tab Switcher */}
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.75, delay: 0.1, ease: EASE_PREMIUM }}
          className="flex items-center justify-center gap-2 md:gap-3 flex-wrap mb-10"
        >
          <button
            onClick={() => setActiveTab('office')}
            className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeTab === 'office'
                ? 'bg-[#ED008C] text-white shadow-lg shadow-[#ED008C]/30 scale-105'
                : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <Building size={16} />
            <span>Office & Reception</span>
          </button>

          <button
            onClick={() => setActiveTab('fleet')}
            className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeTab === 'fleet'
                ? 'bg-[#ED008C] text-white shadow-lg shadow-[#ED008C]/30 scale-105'
                : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <Truck size={16} />
            <span>Fleet Wraps</span>
          </button>

          <button
            onClick={() => setActiveTab('murals')}
            className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeTab === 'murals'
                ? 'bg-[#ED008C] text-white shadow-lg shadow-[#ED008C]/30 scale-105'
                : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <Layers size={16} />
            <span>Wall Murals</span>
          </button>

          <button
            onClick={() => setActiveTab('stationery')}
            className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeTab === 'stationery'
                ? 'bg-[#ED008C] text-white shadow-lg shadow-[#ED008C]/30 scale-105'
                : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <FileText size={16} />
            <span>Executive Stationery</span>
          </button>
        </motion.div>

        {/* Feature Display Box with Scroll Reveal */}
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.85, delay: 0.2, ease: EASE_PREMIUM }}
          className="bg-[#181B34] border border-white/15 rounded-3xl overflow-hidden shadow-2xl p-6 md:p-10"
        >
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: EASE_PREMIUM }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              
              {/* Left Info Column (lg:col-span-6) */}
              <div className="lg:col-span-6 text-left flex flex-col items-start">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#ED008C] bg-[#ED008C]/10 px-3 py-1 rounded-full mb-3">
                  Turnkey Engineering & Pre-Press
                </span>
                <h3 className="text-2xl md:text-3xl font-heading font-black text-white mb-3 leading-tight">
                  {current.title}
                </h3>
                <p className="text-sm text-slate-300 mb-6 font-light leading-relaxed">
                  {current.subtitle}
                </p>

                {/* Bullet Points */}
                <div className="space-y-3 mb-8 w-full">
                  {current.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs md:text-sm text-slate-200">
                      <CheckCircle2 size={16} className="text-[#ED008C] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                  <button
                    onClick={() => navigate('quote')}
                    className="bg-[#ED008C] hover:bg-[#d4007d] text-white text-xs font-bold uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-[#ED008C]/25 flex items-center gap-2 hover:-translate-y-0.5"
                  >
                    <span>{current.cta}</span>
                    <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={() => navigate('portfolio')}
                    className="border border-white/20 hover:border-white text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full transition-all hover:bg-white/10 hover:-translate-y-0.5"
                  >
                    View Case Studies
                  </button>
                </div>

              </div>

              {/* Right Visual Column (lg:col-span-6) */}
              <div className="lg:col-span-6">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/20 shadow-2xl group bg-slate-900">
                  <img 
                    src={current.image} 
                    alt={current.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                    <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 flex items-center gap-2">
                      <ShieldCheck size={16} className="text-emerald-400" />
                      <span className="text-xs font-bold text-white">Full Onsite Installation by Certified Crew</span>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

