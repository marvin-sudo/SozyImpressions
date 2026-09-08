import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Mail, 
  CheckCircle2, 
  Cog, 
  Truck, 
  CreditCard, 
  XCircle, 
  Clock, 
  Printer, 
  Send,
  User,
  MapPin,
  Building,
  Phone,
  Paperclip
} from 'lucide-react';
import { AdminOrder, OrderStatus, PaymentStatus } from '../../types/admin';
import { useShopStore } from '../../context/ShopStoreContext';
import { COMPANY_INFO } from '../../data/mockData';

interface OrderDetailsModalProps {
  order: AdminOrder | null;
  onClose: () => void;
  onOpenReceipt: (order: AdminOrder) => void;
  onOpenArtworkModal?: (artworkUrl: string, fileName?: string) => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  onClose,
  onOpenReceipt,
  onOpenArtworkModal
}) => {
  const { updateOrderStatus, updatePaymentStatus, addOrderTimelineNote, sendEmailNotification } = useShopStore();
  const [staffNote, setStaffNote] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSuccessMsg, setEmailSuccessMsg] = useState('');

  if (!order) return null;

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffNote.trim()) return;
    addOrderTimelineNote(order.id, staffNote.trim(), 'Staff Internal Note');
    setStaffNote('');
  };

  const handleQuickStatusChange = async (status: OrderStatus) => {
    await updateOrderStatus(order.id, status);
  };

  const handleQuickPaymentChange = async (pStatus: PaymentStatus) => {
    await updatePaymentStatus(order.id, pStatus);
  };

  const handleQuickEmailReceipt = async () => {
    setIsSendingEmail(true);
    try {
      await sendEmailNotification({
        orderId: order.id,
        orderNumber: order.orderNumber,
        recipientEmail: order.customerEmail,
        recipientName: order.customerName,
        templateId: 'tpl_receipt',
        subject: `Your Official Receipt #${order.orderNumber} - SozyImpressions`,
        content: `Dear ${order.customerName},\n\nPlease find attached your official payment receipt for order #${order.orderNumber}.\n\nTotal Paid: UGX ${order.totalUGX.toLocaleString()}\n\nThank you for choosing SozyImpressions.\nTel: ${COMPANY_INFO.phone}`,
        status: 'sent'
      });
      setEmailSuccessMsg('Receipt sent to customer email successfully!');
      setTimeout(() => setEmailSuccessMsg(''), 4000);
    } catch {
      alert('Failed to send email notification');
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in-50">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#12142B] to-[#1E224F] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2D3094] flex items-center justify-center text-[#ED008C] font-extrabold shadow-md">
              SI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight text-white">Order #{order.orderNumber}</h2>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                  order.orderStatus === 'completed' ? 'bg-emerald-500/20 text-emerald-300' :
                  order.orderStatus === 'processing' ? 'bg-purple-500/20 text-purple-300' :
                  order.orderStatus === 'ready_delivery' ? 'bg-cyan-500/20 text-cyan-300' :
                  order.orderStatus === 'confirmed' ? 'bg-blue-500/20 text-blue-300' :
                  'bg-amber-500/20 text-amber-300'
                }`}>
                  {order.orderStatus.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenReceipt(order)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
            >
              <Printer size={14} />
              <span>Print / Download Receipt</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-slate-800">
          
          {emailSuccessMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span>{emailSuccessMsg}</span>
            </div>
          )}

          {/* Quick Action Workflow Buttons */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Order Action Workflow</span>
              <span className="text-[11px] text-slate-400">Updates trigger automated email notifications</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Confirm */}
              <button
                onClick={() => handleQuickStatusChange('confirmed')}
                disabled={order.orderStatus === 'confirmed'}
                className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 disabled:opacity-50"
              >
                <CheckCircle2 size={13} />
                <span>Confirm Order</span>
              </button>

              {/* In Production */}
              <button
                onClick={() => handleQuickStatusChange('processing')}
                disabled={order.orderStatus === 'processing'}
                className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 disabled:opacity-50"
              >
                <Cog size={13} />
                <span>Send to Production</span>
              </button>

              {/* Ready for Delivery */}
              <button
                onClick={() => handleQuickStatusChange('ready_delivery')}
                disabled={order.orderStatus === 'ready_delivery'}
                className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-cyan-50 text-cyan-700 border border-cyan-200 hover:bg-cyan-100 disabled:opacity-50"
              >
                <Truck size={13} />
                <span>Ready for Delivery</span>
              </button>

              {/* Complete */}
              <button
                onClick={() => handleQuickStatusChange('completed')}
                disabled={order.orderStatus === 'completed'}
                className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 disabled:opacity-50"
              >
                <CheckCircle2 size={13} />
                <span>Mark Completed</span>
              </button>

              {/* Mark as Paid */}
              {order.paymentStatus !== 'paid' && (
                <button
                  onClick={() => handleQuickPaymentChange('paid')}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
                >
                  <CreditCard size={13} />
                  <span>Confirm Payment</span>
                </button>
              )}

              {/* Email Receipt */}
              <button
                onClick={handleQuickEmailReceipt}
                disabled={isSendingEmail}
                className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-[#2D3094] text-white hover:bg-[#232573] disabled:opacity-50 shadow-xs"
              >
                <Mail size={13} />
                <span>{isSendingEmail ? 'Sending...' : 'Email Receipt to Customer'}</span>
              </button>

              {/* Cancel */}
              {order.orderStatus !== 'cancelled' && (
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to cancel this order?')) {
                      handleQuickStatusChange('cancelled');
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 ml-auto"
                >
                  <XCircle size={13} />
                  <span>Cancel Order</span>
                </button>
              )}
            </div>
          </div>

          {/* 2-Column Info: Customer & Shipping | Financial Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Customer & Delivery Card */}
            <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <User size={14} className="text-[#2D3094]" /> Customer Information
              </h3>
              
              <div className="space-y-1 text-xs">
                <p className="font-bold text-slate-900 text-sm">{order.customerName}</p>
                {order.companyName && (
                  <p className="text-slate-600 font-semibold flex items-center gap-1.5">
                    <Building size={13} className="text-slate-400" /> {order.companyName}
                  </p>
                )}
                <p className="text-slate-600 flex items-center gap-1.5">
                  <Phone size={13} className="text-slate-400" /> {order.customerPhone}
                </p>
                <p className="text-slate-600 flex items-center gap-1.5">
                  <Mail size={13} className="text-slate-400" /> {order.customerEmail}
                </p>
                <div className="pt-2 border-t border-slate-200 mt-2">
                  <p className="font-bold text-slate-800 flex items-center gap-1.5">
                    <MapPin size={13} className="text-[#ED008C]" /> Delivery Address
                  </p>
                  <p className="text-slate-600 mt-0.5">{order.deliveryAddress}</p>
                  <p className="text-[11px] font-semibold text-slate-500">{order.district || 'Kampala Area'}</p>
                </div>

                {order.specialInstructions && (
                  <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] mt-2">
                    <span className="font-bold">Customer Instructions: </span>
                    {order.specialInstructions}
                  </div>
                )}
              </div>
            </div>

            {/* Financial & Payment Card */}
            <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <CreditCard size={14} className="text-[#2D3094]" /> Payment & Financials
                </h3>

                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-slate-800">UGX {order.subtotalUGX.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Delivery Fee:</span>
                    <span className="font-semibold text-slate-800">UGX {(order.deliveryFeeUGX || 0).toLocaleString()}</span>
                  </div>
                  {order.discountUGX && order.discountUGX > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Discount:</span>
                      <span>- UGX {order.discountUGX.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">Total Order Amount:</span>
                    <span className="text-base font-extrabold text-[#2D3094]">
                      UGX {order.totalUGX.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Payment Method</span>
                  <p className="font-bold text-slate-800">{order.paymentMethod}</p>
                  {order.transactionReference && (
                    <p className="text-[10px] text-slate-500">Ref: {order.transactionReference}</p>
                  )}
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Status</span>
                  <div>
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      order.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.paymentStatus.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Customer's Uploaded Artwork & Specs */}
          {order.customerArtwork && (
            <div className="p-4.5 bg-pink-50/50 rounded-2xl border border-pink-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Paperclip size={16} className="text-[#ED008C]" />
                  <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    Customer Attached Artwork / Logo
                  </h3>
                </div>
                <a
                  href={order.customerArtwork.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-pink-100 text-[#ED008C] text-xs font-bold rounded-lg border border-pink-200 shadow-xs transition-colors"
                >
                  <Download size={13} />
                  <span>Download Original Asset</span>
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div 
                  onClick={() => onOpenArtworkModal?.(order.customerArtwork!.url, order.customerArtwork?.fileName)}
                  className="w-32 h-32 rounded-xl bg-white border border-pink-200 overflow-hidden cursor-pointer group shrink-0 relative"
                >
                  <img 
                    src={order.customerArtwork.url} 
                    alt="Customer Artwork"
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-bold">
                    Click to Zoom
                  </div>
                </div>

                <div className="text-xs space-y-1">
                  <p className="font-bold text-slate-800">{order.customerArtwork.fileName || 'Artwork_Print_File'}</p>
                  {order.customerArtwork.fileSize && (
                    <p className="text-slate-500">{order.customerArtwork.fileSize}</p>
                  )}
                  {order.customerArtwork.notes && (
                    <div className="mt-2 p-2 bg-white rounded-lg border border-pink-100 text-slate-700">
                      <span className="font-bold">Production Instructions: </span>
                      {order.customerArtwork.notes}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Items Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Purchased Line Items ({order.items?.length || 0})
            </h3>

            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Specifications</th>
                    <th className="px-4 py-3 text-center">Qty</th>
                    <th className="px-4 py-3 text-right">Unit Price</th>
                    <th className="px-4 py-3 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {order.items?.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.product?.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=200'}
                            alt={item.product?.name} 
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-slate-900">{item.product?.name || 'Custom Product'}</p>
                            <p className="text-[10px] text-slate-400">{item.product?.category}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-[11px] text-slate-600">
                        {item.selectedOptions ? (
                          <div className="space-y-0.5">
                            {Object.entries(item.selectedOptions).map(([key, val]) => (
                              <p key={key}><span className="font-semibold capitalize">{key}:</span> {val}</p>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-400">Standard</span>
                        )}
                      </td>

                      <td className="px-4 py-3 text-center font-bold text-slate-800">
                        {item.quantity}
                      </td>

                      <td className="px-4 py-3 text-right text-slate-600 font-medium">
                        UGX {item.unitPriceUGX.toLocaleString()}
                      </td>

                      <td className="px-4 py-3 text-right font-extrabold text-[#2D3094]">
                        UGX {item.subtotalUGX.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Timeline & Audit Trail */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Clock size={14} className="text-[#2D3094]" /> Order History & Production Notes
            </h3>

            <div className="space-y-3">
              {order.timeline?.map((evt, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="w-2 h-2 rounded-full bg-[#2D3094] mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-slate-800">{evt.title}</p>
                      <span className="text-[10px] text-slate-400">
                        {new Date(evt.timestamp).toLocaleString()}
                      </span>
                    </div>
                    {evt.description && (
                      <p className="text-slate-600 text-[11px] mt-0.5">{evt.description}</p>
                    )}
                    {evt.user && (
                      <p className="text-[10px] text-slate-400 font-medium">Logged by: {evt.user}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add Staff Note */}
            <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
              <input 
                type="text"
                value={staffNote}
                onChange={(e) => setStaffNote(e.target.value)}
                placeholder="Add internal staff note (e.g. 'Customer confirmed proof on WhatsApp')..."
                className="flex-1 px-3.5 py-2 bg-slate-50 text-xs rounded-xl border border-slate-200 outline-none focus:border-[#2D3094]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#2D3094] hover:bg-[#232573] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Send size={13} />
                <span>Add Note</span>
              </button>
            </form>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Order Status: <span className="font-bold text-slate-800 capitalize">{order.orderStatus.replace('_', ' ')}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenReceipt(order)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Printer size={14} />
              <span>Official Receipt (PDF)</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
