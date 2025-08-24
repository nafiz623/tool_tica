import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const CategoryDropdown = ({ 
  trigger = "Categories",
  className = "",
  onCategorySelect,
  showToolCounts = true,
  variant = "default"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const categories = [
    { 
      id: 1, 
      name: 'Text Tools', 
      slug: 'text-tools', 
      toolCount: 25, 
      description: 'Text manipulation and formatting',
      icon: 'Type',
      color: 'text-blue-400'
    },
    { 
      id: 2, 
      name: 'Image Tools', 
      slug: 'image-tools', 
      toolCount: 18, 
      description: 'Image editing and conversion',
      icon: 'Image',
      color: 'text-green-400'
    },
    { 
      id: 3, 
      name: 'PDF Tools', 
      slug: 'pdf-tools', 
      toolCount: 15, 
      description: 'PDF processing and manipulation',
      icon: 'FileText',
      color: 'text-red-400'
    },
    { 
      id: 4, 
      name: 'Developer Tools', 
      slug: 'developer-tools', 
      toolCount: 32, 
      description: 'Code and development utilities',
      icon: 'Code',
      color: 'text-purple-400'
    },
    { 
      id: 5, 
      name: 'SEO Tools', 
      slug: 'seo-tools', 
      toolCount: 12, 
      description: 'Search engine optimization',
      icon: 'TrendingUp',
      color: 'text-orange-400'
    },
    { 
      id: 6, 
      name: 'Calculators', 
      slug: 'calculators', 
      toolCount: 20, 
      description: 'Mathematical and financial calculators',
      icon: 'Calculator',
      color: 'text-cyan-400'
    },
    { 
      id: 7, 
      name: 'Converters', 
      slug: 'converters', 
      toolCount: 16, 
      description: 'Unit and format converters',
      icon: 'RefreshCw',
      color: 'text-yellow-400'
    },
    { 
      id: 8, 
      name: 'Generators', 
      slug: 'generators', 
      toolCount: 14, 
      description: 'Content and data generators',
      icon: 'Zap',
      color: 'text-pink-400'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (category) => {
    setIsLoading(true);
    setIsOpen(false);
    
    if (onCategorySelect) {
      onCategorySelect(category);
    } else {
      navigate(`/tool-category-browse?category=${category?.slug}`);
    }
    
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleViewAllCategories = () => {
    setIsOpen(false);
    navigate('/tool-category-browse');
  };

  const triggerVariants = {
    default: "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200",
    button: "flex items-center space-x-2",
    minimal: "flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={triggerVariants?.[variant]}
        disabled={isLoading}
      >
        {variant === 'button' ? (
          <Button variant="ghost" className="flex items-center space-x-2">
            <Icon name="Grid3X3" size={16} />
            <span>{trigger}</span>
            <Icon 
              name={isOpen ? "ChevronUp" : "ChevronDown"} 
              size={14} 
              className="transition-transform duration-200"
            />
          </Button>
        ) : (
          <>
            <Icon name="Grid3X3" size={16} />
            <span>{trigger}</span>
            <Icon 
              name={isOpen ? "ChevronUp" : "ChevronDown"} 
              size={14} 
              className="transition-transform duration-200"
            />
          </>
        )}
      </button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-96 glass-card rounded-xl shadow-elevation-3 animate-slide-up z-50">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Tool Categories</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleViewAllCategories}
                className="text-xs text-accent hover:text-accent-foreground"
              >
                View All
                <Icon name="ArrowRight" size={12} className="ml-1" />
              </Button>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 gap-2">
              {categories?.map((category) => (
                <button
                  key={category?.id}
                  onClick={() => handleCategoryClick(category)}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-200 text-left group"
                >
                  <div className={`flex-shrink-0 ${category?.color} group-hover:scale-110 transition-transform duration-200`}>
                    <Icon name={category?.icon} size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                      {category?.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {category?.description}
                    </div>
                    {showToolCounts && (
                      <div className="text-xs text-accent font-medium mt-1">
                        {category?.toolCount} tools
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Total: {categories?.reduce((sum, cat) => sum + cat?.toolCount, 0)} tools</span>
                <button
                  onClick={handleViewAllCategories}
                  className="text-accent hover:text-accent-foreground transition-colors duration-200"
                >
                  Browse all categories →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-background/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent"></div>
              <span className="text-sm text-foreground">Loading category...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;