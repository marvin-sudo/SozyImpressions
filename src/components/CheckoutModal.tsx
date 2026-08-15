import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  CreditCard, 
  Truck, 
  MessageSquare,
  Building,
  Phone,
  Mail,
  Printer
} from 'lucide-react';
import { CartItem, Currency, DeliveryZone, Order } from '../types';
import { DELIVERY_ZONES, COMPANY_INFO, PAYMENT_LOGOS } from '../data/mockData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currency: Currency;
  onOrderCompleted: (order: Order) => void;
  onClearCart: () => void;
}

const createOrderId = () => `SOZY-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  currency,
  onOrderCompleted,
  onClearCart
}) => {
  // Checkout Form State
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedZoneId, setSelectedZoneId] = useState<string>('zone-kla-central');
  const [paymentMethod, setPaymentMethod] = useState<'mtn_momo' | 'airtel_money' | 'card' | 'bank_transfer' | 'cash_on_delivery'>('mtn_momo');
  const [momoNumber, setMomoNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const activeZone = DELIVERY_ZONES.find(z => z.id === selectedZoneId) || DELIVERY_ZONES[0];
  const itemsSubtotalUGX = cart.reduce((sum, item) => sum + item.subtotalUGX, 0);
  const deliveryFeeUGX = activeZone.feeUGX;
  const grandTotalUGX = itemsSubtotalUGX + deliveryFeeUGX;

  const itemsSubtotalUSD = Number((itemsSubtotalUGX / 3800).toFixed(2));
  const deliveryFeeUSD = activeZone.feeUSD;
  const grandTotalUSD = Number((grandTotalUGX / 3800).toFixed(2));

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !email || !phone) return;

    setIsProcessing(true);
    const orderId = createOrderId();

    const newOrder: Order = {
      id: orderId,
      customerName,
      companyName: companyName || undefined,
      email,
      phone,
      deliveryAddress: deliveryAddress || activeZone.name,
      deliveryZoneId: selectedZoneId,
      items: [...cart],
      subtotalUGX: itemsSubtotalUGX,
      deliveryFeeUGX: deliveryFeeUGX,
      totalUGX: grandTotalUGX,
      subtotalUSD: itemsSubtotalUSD,
      deliveryFeeUSD: deliveryFeeUSD,
      totalUSD: grandTotalUSD,
      paymentMethod,
      paymentStatus: paymentMethod === 'cash_on_delivery' ? 'pending' : 'paid',
      orderStatus: 'received',
      proofStatus: 'pending',
      notes: notes || undefined,
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      setIsProcessing(false);
      setCompletedOrder(newOrder);
      onOrderCompleted(newOrder);
      onClearCart();
    }, 1000);
  };

  const handleSendOrderToWhatsApp = () => {
    if (!completedOrder) return;
    const itemsList = completedOrder.items.map(it => `- ${it.quantity}x ${it.product.name} (${it.customization?.color || 'Standard'})`).join('\n');
    const message = `Hello Sozy Impressions! I just placed Order #${completedOrder.id}:
Client: ${completedOrder.customerName} (${completedOrder.companyName || 'Individual'})
Phone: ${completedOrder.phone}
Destination: ${activeZone.name}
Total: ${currency === 'UGX' ? `UGX ${completedOrder.totalUGX.toLocaleString()}` : `$${completedOrder.totalUSD}`}
Payment: ${completedOrder.paymentMethod}

Items:
${itemsList}

