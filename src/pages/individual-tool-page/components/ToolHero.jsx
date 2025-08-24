import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ToolHero = ({ tool, onGetStarted }) => {
  const defaultTool = {
    name: 'PDF to Text Converter',
    description: 'Extract text from PDF documents instantly with our privacy-first converter. No uploads required - all processing happens in your browser.',
    category: 'PDF Tools',
    features: [
      'Client-side processing',
      'No data uploads',
      'Instant conversion',
      'Multiple formats supported'
    ],
    icon: 'FileText',
    isPremium: false,
    isNew: false
  };

  const toolData = { ...defaultTool, ...tool };

  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-primary opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Category & Status */}
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
              <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full">
                {toolData?.category}
              </span>
              {toolData?.isNew && (
                <span className="px-3 py-1 bg-success/20 text-success text-sm font-medium rounded-full">
                  New
                </span>
              )}
              {toolData?.isPremium && (
                <span className="px-3 py-1 bg-warning/20 text-warning text-sm font-medium rounded-full">
                  Premium
                </span>
              )}
            </div>

            {/* Tool Name */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {toolData?.name}
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto lg:mx-0">
              {toolData?.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {toolData?.features?.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button
              variant="default"
              size="lg"
              onClick={onGetStarted}
              className="gradient-primary text-white hover:opacity-90 transition-opacity duration-200"
            >
              <Icon name="Play" size={20} className="mr-2" />
              Get Started
            </Button>

            {/* Privacy Notice */}
            <div className="flex items-center justify-center lg:justify-start space-x-2 mt-4 text-sm text-muted-foreground">
              <Icon name="Shield" size={16} className="text-success" />
              <span>100% Private - No data leaves your device</span>
            </div>
          </div>

          {/* Visual Element */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main Icon Container */}
              <div className="w-48 h-48 lg:w-64 lg:h-64 glass-card rounded-3xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 gradient-primary opacity-20 animate-pulse"></div>
                <Icon 
                  name={toolData?.icon} 
                  size={80} 
                  className="text-primary relative z-10" 
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 glass-card rounded-xl flex items-center justify-center animate-bounce">
                <Icon name="Zap" size={24} className="text-warning" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-16 h-16 glass-card rounded-xl flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s' }}>
                <Icon name="Lock" size={24} className="text-success" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolHero;