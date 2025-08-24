import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ progress, showPercentage = true, size = 'md', status = 'processing' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <Icon name="CheckCircle" size={size === 'lg' ? 24 : size === 'md' ? 16 : 12} className="text-success" />;
      case 'error':
        return <Icon name="XCircle" size={size === 'lg' ? 24 : size === 'md' ? 16 : 12} className="text-error" />;
      case 'paused':
        return <Icon name="PauseCircle" size={size === 'lg' ? 24 : size === 'md' ? 16 : 12} className="text-warning" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'error':
        return 'text-error';
      case 'paused':
        return 'text-warning';
      default:
        return 'text-primary';
    }
  };

  if (status !== 'processing') {
    return (
      <div className="flex items-center space-x-2">
        {getStatusIcon()}
        {showPercentage && (
          <span className={`text-xs font-medium ${getStatusColor()}`}>
            {status === 'completed' ? '100%' : status === 'error' ? 'Error' : 'Paused'}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      {/* Circular Progress */}
      <div className="relative">
        <div className={`${sizeClasses?.[size]} relative`}>
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-surface opacity-30"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * progress) / 100}
              className="text-primary transition-all duration-300 ease-out"
              strokeLinecap="round"
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            {showPercentage ? (
              <span className="text-xs font-bold text-foreground">
                {Math.round(progress)}%
              </span>
            ) : (
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            )}
          </div>
        </div>
      </div>
      {/* Status Text */}
      {size !== 'sm' && (
        <div className="text-left">
          <div className="text-sm font-medium text-foreground">Processing...</div>
          <div className="text-xs text-muted-foreground">
            {progress < 25 && 'Initializing...'}
            {progress >= 25 && progress < 50 && 'Analyzing content...'}
            {progress >= 50 && progress < 75 && 'Converting data...'}
            {progress >= 75 && progress < 100 && 'Finalizing...'}
            {progress === 100 && 'Complete!'}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;