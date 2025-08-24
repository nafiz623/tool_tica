import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQTab = ({ tool }) => {
  const [openItems, setOpenItems] = useState(new Set([0])); // First item open by default

  const faqItems = [
    {
      question: 'Is my PDF file uploaded to your servers?',
      answer: 'No, absolutely not. All PDF processing happens entirely in your browser using client-side JavaScript. Your files never leave your device, ensuring complete privacy and security.'
    },
    {
      question: 'What file formats are supported?',
      answer: 'Currently, we support PDF files (.pdf) up to 10MB in size. We are working on adding support for other document formats in future updates.'
    },
    {
      question: 'Can I convert password-protected PDFs?',
      answer: 'Currently, password-protected PDFs are not supported. Please remove the password protection from your PDF before using our converter.'
    },
    {
      question: 'Why is the extracted text not accurate?',
      answer: 'Text extraction accuracy depends on the PDF type. Text-based PDFs (created digitally) work best. Scanned PDFs or image-based documents may have limited accuracy as they require OCR processing.'
    },
    {
      question: 'Is there a limit on file size?',
      answer: 'Yes, the maximum file size is 10MB. This limit ensures optimal performance and prevents browser memory issues during processing.'
    },
    {
      question: 'Can I convert multiple PDFs at once?',
      answer: 'Currently, you can process one PDF at a time. After completing one conversion, you can immediately start another by clicking "Convert Another File".'
    },
    {
      question: 'What browsers are supported?',
      answer: 'Our tool works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version for the best experience.'
    },
    {
      question: 'How long does the conversion take?',
      answer: 'Conversion time depends on the file size and complexity. Most PDFs are processed within a few seconds to a minute. Larger files may take slightly longer.'
    },
    {
      question: 'Can I save the extracted text?',
      answer: 'Yes! You can either copy the text to your clipboard or download it as a .txt file. Both options are available once the conversion is complete.'
    },
    {
      question: 'What if the tool is not working?',
      answer: 'Try refreshing the page and uploading your file again. Ensure your PDF is not corrupted and is under 10MB. If issues persist, try using a different browser or clearing your browser cache.'
    }
  ];

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems?.has(index)) {
      newOpenItems?.delete(index);
    } else {
      newOpenItems?.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground mb-6">
          Find answers to common questions about our PDF to Text converter tool.
        </p>

        <div className="space-y-4">
          {faqItems?.map((item, index) => (
            <div key={index} className="glass-card border border-white/10">
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors duration-200"
              >
                <h3 className="text-sm font-medium text-foreground pr-4">
                  {item?.question}
                </h3>
                <Icon 
                  name={openItems?.has(index) ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-muted-foreground flex-shrink-0 transition-transform duration-200"
                />
              </button>
              
              {openItems?.has(index) && (
                <div className="px-4 pb-4 border-t border-white/10">
                  <p className="text-sm text-muted-foreground pt-4 leading-relaxed">
                    {item?.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Contact Support */}
      <div className="glass-card p-6 border-primary/20">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="MessageCircle" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Still Need Help?</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          Can't find the answer you're looking for? Our support team is here to help you get the most out of our tools.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors duration-200">
            <Icon name="Mail" size={16} />
            <span className="text-sm font-medium">Contact Support</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-surface/50 text-muted-foreground rounded-lg hover:bg-surface/70 hover:text-foreground transition-colors duration-200">
            <Icon name="ExternalLink" size={16} />
            <span className="text-sm font-medium">View All Tools</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQTab;