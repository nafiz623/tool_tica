import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import CategoryDropdown from '../../components/ui/CategoryDropdown';

const MultiCategoryToolDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [recentTools, setRecentTools] = useState([]);
  const [filterPopular, setFilterPopular] = useState(false);

  // Comprehensive tool database (all 106+ tools)
  const allTools = {
    // PDF Tools (27 tools)
    'pdf-tools': {
      name: 'PDF Tools',
      icon: 'FileText',
      color: 'bg-red-500',
      tools: [
        { id: 'pdf-to-html', name: 'PDF to HTML', description: 'Convert PDF documents to clean HTML code', icon: 'Code', isPremium: false, isPopular: true },
        { id: 'pdf-to-csv', name: 'PDF to CSV', description: 'Extract tabular data from PDF to CSV format', icon: 'Table', isPremium: false, isPopular: false },
        { id: 'pdf-to-excel', name: 'PDF to Excel', description: 'Convert PDF tables to Excel spreadsheets', icon: 'FileSpreadsheet', isPremium: false, isPopular: true },
        { id: 'pdf-to-jpg', name: 'PDF to JPG', description: 'Convert PDF pages to JPG images', icon: 'Image', isPremium: false, isPopular: true },
        { id: 'pdf-to-png', name: 'PDF to PNG', description: 'Convert PDF pages to PNG images', icon: 'Image', isPremium: false, isPopular: true },
        { id: 'pdf-to-webp', name: 'PDF to WebP', description: 'Convert PDF pages to WebP format', icon: 'Image', isPremium: true, isPopular: false },
        { id: 'pdf-to-word', name: 'PDF to MS Word', description: 'Convert PDF to editable Word documents', icon: 'FileText', isPremium: false, isPopular: true },
        { id: 'pdf-to-json', name: 'PDF to JSON', description: 'Extract PDF data to JSON format', icon: 'Braces', isPremium: true, isPopular: false },
        { id: 'pdf-to-xml', name: 'PDF to XML', description: 'Convert PDF content to XML structure', icon: 'Code2', isPremium: true, isPopular: false },
        { id: 'pdf-to-text', name: 'PDF to Text', description: 'Extract plain text from PDF documents', icon: 'FileText', isPremium: false, isPopular: true },
        { id: 'merge-pdf', name: 'Merge PDF', description: 'Combine multiple PDF files into one', icon: 'Combine', isPremium: false, isPopular: true },
        { id: 'text-to-pdf', name: 'Text to PDF', description: 'Convert text files to PDF format', icon: 'FileText', isPremium: false, isPopular: false },
        { id: 'excel-to-pdf', name: 'Excel to PDF', description: 'Convert Excel files to PDF', icon: 'FileSpreadsheet', isPremium: false, isPopular: true },
        { id: 'html-to-pdf', name: 'HTML to PDF', description: 'Generate PDF from HTML content', icon: 'Code', isPremium: false, isPopular: false },
        { id: 'jpg-to-pdf', name: 'JPG to PDF', description: 'Convert JPG images to PDF', icon: 'Image', isPremium: false, isPopular: false },
        { id: 'png-to-pdf', name: 'PNG to PDF', description: 'Convert PNG images to PDF', icon: 'Image', isPremium: false, isPopular: false },
        { id: 'webp-to-pdf', name: 'WebP to PDF', description: 'Convert WebP images to PDF', icon: 'Image', isPremium: true, isPopular: false },
        { id: 'json-to-pdf', name: 'JSON to PDF', description: 'Generate PDF reports from JSON data', icon: 'Braces', isPremium: true, isPopular: false },
        { id: 'xml-to-pdf', name: 'XML to PDF', description: 'Convert XML documents to PDF', icon: 'Code2', isPremium: true, isPopular: false },
        { id: 'speech-to-pdf', name: 'Speech to PDF', description: 'Convert speech to PDF transcript', icon: 'Mic', isPremium: true, isPopular: false },
        { id: 'split-pdf', name: 'Split PDF', description: 'Split PDF into separate pages or sections', icon: 'Scissors', isPremium: false, isPopular: true },
        { id: 'rotate-pdf', name: 'Rotate PDF', description: 'Rotate PDF pages clockwise or counterclockwise', icon: 'RotateCw', isPremium: false, isPopular: false },
        { id: 'lock-pdf', name: 'Lock/Unlock PDF', description: 'Add or remove password protection from PDF', icon: 'Lock', isPremium: false, isPopular: false },
        { id: 'watermark-pdf', name: 'Add Watermark to PDF', description: 'Add text or image watermarks to PDF', icon: 'Droplets', isPremium: true, isPopular: false },
        { id: 'compress-pdf', name: 'Compress PDF', description: 'Reduce PDF file size without quality loss', icon: 'Archive', isPremium: false, isPopular: true },
        { id: 'remove-pdf-pages', name: 'PDF Page Remover', description: 'Remove specific pages from PDF documents', icon: 'X', isPremium: false, isPopular: false },
        { id: 'extract-images-pdf', name: 'Extract Images from PDF', description: 'Extract all images from PDF documents', icon: 'Image', isPremium: false, isPopular: false }
      ]
    },

    // Image Tools (17 tools)
    'image-tools': {
      name: 'Image Tools',
      icon: 'Image',
      color: 'bg-green-500',
      tools: [
        { id: 'jpg-to-png', name: 'JPG to PNG', description: 'Convert JPG images to PNG format', icon: 'Image', isPremium: false, isPopular: true },
        { id: 'png-to-jpg', name: 'PNG to JPG', description: 'Convert PNG images to JPG format', icon: 'Image', isPremium: false, isPopular: true },
        { id: 'png-to-svg', name: 'PNG to SVG', description: 'Convert PNG images to SVG vector format', icon: 'Shapes', isPremium: true, isPopular: false },
        { id: 'ai-to-svg', name: 'AI/Illustrator to SVG', description: 'Convert Adobe Illustrator files to SVG', icon: 'Palette', isPremium: true, isPopular: false },
        { id: 'image-compressor', name: 'Image Compressor', description: 'Compress images to reduce file size', icon: 'Archive', isPremium: false, isPopular: true },
        { id: 'image-resizer', name: 'Image Resizer', description: 'Resize images to specific dimensions', icon: 'Move', isPremium: false, isPopular: true },
        { id: 'add-text-image', name: 'Add Text on Image', description: 'Add custom text overlays to images', icon: 'Type', isPremium: false, isPopular: true },
        { id: 'remove-watermark', name: 'Image Watermark Remover', description: 'Remove watermarks from images', icon: 'Eraser', isPremium: true, isPopular: true },
        { id: 'add-watermark', name: 'Image Watermark Adder', description: 'Add watermarks to protect your images', icon: 'Droplets', isPremium: false, isPopular: false },
        { id: 'ocr-analyzer', name: 'Count Words on Image (OCR)', description: 'Extract and count text from images using OCR', icon: 'ScanLine', isPremium: true, isPopular: false },
        { id: 'thumbnail-downloader', name: 'Thumbnail Downloader', description: 'Download thumbnails from various platforms', icon: 'Download', isPremium: false, isPopular: false },
        { id: 'thumbnail-previewer', name: 'Thumbnail Previewer', description: 'Preview thumbnails before downloading', icon: 'Eye', isPremium: false, isPopular: false },
        { id: 'webp-converter', name: 'Convert WebP to PNG/JPG', description: 'Convert WebP images to PNG or JPG', icon: 'RefreshCw', isPremium: false, isPopular: false },
        { id: 'heic-converter', name: 'Convert HEIC to JPG', description: 'Convert iPhone HEIC images to JPG', icon: 'Smartphone', isPremium: false, isPopular: true },
        { id: 'blur-background', name: 'Blur Background of Image', description: 'Apply background blur effects to images', icon: 'Focus', isPremium: true, isPopular: true },
        { id: 'crop-image', name: 'Crop Image Online', description: 'Crop images to custom dimensions', icon: 'Crop', isPremium: false, isPopular: true },
        { id: 'image-to-base64', name: 'Convert Image to Base64', description: 'Convert images to Base64 encoded strings', icon: 'Code', isPremium: false, isPopular: false }
      ]
    },

    // Text & Code Tools (14 tools)
    'text-tools': {
      name: 'Text & Code Tools',
      icon: 'Type',
      color: 'bg-blue-500',
      tools: [
        { id: 'json-formatter', name: 'JSON Formatter', description: 'Format and beautify JSON data', icon: 'Braces', isPremium: false, isPopular: true },
        { id: 'lorem-ipsum', name: 'Lorem Ipsum Generator', description: 'Generate placeholder text for designs', icon: 'AlignLeft', isPremium: false, isPopular: false },
        { id: 'text-analyzer', name: 'Modern Text Analyzer', description: 'Analyze text for readability and statistics', icon: 'BarChart3', isPremium: true, isPopular: true },
        { id: 'feature-text', name: 'Feature Text Creator', description: 'Create featured text with special formatting', icon: 'Sparkles', isPremium: true, isPopular: false },
        { id: 'note-app', name: 'Note App', description: 'Simple note-taking application', icon: 'StickyNote', isPremium: false, isPopular: false },
        { id: 'keyword-generator', name: 'Keyword Generator', description: 'Generate relevant keywords for content', icon: 'Hash', isPremium: false, isPopular: true },
        { id: 'keyword-density', name: 'Keyword Density Analyzer', description: 'Analyze keyword density in text', icon: 'Target', isPremium: true, isPopular: false },
        { id: 'hashtag-generator', name: 'Hashtag Generator', description: 'Generate trending hashtags for social media', icon: 'Hash', isPremium: false, isPopular: true },
        { id: 'password-generator', name: 'Password Generator & Strength Checker', description: 'Generate secure passwords and check strength', icon: 'Shield', isPremium: false, isPopular: true },
        { id: 'html-formatter', name: 'HTML Formatter', description: 'Format and beautify HTML code', icon: 'Code', isPremium: false, isPopular: false },
        { id: 'minify-css-js', name: 'Minify CSS/JS', description: 'Minify CSS and JavaScript files', icon: 'Minimize', isPremium: false, isPopular: false },
        { id: 'text-case', name: 'Convert Text Case', description: 'Convert text between different cases', icon: 'Type', isPremium: false, isPopular: true },
        { id: 'remove-duplicates', name: 'Remove Duplicate Lines', description: 'Remove duplicate lines from text', icon: 'Layers', isPremium: false, isPopular: false },
        { id: 'regex-tester', name: 'Online Regex Tester', description: 'Test and debug regular expressions', icon: 'Search', isPremium: false, isPopular: false }
      ]
    },

    // SEO & Web Tools (12 tools)
    'seo-tools': {
      name: 'SEO & Web Tools',
      icon: 'TrendingUp',
      color: 'bg-purple-500',
      tools: [
        { id: 'xml-sitemap', name: 'XML Sitemap Generator', description: 'Generate XML sitemaps for websites', icon: 'Sitemap', isPremium: false, isPopular: true },
        { id: 'robots-txt', name: 'Robots.txt Generator', description: 'Create robots.txt files for SEO', icon: 'Bot', isPremium: false, isPopular: false },
        { id: 'seo-analyzer', name: 'SEO Analyzer', description: 'Analyze website SEO performance', icon: 'TrendingUp', isPremium: true, isPopular: true },
        { id: 'meta-tag-generator', name: 'Meta Tag Generator', description: 'Generate meta tags for web pages', icon: 'Tags', isPremium: false, isPopular: true },
        { id: 'keyword-generator-seo', name: 'Keyword Generator', description: 'Generate SEO keywords for content', icon: 'Hash', isPremium: false, isPopular: true },
        { id: 'page-speed', name: 'Page Speed Tester', description: 'Test website loading speed', icon: 'Zap', isPremium: true, isPopular: true },
        { id: 'utm-generator', name: 'UTM Link Generator', description: 'Generate UTM tracking parameters', icon: 'Link', isPremium: false, isPopular: false },
        { id: 'broken-link', name: 'Broken Link Checker', description: 'Find and fix broken links', icon: 'AlertTriangle', isPremium: true, isPopular: false },
        { id: 'schema-markup', name: 'Schema Markup Generator', description: 'Generate structured data markup', icon: 'Code2', isPremium: true, isPopular: false },
        { id: 'favicon-generator', name: 'Favicon Generator', description: 'Create favicons for websites', icon: 'Star', isPremium: false, isPopular: false },
        { id: 'og-previewer', name: 'Open Graph Meta Previewer', description: 'Preview social media sharing cards', icon: 'Share', isPremium: false, isPopular: false },
        { id: 'ssl-checker', name: 'SSL Checker', description: 'Check SSL certificate status', icon: 'Shield', isPremium: false, isPopular: false }
      ]
    },

    // Converters & Calculators (12 tools)
    'calculators': {
      name: 'Converters & Calculators',
      icon: 'Calculator',
      color: 'bg-orange-500',
      tools: [
        { id: 'currency-converter', name: 'Currency Converter', description: 'Convert between different currencies', icon: 'DollarSign', isPremium: false, isPopular: true },
        { id: 'bmi-calculator', name: 'BMI Calculator', description: 'Calculate Body Mass Index', icon: 'Activity', isPremium: false, isPopular: true },
        { id: 'age-calculator', name: 'Age Calculator', description: 'Calculate age and time differences', icon: 'Calendar', isPremium: false, isPopular: false },
        { id: 'compound-interest', name: 'Compound Interest Calculator', description: 'Calculate compound interest returns', icon: 'TrendingUp', isPremium: false, isPopular: false },
        { id: 'unit-converter', name: 'Unit Converter', description: 'Convert between different units', icon: 'Move', isPremium: false, isPopular: true },
        { id: 'speech-to-text', name: 'Speech to Text Converter', description: 'Convert speech to text', icon: 'Mic', isPremium: true, isPopular: true },
        { id: 'text-to-speech', name: 'Text to Speech Tool', description: 'Convert text to speech audio', icon: 'Volume2', isPremium: true, isPopular: false },
        { id: 'loan-calculator', name: 'Loan EMI Calculator', description: 'Calculate loan EMI payments', icon: 'CreditCard', isPremium: false, isPopular: false },
        { id: 'percentage-calculator', name: 'Percentage Calculator', description: 'Calculate percentages and ratios', icon: 'Percent', isPremium: false, isPopular: true },
        { id: 'timezone-converter', name: 'Time Zone Converter', description: 'Convert time between zones', icon: 'Clock', isPremium: false, isPopular: false },
        { id: 'discount-calculator', name: 'Discount Calculator', description: 'Calculate discounts and savings', icon: 'Tag', isPremium: false, isPopular: false },
        { id: 'average-calculator', name: 'Average Calculator', description: 'Calculate mean, median, mode', icon: 'BarChart', isPremium: false, isPopular: false }
      ]
    },

    // CSS & Design Tools (8 tools)
    'css-tools': {
      name: 'CSS & Design Tools',
      icon: 'Palette',
      color: 'bg-pink-500',
      tools: [
        { id: 'css-gradient', name: 'CSS Gradient Generator', description: 'Create CSS gradient effects', icon: 'Palette', isPremium: false, isPopular: true },
        { id: 'box-shadow', name: 'CSS Box Shadow Generator', description: 'Generate CSS box shadow styles', icon: 'Square', isPremium: false, isPopular: true },
        { id: 'color-picker', name: 'Color Picker', description: 'Pick and convert colors between formats', icon: 'Pipette', isPremium: false, isPopular: true },
        { id: 'glassmorphism', name: 'Glassmorphism Generator', description: 'Create glassmorphism effects', icon: 'Circle', isPremium: true, isPopular: true },
        { id: 'neumorphism', name: 'Neumorphism Generator', description: 'Generate neumorphism styles', icon: 'Layers', isPremium: true, isPopular: false },
        { id: 'border-radius', name: 'Border Radius Generator', description: 'Create custom border radius styles', icon: 'Square', isPremium: false, isPopular: false },
        { id: 'css-animation', name: 'CSS Animation Generator', description: 'Create CSS animations and keyframes', icon: 'Play', isPremium: true, isPopular: false },
        { id: 'font-pairing', name: 'Font Pairing Tool', description: 'Find perfect font combinations', icon: 'Type', isPremium: true, isPopular: false }
      ]
    },

    // Other Tools (16 tools)
    'other-tools': {
      name: 'Other Tools',
      icon: 'Wrench',
      color: 'bg-gray-500',
      tools: [
        { id: 'adobe-converter', name: 'All Adobe Format Converter', description: 'Convert between PDF, PSD, AI, EPS formats', icon: 'RefreshCw', isPremium: true, isPopular: false },
        { id: 'qr-generator', name: 'QR Code Generator', description: 'Generate QR codes for text or URLs', icon: 'QrCode', isPremium: false, isPopular: true },
        { id: 'barcode-generator', name: 'Barcode Generator', description: 'Generate various barcode formats', icon: 'ScanLine', isPremium: false, isPopular: false },
        { id: 'youtube-downloader', name: 'YouTube Video Downloader', description: 'Download YouTube videos (API based)', icon: 'Download', isPremium: true, isPopular: true },
        { id: 'youtube-tags', name: 'YouTube Tags Extractor', description: 'Extract tags from YouTube videos', icon: 'Tags', isPremium: false, isPopular: false },
        { id: 'youtube-title', name: 'YouTube Title Analyzer', description: 'Analyze YouTube video titles', icon: 'BarChart3', isPremium: true, isPopular: false },
        { id: 'instagram-bio', name: 'Instagram Bio Generator', description: 'Generate engaging Instagram bios', icon: 'Instagram', isPremium: false, isPopular: true },
        { id: 'flipbook-generator', name: 'Flipbook Generator', description: 'Create digital flipbooks from images', icon: 'Book', isPremium: true, isPopular: false },
        { id: 'plagiarism-checker', name: 'Plagiarism Checker', description: 'Check text for plagiarism', icon: 'Search', isPremium: true, isPopular: true },
        { id: 'smtp-checker', name: 'SMTP Mail Checker', description: 'Test SMTP email configuration', icon: 'Mail', isPremium: true, isPopular: false },
        { id: 'speed-test', name: 'Internet Speed Checker', description: 'Test internet connection speed', icon: 'Wifi', isPremium: false, isPopular: true },
        { id: 'text-font-changer', name: 'Text Font Changer', description: 'Change text fonts and styles', icon: 'Type', isPremium: false, isPopular: false }
      ]
    }
  };

  // Get all tools for filtering
  const getAllTools = () => {
    return Object.values(allTools)?.flatMap(category => 
      category?.tools?.map(tool => ({ ...tool, categoryId: category?.name?.toLowerCase()?.replace(/\s+/g, '-')?.replace('&', '')?.replace(/\s+/g, '-') }))
    );
  };

  const filteredTools = getAllTools()?.filter(tool => {
    const matchesSearch = !searchQuery || tool?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) || tool?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool?.categoryId === selectedCategory;
    const matchesPopular = !filterPopular || tool?.isPopular;
    return matchesSearch && matchesCategory && matchesPopular;
  });

  const toggleFavorite = (toolId) => {
    setFavorites(prev => 
      prev?.includes(toolId) 
        ? prev?.filter(id => id !== toolId)
        : [...prev, toolId]
    );
  };

  const getToolCategoryData = (categoryId) => {
    return allTools?.[categoryId] || { name: 'Unknown', icon: 'Wrench', color: 'bg-gray-500' };
  };

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('tool-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    // Load recent tools
    const savedRecent = localStorage.getItem('recent-tools');
    if (savedRecent) {
      setRecentTools(JSON.parse(savedRecent));
    }
  }, []);

  useEffect(() => {
    // Save favorites to localStorage
    localStorage.setItem('tool-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleToolClick = (tool) => {
    // Add to recent tools
    const newRecent = [tool, ...recentTools?.filter(t => t?.id !== tool?.id)]?.slice(0, 10);
    setRecentTools(newRecent);
    localStorage.setItem('recent-tools', JSON.stringify(newRecent));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 lg:pt-18">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <BreadcrumbNavigation />
        </div>

        {/* Dashboard Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
              All-in-One Tool Dashboard
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access 100+ professional tools for PDF processing, image editing, text manipulation, SEO optimization, and more. All tools work offline in your browser for complete privacy.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="glass-card p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="pl-10 w-full"
                />
              </div>
              
              <CategoryDropdown
                value={selectedCategory}
                onChange={setSelectedCategory}
                categories={[
                  { id: 'all', name: 'All Categories', count: getAllTools()?.length },
                  ...Object.entries(allTools)?.map(([key, category]) => ({
                    id: key,
                    name: category?.name,
                    count: category?.tools?.length
                  }))
                ]}
              />

              <Button
                variant={filterPopular ? "default" : "outline"}
                iconName="Star"
                onClick={() => setFilterPopular(!filterPopular)}
              >
                Popular Only
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{getAllTools()?.length}+</div>
                <div className="text-sm text-muted-foreground">Total Tools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{Object.keys(allTools)?.length}</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{filteredTools?.length}</div>
                <div className="text-sm text-muted-foreground">Matching Tools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{favorites?.length}</div>
                <div className="text-sm text-muted-foreground">Favorites</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Category Overview */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Categories</h3>
                <div className="space-y-3">
                  {Object.entries(allTools)?.map(([key, category]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(selectedCategory === key ? 'all' : key)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        selectedCategory === key 
                          ? 'bg-primary/10 text-primary' :'hover:bg-white/5 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <div className={`w-8 h-8 ${category?.color} rounded-lg flex items-center justify-center`}>
                        <Icon name={category?.icon} size={16} color="white" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium">{category?.name}</div>
                        <div className="text-xs opacity-70">{category?.tools?.length} tools</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Tools */}
              {recentTools?.length > 0 && (
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Recent Tools</h3>
                  <div className="space-y-2">
                    {recentTools?.slice(0, 5)?.map((tool) => (
                      <Link
                        key={tool?.id}
                        to={`/advanced-tool-interface?tool=${tool?.id}`}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <Icon name={tool?.icon} size={16} className="text-primary" />
                        <span className="text-sm text-foreground truncate">{tool?.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Favorites */}
              {favorites?.length > 0 && (
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Favorites</h3>
                  <div className="space-y-2">
                    {getAllTools()?.filter(tool => favorites?.includes(tool?.id))?.slice(0, 5)?.map((tool) => (
                      <Link
                        key={tool?.id}
                        to={`/advanced-tool-interface?tool=${tool?.id}`}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <Icon name={tool?.icon} size={16} className="text-warning" />
                        <span className="text-sm text-foreground truncate">{tool?.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tools Grid */}
            <div className="lg:col-span-3">
              {filteredTools?.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No Tools Found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                </div>
              ) : (
                <>
                  {/* Results Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-foreground">
                      {filteredTools?.length} Tools Found
                      {selectedCategory !== 'all' && (
                        <span className="text-lg text-muted-foreground ml-2">
                          in {allTools?.[selectedCategory]?.name}
                        </span>
                      )}
                    </h2>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" iconName="Grid3X3">
                        Grid View
                      </Button>
                    </div>
                  </div>

                  {/* Tools Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTools?.map((tool) => (
                      <div key={tool?.id} className="glass-card p-6 hover:shadow-elevation-3 transition-all duration-300 group">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 ${getToolCategoryData(tool?.categoryId)?.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                            <Icon name={tool?.icon} size={20} color="white" />
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {tool?.isPopular && (
                              <div className="px-2 py-1 bg-warning/10 text-warning text-xs rounded-full">
                                Popular
                              </div>
                            )}
                            {tool?.isPremium && (
                              <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                Pro
                              </div>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              iconName={favorites?.includes(tool?.id) ? "Heart" : "Heart"}
                              onClick={(e) => {
                                e?.preventDefault();
                                toggleFavorite(tool?.id);
                              }}
                              className={favorites?.includes(tool?.id) ? "text-warning" : "text-muted-foreground hover:text-warning"}
                            />
                          </div>
                        </div>

                        <div className="mb-4">
                          <h3 className="text-lg font-semibold text-foreground mb-2">{tool?.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{tool?.description}</p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <div className="text-xs text-muted-foreground">
                            {getToolCategoryData(tool?.categoryId)?.name}
                          </div>
                          
                          <Link
                            to={`/advanced-tool-interface?tool=${tool?.id}`}
                            onClick={() => handleToolClick(tool)}
                          >
                            <Button size="sm" iconName="ArrowRight">
                              Use Tool
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Features Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="glass-card p-8 text-center bg-primary/5 border-primary/20">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Icon name="Shield" size={24} className="text-success" />
              <Icon name="Zap" size={24} className="text-warning" />
              <Icon name="Globe" size={24} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Why Choose Our Tools?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <Icon name="Shield" size={20} className="text-success flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Privacy First</h4>
                  <p className="text-sm text-muted-foreground">All processing happens locally in your browser. No data ever leaves your device.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Icon name="Zap" size={20} className="text-warning flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Lightning Fast</h4>
                  <p className="text-sm text-muted-foreground">Optimized algorithms provide instant results without waiting for uploads or downloads.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Icon name="Globe" size={20} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Works Offline</h4>
                  <p className="text-sm text-muted-foreground">Once loaded, most tools work completely offline. Perfect for sensitive documents.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiCategoryToolDashboard;