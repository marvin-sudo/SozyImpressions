import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Lock,
  Instagram,
  Facebook,
  Youtube,
  Music2
} from 'lucide-react';
import { View } from '../types';
import { COMPANY_INFO, SERVICES_DATA, PAYMENT_LOGOS } from '../data/mockData';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  navigate: (view: View, param?: string) => void;
  openAdminModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate, openAdminModal }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#121212] text-white pt-16 pb-12 border-t border-white/10 font-sans relative overflow-hidden">
      {/* Subtle Glow Overlay */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2E3192]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#ED008C]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Top Newsletter & Call to Action Banner */}
        <div className="bg-gradient-to-r from-[#2E3192] via-[#2D3094] to-[#1a1b55] rounded-3xl p-8 md:p-12 mb-16 border border-white/15 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-left">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#ED008C] bg-white/10 px-3 py-1 rounded-full mb-3 inline-block">
              Stay Ahead of Brand Trends
            </span>
            <h3 className="text-2xl md:text-3xl font-heading font-black text-white leading-tight mb-2">
              Subscribe to Corporate Brand Insights
            </h3>
            <p className="text-sm text-slate-200">
              Get monthly updates on commercial print strategies, corporate gift ideas, and branding case studies in Uganda.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-1 max-w-md">
            {isSubscribed ? (
              <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 p-4 rounded-2xl flex items-center gap-3 text-sm">
                <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
                <span>Thank you for subscribing! We will keep you updated.</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your corporate email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm px-4 py-3.5 rounded-full outline-none focus:border-[#ED008C] focus:bg-white/15 flex-1 transition-all"
                />
                <button 
                  type="submit"
                  className="bg-[#ED008C] hover:bg-[#d4007d] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95 shrink-0"
                >
                  <span>Subscribe</span>
                  <Send size={14} />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10 text-left">
          
          {/* Column 1: Company Profile (lg:col-span-2) */}
          <div className="lg:col-span-2 flex flex-col items-start pr-4">
            <div className="mb-4 cursor-pointer group" onClick={() => navigate('home')}>
              <BrandLogo variant="footer" size="md" showTagline />
            </div>

            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              A premier integrated branding, commercial printing, customized gifts, and corporate supply company in Uganda. We help organizations look professional, communicate authority, and dominate their markets.
            </p>

            {/* Credibility Badges */}
            <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-300 mb-6">
              <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#ED008C]" />
                {COMPANY_INFO.yearsExperience} Years Experience
              </span>
              <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Sparkles size={14} className="text-emerald-400" />
                Heidelberg Offset Press
              </span>
            </div>

            {/* Social Media Links */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                Follow Our Work
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={COMPANY_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Sozy Impressions on Instagram"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#E1306C] hover:bg-[#E1306C]/20 hover:text-[#E1306C] text-slate-300 flex items-center justify-center transition-all hover:scale-110"
                  title="Instagram"
                >
                  <Instagram size={18} />
                </a>

                <a
                  href={COMPANY_INFO.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Sozy Impressions on TikTok"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#00F2FE] hover:bg-[#00F2FE]/20 hover:text-[#00F2FE] text-slate-300 flex items-center justify-center transition-all hover:scale-110"
                  title="TikTok (@sozyimpressions)"
                >
                  <Music2 size={18} />
                </a>

                <a
                  href={COMPANY_INFO.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Subscribe to Sozy Impressions on YouTube"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#FF0000] hover:bg-[#FF0000]/20 hover:text-[#FF0000] text-slate-300 flex items-center justify-center transition-all hover:scale-110"
                  title="YouTube"
                >
                  <Youtube size={18} />
                </a>

                <a
                  href={COMPANY_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Sozy Impressions on Facebook"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#1877F2] hover:bg-[#1877F2]/20 hover:text-[#1877F2] text-slate-300 flex items-center justify-center transition-all hover:scale-110"
                  title="Facebook"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: 7 Core Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#ED008C] mb-4">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {SERVICES_DATA.map((srv) => (
                <li key={srv.id}>
                  <button 
                    onClick={() => navigate('services', srv.id)}
                    className="hover:text-white hover:translate-x-1 transition-all text-left block"
                  >
                    {srv.number} — {srv.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button onClick={() => navigate('about')} className="hover:text-white transition-colors">
                  About Our Company
                </button>
              </li>
              <li>
                <button onClick={() => navigate('services')} className="hover:text-white transition-colors">
                  Printing & Branding Services
                </button>
              </li>
              <li>
                <button onClick={() => navigate('portfolio')} className="hover:text-white transition-colors">
                  Portfolio & Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => navigate('quote')} className="hover:text-white transition-colors text-[#ED008C] font-bold">
                  Smart Quote Calculator
                </button>
              </li>
              <li>
                <button onClick={() => navigate('blog')} className="hover:text-white transition-colors">
                  Blog & Articles
                </button>
              </li>
              <li>
                <button onClick={() => navigate('contact')} className="hover:text-white transition-colors">
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Studio Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Kampala Studio & Works
            </h4>
            <div className="space-y-3.5 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin size={18} className="text-[#ED008C] shrink-0 mt-0.5" />
                <span className="leading-snug text-xs">{COMPANY_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#ED008C] shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white text-xs transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#ED008C] shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white text-xs transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageSquare size={16} className="text-emerald-400 shrink-0" />
                <a 
                  href={COMPANY_INFO.whatsappDirectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white text-xs text-emerald-400 font-bold transition-colors"
                >
                  WhatsApp: {COMPANY_INFO.whatsapp}
                </a>
              </div>

              <div className="pt-2">
                <div className="text-[11px] font-bold text-slate-300">Working Hours:</div>
                <div className="text-[11px] text-slate-500">{COMPANY_INFO.workingHours}</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Payment Options & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          
          <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
            <span className="font-bold text-slate-400 text-[11px]">Accepted Payment Channels:</span>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="bg-white px-2 py-1 rounded-md flex items-center justify-center h-7 shadow-sm" title="MTN Mobile Money">
                <img 
                  src={PAYMENT_LOGOS.mtn} 
                  alt="MTN MoMo" 
                  className="h-5 w-auto object-contain" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="bg-white px-2 py-1 rounded-md flex items-center justify-center h-7 shadow-sm" title="Airtel Money">
                <img 
                  src={PAYMENT_LOGOS.airtelMoney} 
                  alt="Airtel Money" 
                  className="h-5 w-auto object-contain" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="bg-white px-2 py-1 rounded-md flex items-center justify-center h-7 shadow-sm" title="Visa / Mastercard">
                <img 
                  src={PAYMENT_LOGOS.visaMastercard} 
                  alt="Visa & Mastercard" 
                  className="h-5 w-auto object-contain" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="bg-white/10 px-2.5 py-1.5 rounded-md text-[10px] font-bold text-slate-300">
                Bank Wire & LPO
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-center md:text-right">
            <span>© {new Date().getFullYear()} Sozy Impressions Ltd. All rights reserved.</span>
            <button 
              onClick={openAdminModal} 
              className="text-slate-600 hover:text-slate-400 transition-colors flex items-center gap-1"
              title="Admin Portal (Ctrl+Shift+A)"
            >
              <Lock size={12} />
              <span>CMS</span>
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};
