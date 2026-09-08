import React, { useState } from 'react';
import { Lock, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { useShopStore } from '../../context/ShopStoreContext';

interface DashboardLockScreenProps {
  onNavigateToShop: () => void;
}

export const DashboardLockScreen: React.FC<DashboardLockScreenProps> = ({ onNavigateToShop }) => {
  const { unlockDashboard, adminUser } = useShopStore();
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) {
      setErrorMsg('Please enter your staff PIN');
      return;
    }

    const success = unlockDashboard(pin);
    if (!success) {
      setErrorMsg('Invalid PIN. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0E1024] flex items-center justify-center p-4">
      {/* Subtle brand glow in background */}
      <div className="absolute w-96 h-96 bg-[#2D3094]/30 rounded-full blur-3xl pointer-events-none -top-20 -left-20" />
      <div className="absolute w-96 h-96 bg-[#ED008C]/20 rounded-full blur-3xl pointer-events-none -bottom-20 -right-20" />

      <div className="relative w-full max-w-md bg-[#161836] border border-white/10 rounded-3xl p-8 shadow-2xl text-center text-white space-y-6">
        
        {/* Brand Logo & Lock Icon */}
        <div className="mx-auto relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#2D3094] to-[#ED008C] flex items-center justify-center shadow-lg shadow-[#2D3094]/50">
          <Lock size={28} className="text-white" />
        </div>

        <div>
          <h2 className="text-xl font-black text-white">SozyImpressions Admin</h2>
          <p className="text-xs text-slate-400 mt-1">Session secured for {adminUser.name}</p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* PIN Input Form */}
        <form onSubmit={handleUnlock} className="space-y-4">
          <div className="space-y-1 text-left">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Staff Passcode / PIN
            </label>
            <input
              type="password"
              autoFocus
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setErrorMsg('');
              }}
              placeholder="Enter PIN (Default: 2025)"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-center text-lg font-mono tracking-widest text-white placeholder:text-slate-500 placeholder:text-xs placeholder:font-sans focus:border-[#ED008C] focus:bg-white/10 outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2D3094] to-[#2E3192] hover:from-[#25287a] hover:to-[#242777] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#2D3094]/30 transition-all hover:scale-101 active:scale-99"
          >
            <span>Unlock Dashboard</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1 text-[11px]">
            <ShieldCheck size={13} className="text-emerald-400" /> Authorized Staff Only
          </span>

          <button
            onClick={onNavigateToShop}
            className="text-xs text-[#ED008C] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Back to Storefront</span>
            <ExternalLink size={12} />
          </button>
        </div>

      </div>
    </div>
  );
};
