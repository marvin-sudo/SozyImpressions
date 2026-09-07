import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { View } from '../types';
import { COMPANY_INFO } from '../data/mockData';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollReveal';

interface ContactPageProps {
  navigate: (view: View, param?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ navigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    serviceInterest: 'Offset Commercial Printing',
    projectScope: '',
    deadline: '',
    estimatedBudget: 'UGX 500k - 2M'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen py-12 px-4 md:px-8 font-sans text-left">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Page Hero Banner */}
        <ScrollReveal yOffset={30} duration={0.8}>
          <div className="bg-[#181B34] text-white rounded-3xl p-8 md:p-14 relative overflow-hidden shadow-2xl border border-white/10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#ED008C]/15 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="max-w-3xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-black uppercase tracking-wider mb-4 backdrop-blur-md">
                <span>Let’s Build Something Remarkable</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-heading font-black tracking-tight leading-tight mb-4">
                Get in Touch with Our <br />
                <span className="text-[#ED008C]">Kampala Production Studio.</span>
              </h1>
              <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed">
                Have an upcoming print run, branding overhaul, or VIP corporate gift project? Visit our facility on Nkrumah Road, request a quote, or chat directly with our executive production desk.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* 2-Column Grid: Contact Information & Direct Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards & Studio Info (lg:col-span-5) */}
          <ScrollReveal direction="left" duration={0.8} className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Box */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md space-y-6">
              <h3 className="font-heading font-black text-lg text-slate-900 border-b border-slate-100 pb-4">
                Direct Communication Channels
              </h3>

              {/* Staggered Channels */}
              <StaggerContainer staggerDelay={0.08} className="space-y-3">
                {/* WhatsApp Direct */}
                <StaggerItem>
                  <a
                    href={COMPANY_INFO.whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 hover:bg-emerald-100/70 transition-colors group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm p-2">
                      <WhatsAppIcon size={24} />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-xs text-emerald-950 uppercase tracking-wider mb-0.5">
                        WhatsApp Production Desk
                      </div>
                      <div className="text-xs text-emerald-800 font-medium mb-1">
                        {COMPANY_INFO.whatsapp}
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center gap-1 group-hover:underline">
                        Instant response during business hours <ExternalLink size={10} />
                      </span>
                    </div>
                  </a>
                </StaggerItem>

                {/* Phone Line */}
                <StaggerItem>
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#2D3094] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Phone size={20} />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-xs text-slate-900 uppercase tracking-wider mb-0.5">
                        General Inquiries & Orders
                      </div>
                      <div className="text-xs text-slate-700 font-bold mb-1">
                        {COMPANY_INFO.phone}
                      </div>
                      <span className="text-[10px] text-slate-500">
                        Mon - Sat (8:00 AM - 6:00 PM EAT)
                      </span>
                    </div>
                  </a>
                </StaggerItem>

                {/* Email Address */}
                <StaggerItem>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#ED008C] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-xs text-slate-900 uppercase tracking-wider mb-0.5">
                        Official Corporate Email
                      </div>
                      <div className="text-xs text-slate-700 font-bold mb-1">
                        {COMPANY_INFO.email}
                      </div>
                      <span className="text-[10px] text-slate-500">
                        Guaranteed reply within 2 working hours
                      </span>
                    </div>
                  </a>
                </StaggerItem>

                {/* Physical Location */}
                <StaggerItem>
                  <div className="p-4 rounded-2xl bg-[#2D3094]/5 border border-[#2D3094]/15">
                    <div className="flex items-start gap-3 mb-2">
                      <MapPin size={20} className="text-[#2D3094] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-heading font-bold text-xs text-slate-900 uppercase tracking-wider mb-0.5">
                          Main Studio & Plant Location
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {COMPANY_INFO.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 pt-2 border-t border-[#2D3094]/10">
                      <Clock size={12} className="text-[#ED008C]" />
                      <span>{COMPANY_INFO.workingHours}</span>
                    </div>
                  </div>
                </StaggerItem>
              </StaggerContainer>

            </div>

            {/* Corporate Procurement Notice */}
            <div className="bg-gradient-to-br from-[#181B34] to-[#2D3094] text-white p-6 rounded-3xl border border-white/10 shadow-md">
              <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#ED008C] mb-2">
                <ShieldCheck size={16} />
                <span>Corporate Vendor Registration</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                We are registered with URA (TIN provided on invoices) and PPDA compliant for institutional tenders, NGOs, and corporate procurement.
              </p>
              <button
                onClick={() => navigate('quote')}
                className="w-full bg-white text-[#181B34] hover:bg-slate-100 font-heading font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-sm hover:scale-[1.02]"
              >
                Launch RFQ Portal
              </button>
            </div>

          </ScrollReveal>

          {/* Right Column: Interactive Consultation & Message Form (lg:col-span-7) */}
          <ScrollReveal direction="right" duration={0.8} className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl">
              
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="font-heading font-black text-2xl text-slate-900">
                    Message Received Successfully!
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to Sozy Impressions Ltd. An executive account manager will review your project details and contact you within 2 hours.
                  </p>
                  <div className="pt-4 flex justify-center gap-4">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="bg-[#2D3094] hover:bg-[#1f2168] text-white font-heading font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all"
                    >
                      Send Another Message
                    </button>
                    <button
                      onClick={() => navigate('services')}
                      className="border border-slate-300 text-slate-700 hover:bg-slate-50 font-heading font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all"
                    >
                      Explore Our Services
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-heading font-black text-xl text-slate-900 mb-1">
                      Send a Message or Project Brief
                    </h3>
                    <p className="text-xs text-slate-500">
                      Fill in the details below and our team will get back to you with specs, timelines, and pricing.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Namatovu"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 outline-none focus:border-[#2D3094] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Stanbic Bank Uganda"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 outline-none focus:border-[#2D3094] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Official Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="s.namatovu@company.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 outline-none focus:border-[#2D3094] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Phone Number (WhatsApp Preferred) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+256 700 000 000"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 outline-none focus:border-[#2D3094] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Service Category
                      </label>
                      <select
                        value={formData.serviceInterest}
                        onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 outline-none focus:border-[#2D3094] focus:bg-white"
                      >
                        <option>Offset Commercial Printing</option>
                        <option>Digital Express Printing</option>
                        <option>Corporate Branding & Signage</option>
                        <option>Event Branding & Stage Solutions</option>
                        <option>Customised Gifts & Executive Merch</option>
                        <option>General Institutional Supplies</option>
                        <option>Graphics Design & Brand Strategy</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Target Deadline
                      </label>
                      <input
                        type="text"
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        placeholder="e.g. Next Friday / Urgent 48hrs"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 outline-none focus:border-[#2D3094] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Project Scope & Specifications *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.projectScope}
                      onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                      placeholder="Describe what you need printed or branded: quantities, sizes, paper weights, finishing (e.g. 500 copies of 24-page annual report with matte lamination and spot UV)..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 outline-none focus:border-[#2D3094] focus:bg-white resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#ED008C] hover:bg-[#d4007d] text-white font-heading font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-[#ED008C]/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span>Transmitting Brief...</span>
                      ) : (
                        <>
                          <span>Submit Inquiry to Production Team</span>
                          <Send size={15} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </ScrollReveal>

        </div>

      </div>
    </div>
  );
};
