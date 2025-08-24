import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ProgressIndicator from './ProgressIndicator';

const PreviewPane = ({ tool, files, results, processing, progress }) => {
  const [selectedFile, setSelectedFile] = useState(0);
  const [previewMode, setPreviewMode] = useState('split'); // split, before, after
  const [zoomLevel, setZoomLevel] = useState(100);

  useEffect(() => {
    if (results?.length > 0) {
      setSelectedFile(0);
    }
  }, [results]);

  const getPreviewContent = (file, isResult = false) => {
    if (!file) return null;

    const fileName = isResult ? file?.originalFile : file?.name;
    const fileExtension = fileName?.split('.')?.pop()?.toLowerCase();

    // Generate mock preview content based on file type
    switch (fileExtension) {
      case 'pdf':
        return (
          <div className="bg-white p-8 rounded shadow-lg text-black min-h-96">
            <h3 className="text-xl font-bold mb-4">Document Preview</h3>
            <p className="mb-4">This is a preview of your PDF content. The actual processing will extract text, convert formats, or perform other operations as configured.</p>
            <div className="space-y-2">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
              <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
              <p>Ut enim ad minim veniam, quis nostrud exercitation...</p>
            </div>
          </div>
        );

      case 'txt':
        return (
          <div className="bg-surface/50 p-6 rounded-lg font-mono text-sm">
            <div className="text-muted-foreground mb-2">Text Content:</div>
            <div className="text-foreground">
              {isResult ? file?.processedData : 'Original text content will be displayed here after processing...'}
            </div>
          </div>
        );

      case 'jpg': case'jpeg': case'png': case'webp':
        return (
          <div className="bg-surface/50 p-6 rounded-lg text-center">
            <Icon name="Image" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {isResult ? 'Processed Image Preview' : 'Original Image Preview'}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {fileName} • {isResult ? 'Converted' : 'Original'}
            </p>
          </div>
        );

      case 'html':
        return (
          <div className="bg-surface/50 p-6 rounded-lg">
            <div className="text-muted-foreground mb-2">HTML Content:</div>
            <div className="font-mono text-xs text-foreground bg-background/50 p-4 rounded overflow-x-auto">
              {isResult 
                ? `<!DOCTYPE html>\n<html>\n<head>\n  <title>${file?.originalFile}</title>\n</head>\n<body>\n  <h1>Converted Content</h1>\n  <p>${file?.processedData}</p>\n</body>\n</html>`
                : '<html>...</html>'
              }
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-surface/50 p-6 rounded-lg text-center">
            <Icon name="File" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">File preview not available</p>
            <p className="text-xs text-muted-foreground mt-2">{fileName}</p>
          </div>
        );
    }
  };

  if (processing) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <ProgressIndicator progress={progress} size="lg" />
          <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Processing Files</h3>
          <p className="text-muted-foreground">
            Please wait while your files are being processed...
          </p>
          
          <div className="mt-6 space-y-2">
            {files?.map((file, index) => (
              <div key={index} className="flex items-center justify-center space-x-3 text-sm">
                <Icon name="File" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">{file?.name}</span>
                <Icon name="ArrowRight" size={14} className="text-primary" />
                <span className="text-primary font-medium">
                  {tool?.name?.split(' ')?.[tool?.name?.split(' ')?.length - 1]}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Processing Queue */}
        <div className="glass-card p-6">
          <h4 className="text-sm font-semibold text-foreground mb-4">Processing Queue</h4>
          <div className="space-y-3">
            {files?.map((file, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
                <div className={`w-2 h-2 rounded-full ${progress > (index * 100 / files?.length) ? 'bg-success' : 'bg-muted-foreground'}`} />
                <Icon name="File" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground flex-1">{file?.name}</span>
                {progress > (index * 100 / files?.length) ? (
                  <Icon name="CheckCircle" size={16} className="text-success" />
                ) : (
                  <span className="text-xs text-muted-foreground">Waiting...</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!files?.length && !results?.length) {
    return (
      <div className="text-center py-12">
        <Icon name="Eye" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Preview Available</h3>
        <p className="text-muted-foreground">
          Upload files to see live previews during processing.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Preview Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-foreground">Preview & Results</h3>
          
          {/* File Selector */}
          {(files?.length > 1 || results?.length > 1) && (
            <select
              value={selectedFile}
              onChange={(e) => setSelectedFile(parseInt(e?.target?.value))}
              className="px-3 py-1 bg-surface border border-white/10 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {(results?.length > 0 ? results : files)?.map((item, index) => (
                <option key={index} value={index}>
                  {results?.length > 0 ? item?.originalFile : item?.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {/* Preview Mode Toggle */}
          <div className="flex rounded-lg bg-surface border border-white/10 p-1">
            {['split', 'before', 'after']?.map((mode) => (
              <button
                key={mode}
                onClick={() => setPreviewMode(mode)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  previewMode === mode
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {mode === 'split' ? 'Split' : mode === 'before' ? 'Original' : 'Result'}
              </button>
            ))}
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              iconName="ZoomOut"
              onClick={() => setZoomLevel(prev => Math.max(50, prev - 25))}
            />
            <span className="text-xs text-muted-foreground w-12 text-center">
              {zoomLevel}%
            </span>
            <Button
              size="sm"
              variant="ghost"
              iconName="ZoomIn"
              onClick={() => setZoomLevel(prev => Math.min(200, prev + 25))}
            />
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="glass-card p-6">
        <div 
          className={`grid gap-6 transition-all duration-300 ${
            previewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
          }`}
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        >
          {/* Original/Before View */}
          {(previewMode === 'split' || previewMode === 'before') && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name="File" size={16} className="text-muted-foreground" />
                <h4 className="text-sm font-semibold text-foreground">Original</h4>
              </div>
              <div className="border border-white/10 rounded-lg overflow-hidden">
                {getPreviewContent(files?.[selectedFile], false)}
              </div>
            </div>
          )}

          {/* Arrow/Separator */}
          {previewMode === 'split' && (
            <div className="flex items-center justify-center lg:hidden">
              <Icon name="ArrowDown" size={20} className="text-primary" />
            </div>
          )}

          {/* Result/After View */}
          {(previewMode === 'split' || previewMode === 'after') && results?.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name="FileCheck" size={16} className="text-success" />
                <h4 className="text-sm font-semibold text-foreground">Result</h4>
              </div>
              <div className="border border-success/20 rounded-lg overflow-hidden">
                {getPreviewContent(results?.[selectedFile], true)}
              </div>
            </div>
          )}

          {/* No Results Placeholder */}
          {(previewMode === 'split' || previewMode === 'after') && results?.length === 0 && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <h4 className="text-sm font-semibold text-foreground">Result</h4>
              </div>
              <div className="border border-white/10 rounded-lg p-12 text-center">
                <Icon name="FileQuestion" size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No results yet</p>
                <p className="text-xs text-muted-foreground mt-1">Process files to see results here</p>
              </div>
            </div>
          )}
        </div>

        {/* Processing Arrow (Split Mode) */}
        {previewMode === 'split' && (
          <div className="hidden lg:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-primary/10 border border-primary/20 rounded-full p-3">
              <Icon name="ArrowRight" size={20} className="text-primary" />
            </div>
          </div>
        )}
      </div>

      {/* Preview Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-4 text-center">
          <Icon name="Info" size={20} className="text-primary mx-auto mb-2" />
          <div className="text-sm font-medium text-foreground">File Info</div>
          <div className="text-xs text-muted-foreground">
            {files?.[selectedFile]?.name || 'No file selected'}
          </div>
        </div>

        <div className="glass-card p-4 text-center">
          <Icon name="Activity" size={20} className="text-success mx-auto mb-2" />
          <div className="text-sm font-medium text-foreground">Processing</div>
          <div className="text-xs text-muted-foreground">
            {results?.length > 0 ? 'Completed' : 'Pending'}
          </div>
        </div>

        <div className="glass-card p-4 text-center">
          <Icon name="Download" size={20} className="text-accent mx-auto mb-2" />
          <div className="text-sm font-medium text-foreground">Output</div>
          <div className="text-xs text-muted-foreground">
            {results?.length > 0 ? `${results?.length} files ready` : 'No output yet'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPane;