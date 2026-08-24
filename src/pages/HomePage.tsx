import React from 'react';
import { View } from '../types';
import { HeroSection } from '../components/HeroSection';
import { TrustBar } from '../components/TrustBar';
import { TrustedByMarquee } from '../components/TrustedByMarquee';
import { CoreServicesSection } from '../components/CoreServicesSection';
import { FeaturedCorporateBranding } from '../components/FeaturedCorporateBranding';
import { PortfolioSection } from '../components/PortfolioSection';
import { WhySozySection } from '../components/WhySozySection';
import { ProcessSection } from '../components/ProcessSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { BlogPreviewSection } from '../components/BlogPreviewSection';
import { FinalCtaSection } from '../components/FinalCtaSection';

interface HomePageProps {
  navigate: (view: View, param?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  navigate
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

      {/* 6. Work That Speaks For Itself - Portfolio & Case Studies */}
      <PortfolioSection navigate={navigate} />

      {/* 7. 7 Core Value Pillars - Why Sozy Impressions */}
      <WhySozySection navigate={navigate} />

      {/* 8. 5-Step Quality Assurance Workflow */}
      <ProcessSection navigate={navigate} />

      {/* 9. Client Testimonials & Social Proof */}
      <TestimonialsSection />

      {/* 10. Industry Insights & Blog */}
      <BlogPreviewSection navigate={navigate} />

      {/* 11. Final High-Converting Conversion Banner */}
      <FinalCtaSection navigate={navigate} />
    </div>
  );
};
