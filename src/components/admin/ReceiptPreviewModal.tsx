import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Mail, 
  CheckCircle2, 
  Phone, 
  MapPin, 
  Globe 
} from 'lucide-react';
import { AdminOrder } from '../../types/admin';
import { downloadReceiptPDF, printReceiptPDF } from '../../utils/receiptGenerator';
import { useShopStore } from '../../context/ShopStoreContext';
import { COMPANY_INFO } from '../../data/mockData';

interface ReceiptPreviewModalProps {
  order: AdminOrder | null;
  onClose: () => void;
}

export const ReceiptPreviewModal: React.FC<ReceiptPreviewModalProps> = ({
  order,
  onClose
}) => {
  const { sendEmailNotification } = useShopStore();
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!order) return null;

  const handleDownload = () => {
    downloadReceiptPDF(order);
  };

  const handlePrint = () => {
    printReceiptPDF(order);
  };

  const handleSendEmail = async () => {
    setIsSending(true);
    try {
      await sendEmailNotification({
        orderId: order.id,
        orderNumber: order.orderNumber,
        recipientEmail: order.customerEmail,
        recipientName: order.customerName,
        templateId: 'tpl_receipt',
        subject: `Official Receipt #${order.orderNumber} - SozyImpressions`,
        content: `Dear ${order.customerName},\n\nPlease find your official payment receipt for Order #${order.orderNumber}.\n\nTotal Paid: UGX ${order.totalUGX.toLocaleString()}\nPayment Method: ${order.paymentMethod}\nStatus: ${order.paymentStatus.toUpperCase()}\n\nThank you for trusting SozyImpressions with your printing & branding needs.\n\nWarm regards,\nSozyImpressions Accounts Team\nTel: ${COMPANY_INFO.phone}`,
        status: 'sent'
      });
      setSentSuccess(true);
      setTimeout(() => setSentSuccess(false), 4000);
    } catch {
      alert('Failed to send receipt to customer email.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in-50">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Top Control Header */}
        <div className="px-6 py-4 bg-[#12142B] text-white flex items-center justify-between">
          <div>
            <h2 className="text-base font-black">Official Receipt Preview</h2>
            <p className="text-xs text-slate-300">Order #{order.orderNumber} • {order.customerName}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition-colors"
            >
              <Printer size={14} />
              <span>Print</span>
            </button>

            <button
              onClick={handleSendEmail}
              disabled={isSending}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2D3094] hover:bg-[#232573] text-white text-xs font-bold transition-colors disabled:opacity-50"
            >
              <Mail size={14} />
              <span>{isSending ? 'Sending...' : 'Email to Customer'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {sentSuccess && (
          <div className="mx-6 mt-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>Official Receipt sent successfully to {order.customerEmail}!</span>
          </div>
        )}

        {/* Printable / Paper Styled Preview Container */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-100/60 custom-scrollbar">
          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-slate-200 max-w-2xl mx-auto space-y-6 text-slate-800 relative overflow-hidden">
            
            {/* Watermark */}
            <div className="absolute right-6 top-28 pointer-events-none opacity-8 select-none rotate-[-20deg]">
              <span className="text-7xl font-black uppercase text-slate-900">
                {order.paymentStatus === 'paid' ? 'PAID' : 'INVOICE'}
              </span>
            </div>

            {/* Brand & Receipt Top Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b-2 border-slate-100">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2D3094] to-[#ED008C] flex items-center justify-center text-white font-black text-sm">
                    SI
                  </div>
                  <div>
                    <h1 className="text-lg font-black text-[#2D3094] tracking-tight">SOZY IMPRESSIONS</h1>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Printing • Branding • Design</p>
                  </div>
                </div>

                <div className="mt-3 text-[11px] text-slate-500 space-y-0.5">
                  <p className="flex items-center gap-1.5"><MapPin size={11} className="text-[#ED008C]" /> {COMPANY_INFO.address}</p>
                  <p className="flex items-center gap-1.5"><Phone size={11} className="text-slate-400" /> {COMPANY_INFO.phone} / {COMPANY_INFO.phoneSecondary}</p>
                  <p className="flex items-center gap-1.5"><Globe size={11} className="text-slate-400" /> info@sozyimpressions.com</p>
                </div>
              </div>

              <div className="text-right sm:text-right">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#2D3094]/10 text-[#2D3094]">
                  OFFICIAL RECEIPT
                </span>
                <p className="text-sm font-extrabold text-slate-900 mt-2">REC-{order.orderNumber}</p>
                <p className="text-xs text-slate-500">Order Ref: #{order.orderNumber}</p>
                <p className="text-xs text-slate-500">
                  Date: {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
                <div className="mt-2">
                  <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase ${
                    order.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    Payment: {order.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Billed To / Shipping Address */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Billed To / Customer:
                </span>
                <p className="font-bold text-slate-900 text-sm">{order.customerName}</p>
                {order.companyName && <p className="text-slate-600 font-semibold">{order.companyName}</p>}
                <p className="text-slate-500">{order.customerPhone}</p>
                <p className="text-slate-500">{order.customerEmail}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Delivery Destination:
                </span>
                <p className="font-semibold text-slate-800">{order.deliveryAddress}</p>
                <p className="text-slate-500">{order.district || 'Kampala Area, Uganda'}</p>
                <p className="text-slate-400 mt-1">Payment: {order.paymentMethod}</p>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-[11px] uppercase">
                  <tr>
                    <th className="px-3.5 py-2.5">Item Description</th>
                    <th className="px-3.5 py-2.5 text-center">Qty</th>
                    <th className="px-3.5 py-2.5 text-right">Unit Price</th>
                    <th className="px-3.5 py-2.5 text-right">Total (UGX)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {order.items?.map((it, idx) => (
                    <tr key={idx}>
                      <td className="px-3.5 py-3">
                        <p className="font-bold text-slate-900">{it.product?.name || 'Custom Print Item'}</p>
                        {it.selectedOptions && (
                          <p className="text-[10px] text-slate-400">
                            {Object.entries(it.selectedOptions).map(([k, v]) => `${k}: ${v}`).join(' • ')}
                          </p>
                        )}
                      </td>
                      <td className="px-3.5 py-3 text-center font-bold text-slate-700">{it.quantity}</td>
                      <td className="px-3.5 py-3 text-right text-slate-600">UGX {it.unitPriceUGX.toLocaleString()}</td>
                      <td className="px-3.5 py-3 text-right font-bold text-slate-900">UGX {it.subtotalUGX.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Financial Summary Calculation */}
            <div className="flex justify-end pt-2">
              <div className="w-64 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-bold text-slate-800">UGX {order.subtotalUGX.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery & Logistics:</span>
                  <span className="font-bold text-slate-800">UGX {(order.deliveryFeeUGX || 0).toLocaleString()}</span>
                </div>
                {order.discountUGX && order.discountUGX > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount:</span>
                    <span className="font-bold">- UGX {order.discountUGX.toLocaleString()}</span>
                  </div>
                )}
                <div className="pt-2 border-t-2 border-slate-200 flex justify-between items-baseline">
                  <span className="font-black text-slate-900 text-sm">Grand Total:</span>
                  <div className="text-right">
                    <span className="font-black text-[#2D3094] text-base">
                      UGX {order.totalUGX.toLocaleString()}
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      ~ ${order.totalUSD ? order.totalUSD.toFixed(1) : (order.totalUGX / 3800).toFixed(1)} USD
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stamp & Authorized Signature */}
            <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
              <div className="text-[10px] text-slate-400 max-w-xs">
                <p className="font-bold text-slate-600">Thank you for choosing SozyImpressions!</p>
                <p className="mt-0.5">Quality Printing, Branding & Design Solutions.</p>
                <p>Kampala, Uganda • All rights reserved.</p>
              </div>

              <div className="text-center">
                <div className="w-32 border-b border-slate-300 pb-8 text-[11px] font-bold text-slate-700 italic">
                  SozyImpressions
                </div>
                <span className="text-[9px] text-slate-400 uppercase tracking-wider block mt-1">Authorized Stamp</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
