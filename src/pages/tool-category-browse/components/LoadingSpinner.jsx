import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingSpinner = ({ message = "Loading tools..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        
        {/* Inner icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon name="Tool" size={24} className="text-primary" />
        </div>
      </div>
      
      <p className="text-muted-foreground mt-4 text-sm">{message}</p>
    </div>
  );
};

export default LoadingSpinner;