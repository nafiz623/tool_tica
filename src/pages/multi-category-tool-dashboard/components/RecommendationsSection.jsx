import React from 'react';
import Icon from 'components/AppIcon';
import ToolCard from 'components/ui/ToolCard';

const RecommendationsSection = ({ tools, onToolClick }) => {
  const reasons = [
    'High user rating',
    'Trending now',
    'Frequently used together',
    'Perfect for your workflow',
    'Recently updated',
    'Top rated this month'
  ];

  const getRandomReason = () => {
    return reasons?.[Math.floor(Math.random() * reasons?.length)];
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-white/5">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 glass-card rounded-2xl mb-4">
          <Icon name="Sparkles" size={24} className="text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Recommended for You
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover high-rated tools that are perfect for your workflow and trending among users
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools?.map((tool) => (
          <div key={tool?.id} className="relative group">
            <ToolCard
              tool={tool}
              variant="featured"
              onToolClick={onToolClick}
            />
            {/* Recommendation Badge */}
            <div className="absolute -top-2 -left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="glass-card px-3 py-1 rounded-full bg-gradient-to-r from-primary/80 to-accent/80">
                <div className="flex items-center space-x-1">
                  <Icon name="Sparkles" size={12} className="text-white" />
                  <span className="text-xs text-white font-medium">
                    {getRandomReason()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Personalization Note */}
      <div className="mt-12 text-center">
        <div className="glass-card p-6 rounded-xl max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Icon name="Brain" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Smart Recommendations</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Our AI analyzes usage patterns, ratings, and tool compatibility to suggest the best tools for your needs. 
            The more you use the platform, the better our recommendations become.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RecommendationsSection;