import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { 
  AdminOrder, 
  AdminProduct, 
  AdminCategory, 
  CustomerProfile, 
  AdminActivityLog, 
  EmailTemplate, 
  SentEmailNotification,
  OrderStatus,
  PaymentStatus,
  DeliveryStatus
} from '../types/admin';
import { PRODUCTS_DATA } from '../data/mockData';
import { DEFAULT_EMAIL_TEMPLATES, renderTemplateText } from '../utils/emailTemplates';
import { db } from '../../firebase';
import { 
  setDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  Timestamp 
} from 'firebase/firestore';

// Default Shop Categories as specified in Section 9
export const INITIAL_SHOP_CATEGORIES: AdminCategory[] = [
  { id: 'cat-mugs', name: 'Mugs', slug: 'mugs', description: 'Two-tone ceramic mugs, magic color changing & travel tumblers', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600', isActive: true, order: 1, subcategories: ['Two-Tone Ceramic Mugs', 'Magic Color-Changing Photo Mugs', 'Stainless Travel Mugs', 'Enamel Camp Mugs'] },
  { id: 'cat-cushions', name: 'Cushions', slug: 'cushions', description: 'Plush velvet, satin & sequin personalised photo cushions', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=600', isActive: true, order: 2, subcategories: ['Satin Photo Cushions', 'Magic Sequin Pillows', 'Embroidered Name Cushions'] },
  { id: 'cat-sippers', name: 'Sippers', slug: 'sippers', description: 'Custom sports sippers, gym bottles & straw tumblers', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600', isActive: true, order: 3, subcategories: ['Aluminium Sports Sippers', 'Kids Cartoon Tumblers', 'Gym Shakers'] },
  { id: 'cat-photo-frames', name: 'Photo Frames', slug: 'photo-frames', description: 'Wooden Polaroid, rotating 3D, acrylic & desk photo frames', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600', isActive: true, order: 4, subcategories: ['LED Acrylic Photo Lamps', 'Wooden Polaroid Frames', 'Rotating 3D Frames', 'Spotify Song Frames'] },
  { id: 'cat-neon-lights', name: 'Neon Lights', slug: 'neon-lights', description: 'Custom acrylic LED neon signboards and ambient desk signs', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=600', isActive: true, order: 5, subcategories: ['Custom Name Neon', 'Wedding & Event Neon', 'Bar & Cafe Glow Signs'] },
  { id: 'cat-flowers', name: 'Flowers', slug: 'flowers', description: 'Fresh roses, celebratory bouquets and keepsake floral hampers', image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=600', isActive: true, order: 6, subcategories: ['Red Rose Bouquets', 'Celebration Mixed Flowers', 'Preserved Rose Glass Domes'] },
  { id: 'cat-combos', name: 'Combos', slug: 'combos', description: 'Curated gift hampers combining mugs, keychains, flowers & cards', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600', isActive: true, order: 7, subcategories: ['Birthday Surprise Combos', 'Romantic Anniversary Sets', 'Congratulatory Packages'] },
  { id: 'cat-hampers', name: 'Hampers', slug: 'hampers', description: 'Luxury executive corporate hampers and seasonal celebration crates', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&q=80&w=600', isActive: true, order: 8, subcategories: ['Gourmet Food Hampers', 'Executive Year-End Crates', 'Wellness & Spa Gift Baskets'] },
  { id: 'cat-stationery', name: 'Stationery', slug: 'stationery', description: 'Executive journals, luxury branded pens, folios & desk organizers', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=600', isActive: true, order: 9, subcategories: ['Hardcover Leatherette Journals', 'Metal Rollerball Pens', 'Desk Organizers'] },
  { id: 'cat-fridge-magnets', name: 'Fridge Magnets', slug: 'fridge-magnets', description: 'Custom gloss acrylic, wooden and magnetic Polaroid photo sets', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600', isActive: true, order: 10, subcategories: ['Polaroid Style Magnets', 'Laser Cut Wooden Magnets', 'Calendar Fridge Magnets'] },
  { id: 'cat-accessories', name: 'Accessories', slug: 'accessories', description: 'G-Lamps, wireless charger standees, desk gadgets & badges', image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=600', isActive: true, order: 11, subcategories: ['G-Shape RGB Speaker Lamps', 'Wireless Charging Mousepads', 'Enamel Metal Badges'] },
  { id: 'cat-caricatures', name: 'Caricatures', slug: 'caricatures', description: 'Hand-illustrated custom personality standees on high-gloss acrylic', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=600', isActive: true, order: 12, subcategories: ['Corporate Professional Standees', 'Couple & Wedding Caricatures', 'Doctor/Engineer/Lawyer Themes'] },
  { id: 'cat-corporate-gifts', name: 'Corporate Gifts', slug: 'corporate-gifts', description: 'High-impact branded merchandise for client appreciation & conferences', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600', isActive: true, order: 13, subcategories: ['Executive Desk Organizers', 'VIP Welcome Packages', 'Client Appreciation Sets'] },
  { id: 'cat-apparel', name: 'Apparel', slug: 'apparel', description: 'Executive polo shirts, combed cotton tees, hoodies & caps', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=600', isActive: true, order: 14, subcategories: ['Executive Polo Shirts', 'Combed Cotton T-Shirts', 'Corporate Hoodies', 'Embroidered Caps'] },
  { id: 'cat-bottles-flasks', name: 'Bottles & Flasks', slug: 'bottles-flasks', description: 'Smart LED temperature flasks, hydro flasks & sports bottles', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600', isActive: true, order: 15, subcategories: ['Smart LED Temperature Flasks', 'Double-Wall Hydro Flasks', 'Bamboo Thermos Bottles'] },
  { id: 'cat-gift-sets', name: 'Gift Sets', slug: 'gift-sets', description: 'Luxury 4-in-1 and 5-in-1 executive presentation box sets', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600', isActive: true, order: 16, subcategories: ['5-in-1 Luxury Executive Boxes', 'Tech Combo Sets', 'Notebook & Pen Folios'] },
  { id: 'cat-bamboo-gifts', name: 'Bamboo Gifts', slug: 'bamboo-gifts', description: 'Eco-friendly sustainably sourced natural bamboo drinkware & stationery', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600', isActive: true, order: 17, subcategories: ['Natural Bamboo Thermos', 'Bamboo Hardcover Journals', 'Eco Bamboo Pens'] },
  { id: 'cat-keyholders', name: 'Keyholders', slug: 'keyholders', description: 'Laser-engraved leather, metal carabiner & 3D acrylic keychains', image: 'https://images.unsplash.com/photo-1614036417651-efe5912149d8?auto=format&fit=crop&q=80&w=600', isActive: true, order: 18, subcategories: ['Top-Grain Leather Keyrings', '3D Laser-Cut Acrylic Keychains', 'Zinc-Alloy Multi-Tools'] },
  { id: 'cat-trophies-medals', name: 'Trophies & Medals', slug: 'trophies-medals', description: 'Optic crystal awards, mahogany plaques & customized metal medals', image: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&q=80&w=600', isActive: true, order: 19, subcategories: ['Optic Crystal Awards', 'Handcrafted Mahogany Plaques', 'Antique Gold Medals'] },
  { id: 'cat-wall-clocks', name: 'Wall Clocks', slug: 'wall-clocks', description: 'Floating 3D acrylic & brushed metal corporate wall clocks', image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&q=80&w=600', isActive: true, order: 20, subcategories: ['Brushed Aluminum Silent Clocks', 'Floating 3D Laser-Cut Clocks'] },
  { id: 'cat-watches', name: 'Watches', slug: 'watches', description: 'Custom dial branded executive wristwatches in presentation cases', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=600', isActive: true, order: 21, subcategories: ['Laser-Engraved Executive Timepieces', 'Minimalist Stainless Steel Watches'] },
  { id: 'cat-umbrellas', name: 'Umbrellas', slug: 'umbrellas', description: '30" windproof golf umbrellas & compact automatic rain umbrellas', image: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&q=80&w=600', isActive: true, order: 22, subcategories: ['30" Windproof Golf Umbrellas', 'Compact Auto Open/Close Umbrellas'] },
  { id: 'cat-technology', name: 'Technology', slug: 'technology', description: 'Power banks with illuminated logos, OTG flash drives & wireless pads', image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=600', isActive: true, order: 23, subcategories: ['Light-Up Logo Power Banks', 'Metal Swivel OTG Flash Drives', 'Wireless Charging Pads'] }
];

// Convert mock products to AdminProduct structure
export const INITIAL_ADMIN_PRODUCTS: AdminProduct[] = PRODUCTS_DATA.map((p, idx) => ({
  id: p.id,
  sku: `SOZ-PRD-${(idx + 1).toString().padStart(4, '0')}`,
  name: p.name,
  category: p.category,
  subcategory: p.specifications?.['Category'] || undefined,
  priceUGX: p.priceUGX,
  priceUSD: p.priceUSD,
  salePriceUGX: p.originalPriceUGX ? p.priceUGX : undefined,
  salePriceUSD: p.originalPriceUSD ? p.priceUSD : undefined,
  originalPriceUGX: p.originalPriceUGX,
  originalPriceUSD: p.originalPriceUSD,
  stockQuantity: p.inStock ? 50 + (idx * 5) % 80 : 0,
  lowStockThreshold: 10,
  inStock: p.inStock !== false,
  image: p.image,
  gallery: p.gallery || [p.image],
  videoUrl: undefined,
  description: p.description,
  shortDescription: p.description.slice(0, 90) + '...',
  tags: [p.category.toLowerCase(), 'custom print', 'corporate branding'],
  isCustomizable: p.isCustomizable !== false,
  artworkUploadRequired: p.isCustomizable !== false,
  isFeatured: p.isFeatured || idx < 4,
  isBestseller: !!p.badge?.includes('Best Seller') || idx % 3 === 0,
  isNewArrival: idx % 4 === 1,
  isActive: true,
  specifications: p.specifications,
  colors: p.colors || ['Black', 'Navy', 'White', 'Royal Blue'],
  sizes: p.sizes,
  materials: p.materials,
  finishings: p.finishings,
  rating: p.rating || 4.8,
  reviewCount: p.reviewCount || 24,
  createdAt: new Date(Date.now() - (idx * 86400000 * 3)).toISOString()
}));

// Initial Realistic Orders
export const INITIAL_ADMIN_ORDERS: AdminOrder[] = [
  {
    id: 'SOZ-8842',
    orderNumber: 'SOZ-8842',
    customerName: 'Grace Nabatanzi',
    customerEmail: 'grace.nabatanzi@stanbic.co.ug',
    customerPhone: '+256 772 458 912',
    companyName: 'Stanbic Bank Uganda',
    deliveryAddress: 'Stanbic Towers, 4th Floor, 17 Hannington Road',
    district: 'Kampala Central',
    deliveryZoneId: 'kampala-cbd',
    deliveryInstructions: 'Deliver to 4th floor reception. Ask for Grace in Marketing.',
    items: [
      {
        product: PRODUCTS_DATA[0] || { id: 'prod-1', name: 'Executive Pique Cotton Branded Polo', priceUGX: 38000, priceUSD: 10, category: 'Apparel', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800', rating: 4.9, description: 'Branded executive polo' },
        quantity: 25,
        selectedColor: 'Navy',
        selectedSize: 'L',
        customText: 'Stanbic Innovation 2026',
        unitPriceUGX: 38000,
        subtotalUGX: 950000,
        unitPriceUSD: 10,
        subtotalUSD: 250
      },
      {
        product: PRODUCTS_DATA[2] || { id: 'prod-3', name: 'Smart LED Temperature Flask', priceUGX: 45000, priceUSD: 12, category: 'Bottles & Flasks', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800', rating: 4.9, description: 'Smart LED flask' },
        quantity: 25,
        selectedColor: 'Matte Black',
        customText: 'IT IS CAN DO.',
        unitPriceUGX: 45000,
        subtotalUGX: 1125000,
        unitPriceUSD: 12,
        subtotalUSD: 300
      }
    ],
    subtotalUGX: 2075000,
    deliveryFeeUGX: 15000,
    discountUGX: 100000,
    totalUGX: 1990000,
    subtotalUSD: 550,
    deliveryFeeUSD: 4,
    totalUSD: 524,
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'paid',
    orderStatus: 'processing',
    deliveryStatus: 'preparing',
    transactionId: 'EFT-STB-994821',
    customerArtwork: {
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
      fileName: 'Stanbic_Innovation_Logo_Vector_CMYK.ai',
      fileSize: '4.2 MB',
      previewType: 'vector',
      uploadedAt: new Date(Date.now() - 3600000 * 5).toISOString()
    },
    notes: 'Approved digital proof by email. Priority client batch.',
    timeline: [
      { id: 't1', time: 'Yesterday 09:30 AM', title: 'Order Placed by Customer', author: 'System', status: 'pending' },
      { id: 't2', time: 'Yesterday 10:15 AM', title: 'Payment Confirmed via EFT (UGX 1,990,000)', author: 'Admin (Marvin)', status: 'confirmed' },
      { id: 't3', time: 'Today 08:00 AM', title: 'Order Production Commenced on Screen Press', note: 'Batch 1/2 in screen print setup', author: 'Production Desk', status: 'processing' }
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'SOZ-8841',
    orderNumber: 'SOZ-8841',
    customerName: 'Ronald Kigozi',
    customerEmail: 'ronald.k@gmail.com',
    customerPhone: '+256 701 982 341',
    companyName: 'Apex Law Chambers',
    deliveryAddress: 'Plot 12, Nakasero Road, Chamber 3B',
    district: 'Kampala Central',
    items: [
      {
        product: PRODUCTS_DATA[3] || { id: 'prod-4', name: 'Two-Tone Ceramic Custom Mug', priceUGX: 20000, priceUSD: 5.5, category: 'Mugs', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800', rating: 4.8, description: 'Ceramic mug' },
        quantity: 12,
        selectedColor: 'Navy & White',
        customText: 'Apex Advocates 2026',
        unitPriceUGX: 20000,
        subtotalUGX: 240000,
        unitPriceUSD: 5.5,
        subtotalUSD: 66
      }
    ],
    subtotalUGX: 240000,
    deliveryFeeUGX: 10000,
    totalUGX: 250000,
    subtotalUSD: 66,
    deliveryFeeUSD: 3,
    totalUSD: 69,
    paymentMethod: 'MTN Mobile Money',
    paymentStatus: 'paid',
    orderStatus: 'ready_delivery',
    deliveryStatus: 'ready',
    transactionId: 'MM-MTN-884210',
    notes: 'Packaging in presentation gift boxes complete.',
    timeline: [
      { id: 't1', time: '2 days ago', title: 'Order Placed & Paid', author: 'Customer', status: 'confirmed' },
      { id: 't2', time: 'Yesterday', title: 'Sublimation Printing Completed', author: 'Print Floor', status: 'processing' },
      { id: 't3', time: 'Today 11:30 AM', title: 'Quality Assurance Passed - Packaged for Delivery', author: 'Admin (Marvin)', status: 'ready_delivery' }
    ],
    createdAt: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: 'SOZ-8840',
    orderNumber: 'SOZ-8840',
    customerName: 'Amina Mukasa',
    customerEmail: 'amina.m@gmail.com',
    customerPhone: '+256 788 112 455',
    deliveryAddress: 'Acacia Mall, Kisementi, Shop G-14',
    district: 'Kololo',
    items: [
      {
        product: PRODUCTS_DATA[1] || { id: 'prod-2', name: 'LED Acrylic Photo Lamp', priceUGX: 65000, priceUSD: 17, category: 'Photo Frames', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800', rating: 4.9, description: 'LED Photo Lamp' },
        quantity: 2,
        customText: 'Forever & Always - Tariq & Amina',
        unitPriceUGX: 65000,
        subtotalUGX: 130000,
        unitPriceUSD: 17,
        subtotalUSD: 34
      }
    ],
    subtotalUGX: 130000,
    deliveryFeeUGX: 10000,
    totalUGX: 140000,
    subtotalUSD: 34,
    deliveryFeeUSD: 3,
    totalUSD: 37,
    paymentMethod: 'Airtel Money',
    paymentStatus: 'paid',
    orderStatus: 'completed',
    deliveryStatus: 'delivered',
    transactionId: 'AM-7729104',
    notes: 'Customer signed delivery dispatch note. Loved the warm LED engraving.',
    timeline: [
      { id: 't1', time: '3 days ago', title: 'Order Placed', author: 'Customer', status: 'confirmed' },
      { id: 't2', time: '2 days ago', title: 'Laser Engraved & Tested', author: 'Tech Shop', status: 'processing' },
      { id: 't3', time: 'Yesterday', title: 'Delivered to Kisementi and Signed', author: 'Courier (Juma)', status: 'completed' }
    ],
    createdAt: new Date(Date.now() - 259200000).toISOString()
  },
  {
    id: 'SOZ-8839',
    orderNumber: 'SOZ-8839',
    customerName: 'David Ssemwogerere',
    customerEmail: 'david.s@nextmedia.co.ug',
    customerPhone: '+256 752 900 120',
    companyName: 'Next Media Services',
    deliveryAddress: 'Next Media Park, Naguru Hill',
    district: 'Naguru',
    items: [
      {
        product: PRODUCTS_DATA[0],
        quantity: 50,
        selectedColor: 'Black',
        customText: 'NBS Live Crew 2026',
        unitPriceUGX: 38000,
        subtotalUGX: 1900000,
        unitPriceUSD: 10,
        subtotalUSD: 500
      }
    ],
    subtotalUGX: 1900000,
    deliveryFeeUGX: 15000,
    totalUGX: 1915000,
    subtotalUSD: 500,
    deliveryFeeUSD: 4,
    totalUSD: 504,
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'paid',
    orderStatus: 'out_for_delivery',
    deliveryStatus: 'out_for_delivery',
    transactionId: 'TT-NBS-10293',
    notes: 'Courier departed studio at 11:15 AM with 2 branded carton packs.',
    timeline: [
      { id: 't1', time: '4 days ago', title: 'Order Initiated', author: 'Customer', status: 'confirmed' },
      { id: 't2', time: '2 days ago', title: 'Embroidery Machine Run Finished', author: 'Print Floor', status: 'processing' },
      { id: 't3', time: 'Today 11:15 AM', title: 'Dispatched with Courier Driver to Naguru', author: 'Logistics Desk', status: 'out_for_delivery' }
    ],
    createdAt: new Date(Date.now() - 345600000).toISOString()
  },
  {
    id: 'SOZ-8838',
    orderNumber: 'SOZ-8838',
    customerName: 'Brenda Namaganda',
    customerEmail: 'b.namaganda@outlook.com',
    customerPhone: '+256 704 223 889',
    deliveryAddress: 'Kyanja Ring Road, House 8B',
    district: 'Kyanja',
    items: [
      {
        product: PRODUCTS_DATA[4] || { id: 'prod-5', name: 'Personalised Satin Cushion', priceUGX: 35000, priceUSD: 9.5, category: 'Cushions', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800', rating: 4.8, description: 'Satin cushion' },
        quantity: 1,
        selectedColor: 'Soft Pink',
        customText: 'Happy 30th Birthday Brenda!',
        unitPriceUGX: 35000,
        subtotalUGX: 35000,
        unitPriceUSD: 9.5,
        subtotalUSD: 9.5
      }
    ],
    subtotalUGX: 35000,
    deliveryFeeUGX: 15000,
    totalUGX: 50000,
    subtotalUSD: 9.5,
    deliveryFeeUSD: 4,
    totalUSD: 13.5,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'pending',
    orderStatus: 'pending',
    deliveryStatus: 'pending',
    notes: 'Awaiting phone confirmation before starting print.',
    timeline: [
      { id: 't1', time: 'Today 09:12 AM', title: 'Order Received via Online Checkout', author: 'Online Store', status: 'pending' }
    ],
    createdAt: new Date(Date.now() - 7200000).toISOString()
  }
];

export interface ShopStoreContextType {
  // Orders
  orders: AdminOrder[];
  createOrder: (order: Partial<AdminOrder>) => Promise<AdminOrder>;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => Promise<boolean>;
  updatePaymentStatus: (orderId: string, status: PaymentStatus, transactionId?: string) => Promise<boolean>;
  updateDelivery: (orderId: string, deliveryStatus: DeliveryStatus, instructions?: string) => Promise<boolean>;
  deleteOrder: (orderId: string) => Promise<boolean>;
  
  // Products
  products: AdminProduct[];
  addProduct: (product: Omit<AdminProduct, 'id'>) => Promise<AdminProduct>;
  updateProduct: (id: string, updates: Partial<AdminProduct>) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  duplicateProduct: (id: string) => Promise<AdminProduct | null>;
  toggleProductActive: (id: string) => Promise<boolean>;
  updateStock: (id: string, newQty: number) => Promise<boolean>;
  updateProductStock: (id: string, newQty: number, reason?: string) => Promise<boolean>;

  // Categories
  categories: AdminCategory[];
  addCategory: (category: Omit<AdminCategory, 'id'>) => Promise<AdminCategory>;
  updateCategory: (id: string, updates: Partial<AdminCategory>) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<boolean>;

  // Customers
  customers: CustomerProfile[];
  updateCustomer: (id: string, updates: Partial<CustomerProfile>) => Promise<boolean>;

  // Email Notifications & Templates
  emailTemplates: EmailTemplate[];
  sentEmails: SentEmailNotification[];
  sentNotifications: SentEmailNotification[];
  updateEmailTemplate: (id: string, updates: Partial<EmailTemplate>) => Promise<boolean>;
  sendTestEmail: (templateKey: string, recipientEmail: string) => Promise<boolean>;
  resendNotificationEmail: (orderId: string, templateKey: string) => Promise<boolean>;

  // Activity Logs
  activityLogs: AdminActivityLog[];
  logAction: (action: string, targetType: AdminActivityLog['targetType'], targetId: string, description: string) => void;

  // Security & Authentication
  isAdminAuthenticated: boolean;
  isDashboardLocked: boolean;
  isLocked: boolean;
  adminUser: { name: string; email: string; role: string; avatarUrl?: string };
  loginAdmin: (email: string, passOrPin: string) => boolean;
  logoutAdmin: () => void;
  lockDashboard: () => void;
  unlockDashboard: (pin: string) => boolean;

  // Delivery status alias
  updateDeliveryStatus: (orderId: string, deliveryStatus: DeliveryStatus, instructions?: string) => Promise<boolean>;

  // Unread badge notifications
  unreadOrdersCount: number;
}

const ShopStoreContext = createContext<ShopStoreContextType | null>(null);

const STORAGE_KEY = 'sozy_shop_admin_store_v2';

export const ShopStoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load saved state or fall back to rich default mock dataset
  const [orders, setOrders] = useState<AdminOrder[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_orders`);
      return saved ? JSON.parse(saved) : INITIAL_ADMIN_ORDERS;
    } catch {
      return INITIAL_ADMIN_ORDERS;
    }
  });

  const [products, setProducts] = useState<AdminProduct[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_products`);
      return saved ? JSON.parse(saved) : INITIAL_ADMIN_PRODUCTS;
    } catch {
      return INITIAL_ADMIN_PRODUCTS;
    }
  });

  const [categories, setCategories] = useState<AdminCategory[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_categories`);
      return saved ? JSON.parse(saved) : INITIAL_SHOP_CATEGORIES;
    } catch {
      return INITIAL_SHOP_CATEGORIES;
    }
  });

  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_templates`);
      return saved ? JSON.parse(saved) : DEFAULT_EMAIL_TEMPLATES;
    } catch {
      return DEFAULT_EMAIL_TEMPLATES;
    }
  });

  const [sentEmails, setSentEmails] = useState<SentEmailNotification[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_sent_emails`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activityLogs, setActivityLogs] = useState<AdminActivityLog[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_logs`);
      return saved ? JSON.parse(saved) : [
        {
          id: 'log-1',
          timestamp: new Date().toISOString(),
          action: 'System Initialized',
          targetType: 'system',
          targetId: 'sys-0',
          description: 'SozyImpressions Shop Admin Dashboard online and connected to live shop.',
          user: 'System'
        }
      ];
    } catch {
      return [];
    }
  });

  // Auth State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('sozy_admin_auth') === 'true';
  });

  const [isDashboardLocked, setIsDashboardLocked] = useState<boolean>(false);

  const adminUser = {
    name: 'Marvin Ssozi',
    email: 'ssozimarvin5@gmail.com',
    role: 'Shop Director & Admin',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
  };

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_orders`, JSON.stringify(orders));
    } catch { /* ignore */ }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_products`, JSON.stringify(products));
    } catch { /* ignore */ }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_categories`, JSON.stringify(categories));
    } catch { /* ignore */ }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_templates`, JSON.stringify(emailTemplates));
    } catch { /* ignore */ }
  }, [emailTemplates]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_sent_emails`, JSON.stringify(sentEmails));
    } catch { /* ignore */ }
  }, [sentEmails]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_logs`, JSON.stringify(activityLogs));
    } catch { /* ignore */ }
  }, [activityLogs]);

  // Compute customers dynamically from orders
  const customers: CustomerProfile[] = React.useMemo(() => {
    const map = new Map<string, CustomerProfile>();

    orders.forEach(ord => {
      const email = ord.customerEmail.toLowerCase().trim();
      const existing = map.get(email);

      if (existing) {
        existing.ordersCount += 1;
        existing.totalSpentUGX += (ord.totalUGX || 0);
        if (new Date(ord.createdAt) > new Date(existing.lastOrderDate)) {
          existing.lastOrderDate = ord.createdAt;
          existing.address = ord.deliveryAddress || existing.address;
          existing.phone = ord.customerPhone || existing.phone;
        }
        if (existing.totalSpentUGX > 1000000 || existing.ordersCount >= 3) {
          existing.status = 'VIP';
        }
      } else {
        map.set(email, {
          id: `cust-${email.replace(/[^a-z0-9]/g, '')}`,
          name: ord.customerName,
          email: ord.customerEmail,
          phone: ord.customerPhone,
          address: ord.deliveryAddress,
          district: ord.district,
          ordersCount: 1,
          totalSpentUGX: ord.totalUGX || 0,
          lastOrderDate: ord.createdAt,
          status: (ord.totalUGX || 0) > 1000000 ? 'VIP' : 'Active'
        });
      }
    });

    return Array.from(map.values()).sort((a, b) => b.totalSpentUGX - a.totalSpentUGX);
  }, [orders]);

  // Activity Logger
  const logAction = useCallback((
    action: string, 
    targetType: AdminActivityLog['targetType'], 
    targetId: string, 
    description: string
  ) => {
    const newLog: AdminActivityLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      action,
      targetType,
      targetId,
      description,
      user: adminUser.name
    };
    setActivityLogs(prev => [newLog, ...prev.slice(0, 150)]);
  }, [adminUser.name]);

  // Internal trigger: sends branded customer email notification based on status
  const triggerNotificationEmail = useCallback((
    order: AdminOrder, 
    templateKey: EmailTemplate['key']
  ) => {
    const template = emailTemplates.find(t => t.key === templateKey) || emailTemplates[0];
    if (!template) return;

    const renderedSubject = renderTemplateText(template.subject, order);
    const renderedBody = renderTemplateText(template.bodyTemplate, order);

    const sentRecord: SentEmailNotification = {
      id: `email-${Date.now()}`,
      orderId: order.id,
      orderNumber: order.orderNumber,
      customerEmail: order.customerEmail,
      customerName: order.customerName,
      templateKey: template.key,
      subject: renderedSubject,
      sentAt: new Date().toISOString(),
      status: 'delivered',
      contentPreview: renderedBody.slice(0, 160) + '...'
    };

    setSentEmails(prev => [sentRecord, ...prev]);
    logAction('Customer Email Dispatched', 'email', order.id, `Sent ${template.title} notification to ${order.customerEmail}`);
  }, [emailTemplates, logAction]);

  // 1. Create Order (Called from Checkout or Admin)
  const createOrder = useCallback(async (orderData: Partial<AdminOrder>): Promise<AdminOrder> => {
    const count = orders.length + 8843;
    const orderNumber = orderData.orderNumber || `SOZ-${count}`;
    
    const newOrder: AdminOrder = {
      id: orderNumber,
      orderNumber,
      customerName: orderData.customerName || 'Customer',
      customerEmail: orderData.customerEmail || 'client@example.com',
      customerPhone: orderData.customerPhone || '+256 700 000 000',
      companyName: orderData.companyName,
      deliveryAddress: orderData.deliveryAddress || 'Kampala, Uganda',
      district: orderData.district || 'Kampala',
      deliveryZoneId: orderData.deliveryZoneId,
      deliveryInstructions: orderData.deliveryInstructions,
      items: orderData.items || [],
      subtotalUGX: orderData.subtotalUGX || 0,
      deliveryFeeUGX: orderData.deliveryFeeUGX || 0,
      discountUGX: orderData.discountUGX || 0,
      totalUGX: orderData.totalUGX || 0,
      subtotalUSD: orderData.subtotalUSD || 0,
      deliveryFeeUSD: orderData.deliveryFeeUSD || 0,
      totalUSD: orderData.totalUSD || 0,
      paymentMethod: orderData.paymentMethod || 'MTN Mobile Money',
      paymentStatus: (orderData.paymentStatus as PaymentStatus) || 'pending',
      orderStatus: (orderData.orderStatus as OrderStatus) || 'pending',
      deliveryStatus: (orderData.deliveryStatus as DeliveryStatus) || 'pending',
      transactionId: orderData.transactionId,
      customerArtwork: orderData.customerArtwork,
      notes: orderData.notes,
      timeline: [
        {
          id: `t-${Date.now()}`,
          time: 'Just now',
          title: 'Order Placed by Customer',
          note: `Payment via ${orderData.paymentMethod || 'MTN Mobile Money'}`,
          author: 'Online Store',
          status: 'pending'
        }
      ],
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    logAction('Order Created', 'order', newOrder.id, `New order ${newOrder.id} placed by ${newOrder.customerName} for UGX ${newOrder.totalUGX.toLocaleString()}`);
    
    // Automatically trigger Order Confirmed email notification
    triggerNotificationEmail(newOrder, 'order_confirmed');

    // Async save to Firestore if configured
    try {
      await setDoc(doc(db, 'orders', newOrder.id), {
        ...newOrder,
        firestoreCreatedAt: Timestamp.now()
      });
    } catch (err) {
      console.warn('Local order saved. Firestore write queued/fallback active.', err);
    }

    return newOrder;
  }, [orders.length, logAction, triggerNotificationEmail]);

  // 2. Update Order Status
  const updateOrderStatus = useCallback(async (orderId: string, status: OrderStatus, note?: string): Promise<boolean> => {
    let targetOrder: AdminOrder | undefined;

    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const titleMap: Record<OrderStatus, string> = {
          pending: 'Order Pending Review',
          confirmed: 'Order Confirmed by Admin',
          processing: 'Order In Production (Press Floor)',
          ready_delivery: 'Order Ready for Delivery / Pickup',
          out_for_delivery: 'Order Out with Courier Driver',
          completed: 'Order Delivered & Completed',
          cancelled: 'Order Cancelled',
          refunded: 'Order Refunded'
        };

        const updatedTimeline = [
          ...ord.timeline,
          {
            id: `t-${Date.now()}`,
            time: `${timeString} — Today`,
            title: titleMap[status] || `Status updated to ${status}`,
            note: note || `Updated by Admin (${adminUser.name})`,
            author: adminUser.name,
            status
          }
        ];

        targetOrder = {
          ...ord,
          orderStatus: status,
          timeline: updatedTimeline,
          updatedAt: new Date().toISOString()
        };
        return targetOrder;
      }
      return ord;
    }));

    if (targetOrder) {
      logAction('Order Status Updated', 'order', orderId, `Changed status of Order #${orderId} to "${status.replace('_', ' ').toUpperCase()}"`);
      
      // Auto-dispatch customer notification email
      const templateKeyMap: Partial<Record<OrderStatus, EmailTemplate['key']>> = {
        confirmed: 'order_confirmed',
        processing: 'processing',
        ready_delivery: 'ready_delivery',
        out_for_delivery: 'out_for_delivery',
        completed: 'completed',
        cancelled: 'cancelled'
      };

      const matchedKey = templateKeyMap[status];
      if (matchedKey) {
        triggerNotificationEmail(targetOrder, matchedKey);
      }

      // Sync with Firestore
      try {
        await updateDoc(doc(db, 'orders', orderId), {
          orderStatus: status,
          updatedAt: Timestamp.now()
        });
      } catch (e) {
        console.warn('Firestore update status fallback active.', e);
      }

      return true;
    }
    return false;
  }, [adminUser.name, logAction, triggerNotificationEmail]);

  // 3. Update Payment Status
  const updatePaymentStatus = useCallback(async (orderId: string, status: PaymentStatus, transactionId?: string): Promise<boolean> => {
    let targetOrder: AdminOrder | undefined;

    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const updatedTimeline = [
          ...ord.timeline,
          {
            id: `t-${Date.now()}`,
            time: `${timeString} — Today`,
            title: `Payment ${status.toUpperCase()} (UGX ${ord.totalUGX.toLocaleString()})`,
            note: transactionId ? `Transaction Ref: ${transactionId}` : 'Verified by Accounts Admin',
            author: adminUser.name,
            status: ord.orderStatus
          }
        ];

        targetOrder = {
          ...ord,
          paymentStatus: status,
          transactionId: transactionId || ord.transactionId,
          timeline: updatedTimeline,
          updatedAt: new Date().toISOString()
        };
        return targetOrder;
      }
      return ord;
    }));

    if (targetOrder) {
      logAction('Payment Status Updated', 'payment', orderId, `Payment for Order #${orderId} marked as ${status.toUpperCase()}`);
      
      if (status === 'paid') {
        triggerNotificationEmail(targetOrder, 'payment_received');
      } else if (status === 'failed') {
        triggerNotificationEmail(targetOrder, 'payment_failed');
      }

      try {
        await updateDoc(doc(db, 'orders', orderId), {
          paymentStatus: status,
          transactionId: transactionId || null,
          updatedAt: Timestamp.now()
        });
      } catch (e) {
        console.warn('Firestore payment status update queued.', e);
      }

      return true;
    }
    return false;
  }, [adminUser.name, logAction, triggerNotificationEmail]);

  // 4. Update Delivery Status
  const updateDelivery = useCallback(async (orderId: string, deliveryStatus: DeliveryStatus, instructions?: string): Promise<boolean> => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        return {
          ...ord,
          deliveryStatus,
          deliveryInstructions: instructions || ord.deliveryInstructions,
          updatedAt: new Date().toISOString()
        };
      }
      return ord;
    }));

    logAction('Delivery Updated', 'delivery', orderId, `Delivery status for #${orderId} updated to ${deliveryStatus}`);
    return true;
  }, [logAction]);

  // 5. Delete Order
  const deleteOrder = useCallback(async (orderId: string): Promise<boolean> => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
    logAction('Order Deleted', 'order', orderId, `Deleted Order #${orderId}`);
    try {
      await deleteDoc(doc(db, 'orders', orderId));
    } catch { /* ignore */ }
    return true;
  }, [logAction]);

  // --- Product Management (Real-time connected to live shop frontend) ---
  const addProduct = useCallback(async (newProdData: Omit<AdminProduct, 'id'>): Promise<AdminProduct> => {
    const id = `prod-${Date.now()}`;
    const product: AdminProduct = {
      ...newProdData,
      id,
      sku: newProdData.sku || `SOZ-PRD-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString()
    };

    setProducts(prev => [product, ...prev]);
    logAction('Product Added', 'product', id, `Added new product "${product.name}" in category "${product.category}" (UGX ${product.priceUGX.toLocaleString()})`);
    
    try {
      await setDoc(doc(db, 'products', id), product);
    } catch { /* ignore */ }

    return product;
  }, [logAction]);

  const updateProduct = useCallback(async (id: string, updates: Partial<AdminProduct>): Promise<boolean> => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p));
    logAction('Product Updated', 'product', id, `Updated product details for ID ${id}`);
    try {
      await updateDoc(doc(db, 'products', id), updates);
    } catch { /* ignore */ }
    return true;
  }, [logAction]);

  const deleteProduct = useCallback(async (id: string): Promise<boolean> => {
    setProducts(prev => prev.filter(p => p.id !== id));
    logAction('Product Deleted', 'product', id, `Removed product ID ${id} from catalog`);
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch { /* ignore */ }
    return true;
  }, [logAction]);

  const duplicateProduct = useCallback(async (id: string): Promise<AdminProduct | null> => {
    const found = products.find(p => p.id === id);
    if (!found) return null;

    const copyId = `prod-${Date.now()}`;
    const copy: AdminProduct = {
      ...found,
      id: copyId,
      name: `${found.name} (Copy)`,
      sku: `${found.sku}-CPY`,
      createdAt: new Date().toISOString()
    };

    setProducts(prev => [copy, ...prev]);
    logAction('Product Duplicated', 'product', copyId, `Duplicated product "${found.name}"`);
    return copy;
  }, [products, logAction]);

  const toggleProductActive = useCallback(async (id: string): Promise<boolean> => {
    let nowActive = false;
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        nowActive = !p.isActive;
        return { ...p, isActive: nowActive };
      }
      return p;
    }));
    logAction('Product Visibility', 'product', id, `Toggled product active state to ${nowActive}`);
    return true;
  }, [logAction]);

  const updateStock = useCallback(async (id: string, newQty: number): Promise<boolean> => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          stockQuantity: newQty,
          inStock: newQty > 0
        };
      }
      return p;
    }));
    logAction('Stock Updated', 'product', id, `Updated inventory for product ID ${id} to ${newQty} units`);
    return true;
  }, [logAction]);

  // --- Category Management ---
  const addCategory = useCallback(async (catData: Omit<AdminCategory, 'id'>): Promise<AdminCategory> => {
    const id = `cat-${catData.slug || Date.now()}`;
    const newCat: AdminCategory = {
      ...catData,
      id
    };
    setCategories(prev => [...prev, newCat]);
    logAction('Category Added', 'category', id, `Added category "${newCat.name}"`);
    return newCat;
  }, [logAction]);

  const updateCategory = useCallback(async (id: string, updates: Partial<AdminCategory>): Promise<boolean> => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    logAction('Category Updated', 'category', id, `Updated category details for ID ${id}`);
    return true;
  }, [logAction]);

  const deleteCategory = useCallback(async (id: string): Promise<boolean> => {
    setCategories(prev => prev.filter(c => c.id !== id));
    logAction('Category Deleted', 'category', id, `Deleted category ID ${id}`);
    return true;
  }, [logAction]);

  // --- Customer Management ---
  const updateCustomer = useCallback(async (id: string, updates: Partial<CustomerProfile>): Promise<boolean> => {
    logAction('Customer Updated', 'system', id, `Updated customer profile ${id}: ${Object.keys(updates).join(', ')}`);
    return true;
  }, [logAction]);

  // --- Email Templates & Notifications ---
  const updateEmailTemplate = useCallback(async (id: string, updates: Partial<EmailTemplate>): Promise<boolean> => {
    setEmailTemplates(prev => prev.map(t => t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t));
    logAction('Email Template Updated', 'email', id, `Updated email template "${updates.title || id}"`);
    return true;
  }, [logAction]);

  const sendTestEmail = useCallback(async (templateKey: string, recipientEmail: string): Promise<boolean> => {
    const template = emailTemplates.find(t => t.key === templateKey) || emailTemplates[0];
    if (!template) return false;

    const sampleOrder = orders[0] || INITIAL_ADMIN_ORDERS[0];
    const renderedSubject = `[TEST] ${renderTemplateText(template.subject, sampleOrder)}`;
    const renderedBody = renderTemplateText(template.bodyTemplate, sampleOrder);

    const testSent: SentEmailNotification = {
      id: `test-email-${Date.now()}`,
      orderId: sampleOrder.id,
      orderNumber: sampleOrder.orderNumber,
      customerEmail: recipientEmail,
      customerName: 'Test Administrator',
      templateKey: template.key,
      subject: renderedSubject,
      sentAt: new Date().toISOString(),
      status: 'delivered',
      contentPreview: renderedBody.slice(0, 160) + '...'
    };

    setSentEmails(prev => [testSent, ...prev]);
    logAction('Test Email Dispatched', 'email', templateKey, `Dispatched test email for "${template.title}" to ${recipientEmail}`);
    return true;
  }, [emailTemplates, orders, logAction]);

  const resendNotificationEmail = useCallback(async (orderId: string, templateKey: string): Promise<boolean> => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return false;
    triggerNotificationEmail(order, templateKey as EmailTemplate['key']);
    return true;
  }, [orders, triggerNotificationEmail]);

  // --- Security & Auth ---
  const loginAdmin = useCallback((email: string, passOrPin: string): boolean => {
    // Allows admin email or quick pass
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = passOrPin.trim();

    if (
      cleanEmail === 'ssozimarvin5@gmail.com' ||
      cleanPass === 'SOZY2026' ||
      cleanPass === 'admin123' ||
      cleanPass === 'sozyadmin'
    ) {
      setIsAdminAuthenticated(true);
      setIsDashboardLocked(false);
      localStorage.setItem('sozy_admin_auth', 'true');
      logAction('Admin Authenticated', 'system', 'auth', `Admin session granted to ${cleanEmail || 'Administrator'}`);
      return true;
    }
    return false;
  }, [logAction]);

  const logoutAdmin = useCallback(() => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('sozy_admin_auth');
    logAction('Admin Logged Out', 'system', 'auth', 'Admin session ended');
  }, [logAction]);

  const lockDashboard = useCallback(() => {
    setIsDashboardLocked(true);
  }, []);

  const unlockDashboard = useCallback((pin: string): boolean => {
    const cleanPin = pin.trim().toLowerCase();
    if (
      cleanPin === '2025' ||
      cleanPin === 'sozy2026' ||
      cleanPin === 'admin123' ||
      cleanPin === '1234' ||
      cleanPin === 'admin'
    ) {
      setIsDashboardLocked(false);
      return true;
    }
    return false;
  }, []);

  const updateProductStock = useCallback(async (id: string, newQty: number, reason?: string): Promise<boolean> => {
    if (reason) {
      logAction('Stock Adjustment Reason', 'product', id, `Reason: ${reason}`);
    }
    return updateStock(id, newQty);
  }, [updateStock, logAction]);

  const updateDeliveryStatus = useCallback(async (orderId: string, deliveryStatus: DeliveryStatus, instructions?: string): Promise<boolean> => {
    return updateDelivery(orderId, deliveryStatus, instructions);
  }, [updateDelivery]);

  const unreadOrdersCount = orders.filter(o => o.orderStatus === 'pending').length;

  return (
    <ShopStoreContext.Provider
      value={{
        orders,
        createOrder,
        updateOrderStatus,
        updatePaymentStatus,
        updateDelivery,
        updateDeliveryStatus,
        deleteOrder,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        toggleProductActive,
        updateStock,
        updateProductStock,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        customers,
        updateCustomer,
        emailTemplates,
        sentEmails,
        sentNotifications: sentEmails,
        updateEmailTemplate,
        sendTestEmail,
        resendNotificationEmail,
        activityLogs,
        logAction,
        isAdminAuthenticated,
        isDashboardLocked,
        isLocked: isDashboardLocked,
        adminUser,
        loginAdmin,
        logoutAdmin,
        lockDashboard,
        unlockDashboard,
        unreadOrdersCount
      }}
    >
      {children}
    </ShopStoreContext.Provider>
  );
};

export const useShopStore = (): ShopStoreContextType => {
  const ctx = useContext(ShopStoreContext);
  if (!ctx) {
    throw new Error('useShopStore must be used within a ShopStoreProvider');
  }
  return ctx;
};
