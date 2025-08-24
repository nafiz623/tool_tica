import React, { useRef, useState, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadZone = ({ tool, files, onFileUpload, onFileRemove, batchMode }) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleDrag = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e?.dataTransfer?.files || []);
    if (droppedFiles?.length > 0) {
      processFiles(droppedFiles);
    }
  }, []);

  const handleFileInput = useCallback((e) => {
    const selectedFiles = Array.from(e?.target?.files || []);
    if (selectedFiles?.length > 0) {
      processFiles(selectedFiles);
    }
  }, []);

  const processFiles = useCallback((fileList) => {
    const validFiles = fileList?.filter(file => {
      if (!tool?.acceptedTypes?.length) return true;
      const fileExtension = '.' + file?.name?.split('.')?.pop()?.toLowerCase();
      return tool?.acceptedTypes?.includes(fileExtension);
    });

    if (validFiles?.length !== fileList?.length) {
      const rejectedCount = fileList?.length - validFiles?.length;
      alert(`${rejectedCount} file(s) were rejected. Please use supported file types: ${tool?.acceptedTypes?.join(', ')}`);
    }

    if (validFiles?.length > 0) {
      // Simulate upload progress for each file
      validFiles?.forEach((file, index) => {
        const fileId = `${file?.name}-${Date.now()}-${index}`;
        setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

        // Simulate progress
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
          
          if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setUploadProgress(prev => {
                const newProgress = { ...prev };
                delete newProgress?.[fileId];
                return newProgress;
              });
            }, 500);
          }
        }, 100);

        // Add file metadata
        const fileWithMetadata = {
          ...file,
          id: fileId,
          size: file?.size,
          lastModified: file?.lastModified,
          uploadedAt: new Date()?.toISOString()
        };

        setTimeout(() => {
          onFileUpload([fileWithMetadata]);
        }, 1000);
      });
    }
  }, [tool, onFileUpload]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getFileIcon = (fileName) => {
    const extension = fileName?.split('.')?.pop()?.toLowerCase();
    const iconMap = {
      pdf: 'FileText',
      doc: 'FileText',
      docx: 'FileText',
      txt: 'FileText',
      jpg: 'Image',
      jpeg: 'Image',
      png: 'Image',
      gif: 'Image',
      webp: 'Image',
      mp3: 'Music',
      wav: 'Music',
      mp4: 'Video',
      zip: 'Archive',
      json: 'Braces',
      html: 'Code',
      css: 'Palette',
      js: 'Code2'
    };
    return iconMap?.[extension] || 'File';
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
          ${dragActive 
            ? 'border-primary bg-primary/5 scale-105' :'border-white/20 hover:border-white/40'
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 gradient-primary rounded-full flex items-center justify-center">
            <Icon name="Upload" size={24} color="white" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {dragActive ? 'Drop files here' : 'Upload your files'}
            </h3>
            <p className="text-muted-foreground mt-1">
              Drag and drop files or click to browse
            </p>
            {tool?.acceptedTypes?.length > 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                Supported formats: {tool?.acceptedTypes?.join(', ')}
              </p>
            )}
          </div>

          <div className="flex items-center justify-center space-x-4">
            <Button
              onClick={() => fileInputRef?.current?.click()}
              iconName="FolderOpen"
              variant="outline"
            >
              Browse Files
            </Button>
            {batchMode && (
              <Button
                onClick={() => fileInputRef?.current?.click()}
                iconName="Layers"
                variant="secondary"
              >
                Add Multiple Files
              </Button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple={batchMode}
            accept={tool?.acceptedTypes?.join(',')}
            onChange={handleFileInput}
            className="hidden"
          />
        </div>

        {/* Cloud Storage Integration (Placeholder) */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-xs text-muted-foreground mb-3">Or import from:</p>
          <div className="flex items-center justify-center space-x-3">
            <Button size="sm" variant="ghost" iconName="Cloud">
              Google Drive
            </Button>
            <Button size="sm" variant="ghost" iconName="HardDrive">
              Dropbox
            </Button>
            <Button size="sm" variant="ghost" iconName="Folder">
              OneDrive
            </Button>
          </div>
        </div>
      </div>
      {/* File List */}
      {files?.length > 0 && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-foreground">
              Uploaded Files ({files?.length})
            </h4>
            {batchMode && (
              <Button 
                size="sm" 
                variant="ghost" 
                iconName="Trash2"
                onClick={() => files?.forEach((_, index) => onFileRemove(index))}
              >
                Clear All
              </Button>
            )}
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {files?.map((file, index) => (
              <div key={file?.id || index} className="flex items-center space-x-4 p-3 rounded-lg bg-white/5">
                <div className="text-primary">
                  <Icon name={getFileIcon(file?.name)} size={20} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {file?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file?.size)} • {new Date(file?.lastModified || file?.uploadedAt)?.toLocaleDateString()}
                  </p>
                  
                  {/* Upload Progress */}
                  {uploadProgress?.[file?.id] !== undefined && uploadProgress?.[file?.id] < 100 && (
                    <div className="mt-2">
                      <div className="w-full bg-surface rounded-full h-1">
                        <div 
                          className="bg-primary h-1 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress?.[file?.id]}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {uploadProgress?.[file?.id] === 100 && (
                    <Icon name="CheckCircle" size={16} className="text-success" />
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    iconName="X"
                    onClick={() => onFileRemove(index)}
                    className="text-muted-foreground hover:text-error"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* File Statistics */}
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-muted-foreground">
            <span>Total size: {formatFileSize(files?.reduce((acc, file) => acc + (file?.size || 0), 0))}</span>
            <span>Ready for processing</span>
          </div>
        </div>
      )}
      {/* Upload Tips */}
      <div className="glass-card p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Upload Tips</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Files are processed locally in your browser - nothing is uploaded to servers</li>
              <li>• Maximum file size depends on your device's available memory</li>
              <li>• {batchMode ? 'Multiple files can be processed simultaneously' : 'Switch to batch mode to process multiple files'}</li>
              <li>• Supported file types are automatically detected and validated</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadZone;