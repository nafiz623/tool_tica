import React, { useState, useRef, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ToolInterface = ({ tool }) => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = useCallback((e) => {
    e?.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e?.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e?.dataTransfer?.files);
    if (droppedFiles?.length > 0) {
      handleFileSelect(droppedFiles?.[0]);
    }
  }, []);

  const handleFileSelect = (selectedFile) => {
    setError('');
    setResult('');
    
    // Validate file type
    if (selectedFile?.type !== 'application/pdf') {
      setError('Please select a valid PDF file.');
      return;
    }

    // Validate file size (max 10MB)
    if (selectedFile?.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB.');
      return;
    }

    setFile(selectedFile);
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e?.target?.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const processFile = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);
    setError('');

    try {
      // Simulate file processing with progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(progressInterval);
      setProgress(100);

      // Mock extracted text
      const mockText = `This is extracted text from ${file?.name}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`;

      setResult(mockText);
    } catch (err) {
      setError('Failed to process the file. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard?.writeText(result);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const downloadText = () => {
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file?.name?.replace('.pdf', '')}_extracted.txt`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetTool = () => {
    setFile(null);
    setResult('');
    setError('');
    setProgress(0);
    setIsProcessing(false);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* File Upload Area */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Upload PDF File</h3>
        
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
            isDragOver
              ? 'border-primary bg-primary/5' :'border-white/20 hover:border-white/30'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center">
              <Icon name="Upload" size={32} className="text-primary" />
            </div>
            
            <div>
              <p className="text-lg font-medium text-foreground mb-2">
                Drop your PDF file here
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse files
              </p>
              
              <Button
                variant="outline"
                onClick={() => fileInputRef?.current?.click()}
                className="mb-2"
              >
                <Icon name="FolderOpen" size={16} className="mr-2" />
                Choose File
              </Button>
              
              <p className="text-xs text-muted-foreground">
                Maximum file size: 10MB • Supported format: PDF
              </p>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>

        {/* Selected File Info */}
        {file && (
          <div className="mt-4 p-4 bg-surface/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="FileText" size={20} className="text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{file?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file?.size / 1024 / 1024)?.toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={resetTool}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Processing Controls */}
      {file && !result && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Convert to Text</h3>
            <Button
              variant="default"
              onClick={processFile}
              disabled={isProcessing}
              loading={isProcessing}
            >
              <Icon name="Play" size={16} className="mr-2" />
              {isProcessing ? 'Converting...' : 'Start Conversion'}
            </Button>
          </div>

          {/* Progress Bar */}
          {isProcessing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Processing...</span>
                <span className="text-foreground">{progress}%</span>
              </div>
              <div className="w-full bg-surface rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Error Display */}
      {error && (
        <div className="glass-card p-6 border-error/20">
          <div className="flex items-center space-x-3">
            <Icon name="AlertCircle" size={20} className="text-error" />
            <div>
              <p className="text-sm font-medium text-error">Error</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        </div>
      )}
      {/* Results Area */}
      {result && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Extracted Text</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
              >
                <Icon name="Copy" size={16} className="mr-2" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadText}
              >
                <Icon name="Download" size={16} className="mr-2" />
                Download
              </Button>
            </div>
          </div>

          <div className="bg-surface/50 rounded-lg p-4 max-h-96 overflow-y-auto">
            <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
              {result}
            </pre>
          </div>

          <div className="mt-4 flex justify-center">
            <Button
              variant="ghost"
              onClick={resetTool}
            >
              <Icon name="RotateCcw" size={16} className="mr-2" />
              Convert Another File
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolInterface;