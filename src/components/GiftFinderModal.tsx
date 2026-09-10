import React, { useState, useMemo, useCallback } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  X, 
  Search, 
  Check, 
  RotateCcw, 
  Edit3, 
  ShoppingBag, 
  SlidersHorizontal 
} from 'lucide-react';
import { Product, Currency, CartItem, View } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';
import { COMPANY_INFO } from '../data/mockData';

export interface GiftFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currency: Currency;
  onOpenCustomizer: (product: Product) => void;
  onAddToCart?: (item: CartItem) => void;
  navigate?: (view: View, param?: string) => void;
  onApplyToShop?: (category: string, query?: string) => void;
}

type Step = 'intro' | 'recipient' | 'occasion' | 'budget' | 'interests' | 'results';

// Adorable Joy Mascot Vector Component based on user reference screenshots
export const JoyMascot: React.FC<{ size?: number; className?: string; animated?: boolean }> = ({ 
  size = 64, 
  className = '',
  animated = true 
}) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none ${animated ? 'animate-bounce-subtle' : ''} ${className}`}
      style={{ width: size, height: size }}
      aria-label="Joy - Gift Finder Mascot"
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full drop-shadow-md"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Feet */}
        <ellipse cx="38" cy="88" rx="7" ry="4" fill="#B8006E" />
        <ellipse cx="62" cy="88" rx="7" ry="4" fill="#B8006E" />

        {/* Gift Box Body (Pink matching site & buttons) */}
        <rect x="22" y="32" width="56" height="52" rx="10" fill="#ED008C" />
        {/* Soft 3D shadow gradient overlay */}
        <rect x="22" y="32" width="56" height="52" rx="10" fill="url(#boxShade)" />

        {/* Box Lid / Top Rim */}
        <rect x="20" y="28" width="60" height="12" rx="5" fill="#FF2E9D" />

        {/* Vertical Golden Ribbon */}
        <rect x="45" y="28" width="10" height="56" fill="#F59E0B" />
        <rect x="47" y="28" width="6" height="56" fill="#FBBF24" />

        {/* Horizontal Golden Ribbon */}
        <rect x="22" y="52" width="56" height="10" fill="#F59E0B" />
        <rect x="22" y="54" width="56" height="6" fill="#FBBF24" />

        {/* Arms */}
        {/* Left Arm Waving */}
        <path 
          d="M22 50 C12 42 10 32 16 28 C20 26 22 34 23 44" 
          stroke="#B8006E" 
          strokeWidth="5" 
          strokeLinecap="round" 
          fill="none" 
        />
        {/* Right Arm */}
        <path 
          d="M78 50 C86 56 88 64 85 70" 
          stroke="#B8006E" 
          strokeWidth="5" 
          strokeLinecap="round" 
          fill="none" 
        />

        {/* Big Golden Bow on Top */}
        <ellipse cx="40" cy="20" rx="11" ry="8" transform="rotate(-25 40 20)" fill="#F59E0B" />
        <ellipse cx="40" cy="20" rx="7" ry="5" transform="rotate(-25 40 20)" fill="#FCD34D" />
        <ellipse cx="60" cy="20" rx="11" ry="8" transform="rotate(25 60 20)" fill="#F59E0B" />
        <ellipse cx="60" cy="20" rx="7" ry="5" transform="rotate(25 60 20)" fill="#FCD34D" />
        {/* Knot center */}
        <circle cx="50" cy="24" r="6" fill="#D97706" />
        <circle cx="50" cy="24" r="4.5" fill="#FBBF24" />

        {/* Cheerful Eyes */}
        <ellipse cx="38" cy="46" rx="4" ry="5.5" fill="#181B34" />
        <circle cx="39.5" cy="44" r="1.8" fill="#FFFFFF" />
        <circle cx="37" cy="48" r="0.9" fill="#FFFFFF" />

        <ellipse cx="62" cy="46" rx="4" ry="5.5" fill="#181B34" />
        <circle cx="63.5" cy="44" r="1.8" fill="#FFFFFF" />
        <circle cx="61" cy="48" r="0.9" fill="#FFFFFF" />

        {/* Rosy Cheeks */}
        <ellipse cx="32" cy="53" rx="3.5" ry="2" fill="#F472B6" opacity="0.6" />
        <ellipse cx="68" cy="53" rx="3.5" ry="2" fill="#F472B6" opacity="0.6" />

        {/* Smiling Mouth */}
        <path 
          d="M44 56 Q50 63 56 56" 
          stroke="#181B34" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          fill="#BE185D" 
        />

        <defs>
          <linearGradient id="boxShade" x1="22" y1="32" x2="78" y2="84" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" stopOpacity="0.15" />
            <stop offset="1" stopColor="#000000" stopOpacity="0.25" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export const GiftFinderModal: React.FC<GiftFinderModalProps> = ({
  isOpen,
  onClose,
  products,
  currency,
  onOpenCustomizer,
  onAddToCart,
  navigate,
  onApplyToShop
}) => {
  const [step, setStep] = useState<Step>('intro');
  const [recipient, setRecipient] = useState<string | null>(null);
  const [occasion, setOccasion] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);

  // Recipient options
  const RECIPIENT_OPTIONS = [
    { label: 'Sister', emoji: '👧' },
    { label: 'Brother', emoji: '👦' },
    { label: 'Mother', emoji: '🌷' },
    { label: 'Father', emoji: '👨' },
    { label: 'Wife', emoji: '💖' },
    { label: 'Husband', emoji: '💙' },
    { label: 'Friend', emoji: '🤝' },
    { label: 'Kids', emoji: '🧒' },
    { label: 'Boyfriend', emoji: '💑' },
    { label: 'Girlfriend', emoji: '💕' },
    { label: 'Colleague / Boss', emoji: '👔' },
    { label: 'Grandparents', emoji: '👵' },
  ];

  // Occasion options
  const OCCASION_OPTIONS = [
    { label: 'Birthday', emoji: '🎂' },
    { label: 'Anniversary', emoji: '💍' },
    { label: "Valentine's Day", emoji: '💖' },
    { label: 'Congratulations', emoji: '🎉' },
    { label: 'Promotion / Work', emoji: '👔' },
    { label: 'Just Because', emoji: '🌿' },
    { label: 'Wedding', emoji: '💒' },
    { label: 'Housewarming', emoji: '🏠' },
    { label: 'Graduation', emoji: '🎓' },
    { label: 'Holidays / Festive', emoji: '🎄' },
  ];

  // Budget options based on currency
  const BUDGET_OPTIONS = useMemo(() => {
    return currency === 'USD' ? [
      { id: 'under-15', label: 'Under $15', emoji: '🪙', min: 0, max: 15 },
      { id: '15-30', label: '$15 – $30', emoji: '💝', min: 15, max: 30 },
      { id: '30-70', label: '$30 – $70', emoji: '🎁', min: 30, max: 70 },
      { id: '70-above', label: '$70 & above', emoji: '👑', min: 70, max: 99999 },
    ] : [
      { id: 'under-50k', label: 'Under UGX 50,000', emoji: '🪙', min: 0, max: 50000 },
      { id: '50k-100k', label: 'UGX 50,000 – 100,000', emoji: '💝', min: 50000, max: 100000 },
      { id: '100k-250k', label: 'UGX 100,000 – 250,000', emoji: '🎁', min: 100000, max: 250000 },
      { id: '250k-above', label: 'UGX 250,000 & above', emoji: '👑', min: 250000, max: 99999999 },
    ];
  }, [currency]);

  // Interests options (3x3 grid like Screenshot 6 & 7)
  const INTEREST_OPTIONS = [
    { id: 'coffee', label: 'Coffee / Tea Lover', emoji: '☕', sub: 'Mugs, tumblers & flasks' },
    { id: 'decor', label: 'Home Decor & Lamps', emoji: '🕯️', sub: 'Night lamps & acrylic frames' },
    { id: 'fashion', label: 'Fashion & Apparel', emoji: '👕', sub: 'Polos, hoodies & caps' },
    { id: 'sweets', label: 'Sweet Tooth', emoji: '🍫', sub: 'Celebration cakes & chocolates' },
    { id: 'executive', label: 'Executive & Stationery', emoji: '💼', sub: 'PU notebooks & metal pens' },
    { id: 'fitness', label: 'Fitness & Active', emoji: '🏃', sub: 'Sports water bottles & duffels' },
    { id: 'tech', label: 'Music & Tech Gadgets', emoji: '🎵', sub: 'Earbuds & Bluetooth lights' },
    { id: 'jewellery', label: 'Jewellery & Keepsakes', emoji: '💎', sub: 'Keychains & engraved plaques' },
    { id: 'selfcare', label: 'Self-Care & Comfort', emoji: '🧘', sub: 'Personalized cushions & relaxation' },
  ];

  // Fast start prompts
  const INTRO_SHORTCUTS = [
    { text: 'Anniversary gifts for my partner', rec: 'Wife', occ: 'Anniversary' },
    { text: 'Need a birthday surprise today', rec: 'Friend', occ: 'Birthday' },
    { text: 'Special gift for Husband / Boyfriend', rec: 'Husband', occ: 'Birthday' },
    { text: 'Thoughtful gift for Wife / Girlfriend', rec: 'Wife', occ: "Valentine's Day" },
    { text: 'Corporate & Executive gifts', rec: 'Colleague / Boss', occ: 'Promotion / Work' },
    { text: 'I need a gift right now', rec: 'Anyone', occ: 'Just Because' },
  ];

  const toggleInterest = (id: string) => {
    setInterests(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const getPriceUGX = useCallback((p: Product): number => {
    return (p as any).priceUGX || (p as any).price || 35000;
  }, []);

  const getPriceUSD = useCallback((p: Product): number => {
    if ((p as any).priceUSD) return (p as any).priceUSD;
    return Math.round(getPriceUGX(p) / 3800);
  }, [getPriceUGX]);

  // Suitable matching algorithm
  const matchedGifts = useMemo(() => {
    if (step !== 'results') return [];

    const recLower = (recipient || '').toLowerCase();
    const occLower = (occasion || '').toLowerCase();
    const budgetObj = BUDGET_OPTIONS.find(b => b.id === budget);

    const scored = products.map((prod) => {
      let score = 50;
      const nameLower = prod.name.toLowerCase();
      const catLower = (prod.category || '').toLowerCase();
      const pUgx = getPriceUGX(prod);
      const pUsd = getPriceUSD(prod);

      // Recipient scoring
      if (recLower === 'husband' || recLower === 'boyfriend' || recLower === 'father' || recLower === 'brother') {
        if (nameLower.includes('polo') || nameLower.includes('flask') || nameLower.includes('executive') || nameLower.includes('wallet') || nameLower.includes('desk') || nameLower.includes('pen') || nameLower.includes('tech') || catLower.includes('apparel') || catLower.includes('stationery')) {
          score += 25;
        }
      } else if (recLower === 'wife' || recLower === 'girlfriend' || recLower === 'mother' || recLower === 'sister') {
        if (nameLower.includes('rose') || nameLower.includes('flower') || nameLower.includes('cushion') || nameLower.includes('lamp') || nameLower.includes('jewel') || nameLower.includes('heart') || nameLower.includes('photo') || catLower.includes('decor')) {
          score += 25;
        }
      } else if (recLower === 'kids') {
        if (nameLower.includes('mug') || nameLower.includes('lamp') || nameLower.includes('t-shirt') || nameLower.includes('bottle')) {
          score += 20;
        }
      } else if (recLower.includes('colleague') || recLower.includes('boss')) {
        if (nameLower.includes('executive') || nameLower.includes('stationery') || nameLower.includes('notebook') || nameLower.includes('trophy') || nameLower.includes('pen') || nameLower.includes('flask')) {
          score += 30;
        }
      } else {
        score += 10;
      }

      // Occasion scoring
      if (occLower.includes('birthday')) {
        if (nameLower.includes('lamp') || nameLower.includes('mug') || nameLower.includes('cake') || nameLower.includes('explosion') || nameLower.includes('hoodie')) {
          score += 20;
        }
      } else if (occLower.includes('anniversary') || occLower.includes('valentine')) {
        if (nameLower.includes('heart') || nameLower.includes('couple') || nameLower.includes('moon') || nameLower.includes('rose') || nameLower.includes('frame') || nameLower.includes('lamp')) {
          score += 25;
        }
      } else if (occLower.includes('promotion') || occLower.includes('congratulations')) {
        if (nameLower.includes('trophy') || nameLower.includes('award') || nameLower.includes('executive') || nameLower.includes('pen') || nameLower.includes('notebook')) {
          score += 25;
        }
      }

      // Budget scoring
      if (budgetObj) {
        const val = currency === 'USD' ? pUsd : pUgx;
        if (val >= budgetObj.min && val <= budgetObj.max) {
          score += 20;
        } else {
          score -= 15;
        }
      }

      // Interests scoring
      if (interests.length > 0) {
        interests.forEach(interestId => {
          if (interestId === 'coffee' && (nameLower.includes('mug') || nameLower.includes('tumbler') || nameLower.includes('flask') || nameLower.includes('coffee'))) {
            score += 25;
          }
          if (interestId === 'decor' && (nameLower.includes('lamp') || nameLower.includes('frame') || nameLower.includes('acrylic') || nameLower.includes('neon') || catLower.includes('decor'))) {
            score += 25;
          }
          if (interestId === 'fashion' && (nameLower.includes('polo') || nameLower.includes('hoodie') || nameLower.includes('cap') || nameLower.includes('tshirt') || catLower.includes('apparel'))) {
            score += 25;
          }
          if (interestId === 'sweets' && (nameLower.includes('cake') || nameLower.includes('chocolate') || nameLower.includes('hamper'))) {
            score += 25;
          }
          if (interestId === 'executive' && (nameLower.includes('notebook') || nameLower.includes('pen') || nameLower.includes('executive') || nameLower.includes('caddy'))) {
            score += 25;
          }
          if (interestId === 'fitness' && (nameLower.includes('bottle') || nameLower.includes('sipper') || nameLower.includes('duffel'))) {
            score += 25;
          }
          if (interestId === 'tech' && (nameLower.includes('speaker') || nameLower.includes('earbud') || nameLower.includes('clock') || nameLower.includes('wireless'))) {
            score += 25;
          }
          if (interestId === 'jewellery' && (nameLower.includes('keyring') || nameLower.includes('keychain') || nameLower.includes('plaque') || nameLower.includes('jewel'))) {
            score += 25;
          }
          if (interestId === 'selfcare' && (nameLower.includes('cushion') || nameLower.includes('candle') || nameLower.includes('pillow'))) {
            score += 25;
          }
        });
      }

      // Bound score between 75 and 99
      const normalizedScore = Math.min(99, Math.max(78, Math.round(score)));

      return {
        product: prod,
        matchScore: normalizedScore,
        matchReason: `Tailored for ${recipient || 'your loved one'}${occasion ? ` • ${occasion}` : ''}`
      };
    });

    return scored.sort((a, b) => b.matchScore - a.matchScore);
  }, [step, recipient, occasion, budget, interests, products, currency, BUDGET_OPTIONS, getPriceUGX, getPriceUSD]);

  if (!isOpen) return null;

  // Question navigation helpers
  const getQuestionIndex = () => {
    switch (step) {
      case 'recipient': return 1;
      case 'occasion': return 2;
      case 'budget': return 3;
      case 'interests': return 4;
      default: return 1;
    }
  };

  const handleBack = () => {
    if (step === 'recipient') setStep('intro');
    else if (step === 'occasion') setStep('recipient');
    else if (step === 'budget') setStep('occasion');
    else if (step === 'interests') setStep('budget');
    else if (step === 'results') setStep('interests');
  };

  const resetAll = () => {
    setRecipient(null);
    setOccasion(null);
    setBudget(null);
    setInterests([]);
    setStep('intro');
  };

  // WhatsApp order link
  const generateWhatsAppOrderLink = (product: Product) => {
    const text = encodeURIComponent(
      `Hello Sozy Impressions! Joy Gift Finder recommended "${product.name}" for ${recipient || 'a special gift'}${occasion ? ` (${occasion})` : ''}. I would like to order it!`
    );
    return `https://wa.me/${COMPANY_INFO.whatsapp}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* MODAL HEADER */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-3 bg-slate-50/80">
          <div className="flex items-center gap-2.5 min-w-0">
            {step !== 'intro' && (
              <button
                onClick={handleBack}
                className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-[#2D3094] hover:border-[#2D3094] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                title="Go back"
              >
                <ArrowLeft size={16} />
              </button>
            )}

            <div className="flex items-center gap-2">
              <JoyMascot size={28} animated={false} />
              <div>
                <h3 className="font-heading font-black text-base sm:text-lg text-slate-900 tracking-tight leading-none">
                  {step === 'results' ? 'Suitable Gifts Found!' : 'Gift Finder'}
                </h3>
                {step !== 'intro' && step !== 'results' && (
                  <span className="text-[11px] text-slate-500 font-medium">
                    Question {getQuestionIndex()} of 4
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {step === 'results' && (
              <button
                onClick={resetAll}
                className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-[#2D3094] hover:bg-white rounded-lg border border-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
                title="Restart Gift Finder"
              >
                <RotateCcw size={12} />
                <span className="hidden sm:inline">Start Over</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors shadow-xs hover:shadow-md cursor-pointer shrink-0"
              title="Close modal"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* PROGRESS BARS (Questions 1 to 4) */}
        {step !== 'intro' && step !== 'results' && (
          <div className="grid grid-cols-4 gap-1.5 px-5 pt-3 pb-1 bg-white">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i <= getQuestionIndex() ? 'bg-[#ED008C]' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        )}

        {/* MODAL BODY (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/40">

          {/* ----------------- STEP 0: INTRO SCREEN (Screenshot 2) ----------------- */}
          {step === 'intro' && (
            <div className="flex flex-col items-center text-center py-4 sm:py-6">
              <JoyMascot size={84} className="mb-3" />
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight">
                Hi, I'm Joy
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-md">
                Tell me who it's for. I'll do the finding.
              </p>

              {/* Quick Jump Prompts (like reference) */}
              <div className="w-full max-w-lg mt-6 bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs text-left overflow-hidden">
                {INTRO_SHORTCUTS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setRecipient(item.rec);
                      setOccasion(item.occ);
                      setStep('budget');
                    }}
                    className="w-full px-4 py-3 sm:py-3.5 flex items-center justify-between hover:bg-pink-50/50 hover:text-[#ED008C] transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base">
                        {idx === 0 ? '💍' : idx === 1 ? '🎂' : idx === 2 ? '👨' : idx === 3 ? '💖' : idx === 4 ? '👔' : '⚡'}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-slate-700 group-hover:text-slate-900">
                        {item.text}
                      </span>
                    </div>
                    <ArrowRight size={15} className="text-slate-400 group-hover:text-[#ED008C] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}
              </div>

              {/* Big Bottom Action Button */}
              <div className="w-full max-w-lg mt-6">
                <button
                  onClick={() => setStep('recipient')}
                  className="w-full relative py-3.5 px-6 rounded-2xl text-white font-heading font-bold text-sm sm:text-base bg-[#ED008C] hover:bg-[#d0007b] active:scale-98 shadow-md hover:shadow-lg shadow-[#ED008C]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore gifts with Joy</span>
                  <JoyMascot size={26} animated={false} className="absolute right-4" />
                </button>
              </div>
            </div>
          )}

          {/* ----------------- STEP 1: RECIPIENT (Screenshot 3) ----------------- */}
          {step === 'recipient' && (
            <div className="max-w-xl mx-auto space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <JoyMascot size={36} animated={false} className="shrink-0 mt-1" />
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex-1">
                  <h4 className="font-heading font-bold text-base sm:text-lg text-slate-900">
                    Who's the gift for?
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 mb-4">
                    Tap one - I'll shape everything else around them.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {RECIPIENT_OPTIONS.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          setRecipient(item.label);
                          setStep('occasion');
                        }}
                        className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-normal transition-all border cursor-pointer flex items-center gap-1.5 ${
                          recipient === item.label
                            ? 'bg-[#ED008C] text-white border-[#ED008C] shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-[#ED008C] hover:bg-pink-50/40'
                        }`}
                      >
                        <span>{item.emoji}</span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setRecipient('Anyone');
                        setStep('occasion');
                      }}
                      className="text-xs font-semibold text-[#ED008C] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <span>Not sure yet</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ----------------- STEP 2: OCCASION (Screenshot 4) ----------------- */}
          {step === 'occasion' && (
            <div className="max-w-xl mx-auto space-y-4 pt-2">
              {/* Previous Answer Bubble */}
              <div className="flex justify-end">
                <button
                  onClick={() => setStep('recipient')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ED008C] text-white text-xs font-semibold shadow-xs hover:bg-[#d0007b] transition-colors cursor-pointer"
                  title="Click to edit recipient"
                >
                  <span>{recipient}</span>
                  <Edit3 size={12} />
                </button>
              </div>

              {/* Joy Question */}
              <div className="flex items-start gap-3">
                <JoyMascot size={36} animated={false} className="shrink-0 mt-1" />
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex-1">
                  <h4 className="font-heading font-bold text-base sm:text-lg text-slate-900">
                    What's the occasion for your {recipient?.toLowerCase() || 'recipient'}?
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 mb-4">
                    I'll match the vibe.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {OCCASION_OPTIONS.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          setOccasion(item.label);
                          setStep('budget');
                        }}
                        className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-normal transition-all border cursor-pointer flex items-center gap-1.5 ${
                          occasion === item.label
                            ? 'bg-[#ED008C] text-white border-[#ED008C] shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-[#ED008C] hover:bg-pink-50/40'
                        }`}
                      >
                        <span>{item.emoji}</span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setOccasion('Just Because');
                        setStep('budget');
                      }}
                      className="text-xs font-semibold text-[#ED008C] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <span>No occasion / Just because</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ----------------- STEP 3: BUDGET (Screenshot 5) ----------------- */}
          {step === 'budget' && (
            <div className="max-w-xl mx-auto space-y-4 pt-2">
              {/* Previous Answer Bubbles */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setStep('recipient')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ED008C] text-white text-xs font-semibold shadow-xs hover:bg-[#d0007b] transition-colors cursor-pointer"
                >
                  <span>{recipient}</span>
                  <Edit3 size={12} />
                </button>
                <button
                  onClick={() => setStep('occasion')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ED008C] text-white text-xs font-semibold shadow-xs hover:bg-[#d0007b] transition-colors cursor-pointer"
                >
                  <span>{occasion}</span>
                  <Edit3 size={12} />
                </button>
              </div>

              {/* Joy Question */}
              <div className="flex items-start gap-3">
                <JoyMascot size={36} animated={false} className="shrink-0 mt-1" />
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex-1">
                  <h4 className="font-heading font-bold text-base sm:text-lg text-slate-900">
                    Got a budget in mind?
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 mb-4">
                    Pick a range.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {BUDGET_OPTIONS.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setBudget(item.id);
                          setStep('interests');
                        }}
                        className={`p-3 rounded-xl text-xs sm:text-sm font-medium transition-all border cursor-pointer flex items-center gap-2.5 ${
                          budget === item.id
                            ? 'bg-[#ED008C] text-white border-[#ED008C] shadow-xs'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-[#ED008C] hover:bg-pink-50/40'
                        }`}
                      >
                        <span className="text-lg">{item.emoji}</span>
                        <span className="font-semibold">{item.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setBudget(null);
                        setStep('interests');
                      }}
                      className="text-xs font-semibold text-[#ED008C] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <span>Not decided / Any budget</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ----------------- STEP 4: INTERESTS (Screenshots 6 & 7) ----------------- */}
          {step === 'interests' && (
            <div className="max-w-xl mx-auto space-y-4 pt-2">
              {/* Previous Answer Bubbles */}
              <div className="flex flex-wrap justify-end gap-1.5">
                <button
                  onClick={() => setStep('recipient')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ED008C] text-white text-[11px] font-semibold cursor-pointer"
                >
                  <span>{recipient}</span>
                  <Edit3 size={10} />
                </button>
                <button
                  onClick={() => setStep('occasion')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ED008C] text-white text-[11px] font-semibold cursor-pointer"
                >
                  <span>{occasion}</span>
                  <Edit3 size={10} />
                </button>
                {budget && (
                  <button
                    onClick={() => setStep('budget')}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ED008C] text-white text-[11px] font-semibold cursor-pointer"
                  >
                    <span>{BUDGET_OPTIONS.find(b => b.id === budget)?.label}</span>
                    <Edit3 size={10} />
                  </button>
                )}
              </div>

              {/* Joy Question */}
              <div className="flex items-start gap-3">
                <JoyMascot size={36} animated={false} className="shrink-0 mt-1" />
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex-1">
                  <h4 className="font-heading font-bold text-base sm:text-lg text-slate-900">
                    What do they like?
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 mb-4">
                    Pick a few interests, and I'll find their kind of gift.
                  </p>

                  {/* 3x3 Card Grid matching Screenshot 6 */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {INTEREST_OPTIONS.map((item) => {
                      const isSelected = interests.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          onClick={() => toggleInterest(item.id)}
                          className={`p-3 rounded-2xl border flex flex-col items-center text-center transition-all cursor-pointer relative ${
                            isSelected 
                              ? 'bg-pink-50/80 border-[#ED008C] ring-2 ring-[#ED008C]/25 shadow-xs' 
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80'
                          }`}
                        >
                          {isSelected && (
                            <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#ED008C] text-white flex items-center justify-center text-[10px]">
                              <Check size={10} strokeWidth={3} />
                            </span>
                          )}
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl mb-1.5">
                            {item.emoji}
                          </div>
                          <span className="text-[11px] sm:text-xs font-bold text-slate-800 line-clamp-1">
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Big Bottom Action Button */}
                  <div className="mt-5 space-y-2">
                    <button
                      onClick={() => setStep('results')}
                      className="w-full py-3 px-5 rounded-xl font-heading font-bold text-sm text-white bg-[#ED008C] hover:bg-[#d0007b] active:scale-98 shadow-md shadow-[#ED008C]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Search size={16} />
                      <span>Find Gifts</span>
                    </button>

                    <div className="text-center">
                      <button
                        onClick={() => {
                          setInterests([]);
                          setStep('results');
                        }}
                        className="text-xs font-semibold text-[#ED008C] hover:underline cursor-pointer"
                      >
                        Surprise me →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ----------------- STEP 5: RESULTS SCREEN (Suitable gifts found!) ----------------- */}
          {step === 'results' && (
            <div className="space-y-5">
              {/* Joy Header Summary */}
              <div className="bg-gradient-to-r from-pink-50 via-white to-pink-50/50 rounded-2xl p-4 sm:p-5 border border-pink-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <JoyMascot size={46} animated={false} className="shrink-0" />
                  <div>
                    <h4 className="font-heading font-black text-base sm:text-lg text-[#2D3094]">
                      Woohoo! Joy found {matchedGifts.length} suitable gifts
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Personalized recommendations based on your preferences
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setStep('interests')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:border-[#ED008C] hover:text-[#ED008C] transition-colors cursor-pointer shadow-xs"
                >
                  <SlidersHorizontal size={13} />
                  <span>Modify Answers</span>
                </button>
              </div>

              {/* Chosen Filters Chips */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-slate-500 font-medium">Selected:</span>
                {recipient && (
                  <span className="px-2.5 py-1 rounded-full bg-pink-100/80 text-[#ED008C] font-semibold text-[11px]">
                    For: {recipient}
                  </span>
                )}
                {occasion && (
                  <span className="px-2.5 py-1 rounded-full bg-blue-100/70 text-blue-900 font-semibold text-[11px]">
                    Occasion: {occasion}
                  </span>
                )}
                {budget && (
                  <span className="px-2.5 py-1 rounded-full bg-amber-100/70 text-amber-900 font-semibold text-[11px]">
                    Budget: {BUDGET_OPTIONS.find(b => b.id === budget)?.label}
                  </span>
                )}
                {interests.length > 0 && (
                  <span className="px-2.5 py-1 rounded-full bg-purple-100/70 text-purple-900 font-semibold text-[11px]">
                    {interests.length} Interest{interests.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>

              {/* Matched Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {matchedGifts.slice(0, 18).map(({ product, matchScore, matchReason }) => {
                  const priceUGX = getPriceUGX(product);
                  const priceUSD = getPriceUSD(product);
                  const displayPrice = currency === 'USD' ? `$${priceUSD}` : `UGX ${(priceUGX || 0).toLocaleString()}`;

                  return (
                    <div 
                      key={product.id}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-[#2D3094]/30 transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Image & Match Badge */}
                        <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            loading="lazy"
                          />
                          <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#ED008C] text-white shadow-xs">
                              ★ {matchScore}% Match
                            </span>
                            {product.badge && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#2D3094] text-white shadow-xs">
                                {product.badge}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-3">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-[#2D3094] block mb-0.5">
                            {product.category}
                          </span>
                          <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 leading-snug">
                            {product.name}
                          </h4>
                          <p className="text-[10px] text-pink-700 font-medium mt-1 line-clamp-1 bg-pink-50 px-1.5 py-0.5 rounded">
                            {matchReason}
                          </p>
                          <div className="mt-2 font-heading font-black text-sm sm:text-base text-slate-950">
                            {displayPrice}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="p-3 pt-0 space-y-1.5">
                        <div className="flex gap-1.5">
                          {/* BUY NOW Button */}
                          <button
                            onClick={() => {
                              onClose();
                              if (navigate) {
                                navigate('product', product.id);
                              } else {
                                onOpenCustomizer(product);
                              }
                            }}
                            className="flex-1 py-2 px-3 bg-[#2D3094] hover:bg-[#20236e] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <span>BUY NOW</span>
                            <ArrowRight size={12} />
                          </button>

                          {/* Add to cart */}
                          {onAddToCart && (
                            <button
                              onClick={() => {
                                onAddToCart({
                                  product,
                                  quantity: 1,
                                  customization: {
                                    text: `Gift for ${recipient || 'Loved One'}`
                                  }
                                });
                              }}
                              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                              title="Add to Cart"
                            >
                              <ShoppingBag size={14} />
                            </button>
                          )}
                        </div>

                        {/* Order Via WhatsApp */}
                        <a
                          href={generateWhatsAppOrderLink(product)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-1.5 px-3 bg-[#25D366] hover:bg-[#1ebd5a] text-white rounded-xl text-[11px] font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <WhatsAppIcon size={14} />
                          <span>Order Via WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom footer bar */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <p className="text-xs text-slate-500">
                  Can't find the exact item? Browse our full 280+ product catalog in the shop.
                </p>
                {onApplyToShop && (
                  <button
                    onClick={() => {
                      onApplyToShop(recipient === 'Colleague / Boss' ? 'Corporate Gifts' : 'Personalised Gifts', recipient || '');
                      onClose();
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#2D3094] bg-[#2D3094]/10 hover:bg-[#2D3094]/20 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    View All in Main Shop →
                  </button>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
