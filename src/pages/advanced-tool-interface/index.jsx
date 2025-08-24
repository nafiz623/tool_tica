import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

import ProcessingInterface from './components/ProcessingInterface';
import ProgressIndicator from './components/ProgressIndicator';
import FileUploadZone from './components/FileUploadZone';
import OutputSection from './components/OutputSection';
import ToolConfigPanel from './components/ToolConfigPanel';
import BatchProcessor from './components/BatchProcessor';
import PreviewPane from './components/PreviewPane';

const AdvancedToolInterface = () => {
  const [searchParams] = useSearchParams();
  const [currentTool, setCurrentTool] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);
  const [config, setConfig] = useState({});
  const [history, setHistory] = useState([]);
  const [preview, setPreview] = useState(null);
  const [batchMode, setBatchMode] = useState(false);

  const toolSlug = searchParams?.get('tool') || 'pdf-to-text';

  // Comprehensive tool database
  const toolsDatabase = {
    // PDF Tools (27 tools)
    'pdf-to-html': { name: 'PDF to HTML', category: 'PDF Tools', icon: 'Code', description: 'Convert PDF documents to clean HTML code', acceptedTypes: ['.pdf'] },
    'pdf-to-csv': { name: 'PDF to CSV', category: 'PDF Tools', icon: 'Table', description: 'Extract tabular data from PDF to CSV format', acceptedTypes: ['.pdf'] },
    'pdf-to-excel': { name: 'PDF to Excel', category: 'PDF Tools', icon: 'FileSpreadsheet', description: 'Convert PDF tables to Excel spreadsheets', acceptedTypes: ['.pdf'] },
    'pdf-to-jpg': { name: 'PDF to JPG', category: 'PDF Tools', icon: 'Image', description: 'Convert PDF pages to JPG images', acceptedTypes: ['.pdf'] },
    'pdf-to-png': { name: 'PDF to PNG', category: 'PDF Tools', icon: 'Image', description: 'Convert PDF pages to PNG images', acceptedTypes: ['.pdf'] },
    'pdf-to-webp': { name: 'PDF to WebP', category: 'PDF Tools', icon: 'Image', description: 'Convert PDF pages to WebP format', acceptedTypes: ['.pdf'] },
    'pdf-to-word': { name: 'PDF to MS Word', category: 'PDF Tools', icon: 'FileText', description: 'Convert PDF to editable Word documents', acceptedTypes: ['.pdf'] },
    'pdf-to-json': { name: 'PDF to JSON', category: 'PDF Tools', icon: 'Braces', description: 'Extract PDF data to JSON format', acceptedTypes: ['.pdf'] },
    'pdf-to-xml': { name: 'PDF to XML', category: 'PDF Tools', icon: 'Code2', description: 'Convert PDF content to XML structure', acceptedTypes: ['.pdf'] },
    'pdf-to-text': { name: 'PDF to Text', category: 'PDF Tools', icon: 'FileText', description: 'Extract plain text from PDF documents', acceptedTypes: ['.pdf'] },
    'merge-pdf': { name: 'Merge PDF', category: 'PDF Tools', icon: 'Combine', description: 'Combine multiple PDF files into one', acceptedTypes: ['.pdf'] },
    'text-to-pdf': { name: 'Text to PDF', category: 'PDF Tools', icon: 'FileText', description: 'Convert text files to PDF format', acceptedTypes: ['.txt'] },
    'excel-to-pdf': { name: 'Excel to PDF', category: 'PDF Tools', icon: 'FileSpreadsheet', description: 'Convert Excel files to PDF', acceptedTypes: ['.xlsx', '.xls'] },
    'html-to-pdf': { name: 'HTML to PDF', category: 'PDF Tools', icon: 'Code', description: 'Generate PDF from HTML content', acceptedTypes: ['.html'] },
    'jpg-to-pdf': { name: 'JPG to PDF', category: 'PDF Tools', icon: 'Image', description: 'Convert JPG images to PDF', acceptedTypes: ['.jpg', '.jpeg'] },
    'png-to-pdf': { name: 'PNG to PDF', category: 'PDF Tools', icon: 'Image', description: 'Convert PNG images to PDF', acceptedTypes: ['.png'] },
    'webp-to-pdf': { name: 'WebP to PDF', category: 'PDF Tools', icon: 'Image', description: 'Convert WebP images to PDF', acceptedTypes: ['.webp'] },
    'json-to-pdf': { name: 'JSON to PDF', category: 'PDF Tools', icon: 'Braces', description: 'Generate PDF reports from JSON data', acceptedTypes: ['.json'] },
    'xml-to-pdf': { name: 'XML to PDF', category: 'PDF Tools', icon: 'Code2', description: 'Convert XML documents to PDF', acceptedTypes: ['.xml'] },
    'speech-to-pdf': { name: 'Speech to PDF', category: 'PDF Tools', icon: 'Mic', description: 'Convert speech to PDF transcript', acceptedTypes: ['.mp3', '.wav'] },
    'split-pdf': { name: 'Split PDF', category: 'PDF Tools', icon: 'Scissors', description: 'Split PDF into separate pages or sections', acceptedTypes: ['.pdf'] },
    'rotate-pdf': { name: 'Rotate PDF', category: 'PDF Tools', icon: 'RotateCw', description: 'Rotate PDF pages clockwise or counterclockwise', acceptedTypes: ['.pdf'] },
    'lock-pdf': { name: 'Lock/Unlock PDF', category: 'PDF Tools', icon: 'Lock', description: 'Add or remove password protection from PDF', acceptedTypes: ['.pdf'] },
    'watermark-pdf': { name: 'Add Watermark to PDF', category: 'PDF Tools', icon: 'Droplets', description: 'Add text or image watermarks to PDF', acceptedTypes: ['.pdf'] },
    'compress-pdf': { name: 'Compress PDF', category: 'PDF Tools', icon: 'Archive', description: 'Reduce PDF file size without quality loss', acceptedTypes: ['.pdf'] },
    'remove-pdf-pages': { name: 'PDF Page Remover', category: 'PDF Tools', icon: 'X', description: 'Remove specific pages from PDF documents', acceptedTypes: ['.pdf'] },
    'extract-images-pdf': { name: 'Extract Images from PDF', category: 'PDF Tools', icon: 'Image', description: 'Extract all images from PDF documents', acceptedTypes: ['.pdf'] },

    // Image Converter & Editor (17 tools)
    'jpg-to-png': { name: 'JPG to PNG', category: 'Image Tools', icon: 'Image', description: 'Convert JPG images to PNG format', acceptedTypes: ['.jpg', '.jpeg'] },
    'png-to-jpg': { name: 'PNG to JPG', category: 'Image Tools', icon: 'Image', description: 'Convert PNG images to JPG format', acceptedTypes: ['.png'] },
    'png-to-svg': { name: 'PNG to SVG', category: 'Image Tools', icon: 'Shapes', description: 'Convert PNG images to SVG vector format', acceptedTypes: ['.png'] },
    'ai-to-svg': { name: 'AI/Illustrator to SVG', category: 'Image Tools', icon: 'Palette', description: 'Convert Adobe Illustrator files to SVG', acceptedTypes: ['.ai', '.eps'] },
    'image-compressor': { name: 'Image Compressor', category: 'Image Tools', icon: 'Archive', description: 'Compress images to reduce file size', acceptedTypes: ['.jpg', '.png', '.webp'] },
    'image-resizer': { name: 'Image Resizer', category: 'Image Tools', icon: 'Move', description: 'Resize images to specific dimensions', acceptedTypes: ['.jpg', '.png', '.webp'] },
    'add-text-image': { name: 'Add Text on Image', category: 'Image Tools', icon: 'Type', description: 'Add custom text overlays to images', acceptedTypes: ['.jpg', '.png'] },
    'remove-watermark': { name: 'Image Watermark Remover', category: 'Image Tools', icon: 'Eraser', description: 'Remove watermarks from images', acceptedTypes: ['.jpg', '.png'] },
    'add-watermark': { name: 'Image Watermark Adder', category: 'Image Tools', icon: 'Droplets', description: 'Add watermarks to protect your images', acceptedTypes: ['.jpg', '.png'] },
    'ocr-analyzer': { name: 'Count Words on Image (OCR)', category: 'Image Tools', icon: 'ScanLine', description: 'Extract and count text from images using OCR', acceptedTypes: ['.jpg', '.png'] },
    'thumbnail-downloader': { name: 'Thumbnail Downloader', category: 'Image Tools', icon: 'Download', description: 'Download thumbnails from various platforms', acceptedTypes: [] },
    'thumbnail-previewer': { name: 'Thumbnail Previewer', category: 'Image Tools', icon: 'Eye', description: 'Preview thumbnails before downloading', acceptedTypes: [] },
    'webp-converter': { name: 'Convert WebP to PNG/JPG', category: 'Image Tools', icon: 'RefreshCw', description: 'Convert WebP images to PNG or JPG', acceptedTypes: ['.webp'] },
    'heic-converter': { name: 'Convert HEIC to JPG', category: 'Image Tools', icon: 'Smartphone', description: 'Convert iPhone HEIC images to JPG', acceptedTypes: ['.heic'] },
    'blur-background': { name: 'Blur Background of Image', category: 'Image Tools', icon: 'Focus', description: 'Apply background blur effects to images', acceptedTypes: ['.jpg', '.png'] },
    'crop-image': { name: 'Crop Image Online', category: 'Image Tools', icon: 'Crop', description: 'Crop images to custom dimensions', acceptedTypes: ['.jpg', '.png'] },
    'image-to-base64': { name: 'Convert Image to Base64', category: 'Image Tools', icon: 'Code', description: 'Convert images to Base64 encoded strings', acceptedTypes: ['.jpg', '.png', '.gif'] },

    // Text & Code Tools (14 tools)
    'json-formatter': { name: 'JSON Formatter', category: 'Text Tools', icon: 'Braces', description: 'Format and beautify JSON data', acceptedTypes: ['.json'] },
    'lorem-ipsum': { name: 'Lorem Ipsum Generator', category: 'Text Tools', icon: 'AlignLeft', description: 'Generate placeholder text for designs', acceptedTypes: [] },
    'text-analyzer': { name: 'Modern Text Analyzer', category: 'Text Tools', icon: 'BarChart3', description: 'Analyze text for readability and statistics', acceptedTypes: ['.txt'] },
    'feature-text': { name: 'Feature Text Creator', category: 'Text Tools', icon: 'Sparkles', description: 'Create featured text with special formatting', acceptedTypes: [] },
    'note-app': { name: 'Note App', category: 'Text Tools', icon: 'StickyNote', description: 'Simple note-taking application', acceptedTypes: [] },
    'keyword-generator': { name: 'Keyword Generator', category: 'Text Tools', icon: 'Hash', description: 'Generate relevant keywords for content', acceptedTypes: [] },
    'keyword-density': { name: 'Keyword Density Analyzer', category: 'Text Tools', icon: 'Target', description: 'Analyze keyword density in text', acceptedTypes: ['.txt'] },
    'hashtag-generator': { name: 'Hashtag Generator', category: 'Text Tools', icon: 'Hash', description: 'Generate trending hashtags for social media', acceptedTypes: [] },
    'password-generator': { name: 'Password Generator & Strength Checker', category: 'Text Tools', icon: 'Shield', description: 'Generate secure passwords and check strength', acceptedTypes: [] },
    'html-formatter': { name: 'HTML Formatter', category: 'Text Tools', icon: 'Code', description: 'Format and beautify HTML code', acceptedTypes: ['.html'] },
    'minify-css-js': { name: 'Minify CSS/JS', category: 'Text Tools', icon: 'Minimize', description: 'Minify CSS and JavaScript files', acceptedTypes: ['.css', '.js'] },
    'text-case': { name: 'Convert Text Case', category: 'Text Tools', icon: 'Type', description: 'Convert text between different cases', acceptedTypes: [] },
    'remove-duplicates': { name: 'Remove Duplicate Lines', category: 'Text Tools', icon: 'Layers', description: 'Remove duplicate lines from text', acceptedTypes: ['.txt'] },
    'regex-tester': { name: 'Online Regex Tester', category: 'Text Tools', icon: 'Search', description: 'Test and debug regular expressions', acceptedTypes: [] },

    // SEO & Web Tools (12 tools)
    'xml-sitemap': { name: 'XML Sitemap Generator', category: 'SEO Tools', icon: 'Sitemap', description: 'Generate XML sitemaps for websites', acceptedTypes: [] },
    'robots-txt': { name: 'Robots.txt Generator', category: 'SEO Tools', icon: 'Bot', description: 'Create robots.txt files for SEO', acceptedTypes: [] },
    'seo-analyzer': { name: 'SEO Analyzer', category: 'SEO Tools', icon: 'TrendingUp', description: 'Analyze website SEO performance', acceptedTypes: [] },
    'meta-tag-generator': { name: 'Meta Tag Generator', category: 'SEO Tools', icon: 'Tags', description: 'Generate meta tags for web pages', acceptedTypes: [] },
    'page-speed': { name: 'Page Speed Tester', category: 'SEO Tools', icon: 'Zap', description: 'Test website loading speed', acceptedTypes: [] },
    'utm-generator': { name: 'UTM Link Generator', category: 'SEO Tools', icon: 'Link', description: 'Generate UTM tracking parameters', acceptedTypes: [] },
    'broken-link': { name: 'Broken Link Checker', category: 'SEO Tools', icon: 'AlertTriangle', description: 'Find and fix broken links', acceptedTypes: [] },
    'schema-markup': { name: 'Schema Markup Generator', category: 'SEO Tools', icon: 'Code2', description: 'Generate structured data markup', acceptedTypes: [] },
    'favicon-generator': { name: 'Favicon Generator', category: 'SEO Tools', icon: 'Star', description: 'Create favicons for websites', acceptedTypes: ['.png', '.jpg'] },
    'og-previewer': { name: 'Open Graph Meta Previewer', category: 'SEO Tools', icon: 'Share', description: 'Preview social media sharing cards', acceptedTypes: [] },
    'ssl-checker': { name: 'SSL Checker', category: 'SEO Tools', icon: 'Shield', description: 'Check SSL certificate status', acceptedTypes: [] },

    // Converters & Calculators (12 tools)
    'currency-converter': { name: 'Currency Converter', category: 'Calculators', icon: 'DollarSign', description: 'Convert between different currencies', acceptedTypes: [] },
    'bmi-calculator': { name: 'BMI Calculator', category: 'Calculators', icon: 'Activity', description: 'Calculate Body Mass Index', acceptedTypes: [] },
    'age-calculator': { name: 'Age Calculator', category: 'Calculators', icon: 'Calendar', description: 'Calculate age and time differences', acceptedTypes: [] },
    'compound-interest': { name: 'Compound Interest Calculator', category: 'Calculators', icon: 'TrendingUp', description: 'Calculate compound interest returns', acceptedTypes: [] },
    'unit-converter': { name: 'Unit Converter', category: 'Calculators', icon: 'Move', description: 'Convert between different units', acceptedTypes: [] },
    'speech-to-text': { name: 'Speech to Text Converter', category: 'Converters', icon: 'Mic', description: 'Convert speech to text', acceptedTypes: ['.mp3', '.wav'] },
    'text-to-speech': { name: 'Text to Speech Tool', category: 'Converters', icon: 'Volume2', description: 'Convert text to speech audio', acceptedTypes: ['.txt'] },
    'loan-calculator': { name: 'Loan EMI Calculator', category: 'Calculators', icon: 'CreditCard', description: 'Calculate loan EMI payments', acceptedTypes: [] },
    'percentage-calculator': { name: 'Percentage Calculator', category: 'Calculators', icon: 'Percent', description: 'Calculate percentages and ratios', acceptedTypes: [] },
    'timezone-converter': { name: 'Time Zone Converter', category: 'Calculators', icon: 'Clock', description: 'Convert time between zones', acceptedTypes: [] },
    'discount-calculator': { name: 'Discount Calculator', category: 'Calculators', icon: 'Tag', description: 'Calculate discounts and savings', acceptedTypes: [] },
    'average-calculator': { name: 'Average Calculator', category: 'Calculators', icon: 'BarChart', description: 'Calculate mean, median, mode', acceptedTypes: [] },

    // CSS & Design Tools (8 tools)
    'css-gradient': { name: 'CSS Gradient Generator', category: 'CSS Tools', icon: 'Palette', description: 'Create CSS gradient effects', acceptedTypes: [] },
    'box-shadow': { name: 'CSS Box Shadow Generator', category: 'CSS Tools', icon: 'Square', description: 'Generate CSS box shadow styles', acceptedTypes: [] },
    'color-picker': { name: 'Color Picker', category: 'CSS Tools', icon: 'Pipette', description: 'Pick and convert colors between formats', acceptedTypes: [] },
    'glassmorphism': { name: 'Glassmorphism Generator', category: 'CSS Tools', icon: 'Circle', description: 'Create glassmorphism effects', acceptedTypes: [] },
    'neumorphism': { name: 'Neumorphism Generator', category: 'CSS Tools', icon: 'Layers', description: 'Generate neumorphism styles', acceptedTypes: [] },
    'border-radius': { name: 'Border Radius Generator', category: 'CSS Tools', icon: 'Square', description: 'Create custom border radius styles', acceptedTypes: [] },
    'css-animation': { name: 'CSS Animation Generator', category: 'CSS Tools', icon: 'Play', description: 'Create CSS animations and keyframes', acceptedTypes: [] },
    'font-pairing': { name: 'Font Pairing Tool', category: 'CSS Tools', icon: 'Type', description: 'Find perfect font combinations', acceptedTypes: [] },

    // All-In-One Adobe Converter (1 tool)
    'adobe-converter': { name: 'All Adobe Format Converter', category: 'Converters', icon: 'RefreshCw', description: 'Convert between PDF, PSD, AI, EPS formats', acceptedTypes: ['.pdf', '.psd', '.ai', '.eps'] },

    // Other Tools (15 tools)
    'qr-generator': { name: 'QR Code Generator', category: 'Other Tools', icon: 'QrCode', description: 'Generate QR codes for text or URLs', acceptedTypes: [] },
    'barcode-generator': { name: 'Barcode Generator', category: 'Other Tools', icon: 'ScanLine', description: 'Generate various barcode formats', acceptedTypes: [] },
    'youtube-downloader': { name: 'YouTube Video Downloader', category: 'Other Tools', icon: 'Download', description: 'Download YouTube videos (API based)', acceptedTypes: [] },
    'youtube-tags': { name: 'YouTube Tags Extractor', category: 'Other Tools', icon: 'Tags', description: 'Extract tags from YouTube videos', acceptedTypes: [] },
    'youtube-title': { name: 'YouTube Title Analyzer', category: 'Other Tools', icon: 'BarChart3', description: 'Analyze YouTube video titles', acceptedTypes: [] },
    'instagram-bio': { name: 'Instagram Bio Generator', category: 'Other Tools', icon: 'Instagram', description: 'Generate engaging Instagram bios', acceptedTypes: [] },
    'flipbook-generator': { name: 'Flipbook Generator', category: 'Other Tools', icon: 'Book', description: 'Create digital flipbooks from images', acceptedTypes: ['.jpg', '.png'] },
    'plagiarism-checker': { name: 'Plagiarism Checker', category: 'Other Tools', icon: 'Search', description: 'Check text for plagiarism', acceptedTypes: ['.txt'] },
    'smtp-checker': { name: 'SMTP Mail Checker', category: 'Other Tools', icon: 'Mail', description: 'Test SMTP email configuration', acceptedTypes: [] },
    'speed-test': { name: 'Internet Speed Checker', category: 'Other Tools', icon: 'Wifi', description: 'Test internet connection speed', acceptedTypes: [] },
    'text-font-changer': { name: 'Text Font Changer', category: 'Other Tools', icon: 'Type', description: 'Change text fonts and styles', acceptedTypes: [] }
  };

  useEffect(() => {
    const tool = toolsDatabase?.[toolSlug];
    if (tool) {
      setCurrentTool({ ...tool, slug: toolSlug });
      // Reset states when tool changes
      setFiles([]);
      setResults([]);
      setProgress(0);
      setProcessing(false);
      setActiveTab('upload');
      setConfig({});
    }
  }, [toolSlug]);

  const tabs = [
    { id: 'upload', name: 'Upload/Input', icon: 'Upload' },
    { id: 'processing', name: 'Processing Options', icon: 'Settings' },
    { id: 'preview', name: 'Preview/Results', icon: 'Eye' },
    { id: 'export', name: 'Export/Download', icon: 'Download' }
  ];

  const handleFileUpload = useCallback((uploadedFiles) => {
    setFiles(prev => [...prev, ...uploadedFiles]);
    if (uploadedFiles?.length > 0) {
      setActiveTab('processing');
    }
  }, []);

  const handleFileRemove = useCallback((index) => {
    setFiles(prev => prev?.filter((_, i) => i !== index));
  }, []);

  const startProcessing = useCallback(async () => {
    if (!files?.length && !currentTool?.acceptedTypes?.length === 0) return;

    setProcessing(true);
    setProgress(0);
    setActiveTab('preview');

    try {
      // Simulate processing with progress updates
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Simulate results based on tool type
      const mockResults = files?.map((file, index) => ({
        id: `result-${index}`,
        originalFile: file?.name,
        processedData: `Processed output for ${file?.name}`,
        downloadUrl: URL?.createObjectURL(new Blob(['Sample processed content'], { type: 'text/plain' })),
        format: getOutputFormat(currentTool?.slug),
        size: Math.floor(Math.random() * 1000000) + 100000
      }));

      setResults(mockResults || []);
      setActiveTab('export');

      // Add to history
      setHistory(prev => [{
        id: Date.now(),
        tool: currentTool?.name,
        files: files?.length,
        timestamp: new Date(),
        results: mockResults?.length || 0
      }, ...prev?.slice(0, 9)]);

    } catch (error) {
      console.error('Processing error:', error);
    } finally {
      setProcessing(false);
    }
  }, [files, currentTool]);

  const getOutputFormat = (toolSlug) => {
    const formatMap = {
      'pdf-to-text': 'txt',
      'pdf-to-html': 'html',
      'pdf-to-csv': 'csv',
      'pdf-to-excel': 'xlsx',
      'pdf-to-jpg': 'jpg',
      'image-compressor': 'jpg',
      'json-formatter': 'json'
    };
    return formatMap?.[toolSlug] || 'txt';
  };

  const undoLastAction = () => {
    if (history?.length > 0) {
      // Implement undo functionality
      console.log('Undo last action');
    }
  };

  const redoAction = () => {
    // Implement redo functionality
    console.log('Redo action');
  };

  if (!currentTool) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 lg:pt-18">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <Icon name="AlertCircle" size={48} className="text-warning mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Tool Not Found</h2>
              <p className="text-muted-foreground">The requested tool could not be loaded.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 lg:pt-18">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <BreadcrumbNavigation />
        </div>

        {/* Tool Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="glass-card p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 gradient-primary rounded-xl flex items-center justify-center">
                  <Icon name={currentTool?.icon} size={24} color="white" className="lg:w-8 lg:h-8" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{currentTool?.name}</h1>
                  <p className="text-muted-foreground mt-1">{currentTool?.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">{currentTool?.category}</span>
                    {processing && <ProgressIndicator progress={progress} />}
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={undoLastAction}
                  disabled={history?.length === 0}
                  iconName="Undo"
                  className="hidden lg:flex"
                >
                  Undo
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={redoAction}
                  iconName="Redo"
                  className="hidden lg:flex"
                >
                  Redo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBatchMode(!batchMode)}
                  iconName={batchMode ? "Layers" : "FileStack"}
                >
                  {batchMode ? 'Batch Mode' : 'Single Mode'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Interface */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Workspace */}
            <div className="lg:col-span-3">
              {/* Tab Navigation */}
              <div className="glass-card mb-6">
                <div className="border-b border-white/10">
                  <nav className="flex space-x-8 px-6 py-4 overflow-x-auto">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                          activeTab === tab?.id
                            ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-white/5'
                        }`}
                      >
                        <Icon name={tab?.icon} size={16} />
                        <span>{tab?.name}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'upload' && (
                    <FileUploadZone
                      tool={currentTool}
                      files={files}
                      onFileUpload={handleFileUpload}
                      onFileRemove={handleFileRemove}
                      batchMode={batchMode}
                    />
                  )}

                  {activeTab === 'processing' && (
                    <ProcessingInterface
                      tool={currentTool}
                      config={config}
                      onConfigChange={setConfig}
                      onStartProcessing={startProcessing}
                      processing={processing}
                      files={files}
                      batchMode={batchMode}
                    />
                  )}

                  {activeTab === 'preview' && (
                    <PreviewPane
                      tool={currentTool}
                      files={files}
                      results={results}
                      processing={processing}
                      progress={progress}
                    />
                  )}

                  {activeTab === 'export' && (
                    <OutputSection
                      tool={currentTool}
                      results={results}
                      onDownload={(result) => {
                        const link = document.createElement('a');
                        link.href = result?.downloadUrl;
                        link.download = `${result?.originalFile}.${result?.format}`;
                        link?.click();
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Batch Processor (when enabled) */}
              {batchMode && (
                <BatchProcessor
                  tool={currentTool}
                  files={files}
                  config={config}
                  onBatchProcess={startProcessing}
                  processing={processing}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Tool Configuration Panel */}
              <ToolConfigPanel
                tool={currentTool}
                config={config}
                onConfigChange={setConfig}
              />

              {/* Processing Queue */}
              {history?.length > 0 && (
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {history?.map((item) => (
                      <div key={item?.id} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
                        <Icon name="Clock" size={14} className="text-muted-foreground" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">{item?.tool}</p>
                          <p className="text-xs text-muted-foreground">
                            {item?.files} files • {item?.results} results
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Privacy Notice */}
              <div className="glass-card p-6 border-success/20">
                <div className="flex items-center space-x-3 mb-3">
                  <Icon name="Shield" size={20} className="text-success" />
                  <h3 className="text-sm font-semibold text-foreground">Privacy First</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All processing happens locally in your browser. Your files never leave your device, ensuring complete privacy and security.
                </p>
              </div>

              {/* Tool Statistics */}
              <div className="glass-card p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Tool Performance</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Success Rate</span>
                    <span className="text-xs font-medium text-success">99.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Avg. Process Time</span>
                    <span className="text-xs font-medium text-foreground">2.3s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Files Processed</span>
                    <span className="text-xs font-medium text-foreground">{files?.length || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedToolInterface;