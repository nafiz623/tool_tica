import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentSearches = ({ 
  onSearchClick, 
  currentQuery = "",
  className = "" 
}) => {
  const [recentSearches, setRecentSearches] = useState([]);

  // Mock recent searches - in real app, this would come from localStorage
  const mockRecentSearches = [
    { query: 'text converter', timestamp: Date.now() - 300000, resultsCount: 12 },
    { query: 'image resize', timestamp: Date.now() - 600000, resultsCount: 8 },
    { query: 'pdf merge', timestamp: Date.now() - 900000, resultsCount: 5 },
    { query: 'json formatter', timestamp: Date.now() - 1200000, resultsCount: 15 },
    { query: 'color picker', timestamp: Date.now() - 1800000, resultsCount: 7 },
    { query: 'qr generator', timestamp: Date.now() - 2400000, resultsCount: 3 }
  ];

  useEffect(() => {
    // Load recent searches from localStorage or use mock data
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRecentSearches(parsed?.slice(0, 6)); // Limit to 6 recent searches
      } catch (error) {
        setRecentSearches(mockRecentSearches);
      }
    } else {
      setRecentSearches(mockRecentSearches);
    }
  }, []);

  useEffect(() => {
    // Add current query to recent searches if it's not empty and different from the last one
    if (currentQuery && currentQuery?.trim() && 
        (!recentSearches?.length || recentSearches?.[0]?.query !== currentQuery?.trim())) {
      const newSearch = {
        query: currentQuery?.trim(),
        timestamp: Date.now(),
        resultsCount: Math.floor(Math.random() * 20) + 1 // Mock results count
      };
      
      const updatedSearches = [newSearch, ...recentSearches?.slice(0, 5)];
      setRecentSearches(updatedSearches);
      
      // Save to localStorage
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    }
  }, [currentQuery]);

  const handleSearchClick = (query) => {
    if (onSearchClick) {
      onSearchClick(query);
    }
  };

  const removeSearch = (indexToRemove) => {
    const updatedSearches = recentSearches?.filter((_, index) => index !== indexToRemove);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const clearAllSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const formatTimeAgo = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  if (!recentSearches?.length) {
    return null;
  }

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Recent Searches</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllSearches}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Clear All
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {recentSearches?.map((search, index) => (
          <div
            key={index}
            className="group flex items-center space-x-2 bg-surface/30 hover:bg-surface/50 rounded-lg px-3 py-2 transition-all duration-200"
          >
            <button
              onClick={() => handleSearchClick(search?.query)}
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Icon name="Search" size={12} />
              <span>{search?.query}</span>
              <span className="text-xs opacity-60">
                ({search?.resultsCount})
              </span>
            </button>
            
            <div className="flex items-center space-x-1">
              <span className="text-xs text-muted-foreground opacity-60">
                {formatTimeAgo(search?.timestamp)}
              </span>
              <button
                onClick={() => removeSearch(index)}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-white/10 rounded"
              >
                <Icon name="X" size={12} className="text-muted-foreground hover:text-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;