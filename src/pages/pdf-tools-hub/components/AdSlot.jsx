import React from 'react';
import Icon from 'components/AppIcon';

const AdSlot = ({ type = "banner", className = "" }) => {
  const adContent = {
    banner: {
      title: "Boost Your PDF Workflow",
      description: "Premium PDF tools with advanced features, batch processing, and priority support.",
      cta: "Upgrade to Pro",
      icon: "Zap"
    },
    card: {
      title: "Need More Power?",
      description: "Unlock unlimited conversions and advanced PDF editing features.",
      cta: "Try Premium",
      icon: "Crown"
    }
  };

  const content = adContent?.[type] || adContent?.banner;

  if (type === "banner") {
    return (
      <div className={`${className}`}>
        <div className="glass-card p-6 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={content?.icon} size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {content?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {content?.description}
                </p>
              </div>
            </div>
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/80 transition-colors duration-200">
              {content?.cta}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="glass-card p-4 rounded-lg border border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 text-center">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
          <Icon name={content?.icon} size={18} className="text-primary" />
        </div>
        <h4 className="font-semibold text-foreground mb-2">
          {content?.title}
        </h4>
        <p className="text-xs text-muted-foreground mb-3">
          {content?.description}
        </p>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/80 transition-colors duration-200">
          {content?.cta}
        </button>
      </div>
    </div>
  );
};

export default AdSlot;