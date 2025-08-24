import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchFilters = ({ 
  filters, 
  onFiltersChange, 
  isOpen, 
  onToggle,
  className = "" 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = [
    { id: 'text-tools', name: 'Text Tools', count: 25 },
    { id: 'image-tools', name: 'Image Tools', count: 18 },
    { id: 'pdf-tools', name: 'PDF Tools', count: 15 },
    { id: 'developer-tools', name: 'Developer Tools', count: 32 },
    { id: 'seo-tools', name: 'SEO Tools', count: 12 },
    { id: 'calculators', name: 'Calculators', count: 20 },
    { id: 'converters', name: 'Converters', count: 16 },
    { id: 'generators', name: 'Generators', count: 14 }
  ];

  const toolTypes = [
    { id: 'converter', name: 'Converters', count: 45 },
    { id: 'generator', name: 'Generators', count: 32 },
    { id: 'analyzer', name: 'Analyzers', count: 28 },
    { id: 'editor', name: 'Editors', count: 24 },
    { id: 'calculator', name: 'Calculators', count: 20 }
  ];

  const popularityOptions = [
    { id: 'most-used', name: 'Most Used' },
    { id: 'highest-rated', name: 'Highest Rated' },
    { id: 'recently-added', name: 'Recently Added' },
    { id: 'trending', name: 'Trending' }
  ];

  const handleFilterChange = (filterType, value, checked) => {
    const newFilters = { ...localFilters };
    
    if (filterType === 'categories') {
      if (checked) {
        newFilters.categories = [...(newFilters?.categories || []), value];
      } else {
        newFilters.categories = (newFilters?.categories || [])?.filter(cat => cat !== value);
      }
    } else if (filterType === 'toolTypes') {
      if (checked) {
        newFilters.toolTypes = [...(newFilters?.toolTypes || []), value];
      } else {
        newFilters.toolTypes = (newFilters?.toolTypes || [])?.filter(type => type !== value);
      }
    } else if (filterType === 'popularity') {
      newFilters.popularity = checked ? value : null;
    }

    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      categories: [],
      toolTypes: [],
      popularity: null
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    const categoryCount = localFilters?.categories?.length || 0;
    const toolTypeCount = localFilters?.toolTypes?.length || 0;
    const popularityCount = localFilters?.popularity ? 1 : 0;
    return categoryCount + toolTypeCount + popularityCount;
  };

  const FilterSection = ({ title, children, defaultOpen = true }) => {
    const [sectionOpen, setSectionOpen] = useState(defaultOpen);

    return (
      <div className="border-b border-white/10 last:border-b-0">
        <button
          onClick={() => setSectionOpen(!sectionOpen)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors duration-200"
        >
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <Icon 
            name={sectionOpen ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="text-muted-foreground"
          />
        </button>
        {sectionOpen && (
          <div className="px-4 pb-4">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          className="w-full justify-between"
        >
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} />
            <span>Filters</span>
            {getActiveFilterCount() > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} />
        </Button>
      </div>
      {/* Filter Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block ${className}`}>
        <div className="glass-card rounded-xl overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Filters</h2>
              {getActiveFilterCount() > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-accent hover:text-accent-foreground"
                >
                  Clear All
                </Button>
              )}
            </div>
            {getActiveFilterCount() > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                {getActiveFilterCount()} filter{getActiveFilterCount() !== 1 ? 's' : ''} applied
              </p>
            )}
          </div>

          {/* Categories Filter */}
          <FilterSection title="Categories">
            <div className="space-y-3">
              {categories?.map((category) => (
                <div key={category?.id} className="flex items-center justify-between">
                  <Checkbox
                    label={category?.name}
                    checked={localFilters?.categories?.includes(category?.id) || false}
                    onChange={(e) => handleFilterChange('categories', category?.id, e?.target?.checked)}
                    className="flex-1"
                  />
                  <span className="text-xs text-muted-foreground ml-2">
                    {category?.count}
                  </span>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Tool Types Filter */}
          <FilterSection title="Tool Types">
            <div className="space-y-3">
              {toolTypes?.map((type) => (
                <div key={type?.id} className="flex items-center justify-between">
                  <Checkbox
                    label={type?.name}
                    checked={localFilters?.toolTypes?.includes(type?.id) || false}
                    onChange={(e) => handleFilterChange('toolTypes', type?.id, e?.target?.checked)}
                    className="flex-1"
                  />
                  <span className="text-xs text-muted-foreground ml-2">
                    {type?.count}
                  </span>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Popularity Filter */}
          <FilterSection title="Sort By">
            <div className="space-y-3">
              {popularityOptions?.map((option) => (
                <Checkbox
                  key={option?.id}
                  label={option?.name}
                  checked={localFilters?.popularity === option?.id}
                  onChange={(e) => handleFilterChange('popularity', option?.id, e?.target?.checked)}
                />
              ))}
            </div>
          </FilterSection>
        </div>
      </div>
    </>
  );
};

export default SearchFilters;