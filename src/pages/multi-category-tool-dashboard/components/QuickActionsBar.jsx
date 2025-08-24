import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const QuickActionsBar = () => {
  const quickActions = [
    {
      id: 1,
      title: 'Quick PDF Merge',
      description: 'Drag & drop PDFs to merge instantly',
      icon: 'Merge',
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
      link: '/individual-tool-page?tool=merge-pdf',
      shortcut: 'Ctrl+M'
    },
    {
      id: 2,
      title: 'Image Compress',
      description: 'Reduce image file sizes',
      icon: 'Minimize2',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      link: '/individual-tool-page?tool=image-compressor',
      shortcut: 'Ctrl+I'
    },
    {
      id: 3,
      title: 'JSON Format',
      description: 'Format JSON instantly',
      icon: 'Code',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      link: '/individual-tool-page?tool=json-formatter',
      shortcut: 'Ctrl+J'
    },
    {
      id: 4,
      title: 'Password Gen',
      description: 'Generate secure passwords',
      icon: 'Key',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      link: '/individual-tool-page?tool=password-generator',
      shortcut: 'Ctrl+P'
    },
    {
      id: 5,
      title: 'QR Generator',
      description: 'Create QR codes quickly',
      icon: 'QrCode',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
      link: '/individual-tool-page?tool=qr-generator',
      shortcut: 'Ctrl+Q'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-white/5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Quick Actions</h2>
          <p className="text-sm text-muted-foreground">
            Access your most-used tools with keyboard shortcuts
          </p>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Icon name="Settings" size={16} className="mr-2" />
          Customize
        </Button>
      </div>

      {/* Desktop Quick Actions */}
      <div className="hidden lg:flex items-center space-x-4 overflow-x-auto pb-2">
        {quickActions?.map((action) => (
          <Link
            key={action?.id}
            to={action?.link}
            className="flex-shrink-0 group"
            title={`${action?.title} (${action?.shortcut})`}
          >
            <div className="glass-card p-4 rounded-xl hover:shadow-elevation-1 transition-all duration-200 group-hover:scale-105 min-w-[140px]">
              <div className={`w-10 h-10 ${action?.bgColor} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action?.icon} size={20} className={action?.color} />
              </div>
              <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200 mb-1">
                {action?.title}
              </div>
              <div className="text-xs text-muted-foreground mb-2">
                {action?.description}
              </div>
              <div className="text-xs text-accent font-mono">
                {action?.shortcut}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile Quick Actions */}
      <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-4">
        {quickActions?.slice(0, 6)?.map((action) => (
          <Link
            key={action?.id}
            to={action?.link}
            className="block group"
          >
            <div className="glass-card p-4 rounded-xl hover:shadow-elevation-1 transition-all duration-200 group-hover:scale-105 text-center">
              <div className={`w-10 h-10 ${action?.bgColor} rounded-lg flex items-center justify-center mb-2 mx-auto group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action?.icon} size={20} className={action?.color} />
              </div>
              <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                {action?.title}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Keyboard Shortcuts Info */}
      <div className="mt-6 hidden lg:block">
        <div className="glass-card p-3 rounded-lg">
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Keyboard" size={12} />
              <span>Keyboard shortcuts enabled</span>
            </div>
            <div className="w-px h-3 bg-border"></div>
            <div className="flex items-center space-x-1">
              <span>Press</span>
              <kbd className="px-1.5 py-0.5 bg-surface rounded text-foreground font-mono">?</kbd>
              <span>for help</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickActionsBar;