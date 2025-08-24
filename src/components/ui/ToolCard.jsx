import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ToolCard = ({ 
  tool,
  variant = "default",
  showCategory = true,
  showDescription = true,
  showStats = true,
  className = "",
  onToolClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const defaultTool = {
    id: 1,
    name: 'Text Case Converter',
    description: 'Convert text between different cases: uppercase, lowercase, title case, and more.',
    category: 'Text Tools',
    categorySlug: 'text-tools',
    slug: 'text-case-converter',
    icon: 'Type',
    usageCount: 1250,
    rating: 4.8,
    tags: ['text', 'converter', 'case'],
    isPremium: false,
    isNew: false,
    lastUpdated: '2024-08-20'
  };

  const toolData = { ...defaultTool, ...tool };

  const handleToolClick = () => {
    if (onToolClick) {
      onToolClick(toolData);
    }
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      'Text Tools': 'text-blue-400',
      'Image Tools': 'text-green-400',
      'PDF Tools': 'text-red-400',
      'Developer Tools': 'text-purple-400',
      'SEO Tools': 'text-orange-400',
      'Calculators': 'text-cyan-400',
      'Converters': 'text-yellow-400',
      'Generators': 'text-pink-400'
    };
    return colorMap?.[category] || 'text-accent';
  };

  const formatUsageCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000)?.toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000)?.toFixed(1)}K`;
    }
    return count?.toString();
  };

  const cardVariants = {
    default: "glass-card p-6 hover:shadow-elevation-2 transition-all duration-200 group",
    compact: "glass-card p-4 hover:shadow-elevation-1 transition-all duration-200 group",
    featured: "glass-card p-6 border-2 border-primary/20 hover:border-primary/40 hover:shadow-elevation-3 transition-all duration-200 group"
  };

  return (
    <div 
      className={`${cardVariants?.[variant]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`flex-shrink-0 ${getCategoryColor(toolData?.category)} group-hover:scale-110 transition-transform duration-200`}>
            <Icon name={toolData?.icon} size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200 truncate">
              {toolData?.name}
            </h3>
            {showCategory && (
              <div className="flex items-center space-x-2 mt-1">
                <span className={`text-xs font-medium ${getCategoryColor(toolData?.category)}`}>
                  {toolData?.category}
                </span>
                {toolData?.isNew && (
                  <span className="px-2 py-0.5 bg-success/20 text-success text-xs font-medium rounded-full">
                    New
                  </span>
                )}
                {toolData?.isPremium && (
                  <span className="px-2 py-0.5 bg-warning/20 text-warning text-xs font-medium rounded-full">
                    Premium
                  </span>
                )}
              </div>
            )}
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
      {showDescription && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {toolData?.description}
        </p>
      )}
      {/* Tags */}
      {toolData?.tags && toolData?.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {toolData?.tags?.slice(0, 3)?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-surface/50 text-muted-foreground text-xs rounded-md"
            >
              #{tag}
            </span>
          ))}
          {toolData?.tags?.length > 3 && (
            <span className="px-2 py-1 bg-surface/50 text-muted-foreground text-xs rounded-md">
              +{toolData?.tags?.length - 3}
            </span>
          )}
        </div>
      )}
      {/* Stats */}
      {showStats && (
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={12} />
              <span>{formatUsageCount(toolData?.usageCount)} uses</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} className="text-warning" />
              <span>{toolData?.rating}</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Updated {new Date(toolData.lastUpdated)?.toLocaleDateString()}
          </div>
        </div>
      )}
      {/* Action Button */}
      <Link
        to={`/individual-tool-page?tool=${toolData?.slug}&category=${toolData?.categorySlug}`}
        onClick={handleToolClick}
        className="block"
      >
        <Button
          variant="outline"
          fullWidth
          className={`group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-200 ${
            isHovered ? 'transform scale-105' : ''
          }`}
        >
          <Icon name="Play" size={16} className="mr-2" />
          Use Tool
          <Icon 
            name="ArrowRight" 
            size={14} 
            className={`ml-2 transition-transform duration-200 ${
              isHovered ? 'translate-x-1' : ''
            }`} 
          />
        </Button>
      </Link>
    </div>
  );
};

export default ToolCard;