import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  MessageSquare, 
  ShoppingCart, 
  Plus, 
  Minus,
  Info,
  Palette,
  FileCheck
} from 'lucide-react';
import { Product, Currency, CustomizationOptions, CartItem } from '../types';

interface ProductCustomizerModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  onAddToCart: (item: CartItem) => void;
}

export const ProductCustomizerModal: React.FC<ProductCustomizerModalProps> = ({
  product,
  isOpen,
  onClose,
  currency,
  onAddToCart
}) => {
  // Customization State
  const [quantity, setQuantity] = useState<number>(product?.minOrderQty || 10);
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors ? product.colors[0] : 'Default');
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes ? product.sizes[0] : '');
  const [customText, setCustomText] = useState<string>('');
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState<string | null>(null);
  const [logoPosition, setLogoPosition] = useState<'Front Center' | 'Left Chest' | 'Right Sleeve' | 'Full Wrap'>('Front Center');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [isSuccessNotification, setIsSuccessNotification] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (product) {
      setQuantity(product.minOrderQty || 10);
      setSelectedColor(product.colors ? product.colors[0] : 'Default');
      setSelectedSize(product.sizes ? product.sizes[0] : '');
      setCustomText('');
      setUploadedLogoUrl(null);
      setSpecialInstructions('');
      setIsSuccessNotification(false);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  // Calculate bulk discount
  const getBulkDiscountPercent = (qty: number) => {
    if (!product.bulkTiers || product.bulkTiers.length === 0) return 0;
    const sortedTiers = [...product.bulkTiers].sort((a, b) => b.minQty - a.minQty);
    for (const tier of sortedTiers) {
      if (qty >= tier.minQty) {
        return tier.discountPercent;
      }
    }
    return 0;
  };

  const discountPercent = getBulkDiscountPercent(quantity);
  const unitPriceUGX = product.priceUGX * (1 - discountPercent / 100);
  const unitPriceUSD = product.priceUSD * (1 - discountPercent / 100);

  const totalPriceUGX = unitPriceUGX * quantity;
  const totalPriceUSD = unitPriceUSD * quantity;

  // Handle Logo Upload Simulation
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedLogoUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    const customOptions: CustomizationOptions = {
      text: customText || undefined,
      color: selectedColor || undefined,
      size: selectedSize || undefined,
      uploadedLogoUrl: uploadedLogoUrl || undefined,
      placement: logoPosition,
      specialInstructions: specialInstructions || undefined
    };

    const cartItem: CartItem = {
      productId: product.id,
      product: product,
      quantity: quantity,
      unitPriceUGX: unitPriceUGX,
      unitPriceUSD: unitPriceUSD,
      customization: customOptions,
      subtotalUGX: totalPriceUGX,
      subtotalUSD: totalPriceUSD
    };

    onAddToCart(cartItem);
    setIsSuccessNotification(true);
    setTimeout(() => {
      setIsSuccessNotification(false);
      onClose();
    }, 1200);
  };

  const handleWhatsAppOrder = () => {
    const message = `Hello Sozy Impressions! I would like to order:
- Product: ${product.name}
- Quantity: ${quantity} units
- Color: ${selectedColor}
${selectedSize ? `- Size: ${selectedSize}` : ''}
${customText ? `- Custom Text: "${customText}"` : ''}
- Total Price: ${currency === 'UGX' ? `UGX ${totalPriceUGX.toLocaleString()}` : `$${totalPriceUSD.toFixed(2)}`}

Please assist me with finalizing this order!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/256787662183?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 relative text-left my-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest bg-[#2D3094]/10 text-[#2D3094] px-2.5 py-1 rounded-full">
              Live Product Customizer
            </span>
            <span className="text-xs text-slate-400">• {product.category}</span>
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Column: Live Visual Canvas Preview (md:col-span-5) */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shadow-inner flex items-center justify-center group">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover" 
                />

                {/* Simulated Live Overlay: Uploaded Logo or Custom Text on Merchandise */}
                {(uploadedLogoUrl || customText) && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 pointer-events-none">
                    <div className="bg-white/85 backdrop-blur-sm p-3 rounded-xl border border-white shadow-xl max-w-[80%] flex flex-col items-center text-center animate-in zoom-in-90 duration-300">
                      {uploadedLogoUrl && (
                        <img 
                          src={uploadedLogoUrl} 
                          alt="Custom Logo Proof" 
                          className="max-h-14 max-w-full object-contain mb-1" 
                        />
                      )}
                      {customText && (
                        <span className="font-heading font-black text-xs text-[#2D3094] tracking-tight">
                          {customText}
                        </span>
                      )}
                      <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                        Placement: {logoPosition}
                      </span>
                    </div>
                  </div>
                )}

                {/* Live Preview Watermark */}
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[9px] font-bold text-white">
                  3D Interactive Proof
                </div>
              </div>

              {/* Product Specifications Sheet */}
              <div className="w-full mt-4 bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 text-xs">
                <div className="font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                  <Info size={14} className="text-[#2D3094]" />
                  <span>Technical Specs:</span>
                </div>
                {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-1 border-b border-slate-200/60 last:border-0 text-[11px]">
                    <span className="text-slate-500 font-medium">{key}:</span>
                    <span className="text-slate-800 font-bold">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Customization Controls (md:col-span-7) */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-black text-2xl text-[#121212] leading-tight mb-2">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* 1. Color Selector */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Palette size={14} className="text-[#ED008C]" />
                      <span>Select Base Color: <strong className="text-[#2D3094]">{selectedColor}</strong></span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all ${
                            selectedColor === color
                              ? 'bg-[#2D3094] text-white shadow-md'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Size / Dimensions Selector (if applicable) */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Select Size / Format: <strong className="text-[#2D3094]">{selectedSize}</strong>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                            selectedSize === size
                              ? 'border-[#ED008C] bg-[#ED008C]/10 text-[#ED008C]'
                              : 'border-slate-200 text-slate-700 hover:border-slate-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Logo Upload / Simulation */}
                <div className="mb-5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Upload size={14} className="text-[#2D3094]" />
                      <span>Upload Artwork / Company Logo</span>
                    </label>
                    {uploadedLogoUrl && (
                      <button 
                        onClick={() => setUploadedLogoUrl(null)}
                        className="text-[10px] text-red-500 font-bold hover:underline"
                      >
                        Remove Logo
                      </button>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleLogoUpload}
                      accept="image/*,.pdf,.ai,.eps,.svg"
                      className="hidden" 
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white border border-slate-300 hover:border-[#2D3094] text-slate-700 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-2"
                    >
                      <Upload size={14} />
                      <span>{uploadedLogoUrl ? 'Replace Logo File' : 'Choose Logo / Vector File'}</span>
                    </button>
                    <span className="text-[10px] text-slate-500">
                      Supports AI, EPS, SVG, PNG, PDF (Free Pre-Press Check)
                    </span>
                  </div>

                  {/* Logo Placement Selector */}
                  <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center gap-2 flex-wrap text-xs">
                    <span className="text-slate-500 font-medium">Placement:</span>
                    {(['Front Center', 'Left Chest', 'Right Sleeve', 'Full Wrap'] as const).map((pos) => (
                      <button
                        key={pos}
                        type="button"
                        onClick={() => setLogoPosition(pos)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          logoPosition === pos 
                            ? 'bg-[#2D3094] text-white' 
                            : 'bg-white text-slate-600 border border-slate-200'
                        }`}
                      >
                        {pos}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Custom Text / Slogan Input */}
                <div className="mb-5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Custom Text / Slogan (Optional)
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g., 'Sozy Annual Summit 2026' or Employee Name"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-[#2D3094] focus:bg-white transition-all"
                  />
                </div>

                {/* 5. Quantity & Bulk Tier Price Calculation */}
                <div className="mb-6 bg-[#F7F8FA] p-4 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Order Quantity
                      </span>
                      <div className="text-[10px] text-slate-500">
                        Min. Order: {product.minOrderQty || 1} units
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-xl p-1 shadow-sm">
                      <button 
                        type="button"
                        onClick={() => setQuantity(Math.max((product.minOrderQty || 1), quantity - 10))}
                        className="p-1.5 text-slate-600 hover:text-[#2D3094] hover:bg-slate-100 rounded-lg"
                      >
                        <Minus size={14} />
                      </button>
                      <input 
                        type="number"
                        min={product.minOrderQty || 1}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max((product.minOrderQty || 1), parseInt(e.target.value) || (product.minOrderQty || 1)))}
                        className="w-16 text-center font-heading font-black text-sm text-[#2D3094] bg-transparent outline-none"
                      />
                      <button 
                        type="button"
                        onClick={() => setQuantity(quantity + 10)}
                        className="p-1.5 text-slate-600 hover:text-[#2D3094] hover:bg-slate-100 rounded-lg"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Bulk Discount Tiers Visual */}
                  {product.bulkTiers && product.bulkTiers.length > 0 && (
                    <div className="grid grid-cols-4 gap-1 text-center text-[10px] pt-2 border-t border-slate-200">
                      {product.bulkTiers.map((tier, idx) => (
                        <div 
                          key={idx}
                          className={`p-1.5 rounded-lg ${
                            quantity >= tier.minQty 
                              ? 'bg-[#2D3094] text-white font-bold' 
                              : 'bg-white text-slate-600 border border-slate-200'
                          }`}
                        >
                          <div>{tier.minQty}+ pcs</div>
                          <div className="text-[9px] text-[#ED008C] font-black">
                            {tier.discountPercent > 0 ? `-${tier.discountPercent}%` : 'Standard'}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* Price Calculation Summary & CTAs */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Unit Price: {currency === 'UGX' ? `UGX ${Math.round(unitPriceUGX).toLocaleString()}` : `$${unitPriceUSD.toFixed(2)}`}
                      {discountPercent > 0 && (
                        <span className="ml-1.5 text-emerald-600 font-bold">({discountPercent}% Bulk Saving Applied)</span>
                      )}
                    </div>
                    <div className="font-heading font-black text-2xl text-[#2D3094]">
                      Total: {currency === 'UGX' ? `UGX ${Math.round(totalPriceUGX).toLocaleString()}` : `$${totalPriceUSD.toFixed(2)}`}
                    </div>
                  </div>

                  <div className="text-right text-[10px] text-slate-500 font-medium">
                    Includes Free 3D Proof &<br />Kampala Delivery on Bulk
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="flex-1 bg-[#ED008C] hover:bg-[#d4007d] text-white font-bold text-xs uppercase tracking-wider py-4 rounded-full shadow-lg shadow-[#ED008C]/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
                  >
                    <ShoppingCart size={16} />
                    <span>Add Customized Item to Cart</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-full transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-95"
                  >
                    <MessageSquare size={16} />
                    <span>Order via WhatsApp</span>
                  </button>
                </div>

                {isSuccessNotification && (
                  <div className="mt-3 bg-emerald-500 text-white text-xs font-bold p-2.5 rounded-xl text-center flex items-center justify-center gap-2 animate-in fade-in">
                    <FileCheck size={16} />
                    <span>Custom product added to cart successfully!</span>
                  </div>
                )}

              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
