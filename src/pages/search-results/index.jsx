import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import SearchBar from '../../components/ui/SearchBar';
import SearchFilters from './components/SearchFilters';
import SearchResultCard from './components/SearchResultCard';
import SearchSuggestions from './components/SearchSuggestions';
import RecentSearches from './components/RecentSearches';
import SearchResultsHeader from './components/SearchResultsHeader';
import AdSlot from './components/AdSlot';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams?.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevance');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    toolTypes: [],
    popularity: null
  });

  const resultsPerPage = 12;

  // Mock tools data
  const allTools = [
    {
      id: 1,
      name: 'Text Case Converter',
      description: 'Convert text between different cases: uppercase, lowercase, title case, and more. Perfect for formatting content and standardizing text.',
      category: 'Text Tools',
      categorySlug: 'text-tools',
      slug: 'text-case-converter',
      icon: 'Type',
      usageCount: 15420,
      rating: 4.8,
      tags: ['text', 'converter', 'case', 'format'],
      isPremium: false,
      isNew: false,
      lastUpdated: '2024-08-20',
      toolType: 'converter'
    },
    {
      id: 2,
      name: 'Image Resizer',
      description: 'Resize images to specific dimensions while maintaining quality. Supports multiple formats including JPG, PNG, and WebP.',
      category: 'Image Tools',
      categorySlug: 'image-tools',
      slug: 'image-resizer',
      icon: 'Image',
      usageCount: 23150,
      rating: 4.9,
      tags: ['image', 'resize', 'dimensions', 'quality'],
      isPremium: false,
      isNew: true,
      lastUpdated: '2024-08-22',
      toolType: 'editor'
    },
    {
      id: 3,
      name: 'PDF Merger',
      description: 'Combine multiple PDF files into a single document. Maintain formatting and preserve document structure.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'pdf-merger',
      icon: 'FileText',
      usageCount: 18750,
      rating: 4.7,
      tags: ['pdf', 'merge', 'combine', 'document'],
      isPremium: true,
      isNew: false,
      lastUpdated: '2024-08-18',
      toolType: 'converter'
    },
    {
      id: 4,
      name: 'JSON Formatter',
      description: 'Format and validate JSON data with syntax highlighting. Perfect for developers working with APIs and data structures.',
      category: 'Developer Tools',
      categorySlug: 'developer-tools',
      slug: 'json-formatter',
      icon: 'Code',
      usageCount: 31200,
      rating: 4.9,
      tags: ['json', 'format', 'validate', 'developer'],
      isPremium: false,
      isNew: false,
      lastUpdated: '2024-08-21',
      toolType: 'analyzer'
    },
    {
      id: 5,
      name: 'Color Picker',
      description: 'Extract colors from images or generate color palettes. Get hex, RGB, and HSL values instantly.',
      category: 'Design Tools',
      categorySlug: 'design-tools',
      slug: 'color-picker',
      icon: 'Palette',
      usageCount: 12800,
      rating: 4.6,
      tags: ['color', 'picker', 'palette', 'design'],
      isPremium: false,
      isNew: true,
      lastUpdated: '2024-08-23',
      toolType: 'generator'
    },
    {
      id: 6,
      name: 'QR Code Generator',
      description: 'Generate QR codes for URLs, text, contact information, and more. Customize size and error correction level.',
      category: 'Generators',
      categorySlug: 'generators',
      slug: 'qr-generator',
      icon: 'QrCode',
      usageCount: 9650,
      rating: 4.5,
      tags: ['qr', 'code', 'generator', 'url'],
      isPremium: false,
      isNew: false,
      lastUpdated: '2024-08-19',
      toolType: 'generator'
    },
    {
      id: 7,
      name: 'Password Generator',
      description: 'Create secure passwords with customizable length and character sets. Ensure your accounts stay protected.',
      category: 'Security Tools',
      categorySlug: 'security-tools',
      slug: 'password-generator',
      icon: 'Shield',
      usageCount: 28900,
      rating: 4.8,
      tags: ['password', 'security', 'generator', 'random'],
      isPremium: false,
      isNew: false,
      lastUpdated: '2024-08-17',
      toolType: 'generator'
    },
    {
      id: 8,
      name: 'Base64 Encoder',
      description: 'Encode and decode Base64 strings. Essential tool for developers working with data encoding and APIs.',
      category: 'Developer Tools',
      categorySlug: 'developer-tools',
      slug: 'base64-encoder',
      icon: 'Code',
      usageCount: 16400,
      rating: 4.7,
      tags: ['base64', 'encode', 'decode', 'developer'],
      isPremium: false,
      isNew: false,
      lastUpdated: '2024-08-16',
      toolType: 'converter'
    }
  ];

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    if (searchQuery) {
      const timeoutId = setTimeout(() => {
        performSearch(searchQuery);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, filters, sortBy]);

  const performSearch = async (query) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredResults = allTools?.filter(tool => {
      const matchesQuery = !query || 
        tool?.name?.toLowerCase()?.includes(query?.toLowerCase()) ||
        tool?.description?.toLowerCase()?.includes(query?.toLowerCase()) ||
        tool?.category?.toLowerCase()?.includes(query?.toLowerCase()) ||
        tool?.tags?.some(tag => tag?.toLowerCase()?.includes(query?.toLowerCase()));
      
      const matchesCategory = !filters?.categories?.length || 
        filters?.categories?.includes(tool?.categorySlug);
      
      const matchesToolType = !filters?.toolTypes?.length || 
        filters?.toolTypes?.includes(tool?.toolType);
      
      return matchesQuery && matchesCategory && matchesToolType;
    });

    // Apply sorting
    switch (sortBy) {
      case 'popularity':
        filteredResults?.sort((a, b) => b?.usageCount - a?.usageCount);
        break;
      case 'rating':
        filteredResults?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'recent':
        filteredResults?.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
        break;
      case 'alphabetical':
        filteredResults?.sort((a, b) => a?.name?.localeCompare(b?.name));
        break;
      default: // relevance
        // Keep original order for relevance
        break;
    }

    setTotalResults(filteredResults?.length);
    
    // Paginate results
    const startIndex = (currentPage - 1) * resultsPerPage;
    const paginatedResults = filteredResults?.slice(startIndex, startIndex + resultsPerPage);
    
    setResults(paginatedResults);
    setIsLoading(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    navigate(`/search-results?q=${encodeURIComponent(query)}`);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSearch(suggestion);
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const hasMoreResults = currentPage * resultsPerPage < totalResults;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 lg:pt-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb Navigation */}
          <BreadcrumbNavigation className="mb-6" />

          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar
              placeholder="Search for tools..."
              onSearch={handleSearch}
              size="lg"
              className="max-w-2xl mx-auto"
            />
          </div>

          {/* Recent Searches */}
          {searchQuery && (
            <RecentSearches
              onSearchClick={handleSuggestionClick}
              currentQuery={searchQuery}
              className="mb-6"
            />
          )}

          {/* Ad Slot - Header Banner */}
          <AdSlot 
            slot="search-header" 
            size="leaderboard" 
            className="mb-8 flex justify-center"
          />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-80 flex-shrink-0">
              <SearchFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                isOpen={isFiltersOpen}
                onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
              />
              
              {/* Sidebar Ad */}
              <div className="hidden lg:block mt-6">
                <AdSlot 
                  slot="search-sidebar" 
                  size="rectangle" 
                  className="sticky top-24"
                />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Results Header */}
              <SearchResultsHeader
                searchQuery={searchQuery}
                resultsCount={results?.length}
                totalResults={totalResults}
                isLoading={isLoading}
                sortBy={sortBy}
                onSortChange={handleSortChange}
                className="mb-6"
              />

              {/* Results Grid or Suggestions */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)]?.map((_, index) => (
                    <div key={index} className="glass-card p-6 rounded-xl animate-pulse">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-6 h-6 bg-surface rounded"></div>
                        <div className="h-4 bg-surface rounded flex-1"></div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="h-3 bg-surface rounded"></div>
                        <div className="h-3 bg-surface rounded w-3/4"></div>
                      </div>
                      <div className="h-8 bg-surface rounded"></div>
                    </div>
                  ))}
                </div>
              ) : results?.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {results?.map((tool, index) => (
                      <React.Fragment key={tool?.id}>
                        <SearchResultCard
                          tool={tool}
                          searchQuery={searchQuery}
                          onToolClick={() => {}}
                        />
                        
                        {/* Inline Ad every 4 results */}
                        {(index + 1) % 4 === 0 && index < results?.length - 1 && (
                          <div className="md:col-span-2 xl:col-span-3">
                            <AdSlot 
                              slot="search-inline" 
                              size="banner" 
                              className="w-full"
                            />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Load More Button */}
                  {hasMoreResults && (
                    <div className="text-center">
                      <Button
                        variant="outline"
                        onClick={handleLoadMore}
                        className="px-8"
                      >
                        <Icon name="ChevronDown" size={16} className="mr-2" />
                        Load More Results
                      </Button>
                    </div>
                  )}
                </>
              ) : searchQuery ? (
                <SearchSuggestions
                  searchQuery={searchQuery}
                  onSuggestionClick={handleSuggestionClick}
                />
              ) : (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    Start Your Search
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Enter a search term to find the perfect tool for your needs
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/tool-category-browse')}
                  >
                    <Icon name="Grid3X3" size={16} className="mr-2" />
                    Browse All Categories
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Footer Ad */}
          <div className="mt-12">
            <AdSlot 
              slot="search-footer" 
              size="leaderboard" 
              className="flex justify-center"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchResults;