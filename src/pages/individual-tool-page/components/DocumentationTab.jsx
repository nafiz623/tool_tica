import React from 'react';
import Icon from '../../../components/AppIcon';

const DocumentationTab = ({ tool }) => {
  const documentationSections = [
    {
      title: 'How to Use',
      icon: 'PlayCircle',
      content: [
        'Click "Choose File" or drag and drop your PDF file into the upload area',
        'Ensure your file is in PDF format and under 10MB in size',
        'Click "Start Conversion" to begin the text extraction process',
        'Wait for the processing to complete (usually takes a few seconds)',
        'Copy the extracted text or download it as a .txt file'
      ]
    },
    {
      title: 'Supported Features',
      icon: 'CheckCircle',
      content: [
        'Extract text from single or multi-page PDF documents',
        'Preserve basic text formatting and line breaks',
        'Handle both text-based and scanned PDFs (OCR coming soon)',
        'Process files up to 10MB in size',
        'Download results as plain text files'
      ]
    },
    {
      title: 'File Requirements',
      icon: 'FileText',
      content: [
        'File format: PDF (.pdf)',
        'Maximum file size: 10MB',
        'Text-based PDFs work best for accurate extraction',
        'Password-protected PDFs are not currently supported',
        'Scanned PDFs may have limited text extraction accuracy'
      ]
    },
    {
      title: 'Privacy & Security',
      icon: 'Shield',
      content: [
        'All processing happens locally in your browser',
        'No files are uploaded to our servers',
        'Your documents never leave your device',
        'No data is stored or tracked',
        'Complete privacy and security guaranteed'
      ]
    },
    {
      title: 'Troubleshooting',
      icon: 'AlertCircle',
      content: [
        'If conversion fails, try refreshing the page and uploading again',
        'Ensure your PDF is not corrupted or password-protected',
        'For scanned PDFs, consider using an OCR tool first',
        'Large files may take longer to process - please be patient',
        'Clear your browser cache if you encounter persistent issues'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">Documentation</h2>
        <p className="text-muted-foreground mb-6">
          Complete guide on how to use the PDF to Text converter effectively and troubleshoot common issues.
        </p>

        <div className="space-y-8">
          {documentationSections?.map((section, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Icon name={section?.icon} size={18} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{section?.title}</h3>
              </div>

              <div className="ml-11 space-y-2">
                {section?.content?.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start space-x-3">
                    <Icon name="ChevronRight" size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Tips */}
      <div className="glass-card p-6 border-success/20">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Lightbulb" size={20} className="text-success" />
          <h3 className="text-lg font-semibold text-foreground">Pro Tips</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Icon name="Zap" size={14} className="text-success mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              For best results, use PDFs that were created digitally rather than scanned documents.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="Zap" size={14} className="text-success mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              You can process multiple files by repeating the conversion process for each document.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="Zap" size={14} className="text-success mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              Use the copy function to quickly paste extracted text into other applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationTab;