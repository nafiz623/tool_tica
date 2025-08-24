import React from 'react';
import ToolCard from '../../../components/ui/ToolCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';



const ToolGrid = ({ tools, viewMode, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)]?.map((_, index) => (
          <div key={index} className="glass-card p-6 animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-6 h-6 bg-surface rounded"></div>
              <div className="h-4 bg-surface rounded flex-1"></div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-surface rounded"></div>
              <div className="h-3 bg-surface rounded w-3/4"></div>
            </div>
            <div className="flex space-x-2 mb-4">
              <div className="h-6 bg-surface rounded w-16"></div>
              <div className="h-6 bg-surface rounded w-12"></div>
            </div>
            <div className="h-10 bg-surface rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (tools?.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-surface/50 rounded-full flex items-center justify-center">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No tools found</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          We couldn't find any tools matching your current filters. Try adjusting your search criteria.
        </p>
        <Button variant="outline" onClick={() => window.location?.reload()}>
          Reset Filters
        </Button>
      </div>
    );
  }

  const gridClasses = {
    grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
    list: "space-y-4"
  };

  return (
    <div className={gridClasses?.[viewMode]}>
      {tools?.map((tool, index) => (
        <div key={tool?.id} className={viewMode === 'list' ? 'w-full' : ''}>
          <ToolCard 
            tool={tool} 
            variant={viewMode === 'list' ? 'compact' : 'default'}
            showCategory={false}
            className={`h-full ${index % 5 === 4 ? 'lg:col-span-2' : ''}`}
            onToolClick={() => {}}
          />
        </div>
      ))}
    </div>
  );
};

export default ToolGrid;