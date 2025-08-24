import React from 'react';
import Icon from '../../../components/AppIcon';

const PrivacyHighlight = ({ 
  title, 
  description, 
  icon = "Shield", 
  variant = "primary",
  className = "" 
}) => {
  const variantStyles = {
    primary: 'bg-primary/10 border-primary/30 text-primary',
    success: 'bg-success/10 border-success/30 text-success',
    warning: 'bg-warning/10 border-warning/30 text-warning',
    accent: 'bg-accent/10 border-accent/30 text-accent'
  };

  return (
    <div className={`glass-card rounded-xl p-6 border-2 ${variantStyles?.[variant]} ${className}`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className={`w-12 h-12 rounded-lg ${variantStyles?.[variant]} flex items-center justify-center`}>
            <Icon name={icon} size={24} />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyHighlight;