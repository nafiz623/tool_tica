import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchResultCard = ({ 
  tool, 
  searchQuery = "", 
  className = "",
  onToolClick 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const highlightSearchTerm = (text, query) => {
    if (!query || !text) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text?.split(regex);
    
    return parts?.map((part, index) => 
      regex?.test(part) ? (
        <mark key={index} className="bg-primary/20 text-primary px-1 rounded">
          {part}
        </mark>
      ) : part
    );
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

  const getRelevanceScore = () => {
    // Mock relevance calculation based on search query match
    const nameMatch = tool?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ? 40 : 0;
    const descMatch = tool?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ? 30 : 0;
    const categoryMatch = tool?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ? 20 : 0;
    const tagMatch = tool?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase())) ? 10 : 0;
    
    return Math.min(100, nameMatch + descMatch + categoryMatch + tagMatch + Math.floor(Math.random() * 20));
  };

  const relevanceScore = getRelevanceScore();

  const handleToolClick = () => {
    if (onToolClick) {
      onToolClick(tool);
    }
  };

  return (
    <div 
      className={`glass-card p-6 hover:shadow-elevation-2 transition-all duration-200 group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header with relevance indicator */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className={`flex-shrink-0 ${getCategoryColor(tool?.category)} group-hover:scale-110 transition-transform duration-200`}>
            <Icon name={tool?.icon} size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200 truncate">
              {highlightSearchTerm(tool?.name, searchQuery)}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`text-xs font-medium ${getCategoryColor(tool?.category)}`}>
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
        
        {/* Relevance Score */}
        <div className="flex-shrink-0 ml-4">
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="Target" size={12} />
            <span>{relevanceScore}% match</span>
          </div>
        </div>
      </div>
      {/* Description with highlighted search terms */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {highlightSearchTerm(tool?.description, searchQuery)}
      </p>
      {/* Tags with highlighting */}
      {tool?.tags && tool?.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {tool?.tags?.slice(0, 4)?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-surface/50 text-muted-foreground text-xs rounded-md"
            >
              #{highlightSearchTerm(tag, searchQuery)}
            </span>
          ))}
          {tool?.tags?.length > 4 && (
            <span className="px-2 py-1 bg-surface/50 text-muted-foreground text-xs rounded-md">
              +{tool?.tags?.length - 4}
            </span>
          )}
        </div>
      )}
      {/* Stats and metadata */}
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
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>Updated {new Date(tool.lastUpdated)?.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      {/* Action buttons */}
      <div className="flex items-center space-x-2">
        <Link
          to={`/individual-tool-page?tool=${tool?.slug}&category=${tool?.categorySlug}`}
          onClick={handleToolClick}
          className="flex-1"
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
        
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Icon name="Bookmark" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default SearchResultCard;