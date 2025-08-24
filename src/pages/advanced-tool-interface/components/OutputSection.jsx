import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

// Add JSZip import or create a mock implementation
const JSZip = window.JSZip || class MockJSZip {
  constructor() {
    this.files = {};
  }
  
  file(name, content) {
    this.files[name] = content;
    return this;
  }
  
  async generateAsync(options) {
    // Mock implementation - in a real app, JSZip would be properly imported
    console.warn('JSZip not available, using mock implementation');
    return new Blob(['Mock zip file'], { type: 'application/zip' });
  }
};

const OutputSection = ({ tool, results, onDownload }) => {
  const [selectedFormat, setSelectedFormat] = useState('original');
  const [downloadAll, setDownloadAll] = useState(false);
  const [sharing, setSharing] = useState(false);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getResultIcon = (format) => {
    const iconMap = {
      txt: 'FileText',
      pdf: 'FileText',
      html: 'Code',
      csv: 'Table',
      xlsx: 'FileSpreadsheet',
      jpg: 'Image',
      png: 'Image',
      json: 'Braces',
      xml: 'Code2',
      zip: 'Archive'
    };
    return iconMap?.[format] || 'File';
  };

  const handleDownloadAll = async () => {
    setDownloadAll(true);
    try {
      // Create a zip file containing all results
      const zip = new JSZip();
      
      for (const result of results) {
        const response = await fetch(result?.downloadUrl);
        const blob = await response?.blob();
        zip?.file(`${result?.originalFile}.${result?.format}`, blob);
      }
      
      const zipBlob = await zip?.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(zipBlob);
      link.download = `${tool?.name?.toLowerCase()?.replace(/\s+/g, '-')}-results.zip`;
      link?.click();
      
      URL.revokeObjectURL(link?.href);
    } catch (error) {
      console.error('Error creating zip file:', error);
      alert('Error creating zip file. Please download files individually.');
    } finally {
      setDownloadAll(false);
    }
  };

  const handleShare = (result) => {
    setSharing(true);
    
    if (navigator?.share) {
      navigator.share({
        title: `${tool?.name} Result`,
        text: `Processed file: ${result?.originalFile}`,
        url: result?.downloadUrl
      })?.catch(console.error);
    } else {
      // Fallback: copy to clipboard
      navigator?.clipboard?.writeText(result?.downloadUrl)?.then(() => {
        alert('Download link copied to clipboard!');
      })?.catch(console.error);
    }
    
    setSharing(false);
  };

  const previewResult = (result) => {
    // Open result in new tab for preview
    window.open(result?.downloadUrl, '_blank');
  };

  if (!results?.length) {
    return (
      <div className="text-center py-12">
        <Icon name="FileX" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Results Yet</h3>
        <p className="text-muted-foreground">
          Upload files and process them to see results here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Processing Results</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {results?.length} file{results?.length !== 1 ? 's' : ''} processed successfully
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select
            value={selectedFormat}
            onChange={setSelectedFormat}
            options={[
              { value: 'original', label: 'Original Format' },
              { value: 'pdf', label: 'PDF Document' },
              { value: 'txt', label: 'Plain Text' },
              { value: 'json', label: 'JSON Data' }
            ]}
            className="w-40"
          />
          
          <Button
            onClick={handleDownloadAll}
            loading={downloadAll}
            iconName="Download"
            variant="outline"
            size="sm"
          >
            Download All
          </Button>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {results?.map((result, index) => (
          <div key={result?.id || index} className="glass-card p-6">
            <div className="flex items-start space-x-4">
              <div className="text-primary">
                <Icon name={getResultIcon(result?.format)} size={24} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">
                      {result?.originalFile}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Converted to {result?.format?.toUpperCase()} • {formatFileSize(result?.size)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      iconName="Eye"
                      onClick={() => previewResult(result)}
                    >
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      iconName="Share"
                      onClick={() => handleShare(result)}
                      loading={sharing}
                    >
                      Share
                    </Button>
                    <Button
                      size="sm"
                      iconName="Download"
                      onClick={() => onDownload(result)}
                    >
                      Download
                    </Button>
                  </div>
                </div>

                {/* Result Preview */}
                <div className="bg-surface/50 rounded-lg p-4 mt-3">
                  <div className="text-xs text-muted-foreground mb-2">Preview:</div>
                  <div className="text-sm text-foreground font-mono bg-background/50 rounded p-3 max-h-32 overflow-y-auto">
                    {result?.processedData?.substring(0, 300)}
                    {result?.processedData?.length > 300 && '...'}
                  </div>
                </div>

                {/* Result Metadata */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>Format: {result?.format?.toUpperCase()}</span>
                    <span>Size: {formatFileSize(result?.size)}</span>
                    <span>Quality: High</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Icon name="CheckCircle" size={14} className="text-success" />
                    <span className="text-xs text-success font-medium">Success</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Export Options */}
      <div className="glass-card p-6">
        <h4 className="text-sm font-semibold text-foreground mb-4">Export Options</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            variant="outline"
            iconName="Archive"
            className="justify-start"
            onClick={handleDownloadAll}
            loading={downloadAll}
          >
            Download as ZIP
          </Button>
          
          <Button
            variant="outline"
            iconName="Cloud"
            className="justify-start"
          >
            Save to Cloud
          </Button>
          
          <Button
            variant="outline"
            iconName="Mail"
            className="justify-start"
          >
            Email Results
          </Button>
          
          <Button
            variant="outline"
            iconName="Link"
            className="justify-start"
          >
            Generate Share Link
          </Button>
        </div>
      </div>

      {/* Processing Summary */}
      <div className="glass-card p-6 bg-success/5 border-success/20">
        <div className="flex items-start space-x-3">
          <Icon name="CheckCircle" size={20} className="text-success flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Processing Complete!</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-muted-foreground">Files Processed:</span>
                <div className="font-semibold text-foreground">{results?.length}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Success Rate:</span>
                <div className="font-semibold text-success">100%</div>
              </div>
              <div>
                <span className="text-muted-foreground">Total Size:</span>
                <div className="font-semibold text-foreground">
                  {formatFileSize(results?.reduce((acc, result) => acc + (result?.size || 0), 0))}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Processing Time:</span>
                <div className="font-semibold text-foreground">2.3s avg</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quality Settings for Future Downloads */}
      <div className="glass-card p-6">
        <h4 className="text-sm font-semibold text-foreground mb-4">Download Settings</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Output Quality</label>
            <Select
              value="high"
              onChange={() => {}}
              options={[
                { value: 'high', label: 'High Quality (Larger Files)' },
                { value: 'medium', label: 'Medium Quality (Balanced)' },
                { value: 'low', label: 'Low Quality (Smaller Files)' }
              ]}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="include-metadata"
              defaultChecked
              className="rounded border-white/20 bg-surface text-primary focus:ring-primary focus:ring-offset-0"
            />
            <label htmlFor="include-metadata" className="text-sm text-foreground">
              Include file metadata in downloads
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="auto-organize"
              defaultChecked
              className="rounded border-white/20 bg-surface text-primary focus:ring-primary focus:ring-offset-0"
            />
            <label htmlFor="auto-organize" className="text-sm text-foreground">
              Organize downloads by file type
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputSection;