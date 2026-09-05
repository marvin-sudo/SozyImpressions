import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/mockData';
import { EASE_PREMIUM, VIEWPORT_CONFIG } from '../utils/animations';

export const TestimonialsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 px-4 md:px-8 bg-[#F7F8FA] border-b border-slate-200/80 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2D3094]/10 text-[#2D3094] text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles size={14} className="text-[#ED008C]" />
            <span>Verified Corporate Endorsements</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-[#121212] tracking-tight leading-tight">
            Trusted by Corporate Leaders <br />
            <span className="text-[#2D3094]">Across Uganda.</span>
          </h2>
          <p className="text-base text-slate-600 mt-3 font-normal leading-relaxed">
            Read authentic feedback from C-level executives, brand directors, and procurement officers who depend on Sozy Impressions for their critical branding and printing campaigns.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ 
                duration: 0.75, 
                delay: (idx % 2) * 0.15, 
                ease: EASE_PREMIUM 
              }}
              whileHover={shouldReduceMotion ? undefined : { y: -4 }}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left relative group"
            >
              <div>
                {/* Top Rating & Project Type */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                    <span>{item.rating}.0 / 5.0 Rating</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D3094] bg-[#2D3094]/10 px-2.5 py-1 rounded-full">
                    {item.projectType}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Profile */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                <img 
                  src={item.photo} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#ED008C]"
                />
                <div>
                  <div className="font-heading font-black text-sm text-slate-900 leading-tight">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {item.position}, <strong className="text-slate-800">{item.company}</strong>
                  </div>
                </div>
                {item.verified && (
                  <div className="ml-auto flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
                    <CheckCircle2 size={12} />
                    <span>Verified</span>
                  </div>
                )}
              </div>

            </motion.div>
          ))}
        </div>

        {/* Trust Badges Footer */}
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE_PREMIUM }}
          className="mt-14 p-6 rounded-2xl bg-white border border-slate-200 max-w-2xl mx-auto flex items-center justify-around text-center shadow-sm"
        >
          <div>
            <div className="font-heading font-black text-2xl text-[#2D3094]">100%</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase">On-Time Delivery SLA</div>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div>
            <div className="font-heading font-black text-2xl text-[#ED008C]">4.9 / 5.0</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase">Average Client Rating</div>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div>
            <div className="font-heading font-black text-2xl text-emerald-600">250+</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase">Retained Corporates</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

