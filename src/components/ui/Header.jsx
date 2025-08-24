import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';


const Header = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const location = useLocation();
  const searchRef = useRef(null);
  const categoriesRef = useRef(null);

  const categories = [
    { id: 1, name: 'Text Tools', slug: 'text-tools', toolCount: 25, description: 'Text manipulation and formatting' },
    { id: 2, name: 'Image Tools', slug: 'image-tools', toolCount: 18, description: 'Image editing and conversion' },
    { id: 3, name: 'PDF Tools', slug: 'pdf-tools', toolCount: 15, description: 'PDF processing and manipulation' },
    { id: 4, name: 'Developer Tools', slug: 'developer-tools', toolCount: 32, description: 'Code and development utilities' },
    { id: 5, name: 'SEO Tools', slug: 'seo-tools', toolCount: 12, description: 'Search engine optimization' },
    { id: 6, name: 'Calculators', slug: 'calculators', toolCount: 20, description: 'Mathematical and financial calculators' }
  ];

  const navigationItems = [
    { name: 'Home', path: '/homepage', icon: 'Home' },
    { name: 'Browse Tools', path: '/tool-category-browse', icon: 'Grid3X3' },
    { name: 'Search', path: '/search-results', icon: 'Search' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setIsSearchFocused(false);
      }
      if (categoriesRef?.current && !categoriesRef?.current?.contains(event?.target)) {
        setIsCategoriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      window.location.href = `/search-results?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleCategoryClick = (category) => {
    setIsCategoriesOpen(false);
    setIsMobileMenuOpen(false);
    window.location.href = `/tool-category-browse?category=${category?.slug}`;
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link 
            to="/homepage" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 gradient-primary rounded-lg flex items-center justify-center">
              <Icon name="Wrench" size={20} color="white" className="lg:w-6 lg:h-6" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                Tool Tica
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems?.slice(0, 2)?.map((item) => (
              <Link
                key={item?.name}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/5 ${
                  isActivePath(item?.path) 
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.name}</span>
              </Link>
            ))}

            {/* Categories Dropdown */}
            <div className="relative" ref={categoriesRef}>
              <Button
                variant="ghost"
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center space-x-2 text-sm font-medium"
              >
                <Icon name="Grid3X3" size={16} />
                <span>Categories</span>
                <Icon 
                  name={isCategoriesOpen ? "ChevronUp" : "ChevronDown"} 
                  size={14} 
                  className="transition-transform duration-200"
                />
              </Button>

              {isCategoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 glass-card rounded-xl shadow-elevation-3 animate-slide-up">
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Tool Categories</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {categories?.map((category) => (
                        <button
                          key={category?.id}
                          onClick={() => handleCategoryClick(category)}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors duration-200 text-left"
                        >
                          <div>
                            <div className="text-sm font-medium text-foreground">{category?.name}</div>
                            <div className="text-xs text-muted-foreground">{category?.description}</div>
                          </div>
                          <div className="text-xs text-accent font-medium">{category?.toolCount}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4 lg:mx-8" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={18} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface/50 border border-white/10 rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <Icon name="X" size={16} />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-card border-t border-white/10 animate-slide-up">
          <div className="px-4 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.name}
                to={item?.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActivePath(item?.path) 
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.name}</span>
              </Link>
            ))}

            {/* Mobile Categories */}
            <div className="pt-4 border-t border-white/10">
              <h3 className="px-4 text-sm font-semibold text-foreground mb-2">Categories</h3>
              <div className="space-y-1">
                {categories?.map((category) => (
                  <button
                    key={category?.id}
                    onClick={() => handleCategoryClick(category)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/5 transition-colors duration-200 text-left"
                  >
                    <div>
                      <div className="text-sm font-medium text-foreground">{category?.name}</div>
                      <div className="text-xs text-muted-foreground">{category?.description}</div>
                    </div>
                    <div className="text-xs text-accent font-medium">{category?.toolCount}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Footer Links */}
            <div className="pt-4 border-t border-white/10">
              <Link
                to="/privacy-policy-legal"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200"
              >
                <Icon name="Shield" size={18} />
                <span>Privacy & Legal</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;