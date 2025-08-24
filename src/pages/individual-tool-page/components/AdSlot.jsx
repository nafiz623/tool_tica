import React from 'react';
import Icon from '../../../components/AppIcon';

const AdSlot = ({ 
  slot = "sidebar", 
  className = "",
  showLabel = false 
}) => {
  const adSlots = {
    sidebar: {
      width: "300px",
      height: "250px",
      title: "Advertisement"
    },
    banner: {
      width: "100%",
      height: "90px",
      title: "Sponsored"
    },
    inline: {
      width: "100%",
      height: "200px",
      title: "Advertisement"
    },
    footer: {
      width: "100%",
      height: "120px",
      title: "Sponsored Content"
    }
  };

  const currentSlot = adSlots?.[slot] || adSlots?.sidebar;

  return (
    <div 
      className={`glass-card border border-white/10 flex flex-col items-center justify-center text-center ${className}`}
      style={{ 
        width: currentSlot?.width,
        height: currentSlot?.height,
        minHeight: currentSlot?.height
      }}
    >
      {showLabel && (
        <div className="text-xs text-muted-foreground mb-2 font-medium">
          {currentSlot?.title}
        </div>
      )}
      <div className="flex flex-col items-center space-y-2 opacity-50">
        <Icon name="Image" size={32} className="text-muted-foreground" />
        <div className="text-xs text-muted-foreground">
          Ad Space
        </div>
        <div className="text-xs text-muted-foreground/70">
          {currentSlot?.width} × {currentSlot?.height}
        </div>
      </div>
    </div>
  );
};

export default AdSlot;