import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const CategoryHero = ({ 
  category, 
  description, 
  toolCount, 
  totalUsage, 
  averageRating 
}) => {
  const formatUsageCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000)?.toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000)?.toFixed(1)}K`;
    }
    return count?.toString();
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-primary opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-purple-500/10 to-blue-500/10"></div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 glass-card rounded-2xl mb-6">
            <Icon name="FileText" size={32} className="text-red-400 lg:w-10 lg:h-10" />
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4">
            <span className="gradient-primary bg-clip-text text-transparent">
              {category}
            </span>
            <span className="block text-2xl lg:text-4xl font-semibold text-muted-foreground mt-2">
              Hub
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {description}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <div className="glass-card p-6 rounded-xl">
              <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                {toolCount}
              </div>
              <div className="text-sm text-muted-foreground">
                PDF Tools
              </div>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                {formatUsageCount(totalUsage)}+
              </div>
              <div className="text-sm text-muted-foreground">
                Total Uses
              </div>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1 flex items-center justify-center">
                <Icon name="Star" size={20} className="text-warning mr-1" />
                {averageRating}
              </div>
              <div className="text-sm text-muted-foreground">
                Avg Rating
              </div>
            </div>
          </div>

          {/* Privacy Message */}
          <div className="glass-card p-4 rounded-lg max-w-md mx-auto mb-8">
            <div className="flex items-center justify-center space-x-2 text-sm text-success">
              <Icon name="Shield" size={16} />
              <span>All processing happens in your browser - Privacy First</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              className="px-8"
            >
              <Icon name="Zap" size={18} className="mr-2" />
              Browse All Tools
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8"
            >
              <Icon name="BookOpen" size={18} className="mr-2" />
              View Documentation
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <div className="w-20 h-20 gradient-primary rounded-full blur-xl"></div>
      </div>
      <div className="absolute bottom-10 right-10 opacity-20">
        <div className="w-32 h-32 gradient-primary rounded-full blur-2xl"></div>
      </div>
    </section>
  );
};

export default CategoryHero;