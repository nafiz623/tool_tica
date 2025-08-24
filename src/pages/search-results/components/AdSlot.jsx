import React from 'react';
import Icon from '../../../components/AppIcon';

const AdSlot = ({ 
  slot = "search-results", 
  size = "banner", 
  className = "",
  showLabel = true 
}) => {
  const adSizes = {
    banner: { width: '100%', height: '90px' },
    rectangle: { width: '300px', height: '250px' },
    leaderboard: { width: '100%', height: '90px' },
    sidebar: { width: '300px', height: '600px' },
    mobile: { width: '100%', height: '50px' }
  };

  const currentSize = adSizes?.[size] || adSizes?.banner;

  // Mock ad content for demonstration
  const mockAds = [
    {
      title: "Premium PDF Tools",
      description: "Unlock advanced PDF features with our premium subscription",
      cta: "Try Free",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=200&fit=crop",
      sponsored: true
    },
    {
      title: "Web Development Course",
      description: "Learn modern web development with hands-on projects",
      cta: "Enroll Now",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
      sponsored: true
    },
    {
      title: "Design Tools Suite",
      description: "Professional design tools for creators and developers",
      cta: "Get Started",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=300&h=200&fit=crop",
      sponsored: true
    }
  ];

  const randomAd = mockAds?.[Math.floor(Math.random() * mockAds?.length)];

  return (
    <div className={`${className}`}>
      {showLabel && (
        <div className="flex items-center space-x-1 mb-2">
          <Icon name="Info" size={12} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Advertisement</span>
        </div>
      )}
      <div 
        className="glass-card rounded-xl overflow-hidden border border-white/5 hover:border-white/10 transition-colors duration-200"
        style={{ 
          width: currentSize?.width, 
          height: currentSize?.height,
          minHeight: currentSize?.height 
        }}
      >
        {size === 'rectangle' || size === 'sidebar' ? (
          // Large ad format with image
          (<div className="h-full flex flex-col">
            <div className="flex-1 relative overflow-hidden">
              <img 
                src={randomAd?.image} 
                alt={randomAd?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  {randomAd?.title}
                </h4>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {randomAd?.description}
                </p>
                <button className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-md hover:bg-primary/90 transition-colors duration-200">
                  {randomAd?.cta}
                </button>
              </div>
            </div>
          </div>)
        ) : (
          // Banner/horizontal ad format
          (<div className="h-full flex items-center p-4">
            <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden mr-4">
              <img 
                src={randomAd?.image} 
                alt={randomAd?.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground mb-1 truncate">
                {randomAd?.title}
              </h4>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                {randomAd?.description}
              </p>
            </div>
            <button className="flex-shrink-0 px-3 py-1 bg-primary text-primary-foreground text-xs rounded-md hover:bg-primary/90 transition-colors duration-200 ml-2">
              {randomAd?.cta}
            </button>
          </div>)
        )}
        
        {/* Sponsored label */}
        <div className="absolute top-2 right-2">
          <span className="px-2 py-0.5 bg-background/80 text-muted-foreground text-xs rounded-full">
            Sponsored
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdSlot;