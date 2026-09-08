import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { AdminProduct } from '../../types/admin';
import { useShopStore } from '../../context/ShopStoreContext';

interface ProductFormModalProps {
  product: AdminProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  product,
  isOpen,
  onClose
}) => {
  const { categories, addProduct, updateProduct } = useShopStore();

  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [priceUGX, setPriceUGX] = useState<number>(50000);
  const [priceUSD, setPriceUSD] = useState<number>(15);
  const [salePriceUGX, setSalePriceUGX] = useState<number | undefined>(undefined);
  const [stockQuantity, setStockQuantity] = useState<number>(100);
  const [lowStockAlert, setLowStockAlert] = useState<number>(10);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [turnaroundTime, setTurnaroundTime] = useState('24 - 48 Hours');
  const [badge, setBadge] = useState<string>('');
  const [status, setStatus] = useState<'active' | 'draft' | 'archived'>('active');
  const [selectedTag, setSelectedTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setSku(product.sku || '');
      setCategory(product.category || (categories[0]?.name || 'Branded Apparel'));
      setPriceUGX(product.priceUGX || 50000);
      setPriceUSD(product.priceUSD || Math.round((product.priceUGX || 50000) / 3800));
      setSalePriceUGX(product.salePriceUGX);
      setStockQuantity(product.stockQuantity ?? 100);
      setLowStockAlert(product.lowStockAlert ?? 10);
      setImage(product.image || '');
      setDescription(product.description || '');
      setTurnaroundTime(product.turnaroundTime || '24 - 48 Hours');
      setBadge(product.badge || '');
      setStatus(product.status || 'active');
      setTags(product.tags || []);
    } else {
      setName('');
      setSku(`SI-${Math.floor(1000 + Math.random() * 9000)}`);
      setCategory(categories[0]?.name || 'Branded Apparel');
      setPriceUGX(50000);
      setPriceUSD(15);
      setSalePriceUGX(undefined);
      setStockQuantity(100);
      setLowStockAlert(10);
      setImage('https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800');
      setDescription('');
      setTurnaroundTime('24 - 48 Hours');
      setBadge('New');
      setStatus('active');
      setTags(['Custom Branding', 'Top Quality']);
    }
  }, [product, categories, isOpen]);

  // Sync USD price automatically when UGX changes if user hasn't explicitly set it
  const handlePriceUGXChange = (val: number) => {
    setPriceUGX(val);
    setPriceUSD(Number((val / 3800).toFixed(1)));
  };

  const handleAddTag = () => {
    if (selectedTag.trim() && !tags.includes(selectedTag.trim())) {
      setTags([...tags, selectedTag.trim()]);
      setSelectedTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter a product name');
      return;
    }

    const payload: Partial<AdminProduct> = {
      name: name.trim(),
      sku: sku.trim() || `SI-${Date.now().toString().slice(-4)}`,
      category,
      priceUGX: Number(priceUGX),
      priceUSD: Number(priceUSD),
      salePriceUGX: salePriceUGX ? Number(salePriceUGX) : undefined,
      stockQuantity: Number(stockQuantity),
      lowStockAlert: Number(lowStockAlert),
      image: image.trim() || 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800',
      description: description.trim(),
      turnaroundTime,
      badge: badge.trim() || undefined,
      status,
      tags
    };

    if (product) {
      updateProduct(product.id, payload);
    } else {
      addProduct(payload as Omit<AdminProduct, 'id'>);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in-50">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#12142B] text-white flex items-center justify-between">
          <div>
            <h2 className="text-base font-black">
              {product ? 'Edit Product Item' : 'Add New Product to Shop'}
            </h2>
            <p className="text-xs text-slate-300">Live synchronized with the customer storefront</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar text-slate-800 text-xs">
          
          {/* Row 1: Title & SKU */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Product Title / Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Premium Executive Notebook & Pen Set"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:border-[#2D3094] focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">SKU Code</label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="e.g. SI-NB-001"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:border-[#2D3094] focus:bg-white outline-none"
              />
            </div>
          </div>

          {/* Row 2: Category & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:border-[#2D3094] outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Catalog Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:border-[#2D3094] outline-none"
              >
                <option value="active">Active (Visible in Shop)</option>
                <option value="draft">Draft (Hidden)</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Row 3: Pricing (UGX & USD) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Price (UGX) *</label>
              <input
                type="number"
                required
                min={0}
                step={500}
                value={priceUGX}
                onChange={(e) => handlePriceUGXChange(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-[#2D3094] focus:border-[#2D3094] outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Price (USD $)</label>
              <input
                type="number"
                min={0}
                step={0.5}
                value={priceUSD}
                onChange={(e) => setPriceUSD(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:border-[#2D3094] outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Sale / Discount Price (UGX)</label>
              <input
                type="number"
                min={0}
                step={500}
                value={salePriceUGX || ''}
                onChange={(e) => setSalePriceUGX(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Optional promo price"
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-emerald-700 focus:border-[#2D3094] outline-none"
              />
            </div>
          </div>

          {/* Row 4: Stock & Inventory Alerts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Stock Quantity</label>
              <input
                type="number"
                min={0}
                value={stockQuantity}
                onChange={(e) => setStockQuantity(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:border-[#2D3094] outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Low Stock Alert Level</label>
              <input
                type="number"
                min={1}
                value={lowStockAlert}
                onChange={(e) => setLowStockAlert(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:border-[#2D3094] outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Turnaround Time</label>
              <input
                type="text"
                value={turnaroundTime}
                onChange={(e) => setTurnaroundTime(e.target.value)}
                placeholder="e.g. 24-48 Hours"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:border-[#2D3094] outline-none"
              />
            </div>
          </div>

          {/* Row 5: Image URL & Preview */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Product Image URL</label>
            <div className="flex gap-2">
              <input
                type="url"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:border-[#2D3094] outline-none"
              />
              {image && (
                <div className="w-10 h-10 rounded-xl border border-slate-200 overflow-hidden shrink-0">
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Row 6: Description */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Description & Specifications</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="High quality corporate branded merchandise with durable finish..."
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:border-[#2D3094] outline-none"
            />
          </div>

          {/* Row 7: Badge & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Promotional Badge</label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:border-[#2D3094] outline-none"
              >
                <option value="">No Badge</option>
                <option value="Best Seller">Best Seller</option>
                <option value="Featured">Featured</option>
                <option value="New">New Arrival</option>
                <option value="Sale">Special Sale</option>
                <option value="Popular">Popular</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Tags & Keywords</label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  placeholder="e.g. Corporate, Embroidery"
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
                  className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 rounded-xl font-bold"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold">
                    {t}
                    <button type="button" onClick={() => handleRemoveTag(t)} className="text-slate-400 hover:text-rose-600">×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#2D3094] to-[#2E3192] hover:from-[#232573] hover:to-[#22256e] text-white font-bold shadow-md shadow-[#2D3094]/20"
            >
              {product ? 'Save Changes' : 'Create Product'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
