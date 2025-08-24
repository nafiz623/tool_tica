import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactInfo = ({ className = "" }) => {
  const contactMethods = [
    {
      id: 1,
      type: 'Email',
      value: 'privacy@tooltica.com',
      icon: 'Mail',
      action: 'mailto:privacy@tooltica.com'
    },
    {
      id: 2,
      type: 'Support',
      value: 'support@tooltica.com',
      icon: 'HelpCircle',
      action: 'mailto:support@tooltica.com'
    },
    {
      id: 3,
      type: 'Legal',
      value: 'legal@tooltica.com',
      icon: 'Scale',
      action: 'mailto:legal@tooltica.com'
    }
  ];

  const handleContact = (action) => {
    window.location.href = action;
  };

  return (
    <div className={`glass-card rounded-xl p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="MessageCircle" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Contact Us</h3>
      </div>
      <p className="text-muted-foreground mb-6 leading-relaxed">
        Have questions about our privacy practices or need to exercise your rights? 
        We're here to help and committed to responding within 48 hours.
      </p>
      <div className="space-y-4">
        {contactMethods?.map((method) => (
          <div key={method?.id} className="flex items-center justify-between p-4 bg-surface/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name={method?.icon} size={18} className="text-accent" />
              <div>
                <div className="text-sm font-medium text-foreground">{method?.type}</div>
                <div className="text-sm text-muted-foreground">{method?.value}</div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleContact(method?.action)}
            >
              <Icon name="ExternalLink" size={14} />
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
        <div className="flex items-start space-x-3">
          <Icon name="Clock" size={16} className="text-primary mt-0.5" />
          <div>
            <div className="text-sm font-medium text-foreground">Response Time</div>
            <div className="text-sm text-muted-foreground">
              We typically respond to privacy inquiries within 48 hours during business days.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;