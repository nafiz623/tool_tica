import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import AdSlot from './AdSlot';

const Sidebar = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  recentTools,
  popularTools 
}) => {
  return (
    <div className="hidden lg:block w-80 space-y-6">
      {/* Categories Navigation */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Grid3X3" size={20} className="mr-2" />
          All Categories
        </h3>
        <div className="space-y-2">
          {categories?.map((category) => (
            <button
              key={category?.slug}
              onClick={() => onCategoryChange(category?.slug)}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                selectedCategory === category?.slug
                  ? 'bg-primary/10 text-primary border border-primary/20' :'hover:bg-white/5 text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name={category?.icon} 
                  size={18} 
                  className={selectedCategory === category?.slug ? 'text-primary' : category?.color}
                />
                <div>
                  <div className="text-sm font-medium">{category?.name}</div>
                  <div className="text-xs opacity-70">{category?.description}</div>
                </div>
              </div>
              <div className="text-xs font-medium">
                {category?.toolCount}
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Recent Tools */}
      {recentTools && recentTools?.length > 0 && (
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Clock" size={20} className="mr-2" />
            Recently Used
          </h3>
          <div className="space-y-3">
            {recentTools?.slice(0, 5)?.map((tool) => (
              <div key={tool?.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors duration-200">
                <Icon name={tool?.icon} size={16} className="text-accent" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {tool?.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {tool?.category}
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Icon name="ExternalLink" size={12} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Popular Tools */}
      {popularTools && popularTools?.length > 0 && (
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Icon name="TrendingUp" size={20} className="mr-2" />
            Popular Tools
          </h3>
          <div className="space-y-3">
            {popularTools?.slice(0, 5)?.map((tool, index) => (
              <div key={tool?.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors duration-200">
                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded text-white text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </div>
                <Icon name={tool?.icon} size={16} className="text-accent" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {tool?.name}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center space-x-2">
                    <span>{tool?.category}</span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Users" size={10} />
                      <span>{tool?.usageCount > 1000 ? `${(tool?.usageCount / 1000)?.toFixed(1)}K` : tool?.usageCount}</span>
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Icon name="ExternalLink" size={12} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Advertisement */}
      <AdSlot type="sidebar" position="sidebar" size="sidebar" />
      {/* Quick Actions */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Zap" size={20} className="mr-2" />
          Quick Actions
        </h3>
        <div className="space-y-2">
          <Button variant="outline" fullWidth className="justify-start">
            <Icon name="Bookmark" size={16} className="mr-2" />
            View Bookmarks
          </Button>
          <Button variant="outline" fullWidth className="justify-start">
            <Icon name="Download" size={16} className="mr-2" />
            Export Tool List
          </Button>
          <Button variant="outline" fullWidth className="justify-start">
            <Icon name="Share2" size={16} className="mr-2" />
            Share Category
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;