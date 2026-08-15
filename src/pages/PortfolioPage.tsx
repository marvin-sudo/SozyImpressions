import React, { useState } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { View, PortfolioProject } from '../types';
import { PORTFOLIO_PROJECTS } from '../data/mockData';
import { CaseStudyModal } from '../components/CaseStudyModal';

interface PortfolioPageProps {
  navigate: (view: View, param?: string) => void;
  onOpenCaseStudy?: (project: PortfolioProject) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ navigate, onOpenCaseStudy }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCaseStudy, setActiveCaseStudy] = useState<PortfolioProject | null>(null);

  const categories = ['All', 'Corporate Branding', 'Event Branding', 'Customised Gifts', 'Offset Printing'];

  const filteredProjects = selectedCategory === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen py-12 px-4 md:px-8 font-sans text-left">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Page Hero */}
        <div className="bg-[#181B34] text-white rounded-3xl p-8 md:p-14 relative overflow-hidden shadow-2xl border border-white/10">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-black uppercase tracking-wider mb-4 backdrop-blur-md">
              <Sparkles size={14} className="text-[#ED008C]" />
              <span>Execution Archive & Case Studies</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-black tracking-tight leading-tight mb-4">
              Featured Client Deployments & <br />
              <span className="text-[#ED008C]">Brand Case Studies.</span>
            </h1>
            <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed">
              Explore how we solved critical branding, large-scale conference staging, and executive packaging challenges for top tier organizations across East Africa.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 select-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#2D3094] text-white shadow-md shadow-[#2D3094]/20 scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                if (onOpenCaseStudy) {
                  onOpenCaseStudy(project);
                } else {
                  setActiveCaseStudy(project);
                }
              }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-[#2D3094]/50 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/11] overflow-hidden bg-slate-900">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-heading font-black text-[#2D3094] shadow-md uppercase">
                    {project.category}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] text-[#ED008C] font-bold block">{project.client}</span>
                    <h3 className="font-heading font-black text-lg leading-snug group-hover:text-[#ED008C] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-2">
                <span className="text-xs font-bold text-[#2D3094] group-hover:text-[#ED008C] transition-colors flex items-center justify-between">
                  <span>View Full Case Study & Proofs</span>
                  <ChevronRight size={16} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Project CTA */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center max-w-xl mx-auto shadow-sm">
          <h3 className="font-heading font-black text-xl text-slate-900 mb-2">
            Ready to execute your next big project?
          </h3>
          <p className="text-xs text-slate-600 mb-6">
            Get in touch with our Kampala creative and offset engineering teams.
          </p>
          <button
            onClick={() => navigate('quote')}
            className="bg-[#ED008C] hover:bg-[#d4007d] text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-md"
          >
            Request Project Quote
          </button>
        </div>

      </div>

      {activeCaseStudy && (
        <CaseStudyModal
          project={activeCaseStudy}
          isOpen={!!activeCaseStudy}
          onClose={() => setActiveCaseStudy(null)}
          onNavigateToQuote={() => navigate('quote')}
        />
      )}
    </div>
  );
};
