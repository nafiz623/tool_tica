import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VersionHistory = ({ className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const versions = [
    {
      id: 1,
      version: '2.1',
      date: '2024-08-20',
      changes: [
        'Updated third-party service disclosures',
        'Enhanced GDPR compliance section',
        'Added new cookie categories'
      ],
      isCurrent: true
    },
    {
      id: 2,
      version: '2.0',
      date: '2024-06-15',
      changes: [
        'Major restructure for better readability',
        'Added client-side processing guarantees',
        'Updated data retention policies'
      ],
      isCurrent: false
    },
    {
      id: 3,
      version: '1.5',
      date: '2024-03-10',
      changes: [
        'Added Google AdSense privacy disclosures',
        'Updated contact information',
        'Enhanced user rights section'
      ],
      isCurrent: false
    },
    {
      id: 4,
      version: '1.0',
      date: '2024-01-01',
      changes: [
        'Initial privacy policy publication',
        'Basic GDPR compliance framework',
        'Core data handling practices'
      ],
      isCurrent: false
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`glass-card rounded-xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="History" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Version History</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="transition-transform duration-200"
          />
        </Button>
      </div>
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="px-2 py-1 bg-success/20 text-success text-xs font-medium rounded-full">
            Current
          </span>
          <span className="text-sm font-medium text-foreground">Version 2.1</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Last updated: {formatDate('2024-08-20')}
        </p>
      </div>
      {isExpanded && (
        <div className="space-y-4 border-t border-white/10 pt-6">
          {versions?.map((version) => (
            <div key={version?.id} className="relative">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className={`w-3 h-3 rounded-full ${
                    version?.isCurrent ? 'bg-success' : 'bg-muted-foreground'
                  }`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-foreground">
                      Version {version?.version}
                    </span>
                    {version?.isCurrent && (
                      <span className="px-2 py-0.5 bg-success/20 text-success text-xs font-medium rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {formatDate(version?.date)}
                  </p>
                  <ul className="space-y-1">
                    {version?.changes?.map((change, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Icon name="ArrowRight" size={12} className="text-accent mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {version?.id !== versions?.length && (
                <div className="absolute left-1.5 top-8 w-px h-8 bg-white/10"></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VersionHistory;