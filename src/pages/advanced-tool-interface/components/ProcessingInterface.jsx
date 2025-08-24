import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProcessingInterface = ({ 
  tool, 
  config, 
  onConfigChange, 
  onStartProcessing, 
  processing, 
  files, 
  batchMode 
}) => {
  const updateConfig = (key, value) => {
    onConfigChange(prev => ({ ...prev, [key]: value }));
  };

  const getToolSpecificOptions = () => {
    switch (tool?.category) {
      case 'PDF Tools':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Output Quality</label>
              <Select
                value={config?.quality || 'high'}
                onChange={(value) => updateConfig('quality', value)}
                options={[
                  { value: 'low', label: 'Low (Faster)' },
                  { value: 'medium', label: 'Medium (Balanced)' },
                  { value: 'high', label: 'High (Best Quality)' }
                ]}
              />
            </div>
            {tool?.slug?.includes('to-image') && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">DPI Resolution</label>
                <Select
                  value={config?.dpi || '150'}
                  onChange={(value) => updateConfig('dpi', value)}
                  options={[
                    { value: '72', label: '72 DPI (Web)' },
                    { value: '150', label: '150 DPI (Standard)' },
                    { value: '300', label: '300 DPI (Print)' }
                  ]}
                />
              </div>
            )}
          </div>
        );

      case 'Image Tools':
        return (
          <div className="space-y-4">
            {tool?.slug === 'image-resizer' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Width (px)</label>
                    <Input
                      type="number"
                      value={config?.width || 800}
                      onChange={(e) => updateConfig('width', parseInt(e?.target?.value))}
                      placeholder="800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Height (px)</label>
                    <Input
                      type="number"
                      value={config?.height || 600}
                      onChange={(e) => updateConfig('height', parseInt(e?.target?.value))}
                      placeholder="600"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="maintain-aspect"
                    checked={config?.maintainAspect !== false}
                    onChange={(e) => updateConfig('maintainAspect', e?.target?.checked)}
                    className="rounded border-white/20 bg-surface text-primary focus:ring-primary focus:ring-offset-0"
                  />
                  <label htmlFor="maintain-aspect" className="text-sm text-foreground">
                    Maintain aspect ratio
                  </label>
                </div>
              </>
            )}
            {tool?.slug === 'image-compressor' && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Compression Level: {config?.compression || 80}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={config?.compression || 80}
                  onChange={(e) => updateConfig('compression', parseInt(e?.target?.value))}
                  className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Smaller file</span>
                  <span>Better quality</span>
                </div>
              </div>
            )}
          </div>
        );

      case 'Text Tools':
        return (
          <div className="space-y-4">
            {tool?.slug === 'text-case' && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Case Type</label>
                <Select
                  value={config?.caseType || 'upper'}
                  onChange={(value) => updateConfig('caseType', value)}
                  options={[
                    { value: 'upper', label: 'UPPERCASE' },
                    { value: 'lower', label: 'lowercase' },
                    { value: 'title', label: 'Title Case' },
                    { value: 'sentence', label: 'Sentence case' },
                    { value: 'camel', label: 'camelCase' },
                    { value: 'snake', label: 'snake_case' }
                  ]}
                />
              </div>
            )}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="preserve-formatting"
                checked={config?.preserveFormatting !== false}
                onChange={(e) => updateConfig('preserveFormatting', e?.target?.checked)}
                className="rounded border-white/20 bg-surface text-primary focus:ring-primary focus:ring-offset-0"
              />
              <label htmlFor="preserve-formatting" className="text-sm text-foreground">
                Preserve original formatting
              </label>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Processing Mode</label>
              <Select
                value={config?.mode || 'standard'}
                onChange={(value) => updateConfig('mode', value)}
                options={[
                  { value: 'fast', label: 'Fast (Lower Quality)' },
                  { value: 'standard', label: 'Standard (Recommended)' },
                  { value: 'precise', label: 'Precise (Higher Quality)' }
                ]}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Processing Options Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Processing Options</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Configure settings for optimal results
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Settings" size={20} className="text-primary" />
          <span className="text-xs text-muted-foreground">
            {files?.length || 0} file{files?.length !== 1 ? 's' : ''} ready
          </span>
        </div>
      </div>

      {/* Tool-Specific Configuration */}
      <div className="glass-card p-6">
        <h4 className="text-sm font-semibold text-foreground mb-4">Configuration</h4>
        {getToolSpecificOptions()}
      </div>

      {/* Advanced Options */}
      <div className="glass-card p-6">
        <h4 className="text-sm font-semibold text-foreground mb-4">Advanced Options</h4>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="auto-optimize"
              checked={config?.autoOptimize !== false}
              onChange={(e) => updateConfig('autoOptimize', e?.target?.checked)}
              className="rounded border-white/20 bg-surface text-primary focus:ring-primary focus:ring-offset-0"
            />
            <label htmlFor="auto-optimize" className="text-sm text-foreground">
              Auto-optimize output for best results
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="create-backup"
              checked={config?.createBackup === true}
              onChange={(e) => updateConfig('createBackup', e?.target?.checked)}
              className="rounded border-white/20 bg-surface text-primary focus:ring-primary focus:ring-offset-0"
            />
            <label htmlFor="create-backup" className="text-sm text-foreground">
              Create backup of original files
            </label>
          </div>

          {batchMode && (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="sequential-processing"
                checked={config?.sequential !== false}
                onChange={(e) => updateConfig('sequential', e?.target?.checked)}
                className="rounded border-white/20 bg-surface text-primary focus:ring-primary focus:ring-offset-0"
              />
              <label htmlFor="sequential-processing" className="text-sm text-foreground">
                Process files sequentially (more stable)
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Output Format */}
      <div className="glass-card p-6">
        <h4 className="text-sm font-semibold text-foreground mb-4">Output Format</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Format</label>
            <Select
              value={config?.outputFormat || getDefaultOutputFormat(tool?.slug)}
              onChange={(value) => updateConfig('outputFormat', value)}
              options={getOutputFormatOptions(tool?.slug)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Filename Pattern</label>
            <Input
              value={config?.filenamePattern || '{original}_{tool}'}
              onChange={(e) => updateConfig('filenamePattern', e?.target?.value)}
              placeholder="{original}_{tool}_{timestamp}"
              className="font-mono text-xs"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Available variables: {'{original}'}, {'{tool}'}, {'{timestamp}'}, {'{index}'}
            </p>
          </div>
        </div>
      </div>

      {/* Processing Button */}
      <div className="flex items-center justify-center pt-4">
        <Button
          onClick={onStartProcessing}
          disabled={processing || files?.length === 0}
          loading={processing}
          iconName="Play"
          size="lg"
          className="px-12"
        >
          {processing ? 'Processing...' : `Process ${files?.length || 0} File${files?.length !== 1 ? 's' : ''}`}
        </Button>
      </div>

      {/* Processing Tips */}
      <div className="glass-card p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Processing Tips</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Higher quality settings take longer but produce better results</li>
              <li>• Batch processing is more efficient for multiple files</li>
              <li>• Large files may take several seconds to process</li>
              <li>• All processing happens in your browser - no data is uploaded</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const getDefaultOutputFormat = (toolSlug) => {
  const formatMap = {
    'pdf-to-text': 'txt',
    'pdf-to-html': 'html',
    'pdf-to-csv': 'csv',
    'pdf-to-excel': 'xlsx',
    'pdf-to-jpg': 'jpg',
    'pdf-to-png': 'png',
    'image-compressor': 'jpg',
    'json-formatter': 'json'
  };
  return formatMap?.[toolSlug] || 'txt';
};

const getOutputFormatOptions = (toolSlug) => {
  const commonFormats = [
    { value: 'txt', label: 'Plain Text (.txt)' },
    { value: 'json', label: 'JSON (.json)' },
    { value: 'csv', label: 'CSV (.csv)' }
  ];

  const specificFormats = {
    'pdf-to-image': [
      { value: 'jpg', label: 'JPEG Image (.jpg)' },
      { value: 'png', label: 'PNG Image (.png)' },
      { value: 'webp', label: 'WebP Image (.webp)' }
    ],
    'image-converter': [
      { value: 'jpg', label: 'JPEG (.jpg)' },
      { value: 'png', label: 'PNG (.png)' },
      { value: 'webp', label: 'WebP (.webp)' },
      { value: 'svg', label: 'SVG (.svg)' }
    ],
    'document-converter': [
      { value: 'pdf', label: 'PDF Document (.pdf)' },
      { value: 'docx', label: 'Word Document (.docx)' },
      { value: 'html', label: 'HTML (.html)' },
      { value: 'txt', label: 'Plain Text (.txt)' }
    ]
  };

  if (toolSlug?.includes('image')) {
    return specificFormats?.['image-converter'] || commonFormats;
  } else if (toolSlug?.includes('pdf')) {
    return specificFormats?.['document-converter'] || commonFormats;
  }
  
  return commonFormats;
};

export default ProcessingInterface;