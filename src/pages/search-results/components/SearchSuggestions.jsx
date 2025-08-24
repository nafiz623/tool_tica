import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchSuggestions = ({ 
  searchQuery, 
  onSuggestionClick, 
  className = "" 
}) => {
  const alternativeTerms = [
    'text converter',
    'image editor',
    'pdf tools',
    'code formatter',
    'calculator',
    'color picker',
    'qr generator',
    'password generator'
  ];

  const relatedCategories = [
    { name: 'Text Tools', slug: 'text-tools', icon: 'Type', count: 25 },
    { name: 'Image Tools', slug: 'image-tools', icon: 'Image', count: 18 },
    { name: 'PDF Tools', slug: 'pdf-tools', icon: 'FileText', count: 15 },
    { name: 'Developer Tools', slug: 'developer-tools', icon: 'Code', count: 32 }
  ];

  const popularTools = [
    { name: 'Text Case Converter', slug: 'text-case-converter', category: 'Text Tools', icon: 'Type' },
    { name: 'Image Resizer', slug: 'image-resizer', category: 'Image Tools', icon: 'Image' },
    { name: 'PDF Merger', slug: 'pdf-merger', category: 'PDF Tools', icon: 'FileText' },
    { name: 'JSON Formatter', slug: 'json-formatter', category: 'Developer Tools', icon: 'Code' },
    { name: 'Color Picker', slug: 'color-picker', category: 'Design Tools', icon: 'Palette' },
    { name: 'QR Code Generator', slug: 'qr-generator', category: 'Generators', icon: 'QrCode' }
  ];

  const handleSuggestionClick = (suggestion) => {
    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Alternative Search Terms */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Search" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Try These Search Terms</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          No results found for "{searchQuery}". Here are some popular search terms:
        </p>
        <div className="flex flex-wrap gap-2">
          {alternativeTerms?.map((term, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(term)}
              className="px-3 py-2 bg-surface/50 hover:bg-surface text-muted-foreground hover:text-foreground text-sm rounded-lg transition-all duration-200 hover:scale-105"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
      {/* Related Categories */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Grid3X3" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Browse by Category</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Explore tools organized by category to find what you need:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {relatedCategories?.map((category) => (
            <Link
              key={category?.slug}
              to={`/tool-category-browse?category=${category?.slug}`}
              className="flex items-center space-x-3 p-3 bg-surface/30 hover:bg-surface/50 rounded-lg transition-all duration-200 hover:scale-105 group"
            >
              <Icon 
                name={category?.icon} 
                size={20} 
                className="text-accent group-hover:scale-110 transition-transform duration-200" 
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                  {category?.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {category?.count} tools available
                </div>
              </div>
              <Icon name="ArrowRight" size={16} className="text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
            </Link>
          ))}
        </div>
      </div>
      {/* Popular Tools */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="TrendingUp" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Popular Tools</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Check out these frequently used tools:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {popularTools?.map((tool) => (
            <Link
              key={tool?.slug}
              to={`/individual-tool-page?tool=${tool?.slug}`}
              className="flex items-center space-x-3 p-3 bg-surface/30 hover:bg-surface/50 rounded-lg transition-all duration-200 hover:scale-105 group"
            >
              <Icon 
                name={tool?.icon} 
                size={18} 
                className="text-accent group-hover:scale-110 transition-transform duration-200" 
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200 truncate">
                  {tool?.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {tool?.category}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Help Section */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="HelpCircle" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Search Tips</h3>
        </div>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span>Try using different keywords or synonyms</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span>Use broader terms like "text" instead of "text converter"</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span>Check spelling and try removing special characters</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span>Browse categories to discover tools you might not have thought of</span>
          </div>
        </div>
        <div className="mt-4">
          <Link to="/tool-category-browse">
            <Button variant="outline" className="w-full sm:w-auto">
              <Icon name="Grid3X3" size={16} className="mr-2" />
              Browse All Categories
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestions;