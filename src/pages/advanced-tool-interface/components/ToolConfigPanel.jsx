import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const ToolConfigPanel = ({ tool, config, onConfigChange }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [presets, setPresets] = useState([
    { id: 'default', name: 'Default Settings', config: {} },
    { id: 'high-quality', name: 'High Quality', config: { quality: 'high', dpi: '300' } },
    { id: 'fast', name: 'Fast Processing', config: { quality: 'low', mode: 'fast' } }
  ]);
  const [selectedPreset, setSelectedPreset] = useState('default');

  const updateConfig = (key, value) => {
    onConfigChange(prev => ({ ...prev, [key]: value }));
  };

  const applyPreset = (presetId) => {
    const preset = presets?.find(p => p?.id === presetId);
    if (preset) {
      onConfigChange(preset?.config);
      setSelectedPreset(presetId);
    }
  };

  const saveCustomPreset = () => {
    const presetName = prompt('Enter preset name:');
    if (presetName) {
      const newPreset = {
        id: `custom-${Date.now()}`,
        name: presetName,
        config: { ...config }
      };
      setPresets(prev => [...prev, newPreset]);
    }
  };

  const getQuickSettings = () => {
    switch (tool?.category) {
      case 'PDF Tools':
        return [
          {
            key: 'pageRange',
            label: 'Page Range',
            type: 'text',
            placeholder: 'e.g., 1-5, 10, 15-20',
            value: config?.pageRange || ''
          },
          {
            key: 'password',
            label: 'PDF Password',
            type: 'password',
            placeholder: 'Enter password if protected',
            value: config?.password || ''
          }
        ];
        
      case 'Image Tools':
        return [
          {
            key: 'format',
            label: 'Output Format',
            type: 'select',
            options: [
              { value: 'jpg', label: 'JPEG' },
              { value: 'png', label: 'PNG' },
              { value: 'webp', label: 'WebP' }
            ],
            value: config?.format || 'jpg'
          },
          {
            key: 'quality',
            label: 'Quality',
            type: 'range',
            min: 10,
            max: 100,
            value: config?.quality || 80
          }
        ];
        
      case 'Text Tools':
        return [
          {
            key: 'encoding',
            label: 'Text Encoding',
            type: 'select',
            options: [
              { value: 'utf8', label: 'UTF-8' },
              { value: 'ascii', label: 'ASCII' },
              { value: 'latin1', label: 'Latin-1' }
            ],
            value: config?.encoding || 'utf8'
          }
        ];
        
      default:
        return [];
    }
  };

  const renderSetting = (setting) => {
    switch (setting?.type) {
      case 'select':
        return (
          <Select
            value={setting?.value}
            onChange={(value) => updateConfig(setting?.key, value)}
            options={setting?.options}
          />
        );
      case 'range':
        return (
          <div className="space-y-2">
            <input
              type="range"
              min={setting?.min}
              max={setting?.max}
              value={setting?.value}
              onChange={(e) => updateConfig(setting?.key, parseInt(e?.target?.value))}
              className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{setting?.min}</span>
              <span className="text-foreground font-medium">{setting?.value}</span>
              <span>{setting?.max}</span>
            </div>
          </div>
        );
      default:
        return (
          <Input
            type={setting?.type || 'text'}
            value={setting?.value}
            onChange={(e) => updateConfig(setting?.key, e?.target?.value)}
            placeholder={setting?.placeholder}
          />
        );
    }
  };

  return (
    <div className="glass-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <Icon name="Settings" size={20} className="text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Tool Configuration</h3>
        </div>
        <Button
          size="sm"
          variant="ghost"
          iconName={collapsed ? "ChevronDown" : "ChevronUp"}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>

      {!collapsed && (
        <div className="p-4 space-y-6">
          {/* Preset Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Configuration Presets</label>
            <div className="flex space-x-2">
              <Select
                value={selectedPreset}
                onChange={applyPreset}
                options={presets?.map(preset => ({ value: preset?.id, label: preset?.name }))}
                className="flex-1"
              />
              <Button
                size="sm"
                variant="ghost"
                iconName="Save"
                onClick={saveCustomPreset}
              />
            </div>
          </div>

          {/* Quick Settings */}
          <div className="space-y-4">
            {getQuickSettings()?.map((setting) => (
              <div key={setting?.key}>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {setting?.label}
                </label>
                {renderSetting(setting)}
              </div>
            ))}
          </div>

          {/* Advanced Toggle */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="show-advanced"
                checked={config?.showAdvanced === true}
                onChange={(e) => updateConfig('showAdvanced', e?.target?.checked)}
                className="rounded border-white/20 bg-surface text-primary focus:ring-primary focus:ring-offset-0"
              />
              <label htmlFor="show-advanced" className="text-sm text-foreground">
                Show advanced options
              </label>
            </div>
          </div>

          {/* Advanced Settings */}
          {config?.showAdvanced && (
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Processing Threads</label>
                <Select
                  value={config?.threads || 'auto'}
                  onChange={(value) => updateConfig('threads', value)}
                  options={[
                    { value: 'auto', label: 'Auto (Recommended)' },
                    { value: '1', label: '1 Thread' },
                    { value: '2', label: '2 Threads' },
                    { value: '4', label: '4 Threads' }
                  ]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Memory Usage</label>
                <Select
                  value={config?.memory || 'normal'}
                  onChange={(value) => updateConfig('memory', value)}
                  options={[
                    { value: 'low', label: 'Low (256MB)' },
                    { value: 'normal', label: 'Normal (512MB)' },
                    { value: 'high', label: 'High (1GB)' }
                  ]}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="debug-mode"
                  checked={config?.debug === true}
                  onChange={(e) => updateConfig('debug', e?.target?.checked)}
                  className="rounded border-white/20 bg-surface text-primary focus:ring-primary focus:ring-offset-0"
                />
                <label htmlFor="debug-mode" className="text-sm text-foreground">
                  Enable debug logging
                </label>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-2 pt-4 border-t border-white/10">
            <Button
              size="sm"
              variant="outline"
              iconName="RotateCcw"
              onClick={() => onConfigChange({})}
              className="flex-1"
            >
              Reset
            </Button>
            <Button
              size="sm"
              variant="outline"
              iconName="Copy"
              onClick={() => navigator?.clipboard?.writeText(JSON.stringify(config, null, 2))}
              className="flex-1"
            >
              Copy Config
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolConfigPanel;