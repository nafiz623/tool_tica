import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const ToolTabs = ({ activeTab, onTabChange, children }) => {
  const tabs = [
    { id: 'tool', label: 'Tool', icon: 'Wrench' },
    { id: 'documentation', label: 'Documentation', icon: 'Book' },
    { id: 'faq', label: 'FAQ', icon: 'HelpCircle' },
    { id: 'related', label: 'Related Tools', icon: 'Grid3X3' }
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="glass-card p-2">
        <div className="flex flex-wrap gap-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="min-h-[400px]">
        {children}
      </div>
    </div>
  );
};

export default ToolTabs;