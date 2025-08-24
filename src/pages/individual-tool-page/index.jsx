import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ToolHero from './components/ToolHero';
import ToolTabs from './components/ToolTabs';
import ToolInterface from './components/ToolInterface';
import DocumentationTab from './components/DocumentationTab';
import FAQTab from './components/FAQTab';
import RelatedToolsTab from './components/RelatedToolsTab';
import AdSlot from './components/AdSlot';
import Icon from '../../components/AppIcon';


const IndividualToolPage = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('tool');
  const [tool, setTool] = useState(null);

  const toolSlug = searchParams?.get('tool');
  const categorySlug = searchParams?.get('category');

  useEffect(() => {
    // Mock tool data based on URL parameters
    const mockTools = {
      'pdf-to-text': {
        id: 1,
        name: 'PDF to Text Converter',
        description: 'Extract text from PDF documents instantly with our privacy-first converter. No uploads required - all processing happens in your browser.',
        category: 'PDF Tools',
        categorySlug: 'pdf-tools',
        slug: 'pdf-to-text',
        icon: 'FileText',
        features: [
          'Client-side processing',
          'No data uploads',
          'Instant conversion',
          'Multiple formats supported'
        ],
        isPremium: false,
        isNew: false
      },
      'text-case-converter': {
        id: 2,
        name: 'Text Case Converter',
        description: 'Convert text between different cases: uppercase, lowercase, title case, and more.',
        category: 'Text Tools',
        categorySlug: 'text-tools',
        slug: 'text-case-converter',
        icon: 'Type',
        features: [
          'Multiple case options',
          'Instant conversion',
          'Preserve formatting',
          'Copy to clipboard'
        ],
        isPremium: false,
        isNew: true
      }
    };

    const currentTool = mockTools?.[toolSlug] || mockTools?.['pdf-to-text'];
    setTool(currentTool);

    // Update document title
    document.title = `${currentTool?.name} - Tool Tica`;
  }, [toolSlug]);

  const handleGetStarted = () => {
    setActiveTab('tool');
    // Scroll to tool interface
    const toolSection = document.getElementById('tool-interface');
    if (toolSection) {
      toolSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'tool':
        return <ToolInterface tool={tool} />;
      case 'documentation':
        return <DocumentationTab tool={tool} />;
      case 'faq':
        return <FAQTab tool={tool} />;
      case 'related':
        return <RelatedToolsTab currentTool={tool} />;
      default:
        return <ToolInterface tool={tool} />;
    }
  };

  if (!tool) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 lg:pt-18">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
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

        {/* Tool Hero Section */}
        <ToolHero tool={tool} onGetStarted={handleGetStarted} />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Tool Area */}
            <div className="lg:col-span-3 space-y-6" id="tool-interface">
              {/* Banner Ad - Mobile */}
              <div className="lg:hidden">
                <AdSlot slot="banner" showLabel className="w-full" />
              </div>

              {/* Tool Tabs and Content */}
              <ToolTabs activeTab={activeTab} onTabChange={setActiveTab}>
                {renderTabContent()}
              </ToolTabs>

              {/* Inline Ad - Between sections */}
              <div className="lg:hidden">
                <AdSlot slot="inline" showLabel className="w-full" />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Sidebar Ad - Desktop */}
              <div className="hidden lg:block sticky top-24">
                <AdSlot slot="sidebar" showLabel />
              </div>

              {/* Tool Info Card - Mobile */}
              <div className="lg:hidden glass-card p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-primary">
                    <Icon name={tool?.icon} size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{tool?.name}</h3>
                    <p className="text-sm text-muted-foreground">{tool?.category}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {tool?.features?.slice(0, 3)?.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={14} className="text-success" />
                      <span className="text-xs text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

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

              {/* Quick Stats */}
              <div className="glass-card p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Tool Statistics</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Total Uses</span>
                    <span className="text-xs font-medium text-foreground">12.5K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Success Rate</span>
                    <span className="text-xs font-medium text-success">99.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Avg. Process Time</span>
                    <span className="text-xs font-medium text-foreground">2.3s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">User Rating</span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} className="text-warning" />
                      <span className="text-xs font-medium text-foreground">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Ad */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <AdSlot slot="footer" showLabel className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default IndividualToolPage;