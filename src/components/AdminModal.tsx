import React, { useState } from 'react';
import { 
  X, 
  Package, 
  FileText, 
  ShoppingCart, 
  Plus, 
  Trash2, 
  TrendingUp
} from 'lucide-react';
import { Product, QuoteRequest, Order } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  quotes: QuoteRequest[];
  orders: Order[];
  onUpdateProducts: (products: Product[]) => void;
  onUpdateQuotes: (quotes: QuoteRequest[]) => void;
  onUpdateOrders: (orders: Order[]) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  products,
  quotes,
  orders,
  onUpdateProducts,
  onUpdateQuotes,
  onUpdateOrders
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'quotes' | 'orders'>('overview');
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New product state
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Customised Gifts');
  const [newProdPriceUGX, setNewProdPriceUGX] = useState(25000);
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80');

  if (!isOpen) return null;

  const totalRevenueUGX = orders.reduce((sum, o) => sum + o.totalUGX, 0);
  const totalPendingQuotes = quotes.filter(q => q.status === 'pending').length;
  const totalActiveOrders = orders.filter(o => o.orderStatus !== 'delivered').length;

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['orderStatus']) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, orderStatus: newStatus } : o);
    onUpdateOrders(updated);
  };

  const handleUpdateQuoteStatus = (quoteId: string, newStatus: QuoteRequest['status']) => {
    const updated = quotes.map(q => q.id === quoteId ? { ...q, status: newStatus } : q);
    onUpdateQuotes(updated);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to remove this product from the live shop?')) {
      const updated = products.filter(p => p.id !== productId);
      onUpdateProducts(updated);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName) return;

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: newProdName,
      category: newProdCategory,
      priceUGX: Number(newProdPriceUGX),
      priceUSD: Number((newProdPriceUGX / 3800).toFixed(2)),
      image: newProdImage,
      description: 'Handcrafted corporate merchandise branded with your enterprise logo.',
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      featured: true,
      minOrderQty: 10,
      customizationOptions: {
        colors: ['Matte Black', 'Navy Blue', 'Silver Metallic'],
        placements: ['Center Front', 'Laser Edge'],
        brandingMethods: ['Laser Engraving', 'UV Color Print']
      },
      bulkTiers: [
        { minQty: 10, discountPercent: 0 },
        { minQty: 50, discountPercent: 10 },
        { minQty: 100, discountPercent: 20 },
        { minQty: 500, discountPercent: 30 }
      ]
    };

    onUpdateProducts([newProd, ...products]);
    setIsAddingNew(false);
    setNewProdName('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[94vh] overflow-y-auto shadow-2xl border border-slate-100 relative text-left my-auto flex flex-col">
        
        {/* Admin Header Bar */}
        <div className="sticky top-0 bg-[#181B34] text-white z-20 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <h2 className="font-heading font-black text-lg leading-tight">
                Sozy Impressions™ Enterprise CMS
              </h2>
              <span className="text-[10px] text-slate-400">
                Business Management & Production Control Console
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 px-6 py-2 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-bold select-none">
          {[
            { id: 'overview', label: 'Executive Dashboard', icon: <TrendingUp size={14} /> },
            { id: 'orders', label: `Orders (${orders.length})`, icon: <ShoppingCart size={14} /> },
            { id: 'quotes', label: `Quote Requests (${quotes.length})`, icon: <FileText size={14} /> },
            { id: 'products', label: `Shop Catalogue (${products.length})`, icon: <Package size={14} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-[#2D3094] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* CMS Tab Body */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
          
          {/* TAB 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-[#F7F8FA] p-6 rounded-3xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Total Invoiced Sales
                  </div>
                  <div className="font-heading font-black text-2xl md:text-3xl text-[#2D3094]">
                    UGX {totalRevenueUGX.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-bold mt-2 flex items-center gap-1">
                    <TrendingUp size={12} />
                    <span>Active Corporate Accounts</span>
                  </div>
                </div>

                <div className="bg-[#F7F8FA] p-6 rounded-3xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Pending Quotes / RFQs
                  </div>
                  <div className="font-heading font-black text-2xl md:text-3xl text-[#ED008C]">
                    {totalPendingQuotes} Active
                  </div>
                  <div className="text-[11px] text-slate-500 mt-2">
                    Requires estimator reply within 60 mins
                  </div>
                </div>

                <div className="bg-[#F7F8FA] p-6 rounded-3xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Jobs in Production
                  </div>
                  <div className="font-heading font-black text-2xl md:text-3xl text-slate-900">
                    {totalActiveOrders} Runs
                  </div>
                  <div className="text-[11px] text-indigo-600 font-bold mt-2">
                    Heidelberg Presses & UV Engraving
                  </div>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div>
                <h3 className="font-heading font-bold text-base text-slate-900 mb-4">
                  Latest Customer Orders & Dispatches
                </h3>
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
                      <tr>
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Client</th>
                        <th className="p-3">Total Amount</th>
                        <th className="p-3">Destination</th>
                        <th className="p-3">Production Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-[#2D3094]">{ord.id}</td>
                          <td className="p-3 font-medium">{ord.customerName} ({ord.companyName || 'SME'})</td>
                          <td className="p-3 font-bold">UGX {ord.totalUGX.toLocaleString()}</td>
                          <td className="p-3 text-slate-600">{ord.deliveryAddress}</td>
                          <td className="p-3">
                            <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                              {ord.orderStatus.replace('_', ' ')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Orders Management */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-lg text-slate-900">
                  Manage Active Client Orders ({orders.length})
                </h3>
              </div>

              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="bg-[#F7F8FA] rounded-2xl p-5 border border-slate-200 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                      <div>
                        <span className="font-heading font-black text-sm text-[#2D3094] mr-3">{ord.id}</span>
                        <span className="font-bold text-slate-900">{ord.customerName}</span>
                        <span className="text-slate-500"> • {ord.phone} • {ord.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 font-bold">Update Status:</span>
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as any)}
                          className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800 outline-none"
                        >
                          <option value="received">Received</option>
                          <option value="proof_sent">Proof Sent</option>
                          <option value="in_production">In Production (Offset/UV)</option>
                          <option value="completed">Completed</option>
                          <option value="delivered">Delivered to Client</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-slate-700">Deliverables ({ord.items.length} items):</div>
                        <div className="text-slate-500">
                          {ord.items.map(it => `${it.quantity}x ${it.product.name}`).join(', ')}
                        </div>
                      </div>
                      <div className="font-heading font-black text-sm text-[#2D3094]">
                        Total: UGX {ord.totalUGX.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Quotes Management */}
          {activeTab === 'quotes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-lg text-slate-900">
                  Incoming Commercial Quotes & RFQs ({quotes.length})
                </h3>
              </div>

              <div className="space-y-4">
                {quotes.map((q) => (
                  <div key={q.id} className="bg-[#F7F8FA] rounded-2xl p-5 border border-slate-200 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                      <div>
                        <span className="font-heading font-black text-sm text-[#ED008C] mr-3">{q.id}</span>
                        <span className="font-bold text-slate-900">{q.fullName}</span>
                        <span className="text-slate-500"> ({q.companyName}) • {q.phone} • {q.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 font-bold">Status:</span>
                        <select
                          value={q.status}
                          onChange={(e) => handleUpdateQuoteStatus(q.id, e.target.value as any)}
                          className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800 outline-none"
                        >
                          <option value="pending">Pending Review</option>
                          <option value="reviewed">Estimator Assigned</option>
                          <option value="approved">Approved / Invoiced</option>
                          <option value="rejected">Declined</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                      <div>
                        <strong>Product / Service:</strong> {q.product} ({q.quantity} units)
                      </div>
                      <div>
                        <strong>Estimated Valuation:</strong> UGX {q.estimatedPriceUGX?.toLocaleString()}
                      </div>
                      {q.notes && (
                        <div className="col-span-2 bg-white p-2.5 rounded-xl border border-slate-200 text-slate-700 italic">
                          "{q.notes}"
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Shop Products Management */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-lg text-slate-900">
                  Store Products & Inventory ({products.length})
                </h3>
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="bg-[#2D3094] hover:bg-[#1f2168] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md"
                >
                  <Plus size={14} />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Add New Product Form */}
              {isAddingNew && (
                <form onSubmit={handleCreateProduct} className="bg-white p-6 rounded-2xl border-2 border-[#2D3094] shadow-lg text-xs space-y-3">
                  <h4 className="font-heading font-black text-sm text-slate-900">Add New Store Merchandise</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Product Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Bamboo Desk Organizer"
                        value={newProdName}
                        onChange={(e) => setNewProdName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Category</label>
                      <select
                        value={newProdCategory}
                        onChange={(e) => setNewProdCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-bold"
                      >
                        <option value="Customised Gifts">Customised Gifts</option>
                        <option value="Corporate Branding">Corporate Branding</option>
                        <option value="Offset Printing">Offset Printing</option>
                        <option value="Digital Printing">Digital Printing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Base Price in UGX</label>
                      <input
                        type="number"
                        required
                        value={newProdPriceUGX}
                        onChange={(e) => setNewProdPriceUGX(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                      <input
                        type="text"
                        required
                        value={newProdImage}
                        onChange={(e) => setNewProdImage(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="bg-[#ED008C] text-white font-bold px-5 py-2.5 rounded-xl shadow"
                    >
                      Save Product
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingNew(false)}
                      className="border border-slate-300 text-slate-600 font-bold px-4 py-2.5 rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((prod) => (
                  <div key={prod.id} className="bg-[#F7F8FA] p-4 rounded-2xl border border-slate-200 text-xs flex gap-3">
                    <img src={prod.image} alt={prod.name} className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-heading font-bold text-slate-900 truncate">{prod.name}</div>
                      <div className="text-[10px] text-slate-500">{prod.category}</div>
                      <div className="font-black text-[#2D3094] mt-1">
                        UGX {prod.priceUGX.toLocaleString()}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="text-red-500 hover:text-red-700 font-bold text-[10px] flex items-center gap-1"
                        >
                          <Trash2 size={12} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
