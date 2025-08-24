import React from 'react';
import Icon from '../../../components/AppIcon';


const SearchResultsHeader = ({ 
  searchQuery, 
  resultsCount, 
  totalResults,
  isLoading = false,
  sortBy = 'relevance',
  onSortChange,
  className = "" 
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant', icon: 'Target' },
    { value: 'popularity', label: 'Most Popular', icon: 'TrendingUp' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'recent', label: 'Recently Added', icon: 'Clock' },
    { value: 'alphabetical', label: 'A to Z', icon: 'ArrowUpDown' }
  ];

  const formatResultsCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000)?.toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000)?.toFixed(1)}K`;
    }
    return count?.toString();
  };

  const getSearchSummary = () => {
    if (isLoading) {
      return "Searching...";
    }
    
    if (resultsCount === 0) {
      return `No results found for "${searchQuery}"`;
    }
    
    if (resultsCount === totalResults) {
      return `Found ${formatResultsCount(resultsCount)} result${resultsCount !== 1 ? 's' : ''} for "${searchQuery}"`;
    }
    
    return `Showing ${formatResultsCount(resultsCount)} of ${formatResultsCount(totalResults)} results for "${searchQuery}"`;
  };

  const getCurrentSortOption = () => {
    return sortOptions?.find(option => option?.value === sortBy) || sortOptions?.[0];
  };

  return (
    <div className={`${className}`}>
      {/* Search Summary */}
      <div className="mb-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
          Search Results
        </h1>
        <div className="flex items-center space-x-2 text-muted-foreground">
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
              <span className="text-sm">{getSearchSummary()}</span>
            </>
          ) : (
            <>
              <Icon name="Search" size={16} />
              <span className="text-sm">{getSearchSummary()}</span>
            </>
          )}
        </div>
      </div>
      {/* Controls Bar */}
      {!isLoading && resultsCount > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 glass-card rounded-xl">
          {/* Results Info */}
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="FileText" size={14} />
              <span>{formatResultsCount(resultsCount)} tools</span>
            </div>
            {totalResults > resultsCount && (
              <div className="flex items-center space-x-1">
                <Icon name="Filter" size={14} />
                <span>Filtered from {formatResultsCount(totalResults)}</span>
              </div>
            )}
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground hidden sm:block">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortChange && onSortChange(e?.target?.value)}
                className="appearance-none bg-surface border border-white/10 rounded-lg px-3 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
              >
                {sortOptions?.map((option) => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
              <Icon 
                name="ChevronDown" 
                size={14} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
            </div>
          </div>
        </div>
      )}
      {/* Search Tips for No Results */}
      {!isLoading && resultsCount === 0 && (
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={20} className="text-warning mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Search Tips</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Try using different or more general keywords</li>
                <li>• Check your spelling</li>
                <li>• Use fewer words in your search</li>
                <li>• Browse our categories to discover tools</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsHeader;