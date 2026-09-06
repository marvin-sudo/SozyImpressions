import * as React from 'react';
import { 
  Palette, 
  Globe, 
  Megaphone, 
  Video, 
  Shirt,
  Layers
} from 'lucide-react';

export const COLORS = {
  primary: '#3f3fbf',
  accent: '#ff1493',
  dark: '#121212',
  white: '#ffffff'
};

export const SERVICES = [
  {
    id: 'branding',
    title: 'Branding & Identity',
    description: 'We craft unique visual identities that tell your story and resonate with your audience.',
    icon: <Layers className="w-8 h-8" />,
    fullDescription: 'Your brand is more than just a logo; it\'s the pulse of your business. We dive deep into your mission, values, and vision to create a cohesive brand identity that stands out in a crowded market. From color palettes to typography system, we ensure every touchpoint reflects your essence.',
    benefits: ['Increased brand recognition', 'Professional aesthetic', 'Emotional connection with customers']
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Bespoke designs for digital and print media that capture attention and drive results.',
    icon: <Palette className="w-8 h-8" />,
    fullDescription: 'Visual communication is key in today\'s fast-paced world. Our graphic design services cover everything from social media graphics and marketing collateral to reports and stationery. We balance creativity with strategy to deliver designs that don\'t just look good but work hard for your brand.',
    benefits: ['Engaging visuals', 'Consistent across all platforms', 'Strategic communication']
  },
  {
    id: 'web-design',
    title: 'Website Design',
    description: 'Modern, responsive, and user-centric websites built to convert visitors into loyal customers.',
    icon: <Globe className="w-8 h-8" />,
    fullDescription: 'Your website is your 24/7 digital storefront. We design high-converting, responsive websites that provide a seamless user experience. Our focus is on intuitive navigation, fast loading speeds, and aesthetic excellence that aligns perfectly with your brand.',
    benefits: ['Mobile-optimized', 'User-centric UX', 'Higher conversion rates']
  },
  {
    id: 'marketing',
    title: 'Social Media Marketing',
    description: 'Strategic campaigns that build community, increase engagement, and drive sales.',
    icon: <Megaphone className="w-8 h-8" />,
    fullDescription: 'We help you navigate the ever-changing social landscape. Our social media marketing strategies are data-driven and community-focused. We handle everything from content planning and community management to paid advertising, ensuring your brand stays relevant and heard.',
    benefits: ['Targeted reach', 'Brand loyalty', 'Measurable growth']
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    description: 'Compelling stories told through photography, videography, and creative copywriting.',
    icon: <Video className="w-8 h-8" />,
    fullDescription: 'Content is the bridge between you and your audience. We produce high-quality visual and written content that captures eyes and minds. Whether it\'s a punchy promotional video, professional product photography, or engaging blog posts, we tell your story effectively.',
    benefits: ['High engagement', 'Professional image', 'SEO friendly']
  },
  {
    id: 'printing',
    title: 'Printing & Merchandise',
    description: 'High-quality print solutions and branded items that make your business tangible.',
    icon: <Shirt className="w-8 h-8" />,
    fullDescription: 'From business cards to large-scale banners, our printing services ensure your brand looks sharp in the physical world. We also specialize in custom merchandise—T-shirts, hoodies, and accessories—that your customers and team will actually want to wear.',
    benefits: ['Tangible brand presence', 'Quality production', 'Customized items']
  }
];

export const PORTFOLIO = [
  {
    id: 'p1',
    title: 'Lumina Tech Branding',
    category: 'Branding',
    description: 'A complete identity overhaul for a renewable energy startup.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p2',
    title: 'Oasis App UI/UX',
    category: 'Website Design',
    description: 'A wellness app designed for meditation and daily habit tracking.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p3',
    title: 'Urban Wear Campaign',
    category: 'Content Creation',
    description: 'Photography and social media strategy for a local streetwear label.',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800'
  }
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'CEO, Brightly',
    quote: 'Sozy Impressions took our vision and turned it into a brand we\'re incredibly proud of. Their attention to detail is unmatched.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 't2',
    name: 'Michael Chen',
    role: 'Founder, TechPulse',
    quote: 'The website they built for us isn\'t just beautiful—it\'s actually driving conversions. A game changer for our startup.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  }
];

export const PRODUCTS = [
  {
    id: 'prod1',
    name: 'Sozy Classic Hoodie',
    price: 45.00,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400',
    description: 'Premium heavyweight hoodie with high-quality embroidery.'
  },
  {
    id: 'prod2',
    name: 'Brand Identity Blueprint',
    price: 25.00,
    category: 'Digital',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=400',
    description: 'A comprehensive guide to building a solid brand from scratch.'
  },
  {
    id: 'prod3',
    name: 'Creative Tote Bag',
    price: 18.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400',
    description: 'Eco-friendly cotton tote with a minimalist agency design.'
  },
  {
    id: 'prod4',
    name: 'Sozy Tech Tee',
    price: 28.00,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400',
    description: 'Soft-touch breathable tee with the iconic magenta logo.'
  }
];
