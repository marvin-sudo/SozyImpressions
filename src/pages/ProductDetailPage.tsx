import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ArrowLeft, 
  ShoppingCart, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  UploadCloud, 
  MessageSquare, 
  ChevronRight, 
  Share2, 
  Heart, 
  Plus, 
  Minus, 
  ArrowRight
} from 'lucide-react';
import { View, Currency, CartItem, CustomizationOptions } from '../types';
import { getProductById, getRelatedProducts } from '../utils/productUtils';
import { PAYMENT_LOGOS } from '../data/mockData';

interface ProductDetailPageProps {
  productId?: string;
  navigate: (view: View, param?: string) => void;
  currency: Currency;
  onAddToCart: (item: CartItem) => void;
  showToast?: (msg: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  navigate,
  currency,
  onAddToCart,
  showToast
}) => {
  const product = useMemo(() => getProductById(productId), [productId]);
  const relatedProducts = useMemo(() => getRelatedProducts(product, 4), [product]);

  // Gallery & Image State
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const galleryImages = useMemo(() => {
    if (product.gallery && product.gallery.length > 0) {
      return product.gallery;
    }
    return [product.image];
  }, [product]);

  // Reset image index when product changes
  useEffect(() => {
    setSelectedImageIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  // Customization Options State
  const defaultColors = product.colors || ['Matte Black', 'Silver Lustre', 'Royal Blue', 'Champagne Gold'];
  const defaultMaterials = product.materials || ['Standard Anodised Alloy', 'Premium Brushed Metal', 'Clear Cast Acrylic'];
  const defaultFinishings = product.finishings || ['Laser Deep Engraving', 'Precision UV Color Print', 'Foil Stamped'];
  const defaultSizes = product.sizes || [];

  const [quantity, setQuantity] = useState<number>(product.minOrderQty || 1);
  const [selectedColor, setSelectedColor] = useState<string>(defaultColors[0] || 'Default');
  const [selectedMaterial, setSelectedMaterial] = useState<string>(defaultMaterials[0] || 'Standard');
  const [selectedFinishing, setSelectedFinishing] = useState<string>(defaultFinishings[0] || 'Standard');
  const [selectedSize, setSelectedSize] = useState<string>(defaultSizes[0] || '');
  
  // Customization input
  const [customText, setCustomText] = useState<string>('');
  const [selectedFont, setSelectedFont] = useState<string>('Modern Sans');
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState<string | null>(null);
  const [logoPosition, setLogoPosition] = useState<'Front Center' | 'Left Chest' | 'Full Wrap' | 'Back'>('Front Center');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'delivery' | 'faqs'>('specs');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Bulk discount calculation
  const bulkTiers = useMemo(() => product.bulkTiers || [
    { minQty: 1, discountPercent: 0 },
    { minQty: 10, discountPercent: 5 },
    { minQty: 25, discountPercent: 10 },
    { minQty: 50, discountPercent: 15 },
    { minQty: 100, discountPercent: 20 }
  ], [product.bulkTiers]);

  const activeDiscountPercent = useMemo(() => {
    const sorted = [...bulkTiers].sort((a, b) => b.minQty - a.minQty);
    for (const tier of sorted) {
      if (quantity >= tier.minQty) {
        return tier.discountPercent;
      }
    }
    return 0;
  }, [quantity, bulkTiers]);

  const unitPriceUGX = Math.round(product.priceUGX * (1 - activeDiscountPercent / 100));
  const unitPriceUSD = Number((product.priceUSD * (1 - activeDiscountPercent / 100)).toFixed(2));
  const totalPriceUGX = unitPriceUGX * quantity;
  const totalPriceUSD = Number((unitPriceUSD * quantity).toFixed(2));

  // Handle Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedLogoUrl(event.target?.result as string);
        if (showToast) showToast('Logo uploaded successfully! Preview updated on mockup.');
      };
      reader.readAsDataURL(file);
    }
  };

  // Build CartItem object
  const createCartItem = (): CartItem => {
    const customization: CustomizationOptions = {
      color: selectedColor,
      material: selectedMaterial,
      finishing: selectedFinishing,
      size: selectedSize || undefined,
      text: customText || undefined,
      uploadedLogoUrl: uploadedLogoUrl || undefined,
      placement: logoPosition,
      specialInstructions: specialInstructions || undefined
    };

    return {
      productId: product.id,
      product,
      quantity,
      selectedColor,
      selectedMaterial,
      selectedFinishing,
      selectedSize: selectedSize || undefined,
      customText: customText || undefined,
      customLogoUrl: uploadedLogoUrl || undefined,
      customInstructions: specialInstructions || undefined,
      customization,
      unitPriceUGX,
      unitPriceUSD,
      subtotalUGX: totalPriceUGX,
      subtotalUSD: totalPriceUSD,
      itemTotalPriceUGX: totalPriceUGX,
      itemTotalPriceUSD: totalPriceUSD
    };
  };

  // Add to Cart
  const handleAddToCart = () => {
    const item = createCartItem();
    onAddToCart(item);
    if (showToast) {
      showToast(`Added ${quantity}x "${product.name}" to cart!`);
    }
  };

  // Buy Now -> Direct Full Checkout Page
  const handleBuyNow = () => {
    const item = createCartItem();
    onAddToCart(item);
    navigate('checkout');
  };

  // WhatsApp Direct Order
  const handleWhatsAppOrder = () => {
    const message = `Hello Sozy Impressions! I would like to order this item:
- Product: ${product.name}
- Quantity: ${quantity} units
- Color: ${selectedColor}
${selectedSize ? `- Size: ${selectedSize}` : ''}
${selectedMaterial ? `- Material: ${selectedMaterial}` : ''}
${selectedFinishing ? `- Finish: ${selectedFinishing}` : ''}
${customText ? `- Engraving/Print Text: "${customText}" (${selectedFont})` : ''}
${uploadedLogoUrl ? `- Custom Logo Attached: Yes (Placement: ${logoPosition})` : ''}
${specialInstructions ? `- Special Instructions: ${specialInstructions}` : ''}
- Total: ${currency === 'UGX' ? `UGX ${totalPriceUGX.toLocaleString()}` : `$${totalPriceUSD.toFixed(2)}`}

Please confirm turnaround time and share digital proof!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/256787662183?text=${encoded}`, '_blank');
  };

  // Share Product Link
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      if (showToast) showToast('Product link copied to clipboard!');
    }
  };

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen text-slate-900 pb-20">
      
      {/* 1. Breadcrumbs & Top Bar */}
      <div className="bg-white border-b border-slate-200/80 sticky top-0 z-20 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button 
              onClick={() => navigate('home')} 
              className="hover:text-[#2D3094] transition-colors"
            >
              Home
            </button>
            <ChevronRight size={13} className="text-slate-400" />
            <button 
              onClick={() => navigate('shop')} 
              className="hover:text-[#2D3094] transition-colors"
            >
              Shop Catalog
            </button>
            <ChevronRight size={13} className="text-slate-400" />
            <button 
              onClick={() => navigate('shop', product.category)} 
              className="hover:text-[#2D3094] transition-colors text-slate-600 font-semibold"
            >
              {product.category}
            </button>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-[320px]">
              {product.name}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('shop')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Catalog</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
              title="Share Product"
              aria-label="Share Product"
            >
              <Share2 size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Product Display Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* LEFT COLUMN: Media Gallery & Live Visual Mockup (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              
              {/* Main Image Frame with Live Visual Mockup Overlay */}
              <div className="relative w-full aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-inner group">
                <img 
                  src={galleryImages[selectedImageIndex] || product.image} 
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badge Overlay */}
                <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
                  <span className="bg-[#2D3094] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                    {product.badge || 'PERSONALISED'}
                  </span>
                  {activeDiscountPercent > 0 && (
                    <span className="bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                      {activeDiscountPercent}% Volume Savings
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-600 hover:text-red-500 shadow-sm transition-transform active:scale-90"
                  aria-label="Save to wishlist"
                >
                  <Heart size={18} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
                </button>

                {/* Interactive Live Mockup Proof Overlay (when custom text or logo uploaded) */}
                {(uploadedLogoUrl || customText) && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 pointer-events-none">
                    <div className="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-white shadow-2xl max-w-[85%] flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
                      {uploadedLogoUrl && (
                        <img 
                          src={uploadedLogoUrl} 
                          alt="Custom Logo Proof" 
                          className="max-h-16 max-w-full object-contain mb-1.5" 
                        />
                      )}
                      {customText && (
                        <span className="font-heading font-black text-sm text-[#2D3094] tracking-tight">
                          {customText}
                        </span>
                      )}
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                        Placement: {logoPosition} • {selectedFont}
                      </span>
                    </div>
                  </div>
                )}

                {/* Live Preview Indicator */}
                <div className="absolute bottom-3 left-3 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>3D Digital Proof Preview</span>
                </div>
              </div>

              {/* Gallery Thumbnails Carousel */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImageIndex === idx
                          ? 'border-[#2D3094] shadow-md scale-102'
                          : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} - view ${idx + 1}`} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Studio Guarantees Strip */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-700">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <span className="font-bold block">Free Digital 3D Proof</span>
                    <span className="text-slate-500 text-[11px]">Approved via WhatsApp/Email before engraving begins</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-700">
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 text-[#2D3094] flex items-center justify-center shrink-0">
                    <Truck size={16} />
                  </div>
                  <div>
                    <span className="font-bold block">Kampala Same-Day & Next-Day Delivery</span>
                    <span className="text-slate-500 text-[11px]">Reliable nationwide delivery to all Ugandan districts</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-700">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 text-[#ED008C] flex items-center justify-center shrink-0">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <span className="font-bold block">100% Quality & Replacement Guarantee</span>
                    <span className="text-slate-500 text-[11px]">Fabricated in our Kampala studio with high-grade materials</span>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Configuration, Pricing & Actions (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              
              <div>
                {/* Category & Status */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#2D3094] uppercase tracking-wider bg-[#2D3094]/10 px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                    <span className="text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      In Stock & Customisable
                    </span>
                  </div>

                  {/* Customer Rating (no star icons) */}
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                    <span className="text-[#2D3094] font-black">{product.rating ? product.rating.toFixed(1) : '5.0'} / 5.0</span>
                    <span className="text-slate-400">({product.reviewCount || 38} verified orders)</span>
                  </div>
                </div>

                {/* Product Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-slate-900 tracking-tight leading-snug mb-3">
                  {product.name}
                </h1>

                {/* Short Description */}
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Pricing Banner */}
                <div className="bg-gradient-to-r from-slate-50 to-indigo-50/40 p-4 sm:p-5 rounded-2xl border border-slate-200 mb-6 flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Unit Price:
                    </span>
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-2xl sm:text-3xl font-heading font-black text-[#2D3094] tracking-tight">
                        {currency === 'UGX' ? `UGX ${unitPriceUGX.toLocaleString()}` : `$${unitPriceUSD.toFixed(2)}`}
                      </span>
                      {product.originalPriceUGX && product.originalPriceUGX > product.priceUGX && (
                        <span className="text-sm text-slate-400 line-through">
                          {currency === 'UGX' 
                            ? `UGX ${product.originalPriceUGX.toLocaleString()}` 
                            : `$${product.originalPriceUSD?.toFixed(2)}`}
                        </span>
                      )}
                      {activeDiscountPercent > 0 && (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          Save {activeDiscountPercent}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bulk Tier Summary */}
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Min Order Quantity:
                    </span>
                    <span className="text-xs font-black text-slate-800">
                      {product.minOrderQty || 1} Unit(s)
                    </span>
                  </div>
                </div>

                {/* Volume Discount Tiers Table */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Volume Wholesale Tiers:
                    </span>
                    <span className="text-[11px] text-[#2D3094] font-medium">
                      Select qty below to apply tier discount
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {bulkTiers.map((tier, idx) => {
                      const isActive = quantity >= tier.minQty;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setQuantity(tier.minQty)}
                          className={`p-2.5 rounded-xl border text-center transition-all ${
                            isActive
                              ? 'bg-[#2D3094]/10 border-[#2D3094] text-[#2D3094] font-bold'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <div className="text-xs font-bold">{tier.minQty}+ Units</div>
                          <div className="text-[11px] text-emerald-600 font-black">
                            {tier.discountPercent === 0 ? 'Standard Rate' : `${tier.discountPercent}% OFF`}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* CUSTOMISATION CONTROLS */}
                <div className="space-y-5 border-t border-slate-200 pt-6">
                  
                  {/* Color Selector */}
                  <div>
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                      Select Finish / Color: <span className="text-[#2D3094] font-black">{selectedColor}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {defaultColors.map((color) => {
                        const isSelected = selectedColor === color;
                        return (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                              isSelected
                                ? 'bg-[#2D3094] text-white border-[#2D3094] shadow-xs'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {color}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Size Selector if available */}
                  {defaultSizes.length > 0 && (
                    <div>
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                        Select Dimension / Size: <span className="text-[#2D3094] font-black">{selectedSize}</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {defaultSizes.map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => setSelectedSize(sz)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                              selectedSize === sz
                                ? 'bg-[#2D3094] text-white border-[#2D3094] shadow-xs'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Material Selector if available */}
                  {defaultMaterials.length > 0 && (
                    <div>
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                        Material & Build: <span className="text-[#2D3094] font-black">{selectedMaterial}</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {defaultMaterials.map((mat) => (
                          <button
                            key={mat}
                            type="button"
                            onClick={() => setSelectedMaterial(mat)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                              selectedMaterial === mat
                                ? 'bg-[#2D3094] text-white border-[#2D3094] shadow-xs'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {mat}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Finishing Technique Selector if available */}
                  {defaultFinishings.length > 0 && (
                    <div>
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                        Finishing Method: <span className="text-[#2D3094] font-black">{selectedFinishing}</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {defaultFinishings.map((finish) => (
                          <button
                            key={finish}
                            type="button"
                            onClick={() => setSelectedFinishing(finish)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                              selectedFinishing === finish
                                ? 'bg-[#2D3094] text-white border-[#2D3094] shadow-xs'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {finish}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Personalised Engraving Text */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <span>Personalised Text / Engraving Name:</span>
                      </label>
                      <span className="text-[10px] text-slate-400">{customText.length}/40 characters</span>
                    </div>
                    <input 
                      type="text" 
                      value={customText}
                      maxLength={40}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="e.g. Johnathan Ssemwogerere, CEO"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#2D3094] focus:ring-1 focus:ring-[#2D3094]"
                    />

                    {/* Font Style Selection */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[11px] text-slate-500 font-medium">Font Style:</span>
                      {['Modern Sans', 'Executive Serif', 'Script Monogram'].map((font) => (
                        <button
                          key={font}
                          type="button"
                          onClick={() => setSelectedFont(font)}
                          className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${
                            selectedFont === font
                              ? 'bg-slate-900 text-white border-slate-900 font-bold'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {font}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Artwork / Logo Upload Box */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <UploadCloud size={14} className="text-[#2D3094]" />
                        <span>Corporate Logo / Vector Artwork:</span>
                      </label>
                      {uploadedLogoUrl && (
                        <button
                          type="button"
                          onClick={() => setUploadedLogoUrl(null)}
                          className="text-[10px] font-bold text-red-500 hover:underline"
                        >
                          Remove Logo
                        </button>
                      )}
                    </div>

                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleLogoUpload}
                      accept="image/*,.pdf,.svg,.eps,.ai"
                      className="hidden" 
                    />

                    {uploadedLogoUrl ? (
                      <div className="bg-white p-3 rounded-xl border border-emerald-200 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img src={uploadedLogoUrl} alt="Logo" className="w-10 h-10 object-contain rounded border border-slate-200 p-0.5" />
                          <div className="text-left">
                            <span className="text-xs font-bold text-slate-900 block truncate">Custom Artwork Uploaded</span>
                            <span className="text-[10px] text-emerald-600 font-medium">Ready for 3D Proofing</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-xs text-[#2D3094] font-bold hover:underline"
                        >
                          Replace
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full bg-white border border-dashed border-slate-300 hover:border-[#2D3094] rounded-xl p-3 text-center transition-colors flex flex-col items-center justify-center gap-1 group cursor-pointer"
                      >
                        <UploadCloud size={18} className="text-slate-400 group-hover:text-[#2D3094] transition-colors" />
                        <span className="text-xs font-bold text-slate-700 group-hover:text-[#2D3094]">
                          Click to upload logo (PNG, JPG, SVG, PDF)
                        </span>
                        <span className="text-[10px] text-slate-400">
                          High resolution or vector artwork recommended
                        </span>
                      </button>
                    )}

                    {/* Logo Placement Selector */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[11px] text-slate-500 font-medium">Placement:</span>
                      {(['Front Center', 'Left Chest', 'Full Wrap', 'Back'] as const).map((pos) => (
                        <button
                          key={pos}
                          type="button"
                          onClick={() => setLogoPosition(pos)}
                          className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${
                            logoPosition === pos
                              ? 'bg-slate-900 text-white border-slate-900 font-bold'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {pos}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Special Instructions */}
                  <div>
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
                      Production Notes / Instructions (Optional):
                    </label>
                    <textarea 
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="e.g., Please position the year below the recipient's name in bold."
                      rows={2}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#2D3094] focus:ring-1 focus:ring-[#2D3094]"
                    />
                  </div>

                  {/* Quantity Stepper & Total Summary */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Quantity:
                      </span>
                      <span className="text-xs text-slate-500">
                        {quantity >= 10 ? 'Volume Wholesale Pricing Applied' : 'Standard Rate'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                      <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden shadow-2xs">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(product.minOrderQty || 1, quantity - 1))}
                          className="p-2.5 hover:bg-slate-100 text-slate-700 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <input
                          type="number"
                          min={product.minOrderQty || 1}
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(product.minOrderQty || 1, parseInt(e.target.value) || 1))}
                          className="w-14 text-center text-xs font-bold text-slate-900 border-x border-slate-300 py-2 focus:outline-hidden"
                        />
                        <button
                          type="button"
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-2.5 hover:bg-slate-100 text-slate-700 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Total ({quantity} units):
                        </span>
                        <span className="text-xl font-heading font-black text-[#2D3094]">
                          {currency === 'UGX' ? `UGX ${totalPriceUGX.toLocaleString()}` : `$${totalPriceUSD.toFixed(2)}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ACTION BUTTONS ROW */}
                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    
                    {/* Primary Buy Now -> Full Checkout Page */}
                    <button
                      type="button"
                      onClick={handleBuyNow}
                      className="flex-1 bg-[#2D3094] hover:bg-[#20236e] text-white py-4 px-6 rounded-2xl font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#2D3094]/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Buy Now — Proceed to Checkout</span>
                      <ArrowRight size={16} />
                    </button>

                    {/* Secondary Add to Cart */}
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="flex-1 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-300 py-4 px-6 rounded-2xl font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingCart size={16} className="text-[#2D3094]" />
                      <span>Add to Cart</span>
                    </button>

                  </div>

                  {/* 1-Tap WhatsApp Consultation */}
                  <button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <MessageSquare size={16} />
                    <span>Order / Consult via WhatsApp Desk (+256 787 662 183)</span>
                  </button>

                  {/* Payment Icons Acceptance */}
                  <div className="pt-3 flex items-center justify-between gap-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Accepted Payment Methods:
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded flex items-center justify-center h-5" title="MTN Mobile Money">
                        <img src={PAYMENT_LOGOS.mtn} alt="MTN MoMo" className="h-3.5 w-auto object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <div className="bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded flex items-center justify-center h-5" title="Airtel Money">
                        <img src={PAYMENT_LOGOS.airtelMoney} alt="Airtel Money" className="h-3.5 w-auto object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <div className="bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded flex items-center justify-center h-5" title="Visa / Mastercard">
                        <img src={PAYMENT_LOGOS.visaMastercard} alt="Visa & Mastercard" className="h-3.5 w-auto object-contain" referrerPolicy="no-referrer" />
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </div>

      {/* 3. Deep-Dive Tabs: Specifications, Delivery, FAQs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-8">
          
          <div className="flex border-b border-slate-200 gap-6">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
                activeTab === 'specs'
                  ? 'border-[#2D3094] text-[#2D3094]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Technical Specifications
            </button>

            <button
              onClick={() => setActiveTab('delivery')}
              className={`pb-3.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
                activeTab === 'delivery'
                  ? 'border-[#2D3094] text-[#2D3094]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Production & Delivery Timeline
            </button>

            <button
              onClick={() => setActiveTab('faqs')}
              className={`pb-3.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
                activeTab === 'faqs'
                  ? 'border-[#2D3094] text-[#2D3094]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Frequently Asked Questions
            </button>
          </div>

          <div className="pt-6">
            {activeTab === 'specs' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                  Every product is precision-crafted at our Kampala workshop on Nasser/Nkrumah Road, utilizing industrial fiber lasers and Japanese UV curing print heads to guarantee flawless detail and durable longevity.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {product.specifications && Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex justify-between gap-4 text-xs">
                      <span className="font-bold text-slate-700">{key}:</span>
                      <span className="text-slate-600 text-right">{val}</span>
                    </div>
                  ))}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex justify-between gap-4 text-xs">
                    <span className="font-bold text-slate-700">Customisation:</span>
                    <span className="text-slate-600 text-right">Individual names, company logos, monograms</span>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex justify-between gap-4 text-xs">
                    <span className="font-bold text-slate-700">Workshop Location:</span>
                    <span className="text-slate-600 text-right">Kampala, Uganda</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold text-[#2D3094] uppercase tracking-wider block mb-1">
                      Step 1: Digital Proof
                    </span>
                    <p className="text-xs text-slate-600">
                      Within 2–4 hours of ordering, our design desk sends you a 3D digital simulation for sign-off via WhatsApp or email.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold text-[#2D3094] uppercase tracking-wider block mb-1">
                      Step 2: Studio Production
                    </span>
                    <p className="text-xs text-slate-600">
                      Standard orders are produced in 24–48 hours. Express same-day production is available on request.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold text-[#2D3094] uppercase tracking-wider block mb-1">
                      Step 3: Secure Delivery
                    </span>
                    <p className="text-xs text-slate-600">
                      Dispatched with professional motorcycle riders across Kampala or via regional courier buses upcountry.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'faqs' && (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Can I see a sample before bulk production?</h4>
                  <p className="text-xs text-slate-600">Yes! We provide free 3D digital proofs for all orders, and for bulk corporate orders (50+ units), we can fabricate a physical pre-production sample upon deposit confirmation.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-900 mb-1">What formats can I upload for my logo?</h4>
                  <p className="text-xs text-slate-600">We accept PDF, PNG, JPEG, SVG, and AI/EPS files. Vector files provide the sharpest laser engraving results.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Do you offer discounts for corporate orders?</h4>
                  <p className="text-xs text-slate-600">Yes, our volume pricing discounts start at 10 units (5% off) and scale up to 20% off for 100+ units. For orders exceeding 500 units, please request a custom quote.</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 4. Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-[#ED008C] uppercase tracking-wider block mb-1">
                More From Our Studio
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-black text-slate-900">
                You May Also Like
              </h3>
            </div>

            <button
              onClick={() => navigate('shop', product.category)}
              className="text-xs font-bold text-[#2D3094] hover:underline flex items-center gap-1"
            >
              <span>View More in {product.category}</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigate('product', rel.id)}
                className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="relative w-full pt-[100%] bg-slate-100 overflow-hidden">
                  <img
                    src={rel.image}
                    alt={rel.name}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {rel.badge && (
                    <div className="absolute top-2.5 left-2.5 bg-[#2D3094] text-white text-[9px] font-bold px-2 py-0.5 rounded">
                      {rel.badge}
                    </div>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                      {rel.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-[#2D3094] transition-colors">
                      {rel.name}
                    </h4>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900">
                      {currency === 'UGX' ? `UGX ${rel.priceUGX.toLocaleString()}` : `$${rel.priceUSD}`}
                    </span>
                    <span className="text-[10px] text-[#2D3094] font-bold uppercase group-hover:underline">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
