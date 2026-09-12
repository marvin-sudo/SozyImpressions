import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ArrowLeft, 
  ShoppingCart, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  UploadCloud, 
  ChevronRight, 
  Share2, 
  Heart, 
  Plus, 
  Minus, 
  ArrowRight
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { View, Currency, CartItem, CustomizationOptions, Product } from '../types';
import { getProductById, getRelatedProducts } from '../utils/productUtils';
import { PAYMENT_LOGOS } from '../data/mockData';
import { useShopStore } from '../context/ShopStoreContext';

interface ProductDetailPageProps {
  productId?: string;
  navigate: (view: View, param?: string) => void;
  currency: Currency;
  onAddToCart: (item: CartItem) => void;
  showToast?: (msg: string) => void;
  products?: Product[];
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  navigate,
  currency,
  onAddToCart,
  showToast,
  products: passedProducts
}) => {
  const { shopProducts } = useShopStore();
  const liveCatalog = useMemo(() => {
    if (shopProducts && shopProducts.length > 0) return shopProducts;
    if (passedProducts && passedProducts.length > 0) return passedProducts;
    return undefined;
  }, [shopProducts, passedProducts]);

  const product = useMemo(() => getProductById(productId, liveCatalog), [productId, liveCatalog]);
  const relatedProducts = useMemo(() => getRelatedProducts(product, 4, liveCatalog), [product, liveCatalog]);

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
    <div className="w-full bg-white min-h-screen text-slate-900 pb-20">
      
      {/* 1. Breadcrumbs & Top Bar */}
      <div className="bg-white border-b border-slate-200/80 sticky top-0 z-20 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button 
              onClick={() => navigate('home')} 
              className="hover:text-[#2D3094] transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight size={13} className="text-slate-400" />
            <button 
              onClick={() => navigate('shop')} 
              className="hover:text-[#2D3094] transition-colors cursor-pointer"
            >
              Shop Catalog
            </button>
            <ChevronRight size={13} className="text-slate-400" />
            <button 
              onClick={() => navigate('shop', product.category)} 
              className="hover:text-[#2D3094] transition-colors text-slate-600 font-semibold cursor-pointer"
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
              type="button"
              onClick={handleWhatsAppOrder}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] active:bg-[#1da851] transition-colors cursor-pointer"
              title="Order Via WhatsApp"
            >
              <WhatsAppIcon size={14} />
              <span>Order Via WhatsApp</span>
            </button>

            <button
              onClick={() => navigate('shop')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back to Catalog</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              title="Share Product"
              aria-label="Share Product"
            >
              <Share2 size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Product Display Section (Clean, Cardless Layout) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          
          {/* LEFT COLUMN: Media Gallery & Mockup (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {/* Main Image Viewport */}
            <div className="relative w-full aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 group">
              <img 
                src={galleryImages[selectedImageIndex] || product.image} 
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-600 hover:text-red-500 shadow-xs transition-transform active:scale-90 cursor-pointer"
                aria-label="Save to wishlist"
              >
                <Heart size={18} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
              </button>

              {/* Interactive Live Mockup Proof Overlay (when custom text or logo uploaded) */}
              {(uploadedLogoUrl || customText) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 pointer-events-none">
                  <div className="bg-white/95 backdrop-blur-sm p-3.5 rounded-xl border border-slate-200 shadow-lg max-w-[85%] flex flex-col items-center text-center">
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
            </div>

            {/* Gallery Thumbnails Carousel */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-[#2D3094]'
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

            {/* Studio Guarantees (Clean, cardless list) */}
            <div className="border-t border-slate-100 pt-5 space-y-3.5">
              <div className="flex items-start gap-3 text-xs text-slate-700">
                <CheckCircle2 size={16} className="text-[#2D3094] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Free Digital 3D Proof</span>
                  <span className="text-slate-500 text-[11px]">Approved via WhatsApp before production begins</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-700">
                <Truck size={16} className="text-[#2D3094] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Kampala Same-Day & Next-Day Delivery</span>
                  <span className="text-slate-500 text-[11px]">Reliable nationwide delivery across Uganda</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-700">
                <ShieldCheck size={16} className="text-[#2D3094] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Quality & Replacement Guarantee</span>
                  <span className="text-slate-500 text-[11px]">Direct from our Kampala Nasser/Nkrumah studio</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Configuration, Pricing & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            
            <div>
              {/* Category & Status (Clean typography, no shapes) */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#2D3094] uppercase tracking-wider">
                    {product.category}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    In Stock & Customisable
                  </span>
                </div>

                <div className="text-xs text-slate-500 font-medium">
                  <span className="font-bold text-slate-900">{product.rating ? product.rating.toFixed(1) : '5.0'}</span> / 5.0
                  <span className="text-slate-400 ml-1">({product.reviewCount || 38} verified orders)</span>
                </div>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-slate-900 tracking-tight leading-tight mb-3">
                {product.name}
              </h1>

              {/* Short Description */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Pricing Section (Clean divider, no cards) */}
              <div className="py-4 border-y border-slate-100 mb-6 flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Price per unit:
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-heading font-black text-slate-900 tracking-tight">
                      {currency === 'UGX' ? `UGX ${unitPriceUGX.toLocaleString()}` : `$${unitPriceUSD.toFixed(2)}`}
                    </span>
                    {product.originalPriceUGX && product.originalPriceUGX > product.priceUGX && (
                      <span className="text-base text-slate-400 line-through">
                        {currency === 'UGX' 
                          ? `UGX ${product.originalPriceUGX.toLocaleString()}` 
                          : `$${product.originalPriceUSD?.toFixed(2)}`}
                      </span>
                    )}
                    {activeDiscountPercent > 0 && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Save {activeDiscountPercent}%
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-500">
                    Min Order: <span className="font-bold text-slate-900">{product.minOrderQty || 1} Unit(s)</span>
                  </span>
                </div>
              </div>

              {/* Volume Discount Tiers (Clean buttons, no cards) */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Volume Wholesale Discounts:
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Select quantity below to apply discount
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
                        className={`py-2 px-3 rounded-lg border text-left transition-colors cursor-pointer ${
                          isActive
                            ? 'border-[#2D3094] bg-[#2D3094]/5 text-[#2D3094]'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-transparent'
                        }`}
                      >
                        <div className="text-xs font-bold">{tier.minQty}+ Units</div>
                        <div className="text-[11px] text-emerald-600 font-semibold">
                          {tier.discountPercent === 0 ? 'Standard Rate' : `${tier.discountPercent}% OFF`}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CUSTOMISATION CONTROLS (Clean, no cards) */}
              <div className="space-y-5 border-t border-slate-100 pt-6">
                
                {/* Color Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                    Finish / Color: <span className="text-[#2D3094] font-black">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {defaultColors.map((color) => {
                      const isSelected = selectedColor === color;
                      return (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                            isSelected
                              ? 'bg-[#2D3094] text-white border-[#2D3094]'
                              : 'bg-transparent text-slate-700 border-slate-200 hover:border-slate-300'
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
                      Dimension / Size: <span className="text-[#2D3094] font-black">{selectedSize}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {defaultSizes.map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                            selectedSize === sz
                              ? 'bg-[#2D3094] text-white border-[#2D3094]'
                              : 'bg-transparent text-slate-700 border-slate-200 hover:border-slate-300'
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
                          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                            selectedMaterial === mat
                              ? 'bg-[#2D3094] text-white border-[#2D3094]'
                              : 'bg-transparent text-slate-700 border-slate-200 hover:border-slate-300'
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
                          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                            selectedFinishing === finish
                              ? 'bg-[#2D3094] text-white border-[#2D3094]'
                              : 'bg-transparent text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {finish}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Personalised Engraving Text (Clean input, no cards) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Personalised Text / Engraving Name:
                    </label>
                    <span className="text-[11px] text-slate-400">{customText.length}/40</span>
                  </div>
                  <input 
                    type="text" 
                    value={customText}
                    maxLength={40}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="e.g. Johnathan Ssemwogerere, CEO"
                    className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#2D3094]"
                  />

                  {/* Font Style Selection */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[11px] text-slate-500">Font:</span>
                    {['Modern Sans', 'Executive Serif', 'Script Monogram'].map((font) => (
                      <button
                        key={font}
                        type="button"
                        onClick={() => setSelectedFont(font)}
                        className={`text-[11px] px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                          selectedFont === font
                            ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                            : 'bg-transparent text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {font}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Artwork / Logo Upload (Clean input, no cards) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <UploadCloud size={14} className="text-[#2D3094]" />
                      <span>Corporate Logo / Vector Artwork (Optional):</span>
                    </label>
                    {uploadedLogoUrl && (
                      <button
                        type="button"
                        onClick={() => setUploadedLogoUrl(null)}
                        className="text-[11px] font-semibold text-rose-500 hover:underline cursor-pointer"
                      >
                        Remove
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
                    <div className="p-3 rounded-lg border border-slate-200 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img src={uploadedLogoUrl} alt="Logo" className="w-10 h-10 object-contain rounded border border-slate-200 p-0.5" />
                        <div className="text-left">
                          <span className="text-xs font-semibold text-slate-900 block truncate">Logo Attached</span>
                          <span className="text-[10px] text-emerald-600 font-medium">Ready for 3D Proofing</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs text-[#2D3094] font-semibold hover:underline cursor-pointer"
                      >
                        Replace
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border border-dashed border-slate-200 hover:border-[#2D3094] rounded-lg p-3 text-center transition-colors flex items-center justify-center gap-2 text-slate-600 hover:text-[#2D3094] cursor-pointer"
                    >
                      <UploadCloud size={16} />
                      <span className="text-xs font-medium">
                        Upload Logo or Artwork (PNG, JPG, SVG, PDF)
                      </span>
                    </button>
                  )}

                  {/* Logo Placement Selector */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[11px] text-slate-500">Placement:</span>
                    {(['Front Center', 'Left Chest', 'Full Wrap', 'Back'] as const).map((pos) => (
                      <button
                        key={pos}
                        type="button"
                        onClick={() => setLogoPosition(pos)}
                        className={`text-[11px] px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                          logoPosition === pos
                            ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                            : 'bg-transparent text-slate-600 border-slate-200 hover:border-slate-300'
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
                    className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#2D3094]"
                  />
                </div>

                {/* Quantity & Subtotal (Clean row, no cards) */}
                <div className="pt-2 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
                      Quantity:
                    </span>
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(product.minOrderQty || 1, quantity - 1))}
                        className="p-2.5 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <input
                        type="number"
                        min={product.minOrderQty || 1}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(product.minOrderQty || 1, parseInt(e.target.value) || 1))}
                        className="w-14 text-center text-xs font-bold text-slate-900 border-x border-slate-200 py-2 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2.5 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-500 block mb-1">
                      Subtotal ({quantity} {quantity === 1 ? 'unit' : 'units'}):
                    </span>
                    <span className="text-2xl sm:text-3xl font-heading font-black text-[#2D3094] tracking-tight">
                      {currency === 'UGX' ? `UGX ${totalPriceUGX.toLocaleString()}` : `$${totalPriceUSD.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                {/* THE ACTION BUTTONS (Left clean and prominent) */}
                <div className="pt-4 space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Primary Buy Now */}
                    <button
                      type="button"
                      onClick={handleBuyNow}
                      className="flex-1 bg-[#2D3094] hover:bg-[#20236e] active:bg-[#1b1e5c] text-white py-4 px-6 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>BUY NOW</span>
                      <ArrowRight size={16} />
                    </button>

                    {/* Secondary Add to Cart */}
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="flex-1 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-300 hover:border-slate-400 py-4 px-6 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingCart size={16} className="text-[#2D3094]" />
                      <span>Add to Cart</span>
                    </button>
                  </div>

                  {/* WhatsApp Order Button */}
                  <button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-[#25D366] hover:bg-[#20ba5a] active:bg-[#1da851] text-white py-3.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <WhatsAppIcon size={18} />
                    <span>Order Via WhatsApp</span>
                  </button>
                </div>

                {/* Payment Icons Acceptance */}
                <div className="pt-3 flex items-center justify-between gap-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Accepted Payment Methods:
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="border border-slate-200 px-1.5 py-0.5 rounded flex items-center justify-center h-5" title="MTN Mobile Money">
                      <img src={PAYMENT_LOGOS.mtn} alt="MTN MoMo" className="h-3.5 w-auto object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <div className="border border-slate-200 px-1.5 py-0.5 rounded flex items-center justify-center h-5" title="Airtel Money">
                      <img src={PAYMENT_LOGOS.airtelMoney} alt="Airtel Money" className="h-3.5 w-auto object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <div className="border border-slate-200 px-1.5 py-0.5 rounded flex items-center justify-center h-5" title="Visa / Mastercard">
                      <img src={PAYMENT_LOGOS.visaMastercard} alt="Visa & Mastercard" className="h-3.5 w-auto object-contain" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* 3. Deep-Dive Tabs: Specifications, Delivery, FAQs (Clean, Cardless Section) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 pt-10 border-t border-slate-200">
        <div className="flex border-b border-slate-200 gap-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'specs'
                ? 'border-[#2D3094] text-[#2D3094]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Technical Specifications
          </button>

          <button
            onClick={() => setActiveTab('delivery')}
            className={`pb-3.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'delivery'
                ? 'border-[#2D3094] text-[#2D3094]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Production & Delivery Timeline
          </button>

          <button
            onClick={() => setActiveTab('faqs')}
            className={`pb-3.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'faqs'
                ? 'border-[#2D3094] text-[#2D3094]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Frequently Asked Questions
          </button>
        </div>

        <div className="pt-8">
          {activeTab === 'specs' && (
            <div className="space-y-6">
              <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                Every product is precision-crafted at our Kampala workshop on Nasser/Nkrumah Road, utilizing industrial fiber lasers and Japanese UV curing print heads to guarantee flawless detail and durable longevity.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 mt-4 border-t border-slate-100 pt-4">
                {product.specifications && Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="py-2.5 border-b border-slate-100 flex justify-between gap-4 text-xs">
                    <span className="font-bold text-slate-800">{key}:</span>
                    <span className="text-slate-600 text-right">{val}</span>
                  </div>
                ))}
                <div className="py-2.5 border-b border-slate-100 flex justify-between gap-4 text-xs">
                  <span className="font-bold text-slate-800">Customisation:</span>
                  <span className="text-slate-600 text-right">Individual names, company logos, monograms</span>
                </div>
                <div className="py-2.5 border-b border-slate-100 flex justify-between gap-4 text-xs">
                  <span className="font-bold text-slate-800">Workshop Location:</span>
                  <span className="text-slate-600 text-right">Kampala, Uganda</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-[#2D3094] uppercase tracking-wider block">
                    Step 1: Digital Proof
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Within 2–4 hours of ordering, our design desk sends you a 3D digital simulation for sign-off via WhatsApp (0787662183) or email.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-[#2D3094] uppercase tracking-wider block">
                    Step 2: Studio Production
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Standard orders are produced in 24–48 hours. Express same-day production is available on request.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-[#2D3094] uppercase tracking-wider block">
                    Step 3: Secure Delivery
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dispatched with professional motorcycle riders across Kampala or via regional courier buses upcountry.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="space-y-4 max-w-3xl">
              <div className="py-3 border-b border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 mb-1">Can I see a sample before bulk production?</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Yes! We provide free 3D digital proofs for all orders, and for bulk corporate orders (50+ units), we can fabricate a physical pre-production sample upon deposit confirmation.</p>
              </div>
              <div className="py-3 border-b border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 mb-1">What formats can I upload for my logo?</h4>
                <p className="text-xs text-slate-600 leading-relaxed">We accept PDF, PNG, JPEG, SVG, and AI/EPS files. Vector files provide the sharpest laser engraving results.</p>
              </div>
              <div className="py-3 border-b border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 mb-1">Do you offer discounts for corporate orders?</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Yes, our volume pricing discounts start at 10 units (5% off) and scale up to 20% off for 100+ units. For orders exceeding 500 units, please request a custom quote.</p>
              </div>

              {/* Instant WhatsApp Support Row (Clean, no card) */}
              <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-100">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Have questions about this gift?</h4>
                  <p className="text-[11px] text-slate-500">Chat directly with our Kampala workshop team on WhatsApp 0787662183.</p>
                </div>
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="bg-[#25D366] hover:bg-[#20ba5a] active:bg-[#1da851] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
                >
                  <WhatsAppIcon size={14} />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </div>
          )}
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

      {/* 5. Mobile Sticky Bottom Action Bar with Green WhatsApp Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2.5 px-4 shadow-2xl flex items-center gap-2.5">
        <button
          type="button"
          onClick={handleWhatsAppOrder}
          className="flex-1 bg-[#25D366] active:bg-[#1da851] text-white py-3 px-3 rounded-xl font-heading font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/25 cursor-pointer"
        >
          <WhatsAppIcon size={16} />
          <span>Order Via WhatsApp</span>
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          className="flex-1 bg-[#2D3094] active:bg-[#20236e] text-white py-3 px-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider shadow-md shadow-[#2D3094]/20 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>BUY NOW</span>
          <ArrowRight size={14} />
        </button>
      </div>

    </div>
  );
};