Please send the digital proof and invoice!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/256709390168?text=${encoded}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 relative text-left my-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest bg-[#2D3094]/10 text-[#2D3094] px-2.5 py-1 rounded-full">
              Secure Checkout & Delivery
            </span>
            <span className="text-xs text-slate-400">• Sozy Impressions Ltd</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8">
          {completedOrder ? (
            /* Order Success State */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-4 shadow-xl">
                <CheckCircle2 size={36} />
              </div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                Order Received & Queued for Pre-Press!
              </span>
              <h2 className="font-heading font-black text-3xl text-slate-900 mb-2">
                Order #{completedOrder.id}
              </h2>
              <p className="text-xs md:text-sm text-slate-600 max-w-lg mx-auto mb-8">
                Thank you, <strong className="text-slate-900">{completedOrder.customerName}</strong>. A dedicated pre-press designer is reviewing your job specifications and will send a digital proof to <strong>{completedOrder.email}</strong>.
              </p>

              {/* Order Receipt Details */}
              <div className="bg-[#F7F8FA] rounded-2xl p-6 border border-slate-200 text-left max-w-xl mx-auto mb-8 text-xs space-y-2.5">
                <div className="font-heading font-bold text-slate-900 text-sm pb-2 border-b border-slate-200">
                  Order Summary & Delivery Logistics
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Destination:</span>
                  <span className="font-bold text-slate-900">{completedOrder.deliveryAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivery SLA:</span>
                  <span className="font-bold text-slate-900">{activeZone.estimatedDays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Channel:</span>
                  <span className="font-bold uppercase text-slate-900">{completedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 font-heading font-black text-sm text-[#2D3094]">
                  <span>Total Amount:</span>
                  <span>{currency === 'UGX' ? `UGX ${completedOrder.totalUGX.toLocaleString()}` : `$${completedOrder.totalUSD}`}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <button
                  onClick={handleSendOrderToWhatsApp}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-full shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare size={16} />
                  <span>Send Order to WhatsApp Dispatch</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-full"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Customer & Delivery Details (lg:col-span-7) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Customer Info */}
                <div className="bg-[#F7F8FA] p-5 rounded-2xl border border-slate-200">
                  <h4 className="font-heading font-bold text-xs text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Building size={16} className="text-[#2D3094]" />
                    <span>1. Client & Organization Information</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Arthur Ssenyange"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#2D3094]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Company / Organization</label>
                      <input
                        type="text"
                        placeholder="e.g. Victoria Health Foundation"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#2D3094]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="arthur@hospital.org"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#2D3094]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+256 709 390 168"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#2D3094]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Uganda Delivery Logistics */}
                <div className="bg-[#F7F8FA] p-5 rounded-2xl border border-slate-200">
                  <h4 className="font-heading font-bold text-xs text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Truck size={16} className="text-[#2D3094]" />
                    <span>2. Delivery Zone & Address in Uganda</span>
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Select Delivery Region:</label>
                      <select
                        value={selectedZoneId}
                        onChange={(e) => setSelectedZoneId(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800 outline-none focus:border-[#2D3094]"
                      >
                        {DELIVERY_ZONES.map((zone) => (
                          <option key={zone.id} value={zone.id}>
                            {zone.name} — {currency === 'UGX' ? `UGX ${zone.feeUGX.toLocaleString()}` : `$${zone.feeUSD}`} ({zone.estimatedDays})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Street / Building / Office Address:</label>
                      <input
                        type="text"
                        placeholder="e.g. Plot 14 Lumumba Avenue, 3rd Floor, Nakasero"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#2D3094]"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Payment Channels */}
                <div className="bg-[#F7F8FA] p-5 rounded-2xl border border-slate-200">
                  <h4 className="font-heading font-bold text-xs text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <CreditCard size={16} className="text-[#2D3094]" />
                    <span>3. Payment Channel</span>
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    {[
                      { id: 'mtn_momo', label: 'MTN MoMo', logo: PAYMENT_LOGOS.mtn, badge: 'Fastest' },
                      { id: 'airtel_money', label: 'Airtel Money', logo: PAYMENT_LOGOS.airtelMoney, badge: 'Popular' },
                      { id: 'card', label: 'Visa / Mastercard', logo: PAYMENT_LOGOS.visaMastercard, badge: 'Instant' },
                      { id: 'bank_transfer', label: 'Bank Wire / LPO', badge: 'Corporate' }
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`p-3 rounded-xl border text-left font-bold transition-all flex items-center justify-between gap-2 ${
                          paymentMethod === method.id
                            ? 'border-[#2D3094] bg-[#2D3094] text-white shadow-md'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {method.logo && (
                            <div className="bg-white p-0.5 rounded shadow-xs shrink-0 flex items-center justify-center h-6 w-8">
                              <img 
                                src={method.logo} 
                                alt={method.label} 
                                className="h-4 max-w-full object-contain" 
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          )}
                          <span className="truncate">{method.label}</span>
                        </div>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded shrink-0 ${
                          paymentMethod === method.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {method.badge}
                        </span>
                      </button>
                    ))}
                  </div>

                  {paymentMethod === 'mtn_momo' && (
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900">
                      <strong>MTN MoMo Merchant:</strong> You will receive a prompt on your phone or you can pay directly to Merchant Code: <strong>601928 (Sozy Impressions Ltd)</strong>.
                    </div>
                  )}
                  {paymentMethod === 'airtel_money' && (
                    <div className="bg-red-50 border border-red-200 p-3 rounded-xl text-xs text-red-900">
                      <strong>Airtel Money Pay:</strong> Merchant Code: <strong>1192849 (Sozy Impressions Ltd)</strong>.
                    </div>
                  )}
                  {paymentMethod === 'bank_transfer' && (
                    <div className="bg-sky-50 border border-sky-200 p-3 rounded-xl text-xs text-sky-900">
                      <strong>Stanbic Bank Uganda:</strong> Account Name: <strong>Sozy Impressions Ltd</strong> • Account No: <strong>9030018920194</strong>. LPO accepted for verified corporate accounts.
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column: Order Summary & Place Order (lg:col-span-5) */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-[#181B34] text-white rounded-3xl p-6 md:p-8 border border-white/15 shadow-xl">
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#ED008C] uppercase tracking-wider mb-4">
                    Order Summary ({cart.length} items)
                  </h4>

                  {/* Items List */}
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1 text-xs divide-y divide-white/10 mb-6">
                    {cart.map((item, idx) => (
                      <div key={idx} className="pt-2 first:pt-0 flex justify-between gap-2">
                        <div>
                          <div className="font-bold text-white line-clamp-1">{item.product.name}</div>
                          <div className="text-[10px] text-slate-400">
                            Qty: {item.quantity} {item.customization?.color ? `• ${item.customization.color}` : ''}
                          </div>
                        </div>
                        <div className="font-bold text-slate-200 shrink-0">
                          {currency === 'UGX' ? `UGX ${item.subtotalUGX.toLocaleString()}` : `$${item.subtotalUSD.toFixed(2)}`}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Fee Breakdown */}
                  <div className="space-y-2 text-xs text-slate-300 py-3 border-y border-white/10 mb-6">
                    <div className="flex justify-between">
                      <span>Items Subtotal:</span>
                      <span className="font-bold text-white">
                        {currency === 'UGX' ? `UGX ${itemsSubtotalUGX.toLocaleString()}` : `$${itemsSubtotalUSD.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery ({activeZone.name}):</span>
                      <span className="font-bold text-white">
                        {currency === 'UGX' ? `UGX ${deliveryFeeUGX.toLocaleString()}` : `$${deliveryFeeUSD}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-emerald-400">
                      <span>Pre-Press 3D Digital Proofing:</span>
                      <span className="font-bold">FREE</span>
                    </div>
                  </div>

                  {/* Grand Total */}
                  <div className="flex justify-between items-baseline mb-6">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Grand Total:</span>
                    <span className="font-heading font-black text-2xl md:text-3xl text-[#ED008C]">
                      {currency === 'UGX' ? `UGX ${grandTotalUGX.toLocaleString()}` : `$${grandTotalUSD}`}
                    </span>
                  </div>
                </div>

                {/* Submit Order Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-[#ED008C] hover:bg-[#d4007d] text-white font-heading font-bold text-xs uppercase tracking-wider py-4 rounded-full shadow-2xl shadow-[#ED008C]/30 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span>Placing Order & Allocating Pre-Press...</span>
                    ) : (
                      <>
                        <span>Confirm & Place Order</span>
                        <CheckCircle2 size={16} />
                      </>
                    )}
                  </button>

                  <div className="mt-3 text-center text-[10px] text-slate-400 flex items-center justify-center gap-1">
                    <ShieldCheck size={12} className="text-emerald-400" />
                    <span>Zero-Risk Guarantee • Free 3D Proof Before Mass Print</span>
                  </div>
                </div>

              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
