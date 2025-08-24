import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from 'components/ui/Header';
import ToolCard from 'components/ui/ToolCard';
import Button from 'components/ui/Button';
import SearchBar from 'components/ui/SearchBar';
import Icon from 'components/AppIcon';
import CategoryHero from './components/CategoryHero';
import FilterBar from './components/FilterBar';
import AdSlot from './components/AdSlot';
import RelatedCategories from './components/RelatedCategories';
import UsageStatistics from './components/UsageStatistics';

const PDFToolsHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    function: 'all',
    format: 'all',
    popularity: 'all'
  });
  const [sortBy, setSortBy] = useState('popular');
  const [filteredTools, setFilteredTools] = useState([]);

  // Comprehensive PDF Tools Data - All 27 tools
  const pdfTools = [
    // Conversion Tools (PDF to other formats)
    {
      id: 1,
      name: 'PDF to HTML',
      description: 'Convert PDF documents to HTML format while preserving layout and formatting.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'pdf-to-html',
      icon: 'FileText',
      usageCount: 45200,
      rating: 4.7,
      tags: ['conversion', 'html', 'web'],
      isPremium: false,
      isNew: false,
      function: 'conversion',
      formats: ['PDF', 'HTML'],
      lastUpdated: '2024-08-20'
    },
    {
      id: 2,
      name: 'PDF to CSV',
      description: 'Extract tabular data from PDF files and convert to CSV format for spreadsheet use.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'pdf-to-csv',
      icon: 'Table',
      usageCount: 38900,
      rating: 4.6,
      tags: ['conversion', 'csv', 'data'],
      isPremium: false,
      isNew: false,
      function: 'conversion',
      formats: ['PDF', 'CSV'],
      lastUpdated: '2024-08-22'
    },
    {
      id: 3,
      name: 'PDF to Excel',
      description: 'Convert PDF tables and data to Excel spreadsheets with accurate formatting.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'pdf-to-excel',
      icon: 'FileSpreadsheet',
      usageCount: 92300,
      rating: 4.8,
      tags: ['conversion', 'excel', 'spreadsheet'],
      isPremium: true,
      isNew: false,
      function: 'conversion',
      formats: ['PDF', 'XLSX'],
      lastUpdated: '2024-08-21'
    },
    {
      id: 4,
      name: 'PDF to JPG',
      description: 'Convert PDF pages to high-quality JPG images with custom resolution settings.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'pdf-to-jpg',
      icon: 'Image',
      usageCount: 156700,
      rating: 4.9,
      tags: ['conversion', 'image', 'jpg'],
      isPremium: false,
      isNew: false,
      function: 'conversion',
      formats: ['PDF', 'JPG'],
      lastUpdated: '2024-08-23'
    },
    {
      id: 5,
      name: 'PDF to PNG',
      description: 'Convert PDF documents to PNG images with transparency support and high quality.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'pdf-to-png',
      icon: 'ImageIcon',
      usageCount: 134500,
      rating: 4.8,
      tags: ['conversion', 'image', 'png'],
      isPremium: false,
      isNew: false,
      function: 'conversion',
      formats: ['PDF', 'PNG'],
      lastUpdated: '2024-08-22'
    },
    {
      id: 6,
      name: 'PDF to WebP',
      description: 'Convert PDF pages to modern WebP format for optimized web performance.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'pdf-to-webp',
      icon: 'Globe',
      usageCount: 23800,
      rating: 4.5,
      tags: ['conversion', 'webp', 'optimization'],
      isPremium: false,
      isNew: true,
      function: 'conversion',
      formats: ['PDF', 'WebP'],
      lastUpdated: '2024-08-24'
    },
    {
      id: 7,
      name: 'PDF to MS Word (DOCX)',
      description: 'Convert PDF files to editable Word documents with preserved formatting.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'pdf-to-docx',
      icon: 'FileText2',
      usageCount: 187900,
      rating: 4.9,
      tags: ['conversion', 'word', 'docx'],
      isPremium: true,
      isNew: false,
      function: 'conversion',
      formats: ['PDF', 'DOCX'],
      lastUpdated: '2024-08-21'
    },
    {
      id: 8,
      name: 'PDF to JSON',
      description: 'Extract structured data from PDFs and convert to JSON format for developers.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'pdf-to-json',
      icon: 'Code',
      usageCount: 29400,
      rating: 4.6,
      tags: ['conversion', 'json', 'data'],
      isPremium: false,
      isNew: false,
      function: 'conversion',
      formats: ['PDF', 'JSON'],
      lastUpdated: '2024-08-20'
    },
    {
      id: 9,
      name: 'PDF to XML',
      description: 'Convert PDF content to XML format with structured markup and metadata.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'pdf-to-xml',
      icon: 'FileCode',
      usageCount: 18700,
      rating: 4.4,
      tags: ['conversion', 'xml', 'markup'],
      isPremium: false,
      isNew: false,
      function: 'conversion',
      formats: ['PDF', 'XML'],
      lastUpdated: '2024-08-19'
    },
    {
      id: 10,
      name: 'PDF to Text',
      description: 'Extract plain text content from PDF files with OCR support for scanned documents.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'pdf-to-text',
      icon: 'Type',
      usageCount: 298500,
      rating: 4.9,
      tags: ['conversion', 'text', 'ocr'],
      isPremium: false,
      isNew: false,
      function: 'conversion',
      formats: ['PDF', 'TXT'],
      lastUpdated: '2024-08-23'
    },

    // Conversion Tools (Other formats to PDF)
    {
      id: 11,
      name: 'Text to PDF',
      description: 'Convert plain text files to formatted PDF documents with customizable styling.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'text-to-pdf',
      icon: 'FileText',
      usageCount: 145600,
      rating: 4.7,
      tags: ['creation', 'text', 'formatting'],
      isPremium: false,
      isNew: false,
      function: 'creation',
      formats: ['TXT', 'PDF'],
      lastUpdated: '2024-08-22'
    },
    {
      id: 12,
      name: 'Excel to PDF',
      description: 'Convert Excel spreadsheets to PDF format with preserved charts and formatting.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'excel-to-pdf',
      icon: 'FileSpreadsheet',
      usageCount: 167800,
      rating: 4.8,
      tags: ['conversion', 'excel', 'spreadsheet'],
      isPremium: false,
      isNew: false,
      function: 'conversion',
      formats: ['XLSX', 'PDF'],
      lastUpdated: '2024-08-21'
    },
    {
      id: 13,
      name: 'HTML to PDF',
      description: 'Convert web pages and HTML content to PDF with CSS styling preserved.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'html-to-pdf',
      icon: 'Globe',
      usageCount: 89400,
      rating: 4.6,
      tags: ['conversion', 'html', 'web'],
      isPremium: false,
      isNew: false,
      function: 'conversion',
      formats: ['HTML', 'PDF'],
      lastUpdated: '2024-08-20'
    },
    {
      id: 14,
      name: 'JPG to PDF',
      description: 'Convert JPG images to PDF documents with batch processing support.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'jpg-to-pdf',
      icon: 'Image',
      usageCount: 234700,
      rating: 4.8,
      tags: ['conversion', 'image', 'jpg'],
      isPremium: false,
      isNew: false,
      function: 'conversion',
      formats: ['JPG', 'PDF'],
      lastUpdated: '2024-08-23'
    },
    {
      id: 15,
      name: 'PNG to PDF',
      description: 'Convert PNG images to PDF format with transparency handling and quality options.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'png-to-pdf',
      icon: 'ImageIcon',
      usageCount: 198300,
      rating: 4.7,
      tags: ['conversion', 'image', 'png'],
      isPremium: false,
      isNew: false,
      function: 'conversion',
      formats: ['PNG', 'PDF'],
      lastUpdated: '2024-08-22'
    },
    {
      id: 16,
      name: 'WebP to PDF',
      description: 'Convert modern WebP images to PDF format with optimized compression.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'webp-to-pdf',
      icon: 'Globe',
      usageCount: 34500,
      rating: 4.5,
      tags: ['conversion', 'webp', 'modern'],
      isPremium: false,
      isNew: true,
      function: 'conversion',
      formats: ['WebP', 'PDF'],
      lastUpdated: '2024-08-24'
    },
    {
      id: 17,
      name: 'JSON to PDF',
      description: 'Convert JSON data to formatted PDF reports with customizable templates.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'json-to-pdf',
      icon: 'Code',
      usageCount: 45600,
      rating: 4.6,
      tags: ['conversion', 'json', 'reports'],
      isPremium: true,
      isNew: false,
      function: 'conversion',
      formats: ['JSON', 'PDF'],
      lastUpdated: '2024-08-21'
    },
    {
      id: 18,
      name: 'XML to PDF',
      description: 'Transform XML documents to PDF format with XSLT styling support.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'xml-to-pdf',
      icon: 'FileCode',
      usageCount: 28900,
      rating: 4.4,
      tags: ['conversion', 'xml', 'xslt'],
      isPremium: false,
      isNew: false,
      function: 'conversion',
      formats: ['XML', 'PDF'],
      lastUpdated: '2024-08-19'
    },
    {
      id: 19,
      name: 'Speech to PDF Converter',
      description: 'Convert audio speech to text and generate PDF transcripts with timestamps.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'speech-to-pdf',
      icon: 'Mic',
      usageCount: 67800,
      rating: 4.7,
      tags: ['conversion', 'speech', 'transcription'],
      isPremium: true,
      isNew: true,
      function: 'conversion',
      formats: ['Audio', 'PDF'],
      lastUpdated: '2024-08-24'
    },

    // PDF Editing and Manipulation Tools
    {
      id: 20,
      name: 'Merge PDF',
      description: 'Combine multiple PDF files into a single document with drag-and-drop ordering.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'merge-pdf',
      icon: 'Merge',
      usageCount: 345600,
      rating: 4.9,
      tags: ['editing', 'merge', 'combine'],
      isPremium: false,
      isNew: false,
      function: 'editing',
      formats: ['PDF'],
      lastUpdated: '2024-08-23'
    },
    {
      id: 21,
      name: 'Split PDF',
      description: 'Split PDF documents into separate files by pages, ranges, or bookmarks.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'split-pdf',
      icon: 'Split',
      usageCount: 267400,
      rating: 4.8,
      tags: ['editing', 'split', 'pages'],
      isPremium: false,
      isNew: false,
      function: 'editing',
      formats: ['PDF'],
      lastUpdated: '2024-08-22'
    },
    {
      id: 22,
      name: 'Rotate PDF',
      description: 'Rotate PDF pages 90°, 180°, or 270° clockwise or counterclockwise.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'rotate-pdf',
      icon: 'RotateCw',
      usageCount: 134500,
      rating: 4.6,
      tags: ['editing', 'rotate', 'orientation'],
      isPremium: false,
      isNew: false,
      function: 'editing',
      formats: ['PDF'],
      lastUpdated: '2024-08-21'
    },
    {
      id: 23,
      name: 'Lock/Unlock PDF',
      description: 'Add password protection to PDFs or remove passwords from encrypted documents.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'lock-unlock-pdf',
      icon: 'Lock',
      usageCount: 178900,
      rating: 4.8,
      tags: ['security', 'password', 'encryption'],
      isPremium: true,
      isNew: false,
      function: 'editing',
      formats: ['PDF'],
      lastUpdated: '2024-08-20'
    },
    {
      id: 24,
      name: 'Add Watermark to PDF',
      description: 'Add text or image watermarks to PDF documents with positioning controls.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'add-watermark-pdf',
      icon: 'Droplet',
      usageCount: 98700,
      rating: 4.7,
      tags: ['editing', 'watermark', 'branding'],
      isPremium: true,
      isNew: false,
      function: 'editing',
      formats: ['PDF'],
      lastUpdated: '2024-08-21'
    },
    {
      id: 25,
      name: 'Compress PDF',
      description: 'Reduce PDF file size while maintaining quality with smart compression algorithms.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'compress-pdf',
      icon: 'Archive',
      usageCount: 456700,
      rating: 4.9,
      tags: ['optimization', 'compress', 'size'],
      isPremium: false,
      isNew: false,
      function: 'editing',
      formats: ['PDF'],
      lastUpdated: '2024-08-23'
    },
    {
      id: 26,
      name: 'PDF Page Remover',
      description: 'Remove specific pages from PDF documents with preview functionality.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'pdf-page-remover',
      icon: 'Trash2',
      usageCount: 87300,
      rating: 4.5,
      tags: ['editing', 'remove', 'pages'],
      isPremium: false,
      isNew: false,
      function: 'editing',
      formats: ['PDF'],
      lastUpdated: '2024-08-20'
    },
    {
      id: 27,
      name: 'Extract Images from PDF',
      description: 'Extract all images from PDF documents in original quality and format.',
      category: 'PDF Tools',
      categorySlug: 'pdf-tools',
      slug: 'extract-images-pdf',
      icon: 'ImageIcon',
      usageCount: 123400,
      rating: 4.7,
      tags: ['extraction', 'images', 'graphics'],
      isPremium: false,
      isNew: false,
      function: 'editing',
      formats: ['PDF'],
      lastUpdated: '2024-08-22'
    }
  ];

  const filterOptions = {
    function: [
      { value: 'all', label: 'All Functions' },
      { value: 'conversion', label: 'Conversion' },
      { value: 'editing', label: 'Editing' },
      { value: 'creation', label: 'Creation' }
    ],
    format: [
      { value: 'all', label: 'All Formats' },
      { value: 'PDF', label: 'PDF' },
      { value: 'HTML', label: 'HTML' },
      { value: 'Image', label: 'Images' },
      { value: 'Office', label: 'Office' },
      { value: 'Data', label: 'Data' }
    ],
    popularity: [
      { value: 'all', label: 'All Tools' },
      { value: 'popular', label: 'Most Popular' },
      { value: 'new', label: 'New Tools' },
      { value: 'premium', label: 'Premium' }
    ]
  };

  // Filter and search logic
  useEffect(() => {
    let filtered = [...pdfTools];

    // Apply search filter
    if (searchQuery?.trim()) {
      filtered = filtered?.filter(tool => 
        tool?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        tool?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        tool?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Apply function filter
    if (selectedFilters?.function !== 'all') {
      filtered = filtered?.filter(tool => tool?.function === selectedFilters?.function);
    }

    // Apply format filter
    if (selectedFilters?.format !== 'all') {
      filtered = filtered?.filter(tool => 
        tool?.formats?.some(format => 
          selectedFilters?.format === 'Image' ? ['JPG', 'PNG', 'WebP']?.includes(format) :
          selectedFilters?.format === 'Office' ? ['DOCX', 'XLSX']?.includes(format) :
          selectedFilters?.format === 'Data' ? ['JSON', 'XML', 'CSV']?.includes(format) :
          format === selectedFilters?.format
        )
      );
    }

    // Apply popularity filter
    if (selectedFilters?.popularity !== 'all') {
      filtered = filtered?.filter(tool => {
        switch (selectedFilters?.popularity) {
          case 'popular':
            return tool?.usageCount > 200000;
          case 'new':
            return tool?.isNew;
          case 'premium':
            return tool?.isPremium;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b?.usageCount - a?.usageCount;
        case 'rating':
          return b?.rating - a?.rating;
        case 'alphabetical':
          return a?.name?.localeCompare(b?.name);
        case 'recent':
          return new Date(b?.lastUpdated) - new Date(a?.lastUpdated);
        default:
          return 0;
      }
    });

    setFilteredTools(filtered);
  }, [searchQuery, selectedFilters, sortBy]);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleToolClick = (tool) => {
    // Analytics tracking could go here
    console.log(`Tool clicked: ${tool?.name}`);
  };

  const totalUsage = pdfTools?.reduce((sum, tool) => sum + tool?.usageCount, 0);
  const averageRating = (pdfTools?.reduce((sum, tool) => sum + tool?.rating, 0) / pdfTools?.length)?.toFixed(1);

  return (
    <>
      <Helmet>
        <title>PDF Tools Hub - 27 Professional PDF Utilities | ToolTica</title>
        <meta 
          name="description" 
          content="Access 27 powerful PDF tools for conversion, editing, and processing. Convert PDFs to Word, Excel, images, compress, merge, split, and more - all free online." 
        />
        <meta name="keywords" content="PDF tools, PDF converter, merge PDF, split PDF, compress PDF, PDF to Word, PDF to Excel, online PDF editor" />
        <meta property="og:title" content="PDF Tools Hub - 27 Professional PDF Utilities" />
        <meta property="og:description" content="Comprehensive collection of PDF tools for all your document needs. Free online PDF conversion, editing, and processing tools." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/pdf-tools-hub" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface/30">
        <Header />
        
        <main className="pt-20 lg:pt-24">
          {/* Category Hero Section */}
          <CategoryHero 
            category="PDF Tools"
            description="Comprehensive suite of 27 professional PDF utilities for conversion, editing, and processing"
            toolCount={pdfTools?.length}
            totalUsage={totalUsage}
            averageRating={averageRating}
          />

          {/* Usage Statistics */}
          <UsageStatistics 
            totalTools={pdfTools?.length}
            totalUsage={totalUsage}
            averageRating={averageRating}
            popularTool={pdfTools?.find(tool => tool?.usageCount === Math.max(...pdfTools?.map(t => t?.usageCount)))}
          />

          {/* Search and Filter Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Bar */}
              <div className="flex-1">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search PDF tools..."
                  className="w-full"
                />
              </div>

              {/* Sort Options */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e?.target?.value)}
                  className="px-3 py-2 bg-surface/50 border border-white/10 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="alphabetical">A-Z</option>
                  <option value="recent">Recently Updated</option>
                </select>
              </div>
            </div>
          </section>

          {/* Filter Bar */}
          <FilterBar
            filterOptions={filterOptions}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />

          {/* Ad Slot */}
          <AdSlot 
            type="banner"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
          />

          {/* Tools Grid Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                PDF Tools ({filteredTools?.length})
              </h2>
              {searchQuery || selectedFilters?.function !== 'all' || selectedFilters?.format !== 'all' || selectedFilters?.popularity !== 'all' ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedFilters({ function: 'all', format: 'all', popularity: 'all' });
                  }}
                >
                  <Icon name="X" size={14} className="mr-2" />
                  Clear Filters
                </Button>
              ) : null}
            </div>

            {filteredTools?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTools?.map((tool, index) => (
                  <div key={tool?.id}>
                    <ToolCard
                      tool={tool}
                      variant={tool?.isPremium ? "featured" : "default"}
                      onToolClick={handleToolClick}
                    />
                    {/* Ad Slot every 8 tools */}
                    {(index + 1) % 8 === 0 && (
                      <AdSlot 
                        type="card"
                        className="col-span-full my-4"
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mb-4">
                  <Icon name="Search" size={48} className="mx-auto text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No tools found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedFilters({ function: 'all', format: 'all', popularity: 'all' });
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </section>

          {/* Related Categories */}
          <RelatedCategories />
        </main>
      </div>
    </>
  );
};

export default PDFToolsHub;