import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FeaturedToolsSection from './components/FeaturedToolsSection';
import CategoryNavigationSection from './components/CategoryNavigationSection';
import BlogPreviewSection from './components/BlogPreviewSection';
import FAQSection from './components/FAQSection';
import AdSlot from './components/AdSlot';
import FooterSection from './components/FooterSection';

const Homepage = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Tool Tica",
    "description": "Privacy-first online tools for PDF processing, image conversion, text manipulation, and more. All processing happens client-side for complete privacy.",
    "url": "https://tooltica.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://tooltica.com/search-results?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Tool Tica",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tooltica.com/logo.png"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Tool Tica - Privacy-First Online Tools | PDF, Image, Text & More</title>
        <meta 
          name="description" 
          content="Free privacy-first online tools for PDF processing, image conversion, text manipulation, and more. All processing happens client-side - no uploads, complete privacy guaranteed." 
        />
        <meta 
          name="keywords" 
          content="online tools, PDF converter, image converter, text tools, privacy tools, client-side processing, free tools" 
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://tooltica.com/homepage" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Tool Tica - Privacy-First Online Tools" />
        <meta property="og:description" content="Free privacy-first online tools for PDF processing, image conversion, text manipulation, and more. All processing happens client-side." />
        <meta property="og:url" content="https://tooltica.com/homepage" />
        <meta property="og:image" content="https://tooltica.com/og-image.png" />
        <meta property="og:site_name" content="Tool Tica" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tool Tica - Privacy-First Online Tools" />
        <meta name="twitter:description" content="Free privacy-first online tools for PDF processing, image conversion, text manipulation, and more." />
        <meta name="twitter:image" content="https://tooltica.com/twitter-image.png" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="pt-16 lg:pt-18">
          {/* Header Ad Banner */}
          <div className="hidden lg:flex justify-center py-4 bg-surface/20">
            <AdSlot 
              slot="homepage-header-banner" 
              size="leaderboard" 
              className="mx-auto"
            />
          </div>

          {/* Hero Section */}
          <HeroSection />

          {/* Inline Ad - Mobile */}
          <div className="lg:hidden flex justify-center py-6 bg-surface/10">
            <AdSlot 
              slot="homepage-mobile-banner" 
              size="mobile" 
              className="mx-auto"
            />
          </div>

          {/* Featured Tools Section */}
          <FeaturedToolsSection />

          {/* Inline Ad Between Sections */}
          <div className="flex justify-center py-8 bg-surface/20">
            <AdSlot 
              slot="homepage-inline-rectangle" 
              size="rectangle" 
              className="mx-auto"
            />
          </div>

          {/* Category Navigation Section */}
          <CategoryNavigationSection />

          {/* Blog Preview Section */}
          <BlogPreviewSection />

          {/* FAQ Section */}
          <FAQSection />

          {/* Footer Ad Banner */}
          <div className="flex justify-center py-6 bg-surface/10">
            <AdSlot 
              slot="homepage-footer-banner" 
              size="leaderboard" 
              className="mx-auto"
            />
          </div>
        </main>

        {/* Footer */}
        <FooterSection />
      </div>
    </>
  );
};

export default Homepage;