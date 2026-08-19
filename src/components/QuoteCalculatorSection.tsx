import React, { useState, useRef } from 'react';
import { 
  Calculator, 
  Send, 
  CheckCircle2, 
  Upload, 
  MessageSquare, 
  ShieldCheck
} from 'lucide-react';
import { Currency, QuoteRequest } from '../types';
import { SERVICES_DATA, DELIVERY_ZONES } from '../data/mockData';

interface QuoteCalculatorSectionProps {
  currency: Currency;
  onQuoteSubmitted?: (quote: QuoteRequest) => void;
}

const createQuoteId = () => `SOZY-Q2026-${Date.now().toString().slice(-4)}`;

export const QuoteCalculatorSection: React.FC<QuoteCalculatorSectionProps> = ({
  currency,
  onQuoteSubmitted
}) => {
  // Calculator Form State
  const [selectedServiceId, setSelectedServiceId] = useState<string>('offset-printing');
  const [selectedProduct, setSelectedProduct] = useState<string>('Business Cards (Embossed & Foil Stamped)');
  const [quantity, setQuantity] = useState<number>(250);
  const [selectedFinishing, setSelectedFinishing] = useState<string[]>(['Soft-Touch Matte Lamination']);
  const [isExpress, setIsExpress] = useState<boolean>(false);
  const [selectedZoneId, setSelectedZoneId] = useState<string>('zone-kla-central');

  // Lead Submission Form State
  const [fullName, setFullName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [deadline] = useState<string>('');
  const [budgetRange] = useState<string>('UGX 500K - UGX 2M');
  const [notes, setNotes] = useState<string>('');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedQuoteResult, setSubmittedQuoteResult] = useState<QuoteRequest | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active Service
  const activeService = SERVICES_DATA.find(s => s.id === selectedServiceId) || SERVICES_DATA[0];
  const activeZone = DELIVERY_ZONES.find(z => z.id === selectedZoneId) || DELIVERY_ZONES[0];

  // Base unit rates per service in UGX
  const getBaseRatePerUnit = (serviceId: string) => {
    switch (serviceId) {
      case 'offset-printing': return 450;
      case 'digital-printing': return 1200;
      case 'corporate-branding': return 150000;
      case 'event-branding': return 85000;
      case 'customised-gifts': return 28000;
      case 'general-supplies': return 18000;
      case 'graphics-designing': return 120000;
      default: return 5000;
    }
  };

  // Calculate estimated price
  const baseRate = getBaseRatePerUnit(selectedServiceId);
  const bulkDiscountMultiplier = quantity >= 1000 ? 0.75 : quantity >= 500 ? 0.85 : quantity >= 250 ? 0.92 : 1.0;
  
  // Calculate finishing additions
  const finishingCost = selectedFinishing.length * (selectedServiceId === 'corporate-branding' ? 50000 : 35000);
  const expressSurcharge = isExpress ? 0.20 : 0; // +20% for 24h express

  const estimatedTotalBeforeDeliveryUGX = Math.round(
    ((baseRate * (selectedServiceId === 'corporate-branding' || selectedServiceId === 'graphics-designing' ? 1 : quantity)) * bulkDiscountMultiplier + finishingCost) * (1 + expressSurcharge)
  );

  const deliveryFeeUGX = activeZone.feeUGX;
  const grandTotalUGX = estimatedTotalBeforeDeliveryUGX + deliveryFeeUGX;
  
  const grandTotalUSD = Number((grandTotalUGX / 3800).toFixed(2));
  const estimatedTotalBeforeDeliveryUSD = Number((estimatedTotalBeforeDeliveryUGX / 3800).toFixed(2));

  // Toggle Finishing
  const toggleFinishing = (item: string) => {
    if (selectedFinishing.includes(item)) {
      setSelectedFinishing(selectedFinishing.filter(f => f !== item));
    } else {
      setSelectedFinishing([...selectedFinishing, item]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    setIsSubmitting(true);
    const newEnquiryId = createQuoteId();

    const newQuote: QuoteRequest = {
      id: newEnquiryId,
      fullName,
      companyName: companyName || 'Individual / SME',
      email,
      phone,
      serviceId: selectedServiceId,
      product: selectedProduct,
      quantity,
      specifications: {
        'Service': activeService.title,
        'Finishing Options': selectedFinishing.join(', ') || 'Standard',
        'Express Turnaround': isExpress ? '24h Express Required' : 'Standard Turnaround',
        'Delivery Destination': activeZone.name
      },
      deadline: deadline || 'Within 5 Business Days',
      estimatedBudget: budgetRange,
      artworkUrl: uploadedFileName ? `https://storage.sozyimpressions.com/${uploadedFileName}` : undefined,
      notes,
      estimatedPriceUGX: grandTotalUGX,
      estimatedPriceUSD: grandTotalUSD,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedQuoteResult(newQuote);
      if (onQuoteSubmitted) {
        onQuoteSubmitted(newQuote);
      }
    }, 800);
  };

  const handleSendToWhatsApp = () => {
    if (!submittedQuoteResult) return;
    const message = `Hello Sozy Impressions Sales! I just submitted an Official Quote Request:
- Enquiry ID: ${submittedQuoteResult.id}
- Client: ${submittedQuoteResult.fullName} (${submittedQuoteResult.companyName})
- Service: ${activeService.title} - ${selectedProduct}
- Quantity: ${quantity} units
- Finishing: ${selectedFinishing.join(', ') || 'Standard'}
- Destination: ${activeZone.name}
- Estimated Total: ${currency === 'UGX' ? `UGX ${grandTotalUGX.toLocaleString()}` : `$${grandTotalUSD}`}

Please review my artwork and reply with the official signed PDF invoice!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/256787662183?text=${encoded}`, '_blank');
  };

  return (
    <section id="quote-calculator" className="py-20 px-4 md:px-8 bg-white border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2D3094]/10 text-[#2D3094] text-xs font-black uppercase tracking-wider mb-3">
            <Calculator size={14} className="text-[#ED008C]" />
            <span>Instant Cost Estimator & RFQ Engine</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-[#121212] tracking-tight leading-tight">
            Smart Project Calculator & <br />
            <span className="text-[#2D3094]">Request an Official Quote.</span>
          </h2>
          <p className="text-base text-slate-600 mt-3 font-normal leading-relaxed">
            Estimate your commercial printing and branding costs in real time. Submit your specs for an itemized official PDF quote within 60 minutes during business hours.
          </p>
        </div>

        {/* Success Modal / Result View */}
        {submittedQuoteResult ? (
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#F7F8FA] to-white rounded-3xl p-8 md:p-12 border-2 border-emerald-500 shadow-2xl text-left animate-in zoom-in-95 duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                <CheckCircle2 size={32} />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Enquiry Successfully Dispatched!
                </span>
                <h3 className="text-2xl font-heading font-black text-slate-900 leading-tight">
                  Quote ID: {submittedQuoteResult.id}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Thank you, <strong className="text-slate-900">{submittedQuoteResult.fullName}</strong>. Your project specifications have been assigned to a senior pre-press estimator at Sozy Impressions Ltd.
            </p>

            {/* Breakdown Summary Box */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3 text-xs mb-8">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Service & Deliverable:</span>
                <span className="font-bold text-slate-900">{activeService.title} — {selectedProduct}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Quantity:</span>
                <span className="font-bold text-slate-900">{quantity} units</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Delivery Destination:</span>
                <span className="font-bold text-slate-900">{activeZone.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Finishing Specifications:</span>
                <span className="font-bold text-slate-900">{selectedFinishing.join(', ') || 'Standard'}</span>
              </div>
              <div className="flex justify-between pt-2 text-sm font-heading font-black text-[#2D3094]">
                <span>Estimated Valuation:</span>
                <span>
                  {currency === 'UGX' ? `UGX ${grandTotalUGX.toLocaleString()}` : `$${grandTotalUSD}`}
                </span>
              </div>
            </div>

            {/* Instant Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleSendToWhatsApp}
                className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105"
              >
                <MessageSquare size={16} />
                <span>Send to WhatsApp for Instant Approval</span>
              </button>

              <button
                onClick={() => setSubmittedQuoteResult(null)}
                className="w-full sm:w-auto border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-full transition-all"
              >
                Calculate Another Quote
              </button>
            </div>
          </div>
        ) : (
          /* Main Interactive 2-Column Calculator */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
            
            {/* Column 1: Step-by-Step Configuration (lg:col-span-7) */}
            <div className="lg:col-span-7 bg-[#F7F8FA] rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <div className="text-[10px] font-black uppercase tracking-widest text-[#2D3094] mb-2">
                Step 1: Choose Your Project Parameters
              </div>
              <h3 className="font-heading font-black text-xl text-[#121212] mb-6">
                Configure Deliverables & Quantity
              </h3>

              {/* 1. Select Service Category */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Select Core Service:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SERVICES_DATA.map((srv) => (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => {
                        setSelectedServiceId(srv.id);
                        setSelectedProduct(srv.popularProducts[0]);
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        selectedServiceId === srv.id
                          ? 'bg-[#2D3094] border-[#2D3094] text-white shadow-md'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-[10px] font-black text-[#ED008C]">{srv.number}</div>
                      <div className="text-xs font-bold leading-tight">{srv.title}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Select Specific Product */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  2. Select Item / Deliverable:
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 outline-none focus:border-[#2D3094]"
                >
                  {activeService.popularProducts.map((p, idx) => (
                    <option key={idx} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Quantity Slider */}
              <div className="mb-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    3. Production Quantity:
                  </label>
                  <span className="font-heading font-black text-lg text-[#2D3094]">
                    {quantity.toLocaleString()} units
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={5000}
                  step={10}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#ED008C]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-2">
                  <span>10 pcs (Min)</span>
                  <span>500 pcs (Bulk -15%)</span>
                  <span>1,000 pcs (Bulk -25%)</span>
                  <span>5,000 pcs</span>
                </div>
              </div>

              {/* 4. Finishing Options */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  4. Specialty Finishing & Upgrades:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Soft-Touch Matte Lamination',
                    'Spot UV Gloss Varnish',
                    'Metallic Gold / Silver Foil',
                    'Precision Die-Cut Shape',
                    'Laser Engraving / Sublimation',
                    'Hardcover Wire-O Binding'
                  ].map((finishing) => (
                    <button
                      key={finishing}
                      type="button"
                      onClick={() => toggleFinishing(finishing)}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between ${
                        selectedFinishing.includes(finishing)
                          ? 'border-[#ED008C] bg-[#ED008C]/10 text-[#ED008C]'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span>{finishing}</span>
                      {selectedFinishing.includes(finishing) && <CheckCircle2 size={16} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Delivery Destination */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  5. Delivery Destination in Uganda:
                </label>
                <select
                  value={selectedZoneId}
                  onChange={(e) => setSelectedZoneId(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 outline-none focus:border-[#2D3094]"
                >
                  {DELIVERY_ZONES.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name} ({currency === 'UGX' ? `UGX ${zone.feeUGX.toLocaleString()}` : `$${zone.feeUSD}`}) — {zone.estimatedDays}
                    </option>
                  ))}
                </select>
              </div>

              {/* Express Rush Option */}
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-900 block">
                    ⚡ Need 24h Express Rush Production?
                  </span>
                  <span className="text-[10px] text-amber-700">
                    Prioritizes your job ahead of standard offset queues (+20%).
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={isExpress}
                  onChange={(e) => setIsExpress(e.target.checked)}
                  className="w-5 h-5 accent-[#ED008C] rounded cursor-pointer"
                />
              </div>

            </div>

            {/* Column 2: Live Valuation & RFQ Lead Submission Form (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Live Estimated Valuation Card */}
              <div className="bg-[#181B34] text-white rounded-3xl p-6 md:p-8 border border-white/15 shadow-xl">
                <div className="text-[10px] font-black uppercase tracking-widest text-[#ED008C] mb-2">
                  Live Cost Breakdown
                </div>
                
                <div className="space-y-2.5 text-xs text-slate-300 py-3 border-y border-white/10 my-3">
                  <div className="flex justify-between">
                    <span>Base Production ({quantity} pcs):</span>
                    <span className="font-bold text-white">
                      {currency === 'UGX' ? `UGX ${estimatedTotalBeforeDeliveryUGX.toLocaleString()}` : `$${estimatedTotalBeforeDeliveryUSD}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Finishing & Upgrades:</span>
                    <span className="font-bold text-white">
                      {selectedFinishing.length > 0 ? `${selectedFinishing.length} selected` : 'Standard Included'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery ({activeZone.name}):</span>
                    <span className="font-bold text-white">
                      {currency === 'UGX' ? `UGX ${deliveryFeeUGX.toLocaleString()}` : `$${activeZone.feeUSD}`}
                    </span>
                  </div>
                  {isExpress && (
                    <div className="flex justify-between text-amber-400">
                      <span>Express 24h Priority:</span>
                      <span className="font-bold">Included</span>
                    </div>
                  )}
                </div>

                <div className="flex items-baseline justify-between pt-2">
                  <span className="text-xs text-slate-400 font-bold uppercase">Estimated Total:</span>
                  <div className="text-right">
                    <div className="font-heading font-black text-2xl md:text-3xl text-[#ED008C]">
                      {currency === 'UGX' ? `UGX ${grandTotalUGX.toLocaleString()}` : `$${grandTotalUSD}`}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      VAT & Pre-press Proofing Included
                    </div>
                  </div>
                </div>
              </div>

              {/* Official Corporate Lead Request Form */}
              <form onSubmit={handleFormSubmit} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xl">
                <div className="text-[10px] font-black uppercase tracking-widest text-[#2D3094] mb-1">
                  Step 2: Submit for Official Signed PDF Quote
                </div>
                <h3 className="font-heading font-black text-lg text-slate-900 mb-4">
                  Corporate Information
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Isaac Mugerwa"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2D3094] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Standard Chartered Bank / Xani Foods"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2D3094] focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="isaac@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2D3094] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+256 709 390 168"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2D3094] focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Artwork / Logo Upload */}
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Upload Artwork / Specs (Optional)
                    </label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full bg-slate-50 border border-dashed border-slate-300 hover:border-[#2D3094] rounded-xl p-3 text-center text-slate-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Upload size={16} />
                      <span className="font-bold truncate">
                        {uploadedFileName ? uploadedFileName : 'Attach AI, PDF, EPS, or ZIP File'}
                      </span>
                    </button>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Special Production Instructions
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Specify PMS pantone codes, binding preferences, or custom requirements..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#2D3094] focus:bg-white resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-5 bg-[#ED008C] hover:bg-[#d4007d] text-white font-heading font-bold text-xs uppercase tracking-wider py-4 rounded-full shadow-lg shadow-[#ED008C]/25 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Generating Official RFQ...</span>
                  ) : (
                    <>
                      <span>Submit Official Quote Request</span>
                      <Send size={14} />
                    </>
                  )}
                </button>

                <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-slate-500 text-center">
                  <ShieldCheck size={12} className="text-emerald-500" />
                  <span>We sign NDAs & adhere to strict data confidentiality</span>
                </div>
              </form>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
