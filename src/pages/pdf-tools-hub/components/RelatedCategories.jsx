import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const RelatedCategories = () => {
  const relatedCategories = [
    {
      id: 1,
      name: 'Image Converter & Editor',
      slug: 'image-tools',
      description: '17 tools for image editing and conversion',
      icon: 'Image',
      color: 'text-green-400',
      toolCount: 17,
      popular: ['JPG to PNG', 'Image Compressor', 'Crop Image']
    },
    {
      id: 2,
      name: 'Text & Code Tools',
      slug: 'text-tools',
      description: '14 tools for text manipulation and code formatting',
      icon: 'Type',
      color: 'text-blue-400',
      toolCount: 14,
      popular: ['JSON Formatter', 'Text Analyzer', 'Password Generator']
    },
    {
      id: 3,
      name: 'SEO & Web Tools',
      slug: 'seo-tools',
      description: '12 tools for search engine optimization',
      icon: 'Globe',
      color: 'text-purple-400',
      toolCount: 12,
      popular: ['Meta Tag Generator', 'SEO Analyzer', 'Sitemap Generator']
    },
    {
      id: 4,
      name: 'Converters & Calculators',
      slug: 'calculators',
      description: '12 tools for calculations and conversions',
      icon: 'Calculator',
      color: 'text-cyan-400',
      toolCount: 12,
      popular: ['Currency Converter', 'BMI Calculator', 'Unit Converter']
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          Explore More Tool Categories
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover our complete suite of productivity tools across different categories
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {relatedCategories?.map((category) => (
          <Link
            key={category?.id}
            to={`/tool-category-browse?category=${category?.slug}`}
            className="block group"
          >
            <div className="glass-card p-6 rounded-xl hover:shadow-elevation-2 transition-all duration-200 group-hover:scale-105">
              {/* Icon */}
              <div className={`w-12 h-12 ${category?.color} bg-current/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={category?.icon} size={24} className={category?.color} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                {category?.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {category?.description}
              </p>

              {/* Popular Tools */}
              <div className="mb-4">
                <div className="text-xs font-medium text-accent mb-2">Popular:</div>
                <div className="flex flex-wrap gap-1">
                  {category?.popular?.map((tool, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-surface/50 text-xs text-muted-foreground rounded"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tool Count */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  {category?.toolCount} Tools
                </span>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" 
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA to Multi-Category Dashboard */}
      <div className="text-center">
        <div className="glass-card p-8 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Need Access to All Categories?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Visit our Multi-Category Tool Dashboard for unified access to all 100+ tools across different categories.
          </p>
          <Link to="/multi-category-tool-dashboard">
            <Button variant="primary" size="lg" className="px-8">
              <Icon name="Grid3X3" size={18} className="mr-2" />
              View All Categories
              <Icon name="ExternalLink" size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedCategories;