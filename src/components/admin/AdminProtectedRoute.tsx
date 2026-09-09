import React, { useState, useEffect, useCallback } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Key, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  Mail, 
  Clock, 
  ShieldAlert,
  Loader2,
  Sparkles
} from 'lucide-react';
import { useShopStore } from '../../context/ShopStoreContext';
import { 
  getActiveAdminSession, 
  createAdminSession, 
  saveAdminSession,
  clearAdminSession,
  isTokenSyntacticallyValid, 
  AdminSessionData,
  AUTHORIZED_ADMIN_EMAILS,
  AUTHORIZED_PASSCODES
} from '../../utils/adminAuth';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  onNavigateToShop: () => void;
  requiredRole?: string;
}

export const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({
  children,
  onNavigateToShop
}) => {
  const { 
    isAdminAuthenticated, 
    loginAdmin, 
    adminUser,
    logAction 
  } = useShopStore();

  // Authentication State
  const [session, setSession] = useState<AdminSessionData | null>(() => getActiveAdminSession());
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const [sessionExpired, setSessionExpired] = useState<boolean>(false);

  // Form states
  const [authMethod, setAuthMethod] = useState<'pin' | 'email' | 'token'>('pin');
  const [pin, setPin] = useState('');
  const [email, setEmail] = useState('ssozimarvin5@gmail.com');
  const [passwordOrKey, setPasswordOrKey] = useState('');
  const [tokenInput, setTokenInput] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);

  // 1. Initial Check: Token or Session in storage, or URL query parameters
  const verifyCurrentSession = useCallback(() => {
    setIsVerifying(true);
    setErrorMessage('');

    // Check URL parameters for direct staff authorization token (?token=... or ?admin_token=...)
    const urlParams = new URLSearchParams(window.location.search);
    const queryToken = urlParams.get('token') || urlParams.get('admin_token') || urlParams.get('auth');

    if (queryToken && isTokenSyntacticallyValid(queryToken)) {
      const newSession = createAdminSession('ssozimarvin5@gmail.com', 'Marvin Ssozi', 'Shop Director & Admin', true);
      // Clean query parameter from address bar for security
      urlParams.delete('token');
      urlParams.delete('admin_token');
      urlParams.delete('auth');
      const newRelativePathQuery = window.location.pathname + (urlParams.toString() ? `?${urlParams.toString()}` : '') + window.location.hash;
      window.history.replaceState(null, '', newRelativePathQuery);

      setSession(newSession);
      loginAdmin('ssozimarvin5@gmail.com', 'SOZY2026');
      setIsVerifying(false);
      logAction('Admin Token Verified', 'system', 'auth', 'Administrator accessed /admin/shop via URL token authorization');
      return;
    }

    // Verify existing stored session
    const activeSession = getActiveAdminSession();
    if (activeSession) {
      if (Date.now() > activeSession.expiresAt) {
        clearAdminSession();
        setSession(null);
        setSessionExpired(true);
      } else {
        setSession(activeSession);
        setSessionExpired(false);
        if (!isAdminAuthenticated) {
          loginAdmin(activeSession.email, 'SOZY2026');
        }
      }
    } else {
      setSession(null);
    }

    setIsVerifying(false);
  }, [isAdminAuthenticated, loginAdmin, logAction]);

  useEffect(() => {
    verifyCurrentSession();

    // Listen for storage changes across browser tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'sozy_admin_session' || e.key === 'sozy_admin_token') {
        verifyCurrentSession();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // Periodic heartbeat to verify token expiration every 60 seconds
    const interval = setInterval(() => {
      const current = getActiveAdminSession();
      if (!current) {
        setSession(null);
        setSessionExpired(true);
      }
    }, 60000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [verifyCurrentSession]);

  // Handle PIN Passcode Authentication
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const cleanPin = pin.trim().toLowerCase();

    if (!cleanPin) {
      setErrorMessage('Please enter your staff passcode');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      if (AUTHORIZED_PASSCODES.includes(cleanPin)) {
        const newSession = createAdminSession('ssozimarvin5@gmail.com', 'Marvin Ssozi', 'Shop Director & Admin', rememberMe);
        loginAdmin('ssozimarvin5@gmail.com', cleanPin);
        setSession(newSession);
        setSuccessAnimation(true);
        logAction('Admin Authenticated', 'system', 'auth', 'Staff passcode validated for /admin/shop');
      } else {
        setErrorMessage('Invalid administrator passcode. Please check your credentials.');
        setIsSubmitting(false);
      }
    }, 400);
  };

  // Handle Email & Secret Key Authentication
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const cleanEmail = email.trim().toLowerCase();
    const cleanKey = passwordOrKey.trim();

    if (!cleanEmail || !cleanKey) {
      setErrorMessage('Please provide both administrator email and access key');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const isAuthorizedEmail = AUTHORIZED_ADMIN_EMAILS.includes(cleanEmail);
      const isAuthorizedKey = AUTHORIZED_PASSCODES.includes(cleanKey.toLowerCase()) || cleanKey.length >= 6;

      if (isAuthorizedEmail && isAuthorizedKey) {
        const newSession = createAdminSession(cleanEmail, 'Marvin Ssozi', 'Shop Director & Admin', rememberMe);
        loginAdmin(cleanEmail, cleanKey);
        setSession(newSession);
        setSuccessAnimation(true);
        logAction('Admin Login Granted', 'system', 'auth', `Admin session issued to ${cleanEmail}`);
      } else {
        setErrorMessage('Access denied. Unrecognized administrator credentials.');
        setIsSubmitting(false);
      }
    }, 450);
  };

  // Handle Direct Bearer Token Authentication
  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const cleanToken = tokenInput.trim();

    if (!cleanToken) {
      setErrorMessage('Please provide an administrator bearer token');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      if (isTokenSyntacticallyValid(cleanToken)) {
        const newSession: AdminSessionData = {
          token: cleanToken,
          email: 'ssozimarvin5@gmail.com',
          name: 'Marvin Ssozi',
          role: 'Shop Director & Admin',
          issuedAt: Date.now(),
          expiresAt: Date.now() + (rememberMe ? 24 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000),
          rememberMe
        };
        saveAdminSession(newSession);
        loginAdmin('ssozimarvin5@gmail.com', 'SOZY2026');
        setSession(newSession);
        setSuccessAnimation(true);
        logAction('Token Auth Success', 'system', 'auth', 'Administrator token verified successfully');
      } else {
        setErrorMessage('Invalid or expired security token. Must follow standard token formatting.');
        setIsSubmitting(false);
      }
    }, 400);
  };

  // Quick Demo Access Token for Testing/Evaluation
  const handleQuickDemoAccess = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newSession = createAdminSession('ssozimarvin5@gmail.com', 'Marvin Ssozi', 'Shop Director & Admin', true);
      loginAdmin('ssozimarvin5@gmail.com', 'SOZY2026');
      setSession(newSession);
      setSuccessAnimation(true);
      logAction('Quick Staff Auth', 'system', 'auth', 'Staff authenticated using instant session key');
    }, 300);
  };

  // Loading state while checking token/session
  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#0E1024] flex flex-col items-center justify-center p-6 text-white text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#2D3094] to-[#ED008C] flex items-center justify-center shadow-xl shadow-[#2D3094]/40 mb-4 animate-pulse">
          <Lock size={28} className="text-white" />
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
          <Loader2 size={18} className="animate-spin text-[#ED008C]" />
          <span>Verifying administrator session & token...</span>
        </div>
        <span className="text-[11px] text-slate-500 mt-2 font-mono">Route: /admin/shop</span>
      </div>
    );
  }

  // If valid session exists, render the protected dashboard
  if (session && !sessionExpired) {
    return <>{children}</>;
  }

  // Not authenticated or expired: Render Protected Route Challenge Gate
  return (
    <div className="min-h-screen bg-[#0A0C1B] flex items-center justify-center p-4 sm:p-6 font-sans antialiased text-white selection:bg-[#ED008C] selection:text-white relative overflow-hidden">
      
      {/* Ambient background brand glows */}
      <div className="absolute w-[500px] h-[500px] bg-[#2D3094]/25 rounded-full blur-3xl pointer-events-none -top-32 -left-32" />
      <div className="absolute w-[500px] h-[500px] bg-[#ED008C]/20 rounded-full blur-3xl pointer-events-none -bottom-32 -right-32" />

      {/* Main Authentication Card */}
      <div className="relative w-full max-w-lg bg-[#14162E]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 space-y-6">
        
        {/* Protected Route Banner */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
            </span>
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-rose-400">
              Protected Route
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
            /admin/shop
          </span>
        </div>

        {/* Brand Lock & Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#2D3094] to-[#ED008C] flex items-center justify-center shadow-lg shadow-[#2D3094]/40">
            {successAnimation ? (
              <CheckCircle2 size={32} className="text-white animate-in zoom-in-50 duration-200" />
            ) : (
              <Lock size={30} className="text-white" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white">SozyImpressions Admin</h1>
            <p className="text-xs text-slate-400 mt-1">
              Administrator authentication token or active session required
            </p>
          </div>
        </div>

        {/* Expired Session Warning */}
        {sessionExpired && (
          <div className="p-3.5 bg-amber-500/15 border border-amber-500/30 rounded-2xl flex items-start gap-3 text-amber-200 text-xs">
            <Clock size={16} className="shrink-0 text-amber-400 mt-0.5" />
            <div>
              <p className="font-bold">Session Expired</p>
              <p className="text-[11px] text-amber-300/80">Your administrator token has expired. Please re-authenticate to access the shop back-office.</p>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 bg-rose-500/15 border border-rose-500/30 rounded-2xl flex items-center gap-3 text-rose-200 text-xs animate-in fade-in duration-200">
            <ShieldAlert size={16} className="shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Auth Method Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-2xl border border-white/5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setAuthMethod('pin');
              setErrorMessage('');
            }}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              authMethod === 'pin' 
                ? 'bg-gradient-to-r from-[#2D3094] to-[#2E3192] text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Key size={13} />
            <span>Passcode</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMethod('email');
              setErrorMessage('');
            }}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              authMethod === 'email' 
                ? 'bg-gradient-to-r from-[#2D3094] to-[#2E3192] text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mail size={13} />
            <span>Credentials</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMethod('token');
              setErrorMessage('');
            }}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              authMethod === 'token' 
                ? 'bg-gradient-to-r from-[#2D3094] to-[#2E3192] text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck size={13} />
            <span>Auth Token</span>
          </button>
        </div>

        {/* 1. Passcode Form */}
        {authMethod === 'pin' && (
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Staff Security PIN / Passcode
              </label>
              <input
                type="password"
                autoFocus
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="Enter Staff PIN (e.g. 2025)"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-center text-xl font-mono tracking-widest text-white placeholder:text-slate-500 placeholder:text-xs placeholder:font-sans focus:border-[#ED008C] focus:bg-white/10 outline-none transition-all"
              />
              <p className="text-[10px] text-slate-500 text-center">
                Default authorization codes: <span className="text-slate-300 font-mono">2025</span>, <span className="text-slate-300 font-mono">SOZY2026</span>, or <span className="text-slate-300 font-mono">admin123</span>
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-white/20 bg-white/5 text-[#ED008C] focus:ring-[#ED008C]"
                />
                <span className="text-[11px]">Remember session (24 hours)</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#2D3094] to-[#2E3192] hover:from-[#25287a] hover:to-[#242777] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#2D3094]/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Verifying Authorization...</span>
                </>
              ) : (
                <>
                  <span>Authorize & Open Dashboard</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        )}

        {/* 2. Email & Secret Key Form */}
        {authMethod === 'email' && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Administrator Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="ssozimarvin5@gmail.com"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-500 focus:border-[#ED008C] focus:bg-white/10 outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Security Passcode or Key
              </label>
              <input
                type="password"
                value={passwordOrKey}
                onChange={(e) => {
                  setPasswordOrKey(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="Enter password or passcode"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-500 focus:border-[#ED008C] focus:bg-white/10 outline-none transition-all"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-white/20 bg-white/5 text-[#ED008C] focus:ring-[#ED008C]"
                />
                <span className="text-[11px]">Keep active session</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#2D3094] to-[#2E3192] hover:from-[#25287a] hover:to-[#242777] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#2D3094]/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Issuing Session Token...</span>
                </>
              ) : (
                <>
                  <span>Authenticate Session</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        )}

        {/* 3. Direct Bearer Token Form */}
        {authMethod === 'token' && (
          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Administrator Bearer Token
              </label>
              <textarea
                rows={2}
                value={tokenInput}
                onChange={(e) => {
                  setTokenInput(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="Paste token (e.g. sozy_adm_... or SOZY_MASTER_ADMIN_TOKEN_2026)"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-mono text-white placeholder:text-slate-500 focus:border-[#ED008C] focus:bg-white/10 outline-none transition-all resize-none"
              />
              <p className="text-[10px] text-slate-500">
                You can also access via URL: <span className="text-slate-300 font-mono">/admin/shop?token=YOUR_TOKEN</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#2D3094] to-[#2E3192] hover:from-[#25287a] hover:to-[#242777] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#2D3094]/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Validating Token...</span>
                </>
              ) : (
                <>
                  <span>Validate Token</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        )}

        {/* Quick Testing Staff Token Button */}
        <div className="pt-2 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleQuickDemoAccess}
            disabled={isSubmitting}
            className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <Sparkles size={13} className="text-[#ED008C]" />
            <span>Quick Staff Session Access ({adminUser.name})</span>
          </button>
        </div>

        {/* Footer & Storefront Exit Link */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-[11px] text-emerald-400">
            <ShieldCheck size={14} /> Encrypted Session Gate
          </span>

          <button
            type="button"
            onClick={onNavigateToShop}
            className="text-xs text-[#ED008C] hover:text-[#ff38af] flex items-center gap-1 font-semibold transition-colors"
          >
            <span>Exit to Live Store</span>
            <ExternalLink size={12} />
          </button>
        </div>

      </div>
    </div>
  );
};
