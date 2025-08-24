import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterBar = ({ 
  sortBy, 
  setSortBy, 
  selectedSubcategory, 
  setSelectedSubcategory,
  subcategories,
  viewMode,
  setViewMode,
  totalResults
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const sortOptions = [
    { value: 'popularity', label: 'Most Popular', icon: 'TrendingUp' },
    { value: 'alphabetical', label: 'A-Z', icon: 'ArrowUpAZ' },
    { value: 'recent', label: 'Recently Added', icon: 'Clock' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' }
  ];

  const viewModes = [
    { value: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { value: 'list', icon: 'List', label: 'List View' }
  ];

  return (
    <div className="bg-background/95 backdrop-blur-sm border-b border-white/10 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full justify-between"
          >
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={16} />
              <span>Filters & Sort</span>
            </div>
            <Icon 
              name={isFilterOpen ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
          </Button>
        </div>

        {/* Filter Content */}
        <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Left Side - Results Count & Subcategories */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
              {/* Results Count */}
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{totalResults}</span> tools found
              </div>

              {/* Subcategories */}
              {subcategories && subcategories?.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground hidden sm:block">Filter:</span>
                  <div className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0">
                    <button
                      onClick={() => setSelectedSubcategory('all')}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                        selectedSubcategory === 'all' ?'bg-primary text-primary-foreground' :'bg-surface/50 text-muted-foreground hover:text-foreground hover:bg-surface'
                      }`}
                    >
                      All
                    </button>
                    {subcategories?.map((subcategory) => (
                      <button
                        key={subcategory?.slug}
                        onClick={() => setSelectedSubcategory(subcategory?.slug)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                          selectedSubcategory === subcategory?.slug
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-surface/50 text-muted-foreground hover:text-foreground hover:bg-surface'
                        }`}
                      >
                        {subcategory?.name}
                        <span className="ml-1 text-xs opacity-70">
                          ({subcategory?.count})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Sort & View Options */}
            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e?.target?.value)}
                  className="appearance-none bg-surface/50 border border-white/10 rounded-lg px-3 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                >
                  {sortOptions?.map((option) => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </select>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center bg-surface/50 rounded-lg p-1">
                {viewModes?.map((mode) => (
                  <button
                    key={mode?.value}
                    onClick={() => setViewMode(mode?.value)}
                    className={`p-2 rounded transition-all duration-200 ${
                      viewMode === mode?.value
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    }`}
                    title={mode?.label}
                  >
                    <Icon name={mode?.icon} size={16} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;