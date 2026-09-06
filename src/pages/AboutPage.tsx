import React from 'react';
import { 
  Target, 
  Eye, 
  MapPin
} from 'lucide-react';
import { View } from '../types';
import { FaqSection } from '../components/FaqSection';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollReveal';

interface AboutPageProps {
  navigate: (view: View, param?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen py-12 px-4 md:px-8 font-sans text-left">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Page Hero Banner */}
        <ScrollReveal yOffset={30} duration={0.8}>
          <div className="bg-[#181B34] text-white rounded-3xl p-8 md:p-14 relative overflow-hidden shadow-2xl border border-white/10">
            <div className="max-w-3xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-black uppercase tracking-wider mb-4 backdrop-blur-md">
                <span>The Sozy Impressions Story</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-heading font-black tracking-tight leading-tight mb-4">
                We Build Brands <br />
                <span className="text-[#ED008C]">That Stand Out.</span>
              </h1>
              <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed">
                Established in Kampala, Uganda, Sozy Impressions Ltd has grown from an agile graphic design boutique into one of East Africa’s most trusted commercial offset printing and architectural branding powerhouses.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Mission & Vision Cards */}
        <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StaggerItem>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md h-full">
              <div className="w-12 h-12 rounded-2xl bg-[#2D3094]/10 text-[#2D3094] flex items-center justify-center mb-4">
                <Target size={24} />
              </div>
              <h3 className="font-heading font-black text-xl text-slate-900 mb-2">Our Mission</h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                To empower businesses and organizations with high-quality printing, innovative corporate merchandise, creative branding, and seamless digital procurement—delivered with speed, precision, reliability, and exceptional customer service.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md h-full">
              <div className="w-12 h-12 rounded-2xl bg-[#ED008C]/10 text-[#ED008C] flex items-center justify-center mb-4">
                <Eye size={24} />
              </div>
              <h3 className="font-heading font-black text-xl text-slate-900 mb-2">Our Vision</h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                To be the foremost benchmark in print craftsmanship, innovative corporate merchandise, and seamless digital procurement—combining cutting-edge technology, uncompromising quality, and speed to deliver exceptional solutions on time
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Manufacturing Facility & Equipment */}
        <ScrollReveal yOffset={35}>
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl">
            <div className="max-w-3xl mb-8">
              <div className="text-[10px] font-black uppercase tracking-widest text-[#2D3094] mb-2">
                Engineering & Production Infrastructure
              </div>
              <h2 className="font-heading font-black text-2xl md:text-3xl text-slate-900">
                State-of-the-Art In-House Technology
              </h2>
              <p className="text-xs md:text-sm text-slate-600 mt-2">
                Unlike middle-tier brokers who outsource jobs across multiple shops, we run dedicated in-house presses ensuring strict color accuracy, confidential data handling, and rapid turnarounds.
              </p>
            </div>

            <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
              <StaggerItem>
                <div className="bg-[#F7F8FA] p-5 rounded-2xl border border-slate-200 h-full">
                  <div className="font-heading font-bold text-slate-900 mb-1">Heidelberg Offset Presses</div>
                  <p className="text-slate-500">German engineered 5-color offset presses for high-volume brochures, magazines, and calendars.</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-[#F7F8FA] p-5 rounded-2xl border border-slate-200 h-full">
                  <div className="font-heading font-bold text-slate-900 mb-1">Roland TrueVIS Wide-Format</div>
                  <p className="text-slate-500">UV roll-to-roll and flatbed printers for vibrant vehicle wraps, roll-up banners, and architectural vinyl.</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-[#F7F8FA] p-5 rounded-2xl border border-slate-200 h-full">
                  <div className="font-heading font-bold text-slate-900 mb-1">Fiber Laser CNC Engravers</div>
                  <p className="text-slate-500">Micron-precision permanent laser etching for stainless steel flasks, metal pens, and executive plaques.</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-[#F7F8FA] p-5 rounded-2xl border border-slate-200 h-full">
                  <div className="font-heading font-bold text-slate-900 mb-1">Automated Embroidery Lines</div>
                  <p className="text-slate-500">Multi-head Tajima embroidery for corporate polo shirts, formal staff uniforms, and branded caps.</p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </ScrollReveal>

        {/* Frequently Asked Questions */}
        <ScrollReveal yOffset={30}>
          <div className="bg-white rounded-3xl p-6 md:p-12 border border-slate-200 shadow-xl">
            <FaqSection className="py-4 px-0 bg-transparent border-0" />
          </div>
        </ScrollReveal>

        {/* Visit Our Showroom CTA */}
        <ScrollReveal yOffset={25}>
          <div className="bg-gradient-to-r from-[#2D3094] to-[#181B34] text-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#ED008C] uppercase tracking-wider mb-2">
                <MapPin size={16} />
                <span>Visit Our Kampala Showroom & Print Studio</span>
              </div>
              <h3 className="font-heading font-black text-xl md:text-2xl mb-1">
                Plot 42, Nkrumah Road, Kampala, Uganda
              </h3>
              <p className="text-xs text-slate-300">
                Drop in to touch paper samples, inspect 3D signage textures, and sample executive gift hampers in person.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('contact')}
                className="bg-[#ED008C] hover:bg-[#d4007d] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-lg transition-all hover:scale-105"
              >
                Get Directions & Book Visit
              </button>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};
