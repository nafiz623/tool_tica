import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const CategorySelector = ({ categories, selectedCategory, onCategoryChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const CategoryChip = ({ category, isActive, onClick }) => (
    <button
      onClick={() => onClick(category?.id)}
      className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
        isActive
          ? 'bg-primary text-primary-foreground shadow-md scale-105'
          : 'glass-card text-foreground hover:bg-surface/70 hover:shadow-elevation-1'
      }`}
    >
      <Icon name={category?.icon} size={18} className={isActive ? 'text-primary-foreground' : category?.color} />
      <span className="text-sm">{category?.name}</span>
      <span className={`text-xs px-2 py-1 rounded-full ${
        isActive 
          ? 'bg-primary-foreground/20 text-primary-foreground' 
          : 'bg-surface/50 text-muted-foreground'
      }`}>
        {category?.toolCount}
      </span>
    </button>
  );

  // Show first 4 categories on mobile, all on desktop
  const visibleCategories = isExpanded ? categories : categories?.slice(0, 4);
  const hasHiddenCategories = categories?.length > 4;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-white/5">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-foreground mb-2">Browse by Category</h2>
        <p className="text-sm text-muted-foreground">
          Select a category to filter tools or browse all available tools
        </p>
      </div>

      {/* Desktop Category Grid */}
      <div className="hidden lg:grid lg:grid-cols-4 xl:grid-cols-8 gap-4">
        {categories?.map((category) => (
          <CategoryChip
            key={category?.id}
            category={category}
            isActive={selectedCategory === category?.id}
            onClick={onCategoryChange}
          />
        ))}
      </div>

      {/* Mobile/Tablet Horizontal Scroll */}
      <div className="lg:hidden">
        <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide">
          {visibleCategories?.map((category) => (
            <CategoryChip
              key={category?.id}
              category={category}
              isActive={selectedCategory === category?.id}
              onClick={onCategoryChange}
            />
          ))}
        </div>

        {/* Show More/Less Button for Mobile */}
        {hasHiddenCategories && (
          <div className="text-center mt-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center space-x-2 text-sm text-primary font-medium hover:text-primary/80 transition-colors duration-200"
            >
              <span>{isExpanded ? 'Show Less' : 'Show More Categories'}</span>
              <Icon 
                name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="transition-transform duration-200"
              />
            </button>
          </div>
        )}
      </div>

      {/* Category Stats */}
      <div className="mt-6 p-4 glass-card rounded-xl">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground">
              Showing: <span className="text-foreground font-medium">
                {selectedCategory === 'all' ?'All Categories' 
                  : categories?.find(c => c?.id === selectedCategory)?.name
                }
              </span>
            </span>
            <span className="w-px h-4 bg-border"></span>
            <span className="text-muted-foreground">
              Tools: <span className="text-foreground font-medium">
                {categories?.find(c => c?.id === selectedCategory)?.toolCount || 0}
              </span>
            </span>
          </div>
          
          {selectedCategory !== 'all' && (
            <button
              onClick={() => onCategoryChange('all')}
              className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
            >
              View All Categories
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategorySelector;