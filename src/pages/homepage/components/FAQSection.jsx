import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      id: 0,
      question: 'How does client-side processing work?',
      answer: `All our tools run entirely in your web browser using JavaScript and WebAssembly. When you upload a file, it never leaves your device - all processing happens locally on your computer. This means your sensitive documents, images, and data remain completely private and secure. No servers receive your files, no data is transmitted over the internet, and no third parties can access your information.`
    },
    {
      id: 1,
      question: 'Is Tool Tica really free to use?',
      answer: `Yes, Tool Tica is completely free to use with no hidden costs, subscriptions, or premium tiers. All tools are available without any usage limits or restrictions. We support the platform through non-intrusive advertising and optional donations from users who find value in our services. Our mission is to provide privacy-first tools accessible to everyone.`
    },
    {
      id: 2,
      question: 'What file formats and sizes are supported?',
      answer: `We support a wide range of file formats including PDF, DOCX, JPG, PNG, WebP, AVIF, MP4, and many more. File size limits depend on your device's available memory since processing happens locally. Most modern devices can handle files up to several hundred megabytes. For very large files, we recommend using our batch processing features to split the work into smaller chunks.`
    },
    {
      id: 3,
      question: 'Do I need to install any software?',
      answer: `No installation required! Tool Tica works entirely in your web browser. All you need is a modern browser like Chrome, Firefox, Safari, or Edge. Our tools use cutting-edge web technologies like WebAssembly and modern JavaScript APIs to provide desktop-quality functionality without any downloads or installations.`
    },
    {
      id: 4,
      question: 'Can I use these tools offline?',answer: `Many of our tools work offline once they've been loaded in your browser. We use Progressive Web App (PWA) technology and service workers to cache the necessary files locally. This means you can continue using tools like text formatters, calculators, and some converters even without an internet connection.`
    },
    {
      id: 5,
      question: 'How do you ensure my data privacy?',
      answer: `Privacy is our top priority. We implement several measures: 1) Client-side processing means your files never leave your device, 2) No user accounts or data collection required, 3) No tracking cookies or analytics on sensitive pages, 4) Open-source components where possible for transparency, 5) Regular security audits of our codebase. We cannot access your files because they never reach our servers.`
    },
    {
      id: 6,
      question: 'What browsers are supported?',
      answer: `Tool Tica works on all modern browsers including Chrome 90+, Firefox 88+, Safari 14+, and Edge 90+. We use progressive enhancement, so older browsers will still work but may have limited functionality. For the best experience, we recommend keeping your browser updated to the latest version.`
    },
    {
      id: 7,
      question: 'Can I suggest new tools or features?',
      answer: `Absolutely! We love hearing from our users. You can suggest new tools, report bugs, or request features through our contact form or GitHub repository. We regularly review suggestions and prioritize the most requested features. Many of our current tools were developed based on user feedback and requests.`
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? -1 : id);
  };

  return (
    <section className="py-16 lg:py-24 bg-surface/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="HelpCircle" size={20} className="text-accent" />
            <span className="text-sm font-medium text-accent uppercase tracking-wide">
              Got Questions?
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about Tool Tica's privacy-first approach, 
            supported features, and how our client-side processing works.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs?.map((faq) => (
            <div key={faq?.id} className="glass-card rounded-xl overflow-hidden">
              <button
                onClick={() => toggleFAQ(faq?.id)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-foreground pr-4">
                  {faq?.question}
                </h3>
                <div className="flex-shrink-0">
                  <Icon
                    name={openFAQ === faq?.id ? "ChevronUp" : "ChevronDown"}
                    size={20}
                    className="text-muted-foreground transition-transform duration-200"
                  />
                </div>
              </button>
              
              {openFAQ === faq?.id && (
                <div className="px-6 pb-5 animate-slide-up">
                  <div className="pt-2 border-t border-white/10">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {faq?.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <div className="glass-card p-8 rounded-xl">
            <Icon name="MessageCircle" size={32} className="text-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="flex items-center space-x-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors duration-200">
                <Icon name="Mail" size={16} />
                <span>Contact Support</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-3 border border-white/20 hover:bg-white/5 text-foreground rounded-lg transition-colors duration-200">
                <Icon name="Github" size={16} />
                <span>View on GitHub</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                <Icon name="Users" size={24} className="text-success" />
              </div>
              <div className="text-2xl font-bold text-foreground">50K+</div>
              <div className="text-sm text-muted-foreground">Happy Users</div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Icon name="Zap" size={24} className="text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">1M+</div>
              <div className="text-sm text-muted-foreground">Files Processed</div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <Icon name="Star" size={24} className="text-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground">4.9/5</div>
              <div className="text-sm text-muted-foreground">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;