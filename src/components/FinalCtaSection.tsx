import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  ArrowRight, 
  MessageSquare, 
  Phone, 
  Sparkles, 
  ShieldCheck, 
  Truck,
  CheckCircle2
} from 'lucide-react';
import { View } from '../types';
import { COMPANY_INFO } from '../data/mockData';
import { EASE_PREMIUM, VIEWPORT_CONFIG } from '../utils/animations';

interface FinalCtaSectionProps {
  navigate: (view: View, param?: string) => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ navigate }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-[#0F1224] via-[#121528] to-[#1E1128] text-white relative overflow-hidden font-sans">
      
      {/* Background Lighting Blooms */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#2E3192]/25 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#ED008C]/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        
        {/* Tagline Pill */}
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-wider mb-6 backdrop-blur-md"
        >
          <Sparkles size={14} className="text-[#ED008C]" />
          <span>Start Your Transformation Today</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h2 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.8, delay: 0.08, ease: EASE_PREMIUM }}
          className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.1] mb-6 text-white max-w-4xl mx-auto"
        >
          We Build Brands That Stand Out. <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2E3192] via-[#6C63FF] to-[#ED008C]">
            Ready to Elevate Yours?
          </span>
        </motion.h2>

        {/* Supporting Copy */}
        <motion.p 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.8, delay: 0.16, ease: EASE_PREMIUM }}
          className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Join hundreds of leading Ugandan businesses, schools, NGOs, and corporations who trust Sozy Impressions for impeccable offset printing, architectural branding, and luxury merchandise.
        </motion.p>

        {/* Action CTAs */}
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.8, delay: 0.24, ease: EASE_PREMIUM }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          {/* Primary CTA: Get a Quote */}
          <button
            onClick={() => navigate('quote')}
            className="bg-[#ED008C] hover:bg-[#d4007d] text-white font-heading font-bold text-xs uppercase tracking-wider px-9 py-5 rounded-full shadow-2xl shadow-[#ED008C]/40 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 group"
          >
            <span>Get a Project Quote</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* WhatsApp CTA */}
          <a
            href={COMPANY_INFO.whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs uppercase tracking-wider px-8 py-5 rounded-full shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
          >
            <MessageSquare size={16} />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Call Team CTA */}
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="border-2 border-white/30 hover:border-white text-white hover:bg-white/10 font-heading font-bold text-xs uppercase tracking-wider px-8 py-5 rounded-full transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
          >
            <Phone size={16} className="text-[#ED008C]" />
            <span>Call Kampala Studio</span>
          </a>
        </motion.div>

        {/* Value Reassurance Strip */}
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.8, delay: 0.32, ease: EASE_PREMIUM }}
          className="pt-8 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-xs text-slate-300 font-medium"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>Free 3D Mockup Proofs</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#ED008C]" />
            <span>Heidelberg Offset Quality</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck size={16} className="text-sky-400" />
            <span>Nationwide Uganda Delivery</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

