import React from 'react';

const EmptyState = ({
  icon,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-surface border border-dashed border-border rounded ${className}`}>
      {icon && (
        <div className="w-12 h-12 mb-4 text-text-muted flex items-center justify-center bg-surface-hover rounded">
          {icon}
        </div>
      )}
      {title && (
        <h3 className="text-lg font-semibold text-text-primary mb-1">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-sm text-text-secondary max-w-sm mb-6">
          {description}
        </p>
      )}
      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;