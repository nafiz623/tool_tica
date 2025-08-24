import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const SearchBar = ({ 
  placeholder = "Search tools...", 
  className = "", 
  onSearch,
  showSuggestions = true,
  size = "default" 
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const mockSuggestions = [
    { id: 1, name: 'Text Case Converter', category: 'Text Tools', type: 'tool' },
    { id: 2, name: 'Image Resizer', category: 'Image Tools', type: 'tool' },
    { id: 3, name: 'PDF Merger', category: 'PDF Tools', type: 'tool' },
    { id: 4, name: 'JSON Formatter', category: 'Developer Tools', type: 'tool' },
    { id: 5, name: 'Keyword Density Checker', category: 'SEO Tools', type: 'tool' },
    { id: 6, name: 'Text Tools', category: 'Categories', type: 'category' },
    { id: 7, name: 'Developer Tools', category: 'Categories', type: 'category' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query?.trim() && showSuggestions && isFocused) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        const filtered = mockSuggestions?.filter(item =>
          item?.name?.toLowerCase()?.includes(query?.toLowerCase())
        )?.slice(0, 6);
        setSuggestions(filtered);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setIsLoading(false);
    }
  }, [query, isFocused, showSuggestions]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (query?.trim()) {
      performSearch(query);
    }
  };

  const performSearch = (searchQuery) => {
    setIsFocused(false);
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion?.type === 'tool') {
      navigate(`/individual-tool-page?tool=${suggestion?.name?.toLowerCase()?.replace(/\s+/g, '-')}`);
    } else if (suggestion?.type === 'category') {
      navigate(`/tool-category-browse?category=${suggestion?.name?.toLowerCase()?.replace(/\s+/g, '-')}`);
    }
    setQuery('');
    setIsFocused(false);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
  };

  const sizeClasses = {
    sm: 'h-9 text-sm',
    default: 'h-10 text-sm',
    lg: 'h-12 text-base'
  };

  const iconSizes = {
    sm: 16,
    default: 18,
    lg: 20
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Icon 
            name="Search" 
            size={iconSizes?.[size]} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e?.target?.value)}
            onFocus={() => setIsFocused(true)}
            className={`w-full pl-10 pr-12 ${sizeClasses?.[size]} bg-surface/50 border border-white/10 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 hover:bg-surface/70`}
          />
          
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors duration-200 rounded"
              >
                <Icon name="X" size={14} />
              </button>
            )}
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-primary/10"
            >
              <Icon name="Search" size={14} />
            </Button>
          </div>
        </div>
      </form>
      {/* Search Suggestions */}
      {showSuggestions && isFocused && (query?.trim() || suggestions?.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl shadow-elevation-3 animate-slide-up z-50">
          <div className="p-2">
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent"></div>
                <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
              </div>
            ) : suggestions?.length > 0 ? (
              <>
                <div className="text-xs font-medium text-muted-foreground px-3 py-2 border-b border-white/10">
                  Search Results
                </div>
                <div className="py-1">
                  {suggestions?.map((suggestion) => (
                    <button
                      key={suggestion?.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full flex items-center space-x-3 px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors duration-200 text-left"
                    >
                      <div className="flex-shrink-0">
                        <Icon 
                          name={suggestion?.type === 'category' ? 'Folder' : 'Tool'} 
                          size={16} 
                          className="text-muted-foreground"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">
                          {suggestion?.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {suggestion?.category}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Icon name="ArrowRight" size={14} className="text-muted-foreground" />
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : query?.trim() && (
              <div className="px-3 py-4 text-center">
                <Icon name="Search" size={24} className="text-muted-foreground mx-auto mb-2" />
                <div className="text-sm text-muted-foreground">
                  No results found for "{query}"
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => performSearch(query)}
                  className="mt-2"
                >
                  Search anyway
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;