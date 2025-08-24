import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategoryNavigationSection = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: 'PDF Tools',
      slug: 'pdf-tools',
      description: 'Convert, merge, split, and compress PDF files',
      icon: 'FileText',
      toolCount: 27,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-500/10',
      textColor: 'text-red-400',
      tools: ['PDF to Text', 'PDF Merger', 'PDF Splitter', 'PDF Compressor']
    },
    {
      id: 2,
      name: 'Image Tools',
      slug: 'image-tools',
      description: 'Edit, convert, and optimize images',
      icon: 'Image',
      toolCount: 18,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-400',
      tools: ['Image Converter', 'Image Resizer', 'Image Compressor', 'Watermark']
    },
    {
      id: 3,
      name: 'Text Tools',
      slug: 'text-tools',
      description: 'Format, analyze, and transform text',
      icon: 'Type',
      toolCount: 25,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400',
      tools: ['Case Converter', 'Word Counter', 'Text Formatter', 'Lorem Generator']
    },
    {
      id: 4,
      name: 'Developer Tools',
      slug: 'developer-tools',
      description: 'Code formatters, validators, and utilities',
      icon: 'Code',
      toolCount: 32,
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-400',
      tools: ['JSON Formatter', 'Base64 Encoder', 'URL Encoder', 'Hash Generator']
    },
    {
      id: 5,
      name: 'SEO Tools',
      slug: 'seo-tools',
      description: 'Optimize your website for search engines',
      icon: 'TrendingUp',
      toolCount: 12,
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'bg-orange-500/10',
      textColor: 'text-orange-400',
      tools: ['Meta Tag Generator', 'Sitemap Generator', 'Robots.txt', 'Keywords']
    },
    {
      id: 6,
      name: 'Calculators',
      slug: 'calculators',
      description: 'Mathematical and financial calculators',
      icon: 'Calculator',
      toolCount: 20,
      color: 'from-cyan-500 to-teal-500',
      bgColor: 'bg-cyan-500/10',
      textColor: 'text-cyan-400',
      tools: ['BMI Calculator', 'Age Calculator', 'Loan Calculator', 'Unit Converter']
    },
    {
      id: 7,
      name: 'Generators',
      slug: 'generators',
      description: 'Generate codes, passwords, and content',
      icon: 'Zap',
      toolCount: 14,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-500/10',
      textColor: 'text-pink-400',
      tools: ['QR Generator', 'Password Generator', 'UUID Generator', 'Color Palette']
    },
    {
      id: 8,
      name: 'Converters',
      slug: 'converters',
      description: 'Convert between different formats and units',
      icon: 'RefreshCw',
      toolCount: 16,
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-500/10',
      textColor: 'text-indigo-400',
      tools: ['Currency Converter', 'Unit Converter', 'Time Zone', 'Number Base']
    }
  ];

  const handleCategoryClick = (category) => {
    navigate(`/tool-category-browse?category=${category?.slug}`);
  };

  return (
    <section className="py-16 lg:py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Grid3X3" size={20} className="text-accent" />
            <span className="text-sm font-medium text-accent uppercase tracking-wide">
              Explore Categories
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Browse by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Find the perfect tool for your needs. Our comprehensive collection covers everything from 
            document processing to web development utilities.
          </p>
        </div>

        {/* Categories Grid - Mobile Horizontal Scroll */}
        <div className="lg:hidden mb-8">
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {categories?.map((category) => (
              <button
                key={category?.id}
                onClick={() => handleCategoryClick(category)}
                className="flex-shrink-0 w-64 glass-card p-6 rounded-xl hover:shadow-elevation-2 transition-all duration-200"
              >
                <div className={`w-12 h-12 ${category?.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon name={category?.icon} size={24} className={category?.textColor} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{category?.name}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {category?.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-accent font-medium">
                    {category?.toolCount} tools
                  </span>
                  <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid - Desktop */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 mb-12">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => handleCategoryClick(category)}
              onMouseEnter={() => setHoveredCategory(category?.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="glass-card p-6 rounded-xl hover:shadow-elevation-2 transition-all duration-200 group text-left"
            >
              <div className={`w-12 h-12 ${category?.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={category?.icon} size={24} className={category?.textColor} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                {category?.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {category?.description}
              </p>
              
              {/* Tool Preview on Hover */}
              {hoveredCategory === category?.id && (
                <div className="mb-4 animate-slide-up">
                  <div className="text-xs text-muted-foreground mb-2">Popular tools:</div>
                  <div className="space-y-1">
                    {category?.tools?.slice(0, 3)?.map((tool, index) => (
                      <div key={index} className="text-xs text-foreground/80 flex items-center space-x-1">
                        <Icon name="Dot" size={12} className="text-accent" />
                        <span>{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-accent font-medium">
                  {category?.toolCount} tools
                </span>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" 
                />
              </div>
            </button>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => navigate('/tool-category-browse')}
            className="px-8 py-4 text-lg font-semibold"
          >
            <Icon name="Grid3X3" size={20} className="mr-3" />
            View All Categories
            <Icon name="ArrowRight" size={18} className="ml-3" />
          </Button>
        </div>

        {/* Category Stats */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                {categories?.length}
              </div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                {categories?.reduce((sum, cat) => sum + cat?.toolCount, 0)}+
              </div>
              <div className="text-sm text-muted-foreground">Total Tools</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Client-Side</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Free</div>
              <div className="text-sm text-muted-foreground">Always</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryNavigationSection;