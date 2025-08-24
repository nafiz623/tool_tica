import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ToolCard from '../../../components/ui/ToolCard';

const FeaturedToolsSection = () => {
  const navigate = useNavigate();

  const featuredTools = [
    {
      id: 1,
      name: 'PDF to Text Converter',
      description: 'Extract text from PDF files instantly with our client-side converter. No uploads required, complete privacy guaranteed.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'pdf-to-text-converter',
      icon: 'FileText',
      usageCount: 15420,
      rating: 4.9,
      tags: ['pdf', 'text', 'converter'],
      isPremium: false,
      isNew: true,
      lastUpdated: '2024-08-20'
    },
    {
      id: 2,
      name: 'Image Format Converter',
      description: 'Convert images between formats (JPG, PNG, WebP, AVIF) with quality control and batch processing support.',
      category: 'Image Tools',
      categorySlug: 'image-tools',
      slug: 'image-format-converter',
      icon: 'Image',
      usageCount: 12850,
      rating: 4.8,
      tags: ['image', 'converter', 'format'],
      isPremium: false,
      isNew: false,
      lastUpdated: '2024-08-18'
    },
    {
      id: 3,
      name: 'Text Case Converter',
      description: 'Transform text between uppercase, lowercase, title case, camel case, and more formatting options.',
      category: 'Text Tools',
      categorySlug: 'text-tools',
      slug: 'text-case-converter',
      icon: 'Type',
      usageCount: 9630,
      rating: 4.7,
      tags: ['text', 'case', 'format'],
      isPremium: false,
      isNew: false,
      lastUpdated: '2024-08-15'
    },
    {
      id: 4,
      name: 'QR Code Generator',
      description: 'Generate QR codes for URLs, text, WiFi credentials, and more with customizable colors and sizes.',
      category: 'Generators',
      categorySlug: 'generators',
      slug: 'qr-code-generator',
      icon: 'QrCode',
      usageCount: 18750,
      rating: 4.9,
      tags: ['qr', 'generator', 'code'],
      isPremium: false,
      isNew: false,
      lastUpdated: '2024-08-22'
    },
    {
      id: 5,
      name: 'Password Generator',
      description: 'Create secure passwords with customizable length, character sets, and complexity requirements.',
      category: 'Security Tools',
      categorySlug: 'security-tools',
      slug: 'password-generator',
      icon: 'Key',
      usageCount: 11200,
      rating: 4.8,
      tags: ['password', 'security', 'generator'],
      isPremium: false,
      isNew: false,
      lastUpdated: '2024-08-19'
    },
    {
      id: 6,
      name: 'JSON Formatter',
      description: 'Format, validate, and beautify JSON data with syntax highlighting and error detection.',
      category: 'Developer Tools',
      categorySlug: 'developer-tools',
      slug: 'json-formatter',
      icon: 'Code',
      usageCount: 8940,
      rating: 4.6,
      tags: ['json', 'formatter', 'developer'],
      isPremium: false,
      isNew: false,
      lastUpdated: '2024-08-17'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Star" size={20} className="text-warning" />
            <span className="text-sm font-medium text-accent uppercase tracking-wide">
              Most Popular
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Featured Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our most popular privacy-first tools, trusted by thousands of users worldwide. 
            All processing happens in your browser - no data ever leaves your device.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {featuredTools?.map((tool) => (
            <ToolCard
              key={tool?.id}
              tool={tool}
              variant="featured"
              showCategory={true}
              showDescription={true}
              showStats={true}
              className="h-full"
              onToolClick={() => navigate(`/${tool.categorySlug}/${tool.slug}`)}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => navigate('/tool-category-browse')}
            className="px-8 py-4 text-lg font-semibold"
          >
            <Icon name="Grid3X3" size={20} className="mr-3" />
            View All Tools
            <Icon name="ArrowRight" size={18} className="ml-3" />
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-success" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">100% Private</h3>
              <p className="text-sm text-muted-foreground">
                All processing happens locally in your browser. Your files never leave your device.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Icon name="Zap" size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                No server uploads or downloads. Process files instantly with client-side technology.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <Icon name="Infinity" size={24} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Unlimited Usage</h3>
              <p className="text-sm text-muted-foreground">
                Use any tool as many times as you want. No limits, no subscriptions required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedToolsSection;