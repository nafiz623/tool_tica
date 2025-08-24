import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const BatchProcessor = ({ tool, files, config, onBatchProcess, processing }) => {
  const [batchQueue, setBatchQueue] = useState([]);
  const [currentBatch, setCurrentBatch] = useState(0);
  const [batchResults, setBatchResults] = useState([]);
  const [batchProgress, setBatchProgress] = useState(0);
  const [processingStats, setProcessingStats] = useState({
    processed: 0,
    failed: 0,
    remaining: 0,
    startTime: null
  });

  useEffect(() => {
    if (files?.length > 0) {
      // Create batches of files (batch size configurable)
      const batchSize = config?.batchSize || 5;
      const batches = [];
      
      for (let i = 0; i < files?.length; i += batchSize) {
        batches?.push({
          id: `batch-${i / batchSize + 1}`,
          files: files?.slice(i, i + batchSize),
          status: 'pending', // pending, processing, completed, error
          progress: 0,
          results: []
        });
      }
      
      setBatchQueue(batches);
      setProcessingStats(prev => ({
        ...prev,
        remaining: files?.length,
        processed: 0,
        failed: 0
      }));
    }
  }, [files, config?.batchSize]);

  useEffect(() => {
    if (processing && batchQueue?.length > 0) {
      processBatches();
    }
  }, [processing, batchQueue]);

  const processBatches = async () => {
    setProcessingStats(prev => ({ ...prev, startTime: Date.now() }));
    
    for (let i = 0; i < batchQueue?.length; i++) {
      setCurrentBatch(i);
      const batch = batchQueue?.[i];
      
      // Update batch status
      setBatchQueue(prev => prev?.map((b, index) => 
        index === i ? { ...b, status: 'processing' } : b
      ));

      try {
        // Simulate batch processing
        for (let progress = 0; progress <= 100; progress += 10) {
          setBatchQueue(prev => prev?.map((b, index) => 
            index === i ? { ...b, progress } : b
          ));
          setBatchProgress((i * 100 + progress) / batchQueue?.length);
          await new Promise(resolve => setTimeout(resolve, 200));
        }

        // Mark batch as completed
        setBatchQueue(prev => prev?.map((b, index) => 
          index === i ? { 
            ...b, 
            status: 'completed', 
            progress: 100,
            results: b?.files?.map(file => ({
              id: `result-${file?.name}-${Date.now()}`,
              originalFile: file?.name,
              success: Math.random() > 0.1, // 90% success rate simulation
              processedData: `Processed content for ${file?.name}`,
              format: getOutputFormat(tool?.slug)
            }))
          } : b
        ));

        // Update stats
        const successCount = batch?.files?.filter(() => Math.random() > 0.1)?.length;
        const failCount = batch?.files?.length - successCount;
        
        setProcessingStats(prev => ({
          ...prev,
          processed: prev?.processed + successCount,
          failed: prev?.failed + failCount,
          remaining: prev?.remaining - batch?.files?.length
        }));

      } catch (error) {
        // Mark batch as error
        setBatchQueue(prev => prev?.map((b, index) => 
          index === i ? { ...b, status: 'error', progress: 100 } : b
        ));
        
        setProcessingStats(prev => ({
          ...prev,
          failed: prev?.failed + batch?.files?.length,
          remaining: prev?.remaining - batch?.files?.length
        }));
      }
    }
  };

  const getOutputFormat = (toolSlug) => {
    const formatMap = {
      'pdf-to-text': 'txt',
      'pdf-to-html': 'html',
      'image-compressor': 'jpg'
    };
    return formatMap?.[toolSlug] || 'txt';
  };

  const getBatchStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'processing':
        return <Icon name="Loader" size={16} className="text-primary animate-spin" />;
      case 'error':
        return <Icon name="XCircle" size={16} className="text-error" />;
      default:
        return <Icon name="Clock" size={16} className="text-muted-foreground" />;
    }
  };

  const getBatchStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'border-success/20 bg-success/5';
      case 'processing':
        return 'border-primary/20 bg-primary/5';
      case 'error':
        return 'border-error/20 bg-error/5';
      default:
        return 'border-white/10';
    }
  };

  const getEstimatedTime = () => {
    if (!processingStats?.startTime || !processingStats?.processed) return null;
    
    const elapsed = Date.now() - processingStats?.startTime;
    const rate = processingStats?.processed / elapsed;
    const remaining = processingStats?.remaining / rate;
    
    return Math.round(remaining / 1000); // seconds
  };

  const pauseProcessing = () => {
    // Implementation for pausing batch processing
    console.log('Pause processing');
  };

  const resumeProcessing = () => {
    // Implementation for resuming batch processing
    console.log('Resume processing');
  };

  const retryFailedBatches = () => {
    setBatchQueue(prev => prev?.map(batch => 
      batch?.status === 'error' ? { ...batch, status: 'pending', progress: 0 } : batch
    ));
  };

  return (
    <div className="glass-card p-6">
      <div className="space-y-6">
        {/* Batch Processing Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Batch Processing</h3>
            <p className="text-sm text-muted-foreground">
              Processing {files?.length} files in {batchQueue?.length} batches
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            {processing && (
              <>
                <Button size="sm" variant="outline" iconName="Pause" onClick={pauseProcessing}>
                  Pause
                </Button>
                <Button size="sm" variant="outline" iconName="Square" onClick={() => {}}>
                  Stop
                </Button>
              </>
            )}
            {!processing && batchQueue?.some(b => b?.status === 'error') && (
              <Button size="sm" variant="outline" iconName="RefreshCw" onClick={retryFailedBatches}>
                Retry Failed
              </Button>
            )}
          </div>
        </div>

        {/* Overall Progress */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className="text-sm text-muted-foreground">
              {Math.round(batchProgress)}% Complete
            </span>
          </div>
          
          <div className="w-full bg-surface rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${batchProgress}%` }}
            />
          </div>

          {/* Processing Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-success/10 rounded-lg">
              <div className="text-xl font-bold text-success">{processingStats?.processed}</div>
              <div className="text-xs text-muted-foreground">Processed</div>
            </div>
            <div className="p-3 bg-error/10 rounded-lg">
              <div className="text-xl font-bold text-error">{processingStats?.failed}</div>
              <div className="text-xs text-muted-foreground">Failed</div>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <div className="text-xl font-bold text-warning">{processingStats?.remaining}</div>
              <div className="text-xs text-muted-foreground">Remaining</div>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <div className="text-xl font-bold text-primary">
                {getEstimatedTime() ? `${getEstimatedTime()}s` : '--'}
              </div>
              <div className="text-xs text-muted-foreground">Est. Time</div>
            </div>
          </div>
        </div>

        {/* Batch Queue */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          <h4 className="text-sm font-semibold text-foreground">Batch Queue</h4>
          
          {batchQueue?.map((batch, index) => (
            <div key={batch?.id} className={`p-4 rounded-lg border ${getBatchStatusColor(batch?.status)}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getBatchStatusIcon(batch?.status)}
                  <div>
                    <h5 className="text-sm font-medium text-foreground">
                      Batch {index + 1}
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      {batch?.files?.length} files • {batch?.status}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-semibold text-foreground">
                    {batch?.progress}%
                  </div>
                  {batch?.status === 'processing' && index === currentBatch && (
                    <div className="text-xs text-primary">Processing...</div>
                  )}
                </div>
              </div>

              {/* Batch Progress Bar */}
              <div className="w-full bg-background/50 rounded-full h-1">
                <div 
                  className={`h-1 rounded-full transition-all duration-300 ${
                    batch?.status === 'completed' ? 'bg-success' :
                    batch?.status === 'error' ? 'bg-error' : 'bg-primary'
                  }`}
                  style={{ width: `${batch?.progress}%` }}
                />
              </div>

              {/* File List in Batch */}
              <div className="mt-3 space-y-1">
                {batch?.files?.slice(0, 3)?.map((file, fileIndex) => (
                  <div key={fileIndex} className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Icon name="File" size={12} />
                    <span className="truncate">{file?.name}</span>
                  </div>
                ))}
                {batch?.files?.length > 3 && (
                  <div className="text-xs text-muted-foreground ml-5">
                    +{batch?.files?.length - 3} more files...
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Batch Settings */}
        <div className="pt-4 border-t border-white/10">
          <h4 className="text-sm font-semibold text-foreground mb-3">Batch Settings</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Batch Size: {config?.batchSize || 5}
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={config?.batchSize || 5}
                onChange={(e) => {
                  const newConfig = { ...config, batchSize: parseInt(e?.target?.value) };
                  // Update config through parent component
                }}
                className="w-full h-1 bg-surface rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="parallel-batches"
                checked={config?.parallelBatches === true}
                onChange={(e) => {
                  // Update config through parent component
                }}
                className="rounded border-white/20 bg-surface text-primary focus:ring-primary focus:ring-offset-0"
              />
              <label htmlFor="parallel-batches" className="text-xs text-foreground">
                Process batches in parallel
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchProcessor;