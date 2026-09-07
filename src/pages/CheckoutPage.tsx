import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquare, 
  ShoppingBag, 
  ChevronRight, 
  Building, 
  Lock, 
  Trash2, 
  Plus, 
  Minus, 
  Store, 
  ArrowRight
} from 'lucide-react';
import { View, Currency, CartItem, Order } from '../types';
import { DELIVERY_ZONES, PAYMENT_LOGOS } from '../data/mockData';

interface CheckoutPageProps {
  cart: CartItem[];
  currency: Currency;
  navigate: (view: View, param?: string) => void;
  onUpdateCartQuantity: (index: number, newQty: number) => void;
  onRemoveCartItem: (index: number) => void;
  onClearCart: () => void;
  onOrderCompleted: (order: Order) => void;
  showToast?: (msg: string) => void;
}

const generateOrderId = () => `SOZY-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cart,
  currency,
  navigate,
  onUpdateCartQuantity,
  onRemoveCartItem,
  onClearCart,
  onOrderCompleted,
  showToast
}) => {
  // Customer Details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+256 ');
  const [companyName, setCompanyName] = useState('');

  // Delivery Details
  const [selectedZoneId, setSelectedZoneId] = useState<string>('zone-kla-central');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Payment Details
  const [paymentMethod, setPaymentMethod] = useState<'mtn_momo' | 'airtel_money' | 'card' | 'bank_transfer' | 'cash_on_delivery'>('mtn_momo');
  const [momoPhone, setMomoPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Artwork & Proofing
  const [artworkOption, setArtworkOption] = useState<'attached' | 'whatsapp' | 'design_help'>('attached');

  // Promo Code
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Derived Calculations
  const activeZone = DELIVERY_ZONES.find(z => z.id === selectedZoneId) || DELIVERY_ZONES[0];
  
  const itemsSubtotalUGX = cart.reduce((sum, item) => sum + (item.subtotalUGX || (item.unitPriceUGX || item.product.priceUGX) * item.quantity), 0);
  const discountAmountUGX = Math.round(itemsSubtotalUGX * (appliedDiscountPercent / 100));
  const deliveryFeeUGX = activeZone.feeUGX;
  const grandTotalUGX = itemsSubtotalUGX - discountAmountUGX + deliveryFeeUGX;

  const itemsSubtotalUSD = Number((itemsSubtotalUGX / 3800).toFixed(2));
  const discountAmountUSD = Number((discountAmountUGX / 3800).toFixed(2));
  const deliveryFeeUSD = activeZone.feeUSD;
  const grandTotalUSD = Number((grandTotalUGX / 3800).toFixed(2));

  // Handle Promo Code Validation
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    if (!promoCode.trim()) return;

    if (promoCode.trim().toUpperCase() === 'SOZY10' || promoCode.trim().toUpperCase() === 'KAMPALA10') {
      setAppliedDiscountPercent(10);
      if (showToast) showToast('Promo code applied: 10% Discount!');
    } else if (promoCode.trim().toUpperCase() === 'VIP20') {
      setAppliedDiscountPercent(20);
      if (showToast) showToast('VIP promo code applied: 20% Discount!');
    } else {
      setPromoError('Invalid promo code. Use "SOZY10" for 10% off your order.');
    }
  };

  // Handle Order Placement
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !deliveryAddress.trim()) {
      if (showToast) showToast('Please complete all required fields (Name, Email, Phone, Address).');
      return;
    }

    if (!agreedTerms) {
      if (showToast) showToast('Please accept the production & proofing terms to proceed.');
      return;
    }

    setIsSubmitting(true);
    const orderId = generateOrderId();

    const newOrder: Order = {
      id: orderId,
      customerName: fullName,
      companyName: companyName || undefined,
      email,
      phone,
      deliveryAddress: `${deliveryAddress}, ${activeZone.name}`,
      deliveryZoneId: selectedZoneId,
      items: [...cart],
      subtotalUGX: itemsSubtotalUGX - discountAmountUGX,
      deliveryFeeUGX,
      totalUGX: grandTotalUGX,
      subtotalUSD: itemsSubtotalUSD - discountAmountUSD,
      deliveryFeeUSD,
      totalUSD: grandTotalUSD,
      paymentMethod,
      paymentStatus: paymentMethod === 'cash_on_delivery' ? 'pending' : 'paid',
      orderStatus: 'received',
      proofStatus: 'pending',
      notes: deliveryNotes ? `Delivery note: ${deliveryNotes} | Artwork: ${artworkOption}` : `Artwork: ${artworkOption}`,
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setCompletedOrder(newOrder);
      onOrderCompleted(newOrder);
      onClearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  // Send Order to WhatsApp
  const handleSendOrderToWhatsApp = () => {
    if (!completedOrder) return;
    const itemsText = completedOrder.items.map(it => 
      `- ${it.quantity}x ${it.product.name} (${it.selectedColor || it.customization?.color || 'Standard'}) ${it.customText ? `[Text: "${it.customText}"]` : ''}`
    ).join('\n');

    const message = `Hello Sozy Impressions! I just completed Order #${completedOrder.id}:
Customer: ${completedOrder.customerName} (${completedOrder.companyName || 'Individual'})
Phone: ${completedOrder.phone}
Delivery: ${completedOrder.deliveryAddress}
Items:
${itemsText}
Subtotal: ${currency === 'UGX' ? `UGX ${completedOrder.subtotalUGX.toLocaleString()}` : `$${completedOrder.subtotalUSD}`}
Delivery Fee: ${currency === 'UGX' ? `UGX ${completedOrder.deliveryFeeUGX.toLocaleString()}` : `$${completedOrder.deliveryFeeUSD}`}
Grand Total: ${currency === 'UGX' ? `UGX ${completedOrder.totalUGX.toLocaleString()}` : `$${completedOrder.totalUSD}`}
Payment Method: ${completedOrder.paymentMethod}

Please share the digital proof for my confirmation!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/256787662183?text=${encoded}`, '_blank');
  };

  // 1. If Order is Completed: Show Full Confirmation Screen
  if (completedOrder) {
    return (
      <div className="w-full bg-[#F7F8FA] min-h-screen text-slate-900 pb-20">
        
        {/* Header Bar */}
        <div className="bg-white border-b border-slate-200/80 sticky top-0 z-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <span className="font-heading font-black text-lg text-[#2D3094]">
              Sozy Impressions Ltd
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>Order Received Successfully</span>
            </span>
          </div>
        </div>

        {/* Confirmation Container */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 text-center">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} />
            </div>

            <span className="text-xs font-bold text-[#2D3094] uppercase tracking-wider block mb-1">
              Official Purchase Confirmation
            </span>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 mb-2">
              Thank You for Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mb-6">
              Your order has been registered in our Kampala production pipeline. Our pre-press design desk is now preparing your 3D digital artwork proof for review.
            </p>

            {/* Order Meta Box */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left mb-8 max-w-xl mx-auto space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Order Number:</span>
                <span className="font-black text-[#2D3094]">{completedOrder.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Customer:</span>
                <span className="font-bold text-slate-900">{completedOrder.customerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Delivery Destination:</span>
                <span className="font-bold text-slate-900 text-right">{completedOrder.deliveryAddress}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Estimated Delivery:</span>
                <span className="font-bold text-emerald-700">{activeZone.estimatedDays}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500 font-medium">Total Paid / Due:</span>
                <span className="font-black text-slate-900 text-sm">
                  {currency === 'UGX' ? `UGX ${completedOrder.totalUGX.toLocaleString()}` : `$${completedOrder.totalUSD}`}
                </span>
              </div>
            </div>

            {/* Next Steps Visual Bar */}
            <div className="mb-8 max-w-xl mx-auto text-left">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-3">
                Production & Delivery Roadmap:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-[#2D3094] block">1. Proof Approval</span>
                  <span className="text-slate-500 text-[11px]">Sent to WhatsApp/Email within 2–4 hours</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-[#2D3094] block">2. Studio Fabrication</span>
                  <span className="text-slate-500 text-[11px]">Laser engraving & UV curing</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-[#2D3094] block">3. Courier Dispatch</span>
                  <span className="text-slate-500 text-[11px]">Delivered directly to your doorstep</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <button
                onClick={handleSendOrderToWhatsApp}
                className="bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <MessageSquare size={16} />
                <span>Send to WhatsApp Desk</span>
              </button>

              <button
                onClick={() => navigate('account')}
                className="bg-[#2D3094] hover:bg-[#20236e] text-white py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Track Order in Account</span>
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="mt-4">
              <button
                onClick={() => navigate('shop')}
                className="text-xs font-bold text-slate-500 hover:text-[#2D3094] transition-colors"
              >
                ← Return to Shop Catalog
              </button>
            </div>

          </div>
        </div>

      </div>
    );
  }

  // 2. If Cart is Empty: Show Empty State
  if (cart.length === 0) {
    return (
      <div className="w-full bg-[#F7F8FA] min-h-screen text-slate-900 pb-20">
        
        {/* Breadcrumb Bar */}
        <div className="bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
            <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <button onClick={() => navigate('home')} className="hover:text-[#2D3094]">Home</button>
              <ChevronRight size={13} className="text-slate-400" />
              <button onClick={() => navigate('shop')} className="hover:text-[#2D3094]">Shop</button>
              <ChevronRight size={13} className="text-slate-400" />
              <span className="text-slate-900 font-bold">Checkout</span>
            </nav>

            <button
              onClick={() => navigate('shop')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Shop</span>
            </button>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 pt-16 text-center">
          <div className="w-20 h-20 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-5 text-slate-400">
            <ShoppingBag size={36} />
          </div>
          <h2 className="text-2xl font-heading font-black text-slate-900 mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-8 leading-relaxed">
            You haven't added any personalized products or promotional corporate gifts yet. Browse our full catalogue to configure custom items.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('shop')}
              className="bg-[#2D3094] hover:bg-[#20236e] text-white py-3 px-6 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              Explore Shop Catalog
            </button>
            <button
              onClick={() => navigate('bestsellers')}
              className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 py-3 px-6 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              View Best Sellers
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Main Full Checkout Page with Active Cart Items
  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen text-slate-900 pb-24">
      
      {/* Top Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200/80 sticky top-0 z-20 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('shop')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Shop</span>
            </button>
            <div className="h-4 w-px bg-slate-200" />
            <h1 className="text-sm sm:text-base font-heading font-black text-slate-900">
              Secure Checkout & Delivery
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1 font-bold text-emerald-700">
              <Lock size={13} />
              <span>SSL 256-Bit Encrypted</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Checkout Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* LEFT COLUMN: Checkout Form (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Customer Contact Details */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7">
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-[#2D3094] text-white flex items-center justify-center text-xs font-black">
                    1
                  </div>
                  <h2 className="text-sm font-heading font-black text-slate-900 uppercase tracking-wider">
                    Customer Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-700 block mb-1.5">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Grace Namubiru"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-[#2D3094] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1.5">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="grace@company.co.ug"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-[#2D3094] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1.5">
                      Phone Number (WhatsApp) *
                    </label>
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+256 700 000 000"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-[#2D3094] focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-700 block mb-1.5">
                      Company / Organization Name (Optional for invoice)
                    </label>
                    <input 
                      type="text" 
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Stanbic Bank / Ministry of Health / Personal"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-[#2D3094] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Delivery & Shipping Destination */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7">
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-[#2D3094] text-white flex items-center justify-center text-xs font-black">
                    2
                  </div>
                  <h2 className="text-sm font-heading font-black text-slate-900 uppercase tracking-wider">
                    Delivery Destination & Shipping Method
                  </h2>
                </div>

                {/* Delivery Zone Options */}
                <div className="space-y-2.5 mb-5">
                  <label className="font-bold text-slate-700 text-xs block mb-1">
                    Select Shipping Region:
                  </label>
                  {DELIVERY_ZONES.map((zone) => {
                    const isSelected = selectedZoneId === zone.id;
                    const feeDisplay = zone.feeUGX === 0 
                      ? 'FREE' 
                      : currency === 'UGX' ? `UGX ${zone.feeUGX.toLocaleString()}` : `$${zone.feeUSD.toFixed(2)}`;

                    return (
                      <label 
                        key={zone.id}
                        className={`flex items-start justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-[#2D3094]/5 border-[#2D3094] ring-1 ring-[#2D3094]' 
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input 
                            type="radio" 
                            name="deliveryZone" 
                            checked={isSelected}
                            onChange={() => setSelectedZoneId(zone.id)}
                            className="mt-0.5 text-[#2D3094] focus:ring-[#2D3094]"
                          />
                          <div>
                            <span className="font-bold text-xs text-slate-900 block">
                              {zone.name}
                            </span>
                            <span className="text-[11px] text-slate-500 block mt-0.5">
                              Estimated Arrival: <strong className="text-slate-700">{zone.estimatedDays}</strong>
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-black text-[#2D3094] shrink-0">
                          {feeDisplay}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {/* Street Address Input */}
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1.5">
                      Specific Delivery Address / Plot & Landmark *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="e.g. Plot 24 Lumumba Avenue, Nakasero, 4th Floor Reception"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-[#2D3094] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1.5">
                      Delivery Rider Instructions (Optional)
                    </label>
                    <textarea 
                      rows={2}
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      placeholder="e.g. Call upon arrival, leave with building security desk"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-hidden focus:border-[#2D3094] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method Selection */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7">
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-[#2D3094] text-white flex items-center justify-center text-xs font-black">
                    3
                  </div>
                  <h2 className="text-sm font-heading font-black text-slate-900 uppercase tracking-wider">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-3">
                  
                  {/* MTN Mobile Money */}
                  <label 
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'mtn_momo' 
                        ? 'bg-[#2D3094]/5 border-[#2D3094] ring-1 ring-[#2D3094]' 
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        checked={paymentMethod === 'mtn_momo'}
                        onChange={() => setPaymentMethod('mtn_momo')}
                        className="text-[#2D3094] focus:ring-[#2D3094]"
                      />
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">MTN Mobile Money</span>
                        <span className="text-[11px] text-slate-500">Merchant Code: 621830 (Direct Prompt)</span>
                      </div>
                    </div>
                    <img src={PAYMENT_LOGOS.mtn} alt="MTN" className="h-5 w-auto object-contain" referrerPolicy="no-referrer" />
                  </label>

                  {/* Airtel Money */}
                  <label 
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'airtel_money' 
                        ? 'bg-[#2D3094]/5 border-[#2D3094] ring-1 ring-[#2D3094]' 
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        checked={paymentMethod === 'airtel_money'}
                        onChange={() => setPaymentMethod('airtel_money')}
                        className="text-[#2D3094] focus:ring-[#2D3094]"
                      />
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">Airtel Money</span>
                        <span className="text-[11px] text-slate-500">Merchant Code: 582190 (Direct Prompt)</span>
                      </div>
                    </div>
                    <img src={PAYMENT_LOGOS.airtelMoney} alt="Airtel" className="h-5 w-auto object-contain" referrerPolicy="no-referrer" />
                  </label>

                  {/* Visa / Mastercard */}
                  <label 
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'card' 
                        ? 'bg-[#2D3094]/5 border-[#2D3094] ring-1 ring-[#2D3094]' 
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="text-[#2D3094] focus:ring-[#2D3094]"
                      />
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">Credit / Debit Card</span>
                        <span className="text-[11px] text-slate-500">Visa, Mastercard, American Express</span>
                      </div>
                    </div>
                    <img src={PAYMENT_LOGOS.visaMastercard} alt="Card" className="h-5 w-auto object-contain" referrerPolicy="no-referrer" />
                  </label>

                  {/* Bank Transfer */}
                  <label 
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'bank_transfer' 
                        ? 'bg-[#2D3094]/5 border-[#2D3094] ring-1 ring-[#2D3094]' 
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        checked={paymentMethod === 'bank_transfer'}
                        onChange={() => setPaymentMethod('bank_transfer')}
                        className="text-[#2D3094] focus:ring-[#2D3094]"
                      />
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">Direct Bank Transfer / EFT</span>
                        <span className="text-[11px] text-slate-500">Stanbic Bank / Centenary Bank (Invoice details provided)</span>
                      </div>
                    </div>
                    <Building size={18} className="text-slate-500" />
                  </label>

                  {/* Cash on Delivery */}
                  <label 
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'cash_on_delivery' 
                        ? 'bg-[#2D3094]/5 border-[#2D3094] ring-1 ring-[#2D3094]' 
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        checked={paymentMethod === 'cash_on_delivery'}
                        onChange={() => setPaymentMethod('cash_on_delivery')}
                        className="text-[#2D3094] focus:ring-[#2D3094]"
                      />
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">Pay on Delivery</span>
                        <span className="text-[11px] text-slate-500">Available for Kampala delivery addresses</span>
                      </div>
                    </div>
                    <Store size={18} className="text-slate-500" />
                  </label>

                </div>

                {/* Conditional Payment Details fields */}
                {paymentMethod === 'card' && (
                  <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3 text-xs">
                    <div className="col-span-2">
                      <label className="font-bold text-slate-700 block mb-1">Card Number</label>
                      <input 
                        type="text" 
                        placeholder="4123 •••• •••• 9842"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Expiry Date</label>
                      <input 
                        type="text" 
                        placeholder="MM / YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">CVV Security Code</label>
                      <input 
                        type="text" 
                        placeholder="123"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>
                )}

                {(paymentMethod === 'mtn_momo' || paymentMethod === 'airtel_money') && (
                  <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                    <label className="font-bold text-slate-700 block mb-1">
                      {paymentMethod === 'mtn_momo' ? 'MTN MoMo Number for PIN Prompt:' : 'Airtel Money Number for PIN Prompt:'}
                    </label>
                    <input 
                      type="tel" 
                      placeholder="+256 700 000 000"
                      value={momoPhone || phone}
                      onChange={(e) => setMomoPhone(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                    <span className="text-[11px] text-slate-500 block mt-1.5">
                      You will receive a USSD push prompt on this handset to authorise the transaction.
                    </span>
                  </div>
                )}
              </div>

              {/* Step 4: Artwork & Digital Proof Agreement */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7">
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-[#2D3094] text-white flex items-center justify-center text-xs font-black">
                    4
                  </div>
                  <h2 className="text-sm font-heading font-black text-slate-900 uppercase tracking-wider">
                    Artwork Proofing & Digital Sign-Off
                  </h2>
                </div>

                <div className="space-y-2.5 text-xs text-slate-700">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input 
                      type="radio" 
                      name="artworkOption" 
                      checked={artworkOption === 'attached'}
                      onChange={() => setArtworkOption('attached')}
                      className="text-[#2D3094]"
                    />
                    <span>Custom text & logos are configured in my cart items</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input 
                      type="radio" 
                      name="artworkOption" 
                      checked={artworkOption === 'whatsapp'}
                      onChange={() => setArtworkOption('whatsapp')}
                      className="text-[#2D3094]"
                    />
                    <span>I will email / WhatsApp high-res vector files to production desk</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input 
                      type="radio" 
                      name="artworkOption" 
                      checked={artworkOption === 'design_help'}
                      onChange={() => setArtworkOption('design_help')}
                      className="text-[#2D3094]"
                    />
                    <span>I need a Sozy graphic designer to create / vectorize artwork (Free)</span>
                  </label>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                    <input 
                      type="checkbox" 
                      required
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      className="mt-0.5 text-[#2D3094] rounded"
                    />
                    <span>
                      I verify the provided spelling and contact details. I understand production will begin immediately upon 3D digital proof approval.
                    </span>
                  </label>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Order Summary Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sticky top-24">
                
                <h3 className="text-sm font-heading font-black text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center justify-between">
                  <span>Order Summary</span>
                  <span className="text-xs font-bold text-[#2D3094]">{cart.length} Item(s)</span>
                </h3>

                {/* Items List */}
                <div className="divide-y divide-slate-100 max-h-[340px] overflow-y-auto pr-1 my-3">
                  {cart.map((item, idx) => {
                    const itemUnitUGX = item.unitPriceUGX || item.product.priceUGX;
                    const itemUnitUSD = item.unitPriceUSD || item.product.priceUSD;
                    const lineTotalUGX = item.subtotalUGX || (itemUnitUGX * item.quantity);
                    const lineTotalUSD = item.subtotalUSD || (itemUnitUSD * item.quantity);

                    return (
                      <div key={idx} className="py-3 flex gap-3 text-xs">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0" 
                        />
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-900 line-clamp-1">
                            {item.product.name}
                          </h4>
                          
                          {/* Config Summary Chips */}
                          <div className="flex flex-wrap gap-1 mt-1 text-[10px] text-slate-500">
                            {item.selectedColor && (
                              <span className="bg-slate-100 px-1.5 py-0.5 rounded">Color: {item.selectedColor}</span>
                            )}
                            {item.customText && (
                              <span className="bg-[#2D3094]/10 text-[#2D3094] font-bold px-1.5 py-0.5 rounded">
                                Text: "{item.customText}"
                              </span>
                            )}
                            {item.customLogoUrl && (
                              <span className="bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded">
                                Logo Attached
                              </span>
                            )}
                          </div>

                          {/* Quantity & Controls */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1 border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                              <button
                                type="button"
                                onClick={() => onUpdateCartQuantity(idx, Math.max(1, item.quantity - 1))}
                                className="p-1 hover:bg-slate-200 text-slate-600"
                              >
                                <Minus size={11} />
                              </button>
                              <span className="px-2 text-xs font-bold text-slate-800">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateCartQuantity(idx, item.quantity + 1)}
                                className="p-1 hover:bg-slate-200 text-slate-600"
                              >
                                <Plus size={11} />
                              </button>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="font-black text-slate-900 text-xs">
                                {currency === 'UGX' ? `UGX ${lineTotalUGX.toLocaleString()}` : `$${lineTotalUSD.toFixed(2)}`}
                              </span>
                              <button
                                type="button"
                                onClick={() => onRemoveCartItem(idx)}
                                className="text-slate-400 hover:text-red-500 p-1"
                                title="Remove item"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Promo Code Input */}
                <div className="py-3 border-t border-slate-100">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Promo code (e.g. SOZY10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs uppercase focus:outline-hidden focus:border-[#2D3094]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <span className="text-[10px] text-red-500 mt-1 block">{promoError}</span>
                  )}
                  {appliedDiscountPercent > 0 && (
                    <span className="text-[10px] text-emerald-600 font-bold mt-1 block">
                      ✓ {appliedDiscountPercent}% discount applied to order!
                    </span>
                  )}
                </div>

                {/* Calculations Breakdown */}
                <div className="space-y-2 py-3 border-t border-slate-100 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Items Subtotal:</span>
                    <span className="font-bold text-slate-900">
                      {currency === 'UGX' ? `UGX ${itemsSubtotalUGX.toLocaleString()}` : `$${itemsSubtotalUSD.toFixed(2)}`}
                    </span>
                  </div>

                  {appliedDiscountPercent > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Promo Discount ({appliedDiscountPercent}%):</span>
                      <span>
                        -{currency === 'UGX' ? `UGX ${discountAmountUGX.toLocaleString()}` : `$${discountAmountUSD.toFixed(2)}`}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-600">
                    <span>Shipping Fee ({activeZone.name}):</span>
                    <span className="font-bold text-slate-900">
                      {deliveryFeeUGX === 0 ? 'FREE' : currency === 'UGX' ? `UGX ${deliveryFeeUGX.toLocaleString()}` : `$${deliveryFeeUSD.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Pre-Press 3D Proofing:</span>
                    <span className="font-bold text-emerald-600">INCLUDED (FREE)</span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                    <span className="text-sm font-heading font-black text-slate-900">Grand Total:</span>
                    <span className="text-xl font-heading font-black text-[#2D3094]">
                      {currency === 'UGX' ? `UGX ${grandTotalUGX.toLocaleString()}` : `$${grandTotalUSD.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                {/* Primary Submit Button */}
                <div className="pt-3 space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#2D3094] hover:bg-[#20236e] disabled:bg-slate-400 text-white py-4 rounded-2xl font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#2D3094]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Submitting Order to Production...</span>
                    ) : (
                      <>
                        <Lock size={15} />
                        <span>Place Order & Authorise</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    <span>Official E-Tax Invoice & Quality Guarantee Included</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </form>
      </div>

    </div>
  );
};
