import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const FilterBar = ({ filterOptions, selectedFilters, onFilterChange }) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const getActiveFiltersCount = () => {
    return Object.values(selectedFilters)?.filter(value => value !== 'all')?.length;
  };

  const FilterChip = ({ label, value, isActive, onClick }) => (
    <button
      onClick={() => onClick(value)}
      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
        isActive
          ? 'bg-primary text-primary-foreground shadow-md'
          : 'bg-surface/50 text-muted-foreground hover:bg-surface hover:text-foreground'
      }`}
    >
      {label}
    </button>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-white/5">
      <div className="flex items-center justify-between mb-4 lg:mb-0">
        <h3 className="text-lg font-semibold text-foreground">Filter Tools</h3>
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="relative"
          >
            <Icon name="Filter" size={16} className="mr-2" />
            Filters
            {getActiveFiltersCount() > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs text-primary-foreground font-bold">
                  {getActiveFiltersCount()}
                </span>
              </div>
            )}
          </Button>
        </div>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Function Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Tool Function
          </label>
          <div className="flex flex-wrap gap-2">
            {filterOptions?.function?.map((option) => (
              <FilterChip
                key={option?.value}
                label={option?.label}
                value={option?.value}
                isActive={selectedFilters?.function === option?.value}
                onClick={(value) => onFilterChange('function', value)}
              />
            ))}
          </div>
        </div>

        {/* Format Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            File Format
          </label>
          <div className="flex flex-wrap gap-2">
            {filterOptions?.format?.map((option) => (
              <FilterChip
                key={option?.value}
                label={option?.label}
                value={option?.value}
                isActive={selectedFilters?.format === option?.value}
                onClick={(value) => onFilterChange('format', value)}
              />
            ))}
          </div>
        </div>

        {/* Popularity Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Popularity
          </label>
          <div className="flex flex-wrap gap-2">
            {filterOptions?.popularity?.map((option) => (
              <FilterChip
                key={option?.value}
                label={option?.label}
                value={option?.value}
                isActive={selectedFilters?.popularity === option?.value}
                onClick={(value) => onFilterChange('popularity', value)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      {isMobileFiltersOpen && (
        <div className="lg:hidden mt-4 glass-card p-4 rounded-xl space-y-6 animate-slide-up">
          {/* Function Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Tool Function
            </label>
            <div className="grid grid-cols-2 gap-2">
              {filterOptions?.function?.map((option) => (
                <FilterChip
                  key={option?.value}
                  label={option?.label}
                  value={option?.value}
                  isActive={selectedFilters?.function === option?.value}
                  onClick={(value) => onFilterChange('function', value)}
                />
              ))}
            </div>
          </div>

          {/* Format Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              File Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              {filterOptions?.format?.map((option) => (
                <FilterChip
                  key={option?.value}
                  label={option?.label}
                  value={option?.value}
                  isActive={selectedFilters?.format === option?.value}
                  onClick={(value) => onFilterChange('format', value)}
                />
              ))}
            </div>
          </div>

          {/* Popularity Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Popularity
            </label>
            <div className="grid grid-cols-2 gap-2">
              {filterOptions?.popularity?.map((option) => (
                <FilterChip
                  key={option?.value}
                  label={option?.label}
                  value={option?.value}
                  isActive={selectedFilters?.popularity === option?.value}
                  onClick={(value) => onFilterChange('popularity', value)}
                />
              ))}
            </div>
          </div>

          {/* Close Button */}
          <div className="pt-4 border-t border-white/10">
            <Button
              variant="outline"
              fullWidth
              onClick={() => setIsMobileFiltersOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FilterBar;