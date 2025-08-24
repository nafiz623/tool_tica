import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import CategoryHero from './components/CategoryHero';
import FilterBar from './components/FilterBar';
import ToolGrid from './components/ToolGrid';
import Sidebar from './components/Sidebar';
import AdSlot from './components/AdSlot';
import LoadingSpinner from './components/LoadingSpinner';


const ToolCategoryBrowse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams?.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [tools, setTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);

  // Mock data for categories
  const categories = [
    { 
      id: 1, 
      name: 'Text Tools', 
      slug: 'text-tools', 
      toolCount: 25, 
      description: 'Text manipulation and formatting',
      icon: 'Type',
      color: 'text-blue-400'
    },
    { 
      id: 2, 
      name: 'Image Tools', 
      slug: 'image-tools', 
      toolCount: 18, 
      description: 'Image editing and conversion',
      icon: 'Image',
      color: 'text-green-400'
    },
    { 
      id: 3, 
      name: 'PDF Tools', 
      slug: 'pdf-tools', 
      toolCount: 15, 
      description: 'PDF processing and manipulation',
      icon: 'FileText',
      color: 'text-red-400'
    },
    { 
      id: 4, 
      name: 'Developer Tools', 
      slug: 'developer-tools', 
      toolCount: 32, 
      description: 'Code and development utilities',
      icon: 'Code',
      color: 'text-purple-400'
    },
    { 
      id: 5, 
      name: 'SEO Tools', 
      slug: 'seo-tools', 
      toolCount: 12, 
      description: 'Search engine optimization',
      icon: 'TrendingUp',
      color: 'text-orange-400'
    },
    { 
      id: 6, 
      name: 'Calculators', 
      slug: 'calculators', 
      toolCount: 20, 
      description: 'Mathematical and financial calculators',
      icon: 'Calculator',
      color: 'text-cyan-400'
    },
    { 
      id: 7, 
      name: 'Converters', 
      slug: 'converters', 
      toolCount: 16, 
      description: 'Unit and format converters',
      icon: 'RefreshCw',
      color: 'text-yellow-400'
    },
    { 
      id: 8, 
      name: 'Generators', 
      slug: 'generators', 
      toolCount: 14, 
      description: 'Content and data generators',
      icon: 'Zap',
      color: 'text-pink-400'
    }
  ];

  // Mock tools data
  const mockTools = [
    {
      id: 1,
      name: 'Text Case Converter',
      description: 'Convert text between different cases: uppercase, lowercase, title case, and more.',
      category: 'Text Tools',
      categorySlug: 'text-tools',
      subcategory: 'formatters',
      slug: 'text-case-converter',
      icon: 'Type',
      usageCount: 15420,
      rating: 4.8,
      tags: ['text', 'converter', 'case'],
      isPremium: false,
      isNew: false,
      lastUpdated: '2024-08-20'
    },
    {
      id: 2,
      name: 'Image Resizer',
      description: 'Resize images to specific dimensions while maintaining quality and aspect ratio.',
      category: 'Image Tools',
      categorySlug: 'image-tools',
      subcategory: 'editors',
      slug: 'image-resizer',
      icon: 'Image',
      usageCount: 12350,
      rating: 4.7,
      tags: ['image', 'resize', 'dimensions'],
      isPremium: false,
      isNew: true,
      lastUpdated: '2024-08-22'
    },
    {
      id: 3,
      name: 'PDF Merger',
      description: 'Combine multiple PDF files into a single document with customizable order.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      subcategory: 'merge-split',
      slug: 'pdf-merger',
      icon: 'FileText',
      usageCount: 9870,
      rating: 4.9,
      tags: ['pdf', 'merge', 'combine'],
      isPremium: false,
      isNew: false,
      lastUpdated: '2024-08-18'
    },
    {
      id: 4,
      name: 'JSON Formatter',
      description: 'Format, validate, and beautify JSON data with syntax highlighting.',
      category: 'Developer Tools',
      categorySlug: 'developer-tools',
      subcategory: 'formatters',
      slug: 'json-formatter',
      icon: 'Code',
      usageCount: 18750,
      rating: 4.6,
      tags: ['json', 'format', 'validate'],
      isPremium: false,
      isNew: false,
      lastUpdated: '2024-08-19'
    },
    {
      id: 5,
      name: 'Keyword Density Checker',
      description: 'Analyze keyword density and frequency in your content for SEO optimization.',
      category: 'SEO Tools',
      categorySlug: 'seo-tools',
      subcategory: 'analyzers',
      slug: 'keyword-density-checker',
      icon: 'TrendingUp',
      usageCount: 7650,
      rating: 4.5,
      tags: ['seo', 'keywords', 'density'],
      isPremium: true,
      isNew: false,
      lastUpdated: '2024-08-21'
    },
    {
      id: 6,
      name: 'BMI Calculator',
      description: 'Calculate your Body Mass Index and get health recommendations.',
      category: 'Calculators',
      categorySlug: 'calculators',
      subcategory: 'health',
      slug: 'bmi-calculator',
      icon: 'Calculator',
      usageCount: 11200,
      rating: 4.4,
      tags: ['health', 'bmi', 'calculator'],
      isPremium: false,
      isNew: false,
      lastUpdated: '2024-08-17'
    },
    {
      id: 7,
      name: 'Unit Converter',
      description: 'Convert between different units of measurement including length, weight, and temperature.',
      category: 'Converters',
      categorySlug: 'converters',
      subcategory: 'units',
      slug: 'unit-converter',
      icon: 'RefreshCw',
      usageCount: 13450,
      rating: 4.7,
      tags: ['units', 'convert', 'measurement'],
      isPremium: false,
      isNew: false,
      lastUpdated: '2024-08-16'
    },
    {
      id: 8,
      name: 'Password Generator',
      description: 'Generate secure passwords with customizable length and character sets.',
      category: 'Generators',
      categorySlug: 'generators',
      subcategory: 'security',
      slug: 'password-generator',
      icon: 'Zap',
      usageCount: 16890,
      rating: 4.8,
      tags: ['password', 'security', 'generator'],
      isPremium: false,
      isNew: true,
      lastUpdated: '2024-08-23'
    }
  ];

  // Mock recent and popular tools
  const recentTools = mockTools?.slice(0, 5);
  const popularTools = [...mockTools]?.sort((a, b) => b?.usageCount - a?.usageCount)?.slice(0, 5);

  // Get subcategories for current category
  const getSubcategories = (categorySlug) => {
    const subcategoryMap = {
      'text-tools': [
        { name: 'Formatters', slug: 'formatters', count: 8 },
        { name: 'Generators', slug: 'generators', count: 6 },
        { name: 'Analyzers', slug: 'analyzers', count: 11 }
      ],
      'image-tools': [
        { name: 'Editors', slug: 'editors', count: 7 },
        { name: 'Converters', slug: 'converters', count: 6 },
        { name: 'Optimizers', slug: 'optimizers', count: 5 }
      ],
      'pdf-tools': [
        { name: 'Merge & Split', slug: 'merge-split', count: 5 },
        { name: 'Converters', slug: 'converters', count: 6 },
        { name: 'Security', slug: 'security', count: 4 }
      ],
      'developer-tools': [
        { name: 'Formatters', slug: 'formatters', count: 12 },
        { name: 'Validators', slug: 'validators', count: 8 },
        { name: 'Generators', slug: 'generators', count: 12 }
      ],
      'seo-tools': [
        { name: 'Analyzers', slug: 'analyzers', count: 7 },
        { name: 'Generators', slug: 'generators', count: 5 }
      ],
      'calculators': [
        { name: 'Financial', slug: 'financial', count: 8 },
        { name: 'Health', slug: 'health', count: 6 },
        { name: 'Math', slug: 'math', count: 6 }
      ],
      'converters': [
        { name: 'Units', slug: 'units', count: 8 },
        { name: 'Currency', slug: 'currency', count: 4 },
        { name: 'Data', slug: 'data', count: 4 }
      ],
      'generators': [
        { name: 'Security', slug: 'security', count: 6 },
        { name: 'Content', slug: 'content', count: 4 },
        { name: 'Data', slug: 'data', count: 4 }
      ]
    };
    return subcategoryMap?.[categorySlug] || [];
  };

  // Filter and sort tools
  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filtered = [...mockTools];

      // Filter by category
      if (selectedCategory !== 'all') {
        filtered = filtered?.filter(tool => tool?.categorySlug === selectedCategory);
      }

      // Filter by subcategory
      if (selectedSubcategory !== 'all') {
        filtered = filtered?.filter(tool => tool?.subcategory === selectedSubcategory);
      }

      // Sort tools
      switch (sortBy) {
        case 'alphabetical':
          filtered?.sort((a, b) => a?.name?.localeCompare(b?.name));
          break;
        case 'recent':
          filtered?.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
          break;
        case 'rating':
          filtered?.sort((a, b) => b?.rating - a?.rating);
          break;
        case 'popularity':
        default:
          filtered?.sort((a, b) => b?.usageCount - a?.usageCount);
          break;
      }

      setFilteredTools(filtered);
      setIsLoading(false);
    }, 800);
  }, [selectedCategory, selectedSubcategory, sortBy]);

  // Handle category change
  const handleCategoryChange = (categorySlug) => {
    setSelectedCategory(categorySlug);
    setSelectedSubcategory('all');
    navigate(`/tool-category-browse${categorySlug !== 'all' ? `?category=${categorySlug}` : ''}`);
  };

  // Get current category data
  const currentCategory = categories?.find(cat => cat?.slug === selectedCategory);
  const subcategories = getSubcategories(selectedCategory);
  const totalTools = selectedCategory === 'all' 
    ? categories?.reduce((sum, cat) => sum + cat?.toolCount, 0)
    : currentCategory?.toolCount || 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <BreadcrumbNavigation />
        </div>

        {/* Category Hero Section */}
        <CategoryHero 
          category={selectedCategory} 
          totalTools={totalTools}
        />

        {/* Filter Bar */}
        <FilterBar
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedSubcategory={selectedSubcategory}
          setSelectedSubcategory={setSelectedSubcategory}
          subcategories={subcategories}
          viewMode={viewMode}
          setViewMode={setViewMode}
          totalResults={filteredTools?.length}
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <Sidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              recentTools={recentTools}
              popularTools={popularTools}
            />

            {/* Main Content Area */}
            <div className="flex-1 space-y-8">
              {/* Ad Slot - Top */}
              <AdSlot 
                type="banner" 
                position="between-tools" 
                size="large"
                className="w-full"
              />

              {/* Tools Grid */}
              {isLoading ? (
                <LoadingSpinner message="Loading tools..." />
              ) : (
                <ToolGrid 
                  tools={filteredTools}
                  viewMode={viewMode}
                  isLoading={isLoading}
                />
              )}

              {/* Ad Slot - Between Tools */}
              {filteredTools?.length > 8 && (
                <AdSlot 
                  type="banner" 
                  position="between-tools" 
                  size="medium"
                  className="w-full"
                />
              )}

              {/* Load More Button */}
              {filteredTools?.length > 0 && !isLoading && (
                <div className="text-center py-8">
                  <button className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-elevation-2 transition-all duration-200 hover:scale-105">
                    Load More Tools
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Ad */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <AdSlot 
            type="banner" 
            position="footer" 
            size="large"
            className="w-full"
          />
        </div>
      </main>
    </div>
  );
};

export default ToolCategoryBrowse;