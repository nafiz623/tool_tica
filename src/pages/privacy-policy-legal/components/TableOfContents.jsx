import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TableOfContents = ({ sections, activeSection, onSectionClick, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSectionClick = (sectionId) => {
    onSectionClick(sectionId);
    if (isMobile) {
      setIsExpanded(false);
    }
  };

  if (isMobile) {
    return (
      <div className={`glass-card rounded-xl mb-8 ${className}`}>
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between p-4"
        >
          <div className="flex items-center space-x-2">
            <Icon name="List" size={18} />
            <span className="font-medium">Table of Contents</span>
          </div>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="transition-transform duration-200"
          />
        </Button>
        {isExpanded && (
          <div className="border-t border-white/10 p-4 pt-0">
            <nav className="space-y-2 mt-4">
              {sections?.map((section) => (
                <button
                  key={section?.id}
                  onClick={() => handleSectionClick(section?.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    activeSection === section?.id
                      ? 'bg-primary/20 text-primary font-medium' :'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {section?.title}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`sticky top-24 glass-card rounded-xl p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="List" size={18} className="text-primary" />
        <h3 className="font-semibold text-foreground">Table of Contents</h3>
      </div>
      <nav className="space-y-2">
        {sections?.map((section) => (
          <button
            key={section?.id}
            onClick={() => handleSectionClick(section?.id)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
              activeSection === section?.id
                ? 'bg-primary/20 text-primary font-medium border-l-2 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-white/5'
            }`}
          >
            {section?.title}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TableOfContents;