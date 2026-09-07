import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  UploadCloud, 
  CheckCircle2, 
  FileText, 
  ShieldCheck,
  Percent
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { View, Currency } from '../types';
import { SERVICES_DATA, EXCHANGE_RATE_USD_TO_UGX } from '../data/mockData';
import { ScrollReveal } from '../components/ScrollReveal';

interface QuotePageProps {
  navigate?: (view: View, param?: string) => void;
  currency: Currency;
}

export const QuotePage: React.FC<QuotePageProps> = ({ currency }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES_DATA[0].id);
  const [productType, setProductType] = useState<string>('Business Cards (Embossed & Foil Stamped)');
  const [quantity, setQuantity] = useState<number>(500);
  const [paperWeight, setPaperWeight] = useState<string>('350gsm Premium Artboard');
  const [finishing, setFinishing] = useState<string>('Matte Lamination + Raised Gold Foil');
  const [turnaround, setTurnaround] = useState<string>('standard');
  const [deliveryLocation, setDeliveryLocation] = useState<string>('kampala');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');

  // Customer contact details
  const [contactName, setContactName] = useState<string>('');
  const [contactCompany, setContactCompany] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [isQuoteSubmitted, setIsQuoteSubmitted] = useState<boolean>(false);
  const [generatedRfqId, setGeneratedRfqId] = useState<string>('');

  const currentService = SERVICES_DATA.find(s => s.id === selectedServiceId) || SERVICES_DATA[0];

  // Dynamic calculation logic
  const calculation = useMemo(() => {
    let unitBaseUGX = 350;
    if (selectedServiceId === 'offset-printing') unitBaseUGX = 280;
    else if (selectedServiceId === 'digital-printing') unitBaseUGX = 650;
    else if (selectedServiceId === 'corporate-branding') unitBaseUGX = 85000;
    else if (selectedServiceId === 'event-branding') unitBaseUGX = 45000;
    else if (selectedServiceId === 'customised-gifts') unitBaseUGX = 25000;
    else if (selectedServiceId === 'general-supplies') unitBaseUGX = 15000;
    else if (selectedServiceId === 'graphics-designing') unitBaseUGX = 150000;

    // Quantity scale factor (bulk discounts)
    let bulkDiscount = 0;
    if (quantity >= 5000) bulkDiscount = 0.25;
    else if (quantity >= 2000) bulkDiscount = 0.18;
    else if (quantity >= 1000) bulkDiscount = 0.12;
    else if (quantity >= 500) bulkDiscount = 0.05;

    // Finishing surcharge
    let finishingMultiplier = 1.0;
    if (finishing.includes('Gold Foil') || finishing.includes('Spot UV')) finishingMultiplier = 1.25;
    else if (finishing.includes('Laser Engraved')) finishingMultiplier = 1.20;
    else if (finishing.includes('Hardcover')) finishingMultiplier = 1.35;

    // Speed surcharge
    let speedSurchargeUGX = 0;
    if (turnaround === 'express') speedSurchargeUGX = 40000;
    if (turnaround === 'rush') speedSurchargeUGX = 90000;

    // Delivery fee
    let deliveryFeeUGX = 10000;
    if (deliveryLocation === 'wakiso-entebbe') deliveryFeeUGX = 25000;
    else if (deliveryLocation === 'jinja') deliveryFeeUGX = 35000;
    else if (deliveryLocation === 'upcountry') deliveryFeeUGX = 50000;
    else if (deliveryLocation === 'pickup') deliveryFeeUGX = 0;

    const baseProductionUGX = Math.round(quantity * unitBaseUGX * (1 - bulkDiscount) * finishingMultiplier);
    const subtotalUGX = baseProductionUGX + speedSurchargeUGX;
    const totalUGX = subtotalUGX + deliveryFeeUGX;
    const totalUSD = Math.round(totalUGX / EXCHANGE_RATE_USD_TO_UGX);
    const unitPriceUGX = Math.round(totalUGX / quantity);

    return {
      bulkDiscountPercent: Math.round(bulkDiscount * 100),
      baseProductionUGX,
      speedSurchargeUGX,
      deliveryFeeUGX,
      totalUGX,
      totalUSD,
      unitPriceUGX
    };
  }, [selectedServiceId, quantity, finishing, turnaround, deliveryLocation]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleGenerateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const rfqNumber = `RFQ-SOZY-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedRfqId(rfqNumber);
    setIsQuoteSubmitted(true);
  };

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen py-12 px-4 md:px-8 font-sans text-left">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Page Hero */}
        <ScrollReveal yOffset={30} duration={0.8}>
          <div className="bg-[#181B34] text-white rounded-3xl p-8 md:p-14 relative overflow-hidden shadow-2xl border border-white/10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#ED008C]/15 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="max-w-3xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-black uppercase tracking-wider mb-4 backdrop-blur-md">
                <span>Transparent & Instant Estimation Engine</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-heading font-black tracking-tight leading-tight mb-4">
                Instant Commercial Quote & <br />
                <span className="text-[#ED008C]">Formal RFQ Generator.</span>
              </h1>
              <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed">
                Calculate instant estimates with bulk volume discount algorithms, configure pre-press finishing specifications, and submit your Local Purchase Order (LPO) or direct production request.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Main 2-Column Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Spec Configuration Form (lg:col-span-7) */}
          <ScrollReveal direction="left" duration={0.8} className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-xl space-y-8">
              
              {/* Step 1: Select Service */}
              <div>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#2D3094] mb-3">
                  <span className="w-5 h-5 rounded-full bg-[#2D3094] text-white flex items-center justify-center text-[10px]">1</span>
                  <span>Select Primary Service Department</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {SERVICES_DATA.map((srv) => (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => {
                        setSelectedServiceId(srv.id);
                        if (srv.popularProducts[0]) setProductType(srv.popularProducts[0]);
                      }}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all text-left ${
                        selectedServiceId === srv.id
                          ? 'bg-[#2D3094] border-[#2D3094] text-white shadow-md'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-[10px] opacity-70 mb-0.5">{srv.number}</div>
                      <div className="line-clamp-1">{srv.title}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Specific Deliverable */}
              <div>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#2D3094] mb-3">
                  <span className="w-5 h-5 rounded-full bg-[#2D3094] text-white flex items-center justify-center text-[10px]">2</span>
                  <span>Select Deliverable / Product Type</span>
                </div>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 outline-none focus:border-[#2D3094] focus:bg-white font-medium"
                >
                  {currentService.popularProducts.map((prod, idx) => (
                    <option key={idx} value={prod}>{prod}</option>
                  ))}
                </select>
              </div>

              {/* Step 3: Quantity Slider & Presets */}
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-black uppercase tracking-wider text-[#2D3094] mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#2D3094] text-white flex items-center justify-center text-[10px]">3</span>
                    <span>Order Quantity</span>
                  </div>
                  <div className="text-sm font-heading font-black text-[#ED008C]">
                    {quantity.toLocaleString()} Units
                  </div>
                </div>

                <input
                  type="range"
                  min={50}
                  max={10000}
                  step={50}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#ED008C] mb-3"
                />

                <div className="flex flex-wrap gap-2">
                  {[100, 250, 500, 1000, 2500, 5000, 10000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setQuantity(preset)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        quantity === preset
                          ? 'bg-[#ED008C] text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {preset.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Paper Stock & Finishing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Material / Paper Weight
                  </label>
                  <select
                    value={paperWeight}
                    onChange={(e) => setPaperWeight(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 outline-none focus:border-[#2D3094] focus:bg-white"
                  >
                    <option>130gsm Gloss Artpaper (Flyers / Inserts)</option>
                    <option>170gsm Silk Text (Brochures / Catalogues)</option>
                    <option>300gsm Premium Ivory Board</option>
                    <option>350gsm Premium Artboard (Cards / Covers)</option>
                    <option>450gsm Soft-Touch Velvet Duplex</option>
                    <option>Food-Grade Kraft Paper / Corrugated Box</option>
                    <option>Cast Vinyl with UV Weatherproof Coating</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Finishing & Embellishment
                  </label>
                  <select
                    value={finishing}
                    onChange={(e) => setFinishing(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 outline-none focus:border-[#2D3094] focus:bg-white"
                  >
                    <option>Standard Matte Lamination</option>
                    <option>High-Gloss Lamination</option>
                    <option>Matte Lamination + Raised Gold Foil</option>
                    <option>Matte Lamination + Spot UV 3D Varnish</option>
                    <option>Blind Debossing / Embossing</option>
                    <option>Precision Die-Cut Shape</option>
                    <option>Hardcover Wire-O or Smyth-Sewn Bound</option>
                  </select>
                </div>
              </div>

              {/* Step 5: Turnaround & Logistics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Production Speed
                  </label>
                  <select
                    value={turnaround}
                    onChange={(e) => setTurnaround(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 outline-none focus:border-[#2D3094] focus:bg-white"
                  >
                    <option value="standard">Standard Production (3 - 5 Days)</option>
                    <option value="express">Express Priority (24 - 48 Hours)</option>
                    <option value="rush">Emergency Rush (Same Day / 24 Hours)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Delivery Destination
                  </label>
                  <select
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 outline-none focus:border-[#2D3094] focus:bg-white"
                  >
                    <option value="kampala">Kampala Central & Suburbs (Doorstep)</option>
                    <option value="wakiso-entebbe">Wakiso / Entebbe Municipalities</option>
                    <option value="jinja">Jinja City & Eastern Corridor</option>
                    <option value="upcountry">Regional Upcountry (Mbarara, Gulu, etc.)</option>
                    <option value="pickup">Self Pick-up at Nkrumah Road Studio (Free)</option>
                  </select>
                </div>
              </div>

              {/* Step 6: Artwork Upload Simulation */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Artwork Status & Upload
                </label>
                <div className="p-4 border-2 border-dashed border-slate-200 hover:border-[#2D3094] rounded-2xl text-center bg-slate-50 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <UploadCloud size={28} className="mx-auto text-slate-400 mb-1.5" />
                  <div className="text-xs font-bold text-slate-800">
                    {uploadedFileName ? `Attached: ${uploadedFileName}` : 'Click or Drag & Drop Artwork Files (PDF, AI, EPS, ZIP)'}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Vector CMYK 300 DPI recommended with 3mm bleed margin.
                  </p>
                </div>
              </div>

            </div>
          </ScrollReveal>

          {/* Right Column: Live Instant Quote Summary & RFQ Submission (lg:col-span-5) */}
          <ScrollReveal direction="right" duration={0.8} className="lg:col-span-5 space-y-6 sticky top-24">
            
            {/* Live Pricing Breakdown Card */}
            <div className="bg-gradient-to-br from-[#181B34] to-[#2D3094] text-white rounded-3xl p-6 md:p-8 border border-white/15 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="inline-flex items-center gap-2 text-xs font-heading font-black uppercase tracking-wider text-[#ED008C]">
                  <Calculator size={16} />
                  <span>Instant Estimate</span>
                </div>
                {calculation.bulkDiscountPercent > 0 && (
                  <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Percent size={10} /> -{calculation.bulkDiscountPercent}% Bulk Tier
                  </span>
                )}
              </div>

              {/* Total Figure */}
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                  Estimated Total ({currency}):
                </div>
                <div className="text-3xl md:text-4xl font-heading font-black text-white leading-none mb-1">
                  {currency === 'UGX' 
                    ? `UGX ${calculation.totalUGX.toLocaleString()}`
                    : `$${calculation.totalUSD.toLocaleString()}`
                  }
                </div>
                <div className="text-xs text-slate-300">
                  Approx. {currency === 'UGX' ? `UGX ${calculation.unitPriceUGX.toLocaleString()}` : `$${(calculation.totalUSD / quantity).toFixed(2)}`} per finished unit
                </div>
              </div>

              {/* Breakdown Rows */}
              <div className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-white/10">
                <div className="flex justify-between">
                  <span>Selected Service:</span>
                  <span className="font-bold text-white text-right">{currentService.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Deliverable:</span>
                  <span className="font-bold text-white text-right max-w-[200px] truncate">{productType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span className="font-bold text-white">{quantity.toLocaleString()} pcs</span>
                </div>
                <div className="flex justify-between">
                  <span>Finishing Spec:</span>
                  <span className="font-bold text-white text-right max-w-[200px] truncate">{finishing}</span>
                </div>
                <div className="flex justify-between">
                  <span>Est. Turnaround:</span>
                  <span className="font-bold text-white capitalize">{turnaround} Production</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery:</span>
                  <span className="font-bold text-white">
                    {calculation.deliveryFeeUGX === 0 ? 'Free Pick-up' : `UGX ${calculation.deliveryFeeUGX.toLocaleString()}`}
                  </span>
                </div>
              </div>

              {/* Guarantee */}
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 flex items-center gap-2.5 text-[11px] text-slate-200">
                <ShieldCheck size={16} className="text-[#ED008C] shrink-0" />
                <span>Price includes German Heidelberg color proofing and high-resolution pre-flight check.</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href={`https://wa.me/256787662183?text=Hello%20Sozy%20Impressions!%20I%20generated%20a%20quote%20for%20${quantity}%20units%20of%20${encodeURIComponent(productType)}%20with%20${encodeURIComponent(finishing)}.%20Est.%20Price:%20UGX%20${calculation.totalUGX.toLocaleString()}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20b858] text-white font-heading font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  <WhatsAppIcon size={18} />
                  <span>Lock In Quote via WhatsApp</span>
                </a>
              </div>

            </div>

            {/* Official RFQ Submission Form */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md space-y-4">
              <h4 className="font-heading font-black text-sm text-slate-900 uppercase tracking-wider">
                Submit Formal RFQ for Corporate Procurement
              </h4>
              
              {isQuoteSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-center space-y-2">
                  <CheckCircle2 size={28} className="mx-auto text-emerald-600" />
                  <div className="font-heading font-bold text-xs">RFQ Transmitted Successfully!</div>
                  <div className="text-[11px] font-mono bg-white px-3 py-1.5 rounded-lg border border-emerald-200 text-emerald-950 font-bold inline-block">
                    {generatedRfqId}
                  </div>
                  <p className="text-[10px] text-emerald-700">
                    A formal stamped PDF quote with URA TIN invoice details will be dispatched to {contactEmail || 'your email'}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleGenerateQuote} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Contact Name *"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-[#2D3094]"
                  />
                  <input
                    type="text"
                    placeholder="Company / Organization"
                    value={contactCompany}
                    onChange={(e) => setContactCompany(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-[#2D3094]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Official Email *"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-[#2D3094]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone (WhatsApp) *"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-[#2D3094]"
                  />
                  <textarea
                    rows={2}
                    placeholder="Special instructions or LPO number..."
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-[#2D3094] resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#2D3094] hover:bg-[#1f2168] text-white font-heading font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <FileText size={15} />
                    <span>Submit & Request Formal Proforma</span>
                  </button>
                </form>
              )}

            </div>

          </ScrollReveal>

        </div>

      </div>
    </div>
  );
};
