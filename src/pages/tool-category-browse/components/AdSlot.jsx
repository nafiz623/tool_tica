import React from 'react';
import Icon from '../../../components/AppIcon';

const AdSlot = ({ 
  type = 'banner', 
  position = 'between-tools',
  className = "",
  size = 'medium'
}) => {
  const adSizes = {
    small: { width: '300px', height: '100px' },
    medium: { width: '728px', height: '90px' },
    large: { width: '970px', height: '250px' },
    sidebar: { width: '300px', height: '600px' },
    square: { width: '300px', height: '300px' }
  };

  const currentSize = adSizes?.[size] || adSizes?.medium;

  const adContent = {
    'between-tools': {
      title: 'Sponsored Tools',
      description: 'Discover premium tools to boost your productivity'
    },
    'sidebar': {
      title: 'Featured Tools',
      description: 'Professional tools for advanced users'
    },
    'footer': {
      title: 'Partner Tools',
      description: 'Recommended by our community'
    }
  };

  const content = adContent?.[position] || adContent?.['between-tools'];

  return (
    <div className={`glass-card border-2 border-dashed border-white/20 ${className}`}>
      <div 
        className="flex flex-col items-center justify-center p-6 text-center"
        style={{ 
          minWidth: currentSize?.width, 
          minHeight: currentSize?.height,
          maxWidth: '100%'
        }}
      >
        {/* Ad Icon */}
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-3">
          <Icon name="Zap" size={24} color="white" />
        </div>

        {/* Ad Content */}
        <h3 className="text-sm font-semibold text-foreground mb-1">
          {content?.title}
        </h3>
        <p className="text-xs text-muted-foreground mb-4 max-w-xs">
          {content?.description}
        </p>

        {/* Ad Placeholder */}
        <div className="text-xs text-muted-foreground/60 font-mono">
          Advertisement Space
        </div>
        <div className="text-xs text-muted-foreground/40 font-mono mt-1">
          {currentSize?.width} × {currentSize?.height}
        </div>
      </div>
    </div>
  );
};

export default AdSlot;