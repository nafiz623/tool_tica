import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const WorkflowSuggestions = () => {
  const workflows = [
    {
      id: 1,
      title: 'Complete PDF Workflow',
      description: 'Convert, edit, and optimize PDF documents with our comprehensive PDF suite',
      steps: [
        { tool: 'PDF to Text', action: 'Extract text content' },
        { tool: 'Text Case Converter', action: 'Format extracted text' },
        { tool: 'Text to PDF', action: 'Create new formatted PDF' },
        { tool: 'Compress PDF', action: 'Optimize file size' }
      ],
      category: 'PDF Processing',
      icon: 'FileText',
      color: 'text-red-400',
      estimatedTime: '5-10 minutes'
    },
    {
      id: 2,
      title: 'Image Optimization Pipeline',
      description: 'Optimize images for web with the perfect compression and format conversion',
      steps: [
        { tool: 'Image Resizer', action: 'Resize to target dimensions' },
        { tool: 'Image Compressor', action: 'Reduce file size' },
        { tool: 'WebP Converter', action: 'Convert to WebP format' },
        { tool: 'SEO Analyzer', action: 'Check image SEO impact' }
      ],
      category: 'Web Optimization',
      icon: 'Image',
      color: 'text-green-400',
      estimatedTime: '3-7 minutes'
    },
    {
      id: 3,
      title: 'Content Creation Workflow',
      description: 'Create and optimize content for websites with SEO and formatting tools',
      steps: [
        { tool: 'Lorem Ipsum Generator', action: 'Generate placeholder text' },
        { tool: 'Text Case Converter', action: 'Format headings and content' },
        { tool: 'Meta Tag Generator', action: 'Create SEO meta tags' },
        { tool: 'Open Graph Previewer', action: 'Preview social sharing' }
      ],
      category: 'Content & SEO',
      icon: 'Type',
      color: 'text-blue-400',
      estimatedTime: '10-15 minutes'
    },
    {
      id: 4,
      title: 'Developer Toolkit',
      description: 'Format, validate, and generate code snippets with developer-focused tools',
      steps: [
        { tool: 'JSON Formatter', action: 'Format API responses' },
        { tool: 'HTML Formatter', action: 'Clean HTML code' },
        { tool: 'CSS Gradient Generator', action: 'Create visual effects' },
        { tool: 'QR Code Generator', action: 'Generate testing QR codes' }
      ],
      category: 'Development',
      icon: 'Code',
      color: 'text-purple-400',
      estimatedTime: '5-12 minutes'
    }
  ];

  const WorkflowCard = ({ workflow }) => (
    <div className="glass-card p-6 rounded-xl hover:shadow-elevation-2 transition-all duration-200 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 ${workflow?.color} bg-current/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
            <Icon name={workflow?.icon} size={20} className={workflow?.color} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
              {workflow?.title}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`text-xs font-medium ${workflow?.color}`}>
                {workflow?.category}
              </span>
              <span className="w-px h-3 bg-border"></span>
              <span className="text-xs text-muted-foreground">
                {workflow?.estimatedTime}
              </span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Icon name="BookmarkPlus" size={16} />
        </Button>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4">
        {workflow?.description}
      </p>

      {/* Steps */}
      <div className="space-y-3 mb-6">
        {workflow?.steps?.map((step, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-medium">
              {index + 1}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">
                {step?.tool}
              </div>
              <div className="text-xs text-muted-foreground">
                {step?.action}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3">
        <Button variant="outline" size="sm" fullWidth>
          <Icon name="Play" size={14} className="mr-2" />
          Start Workflow
        </Button>
        <Button variant="ghost" size="sm">
          <Icon name="Share2" size={14} />
        </Button>
      </div>
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 glass-card rounded-2xl mb-4">
          <Icon name="GitBranch" size={24} className="text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Suggested Workflows
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Discover powerful tool combinations that work together to streamline your most common tasks
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        {workflows?.map((workflow) => (
          <WorkflowCard key={workflow?.id} workflow={workflow} />
        ))}
      </div>

      {/* Create Custom Workflow CTA */}
      <div className="text-center">
        <div className="glass-card p-8 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="mb-4">
            <Icon name="Plus" size={32} className="mx-auto text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-3">
            Create Your Own Workflow
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Combine any tools to create personalized workflows that match your specific needs and save time on repetitive tasks.
          </p>
          <Button variant="primary" size="lg">
            <Icon name="Wand2" size={18} className="mr-2" />
            Build Custom Workflow
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSuggestions;