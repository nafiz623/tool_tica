import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FooterSection = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    tools: [
      { name: 'PDF Tools', path: '/tool-category-browse?category=pdf-tools' },
      { name: 'Image Tools', path: '/tool-category-browse?category=image-tools' },
      { name: 'Text Tools', path: '/tool-category-browse?category=text-tools' },
      { name: 'Developer Tools', path: '/tool-category-browse?category=developer-tools' }
    ],
    company: [
      { name: 'About Us', path: '/privacy-policy-legal#about' },
      { name: 'Privacy Policy', path: '/privacy-policy-legal#privacy' },
      { name: 'Terms of Service', path: '/privacy-policy-legal#terms' },
      { name: 'Contact', path: '/privacy-policy-legal#contact' }
    ],
    resources: [
      { name: 'Blog', path: '#blog' },
      { name: 'FAQ', path: '#faq' },
      { name: 'API Documentation', path: '#api' },
      { name: 'Status Page', path: '#status' }
    ],
    social: [
      { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com/tooltica' },
      { name: 'GitHub', icon: 'Github', url: 'https://github.com/tooltica' },
      { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com/company/tooltica' },
      { name: 'Discord', icon: 'MessageSquare', url: 'https://discord.gg/tooltica' }
    ]
  };

  const trustBadges = [
    {
      icon: 'Shield',
      title: 'Privacy First',
      description: 'No data collection'
    },
    {
      icon: 'Lock',
      title: 'Secure Processing',
      description: 'Client-side only'
    },
    {
      icon: 'Zap',
      title: 'Fast & Reliable',
      description: '99.9% uptime'
    },
    {
      icon: 'Heart',
      title: 'Open Source',
      description: 'Community driven'
    }
  ];

  return (
    <footer className="bg-surface/50 border-t border-white/10">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/homepage" className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                <Icon name="Wrench" size={24} color="white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                  Tool Tica
                </h3>
                <p className="text-xs text-muted-foreground">Privacy-First Online Tools</p>
              </div>
            </Link>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Your trusted platform for privacy-first online tools. Process files securely 
              with client-side technology - no uploads, no data sharing, complete privacy guaranteed.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {trustBadges?.map((badge, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 glass-card rounded-lg">
                  <Icon name={badge?.icon} size={16} className="text-accent flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-foreground">{badge?.title}</div>
                    <div className="text-xs text-muted-foreground">{badge?.description}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="glass-card p-4 rounded-lg">
              <h4 className="text-sm font-semibold text-foreground mb-2">Stay Updated</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Get notified about new tools and features
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="flex-1 px-3 py-2 bg-surface/50 border border-white/10 rounded text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
                <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm rounded transition-colors duration-200">
                  <Icon name="Send" size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Tools Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Popular Tools</h4>
            <ul className="space-y-3">
              {footerLinks?.tools?.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link?.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Icon name="ArrowRight" size={12} className="opacity-50" />
                    <span>{link?.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks?.company?.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link?.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Icon name="ArrowRight" size={12} className="opacity-50" />
                    <span>{link?.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3 mb-6">
              {footerLinks?.resources?.map((link, index) => (
                <li key={index}>
                  <a
                    href={link?.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Icon name="ArrowRight" size={12} className="opacity-50" />
                    <span>{link?.name}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Follow Us</h4>
              <div className="flex space-x-3">
                {footerLinks?.social?.map((social, index) => (
                  <a
                    key={index}
                    href={social?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-surface/50 hover:bg-primary/20 border border-white/10 hover:border-primary/30 rounded-lg flex items-center justify-center transition-all duration-200 group"
                    title={social?.name}
                  >
                    <Icon 
                      name={social?.icon} 
                      size={16} 
                      className="text-muted-foreground group-hover:text-primary transition-colors duration-200" 
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © {currentYear} Tool Tica. All rights reserved. Built with privacy in mind.
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link
                to="/privacy-policy-legal#privacy"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/privacy-policy-legal#terms"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                to="/privacy-policy-legal#cookies"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>

            {/* Security Badge */}
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Shield" size={14} className="text-success" />
              <span>SSL Secured</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;