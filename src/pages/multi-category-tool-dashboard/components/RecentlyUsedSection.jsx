import React from 'react';
import Icon from 'components/AppIcon';
import ToolCard from 'components/ui/ToolCard';
import Button from 'components/ui/Button';

const RecentlyUsedSection = ({ tools, onToolClick }) => {
  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-white/5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Recently Used</h2>
          <p className="text-sm text-muted-foreground">
            Quick access to your most recent tools
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-primary/80"
        >
          <Icon name="History" size={16} className="mr-2" />
          View All History
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools?.map((tool) => (
          <div key={tool?.id} className="relative">
            <ToolCard
              tool={tool}
              variant="compact"
              onToolClick={onToolClick}
              showStats={false}
            />
            {/* Last Used Badge */}
            <div className="absolute -top-2 -right-2">
              <div className="glass-card px-2 py-1 rounded-full">
                <span className="text-xs text-muted-foreground">
                  {formatTimeAgo(tool?.lastUsed)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {tools?.length === 0 && (
        <div className="text-center py-12">
          <div className="mb-4">
            <Icon name="Clock" size={48} className="mx-auto text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No Recent Activity</h3>
          <p className="text-muted-foreground mb-4">
            Start using tools to see your recent activity here
          </p>
          <Button variant="outline">
            <Icon name="Search" size={16} className="mr-2" />
            Browse All Tools
          </Button>
        </div>
      )}
    </section>
  );
};

export default RecentlyUsedSection;