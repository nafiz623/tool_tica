import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const CookieSettings = ({ className = "" }) => {
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: false,
    advertising: false,
    functional: false
  });

  const cookieCategories = [
    {
      id: 'necessary',
      name: 'Necessary Cookies',
      description: 'Essential for the website to function properly. These cannot be disabled.',
      required: true,
      examples: ['Session management', 'Security tokens', 'Language preferences']
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website.',
      required: false,
      examples: ['Google Analytics', 'Usage statistics', 'Performance metrics']
    },
    {
      id: 'advertising',
      name: 'Advertising Cookies',
      description: 'Used to deliver relevant advertisements and measure campaign effectiveness.',
      required: false,
      examples: ['Google AdSense', 'Ad personalization', 'Conversion tracking']
    },
    {
      id: 'functional',
      name: 'Functional Cookies',
      description: 'Enable enhanced functionality and personalization features.',
      required: false,
      examples: ['Theme preferences', 'Tool favorites', 'User interface settings']
    }
  ];

  const handleCookieChange = (categoryId, checked) => {
    setCookiePreferences(prev => ({
      ...prev,
      [categoryId]: checked
    }));
  };

  const handleSavePreferences = () => {
    // Save preferences to localStorage
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    
    // Show success message (in a real app, you might use a toast notification)
    alert('Cookie preferences saved successfully!');
  };

  const handleAcceptAll = () => {
    const allAccepted = Object.keys(cookiePreferences)?.reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setCookiePreferences(allAccepted);
  };

  const handleRejectAll = () => {
    setCookiePreferences({
      necessary: true, // Always required
      analytics: false,
      advertising: false,
      functional: false
    });
  };

  return (
    <div className={`glass-card rounded-xl p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Cookie" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Cookie Settings</h3>
      </div>
      <p className="text-muted-foreground mb-6 leading-relaxed">
        We use cookies to enhance your experience on our website. You can customize your 
        cookie preferences below. Note that disabling certain cookies may impact website functionality.
      </p>
      <div className="space-y-6">
        {cookieCategories?.map((category) => (
          <div key={category?.id} className="p-4 bg-surface/30 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-sm font-medium text-foreground">{category?.name}</h4>
                  {category?.required && (
                    <span className="px-2 py-0.5 bg-warning/20 text-warning text-xs font-medium rounded-full">
                      Required
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{category?.description}</p>
                <div className="flex flex-wrap gap-1">
                  {category?.examples?.map((example, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-surface/50 text-muted-foreground text-xs rounded-md"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
              <div className="ml-4">
                <Checkbox
                  checked={cookiePreferences?.[category?.id]}
                  onChange={(e) => handleCookieChange(category?.id, e?.target?.checked)}
                  disabled={category?.required}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-white/10">
        <Button
          variant="default"
          onClick={handleSavePreferences}
          className="flex-1"
        >
          <Icon name="Save" size={16} className="mr-2" />
          Save Preferences
        </Button>
        <Button
          variant="outline"
          onClick={handleAcceptAll}
          className="flex-1"
        >
          Accept All
        </Button>
        <Button
          variant="ghost"
          onClick={handleRejectAll}
          className="flex-1"
        >
          Reject All
        </Button>
      </div>
    </div>
  );
};

export default CookieSettings;