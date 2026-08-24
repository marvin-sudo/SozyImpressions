import React from 'react';
import { Award, Users, CheckCircle, Zap, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export const TrustBar: React.FC = () => {
  const stats = [
    {
      icon: <Award className="w-5 h-5 text-[#ED008C]" />,
      value: `${COMPANY_INFO.yearsExperience} Years`,
      label: 'Corporate Experience',
      sub: `Since ${COMPANY_INFO.establishedYear} in Uganda`
    },
    {
      icon: <Users className="w-5 h-5 text-[#2E3192]" />,
      value: COMPANY_INFO.clientsCount,
      label: 'Corporate Clients',
      sub: 'Banks, NGOs & SMEs'
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-emerald-500" />,
      value: COMPANY_INFO.projectsCount,
      label: 'Delivered Projects',
      sub: 'Zero-Defect Quality'
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      value: '24 - 48 Hrs',
      label: 'Fast Turnaround',
      sub: 'Same-day options'
    },
    {
      icon: <MapPin className="w-5 h-5 text-sky-500" />,
      value: 'Nationwide',
      label: 'Uganda Delivery',
      sub: 'Kampala & Upcountry'
    }
  ];

  return (
    <div className="bg-white border-b border-slate-100 py-8 px-4 md:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-slate-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                {stat.icon}
              </div>
              <div className="text-left">
                <div className="font-heading font-black text-xl md:text-2xl text-[#121212] tracking-tight leading-none">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-800 mt-1 leading-none">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {stat.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
