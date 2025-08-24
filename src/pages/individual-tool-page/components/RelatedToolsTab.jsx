import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedToolsTab = ({ currentTool }) => {
  const relatedTools = [
    {
      id: 1,
      name: 'PDF Merger',
      description: 'Combine multiple PDF files into a single document with ease.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'pdf-merger',
      icon: 'FileText',
      usageCount: 2150,
      rating: 4.9,
      isPremium: false,
      isNew: false
    },
    {
      id: 2,
      name: 'PDF Splitter',
      description: 'Split large PDF files into smaller, manageable documents.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'pdf-splitter',
      icon: 'Scissors',
      usageCount: 1890,
      rating: 4.7,
      isPremium: false,
      isNew: true
    },
    {
      id: 3,
      name: 'PDF Compressor',
      description: 'Reduce PDF file size while maintaining quality.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'pdf-compressor',
      icon: 'Archive',
      usageCount: 3200,
      rating: 4.8,
      isPremium: false,
      isNew: false
    },
    {
      id: 4,
      name: 'Image to PDF',
      description: 'Convert images (JPG, PNG, etc.) to PDF format.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'image-to-pdf',
      icon: 'Image',
      usageCount: 2750,
      rating: 4.6,
      isPremium: false,
      isNew: false
    },
    {
      id: 5,
      name: 'Word to PDF',
      description: 'Convert Microsoft Word documents to PDF format.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'word-to-pdf',
      icon: 'FileText',
      usageCount: 1950,
      rating: 4.5,
      isPremium: true,
      isNew: false
    },
    {
      id: 6,
      name: 'PDF Watermark',
      description: 'Add text or image watermarks to your PDF documents.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'pdf-watermark',
      icon: 'Droplets',
      usageCount: 1420,
      rating: 4.4,
      isPremium: true,
      isNew: false
    }
  ];

  const formatUsageCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000)?.toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000)?.toFixed(1)}K`;
    }
    return count?.toString();
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">Related Tools</h2>
        <p className="text-muted-foreground mb-6">
          Discover other PDF tools that might be useful for your document processing needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedTools?.map((tool) => (
            <div key={tool?.id} className="glass-card p-6 hover:shadow-elevation-2 transition-all duration-200 group">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-primary group-hover:scale-110 transition-transform duration-200">
                    <Icon name={tool?.icon} size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200 truncate">
                      {tool?.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs font-medium text-primary">
                        {tool?.category}
                      </span>
                      {tool?.isNew && (
                        <span className="px-2 py-0.5 bg-success/20 text-success text-xs font-medium rounded-full">
                          New
                        </span>
                      )}
                      {tool?.isPremium && (
                        <span className="px-2 py-0.5 bg-warning/20 text-warning text-xs font-medium rounded-full">
                          Premium
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <Icon name="ExternalLink" size={16} />
                </Button>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {tool?.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={12} />
                    <span>{formatUsageCount(tool?.usageCount)} uses</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-warning" />
                    <span>{tool?.rating}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Link
                to={`/individual-tool-page?tool=${tool?.slug}&category=${tool?.categorySlug}`}
                className="block"
              >
                <Button
                  variant="outline"
                  fullWidth
                  className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-200"
                >
                  <Icon name="Play" size={16} className="mr-2" />
                  Use Tool
                  <Icon name="ArrowRight" size={14} className="ml-2" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* Browse More Tools */}
      <div className="glass-card p-6 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center">
            <Icon name="Grid3X3" size={32} className="text-primary" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Explore More Tools
            </h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              Discover our complete collection of PDF tools and other utilities to boost your productivity.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/tool-category-browse?category=pdf-tools">
              <Button variant="default" className="gradient-primary text-white">
                <Icon name="FileText" size={16} className="mr-2" />
                Browse PDF Tools
              </Button>
            </Link>
            
            <Link to="/tool-category-browse">
              <Button variant="outline">
                <Icon name="Grid3X3" size={16} className="mr-2" />
                All Categories
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedToolsTab;