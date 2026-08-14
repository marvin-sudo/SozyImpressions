import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Building, 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Quote
} from 'lucide-react';
import { PortfolioProject } from '../types';

interface CaseStudyModalProps {
  project: PortfolioProject | null;
  isOpen?: boolean;
  onClose: () => void;
  onNavigateToQuote?: () => void;
  navigate?: (view: any, param?: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  isOpen = true,
  onClose,
  onNavigateToQuote,
  navigate
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  React.useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  if (!isOpen || !project) return null;

  const handleQuoteClick = () => {
    onClose();
    if (onNavigateToQuote) {
      onNavigateToQuote();
    } else if (navigate) {
      navigate('quote');
    }
  };
  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 relative text-left my-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest bg-[#2D3094]/10 text-[#2D3094] px-2.5 py-1 rounded-full">
              Case Study & Execution
            </span>
            <span className="text-xs text-slate-400">• {project.category}</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8">
          
          {/* Title & Metadata */}
          <div className="mb-6">
            <h2 className="font-heading font-black text-2xl md:text-3xl text-[#121212] leading-tight mb-3">
              {project.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5 text-slate-800 font-bold">
                <Building size={14} className="text-[#2D3094]" />
                Client: {project.client}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-[#ED008C]" />
                Completed: {project.year}
              </span>
              <span>•</span>
              <span className="bg-slate-100 px-2.5 py-0.5 rounded-full font-bold text-slate-700">
                {project.category}
              </span>
            </div>
          </div>

          {/* Gallery Slider */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 mb-8 border border-slate-200">
            <img 
              src={gallery[activeImageIndex]} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
            {gallery.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                  {gallery.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        activeImageIndex === idx ? 'bg-[#ED008C] w-4' : 'bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Structured Strategic Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-xs leading-relaxed">
            
            {/* The Challenge */}
            <div className="bg-[#F7F8FA] p-5 rounded-2xl border border-slate-200">
              <h4 className="font-heading font-black text-sm text-[#2D3094] mb-2 uppercase tracking-wider">
                01. The Challenge
              </h4>
              <p className="text-slate-600">
                {project.challenge || project.description}
              </p>
            </div>

            {/* The Strategic Solution */}
            <div className="bg-[#F7F8FA] p-5 rounded-2xl border border-slate-200">
              <h4 className="font-heading font-black text-sm text-[#2D3094] mb-2 uppercase tracking-wider">
                02. Our Strategic Solution
              </h4>
              <p className="text-slate-600">
                {project.solution || 'Engineered custom visual identity, precision pre-press proofs, and multi-channel physical collateral fabrication.'}
              </p>
            </div>

          </div>

          {/* Results & Key Metrics */}
          {project.results && project.results.length > 0 && (
            <div className="mb-8 bg-[#2D3094]/5 border border-[#2D3094]/20 p-6 rounded-2xl">
              <h4 className="font-heading font-black text-sm text-[#2D3094] mb-3 uppercase tracking-wider flex items-center gap-2">
                <Sparkles size={16} className="text-[#ED008C]" />
                <span>Measurable Outcomes & Business Impact</span>
              </h4>
              <div className="space-y-2">
                {project.results.map((res, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 font-medium">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Client Testimonial if Available */}
          {project.testimonial && (
            <div className="mb-8 p-6 bg-gradient-to-r from-slate-900 to-[#181B30] text-white rounded-2xl relative overflow-hidden">
              <Quote size={40} className="text-white/10 absolute top-4 right-4" />
              <p className="text-xs md:text-sm italic text-slate-200 mb-3 relative z-10">
                "{project.testimonial.quote}"
              </p>
              <div className="text-xs font-bold text-[#ED008C]">
                {project.testimonial.author}
              </div>
              <div className="text-[10px] text-slate-400">
                {project.testimonial.role}
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-slate-800">Want similar results for your company?</div>
              <div className="text-[11px] text-slate-500">We provide free architectural mockups and physical sample proofs.</div>
            </div>
            <button
              onClick={handleQuoteClick}
              className="bg-[#ED008C] hover:bg-[#d4007d] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-lg transition-all hover:scale-105 flex items-center gap-2"
            >
              <span>Request Quote for Similar Project</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
