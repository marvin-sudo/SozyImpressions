export type Currency = 'UGX' | 'USD';

export type View = 
  | 'home'
  | 'services'
  | 'about'
  | 'portfolio'
  | 'shop'
  | 'bestsellers'
  | 'quote'
  | 'blog'
  | 'contact'
  | 'account'
  | 'admin';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  iconName: string;
  image: string;
  popularProducts: string[];
  features: string[];
  turnaroundTime: string;
  turnaround?: string;
  startingPriceUGX: number;
  startingPriceUSD: number;
}

export type ServiceDetail = ServiceItem;

export interface Product {
  id: string;
  name: string;
  category: string;
  priceUGX: number;
  priceUSD: number;
  originalPriceUGX?: number;
  originalPriceUSD?: number;
  image: string;
  gallery?: string[];
  description: string;
  specifications?: Record<string, string>;
  isCustomizable?: boolean;
  minOrderQty?: number;
  bulkTiers?: { minQty: number; discountPercent: number }[];
  colors?: string[];
  sizes?: string[];
  materials?: string[];
  finishings?: string[];
  customizationOptions?: {
    colors?: string[];
    sizes?: string[];
    materials?: string[];
    finishings?: string[];
  };
  rating: number;
  reviewCount?: number;
  reviewsCount?: number;
  inStock?: boolean;
  isFeatured?: boolean;
  badge?: string;
}

export interface CartCustomization {
  color?: string;
  size?: string;
  material?: string;
  finishing?: string;
  text?: string;
  instructions?: string;
  logoFile?: string;
  logoUrl?: string;
  placement?: string;
}

export type CustomizationOptions = CartCustomization;

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  selectedMaterial?: string;
  selectedFinishing?: string;
  customLogoUrl?: string;
  customText?: string;
  customInstructions?: string;
  customization?: CartCustomization;
  unitPriceUGX?: number;
  unitPriceUSD?: number;
  subtotalUGX?: number;
  subtotalUSD?: number;
  itemTotalPriceUGX?: number;
  itemTotalPriceUSD?: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: string;
  image: string;
  gallery: string[];
  year: string;
  description: string;
  challenge: string;
  solution: string;
  execution: string;
  results: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface CaseStudy extends PortfolioProject {
  industry: string;
  metrics: { label: string; value: string }[];
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  position: string;
  quote: string;
  rating: number;
  photo: string;
  projectType: string;
  verified: boolean;
}

export interface IndustrySolution {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  heroImage: string;
  keyNeeds: string[];
  recommendedServices: string[];
  caseStudySnippet: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  image: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export interface QuoteRequest {
  id: string;
  name?: string;
  fullName?: string;
  company?: string;
  companyName?: string;
  phone: string;
  email: string;
  service?: string;
  serviceId?: string;
  product: string;
  quantity: number;
  deadline?: string;
  location?: string;
  budget?: string;
  estimatedBudget?: string;
  artworkUrl?: string;
  instructions?: string;
  notes?: string;
  specifications?: Record<string, string>;
  createdAt: string;
  status: 'new' | 'pending' | 'reviewed' | 'quoted' | 'approved' | 'in_production' | 'completed' | 'rejected' | string;
  estimatedTotalUGX?: number;
  estimatedPriceUGX?: number;
  estimatedPriceUSD?: number;
}

export interface DeliveryZone {
  id: string;
  name: string;
  districts: string[];
  feeUGX: number;
  feeUSD: number;
  estimatedDays: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  district?: string;
  zone?: string;
  paymentMethod: 'MTN Mobile Money' | 'Airtel Money' | 'Visa / Mastercard' | 'Bank Transfer' | 'Cash on Delivery' | string;
  paymentStatus: 'pending' | 'completed' | 'verified' | string;
  orderStatus: 'Enquiry' | 'Quote' | 'Design' | 'Approval' | 'Production' | 'Ready' | 'Delivered' | 'pending' | 'delivered' | string;
  items: CartItem[];
  subtotalUGX: number;
  subtotalUSD: number;
  deliveryFeeUGX: number;
  deliveryFeeUSD: number;
  totalUGX: number;
  totalUSD: number;
  specialInstructions?: string;
  createdAt: string;
}
