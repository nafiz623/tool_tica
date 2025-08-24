import React from 'react';
import Icon from 'components/AppIcon';

const UsageStatistics = ({ totalTools, totalUsage, averageRating, popularTool }) => {
  const formatUsageCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000)?.toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000)?.toFixed(1)}K`;
    }
    return count?.toString();
  };

  const statistics = [
    {
      icon: 'FileText',
      value: totalTools,
      label: 'PDF Tools Available',
      color: 'text-red-400'
    },
    {
      icon: 'Users',
      value: `${formatUsageCount(totalUsage)}+`,
      label: 'Total Tool Usage',
      color: 'text-blue-400'
    },
    {
      icon: 'Star',
      value: `${averageRating}★`,
      label: 'Average Rating',
      color: 'text-yellow-400'
    },
    {
      icon: 'TrendingUp',
      value: popularTool?.name?.split(' ')?.slice(0, 2)?.join(' ') || 'PDF to Text',
      label: 'Most Popular Tool',
      color: 'text-green-400'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statistics?.map((stat, index) => (
          <div
            key={index}
            className="glass-card p-6 rounded-xl text-center hover:shadow-elevation-1 transition-all duration-200 group"
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 ${stat?.color} bg-current/10 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-200`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {stat?.value}
            </div>
            <div className="text-sm text-muted-foreground">
              {stat?.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UsageStatistics;