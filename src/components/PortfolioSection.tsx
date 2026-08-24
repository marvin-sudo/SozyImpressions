import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  Building, 
  ChevronRight
} from 'lucide-react';
import { View, PortfolioProject } from '../types';
import { PORTFOLIO_PROJECTS } from '../data/mockData';
import { CaseStudyModal } from './CaseStudyModal';
import { EASE_PREMIUM, VIEWPORT_CONFIG } from '../utils/animations';

interface PortfolioSectionProps {
  navigate: (view: View, param?: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ navigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCaseStudy, setActiveCaseStudy] = useState<PortfolioProject | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const categories = ['All', 'Corporate Branding', 'Event Branding', 'Customised Gifts'];

  const filteredProjects = selectedCategory === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <section className="py-20 px-4 md:px-8 bg-white border-b border-slate-100 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2D3094]/10 text-[#2D3094] text-xs font-black uppercase tracking-wider mb-3">
              <Sparkles size={14} className="text-[#ED008C]" />
              <span>Proven Enterprise Track Record</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-[#121212] tracking-tight leading-tight">
              Work That Speaks <br />
              <span className="text-[#2D3094]">for Itself.</span>
            </h2>
            <p className="text-base text-slate-600 mt-3 font-normal leading-relaxed">
              Explore our recent commercial offset print runs, experiential event stages, corporate fleet transformations, and luxury executive merchandise across Uganda and East Africa.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('portfolio')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D3094] hover:text-[#ED008C] transition-colors py-2 border-b-2 border-[#2D3094] hover:border-[#ED008C]"
            >
              <span>View Full Case Study Archive</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE_PREMIUM }}
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 select-none"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[#2D3094] text-white shadow-md shadow-[#2D3094]/20 scale-105'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_CONFIG}
                transition={{ 
                  duration: 0.75, 
                  delay: (idx % 2) * 0.12, 
                  ease: EASE_PREMIUM 
                }}
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                onClick={() => setActiveCaseStudy(project)}
                className="bg-[#F7F8FA] rounded-3xl overflow-hidden border border-slate-200 hover:border-[#2D3094]/50 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group text-left flex flex-col justify-between"
              >
                {/* Main Image Banner */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-heading font-black text-[#2D3094] shadow-md uppercase tracking-wider">
                    {project.category}
                  </div>

                  {/* Client Label */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1.5 border border-white/20">
                    <Building size={12} className="text-[#ED008C]" />
                    <span>{project.client}</span>
                  </div>

                  {/* Bottom Overlay Details */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-bold text-[#ED008C] uppercase tracking-wider block mb-1">
                      Featured Execution ({project.year})
                    </span>
                    <h3 className="font-heading font-black text-xl md:text-2xl text-white leading-snug group-hover:text-[#ED008C] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Card Meta & Bottom CTA */}
                <div className="p-6">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <span className="text-xs font-bold text-[#2D3094] group-hover:text-[#ED008C] transition-colors flex items-center gap-1">
                      <span>Read Full Case Study & Results</span>
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>

                    <span className="text-[10px] font-bold text-slate-400 bg-white px-2.5 py-1 rounded-full border border-slate-200">
                      Verified Execution
                    </span>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Interactive Bottom Banner with Scroll Reveal */}
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-[#2D3094] to-[#1a1b55] text-white flex flex-col md:flex-row items-center justify-between gap-6 text-left shadow-xl"
        >
          <div>
            <h4 className="font-heading font-black text-xl md:text-2xl mb-1">
              Have an upcoming launch, conference, or rebrand?
            </h4>
            <p className="text-xs text-slate-300">
              Our pre-press engineers and creative team can provide custom 3D mockups within 24 hours.
            </p>
          </div>
          <button
            onClick={() => navigate('quote')}
            className="bg-[#ED008C] hover:bg-[#d4007d] text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg transition-all hover:-translate-y-0.5 shrink-0"
          >
            Start Your Project
          </button>
        </motion.div>

      </div>

      {/* Case Study Modal */}
      {activeCaseStudy && (
        <CaseStudyModal
          project={activeCaseStudy}
          isOpen={!!activeCaseStudy}
          onClose={() => setActiveCaseStudy(null)}
          onNavigateToQuote={() => navigate('quote')}
        />
      )}
    </section>
  );
};

