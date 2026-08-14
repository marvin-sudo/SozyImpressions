import React from 'react';
import { 
  FileText, 
  Calculator, 
  Sparkles, 
  Printer, 
  Truck, 
  ArrowRight 
} from 'lucide-react';
import { View } from '../types';

interface ProcessSectionProps {
  navigate: (view: View, param?: string) => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ navigate }) => {
  const steps = [
    {
      number: '01',
      title: 'Tell Us What You Need',
      subtitle: 'Upload files or specs',
      description: 'Submit your requirements via our smart online calculator, WhatsApp, or email. Upload your logo or artwork in vector or high-res format.',
      icon: <FileText className="w-5 h-5 text-white" />
    },
    {
      number: '02',
      title: 'Get an Instant Quote',
      subtitle: 'Transparent corporate rates',
      description: 'Receive an itemized commercial proposal with tiered volume discounts and estimated production timelines within minutes.',
      icon: <Calculator className="w-5 h-5 text-white" />
    },
    {
      number: '03',
      title: 'Approve 3D Digital Proof',
      subtitle: 'Free pre-press verification',
      description: 'Our senior pre-press team produces a digital 3D mockup or physical sample proof to ensure zero color, sizing, or spelling errors.',
      icon: <Sparkles className="w-5 h-5 text-white" />
    },
    {
      number: '04',
      title: 'Precision Production',
      subtitle: 'Heidelberg & UV presses',
      description: 'Your job is routed to our German offset presses, CNC engraving lasers, or embroidery lines under strict multi-point quality control.',
      icon: <Printer className="w-5 h-5 text-white" />
    },
    {
      number: '05',
      title: 'Nationwide Delivery',
      subtitle: 'Doorstep dispatch across Uganda',
      description: 'Your orders are packaged in protective cartons and delivered directly to your Kampala office or dispatched to upcountry districts.',
      icon: <Truck className="w-5 h-5 text-white" />
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-white border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2D3094]/10 text-[#2D3094] text-xs font-black uppercase tracking-wider mb-3">
            <span>Seamless Workflow</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-[#121212] tracking-tight leading-tight">
            How We Deliver Excellence, <br />
            <span className="text-[#2D3094]">Every Single Time.</span>
          </h2>
          <p className="text-base text-slate-600 mt-3 font-normal leading-relaxed">
            From initial concept to doorstep delivery, our 5-step quality-assured protocol eliminates errors and guarantees on-time handover.
          </p>
        </div>

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="bg-[#F7F8FA] rounded-3xl p-6 border border-slate-200 hover:border-[#2D3094]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left group relative"
            >
              <div>
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-heading font-black text-2xl text-[#2D3094]/30 group-hover:text-[#ED008C] transition-colors">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2E3192] to-[#ED008C] flex items-center justify-center shadow-md">
                    {step.icon}
                  </div>
                </div>

                <h3 className="font-heading font-black text-base text-slate-900 leading-snug mb-1">
                  {step.title}
                </h3>
                <div className="text-[10px] font-bold text-[#ED008C] uppercase tracking-wider mb-3">
                  {step.subtitle}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Bottom Progress Indicator */}
              <div className="mt-6 pt-4 border-t border-slate-200 text-[10px] font-bold text-slate-400">
                Step {idx + 1} of 5
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="mt-14 text-center">
          <button
            onClick={() => navigate('quote')}
            className="bg-[#ED008C] hover:bg-[#d4007d] text-white font-heading font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg shadow-[#ED008C]/25 transition-all hover:scale-105 inline-flex items-center gap-2"
          >
            <span>Start Step 01: Request Instant Quote</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
};
