import { CartItem } from '../types';

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'ready_delivery'
  | 'out_for_delivery'
  | 'completed'
  | 'cancelled'
  | 'refunded';

export type DeliveryStatus = 
  | 'pending'
  | 'preparing'
  | 'ready'
  | 'out_for_delivery'
  | 'delivered';

export type PaymentStatus = 
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded';

export type PaymentMethod = 
  | 'MTN Mobile Money'
  | 'Airtel Money'
  | 'Visa / Mastercard'
  | 'Bank Transfer'
  | 'Cash on Delivery';

export interface OrderTimelineEvent {
  id: string;
  time: string;
  title: string;
  note?: string;
  author: string;
  status?: string;
}

export interface CustomerArtwork {
  url: string;
  fileName: string;
  fileSize?: string;
  previewType?: 'image' | 'pdf' | 'vector';
  uploadedAt?: string;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  companyName?: string;
  deliveryAddress: string;
  district?: string;
  deliveryZoneId?: string;
  deliveryInstructions?: string;
  items: CartItem[];
  subtotalUGX: number;
  deliveryFeeUGX: number;
  discountUGX?: number;
  totalUGX: number;
  subtotalUSD: number;
  deliveryFeeUSD: number;
  totalUSD: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  deliveryStatus: DeliveryStatus;
  transactionId?: string;
  customerArtwork?: CustomerArtwork;
  notes?: string;
  timeline: OrderTimelineEvent[];
  createdAt: string;
  updatedAt?: string;
}

export interface AdminProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  subcategory?: string;
  priceUGX: number;
  priceUSD: number;
  salePriceUGX?: number;
  salePriceUSD?: number;
  originalPriceUGX?: number;
  originalPriceUSD?: number;
  stockQuantity: number;
  lowStockThreshold: number;
  lowStockAlert?: number;
  inStock: boolean;
  image: string;
  gallery?: string[];
  videoUrl?: string;
  description: string;
  shortDescription?: string;
  tags: string[];
  isCustomizable: boolean;
  artworkUploadRequired: boolean;
  isFeatured: boolean;
  isBestseller: boolean;
  isNewArrival: boolean;
  isActive: boolean;
  status?: 'active' | 'draft' | 'archived';
  badge?: string;
  turnaroundTime?: string;
  specifications?: Record<string, string>;
  colors?: string[];
  sizes?: string[];
  materials?: string[];
  finishings?: string[];
  rating: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  order: number;
  productCount?: number;
  subcategories: string[];
}

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  deliveryAddress?: string;
  company?: string;
  district?: string;
  ordersCount: number;
  totalOrders?: number;
  totalSpentUGX: number;
  lastOrderDate: string;
  status: 'Active' | 'VIP' | 'Inactive';
  notes?: string;
}

export type AdminCustomer = CustomerProfile;

export interface AdminActivityLog {
  id: string;
  timestamp: string;
  action: string;
  targetType: 'order' | 'product' | 'category' | 'payment' | 'delivery' | 'email' | 'receipt' | 'system';
  targetId: string;
  description: string;
  user: string;
  userName?: string;
}

export interface EmailTemplate {
  id: string;
  key: 
    | 'order_confirmed'
    | 'processing'
    | 'ready_delivery'
    | 'out_for_delivery'
    | 'completed'
    | 'cancelled'
    | 'payment_received'
    | 'payment_failed';
  title?: string;
  name?: string;
  subject: string;
  bodyTemplate?: string;
  body?: string;
  variables?: string[];
  description?: string;
  isEnabled?: boolean;
  updatedAt: string;
}

export interface SentEmailNotification {
  id: string;
  orderId: string;
  orderNumber: string;
  customerEmail?: string;
  customerName?: string;
  recipientEmail?: string;
  recipientName?: string;
  templateKey?: string;
  subject: string;
  sentAt: string;
  status: 'sent' | 'delivered';
  contentPreview?: string;
}

export type AdminTab = 
  | 'overview'
  | 'orders'
  | 'products'
  | 'categories'
  | 'inventory'
  | 'customers'
  | 'payments'
  | 'delivery'
  | 'receipts'
  | 'emails'
  | 'analytics'
  | 'activity'
  | 'settings';
