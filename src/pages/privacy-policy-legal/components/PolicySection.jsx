import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PolicySection = ({ 
  id, 
  title, 
  content, 
  isExpandable = false, 
  defaultExpanded = true,
  isHighlighted = false,
  className = "" 
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const renderContent = (text) => {
    if (typeof text === 'string') {
      return text?.split('\n')?.map((paragraph, index) => (
        <p key={index} className="mb-4 last:mb-0 text-muted-foreground leading-relaxed">
          {paragraph}
        </p>
      ));
    }
    return text;
  };

  if (isExpandable) {
    return (
      <section id={id} className={`glass-card rounded-xl overflow-hidden ${className}`}>
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between p-6 hover:bg-white/5"
        >
          <h2 className="text-xl font-semibold text-foreground text-left">{title}</h2>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="transition-transform duration-200 flex-shrink-0 ml-4"
          />
        </Button>
        
        {isExpanded && (
          <div className="px-6 pb-6 border-t border-white/10">
            <div className="pt-6">
              {renderContent(content)}
            </div>
          </div>
        )}
      </section>
    );
  }

  return (
    <section 
      id={id} 
      className={`glass-card rounded-xl p-6 ${isHighlighted ? 'border-2 border-primary/30' : ''} ${className}`}
    >
      <h2 className="text-xl font-semibold text-foreground mb-6">{title}</h2>
      <div className="prose prose-invert max-w-none">
        {renderContent(content)}
      </div>
      
      {isHighlighted && (
        <div className="mt-6 flex items-center space-x-2 text-primary">
          <Icon name="Shield" size={16} />
          <span className="text-sm font-medium">Privacy Commitment</span>
        </div>
      )}
    </section>
  );
};

export default PolicySection;