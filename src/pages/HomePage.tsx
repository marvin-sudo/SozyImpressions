import React from 'react';
import { View, Currency, Product, CartItem } from '../types';
import { HeroSection } from '../components/HeroSection';
import { TrustBar } from '../components/TrustBar';
import { TrustedByMarquee } from '../components/TrustedByMarquee';
import { CoreServicesSection } from '../components/CoreServicesSection';
import { FeaturedCorporateBranding } from '../components/FeaturedCorporateBranding';
import { ShopPreviewSection } from '../components/ShopPreviewSection';
import { PortfolioSection } from '../components/PortfolioSection';
import { WhySozySection } from '../components/WhySozySection';
import { ProcessSection } from '../components/ProcessSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { QuoteCalculatorSection } from '../components/QuoteCalculatorSection';
import { BlogPreviewSection } from '../components/BlogPreviewSection';
import { FaqSection } from '../components/FaqSection';
import { FinalCtaSection } from '../components/FinalCtaSection';

interface HomePageProps {
  navigate: (view: View, param?: string) => void;
  currency: Currency;
  products: Product[];
  onOpenCustomizer: (product: Product) => void;
  onAddToCart: (item: CartItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  navigate,
  currency,
  products,
  onOpenCustomizer,
  onAddToCart
}) => {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <HeroSection navigate={navigate} />

      {/* 2. Trust Metrics Bar */}
      <TrustBar />

      {/* 3. Infinite Trusted By Marquee */}
      <TrustedByMarquee />

      {/* 4. Core 7 Services Grid */}
      <CoreServicesSection navigate={navigate} />

      {/* 5. Interactive Corporate Branding & Signage Showcase */}
      <FeaturedCorporateBranding navigate={navigate} />

      {/* 6. Customised Gifts & E-Commerce Catalogue Preview */}
      <ShopPreviewSection
        currency={currency}
        products={products}
        onOpenCustomizer={onOpenCustomizer}
        onAddToCart={onAddToCart}
        navigate={navigate}
      />

      {/* 7. Work That Speaks For Itself - Portfolio & Case Studies */}
      <PortfolioSection navigate={navigate} />

      {/* 8. 7 Core Value Pillars - Why Sozy Impressions */}
      <WhySozySection navigate={navigate} />

      {/* 9. 5-Step Quality Assurance Workflow */}
      <ProcessSection navigate={navigate} />

      {/* 11. Client Testimonials & Social Proof */}
      <TestimonialsSection />

      {/* 12. Smart Interactive Quote Calculator & RFQ Form */}
      <QuoteCalculatorSection currency={currency} />

      {/* 13. Industry Insights & Blog */}
      <BlogPreviewSection navigate={navigate} />

      {/* 14. Frequently Asked Questions Accordion */}
      <FaqSection />

      {/* 15. Final High-Converting Conversion Banner */}
      <FinalCtaSection navigate={navigate} />
    </div>
  );
};
