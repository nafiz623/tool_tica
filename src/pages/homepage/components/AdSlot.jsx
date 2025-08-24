import React, { useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';

const AdSlot = ({ 
  slot = "homepage-banner",
  size = "banner",
  className = "",
  showLabel = true
}) => {
  const adRef = useRef(null);

  const adSizes = {
    banner: { width: '728px', height: '90px' },
    leaderboard: { width: '728px', height: '90px' },
    rectangle: { width: '300px', height: '250px' },
    skyscraper: { width: '160px', height: '600px' },
    mobile: { width: '320px', height: '50px' },
    square: { width: '250px', height: '250px' }
  };

  const currentSize = adSizes?.[size] || adSizes?.banner;

  useEffect(() => {
    // In a real implementation, this would initialize Google AdSense
    // For now, we'll just show a placeholder
    if (adRef?.current) {
      // Simulate ad loading
      const timer = setTimeout(() => {
        if (adRef?.current) {
          adRef?.current?.classList?.add('loaded');
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className={`ad-slot ${className}`}>
      {showLabel && (
        <div className="text-xs text-muted-foreground mb-2 text-center">
          Advertisement
        </div>
      )}
      <div
        ref={adRef}
        className="ad-container bg-surface/30 border border-white/10 rounded-lg flex items-center justify-center relative overflow-hidden"
        style={{
          width: currentSize?.width,
          height: currentSize?.height,
          maxWidth: '100%'
        }}
        data-ad-slot={slot}
        data-ad-size={size}
      >
        {/* Placeholder Content */}
        <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
          <Icon name="Image" size={24} className="opacity-50" />
          <div className="text-xs text-center">
            <div>Ad Space</div>
            <div className="text-xs opacity-70">{currentSize?.width} × {currentSize?.height}</div>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer opacity-0 ad-loading"></div>
      </div>
      <style jsx>{`
        .ad-container:not(.loaded) .ad-loading {
          opacity: 1;
        }
        
        .ad-container.loaded {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .ad-container.loaded::after {
          content: "Sample Ad Content - Privacy-First Tools";
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 500;
          text-align: center;
          padding: 1rem;
        }
        
        .ad-container.loaded > div {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default AdSlot;