import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import { Link } from 'react-router-dom';

const DashboardHero = ({ totalTools, totalCategories, totalUsage, averageRating }) => {
  const formatUsageCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000)?.toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000)?.toFixed(1)}K`;
    }
    return count?.toString();
  };

  const quickCategories = [
    { name: 'PDF Tools', slug: 'pdf-tools', icon: 'FileText', color: 'text-red-400', count: 27 },
    { name: 'Image Tools', slug: 'image-tools', icon: 'Image', color: 'text-green-400', count: 17 },
    { name: 'Text Tools', slug: 'text-tools', icon: 'Type', color: 'text-blue-400', count: 14 },
    { name: 'SEO Tools', slug: 'seo-tools', icon: 'Globe', color: 'text-purple-400', count: 12 }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-surface/70"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center">
          {/* Main Title */}
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            <span className="gradient-primary bg-clip-text text-transparent">
              Multi-Category
            </span>
            <br />
            <span className="text-3xl lg:text-5xl">
              Tool Dashboard
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Your unified workspace for accessing 100+ professional tools across all categories. 
            From PDF processing to image editing, text manipulation to SEO optimization—all in one place.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="glass-card p-6 rounded-xl">
              <div className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                {totalTools}+
              </div>
              <div className="text-sm text-muted-foreground">
                Total Tools
              </div>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <div className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                {totalCategories}
              </div>
              <div className="text-sm text-muted-foreground">
                Categories
              </div>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <div className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                {formatUsageCount(totalUsage)}+
              </div>
              <div className="text-sm text-muted-foreground">
                Total Usage
              </div>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <div className="text-3xl lg:text-4xl font-bold text-foreground mb-2 flex items-center justify-center">
                <Icon name="Star" size={20} className="text-warning mr-1" />
                {averageRating}
              </div>
              <div className="text-sm text-muted-foreground">
                Avg Rating
              </div>
            </div>
          </div>

          {/* Quick Category Access */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Quick Category Access
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {quickCategories?.map((category) => (
                <Link
                  key={category?.slug}
                  to={`/tool-category-browse?category=${category?.slug}`}
                  className="group glass-card p-4 rounded-xl hover:shadow-elevation-2 transition-all duration-200"
                >
                  <div className={`w-10 h-10 ${category?.color} bg-current/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon name={category?.icon} size={20} className={category?.color} />
                  </div>
                  <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                    {category?.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {category?.count} tools
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              className="px-8"
            >
              <Icon name="Search" size={18} className="mr-2" />
              Explore All Tools
            </Button>
            <Link to="/pdf-tools-hub">
              <Button
                variant="outline"
                size="lg"
                className="px-8"
              >
                <Icon name="FileText" size={18} className="mr-2" />
                Browse PDF Hub
              </Button>
            </Link>
          </div>

          {/* Privacy Notice */}
          <div className="mt-8">
            <div className="inline-flex items-center glass-card px-4 py-2 rounded-full text-sm text-success">
              <Icon name="Shield" size={14} className="mr-2" />
              <span>Privacy-first processing • All tools work offline</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardHero;